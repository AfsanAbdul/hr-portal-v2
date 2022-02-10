import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {mainAxios} from "../../../components/Axios/axios";
import {Row, Col, Form, Tabs, Tab, Button} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from "react-select";
import {customStyles} from "../../../components/Select/SelectStyle";

const categoryOptions = [
    {value: 'university', label: 'Təhsil müəssisələri'},
    {value: 'certificate', label: 'Sertifikatlar'},
    {value: 'vacancy', label: 'Vakansiyalar'},
    {value: 'grade', label: 'Dərəcə'},
    {value: 'subGrade', label: 'Atl dərəcə'},
    {value: 'language', label: 'Dil biliyi'},
    {value: 'computer', label: 'Komputer biliyi'},
    {value: 'legislation', label: 'Qanunvericilik aktları'},
    {value: 'speciality', label: 'Təhsil ixtisası'},
    {value: 'enterprise', label: 'Müəssisələr'},
    {value: 'organization', label: 'Təltifi verən orqanın adı'},
    {value: 'competence', label: 'Vəzifənin tələb etdiyi kompetensiyalar'},
]

function SettingEducation() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [tab, setTab] = useState('university');
    const [checkClick, setCheckClick] = useState(false);
    const [view, setView] = useState(false);
    const [active, setActive] = useState(false)

    const [universityArr, setUniversityArr] = useState([]);
    const [university, setUniversity] = useState('');
    const [universityId, setUniversityId] = useState('');

    const [certificateArr, setCertificateArr] = useState([]);
    const [certificate, setCertificate] = useState('');
    const [certificateId, setCertificateId] = useState('');

    const [vacancyArr, setVacancyArr] = useState([]);
    const [vacancy, setVacancy] = useState('');
    const [vacancyId, setVacancyId] = useState('');

    const [gradeArr, setGradeArr] = useState([]);
    const [grade, setGrade] = useState('');
    const [gradeId, setGradeId] = useState('');

    const [subGradeArr, setSubGradeArr] = useState([]);
    const [subGrade, setSubGrade] = useState('');
    const [subGradeId, setSubGradeId] = useState('');

    const [languageArr, setLanguageArr] = useState([]);
    const [language, setLanguage] = useState('');
    const [languageId, setLanguageId] = useState('');

    const [computerArr, setComputerArr] = useState([]);
    const [computer, setComputer] = useState('');
    const [computerId, setComputerId] = useState('');

    const [legislationArr, setLegislationArr] = useState([]);
    const [legislation, setLegislation] = useState('');
    const [legislationId, setLegislationId] = useState('');

    const [specialityArr, setSpecialityArr] = useState([]);
    const [speciality, setSpeciality] = useState('');
    const [specialityId, setSpecialityId] = useState('');

    const [enterpriseArr, setEnterpriseArr] = useState([]);
    const [enterprise, setEnterprise] = useState('');
    const [enterpriseId, setEnterpriseId] = useState('');

    const [organizationArr, setOrganizationArr] = useState([]);
    const [organization, setOrganization] = useState('');
    const [organizationId, setOrganizationId] = useState('');

    const [competenceArr, setCompetenceArr] = useState([]);
    const [competence, setCompetence] = useState('');
    const [competenceId, setCompetenceId] = useState('');

    const getCache = () => {
        mainAxios({
            method: 'post',
            url: 'caches/evict',
        }).then((res) => {
        });
    }

    const getUniversity = () => {
        mainAxios({
            method: 'get',
            url: 'education-institutions',
        }).then((res) => {
            setUniversityArr(res.data)
        });
    }
    const getDetailUniversity = (item) => {
       setUniversity(item.name);
        setUniversityId(item.id);
       setView(true)
    }
    const sendUniversity = () => {
        setActive(true);
        let data = {
            name: university
        }
        mainAxios({
            method: 'post',
            url: 'education-institutions',
            data: data
        }).then(() => {
            getUniversity();
            setUniversity('');
            setActive(false);
        });
    }
    const editUniversity = () => {
        setActive(true);
        let data = {
            name: university
        }
        mainAxios({
            method: 'put',
            url: `education-institutions/${universityId}`,
            data: data
        }).then(() => {
            getUniversity();
            setUniversity('');
            setActive(false);
        });
    }
    const deleteUniversity = (id) => {
        mainAxios({
            method: 'delete',
            url: `education-institutions/${id}`,
        }).then(() => {
            getUniversity()
        });
    }


    const getCertificate = () => {
        mainAxios({
            method: 'get',
            url: 'certificates',
        }).then((res) => {
            setCertificateArr(res.data)
        });
    }
    const getDetailCertificate = (item) => {
        setCertificate(item.name);
        setCertificateId(item.id);
        setView(true)
    }
    const sendCertificate = () => {
        setActive(true);
        let data = {
            name: certificate
        }
        mainAxios({
            method: 'post',
            url: 'certificates',
            data: data
        }).then(() => {
            getCertificate();
            setCertificate('');
            setActive(false);
        });
    }
    const editCertificate = () => {
        setActive(true);
        let data = {
            name: certificate
        }
        mainAxios({
            method: 'put',
            url: `certificates/${certificateId}`,
            data: data
        }).then(() => {
            getCertificate();
            setCertificate('');
            setActive(false);
        });
    }
    const deleteCertificate = (id) => {
        mainAxios({
            method: 'delete',
            url: `certificates/${id}`,
        }).then(() => {
            getCertificate()
        });
    }

    const getVacancy = () => {
        mainAxios({
            method: 'get',
            url: 'positions',
        }).then((res) => {
            setVacancyArr(res.data)
        });
    }
    const getDetailVacancy = (item) => {
        setVacancy(item.name);
        setVacancyId(item.id);
        setView(true)
    }
    const sendVacancy = () => {
        setActive(true);
        let data = {
            name: vacancy
        }
        mainAxios({
            method: 'post',
            url: 'positions',
            data: data
        }).then(() => {
            getCache();
            getVacancy();
            setVacancy('');
            setActive(false);
        });
    }
    const editVacancy = () => {
        setActive(true);
        let data = {
            name: vacancy
        }
        mainAxios({
            method: 'put',
            url: `positions/${vacancyId}`,
            data: data
        }).then(() => {
            getCache();
            getVacancy();
            setVacancy('');
            setActive(false);
        });
    }
    const deleteVacancy = (id) => {
        mainAxios({
            method: 'delete',
            url: `positions/${id}`,
        }).then(() => {
            getCache();
            getVacancy()
        });
    }

    const getGrade = () => {
        mainAxios({
            method: 'get',
            url: 'grades',
        }).then((res) => {
            setGradeArr(res.data)
        });
    }
    const getDetailGrade = (item) => {
        setGrade(item.name);
        setGradeId(item.id);
        setView(true)
    }
    const sendGrade = () => {
        setActive(true);
        let data = {
            grade: parseFloat(grade)
        }
        mainAxios({
            method: 'post',
            url: 'grades',
            data: data
        }).then(() => {
            getCache();
            getGrade();
            setGrade('');
            setActive(false);
        });
    }
    const editGrade = () => {
        setActive(true);
        let data = {
            grade: parseFloat(grade)
        }
        mainAxios({
            method: 'put',
            url: `grades/${gradeId}`,
            data: data
        }).then(() => {
            getCache();
            getGrade();
            setGrade('');
            setActive(false);
        });
    }
    const deleteGrade = (id) => {
        mainAxios({
            method: 'delete',
            url: `grades/${id}`,
        }).then(() => {
            getCache();
            getGrade();
        });
    }

    const getSubGrade = () => {
        mainAxios({
            method: 'get',
            url: 'sub-grades',
        }).then((res) => {
            setSubGradeArr(res.data)
        });
    }
    const getDetailSubGrade = (item) => {
        setSubGrade(item.name);
        setSubGradeId(item.id);
        setView(true)
    }
    const sendSubGrade = () => {
        setActive(true);
        let data = {
            subGrade: subGrade
        }
        mainAxios({
            method: 'post',
            url: 'sub-grades',
            data: data
        }).then(() => {
            getCache();
            getSubGrade();
            setSubGrade('');
            setActive(false);
        });
    }
    const editSubGrade = () => {
        setActive(true);
        let data = {
            subGrade: subGrade
        }
        mainAxios({
            method: 'put',
            url: `sub-grades/${subGradeId}`,
            data: data
        }).then(() => {
            getCache();
            getSubGrade();
            setSubGrade('');
            setActive(false);
        });
    }
    const deleteSubGrade = (id) => {
        mainAxios({
            method: 'delete',
            url: `sub-grades/${id}`,
        }).then(() => {
            getSubGrade()
        });
    }

    const getLanguage = () => {
        mainAxios({
            method: 'get',
            url: 'languages',
        }).then((res) => {
            setLanguageArr(res.data)
        });
    }
    const getDetailLanguage = (item) => {
        setLanguage(item.name);
        setLanguageId(item.id);
        setView(true)
    }
    const sendLanguage = () => {
        setActive(true);
        let data = {
            name: language
        }
        mainAxios({
            method: 'post',
            url: 'languages',
            data: data
        }).then(() => {
            getLanguage();
            setLanguage('');
            setActive(false);
        });
    }
    const editLanguage = () => {
        setActive(true);
        let data = {
            name: language
        }
        mainAxios({
            method: 'put',
            url: `languages/${languageId}`,
            data: data
        }).then(() => {
            getLanguage();
            setLanguage('');
            setActive(false);
        });
    }
    const deleteLanguage = (id) => {
        mainAxios({
            method: 'delete',
            url: `languages/${id}`,
        }).then(() => {
            getLanguage()
        });
    }

    const getComputer = () => {
        mainAxios({
            method: 'get',
            url: 'computers',
        }).then((res) => {
            setComputerArr(res.data)
        });
    }
    const getDetailComputer = (item) => {
        setComputer(item.name);
        setComputerId(item.id);
        setView(true)
    }
    const sendComputer = () => {
        setActive(true);
        let data = {
            name: computer
        }
        mainAxios({
            method: 'post',
            url: 'computers',
            data: data
        }).then(() => {
            getComputer();
            setComputer('');
            setActive(false);
        });
    }
    const editComputer = () => {
        setActive(true);
        let data = {
            name: computer
        }
        mainAxios({
            method: 'put',
            url: `computers/${computerId}`,
            data: data
        }).then(() => {
            getComputer();
            setComputer('');
            setActive(false);
        });
    }
    const deleteComputer = (id) => {
        mainAxios({
            method: 'delete',
            url: `computers/${id}`,
        }).then(() => {
            getComputer()
        });
    }

    const getLegislation = () => {
        mainAxios({
            method: 'get',
            url: 'legislations',
        }).then((res) => {
            setLegislationArr(res.data)
        });
    }
    const getDetailLegislation = (item) => {
        setLegislation(item.name);
        setLegislationId(item.id);
        setView(true)
    }
    const sendLegislation = () => {
        setActive(true);
        let data = {
            name: legislation
        }
        mainAxios({
            method: 'post',
            url: 'legislations',
            data: data
        }).then(() => {
            getLegislation();
            setLegislation('');
            setActive(false);
        });
    }
    const editLegislation = () => {
        setActive(true);
        let data = {
            name: legislation
        }
        mainAxios({
            method: 'put',
            url: `legislations/${legislationId}`,
            data: data
        }).then(() => {
            getLegislation();
            setLegislation('');
            setActive(false);
        });
    }
    const deleteLegislation = (id) => {
        mainAxios({
            method: 'delete',
            url: `legislations/${id}`,
        }).then(() => {
            getLegislation()
        });
    }

    const getSpeciality = () => {
        mainAxios({
            method: 'get',
            url: 'specialities',
        }).then((res) => {
            setSpecialityArr(res.data)
        });
    }
    const getDetailSpeciality = (item) => {
        setSpeciality(item.name);
        setSpecialityId(item.id);
        setView(true)
    }
    const sendSpeciality = () => {
        setActive(true);
        let data = {
            name: speciality
        }
        mainAxios({
            method: 'post',
            url: 'specialities',
            data: data
        }).then(() => {
            getCache();
            getSpeciality();
            setSpeciality('');
            setActive(false);
        });
    }
    const editSpeciality = () => {
        setActive(true);
        let data = {
            name: speciality
        }
        mainAxios({
            method: 'put',
            url: `specialities/${specialityId}`,
            data: data
        }).then(() => {
            getCache();
            getSpeciality();
            setSpeciality('');
            setActive(false);
        });
    }
    const deleteSpeciality = (id) => {
        mainAxios({
            method: 'delete',
            url: `specialities/${id}`,
        }).then(() => {
            getSpeciality()
        });
    }

    const getEnterprise = () => {
        mainAxios({
            method: 'get',
            url: 'work-institutions',
        }).then((res) => {
            setEnterpriseArr(res.data)
        });
    }
    const getDetailEnterprise = (item) => {
        setEnterprise(item.name);
        setEnterpriseId(item.id);
        setView(true)
    }
    const sendEnterprise = () => {
        setActive(true);
        let data = {
            name: enterprise
        }
        mainAxios({
            method: 'post',
            url: 'work-institutions',
            data: data
        }).then(() => {
            getEnterprise();
            setEnterprise('');
            setActive(false);
        });
    }
    const editEnterprise = () => {
        setActive(true);
        let data = {
            name: enterprise
        }
        mainAxios({
            method: 'put',
            url: `work-institutions/${enterpriseId}`,
            data: data
        }).then(() => {
            getEnterprise();
            setEnterprise('');
            setActive(false);
        });
    }
    const deleteEnterprise = (id) => {
        mainAxios({
            method: 'delete',
            url: `work-institutions/${id}`,
        }).then(() => {
            getEnterprise()
        });
    }

    const getOrganization = () => {
        mainAxios({
            method: 'get',
            url: 'organizations',
        }).then((res) => {
            setOrganizationArr(res.data)
        });
    }
    const getDetailOrganization = (item) => {
        setOrganization(item.name);
        setOrganizationId(item.id);
        setView(true)
    }
    const sendOrganization = () => {
        setActive(true);
        let data = {
            name: organization
        }
        mainAxios({
            method: 'post',
            url: 'organizations',
            data: data
        }).then(() => {
            getOrganization();
            setOrganization('');
            setActive(false);
        });
    }
    const editOrganization = () => {
        setActive(true);
        let data = {
            name: organization
        }
        mainAxios({
            method: 'put',
            url: `organizations/${organizationId}`,
            data: data
        }).then(() => {
            getOrganization();
            setOrganization('');
            setActive(false);
        });
    }
    const deleteOrganization = (id) => {
        mainAxios({
            method: 'delete',
            url: `organizations/${id}`,
        }).then(() => {
            getOrganization()
        });
    }


    const getCompetence = () => {
        mainAxios({
            method: 'get',
            url: 'skills',
        }).then((res) => {
            setCompetenceArr(res.data)
        });
    }
    const getDetailCompetence = (item) => {
        setCompetence(item.name);
        setCompetenceId(item.id);
        setView(true)
    }
    const sendCompetence = () => {
        setActive(true);
        let data = {
            name: competence
        }
        mainAxios({
            method: 'post',
            url: 'skills',
            data: data
        }).then(() => {
            getCompetence();
            setCompetence('');
            setActive(false);
        });
    }
    const editCompetence = () => {
        setActive(true);
        let data = {
            name: competence
        }
        mainAxios({
            method: 'put',
            url: `skills/${competenceId}`,
            data: data
        }).then(() => {
            getCompetence();
            setCompetence('');
            setActive(false);
        });
    }
    const deleteCompetence= (id) => {
        mainAxios({
            method: 'delete',
            url: `skills/${id}`,
        }).then(() => {
            getCompetence()
        });
    }

    useEffect(() => {
        getUniversity();
        getCertificate();
        getLanguage();
        getComputer();
        getLegislation();
        getSpeciality();
        getEnterprise();
        getOrganization();
        getVacancy();
        getCompetence();
        getGrade();
        getSubGrade();
        getCache();
    }, []);

    return (
        <Aux>
            <div>
                <div>
                    <div className="block-inn">
                        <Col xs={12}>
                            <div className="block-title flex">
                                Kategoriyalar
                            </div>
                            <Form.Group>
                                <Select
                                    defaultValue={{value: 'university', label: 'Təhsil müəssisələri'}}
                                    placeholder="Kateqoriya seçin"
                                    value={selectedCategory !== null ? selectedCategory : {
                                        value: 'university',
                                        label: 'Təhsil müəssisələri'
                                    }}
                                    onChange={(val) => {
                                        setSelectedCategory(val);
                                        setTab(val.value);
                                        setView(false);
                                        setCheckClick(false)
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
                            <Tab eventKey="university" title="" disabled={tab !== "university"}>
                                <div className="block-inn">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="block-title flex">
                                                Təhsil müəssisələri
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                                    Təhsil müəssisələri
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        universityArr ?
                                                            universityArr.map((item, index) =>
                                                                <Dropdown.Item key={index}>
                                                                    <span>{item.name}</span>
                                                                    <ul className="list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button type="button"
                                                                                    className="btn-transparent btn-edit"
                                                                                    onClick={() => {getDetailUniversity(item); setCheckClick(true)}}>
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
                                                                                    onClick={() => deleteUniversity(item.id)}>
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
                                                        Yeni təhsil müəssisəsini daxil edin
                                                    </div>
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>
                                                                <Form.Control
                                                                    value={university}
                                                                    placeholder="Təhsil müəssisəsini  daxil edin"
                                                                    onChange={e => setUniversity(e.target.value)}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <ul className="btn-block list-unstyled m-0 flex-end">
                                                            <li>
                                                                <Button type="button" className="btn-transparent"
                                                                        onClick={() => {
                                                                            setView(false);
                                                                            setUniversity('')
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
                                                                        onClick={() => checkClick ? editUniversity() : sendUniversity()}>
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
                            <Tab eventKey="certificate" title="" disabled={tab !== "certificate"}>
                                <div className="block-inn">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="block-title flex">
                                                Sertifikatlar
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                                    Sertifikatlar
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        certificateArr ?
                                                            certificateArr.map((item, index) =>
                                                                <Dropdown.Item key={index}>
                                                                    <span>{item.name}</span>
                                                                    <ul className="list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button type="button"
                                                                                    className="btn-transparent btn-edit"
                                                                                    onClick={() => {getDetailCertificate(item); setCheckClick(true)}}>
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
                                                                                    onClick={() => deleteCertificate(item.id)}>
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
                                                        Yeni sertifikatı daxil edin
                                                    </div>
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>
                                                                <Form.Control
                                                                    value={certificate}
                                                                    placeholder="Sertifikatı  daxil edin"
                                                                    onChange={e => setCertificate(e.target.value)}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <ul className="btn-block list-unstyled m-0 flex-end">
                                                            <li>
                                                                <Button type="button" className="btn-transparent"
                                                                        onClick={() => {
                                                                            setView(false);
                                                                            setCertificate('')
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
                                                                        onClick={() => checkClick ? editCertificate() : sendCertificate()}>
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
                            <Tab eventKey="vacancy" title="" disabled={tab !== "vacancy"}>
                                <div className="block-inn">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="block-title flex">
                                                Vakansiyalar
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                                    Vakansiyalar
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        vacancyArr ?
                                                            vacancyArr.map((item, index) =>
                                                                <Dropdown.Item key={index}>
                                                                    <span>{item.name}</span>
                                                                    <ul className="list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button type="button"
                                                                                    className="btn-transparent btn-edit"
                                                                                    onClick={() => {getDetailVacancy(item); setCheckClick(true)}}>
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
                                                                                    onClick={() => deleteVacancy(item.id)}>
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
                                                        Yeni vakansiya daxil edin
                                                    </div>
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>
                                                                <Form.Control
                                                                    value={vacancy}
                                                                    placeholder="Vakansiya  daxil edin"
                                                                    onChange={e => setVacancy(e.target.value)}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <ul className="btn-block list-unstyled m-0 flex-end">
                                                            <li>
                                                                <Button type="button" className="btn-transparent"
                                                                        onClick={() => {
                                                                            setView(false);
                                                                            setVacancy('')
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
                                                                        onClick={() => checkClick ? editVacancy() : sendVacancy()}>
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
                            <Tab eventKey="grade" title="" disabled={tab !== "grade"}>
                                <div className="block-inn">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="block-title flex">
                                                Dərəcə
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                                    Dərəcə
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        gradeArr ?
                                                            gradeArr.map((item, index) =>
                                                                <Dropdown.Item key={index}>
                                                                    <span>{item.grade}</span>
                                                                    <ul className="list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button type="button"
                                                                                    className="btn-transparent btn-edit"
                                                                                    onClick={() => {getDetailGrade(item); setCheckClick(true)}}>
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
                                                                                    onClick={() => deleteGrade(item.id)}>
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
                                                        Dərəcə daxil edin
                                                    </div>
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={grade}
                                                                    placeholder=" Dərəcə daxil edin"
                                                                    onChange={e => setGrade(e.target.value)}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <ul className="btn-block list-unstyled m-0 flex-end">
                                                            <li>
                                                                <Button type="button" className="btn-transparent"
                                                                        onClick={() => {
                                                                            setView(false);
                                                                            setGrade('')
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
                                                                        onClick={() => checkClick ? editGrade() : sendGrade()}>
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
                            <Tab eventKey="subGrade" title="" disabled={tab !== "subGrade"}>
                                <div className="block-inn">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="block-title flex">
                                                Alt dərəcə
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                                    Alt dərəcə
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        subGradeArr ?
                                                            subGradeArr.map((item, index) =>
                                                                <Dropdown.Item key={index}>
                                                                    <span>{item.subGrade}</span>
                                                                    <ul className="list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button type="button"
                                                                                    className="btn-transparent btn-edit"
                                                                                    onClick={() => {getDetailSubGrade(item); setCheckClick(true)}}>
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
                                                                                    onClick={() => deleteSubGrade(item.id)}>
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
                                                       Alt dərəcə daxil edin
                                                    </div>
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>
                                                                <Form.Control
                                                                    value={subGrade}
                                                                    placeholder=" Alt dərəcə daxil edin"
                                                                    onChange={e => setSubGrade(e.target.value)}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <ul className="btn-block list-unstyled m-0 flex-end">
                                                            <li>
                                                                <Button type="button" className="btn-transparent"
                                                                        onClick={() => {
                                                                            setView(false);
                                                                            setSubGrade('')
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
                                                                        onClick={() => checkClick ? editSubGrade() : sendSubGrade()}>
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
                            <Tab eventKey="language" title="" disabled={tab !== "language"}>
                                <div className="block-inn">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="block-title flex">
                                                Dil biliyi
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                                    Dil biliyi
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        languageArr ?
                                                            languageArr.map((item, index) =>
                                                                <Dropdown.Item key={index}>
                                                                    <span>{item.name}</span>
                                                                    <ul className="list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button type="button"
                                                                                    className="btn-transparent btn-edit"
                                                                                    onClick={() => {getDetailLanguage(item); setCheckClick(true)}}>
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
                                                                                    onClick={() => deleteLanguage(item.id)}>
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
                                                        Dil biliyi daxil edin
                                                    </div>
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>
                                                                <Form.Control
                                                                    value={language}
                                                                    placeholder="Dil biliyi daxil edin"
                                                                    onChange={e => setLanguage(e.target.value)}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <ul className="btn-block list-unstyled m-0 flex-end">
                                                            <li>
                                                                <Button type="button" className="btn-transparent"
                                                                        onClick={() => {
                                                                            setView(false);
                                                                            setLanguage('')
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
                                                                        onClick={() => checkClick ? editLanguage() : sendLanguage()}>
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
                            <Tab eventKey="computer" title="" disabled={tab !== "computer"}>
                                <div className="block-inn">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="block-title flex">
                                                Komputer biliyi
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                                    Komputer biliyi
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        computerArr ?
                                                            computerArr.map((item, index) =>
                                                                <Dropdown.Item key={index}>
                                                                    <span>{item.name}</span>
                                                                    <ul className="list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button type="button"
                                                                                    className="btn-transparent btn-edit"
                                                                                    onClick={() => {getDetailComputer(item); setCheckClick(true)}}>
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
                                                                                    onClick={() => deleteComputer(item.id)}>
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
                                                        Komputer biliyi daxil edin
                                                    </div>
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>
                                                                <Form.Control
                                                                    value={computer}
                                                                    placeholder="Komputer biliyi daxil edin"
                                                                    onChange={e => setComputer(e.target.value)}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <ul className="btn-block list-unstyled m-0 flex-end">
                                                            <li>
                                                                <Button type="button" className="btn-transparent"
                                                                        onClick={() => {
                                                                            setView(false);
                                                                            setComputer('')
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
                                                                        onClick={() => checkClick ? editComputer() : sendComputer()}>
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
                            <Tab eventKey="legislation" title="" disabled={tab !== "legislation"}>
                                <div className="block-inn">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="block-title flex">
                                                Qanunvericilik aktları
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                                    Qanunvericilik aktları
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        legislationArr ?
                                                            legislationArr.map((item, index) =>
                                                                <Dropdown.Item key={index}>
                                                                    <span>{item.name}</span>
                                                                    <ul className="list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button type="button"
                                                                                    className="btn-transparent btn-edit"
                                                                                    onClick={() => {getDetailLegislation(item); setCheckClick(true)}}>
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
                                                                                    onClick={() => deleteLegislation(item.id)}>
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
                                                        Qanunvericilik aktları daxil edin
                                                    </div>
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>
                                                                <Form.Control
                                                                    value={legislation}
                                                                    placeholder="Qanunvericilik aktları daxil edin"
                                                                    onChange={e => setLegislation(e.target.value)}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <ul className="btn-block list-unstyled m-0 flex-end">
                                                            <li>
                                                                <Button type="button" className="btn-transparent"
                                                                        onClick={() => {
                                                                            setView(false);
                                                                            setLegislation('')
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
                                                                        onClick={() => checkClick ? editLegislation() : sendLegislation()}>
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
                            <Tab eventKey="speciality" title="" disabled={tab !== "speciality"}>
                                <div className="block-inn">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="block-title flex">
                                                Təhsil ixtisası
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                                    Təhsil ixtisası
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        specialityArr ?
                                                            specialityArr.map((item, index) =>
                                                                <Dropdown.Item key={index}>
                                                                    <span>{item.name}</span>
                                                                    <ul className="list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button type="button"
                                                                                    className="btn-transparent btn-edit"
                                                                                    onClick={() => {getDetailSpeciality(item); setCheckClick(true)}}>
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
                                                                                    onClick={() => deleteSpeciality(item.id)}>
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
                                                        Təhsil ixtisası daxil edin
                                                    </div>
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>
                                                                <Form.Control
                                                                    value={speciality}
                                                                    placeholder="Təhsil ixtisası  daxil edin"
                                                                    onChange={e => setSpeciality(e.target.value)}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <ul className="btn-block list-unstyled m-0 flex-end">
                                                            <li>
                                                                <Button type="button" className="btn-transparent"
                                                                        onClick={() => {
                                                                            setView(false);
                                                                            setSpeciality('')
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
                                                                        onClick={() => checkClick ? editSpeciality() : sendSpeciality()}>
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
                            <Tab eventKey="enterprise" title="" disabled={tab !== "enterprise"}>
                                <div className="block-inn">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="block-title flex">
                                                Müəssisələr
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                                    Müəssisələr
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        enterpriseArr ?
                                                            enterpriseArr.map((item, index) =>
                                                                <Dropdown.Item key={index}>
                                                                    <span>{item.name}</span>
                                                                    <ul className="list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button type="button"
                                                                                    className="btn-transparent btn-edit"
                                                                                    onClick={() => {getDetailEnterprise(item); setCheckClick(true)}}>
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
                                                                                    onClick={() => deleteEnterprise(item.id)}>
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
                                                        Müəssisə  daxil edin
                                                    </div>
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>
                                                                <Form.Control
                                                                    value={enterprise}
                                                                    placeholder="Müəssisə daxil edin"
                                                                    onChange={e => setEnterprise(e.target.value)}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <ul className="btn-block list-unstyled m-0 flex-end">
                                                            <li>
                                                                <Button type="button" className="btn-transparent"
                                                                        onClick={() => {
                                                                            setView(false);
                                                                            setEnterprise('')
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
                                                                        onClick={() => checkClick ? editEnterprise() : sendEnterprise()}>
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

                            <Tab eventKey="organization" title="" disabled={tab !== "organization"}>
                                <div className="block-inn">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="block-title flex">
                                                Təltifi verən orqanın adı
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                                    Təltifi verən orqanın adı
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        organizationArr ?
                                                            organizationArr.map((item, index) =>
                                                                <Dropdown.Item key={index}>
                                                                    <span>{item.name}</span>
                                                                    <ul className="list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button type="button"
                                                                                    className="btn-transparent btn-edit"
                                                                                    onClick={() => {getDetailOrganization(item); setCheckClick(true)}}>
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
                                                                                    onClick={() => deleteOrganization(item.id)}>
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
                                                        Təltifi verən orqanı daxil edin
                                                    </div>
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>
                                                                <Form.Control
                                                                    value={organization}
                                                                    placeholder="Təltifi verən orqanı  daxil edin"
                                                                    onChange={e => setOrganization(e.target.value)}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <ul className="btn-block list-unstyled m-0 flex-end">
                                                            <li>
                                                                <Button type="button" className="btn-transparent"
                                                                        onClick={() => {
                                                                            setView(false);
                                                                            setOrganization('')
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
                                                                        onClick={() => checkClick ? editOrganization() : sendOrganization()}>
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
                            <Tab eventKey="competence" title="" disabled={tab !== "competence"}>
                                <div className="block-inn">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="block-title flex">
                                                Vəzifənin tələb etdiyi kompetensiyalar
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                                    Vəzifənin tələb etdiyi kompetensiyalar
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        competenceArr ?
                                                            competenceArr.map((item, index) =>
                                                                <Dropdown.Item key={index}>
                                                                    <span>{item.name}</span>
                                                                    <ul className="list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button type="button"
                                                                                    className="btn-transparent btn-edit"
                                                                                    onClick={() => {getDetailCompetence(item); setCheckClick(true)}}>
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
                                                                                    onClick={() => deleteCompetence(item.id)}>
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
                                                        Vəzifənin tələb etdiyi kompetensiya daxil edin
                                                    </div>
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>
                                                                <Form.Control
                                                                    value={competence}
                                                                    placeholder=" Vəzifənin tələb etdiyi kompetensiya  daxil edin"
                                                                    onChange={e => setCompetence(e.target.value)}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <ul className="btn-block list-unstyled m-0 flex-end">
                                                            <li>
                                                                <Button type="button" className="btn-transparent"
                                                                        onClick={() => {
                                                                            setView(false);
                                                                            setCompetence('')
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
                                                                        onClick={() => checkClick ? editCompetence() : sendCompetence()}>
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
            </div>
        </Aux>
    );
}

export default SettingEducation
