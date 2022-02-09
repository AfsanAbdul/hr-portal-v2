import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {mainAxios} from "../../../components/Axios/axios";
import {Row, Col, Form, Tabs, Tab, Button} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from "react-select";
import {customStyles} from "../../../components/Select/SelectStyle";

const cityTypeOptions = [
    {value: 'DOMESTIC', label: 'Ölkədaxili'},
    {value: 'ABROAD', label: 'Ölkəxarici'}
]

const categoryOptions = [
    {value: 'country', label: 'Ölkələr'},
    {value: 'city', label: 'Şəhərlər'},
    {value: 'region', label: 'Rayonlar'},
    {value: 'citizenship', label: 'Vətəndaşlığı olduğu ölkə'},
]

function SettingPlace() {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [tab, setTab] = useState('country');
    const [checkClick, setCheckClick] = useState(false);
    const [view, setView] = useState(false);
    const [active, setActive] = useState(false)



    const [countryArr, setCountryArr] = useState([]);
    const [country, setCountry] = useState('');
    const [countryId, setCountryId] = useState('');

    const [cityArr, setCityArr] = useState([]);
    const [city, setCity] = useState('');
    const [cityId, setCityId] = useState('');
    const [selectedCityType, setSelectedCityType] = useState(null)

    const [regionArr, setRegionArr] = useState([]);
    const [region, setRegion] = useState('');
    const [regionId, setRegionId] = useState('');

    const [citizenCountryArr, setCitizenCountryArr] = useState([]);
    const [citizenCountry, setCitizenCountry] = useState('');
    const [citizenCountryId, setCitizenCountryId] = useState('');


    const getCountry = () => {
        mainAxios({
            method: 'get',
            url: 'countries',
        }).then((res) => {
            setCountryArr(res.data);
        });
    }

    const sendCountry = () => {
        setActive(true);
        let data = {
            name: country
        }
        mainAxios({
            method: 'post',
            url: 'countries',
            data: data
        }).then((res) => {
            getCountry();
            setCountry('');
            setActive(false);
        });
    }

    const getDetailCountry = (item) => {
        setCountry(item.name);
        setCountryId(item.id);
        setView(true)
    }

    const editCountry = () => {
        setActive(true);
        let data = {
            name: country
        }
        mainAxios({
            method: 'put',
            url: `countries/${countryId}`,
            data: data
        }).then((res) => {
            getCountry();
            setCountry('');
            setActive(false);
        });
    }

    const deleteCountry = (id) => {
        setCountry('')
        mainAxios({
            method: 'delete',
            url: `countries/${id}`,
        }).then((res) => {
            getCountry()
        });
    }

    const getCity = () => {
        mainAxios({
            method: 'get',
            url: 'cities',
        }).then((res) => {
            setCityArr(res.data)
        });
    }

    const getDetailCity = (item) => {
        setCity(item.name);
        setCityId(item.id);
        for (let i of cityTypeOptions) {
            if (i.value === item.cityType) {
                setSelectedCityType(i)
            }
        }
        setView(true)
    }

    const sendCity = () => {
        setActive(true);
        let data = {
            name: city,
            cityType: selectedCityType !==null ? selectedCityType.value : null
        }
        mainAxios({
            method: 'post',
            url: 'cities',
            data: data
        }).then((res) => {
            getCity();
            setCity('');
            setSelectedCityType(null)
            setActive(false);
        });
    }

    const editCity = () => {
        setActive(true);
        let data = {
            name: city
        }
        mainAxios({
            method: 'put',
            url: `cities/${cityId}`,
            data: data
        }).then((res) => {
            getCity();
            setCity('');
            setSelectedCityType(null);
            setActive(false);
        });
    }

    const deleteCity = (id) => {
        mainAxios({
            method: 'delete',
            url: `cities${id}`,
        }).then((res) => {
            getCity()
        });
    }

    const getRegion = () => {
        mainAxios({
            method: 'get',
            url: 'districts',
        }).then((res) => {
            setRegionArr(res.data)
        });
    }

    const getDetailRegion = (item) => {
        setRegion(item.name);
        setRegionId(item.id);
        setView(true)
    }

    const sendRegion = () => {
        setActive(true);
        let data = {
            name: region
        }
        mainAxios({
            method: 'post',
            url: 'districts',
            data: data
        }).then((res) => {
            getRegion();
            setRegion('');
            setActive(false);
        });
    }

    const editRegion = () => {
        setActive(true);
        let data = {
            name: region
        }
        mainAxios({
            method: 'put',
            url: `districts/${regionId}`,
            data: data
        }).then((res) => {
            getRegion();
            setRegion('');
            setActive(false);
        });
    }

    const deleteRegion = (id) => {
        mainAxios({
            method: 'delete',
            url: `districts/${id}`,
        }).then((res) => {
            getCountry()
        });
    }

    const getCitizenCountry = () => {
        mainAxios({
            method: 'get',
            url: 'motherland',
        }).then((res) => {
            setCitizenCountryArr(res.data)
        });
    }

    const getDetailCitizenship = (item) => {
        setCitizenCountry(item.name);
        setCitizenCountryId(item.id);
        setView(true)
    }

    const sendCitizenCountry = () => {
        setActive(true);
        let data = {
            name: citizenCountry
        }
        mainAxios({
            method: 'post',
            url: 'motherland',
            data: data
        }).then((res) => {
            getCitizenCountry();
            setCitizenCountry('');
            setActive(false);
        });
    }

    const editCitizenCountry = () => {
        setActive(true);
        let data = {
            name: citizenCountry
        }
        mainAxios({
            method: 'put',
            url: `motherland/${citizenCountryId}`,
            data: data
        }).then((res) => {
            getCitizenCountry();
            setCitizenCountry('');
            setActive(false);
        });
    }


    const deleteCitizenCountry = (id) => {
        mainAxios({
            method: 'delete',
            url: `motherland/${id}`,
        }).then((res) => {
            getCitizenCountry()
        });
    }

    useEffect(() => {
        getCountry();
        getCity();
        getRegion();
        getCitizenCountry();
    },[] );

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
                                defaultValue={{value: 'country', label: 'Ölkələr'}}
                                placeholder="Kateqoriya seçin"
                                value={selectedCategory !== null ? selectedCategory : {
                                    value: 'country',
                                    label: 'Ölkələr'
                                }}
                                onChange={(val) => {
                                    setSelectedCategory(val);
                                    setTab(val.value)
                                }}
                                options={categoryOptions}
                                isSearchable={categoryOptions ? categoryOptions.length > 5  : false}
                                styles={customStyles}
                                getOptionLabel={(option) => (option.label)}
                                getOptionValue={(option) => (option.label)}
                            />
                        </Form.Group>
                    </Col>
                </div>
                <div className="operation-tab">
                    <Tabs activeKey={tab}>
                        <Tab eventKey="country" title="" disabled={tab !== "country"}>
                            <div className="block-inn">
                                <Row>
                                    <Col xs={12}>
                                        <div className="block-title flex">
                                            Ölkələr
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle className={active ? 'active' : ''}>
                                                Ölkə seçin
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    countryArr ?
                                                        countryArr.map((item, index) =>
                                                            <Dropdown.Item key={index}>
                                                                <span>{item.name}</span>
                                                                <ul className="list-unstyled flex m-0">
                                                                    <li>
                                                                        <Button type="button"
                                                                                className="btn-transparent btn-edit"
                                                                                onClick={() => {getDetailCountry(item); setCheckClick(true)}}>
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
                                                                        </Button>
                                                                    </li>
                                                                    <li>
                                                                        <Button type="button"
                                                                                className="btn-transparent btn-delete"
                                                                                onClick={() => deleteCountry(item.id)}>
                                                                            <svg width="12" height="12"
                                                                                 viewBox="0 0 12 12" fill="none"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <path
                                                                                    d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                                    fill="#040647"/>
                                                                            </svg>
                                                                        </Button>
                                                                    </li>
                                                                </ul>
                                                            </Dropdown.Item>
                                                        )
                                                        : null
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div className="flex-end">
                                            <Button type="button" className="btn-color"
                                                    onClick={() => {setView(true); setCheckClick(false)}}>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                        stroke="#3083DC" strokeWidth="1.3" strokeLinecap="round"
                                                        strokeLinejoin="round"/>
                                                </svg>
                                                <span>əlavə et</span>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                {
                                    view ?
                                        <div className="addition">
                                            <Row className="flex-center">
                                                <div className="block-title flex">
                                                    Yeni ölkə daxil edin
                                                </div>
                                                <Col xs={12}>
                                                    <Form.Group className="form-group">
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={country}
                                                                placeholder="Ölkə daxil edin"
                                                                onChange={e => setCountry(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12}>
                                                    <ul className="btn-block list-unstyled m-0 flex-end">
                                                        <li>
                                                            <Button type="button" className="btn-transparent"
                                                                    onClick={() => {
                                                                        setView(false);
                                                                        setCountry('')
                                                                    }}>
                                                                <svg width="16" height="16" viewBox="0 0 16 16"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M7.99636 6.9671L13.8906 1.07285L7.99636 6.9671ZM7.99636 6.9671L2.1012 1.07191L2.10121 1.07189L2.09933 1.07008C1.80812 0.788831 1.34407 0.796903 1.06283 1.08811C0.788453 1.37219 0.788453 1.82254 1.06283 2.10662L1.06281 2.10664L1.06465 2.10848L6.95982 8.00364L1.06465 13.8988L1.06464 13.8988C0.778452 14.185 0.778452 14.6491 1.06464 14.9353L1.06467 14.9354C1.3509 15.2215 1.81494 15.2215 2.10118 14.9354L2.10119 14.9353L7.99636 9.04018L13.8915 14.9353L13.8915 14.9354L13.8934 14.9372C14.1846 15.2184 14.6486 15.2103 14.9299 14.9191L14.9299 14.9191C15.2042 14.6351 15.2042 14.1847 14.9299 13.9007L14.9299 13.9006L14.9281 13.8988L9.03293 8.00364L14.9272 2.10937C15.2175 1.82803 15.2252 1.36469 14.9443 1.0738C14.663 0.78261 14.199 0.774518 13.9078 1.05571L7.99636 6.9671Z"
                                                                        fill="#CF3131" stroke="#CF3131"
                                                                        strokeWidth="0.3"/>
                                                                </svg>
                                                                Bağla
                                                            </Button>
                                                        </li>
                                                        <li>
                                                            <Button type="button" className="btn-transparent"
                                                                    onClick={() => checkClick ? editCountry() : sendCountry()}>
                                                                <svg width="16" height="12" viewBox="0 0 16 12"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                                        fill="#2ED06A"/>
                                                                </svg>
                                                                Yadda saxla
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>
                                        : null
                                }
                            </div>
                        </Tab>
                        <Tab eventKey="city" title="" disabled={tab !== "city"}>
                            <div className="block-inn">
                                <Row>
                                    <Col xs={12}>
                                        <div className="block-title flex">
                                            Şəhərlər
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle className={active ? 'active' : ''}>
                                                Şəhər seçin
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    cityArr ?
                                                        cityArr.map((item, index) =>
                                                            <Dropdown.Item key={index}>
                                                                <span>{item.name}</span>
                                                                <ul className="list-unstyled flex m-0">
                                                                    <li>
                                                                        <Button type="button"
                                                                                className="btn-transparent btn-edit"
                                                                                onClick={() => {getDetailCity(item); setCheckClick(true)}}>
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
                                                                        </Button>
                                                                    </li>
                                                                    <li>
                                                                        <Button type="button"
                                                                                className="btn-transparent btn-delete"
                                                                                onClick={() => deleteCity(item.id)}>
                                                                            <svg width="12" height="12"
                                                                                 viewBox="0 0 12 12" fill="none"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <path
                                                                                    d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                                    fill="#040647"/>
                                                                            </svg>
                                                                        </Button>
                                                                    </li>
                                                                </ul>
                                                            </Dropdown.Item>
                                                        )
                                                        : null
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div className="flex-end">
                                            <Button type="button" className="btn-color"
                                                    onClick={() => { setView(true); setCheckClick(false)}}>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                                        fill="#3083DC"/>
                                                </svg>
                                                əlavə et
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                {
                                    view ?
                                        <div className="addition">
                                            <Row>
                                                <Col xs={6}>
                                                    <span className="input-title">
                                                       Yeni şəhər daxil edin
                                                    </span>
                                                    <Form.Group className="form-group">
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={city}
                                                                placeholder="Şəhər daxil edin"
                                                                onChange={(e => setCity(e.target.value))}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                          <span className="input-title">
                                                            Şəhər seçin
                                                        </span>
                                                        <Select
                                                            placeholder="Şəhər seçin"
                                                            value={selectedCityType}
                                                            onChange={(val) => setSelectedCityType(val)}
                                                            options={cityTypeOptions}
                                                            isSearchable={cityTypeOptions ? cityTypeOptions.length > 5  : false}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.label)}
                                                            getOptionValue={(option) => (option.label)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12}>
                                                    <ul className="btn-block list-unstyled m-0 flex-end">
                                                        <li>
                                                            <Button type="button" className="btn-transparent"
                                                                    onClick={() => {
                                                                        setView(false);
                                                                        setCity('')
                                                                    }}>
                                                                <svg width="16" height="16" viewBox="0 0 16 16"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M7.99636 6.9671L13.8906 1.07285L7.99636 6.9671ZM7.99636 6.9671L2.1012 1.07191L2.10121 1.07189L2.09933 1.07008C1.80812 0.788831 1.34407 0.796903 1.06283 1.08811C0.788453 1.37219 0.788453 1.82254 1.06283 2.10662L1.06281 2.10664L1.06465 2.10848L6.95982 8.00364L1.06465 13.8988L1.06464 13.8988C0.778452 14.185 0.778452 14.6491 1.06464 14.9353L1.06467 14.9354C1.3509 15.2215 1.81494 15.2215 2.10118 14.9354L2.10119 14.9353L7.99636 9.04018L13.8915 14.9353L13.8915 14.9354L13.8934 14.9372C14.1846 15.2184 14.6486 15.2103 14.9299 14.9191L14.9299 14.9191C15.2042 14.6351 15.2042 14.1847 14.9299 13.9007L14.9299 13.9006L14.9281 13.8988L9.03293 8.00364L14.9272 2.10937C15.2175 1.82803 15.2252 1.36469 14.9443 1.0738C14.663 0.78261 14.199 0.774518 13.9078 1.05571L7.99636 6.9671Z"
                                                                        fill="#CF3131" stroke="#CF3131"
                                                                        strokeWidth="0.3"/>
                                                                </svg>
                                                                Bağla
                                                            </Button>
                                                        </li>
                                                        <li>
                                                            <Button type="button" className="btn-transparent"
                                                                    onClick={() => checkClick ? editCity() : sendCity()}>
                                                                <svg width="16" height="12" viewBox="0 0 16 12"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                                        fill="#2ED06A"/>
                                                                </svg>
                                                                Yadda saxla
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>
                                        : null
                                }
                            </div>
                        </Tab>
                        <Tab eventKey="region" title="" disabled={tab !== "region"}>
                            <div className="block-inn">
                                <Row>
                                    <Col xs={12}>
                                        <div className="block-title flex">
                                            Rayonlar
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle className={active ? 'active' : ''}>
                                                Rayonlar
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    regionArr ?
                                                        regionArr.map((item, index) =>
                                                            <Dropdown.Item key={index}>
                                                                {item.name}
                                                                <ul className="list-unstyled flex m-0">
                                                                    <li>
                                                                        <Button type="button"
                                                                                className="btn-transparent btn-edit"
                                                                                onClick={() => {getDetailRegion(item); setCheckClick(true)}}>
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
                                                                        </Button>
                                                                    </li>
                                                                    <li>
                                                                        <Button type="button"
                                                                                className="btn-transparent btn-delete"
                                                                                onClick={() => deleteRegion(item.id)}>
                                                                            <svg width="12" height="12"
                                                                                 viewBox="0 0 12 12" fill="none"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <path
                                                                                    d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                                    fill="#040647"/>
                                                                            </svg>
                                                                        </Button>
                                                                    </li>
                                                                </ul>
                                                            </Dropdown.Item>
                                                        )
                                                        : null
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div className="flex-end">
                                            <Button type="button" className="btn-color"
                                                    onClick={() => {setView(true); setCheckClick(false)}}>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                                        fill="#3083DC"/>
                                                </svg>
                                                əlavə et
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                {
                                    view ?
                                        <div className="addition">
                                            <Row className="flex-center">
                                                <Col xs={12}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Rayon daxil edin</span>
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={region}
                                                                placeholder="Rayon daxil edin"
                                                                onChange={(e => setRegion(e.target.value))}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12}>
                                                    <ul className="btn-block list-unstyled m-0 flex-end">
                                                        <li>
                                                            <Button type="button" className="btn-transparent"
                                                                    onClick={() => {
                                                                        setView(false);
                                                                        setRegion('')
                                                                    }}>
                                                                <svg width="16" height="16" viewBox="0 0 16 16"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M7.99636 6.9671L13.8906 1.07285L7.99636 6.9671ZM7.99636 6.9671L2.1012 1.07191L2.10121 1.07189L2.09933 1.07008C1.80812 0.788831 1.34407 0.796903 1.06283 1.08811C0.788453 1.37219 0.788453 1.82254 1.06283 2.10662L1.06281 2.10664L1.06465 2.10848L6.95982 8.00364L1.06465 13.8988L1.06464 13.8988C0.778452 14.185 0.778452 14.6491 1.06464 14.9353L1.06467 14.9354C1.3509 15.2215 1.81494 15.2215 2.10118 14.9354L2.10119 14.9353L7.99636 9.04018L13.8915 14.9353L13.8915 14.9354L13.8934 14.9372C14.1846 15.2184 14.6486 15.2103 14.9299 14.9191L14.9299 14.9191C15.2042 14.6351 15.2042 14.1847 14.9299 13.9007L14.9299 13.9006L14.9281 13.8988L9.03293 8.00364L14.9272 2.10937C15.2175 1.82803 15.2252 1.36469 14.9443 1.0738C14.663 0.78261 14.199 0.774518 13.9078 1.05571L7.99636 6.9671Z"
                                                                        fill="#CF3131" stroke="#CF3131"
                                                                        strokeWidth="0.3"/>
                                                                </svg>
                                                                Bağla
                                                            </Button>
                                                        </li>
                                                        <li>
                                                            <Button type="button" className="btn-transparent"
                                                                    onClick={() => checkClick ? editRegion() : sendRegion()}>
                                                                <svg width="16" height="12" viewBox="0 0 16 12"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                                        fill="#2ED06A"/>
                                                                </svg>
                                                                Yadda saxla
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>
                                        : null
                                }
                            </div>
                        </Tab>
                        <Tab eventKey="citizenship" title="" disabled={tab !== "citizenship"}>
                            <div className="block-inn">
                                <Row>
                                    <Col xs={12}>
                                        <div className="block-title flex">
                                            Vətəndaşlığı olduğu ölkə
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle className={active ? 'active' : ''}>
                                                Vətəndaşlığı olduğu ölkə
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    citizenCountryArr ?
                                                        citizenCountryArr.map((item, index) =>
                                                            <Dropdown.Item key={index}>
                                                                {item.name}
                                                                <ul className="list-unstyled flex m-0">
                                                                    <li>
                                                                        <Button type="button"
                                                                                className="btn-transparent btn-edit"
                                                                                onClick={() => {getDetailCitizenship(item); setCheckClick(true)}}>
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
                                                                        </Button>
                                                                    </li>
                                                                    <li>
                                                                        <Button type="button"
                                                                                className="btn-transparent btn-delete"
                                                                                onClick={() => deleteCitizenCountry(item.id)}>
                                                                            <svg width="12" height="12"
                                                                                 viewBox="0 0 12 12" fill="none"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <path
                                                                                    d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                                    fill="#040647"/>
                                                                            </svg>
                                                                        </Button>
                                                                    </li>
                                                                </ul>
                                                            </Dropdown.Item>
                                                        )
                                                        : null
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div className="flex-end">
                                            <Button type="button" className="btn-color"
                                                    onClick={() => {setView(true); setCheckClick(false)}}>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                                        fill="#3083DC"/>
                                                </svg>
                                                əlavə et
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                {
                                    view ?
                                        <div className="addition">
                                            <Row className="flex-center">
                                                <Col xs={12}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Vətəndaşlığı olduğu ölkəni  daxil edin</span>
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={citizenCountry}
                                                                placeholder="Vətəndaşlığı olduğu ölkəni  daxil edin"
                                                                onChange={(e => setCitizenCountry(e.target.value))}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12}>
                                                    <ul className="btn-block list-unstyled m-0 flex-end">
                                                        <li>
                                                            <Button type="button" className="btn-transparent"
                                                                    onClick={() => {
                                                                        setView(false);
                                                                        setCitizenCountry('')
                                                                    }}>
                                                                <svg width="16" height="16" viewBox="0 0 16 16"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M7.99636 6.9671L13.8906 1.07285L7.99636 6.9671ZM7.99636 6.9671L2.1012 1.07191L2.10121 1.07189L2.09933 1.07008C1.80812 0.788831 1.34407 0.796903 1.06283 1.08811C0.788453 1.37219 0.788453 1.82254 1.06283 2.10662L1.06281 2.10664L1.06465 2.10848L6.95982 8.00364L1.06465 13.8988L1.06464 13.8988C0.778452 14.185 0.778452 14.6491 1.06464 14.9353L1.06467 14.9354C1.3509 15.2215 1.81494 15.2215 2.10118 14.9354L2.10119 14.9353L7.99636 9.04018L13.8915 14.9353L13.8915 14.9354L13.8934 14.9372C14.1846 15.2184 14.6486 15.2103 14.9299 14.9191L14.9299 14.9191C15.2042 14.6351 15.2042 14.1847 14.9299 13.9007L14.9299 13.9006L14.9281 13.8988L9.03293 8.00364L14.9272 2.10937C15.2175 1.82803 15.2252 1.36469 14.9443 1.0738C14.663 0.78261 14.199 0.774518 13.9078 1.05571L7.99636 6.9671Z"
                                                                        fill="#CF3131" stroke="#CF3131"
                                                                        strokeWidth="0.3"/>
                                                                </svg>
                                                                Bağla
                                                            </Button>
                                                        </li>
                                                        <li>
                                                            <Button type="button" className="btn-transparent"
                                                                    onClick={() => checkClick ? editCitizenCountry() : sendCitizenCountry()}>
                                                                <svg width="16" height="12" viewBox="0 0 16 12"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                                        fill="#2ED06A"/>
                                                                </svg>
                                                                Yadda saxla
                                                            </Button>
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
            </div>
        </Aux>
    );
}

export default SettingPlace
