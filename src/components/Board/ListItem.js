import { Fragment, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import BoardClient from "../../store/BoardClient";

const ListItem = ({item, refresh}) => {

    const ref = useRef(null);

    const [ { isOver }, dropRef] = useDrop({
        accept: "ITEM",
        hover(dragItem, monitor) {
            if (!ref.current) {
                return;
            }

            if(dragItem.id === item.id) {
                return;
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (hoverClientY < hoverMiddleY) {
                dragItem.priorty = item.priorty + 1
            }
    
            if (hoverClientY > hoverMiddleY) {
                dragItem.priorty = item.priorty - 1
            }
    
            dragItem.listId = item.listId;
            BoardClient.updateListIdPr(dragItem);
            refresh(); // item in oldugu listi refresh ediyor
        },

        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const [{isDragging}, dragRef] = useDrag(() => ({
        type: "ITEM",
        item: {...item},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end (item, monitor) {
            refresh(); // dragitem in oldugu listi refresh ediyor
        } 
    }));

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    dragRef(dropRef(ref));

    return (
        <Fragment>
            <div 
                type="button" 
                className="d-flex flex-column"
                style={{opacity: isDragging || isOver ? "0" : "1"}} 
                ref={ref}
                onClick={onOpen}
            >
                <div className="btn btn-warning mb-2">{item.name}</div>
            </div>
            <Window 
                task={item}
                show={show}
                onClose={onClose}
            />
        </Fragment>
    );

};

export default ListItem;