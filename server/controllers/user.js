// const { PrismaClient } = require('../prisma/generated');
const { PrismaClient } = require("@prisma/client"); 
const prisma = new PrismaClient();

exports.fetchGames = async (req, res) => {
    try {
        const { filter: sport } = req.query;

        const games = await prisma.match.findMany({
            where: sport
                ? {
                    sport: {
                        equals: sport === "all" ? undefined : sport.trim(),
                        mode: 'insensitive', // handles Cricket, cricKet, CRICKET
                    },
                }
                : undefined,
            orderBy: [
                { is_live: 'desc' },    // Live first
                { start_time: 'asc' },  // Upcoming sorted
            ],
        });

        return res.status(200).json({
            success: true,
            data: games,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.addToFavorites = async (req, res) => {
    try {
        const { gameId } = req.params;
        const { id: userId } = req.user;

        if (!gameId) {
            return res.status(400).json({
                success: false,
                message: "gameId is required",
            });
        }

        // Check if match exists
        const match = await prisma.match.findUnique({
            where: { id: gameId },
        });

        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match not found",
            });
        }

        //  Create favorite
        await prisma.favorite.create({
            data: {
                user_id: userId,
                match_id: gameId,
            },
            include: {
                match: true,
            },
        });

        const favorites = await prisma.favorite.findMany({ where: { user_id: userId } });

        return res.status(201).json({
            success: true,
            message: "Match added to favorites",
            data: favorites,
        });

    } catch (error) {
        // Duplicate favorite
        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "Match already in favorites",
            });
        }

        console.error("Add to favorites error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


exports.removeFromFavorites = async (req, res) => {
    try {
        const { gameId } = req.params;
        const { id: userId } = req.user;

        if (!gameId) {
            return res.status(400).json({
                success: false,
                message: "gameId is required",
            });
        }

        // Check if favorite exists
        const favorite = await prisma.favorite.findUnique({
            where: {
                user_id_match_id: {
                    user_id: userId,
                    match_id: gameId,
                },
            },
        });

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Match is not in your favorites",
            });
        }

        // Remove favorite
        await prisma.favorite.delete({
            where: {
                user_id_match_id: {
                    user_id: userId,
                    match_id: gameId,
                },
            },
        });

        return res.status(200).json({
            success: true,
            message: "Match removed from favorites",
        });

    } catch (error) {
        console.error("Remove favorite error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.myFavorites = async (req, res) => {
    try {
        const { id: userId } = req.user;

        const favorites = await prisma.favorite.findMany({
            where: { user_id: userId },
            include: {
                match: true,
            },
        });

        return res.status(200).json({
            success: true,
            data: favorites.map(fav => fav.match),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
