const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
require("dotenv").config();
const cors = require("cors");
app.use(express.json())
const port = process.env.PORT || 2027;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(cors({
    origin: ['http://localhost:5173', "https://bit-bet-server.vercel.app"],
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("Hello World! by BITBET");
});

const userAuth = require("./routes/auth")
const userGames = require("./routes/user.route")

app.use("/api/auth", userAuth);
app.use("/api", userGames);

// async function startServer() {
//     try {
//         await prisma.$connect();
//         console.log("✅ Database connected successfully");

//         app.listen(port, () => {
//             console.log(`🚀 Server running on port ${port}`);
//         });
//     } catch (error) {
//         console.error("❌ Database connection failed:", error.message);
//         process.exit(1);
//     }
// }

// startServer();
module.exports = app;