"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserScore = exports.dummyScores = void 0;
exports.dummyScores = [
    { username: "player1", score: 1500 },
    { username: "player2", score: 1400 },
    { username: "player3", score: 1300 },
    { username: "player4", score: 1200 },
    { username: "player5", score: 1100 },
];
const updateUserScore = (username, scoreIncrement) => {
    const user = exports.dummyScores.find(user => user.username === username);
    if (user) {
        user.score += scoreIncrement;
    }
    else {
        exports.dummyScores.push({ username, score: scoreIncrement });
    }
    exports.dummyScores = exports.dummyScores.sort((a, b) => b.score - a.score).slice(0, 10);
};
exports.updateUserScore = updateUserScore;
