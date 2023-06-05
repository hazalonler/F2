import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ListItem = ({name, index, moveListItem}) => {

    const [{isDragging}, dragRef] = useDrag(() => ({
        type: "ITEM",
        item: {index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    

    const [spec, dropRef] = useDrop({
        accept: "ITEM",
        hover(item, monitor) {
        
            const dragIndex = item.index;
            const hoverIndex = index;
            const hoveredRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const hoverClientY = monitor.getClientOffset().y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveListItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref))

    return (
            <div 
                type="button" 
                className="btn btn-warning mb-3"
                style={{border: isDragging ? "2px solid grey" : "0px"}} 
                ref={dragDropRef}    
            >
                {name}
            </div>
    );

};

export default ListItem;

// style={{backgroundColor: "lavender"}}