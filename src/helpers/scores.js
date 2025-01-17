const HARD_WEIGHTING = 1.25;
const EASY_WEIGHTING = 1.1;
const HARD_ID = 'HARD';
const EASY_ID = 'EASY';

function calculateDifficultyFactor(difficulty, level) {
    const diffValue = (difficulty == HARD_ID) ? HARD_WEIGHTING : EASY_WEIGHTING;
    return parseFloat(Math.pow(diffValue, parseFloat(level)))
}

function calculateSpawnSpeed(difficultyFactor) {
    return 1.0 / difficultyFactor
}

function calculateNumberOfLevels(difficultyFactor) {
    return parseInt(15 * difficultyFactor, 10);
}

function calculateSpawnSpeedAndLevelCount(difficulty, level) {
    let difficultyFactor = calculateDifficultyFactor(difficulty, level)
    let spawnSpeed = calculateSpawnSpeed(difficultyFactor)
    let numberOfLevels = calculateNumberOfLevels(difficultyFactor)
    return { spawnSpeed, numberOfLevels }
}

/**
 * @desc for a single game, calculate the game time. 
 * nb. to calc total game time for a user across all games and scores, this needs to be called multiple times.
 * 
 * @param {string} difficulty 
 * @param {number} score 
 */
function calculateGameTimeSeconds(difficulty, score) {
    var score = score
    var gameTime = 0.0
    var level = 1

    while (score > 0) {
        let { spawnSpeed, numberOfLevels } = calculateSpawnSpeedAndLevelCount(difficulty, level)
        let levelsToRemove = score < numberOfLevels ? score : numberOfLevels

        gameTime += spawnSpeed * parseFloat(levelsToRemove)
        score -= levelsToRemove
        level += 1
    }
    return gameTime;
}

function calculateAllStats(easy, hard) {

    let easyGameTimes = []
    let hardGameTimes = []
    let easyGameTimeSum = 0.0
    let hardGameTimeSum = 0.0
    let easyScoresSum = 0
    let hardScoresSum = 0

    console.log(easy, easyScoresSum, hard, hardScoresSum);
    // Loop through every score and add up the stats
    easy.forEach((game) => {
        let gameTime = calculateGameTimeSeconds(EASY_ID, game.score)
        easyGameTimes.push(gameTime)
        easyGameTimeSum += gameTime
        easyScoresSum += game.score
        console.log('EASY SCORE SUM', easyScoresSum);
    })

    hard.forEach((game) => {
        let gameTime = calculateGameTimeSeconds(HARD_ID, game.score)
        hardGameTimes.push(gameTime)
        hardGameTimeSum += gameTime
        hardScoresSum += game.score
        console.log('HARD SCORE SUM', hardScoresSum);
    });

    let totalGames = easy.length + hard.length
    let totalGameTime = easyGameTimeSum + hardGameTimeSum
    let aveGameTime = totalGames > 0 ? totalGameTime / parseFloat(totalGames, 10) : 0
    let totalScore = easyScoresSum + hardScoresSum
    let averageScoreEasy = easy.length > 0 ? parseInt(easyScoresSum / easy.length, 10) : 0
    let averageScoreHard = hard.length > 0 ? parseInt(hardScoresSum / hard.length, 10) : 0
    let totalEasyGames = easy.length;
    let totalHardGames = hard.length;

    let result = {
        totalGames,
        totalGameTime,
        aveGameTime,
        totalScore,
        totalScoresEasy: easyScoresSum,
        totalScoresHard: hardScoresSum,
        averageScoreEasy,
        averageScoreHard,
        totalEasyGames,
        totalHardGames,
        totalTimeEasy: easyGameTimeSum,
        totalTimeHard: hardGameTimeSum
    };
    console.log(result);
    return result;
}

module.exports = {
    calculateAllStats,
    calculateGameTimeSeconds
}