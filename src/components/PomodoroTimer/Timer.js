import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Modal from "react-modal";
import { RxCross1 } from "react-icons/rx";


const Timer = ( {show, onClose}) => {

    Modal.setAppElement("#root");


    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            style={{content: {borderRadius: "15px", backgroundColor: "rgb(255, 204, 204)", width: "600px"}}}
        >
            <div style={{width: 200, height: 200}}>
                <CircularProgressbar value={25} text={`25%`} />
            </div>
            <RxCross1 
                type="button" 
                className="btn-close mt-2 rounded"
                size="20px" 
                onMouseOver={({target}) => target.style.backgroundColor="rgb(255, 186, 186)"} 
                onMouseOut={({target}) => target.style.backgroundColor="rgb(255, 204, 204)"} 
                onClick={onClose}
            >
            </RxCross1>
        </Modal>
    );
}

export default Timer;
