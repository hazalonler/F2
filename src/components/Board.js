
import "./Board.css";
import TaskList from "./TaskList";

function Board () {

    const dummy_list = [
        {name: "Prepare a new board",
        date: new Date(2023, 4, 3)},
        {name: "Prepare a task list",
        date: new Date(2023, 5, 6)}
    ]
    
    return (
        <div>
            <div className="board">
                <h2 >Backlog</h2>
                <ul>
                    <TaskList name={dummy_list[0].name} date={dummy_list[0].date.toISOString()}/>
                    <TaskList name={dummy_list[1].name} date={dummy_list[1].date.toISOString()}/>
                </ul>
            </div>
            <button className="new-list-button">+ Add New List</button>
        </div>
    )
}

export default Board;