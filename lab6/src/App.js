import logo from './logo.svg';
import './App.css';

// Define variables for use in the app
const h1_styles = {
    'color': 'orange',
    'text-decoration-line': 'underline'
};

// Create a function for returning the app
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={h1_styles}>Step 3 Heading</h1>
        <ul>
            <li>List Item 1</li>
            <li>List Item 2</li>
            <li>List Item 3</li>
        </ul>
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
