import TaskList from "./TaskList";


const BoardColumn =  (props) => {

    return (
        <div className="col-sm mr-3"  style={props.style}>
            <h4>{props.name}</h4>
            <ul className="list-unstyled">
                {props.tasks.map((task) => (
                    <TaskList name={task.name} date={task.date}/>
                ))}
            </ul>
        </div>
    );
};

export default BoardColumn;