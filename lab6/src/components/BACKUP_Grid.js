/*
    This file is me practicing making components and learning how different files link together and communicate.
    Also, this will be useful for my final project, since my Sudoku board would be displayed in an HTML table.
*/

import './Grid.css'
import $ from 'jquery';

// Mimic input from my Python script: a 2-dimension array of values representing the Sudoku board
window.grid_size = 4;
window.sudoku_board = [];

function initialize_grid() {
    if (window.sudoku_board.length != []) {
        console.log("Board not empty.");
        return;
    }
    console.log("Board empty.");
    let temp_board = [];
    for (let i = 0; i < window.grid_size; i++) {
        let row = [];
        for (let j = 0; j < window.grid_size; j++) {
            row.push("");
        }
        temp_board.push(row);
    }
    window.sudoku_board = temp_board;
}


function Grid() {
    initialize_grid();
    // Reformat the Sudoku board with HTML tags
    let board = []
    //console.log('In Grid():', window.sudoku_board);
    
    for (let i = 0; i < window.sudoku_board.length; i++) {
        let row = [];
        for (let j = 0; j < window.sudoku_board.length; j++) {
            row.push(<td>{window.sudoku_board[i][j]}</td>); 
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


// Constantly fetch data given by the Python script running through Flask on port 5000 and endpoint 'data'
$(document).ready(function() {
  function fetchData() {
    $.ajax({
      url: 'http://localhost:5000/data', // Replace this with your server URL
      method: 'GET',
      success: function(response) {
        // Handle received data
        console.log('Received data:', response);
        window.sudoku_board = response;
        
        // Call fetchData again to initiate the next long polling request
        fetchData();
      },
      error: function(xhr, status, error) {
        // Handle error
        console.error('Error fetching data:', error);

        // Retry after a delay
        setTimeout(fetchData, 5000); // Retry after 5 seconds
      }
    });
  }

  // Start fetching data
  fetchData();
});


$(document).ready(function() {
  $('#makeSudoku').click(function() {
    $.ajax({
      url: 'http://localhost:5000/trigger-python-function', // Replace this with your server URL
      method: 'GET',
      success: function(response) {
        // Handle the response from the server
        console.log('Response from Python:', response);
        window.sudoku_board = response;
      },
      error: function(xhr, status, error) {
        // Handle errors
        console.error('Error triggering Python function:', error);
      }
    });
  });
});




export default Grid;
