import { useDrag } from "react-dnd";


const ListItem = (props) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: "ITEM",
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    return (
        <div 
            className="d-grid gap-2" 
            style={{border: isDragging ? "2px solid grey" : "0px"}} 
            ref={drag}
        >
            <div type="button" className="btn btn-warning mb-3" >
                {props.name}
            </div>
        </div>
    );

};

export default ListItem;

// style={{backgroundColor: "lavender"}}