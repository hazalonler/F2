
function TaskList (props) {

    return (
        <li>
            <p className="mb-2 mr-2 ml-2" style={{backgroundColor: "lavender"}}>{props.name}</p>
        </li>
    );

};

export default TaskList;