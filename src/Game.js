import Grid from './Grid.js'

window.onload = function () {
    let game = new Game(50);
    const startButton = document.getElementById("play");
    startButton.addEventListener("click", game.startGame.bind(game));
}

class Game {
    constructor(size) {
        this.grid = new Grid(size);

        this.documentGrid = document.querySelector(".grid");

        this.createGrid();
    }

    createGrid() {
        let index = 0;
        this.grid.getGrid().forEach((e, i) => {
            this.grid.getGrid()[i].forEach((a, j) => {
                this.createCellElements(i, j);
            })
            this.documentGrid.appendChild(document.createElement("br"));
        })
    }

    createCellElements(i, j) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        this.grid.getGrid()[i][j].setCellElement(cell);

        this.giveCellOnClickListener(cell, this.grid.getGrid()[i][j]);

        this.documentGrid.appendChild(cell);
    }

    giveCellOnClickListener(cellElement, cell) {
        cellElement.addEventListener("click", () => {
            if (cell.getState() === 0) {
                cellElement.setAttribute("style", "background-color: black");
                cell.setStateAdmin(1);

            } else {
                cellElement.setAttribute("style", "background-color: white");
                cell.setStateAdmin(0);
            }
        });
    }

    async startGame() {
        while (true) {
            await sleep(100);
            this.step();
        }
    }

    step() {
        this.grid.getGrid().forEach((e, i) => {
            this.grid.getGrid()[i].forEach((a, j) => {
                this.grid.getGrid()[i][j].processState(this.grid.getGrid(), j, i, this.grid.getGrid().length);
            })
        })

        this.grid.getGrid().forEach((e, i) => {
            this.grid.getGrid()[i].forEach((a, j) => {
                this.grid.getGrid()[i][j].evolve();
            })
        })
    }
}

function sleep(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}