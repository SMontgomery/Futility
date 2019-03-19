import logger from '../utils/logger';
import { isEqual } from 'lodash';



export default class Project {
    /**
     * @typedef {Object} Bead
     * @property {string} brand - the bead brand
     * @property {string} code - the bead code
     * @property {string} name - the bead name
     * @property {string} type - the bead type
     * @property {string} color - the bead color
     */

    /**
     * Construct a Project used for tracking the placement of boards and beads.
     *
     * Internal Structure:
     * The pattern is stored in a JSON object using the following format:
     * {
     *     boards: [
     *         { 0,0: 0, 0,1: 1},
     *         { 3,3: 4 }
     *     ]
     * }
     *
     * Bead info is stored in an array using the following JSON format:
     * [
     *     { bead: BEAD, count: COUNT }
     * ]
     *
     * @param {!number} boardWidth is the width of the board which must be a number greater than 0.
     * @param {!number} boardHeight is the height of the board which must be a number greater than 0.
     * @param {!number} boardsAcross is the number of boards across which must be a number greater than 0.
     * @param {!number} boardsDown is the number of boards down which must be a number greater than 0.
     */
    constructor(boardWidth, boardHeight, boardsAcross, boardsDown) {
        if (typeof(boardWidth) !== 'number' || boardWidth <= 0) {
            throw 'boardWith must be a number greater than 0.';
        }

        if (typeof(boardHeight) !== 'number' || boardHeight <= 0) {
            throw 'boardHeight must be a number greater than 0.';
        }

        if (typeof(boardsAcross) !== 'number' || boardsAcross <= 0) {
            throw 'boardsAcross must be a number greater than 0.';
        }

        if (typeof(boardsDown) !== 'number' || boardsDown <= 0) {
            throw 'boardsDown must be a number greater than 0.';
        }

        logger.debug(`Creating project:
            board size: ${boardWidth}x${boardHeight}
            boards across: ${boardsAcross}
            boards down: ${boardsDown}`, this.constructor.name);

        this._boardWidth = boardWidth;
        this._boardHeight = boardHeight;
        this._boardsAcross = boardsAcross;
        this._boardsDown = boardsDown;
        this._pattern = { boards: [] };
        this._beads = [];

        const boardCount = this._boardsAcross * this._boardsDown;
        for(let i = 0; i < boardCount; i++) {
            this._pattern.boards[i] = {};
        }
    }

    /**
     * Get the board width or the number of pegs across a single board. This value can not be changed.
     * @returns {!number} width of a board.
     */
    get boardWidth() {
        return this._boardWidth;
    }

    /**
     * Get the board height or the number of pegs down a single board. This value can not be changed.
     * @returns {!number} height of a board.
     */
    get boardHeight() {
        return this._boardHeight;
    }

    /**
     * Get the number of boards across.
     * @returns {!number} number of boards across.
     */
    get boardsAcross() {
        return this._boardsAcross;
    }

    /**
     * Get the number of boards down.
     * @returns {!number} number of boards down.
     */
    get boardsDown() {
        return this._boardsDown;
    }

    /**
     * Get the number of pegs across the entire project.
     * @returns {!number} number of pegs across.
     */
    getPegsAcross() {
        return this._boardWidth * this._boardsAcross;
    }

    /**
     * Get the number of pegs down the entire project.
     * @returns {!number} number of pegs down.
     */
    getPegsDown() {
        return this._boardHeight * this._boardsDown;
    }

    /**
     * Get a count of the number of boards used in the project.
     * @returns {!number} number of boards used in the project.
     */
    getBoardCount() {
        return this._pattern.boards.length;
    }

    /**
     * Add a column of boards to the left of the current boards.
     */
    addBoardColumnToLeft() {
        this.addBoardColumn(0);
    }

    /**
     * Add a column of boards to the right of the current boards.
     */
    addBoardColumnToRight() {
        this.addBoardColumn(this._boardsAcross);
    }

