import { Fragment, useRef, useState, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import BoardClient from "../../store/BoardClient";
import TaskContext from "../../store/task-ctx";

const ListItem = ({refresh}) => {

    const ctx = useContext(TaskContext);

    const ref = useRef(null);

    const [ { isOver }, dropRef] = useDrop({
        accept: "ITEM",
        hover(dragItem, monitor) {
            if (!ref.current) {
                return;
            }

            if(dragItem.id === ctx.id) {
                return;
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (hoverClientY < hoverMiddleY) {
                dragItem.priority = ctx.priority + 1
            }
    
            if (hoverClientY > hoverMiddleY ) {
                dragItem.priority = ctx.priority - 1
            }

            console.log("Empty of not?:" + ctx.name + ctx.listId);
            
            dragItem.listId = ctx.listId;
            BoardClient.updateListData(dragItem).then(() => {
                refresh();
            });
        },

        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const [{isDragging}, dragRef] = useDrag(() => ({
        type: "ITEM",
        item: {...ctx},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => {
            refresh();
        }
    }));

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    dragRef(dropRef(ref));

    let shownName = ctx.name;

    if (shownName.length > 20) {
        shownName = shownName.slice(0,20) + "..."
    }


    return (
        <Fragment>
            <div 
                type="button" 
                className="d-flex flex-column mb-2"
                style={{opacity: isDragging || isOver ? "0" : "1"}} 
                ref={ref}
                onClick={onOpen}
            >
                <div 
                    className="btn" 
                    style={{
                        borderRadius: "12px", 
                        backgroundColor: "rgb(255, 178, 178)", 
                        borderColor: "rgb(255, 178, 178)"
                    }}
                >
                    {shownName}
                </div>
            </div>
            <Window 
                show={show}
                onClose={onClose}
            />
        </Fragment>
    );


};

export default ListItem;