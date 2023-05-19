
function ListItem (props) {

    return (
        <div className="d-grid gap-2">
            <button type="button" className="btn btn-warning mb-3" >
                {props.name}
            </button>
        </div>
    );

};

export default ListItem;

// style={{backgroundColor: "lavender"}}