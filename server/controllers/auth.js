
const { PrismaClient } = require('../prisma/generated');
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "fallback_secret";


exports.register = async (req, res) => {
    try {

        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Name validation
        const nameValidationResult = validateName(name)
        if (!nameValidationResult.success) {
            return sendError(nameValidationResult.message, "name", res);
        }

        // Email validation
        const emailValidationResult = validateEmail(email)
        if (!emailValidationResult.success) {
            return sendError(emailValidationResult.message, "email", res);
        }

        // Password validation
        const passwordValidationResult = validatePassword(password)
        if (!passwordValidationResult.success) {
            return sendError(passwordValidationResult.message, "password", res);
        }

        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                name: user.name,
                email: user.email
            },
        });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error });

    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const emailValidationResult = validateEmail(email)
        if (!emailValidationResult.success) {
            return sendError(emailValidationResult.message, "email");
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const favorites = await prisma.favorite.findMany({ where: { user_id: user.id } });

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1d" });

        res.cookie("jwtToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 days in ms
        });

        console.log(favorites)
     
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                name: user.name,
                email: user.email,
                favorites: favorites || []
            },
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error logging in", error });
    }
}

function validateName(name) {
    if (!name || typeof name !== "string" || name.trim().length < 2) {
        // return sendError("Name is required and must be at least 2 characters.", "name");
        return {
            success: false,
            message: "Name is required and must be at least 2 characters.",
            field: "name"
        }
    }

    // Allow letters from any language, spaces, apostrophes, and hyphens
    const namePattern = /^[\p{L}\s'-]+$/u;

    if (!namePattern.test(name.trim())) {
        return {
            success: false,
            message: "Invalid name: only letters, spaces, apostrophes, and hyphens are allowed.",
            field: "name"
        }

    }
    return { success: true };
}

function validateEmail(email) {
    if (!email || typeof email !== "string") {
        return {
            success: false,
            message: "Email is required.",
            field: "email"
        };
    }

    const trimmedEmail = email.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
        return {
            success: false,
            message: "Invalid email format.",
            field: "email"
        };
    }

    return { success: true };
}

function validatePassword(password) {
    if (!password || typeof password !== "string") {
        return {
            success: false,
            message: "Password is required.",
            field: "password",
        };
    }

    if (password.length < 8) {
        return {
            success: false,
            message: "Password must be at least 8 characters long.",
            field: "password",
        };
    }

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;

    if (!passwordPattern.test(password)) {
        return {
            success: false,
            message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            field: "password",
        };
    }

    return { success: true };
}

const sendError = (msg, field = null, res) => {
    return res.status(400).json({
        success: false,
        message: msg,
        field,
    });
};


exports.logout = (req, res) => {
    res.clearCookie("jwtToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully." });
};