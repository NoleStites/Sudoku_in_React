import './Grid.css'


function Grid(props) {
    // Return the Sudoku board as an HTML table
    return (
        <div className="Grid">
            <table>
                <tbody>
                    {props.state}
                </tbody>
            </table>
            <div id="gradient_box"></div>
        </div>
    );
}


export default Grid;
