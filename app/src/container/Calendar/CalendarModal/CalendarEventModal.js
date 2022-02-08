import React from 'react';
import Modal from 'react-bootstrap/Modal'
import {Button} from "react-bootstrap";


function CalendarEventModal(props) {
    const { click, ...others } = props
    return (
        <Modal
            {...others}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            className="modal-sure"
            centered>

            <Modal.Body>
                <h4>Ləğv etmək istədiyinizə <br/> əminsinizmi? </h4>
                <ul className="btn-block flex-end list-unstyled m-0">
                    <li>
                        <Button type="button" className="btn-main-border" onClick={props.onHide}>
                            Xeyr
                        </Button>
                    </li>
                    <li>
                        <Button type="button" className="btn-main" onClick={() => {
                            props.click(props.data.id, props.data.description, false, props.data.date)
                        }}>
                            Bəli
                        </Button>
                    </li>
                </ul>
            </Modal.Body>
        </Modal>
    );
}

export default CalendarEventModal
