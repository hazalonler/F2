import NewTask from "../NewTask/NewTask";
import ListItem from "./ListItem";

const BoardList =  (props) => {
 
    const addNewTaskHandler = (newTask) => {

        const enteredTask = {
            ...newTask,
            listId: props.listId,
        };

        props.onAddNewTask(enteredTask);
    };


    return(
        <div className="col-lg mt-3 ml-3 shadow-lg p-3 rounded" style={props.style} >
            <h4>{props.name}</h4>
            <ul className="list-unstyled">
                {props.tasks.map((task) => (
                    <ListItem name={task.name} date={task.date}/>
                ))}
                <NewTask onAddTask={addNewTaskHandler}/>
            </ul>
        </div>
    );
};

export default BoardList;