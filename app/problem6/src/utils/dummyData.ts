export let dummyScores = [
    { username: "player1", score: 1500 },
    { username: "player2", score: 1400 },
    { username: "player3", score: 1300 },
    { username: "player4", score: 1200 },
    { username: "player5", score: 1100 },
];

export const updateUserScore = (username: string, scoreIncrement: number) => {
    const user = dummyScores.find(user => user.username === username);
    if (user) {
        user.score += scoreIncrement;
    } else {
        dummyScores.push({ username, score: scoreIncrement });
    }
    dummyScores = dummyScores.sort((a, b) => b.score - a.score).slice(0, 10);
};
