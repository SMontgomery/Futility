import logger from '../utils/logger';
import { isEqual, get, set } from 'lodash';

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
     * {
     *     boardWidth: 5,
     *     boardHeight: 5,
     *     boardsAcross: 2,
     *     boardsDown: 2,
     *     boards: [
     *         {
     *             '1': {
     *                 '4': 0
     *             },
     *             '4': {
     *                 '3': 0
     *             }
     *         },
     *     ],
     *     beads: [
     *         {
     *             bead: {
     *                 brand: 'Perler',
     *                 color: '#000000',
     *                 type: 'regular',
     *                 name: 'Black',
     *                 code: '01'
     *             },
     *             count: 1
     *         }
     *     ]
     * }
     * Boards are in an array with their index being the index to the array. Each object in the boards array start
     * with an object referencing the x coordinate of a specific peg. Within that is an object referencing the y
     * coordinate with a value being the bead index to the beads array. so project.boards[0][1][4] has bead 0 which
     * is a black bead.
     *
     * @param {!number} boardWidth is the width of the board which must be a number greater than 0.
     * @param {!number} boardHeight is the height of the board which must be a number greater than 0.
     * @param {!number} boardsAcross is the number of boards across which must be a number greater than 0.
     * @param {!number} boardsDown is the number of boards down which must be a number greater than 0.
     */
    constructor(boardWidth, boardHeight, boardsAcross, boardsDown) {
        if (!this.isNumberInRange(boardWidth, 1)) {
            throw 'boardWith must be a number greater than 0.';
        }

        if (!this.isNumberInRange(boardHeight, 1)) {
            throw 'boardHeight must be a number greater than 0.';
        }

        if (!this.isNumberInRange(boardsAcross, 1)) {
            throw 'boardsAcross must be a number greater than 0.';
        }

        if (!this.isNumberInRange(boardsDown, 1)) {
            throw 'boardsDown must be a number greater than 0.';
        }

        logger.debug(`Creating project:
            board size: ${boardWidth}x${boardHeight}
            boards across: ${boardsAcross}
            boards down: ${boardsDown}`, this.constructor.name);

        this._project = {
            boardWidth,
            boardHeight,
            boardsAcross,
            boardsDown,
            boards: [],
            beads: []
        };

        const boardCount = boardsAcross * boardsDown;
        for(let boardIndex = 0; boardIndex < boardCount; boardIndex++) {
            this._project.boards[boardIndex] = {};
        }
    }

    /**
     * Get the board width or the number of pegs across a single board. This value can not be changed.
     * @returns {!number} width of a board.
     */
    getBoardWidth() {
        return this._project.boardWidth;
    }

    /**
     * Get the board height or the number of pegs down a single board. This value can not be changed.
     * @returns {!number} height of a board.
     */
    getBoardHeight() {
        return this._project.boardHeight;
    }

    /**
     * Get the number of boards across.
     * @returns {!number} number of boards across.
     */
    getBoardsAcross() {
        return this._project.boardsAcross;
    }

    /**
     * Get the number of boards down.
     * @returns {!number} number of boards down.
     */
    getBoardsDown() {
        return this._project.boardsDown;
    }

    /**
     * Get the number of pegs across the entire project.
     * @returns {!number} number of pegs across.
     */
    getPegsAcross() {
        return this.getBoardWidth() * this.getBoardsAcross();
    }

    /**
     * Get the number of pegs down the entire project.
     * @returns {!number} number of pegs down.
     */
    getPegsDown() {
        return this.getBoardHeight() * this.getBoardsDown();
    }

    /**
     * Get a count of the number of boards used in the project.
     * @returns {!number} number of boards used in the project.
     */
    getBoardCount() {
        return this._project.boards.length;
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
        this.addBoardColumn(this.getBoardsAcross());
    }

    /**
     * Add a column of boards at the specified index.
     * @param {!number} columnIndex is the index to add the column of boards to.
     */
    addBoardColumn(columnIndex) {
        if (!this.isNumberInRange(columnIndex, 0, this.getBoardsAcross())) {
            logger.warn(`${columnIndex} is invalid column index. Column not added.`, this.constructor.name);
            return;
        }

        logger.debug(`Inserting column of boards at index ${columnIndex}`, this.constructor.name);

        this._project.boardsAcross++;

        const boardCount = this.getBoardCount();
        for(let i = columnIndex; i < boardCount + this.getBoardsDown(); i += this.getBoardsAcross()) {
            logger.debug(`Inserting board at index ${i}`, this.constructor.name);
            this._project.boards.splice(i, 0, {});
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
        if (!this.isNumberInRange(rowIndex, 0, this.getBoardCount()) || rowIndex % this.getBoardsAcross() !== 0) {
            logger.warn(`${rowIndex} is invalid row index. Row not added.`, this.constructor.name);
            return;
        }

        logger.debug(`Inserting row of boards at index ${rowIndex}`, this.constructor.name);

        this._project.boardsDown++;

        for(let i = rowIndex; i < rowIndex + this.getBoardsAcross(); i++) {
            logger.debug(`Inserting board at index ${i}`, this.constructor.name);
            this._project.boards.splice(i, 0, {});
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
        this.removeBoardColumn(this.getBoardsAcross() - 1);
    }

    /**
     * Remove a column of boards at the specified index.
     * @param {!number} columnIndex is the index to remove the column from.
     */
    removeBoardColumn(columnIndex) {
        if (!this.isNumberInRange(columnIndex, 0, this.getBoardsAcross() - 1)) {
            logger.warn(`${columnIndex} is invalid column index. Column not removed.`, this.constructor.name);
            return;
        }

        if (this.getBoardsAcross() === 1) {
            logger.warn(`No more columns can be removed.`, this.constructor.name);
            return;
        }

        logger.debug(`Removing column of boards at index ${columnIndex}`, this.constructor.name);

        const boardCount = this.getBoardCount();
        for(let i = boardCount - this.getBoardsAcross() + columnIndex; i >= 0; i -= this.getBoardsAcross()) {
            logger.debug(`Removing board at index ${i}`, this.constructor.name);
            this._project.boards.splice(i, 1);
        }

        this._project.boardsAcross--;
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
        this.removeBoardRow(this.getBoardCount() - this.getBoardsAcross());
    }

    /**
     * Remove a row of boards at the specified index.
     * @param {!number} rowIndex is the index to remove the row from.
     */
    removeBoardRow(rowIndex) {
        if (!this.isNumberInRange(rowIndex, 0, this.getBoardCount() - this.getBoardsAcross()) ||
                rowIndex % this.getBoardsAcross() !== 0) {
            logger.warn(`${rowIndex} is invalid row index. Row not removed.`, this.constructor.name);
            return;
        }

        if (this.getBoardsDown() === 1) {
            logger.warn(`No more rows can be removed.`, this.constructor.name);
            return;
        }

        logger.debug(`Removing row of boards at index ${rowIndex}`, this.constructor.name);

        for(let i = rowIndex + this.getBoardsAcross() - 1; i >= rowIndex; i--) {
            logger.debug(`Removing board at index ${i}`, this.constructor.name);
            this._project.boards.splice(i, 1);
        }

        this._project.boardsDown--;
    }

    /**
     * Get the bead at the specified location or null if there is no bead.
     *
     * @param {!number} board is the board index number containing the bead.
     * @param {!number} x is the x coordinate of the bead.
     * @param {!number} y is the y coordinate of the bead.
     * @returns {?Bead} Bead or undefined if there is no bead.
     */
    getBead(board, x, y) {
        const { boards, beads } = this._project;
        const beadIndex =  get(boards[board], `[${x}][${y}]`, -1);
        if (beadIndex >= 0) {
            return beads[beadIndex].bead;
        }

        return undefined;
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
        if (!this.isNumberInRange(board, 0, this.getBoardCount() - 1)) {
            logger.warn(`${board} is invalid board index. Bead not placed.`, this.constructor.name);
            return;
        }

        if (!this.isNumberInRange(x, 0, this.getBoardWidth() - 1)) {
            logger.warn(`${x} is invalid x coordinate. Bead not placed.`, this.constructor.name);
            return;
        }

        if (!this.isNumberInRange(y, 0, this.getBoardHeight() - 1)) {
            logger.warn(`${y} is invalid y coordinate. Bead not placed.`, this.constructor.name);
            return;
        }

        logger.debug(`Inserting ${bead} at ${board}: ${x}, ${y}.`, this.constructor.name);

        // Get the current bead at the specified position and decrement it's count or remove if needed.
        const oldBead = this.getBead(board, x, y);
        if (oldBead !== undefined) {
            const beadIndex = this.getBeadIndex(oldBead);
            if (beadIndex >= 0) {
                if (this._project.beads[beadIndex].count <= 1) {
                    this._project.beads.splice(beadIndex, 1);
                } else {
                    this._project.beads[beadIndex].count--;
                }
            }

            logger.debug(`Decremented original bead count.`, this.constructor.name);
        }

        if (bead) {
            let beadIndex = this.getBeadIndex(bead);
            if (beadIndex >= 0) {
                this._project.beads[beadIndex].count++;
            } else {
                beadIndex = this._project.beads.push({ bead, count: 1 }) - 1;
            }

            // Place bead
            set(this._project.boards[board], `[${x}][${y}]`, beadIndex);
        } else {
            // Remove bead
            delete this._project.boards[board][x][y];

        }

        logger.debug(`Placed new bead and incremented count.`, this.constructor.name);
    }

    /**
     * Get the count of the specified bead used in the project.
     * @param {!Bead} bead is the bead to get the count for.
     * @returns {!number} count of specified bead used.
     */
    getBeadCount(bead) {
        const beadIndex = this.getBeadIndex(bead);
        if (beadIndex >= 0) {
            return this._project.beads[beadIndex].count;
        }

        return 0;
    }

    /**
     * Get a list of beads used in the project.
     * @returns {!Array} list of beads used.
     */
    getBeadsUsed() {
        return this._project.beads.map(bead => bead.bead);
    }

    /**
     * Get a list of all beads and their position.
     *
     * @returns {Array} array of objects that contain the bead and it's board, x, y coordinates.
     */
    getAllBeads() {
        let beadList = [];

        for(let boardIndex = 0; boardIndex < this.getBoardCount(); boardIndex++) {
            Object.keys(this._project.boards[boardIndex]).forEach((x) => {
                Object.keys(this._project.boards[boardIndex][x]).forEach((y) => {
                    beadList.push({
                        boardIndex,
                        boardX: x,
                        boardY: y,
                        bead: this._project.beads[this._project.boards[boardIndex][x][y]]
                    });
                });
            });
        }

        return beadList;
    }

    /**
     * Helper method to get the index of a given bead.
     *
     * @param bead is the bead to get the index for.
     * @returns {number} is the bead index.
     */
    getBeadIndex(bead) {
        return this._project.beads.findIndex((beadInfo) => isEqual(beadInfo.bead, bead));
    }

    /**
     * Helper method to determine if a value is a number and is in range [min, max].
     *
     * @param number is the number to be checked.
     * @param minimum is the minimum value the number can be, if minimum is not defined then this check will be skipped.
     * @param maximum is the maximum value the number can be, if maximum is not defined then this check will be skipped.
     * @returns {boolean} true if the number is a number and in range.
     */
    isNumberInRange(number, minimum, maximum) {
        if (typeof number !== 'number') {
            return false;
        }

        if (typeof minimum === 'number' && number < minimum) {
            return false;
        }

        return (typeof maximum === 'number') ? number <= maximum : true;
    }
}
