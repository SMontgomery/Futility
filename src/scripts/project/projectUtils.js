
/**
 * Get a list of all beads and their position.
 *
 * @returns {Array} array of objects that contain the bead and it's board, x, y coordinates.
 */
export function getAllBeads(boards, beads) {
    let beadList = [];
    for(let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
        Object.keys(boards[boardIndex]).forEach((x) => {
            Object.keys(boards[boardIndex][x]).forEach((y) => {
                beadList.push({
                    boardIndex,
                    boardX: parseInt(x),
                    boardY: parseInt(y),
                    bead: beads[boards[boardIndex][x][y]].bead
                });
            });
        });
    }

    return beadList;
}
