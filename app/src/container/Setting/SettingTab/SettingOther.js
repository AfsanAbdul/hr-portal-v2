import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {mainAxios} from "../../../components/Axios/axios";
import {Container, Row, Col, Form, Tabs, Tab, Button, Table, OverlayTrigger, Tooltip} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from "react-select";
import {customStyles} from "../../../components/Select/SelectStyle";

const vacationPayOptions = [
    {value: 1, label: 'Bəli'},
    {value: 0, label: 'Xeyr'}
];

const categoryOptions = [
    {value: 'department', label: 'Struktur vahidinin adı'},
    {value: 'subDepartment', label: 'Struktur bölmənin adı'},
    {value: 'paidRest', label: 'Ödənişli istirahət verilməsinin səbəbi'},
    {value: 'payment', label: 'Ödənişlər'},
    {value: 'evaluation', label: 'Qiymətləndirmə'},
    {value: 'citizenship', label: 'Xitamla bağlı maddələr'},
]

function SettingOther() {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [tab, setTab] = useState('department');
    const [checkClick, setCheckClick] = useState(false);
    const [view, setView] = useState(false);
    const [active, setActive] = useState(false)

    const [departmentArr, setDepartmentArr] = useState([]);
    const [department, setDepartment] = useState('');
    const [departmentId, setDepartmentId] = useState('');

    const [cityArr, setCityArr] = useState([]);
    const [city, setCity] = useState('');
    const [showCity, setShowCity] = useState(false);
    const [selectedCityType, setSelectedCityType] = useState(null)




    const [gradeArr, setGradeArr] = useState([]);
    const [grade, setGrade] = useState('');
    const [showGrade, setShowGrade] = useState(false);

    const [subGradeArr, setSubGradeArr] = useState([]);
    const [subGrade, setSubGrade] = useState('');
    const [showSubGrade, setShowSubGrade] = useState(false);


    const [collectReasonArr, setCollectReasonArr] = useState([]);
    const [collectReason, setCollectReason] = useState('');
    const [showCollectReason, setShowCollectReason] = useState(false);


    const [departmentOptions, setDepartmentOptions] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showSubDepartment, setShowSubDepartment] = useState(false);

    const [subDepartment, setSubDepartment] = useState('');
    const [subDepartmentArr, setSubDepartmentArr] = useState([]);


    const [selectedMinGrade, setSelectedMinGrade] = useState(null);
    const [selectedMaxGrade, setSelectedMaxGrade] = useState(null);
    const [evaluation, setEvaluation] = useState('');

    const [articleArr, setArticleArr] = useState([]);
    const [article, setArticle] = useState('');
    const [firingMultiply, setFiringMultiply] = useState('');
    const [mainMultiply, setMainMultiply] = useState('');
    const [title, setTitle] = useState('');
    const [selectedVacationPay, setSelectedVacationPay] = useState(null);
    const [warningMultiply, setWarningMultiply] = useState('');
    const [showFiring, setShowFiring] = useState(false);

    const [selectedCity, setSelectedCity] = useState(null);
    const [amount, setAmount] = useState('');

    const getCache = () => {
        mainAxios({
            method: 'post',
            url: '/caches/evict',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
        });
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
            setDepartmentArr(res.data);
        });
    }
    const getDetailDepartment = (item) => {
        setDepartment(item.name);
        setDepartmentId(item.id);
        setView(true)
    }
    const sendDepartment = () => {
        setActive(true);
        let data = {
            name: department
        }
        mainAxios({
            method: 'post',
            url: '/departments',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getDepartment();
            getCache();
            setDepartment('');
            setActive(false);
        });
    }
    const editDepartment = () => {
        setActive(true);
        let data = {
            name: department
        }
        mainAxios({
            method: 'put',
            url: '/departments/' + departmentId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getDepartment();
            setDepartment('');
            setActive(false);
        });
    }
    const deleteDepartment = (id) => {
        mainAxios({
            method: 'delete',
            url: '/departments/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getDepartment()
        });
    }


    const getCity = () => {
        mainAxios({
            method: 'get',
            url: '/cities',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setCityArr(res.data)
        });
    }



    const getGrade = () => {
        mainAxios({
            method: 'get',
            url: '/grades',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setGradeArr(res.data)
        });
    }

    const getSubGrade = () => {
        mainAxios({
            method: 'get',
            url: '/sub-grades',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setSubGradeArr(res.data)
        });
    }

    const getCollectReason = () => {
        mainAxios({
            method: 'get',
            url: '/collective-agreements',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setCollectReasonArr(res.data)
        });
    }

    const sendCollectReason = () => {
        setActive(true);
        let data = {
            reason: collectReason
        }
        mainAxios({
            method: 'post',
            url: '/collective-agreements',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getCollectReason();
            setCollectReason('');
            setActive(false);
        });
    }

    const deleteCollectReason = (id) => {
        mainAxios({
            method: 'delete',
            url: '/collective-agreements/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getCollectReason()
        });
    }




        const getSubDepartments = () => {
            mainAxios({
                method: 'get',
                url: '/sub-departments',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }).then((res) => {
                setSubDepartmentArr(res.data)
            });
        }

        const senSubDepartment = () => {
            let data = {
                name: subDepartment
            }
            mainAxios({
                method: 'post',
                url: '/sub-departments',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                data: data
            }).then((res) => {
                getSubDepartments();
                setSubDepartment('');
            });
        }


    const sendEvaluation = () => {
        let data = {
            amount: evaluation !== '' ? parseFloat(evaluation) : null,
            gradeId: selectedMinGrade !== null ? selectedMinGrade.id : null,
            subGradeId: selectedMaxGrade !== null ? selectedMaxGrade.id : null
        }
        mainAxios({
            method: 'post',
            url: '/evaluations',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
        });
    }

    const sendPayment = () => {
        setActive(true);
        let data = {
            amount: amount !== '' ? parseFloat(amount) : null,
            cityId: selectedCity !== null ? selectedCity.id : null
        }
        mainAxios({
            method: 'post',
            url: '/payments',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {

        });
    }

    const getArticle = () => {
        mainAxios({
            method: 'get',
            url: '/articles',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setArticleArr(res.data);
        });
    }

    const sendArticle = () => {
        setActive(true);
        let data = {
            "article": article !== '' ?  article : null,
            "firingMultiply": firingMultiply !== '' ? parseFloat(firingMultiply) : null,
            "mainMultiply": mainMultiply !== '' ?  parseFloat(mainMultiply) : null,
            "title": title !== '' ? title : null,
            "vacationPay": selectedVacationPay !== null ? selectedVacationPay.value : null,
            "warningMultiply": warningMultiply !== '' ? parseFloat(warningMultiply) : null
        }
        mainAxios({
            method: 'post',
            url: '/articles',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            setArticle('');
            setTitle('');
            setFiringMultiply('');
            setMainMultiply('');
            setSelectedVacationPay(null);
            setWarningMultiply('');
            getArticle()
        });
    }

    const deleteArticle = (id) => {
        mainAxios({
            method: 'delete',
            url: '/articles/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setArticle('');
            setTitle('');
            setFiringMultiply('');
            setMainMultiply('');
            setSelectedVacationPay(null);
            setWarningMultiply('');
            getArticle();
        });
    }


    useEffect(() => {
        getCity();
        getGrade();
        getSubGrade();
        getDepartment();
        getCollectReason();
        getArticle()
    }, []);

    return (
        <Aux>
            <div>
                <div className="block-inn">
                    <Col xs={12}>
                        <div className="block-title flex">
                            Kategoriyalar
                        </div>
                        <Form.Group>
                            <Select
                                defaultValue={{value: 'department', label: 'Struktur vahidinin adı'}}
                                placeholder="Kateqoriya seçin"
                                value={selectedCategory !== null ? selectedCategory : {
                                    value: 'department',
                                    label: 'Struktur vahidinin adı'
                                }}
                                onChange={(val) => {
                                    setSelectedCategory(val);
                                    setTab(val.value);
                                    setView(false);
                                    setCheckClick(false)
                                }}
                                options={categoryOptions}
                                isSearchable={categoryOptions ? categoryOptions.length > 5 ? true : false : false}
                                styles={customStyles}
                                getOptionLabel={(option) => (option.label)}
                                getOptionValue={(option) => (option.label)}
                            />
                        </Form.Group>
                    </Col>
                </div>
                <div className="operation-tab">
                    <Tabs activeKey={tab}>
                        <Tab eventKey="department" title="" disabled={tab !== "department"}>
                            <div className="block-inn">
                                <Row>
                                    <Col xs={12}>
                                        <div className="block-title flex">
                                            Struktur vahidinin adı
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle className={active ? 'active' : ''}>
                                                Struktur vahidinin adı seçin
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    departmentArr ?
                                                        departmentArr.map((item, index) =>
                                                            <Dropdown.Item key={index}>
                                                                <span>{item.name}</span>
                                                                <ul className="list-unstyled flex m-0">
                                                                    <li>
                                                                        <button type="button"
                                                                                className="btn-transparent btn-delete"
                                                                                onClick={() => {getDetailDepartment(item); setCheckClick(true)}}>
                                                                            <svg width="16" height="17"
                                                                                 viewBox="0 0 16 17" fill="none"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <g opacity="0.9">
                                                                                    <path
                                                                                        d="M7.33333 2.05957H3.33333C2.59695 2.05957 2 2.65652 2 3.3929V12.7262C2 13.4626 2.59695 14.0596 3.33333 14.0596H12.6667C13.4031 14.0596 14 13.4626 14 12.7262V8.72624"
                                                                                        stroke="#181818"
                                                                                        strokeWidth="1.1"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"/>
                                                                                    <path
                                                                                        d="M6.33594 7.72606L11.6693 2.39273C12.2215 1.84044 13.117 1.84044 13.6693 2.39273C14.2215 2.94502 14.2215 3.84044 13.6693 4.39273L8.33594 9.72606L5.33594 10.7261L6.33594 7.72606Z"
                                                                                        stroke="#181818"
                                                                                        strokeWidth="1.1"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"/>
                                                                                </g>
                                                                            </svg>
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button type="button"
                                                                                className="btn-transparent btn-delete"
                                                                                onClick={() => deleteDepartment(item.id)}>
                                                                            <svg width="12" height="12"
                                                                                 viewBox="0 0 12 12" fill="none"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <path
                                                                                    d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                                    fill="#040647"/>
                                                                            </svg>
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </Dropdown.Item>
                                                        )
                                                        : null
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div className="flex-end">
                                            <button type="button" className="btn-color"
                                                    onClick={() => {setView(true); setCheckClick(false)}}>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                        stroke="#3083DC" strokeWidth="1.3" strokeLinecap="round"
                                                        strokeLinejoin="round"/>
                                                </svg>
                                                <span>əlavə et</span>
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                                {
                                    view ?
                                        <div className="addition">
                                            <Row className="flex-center">
                                                <div className="block-title flex">
                                                    Struktur vahidini daxil edin
                                                </div>
                                                <Col xs={12}>
                                                    <Form.Group className="form-group">
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={department}
                                                                placeholder="Struktur vahidini daxil edin"
                                                                onChange={e => setDepartment(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12}>
                                                    <ul className="btn-block list-unstyled m-0 flex-end">
                                                        <li>
                                                            <button type="button" className="btn-transparent"
                                                                    onClick={() => {
                                                                        setView(false);
                                                                        setDepartment('')
                                                                    }}>
                                                                <svg width="16" height="16" viewBox="0 0 16 16"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M7.99636 6.9671L13.8906 1.07285L7.99636 6.9671ZM7.99636 6.9671L2.1012 1.07191L2.10121 1.07189L2.09933 1.07008C1.80812 0.788831 1.34407 0.796903 1.06283 1.08811C0.788453 1.37219 0.788453 1.82254 1.06283 2.10662L1.06281 2.10664L1.06465 2.10848L6.95982 8.00364L1.06465 13.8988L1.06464 13.8988C0.778452 14.185 0.778452 14.6491 1.06464 14.9353L1.06467 14.9354C1.3509 15.2215 1.81494 15.2215 2.10118 14.9354L2.10119 14.9353L7.99636 9.04018L13.8915 14.9353L13.8915 14.9354L13.8934 14.9372C14.1846 15.2184 14.6486 15.2103 14.9299 14.9191L14.9299 14.9191C15.2042 14.6351 15.2042 14.1847 14.9299 13.9007L14.9299 13.9006L14.9281 13.8988L9.03293 8.00364L14.9272 2.10937C15.2175 1.82803 15.2252 1.36469 14.9443 1.0738C14.663 0.78261 14.199 0.774518 13.9078 1.05571L7.99636 6.9671Z"
                                                                        fill="#CF3131" stroke="#CF3131"
                                                                        strokeWidth="0.3"/>
                                                                </svg>
                                                                Bağla
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" className="btn-transparent"
                                                                    onClick={() => checkClick ? editDepartment() : sendDepartment()}>
                                                                <svg width="16" height="12" viewBox="0 0 16 12"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                                        fill="#2ED06A"/>
                                                                </svg>
                                                                Yadda saxla
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>
                                        : null
                                }
                            </div>
                        </Tab>
                    </Tabs>
                </div>
               {/*<div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                                Ödənişli istirahət verilməsinin səbəbi
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Ödənişli istirahət verilməsinin səbəbi
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        collectReasonArr ?
                                            collectReasonArr.map((item, index) =>
                                                <Dropdown.Item key={index}>
                                                    {item.reason}
                                                    <button type="button" className="btn-transparent btn-delete"
                                                            onClick={() => deleteCollectReason(item.id)}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                fill="#040647"/>
                                                        </svg>
                                                    </button>
                                                </Dropdown.Item>
                                            )
                                            : null
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowCollectReason(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showCollectReason ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={collectReason}
                                                    placeholder=" Vəzifənin tələb etdiyi kompetensiya  daxil edin"
                                                    onChange={(e => setCollectReason(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendCollectReason()}>
                                                    <svg width="16" height="12" viewBox="0 0 16 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                            fill="#2ED06A"/>
                                                    </svg>
                                                    Yadda saxla
                                                </button>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </div>



                <div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                               Ezamiyyət ödənişi
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Ezamiyyət ödənişi
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        departmentArr ?
                                            departmentArr.map((item, index) =>
                                                <Dropdown.Item key={index}>
                                                    {item.name}
                                                    <button type="button" className="btn-transparent btn-delete"
                                                            onClick={() => deleteDepartment(item.id)}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                fill="#040647"/>
                                                        </svg>
                                                    </button>
                                                </Dropdown.Item>
                                            )
                                            : null
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowDepartment(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showDepartment ?
                            <div>
                                {
                                    departmentArr.length > 0 ?
                                        <div className="addition">
                                            <Row className="flex-center">
                                                <Col xs={6}>
                                                    <Form.Group className="m-0">
                                                        <Select
                                                            placeholder="Struktur vahidinin adı  seç"
                                                            value={selectedDepartment}
                                                            onChange={(val) => {
                                                                setSelectedDepartment(val);
                                                                setShowSubDepartment(true)
                                                            }}
                                                            options={departmentOptions}
                                                            isSearchable={departmentOptions ? departmentOptions.length > 5 ? true : false : false}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.name)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                        :
                                        <div className="addition">
                                            <Row className="flex-center">
                                                <Col xs={3}>
                                                    <Form.Group className="m-0">
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={department}
                                                                placeholder=" Struktur vahidinin adı  daxil edin"
                                                                onChange={(e => setDepartment(e.target.value))}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={3}>
                                                    <Form.Group className="m-0">
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={subDepartment}
                                                                placeholder=" Struktur bölmənin adı  daxil edin"
                                                                onChange={(e => setSubDepartment(e.target.value))}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <ul className="btn-block list-unstyled m-0 flex-start">
                                                        <li>
                                                            <button type="button" className="btn-transparent"
                                                                    onClick={() => sendDepartment()}>
                                                                <svg width="16" height="12" viewBox="0 0 16 12"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                                        fill="#2ED06A"/>
                                                                </svg>
                                                                Yadda saxla
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>
                                }
                                {
                                    showSubDepartment ?
                                        <div className="addition">
                                            <Row className="flex-center">
                                                <Col xs={3}>
                                                    <Form.Group className="m-0">
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={selectedDepartment !==null ? selectedDepartment.name : null}
                                                                disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={3}>
                                                    <Form.Group className="m-0">
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={subDepartment}
                                                                placeholder=" Struktur bölmənin adı  daxil edin"
                                                                onChange={(e => setSubDepartment(e.target.value))}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <ul className="btn-block list-unstyled m-0 flex-start">
                                                        <li>
                                                            <button type="button" className="btn-transparent"
                                                                    onClick={() => sendDepartment()}>
                                                                <svg width="16" height="12" viewBox="0 0 16 12"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                                        fill="#2ED06A"/>
                                                                </svg>
                                                                Yadda saxla
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>

                                        : null
                                }
                            </div>
                            : null

                    }
                </div>



                <div className="block-inn">
                    <div className="row">
                        <Col xs={3}>
                            <div className="flex">
                                <Form.Group className="form-group m-0 w-100">
                                    <Select
                                        placeholder="Şəhər seçin"
                                        value={selectedCity}
                                        onChange={setSelectedCity}
                                        options={cityArr}
                                        isSearchable={cityArr ? cityArr.length > 5 ? true : false : false}
                                        styles={customStyles}
                                        getOptionLabel={(option) => (option.name)}
                                    />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col xs={2}>
                            <Form.Group className="form-group">
                                <Form.Label>
                                    <Form.Control
                                        value={amount}
                                        type="number"
                                        placeholder="Qiymətləndirmə"
                                        onChange={e => setAmount(e.target.value)}/>
                                </Form.Label>
                            </Form.Group>
                        </Col>
                        <Col xs={1}>
                            <div className="btn-block">
                                <button className="btn-green-border" onClick={() => sendPayment()}>
                                    Saxla
                                </button>
                            </div>
                        </Col>
                    </div>
                </div>

                <div className="block-inn">
                    <div className="row">
                        <Col xs={3}>
                            <div className="flex">
                                <Form.Group className="form-group m-0 w-100">
                                    <Select
                                        placeholder="Dərəcə"
                                        value={selectedMinGrade}
                                        onChange={setSelectedMinGrade}
                                        options={gradeArr}
                                        isSearchable={gradeArr ? gradeArr.length > 5 ? true : false : false}
                                        styles={customStyles}
                                        getOptionLabel={(option) => (option.grade)}
                                    />
                                </Form.Group>
                                <span className="break-line"></span>
                                <Form.Group className="form-group m-0 w-100">
                                    <Select
                                        placeholder="Alt dərəcə"
                                        value={selectedMaxGrade}
                                        onChange={setSelectedMaxGrade}
                                        options={subGradeArr}
                                        isSearchable={subGradeArr ? subGradeArr.length > 5 ? true : false : false}
                                        styles={customStyles}
                                        getOptionLabel={(option) => (option.subGrade)}
                                    />

                                </Form.Group>

                            </div>
                        </Col>
                        <Col xs={2}>
                            <Form.Group className="form-group">
                                <Form.Label>
                                    <Form.Control
                                        value={evaluation}
                                        type="number"
                                        placeholder="Qiymətləndirmə"
                                        onChange={e => setEvaluation(e.target.value)}/>
                                </Form.Label>
                            </Form.Group>
                        </Col>
                        <Col xs={1}>
                            <div className="btn-block">
                                <button className="btn-green-border" onClick={() => sendEvaluation()}>
                                    Saxla
                                </button>
                            </div>
                        </Col>
                    </div>
                </div>

                <div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                                Xitamla bağlı maddələr
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Xitamla bağlı maddələr
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        articleArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.article}  - {item.title}
                                                <button type="button" className="btn-transparent btn-delete"
                                                        onClick={() => deleteArticle(item.id)}>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                            fill="#040647"/>
                                                    </svg>
                                                </button>
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowFiring(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showFiring ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>
                                                <Form.Control
                                                    value={article}
                                                    placeholder="Xitam maddəsini daxil edin"
                                                    onChange={e => setArticle(e.target.value)}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>
                                                <Form.Control
                                                    value={title}
                                                    placeholder="Xitam əsası daxil edin"
                                                    onChange={e => setTitle(e.target.value)}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="flex-center">
                                    <Col xs={3}>
                                        <Form.Group className="form-group">
                                            <Select
                                                placeholder="Məzuniyyət üçün kompensasiyanı seçin"
                                                value={selectedVacationPay}
                                                onChange={setSelectedVacationPay}
                                                options={vacationPayOptions}
                                                isSearchable={vacationPayOptions ? vacationPayOptions.length > 5 ? true : false : false}
                                                styles={customStyles}
                                                getOptionLabel={(option) => (option.label)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>
                                                <Form.Control
                                                    value={mainMultiply}
                                                    type="number"
                                                    placeholder="Staja bağlı olmayan müavinətin məbləği daxil edin"
                                                    onChange={e => setMainMultiply(e.target.value)}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>
                                                <Form.Control
                                                    value={warningMultiply}
                                                    type="number"
                                                    placeholder="Xəbərdarlıq müddəti əvəzinə ödənilən müavinət daxil edin"
                                                    onChange={e => setWarningMultiply(e.target.value)}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>
                                                <Form.Control
                                                    value={firingMultiply}
                                                    type="number"
                                                    placeholder="İşdən çıxma müavinətin məbləği daxil edin"
                                                    onChange={e => setFiringMultiply(e.target.value)}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={1}>
                                        <div className="btn-block">
                                            <button className="btn-green-border" onClick={() => sendArticle()}>
                                                Saxla
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </div>*/}
            </div>
        </Aux>
    );
}

export default SettingOther