    /**
     * Add a column of boards at the specified index.
     * @param {!number} columnIndex is the index to add the column of boards to.
     */
    addBoardColumn(columnIndex) {
        if (typeof(columnIndex) !== 'number' || columnIndex < 0 || columnIndex > this._boardsAcross) {
            logger.warn(`${columnIndex} is invalid column index. Column not added.`, this.constructor.name);
            return;
        }

        logger.debug(`Inserting column of boards at index ${columnIndex}`, this.constructor.name);

        this._boardsAcross++;

        const boardCount = this.getBoardCount();
        for(let i = columnIndex; i < boardCount + this._boardsDown; i += this._boardsAcross) {
            logger.debug(`Inserting board at index ${i}`, this.constructor.name);
            this._pattern.boards.splice(i, 0, {});
        }
    }

    /**
     * Add a row of boards to the top of the current boards.
     */
    addBoardRowToTop() {
        this.addBoardRow(0);
    }

    /**
     * Add a row of boards to the bottom of the current boards.
     */
    addBoardRowToBottom() {
        this.addBoardRow(this.getBoardCount());
    }

    /**
     * Add a row of boards at the specified index.
     * @param {!number} rowIndex is the index to add the row of boards to.
     */
    addBoardRow(rowIndex) {
        if (typeof(rowIndex) !== 'number' || rowIndex < 0 || rowIndex > this.getBoardCount() || rowIndex % this._boardsAcross !== 0) {
            logger.warn(`${rowIndex} is invalid row index. Row not added.`, this.constructor.name);
            return;
        }

        logger.debug(`Inserting row of boards at index ${rowIndex}`, this.constructor.name);

        this._boardsDown++;

        for(let i = rowIndex; i < rowIndex + this._boardsAcross; i++) {
            logger.debug(`Inserting board at index ${i}`, this.constructor.name);
            this._pattern.boards.splice(i, 0, {});
        }
    }

    /**
     * Remove a column of boards from the left of the current boards.
     */
    removeBoardColumnFromLeft() {
        this.removeBoardColumn(0);
    }

    /**
     * Remove a column of boards from the right of the current boards.
     */
    removeBoardColumnFromRight() {
        this.removeBoardColumn(this.boardsAcross - 1);
    }

    /**
     * Remove a column of boards at the specified index.
     * @param {!number} columnIndex is the index to remove the column from.
     */
    removeBoardColumn(columnIndex) {
        if (typeof(columnIndex) !== 'number' || columnIndex < 0 || columnIndex >= this._boardsAcross) {
            logger.warn(`${columnIndex} is invalid column index. Column not removed.`, this.constructor.name);
            return;
        }

        if (this._boardsAcross === 1) {
            logger.warn(`No more columns can be removed.`, this.constructor.name);
            return;
        }

        logger.debug(`Removing column of boards at index ${columnIndex}`, this.constructor.name);

        const boardCount = this.getBoardCount();
        for(let i = boardCount - this._boardsAcross + columnIndex; i >= 0; i -= this._boardsAcross) {
            logger.debug(`Removing board at index ${i}`, this.constructor.name);
            this._pattern.boards.splice(i, 1);
        }

        this._boardsAcross--;
    }

    /**
     * Remove a row of boards from the top of the current boards.
     */
    removeBoardRowFromTop() {
        this.removeBoardRow(0);
    }

    /**
     * Remove a row of boards from the bottom of the current boards.
     */
    removeBoardRowFromBottom() {
        this.removeBoardRow(this.getBoardCount() - this._boardsAcross);
    }

    /**
     * Remove a row of boards at the specified index.
     * @param {!number} rowIndex is the index to remove the row from.
     */
    removeBoardRow(rowIndex) {
        if (typeof(rowIndex) !== 'number' || rowIndex < 0 || rowIndex > this.getBoardCount() - this._boardsAcross || rowIndex % this._boardsAcross !== 0) {
            logger.warn(`${rowIndex} is invalid row index. Row not removed.`, this.constructor.name);
            return;
        }

        if (this._boardsDown === 1) {
            logger.warn(`No more rows can be removed.`, this.constructor.name);
            return;
        }

        logger.debug(`Removing row of boards at index ${rowIndex}`, this.constructor.name);

        for(let i = rowIndex + this._boardsAcross - 1; i >= rowIndex; i--) {
            logger.debug(`Removing board at index ${i}`, this.constructor.name);
            this._pattern.boards.splice(i, 1);
        }

        this._boardsDown--;
    }

