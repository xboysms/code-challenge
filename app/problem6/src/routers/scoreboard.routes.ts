import { Router } from "express";
import { authenticateUser } from "../middleware/auth";
import { dummyScores, updateUserScore } from "../utils/dummyData";

const router = Router();

// 📌 Get top 10 leaderboard
router.get("/leaderboard", (req, res) => {
    res.json({ leaderboard: dummyScores });
});

// 📌 Update score (protected route)
router.post("/score", authenticateUser, (req: any, res: any) => {
    const { username, scoreIncrement } = req.body;

    if (!username || typeof scoreIncrement !== "number" || scoreIncrement <= 0) {
        return res.status(400).json({ message: "Invalid request" });
    }

    updateUserScore(username, scoreIncrement);
    return res.json({ message: "Score updated successfully", newScore: dummyScores.find(u => u.username === username)?.score });
});

export default router;
