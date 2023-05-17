
function TaskList (props) {

    return (
        <li>
            <div className="col-sm mb-2 mr-4" style={{backgroundColor: "lavender"}}>
                <p>{props.name}</p>
            </div>
        </li>
    );

};

export default TaskList;