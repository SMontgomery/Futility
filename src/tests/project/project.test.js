import Project from '../../scripts/project/project';
import { perlerBeads } from '../../scripts/project/beads/perler';

describe('Test Project', () => {

    describe('Test construction', () => {

        test('Should construct Project.', () => {
            const boardWidth = 5;
            const boardHeight = 5;
            const boardsAcross = 1;
            const boardsDown = 1;

            const project = new Project(boardWidth, boardHeight, boardsAcross, boardsDown);
            expect(project).toBeTruthy();
            expect(project.getBoardWidth()).toBe(boardWidth);
            expect(project.getBoardHeight()).toBe(boardHeight);
            expect(project.getBoardsAcross()).toBe(boardsAcross);
            expect(project.getBoardsDown()).toBe(boardsDown);
            expect(project.getPegsAcross()).toBe(boardWidth * boardsAcross);
            expect(project.getPegsDown()).toBe(boardHeight * boardsDown);
        });

        test('Should throw exception due to invalid boardWidth.', () => {
            const boardWidth = undefined;
            const boardHeight = 5;
            const boardsAcross = 1;
            const boardsDown = 1;

            const createProject = () => new Project(boardWidth, boardHeight, boardsAcross, boardsDown);

            expect(createProject).toThrow();
        });

        test('Should throw exception due to invalid boardHeight.', () => {
            const boardWidth = 5;
            const boardHeight = undefined;
            const boardsAcross = 1;
            const boardsDown = 1;

            const createProject = () => new Project(boardWidth, boardHeight, boardsAcross, boardsDown);

            expect(createProject).toThrow();
        });

        test('Should throw exception due to invalid boardsAcross.', () => {
            const boardWidth = 5;
            const boardHeight = 5;
            const boardsAcross = undefined;
            const boardsDown = 1;

            const createProject = () => new Project(boardWidth, boardHeight, boardsAcross, boardsDown);

            expect(createProject).toThrow();
        });

        test('Should throw exception due to invalid boardsDown.', () => {
            const boardWidth = 5;
            const boardHeight = 5;
            const boardsAcross = 1;
            const boardsDown = undefined;

            const createProject = () => new Project(boardWidth, boardHeight, boardsAcross, boardsDown);

            expect(createProject).toThrow();
        });
    });

    describe('Test board changes', () => {

        const referenceBeadX = 1;
        const referenceBeadY = 1;
        let project;
        let referenceBead;

        beforeEach(() => {
            // Create project
            const boardWidth = 5;
            const boardHeight = 5;
            const boardsAcross = 3;
            const boardsDown = 3;
            project = new Project(boardWidth, boardHeight, boardsAcross, boardsDown);

            // Create and place reference bead
            referenceBead = perlerBeads[0];
            project.placeBead(4, referenceBeadX, referenceBeadY, referenceBead);
        });

        test('Should add a column of boards to the left.', () => {
            project.addBoardColumnToLeft();

            expect(project.getBoardsAcross()).toBe(4);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(12);
            expect(project.getBead(6, referenceBeadX, referenceBeadY)).toBe(referenceBead);
        });

        test('Should add a column of boards to the right.', () => {
            project.addBoardColumnToRight();

            expect(project.getBoardsAcross()).toBe(4);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(12);
            expect(project.getBead(5, referenceBeadX, referenceBeadY)).toBe(referenceBead);
        });

        test('Should add a row of boards to the top.', () => {
            project.addBoardRowToTop();

            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(4);
            expect(project.getBoardCount()).toBe(12);
            expect(project.getBead(7, referenceBeadX, referenceBeadY)).toBe(referenceBead);
        });

        test('Should add a row of boards to the bottom.', () => {
            project.addBoardRowToBottom();

            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(4);
            expect(project.getBoardCount()).toBe(12);
            expect(project.getBead(4, referenceBeadX, referenceBeadY)).toBe(referenceBead);
        });

        test('Should remove a column of boards from the left.', () => {
            project.removeBoardColumnFromLeft();

            expect(project.getBoardsAcross()).toBe(2);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(6);
            expect(project.getBead(2, referenceBeadX, referenceBeadY)).toBe(referenceBead);
        });

        test('Should remove a column of boards from the right.', () => {
            project.removeBoardColumnFromRight();

            expect(project.getBoardsAcross()).toBe(2);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(6);
            expect(project.getBead(3, referenceBeadX, referenceBeadY)).toBe(referenceBead);
        });

        test('Should remove a row of boards from the top.', () => {
            project.removeBoardRowFromTop();

            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(2);
            expect(project.getBoardCount()).toBe(6);
            expect(project.getBead(1, referenceBeadX, referenceBeadY)).toBe(referenceBead);
        });

        test('Should remove a row of boards from the bottom.', () => {
            project.removeBoardRowFromBottom();

            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(2);
            expect(project.getBoardCount()).toBe(6);
            expect(project.getBead(4, referenceBeadX, referenceBeadY)).toBe(referenceBead);
        });

        test('Should not add a column of boards due to invalid board number.', () => {
            project.addBoardColumn(-1);

            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(9);
            expect(project.getBead(4, referenceBeadX, referenceBeadY)).toBe(referenceBead);

            project.addBoardColumn(10);

            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(9);
            expect(project.getBead(4, referenceBeadX, referenceBeadY)).toBe(referenceBead);
        });

        test('Should not add a row of boards due to invalid board number.', () => {
            project.addBoardRow(-1);

            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(9);
            expect(project.getBead(4, referenceBeadX, referenceBeadY)).toBe(referenceBead);

            project.addBoardRow(10);

            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(9);
            expect(project.getBead(4, referenceBeadX, referenceBeadY)).toBe(referenceBead);
        });

        test('Should not remove a column of boards due to invalid board number.', () => {
            project.removeBoardColumn(-1);

            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(9);
            expect(project.getBead(4, referenceBeadX, referenceBeadY)).toBe(referenceBead);

            project.removeBoardColumn(10);

            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(9);
            expect(project.getBead(4, referenceBeadX, referenceBeadY)).toBe(referenceBead);
        });

        test('Should not remove a row of boards due to invalid board number.', () => {
            project.removeBoardRow(-1);

            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(9);
            expect(project.getBead(4, referenceBeadX, referenceBeadY)).toBe(referenceBead);

            project.removeBoardRow(10);

            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(9);
            expect(project.getBead(4, referenceBeadX, referenceBeadY)).toBe(referenceBead);
        });

        test('Should not remove a column of boards due to reaching minimum size of 1.', () => {
            project.removeBoardColumn(0);
            expect(project.getBoardsAcross()).toBe(2);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(6);

            project.removeBoardColumn(0);
            expect(project.getBoardsAcross()).toBe(1);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(3);

            project.removeBoardColumn(0);
            expect(project.getBoardsAcross()).toBe(1);
            expect(project.getBoardsDown()).toBe(3);
            expect(project.getBoardCount()).toBe(3);
        });

        test('Should not remove a row of boards due to reaching minimum size of 1.', () => {
            project.removeBoardRow(0);
            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(2);
            expect(project.getBoardCount()).toBe(6);

            project.removeBoardRow(0);
            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(1);
            expect(project.getBoardCount()).toBe(3);

            project.removeBoardRow(0);
            expect(project.getBoardsAcross()).toBe(3);
            expect(project.getBoardsDown()).toBe(1);
            expect(project.getBoardCount()).toBe(3);
        });

    });

    describe('Test bead placement', () => {

        test('Should place a bead in the bottom right of the board.', () => {
            const boardWidth = 2;
            const boardHeight = 2;
            const boardsAcross = 1;
            const boardsDown = 1;
            const project = new Project(boardWidth, boardHeight, boardsAcross, boardsDown);
            const bead = perlerBeads[0];

            project.placeBead(0, 1, 1, bead);
            expect(project.getBead(0, 1, 1)).toBe(bead);
            expect(project.getBeadCount(bead)).toBe(1);
            expect(project.getBeadsUsed().length).toBe(1);
        });

        test('Should remove a bead.', () => {
            const boardWidth = 2;
            const boardHeight = 2;
            const boardsAcross = 1;
            const boardsDown = 1;
            const project = new Project(boardWidth, boardHeight, boardsAcross, boardsDown);
            const bead = perlerBeads[0];

            project.placeBead(0, 1, 1, bead);
            expect(project.getBead(0, 1, 1)).toBe(bead);
            expect(project.getBeadCount(bead)).toBe(1);
            expect(project.getBeadsUsed().length).toBe(1);

            project.placeBead(0, 1, 1, null);
            expect(project.getBead(0, 1, 1)).toBe(undefined);
            expect(project.getBeadCount(bead)).toBe(0);
            expect(project.getBeadsUsed().length).toBe(0);
        });

        test('Should do nothing when placing a bead out of bounds (board out of bounds).', () => {
            const boardWidth = 2;
            const boardHeight = 2;
            const boardsAcross = 1;
            const boardsDown = 1;
            const project = new Project(boardWidth, boardHeight, boardsAcross, boardsDown);
            const bead = perlerBeads[0];

            project.placeBead(99, 0, 0, bead);
            expect(project.getBeadCount(bead)).toBe(0);
            expect(project.getBeadsUsed().length).toBe(0);
        });

        test('Should do nothing when placing a bead out of bounds. (x out of bounds)', () => {
            const boardWidth = 2;
            const boardHeight = 2;
            const boardsAcross = 1;
            const boardsDown = 1;
            const project = new Project(boardWidth, boardHeight, boardsAcross, boardsDown);
            const bead = perlerBeads[0];

            project.placeBead(0, 99, 0, bead);
            expect(project.getBeadCount(bead)).toBe(0);
            expect(project.getBeadsUsed().length).toBe(0);
        });

        test('Should do nothing when placing a bead out of bounds. (y out of bounds)', () => {
            const boardWidth = 2;
            const boardHeight = 2;
            const boardsAcross = 1;
            const boardsDown = 1;
            const project = new Project(boardWidth, boardHeight, boardsAcross, boardsDown);
            const bead = perlerBeads[0];

            project.placeBead(0, 0, 99, bead);
            expect(project.getBeadCount(bead)).toBe(0);
            expect(project.getBeadsUsed().length).toBe(0);
        });
    });

    describe('Test helper methods.', () => {

        let project;

        beforeEach(() => {
            // Create project
            const boardWidth = 5;
            const boardHeight = 5;
            const boardsAcross = 3;
            const boardsDown = 3;
            project = new Project(boardWidth, boardHeight, boardsAcross, boardsDown);
        });

        test('isNumberInRange should return true if a number is in range.', () => {
            expect(project.isNumberInRange(3, 0, 4)).toBe(true);
        });

        test('isNumberInRange should return true if a number is the minimum. (Minimum Inclusive)', () => {
            expect(project.isNumberInRange(3, 3, 4)).toBe(true);
        });

        test('isNumberInRange should return true if a number is the maximum. (Maximum Inclusive)', () => {
            expect(project.isNumberInRange(4, 3, 4)).toBe(true);
        });

        test('isNumberInRange should return true if the value is a number when no minimum or maximum defined', () => {
            expect(project.isNumberInRange(-100)).toBe(true);
        });

        test('isNumberInRange should return true if a number <= to maximum with no minimum', () => {
            expect(project.isNumberInRange(-100, undefined ,3)).toBe(true);
        });

        test('isNumberInRange should return true if a number >= to minimum with no maximum', () => {
            expect(project.isNumberInRange(100, 3)).toBe(true);
        });

        test('isNumberInRange should return false if value is not a number', () => {
            expect(project.isNumberInRange('1')).toBe(false);
        });

        test('isNumberInRange should return false if value is < than minimum', () => {
            expect(project.isNumberInRange(-1, 0, 10)).toBe(false);
        });

        test('isNumberInRange should return false if value is > than maximum', () => {
            expect(project.isNumberInRange(11, 0, 10)).toBe(false);
        });
    });
});