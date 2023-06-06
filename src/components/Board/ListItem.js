import { Fragment, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";

const ListItem = ({item, index, moveListItem}) => {

    const ref = useRef(null);
    

    const [, dropRef] = useDrop({
        accept: "ITEM",
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
        
            const dragIndex = item.index;
            const hoverIndex = index;


            if (dragIndex === hoverIndex) {
                return;
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            moveListItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{isDragging}, dragRef] = useDrag(() => ({
        type: "ITEM",
        item: {index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    dragRef(dropRef(ref));

    return (
        <Fragment>
            <div 
                type="button" 
                className="btn btn-warning mb-3"
                style={{border: isDragging ? "2px solid grey" : "0px"}} 
                ref={ref}
                onClick={onOpen}
            >
                {item.name}
            </div>
            <Window 
                item={item}
                show={show}
                onClose={onClose}
            />
        </Fragment>
    );

};

export default ListItem;