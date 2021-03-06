import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Button, Container, Row, Col, Form, Tabs, Tab} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import {mainAxios} from "../../../components/Axios/axios";
import {uid} from "react-uid";
import {customStyles} from "../../../components/Select/SelectStyle";
import {
    genderOptions,
    evaluationOptions,
    educationDegreeOptions,
    options,
    workConditionOptions,
    workModeOptions,
    vacancyCategoryOptions,
    workPlaceOptions
} from "../../../components/Select/SelectOptions";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";

function CreateStaff() {

    /*check&visibility*/
    const [key, setKey] = useState('general');
    const [dataVal, setDataVal] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    /*check&visibility*/
    const [showButton, setShowButton] = useState(false);

    /*---------------General---------------*/
    /*select*/
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedMinGrade, setSelectedMinGrade] = useState(null);
    const [selectedMaxGrade, setSelectedMaxGrade] = useState(null);
    const [selectedWorkCondition, setSelectedWorkCondition] = useState(null);
    const [selectedWorkMode, setSelectedWorkMode] = useState(null);
    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const [selectedVacancyCategory, setSelectedVacancyCategory] = useState(null);
    const [selectedCurator, setSelectedCurator] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedFamilyJob, setSelectedFamilyJob] = useState(null);
    const [selectedMilitaryAchieve, setSelectedMilitaryAchieve] = useState(null);
    const [selectedHealth, setSelectedHealth] = useState(null);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedSubDepartment, setSelectedSubDepartment] = useState(null);
    const [selectedEducationDegree, setSelectedEducationDegree] = useState(null);
    const [selectedWorkAddress, setSelectedWorkAddress] = useState(null);
    const [selectedRequiredFile, setSelectedRequiredFile] = useState(null);
    const [selectedSpeciality, setSelectedSpeciality] = useState(null);
    /*array*/
    const [institution, setInstitution] = useState([]);
    const [department, setDepartment] = useState([]);
    const [subDepartment, setSubDepartment] = useState([]);
    const [vacancy, setVacancy] = useState([]);
    const [familyJob, setFamilyJob] = useState([]);
    const [skill, setSkill] = useState([]);
    const [positionFunctionArr, setPositionFunctionArr] = useState([""]);
    const [skillArr, setSkillArr] = useState([{requiredSkillId: null, level: null}]);
    const [curator, setCurator] = useState([]);
    const [speciality, setSpeciality] = useState([]);
    const [computerSkill, setComputerSkill] = useState([]);
    const [languageSkill, setLanguageSkill] = useState([]);
    const [legislationSkill, setLegislationSkill] = useState([]);
    const [grade, setGrade] = useState([])
    /*input*/
    const [obeyDepartment, setObeyDepartment] = useState('');
    const [vacancyCount, setVacancyCount] = useState('');
    const [areaExperience, setAreaExperience] = useState('');
    const [leaderExperience, setLeaderExperience] = useState('');
    const [height, setHeight] = useState('');
    const [workConditionPer, setWorkConditionPer] = useState('');
    const [workConditionVac, setWorkConditionVac] = useState('');
    /*checked*/
    const [showHeight, setShowHeight] = useState(false);
    const [showCondition, setCondition] = useState(false)

    /*-----------Knowledge------------*/
    const [skillProgramArr, setSkillProgramArr] = useState([{computerId: null, level: null}]);
    const [skillLegalArr, setSkillLegalArr] = useState([{legislationId: null, level: null}]);
    const [skillLanguageArr, setSkillLanguageArr] = useState([{languageId: null, level: null}]);

    const getInstitution = () => {
        mainAxios({
            method: 'get',
            url: 'work-institutions',
        }).then((res) => {
            setInstitution(res.data)
        });
    }

    const getDepartment = () => {
        mainAxios({
            method: 'get',
            url: 'departments',
        }).then((res) => {
            setDepartment(res.data);
        });
    }

    const getSubDepartment = (id) => {
        mainAxios({
            method: 'get',
            url: `departments/${id}/sub-departments`,
        }).then((res) => {
            setSubDepartment(res.data);

        });
    }

    const getCurators = () => {
        mainAxios({
            method: 'get',
            url: `employees/curators`,
        }).then((res) => {
            setCurator(res.data);

        });
    }

    const getVacancy = () => {
        mainAxios({
            method: 'get',
            url: 'positions',
        }).then((res) => {
            let arr = res.data;
            //arr.push({name: 'Dig??r'})
            setVacancy(arr);
        });
    }

    const getGrade = () => {
        mainAxios({
            method: 'get',
            url: 'grades',
        }).then((res) => {
            let data = res.data;
            setGrade(data);
        });
    }


    const getFamilyJob = () => {
        mainAxios({
            method: 'get',
            url: 'job-families',
        }).then((res) => {
            setFamilyJob(res.data);
        });
    }

    const getSpeciality = () => {
        mainAxios({
            method: 'get',
            url: 'specialities',
        }).then((res) => {
            setSpeciality(res.data)
        });
    }

    const getSkill = () => {
        mainAxios({
            method: 'get',
            url: 'skills',
        }).then((res) => {
            setSkill(res.data);
        });
    }

    const getComputerSkill = () => {
        mainAxios({
            method: 'get',
            url: 'computers',
        }).then((res) => {
            setComputerSkill(res.data)
        });
    }

    const getLanguageSkill = () => {
        mainAxios({
            method: 'get',
            url: 'languages',
        }).then((res) => {
            setLanguageSkill(res.data)
        });
    }

    const getLegislationSkill = () => {
        mainAxios({
            method: 'get',
            url: 'legislations',
        }).then((res) => {
            setLegislationSkill(res.data)
        });
    }

    const getHeight = (val) => {
        val.value === 1 ? setShowHeight(true) : setShowHeight(false)
    }

    const addSkill = () => {
        setSkillArr([...skillArr, {requiredSkillId: null, level: null}])
    }

    const addProgramSkill = () => {
        setSkillProgramArr([...skillProgramArr, {computerId: null, level: null}])
    }

    const addLegalSkill = () => {
        setSkillLegalArr([...skillLegalArr, {legislationId: null, level: null}])
    }

    const addLanguageSkill = () => {
        setSkillLanguageArr([...skillLanguageArr, {languageId: null, level: null}])
    }

    const addPositionFunction = () => {
        setPositionFunctionArr(positionFunctionArr => [...positionFunctionArr, " "])
    }

    const sendGeneralData = () => {
        setLoading(true);
        let checkLegalArr = 0

        for (let i of skillLegalArr) {
            if (skillLegalArr.length === 1 && i.legislationId === null) {
                checkLegalArr = 1
            }
        }
        let data = {
            "generalInformation": {
                "conditionalAdditionPercentage": workConditionPer !== '' ? parseFloat(workConditionPer) : null,
                "conditionalAdditionVacation": workConditionVac !== '' ? parseFloat(workConditionVac) : null,
                "count": parseFloat(vacancyCount),
                "curatorId": selectedCurator !== null ? selectedCurator.id : null,
                "departmentId": selectedDepartment !== null ? selectedDepartment.id : null,
                "educationStatus": selectedEducationDegree !== null ? selectedEducationDegree.value : null,
                "experience": {
                    "area": parseFloat(areaExperience),
                    "leader": parseFloat(leaderExperience)
                },
                "functionalities": positionFunctionArr,
                "gender": selectedGender !== null ? selectedGender.value : null,
                "gradeRange": {
                    "min": selectedMinGrade !== null ? selectedMinGrade.grade : null,
                    "max": selectedMaxGrade !== null ? selectedMaxGrade.grade : null
                },
                "healthy": selectedHealth !== null ? selectedHealth.value : null,
                "height": parseFloat(height),
                "institutionId": selectedInstitution !== null ? selectedInstitution.id : null,
                "militaryRequire": selectedMilitaryAchieve !== null ? selectedMilitaryAchieve.value : null,
                "positionCategory": selectedVacancyCategory !== null ? selectedVacancyCategory.value : null,
                "positionId": selectedVacancy !== null ? selectedVacancy.id : null,
                "legislationStatementSet": checkLegalArr ? [] : skillLegalArr,
                "specialityId": selectedSpeciality !== null ? selectedSpeciality.id : null,
                "subDepartmentId": selectedSubDepartment !== null ? selectedSubDepartment.id : null,
                "workCondition": selectedWorkCondition !== null ? selectedWorkCondition.value : null,
                "workMode": selectedWorkMode !== null ? selectedWorkMode.value : null,
                "workPlace": selectedWorkAddress !== null ? selectedWorkAddress.value : null,
                "jobFamilyId": selectedFamilyJob !== null ? selectedFamilyJob.id : null,
                "subordinateDepartment": obeyDepartment,
                "requireCertificate": selectedRequiredFile !== null ? selectedRequiredFile.value : null
            }

        }
        mainAxios({
            method: 'post',
            url: 'vacancies',
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setKey('knowledge');
            setShowButton(true);
            setDataVal(res.data);
            setErrors({})
        }).catch((error) => {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                text: 'M??lumatlar qeyd edilm??di!',
                cancelButtonText: 'Ba??la',
                showCancelButton: true,
                showConfirmButton: false,
            })
            if (error.response.data.validations) {
                setErrors(error.response.data.validations)
            } else {
                setErrors({})
            }
        });
    }

    const sendGeneralUpdate = () => {
        setLoading(true);
        let checkLegalArr = 0

        for (let i of skillLegalArr) {
            if (skillLegalArr.length === 1 && i.legislationId === null) {
                checkLegalArr = 1
            }
        }
        let data = {
            "generalInformation": {
                "conditionalAdditionPercentage": workConditionPer !== '' ? workConditionPer : null,
                "count": parseFloat(vacancyCount),
                "curatorId": selectedCurator !== null ? selectedCurator.id : null,
                "departmentId": selectedDepartment !== null ? selectedDepartment.id : null,
                "educationStatus": selectedEducationDegree !== null ? selectedEducationDegree.value : null,
                "experience": {
                    "area": parseFloat(areaExperience),
                    "leader": parseFloat(leaderExperience)
                },
                "functionalities": positionFunctionArr,
                "gender": selectedGender !== null ? selectedGender.value : null,
                "gradeRange": {
                    "min": selectedMinGrade !== null ? selectedMinGrade.grade : null,
                    "max": selectedMaxGrade !== null ? selectedMaxGrade.grade : null
                },
                "healthy": selectedHealth !== null ? selectedHealth.value : null,
                "height": parseFloat(height),
                "institutionId": selectedInstitution !== null ? selectedInstitution.id : null,
                "militaryRequire": selectedMilitaryAchieve !== null ? selectedMilitaryAchieve.value : null,
                "positionCategory": selectedVacancyCategory !== null ? selectedVacancyCategory.value : null,
                "positionId": selectedVacancy !== null ? selectedVacancy.id : null,
                "legislationStatementSet": checkLegalArr ? [] : skillLegalArr,
                "specialityId": selectedSpeciality !== null ? selectedSpeciality.id : null,
                "subDepartmentId": selectedSubDepartment !== null ? selectedSubDepartment.id : null,
                "workCondition": selectedWorkCondition !== null ? selectedWorkCondition.value : null,
                "workMode": selectedWorkMode !== null ? selectedWorkMode.value : null,
                "workPlace": selectedWorkAddress !== null ? selectedWorkAddress.value : null,
                "jobFamilyId": selectedFamilyJob !== null ? selectedFamilyJob.id : null,
                "subordinateDepartment": obeyDepartment,
                "requireCertificate": selectedRequiredFile !== null ? selectedRequiredFile.value : null
            }
        }
        mainAxios({
            method: 'put',
            url: `vacancies/${dataVal}`,
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setKey('knowledge');
            setErrors({})
        }).catch((error) => {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                text: 'M??lumatlar qeyd edilm??di!',
                cancelButtonText: 'Ba??la',
                showCancelButton: true,
                showConfirmButton: false,
            })
            if (error.response.data.validations) {
                setErrors(error.response.data.validations)
            } else {
                setErrors({})
            }
        });
    }

    const sendDataKnowledge = () => {
        setLoading(true);
        let checkProgramArr = 0

        for (let i of skillProgramArr) {
            if (skillProgramArr.length === 1 && i.computerId === null) {
                checkProgramArr = 1
            }
        }
        let checkLanguageArr = 0

        for (let i of skillLanguageArr) {
            if (skillLanguageArr.length === 1 && i.languageId === null) {
                checkLanguageArr = 1
            }
        }
        let checkSkillArr = 0

        for (let i of skillArr) {
            if (skillArr.length === 1 && i.requiredSkillId === null) {
                checkSkillArr = 1
            }
        }
        let data = {
            "specialityKnowledge": {
                "computerKnowledgeSet": checkProgramArr ? [] : skillProgramArr,
                "languageKnowledgeSet": checkLanguageArr ? [] : skillLanguageArr,
                "requiredKnowledgeSet": checkSkillArr ? [] : skillArr,
            }
        }

        mainAxios({
            method: 'put',
            url: `vacancies/${dataVal}`,
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
        }).catch((error) => {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                text: 'M??lumatlar qeyd edilm??di!',
                cancelButtonText: 'Ba??la',
                showCancelButton: true,
                showConfirmButton: false,
            })
        });
    }

    useEffect(() => {
        getInstitution();
        getDepartment();
        getVacancy();
        getGrade();
        getFamilyJob();
        getSkill();
        getCurators();
        getSpeciality();
        getComputerSkill();
        getLegislationSkill();
        getLanguageSkill();
    }, []);

    return (
        <Aux>
            <div className="create-staff">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title flex-center">
                            <Link to="/staff" className="flex">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.3333 14H7.58333M12.25 8.75L7 14L12.25 19.25" stroke="#193651"
                                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            Struktur v?? ??tat c??dv??li ??lav?? et
                        </div>
                    </div>
                    {
                        loading ? <div className="block"><Loading/></div> :
                            <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                                <Tab eventKey="general" title="??mumi m??lumatlar">
                                    <div className="block">
                                        <Form className="form-list">
                                            <div className="add-block">
                                                <div className="block-inn">
                                                    <div className="block-title">
                                                        Struktur v?? ??tat c??dv??li ??zr?? m??lumatlar
                                                    </div>
                                                    <Row>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">M????ss??nin ad?? *</span>
                                                                <Select
                                                                    placeholder="M????ss??nin ad??n?? se??in"
                                                                    value={selectedInstitution}
                                                                    onChange={(val) => {
                                                                        setSelectedInstitution(val);
                                                                    }}
                                                                    isSearchable={institution ? institution.length > 5 : false}
                                                                    options={institution}
                                                                    getOptionLabel={(option) => (option.name)}
                                                                    getOptionValue={option => option.name}
                                                                    styles={customStyles}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['generalInformation.institutionId'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['generalInformation.institutionId']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">Struktur vahidinin ad?? *</span>
                                                                <Select
                                                                    placeholder="Struktur vahidinin ad??n?? se??in"
                                                                    value={selectedDepartment}
                                                                    onChange={(val) => {
                                                                        setSelectedDepartment(val);
                                                                        getSubDepartment(val.id);
                                                                        setSelectedSubDepartment(null)
                                                                    }}
                                                                    isSearchable={department ? department.length > 5 : false}
                                                                    options={department}
                                                                    getOptionLabel={(option) => (option.name)}
                                                                    getOptionValue={option => option.name}
                                                                    styles={customStyles}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['generalInformation.departmentId'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['generalInformation.departmentId']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">Struktur b??lm??nin ad??</span>
                                                                <Select
                                                                    placeholder="Struktur b??lm??nin ad??n?? se??in"
                                                                    value={selectedSubDepartment}
                                                                    onChange={(val) => {
                                                                        setSelectedSubDepartment(val);
                                                                    }}
                                                                    isSearchable={subDepartment ? subDepartment.length > 5 : false}
                                                                    options={subDepartment}
                                                                    getOptionLabel={(option) => (option.name)}
                                                                    getOptionValue={option => option.name}
                                                                    styles={customStyles}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Tabe struktur b??lm??nin ad??</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        placeholder="Tabe struktur b??lm??nin ad??n?? daxil edin"
                                                                        onChange={(e => setObeyDepartment(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">??tat vahidinin ad?? *</span>
                                                                <Select
                                                                    placeholder="??tat vahidin ad??n?? se??in"
                                                                    value={selectedVacancy}
                                                                    onChange={(val) => {
                                                                        setSelectedVacancy(val);
                                                                    }}
                                                                    isSearchable={vacancy ? vacancy.length > 5 : false}
                                                                    options={vacancy}
                                                                    styles={customStyles}
                                                                    getOptionLabel={(option) => (option.name)}
                                                                    getOptionValue={option => option.name}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['generalInformation.positionId'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['generalInformation.positionId']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">??tat vahidinin say?? *</span>
                                                                <Form.Label>
                                                                    <Form.Control type="number"
                                                                                  placeholder="??tat vahidinin sayn?? daxil edin"
                                                                                  onChange={(e => {
                                                                                      setVacancyCount(e.target.value);
                                                                                  })}/>
                                                                </Form.Label>
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['generalInformation.count'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['generalInformation.count']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">??m??k ????raiti *</span>
                                                                <Select
                                                                    placeholder="??m??k ????raitini se??in"
                                                                    value={selectedWorkCondition}
                                                                    onChange={(val) => {
                                                                        let value = val.value;
                                                                        setSelectedWorkCondition(val);
                                                                        value !== 'HARMLESS' ? setCondition(true) : setCondition(false);

                                                                        if (value !== 'HARMLESS') {
                                                                            setWorkConditionVac('');
                                                                            setWorkConditionPer('');
                                                                        }
                                                                    }}
                                                                    options={workConditionOptions}
                                                                    isSearchable={workConditionOptions ? workConditionOptions.length > 5 : false}
                                                                    styles={customStyles}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['generalInformation.workCondition'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['generalInformation.workCondition']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">??tat vahidinin i?? rejimi *</span>
                                                                <Select
                                                                    placeholder="???? rejimini se??in"
                                                                    value={selectedWorkMode}
                                                                    onChange={setSelectedWorkMode}
                                                                    isSearchable={workModeOptions ? workModeOptions.length > 5 : false}
                                                                    options={workModeOptions}
                                                                    styles={customStyles}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['generalInformation.workMode'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['generalInformation.workMode']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        {
                                                            showCondition ?
                                                                <>
                                                                    <Col xs={6}>
                                                                        <Form.Group className="form-group">
                                                                            <span className="input-title">??m??k ????raiti d??r??c??si</span>
                                                                            <Form.Control
                                                                                value={workConditionPer || ''}
                                                                                type="number"
                                                                                placeholder="??m??k ????raiti d??r??c??si daxil edin"
                                                                                onChange={(e => setWorkConditionPer(e.target.value))}/>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col xs={6}>
                                                                        <Form.Group className="form-group">
                                                                            <span className="input-title">??m??k ????raitin?? g??r?? m??zuniyy??t</span>
                                                                            <Form.Control
                                                                                value={workConditionVac || ''}
                                                                                type="number"
                                                                                placeholder="??m??k ????raitin?? g??r?? m??zuniyy??t daxil edin"
                                                                                onChange={(e => setWorkConditionVac(e.target.value))}/>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </>
                                                                : null
                                                        }
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">??tat vahidinin kateqoriyas?? * </span>
                                                                <Select
                                                                    placeholder="Kateqoriyan?? se??in"
                                                                    value={selectedVacancyCategory}
                                                                    onChange={setSelectedVacancyCategory}
                                                                    isSearchable={vacancyCategoryOptions ? vacancyCategoryOptions.length > 5 : false}
                                                                    options={vacancyCategoryOptions}
                                                                    styles={customStyles}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['generalInformation.positionCategory'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['generalInformation.positionCategory']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">???? ail??si </span>
                                                                <Select
                                                                    placeholder="???? ail??sini se??in"
                                                                    value={selectedFamilyJob}
                                                                    onChange={(val) => {
                                                                        setSelectedFamilyJob(val);
                                                                    }}
                                                                    isSearchable={familyJob ? familyJob.length > 5 : false}
                                                                    options={familyJob}
                                                                    styles={customStyles}
                                                                    getOptionLabel={(option) => (option.name)}
                                                                    getOptionValue={option => option.name}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">???? yerinin ??nvan?? * </span>
                                                                <Select
                                                                    placeholder="???? yerinin ??nvan??n?? se??in"
                                                                    value={selectedWorkAddress}
                                                                    onChange={setSelectedWorkAddress}
                                                                    options={workPlaceOptions}
                                                                    isSearchable={workPlaceOptions ? workPlaceOptions.length > 5 : false}
                                                                    styles={customStyles}
                                                                    getOptionLabel={(option) => (option.label)}
                                                                    getOptionValue={(option) => (option.label)}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['generalInformation.workPlace'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['generalInformation.workPlace']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Struk b. tabe old. kurator r??h. ad, soyad, ata ad??, v??zif??</span>
                                                                <Select
                                                                    placeholder="ad, soyad, ata ad??, v??zif??ni se??in"
                                                                    value={selectedCurator}
                                                                    onChange={(val) => setSelectedCurator(val)}
                                                                    options={curator}
                                                                    isSearchable={curator ? curator.length > 5 : false}
                                                                    styles={customStyles}
                                                                    getOptionLabel={(option) => (option.fullName)}
                                                                    getOptionValue={option => option.fullName}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Min d??r??c?? *</span>
                                                                <Select
                                                                    placeholder="Min d??r??c??ni se??in"
                                                                    value={selectedMinGrade}
                                                                    onChange={setSelectedMinGrade}
                                                                    options={grade}
                                                                    isSearchable={grade ? grade.length > 5 : false}
                                                                    styles={customStyles}
                                                                    getOptionLabel={(option) => (option.grade)}
                                                                    getOptionValue={option => option.grade}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['generalInformation.gradeRange.min'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['generalInformation.gradeRange.min']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Max d??r??c?? </span>
                                                                <Select
                                                                    placeholder="Max d??r??c??ni se??in"
                                                                    value={selectedMaxGrade}
                                                                    onChange={setSelectedMaxGrade}
                                                                    options={grade}
                                                                    isSearchable={grade ? grade.length > 5 : false}
                                                                    styles={customStyles}
                                                                    getOptionLabel={(option) => (option.grade)}
                                                                    getOptionValue={option => option.grade}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['generalInformation.gradeRange.max'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['generalInformation.gradeRange.max']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className="block-inn">
                                                    <div className="block-title">
                                                        Qanunvericilik
                                                    </div>
                                                    <div className="addition-content">
                                                        {
                                                            skillLegalArr.map((item, index) =>
                                                                <div key={uid(item, index)}
                                                                     className={index === 0 ? '' : 'add-item'}>
                                                                    {
                                                                        index === 0 ? null :
                                                                            <div className="add-item-top">
                                                                                <p className="m-0"> #{index + 1}.
                                                                                    Dig??r </p>
                                                                                <Button
                                                                                    className="btn-remove flex-center"
                                                                                    onClick={() => {
                                                                                        skillLegalArr.splice(index, 1);
                                                                                        setSkillLegalArr([...skillLegalArr], skillLegalArr)
                                                                                    }}>
                                                                                    <svg width="14" height="14"
                                                                                         viewBox="0 0 14 14" fill="none"
                                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                                        <path
                                                                                            d="M11.1665 2.69336L10.2739 12.8645H3.7302L2.8378 2.69336L1.70703 2.79248L2.61572 13.1481C2.66354 13.6254 3.07769 13.9997 3.5588 13.9997H10.4453C10.9262 13.9997 11.3405 13.6256 11.3892 13.1413L12.2973 2.79248L11.1665 2.69336Z"
                                                                                            fill="#CF3131"/>
                                                                                        <path
                                                                                            d="M9.08077 0H4.91861C4.397 0 3.97266 0.424348 3.97266 0.945957V2.74326H5.10778V1.13512H8.89155V2.74323H10.0267V0.94593C10.0267 0.424348 9.60238 0 9.08077 0Z"
                                                                                            fill="#CF3131"/>
                                                                                        <path
                                                                                            d="M13.0507 2.17578H0.942574C0.629078 2.17578 0.375 2.42986 0.375 2.74336C0.375 3.05685 0.629078 3.31093 0.942574 3.31093H13.0507C13.3642 3.31093 13.6183 3.05685 13.6183 2.74336C13.6183 2.42986 13.3642 2.17578 13.0507 2.17578Z"
                                                                                            fill="#CF3131"/>
                                                                                    </svg>
                                                                                    <span>Sil</span>
                                                                                </Button>
                                                                            </div>
                                                                    }
                                                                    <Row>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                    <span
                                                                        className="input-title">Qanunvericilik aktlar??</span>
                                                                                <Select
                                                                                    onChange={(val) => {
                                                                                        skillLegalArr[index].legislationId = val.id;
                                                                                        setSkillLegalArr([...skillLegalArr], skillLegalArr);
                                                                                    }}
                                                                                    placeholder="Qanunvericilik aktlar??n?? se??in"
                                                                                    isSearchable={legislationSkill ? legislationSkill.length > 5 : false}
                                                                                    options={legislationSkill}
                                                                                    getOptionLabel={(option) => (option.name)}
                                                                                    getOptionValue={(option) => (option.name)}
                                                                                    styles={customStyles}/>
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {
                                                                                        errors['generalInformation.legislationStatementSet[].legislationId'] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors['generalInformation.legislationStatementSet[].legislationId']}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">Bilik s??viyy??si</span>
                                                                                <Select
                                                                                    onChange={(val) => {
                                                                                        skillLegalArr[index].level = val.value;
                                                                                        setSkillLegalArr([...skillLegalArr], skillLegalArr);
                                                                                    }}
                                                                                    placeholder="Bilik s??viyy??sini se??in"
                                                                                    isSearchable={evaluationOptions ? evaluationOptions.length > 5 : false}
                                                                                    options={evaluationOptions}
                                                                                    styles={customStyles}
                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="flex-end">
                                                        <Button className="btn-main-text"
                                                                onClick={() => addLegalSkill()}
                                                                type="button">
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                                    stroke="#3083DC" strokeWidth="1.3"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"/>
                                                            </svg>
                                                            <span>??lav?? et</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="block-inn">
                                                    <div className="block-title">
                                                        Kvalifikasiya t??l??bl??ri
                                                    </div>
                                                    <Row>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">R??hb??r ??zr?? staj t??l??bi</span>
                                                                <Form.Label>
                                                                    <Form.Control type="number"
                                                                                  placeholder="R??hb??r ??zr?? staj t??l??bini daxil edin"
                                                                                  onChange={(e => setLeaderExperience(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">Sah?? ??zr?? staj t??l??bi</span>
                                                                <Form.Label>
                                                                    <Form.Control type="number"
                                                                                  placeholder="Sah?? ??zr?? staj t??l??bini daxil edin"
                                                                                  onChange={(e => setAreaExperience(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">T??hsil pill??si</span>
                                                                <Select
                                                                    placeholder="T??hsil pill??sini se??in"
                                                                    value={selectedEducationDegree}
                                                                    onChange={setSelectedEducationDegree}
                                                                    isSearchable={educationDegreeOptions ? educationDegreeOptions.length > 5 : false}
                                                                    options={educationDegreeOptions}
                                                                    styles={customStyles}
                                                                />
                                                            </Form.Group>
                                                        </Col>

                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">T??hsil ixtisas??</span>
                                                                <Select
                                                                    placeholder="T??hsil pill??sini se??in"
                                                                    value={selectedSpeciality}
                                                                    onChange={(val) => setSelectedSpeciality(val)}
                                                                    isSearchable={speciality ? speciality.length > 5 : false}
                                                                    options={speciality}
                                                                    getOptionLabel={(option) => (option.name)}
                                                                    styles={customStyles}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Sertifikat t??l??bi</span>
                                                                <Select
                                                                    placeholder="Sertifikat t??l??bini se??in"
                                                                    value={selectedRequiredFile}
                                                                    onChange={setSelectedRequiredFile}
                                                                    isSearchable={options ? options.length > 5 : false}
                                                                    options={options}
                                                                    styles={customStyles}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Boy t??l??bi</span>
                                                                <Select
                                                                    value={selectedOption}
                                                                    onChange={(val) => {
                                                                        getHeight(val);
                                                                        setSelectedOption(val)
                                                                    }}
                                                                    placeholder="Boy t??l??bini se??in"
                                                                    isSearchable={options ? options.length > 5 : false}
                                                                    options={options}
                                                                    styles={customStyles}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">H??rbi m??k??ll??fiyy??t t??l??bi</span>
                                                                <Select
                                                                    placeholder="H??rbi m??k??ll??fiyy??t t??l??bini se??in"
                                                                    value={selectedMilitaryAchieve}
                                                                    onChange={setSelectedMilitaryAchieve}
                                                                    isSearchable={options ? options.length > 5 : false}
                                                                    options={options}
                                                                    styles={customStyles}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        {
                                                            showHeight ?
                                                                <Col xs={12}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">Boy t??l??bi</span>
                                                                        <Form.Label>
                                                                            <Form.Control type="number"
                                                                                          placeholder="Boy t??l??bini daxil edin"
                                                                                          onChange={(e) => setHeight(e.target.value)}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                                : null
                                                        }
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Sa??laml??q t??l??bi</span>
                                                                <Select
                                                                    placeholder="Sa??laml??q t??l??bini se??in"
                                                                    value={selectedHealth}
                                                                    onChange={setSelectedHealth}
                                                                    isSearchable={options ? options.length > 5 : false}
                                                                    options={options}
                                                                    styles={customStyles}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Cinsiyy??t t??l??bi</span>
                                                                <Select
                                                                    placeholder="Cinsiyy??t t??l??bini se??in"
                                                                    value={selectedGender}
                                                                    onChange={setSelectedGender}
                                                                    isSearchable={genderOptions ? genderOptions.length > 5 : false}
                                                                    options={genderOptions}
                                                                    styles={customStyles}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <div className="addition-content">
                                                        {
                                                            positionFunctionArr.map((item, index) =>
                                                                <div key={index}
                                                                     className={index === 0 ? '' : 'add-item'}>
                                                                    {
                                                                        index === 0 ? null :
                                                                            <div className="add-item-top">
                                                                                <p className="m-0"> #{index + 1}.
                                                                                    Dig??r </p>
                                                                                <Button
                                                                                    className="btn-remove flex-center"
                                                                                    onClick={() => {
                                                                                        positionFunctionArr.splice(index, 1);
                                                                                        setPositionFunctionArr([...positionFunctionArr], positionFunctionArr)
                                                                                    }}>
                                                                                    <svg width="14" height="14"
                                                                                         viewBox="0 0 14 14" fill="none"
                                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                                        <path
                                                                                            d="M11.1665 2.69336L10.2739 12.8645H3.7302L2.8378 2.69336L1.70703 2.79248L2.61572 13.1481C2.66354 13.6254 3.07769 13.9997 3.5588 13.9997H10.4453C10.9262 13.9997 11.3405 13.6256 11.3892 13.1413L12.2973 2.79248L11.1665 2.69336Z"
                                                                                            fill="#CF3131"/>
                                                                                        <path
                                                                                            d="M9.08077 0H4.91861C4.397 0 3.97266 0.424348 3.97266 0.945957V2.74326H5.10778V1.13512H8.89155V2.74323H10.0267V0.94593C10.0267 0.424348 9.60238 0 9.08077 0Z"
                                                                                            fill="#CF3131"/>
                                                                                        <path
                                                                                            d="M13.0507 2.17578H0.942574C0.629078 2.17578 0.375 2.42986 0.375 2.74336C0.375 3.05685 0.629078 3.31093 0.942574 3.31093H13.0507C13.3642 3.31093 13.6183 3.05685 13.6183 2.74336C13.6183 2.42986 13.3642 2.17578 13.0507 2.17578Z"
                                                                                            fill="#CF3131"/>
                                                                                    </svg>
                                                                                    <span>Sil</span>
                                                                                </Button>
                                                                            </div>
                                                                    }
                                                                    <Row>
                                                                        <Col xs={12}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">V??zif?? funksiyalar?? </span>
                                                                                <Form.Label>
                                                                                    <Form.Control as="textarea"
                                                                                                  onChange={(e) => {
                                                                                                      positionFunctionArr[index] = e.target.value;
                                                                                                      setPositionFunctionArr([...positionFunctionArr], positionFunctionArr);
                                                                                                  }}
                                                                                                  value={item}
                                                                                                  placeholder="V??zif?? funksiyalar??n?? daxil edin"
                                                                                    />
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            )
                                                        }
                                                        <div className="flex-end">
                                                            <Button className="btn-main-text"
                                                                    type="button"
                                                                    onClick={() => addPositionFunction()}>
                                                                <svg width="12" height="12" viewBox="0 0 12 12"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                                        stroke="#3083DC" strokeWidth="1.3"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"/>
                                                                </svg>
                                                                <span>??lav?? et</span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-vertical-center">
                                                {
                                                    showButton ?
                                                        <Button className="btn-effect w-200"
                                                                onClick={() => sendGeneralUpdate()}>
                                                            Davam et
                                                        </Button>
                                                        :
                                                        <Button className="btn-effect w-200"
                                                                onClick={() => sendGeneralData()}>
                                                            Davam et
                                                        </Button>

                                                }
                                            </div>
                                        </Form>
                                    </div>
                                </Tab>
                                <Tab eventKey="knowledge" title="??xtisas bilikl??ri">
                                    <div className="block">
                                        <Form className="form-list">
                                            <div className="add-block">
                                                <div className="block-title">
                                                    Komp??ter bilikl??ri
                                                </div>
                                                <div className="block-inn">
                                                    <div className="addition-content">
                                                        {
                                                            skillProgramArr.map((item, index) =>
                                                                <div key={uid(item, index)}
                                                                     className={index === 0 ? '' : 'add-item'}>
                                                                    {
                                                                        index === 0 ? null :
                                                                            <div className="add-item-top">
                                                                                <p className="m-0"> #{index + 1}.
                                                                                    Dig??r </p>
                                                                                <Button
                                                                                    className="btn-remove flex-center"
                                                                                    onClick={() => {
                                                                                        skillProgramArr.splice(index, 1);
                                                                                        setSkillProgramArr([...skillProgramArr], skillProgramArr)
                                                                                    }}>
                                                                                    <svg width="14" height="14"
                                                                                         viewBox="0 0 14 14" fill="none"
                                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                                        <path
                                                                                            d="M11.1665 2.69336L10.2739 12.8645H3.7302L2.8378 2.69336L1.70703 2.79248L2.61572 13.1481C2.66354 13.6254 3.07769 13.9997 3.5588 13.9997H10.4453C10.9262 13.9997 11.3405 13.6256 11.3892 13.1413L12.2973 2.79248L11.1665 2.69336Z"
                                                                                            fill="#CF3131"/>
                                                                                        <path
                                                                                            d="M9.08077 0H4.91861C4.397 0 3.97266 0.424348 3.97266 0.945957V2.74326H5.10778V1.13512H8.89155V2.74323H10.0267V0.94593C10.0267 0.424348 9.60238 0 9.08077 0Z"
                                                                                            fill="#CF3131"/>
                                                                                        <path
                                                                                            d="M13.0507 2.17578H0.942574C0.629078 2.17578 0.375 2.42986 0.375 2.74336C0.375 3.05685 0.629078 3.31093 0.942574 3.31093H13.0507C13.3642 3.31093 13.6183 3.05685 13.6183 2.74336C13.6183 2.42986 13.3642 2.17578 13.0507 2.17578Z"
                                                                                            fill="#CF3131"/>
                                                                                    </svg>
                                                                                    <span>Sil</span>
                                                                                </Button>
                                                                            </div>
                                                                    }
                                                                    <Row>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                            <span
                                                                                className="input-title">Proqram ad??</span>
                                                                                <Select
                                                                                    placeholder="Bilik s??viyy??sini se??in"
                                                                                    onChange={(val) => {
                                                                                        skillProgramArr[index].computerId = val.id;
                                                                                        setSkillProgramArr([...skillProgramArr], skillProgramArr);
                                                                                    }}
                                                                                    isSearchable={computerSkill ? computerSkill.length > 5 : false}
                                                                                    options={computerSkill}
                                                                                    getOptionLabel={(option) => (option.name)}
                                                                                    getOptionValue={(option) => (option.name)}
                                                                                    styles={customStyles}/>
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {
                                                                                        errors['specialityKnowledge.computerKnowledgeSet[].computerId'] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors['generalInformation.computerKnowledgeSet[].computerId']}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">Bilik s??viyy??si</span>
                                                                                <Select
                                                                                    onChange={(val) => {
                                                                                        skillProgramArr[index].level = val.value;
                                                                                        setSkillProgramArr([...skillProgramArr], skillProgramArr);
                                                                                    }}
                                                                                    placeholder="Bilik s??viyy??sini se??in"
                                                                                    isSearchable={evaluationOptions ? evaluationOptions.length > 5 : false}
                                                                                    options={evaluationOptions}
                                                                                    styles={customStyles}
                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="flex-end">
                                                        <Button className="btn-main-text"
                                                                onClick={() => addProgramSkill()}
                                                                type="button">
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                                    stroke="#3083DC" strokeWidth="1.3"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"/>
                                                            </svg>
                                                            <span>??lav?? et</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="add-block">
                                                <div className="block-title">
                                                    Dil bilikl??ri
                                                </div>
                                                <div className="block-inn">
                                                    <div className="addition-content">
                                                        {
                                                            skillLanguageArr.map((item, index) =>
                                                                <div key={uid(item, index)}
                                                                     className={index === 0 ? '' : 'add-item'}>
                                                                    {
                                                                        index === 0 ? null :
                                                                            <div className="add-item-top">
                                                                                <p className="m-0"> #{index + 1}.
                                                                                    Dig??r </p>
                                                                                <Button
                                                                                    className="btn-remove flex-center"
                                                                                    onClick={() => {
                                                                                        skillLanguageArr.splice(index, 1);
                                                                                        setSkillLanguageArr([...skillLanguageArr], skillLanguageArr)
                                                                                    }}>
                                                                                    <svg width="14" height="14"
                                                                                         viewBox="0 0 14 14" fill="none"
                                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                                        <path
                                                                                            d="M11.1665 2.69336L10.2739 12.8645H3.7302L2.8378 2.69336L1.70703 2.79248L2.61572 13.1481C2.66354 13.6254 3.07769 13.9997 3.5588 13.9997H10.4453C10.9262 13.9997 11.3405 13.6256 11.3892 13.1413L12.2973 2.79248L11.1665 2.69336Z"
                                                                                            fill="#CF3131"/>
                                                                                        <path
                                                                                            d="M9.08077 0H4.91861C4.397 0 3.97266 0.424348 3.97266 0.945957V2.74326H5.10778V1.13512H8.89155V2.74323H10.0267V0.94593C10.0267 0.424348 9.60238 0 9.08077 0Z"
                                                                                            fill="#CF3131"/>
                                                                                        <path
                                                                                            d="M13.0507 2.17578H0.942574C0.629078 2.17578 0.375 2.42986 0.375 2.74336C0.375 3.05685 0.629078 3.31093 0.942574 3.31093H13.0507C13.3642 3.31093 13.6183 3.05685 13.6183 2.74336C13.6183 2.42986 13.3642 2.17578 13.0507 2.17578Z"
                                                                                            fill="#CF3131"/>
                                                                                    </svg>
                                                                                    <span>Sil</span>
                                                                                </Button>
                                                                            </div>
                                                                    }
                                                                    <Row>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                            <span
                                                                                className="input-title">Dil biliyi</span>
                                                                                <Select
                                                                                    placeholder="Dil biliyini se??in"
                                                                                    onChange={(val) => {
                                                                                        skillLanguageArr[index].languageId = val.id;
                                                                                        setSkillLanguageArr([...skillLanguageArr], skillLanguageArr);
                                                                                    }}
                                                                                    isSearchable={languageSkill ? languageSkill.length > 5 : false}
                                                                                    options={languageSkill}
                                                                                    getOptionLabel={(option) => (option.name)}
                                                                                    getOptionValue={(option) => (option.name)}
                                                                                    styles={customStyles}/>
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {
                                                                                        errors['specialityKnowledge.languageKnowledgeSet[].languageId'] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors['generalInformation.languageKnowledgeSet[].languageId']}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">Bilik s??viyy??si</span>
                                                                                <Select
                                                                                    onChange={(val) => {
                                                                                        skillLanguageArr[index].level = val.value;
                                                                                        setSkillLanguageArr([...skillLanguageArr], skillLanguageArr);
                                                                                    }}
                                                                                    placeholder="Bilik s??viyy??sini se??in"
                                                                                    isSearchable={evaluationOptions ? evaluationOptions.length > 5 : false}
                                                                                    options={evaluationOptions}
                                                                                    styles={customStyles}
                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="flex-end">
                                                        <Button className="btn-main-text"
                                                                onClick={() => addLanguageSkill()}
                                                                type="button">
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                                    stroke="#3083DC" strokeWidth="1.3"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"/>
                                                            </svg>
                                                            <span>??lav?? et</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="add-block">
                                                <div className="block-title">
                                                    V??zif??nin t??l??b etdiyi kompetensiyalar
                                                </div>
                                                <div className="block-inn">
                                                    <div className="addition-content">
                                                        {
                                                            skillArr.map((item, index) =>
                                                                <div key={uid(item, index)}
                                                                     className={index === 0 ? '' : 'add-item'}>
                                                                    {
                                                                        index === 0 ? null :
                                                                            <div className="add-item-top">
                                                                                <p className="m-0"> #{index + 1}.
                                                                                    Dig??r </p>
                                                                                <Button
                                                                                    className="btn-remove flex-center"
                                                                                    onClick={() => {
                                                                                        skillArr.splice(index, 1);
                                                                                        setSkillArr([...skillArr], skillArr)
                                                                                    }}>
                                                                                    <svg width="14" height="14"
                                                                                         viewBox="0 0 14 14" fill="none"
                                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                                        <path
                                                                                            d="M11.1665 2.69336L10.2739 12.8645H3.7302L2.8378 2.69336L1.70703 2.79248L2.61572 13.1481C2.66354 13.6254 3.07769 13.9997 3.5588 13.9997H10.4453C10.9262 13.9997 11.3405 13.6256 11.3892 13.1413L12.2973 2.79248L11.1665 2.69336Z"
                                                                                            fill="#CF3131"/>
                                                                                        <path
                                                                                            d="M9.08077 0H4.91861C4.397 0 3.97266 0.424348 3.97266 0.945957V2.74326H5.10778V1.13512H8.89155V2.74323H10.0267V0.94593C10.0267 0.424348 9.60238 0 9.08077 0Z"
                                                                                            fill="#CF3131"/>
                                                                                        <path
                                                                                            d="M13.0507 2.17578H0.942574C0.629078 2.17578 0.375 2.42986 0.375 2.74336C0.375 3.05685 0.629078 3.31093 0.942574 3.31093H13.0507C13.3642 3.31093 13.6183 3.05685 13.6183 2.74336C13.6183 2.42986 13.3642 2.17578 13.0507 2.17578Z"
                                                                                            fill="#CF3131"/>
                                                                                    </svg>
                                                                                    <span>Sil</span>
                                                                                </Button>
                                                                            </div>
                                                                    }
                                                                    <Row>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">Kompetensiyalar</span>
                                                                                <Select
                                                                                    placeholder="Kompetensiyalar?? se??in"
                                                                                    onChange={(val) => {
                                                                                        skillArr[index].requiredSkillId = val.id;
                                                                                        setSkillArr([...skillArr], skillArr);
                                                                                    }}
                                                                                    isSearchable={skill ? skill.length > 5 : false}
                                                                                    options={skill}
                                                                                    styles={customStyles}
                                                                                    getOptionLabel={(option) => (option.name)}
                                                                                    getOptionValue={(option) => (option.name)}
                                                                                />
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {
                                                                                        errors['specialityKnowledge.requiredKnowledgeSet[].requiredSkillId'] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors['specialityKnowledge.requiredKnowledgeSet[].requiredSkillId']}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">T??l??b olunan s??viyy??</span>
                                                                                <Select
                                                                                    onChange={(val) => {
                                                                                        skillArr[index].level = val.value;
                                                                                        setSkillArr([...skillArr], skillArr);
                                                                                    }}
                                                                                    isSearchable={evaluationOptions ? evaluationOptions.length > 5 : false}
                                                                                    placeholder="S??viyy??ni se??in"
                                                                                    options={evaluationOptions}
                                                                                    styles={customStyles}
                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            )
                                                        }
                                                        <div className="flex-end">
                                                            <Button type="button" className="btn-main-text"
                                                                    onClick={() => addSkill()}>
                                                                <svg width="12" height="12" viewBox="0 0 12 12"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                                        stroke="#3083DC" strokeWidth="1.3"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"/>
                                                                </svg>
                                                                <span>??lav?? et</span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                showButton ?
                                                    <ul className="flex-vertical-center btn-block list-unstyled">
                                                        <li>
                                                            <Button className="btn-transparent" onClick={() => {
                                                                setKey('general')
                                                            }}>
                                                                <svg width="16" height="12" viewBox="0 0 16 12"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M15 6H1.5M5.5 1.5L1 6L5.5 10.5"
                                                                          stroke="#193651"
                                                                          strokeWidth="2" strokeLinecap="round"
                                                                          strokeLinejoin="round"/>
                                                                </svg>
                                                                ??vv??l?? qay??t
                                                            </Button>
                                                        </li>
                                                        <li>
                                                            <Button className="btn-effect w-200"
                                                                    onClick={() => sendDataKnowledge()}>
                                                                Yadda saxla
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                    : null
                                            }
                                        </Form>
                                    </div>
                                </Tab>
                            </Tabs>
                    }
                </Container>
            </div>
        </Aux>

    );
}

export default CreateStaff
