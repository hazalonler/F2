import "./TaskList.css";

function TaskList (props) {

    return (
        <div className="task-item">
            <div >{props.name}</div>
            <div >{props.date}</div>
        </div>
    );

};

export default TaskList;