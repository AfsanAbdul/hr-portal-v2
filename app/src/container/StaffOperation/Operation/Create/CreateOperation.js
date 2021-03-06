import React, {useState, useEffect} from 'react';
import Aux from "../../../../hoc/Auxiliary";
import {Button, Container, Row, Col, Form, Tabs, Tab, Table} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import Select from 'react-select';
import {mainAxios} from "../../../../components/Axios/axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import Swal from 'sweetalert2';
import {uid} from "react-uid";
import Indicator from "../../../../components/Loading/Indicator";
import {customStyles} from "../../../../components/Select/SelectStyle";
import TimePicker from 'react-time-picker';
import MultiDatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import {
    workModeOptions,
    disciplineOptions,
    jobTimeOptions,
    vacationTypeOptions,
    jobTypeOptions
} from "../../../../components/Select/SelectOptions";

function CreateOperation() {
    let history = useHistory();
    const [operationType, setOperationType] = useState([]);
    const [operationTypeArr, setOperationTypeArr] = useState([]);
    const [selectedOperationType, setSelectedOperationType] = useState(null);
    const [tab, setTab] = useState('')
    const [errors, setErrors] = useState({});
    const [loadingIndicator, setLoadingIndicator] = useState(false);


    /*------Employee----------*/
    const [employeeId, setEmployeeId] = useState('');
    const [employee, setEmployee] = useState([]);
    const [department, setDepartment] = useState('')
    const [subDepartment, setSubDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [getEndDate, setGetEndDate] = useState('');
    const [vacationEndDate, setVacationEndDate] = useState('');
    const [eventName, setEventName] = useState('');
    const [vacationDay, setVacationDay] = useState('');
    const [seriesNumber, setSeriesNumber] = useState('');
    const [sicNo, setSicNo] = useState('');
    const [collectiveAgreeOpt, setCollectiveAgreeOpt] = useState([]);
    const [selectedCollectAgree, setSelectedCollectAgree] = useState(null);
    const [employeeMainSalary, setEmployeeMainSalary] = useState('');
    const [employeeIndividualAdd, setEmployeeIndividualAdd] = useState('');
    const [employeeConditionalAdd, setEmployeeConditionalAdd] = useState('');
    const [cityArr, setCityArr] = useState([]);
    const [nonWorkDayArr, setNonWorkDayArr] = useState([]);
    const [nonWorkDays, setNonWorkDays] = useState([]);
    const [nonWorkStartDay, setNonWorkStartDay] = useState('');
    const [nonWorkEndDay, setNonWorkEndDay] = useState('');
    const [nonWorkDayCount, setNonWorkDayCount] = useState('');
    const [changeTempo, setChangeTempo] = useState(false);
    const [selectedAssignEmpId, setSelectedAssignEmpId] = useState(null);
    const [assignDepartment, setAssignDepartment] = useState('');
    const [assignSubDepartment, setAssignSubDepartment] = useState('');
    const [assignPosition, setAssignPosition] = useState('');
    const [assignMainSalary, setAssignMainSalary] = useState('');
    const [assignWorkPlace, setAssignWorkPlace] = useState('');
    const [assignCheck, setAssignCheck] = useState('');
    const [selectedVacation, setSelectedVacation] = useState(null);
    const [obeyDepartment, setObeyDepartment] = useState('');


    /*------Vacancy----------*/
    const [vacancy, setVacancy] = useState([]);
    const [vacancyPosition, setVacancyPosition] = useState('');
    const [vacancyDepartment, setVacancyDepartment] = useState('');
    const [vacancySubDepartment, setVacancySubDepartment] = useState('');
    const [vacancyId, setVacancyId] = useState('');
    const [vacancyCount, setVacancyCount] = useState('');
    const [vacancyWorkMode, setVacancyWorkMode] = useState('');
    const [vacancyWorkPlace, setVacancyWorkPlace] = useState('');
    const [vacancyCategory, setVacancyCategory] = useState('');
    const [vacancyObeyDepartment, setVacancyObeyDepartment] = useState('');


    /*------General----------*/
    const [mainOfOrder, setMainOfOrder] = useState('');
    const [testPeriod, setTestPeriod] = useState('');
    const [individualAddition, setIndividualAddition] = useState('');
    const [selectedJobTime, setSelectedJobTime] = useState(null);
    const [selectedJobType, setSelectedJobType] = useState(null);
    const [grade, setGrade] = useState([])
    const [gradeArr, setGradeArr] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [subGrade, setSubGrade] = useState([]);
    const [vacation, setVacation] = useState([])
    const [selectedSubGrade, setSelectedSubGrade] = useState(null);
    const [vacancyMinGrade, setVacancyMinGrade] = useState(null);
    const [vacancyMaxGrade, setVacancyMaxGrade] = useState(null);
    const [joinDate, setJoinDate] = useState(null);
    const [jobDay, setJobDay] = useState('')
    const [showVacation, setShowVacation] = useState(false);
    const [amount, setAmount] = useState('');
    const [selectedVacOp, setSelectedVacOp] = useState(null);
    const [vacOperationOption, setVacOperationOption] = useState([]);
    const [debtCheck, setDebtCheck] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [newStartTime, setNewStartTime] = useState('');
    const [newEndTime, setNewEndTime] = useState('');
    const [otherExpCheck, setOtherExpCheck] = useState(false);
    const [dailyExpCheck, setDailyExpCheck] = useState(false);
    const [hotelExpCheck, setHotelExpCheck] = useState(false);
    const [multiDate, setMultiDate] = useState([]);
    const [paymentArr, setPaymentArr] = useState([]);


    const [vacationArr, setVacationArr] = useState([{
        vacationType: null,
        day: null
    }]);

    const [employeeInfoArr, setEmployeeInfoArr] = useState([{
        id: null,
        department: null,
        subDepartment: null,
        position: null,
    }]);

    const [overtimeEmpArr, setOvertimeEmpArr] = useState([{
        id: null,
        date: null,
        startTime: null,
        endTime: null,
        department: null,
        subDepartment: null,
        obeyDepartment: null,
        position: null,
    }]);

    const [businessTripArr, setBusinessTripArr] = useState([{
        cityId: null,
        fromCheckInHotel: false,
        fromDate: null,
        toCheckInHotel: false,
        toDate: null,
    }])

    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedNewWorkMode, setSelectedNewWorkMode] = useState(null);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [save, setSave] = useState(false);
    const [workMode, setWorkMode] = useState('');
    const [callBackReason, setCallBackReason] = useState('');
    const [businessTripPeriod, setBusinessTripPeriod] = useState('');

    const [compensation, setCompensation] = useState('');
    const [articleArr, setArticleArr] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(false);


    const addVacationArr = () => {
        setVacationArr(vacationArr => [...vacationArr, {
            vacationType: null,
            day: null
        }])
    }

    const addEmployeeInfoArr = () => {
        setEmployeeInfoArr(employeeInfoArr => [...employeeInfoArr, {
            id: null,
            department: null,
            subDepartment: null,
            position: null,
        }])
    }

    const addOvertimeEmpArr = () => {
        setOvertimeEmpArr(overtimeEmpArr => [...overtimeEmpArr, {
            id: null,
            date: null,
            startTime: null,
            endTime: null,
            department: null,
            subDepartment: null,
            obeyDepartment: null,
            position: null,
        }])
    }

    const addBusinessTripArr = () => {
        setBusinessTripArr(businessTripArr => [...businessTripArr, {
            cityId: null,
            fromCheckInHotel: false,
            fromDate: null,
            toCheckInHotel: false,
            toDate: null,
        }])
    }

    const getOperationName = () => {
        mainAxios({
            method: 'get',
            url: 'operations/types',
        }).then((res) => {
            setOperationTypeArr(res.data);
        });
    }

    const getEmployee = () => {
        mainAxios({
            method: 'get',
            url: 'employees/all',
        }).then((res) => {
            let data = res.data;
            let arr = [];
            if (data.length > 0)
                data.forEach(function (element) {
                    arr.push({id: element.id, name: element.fullName !== null ? element.fullName : null})
                });
            setEmployee(arr);
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

    const getSubGrade = () => {
        mainAxios({
            method: 'get',
            url: 'sub-grades',
        }).then((res) => {
            let data = res.data;
            setSubGrade(data);
        });
    }

    const getEmployeeDetail = (id) => {
        mainAxios({
            method: 'get',
            url: `employees/${id}/operation-info`,
        }).then((res) => {
            let data = res.data
            setDepartment(data.department);
            setSubDepartment(data.subDepartment);
            setPosition(data.position);
            setWorkMode(data.workMode);
            setObeyDepartment(data.subordinateDepartment);
            setCompensation(data.compensation);
            let salary = res.data.salary;
            if (salary !== null) {
                setEmployeeMainSalary(salary.mainSalary);
                setEmployeeIndividualAdd(salary.individualAddition);
                setEmployeeConditionalAdd(salary.conditionalAddition);
            }
            if (tab == '12') {
                getVacancyData(data.vacancyId)
            }
        });
    }

    const getAssignEmpDetail = (id) => {
        mainAxios({
            method: 'get',
            url: `employees/${id}/operation-info`,
        }).then((res) => {
            let data = res.data
            setAssignDepartment(data.department);
            setAssignSubDepartment(data.subDepartment);
            setAssignPosition(data.position);
            setAssignWorkPlace(data.workPlace);
            let salary = res.data.salary;
            if (salary !== null) {
                setAssignMainSalary(salary.mainSalary);
            }
        });
    }

    const getWarningDetail = (id, index) => {
        mainAxios({
            method: 'get',
            url: `employees/${id}/operation-info`,
        }).then((res) => {
            let data = res.data
            if (tab == '50') {
                overtimeEmpArr[index].id = id;
                overtimeEmpArr[index].department = data.department;
                overtimeEmpArr[index].subDepartment = data.subDepartment;
                overtimeEmpArr[index].position = data.position;
                overtimeEmpArr[index].obeyDepartment = data.obeyDepartment;
                overtimeEmpArr[index].date = null;
                overtimeEmpArr[index].startTime = null;
                overtimeEmpArr[index].endTime = null;
                setOvertimeEmpArr([...overtimeEmpArr], overtimeEmpArr);
            } else {
                employeeInfoArr[index].id = id;
                employeeInfoArr[index].department = data.department;
                employeeInfoArr[index].subDepartment = data.subDepartment;
                employeeInfoArr[index].position = data.position;
                setEmployeeInfoArr([...employeeInfoArr], employeeInfoArr);
            }
        });
    }

    const getVacancy = () => {
        mainAxios({
            method: 'get',
            url: 'vacancies/all',
        }).then((res) => {
                let data = res.data;
                let arr = [];
                if (data.length > 0)
                    data.forEach(function (elem) {
                        arr.push({
                            id: elem.id,
                            position: elem.position !== null ? elem.position.name : null,
                            department: elem.department !== null ? elem.department.name : null
                        })
                    });
                setVacancy(arr)
            }
        );
    }

    const getVacancyData = (id) => {
        mainAxios({
            method: 'get',
            url: `vacancies/${id}`,
        }).then((res) => {
            let generalData = res.data.generalInformation;
            if (generalData !== null) {
                setVacancyDepartment(generalData.department !== null ? generalData.department.name : null);
                setVacancySubDepartment(generalData.subDepartment !== null ? generalData.subDepartment.name : null);
                setVacancyPosition(generalData.position !== null ? generalData.position.name : null);
                setVacancyCategory(generalData.positionCategory);
                setVacancyObeyDepartment(generalData.subordinateDepartment);
                setVacancyWorkMode(generalData.workMode);
                setVacancyWorkPlace(generalData.workPlace);
                setVacancyCount(generalData.count);
                let gradeData = generalData.gradeRange
                if (gradeData !== null) {
                    setVacancyMinGrade(gradeData.min);
                    setVacancyMaxGrade(gradeData.max);
                    let arr = []
                    for (let i = gradeData.min; i <= gradeData.max; i++) {
                        for (let j of grade) {
                            if (i === j.grade) {
                                arr.push(j)
                            }
                        }
                    }
                    setGradeArr(arr)
                } else {
                    setGradeArr(grade)
                }
            }
        });
    }

    const getVacation = (id) => {
        mainAxios({
            method: 'get',
            url: `vacations/period/${id}`,
        }).then((res) => {
                setVacation(res.data)
            }
        );
    }

    const getJobDay = (to, from) => {
        mainAxios({
            method: 'get',
            url: 'vacations/dates',
            params: {
                from: moment(from).format('YYYY-MM-DD'),
                to: to,
                operationType: operationType,
                employeeId: employeeId
            }
        }).then((res) => {
                setJobDay(res.data.startJob);
                setGetEndDate(res.data.to)
            }
        );
    }

    const getCity = () => {
        mainAxios({
            method: 'get',
            url: 'cities',
        }).then((res) => {
            setCityArr(res.data)
        });
    }

    const getCollectAgreement = () => {
        mainAxios({
            method: 'get',
            url: 'collective-agreements',
        }).then((res) => {
                setCollectiveAgreeOpt(res.data);
            }
        );
    }

    const getPayment = () => {
        mainAxios({
            method: 'get',
            url: 'payments',
        }).then((res) => {
                let data = res.data;
                let arr = [];
                if (data.length > 0)
                    data.forEach(function (elem) {
                        arr.push({
                            id: elem.id,
                            amount: elem.amount !== null ? elem.amount : null,
                            city: elem.city !== null ? elem.city.name : null,
                            cityId: elem.city !== null ? elem.city.id : null,
                        })
                    });
                setPaymentArr(arr)
            }
        );
    }

    const getVacationOperation = (id) => {
        mainAxios({
            method: 'get',
            url: `vacations/operations/${id}`,
            params: {
                operationType: operationType,
            }
        }).then((res) => {
                setVacOperationOption(res.data)
            }
        );

    }

    const getArticle = () => {
        mainAxios({
            method: 'get',
            url: 'articles',
        }).then((res) => {
            setArticleArr(res.data);
        });
    }

    const getCalculatedDate = (elem, setDate) => {
        let vacArr = [];
        if (Array.isArray(elem) && elem.some(item => item.day)) {
            for (let i of vacationArr) {
                if (i.day !== '') {
                    vacArr.push(i.day)
                }
            }
        }

        if (setDate !== null) {
            let getDate = setDate.getDate();
            let getMonth = setDate.getMonth();
            let getYear = setDate.getFullYear();
            let x = new Date(getYear, getMonth, getDate);
            let newDate = parseFloat(x.getDate());
            let total = Array.isArray(elem) ? 0 : elem !== '' ? elem : 0;
            if (vacArr.length > 0) {
                for (let i of vacArr) {
                    total += parseFloat(i)
                }
            }
            let totalDate = parseFloat((parseFloat(total) + newDate) - 1);
            x.setDate(totalDate);
            let formatDate = moment(x).format("YYYY-MM-DD");
            setVacationEndDate(formatDate)
            getJobDay(formatDate, setDate)
        }
    }

    const getBusinessTripDay = () => {
        let arr = [];
        let totalPayment = 0;
        for (let i of businessTripArr) {
            totalPayment += i.cityId.amount;
            arr.push({from: i.fromDate, to: i.toDate});
        }

        mainAxios({
            method: 'post',
            url: 'business-trips/days',
            data: arr
        }).then((res) => {
                let data = res.data;
                let arr = [];
                for (let i of data.dayOffList) {
                    arr.push({day: i, check: true, payment: totalPayment});
                }
                setBusinessTripPeriod(data.days)
                setNonWorkDays(data.dayOffList);
                setNonWorkDayArr(arr);
                let nonWorkDayCount = data.dayOffList.length;
                let nonWorkEndDay = data.dayOffList[data.dayOffList.length - 1];
                let nonWorkStartDay = data.dayOffList[0];
                setNonWorkStartDay(nonWorkStartDay);
                setNonWorkEndDay(nonWorkEndDay);
                setNonWorkDayCount(nonWorkDayCount);
                getBusinessTripNumber(nonWorkDayCount, nonWorkEndDay)
            }
        );
    }

    const getBusinessTripNumber = (nonWorkDayCount, lastDay) => {
        mainAxios({
            method: 'get',
            url: 'business-trips/number',
            params: {
                number: nonWorkDayCount,
                to: lastDay
            }
        }).then((res) => {
                setJobDay(res.data);
            }
        );
    }

    const resetData = () => {
        setSelectedPosition(null);
        setMainOfOrder('');
        setSelectedStaff(null);
        setDepartment('');
        setSubDepartment('');
        setPosition('');
        setVacancySubDepartment('');
        setVacancyObeyDepartment('');
        setVacancyCount('');
        setVacancyPosition('');
        setVacancyWorkMode('');
        setVacancyWorkPlace('');
        setVacancyMinGrade('');
        setVacancyMaxGrade('');
        setVacancyCategory('');
        setStartDate(null);
        setEndDate(null);
        setGetEndDate('');
        setVacationEndDate('');
        setVacationDay('');
        setJobDay('');
        setSeriesNumber('');
        setSicNo('');
        setErrors({})
    }

    const senData = () => {
        setLoadingIndicator(true);
        let hireData = {
            "date": joinDate !== null ? moment(joinDate).format("YYYY-MM-DD") : null,
            "gradeId": selectedGrade !== null ? selectedGrade.id : null,
            "individualAddition": individualAddition !== '' ? parseFloat(individualAddition) : null,
            "subGradeId": selectedSubGrade !== null ? selectedSubGrade.id : null,
            "testPeriod": testPeriod !== "" ? parseFloat(testPeriod) : null,
            "jobTime": selectedJobTime !== null ? selectedJobTime.value : null,
            "jobType": selectedJobType !== null ? selectedJobType.value : null
        }

        let employeeIds = [];

        for (let i of employeeInfoArr) {
            employeeIds.push(i.id)
        }

        let workVacation = {
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "to": getEndDate !== '' ? getEndDate : null,
            "startJob": jobDay !== '' ? jobDay : null,
            "vacations": vacationArr
        }

        let trainingShipping = {
            "eventName": eventName !== '' ? eventName : null,
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "to": endDate !== null || '' ? moment(endDate).format("YYYY-MM-DD") : null
        };

        let freeVacation = {
            "day": vacationDay !== '' ? vacationDay : null,
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "startJob": jobDay !== '' ? jobDay : null,
            "to": vacationEndDate !== '' ? vacationEndDate : null
        };

        let firing = {
            "articleId": selectedArticle !== null ? selectedArticle.id : null,
            "compensation": compensation !== null ? parseFloat(compensation) : null,
            "financialHelp": amount !== '' ? parseFloat(amount) : null,
            "firingDate": endDate !== null ? moment(endDate).format("YYYY-MM-DD") : null
        };

        let educationVacation = {
            "day": vacationDay !== '' ? vacationDay : null,
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "startJob": jobDay !== '' ? jobDay : null,
            "to": vacationEndDate !== '' ? vacationEndDate : null
        };

        let socialVacation = {
            "day": vacationDay !== '' ? vacationDay : null,
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "seriesNumber": seriesNumber !== '' ? seriesNumber : null,
            "ssn": sicNo !== '' ? sicNo : null,
            "startJob": jobDay !== '' ? jobDay : null,
            "to": vacationEndDate !== '' ? vacationEndDate : null
        };

        let meeting = {
            "day": vacationDay !== '' ? vacationDay : null,
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "startJob": jobDay !== '' ? jobDay : null,
            "to": vacationEndDate !== '' ? vacationEndDate : null
        };

        let warning = {
            "employeeIds": employeeIds
        };

        let collectiveAgreement = {
            "collectiveAgreementReasonId": selectedCollectAgree !== null ? selectedCollectAgree.id : null,
            "day": vacationDay !== '' ? vacationDay : null,
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "startJob": jobDay !== '' ? jobDay : null,
            "to": getEndDate !== '' ? getEndDate : null
        };

        let changeJob = {
            "date": joinDate !== null ? moment(joinDate).format("YYYY-MM-DD") : null,
            "gradeId": selectedGrade !== null ? selectedGrade.id : null,
            "individualAddition": individualAddition !== '' ? parseFloat(individualAddition) : null,
            "subGradeId": selectedSubGrade !== null ? selectedSubGrade.id : null,
            "testPeriod": testPeriod !== "" ? parseFloat(testPeriod) : null,
        };

        let additionalSalary = {
            "date": joinDate !== null ? moment(joinDate).format("YYYY-MM-DD") : null,
            "gradeId": selectedGrade !== null ? selectedGrade.id : null,
            "subGradeId": selectedSubGrade !== null ? selectedSubGrade.id : null
        };

        let academicAdditional = {
            "amount": amount !== '' ? parseFloat(amount) : null
        };

        let changeSalary = {
            "date": joinDate !== null ? moment(joinDate).format("YYYY-MM-DD") : null,
            "gradeId": selectedGrade !== null ? selectedGrade.id : null,
            "individualAddition": individualAddition !== '' ? parseFloat(individualAddition) : null,
            "subGradeId": selectedSubGrade !== null ? selectedSubGrade.id : null,
        };

        let changeWorkMode = {
            "gradeId": selectedGrade !== null ? selectedGrade.id : null,
            "subGradeId": selectedSubGrade !== null ? selectedSubGrade.id : null,
            "workMode": selectedNewWorkMode !== null ? selectedNewWorkMode.value : null
        };

        let temporaryPass = {
            "date": joinDate !== null ? moment(joinDate).format("YYYY-MM-DD") : null,
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "gradeId": selectedGrade !== null ? selectedGrade.id : null,
            "subGradeId": selectedSubGrade !== null ? selectedSubGrade.id : null,
            "to": endDate !== null ? moment(endDate).format("YYYY-MM-DD") : null
        };

        let temporaryAssignment = {
            "assignedEmployeeId": selectedAssignEmpId !== null ? selectedAssignEmpId.id : null,
            "date": joinDate !== null ? moment(joinDate).format("YYYY-MM-DD") : null,
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "gradeId": selectedGrade !== null ? selectedGrade.id : null,
            "percent": amount !== '' ? parseFloat(amount) : null,
            "subGradeId": selectedSubGrade !== null ? selectedSubGrade.id : null,
            "to": endDate !== null ? moment(endDate).format("YYYY-MM-DD") : null
        };

        let partialVacation = {
            "day": vacationDay !== '' ? vacationDay : null,
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "startJob": jobDay !== '' ? jobDay : null,
            "to": getEndDate !== '' ? getEndDate : null
        };

        let vacationDisable = {
            "callBackDate": joinDate !== null ? moment(joinDate).format("YYYY-MM-DD") : null,
            "callBackReason": callBackReason !== '' ? callBackReason : null,
            "debt": tab == '24' ? !debtCheck : null,
            "operationId": selectedVacOp !== null ? selectedVacOp.id : null
        };

        let startDates = selectedVacation !== null ? [] : null;
        if (selectedVacation !== null) {
            for (let i of selectedVacation) {
                startDates.push(i.startDate)
            }
        }

        let vacationCompensation = {
            "startDates": startDates
        };

        let discipline = {
            "disciplineType": selectedDiscipline !== null ? selectedDiscipline.value : null,
            "toWho": employeeIds
        };

        let financialHelp = {
            "amount": amount !== '' ? parseFloat(amount) : null
        };

        let election = {
            "day": vacationDay !== '' ? vacationDay : null,
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "to": getEndDate !== '' ? getEndDate : null
        };

        let reward = {
            "amount": amount !== '' ? parseFloat(amount) : null,
            employeeIds: employeeIds
        };

        let dismissal = {
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "to": endDate !== null ? moment(endDate).format("YYYY-MM-DD") : null
        };

        let reduceWorkHours = {
            "currentFrom": startTime !== '' ? startTime : null,
            "currentTo": endTime !== '' ? endTime : null,
            "newFrom": newStartTime !== '' ? newStartTime : null,
            "newTo": newEndTime !== '' ? newEndTime : null
        };

        let totalTripSalary = 0;

        for (let i of nonWorkDayArr) {
            if (!i.check) {
                totalTripSalary += i.payment
            }
        }

        for (let i of businessTripArr) {
            if (i.cityId !== null) {
                i.cityId = i.cityId.cityId
            }
        }

        let businessTrip = {
            "businessTrips": businessTripArr,
            "count": nonWorkDayCount,
            "dailyEatPay": dailyExpCheck,
            "dailyHotelPay": hotelExpCheck,
            "day": businessTripPeriod !== '' ? parseFloat(businessTripPeriod) : null,
            "dayOffDateFrom": nonWorkStartDay,
            "dayOffDateTo": nonWorkEndDay,
            "insteadPayment": totalTripSalary,
            "otherDailyPayment": amount !== '' ? parseFloat(amount) : 0,
            "startJob": jobDay !== '' ? jobDay : null,
        };

        let businessTripDisable = {
            "callBackDate": joinDate !== null ? moment(joinDate).format("YYYY-MM-DD") : null,
            "callBackReason": callBackReason !== '' ? callBackReason : null,
            "operationId": selectedVacOp !== null ? selectedVacOp.id : null
        };

        let overtimeArr = [];

        for (let i of overtimeEmpArr) {
            overtimeArr.push({employeeId: i.id, date: i.date, startTime: i.startTime, endTime: i.endTime})
        }

        let multiDates = [];
        for (let i of multiDate) {
            multiDates.push(i?.format?.('YYYY-MM-DD'))
        }

        let holidayOvertime = {
            "employees": employeeIds,
            "holidays": multiDates
        }


        let data = {
            "header": {
                "department": "string",
                "fullName": "string",
                "main": mainOfOrder !== "" ? mainOfOrder : null,
                "note": "string"
            },
            "hire": tab == "7" ? hireData : null,
            "type": operationType !== '' ? operationType : null,
            "vacancyId": vacancyId ? vacancyId : null,
            "employeeId": employeeId ? employeeId : null,
            "workVacation": tab == "17" ? workVacation : null,
            "trainingShipping": tab == "28" ? trainingShipping : null,
            "freeVacation": tab == "19" ? freeVacation : null,
            "educationVacation": tab == "18" ? educationVacation : null,
            "socialVacation": tab == "20" ? socialVacation : null,
            "meeting": tab == "38" ? meeting : null,
            "warning": tab == "45" ? warning : null,
            "collectiveAgreement": tab == "22" ? collectiveAgreement : null,
            "changeJob": tab == "9" || tab == "13" ? changeJob : null,
            "additionalSalary": tab == "11" ? additionalSalary : null,
            "academicAdditional": tab == "35" ? academicAdditional : null,
            "changeSalary": tab == "10" ? changeSalary : null,
            "deletedVacancy": (tab == '2' && amount !== '') ? parseFloat(amount) : null,
            "changeWorkMode": tab == '12' ? changeWorkMode : null,
            "temporaryPass": tab == '14' ? temporaryPass : null,
            "temporaryAssignment": tab == '15' ? temporaryAssignment : null,
            "partialVacation": tab == '21' ? partialVacation : null,
            "vacationDisable": tab == '24' || tab == '25' || tab == '48' ? vacationDisable : null,
            "vacationCompensation": tab == '26' ? vacationCompensation : null,
            "discipline": tab == '47' ? discipline : null,
            "financialHelp": tab == '33' ? financialHelp : null,
            "selection": tab == '36' ? election : null,
            "reward": tab == '34' ? reward : null,
            "remove": tab == '41' ? dismissal : null,
            "reduceWorkHours": tab == '43' ? reduceWorkHours : null,
            "businessTrip": tab == '30' ? businessTrip : null,
            "businessTripDisable": tab == '32' ? businessTripDisable : null,
            "overtime": tab == '50' ? overtimeArr : null,
            "firing": tab == '8' ? firing : null,
            "holidayOvertime": tab == '44' ? holidayOvertime : null,
        }

        mainAxios({
            method: 'post',
            url: 'operations',
            data: data,
        }).then((res) => {
            setLoadingIndicator(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setSelectedOperationType('');
            setTab('');
            resetData();
            setSave(false);
            history.push({
                pathname: `/operation`,
                state: tab == '50' ? 'overtime' : 'operation'
            })
        }).catch((error) => {
            setLoadingIndicator(false)
            Swal.fire({
                icon: 'error',
                text: 'M??lumatlar qeyd edilm??di!',
                cancelButtonText: 'Ba??la',
                showCancelButton: true,
                showConfirmButton: false,
            });
            if (error.response.data.validations) {
                setErrors(error.response.data.validations)
            } else {
                setErrors({})
            }
        });
    }

    useEffect(() => {
        getCity();
        getOperationName();
        getVacancy();
        getEmployee();
        getGrade();
        getSubGrade();
        getCollectAgreement();
        getArticle();
        getPayment();
    }, []);

    return (
        <Aux>
            <div className="create-operation">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title flex-center">
                            <Link to="/operation" className="flex">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.3333 14H7.58333M12.25 8.75L7 14L12.25 19.25" stroke="#193651"
                                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            Kadr ??m??liyyat?? yarat
                        </div>
                    </div>
                    <div className="block">
                        <Form className="form-list">
                            <Row>
                                <Col xs={12}>
                                    <Form.Group className="form-group">
                                        <span className="input-title">??mrin ad?? *</span>
                                        <Select
                                            placeholder="V??zif?? d??yi??ikliyi"
                                            value={selectedOperationType}
                                            onChange={(val) => {
                                                setSelectedOperationType(val);
                                                resetData()
                                                setOperationType(val.type)
                                                setSave(true);
                                                setTab(val.orderNo);
                                            }}
                                            options={operationTypeArr}
                                            isSearchable={operationTypeArr ? operationTypeArr.length > 5 : false}
                                            getOptionLabel={(option) => (option.valueAz)}
                                            getOptionValue={option => option.valueAz}
                                            styles={customStyles}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="operation-tab">
                                <Tabs activeKey={tab}>

                                    <Tab eventKey="1" title="" disabled={tab !== "1"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat??n n??mr??si</span>
                                                    <Select
                                                        placeholder="??tat??n n??mr??sini se??"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getVacancyData(val.id);
                                                            setVacancyId(val.id);
                                                        }}
                                                        isSearchable={vacancy ? vacancy.length > 5 : false}
                                                        options={vacancy}
                                                        getOptionLabel={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        getOptionValue={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??mrin ??sas??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder || ''}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat c??dv??li d??yi??iklik edil??n struktur b??lm??: </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="??tat c??dv??li d??yi??iklik edil??n struktur b??lm?? ad?? daxil edin"
                                                            value={vacancyDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Struktur b??lm??nin ad?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Struktur b??lm??nin ad??"
                                                                      value={vacancySubDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Tabe struktur b??lm??nin ad?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Tabe struktur b??lm??nin ad??"
                                                                      value={vacancyObeyDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat vahidinin ad?? (v??zif??) </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??tat vahidinin ad?? (v??zif??)"
                                                                      value={vacancyPosition || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat vahidi (say) </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??tat vahidi (say)  "
                                                                      value={vacancyCount || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <span className="input-title">D??r??c??</span>
                                                <div className="flex m-20">
                                                    <Form.Group className="form-group m-0 w-100">
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="Min d??r??c??"
                                                                value={vacancyMinGrade || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                    <span className="break-line"></span>
                                                    <Form.Group className="form-group  m-0 w-100">
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="Max d??r??c??"
                                                                value={vacancyMaxGrade || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>

                                                </div>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">???? rejimi</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="???? rejimi"
                                                                      value={vacancyWorkMode || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">T??sis edil??n v??zif??nin kateqoriyas??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="T??sis edil??n v??zif??nin kateqoriyas??"
                                                                      value={vacancyCategory || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">???? yerinin ??nvan??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="???? yerinin ??nvan??"
                                                                      value={vacancyWorkPlace || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="2" title="" disabled={tab !== "2"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat??n n??mr??si</span>
                                                    <Select
                                                        placeholder="??tat??n n??mr??sini se??"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getVacancyData(val.id);
                                                            setVacancyId(val.id);
                                                        }}
                                                        isSearchable={vacancy ? vacancy.length > 5 : false}
                                                        options={vacancy}
                                                        getOptionLabel={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        getOptionValue={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??mrin ??sas??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder || ''}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat c??dv??li d??yi??iklik edil??n struktur b??lm??: </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="??tat c??dv??li d??yi??iklik edil??n struktur b??lm?? ad?? daxil edin"
                                                            value={vacancyDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Struktur b??lm??nin ad?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Struktur b??lm??nin ad??"
                                                                      value={vacancyDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Tabe struktur b??lm??nin ad?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Tabe struktur b??lm??nin ad??"
                                                                      value={vacancyObeyDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat vahidinin ad?? (v??zif??) </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??tat vahidinin ad?? (v??zif??)"
                                                                      value={vacancyPosition || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat vahidi (say) </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??tat vahidi (say)  "
                                                                      value={vacancyCount || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <span className="input-title">D??r??c??</span>
                                                <div className="flex m-20">
                                                    <Form.Group className="form-group m-0 w-100">
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="Min d??r??c??"
                                                                value={vacancyMinGrade || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                    <span className="break-line"></span>
                                                    <Form.Group className="form-group  m-0 w-100">
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="Max d??r??c??"
                                                                value={vacancyMaxGrade || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>

                                                </div>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">???? rejimi</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="???? rejimi"
                                                                      value={vacancyWorkMode || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">???? yerinin ??nvan??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="???? yerinin ??nvan??"
                                                                      value={vacancyWorkPlace || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat say??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??tat say??"
                                                                      value={amount || ''}
                                                                      onChange={(e) => setAmount(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="7" title="" disabled={tab !== "7"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder || ''}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin ad??, soyad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat??n n??mr??si</span>
                                                    <Select
                                                        placeholder="??tat??n n??mr??sini se??"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getVacancyData(val.id);
                                                            setVacancyId(val.id);
                                                        }}
                                                        isSearchable={vacancy ? vacancy.length > 5 : false}
                                                        options={vacancy}
                                                        getOptionLabel={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        getOptionValue={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">?????? q??bul oldu??u struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="?????? q??bul oldu??u struktur b??lm?? daxil edin"
                                                            value={vacancyDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">?????? q??bul oldu??u alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Alt struktur b??lm??nin ad??"
                                                                      value={vacancySubDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Tabe struktur b??lm??nin ad?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Tabe struktur b??lm??nin ad??"
                                                                      value={vacancyObeyDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">?????? q??bul oldu??u v??zif?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="?????? q??bul oldu??u v??zif??"
                                                                      value={vacancyPosition || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">???? yeri se??in </span>
                                                    <Select
                                                        placeholder="???? yeri se??in"
                                                        value={selectedJobType}
                                                        onChange={(val) =>
                                                            setSelectedJobType(val)
                                                        }
                                                        isSearchable={jobTypeOptions ? jobTypeOptions.length > 5 : false}
                                                        options={jobTypeOptions}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">?????? q??bul tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={joinDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setJoinDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['hire.date'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['hire.date']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">S??naq m??dd??ti </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="S??naq m??dd??ti"
                                                                      type="number"
                                                                      value={testPeriod || ''}
                                                                      onChange={(e) => setTestPeriod(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">D??r??c??</span>
                                                    <Select
                                                        placeholder="D??r??c??"
                                                        value={selectedGrade}
                                                        onChange={(val) => {
                                                            setSelectedGrade(val)
                                                        }}
                                                        isSearchable={gradeArr ? gradeArr.length > 5 : false}
                                                        options={gradeArr}
                                                        getOptionLabel={(option) => (option.grade)}
                                                        getOptionValue={(option) => (option.grade)}
                                                        styles={customStyles}
                                                    />
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['hire.gradeId'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['hire.gradeId']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Alt d??r??c?? </span>
                                                    <Select
                                                        placeholder="Alt d??r??c??"
                                                        value={selectedSubGrade}
                                                        onChange={(val) => {
                                                            setSelectedSubGrade(val)
                                                        }}
                                                        isSearchable={subGrade ? subGrade.length > 5 : false}
                                                        options={subGrade}
                                                        getOptionLabel={(option) => (option.subGrade)}
                                                        getOptionValue={(option) => (option.subGrade)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">???? vaxt?? </span>
                                                    <Select
                                                        placeholder="???? vaxt??"
                                                        value={selectedJobTime}
                                                        onChange={(val) => {
                                                            setSelectedJobTime(val)
                                                        }}
                                                        isSearchable={jobTimeOptions ? jobTimeOptions.length > 5 : false}
                                                        options={jobTimeOptions}
                                                        getOptionLabel={(option) => (option.label)}
                                                        getOptionValue={(option) => (option.label)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Dig??r f??rdi ??lav?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Dig??r f??rdi ??lav??"
                                                                      type="number"
                                                                      value={individualAddition || ''}
                                                                      onChange={(e) => setIndividualAddition(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="8" title="" disabled={tab !== "8"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??mrin ??sas??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin ad??, soyad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">????l??diyi struktur b??lm??nin ad??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Struktur b??lm??nin ad?? daxil edin"
                                                                      value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm??nin ad??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Alt struktur b??lm??nin ad?? daxil edin"
                                                                      value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??????inin v??zif??si</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Alt struktur b??lm??nin ad?? daxil edin"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title"> Xitamla ba??l?? madd??l??r</span>
                                                    <Select
                                                        placeholder=" Xitamla ba??l?? madd??l??r"
                                                        value={selectedArticle}
                                                        onChange={(val) => {
                                                            setSelectedArticle(val);
                                                        }}
                                                        isSearchable={articleArr ? articleArr.length > 5 : false}
                                                        options={articleArr}
                                                        getOptionLabel={(option) => (`${option.article} - ${option.title}`)}
                                                        getOptionValue={(option) => (`${option.article} - ${option.title}`)}
                                                        styles={customStyles}
                                                    />
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['firing.articleId'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['firing.articleId']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">????d??n azad olma tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={endDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setEndDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['firing.firingDate'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['firing.firingDate']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Maddi yard??m</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Maddi yard??m daxil edin"
                                                                      value={amount}
                                                                      type="number"
                                                                      onChange={(e) => setAmount(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??stifad?? edilm??mi?? m??zuniyy??t g??n??n?? g??r?? kompensasiya</span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="??stifad?? edilm??mi?? m??zuniyy??t g??n??n?? g??r?? kompensasiya"
                                                            value={compensation}
                                                            disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="9" title="" disabled={tab !== "9"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder || ''}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin ad??, soyad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id);
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat??n n??mr??si</span>
                                                    <Select
                                                        placeholder="??tat??n n??mr??sini se??"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getVacancyData(val.id);
                                                            setVacancyId(val.id);
                                                        }}
                                                        isSearchable={vacancy ? vacancy.length > 5 : false}
                                                        options={vacancy}
                                                        getOptionLabel={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        getOptionValue={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">????l??diyi struktur b??lm??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Struktur b??lm??nin ad?? daxil edin"
                                                                      value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">????l??diyi v??zif??si</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Alt struktur b??lm??nin ad?? daxil edin"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat ??zr?? ??sas ??m??k haqq??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??tat ??zr?? ??sas ??m??k haqq??"
                                                                      value={employeeMainSalary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??m??k ????raitin?? g??r?? ??lav?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??m??k ????raitin?? g??r?? ??lav??"
                                                                      value={employeeConditionalAdd || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Dig??r f??rdi ??lav??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Dig??r f??rdi ??lav?? daxil edin"
                                                                      value={employeeIndividualAdd || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">D??yi??iklik tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={joinDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setJoinDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['changeJob.date'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['changeJob.date']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ke??irildiyi struktur b??lm??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ke??irildiyi struktur b??lm??"
                                                                      value={vacancyDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ke??irildiyi v??zif??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ke??irildiyi v??zif??"
                                                                      value={vacancyPosition || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">S??naq m??dd??ti </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="S??naq m??dd??ti"
                                                                      type="number"
                                                                      value={testPeriod || ''}
                                                                      onChange={(e) => setTestPeriod(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">D??r??c??</span>
                                                    <Select
                                                        placeholder="D??r??c??"
                                                        value={selectedGrade}
                                                        onChange={(val) => {
                                                            setSelectedGrade(val)
                                                        }}
                                                        isSearchable={gradeArr ? gradeArr.length > 5 : false}
                                                        options={gradeArr}
                                                        getOptionLabel={(option) => (option.grade)}
                                                        getOptionValue={(option) => (option.grade)}
                                                        styles={customStyles}
                                                    />
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['changeJob.gradeId'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['changeJob.gradeId']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Alt d??r??c?? </span>
                                                    <Select
                                                        placeholder="Alt d??r??c??"
                                                        value={selectedSubGrade}
                                                        onChange={(val) => {
                                                            setSelectedSubGrade(val)
                                                        }}
                                                        isSearchable={subGrade ? subGrade.length > 5 : false}
                                                        options={subGrade}
                                                        getOptionLabel={(option) => (option.subGrade)}
                                                        getOptionValue={(option) => (option.subGrade)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Dig??r f??rdi ??lav?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Dig??r f??rdi ??lav??"
                                                                      type="number"
                                                                      value={individualAddition || ''}
                                                                      onChange={(e) => setIndividualAddition(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="10" title="" disabled={tab !== "10"}>
                                        <div className="block-inn">
                                            <Row>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">??sasland??rma</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                          value={mainOfOrder || ''}
                                                                          onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin ad??, soyad??, atas??n??n ad?? *</span>
                                                        <Select
                                                            placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                            value={selectedStaff}
                                                            onChange={(val) => {
                                                                let id = val.id
                                                                setEmployeeId(id)
                                                                getEmployeeDetail(id);
                                                                setSelectedStaff(val);
                                                            }}
                                                            isSearchable={employee ? employee.length > 5 : false}
                                                            options={employee}
                                                            getOptionLabel={(option) => (option.name)}
                                                            getOptionValue={(option) => (option.name)}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">??tat??n n??mr??si</span>
                                                        <Select
                                                            placeholder="??tat??n n??mr??sini se??"
                                                            value={selectedPosition}
                                                            onChange={(val) => {
                                                                setSelectedPosition(val);
                                                                getVacancyData(val.id);
                                                                setVacancyId(val.id);
                                                            }}
                                                            isSearchable={vacancy ? vacancy.length > 5 : false}
                                                            options={vacancy}
                                                            getOptionLabel={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                            getOptionValue={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="????l??diyi struktur b??lm??"
                                                                value={department || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">????l??diyi v??zif??si </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="????l??diyi v??zif??si"
                                                                          value={position || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">??tat ??zr?? ??sas ??m??k haqq??</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="??tat ??zr?? ??sas ??m??k haqq??"
                                                                          value={employeeMainSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">??m??k ????raitin?? g??r?? ??lav?? </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="??m??k ????raitin?? g??r?? ??lav??"
                                                                          value={employeeConditionalAdd || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Dig??r f??rdi ??lav??</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Dig??r f??rdi ??lav?? daxil edin"
                                                                          value={employeeIndividualAdd || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">D??yi??iklik tarixi *</span>
                                                        <Form.Label className="relative m-0">
                                                            <DatePicker selected={joinDate}
                                                                        dateFormat="dd-MM-yyyy"
                                                                        placeholderText="DD-MM-YYYY"
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        dropdownMode="select"
                                                                        onChange={(date) => setJoinDate(date)}/>
                                                            <Button className="btn-transparent">
                                                                <svg width="18" height="18"
                                                                     viewBox="0 0 18 18" fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <g opacity="0.8"
                                                                       clipPath="url(#clip0)">
                                                                        <path
                                                                            d="M5.34327 8.75391H4.25583C3.97432 8.75391 3.74609 8.99002 3.74609 9.28125C3.74609 9.57248 3.97432 9.80859 4.25583 9.80859H5.34327C5.62478 9.80859 5.853 9.57248 5.853 9.28125C5.853 8.99002 5.62478 8.75391 5.34327 8.75391Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M5.34327 11.0039H4.25583C3.97432 11.0039 3.74609 11.24 3.74609 11.5312C3.74609 11.8225 3.97432 12.0586 4.25583 12.0586H5.34327C5.62478 12.0586 5.853 11.8225 5.853 11.5312C5.853 11.24 5.62478 11.0039 5.34327 11.0039Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M5.34327 13.2539H4.25583C3.97432 13.2539 3.74609 13.49 3.74609 13.7812C3.74609 14.0725 3.97432 14.3086 4.25583 14.3086H5.34327C5.62478 14.3086 5.853 14.0725 5.853 13.7812C5.853 13.49 5.62478 13.2539 5.34327 13.2539Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M9.69092 8.75391H8.60349C8.32198 8.75391 8.09375 8.99002 8.09375 9.28125C8.09375 9.57248 8.32198 9.80859 8.60349 9.80859H9.69092C9.97243 9.80859 10.2007 9.57248 10.2007 9.28125C10.2007 8.99002 9.97243 8.75391 9.69092 8.75391Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M9.69092 11.0039H8.60349C8.32198 11.0039 8.09375 11.24 8.09375 11.5312C8.09375 11.8225 8.32198 12.0586 8.60349 12.0586H9.69092C9.97243 12.0586 10.2007 11.8225 10.2007 11.5312C10.2007 11.24 9.97243 11.0039 9.69092 11.0039Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M9.69092 13.2539H8.60349C8.32198 13.2539 8.09375 13.49 8.09375 13.7812C8.09375 14.0725 8.32198 14.3086 8.60349 14.3086H9.69092C9.97243 14.3086 10.2007 14.0725 10.2007 13.7812C10.2007 13.49 9.97243 13.2539 9.69092 13.2539Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M14.0425 8.75391H12.955C12.6735 8.75391 12.4453 8.99002 12.4453 9.28125C12.4453 9.57248 12.6735 9.80859 12.955 9.80859H14.0425C14.324 9.80859 14.5522 9.57248 14.5522 9.28125C14.5522 8.99002 14.324 8.75391 14.0425 8.75391Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M14.0425 11.0039H12.955C12.6735 11.0039 12.4453 11.24 12.4453 11.5312C12.4453 11.8225 12.6735 12.0586 12.955 12.0586H14.0425C14.324 12.0586 14.5522 11.8225 14.5522 11.5312C14.5522 11.24 14.324 11.0039 14.0425 11.0039Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M14.0425 13.2539H12.955C12.6735 13.2539 12.4453 13.49 12.4453 13.7812C12.4453 14.0725 12.6735 14.3086 12.955 14.3086H14.0425C14.324 14.3086 14.5522 14.0725 14.5522 13.7812C14.5522 13.49 14.324 13.2539 14.0425 13.2539Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M16.319 2.28516H15.0956V1.40625C15.0956 1.11502 14.8674 0.878906 14.5859 0.878906C14.3044 0.878906 14.0762 1.11502 14.0762 1.40625V2.28516H9.65845V1.40625C9.65845 1.11502 9.43023 0.878906 9.14872 0.878906C8.86721 0.878906 8.63898 1.11502 8.63898 1.40625V2.28516H4.22127V1.40625C4.22127 1.11502 3.99304 0.878906 3.71153 0.878906C3.43002 0.878906 3.20179 1.11502 3.20179 1.40625V2.28516H1.97843C1.13522 2.28516 0.449219 2.99486 0.449219 3.86719V15.5391C0.449219 16.4114 1.13522 17.1211 1.97843 17.1211H16.319C17.1622 17.1211 17.8482 16.4114 17.8482 15.5391C17.8482 15.1987 17.8482 4.16338 17.8482 3.86719C17.8482 2.99486 17.1622 2.28516 16.319 2.28516ZM1.46869 3.86719C1.46869 3.57641 1.69736 3.33984 1.97843 3.33984H3.20179V4.21875C3.20179 4.50998 3.43002 4.74609 3.71153 4.74609C3.99304 4.74609 4.22127 4.50998 4.22127 4.21875V3.33984H8.63898V4.21875C8.63898 4.50998 8.86721 4.74609 9.14872 4.74609C9.43023 4.74609 9.65845 4.50998 9.65845 4.21875V3.33984H14.0762V4.21875C14.0762 4.50998 14.3044 4.74609 14.5859 4.74609C14.8674 4.74609 15.0956 4.50998 15.0956 4.21875V3.33984H16.319C16.6001 3.33984 16.8287 3.57641 16.8287 3.86719V5.94141H1.46869V3.86719ZM16.319 16.0664H1.97843C1.69736 16.0664 1.46869 15.8298 1.46869 15.5391V6.99609H16.8287V15.5391C16.8287 15.8298 16.6001 16.0664 16.319 16.0664Z"
                                                                            fill="#181818"/>
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0">
                                                                            <rect width="17.399"
                                                                                  height="18"
                                                                                  fill="white"
                                                                                  transform="translate(0.449219)"/>
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </Button>
                                                        </Form.Label>
                                                        <div className="validation-block flex-start">
                                                            {

                                                                errors['changeSalary.date'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['changeSalary.date']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">D??r??c??</span>
                                                        <Select
                                                            placeholder="D??r??c??"
                                                            value={selectedGrade}
                                                            onChange={(val) => {
                                                                setSelectedGrade(val)
                                                            }}
                                                            isSearchable={gradeArr ? gradeArr.length > 5 : false}
                                                            options={gradeArr}
                                                            getOptionLabel={(option) => (option.grade)}
                                                            getOptionValue={(option) => (option.grade)}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {

                                                                errors['changeSalary.gradeId'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['changeSalary.gradeId']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Alt d??r??c?? </span>
                                                        <Select
                                                            placeholder="Alt d??r??c??"
                                                            value={selectedSubGrade}
                                                            onChange={(val) => {
                                                                setSelectedSubGrade(val)
                                                            }}
                                                            isSearchable={subGrade ? subGrade.length > 5 : false}
                                                            options={subGrade}
                                                            getOptionLabel={(option) => (option.subGrade)}
                                                            getOptionValue={(option) => (option.subGrade)}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Dig??r f??rdi ??lav?? </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Dig??r f??rdi ??lav??"
                                                                          type="number"
                                                                          value={individualAddition || ''}
                                                                          onChange={(e) => setIndividualAddition(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="11" title="" disabled={tab !== "11"}>
                                        <Row>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat??n n??mr??si</span>
                                                    <Select
                                                        placeholder="??tat??n n??mr??sini se??"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getVacancyData(val.id);
                                                            setVacancyId(val.id);
                                                        }}
                                                        isSearchable={vacancy ? vacancy.length > 5 : false}
                                                        options={vacancy}
                                                        getOptionLabel={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        getOptionValue={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat ??zr?? ??sas ??m??k haqq??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??tat ??zr?? ??sas ??m??k haqq??"
                                                                      value={employeeMainSalary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??m??k ????raitin?? g??r?? ??lav?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??m??k ????raitin?? g??r?? ??lav??"
                                                                      value={employeeConditionalAdd || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Dig??r f??rdi ??lav??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Dig??r f??rdi ??lav?? daxil edin"
                                                                      value={employeeIndividualAdd || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">????l??diyi v??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="????l??diyi v??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">D??yi??iklik tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={joinDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setJoinDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['additionalSalary.date'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['additionalSalary.date']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">D??r??c??</span>
                                                    <Select
                                                        placeholder="D??r??c??"
                                                        value={selectedGrade}
                                                        onChange={(val) => {
                                                            setSelectedGrade(val)
                                                        }}
                                                        isSearchable={gradeArr ? gradeArr.length > 5 : false}
                                                        options={gradeArr}
                                                        getOptionLabel={(option) => (option.grade)}
                                                        getOptionValue={(option) => (option.grade)}
                                                        styles={customStyles}
                                                    />
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['additionalSalary.gradeId'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['additionalSalary.gradeId']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Alt d??r??c?? </span>
                                                    <Select
                                                        placeholder="Alt d??r??c??"
                                                        value={selectedSubGrade}
                                                        onChange={(val) => {
                                                            setSelectedSubGrade(val)
                                                        }}
                                                        isSearchable={subGrade ? subGrade.length > 5 : false}
                                                        options={subGrade}
                                                        getOptionLabel={(option) => (option.subGrade)}
                                                        getOptionValue={(option) => (option.subGrade)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="12" title="" disabled={tab !== "12"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??????inin soyad??, ad??, ata ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id);
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin i??l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">????l??diyi v??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="????l??diyi v??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">??????inin faktiki i?? rejimi *</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??????inin faktiki i?? rejimi"
                                                                      value={workMode || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">V??zif?? maa????</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif?? maa????"
                                                                      value={employeeMainSalary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??????inin ke??irildiyi i?? rejimi *</span>
                                                    <Select
                                                        placeholder="???? rejimini se??in"
                                                        value={selectedNewWorkMode}
                                                        onChange={setSelectedNewWorkMode}
                                                        isSearchable={workModeOptions ? workModeOptions.length > 5 : false}
                                                        options={workModeOptions}
                                                        styles={customStyles}
                                                    />
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['changeWorkMode.workMode'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['changeWorkMode.workMode']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">D??r??c??</span>
                                                    <Select
                                                        placeholder="D??r??c??"
                                                        value={selectedGrade}
                                                        onChange={(val) => {
                                                            setSelectedGrade(val)
                                                        }}
                                                        isSearchable={gradeArr ? gradeArr.length > 5 : false}
                                                        options={gradeArr}
                                                        getOptionLabel={(option) => (option.grade)}
                                                        getOptionValue={(option) => (option.grade)}
                                                        styles={customStyles}
                                                    />
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['changeWorkMode.gradeId'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['changeWorkMode.gradeId']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Alt d??r??c?? </span>
                                                    <Select
                                                        placeholder="Alt d??r??c??"
                                                        value={selectedSubGrade}
                                                        onChange={(val) => {
                                                            setSelectedSubGrade(val)
                                                        }}
                                                        isSearchable={subGrade ? subGrade.length > 5 : false}
                                                        options={subGrade}
                                                        getOptionLabel={(option) => (option.subGrade)}
                                                        getOptionValue={(option) => (option.subGrade)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="13" title="" disabled={tab !== "13"}>
                                        <div className="block-inn">
                                            <Row>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">??sasland??rma</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                          value={mainOfOrder || ''}
                                                                          onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, ata ad?? *</span>
                                                        <Select
                                                            placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                            value={selectedStaff}
                                                            onChange={(val) => {
                                                                let id = val.id
                                                                setEmployeeId(id)
                                                                getEmployeeDetail(id)
                                                                setSelectedStaff(val);
                                                            }}
                                                            isSearchable={employee ? employee.length > 5 : false}
                                                            options={employee}
                                                            getOptionLabel={(option) => (option.name)}
                                                            getOptionValue={(option) => (option.name)}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">??tat??n n??mr??si</span>
                                                        <Select
                                                            placeholder="??tat??n n??mr??sini se??"
                                                            value={selectedPosition}
                                                            onChange={(val) => {
                                                                setSelectedPosition(val);
                                                                getVacancyData(val.id);
                                                                setVacancyId(val.id);
                                                            }}
                                                            isSearchable={vacancy ? vacancy.length > 5 : false}
                                                            options={vacancy}
                                                            getOptionLabel={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                            getOptionValue={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="????l??diyi struktur b??lm??"
                                                                value={department || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">????l??diyi v??zif??si </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="????l??diyi v??zif??si"
                                                                          value={position || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">D??yi??iklik tarixi *</span>
                                                        <Form.Label className="relative m-0">
                                                            <DatePicker selected={joinDate}
                                                                        dateFormat="dd-MM-yyyy"
                                                                        placeholderText="DD-MM-YYYY"
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        dropdownMode="select"
                                                                        onChange={(date) => setJoinDate(date)}/>
                                                            <Button className="btn-transparent">
                                                                <svg width="18" height="18"
                                                                     viewBox="0 0 18 18" fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <g opacity="0.8"
                                                                       clipPath="url(#clip0)">
                                                                        <path
                                                                            d="M5.34327 8.75391H4.25583C3.97432 8.75391 3.74609 8.99002 3.74609 9.28125C3.74609 9.57248 3.97432 9.80859 4.25583 9.80859H5.34327C5.62478 9.80859 5.853 9.57248 5.853 9.28125C5.853 8.99002 5.62478 8.75391 5.34327 8.75391Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M5.34327 11.0039H4.25583C3.97432 11.0039 3.74609 11.24 3.74609 11.5312C3.74609 11.8225 3.97432 12.0586 4.25583 12.0586H5.34327C5.62478 12.0586 5.853 11.8225 5.853 11.5312C5.853 11.24 5.62478 11.0039 5.34327 11.0039Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M5.34327 13.2539H4.25583C3.97432 13.2539 3.74609 13.49 3.74609 13.7812C3.74609 14.0725 3.97432 14.3086 4.25583 14.3086H5.34327C5.62478 14.3086 5.853 14.0725 5.853 13.7812C5.853 13.49 5.62478 13.2539 5.34327 13.2539Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M9.69092 8.75391H8.60349C8.32198 8.75391 8.09375 8.99002 8.09375 9.28125C8.09375 9.57248 8.32198 9.80859 8.60349 9.80859H9.69092C9.97243 9.80859 10.2007 9.57248 10.2007 9.28125C10.2007 8.99002 9.97243 8.75391 9.69092 8.75391Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M9.69092 11.0039H8.60349C8.32198 11.0039 8.09375 11.24 8.09375 11.5312C8.09375 11.8225 8.32198 12.0586 8.60349 12.0586H9.69092C9.97243 12.0586 10.2007 11.8225 10.2007 11.5312C10.2007 11.24 9.97243 11.0039 9.69092 11.0039Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M9.69092 13.2539H8.60349C8.32198 13.2539 8.09375 13.49 8.09375 13.7812C8.09375 14.0725 8.32198 14.3086 8.60349 14.3086H9.69092C9.97243 14.3086 10.2007 14.0725 10.2007 13.7812C10.2007 13.49 9.97243 13.2539 9.69092 13.2539Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M14.0425 8.75391H12.955C12.6735 8.75391 12.4453 8.99002 12.4453 9.28125C12.4453 9.57248 12.6735 9.80859 12.955 9.80859H14.0425C14.324 9.80859 14.5522 9.57248 14.5522 9.28125C14.5522 8.99002 14.324 8.75391 14.0425 8.75391Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M14.0425 11.0039H12.955C12.6735 11.0039 12.4453 11.24 12.4453 11.5312C12.4453 11.8225 12.6735 12.0586 12.955 12.0586H14.0425C14.324 12.0586 14.5522 11.8225 14.5522 11.5312C14.5522 11.24 14.324 11.0039 14.0425 11.0039Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M14.0425 13.2539H12.955C12.6735 13.2539 12.4453 13.49 12.4453 13.7812C12.4453 14.0725 12.6735 14.3086 12.955 14.3086H14.0425C14.324 14.3086 14.5522 14.0725 14.5522 13.7812C14.5522 13.49 14.324 13.2539 14.0425 13.2539Z"
                                                                            fill="#181818"/>
                                                                        <path
                                                                            d="M16.319 2.28516H15.0956V1.40625C15.0956 1.11502 14.8674 0.878906 14.5859 0.878906C14.3044 0.878906 14.0762 1.11502 14.0762 1.40625V2.28516H9.65845V1.40625C9.65845 1.11502 9.43023 0.878906 9.14872 0.878906C8.86721 0.878906 8.63898 1.11502 8.63898 1.40625V2.28516H4.22127V1.40625C4.22127 1.11502 3.99304 0.878906 3.71153 0.878906C3.43002 0.878906 3.20179 1.11502 3.20179 1.40625V2.28516H1.97843C1.13522 2.28516 0.449219 2.99486 0.449219 3.86719V15.5391C0.449219 16.4114 1.13522 17.1211 1.97843 17.1211H16.319C17.1622 17.1211 17.8482 16.4114 17.8482 15.5391C17.8482 15.1987 17.8482 4.16338 17.8482 3.86719C17.8482 2.99486 17.1622 2.28516 16.319 2.28516ZM1.46869 3.86719C1.46869 3.57641 1.69736 3.33984 1.97843 3.33984H3.20179V4.21875C3.20179 4.50998 3.43002 4.74609 3.71153 4.74609C3.99304 4.74609 4.22127 4.50998 4.22127 4.21875V3.33984H8.63898V4.21875C8.63898 4.50998 8.86721 4.74609 9.14872 4.74609C9.43023 4.74609 9.65845 4.50998 9.65845 4.21875V3.33984H14.0762V4.21875C14.0762 4.50998 14.3044 4.74609 14.5859 4.74609C14.8674 4.74609 15.0956 4.50998 15.0956 4.21875V3.33984H16.319C16.6001 3.33984 16.8287 3.57641 16.8287 3.86719V5.94141H1.46869V3.86719ZM16.319 16.0664H1.97843C1.69736 16.0664 1.46869 15.8298 1.46869 15.5391V6.99609H16.8287V15.5391C16.8287 15.8298 16.6001 16.0664 16.319 16.0664Z"
                                                                            fill="#181818"/>
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0">
                                                                            <rect width="17.399"
                                                                                  height="18"
                                                                                  fill="white"
                                                                                  transform="translate(0.449219)"/>
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </Button>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">S??naq m??dd??ti </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="S??naq m??dd??ti"
                                                                          type="number"
                                                                          value={testPeriod || ''}
                                                                          onChange={(e) => setTestPeriod(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">??tat ??zr?? ??sas ??m??k haqq??</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="??tat ??zr?? ??sas ??m??k haqq??"
                                                                          value={employeeMainSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">??m??k ????raitin?? g??r?? ??lav?? </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="??m??k ????raitin?? g??r?? ??lav??"
                                                                          value={employeeConditionalAdd || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Dig??r f??rdi ??lav??</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Dig??r f??rdi ??lav?? daxil edin"
                                                                          value={employeeIndividualAdd || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ke??irildiyi struktur b??lm??</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ke??irildiyi struktur b??lm??"
                                                                          value={vacancyDepartment || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span
                                                            className="input-title">Ke??irildiyi alt struktur b??lm??</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ke??irildiyi struktur b??lm??"
                                                                          value={vacancyPosition || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ke??irildiyi i?? yeri</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ke??irildiyi i?? yeri"
                                                                          value={vacancyWorkPlace || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">D??r??c??</span>
                                                        <Select
                                                            placeholder="D??r??c??"
                                                            value={selectedGrade}
                                                            onChange={(val) => {
                                                                setSelectedGrade(val)
                                                            }}
                                                            isSearchable={gradeArr ? gradeArr.length > 5 : false}
                                                            options={gradeArr}
                                                            getOptionLabel={(option) => (option.grade)}
                                                            getOptionValue={(option) => (option.grade)}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {

                                                                errors['changeJob.gradeId'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['changeJob.gradeId']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Alt d??r??c?? </span>
                                                        <Select
                                                            placeholder="Alt d??r??c??"
                                                            value={selectedSubGrade}
                                                            onChange={(val) => {
                                                                setSelectedSubGrade(val)
                                                            }}
                                                            isSearchable={subGrade ? subGrade.length > 5 : false}
                                                            options={subGrade}
                                                            getOptionLabel={(option) => (option.subGrade)}
                                                            getOptionValue={(option) => (option.subGrade)}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Dig??r f??rdi ??lav?? </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Dig??r f??rdi ??lav??"
                                                                          type="number"
                                                                          value={individualAddition || ''}
                                                                          onChange={(e) => setIndividualAddition(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="14" title="" disabled={tab !== "14"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin ad??, soyad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id);
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat??n n??mr??si</span>
                                                    <Select
                                                        placeholder="??tat??n n??mr??sini se??"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getVacancyData(val.id);
                                                            setVacancyId(val.id);
                                                        }}
                                                        isSearchable={vacancy ? vacancy.length > 5 : false}
                                                        options={vacancy}
                                                        getOptionLabel={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        getOptionValue={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">????l??diyi struktur b??lm??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Struktur b??lm??nin ad?? daxil edin"
                                                                      value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">????l??diyi v??zif??si</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Alt struktur b??lm??nin ad?? daxil edin"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ke??irildiyi struktur b??lm??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ke??irildiyi struktur b??lm??"
                                                                      value={vacancyDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ke??irildiyi alt struktur b??lm??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ke??irildiyi struktur b??lm??"
                                                                      value={vacancySubDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ke??irildiyi i?? yeri</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ke??irildiyi i?? yeri"
                                                                      value={vacancyWorkPlace || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">D??yi??iklik tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={joinDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setJoinDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['temporaryPass.date'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['temporaryPass.date']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Ke??irildiyi m??d. ba??lad?????? tarix </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={startDate}
                                                                    endDate={endDate}
                                                                    onChange={(date) => setStartDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['temporaryPass.from'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['temporaryPass.from']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ke??irildiyi m??d. bitdiyi tarix </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            selected={endDate}
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            onChange={(date) => setEndDate(date)}
                                                            selectsEnd
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={startDate}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['temporaryPass.to'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['temporaryPass.to']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">D??r??c??</span>
                                                    <Select
                                                        placeholder="D??r??c??"
                                                        value={selectedGrade}
                                                        onChange={(val) => {
                                                            setSelectedGrade(val)
                                                        }}
                                                        isSearchable={gradeArr ? gradeArr.length > 5 : false}
                                                        options={gradeArr}
                                                        getOptionLabel={(option) => (option.grade)}
                                                        getOptionValue={(option) => (option.grade)}
                                                        styles={customStyles}
                                                    />
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['temporaryPass.gradeId'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['temporaryPass.gradeId']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Alt d??r??c?? </span>
                                                    <Select
                                                        placeholder="Alt d??r??c??"
                                                        value={selectedSubGrade}
                                                        onChange={(val) => {
                                                            setSelectedSubGrade(val)
                                                        }}
                                                        isSearchable={subGrade ? subGrade.length > 5 : false}
                                                        options={subGrade}
                                                        getOptionLabel={(option) => (option.subGrade)}
                                                        getOptionValue={(option) => (option.subGrade)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="15" title="" disabled={tab !== "15"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??????inin soyad??, ad??, ata ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <div className="input-title flex-center">
                                                        <div className="check-block">
                                                            <label className="check-button">
                                                                <input type="checkbox"
                                                                       name="checkForeign"
                                                                       checked={changeTempo}
                                                                       onChange={(e) => {
                                                                           setChangeTempo(e.target.checked)
                                                                       }}/>
                                                                <span className="checkmark"/>
                                                            </label>
                                                        </div>
                                                        <span
                                                            className="input-title m-0">{changeTempo ? '??v??z edil??n i????i' : '  Bo?? ??tata h??val??'}</span>
                                                    </div>
                                                    {
                                                        changeTempo ?
                                                            <Select
                                                                placeholder="??v??z edil??n i????ini se??"
                                                                value={selectedAssignEmpId}
                                                                onChange={(val) => {
                                                                    let id = val.id;
                                                                    setSelectedAssignEmpId(val);
                                                                    getAssignEmpDetail(id)
                                                                }}
                                                                isSearchable={employee ? employee.length > 5 : false}
                                                                options={employee}
                                                                getOptionLabel={(option) => (option.name)}
                                                                getOptionValue={(option) => (option.name)}
                                                                styles={customStyles}
                                                            />
                                                            :
                                                            <Select
                                                                placeholder="Bo?? ??tat??n n??mr??sini se??"
                                                                value={selectedPosition}
                                                                onChange={(val) => {
                                                                    setSelectedPosition(val);
                                                                    getVacancyData(val.id);
                                                                    setVacancyId(val.id);
                                                                }}
                                                                isSearchable={vacancy ? vacancy.length > 5 : false}
                                                                options={vacancy}
                                                                getOptionLabel={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                                getOptionValue={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                                styles={customStyles}
                                                            />
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">????l??diyi V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="????l??diyi v??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">D??yi??iklik tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={joinDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setJoinDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['temporaryAssignment.date'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['temporaryAssignment.date']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">H??val?? m??d. ba??lad?????? tarix </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={startDate}
                                                                    endDate={endDate}
                                                                    onChange={(date) => setStartDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['temporaryAssignment.from'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['temporaryAssignment.from']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">H??val?? m??d. bitdiyi tarix </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            selected={endDate}
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            onChange={(date) => setEndDate(date)}
                                                            selectsEnd
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={startDate}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['temporaryAssignment.to'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['temporaryAssignment.to']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            {
                                                changeTempo ?
                                                    null
                                                    :
                                                    <>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">D??r??c??</span>
                                                                <Select
                                                                    placeholder="D??r??c??"
                                                                    value={selectedGrade}
                                                                    onChange={(val) => {
                                                                        setSelectedGrade(val)
                                                                    }}
                                                                    isSearchable={gradeArr ? gradeArr.length > 5 : false}
                                                                    options={gradeArr}
                                                                    getOptionLabel={(option) => (option.grade)}
                                                                    getOptionValue={(option) => (option.grade)}
                                                                    styles={customStyles}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Alt d??r??c?? </span>
                                                                <Select
                                                                    placeholder="Alt d??r??c??"
                                                                    value={selectedSubGrade}
                                                                    onChange={(val) => {
                                                                        setSelectedSubGrade(val)
                                                                    }}
                                                                    isSearchable={subGrade ? subGrade.length > 5 : false}
                                                                    options={subGrade}
                                                                    getOptionLabel={(option) => (option.subGrade)}
                                                                    getOptionValue={(option) => (option.subGrade)}
                                                                    styles={customStyles}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </>
                                            }
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">H??val?? olunan v??zif??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="H??val?? olunan v??zif??"
                                                                      value={changeTempo ? assignPosition : vacancyPosition}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">H??val?? olunan v??zif??nin aid oldu??u struktur b??lm??</span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="H??val?? olunan v??zif??nin aid oldu??u struktur b??lm??"
                                                            value={changeTempo ? assignDepartment : vacancyDepartment}
                                                            disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">H??val?? olunan v??zif??nin aid oldu??u alt struktur b??lm??</span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="H??val?? olunan v??zif??nin aid oldu??u alt struktur b??lm??"
                                                            value={changeTempo ? assignSubDepartment : vacancySubDepartment}
                                                            disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ke??irildiyi i?? yeri</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ke??irildiyi i?? yeri"
                                                                      value={changeTempo ? assignWorkPlace : vacancyWorkPlace}
                                                                      disabled={true}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??v??z ed??n i????inin ??m??k haqq??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??v??z ed??n i????inin ??m??k haqq??"
                                                                      value={employeeMainSalary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            {
                                                changeTempo ?
                                                    <Col xs={6}>
                                                        <Form.Group className="form-group">
                                                            <span className="input-title">??v??z edil??n  i????inin ??m??k haqq??</span>
                                                            <Form.Label>
                                                                <Form.Control placeholder="Ke??irildiyi struktur b??lm??"
                                                                              value={assignMainSalary || ''}
                                                                              disabled={true}/>
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    :
                                                    null
                                            }
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <div className="input-title flex-center">
                                                        <div className="check-block">
                                                            <label className="check-button">
                                                                <input type="checkbox"
                                                                       name="checkForeign"
                                                                       checked={assignCheck}
                                                                       onChange={(e) => {
                                                                           setAssignCheck(e.target.checked)
                                                                       }}/>
                                                                <span className="checkmark"></span>
                                                            </label>
                                                        </div>
                                                        <span className="input-title m-0">H??val?? edil??n ??m??k haq. tutulan faiz</span>
                                                    </div>
                                                    <Form.Label>
                                                        <Form.Control placeholder="H??val?? edil??n ??m??k haq. tutulan faiz"
                                                                      disabled={!assignCheck}
                                                                      value={amount}
                                                                      onChange={(e) => setAmount(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    {/*<Tab eventKey="16" title="" disabled={tab !== "16"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5: false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??tat??n n??mr??si</span>
                                                    <Select
                                                        placeholder="??tat??n n??mr??sini se??"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getPositionIdData(val.value);
                                                            setPositionId(val.value)
                                                        }}
                                                        isSearchable={position ? position.length > 5: false}
                                                        options={position}
                                                        getOptionLabel={(option) => option.value}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">????l??diyi V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="????l??diyi v??zif??si"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">D??yi??iklik tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={changeDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setChangeDate(date)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??v??zetm?? m??dd??ti</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??v??zetm?? m??dd??ti"
                                                                      value={changePeriod}
                                                                      type="number"
                                                                      onChange={(e) => setChangePeriod(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??v??z olunan v??zif??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ke??irildiyi v??zif??"
                                                                      value={positionVacancyName || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??v??z olunan v??zif??nin aid oldu??u struktur b??lm??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ke??irildiyi struktur b??lm??"
                                                                      value={positionDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??v??z olunan v??zif??nin aid oldu??u alt struktur b??lm??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ke??irildiyi struktur b??lm??"
                                                                      value={positionSubDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??v??z ed??n i????inin ??m??k haqq??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ke??irildiyi struktur b??lm??"
                                                                      value={salary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??v??z ed??n v??zif??nin  ??m??k haqq??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ke??irildiyi struktur b??lm??"
                                                                      value={positionSalary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>*/}

                                    <Tab eventKey="17" title="" disabled={tab !== "17"}>
                                        <Row>
                                            {
                                                showVacation ?
                                                    <Col xs={12}>
                                                        <div className="table-striped">
                                                            <Table responsive>
                                                                <thead>
                                                                <tr>
                                                                    <th>???? ili d??vr??</th>
                                                                    <th>??sas m??z.</th>
                                                                    <th>Staja g??r??</th>
                                                                    <th>Kollektiv m??z. g??r??</th>
                                                                    <th>U??a??a g??r??</th>
                                                                    <th>??m??k ????rait. g??r??</th>
                                                                    <th>Borca g??r??</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {
                                                                    vacation.length > 0 ?
                                                                        vacation.map((item, index) =>
                                                                            <tr key={index}>
                                                                                <td>{item.startDate} - {item.endDate}</td>
                                                                                <td>{item.main} {item.approvedVacation.MAIN !== undefined ? ` - ${item.approvedVacation.MAIN}` : ''} </td>
                                                                                <td>{item.experience} {item.approvedVacation.EXPERIENCE !== undefined ? ` - ${item.approvedVacation.EXPERIENCE}` : ''}</td>
                                                                                <td>{item.collectiveAgreement} {item.approvedVacation.AGREEMENT !== undefined ? ` - ${item.approvedVacation.AGREEMENT}` : ''}</td>
                                                                                <td>{item.children} {item.approvedVacation.CHILD !== undefined ? ` - ${item.approvedVacation.CHILD}` : ''}</td>
                                                                                <td>{item.workCondition} {item.approvedVacation.CONDITIONAL !== undefined ? ` - ${item.approvedVacation.CONDITIONAL}` : ''}</td>
                                                                                <td>{item.debt} {item.approvedVacation.DEBT !== undefined ? ` - ${item.approvedVacation.DEBT}` : ''}</td>
                                                                            </tr>
                                                                        )
                                                                        :
                                                                        <tr>
                                                                            <td colSpan={6}>
                                                                                <p className="text-center m-0">M??lumat
                                                                                    yoxdur</p>
                                                                            </td>
                                                                        </tr>
                                                                }
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </Col>
                                                    : null
                                            }
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder || ''}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin ad??, soyad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            setShowVacation(true)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                            getVacation(id);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            {/* <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">T??til n??v??n?? se??in</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedVacationType}
                                                        onChange={(val) => {
                                                            setSelectedVacationType(val);
                                                            setShowMainVacation(val.some(item => item.label === 'Main'));
                                                            setShowExpVacation(val.some(item => item.label === 'Experience'));
                                                        }}
                                                        isMulti={true}
                                                        isSearchable={vacationType ? vacationType.length > 5: false}
                                                        options={vacationType}
                                                        getOptionLabel={(option) => (option.label)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>*/}
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">M??zuniyy??tin ba??lad?????? tarix  </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    value={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => {
                                                                        setStartDate(date);
                                                                        let setDate = date !== null ? date : 0;
                                                                        getCalculatedDate(vacationArr, setDate)
                                                                    }}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['workVacation.from'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['workVacation.from']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">M??zuniyy??tin bitdiyi tarix  </span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={getEndDate || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['workVacation.to'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['workVacation.to']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">?????? ba??lama tarixi  </span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={jobDay || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['workVacation.startJob'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['workVacation.startJob']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            {
                                                showVacation ?
                                                    <Col xs={12}>
                                                        <div className="block-inn">
                                                            <div className="addition-content">
                                                                {
                                                                    vacationArr.map((item, index) =>
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
                                                                                                vacationArr.splice(index, 1);
                                                                                                setVacationArr([...vacationArr], vacationArr)
                                                                                            }}>
                                                                                            <svg width="14" height="14"
                                                                                                 viewBox="0 0 14 14"
                                                                                                 fill="none"
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
                                                                                <Col>
                                                                                    <Form.Group className="form-group">
                                                                                        <span className="input-title">???? ili d??vr??n?? se??in</span>
                                                                                        <Form.Label>
                                                                                            <Select
                                                                                                placeholder="???? ili d??vr??n?? se??in"
                                                                                                onChange={(val) => {
                                                                                                    vacationArr[index].startDate = val.startDate;
                                                                                                    setVacationArr([...vacationArr], vacationArr)
                                                                                                }}
                                                                                                isSearchable={vacation ? vacation.length > 5 : false}
                                                                                                options={vacation}
                                                                                                getOptionLabel={(option) => `${option.startDate} - ${option.endDate}`}
                                                                                                getOptionValue={(option) => `${option.startDate} - ${option.endDate}`}
                                                                                                styles={customStyles}
                                                                                            />
                                                                                        </Form.Label>
                                                                                        <div
                                                                                            className="validation-block flex-start">
                                                                                            {

                                                                                                errors[`workVacation.vacations[${index}].vacationType`] !== '' ?
                                                                                                    <span
                                                                                                        className="text-validation">{errors[`workVacation.vacations[${index}].vacationType`]}</span>
                                                                                                    : null
                                                                                            }
                                                                                        </div>
                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col xs={4}>
                                                                                    <Form.Group className="form-group">
                                                                                        <span className="input-title">M??zuniyy??t n??v??n?? se??in</span>
                                                                                        <Form.Label>
                                                                                            <Select
                                                                                                placeholder="M??zuniyy??t n??v??n?? se??in"
                                                                                                onChange={(val) => {
                                                                                                    vacationArr[index].vacationType = val.value;
                                                                                                    setVacationArr([...vacationArr], vacationArr)
                                                                                                }}
                                                                                                isSearchable={vacationTypeOptions ? vacationTypeOptions.length > 5 : false}
                                                                                                options={vacationTypeOptions}
                                                                                                getOptionLabel={(option) => (option.label)}
                                                                                                getOptionValue={(option) => (option.label)}
                                                                                                styles={customStyles}
                                                                                            />
                                                                                        </Form.Label>
                                                                                        <div
                                                                                            className="validation-block flex-start">
                                                                                            {

                                                                                                errors[`workVacation.vacations[${index}].vacationType`] !== '' ?
                                                                                                    <span
                                                                                                        className="text-validation">{errors[`workVacation.vacations[${index}].vacationType`]}</span>
                                                                                                    : null
                                                                                            }
                                                                                        </div>
                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col xs={4}>
                                                                                    <Form.Group className="form-group">
                                                                                        <span className="input-title">M??zuniyy??t g??n. say?? daxil edin</span>
                                                                                        <Form.Label>
                                                                                            <Form.Control
                                                                                                type="number"
                                                                                                placeholder="M??zuniyy??t g??n. say?? daxil edin"
                                                                                                onChange={(e) => {
                                                                                                    vacationArr[index].day = e.target.value;
                                                                                                    setVacationArr([...vacationArr], vacationArr);
                                                                                                    getCalculatedDate(vacationArr, startDate)
                                                                                                }}/>
                                                                                        </Form.Label>
                                                                                        <div
                                                                                            className="validation-block flex-start">
                                                                                            {

                                                                                                errors[`workVacation.vacations[${index}].day`] !== '' ?
                                                                                                    <span
                                                                                                        className="text-validation">{errors[`workVacation.vacations[${index}].day`]}</span>
                                                                                                    : null
                                                                                            }
                                                                                        </div>
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                    )
                                                                }
                                                                <div className="flex-end">
                                                                    <Button type="button" className="btn-main-text"
                                                                            onClick={() => addVacationArr()}>
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
                                                    </Col>
                                                    : null
                                            }
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="18" title="" disabled={tab !== "18"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="??????inin ??riz??sin?? v?? t??hsil m????ssis??si t??r??find??n veril??n ??a????r????"
                                                            value={mainOfOrder}
                                                            onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            setShowVacation(true)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                            getVacation(id)
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">T??hsil (v?? ya yarad??c??l??q) m??zuniyy??tinin ba??lad?????? tarix  </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => {
                                                                        setStartDate(date);
                                                                        let setDate = date !== null ? date : 0;
                                                                        getCalculatedDate(vacationDay, setDate)
                                                                    }}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['educationVacation.from'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['educationVacation.from']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">T??hsil (v?? ya yarad??c??l??q) m??zuniyy??tin?? bitdiyi tarix   </span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={vacationEndDate || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['educationVacation.to'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['educationVacation.to']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">T??hsil (yarad??c??l??q) m??zuniyy??tinin m??dd??ti (g??n) </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="M??zuniyy??t m??dd??ti "
                                                                      value={vacationDay}
                                                                      type="number"
                                                                      onChange={(e) => {
                                                                          setVacationDay(e.target.value);
                                                                          let day = e.target.value;
                                                                          getCalculatedDate(day, startDate)
                                                                      }}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['educationVacation.day'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['educationVacation.day']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">?????? ba??lama tarixi </span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={jobDay || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['educationVacation.startJob'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['educationVacation.startJob']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="19" title="" disabled={tab !== "19"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder || ''}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            setShowVacation(true)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                            getVacation(id)
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??zuniyy??t m??dd??ti</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="M??zuniyy??t m??dd??ti "
                                                                      value={vacationDay}
                                                                      type="number"
                                                                      onChange={(e) => {
                                                                          setVacationDay(e.target.value);
                                                                          let day = e.target.value;
                                                                          getCalculatedDate(day, startDate)
                                                                      }}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['freeVacation.day'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['freeVacation.day']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??zuniyy??tin ba??lad?????? tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => {
                                                                        setStartDate(date);
                                                                        let setDate = date !== null ? date : 0;
                                                                        getCalculatedDate(vacationDay, setDate)
                                                                    }}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['freeVacation.from'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['freeVacation.from']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??zuniyy??tin bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={vacationEndDate || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['freeVacation.to'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['freeVacation.to']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">?????? ba??lama tarixi  </span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={jobDay || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['freeVacation.startJob'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['freeVacation.startJob']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="20" title="" disabled={tab !== "20"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder || ''}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad??</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            setShowVacation(true)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                            getVacation(id)
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??zuniyy??t m??dd??ti</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="M??zuniyy??t m??dd??ti "
                                                                      value={vacationDay}
                                                                      type="number"
                                                                      onChange={(e) => {
                                                                          setVacationDay(e.target.value);
                                                                          let day = e.target.value;
                                                                          getCalculatedDate(day, startDate)
                                                                      }}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['socialVacation.day'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['socialVacation.day']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??zuniyy??tin ba??lad?????? tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={startDate}
                                                                    endDate={endDate}
                                                                    onChange={(date) => {
                                                                        setStartDate(date);
                                                                        let setDate = date !== null ? date : 0;
                                                                        getCalculatedDate(vacationDay, setDate)
                                                                    }}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['socialVacation.from'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['socialVacation.from']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??zuniyy??tin bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={vacationEndDate || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['socialVacation.to'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['socialVacation.to']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">?????? ba??lama tarixi </span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={jobDay || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['socialVacation.startJob'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['socialVacation.startJob']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Seriya n??mr??si</span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="Seriya n??mr??si"
                                                                      type="text"
                                                                      value={seriesNumber || ''}
                                                                      onChange={(e) => setSeriesNumber(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['socialVacation.seriesNumber'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['socialVacation.seriesNumber']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Sosial s????orta n??mr??si</span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="Sosial s????orta n??mr??si"
                                                                      type="text"
                                                                      value={sicNo || ''}
                                                                      onChange={(e) => setSicNo(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['socialVacation.ssn'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['socialVacation.ssn']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>


                                    <Tab eventKey="21" title="" disabled={tab !== "21"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad??</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                            getVacation(id)
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??zuniyy??t m??dd??ti</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="M??zuniyy??t m??dd??ti "
                                                                      value={vacationDay}
                                                                      type="number"
                                                                      onChange={(e) => {
                                                                          setVacationDay(e.target.value);
                                                                          let day = e.target.value;
                                                                          getCalculatedDate(day, startDate)
                                                                      }}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {

                                                                errors['partialVacation.day'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['partialVacation.day']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??zuniyy??tin ba??lad?????? tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => {
                                                                        setStartDate(date);
                                                                        let setDate = date !== null ? date : 0;
                                                                        getCalculatedDate(vacationDay, setDate)
                                                                    }}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['partialVacation.from'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['partialVacation.from']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??zuniyy??tin bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={getEndDate || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['partialVacation.to'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['partialVacation.to']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">?????? ba??lama tarixi </span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={jobDay || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['partialVacation.startJob'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['partialVacation.startJob']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="22" title="" disabled={tab !== "22"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder || ''}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad??</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            setShowVacation(true)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                            getVacation(id)
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??d??ni??li istirah??t m??dd??ti</span>
                                                    <Form.Control placeholder="??d??ni??li istirah??t m??dd??ti "
                                                                  value={vacationDay}
                                                                  type="number"
                                                                  onChange={(e) => {
                                                                      setVacationDay(e.target.value);
                                                                      let day = e.target.value;
                                                                      getCalculatedDate(day, startDate)
                                                                  }}
                                                    />
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['collectiveAgreement.day'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['collectiveAgreement.day']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??d??ni??li istirah??tin ba??lama tarixi</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => {
                                                                        setStartDate(date);
                                                                        let setDate = date !== null ? date : 0;
                                                                        getCalculatedDate(vacationDay, setDate)
                                                                    }}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['collectiveAgreement.from'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['collectiveAgreement.from']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??d??ni??li istirah??tin bitdiyi tarixi</span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={getEndDate || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['collectiveAgreement.to'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['collectiveAgreement.to']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">?????? ba??lama tarixi </span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={jobDay || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['collectiveAgreement.startJob'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['collectiveAgreement.startJob']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??d??ni??li istirah??t verilm??sinin s??b??bi </span>
                                                    <Select
                                                        placeholder="??d??ni??li istirah??t verilm??sinin s??b??bi"
                                                        value={selectedCollectAgree}
                                                        onChange={(val) => {
                                                            setSelectedCollectAgree(val);
                                                        }}
                                                        isSearchable={collectiveAgreeOpt ? collectiveAgreeOpt.length > 5 : false}
                                                        options={collectiveAgreeOpt}
                                                        getOptionLabel={(option) => option.reason}
                                                        getOptionValue={(option) => option.reason}
                                                        styles={customStyles}
                                                    />
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['collectiveAgreement.collectiveAgreementReasonId'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['collectiveAgreement.collectiveAgreementReasonId']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>


                                    {/*
                                     <Tab eventKey="23" title="" disabled={tab !== "23"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad??</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            setShowVacation(true)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                            getVacation(id)
                                                        }}
                                                        isSearchable={employee ? employee.length > 5: false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??zuniyy??t?? burax??ld?????? m??dd??t</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="M??zuniyy??t m??dd??ti "
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??zuniyy??t?? burax??lman??n ba??lad?????? tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={startDate}
                                                                    endDate={endDate}
                                                                    onChange={(date) => setStartDate(date)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">M??zuniyy??t?? burax??lman??n bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
                                                            onChange={(date) => setEndDate(date)}
                                                            selectsEnd
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={startDate}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">M??zuniyy??tin ke??irilm??sinin ba??lad?????? tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startVacationHeldDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={startVacationHeldDate}
                                                                    endDate={endVacationHeldDate}
                                                                    onChange={(date) => setStartVacationHeldDate(date)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">M??zuniyy??tin ke??irilm??sinin ba??lad?????? tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endVacationHeldDate}
                                                            onChange={(date) => setEndVacationHeldDate(date)}
                                                            selectsEnd
                                                            startDate={startVacationHeldDate}
                                                            endDate={endVacationHeldDate}
                                                            minDate={startVacationHeldDate}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??zuniyy??tin ke??irildiyi m??dd??t</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="M??zuniyy??t m??dd??ti "
                                                                      value={dayOutEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayOutEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">?????? ba??lama tarixi </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={joinDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setJoinDate(date)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
*/}

                                    <Tab eventKey="24" title="" disabled={tab !== "24"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder || ''}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad??</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            setShowVacation(true)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                            getVacation(id);
                                                            getVacationOperation(id)
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            {
                                                showVacation ?
                                                    <Col xs={6}>
                                                        <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Geri ??a????r??ld?????? m??z. ??mri</span>
                                                            <Select
                                                                placeholder="Geri ??a????r??ld?????? m??z. ??mri"
                                                                value={selectedVacOp}
                                                                onChange={(val) => {
                                                                    setSelectedVacOp(val)
                                                                }}
                                                                isSearchable={vacOperationOption ? vacOperationOption.length > 5 : false}
                                                                options={vacOperationOption}
                                                                getOptionLabel={(option) => (option.id)}
                                                                getOptionValue={(option) => (option.id)}
                                                                styles={customStyles}
                                                            />
                                                            <div className="validation-block flex-start">
                                                                {

                                                                    errors['vacationDisable.operationId'] !== '' ?
                                                                        <span
                                                                            className="text-validation">{errors['vacationDisable.operationId']}</span>
                                                                        : null
                                                                }
                                                            </div>
                                                        </Form.Group>
                                                    </Col>
                                                    : null
                                            }
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Geri ??a????r??lma tarixi</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={joinDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    onChange={(date) => setJoinDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['vacationDisable.callBackDate'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['vacationDisable.callBackDate']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Geri ??a????r??lma s??b??bi</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Geri ??a????r??lma s??b??bi"
                                                                      value={callBackReason}
                                                                      onChange={(e) => setCallBackReason(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['vacationDisable.callBackReason'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['vacationDisable.callBackReason']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <div className="block-title flex-center">
                                                    <div className="check-block">
                                                        <label className="check-button">
                                                            <input type="checkbox"
                                                                   checked={debtCheck}
                                                                   onChange={(e) => {
                                                                       setDebtCheck(e.target.checked);
                                                                   }}/>
                                                            <span className="checkmark"/>
                                                        </label>
                                                    </div>
                                                    M??zuniyy??td??n geri ??a????r??lman?? pul il?? ??d??
                                                </div>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="25" title="" disabled={tab !== "25"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder || ''}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad??</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            setShowVacation(true)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                            getVacation(id);
                                                            getVacationOperation(id)
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            {
                                                showVacation ?
                                                    <Col xs={6}>
                                                        <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Geri ??a????r??ld?????? m??z. ??mri</span>
                                                            <Select
                                                                placeholder="Geri ??a????r??ld?????? m??z. ??mri"
                                                                value={selectedVacOp}
                                                                onChange={(val) => {
                                                                    setSelectedVacOp(val)
                                                                }}
                                                                isSearchable={vacOperationOption ? vacOperationOption.length > 5 : false}
                                                                options={vacOperationOption}
                                                                getOptionLabel={(option) => (option.id)}
                                                                getOptionValue={(option) => (option.id)}
                                                                styles={customStyles}
                                                            />
                                                            <div className="validation-block flex-start">
                                                                {

                                                                    errors['vacationDisable.operationId'] !== '' ?
                                                                        <span
                                                                            className="text-validation">{errors['vacationDisable.operationId']}</span>
                                                                        : null
                                                                }
                                                            </div>
                                                        </Form.Group>
                                                    </Col>
                                                    : null
                                            }
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Geri ??a????r??lma tarixi</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={joinDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    onChange={(date) => setJoinDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['vacationDisable.callBackDate'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['vacationDisable.callBackDate']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Geri ??a????r??lma s??b??bi</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Geri ??a????r??lma s??b??bi"
                                                                      value={callBackReason}
                                                                      onChange={(e) => setCallBackReason(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['vacationDisable.callBackReason'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['vacationDisable.callBackReason']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="26" title="" disabled={tab !== "26"}>
                                        <Row>
                                            {
                                                showVacation ?
                                                    <Col xs={12}>
                                                        <div className="table-striped">
                                                            <Table responsive>
                                                                <thead>
                                                                <tr>
                                                                    <th>???? ili d??vr??</th>
                                                                    <th>??sas m??z.</th>
                                                                    <th>Staja g??r??</th>
                                                                    <th>Kollektiv m??z. g??r??</th>
                                                                    <th>U??a??a g??r??</th>
                                                                    <th>??m??k ????rait. g??r??</th>
                                                                    <th>Borca g??r??</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {
                                                                    vacation.length > 0 ?
                                                                        vacation.map((item, index) =>
                                                                            <tr key={index}>
                                                                                <td>{item.startDate} - {item.endDate}</td>
                                                                                <td>{item.main} {item.approvedVacation.MAIN !== undefined ? ` - ${item.approvedVacation.MAIN}` : ''} </td>
                                                                                <td>{item.experience} {item.approvedVacation.EXPERIENCE !== undefined ? ` - ${item.approvedVacation.EXPERIENCE}` : ''}</td>
                                                                                <td>{item.collectiveAgreement} {item.approvedVacation.AGREEMENT !== undefined ? ` - ${item.approvedVacation.AGREEMENT}` : ''}</td>
                                                                                <td>{item.children} {item.approvedVacation.CHILD !== undefined ? ` - ${item.approvedVacation.CHILD}` : ''}</td>
                                                                                <td>{item.workCondition} {item.approvedVacation.CONDITIONAL !== undefined ? ` - ${item.approvedVacation.CONDITIONAL}` : ''}</td>
                                                                                <td>{item.debt} {item.approvedVacation.DEBT !== undefined ? ` - ${item.approvedVacation.DEBT}` : ''}</td>
                                                                            </tr>
                                                                        )
                                                                        :
                                                                        <tr>
                                                                            <td colSpan={6}>
                                                                                <p className="text-center m-0">M??lumat
                                                                                    yoxdur</p>
                                                                            </td>
                                                                        </tr>
                                                                }
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </Col>
                                                    : null
                                            }
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder || ''}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad??</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            getEmployeeDetail(id);
                                                            setShowVacation(true);
                                                            setSelectedStaff(val);
                                                            getVacation(id);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">???? ili d??vr??n?? se??in</span>
                                                    <Form.Label>
                                                        <Select
                                                            placeholder="???? ili d??vr??n?? se??in"
                                                            onChange={(val) => {
                                                                setSelectedVacation(val);
                                                            }}
                                                            isMulti={true}
                                                            isSearchable={vacation ? vacation.length > 5 : false}
                                                            options={vacation}
                                                            getOptionLabel={(option) => `${option.startDate} - ${option.endDate}`}
                                                            getOptionValue={(option) => `${option.startDate} - ${option.endDate}`}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['vacationCompensation.startDates'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['vacationCompensation.startDates']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>

                                        </Row>
                                    </Tab>
                                    {/*<Tab eventKey="27" title="" disabled={tab !== "27"}>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <Form.Label>
                                                        <Form.Control
                                                            className="resize"
                                                            placeholder={`??? ???${year}-ci il ??zr?? C??miyy??t i????il??rinin ??m??k m??zuniyy??tl??rinin verilm??si ??????n n??vb??lilik c??dv??li t??sdiq edilsin`}
                                                            as="textarea" disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>*/}
                                    <Tab eventKey="28" title="" disabled={tab !== "28"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="T??lim?? g??nd??rilm?? z??rur??ti daxil edin"
                                                            value={mainOfOrder}
                                                            onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin ad??, soyad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">T??limin ba??lad?????? tarix </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={startDate}
                                                                    endDate={endDate}
                                                                    onChange={(date) => setStartDate(date)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">T??limin bitdiyi tarix </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            selected={endDate}
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            onChange={(date) => setEndDate(date)}
                                                            selectsEnd
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={startDate}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">T??limin ad??  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="T??limin ad??  daxil edin"
                                                                      value={eventName}
                                                                      onChange={(e) => setEventName(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    {/*
                                    <Tab eventKey="29" title="" disabled={tab !== "29"}>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <Form.Label>
                                                        <Form.Control
                                                            className="resize"
                                                            placeholder={`???Bak?? Beyn??lxalq D??niz Ticar??t Liman????? Qapal?? S??hmdar C??miyy??tind?? ??m??kda??lar??n pe???? s??viyy??sinin art??r??lmas?? m??qs??di il?? ???${year}-ci il ??zr?? T??lim plan????? t??sdiq edilsin`}
                                                            as="textarea" disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <Form.Label>
                                                        <Form.Control
                                                            className="resize"
                                                            placeholder={`???Bak?? Beyn??lxalq D??niz Ticar??t Liman????? Qapal?? S??hmdar C??miyy??tind?? ??m??kda??lar??n pe???? s??viyy??sinin art??r??lmas?? m??qs??di il?? ???${year}-ci il ??zr?? T??lim plan????? t??sdiq edilsin`}
                                                            as="textarea" disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
*/}
                                    <Tab eventKey="30" title="" disabled={tab !== "30"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Ezamiyy??nin m??qs??di  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin ad??, soyad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);

                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <div className="block-inn relative">
                                                    {/* <div className="block-title ">
                                                        ???? vaxt??ndan art??q i???? c??lb edil??n i????i v?? ya i????il??r
                                                    </div>*/}
                                                    <div className="addition-content">
                                                        {
                                                            businessTripArr.map((item, index) =>
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
                                                                                        businessTripArr.splice(index, 1);
                                                                                        setBusinessTripArr([...businessTripArr], businessTripArr)
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
                                                                        <Col xs={4}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">Ezam olundu??u ??lk??\????h??r\rayon</span>
                                                                                <Form.Label>
                                                                                    <Select
                                                                                        placeholder="????h??r se??in"
                                                                                        onChange={(val) => {
                                                                                            businessTripArr[index].cityId = val;
                                                                                            setBusinessTripArr([...businessTripArr], businessTripArr);
                                                                                            if (item.fromDate && item.toDate) getBusinessTripDay();
                                                                                        }}
                                                                                        options={paymentArr}
                                                                                        isSearchable={paymentArr ? paymentArr.length > 5 : false}
                                                                                        styles={customStyles}
                                                                                        getOptionLabel={(option) => `${option.city} - ${option.amount} Azn`}
                                                                                        getOptionValue={(option) => `${option.city} - ${option.amount} Azn `}
                                                                                    />
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <Form.Group className="form-group">
                                                                                <div
                                                                                    className="input-title flex-center">
                                                                                    <div className="check-block">
                                                                                        <label className="check-button">
                                                                                            <input type="checkbox"
                                                                                                   name="checkForeign"
                                                                                                   checked={item.fromCheckInHotel}
                                                                                                   onChange={(e) => {
                                                                                                       businessTripArr[index].fromCheckInHotel = e.target.checked;
                                                                                                       setBusinessTripArr([...businessTripArr], businessTripArr);
                                                                                                   }}/>
                                                                                            <span
                                                                                                className="checkmark"/>
                                                                                        </label>
                                                                                    </div>
                                                                                    <span className="input-title m-0">Ezamiyy??tin ba??lad?????? tarix / Otele giri?? daxildir </span>
                                                                                </div>
                                                                                <Form.Label className="relative m-0">
                                                                                    <DatePicker value={item.fromDate}
                                                                                                dateFormat="dd-MM-yyyy"
                                                                                                placeholderText="DD-MM-YYYY"
                                                                                                showMonthDropdown
                                                                                                showYearDropdown
                                                                                                dropdownMode="select"
                                                                                                selectsStart
                                                                                                startDate={item.fromDate !== null ? new Date(item.fromDate) : item.fromDate}
                                                                                                endDate={item.toDate !== null ? new Date(item.toDate) : item.toDate}
                                                                                                onChange={(date) => {
                                                                                                    businessTripArr[index].fromDate = moment(date).format("YYYY-MM-DD");
                                                                                                    setBusinessTripArr([...businessTripArr], businessTripArr);
                                                                                                    if (item.fromDate && item.toDate) getBusinessTripDay();
                                                                                                }}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <Form.Group className="form-group">
                                                                                <div
                                                                                    className="input-title flex-center">
                                                                                    <div className="check-block">
                                                                                        <label className="check-button">
                                                                                            <input type="checkbox"
                                                                                                   name="checkForeign"
                                                                                                   checked={item.toCheckInHotel}
                                                                                                   onChange={(e) => {
                                                                                                       businessTripArr[index].toCheckInHotel = e.target.checked;
                                                                                                       setBusinessTripArr([...businessTripArr], businessTripArr)
                                                                                                   }}/>
                                                                                            <span
                                                                                                className="checkmark"/>
                                                                                        </label>
                                                                                    </div>
                                                                                    <span
                                                                                        className="input-title m-0">Ezamiyy??tin bitdiyi tarix / Oteld??n ????x???? daxildir </span>
                                                                                </div>
                                                                                <Form.Label className="relative m-0">
                                                                                    <DatePicker
                                                                                        value={item.toDate}
                                                                                        dateFormat="dd-MM-yyyy"
                                                                                        placeholderText="DD-MM-YYYY"
                                                                                        showMonthDropdown
                                                                                        showYearDropdown
                                                                                        dropdownMode="select"
                                                                                        selected={endDate}
                                                                                        onChange={(date) => {
                                                                                            businessTripArr[index].toDate = moment(date).format("YYYY-MM-DD");
                                                                                            setBusinessTripArr([...businessTripArr], businessTripArr);
                                                                                            if (item.fromDate && item.toDate) getBusinessTripDay();
                                                                                        }}
                                                                                        selectsEnd
                                                                                        startDate={item.fromDate !== null ? new Date(item.fromDate) : item.fromDate}
                                                                                        endDate={item.toDate !== null ? new Date(item.toDate) : item.toDate}
                                                                                        minDate={item.fromDate !== null ? new Date(item.fromDate) : item.fromDate}/>
                                                                                </Form.Label>
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {

                                                                                        errors['businessTrip.to'] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors['businessTrip.to']}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                </div>
                                                            )
                                                        }
                                                        <div className="flex-end">
                                                            <Button type="button" className="btn-main-text"
                                                                    onClick={() => addBusinessTripArr()}>
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
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezamiyy??t m??dd??ti </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Ezamiyy??t m??dd??ti"
                                                            disabled={true}
                                                            value={businessTripPeriod}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['businessTrip.day'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['businessTrip.day']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezamiyy?? m??d. i????inin yolda ke??. istirah??t g??n. t??sad??f etdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control
                                                            placeholder="Ezamiyy??t m??dd??ti"
                                                            disabled={true}
                                                            value={nonWorkDays || ''}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??????inin i???? ba??lama tarixi</span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control
                                                            placeholder="??????inin i???? ba??lama tarixi"
                                                            disabled={true}
                                                            value={jobDay || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['businessTrip.startJob'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['businessTrip.startJob']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        {
                                            nonWorkDayArr.length > 0 ?
                                                nonWorkDayArr.map((item, index) =>
                                                    <Row key={index}>
                                                        <Col xs={12}>
                                                            <div className="date-title">
                                                                <span> {index + 1}. </span> {item.day}
                                                            </div>
                                                        </Col>
                                                        <Col xs={3}>
                                                            <div className="block-title flex-center">
                                                                <div className="radio-block">
                                                                    <label className="radio-label">
                                                                        <input type="radio"
                                                                               name={`${index}radioCheck`}
                                                                               checked={!item.check}
                                                                               onChange={() => {
                                                                                   nonWorkDayArr[index].check = false;
                                                                                   setNonWorkDayArr([...nonWorkDayArr], nonWorkDayArr);
                                                                                   setNonWorkDayCount(nonWorkDayCount - 1);
                                                                                   getBusinessTripNumber((nonWorkDayCount - 1), nonWorkEndDay)
                                                                               }}/>
                                                                        <span className="radio-mark"/>
                                                                    </label>
                                                                    <span
                                                                        className="radio-title">??d??ni?? il?? ??v??z et</span>
                                                                </div>
                                                            </div>
                                                            {
                                                                item.check ?
                                                                    null :
                                                                    <Row>
                                                                        <Col xs={12}>
                                                                            <Form.Group className="form-group">
                                                                            <span
                                                                                className="input-title">??v??z edil??n ??d??ni?? </span>
                                                                                <Form.Label className="relative m-0">
                                                                                    <Form.Control
                                                                                        value={item.payment || ''}
                                                                                        placeholder="??v??z edil??n ??d??ni?? "
                                                                                        disabled={true}
                                                                                    />
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                            }
                                                        </Col>
                                                        <Col xs={3}>
                                                            <div className="block-title flex-center">
                                                                <div className="radio-block">
                                                                    <label className="radio-label">
                                                                        <input type="radio"
                                                                               checked={item.check}
                                                                               name={`${index}radioCheck`}
                                                                               onChange={() => {
                                                                                   nonWorkDayArr[index].check = true;
                                                                                   setNonWorkDayArr([...nonWorkDayArr], nonWorkDayArr);
                                                                                   setNonWorkDayCount(nonWorkDayCount + 1);
                                                                                   getBusinessTripNumber(nonWorkDayCount + 1, nonWorkEndDay)
                                                                               }}/>
                                                                        <span className="radio-mark"/>
                                                                    </label>
                                                                    <span className="radio-title"> ??stirah??t g??n?? il?? ??v??z et</span>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                )
                                                :
                                                null
                                        }
                                        <Row>
                                            <Col xs={3}>
                                                <div className="block-title flex-center">
                                                    <div className="check-block">
                                                        <label className="check-button">
                                                            <input type="checkbox"
                                                                   checked={hotelExpCheck}
                                                                   onChange={(e) => {
                                                                       setHotelExpCheck(e.target.checked);
                                                                   }}
                                                            />
                                                            <span className="checkmark"/>
                                                        </label>
                                                    </div>
                                                    Mehmanxana x??rcl??ri
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div className="block-title flex-center">
                                                    <div className="check-block">
                                                        <label className="check-button">
                                                            <input type="checkbox"
                                                                   checked={dailyExpCheck}
                                                                   onChange={(e) => {
                                                                       setDailyExpCheck(e.target.checked);
                                                                   }}
                                                            />
                                                            <span className="checkmark"/>
                                                        </label>
                                                    </div>
                                                    G??nd??lik x??rcl??r
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div className="block-title flex-center">
                                                    <div className="check-block">
                                                        <label className="check-button">
                                                            <input type="checkbox"
                                                                   checked={otherExpCheck}
                                                                   onChange={(e) => {
                                                                       setOtherExpCheck(e.target.checked);
                                                                   }}
                                                            />
                                                            <span className="checkmark"/>
                                                        </label>
                                                    </div>
                                                    ??lav?? g??nd??lik x??rcl??r
                                                </div>
                                            </Col>
                                            {
                                                otherExpCheck ?
                                                    <Col xs={12}>
                                                        <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">G??nd??lik m??bl????i daxil edin</span>
                                                            <Form.Label>
                                                                <Form.Control
                                                                    onChange={(e) => {
                                                                        setAmount(e.target.value)
                                                                    }}
                                                                    value={amount}
                                                                    placeholder="G??nd??lik m??bl????i daxil edin"
                                                                />
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    : null
                                            }
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="32" title="" disabled={tab !== "32"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??mrin ??sas??  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                            getVacation(id);
                                                            getVacationOperation(id)
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Geri ??a????r??ld?????? ezam. ??mri </span>
                                                    <Select
                                                        placeholder="Geri ??a????r??ld?????? ezam. ??mri"
                                                        value={selectedVacOp}
                                                        onChange={(val) => {
                                                            setSelectedVacOp(val)
                                                        }}
                                                        isSearchable={vacOperationOption ? vacOperationOption.length > 5 : false}
                                                        options={vacOperationOption}
                                                        getOptionLabel={(option) => (option.id)}
                                                        getOptionValue={(option) => (option.id)}
                                                        styles={customStyles}
                                                    />
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['businessTripDisable.operationId'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['businessTripDisable.operationId']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Ezamiyy??d??n geri ??a????r??lman??n s??b??bi  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Geri ??a????r??lma s??b??bi"
                                                                      value={callBackReason}
                                                                      onChange={(e) => setCallBackReason(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezamiyy??td??n geri ??a????r??ld?????? v?? i???? ba??lad?????? tarix:</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={joinDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    onChange={(date) => setJoinDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['businessTripDisable.callBackDate'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['businessTripDisable.callBackDate']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="33" title="" disabled={tab !== "33"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, ata ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin i??l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">????l??diyi v??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="????l??diyi v??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Maddi yard??m??n m??bl????i (vergil??r v?? dig??r ??d??ni????r daxil olmaqla) </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Maddi yard??m??n m??bl????i "
                                                                      value={amount || ''}
                                                                      type="number"
                                                                      onChange={(e) => setAmount(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['financialHelp.amount'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['financialHelp.amount']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="34" title="" disabled={tab !== "34"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??kafat??n m??bl????i Azn (vergil??r v?? dig??r ??d??ni??l??r daxil olmaqla)  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="M??kafat??n m??bl????i  m??bl????i "
                                                                      value={amount || ''}
                                                                      type="number"
                                                                      onChange={(e) => setAmount(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <div className="block-inn">
                                                    <div className="block-title ">
                                                        M??kafatland??r??lan i????i v?? ya i????il??r
                                                    </div>
                                                    <div className="addition-content">
                                                        {
                                                            employeeInfoArr.map((item, index) =>
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
                                                                                        employeeInfoArr.splice(index, 1);
                                                                                        setEmployeeInfoArr([...employeeInfoArr], employeeInfoArr)
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
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                                                <Form.Label>
                                                                                    <Select
                                                                                        placeholder="Ad?? se??in"
                                                                                        isSearchable={employee ? employee.length > 5 : false}
                                                                                        options={employee}
                                                                                        getOptionLabel={(option) => (option.name)}
                                                                                        getOptionValue={(option) => (option.name)}
                                                                                        styles={customStyles}
                                                                                        onChange={(val) => {
                                                                                            let id = val.id;
                                                                                            getWarningDetail(id, index);
                                                                                        }}
                                                                                    />
                                                                                </Form.Label>
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {

                                                                                        errors[`workVacation.vacations[${index}].vacationType`] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors[`workVacation.vacations[${index}].vacationType`]}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????l??diyi struktur b??lm?? </span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="????l??diyi struktur b??lm??"
                                                                                        value={item.department || ''}
                                                                                        disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="????l??diyi struktur b??lm??"
                                                                                        value={item.subDepartment || ''}
                                                                                        disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span
                                                                                    className="input-title">V??zif??si </span>
                                                                                <Form.Label>
                                                                                    <Form.Control placeholder="V??zif??si"
                                                                                                  value={item.position || ''}
                                                                                                  disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                </div>
                                                            )
                                                        }
                                                        <div className="flex-end">
                                                            <Button type="button" className="btn-main-text"
                                                                    onClick={() => addEmployeeInfoArr()}>
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
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="35" title="" disabled={tab !== "35"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">????l??diyi v??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="????l??diyi v??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">F??rdi ??lav??nin m??bl????i Azn:  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="300 AZN"
                                                                      value={amount}
                                                                      type="number"
                                                                      onChange={(e) => setAmount(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['academicAdditional.amount'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['academicAdditional.amount']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="36" title="" disabled={tab !== "36"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Se??kid?? i??tirak ed??c??yi m??dd??t (g??n)</span>
                                                    <Form.Control placeholder="??d??ni??li istirah??t m??dd??ti "
                                                                  value={vacationDay}
                                                                  type="number"
                                                                  onChange={(e) => {
                                                                      setVacationDay(e.target.value);
                                                                      let day = e.target.value;
                                                                      getCalculatedDate(day, startDate)
                                                                  }}
                                                    />
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['selection.day'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['selection.day']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Se??kid?? i??tirak??n ba??lama tarixi</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => {
                                                                        setStartDate(date);
                                                                        let setDate = date !== null ? date : 0;
                                                                        getCalculatedDate(vacationDay, setDate)
                                                                    }}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['selection.from'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['selection.from']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Se??kid?? i??tirak??n bitdiyi tarixi</span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={getEndDate || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['selection.to'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['selection.to']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    {/*<Tab eventKey="37" title="" disabled={tab !== "37"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5: false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">M??v??qq??ti azad olunma m??dd??ti</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="M??v??qq??ti azad olunma m??dd??ti"
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>*/}

                                    <Tab eventKey="38" title="" disabled={tab !== "38"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">T??lim-m????q toplant??s??n??n ba??lad?????? tarix </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={startDate}
                                                                    endDate={endDate}
                                                                    onChange={(date) => {
                                                                        setStartDate(date);
                                                                        let setDate = date !== null ? date : 0;
                                                                        getCalculatedDate(vacationDay, setDate)
                                                                    }}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['meeting.from'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['meeting.from']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">T??lim-m????q toplant??s??n??n bitdiyi tarix </span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={vacationEndDate || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['meeting.to'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['meeting.to']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">T??lim-m????q toplant??s??nda i??tirak ed??c??yi g??nl??r  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="????tirak ed??c??yi g??nl??r "
                                                                      value={vacationDay}
                                                                      type="number"
                                                                      onChange={(e) => {
                                                                          setVacationDay(e.target.value);
                                                                          let day = e.target.value;
                                                                          getCalculatedDate(day, startDate)
                                                                      }}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['meeting.day'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['meeting.day']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">?????? ba??lama tarixi </span>
                                                    <Form.Label className="relative m-0">
                                                        <Form.Control placeholder="YYYY-MM-DD"
                                                                      type="text"
                                                                      disabled={true}
                                                                      value={jobDay || ''}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['meeting.startJob'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['meeting.startJob']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    {/*   <Tab eventKey="39" title="" disabled={tab !== "39"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5: false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??stirah??tin ba??lad?????? tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={startDate}
                                                                    endDate={endDate}
                                                                    onChange={(date) => setStartDate(date)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??stirah??tin bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
                                                            onChange={(date) => setEndDate(date)}
                                                            selectsEnd
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={startDate}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??stirah??tin m??dd??ti </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??stirah??tin m??dd??ti "
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??????inin i???? ba??lama tarixi</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={joinDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setJoinDate(date)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="40" title="" disabled={tab !== "40"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5: false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??????inin V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??d??nilm??nin ba??lad?????? tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={startDate}
                                                                    endDate={endDate}
                                                                    onChange={(date) => setStartDate(date)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??d??nilm??nin bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
                                                            onChange={(date) => setEndDate(date)}
                                                            selectsEnd
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={startDate}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??d??ncin m??bl????i </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??stirah??tin m??dd??ti "
                                                                      value={amount}
                                                                      type="number"
                                                                      onChange={(e) => setAmount(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>*/}

                                    <Tab eventKey="41" title="" disabled={tab !== "41"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin i??d??n k??narla??d??r??lmas?? s??b??bi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">K??narla??d??rma m??dd??tinin ba??lad?????? tarix </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={startDate}
                                                                    endDate={endDate}
                                                                    onChange={(date) => setStartDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['remove.from'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['remove.from']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">K??narla??d??rma m??dd??tinin bitdiyi tarix </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            selected={endDate}
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            onChange={(date) => setEndDate(date)}
                                                            selectsEnd
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={startDate}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    {/*
                                    <Tab eventKey="42" title="" disabled={tab !== "42"}>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??mrin ??sas??</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <Form.Label>
                                                        <Form.Control
                                                            className="resize"
                                                            placeholder={`??????il??rin ??m??k haqq?? saxlan??lmaqla ${year}-ci il tarixi ???Bak?? Beyn??lxalq D??niz Ticar??t Liman????? QSC- d?? qeyri i?? g??n?? hesab edilsin.`}
                                                            as="textarea" disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
*/}


                                    <Tab eventKey="43" title="" disabled={tab !== "43"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin i??l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin i??l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin v??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin faktiki i???? ba??lad?????? saat</span>
                                                    <Form.Label className="relative m-0">
                                                        <TimePicker
                                                            onChange={(val) => {
                                                                setStartTime(val);
                                                            }}
                                                            value={startTime}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['reduceWorkHours.currentFrom'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['reduceWorkHours.currentFrom']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin faktiki i??inin bitdiyi saat</span>
                                                    <Form.Label className="relative m-0">
                                                        <TimePicker
                                                            onChange={(val) => {
                                                                setEndTime(val);
                                                            }}
                                                            value={endTime}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['reduceWorkHours.currentTo'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['reduceWorkHours.currentTo']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin yeni i???? ba??lad?????? saat</span>
                                                    <Form.Label className="relative m-0">
                                                        <TimePicker
                                                            onChange={(val) => {
                                                                setNewStartTime(val)
                                                            }}
                                                            value={newStartTime}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['reduceWorkHours.newFrom'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['reduceWorkHours.newFrom']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin yeni i??inin bitdiyi saat</span>
                                                    <Form.Label className="relative m-0">
                                                        <TimePicker
                                                            onChange={(val) => {
                                                                setNewEndTime(val)
                                                            }}
                                                            value={newEndTime}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['reduceWorkHours.newTo'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['reduceWorkHours.newTo']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>


                                    <Tab eventKey="44" title="" disabled={tab !== "44"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??mrin ??sas?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Bayram g??n??nl??ri </span>
                                                    <MultiDatePicker
                                                        placeholder="Bayram g??n?? se??in"
                                                        value={multiDate}
                                                        onChange={setMultiDate}
                                                        multiple
                                                        plugins={[
                                                            <DatePanel/>
                                                        ]}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <div className="block-inn">
                                                    <div className="block-title ">
                                                        ??stirah??t v?? ya bayram g??n??nd?? i???? c??lb edil??n i????i v?? ya
                                                        i????il??r
                                                    </div>
                                                    <div className="addition-content">
                                                        {
                                                            employeeInfoArr.map((item, index) =>
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
                                                                                        employeeInfoArr.splice(index, 1);
                                                                                        setEmployeeInfoArr([...employeeInfoArr], employeeInfoArr)
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
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                                                <Form.Label>
                                                                                    <Select
                                                                                        placeholder="Ad?? se??in"
                                                                                        isSearchable={employee ? employee.length > 5 : false}
                                                                                        options={employee}
                                                                                        getOptionLabel={(option) => (option.name)}
                                                                                        getOptionValue={(option) => (option.name)}
                                                                                        styles={customStyles}
                                                                                        onChange={(val) => {
                                                                                            let id = val.id;
                                                                                            getWarningDetail(id, index);
                                                                                        }}
                                                                                    />
                                                                                </Form.Label>
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {

                                                                                        errors[`workVacation.vacations[${index}].vacationType`] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors[`workVacation.vacations[${index}].vacationType`]}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????l??diyi struktur b??lm?? </span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="????l??diyi struktur b??lm??"
                                                                                        value={item.department || ''}
                                                                                        disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="????l??diyi struktur b??lm??"
                                                                                        value={item.subDepartment || ''}
                                                                                        disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span
                                                                                    className="input-title">V??zif??si </span>
                                                                                <Form.Label>
                                                                                    <Form.Control placeholder="V??zif??si"
                                                                                                  value={item.position || ''}
                                                                                                  disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                </div>
                                                            )
                                                        }
                                                        <div className="flex-end">
                                                            <Button type="button" className="btn-main-text"
                                                                    onClick={() => addEmployeeInfoArr()}>
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
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="45" title="" disabled={tab !== "45"}>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????iy?? x??b??rdarl??q edilm??sinin s??b??bi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <div className="block-inn">
                                                    <div className="block-title ">
                                                        X??b??rdarl??q edil??n i????i v?? ya i????il??r
                                                    </div>
                                                    <div className="addition-content">
                                                        {
                                                            employeeInfoArr.map((item, index) =>
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
                                                                                        employeeInfoArr.splice(index, 1);
                                                                                        setEmployeeInfoArr([...employeeInfoArr], employeeInfoArr)
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
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                                                <Form.Label>
                                                                                    <Select
                                                                                        placeholder="Ad?? se??in"
                                                                                        isSearchable={employee ? employee.length > 5 : false}
                                                                                        options={employee}
                                                                                        getOptionLabel={(option) => (option.name)}
                                                                                        getOptionValue={(option) => (option.name)}
                                                                                        styles={customStyles}
                                                                                        onChange={(val) => {
                                                                                            let id = val.id;
                                                                                            getWarningDetail(id, index);
                                                                                        }}
                                                                                    />
                                                                                </Form.Label>
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {

                                                                                        errors[`workVacation.vacations[${index}].vacationType`] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors[`workVacation.vacations[${index}].vacationType`]}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????l??diyi struktur b??lm?? </span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="????l??diyi struktur b??lm??"
                                                                                        value={item.department || ''}
                                                                                        disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="????l??diyi struktur b??lm??"
                                                                                        value={item.subDepartment || ''}
                                                                                        disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span
                                                                                    className="input-title">V??zif??si </span>
                                                                                <Form.Label>
                                                                                    <Form.Control placeholder="V??zif??si"
                                                                                                  value={item.position || ''}
                                                                                                  disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                </div>
                                                            )
                                                        }
                                                        <div className="flex-end">
                                                            <Button type="button" className="btn-main-text"
                                                                    onClick={() => addEmployeeInfoArr()}>
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
                                            </Col>
                                        </Row>
                                    </Tab>


                                    {/*
                                    <Tab eventKey="46" title="" disabled={tab !== "46"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??m??k haqq??ndan tutulma s??b??bi </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="??m??k haqq??ndan tutulma s??b??bi daxil edin"
                                                            value={mainOfOrder}
                                                            onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5: false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Tutulma m??bl????i  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Tutulma m??bl????i"
                                                                      value={catchAmount}
                                                                      type="number"
                                                                      onChange={(e) => setCatchAmount(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Tutulaca???? aylar </span>
                                                    <Select
                                                        placeholder="Tutulaca???? aylar?? se??in"
                                                        isMulti
                                                        value={selectedMonth}
                                                        onChange={(arr) => {
                                                            let ids = [];
                                                            for (let i of arr) {
                                                                ids.push(i.value)
                                                            }
                                                            setMonthArr(ids)
                                                            setSelectedMonth(arr);
                                                        }}
                                                        isSearchable={monthOptions ? monthOptions.length > 5: false}
                                                        options={monthOptions}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
*/}

                                    <Tab eventKey="47" title="" disabled={tab !== "47"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??????iy?? intizam t??nbehinin verilm??sinin s??b??bi</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">T??qdimat sahibinin soyad??, ad??, atas??n??n ad??</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            getEmployeeDetail(id);
                                                            setShowVacation(true);
                                                            setSelectedStaff(val);
                                                            getVacation(id);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??ntizam t??nbehinin n??v?? *</span>
                                                    <Select
                                                        placeholder="??ntizam t??nbehinin n??v??n?? se??in"
                                                        value={selectedDiscipline}
                                                        onChange={setSelectedDiscipline}
                                                        isSearchable={disciplineOptions ? disciplineOptions.length > 5 : false}
                                                        options={disciplineOptions}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <div className="block-inn">
                                                    <div className="block-title ">
                                                        ??ntizama c??lb edil??n i????il??r
                                                    </div>
                                                    <div className="addition-content">
                                                        {
                                                            employeeInfoArr.map((item, index) =>
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
                                                                                        employeeInfoArr.splice(index, 1);
                                                                                        setEmployeeInfoArr([...employeeInfoArr], employeeInfoArr)
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
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                                                <Form.Label>
                                                                                    <Select
                                                                                        placeholder="Ad?? se??in"
                                                                                        isSearchable={employee ? employee.length > 5 : false}
                                                                                        options={employee}
                                                                                        getOptionLabel={(option) => (option.name)}
                                                                                        getOptionValue={(option) => (option.name)}
                                                                                        styles={customStyles}
                                                                                        onChange={(val) => {
                                                                                            let id = val.id;
                                                                                            getWarningDetail(id, index);
                                                                                        }}
                                                                                    />
                                                                                </Form.Label>
                                                                                {/*  <div
                                                                                        className="validation-block flex-start">
                                                                                        {

                                                                                            errors[`workVacation.vacations[${index}].vacationType`] !== '' ?
                                                                                                <span
                                                                                                    className="text-validation">{errors[`workVacation.vacations[${index}].vacationType`]}</span>
                                                                                                : null
                                                                                        }
                                                                                    </div>*/}
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????l??diyi struktur b??lm?? </span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="????l??diyi struktur b??lm??"
                                                                                        value={item.department || ''}
                                                                                        disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="????l??diyi struktur b??lm??"
                                                                                        value={item.subDepartment || ''}
                                                                                        disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span
                                                                                    className="input-title">V??zif??si </span>
                                                                                <Form.Label>
                                                                                    <Form.Control placeholder="V??zif??si"
                                                                                                  value={item.position || ''}
                                                                                                  disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                </div>
                                                            )
                                                        }
                                                        <div className="flex-end">
                                                            <Button type="button" className="btn-main-text"
                                                                    onClick={() => addEmployeeInfoArr()}>
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
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="48" title="" disabled={tab !== "48"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">??sasland??rma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder || ''}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??????inin soyad??, ad??, atas??n??n ad??</span>
                                                    <Select
                                                        placeholder="??????inin ad??, soyad??, atas??n??n ad??"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id);
                                                            setShowVacation(true)
                                                            getEmployeeDetail(id)
                                                            setSelectedStaff(val);
                                                            getVacation(id);
                                                            getVacationOperation(id)
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        getOptionValue={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            {
                                                showVacation ?
                                                    <Col xs={6}>
                                                        <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Geri ??a????r??ld?????? m??z. ??mri</span>
                                                            <Select
                                                                placeholder="Geri ??a????r??ld?????? m??z. ??mri"
                                                                value={selectedVacOp}
                                                                onChange={(val) => {
                                                                    setSelectedVacOp(val)
                                                                }}
                                                                isSearchable={vacOperationOption ? vacOperationOption.length > 5 : false}
                                                                options={vacOperationOption}
                                                                getOptionLabel={(option) => (option.id)}
                                                                getOptionValue={(option) => (option.id)}
                                                                styles={customStyles}
                                                            />
                                                            <div className="validation-block flex-start">
                                                                {

                                                                    errors['vacationDisable.operationId'] !== '' ?
                                                                        <span
                                                                            className="text-validation">{errors['vacationDisable.operationId']}</span>
                                                                        : null
                                                                }
                                                            </div>
                                                        </Form.Group>
                                                    </Col>
                                                    : null
                                            }
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="????l??diyi struktur b??lm??"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">V??zif??si </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="V??zif??si"
                                                                      value={position || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Geri ??a????r??lma tarixi</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={joinDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    onChange={(date) => setJoinDate(date)}/>
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['vacationDisable.callBackDate'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['vacationDisable.callBackDate']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Geri ??a????r??lma s??b??bi</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Geri ??a????r??lma s??b??bi"
                                                                      value={callBackReason}
                                                                      onChange={(e) => setCallBackReason(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                    <div className="validation-block flex-start">
                                                        {

                                                            errors['vacationDisable.callBackReason'] !== '' ?
                                                                <span
                                                                    className="text-validation">{errors['vacationDisable.callBackReason']}</span>
                                                                : null
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="50" title="" disabled={tab !== "50"}>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">??mrin ??sas?? </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="??mrin ??sas?? daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <div className="block-inn relative">
                                                    <div className="block-title ">
                                                        ???? vaxt??ndan art??q i???? c??lb edil??n i????i v?? ya i????il??r
                                                    </div>
                                                    <div className="addition-content">
                                                        {
                                                            overtimeEmpArr.map((item, index) =>
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
                                                                                        overtimeEmpArr.splice(index, 1);
                                                                                        setOvertimeEmpArr([...overtimeEmpArr], overtimeEmpArr)
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
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">??????inin soyad??, ad??, atas??n??n ad?? *</span>
                                                                                <Form.Label>
                                                                                    <Select
                                                                                        placeholder="Ad?? se??in"
                                                                                        isSearchable={employee ? employee.length > 5 : false}
                                                                                        options={employee}
                                                                                        getOptionLabel={(option) => (option.name)}
                                                                                        getOptionValue={(option) => (option.name)}
                                                                                        styles={customStyles}
                                                                                        onChange={(val) => {
                                                                                            let id = val.id;
                                                                                            getWarningDetail(id, index);
                                                                                        }}
                                                                                    />
                                                                                </Form.Label>
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {

                                                                                        errors[`overtime[${index}].employeeId`] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors[`overtime[${index}].employeeId`]}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????l??diyi struktur b??lm?? </span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="????l??diyi struktur b??lm??"
                                                                                        value={item.department || ''}
                                                                                        disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="????l??diyi struktur b??lm??"
                                                                                        value={item.subDepartment || ''}
                                                                                        disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????l??diyi alt struktur b??lm?? </span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="????l??diyi struktur b??lm??"
                                                                                        value={item.obeyDepartment || ''}
                                                                                        disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span
                                                                                    className="input-title">V??zif??si </span>
                                                                                <Form.Label>
                                                                                    <Form.Control placeholder="V??zif??si"
                                                                                                  value={item.position || ''}
                                                                                                  disabled={true}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title"> ??????inin i???? ba??lad??????</span>
                                                                                <Form.Label className="relative m-0">
                                                                                    <DatePicker
                                                                                        value={item.date}
                                                                                        dateFormat="dd-MM-yyyy"
                                                                                        placeholderText="YYYY-MM-DD"
                                                                                        showMonthDropdown
                                                                                        showYearDropdown
                                                                                        dropdownMode="select"
                                                                                        onChange={(date) => {
                                                                                            overtimeEmpArr[index].date = moment(date).format("YYYY-MM-DD");
                                                                                            setOvertimeEmpArr([...overtimeEmpArr], overtimeEmpArr)
                                                                                        }}/>
                                                                                </Form.Label>
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {

                                                                                        errors[`overtime[${index}].date`] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors[`overtime[${index}].date`]}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">??????inin i???? ba??lad?????? saat</span>
                                                                                <Form.Label className="relative m-0">
                                                                                    <TimePicker
                                                                                        onChange={(val) => {
                                                                                            overtimeEmpArr[index].startTime = val;
                                                                                            setOvertimeEmpArr([...overtimeEmpArr], overtimeEmpArr)
                                                                                        }}
                                                                                        disableClock={true}
                                                                                        clearIcon={false}
                                                                                        value={item.startTime}
                                                                                    />
                                                                                </Form.Label>
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {

                                                                                        errors[`overtime[${index}].startTime`] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors[`overtime[${index}].startTime`]}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">??????inin i??inin bitdiyi saat</span>
                                                                                <Form.Label className="relative m-0">
                                                                                    <TimePicker
                                                                                        onChange={(val) => {
                                                                                            overtimeEmpArr[index].endTime = val;
                                                                                            setOvertimeEmpArr([...overtimeEmpArr], overtimeEmpArr)
                                                                                        }}
                                                                                        disableClock={true}
                                                                                        clearIcon={false}
                                                                                        value={item.endTime}
                                                                                    />
                                                                                </Form.Label>
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {

                                                                                        errors[`overtime[${index}].endTime`] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors[`overtime[${index}].endTime`]}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                </div>
                                                            )
                                                        }
                                                        <div className="flex-end">
                                                            <Button type="button" className="btn-main-text"
                                                                    onClick={() => addOvertimeEmpArr()}>
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
                                            </Col>
                                        </Row>
                                    </Tab>

                                </Tabs>
                            </div>
                            {
                                save ?
                                    <div className="flex-vertical-center btn-block">
                                        <Button className="btn-effect w-200" onClick={() => senData()}>
                                            Yadda saxla
                                        </Button>
                                    </div>

                                    : ""
                            }
                        </Form>
                    </div>
                </Container>
            </div>
            {
                loadingIndicator ? <Indicator/> : null
            }
        </Aux>

    );
}

export default CreateOperation
