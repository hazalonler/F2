import { Fragment, useRef, useState, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "../PopUpPage/Window";
import BoardClient from "../../store/BoardClient";
import TaskContext from "../../store/task-ctx";
import "../Board/CSS-Folder/ListItem.css"
import { Lexorank } from "../../index/Lexorank";

const ListItem = ({refresh}) => {

    const ctx = useContext(TaskContext);

    const ref = useRef(null);

    let lexorank = new Lexorank(); 

    const [ { isOver }, dropRef] = useDrop({
        accept: "ITEM",
        hover(dragItem, monitor) {
            if (!ref.current) {
                return;
            }

            if(dragItem.id === ctx.id) {
                return;
            }

            console.log("Before hover with hovered item:" + ctx.name + " " + ctx.priority);

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (hoverClientY < hoverMiddleY) {
                /* let [rank, ok] = lexorank.insert(item1Rank, item2Rank) 
                dragItem.priority = rank */
                dragItem.priority = ctx.priority + 1
            }
    
            if (hoverClientY > hoverMiddleY ) {
                /* let [rank, ok] = lexorank.insert(item1Rank, item2Rank)
                dragItem.priority = rank */
                dragItem.priority = ctx.priority - 1
            }

            console.log("After hover with hovered item:" + ctx.name + " " + ctx.priority);
            console.log("After hover with draged item:" + dragItem.name + " " + dragItem.priority)
            
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
            console.log("Ended Item:" + item);
            refresh();
        }
    }));

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    dragRef(dropRef(ref));

    return (
        <Fragment>
            <div 
                className="list-item"
                style={{opacity: isDragging || isOver ? "0" : "1"}} 
                ref={ref}
                onClick={onOpen}
            >
                {ctx.name.length>20 ? ctx.name.slice(0,20) + "..." : ctx.name}   
            </div>
            <Window 
                show={show}
                onClose={onClose}
            />
        </Fragment>
    );


};

export default ListItem;