    /**
     * Get the bead at the specified location or null if there is no bead.
     *
     * @param {!number} board is the board index number containing the bead.
     * @param {!number} x is the x coordinate of the bead.
     * @param {!number} y is the y coordinate of the bead.
     * @returns {?Bead} Bead or null if there is no bead.
     */
    getBead(board, x, y) {
        const beadIndex =  this._pattern.boards[board][`${x},${y}`];
        if (beadIndex >= 0) {
            return this._beads[beadIndex].bead;
        } else {
            return null;
        }
    }

    /**
     * Places a bead on the specified board at the x, y coordinates. If bead is undefined then it will remove the bead
     * that is there currently.
     *
     * @param {!number} board is the board index number where the b ead should be placed.
     * @param {!number} x is the x coordinate of where the bead should be placed.
     * @param {!number} y is the y coordinate of where the bead should be placed.
     * @param {?Bead} bead is the bead to be placed.
     */
    placeBead(board, x, y, bead) {
        if (typeof(board) !== 'number' || board  < 0 || board >= this.getBoardCount()) {
            logger.warn(`${board} is invalid board index. Bead not placed.`, this.constructor.name);
            return;
        }

        if (typeof(x) !== 'number' || x  < 0 || x >= this._boardWidth) {
            logger.warn(`${x} is invalid x coordinate. Bead not placed.`, this.constructor.name);
            return;
        }

        if (typeof(y) !== 'number' || y  < 0 || y >= this._boardHeight) {
            logger.warn(`${y} is invalid y coordinate. Bead not placed.`, this.constructor.name);
            return;
        }

        logger.debug(`Inserting ${bead} at ${board}: ${x}, ${y}.`, this.constructor.name);

        // Get the current bead at the specified position and decrement it's count ore remove if needed.
        const oldBead = this.getBead(board, x, y);
        if (oldBead) {
            const beadIndex = this._beads.findIndex((beadInfo) => {
                return isEqual(beadInfo.bead, oldBead);
            });

            if (beadIndex >= 0) {
                if (this._beads[beadIndex].count <= 1) {
                    this._beads.splice(beadIndex, 1);
                } else {
                    this._beads[beadIndex].count--;
                }
            }

            logger.debug(`Decremented original bead count.`, this.constructor.name);
        }

        if (bead) {
            // Increment the new bead count.
            let beadIndex = this._beads.findIndex((beadInfo) => {
                return isEqual(beadInfo.bead, bead);
            });

            if (beadIndex >= 0) {
                this._beads[beadIndex].count++;
            } else {
                beadIndex = this._beads.push({
                    bead,
                    count: 1
                }) - 1;
            }

            // Place bead
            this._pattern.boards[board][`${x},${y}`] = beadIndex;
        } else {
            // Remove bead
            delete this._pattern.boards[board][`${x},${y}`];
        }

        logger.debug(`Placed new bead and incremented count.`, this.constructor.name);
    }

    /**
     * Get the count of the specified bead used in the project.
     * @param {!Bead} bead is the bead to get the count for.
     * @returns {!number} count of specified bead used.
     */
    getBeadCount(bead) {
        const beadIndex = this._beads.findIndex((beadInfo) => {
            return isEqual(beadInfo.bead, bead);
        });

        if (beadIndex >= 0) {
            return this._beads[beadIndex].count;
        }

        return 0;
    }

    /**
     * Get a list of beads used in the project.
     * @returns {!Array} list of beads used.
     */
    getBeadsUsed() {
        return this._beads.map(bead => bead.bead);
    }
}
