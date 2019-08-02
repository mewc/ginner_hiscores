const HARD_WEIGHTING = 1.25;
const EASY_WEIGHTING = 1.1;
const HARD_ID = 'HARD';
const EASY_ID = 'EASY';

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

    return (spawnSpeed, numberOfLevels)
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
        let(spawnSpeed, numberOfLevels) = calculateSpawnSpeedAndLevelCount(difficulty, level)
        let levelsToRemove = score < numberOfLevels ? score : numberOfLevels

        gameTime += spawnSpeed * ParseFloat(levelsToRemove)
        score -= levelsToRemove
        level += 1
    }
    return gameTime
}

function calculateAllStats(easy, hard) {

    let easyGameTimes = []
    let hardGameTimes = []
    let easyGameTimeSum = 0.0
    let hardGameTimeSum = 0.0
    let easyScoresSum = 0
    let hardScoresSum = 0

    // Loop through every score and add up the stats
    for (score in easyScores) {
        let gameTime = calculateGameTimeSeconds(EASY_ID, score)
        easyGameTimes.push(gameTime)
        easyGameTimeSum += gameTime
        easyScoresSum += score.score
    }
    for (score in hardScores) {
        let gameTime = calculateGameTimeSeconds(HARD_ID, score)
        hardGameTimes.push(gameTime)
        hardGameTimeSum += gameTime
        hardScoresSum += score.score
    }

    let totalGames = easyGameTimes.count + hardGameTimes.count
    let totalGameTime = easyGameTimeSum + hardGameTimeSum
    let aveGameTime = totalGames > 0 ? totalGameTime / parseFloat(totalGames, 10) : 0
    let totalScore = easyScoresSum + hardScoresSum

    let averageScoreEasy = easyGameTimes.count > 0 ? parseFloat(easyScoresSum, 10) / parseFloat(easyGameTimes.count, 10) : 0
    let averageScoreHard = hardGameTimes.count > 0 ? parseFloat(hardScoresSum, 10) / parseFloat(hardGameTimes.count, 10) : 0

    return {
        totalGames,
        totalGameTime,
        aveGameTime,
        totalScore,
        averageScoreEasy,
        averageScoreHard
    }
}

module.exports = {
    calculateAllStats,
    calculateGameTimeSeconds
}