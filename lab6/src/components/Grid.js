/*
    This file is me practicing making components and learning how different files link together and communicate.
    Also, this will be useful for my final project, since my Sudoku board would be displayed in an HTML table.
*/

import './Grid.css'

// Mimic input from my Python script: a 2-dimension array of values representing the Sudoku board
let grid_size = 6;
let sudoku_board = []; // Filled with random values for now

for (let i = 0; i < grid_size; i++) {
    let row = [];
    for (let j = 0; j < grid_size; j++) {
        row.push(getRandom()); 
    }
    sudoku_board.push(row);
}
console.log(sudoku_board);


function getRandom() {
    return Math.floor(Math.random() * 25) + 1;
}


function Grid() {    
    // Reformat the Sudoku board with HTML tags
    let board = []

    for (let i = 0; i < grid_size; i++) {
        let row = [];
        for (let j = 0; j < grid_size; j++) {
            row.push(<td>{sudoku_board[i][j]}</td>); 
        }
        board.push(<tr>{row}</tr>);
    }
   
    // Return the Sudoku board as an HTML table
    return (
        <div className="Grid">
            <table>
                {board}
            </table>
            <div id="gradient_box"></div>
        </div>
    );
}

export default Grid;
