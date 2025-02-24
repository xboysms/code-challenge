"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const dummyData_1 = require("../utils/dummyData");
const router = (0, express_1.Router)();
// 📌 Get top 10 leaderboard
router.get("/leaderboard", (req, res) => {
    res.json({ leaderboard: dummyData_1.dummyScores });
});
// 📌 Update score (protected route)
router.post("/score", auth_1.authenticateUser, (req, res) => {
    var _a;
    const { username, scoreIncrement } = req.body;
    if (!username || typeof scoreIncrement !== "number" || scoreIncrement <= 0) {
        return res.status(400).json({ message: "Invalid request" });
    }
    (0, dummyData_1.updateUserScore)(username, scoreIncrement);
    return res.json({ message: "Score updated successfully", newScore: (_a = dummyData_1.dummyScores.find(u => u.username === username)) === null || _a === void 0 ? void 0 : _a.score });
});
exports.default = router;
