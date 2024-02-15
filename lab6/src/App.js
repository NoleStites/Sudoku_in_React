import logo from './logo.svg';
import List from './components/List'; // Call the 'List' function with the custom tag <List />
import './App.css';

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

export default App;
