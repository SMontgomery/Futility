/**
 * @typedef {Object} boardData
 * @property {number} boardWidth - the board width
 * @property {number} boardHeight - the board height
 * @property {number} boardsAcross - the number of boards across
 * @property {number} boardsDown - the number of boards down
 * @property {number} beadSize - the bead size
 * @property {number} halfBeadSize - half the bead size
 */

/**
 * Calculate the peg coordinates from the board coordinates.
 *
 * @param {number} boardIndex - the board index
 * @param {number} boardX - the x point on the board
 * @param {number} boardY - the y point on the board
 * @param (boardData} boardData - an object containing several pieces of data (use createBoardData)
 * @returns {{pegX: number, pegY: number}}
 */
export function calcPegCoordsFromBoardCoords(boardIndex, boardX, boardY, boardData) {
    // Determine the board x/y coordinates
    const boardXPosition = boardIndex % boardData.boardsAcross;
    const boardYPosition = Math.trunc(boardIndex / boardData.boardsAcross);

    // Determine the overall peg x/y coordinates
    return {
        pegX: (boardXPosition * boardData.boardWidth) + boardX,
        pegY: (boardYPosition * boardData.boardHeight) + boardY

    };
}

/**
 * Calculate canvas coordinates from board coordinates.
 *
 * @param {number} boardIndex - the board index
 * @param {number} boardX - the x point on the board
 * @param {number} boardY - the y point on the board
 * @param (boardData} boardData - an object containing several pieces of data (use createBoardData)
 * @returns {{x: number, y: number}}
 */
export function calcCanvasCoordsFromBoardCoords(boardIndex, boardX, boardY, boardData) {
    const pegCoordinates = calcPegCoordsFromBoardCoords(boardIndex, boardX, boardY, boardData);

    // Determine canvas x/y for the center of the peg
    return {
        x: (pegCoordinates.pegX * boardData.beadSize) + boardData.halfBeadSize,
        y: (pegCoordinates.pegY * boardData.beadSize) + boardData.halfBeadSize
    };
}

/**
 * Calculate peg coordinates from canvas coordinates.
 *
 * @param {number} x - the x point on the canvas
 * @param {number} y - the y point on the canvas
 * @param (boardData} boardData - an object containing several pieces of data (use createBoardData)
 * @returns {{pegX: number, pegY: number}}
 */
export function calcPegCoordsFromCanvasCoords(x, y, boardData) {
    return {
        pegX: Math.trunc(x / boardData.beadSize),
        pegY: Math.trunc(y / boardData.beadSize)
    };
}

/**
 * Calculate the board coordinates from the peg coordinates.
 *
 * @param {number} pegX - the x point with regards to pegs on the board collection
 * @param {number} pegY - the y point with regards to pegs on the board collection
 * @param (boardData} boardData - an object containing several pieces of data (use createBoardData)
 * @returns {{boardIndex: number, boardX: number, boardY: number}}
 */
export function calcBoardCoordsFromPegCoords(pegX, pegY, boardData) {
    // Determine board x/y coordinates and index
    const boardXPosition = Math.trunc(pegX / boardData.boardWidth);
    const boardYPosition = Math.trunc(pegY / boardData.boardHeight);

    // Determine the peg's x/y coordinate in relation to it's board
    return {
        boardIndex: boardXPosition + (boardYPosition * boardData.boardsAcross),
        boardX: pegX % boardData.boardWidth,
        boardY: pegY % boardData.boardHeight
    };
}


/**
 * Calculate peg coordinates, board coordinates and canvas coordinates (center point) from canvas coordinates.
 *
 * @param {number} x - the x point on the canvas
 * @param {number} y - the y point on the canvas
 * @param (boardData} boardData - an object containing several pieces of data (use createBoardData)
 * @returns {{canvas: {x: number, y: number}, peg: {pegX: number, pegY: number}, board: {boardIndex: number, boardX: number, boardY: number}}}
 */
export function calcCoordinates(x, y, boardData) {
    const pegCoordinates = calcPegCoordsFromCanvasCoords(x, y, boardData);
    const boardCoordinates = calcBoardCoordsFromPegCoords(pegCoordinates.pegX, pegCoordinates.pegY, boardData);

    return {
        canvas: {
            x: (pegCoordinates.pegX * boardData.beadSize) + boardData.halfBeadSize,
            y: (pegCoordinates.pegY * boardData.beadSize) + boardData.halfBeadSize
        },
        peg: pegCoordinates,
        board: boardCoordinates
    };
}

/**
 * Create a data object that contains the necessary data to calculate the coordinates.
 *
 * @param {number} boardWidth - the board width
 * @param {number} boardHeight - the board height
 * @param {number} boardsAcross - the number of boards across
 * @param {number} boardsDown - the number of boards down
 * @param {number} beadSize - the bead size
 * @returns {{beadSize: number, boardWidth: number, boardsAcross: number, boardsDown: number, boardHeight: number, halfBeadSize: number}}
 */
export function createBoardData(boardWidth, boardHeight, boardsAcross, boardsDown, beadSize) {
    return {
        boardWidth,
        boardHeight,
        boardsAcross,
        boardsDown,
        beadSize,
        halfBeadSize: beadSize / 2
    };
}