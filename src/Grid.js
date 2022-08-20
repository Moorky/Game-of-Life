import Cell from './Cell.js'

class Grid {
    constructor(size) {
        this.grid = [];

        this.createCells(size);
    }

    createCells(size) {
        let xCells = []
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                xCells.push(new Cell());
            }
            this.grid.push(xCells);
            xCells = [];
        }
    }

    getGrid() {
        return this.grid;
    }
}

export default Grid;