class Cell {
    constructor() {
        this.state = 0;
        this.nextState = 0;
        this.cellElement;
    }

    setCellElement(cell) {
        this.cellElement = cell;
    }

    getState() {
        return this.state;
    }

    processState(grid, x, y, size) {
        this.setState(this.getNeighborsStatesSum(grid, x, y, size));
    }

    getNeighborsStatesSum(grid, x, y, size) {
        let stateSum = 0;

        // upper 3 neighbors
        if (y > 0) {
            stateSum += grid[y-1][x].getState();
            if (x > 0) {
                stateSum += grid[y-1][x-1].getState();
            }
            if (x < size - 1) {
                stateSum += grid[y-1][x+1].getState();
            }
        }

        // lower 3 neighbors
        if (y < size - 1) {
            stateSum += grid[y+1][x].getState();
            if (x > 0) {
                stateSum += grid[y+1][x-1].getState();
            }
            if (x < size - 1) {
                stateSum += grid[y+1][x+1].getState();
            }
        }

        // left neighbor
        if (x > 0) {
            stateSum += grid[y][x-1].getState();
        }

        // right neighbor
        if (x < size - 1) {
            stateSum += grid[y][x+1].getState();
        }

        return stateSum;
    }

    setState(stateSum) {
        // "Any live cell with two or three live neighbours survives."
        if (this.state === 1 && (stateSum === 2 || stateSum === 3)) {
            this.nextState = this.state;
            return;
        }

        // "Any dead cell with three live neighbours becomes a live cell."
        if (this.state === 0 && stateSum === 3) {
            this.nextState = 1;
            return;
        }

        // "All other live cells die in the next generation. Similarly, all other dead cells stay dead."
        this.nextState = 0;
        return;
    }

    evolve() {
        this.state = this.nextState;
        if (this.state === 0) {
            this.cellElement.setAttribute("style", "background-color: white");
        } else {
            this.cellElement.setAttribute("style", "background-color: black");
        }
    }

    setStateAdmin(num) {
        this.state = num;
    }
}

export default Cell;