import logo from './logo.svg';
import List from './components/List'; // Call the 'List' function with the custom tag <List />
import Grid from './components/Grid'; // Call the 'Grid' function with the custom tag <Grid />
import './App.css';
import $ from 'jquery';

// Define variables for use in the app
/*
const h1_styles = {
    'color': 'orange',
    'text-decoration-line': 'underline'
};
*/

const span_styles = {
    'color': 'orange',
    'text-decoration-line': 'underline'
};

const rand_num_styles = {
    'color': 'green'
};

const greeting_styles = {
    'color': 'yellow'
};

const name = "Nole Stites"

let random_number = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100

// Determine the time-of-day greeting
const curr_date = new Date();
const hour = curr_date.getHours(); // 0-23

let greeting = "";
if (hour < 12) {greeting = "Good morning!";} // 12:00
else if (hour < 18) {greeting = "Good afternoon!";} // 6:00
else {greeting = "Good evening!";} // past 6:00


// Create a function for returning the app
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1><span style={span_styles}>Step 3 Heading:</span> {name}</h1>
        <h2 style={greeting_styles}>{greeting}</h2>
        <List />
        <p>Your random number is: <span style={rand_num_styles}>{random_number}</span></p>
        <Grid />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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


export default App;
