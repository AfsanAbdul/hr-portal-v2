import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {mainAxios} from "../../../components/Axios/axios";
import {Button, Container, Form, Table} from "react-bootstrap";
import {ReactSVG} from 'react-svg';
import WorkDayModal from '../WorkDayModal/WorkDayModal'
import moment from "moment";
import Paginate from "../../../components/Pagination/Pagination";
import Loading from "../../../components/Loading/Loading";
import Indicator from "../../../components/Loading/Indicator";
import {setDefaultLocale} from "react-datepicker";
import Select from "react-select";
import {customStyles} from "../../../components/Select/SelectStyle";

const months = ['Yan', 'Fev', 'Mart', 'Apr', 'May', 'İyun', 'İyul', 'Avq', 'Sent', 'Okt', 'Nov', 'Dek']

function WorkSchedule() {
    const [firstDay, setFirstDay] = useState();
    const [weekdays, setWeekdays] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [employeeArr, setEmployeeArr] = React.useState(false);
    const [modalData, setModalData] = React.useState('');

    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    /*filter*/

    const [department, setDepartment] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [subDepartment, setSubDepartment] = useState([]);
    const [selectedSubDepartment, setSelectedSubDepartment] = useState(null);
    const [fullName, setFullName] = useState('');

    let depart = selectedDepartment !== null ? selectedDepartment.id : null;
    let subDepart = selectedSubDepartment !== null ? selectedSubDepartment.id : null;
    let name = fullName !== '' ? fullName : null;


    let today = moment(new Date()).format('YYYY-MM-DD')


    const prevWeekDays = () => {
        let date = new Date(firstDay);
        date.setDate(date.getDate() - 7)
        setFirstDay(date)
    }

    const nextWeekDays = () => {
        let date = new Date(firstDay);
        date.setDate(date.getDate() + 7)
        setFirstDay(date)
    }

    const setData = (day) => {
        setModalData(day)
        setModalShow(true)
    }

    const getDepartment = () => {
        mainAxios({
            method: 'get',
            url: '/departments',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setDepartment(res.data);
        }).catch((error) => {
            setDepartment([])
        });
    }

    const getSubDepartments = (id) => {
        mainAxios({
            method: 'get',
            url: id !== undefined ? `/departments/${id}/sub-departments` : '/sub-departments',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setSubDepartment(res.data)
        }).catch((error) => {
            setSubDepartment([])
        });
    }

    const setDays = (page, depart, subDepart) => {
        let arr = [];
        for (let i = 0; i <= 6; i++) {
            let date = new Date(firstDay);
            date.setDate(date.getDate() + i)
            arr[i] = {
                day: date.getDate(),
                month: date.getMonth(),
                date: moment(date).format('YYYY-MM-DD'),
                changeTime: false,
            }
        }
        setWeekdays(arr);
        getShiftSchedule(page, arr[0], arr[6], depart, subDepart)
    }

    const timeDiffer = (day, startTime, endTime) => {
        if (startTime !== null && endTime !== null) {
            let startDate = new Date(day.concat(" , ", startTime));
            let endDate = new Date(day.concat(" , ", endTime));
            if (endDate.getTime() > startDate.getTime()) {
                let timestampDiff = endDate.getTime() - startDate.getTime();
                let diffHour = Math.floor(new Date(timestampDiff) / (60 * 60 * 1000));
                let diffMinute = (new Date(timestampDiff) / (60000)) - diffHour * 60;
                return diffHour
            }
        }

    }

    const getShiftSchedule = (page, startDate, endDate, depart, subDepart) => {
        if (!isNaN(startDate.day)) {
            setLoading(true)
            mainAxios({
                method: 'get',
                url: '/shift-schedule',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                params: {
                    page: page - 1,
                    endDate: endDate.date,
                    startDate: startDate.date,
                    size: recordSize,
                    departmentId: depart,
                    subDepartmentId: subDepart,
                    fullName: name,
                }
            }).then((res) => {
                setLoading(false);
                setCurrentPage(page);
                setEmployeeArr(res.data.content);
                setTotalRecord(res.data.totalElements);

            });
        }
    }

    const sendData = (breakHour, jobOnOffDay, offDay, shiftFrom, shiftTo, repeatFrom, propsData) => {
        setLoading(true);
        setModalShow(false);
        let data = {
            "breakHour": offDay ? null : breakHour,
            "dayId": propsData.dayId,
            "employeeId": propsData.employeeId,
            "jobOnOffDay": offDay ? false : jobOnOffDay,
            "offDay": offDay,
            "repeatFrom": parseFloat(repeatFrom),
            "shiftFrom": shiftFrom == '' || offDay ? null : shiftFrom,
            "shiftTo": shiftTo == '' || offDay ? null : shiftTo,
        }
        mainAxios({
            method: propsData.id !== null ? 'put' : 'post',
            url: propsData.id !== null ? `/shift-schedule/${propsData.id}` : '/shift-schedule',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            setLoading(false)
            getShiftSchedule(currentPage, propsData.startDate, propsData.endDate)
        });
    }

    const deleteDay = (propsData) => {
        mainAxios({
            method: 'delete',
            url: `/shift-schedule/${propsData.id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setModalShow(false);
            getShiftSchedule(currentPage, propsData.startDate, propsData.endDate)
        });
    }

    const getMonday = async () => {
        let d = new Date();
        let day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
        await setFirstDay(new Date(d.setDate(diff)));
    }

    const resetFilter = () => {
        setSelectedSubDepartment(null);
        setSelectedDepartment(null);
        setFullName('');
        setDays(1)
    }

    useEffect(async () => {
        await getMonday();
    }, []);

    useEffect(() => {
        setDays(1);
        getDepartment();
        getSubDepartments();
    }, [firstDay])

    return (
        <Aux>   {
            weekdays.length > 0 ?
                <div className="table-weekly-calendar">
                    <Container fluid>
                        <div className="title-block flex">
                            <div className="title">
                                İş qrafiki
                            </div>
                            <div className="table-month flex">
                                <button className="btn-transparent" onClick={() => prevWeekDays()}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8" clipPath="url(#clip0_2235_385)">
                                            <path
                                                d="M2.8707 6.42826L8.26704 11.8228C8.50383 12.059 8.88747 12.059 9.12485 11.8228C9.36164 11.5866 9.36164 11.203 9.12485 10.9668L4.15654 6.00028L9.12425 1.03376C9.36104 0.797565 9.36104 0.413931 9.12425 0.177143C8.88747 -0.0590475 8.50323 -0.0590475 8.26645 0.177143L2.8701 5.57165C2.63695 5.80539 2.63695 6.19506 2.8707 6.42826Z"
                                                fill="#193651"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2235_385">
                                                <rect width="12" height="12" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <span
                                    className="date-month">{weekdays[0].day} {months[weekdays[0].month]} - {weekdays[6].day} {months[weekdays[6].month]}</span>
                                <button className="btn-transparent" onClick={() => nextWeekDays()}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8" clipPath="url(#clip0_2236_409)">
                                            <path
                                                d="M9.1293 6.42826L3.73296 11.8228C3.49617 12.059 3.11253 12.059 2.87515 11.8228C2.63836 11.5866 2.63836 11.203 2.87515 10.9668L7.84346 6.00028L2.87575 1.03376C2.63896 0.797565 2.63896 0.413931 2.87575 0.177143C3.11253 -0.0590475 3.49677 -0.0590475 3.73355 0.177143L9.1299 5.57165C9.36305 5.80539 9.36305 6.19506 9.1293 6.42826Z"
                                                fill="#193651"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2236_409">
                                                <rect width="12" height="12" fill="white"
                                                      transform="matrix(-1 0 0 1 12 0)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                            <div className="btn-block flex-end" onClick={() => {
                                setShowFilter(!showFilter)
                            }}>
                                <button type="button" className="btn-border">
                                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.7099 2.90769C15.7145 2.89385 15.7053 2.88 15.7053 2.86615V0.461538C15.7145 0.216923 15.5206 0.00923077 15.2714 0C15.2668 0 15.2622 0 15.2576 0H0.732947C0.488331 0 0.285254 0.203077 0.28987 0.447692C0.28987 0.452308 0.28987 0.456923 0.28987 0.461538V2.86615C0.28987 2.88 0.280639 2.89385 0.285254 2.90769C0.285254 2.91231 0.280639 2.92154 0.285254 2.92615C0.285254 2.93538 0.285254 2.94462 0.285254 2.94923C0.285254 2.95846 0.285254 2.96308 0.28987 2.97231C0.294485 2.98154 0.294485 2.98615 0.294485 2.99077C0.294485 2.99538 0.299101 3.00462 0.299101 3.01385C0.299101 3.01846 0.303716 3.02769 0.303716 3.03231C0.308331 3.04154 0.308331 3.04615 0.312947 3.05538C0.317562 3.06 0.317562 3.06923 0.322178 3.07385C0.326793 3.07846 0.326793 3.08769 0.331408 3.09231C0.336024 3.09692 0.340639 3.10615 0.340639 3.11077C0.340639 3.11538 0.34987 3.12462 0.34987 3.12923C0.354485 3.13385 0.359101 3.14308 0.363716 3.14769C0.368331 3.15231 0.372947 3.15692 0.372947 3.16154C0.372947 3.16154 0.382178 3.16154 0.386793 3.16615L5.92064 9.67385V17.5385C5.91602 17.7138 6.01295 17.8754 6.17449 17.9538C6.23449 17.9815 6.2991 18 6.36833 18C6.47448 18 6.57602 17.9631 6.65448 17.8985L9.91295 15.2538C10.0191 15.1662 10.0791 15.0323 10.0745 14.8938V9.67385L15.6037 3.16615C15.6037 3.16615 15.6083 3.16615 15.6129 3.16154C15.6176 3.15692 15.6222 3.15231 15.6268 3.14769C15.6314 3.14308 15.636 3.13385 15.6406 3.12923C15.6453 3.12462 15.6499 3.11538 15.6545 3.11077C15.6591 3.10615 15.6637 3.09692 15.6637 3.09231C15.6683 3.08769 15.6729 3.07846 15.6729 3.07385C15.6776 3.06923 15.6776 3.06 15.6822 3.05538C15.6868 3.04615 15.6868 3.04154 15.6914 3.03231C15.696 3.02769 15.696 3.01846 15.696 3.01385C15.7006 3.00462 15.7006 3 15.7006 2.99077C15.7006 2.98154 15.7053 2.97692 15.7053 2.97231C15.7053 2.96769 15.7099 2.95846 15.7099 2.94923C15.7099 2.94 15.7145 2.93077 15.7145 2.92615C15.7145 2.92154 15.7053 2.91231 15.7099 2.90769ZM9.27141 9.20308C9.19756 9.28615 9.15602 9.39231 9.15141 9.50308V14.6723L6.84372 16.5692V9.50308C6.8391 9.39231 6.79756 9.28615 6.72372 9.20308L1.72987 3.32308H14.2653L9.27141 9.20308ZM14.7822 2.4H1.21295V0.923077H14.7822V2.4Z"
                                            fill="#040647"/>
                                    </svg>
                                    Filters
                                </button>
                            </div>
                        </div>
                        {
                            showFilter ?
                                <div className="filter-block">
                                    <div className="block flex">
                                        <div className="filter-left">
                                            <div className="filter-item">
                                                <Form.Group className="form-group m-0">
                                                    <span className="input-title">Struktur vahidinin adı</span>
                                                    <Select
                                                        placeholder="Struktur vahidini seçin"
                                                        value={selectedDepartment}
                                                        onChange={(val) => {
                                                            setSelectedDepartment(val);
                                                            let id = val.id;
                                                            getSubDepartments(id);
                                                            setSelectedSubDepartment(null);
                                                            let name = fullName !== '' ? fullName : null
                                                            let subDepartId = selectedSubDepartment !== null ? selectedSubDepartment.id : null;
                                                            setDays(1, id, subDepartId, name)
                                                        }}
                                                        isSearchable={department ? department.length > 5 ? true : false : false}
                                                        options={department}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="filter-item">
                                                <Form.Group className="form-group m-0">
                                                    <span className="input-title">Struktur bölmənin adı</span>
                                                    <Select
                                                        placeholder="Struktur bölməni seçin"
                                                        value={selectedSubDepartment}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setSelectedSubDepartment(val);
                                                            let departId = selectedDepartment !== null ? selectedDepartment.id : null;
                                                            let name = fullName !== '' ? fullName : null
                                                            setDays(1, departId, id, name)
                                                        }}
                                                        isSearchable={subDepartment ? subDepartment.length > 5 ? true : false : false}
                                                        options={subDepartment}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="filter-item">
                                                <Form.Group className="form-group m-0">
                                                    <span className="input-title">İşçinin adı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşçinin adı daxil edin"
                                                                      value={fullName}
                                                                      onChange={(e) => {
                                                                          setFullName(e.target.value)
                                                                      }}
                                                                      onKeyPress={(e) => {
                                                                          let departId = selectedDepartment !== null ? selectedDepartment.id : null;
                                                                          let subDepartId = selectedSubDepartment !== null ? selectedSubDepartment.id : null;
                                                                          if (e.key === 'Enter') {
                                                                              setDays(1, departId, subDepartId, e.target.value)
                                                                          }
                                                                      }}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <Button className="btn-border" onClick={() => resetFilter()}>
                                            Təmizlə
                                        </Button>
                                    </div>
                                </div>
                                : null
                        }
                        {
                            loading ?
                                <div className="block">
                                    <Loading/>
                                </div>
                                :
                                <>
                                    <div className="table-striped p-0">
                                        <Table responsive="sm">
                                            <thead>
                                            <tr>
                                                <th>İşçilər</th>
                                                <th>B.e {weekdays[0].day}</th>
                                                <th>Ç.a {weekdays[1].day}</th>
                                                <th>Ç {weekdays[2].day}</th>
                                                <th>C.a {weekdays[3].day}</th>
                                                <th>C {weekdays[4].day}</th>
                                                <th>Ş {weekdays[5].day}</th>
                                                <th>B {weekdays[6].day}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                Object.keys(employeeArr).length > 0 ?
                                                    Object.keys(employeeArr).map((item, index) =>
                                                        <tr key={index}>
                                                            <td className="td-name">{item}</td>
                                                            {
                                                                weekdays.length > 0 ?
                                                                    weekdays.map((day, dayIndex) =>
                                                                        <td className={[today !== day.date ? '' : 'td-today', 'td-weekday'].join(' ')}
                                                                            onClick={() => setData(Object.assign(employeeArr[item][day.date],
                                                                                {startDate: weekdays[0]}, {endDate: weekdays[6]},
                                                                                {name: item},
                                                                                {today: `${day.date}`},
                                                                                {changeTime: false},
                                                                                {weekday: `${day.day} ${months[day.month]}`},
                                                                                {workHour: timeDiffer(day.date, employeeArr[item][day.date].shiftFrom, employeeArr[item][day.date].shiftTo)},
                                                                            ))}
                                                                            key={dayIndex}>
                                                                            {
                                                                                employeeArr[item][day.date] !== undefined ?
                                                                                    employeeArr[item][day.date].offDay ?
                                                                                        <span
                                                                                            className="td-holiday">İstirahət <br/> günü </span>
                                                                                        :
                                                                                        <>
                                                                                            {
                                                                                                employeeArr[item][day.date].shiftFrom !== null ?
                                                                                                    <span
                                                                                                        className="flex">{employeeArr[item][day.date].shiftFrom} - {employeeArr[item][day.date].shiftTo}</span>
                                                                                                    : null
                                                                                            }
                                                                                            {
                                                                                                timeDiffer(day.date, employeeArr[item][day.date].shiftFrom, employeeArr[item][day.date].shiftTo) > 0 ?
                                                                                                    <span
                                                                                                        className="td-hour">
                                                                                              {timeDiffer(day.date, employeeArr[item][day.date].shiftFrom, employeeArr[item][day.date].shiftTo)} saat
                                                                                        </span>
                                                                                                    : null
                                                                                            }

                                                                                            {
                                                                                                employeeArr[item][day.date].shiftType !== null ?
                                                                                                    <ReactSVG
                                                                                                        src={require(`../../../assets/img/${employeeArr[item][day.date].shiftType}.svg`).default}
                                                                                                        wrapper="span"
                                                                                                        className="wrapper-svg"/>
                                                                                                    : null
                                                                                            }
                                                                                        </>
                                                                                    : null
                                                                            }

                                                                        </td>
                                                                    )
                                                                    : null
                                                            }
                                                        </tr>
                                                    )
                                                    : null
                                            }
                                            </tbody>
                                        </Table>
                                        <WorkDayModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            data={modalData}
                                            click={(breakHour, jobOnOffDay, offDay, shiftFrom, shiftTo, repeatFrom, propsData) => {
                                                sendData(breakHour, jobOnOffDay, offDay, shiftFrom, shiftTo, repeatFrom, propsData)
                                            }}
                                            delete={(propsData) => {
                                                deleteDay(propsData)
                                            }}
                                            function={(day, startTime, endTime) => timeDiffer(day, startTime, endTime)}
                                            rand={Math.random()}
                                        />
                                    </div>
                                    <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                                              click={(page) => setDays(page, depart, subDepart)}/>
                                </>
                        }

                    </Container>
                </div> : ''}
        </Aux>
    );
}

export default WorkSchedule
