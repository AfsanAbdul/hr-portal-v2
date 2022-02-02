import React, {useEffect, useState, useCallback} from 'react';
import Modal from 'react-bootstrap/Modal'
import {Col, Form} from "react-bootstrap";
import TimePicker from "react-time-picker";

function WorkDayModal(props) {
    /*----------general-----------*/
    const [checkHoliday, setCheckHoliday] = useState(false);
    const [day, setDay] = useState('');
    const [checkRepeat, setCheckRepeat] = useState();

    /*first queue*/
    const [checkBreak, setCheckBreak] = useState();
    const [checkOverTime, setCheckOverTime] = useState();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [checkChangeTime, setCheckChangeTime] = useState(false);
    const [workHour, setWorkHour] = useState('');

    /*second queue*/
    const [checkBreak2, setCheckBreak2] = useState();
    const [checkOverTime2, setCheckOverTime2] = useState();
    const [startTime2, setStartTime2] = useState('');
    const [endTime2, setEndTime2] = useState('');
    const [checkChangeTime2, setCheckChangeTime2] = useState(false);
    const [workHour2, setWorkHour2] = useState('');


    const setBreakHour = (checkBreak) => {
        console.log('workHourSBReak', workHour)
        if (props.data.workHour !== 0) {
            checkChangeTime ?
                checkBreak ? setWorkHour(workHour - 1) : setWorkHour(workHour + 1)
                :
                checkBreak ? setWorkHour(props.data.workHour - 1) : setWorkHour(props.data.workHour)
        }


    }

    const setBreakHour2 = async (checkBreak2) => {
        if (props.data.workHour2 !== 0) {
            checkChangeTime2 ?
                checkBreak2 ? await setWorkHour2(workHour2 - 1) : await setWorkHour2(workHour2 + 1)
:
                checkBreak2 ? await setWorkHour2(props.data.workHour2 - 1) : await setWorkHour2(props.data.workHour2)


        }
    }
    useEffect(async () => {
        await setCheckHoliday(props.data.offDay);
        await setCheckRepeat(props.data.repeatFrom !== null ? 1 : 0);
        await setDay(props.data.repeatFrom);

        await setCheckBreak(props.data.breakHour);
        await setCheckOverTime(props.data.jobOnOffDay);
        await setStartTime(props.data.shiftFrom);
        await setEndTime(props.data.shiftTo);
        await setWorkHour(props.data.workHour !== 0 ? props.data.workHour : '');
        await setBreakHour(props.data.breakHour);

        await setCheckBreak2(props.data.breakHour2);
        await setCheckOverTime2(props.data.jobOnOffDay2);
        await setStartTime2(props.data.shiftFrom2);
        await setEndTime2(props.data.shiftTo2);
        await setWorkHour2(props.data.workHour2 !== 0 ? props.data.workHour2 : '');
        await setBreakHour2(props.data.breakHour2);
    }, [props]);


    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            className="modal-work-schedule"
            backdrop="static"
            centered>
            <Modal.Body>
                <h4> {props.data.name}, {props.data.weekday} </h4>
                <div className="holiday-in">
                    <div className="check-content flex-center">
                        <div className="check-block">
                            <label className="check-button">
                                <input type="checkbox"
                                       checked={checkHoliday}
                                       onChange={(e) => {
                                           setCheckHoliday(e.target.checked);
                                           e.target.checked ? setDay('') : setDay(props.data.repeatFrom)
                                       }}/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <span>İstirahət   günü</span>
                    </div>
                </div>
                {
                    checkHoliday ?
                        <div className="repeat-block flex-center">
                            Hər
                            <Form.Group className="form-group">
                                <Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={day}
                                        onChange={(e => setDay(e.target.value))}/>
                                </Form.Label>
                            </Form.Group>
                            gündən bir
                        </div>
                        :
                        <div className="work-schedule-data">
                            <div className="work-schedule-content">
                                <div className="work-schedule-title">
                                    1-ci smen
                                </div>
                                <div className="flex work-hours-content">
                                    <Col xs={6}>
                                        <div className="work-hours-block flex-end">
                                            <Form.Group className="form-group m-0 w-100">
                                                <span className="input-title">Tarixdən</span>
                                                <Form.Label className="relative m-0">
                                                    <TimePicker
                                                        onChange={(val) => {
                                                            setStartTime(val);
                                                            setCheckChangeTime(true);
                                                            setWorkHour(props.function(props.data.today, val, endTime));
                                                        }}
                                                        disableClock={true}
                                                        clearIcon={false}
                                                        locale="sv-sv"
                                                        value={startTime}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                            <span className="break-line"></span>
                                            <Form.Group className="form-group  m-0 w-100">
                                                <span className="input-title">Tarixə</span>
                                                <Form.Label>
                                                    <TimePicker
                                                        onChange={(val) => {
                                                            setEndTime(val);
                                                            setCheckChangeTime(true);
                                                            setWorkHour(props.function(props.data.today, startTime, val));
                                                        }}
                                                        disableClock={true}
                                                        clearIcon={false}
                                                        locale="sv-sv"
                                                        value={endTime}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="form-group m-0 w-100">
                                            <span className="input-title">Toplam iş saatı</span>
                                            <Form.Label className="relative m-0">
                                                <Form.Control
                                                    type="text"
                                                    value={workHour}
                                                    placeholder="iş saatı"
                                                    disabled={true}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                </div>
                                <div className="flex-wrap flex-center">
                                    <Col xs={4}>
                                        <div className="check-content flex-center">
                                            <div className="check-block">
                                                <label className="check-button">
                                                    <input type="checkbox"
                                                           checked={checkBreak}
                                                           onChange={async (e) => {
                                                               setCheckBreak(e.target.checked);
                                                               await setBreakHour(e.target.checked);
                                                           }}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <span>Fasilə</span>
                                        </div>
                                    </Col>
                                    <Col xs={4}>
                                        <div className="check-content flex-center">
                                            <div className="check-block">
                                                <label className="check-button">
                                                    <input type="checkbox"
                                                           checked={checkOverTime}
                                                           onChange={(e) => {
                                                               setCheckOverTime(e.target.checked);
                                                           }}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <span>Əlavə iş saatı</span>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                            <div className="work-schedule-content">
                                <div className="work-schedule-title">
                                    2-ci smen
                                </div>
                                <div className="flex work-hours-content">
                                    <Col xs={6}>
                                        <div className="work-hours-block flex-end">
                                            <Form.Group className="form-group m-0 w-100">
                                                <span className="input-title">Tarixdən</span>
                                                <Form.Label className="relative m-0">
                                                    <TimePicker
                                                        onChange={(val) => {
                                                            setStartTime2(val);
                                                            setCheckChangeTime2(true);
                                                            setWorkHour2(props.function(props.data.today, val, endTime2));
                                                        }}
                                                        disableClock={true}
                                                        clearIcon={false}
                                                        locale="sv-sv"
                                                        value={startTime2}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                            <span className="break-line"></span>
                                            <Form.Group className="form-group  m-0 w-100">
                                                <span className="input-title">Tarixə</span>
                                                <Form.Label>
                                                    <TimePicker
                                                        onChange={(val) => {
                                                            setEndTime2(val);
                                                            setCheckChangeTime2(true);
                                                            setWorkHour2(props.function(props.data.today, startTime2, val));
                                                        }}
                                                        disableClock={true}
                                                        clearIcon={false}
                                                        locale="sv-sv"
                                                        value={endTime2}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="form-group m-0 w-100">
                                            <span className="input-title">Toplam iş saatı</span>
                                            <Form.Label className="relative m-0">
                                                <Form.Control
                                                    type="text"
                                                    value={workHour2}
                                                    placeholder="iş saatı"
                                                    disabled={true}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                </div>
                                <div className="flex-wrap flex">
                                    <Col xs={6}>
                                        <div className="check-content flex-center">
                                            <div className="check-block">
                                                <label className="check-button">
                                                    <input type="checkbox"
                                                           checked={checkBreak2}
                                                           onChange={(e) => {
                                                               setCheckBreak2(e.target.checked);
                                                               setBreakHour2(e.target.checked);
                                                           }}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <span>Fasilə</span>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="check-content flex-center">
                                            <div className="check-block">
                                                <label className="check-button">
                                                    <input type="checkbox"
                                                           checked={checkOverTime2}
                                                           onChange={(e) => {
                                                               setCheckOverTime2(e.target.checked);
                                                           }}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <span>Əlavə iş saatı</span>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                            <div className="work-schedule-repeat">
                                {
                                    props.data.repeatFrom !== null ?
                                        null
                                        :
                                        <Col xs={6}>
                                            <div className="check-content flex-center">
                                                <div className="check-block">
                                                    <label className="check-button">
                                                        <input type="checkbox"
                                                               checked={checkRepeat}
                                                               onChange={(e) => {
                                                                   setCheckRepeat(e.target.checked);
                                                               }}/>
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                                <span>Təkrarla</span>
                                            </div>
                                        </Col>
                                }
                            </div>
                            {
                                checkRepeat ?
                                    <div className="repeat-block flex-center">
                                        Hər
                                        <Form.Group className="form-group">
                                            <Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={day}
                                                    onChange={(e => setDay(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                        gündən bir
                                    </div>
                                    : null
                            }
                        </div>
                }
                <div className={['btn-block', props.data.id !== null ? 'flex' : 'flex-end'].join(' ')}>
                    {
                        props.data.id !== null ?
                            <button type="button" className="btn btn-cancel" onClick={() => {
                                props.delete(props.data)
                            }}>
                                Sil
                            </button>
                            : null
                    }
                    <ul className="flex-end list-unstyled m-0">
                        <li>
                            <button type="button" className="btn-main-border" onClick={() => {
                                props.onHide();
                            }}>
                                Bağla
                            </button>
                        </li>
                        <li>
                            <button type="button" className="btn-main" onClick={() => {
                                props.click(checkBreak, checkOverTime, checkHoliday, startTime, endTime, day, checkBreak2, checkOverTime2, startTime2, endTime2, props.data)
                            }}>
                                Əlavə et
                            </button>
                        </li>
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default WorkDayModal
