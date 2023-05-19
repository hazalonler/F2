import ListItem from "./ListItem";


const BoardList =  (props) => {

    return (
        <div className="col-lg mt-3 ml-3 shadow-lg p-3 rounded" style={props.style} >
            <h4>{props.name}</h4>
            <ul className="list-unstyled">
                {props.tasks.map((task) => (
                    <ListItem name={task.name} date={task.date}/>
                ))}
            </ul>
        </div>
    );
};

export default BoardList;