# Sudoku to React

## About the Project
This repository builds upon my original [Sudoku Wave Collapse] (https://github.com/NoleStites/Sudoku-Wave-Collapse-Function) repository
by piping the Sudoku board to a React app frontend rather than a tkinter GUI. To accomplish this, the Python script has been converted into
a Flask application that the React script can communicate with to send and retreive information. The React app periodically retreives the
state of the Sudoku board as it is being generated and displays it on the frontend, allowing for a way to see a form of 'animated generation'.

## Setup Instructions
The following instruction assume that you have Node.js set up properly in your terminal of choice.     
     
1. Clone and enter the repository    
`git clone https://github.com/NoleStites/Sudoku_in_React.git`    
`cd Sudoku_in_React`   
2. Install some node packages   
`npm install jquery`      
`npm instal react-scripts`     
3. Make and activate a Python virtual environment    
`python3 -m venv env`       
`source env/bin/activate`      
4. Install the requirements for the Python script   
`pip install -r requirements.txt`        
5. Open a second terminal     
6. In one terminal, start the Flask application and server     
`python3 src/sudoku_code/Sudoku.py`           
> IMPORANT: the server should be running on port 5000     
7. In the other terminal, start the React app   
`cd src`       
`npm start`        
8. The React app should automatically open in your browser, but if it does not, go to http://localhost:3000.    
