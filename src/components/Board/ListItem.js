import { Fragment, useRef, useState, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "../PopUpPage/Window";
import BoardClient from "../../store/BoardClient";
import TaskContext from "../../store/task-ctx";
import "../Board/CSS-Folder/ListItem.css"
import { Lexorank } from "../../index/Lexorank";
import ListContext from "../../store/list-ctx";

const ListItem = ({refresh}) => {

    const ctx = useContext(TaskContext);
    const listCtx = useContext(ListContext);
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

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            

            if (hoverClientY < hoverMiddleY) { 
                if (listCtx.id === ctx.listId) {
                    listCtx.list.map((task, index) => {
                    if (ctx.indexTask-1 === index && ctx.indexTask !== 0 ) {
                        let [rank,ok] = lexorank.insert(task.priority.toString(), ctx.priority);
                        dragItem.priority = rank;
                    } else if(ctx.indexTask === 0) {
                        let [rank,ok] = lexorank.insert('', ctx.priority);
                        dragItem.priority = rank;    
                    } 
                    }) 
                }
            }
    
            if (hoverClientY > hoverMiddleY ) {
                if (listCtx.id === ctx.listId) {
                    listCtx.list.map((task, index) => {
                        if (ctx.indexTask+1 === index && ctx.indexTask !== listCtx.list.lenght-1) {
                            let [rank,ok] = lexorank.insert(ctx.priority, task.priority.toString());
                            dragItem.priority = rank;
                        } else if(ctx.indexTask === listCtx.list.length-1) {
                            let [rank,ok] = lexorank.insert(ctx.priority, '');
                            dragItem.priority = rank;
                        }
                    })
                }
            }


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
        },
    }));

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    const dragdropRef = dragRef(dropRef(ref));

    return (
        <Fragment>
            <div 
                className="list-item"
                style={{opacity: isDragging || isOver ? "0" : "1"}} 
                ref={dragdropRef}
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