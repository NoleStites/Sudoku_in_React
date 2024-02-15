import logo from './logo.svg';
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

const name = "Nole Stites"

let random_number = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100


// Create a function for returning the app
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1><span style={span_styles}>Step 3 Heading:</span> {name}</h1>
        <ul>
            <li>List Item 1</li>
            <li>List Item 2</li>
            <li>List Item 3</li>
        </ul>
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
