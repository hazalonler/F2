import React from "react";
import { useDrop } from "react-dnd";
import BoardClient from "../../store/BoardClient"

const DropWrapper = ({ onDrop, children, id }) => {

    const board = BoardClient.getBoardConfig().listConfig

    const [{isOver}, drop] = useDrop({
        accept: "ITEM",
        canDrop: (item, monitor) => {
            const itemIndex = board.findIndex(si => si.id === item.listId);
            const idIndex = board.findIndex(si => si.id === id);
            return [itemIndex+1, itemIndex-1, itemIndex].includes(idIndex);
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, id);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className="d-flex p-3 bg-secondary text-white">
            {React.cloneElement(children, { isOver })}
        </div>
    );
};

export default DropWrapper;