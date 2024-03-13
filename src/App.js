import Grid from './components/Grid'; // Call the 'Grid' function with the custom tag <Grid />
import './App.css';
import { useState, useEffect } from 'react';
import $ from 'jquery';

/*======================
    HELPER FUNCTIONS    
======================*/

// This function creates an 'empty' square 2D array of a given size
function initialize_grid(size) {
    let temp_board = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push("");
        }
        temp_board.push(row);
    }
    return temp_board;
}


// This function converts a 2D array of integers into an HTML table to be shown on the React app
function format_grid_html(grid) {
    let board = []
    for (let i = 0; i < grid.length; i++) {
        let row = [];
        for (let j = 0; j < grid.length; j++) {
            row.push(<td key={j}>{grid[i][j]}</td>);
        }
        board.push(<tr key={i}>{row}</tr>);
    }
    console.log(board)
    return board;
}

/*======================
    THE APPLICATION    
======================*/
function App() {
    // Define the default state for the Grid component
    //let grid_size = 9
    const [grid_size, setGridSize] = useState(
        9
    );
    const [twoDArray, setTwoDArray] = useState(
        format_grid_html(initialize_grid(grid_size)) // The state is a 2D array representing an HTML table
    );


    // Define a function that will start the board generation
    const generateBoard = () => {
        // AJAX is a technology used to read data from and send data to a web server (in our case, Flask)
        $.ajax({
            // Access a second endpoint in the Flask application
            url: 'http://localhost:5000/generateOneValue',
            method: 'GET',

            // Receive the response from the Flask application
            success: function(response) {
                console.log('Response from Python:', response);
                
                // Convert the returned 2D array into HTML and set it as the current state of the board
                setTwoDArray(format_grid_html(response['grid']));
                if (response['isGenerated']) { // The board is done, so stop fetching the state of the board
                    return;
                }
                else { // The board is not done generating, so fetch the next state
                    generateBoard();
                }
            },
            error: function(xhr, status, error) {
                console.error('Error triggering Python function in generateBoard:', error);
            }
        });
    }


    // Define a function that will first clear the board and call the function to generate a new one
    const beginAlgorithm = () => {
        console.log('grid_size: ' + grid_size)
        // 1. Clear the board
        $.ajax({
            // Specify the port of the Flask application and the endpoint to use
            url: 'http://localhost:5000/clear_board?board_size=' + grid_size,
            method: 'GET',

            // Receive the data returned by the Python function at the endpoint
            success: function(response) {
                console.log('Response from Python:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error triggering Python function in beginAlgorithm:', error);
            }
        });

        // 2. Generate a new filled-in board
        generateBoard();
    }
    

    // This function and following hook will change the size of the Sudoku board    
    const changeGridSize = (new_size) => {
        setGridSize(new_size);
    }
    
    // A hook that will execute the give function if the given state (grid_size) changes. This was a way to solve a race condition.
    useEffect(() => {
        console.log('Grid size changed:', grid_size);
        setTwoDArray(format_grid_html(initialize_grid(grid_size)));
    }, [grid_size]);    


    // Return the contents of the app
    return (
        <div className="App">
            <header className="App-header">

                <div id="left">
                    <h1>Sudoku Board Generation</h1><hr />

                    <label htmlFor="size">Choose a board size</label>
                    <div id="flex_buttons">
                        <button id="size" onClick={() => changeGridSize(4)}>4x4</button>
                        <button id="size" onClick={() => changeGridSize(9)}>9x9</button>
                        <button id="size" onClick={() => changeGridSize(16)}>16x16</button>
                        <button id="size" onClick={() => changeGridSize(25)}>25x25</button>
                        <button id="size" onClick={() => changeGridSize(36)}>36x36</button>
                        <button id="size" onClick={() => changeGridSize(49)}>49x49</button>
                    </div>

                    <button id="makeSudoku" onClick={beginAlgorithm}>Generate</button>
                </div>


                <div id="right">
                    <Grid state={twoDArray} /> {/* Send the board state as a prop to the Grid component to be rerendered whenever the board state changes */}
                </div>

            </header>
        </div>
    );
}

export default App;
