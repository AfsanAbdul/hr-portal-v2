import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {
    Button,
    Container,
    Row,
    Col,
    Form,
    Tabs,
    Tab,
    InputGroup,
    Image,
    Table,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import {Link, useParams, useLocation} from 'react-router-dom';
import Select from 'react-select';
import {mainAxios} from "../../../components/Axios/axios";
import DatePicker from "react-datepicker";
import userImage from '../../../assets/img/user.png'
import moment from 'moment'
import {
    familyConditionOptions,
    serialNumberOptions,
    educationTypeOptions,
    driverLicenceOptions,
    genderOptions,
    bloodTypeOptions,
    militaryOptions,
    relationTypeOptions,
    eduDegreeOptions,
    quota,
    businessOptions,
    statuses
} from '../../../components/Select/SelectOptions';
import "react-datepicker/dist/react-datepicker.css";
import {uid} from "react-uid";
import Loading from "../../../components/Loading/Loading";
import Paginate from "../../../components/Pagination/Pagination";
import {customStyles, customGroupStyles} from "../../../components/Select/SelectStyle";
import Swal from "sweetalert2";
import EmptyData from "../../../components/EmptyData/EmptyData";

function EditEmployee() {
    let params = useParams();
    let location = useLocation()
    let id = params.id;
    let activeKey = location.state ? location.state.key : undefined;
    const [emptyData, setEmptyData] = useState(false);

    const [key, setKey] = useState(activeKey !== '' ? activeKey : 'general');
    const [tab, setTab] = useState('internal');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');

    /*check&visibility*/
    const [showPassport, setShowPassport] = useState(false);

    /*--------general------*/

    /*date*/
    const [startIdDate, setStartIdDate] = useState(null);
    const [expiredIdDate, setExpiredIdDate] = useState(null);
    const [startBirthDate, setStartBirthDate] = useState(null);
    const [startPassportDate, setStartPassportDate] = useState(null);
    const [expiredPassportDate, setExpiredPassportDate] = useState(null);
    const [startWorkPermissionDate, setStartWorkPermissionDate] = useState(null);
    const [expiredWorkPermissionDate, setExpiredWorkPermissionDate] = useState(null);
    /*select*/
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedBloodType, setSelectedBloodType] = useState(null);
    const [selectedCitizenControl, setSelectedCitizenControl] = useState(null);
    const [selectedSerial, setSelectedSerial] = useState(null);
    const [selectedMilitary, setSelectedMilitary] = useState(null);
    /*input*/
    const [idCardNumber, setIdCardNumber] = useState('');
    const [idCardPin, setIdCardPin] = useState('');
    const [fullName, setFullName] = useState('');
    const [countryBirth, setCountryBirth] = useState('');
    const [idCardOrganization, setIdCardOrganization] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [photo, setPhoto] = useState(userImage);
    const [uploadFile, setUploadFile] = useState('');
    const [workPermissionSerial, setWorkPermissionSerial] = useState('');
    const [workPermissionNumber, setWorkPermissionNumber] = useState('');
    const [workPermissionPeriod, setWorkPermissionPeriod] = useState('');
    /*array*/
    const [citizen, setCitizen] = useState([]);
    /*check*/
    const [showPermission, setShowPermission] = useState(false);
    const [showMilitary, setShowMilitary] = useState(false);


    /*-------------Contact---------*/

    /*input*/
    const [settlement, setSettlement] = useState('');
    const [street, setStreet] = useState('');
    const [block, setBlock] = useState('');
    const [apartment, setApartment] = useState('');
    const [home, setHome] = useState('');
    const [registerSettlement, setRegisterSettlement] = useState('');
    const [registerStreet, setRegisterStreet] = useState('');
    const [registerBlock, setRegisterBlock] = useState('');
    const [registerApartment, setRegisterApartment] = useState('');
    const [registerHome, setRegisterHome] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [mobileNumber1, setMobileNumber1] = useState('');
    const [mobileNumber2, setMobileNumber2] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    const [businessInternalPhone, setBusinessInternalPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailBusiness, setEmailBusiness] = useState('');
    /*select*/
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);

    const [selectedRegCity, setSelectedRegCity] = useState(null);
    const [selectedRegCountry, setSelectedRegCountry] = useState(null);
    const [selectedRegRegion, setSelectedRegRegion] = useState(null);

    /*array*/
    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [countries, setCountries] = useState([]);
    /*check*/
    const [checkAddress, setCheckAddress] = useState(false)

    /*-------------------Education-------------------------*/

    /*date*/
    const [startAcademicDegreeDate, setStartAcademicDegreeDate] = useState(null);
    const [expiredDriverLicenceDate, setExpiredDriverLicenceDate] = useState(null);
    /*input*/
    const [academicDegreeNumber, setAcademicDegreeNumber] = useState('');
    const [academicDegreeOrganization, setAcademicDegreeOrganization] = useState('');
    const [warrantyNumber, setWarrantyNumber] = useState('');
    /*select*/
    const [selectedDriverLicence, setSelectedDriverLicence] = useState(null);
    /*array*/
    const [certificate, setCertificate] = useState([]);
    const [certificateArr, setCertificateArr] = useState([{
        certificateId: null,
        endDate: null
    }]);
    const [educationArr, setEducationArr] = useState([{
        abroadStudyNo: null,
        degree: null,
        diploma: {
            "givenDate": null,
            "number": null
        },
        direction: null,
        educationType: null,
        entranceDate: null,
        faculty: null,
        graduateDate: null,
        institutionId: null,
        speciality: null,
        foreignOption: false
    }]);
    const [university, setUniversity] = useState([]);
    /*check*/
    const [showDegree, setShowDegree] = useState(false);
    const [checkEducation, setCheckEducation] = useState(false);
    const [showDriverLicence, setShowDriverLicence] = useState(false);


    /*--------------Company------------*/
    const [companyIntArr, setCompanyIntArr] = useState([{
        company: null,
        department: null,
        dismissalReason: null,
        endDate: null,
        mainJob: true,
        position: null,
        startDate: null,
        subDepartment: null,
        businessStatus: null
    }]);

    const [companyExtArr, setCompanyExtArr] = useState([{
        company: null,
        department: null,
        dismissalReason: null,
        endDate: null,
        mainJob: true,
        position: null,
        startDate: null,
        subDepartment: null,
        businessStatus: null
    }])


    /*------------------Other-------------------------*/

    /*select*/
    const [selectedFamilyCondition, setSelectedFamilyCondition] = useState(null);
    const [selectedQuota, setSelectedQuota] = useState(null);
    /*check*/
    const [checkPrisoner, setCheckPrisoner] = useState(true);
    const [checkColleague, setCheckColleague] = useState(true);
    /*array*/
    const [familyMemberArr, setFamilyMemberArr] = useState([{
        address: null,
        birthDate: null,
        birthplace: null,
        fullName: null,
        position: null,
        relationType: null,
        workPlace: null
    }]);
    const [reward, setReward] = useState([]);
    const [rewardOrganization, setRewardOrganization] = useState([]);
    const [rewardArr, setRewardArr] = useState([{
        givenDate: null,
        honoraryDecreeId: null,
        organizationId: null
    }]);
    const [quotaArr, setQuotaArr] = useState([]);

    /*----------Bank----------*/
    const [bankAccount, setBankAccount] = useState('')

    /*-------------Operation-------------*/
    const [operation, setOperation] = useState([])
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(20);


    /*Vacation*/

    const [vacation, setVacation] = useState([]);


    /*Salary*/

    const [salaryArr, setSalaryArr] = useState([]);


    const uploadImage = (event) => {
        if (event.target.files.length !== 0) {
            setPhoto('');
            setPhoto(URL.createObjectURL(event.target.files[0]));
            setUploadFile(event.target.files[0])
        }
    }

    const removeImage = () => {
        setPhoto(userImage)
    }

    const getCity = () => {
        mainAxios({
            method: 'get',
            url: 'cities',
        }).then((res) => {
            setCities(res.data)
        });
    }

    const getCountry = () => {
        mainAxios({
            method: 'get',
            url: 'countries',
        }).then((res) => {
            setCountries(res.data)
        });
    }

    const getRegion = () => {
        mainAxios({
            method: 'get',
            url: 'districts',
        }).then((res) => {
            setRegions(res.data)
        });
    }

    const getUniversity = () => {
        mainAxios({
            method: 'get',
            url: 'education-institutions',
        }).then((res) => {
            setUniversity(res.data)
        });
    }

    const getReward = () => {
        mainAxios({
            method: 'get',
            url: 'honorary-decrees',
        }).then((res) => {
            setReward(res.data)
        });
    }

    const getCertificate = () => {
        mainAxios({
            method: 'get',
            url: 'certificates',
        }).then((res) => {
            setCertificate(res.data)
        });
    }

    const getCitizenControl = () => {
        mainAxios({
            method: 'get',
            url: 'motherland',
        }).then((res) => {
            setCitizen(res.data)
        });
    }

    const getRewardOrganization = () => {
        mainAxios({
            method: 'get',
            url: 'organizations',
        }).then((res) => {
            setRewardOrganization(res.data)
        });
    }

    const addFamilyMember = () => {
        setFamilyMemberArr(familyMemberArr => [...familyMemberArr, {
            address: null,
            birthDate: null,
            birthplace: null,
            fullName: null,
            position: null,
            relationType: null,
            workPlace: null
        }]);
    }

    const addCertificate = () => {
        setCertificateArr(certificateArr => [...certificateArr, {
            certificateId: null,
            endDate: null
        }])
    }

    const addEducation = () => {
        setEducationArr(educationArr => [...educationArr, {
            abroadStudyNo: '',
            degree: null,
            diploma: {
                "givenDate": null,
                "number": null
            },
            direction: null,
            educationType: null,
            entranceDate: null,
            faculty: null,
            graduateDate: null,
            institutionId: null,
            speciality: null,
            foreignOption: false
        }])
    }

    const addCompanyInt = () => {
        setCompanyIntArr(companyIntArr => [...companyIntArr, {
            company: null,
            department: null,
            dismissalReason: null,
            endDate: null,
            mainJob: true,
            position: null,
            startDate: null,
            subDepartment: null,
            businessStatus: null
        }])
    }

    const addCompanyExt = () => {
        setCompanyExtArr(companyExtArr => [...companyExtArr, {
            company: null,
            department: null,
            dismissalReason: null,
            endDate: null,
            mainJob: true,
            position: null,
            startDate: null,
            subDepartment: null,
            businessStatus: null
        }])
    }

    const addReward = () => {
        setRewardArr(rewardArr => [...rewardArr, {
            givenDate: null,
            honoraryDecreeId: null,
            organizationId: null,
        }])
    }

    const getEmployeeInfo = () => {
        mainAxios({
            method: 'get',
            url: `employees/${id}`,
        }).then((res) => {

            let accountData = res.data.account;
            if (accountData !== null) {
                setBankAccount(accountData.number)
            }

            let personalData = res.data.personalInformation;
            if (personalData !== null) {
                for (let i of genderOptions) {
                    if (personalData.gender === i.label)
                        setSelectedGender(i);
                }
                for (let i of bloodTypeOptions) {
                    if (personalData.bloodGroup === i.label)
                        setSelectedBloodType(i);
                }
                for (let i of familyConditionOptions) {
                    if (personalData.familyStatus === i.label)
                        setSelectedFamilyCondition(i);
                }
                for (let i of militaryOptions) {
                    if (personalData.militaryStatus === i.label)
                        setSelectedMilitary(i);
                }

                setFullName(personalData.fullName);
                personalData.birthday !== null ? setStartBirthDate(new Date(personalData.birthday)) : setStartBirthDate(null);
                setCountryBirth(personalData.birthplace);
                personalData.idCard.startDate !== null ? setStartIdDate(new Date(personalData.idCard.startDate)) : setStartIdDate(null);
                personalData.idCard.endDate !== null ? setExpiredIdDate(new Date(personalData.idCard.endDate)) : setExpiredIdDate(null);
                setIdCardOrganization(personalData.idCard.organization);
                setIdCardPin(personalData.idCard.pin);

                let idSeries = ''
                if (personalData.idCard.seriesNumber.includes('AA')) {
                    setIdCardNumber(personalData.idCard.seriesNumber.substring(2))
                    idSeries = personalData.idCard.seriesNumber.slice(0, 2)
                } else {
                    setIdCardNumber(personalData.idCard.seriesNumber.substring(3))
                    idSeries = personalData.idCard.seriesNumber.slice(0, 3)
                }

                for (let i of serialNumberOptions) {
                    if (idSeries === i.label) {
                        setSelectedSerial(i)
                    }
                }
                personalData.gender !== 'Ki??i' ? setShowMilitary(false) : setShowMilitary(true);
                setSelectedCitizenControl(personalData.motherLand);
                let motherLandName = personalData.motherLand !== null ? personalData.motherLand.name : null;
                (motherLandName !== 'Az??rbaycan' && motherLandName !== null) ? setShowPermission(true) : setShowPermission(false);
                personalData.photo !== null ?
                    setPhoto(`https://hr-portal-api-v2.herokuapp.com/employees/image/${personalData.photo}?token=${token}`) : setPhoto(userImage)

                if (personalData.foreignPassport !== null) {
                    setPassportNumber(personalData.foreignPassport.seriesNumber);
                    personalData.foreignPassport.startDate !== null ? setStartPassportDate(new Date(personalData.foreignPassport.startDate)) : setStartPassportDate(null);
                    personalData.foreignPassport.endDate !== null ? setExpiredPassportDate(new Date(personalData.foreignPassport.endDate)) : setExpiredPassportDate(null);
                    setShowPassport(true)
                }
            }

            setSalaryArr(res.data.salaryInformationList)


            let permissionData = res.data.permission
            if (permissionData !== null) {
                setWorkPermissionSerial(permissionData.series);
                setWorkPermissionNumber(permissionData.number);
                setWorkPermissionPeriod(permissionData.duration);
                permissionData.startDate !== null ? setStartWorkPermissionDate(new Date(permissionData.startDate)) : setStartWorkPermissionDate(null);
                permissionData.endDate !== null ? setExpiredWorkPermissionDate(new Date(permissionData.endDate)) : setExpiredWorkPermissionDate(null);
            }

            let contactData = res.data.contactInformation
            if (contactData !== null) {
                setEmailBusiness(contactData.businessEmail);
                setEmail(contactData.email);
                setPhoneNumber(contactData.homePhone);
                setMobileNumber1(parseFloat(contactData.mainMobile));
                setMobileNumber2(contactData.secondaryMobile);
                setBusinessPhone(contactData.businessPhone);
                setBusinessInternalPhone(contactData.internalPhone);
                setCheckAddress(contactData.sameAddress)
                /*livingAddress*/
                if (contactData.livingAddress !== null) {
                    setSelectedCountry(contactData.livingAddress.country)
                    setSelectedCity(contactData.livingAddress.city);
                    setSelectedRegion(contactData.livingAddress.district);
                    setSettlement(contactData.livingAddress.village);
                    setStreet(contactData.livingAddress.street);
                    setBlock(contactData.livingAddress.block);
                    setApartment(contactData.livingAddress.apartment);
                    setHome(contactData.livingAddress.home);
                }
                /*registeredAddress*/
                if (contactData.registeredAddress !== null) {
                    setSelectedRegCountry(contactData.registeredAddress.country);
                    setSelectedRegCity(contactData.registeredAddress.city);
                    setSelectedRegRegion(contactData.registeredAddress.district);
                    setRegisterSettlement(contactData.registeredAddress.village);
                    setRegisterStreet(contactData.registeredAddress.street);
                    setRegisterBlock(contactData.registeredAddress.block);
                    setRegisterApartment(contactData.registeredAddress.apartment);
                    setRegisterHome(contactData.registeredAddress.home);
                }
            }

            let educationData = res.data.educationInformation

            let tmpCertificate = [];
            for (let i of educationData.certificates) {
                let obj = {};
                obj.certificateId = i.certificate;
                obj.endDate = i.endDate;
                tmpCertificate.push(obj)
            }
            if (tmpCertificate.length > 0)
                setCertificateArr(tmpCertificate);

            if (educationData.driverLicence !== null) {
                for (let i of driverLicenceOptions) {
                    if (educationData.driverLicence.category === i.label) {
                        setSelectedDriverLicence(i)
                    }
                }
                educationData.driverLicence.endDate !== null ? setExpiredDriverLicenceDate(new Date(educationData.driverLicence.endDate)) : setExpiredDriverLicenceDate(null);
                setShowDriverLicence(true)
            }
            if (educationData.academicDegree !== null) {
                educationData.academicDegree.givenDate !== null ? setStartAcademicDegreeDate(new Date(educationData.academicDegree.givenDate)) : setStartAcademicDegreeDate(null);
                setAcademicDegreeNumber(educationData.academicDegree.number);
                setAcademicDegreeOrganization(educationData.academicDegree.organization);
                setShowDegree(true)
            }
            setCheckEducation(educationData.higherEducation);

            let tmpEducation = []
            for (let i of educationData.universities) {
                let obj = {
                    degree: null,
                    educationType: null
                };
                for (let j of eduDegreeOptions) {
                    if (i.degree === j.label) {
                        obj.degree = j;
                        break;
                    }
                }

                for (let k of educationTypeOptions) {
                    if (i.educationType === k.label) {
                        obj.educationType = k;
                        break;
                    }
                }
                obj.abroadStudyNo = i.abroadStudyNo;
                obj.institutionId = i.institution;
                obj.direction = i.direction;
                obj.graduateDate = i.graduateDate;
                obj.entranceDate = i.entranceDate;
                obj.faculty = i.faculty;
                obj.speciality = i.speciality;
                obj.diploma = i.diploma !== null ? i.diploma : null;
                obj.foreignOption = i.abroadStudyNo !== null ? 1 : 0
                tmpEducation.push(obj)
            }
            console.log(tmpEducation)
            if (tmpEducation.length > 0)
                setEducationArr(tmpEducation)

            let businessData = res.data.businessInformationSet
            let tmpBusinessIntArr = [];
            for (let i of businessData) {
                if (i.businessStatus == 'Daxili') {
                    let obj = {
                        businessStatus: null
                    };
                    obj.company = i.company;
                    obj.department = i.department;
                    obj.subDepartment = i.subDepartment;
                    obj.position = i.position;
                    obj.dismissalReason = i.dismissalReason;
                    for (let j of businessOptions) {
                        if (i.businessStatus == j.label) {
                            obj.businessStatus = j;
                            break;
                        }
                    }
                    obj.startDate = i.startDate;
                    obj.endDate = i.endDate;
                    obj.mainJob = i.mainJob
                    tmpBusinessIntArr.push(obj)
                }
            }

            if (tmpBusinessIntArr.length > 0)
                setCompanyIntArr(tmpBusinessIntArr)

            let tmpBusinessExtArr = [];
            for (let i of businessData) {
                if (i.businessStatus == 'Xarici') {
                    let obj = {
                        businessStatus: null
                    };
                    obj.company = i.company;
                    obj.department = i.department;
                    obj.subDepartment = i.subDepartment;
                    obj.position = i.position;
                    obj.dismissalReason = i.dismissalReason;
                    for (let j of businessOptions) {
                        if (i.businessStatus == j.label) {
                            obj.businessStatus = j;
                            break;
                        }
                    }
                    obj.startDate = i.startDate;
                    obj.endDate = i.endDate;
                    obj.mainJob = i.mainJob
                    tmpBusinessExtArr.push(obj)
                }
            }

            if (tmpBusinessExtArr.length > 0)
                setCompanyExtArr(tmpBusinessExtArr)

            let data = res.data
            setCheckPrisoner(data.prisoner);
            setCheckColleague(data.allianceMember);
            setWarrantyNumber(data.sicNo);
            let quotas = []
            for (let i of quota) {
                for (let j of data.quotas) {
                    if (j === i.label) {
                        quotas.push(i)
                    }
                }
            }
            if (quotas.length > 0)
                setSelectedQuota(quotas)

            let tmpReward = [];
            for (let i of data.honoraryAchievements) {
                let obj = {};
                obj.givenDate = i.givenDate;
                obj.honoraryDecreeId = i.honoraryDecree;
                obj.organizationId = i.organization;
                tmpReward.push(obj)
            }
            if (tmpReward.length > 0)
                setRewardArr(tmpReward);


            let tmpFamilyArr = [];
            for (let i of data.familyMembers) {
                let obj = {};
                obj.workPlace = i.workPlace;
                obj.birthDate = i.birthDate;
                obj.address = i.address;
                obj.position = i.position;
                obj.fullName = i.fullName;
                obj.birthplace = i.birthplace;
                for (let j of relationTypeOptions) {
                    if (j.label === i.relationType)
                        obj.relationType = j;
                }
                tmpFamilyArr.push(obj)
            }
            if (tmpFamilyArr.length > 0)
                setFamilyMemberArr(tmpFamilyArr);
        });
    }

    const getVacation = () => {
        mainAxios({
            method: 'get',
            url: `vacations/period/${id}`,
        }).then((res) => {
                setVacation(res.data)
            }
        );
    }


    const sendGeneralData = () => {
        setLoading(true);
        let idCardSelected = selectedSerial !== null ? selectedSerial.value : null;
        let idCardNum = idCardNumber !== '' ? idCardNumber : null;
        let citizenCheck = selectedCitizenControl !== null ? selectedCitizenControl.name : null;
        let dataPermission = {
            "duration": workPermissionPeriod !== '' ? parseFloat(workPermissionPeriod) : null,
            "endDate": expiredWorkPermissionDate !== null ? moment(expiredWorkPermissionDate).format("YYYY-MM-DD") : null,
            "number": workPermissionNumber !== '' ? workPermissionNumber : null,
            "series": workPermissionSerial !== '' ? workPermissionSerial : null,
            "startDate": startWorkPermissionDate !== null ? moment(startWorkPermissionDate).format("YYYY-MM-DD") : null
        }

        let foreignData = {
            "endDate": expiredPassportDate !== null ? moment(expiredPassportDate).format("YYYY-MM-DD") : null,
            "seriesNumber": passportNumber !== '' ? passportNumber : null,
            "startDate": startPassportDate !== null ? moment(startPassportDate).format("YYYY-MM-DD") : null
        }

        let data = {
            "permission": citizenCheck === 'Az??rbaycan' ? null : dataPermission,
            "personalInformation": {
                "birthday": startBirthDate !== null ? moment(startBirthDate).format("YYYY-MM-DD") : null,
                "birthplace": countryBirth !== '' ? countryBirth : null,
                "bloodGroup": selectedBloodType !== null ? selectedBloodType.value : null,
                "familyStatus": selectedFamilyCondition !== null ? selectedFamilyCondition.value : null,
                "foreignPassport": showPassport ? foreignData : null,
                "motherLandId": selectedCitizenControl !== null ? selectedCitizenControl.id : null,
                "fullName": fullName !== '' ? fullName : null,
                "gender": selectedGender !== null ? selectedGender.value : null,
                "idCard": {
                    "endDate": expiredIdDate !== null ? moment(expiredIdDate).format("YYYY-MM-DD") : null,
                    "organization": idCardOrganization !== '' ? idCardOrganization : null,
                    "pin": idCardPin !== '' ? idCardPin : null,
                    "seriesNumber": idCardSelected !== null ? idCardSelected.concat(idCardNum) : null,
                    "startDate": startIdDate !== null ? moment(startIdDate).format("YYYY-MM-DD") : null
                },
                "militaryStatus": selectedMilitary !== null ? selectedMilitary.value : null
            },
        }
        mainAxios({
            method: 'put',
            url: `employees/${id}`,
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            if (uploadFile !== "") sendImage();
            setErrors({})
        }).catch((error) => {
            setLoading(false)
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

    const sendContactData = () => {
        setLoading(true);
        let plus = "+";

        let registeredData = {
            "apartment": registerApartment !== '' ? registerApartment : null,
            "block": registerBlock !== '' ? registerBlock : null,
            "cityId": selectedRegCity !== null ? selectedRegCity.id : null,
            "countryId": selectedRegCountry !== null ? selectedRegCountry.id : null,
            "districtId": selectedRegRegion !== null ? selectedRegRegion.id : null,
            "home": registerHome !== '' ? registerHome : null,
            "street": registerStreet !== '' ? registerStreet : null,
            "village": registerSettlement !== '' ? registerSettlement : null
        };
        let livingData = {
            "apartment": apartment !== '' ? apartment : null,
            "block": block !== '' ? block : null,
            "cityId": selectedCity !== null ? selectedCity.id : null,
            "countryId": selectedCountry !== null ? selectedCountry.id : null,
            "districtId": selectedRegion !== null ? selectedRegion.id : null,
            "home": home !== '' ? home : null,
            "street": street !== '' ? street : null,
            "village": settlement !== '' ? settlement : null
        }

        let data = {
            "contactInformation": {
                "businessEmail": emailBusiness !== '' ? emailBusiness : null,
                "businessPhone": businessPhone !== '' ? businessPhone : null,
                "email": email !== '' ? email : null,
                "homePhone": phoneNumber !== '' ? phoneNumber : null,
                "internalPhone": businessInternalPhone !== '' ? businessInternalPhone : null,
                "livingAddress": livingData,
                "mainMobile": mobileNumber1 !== '' ? plus.concat(mobileNumber1.toString()) : null,
                "registeredAddress": checkAddress ? livingData : registeredData,
                "secondaryMobile": mobileNumber2 !== '' ? mobileNumber2 : null,
                "sameAddress": checkAddress
            },
        }
        mainAxios({
            method: 'put',
            url: `employees/${id}`,
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setErrors({})
        }).catch((error) => {
            setLoading(false)
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

    const sendEducationData = () => {
        setLoading(true);
        for (let i of educationArr) {
            delete i.foreignOption
            if (i.degree !== null) {
                i.degree = i.degree.value
            }
            if (i.educationType !== null) {
                i.educationType = i.educationType.value
            }
            if (i.institutionId != null) {
                i.institutionId = i.institutionId.id
            }
        }

        let driverLicenceData = {
            "category": selectedDriverLicence !== null ? selectedDriverLicence.value : null,
            "endDate": expiredDriverLicenceDate !== null ? moment(expiredDriverLicenceDate).format("YYYY-MM-DD") : null
        }

        let academicDegreeData = {
            "givenDate": startAcademicDegreeDate !== null ? moment(startAcademicDegreeDate).format("YYYY-MM-DD") : null,
            "number": academicDegreeNumber !== '' ? academicDegreeNumber : null,
            "organization": academicDegreeOrganization !== '' ? academicDegreeOrganization : null
        }

        for (let i of certificateArr) {
            if (i.certificateId != null) {
                i.certificateId = i.certificateId.id
            } else {
                i.certificateId = null
            }
        }

        let data = {
            "educationInformation": {
                "academicDegree": showDegree ? academicDegreeData : null,
                "certificates": certificateArr,
                "driverLicence": showDriverLicence ? driverLicenceData : null,
                "higherEducation": checkEducation,
                "universities": checkEducation ? educationArr : []
            },
        }
        mainAxios({
            method: 'put',
            url: `employees/${id}`,
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setErrors({})
        }).catch((error) => {
            setLoading(false)
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

    const sendCompanyData = () => {
        setLoading(true);
        for (let i of companyIntArr) {
            if (i.businessStatus !== null) {
                i.businessStatus = i.businessStatus.value
            }
        }

        for (let i of companyExtArr) {
            if (i.businessStatus !== null) {
                i.businessStatus = i.businessStatus.value
            }
        }
        let companyArr = companyExtArr.concat(companyIntArr)

        let data = {
            "businessInformationSet": companyArr,
        }
        mainAxios({
            method: 'put',
            url: `employees/${id}`,
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setErrors({})
            getEmployeeInfo()
        }).catch((error) => {
            setLoading(false)
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
            getEmployeeInfo()
        });
    }

    const sendOtherData = () => {
        console.log(checkPrisoner)
        console.log(checkColleague)
        setLoading(true);
        let quotas = []
        for (let i of quotaArr) {
            quotas.push(i.value)
        }
        for (let i of familyMemberArr) {
            if (i.relationType != null) {
                i.relationType = i.relationType.value
            } else {
                i.relationType = null
            }
        }

        for (let i of rewardArr) {
            if (i.honoraryDecreeId != null) {
                i.honoraryDecreeId = i.honoraryDecreeId.id
            } else {
                i.honoraryDecreeId = null
            }

            if (i.organizationId != null) {
                i.organizationId = i.organizationId.id
            } else {
                i.organizationId = null
            }

        }

        let data = {
            "allianceMember": checkColleague,
            "familyMembers": familyMemberArr,
            "honoraryAchievements": rewardArr,
            "prisoner": checkPrisoner,
            "quotas": quotas,
            "sicNo": warrantyNumber !== '' ? warrantyNumber : null,

        }
        mainAxios({
            method: 'put',
            url: `employees/${id}`,
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setErrors({})
            getEmployeeInfo()
        }).catch((error) => {
            setLoading(false)
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
            getEmployeeInfo()
        });
    }

    const sendBankData = () => {
        setLoading(true);
        let data = {
            "account": {
                number: bankAccount
            },
        }
        mainAxios({
            method: 'put',
            url: `employees/${id}`,
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
            setLoading(false)
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


    const sendImage = () => {
        const formData = new FormData();
        formData.append("image", uploadFile);
        mainAxios({
            method: 'post',
            url: `employees/${id}/image`,
            data: formData
        }).then((res) => {
        });
    }


    const getOperation = (page) => {
        mainAxios({
            method: 'get',
            url: `employees/${id}/operations`,
            params: {
                page: page - 1,
                size: recordSize,
            }
        }).then((res) => {
            setCurrentPage(page);
            setOperation(res.data.content);
            setTotalRecord(res.data.totalElements);
            setEmptyData(true)
        });
    }

    const changeStatus = (status, id) => {
        let statusText = status === 2 ? 'L????v etm??k ist??diyiniz?? ??minsinizmi?' : 'T??sdiq etm??k ist??diyiniz?? ??minsinizmi?'
        Swal.fire({
            text: statusText,
            showCancelButton: true,
            confirmButtonText: 'B??li',
            confirmButtonColor: '#2ed06a',
            cancelButtonText: 'Xeyr',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                mainAxios({
                    method: 'put',
                    url: `operations/${id}/status`,
                    params: {
                        status: status
                    }
                }).then((res) => {
                    getOperation(1)
                });
            }
        })
    }

    const getExportDocument = (id, operationName) => {
        mainAxios({
            method: 'get',
            url: `operations/${id}/export`,
            responseType: 'arraybuffer',
        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = window.document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${operationName}.doc`);
            window.document.body.appendChild(link);
            link.click();
        })
    }


    useEffect(() => {
        getCity();
        getCountry();
        getRegion();
        getUniversity();
        getReward();
        getEmployeeInfo();
        getRewardOrganization();
        getCitizenControl();
        getCertificate();
        getVacation();
        getOperation(1)
    }, []);

    return (
        <Aux>
            <div className="create-staff">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title flex-center">
                            <Link to={{
                                pathname: `/employee/view/${id}`,
                                state: key
                            }} className="flex">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.3333 14H7.58333M12.25 8.75L7 14L12.25 19.25" stroke="#193651"
                                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            Redakt?? et
                        </div>
                    </div>
                    {
                        loading ? <div className="block"><Loading/></div> :
                            <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                                <Tab eventKey="general" title="??mumi m??lumatlar">
                                    <div className="block">
                                        <Form className="form-list">
                                            <div className="add-block">
                                                <div className="block-title">
                                                    ????xsiyy??t v??siq??si formas??
                                                </div>
                                                <div className="block-inn">
                                                    <div className="upload-content flex-center">
                                                        <div className="upload-img">
                                                            <Image src={photo ? photo : userImage}/>
                                                        </div>
                                                        <ul className="btn-block flex-center list-unstyled">
                                                            <li>
                                                                <Button className="btn-main-border relative"
                                                                        type="button">
                                                                    ????kil ??lav?? et
                                                                    <input type="file"
                                                                           onChange={(event) => uploadImage(event)}/>
                                                                </Button>
                                                            </li>
                                                            <li>
                                                                <Button className="btn-border relative" type="button"
                                                                        onClick={() => removeImage()}>
                                                                    ????kli sil
                                                                </Button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <Row>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Seriya v?? n??mr?? *</span>
                                                                <InputGroup>
                                                                    <div className="input-add">
                                                                        <Select
                                                                            placeholder="AZE"
                                                                            value={selectedSerial}
                                                                            onChange={(val) => {
                                                                                setSelectedSerial(val);
                                                                            }}
                                                                            isSearchable={serialNumberOptions ? serialNumberOptions.length > 5 : false}
                                                                            options={serialNumberOptions}
                                                                            getOptionLabel={(option) => (option.label)}
                                                                            getOptionValue={(option) => (option.label)}
                                                                            styles={customGroupStyles}
                                                                        />
                                                                    </div>
                                                                    <Form.Control placeholder="N??mr?? daxil edin"
                                                                                  value={idCardNumber || ''}
                                                                                  onChange={(e => setIdCardNumber(e.target.value))}/>
                                                                </InputGroup>
                                                                <div className="validation-block flex-start">
                                                                    {

                                                                        errors['personalInformation.idCard.seriesNumber'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['personalInformation.idCard.seriesNumber']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">F??N kod *</span>
                                                                <Form.Label>
                                                                    <Form.Control placeholder="FIN kodu daxil edin"
                                                                                  value={idCardPin || ''}
                                                                                  onChange={(e => setIdCardPin(e.target.value))}/>
                                                                </Form.Label>
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['personalInformation.idCard.pin'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['personalInformation.idCard.pin']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Ail?? v??ziyy??ti *</span>
                                                                <Select
                                                                    placeholder="Ail?? v??ziyy??ti se??in"
                                                                    value={selectedFamilyCondition}
                                                                    onChange={(val) => {
                                                                        setSelectedFamilyCondition(val);
                                                                    }}
                                                                    isSearchable={familyConditionOptions ? familyConditionOptions.length > 5 : false}
                                                                    options={familyConditionOptions}
                                                                    getOptionLabel={(option) => (option.label)}
                                                                    getOptionValue={(option) => (option.label)}
                                                                    styles={customStyles}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {

                                                                        errors['personalInformation.familyStatus'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['personalInformation.familyStatus']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">????xsiy. v??s. verilm?? tarixi</span>
                                                                <Form.Label className="relative m-0">
                                                                    <DatePicker
                                                                        selected={startIdDate}
                                                                        placeholderText="YYYY-MM-DD"
                                                                        dateFormat="dd-MM-yyyy"
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        dropdownMode="select"
                                                                        onChange={(date) => setStartIdDate(date)}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                        <span
                                                            className="input-title">????xsiy. v??s. q??vv??d?? olma tarixi</span>
                                                                <Form.Label className="relative m-0">
                                                                    <DatePicker selected={expiredIdDate}
                                                                                placeholderText="YYYY-MM-DD"
                                                                                dateFormat="dd-MM-yyyy"
                                                                                showMonthDropdown
                                                                                showYearDropdown
                                                                                dropdownMode="select"
                                                                                onChange={(date) => setExpiredIdDate(date)}/>
                                                                </Form.Label>
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['personalInformation.idCard.endDate'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['personalInformation.idCard.endDate']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">Soyad??, ad??, ata ad?? *</span>
                                                                <Form.Label>
                                                                    <Form.Control type="text"
                                                                                  placeholder="Soyad??, ad??, ata ad??  daxil edin"
                                                                                  value={fullName || ''}
                                                                                  onChange={(e => {
                                                                                      setFullName(e.target.value);
                                                                                  })}/>
                                                                </Form.Label>
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['personalInformation.fullName'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['personalInformation.fullName']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Do??um tarixi *</span>
                                                                <Form.Label className="relative m-0">
                                                                    <DatePicker selected={startBirthDate}
                                                                                dateFormat="dd-MM-yyyy"
                                                                                placeholderText="YYYY-MM-DD"
                                                                                showMonthDropdown
                                                                                showYearDropdown
                                                                                dropdownMode="select"
                                                                                onChange={(date) => setStartBirthDate(date)}/>
                                                                </Form.Label>
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['personalInformation.birthday'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['personalInformation.birthday']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Do??um yeri *</span>
                                                                <Form.Control type="text"
                                                                              placeholder="Do??um yerini daxil edin"
                                                                              value={countryBirth || ''}
                                                                              onChange={(e) => setCountryBirth(e.target.value)}/>
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['personalInformation.birthplace'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['personalInformation.birthplace']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">V??t??nda??l?????? oldu??u ??lk?? *</span>
                                                                <Select
                                                                    placeholder="V??t??nda??l?????? oldu??u ??lk??ni se??in"
                                                                    value={selectedCitizenControl}
                                                                    onChange={(val) => {
                                                                        val.name !== 'Az??rbaycan' ? setShowPermission(true) : setShowPermission(false)
                                                                        setSelectedCitizenControl(val)
                                                                    }}
                                                                    isSearchable={citizen ? citizen.length > 5 : false}
                                                                    options={citizen}
                                                                    getOptionLabel={(option) => (option.name)}
                                                                    getOptionValue={option => option.name}
                                                                    styles={customStyles}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['personalInformation.motherLandId'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['personalInformation.motherLandId']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Cinsi *</span>
                                                                <Select
                                                                    placeholder="Cinsini se??in"
                                                                    value={selectedGender}
                                                                    onChange={(val) => {
                                                                        setSelectedGender(val);
                                                                        val.value === 'MALE' ? setShowMilitary(true) : setShowMilitary(false)
                                                                        if (val.value !== 'MALE') {
                                                                            setSelectedMilitary(null)
                                                                        }
                                                                    }}
                                                                    isSearchable={genderOptions ? genderOptions.length > 5 : false}
                                                                    options={genderOptions}
                                                                    styles={customStyles}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['personalInformation.gender'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['personalInformation.gender']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Qan qrupu</span>
                                                                <Select
                                                                    placeholder="Qan qrupunu se??in"
                                                                    value={selectedBloodType}
                                                                    onChange={setSelectedBloodType}
                                                                    options={bloodTypeOptions}
                                                                    isSearchable={bloodTypeOptions ? bloodTypeOptions.length > 5 : false}
                                                                    styles={customStyles}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">????xsiy. v??s. ver??n orqan</span>
                                                                <Form.Label>
                                                                    <Form.Control type="text"
                                                                                  placeholder="????xsiy. v??s. ver??n orqan?? daxil edin"
                                                                                  value={idCardOrganization || ''}
                                                                                  onChange={(e) => setIdCardOrganization(e.target.value)}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                {
                                                    showMilitary ?
                                                        <div className="block-inn">
                                                            <Row>
                                                                <Col xs={12}>
                                                                    <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">H??rbi Status</span>
                                                                        <Select
                                                                            placeholder="H??rbi Statusu se??in"
                                                                            value={selectedMilitary}
                                                                            onChange={setSelectedMilitary}
                                                                            options={militaryOptions}
                                                                            isSearchable={militaryOptions ? militaryOptions.length > 5: false}
                                                                            styles={customStyles}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        : null
                                                }
                                                {
                                                    showPermission ?
                                                        <div className="block-inn">
                                                            <div className="block-title">
                                                                ???? icaz??si
                                                            </div>
                                                            <Row>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">Seriyas??</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="Seriyan?? daxil edin"
                                                                                value={workPermissionSerial || ''}
                                                                                onChange={(e => setWorkPermissionSerial(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">N??mr??si</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="N??mr??ni daxil edin"
                                                                                value={workPermissionNumber || ''}
                                                                                onChange={(e => setWorkPermissionNumber(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">???? icaz??sinin m??dd??ti</span>
                                                                        <Form.Label className="relative m-0">
                                                                            <Form.Control
                                                                                placeholder="M??dd??ti daxil edin"
                                                                                type="number"
                                                                                value={workPermissionPeriod || ''}
                                                                                onChange={(e => setWorkPermissionPeriod(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                    <span
                                                                        className="input-title">Verilm?? tarixi</span>
                                                                        <Form.Label className="relative m-0">
                                                                            <DatePicker
                                                                                selected={startWorkPermissionDate}
                                                                                dateFormat="dd-MM-yyyy"
                                                                                placeholderText="YYYY-MM-DD"
                                                                                showMonthDropdown
                                                                                showYearDropdown
                                                                                dropdownMode="select"
                                                                                onChange={(date) => setStartWorkPermissionDate(date)}/>
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
                                                                        <span
                                                                            className="input-title">Bitm?? tarixi</span>
                                                                        <Form.Label className="relative m-0">
                                                                            <DatePicker
                                                                                selected={expiredWorkPermissionDate}
                                                                                dateFormat="dd-MM-yyyy"
                                                                                placeholderText="YYYY-MM-DD"
                                                                                showMonthDropdown
                                                                                showYearDropdown
                                                                                dropdownMode="select"
                                                                                onChange={(date) => setExpiredWorkPermissionDate(date)}/>
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

                                                                                errors['permission.endDate'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['permission.endDate']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        : null
                                                }
                                                <div className="add-block">
                                                    <div className="block-title flex-center">
                                                        <div className="check-block">
                                                            <label className="check-button">
                                                                <input type="checkbox"
                                                                       checked={showPassport}
                                                                       onChange={(e) => {
                                                                           setShowPassport(e.target.checked);
                                                                       }}/>
                                                                <span className="checkmark"/>
                                                            </label>
                                                        </div>
                                                        Xarici pasport
                                                    </div>
                                                    <div className="block-inn">
                                                        {
                                                            showPassport ?
                                                                <Row>
                                                                    <Col xs={4}>
                                                                        <Form.Group className="form-group">
                                                                    <span
                                                                        className="input-title">Seriya v?? n??mr??</span>
                                                                            <Form.Label>
                                                                                <Form.Control
                                                                                    placeholder="Seriya v?? n??mr??ni daxil edin"
                                                                                    value={passportNumber || ''}
                                                                                    onChange={(e => setPassportNumber(e.target.value))}/>
                                                                            </Form.Label>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col xs={4}>
                                                                        <Form.Group className="form-group">
                                                                    <span
                                                                        className="input-title">Verilm?? tarixi</span>
                                                                            <Form.Label className="relative m-0">
                                                                                <DatePicker selected={startPassportDate}
                                                                                            dateFormat="dd-MM-yyyy"
                                                                                            placeholderText="YYYY-MM-DD"
                                                                                            showMonthDropdown
                                                                                            showYearDropdown
                                                                                            dropdownMode="select"
                                                                                            onChange={(date) => setStartPassportDate(date)}/>
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
                                                                    <Col xs={4}>
                                                                        <Form.Group className="form-group">
                                                                            <span
                                                                                className="input-title">Bitm?? tarixi</span>
                                                                            <Form.Label className="relative m-0">
                                                                                <DatePicker
                                                                                    selected={expiredPassportDate}
                                                                                    dateFormat="dd-MM-yyyy"
                                                                                    placeholderText="YYYY-MM-DD"
                                                                                    showMonthDropdown
                                                                                    showYearDropdown
                                                                                    dropdownMode="select"
                                                                                    onChange={(date) => setExpiredPassportDate(date)}/>
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
                                                                </Row>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-vertical-center">
                                                <Button className="btn-effect w-200" onClick={() => sendGeneralData()}>
                                                    Yadda saxla
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Tab>
                                <Tab eventKey="contact" title="??nvan v?? ??laq??">
                                    <div className="block">
                                        <Form className="form-list">
                                            <div className="add-block">
                                                <div className="block-inn">
                                                    <div className="block-title">
                                                        ??nvan
                                                    </div>
                                                    <Row>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">??lk??</span>
                                                                <Select
                                                                    placeholder="??lk?? se??in"
                                                                    value={selectedCountry}
                                                                    onChange={(val) => {
                                                                        setSelectedCountry(val);
                                                                    }}
                                                                    isSearchable={countries ? countries.length > 5 : false}
                                                                    options={countries}
                                                                    getOptionLabel={(option) => (option.name)}
                                                                    getOptionValue={option => option.name}
                                                                    styles={customStyles}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {

                                                                        errors['contactInformation.livingAddress.countryId'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['contactInformation.livingAddress.countryId']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">????h??r</span>
                                                                <Select
                                                                    placeholder="????h??r se??in"
                                                                    value={selectedCity}
                                                                    onChange={(val) => {
                                                                        setSelectedCity(val);
                                                                    }}
                                                                    isSearchable={cities ? cities.length > 5 : false}
                                                                    options={cities}
                                                                    getOptionLabel={(option) => (option.name)}
                                                                    getOptionValue={option => option.name}
                                                                    styles={customStyles}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {

                                                                        errors['contactInformation.livingAddress.cityId'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['contactInformation.livingAddress.cityId']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Rayon</span>
                                                                <Select
                                                                    placeholder="Rayon se??in"
                                                                    value={selectedRegion}
                                                                    onChange={(val) => {
                                                                        setSelectedRegion(val);
                                                                    }}
                                                                    isSearchable={regions ? regions.length > 5 : false}
                                                                    options={regions}
                                                                    getOptionLabel={(option) => (option.name)}
                                                                    getOptionValue={option => option.name}
                                                                    styles={customStyles}
                                                                />
                                                                <div className="validation-block flex-start">
                                                                    {

                                                                        errors['contactInformation.livingAddress.districtId'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['contactInformation.livingAddress.districtId']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Q??s??b??</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        placeholder="??lk??ni daxil edin"
                                                                        value={settlement || ''}
                                                                        onChange={(e => setSettlement(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">K??????</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        placeholder="K?????? daxil edin"
                                                                        value={street || ''}
                                                                        onChange={(e => setStreet(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">M??h??ll??</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        placeholder="M??h??ll?? daxil edin"
                                                                        value={block || ''}
                                                                        onChange={(e => setBlock(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">M??nzil</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        placeholder="M??nzil daxil edin"
                                                                        value={apartment || ''}
                                                                        onChange={(e => setApartment(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Ev</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        placeholder="Ev daxil edin"
                                                                        value={home || ''}
                                                                        onChange={(e => setHome(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            <div className="add-block">
                                                <div className="block-inn">
                                                    <div className="block-title flex-center">
                                                        <div className="check-block">
                                                            <label className="check-button">
                                                                <input type="checkbox"
                                                                       checked={checkAddress}
                                                                       name="checkAddress"
                                                                       onChange={(e) => {
                                                                           setCheckAddress(e.target.checked);
                                                                       }}/>
                                                                <span className="checkmark"/>
                                                            </label>
                                                        </div>
                                                        Daimi qeydiyyata oldu??u ??nvanla eynidir
                                                    </div>
                                                    {
                                                        checkAddress ?
                                                            <Row>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">??lk??</span>
                                                                        <Select
                                                                            placeholder="??lk?? se??in"
                                                                            value={selectedCountry}
                                                                            isDisabled={true}
                                                                            onChange={(val) => {
                                                                                setSelectedCountry(val);
                                                                            }}
                                                                            isSearchable={countries ? countries.length > 5 : false}
                                                                            options={countries}
                                                                            getOptionLabel={(option) => (option.name)}
                                                                            getOptionValue={option => option.name}
                                                                            styles={customStyles}
                                                                        />
                                                                        <div className="validation-block flex-start">
                                                                            {

                                                                                errors['contactInformation.registeredAddress.countryId'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['contactInformation.registeredAddress.countryId']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">????h??r</span>
                                                                        <Select
                                                                            placeholder="????h??r se??in"
                                                                            value={selectedCity}
                                                                            isDisabled={true}
                                                                            onChange={(val) => {
                                                                                setSelectedCity(val);
                                                                            }}
                                                                            isSearchable={cities ? cities.length > 5 : false}
                                                                            options={cities}
                                                                            getOptionLabel={(option) => (option.name)}
                                                                            getOptionValue={option => option.name}
                                                                            styles={customStyles}
                                                                        />
                                                                        <div className="validation-block flex-start">
                                                                            {

                                                                                errors['contactInformation.registeredAddress.cityId'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['contactInformation.registeredAddress.cityId']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">Rayon</span>
                                                                        <Select
                                                                            placeholder="Rayon se??in"
                                                                            value={selectedRegion}
                                                                            onChange={(val) => {
                                                                                setSelectedRegion(val);
                                                                            }}
                                                                            isDisabled={true}
                                                                            isSearchable={regions ? regions.length > 5 : false}
                                                                            options={regions}
                                                                            getOptionLabel={(option) => (option.name)}
                                                                            getOptionValue={option => option.name}
                                                                            styles={customStyles}
                                                                        />
                                                                        <div className="validation-block flex-start">
                                                                            {

                                                                                errors['contactInformation.registeredAddress.districtId'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['contactInformation.registeredAddress.districtId']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">Q??s??b??</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="??lk??ni daxil edin"
                                                                                value={settlement || ''}
                                                                                disabled={true}
                                                                                onChange={(e => setSettlement(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">K??????</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="K?????? daxil edin"
                                                                                value={street || ''}
                                                                                disabled={true}
                                                                                onChange={(e => setStreet(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">M??h??ll??</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="M??h??ll?? daxil edin"
                                                                                value={block || ''}
                                                                                disabled={true}
                                                                                onChange={(e => setBlock(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">M??nzil</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="M??nzil daxil edin"
                                                                                value={apartment || ''}
                                                                                disabled={true}
                                                                                onChange={(e => setApartment(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">Ev</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="Ev daxil edin"
                                                                                value={home || ''}
                                                                                disabled={true}
                                                                                onChange={(e => setHome(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            :
                                                            <Row>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">??lk??</span>
                                                                        <Select
                                                                            placeholder="??lk?? se??in"
                                                                            value={selectedRegCountry}
                                                                            onChange={(val) => {
                                                                                setSelectedRegCountry(val);
                                                                            }}
                                                                            isSearchable={countries ? countries.length > 5 : false}
                                                                            options={countries}
                                                                            getOptionLabel={(option) => (option.name)}
                                                                            getOptionValue={option => option.name}
                                                                            styles={customStyles}
                                                                        />
                                                                        <div className="validation-block flex-start">
                                                                            {

                                                                                errors['contactInformation.registeredAddress.countryId'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['contactInformation.registeredAddress.countryId']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">????h??r *</span>
                                                                        <Select
                                                                            placeholder="????h??r se??in"
                                                                            value={selectedRegCity}
                                                                            onChange={(val) => {
                                                                                setSelectedRegCity(val);
                                                                            }}
                                                                            isSearchable={cities ? cities.length > 5 : false}
                                                                            options={cities}
                                                                            getOptionLabel={(option) => (option.name)}
                                                                            getOptionValue={option => option.name}
                                                                            styles={customStyles}
                                                                        />
                                                                        <div className="validation-block flex-start">
                                                                            {

                                                                                errors['contactInformation.registeredAddress.cityId'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['contactInformation.registeredAddress.cityId']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">Rayon *</span>
                                                                        <Select
                                                                            placeholder="Rayon se??in"
                                                                            value={selectedRegRegion}
                                                                            onChange={(val) => {
                                                                                setSelectedRegRegion(val);
                                                                            }}
                                                                            isSearchable={regions ? regions.length > 5 : false}
                                                                            options={regions}
                                                                            getOptionLabel={(option) => (option.name)}
                                                                            getOptionValue={option => option.name}
                                                                            styles={customStyles}
                                                                        />
                                                                        <div className="validation-block flex-start">
                                                                            {

                                                                                errors['contactInformation.registeredAddress.districtId'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['contactInformation.registeredAddress.districtId']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">Q??s??b??</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="??lk??ni daxil edin"
                                                                                value={registerSettlement || ''}
                                                                                onChange={(e => setRegisterSettlement(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">K??????</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="K?????? daxil edin"
                                                                                value={registerStreet || ''}
                                                                                onChange={(e => setRegisterStreet(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">M??h??ll??</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="M??h??ll?? daxil edin"
                                                                                value={registerBlock || ''}
                                                                                onChange={(e => setRegisterBlock(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">M??nzil</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="M??nzil daxil edin"
                                                                                value={registerApartment || ''}
                                                                                onChange={(e => setRegisterApartment(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">Ev</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="Ev daxil edin"
                                                                                value={registerHome || ''}
                                                                                onChange={(e => setRegisterHome(e.target.value))}/>
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>

                                                    }
                                                </div>
                                            </div>
                                            <div className="add-block">
                                                <div className="block-inn">
                                                    <div className="block-title">
                                                        ??laq?? vasit??l??ri
                                                    </div>
                                                    <Row>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Ev n??mr??si</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="994XXXXXXXXX"
                                                                        value={phoneNumber || ''}
                                                                        onChange={(e => setPhoneNumber(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Mobil n??mr??si 1 *</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="994XXXXXXXXX"
                                                                        value={mobileNumber1 || ''}
                                                                        onChange={(e => setMobileNumber1(e.target.value))}/>
                                                                </Form.Label>
                                                                <div className="validation-block flex-start">
                                                                    {
                                                                        errors['contactInformation.mainMobile'] !== '' ?
                                                                            <span
                                                                                className="text-validation">{errors['contactInformation.mainMobile']}</span>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Mobil n??mr??si 2</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="994XXXXXXXXX"
                                                                        value={mobileNumber2 || ''}
                                                                        onChange={(e => setMobileNumber2(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">???? n??mr??si</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="994XXXXXXXXX"
                                                                        value={businessPhone || ''}
                                                                        onChange={(e => setBusinessPhone(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">???? n??mr??si ( daxili)</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="994XXXXXXXXX"
                                                                        value={businessInternalPhone || ''}
                                                                        onChange={(e => setBusinessInternalPhone(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">E-mail ??nvan?? (????xsi)</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        placeholder="E-mail ??nvan?? edin"
                                                                        value={email || ''}
                                                                        onChange={(e => setEmail(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">E-mail ??nvan?? (i??)</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        placeholder="E-mail ??nvan?? edin"
                                                                        value={emailBusiness || ''}
                                                                        onChange={(e => setEmailBusiness(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            <ul className="flex-vertical-center btn-block list-unstyled">
                                                <Button className="btn-effect w-200" onClick={() => sendContactData()}>
                                                    Yadda saxla
                                                </Button>
                                            </ul>
                                        </Form>
                                    </div>
                                </Tab>
                                <Tab eventKey="education" title="T??hsil m.">
                                    <div className="block">
                                        <Form className="form-list">
                                            <div className="add-block">
                                                <div className="block-title">
                                                    T??hsil b??lm??si
                                                </div>
                                                <div className="radio-content-in">
                                                    <div className="flex-start ">
                                                        <div className="radio-block">
                                                            <label className="radio-label">
                                                                <input type="radio" name="education"
                                                                       checked={!checkEducation}
                                                                       onChange={() => {
                                                                           setCheckEducation(false)
                                                                       }}/>
                                                                <span className="radio-mark"/>
                                                            </label>
                                                            <span className="radio-title">Orta t??hsilli</span>
                                                        </div>
                                                        <div className="radio-block">
                                                            <label className="radio-label">
                                                                <input type="radio" name="education"
                                                                       checked={checkEducation}
                                                                       onChange={() => {
                                                                           setCheckEducation(true)
                                                                       }}/>
                                                                <span className="radio-mark"/>
                                                            </label>
                                                            <span className="radio-title">Ali t??hsilli </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    checkEducation ?
                                                        <div className="block-inn">
                                                            <div className="addition-content">
                                                                {
                                                                    educationArr.map((item, index) =>
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
                                                                                                educationArr.splice(index, 1);
                                                                                                setEducationArr([...educationArr], educationArr)
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
                                                                                <Col xs={4}>
                                                                                    <Form.Group className="form-group">
                                                                                        <span className="input-title">T??hsil d??r??c??si</span>
                                                                                        <Select
                                                                                            placeholder="T??hsil d??r??c??sini se??in"
                                                                                            value={item.degree || ''}
                                                                                            onChange={(val) => {
                                                                                                educationArr[index].degree = val;
                                                                                                setEducationArr([...educationArr], educationArr)
                                                                                            }}
                                                                                            isSearchable={eduDegreeOptions ? eduDegreeOptions.length > 5 : false}
                                                                                            options={eduDegreeOptions}
                                                                                            getOptionLabel={(option) => (option.label)}
                                                                                            getOptionValue={(option) => (option.label)}
                                                                                            styles={customStyles}
                                                                                        />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col xs={4}>
                                                                                    <Form.Group className="form-group">
                                                                                        <span className="input-title">T??hsil m????ss??sinin ad??</span>
                                                                                        <Select
                                                                                            placeholder="T??hsil m????ss??sini se??in"
                                                                                            value={item.institutionId || ''}
                                                                                            onChange={(val) => {
                                                                                                educationArr[index].institutionId = val;
                                                                                                setEducationArr([...educationArr], educationArr)
                                                                                            }}
                                                                                            isSearchable={university ? university.length > 5 : false}
                                                                                            options={university}
                                                                                            getOptionLabel={(option) => (option.name)}
                                                                                            getOptionValue={option => option.name}
                                                                                            styles={customStyles}
                                                                                        />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col xs={4}>
                                                                                    <Form.Group className="form-group">
                                                                                <span
                                                                                    className="input-title">Fak??lt??</span>
                                                                                        <Form.Label>
                                                                                            <Form.Control
                                                                                                value={item.faculty || ''}
                                                                                                placeholder="Fak??lt?? daxil et"
                                                                                                onChange={(e) => {
                                                                                                    educationArr[index].faculty = e.target.value;
                                                                                                    setEducationArr([...educationArr], educationArr)
                                                                                                }}/>
                                                                                        </Form.Label>
                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col xs={4}>
                                                                                    <Form.Group className="form-group">
                                                                                <span
                                                                                    className="input-title">??stiqam??t</span>
                                                                                        <Form.Label>
                                                                                            <Form.Control
                                                                                                value={item.direction || ''}
                                                                                                placeholder="??stiqam??t daxil et"
                                                                                                onChange={(e) => {
                                                                                                    educationArr[index].direction = e.target.value;
                                                                                                    setEducationArr([...educationArr], educationArr)
                                                                                                }}/>
                                                                                        </Form.Label>
                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col xs={4}>
                                                                                    <Form.Group className="form-group">
                                                                                <span
                                                                                    className="input-title"> ??xtisas</span>
                                                                                        <Form.Label
                                                                                            className="relative m-0">
                                                                                            <Form.Control
                                                                                                value={item.speciality || ''}
                                                                                                placeholder="??xtisas daxil et"
                                                                                                onChange={(e) => {
                                                                                                    educationArr[index].speciality = e.target.value;
                                                                                                    setEducationArr([...educationArr], educationArr)
                                                                                                }}/>
                                                                                        </Form.Label>
                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col xs={4}>
                                                                                    <Form.Group className="form-group">
                                                                                        <span className="input-title"> Daxil olma tarixi</span>
                                                                                        <Form.Label
                                                                                            className="relative m-0">
                                                                                            <DatePicker
                                                                                                value={item.entranceDate || ''}
                                                                                                dateFormat="dd-MM-yyyy"
                                                                                                placeholderText="YYYY-MM-DD"
                                                                                                showMonthDropdown
                                                                                                showYearDropdown
                                                                                                dropdownMode="select"
                                                                                                onChange={(date) => {
                                                                                                    educationArr[index].entranceDate = moment(date).format("YYYY-MM-DD");
                                                                                                    setEducationArr([...educationArr], educationArr)
                                                                                                }}/>
                                                                                            <Button
                                                                                                className="btn-transparent">
                                                                                                <svg width="18"
                                                                                                     height="18"
                                                                                                     viewBox="0 0 18 18"
                                                                                                     fill="none"
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
                                                                                                        <clipPath
                                                                                                            id="clip0">
                                                                                                            <rect
                                                                                                                width="17.399"
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
                                                                                <Col xs={4}>
                                                                                    <Form.Group className="form-group">
                                                                                        <span className="input-title"> Bitm?? tarixi</span>
                                                                                        <Form.Label
                                                                                            className="relative m-0">
                                                                                            <DatePicker
                                                                                                value={item.graduateDate || ''}
                                                                                                dateFormat="dd-MM-yyyy"
                                                                                                placeholderText="YYYY-MM-DD"
                                                                                                showMonthDropdown
                                                                                                showYearDropdown
                                                                                                dropdownMode="select"
                                                                                                onChange={(date) => {
                                                                                                    educationArr[index].graduateDate = moment(date).format("YYYY-MM-DD");
                                                                                                    setEducationArr([...educationArr], educationArr)
                                                                                                }}/>
                                                                                            <Button
                                                                                                className="btn-transparent">
                                                                                                <svg width="18"
                                                                                                     height="18"
                                                                                                     viewBox="0 0 18 18"
                                                                                                     fill="none"
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
                                                                                                        <clipPath
                                                                                                            id="clip0">
                                                                                                            <rect
                                                                                                                width="17.399"
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
                                                                                <Col xs={4}>
                                                                                    <Form.Group className="form-group">
                                                                                        <span className="input-title">S??n??din n??mr??si</span>
                                                                                        <Form.Label>
                                                                                            <Form.Control
                                                                                                value={item.diploma !== null ? item.diploma.number : ''}
                                                                                                placeholder="S??n??din n??mr??si daxil et"
                                                                                                onChange={(e) => {
                                                                                                    educationArr[index].diploma.number = e.target.value;
                                                                                                    setEducationArr([...educationArr], educationArr)
                                                                                                }}/>
                                                                                        </Form.Label>
                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col xs={4}>
                                                                                    <Form.Group className="form-group">
                                                                                        <span className="input-title"> S??n??din verilm?? tarixi</span>
                                                                                        <Form.Label
                                                                                            className="relative m-0">
                                                                                            <DatePicker
                                                                                                value={item.diploma !== null ? item.diploma.givenDate : ''}
                                                                                                dateFormat="dd-MM-yyyy"
                                                                                                placeholderText="YYYY-MM-DD"
                                                                                                showMonthDropdown
                                                                                                showYearDropdown
                                                                                                dropdownMode="select"
                                                                                                onChange={(date) => {
                                                                                                    educationArr[index].diploma.givenDate = moment(date).format("YYYY-MM-DD");
                                                                                                    setEducationArr([...educationArr], educationArr)
                                                                                                }}/>
                                                                                            <Button
                                                                                                className="btn-transparent">
                                                                                                <svg width="18"
                                                                                                     height="18"
                                                                                                     viewBox="0 0 18 18"
                                                                                                     fill="none"
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
                                                                                                        <clipPath
                                                                                                            id="clip0">
                                                                                                            <rect
                                                                                                                width="17.399"
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
                                                                                        <span className="input-title">T??hsil formas??</span>
                                                                                        <Select
                                                                                            value={item.educationType || ''}
                                                                                            placeholder="T??hsil formas?? se??in"
                                                                                            onChange={(val) => {
                                                                                                educationArr[index].educationType = val;
                                                                                                setEducationArr([...educationArr], educationArr)
                                                                                            }}
                                                                                            isSearchable={educationTypeOptions ? educationTypeOptions.length > 5 : false}
                                                                                            options={educationTypeOptions}
                                                                                            getOptionLabel={(option) => (option.label)}
                                                                                            styles={customStyles}
                                                                                        />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col xs={6}>
                                                                                    <Form.Group className="form-group">
                                                                                        <div
                                                                                            className="input-title flex-center">
                                                                                            <div
                                                                                                className="check-block">
                                                                                                <label
                                                                                                    className="check-button">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        name="checkForeign"
                                                                                                        checked={item.foreignOption || ''}
                                                                                                        onChange={(e) => {
                                                                                                            educationArr[index].foreignOption = e.target.checked;
                                                                                                            setEducationArr([...educationArr], educationArr)
                                                                                                        }}/>
                                                                                                    <span className="checkmark"/>
                                                                                                </label>
                                                                                            </div>
                                                                                            <span>Nostrifikasiya ????had??tnam??sinin n??mr??si</span>
                                                                                        </div>
                                                                                        <Form.Label>
                                                                                            <Form.Control
                                                                                                value={item.abroadStudyNo || ''}
                                                                                                placeholder="Nostrifikasiya ????had??tnam??sinin n??mr??si daxil et"
                                                                                                disabled={!(item.foreignOption)}
                                                                                                onChange={(e) => {
                                                                                                    educationArr[index].abroadStudyNo = e.target.value;
                                                                                                    setEducationArr([...educationArr], educationArr)
                                                                                                }}/>
                                                                                        </Form.Label>
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            </Row>

                                                                        </div>
                                                                    )
                                                                }
                                                                <div className="flex-end">
                                                                    <Button type="button" className="btn-main-text"
                                                                            onClick={() => addEducation()}>
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
                                                        : null
                                                }
                                            </div>
                                            <div className="add-block">
                                                <div className="block-title">
                                                    Sertifikat ( v??siq??)
                                                </div>
                                                <div className="block-inn">
                                                    <div className="addition-content">
                                                        {
                                                            certificateArr.map((item, index) =>
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
                                                                                        certificateArr.splice(index, 1);
                                                                                        setCertificateArr([...certificateArr], certificateArr)
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
                                                                                <span className="input-title">Sertifikat??n (v??siq??nin) ad?? *</span>
                                                                                <Form.Label>
                                                                                    <Select
                                                                                        placeholder="Ad?? se??in"
                                                                                        value={item.certificateId || ''}
                                                                                        onChange={(val) => {
                                                                                            certificateArr[index].certificateId = val;
                                                                                            setCertificateArr([...certificateArr], certificateArr)
                                                                                        }}
                                                                                        isSearchable={certificate ? certificate.length > 5 : false}
                                                                                        options={certificate}
                                                                                        getOptionLabel={(option) => (option.name)}
                                                                                        getOptionValue={option => option.name}
                                                                                        styles={customStyles}
                                                                                    />
                                                                                </Form.Label>
                                                                                <div
                                                                                    className="validation-block flex-start">
                                                                                    {

                                                                                        errors['educationInformation.certificates[].certificateId'] !== '' ?
                                                                                            <span
                                                                                                className="text-validation">{errors['educationInformation.certificates[].certificateId']}</span>
                                                                                            : null
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">Q??vv??d?? olma m??dd??ti</span>
                                                                                <Form.Label className="relative m-0">
                                                                                    <DatePicker
                                                                                        value={item.endDate || ''}
                                                                                        dateFormat="dd-MM-yyyy"
                                                                                        placeholderText="YYYY-MM-DD"
                                                                                        showMonthDropdown
                                                                                        showYearDropdown
                                                                                        dropdownMode="select"
                                                                                        onChange={(date) => {
                                                                                            certificateArr[index].endDate = moment(date).format("YYYY-MM-DD");
                                                                                            setCertificateArr([...certificateArr], certificateArr)
                                                                                        }}/>
                                                                                    <Button className="btn-transparent">
                                                                                        <svg width="18" height="18"
                                                                                             viewBox="0 0 18 18"
                                                                                             fill="none"
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
                                                                    </Row>

                                                                </div>
                                                            )
                                                        }
                                                        <div className="flex-end">
                                                            <Button type="button" className="btn-main-text"
                                                                    onClick={() => addCertificate()}>
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
                                            <div className="check-block-list">
                                                <div className="add-block">
                                                    <div className="block-title flex-center">
                                                        <div className="check-block">
                                                            <label className="check-button">
                                                                <input type="checkbox"
                                                                       name="checkAcademic"
                                                                       checked={showDegree}
                                                                       onChange={(e) => {
                                                                           setShowDegree(e.target.checked);
                                                                       }}/>
                                                                <span className="checkmark"/>
                                                            </label>
                                                        </div>
                                                        Elmi d??r??c??
                                                    </div>
                                                    {
                                                        showDegree ?
                                                            <div className="block-inn">
                                                                <Row>
                                                                    <Col xs={4}>
                                                                        <Form.Group className="form-group">
                                                                            <span className="input-title"> Verilm?? tarixi</span>
                                                                            <Form.Label className="relative m-0">
                                                                                <DatePicker
                                                                                    selected={startAcademicDegreeDate}
                                                                                    dateFormat="dd-MM-yyyy"
                                                                                    placeholderText="YYYY-MM-DD"
                                                                                    showMonthDropdown
                                                                                    showYearDropdown
                                                                                    dropdownMode="select"
                                                                                    onChange={(date) => setStartAcademicDegreeDate(date)}/>
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
                                                                    <Col xs={4}>
                                                                        <Form.Group className="form-group">
                                                                            <span className="input-title">S??n??din n??mr??si</span>
                                                                            <Form.Label>
                                                                                <Form.Control
                                                                                    placeholder="S??n??din n??mr??si daxil et"
                                                                                    value={academicDegreeNumber || ''}
                                                                                    onChange={(e => setAcademicDegreeNumber(e.target.value))}/>
                                                                            </Form.Label>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col xs={4}>
                                                                        <Form.Group className="form-group">
                                                                            <span
                                                                                className="input-title">Ver??n orqan</span>
                                                                            <Form.Label>
                                                                                <Form.Control
                                                                                    placeholder="Ver??n orqan daxil et"
                                                                                    value={academicDegreeOrganization || ''}
                                                                                    onChange={(e => setAcademicDegreeOrganization(e.target.value))}/>
                                                                            </Form.Label>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            : null
                                                    }
                                                </div>
                                                <div className="add-block">
                                                    <div className="block-title flex-center">
                                                        <div className="check-block">
                                                            <label className="check-button">
                                                                <input type="checkbox"
                                                                       name="checkDriver"
                                                                       checked={showDriverLicence}
                                                                       onChange={(e) => {
                                                                           setShowDriverLicence(e.target.checked);
                                                                       }}/>
                                                                <span className="checkmark"/>
                                                            </label>
                                                        </div>
                                                        S??r??c??l??k v??siq??si
                                                    </div>
                                                    {
                                                        showDriverLicence ?
                                                            <div className="block-inn">
                                                                <Row>
                                                                    <Col xs={6}>
                                                                        <Form.Group className="form-group">
                                                                            <span
                                                                                className="input-title">Kateqoriya</span>
                                                                            <Form.Label>
                                                                                <Select
                                                                                    placeholder="Kateqoriya daxil edin"
                                                                                    value={selectedDriverLicence || ''}
                                                                                    onChange={(val) => {
                                                                                        setSelectedDriverLicence(val)
                                                                                    }}
                                                                                    isSearchable={driverLicenceOptions ? driverLicenceOptions.length > 5 : false}
                                                                                    options={driverLicenceOptions}
                                                                                    getOptionLabel={(option) => (option.label)}
                                                                                    getOptionValue={(option) => (option.label)}
                                                                                    styles={customStyles}
                                                                                />
                                                                            </Form.Label>
                                                                        </Form.Group>
                                                                    </Col>

                                                                    <Col xs={6}>
                                                                        <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">Q??vv??d?? olma m??dd??ti</span>
                                                                            <Form.Label className="relative m-0">
                                                                                <DatePicker
                                                                                    selected={expiredDriverLicenceDate}
                                                                                    dateFormat="dd-MM-yyyy"
                                                                                    placeholderText="YYYY-MM-DD"
                                                                                    showMonthDropdown
                                                                                    showYearDropdown
                                                                                    dropdownMode="select"
                                                                                    onChange={(date) => setExpiredDriverLicenceDate(date)}/>
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
                                                                </Row>
                                                            </div>
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex-vertical-center btn-block">
                                                <Button className="btn-effect w-200"
                                                        onClick={() => sendEducationData()}>
                                                    Yadda saxla
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Tab>
                                <Tab eventKey="company" title="??m??k f??aliyy??ti">
                                    <div className="block  ">
                                        <div className="inner-tab flex-vertical-center">
                                            <Tabs activeKey={tab} onSelect={(k) => setTab(k)}>
                                                <Tab eventKey="internal" title="Daxili">
                                                    <Form className="form-list">
                                                        <div className="add-block">
                                                            <div className="block-title">
                                                                Limana q??d??r ??m??k f??aliyy??ti bar??d?? m??lumatlar
                                                            </div>
                                                            <div className="block-inn">
                                                                <div className="addition-content">
                                                                    {
                                                                        companyIntArr.map((item, index) =>
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
                                                                                                    companyIntArr.splice(index, 1);
                                                                                                    setCompanyIntArr([...companyIntArr], companyIntArr)
                                                                                                }}>
                                                                                                <svg width="14"
                                                                                                     height="14"
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
                                                                                <div>
                                                                                    <div className="radio-content">
                                                                                        <h5>??sas i?? yeridir yoxsa ??lav??
                                                                                            i??
                                                                                            yeri?</h5>
                                                                                        <div className="flex-start">
                                                                                            <div
                                                                                                className="radio-block">
                                                                                                <label
                                                                                                    className="radio-label">
                                                                                                    <input type="radio"
                                                                                                           name={`${index}radioInternal`}
                                                                                                           checked={item.mainJob}
                                                                                                           onChange={() => {
                                                                                                               companyIntArr[index].mainJob = true;
                                                                                                               setCompanyIntArr([...companyIntArr], companyIntArr)
                                                                                                           }}/>
                                                                                                    <span className="radio-mark"/>
                                                                                                </label>
                                                                                                <span
                                                                                                    className="radio-title">??sas i?? yeri</span>
                                                                                            </div>
                                                                                            <div
                                                                                                className="radio-block">
                                                                                                <label
                                                                                                    className="radio-label">
                                                                                                    <input type="radio"
                                                                                                           name={`${index}radioInternal`}
                                                                                                           checked={!item.mainJob}
                                                                                                           onChange={() => {
                                                                                                               companyIntArr[index].mainJob = false;
                                                                                                               setCompanyIntArr([...companyIntArr], companyIntArr)
                                                                                                           }}/>
                                                                                                    <span className="radio-mark"/>
                                                                                                </label>
                                                                                                <span
                                                                                                    className="radio-title">??lav?? i?? yeri</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <Row>
                                                                                        <Col xs={6}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">??????inin i??l??diyi ??irk??t</span>
                                                                                                <Form.Label>
                                                                                                    <Form.Control
                                                                                                        placeholder="??irk??t daxil et"
                                                                                                        value={item.company || ''}
                                                                                                        onChange={(e) => {
                                                                                                            companyIntArr[index].company = e.target.value;
                                                                                                            setCompanyIntArr([...companyIntArr], companyIntArr)
                                                                                                        }}/>
                                                                                                </Form.Label>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col xs={6}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                            <span
                                                                                className="input-title">Struktur b??lm??</span>
                                                                                                <Form.Label>
                                                                                                    <Form.Control
                                                                                                        placeholder="Struktur b??lm?? daxil et"
                                                                                                        value={item.department || ''}
                                                                                                        onChange={(e) => {
                                                                                                            companyIntArr[index].department = e.target.value;
                                                                                                            setCompanyIntArr([...companyIntArr], companyIntArr)
                                                                                                        }}/>
                                                                                                </Form.Label>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col xs={4}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">Alt struktur b??lm??</span>
                                                                                                <Form.Label>
                                                                                                    <Form.Control
                                                                                                        placeholder="Alt struktur  b??lm?? daxil et"
                                                                                                        value={item.subDepartment || ''}
                                                                                                        onChange={(e) => {
                                                                                                            companyIntArr[index].subDepartment = e.target.value;
                                                                                                            setCompanyIntArr([...companyIntArr], companyIntArr)
                                                                                                        }}/>
                                                                                                </Form.Label>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col xs={4}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">??????inin i??l??diyi v??zif??</span>
                                                                                                <Form.Label>
                                                                                                    <Form.Control
                                                                                                        placeholder="Struktur b??lm?? daxil et"
                                                                                                        value={item.position || ''}
                                                                                                        onChange={(e) => {
                                                                                                            companyIntArr[index].position = e.target.value;
                                                                                                            setCompanyIntArr([...companyIntArr], companyIntArr)
                                                                                                        }}/>
                                                                                                </Form.Label>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col xs={4}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">?????? q??bul tarixi</span>
                                                                                                <Form.Label
                                                                                                    className="relative m-0">
                                                                                                    <DatePicker
                                                                                                        value={item.startDate || ''}
                                                                                                        dateFormat="dd-MM-yyyy"
                                                                                                        placeholderText="YYYY-MM-DD"
                                                                                                        showMonthDropdown
                                                                                                        showYearDropdown
                                                                                                        dropdownMode="select"
                                                                                                        onChange={(date) => {
                                                                                                            companyIntArr[index].startDate = moment(date).format("YYYY-MM-DD");
                                                                                                            setCompanyIntArr([...companyIntArr], companyIntArr)
                                                                                                        }}/>
                                                                                                    <Button
                                                                                                        className="btn-transparent">
                                                                                                        <svg width="18"
                                                                                                             height="18"
                                                                                                             viewBox="0 0 18 18"
                                                                                                             fill="none"
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
                                                                                                                <clipPath
                                                                                                                    id="clip0">
                                                                                                                    <rect
                                                                                                                        width="17.399"
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
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">????d??n azad tarixi</span>
                                                                                                <Form.Label
                                                                                                    className="relative m-0">
                                                                                                    <DatePicker
                                                                                                        value={item.endDate || ''}
                                                                                                        dateFormat="dd-MM-yyyy"
                                                                                                        placeholderText="YYYY-MM-DD"
                                                                                                        showMonthDropdown
                                                                                                        showYearDropdown
                                                                                                        dropdownMode="select"
                                                                                                        onChange={(date) => {
                                                                                                            companyIntArr[index].endDate = moment(date).format("YYYY-MM-DD");
                                                                                                            setCompanyIntArr([...companyIntArr], companyIntArr)
                                                                                                        }}/>
                                                                                                    <Button
                                                                                                        className="btn-transparent">
                                                                                                        <svg width="18"
                                                                                                             height="18"
                                                                                                             viewBox="0 0 18 18"
                                                                                                             fill="none"
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
                                                                                                                <clipPath
                                                                                                                    id="clip0">
                                                                                                                    <rect
                                                                                                                        width="17.399"
                                                                                                                        height="18"
                                                                                                                        fill="white"
                                                                                                                        transform="translate(0.449219)"/>
                                                                                                                </clipPath>
                                                                                                            </defs>
                                                                                                        </svg>
                                                                                                    </Button>
                                                                                                </Form.Label>
                                                                                                <div
                                                                                                    className="validation-block flex-start">
                                                                                                    {

                                                                                                        errors['businessInformation.endDate'] !== '' ?
                                                                                                            <span
                                                                                                                className="text-validation">{errors['businessInformation.endDate']}</span>
                                                                                                            : null
                                                                                                    }
                                                                                                </div>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col xs={6}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">????d??n azad olma madd??si</span>
                                                                                                <Form.Label>
                                                                                                    <Form.Control
                                                                                                        placeholder="????d??n azad olma madd??si  daxil et"
                                                                                                        value={item.dismissalReason || ''}
                                                                                                        onChange={(e) => {
                                                                                                            companyIntArr[index].dismissalReason = e.target.value;
                                                                                                            setCompanyIntArr([...companyIntArr], companyIntArr)
                                                                                                        }}/>
                                                                                                </Form.Label>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col xs={6}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">???? statusu</span>
                                                                                                <Select
                                                                                                    placeholder="???? statusu se??in"
                                                                                                    value={item.businessStatus || ''}
                                                                                                    onChange={(val) => {
                                                                                                        companyIntArr[index].businessStatus = val;
                                                                                                        setCompanyIntArr([...companyIntArr], companyIntArr)
                                                                                                    }}
                                                                                                    isSearchable={businessOptions ? businessOptions.length > 5 : false}
                                                                                                    options={businessOptions}
                                                                                                    getOptionLabel={(option) => (option.label)}
                                                                                                    getOptionValue={option => option.label}
                                                                                                    styles={customStyles}
                                                                                                />
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    <div className="flex-end">
                                                                        <Button type="button" className="btn-main-text"
                                                                                onClick={() => addCompanyInt()}>
                                                                            <svg width="12" height="12"
                                                                                 viewBox="0 0 12 12"
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
                                                        <div className="flex-vertical-center btn-block">
                                                            <Button className="btn-effect w-200"
                                                                    onClick={() => sendCompanyData()}>
                                                                Yadda saxla
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                </Tab>
                                                <Tab eventKey="external" title="Xarici">
                                                    <Form className="form-list">
                                                        <div className="add-block">
                                                            <div className="block-title">
                                                                Limana q??d??r ??m??k f??aliyy??ti bar??d?? m??lumatlar
                                                            </div>
                                                            <div className="block-inn">
                                                                <div className="addition-content">
                                                                    {
                                                                        companyExtArr.map((item, index) =>
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
                                                                                                    companyExtArr.splice(index, 1);
                                                                                                    setCompanyExtArr([...companyExtArr], companyExtArr)
                                                                                                }}>
                                                                                                <svg width="14"
                                                                                                     height="14"
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
                                                                                <div>
                                                                                    <div className="radio-content">
                                                                                        <h5>??sas i?? yeridir yoxsa ??lav??
                                                                                            i??
                                                                                            yeri?</h5>
                                                                                        <div className="flex-start">
                                                                                            <div
                                                                                                className="radio-block">
                                                                                                <label
                                                                                                    className="radio-label">
                                                                                                    <input type="radio"
                                                                                                           name={`${index}radioExternal`}
                                                                                                           checked={item.mainJob}
                                                                                                           onChange={() => {
                                                                                                               companyExtArr[index].mainJob = true;
                                                                                                               setCompanyExtArr([...companyExtArr], companyExtArr)
                                                                                                           }}/>
                                                                                                    <span className="radio-mark"/>
                                                                                                </label>
                                                                                                <span
                                                                                                    className="radio-title">??sas i?? yeri</span>
                                                                                            </div>
                                                                                            <div
                                                                                                className="radio-block">
                                                                                                <label
                                                                                                    className="radio-label">
                                                                                                    <input type="radio"
                                                                                                           name={`${index}radioExternal`}
                                                                                                           checked={!item.mainJob}
                                                                                                           onChange={() => {
                                                                                                               companyExtArr[index].mainJob = false;
                                                                                                               setCompanyExtArr([...companyExtArr], companyExtArr)
                                                                                                           }}/>
                                                                                                    <span className="radio-mark"/>
                                                                                                </label>
                                                                                                <span
                                                                                                    className="radio-title">??lav?? i?? yeri</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <Row>
                                                                                        <Col xs={6}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">??????inin i??l??diyi ??irk??t</span>
                                                                                                <Form.Label>
                                                                                                    <Form.Control
                                                                                                        placeholder="??irk??t daxil et"
                                                                                                        value={item.company || ''}
                                                                                                        onChange={(e) => {
                                                                                                            companyExtArr[index].company = e.target.value;
                                                                                                            setCompanyExtArr([...companyExtArr], companyExtArr)
                                                                                                        }}/>
                                                                                                </Form.Label>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col xs={6}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                            <span
                                                                                className="input-title">Struktur b??lm??</span>
                                                                                                <Form.Label>
                                                                                                    <Form.Control
                                                                                                        placeholder="Struktur b??lm?? daxil et"
                                                                                                        value={item.department || ''}
                                                                                                        onChange={(e) => {
                                                                                                            companyExtArr[index].department = e.target.value;
                                                                                                            setCompanyExtArr([...companyExtArr], companyExtArr)
                                                                                                        }}/>
                                                                                                </Form.Label>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col xs={4}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">Alt struktur b??lm??</span>
                                                                                                <Form.Label>
                                                                                                    <Form.Control
                                                                                                        placeholder="Alt struktur  b??lm?? daxil et"
                                                                                                        value={item.subDepartment || ''}
                                                                                                        onChange={(e) => {
                                                                                                            companyExtArr[index].subDepartment = e.target.value;
                                                                                                            setCompanyExtArr([...companyExtArr], companyExtArr)
                                                                                                        }}/>
                                                                                                </Form.Label>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col xs={4}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">??????inin i??l??diyi v??zif??</span>
                                                                                                <Form.Label>
                                                                                                    <Form.Control
                                                                                                        placeholder="Struktur b??lm?? daxil et"
                                                                                                        value={item.position || ''}
                                                                                                        onChange={(e) => {
                                                                                                            companyExtArr[index].position = e.target.value;
                                                                                                            setCompanyExtArr([...companyExtArr], companyExtArr)
                                                                                                        }}/>
                                                                                                </Form.Label>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col xs={4}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">?????? q??bul tarixi</span>
                                                                                                <Form.Label
                                                                                                    className="relative m-0">
                                                                                                    <DatePicker
                                                                                                        value={item.startDate || ''}
                                                                                                        dateFormat="dd-MM-yyyy"
                                                                                                        placeholderText="YYYY-MM-DD"
                                                                                                        showMonthDropdown
                                                                                                        showYearDropdown
                                                                                                        dropdownMode="select"
                                                                                                        onChange={(date) => {
                                                                                                            companyExtArr[index].startDate = moment(date).format("YYYY-MM-DD");
                                                                                                            setCompanyExtArr([...companyExtArr], companyExtArr)
                                                                                                        }}/>
                                                                                                    <Button
                                                                                                        className="btn-transparent">
                                                                                                        <svg width="18"
                                                                                                             height="18"
                                                                                                             viewBox="0 0 18 18"
                                                                                                             fill="none"
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
                                                                                                                <clipPath
                                                                                                                    id="clip0">
                                                                                                                    <rect
                                                                                                                        width="17.399"
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
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">????d??n azad tarixi</span>
                                                                                                <Form.Label
                                                                                                    className="relative m-0">
                                                                                                    <DatePicker
                                                                                                        value={item.endDate || ''}
                                                                                                        dateFormat="dd-MM-yyyy"
                                                                                                        placeholderText="YYYY-MM-DD"
                                                                                                        showMonthDropdown
                                                                                                        showYearDropdown
                                                                                                        dropdownMode="select"
                                                                                                        onChange={(date) => {
                                                                                                            companyExtArr[index].endDate = moment(date).format("YYYY-MM-DD");
                                                                                                            setCompanyExtArr([...companyExtArr], companyExtArr)
                                                                                                        }}/>
                                                                                                    <Button
                                                                                                        className="btn-transparent">
                                                                                                        <svg width="18"
                                                                                                             height="18"
                                                                                                             viewBox="0 0 18 18"
                                                                                                             fill="none"
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
                                                                                                                <clipPath
                                                                                                                    id="clip0">
                                                                                                                    <rect
                                                                                                                        width="17.399"
                                                                                                                        height="18"
                                                                                                                        fill="white"
                                                                                                                        transform="translate(0.449219)"/>
                                                                                                                </clipPath>
                                                                                                            </defs>
                                                                                                        </svg>
                                                                                                    </Button>
                                                                                                </Form.Label>
                                                                                                <div
                                                                                                    className="validation-block flex-start">
                                                                                                    {

                                                                                                        errors['businessInformation.endDate'] !== '' ?
                                                                                                            <span
                                                                                                                className="text-validation">{errors['businessInformation.endDate']}</span>
                                                                                                            : null
                                                                                                    }
                                                                                                </div>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col xs={6}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">????d??n azad olma madd??si</span>
                                                                                                <Form.Label>
                                                                                                    <Form.Control
                                                                                                        placeholder="????d??n azad olma madd??si  daxil et"
                                                                                                        value={item.dismissalReason || ''}
                                                                                                        onChange={(e) => {
                                                                                                            companyExtArr[index].dismissalReason = e.target.value;
                                                                                                            setCompanyExtArr([...companyExtArr], companyExtArr)
                                                                                                        }}/>
                                                                                                </Form.Label>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col xs={6}>
                                                                                            <Form.Group
                                                                                                className="form-group">
                                                                                                <span
                                                                                                    className="input-title">???? statusu</span>
                                                                                                <Select
                                                                                                    placeholder="???? statusu se??in"
                                                                                                    value={item.businessStatus || ''}
                                                                                                    onChange={(val) => {
                                                                                                        companyExtArr[index].businessStatus = val;
                                                                                                        setCompanyExtArr([...companyExtArr], companyExtArr)
                                                                                                    }}
                                                                                                    isSearchable={businessOptions ? businessOptions.length > 5 : false}
                                                                                                    options={businessOptions}
                                                                                                    getOptionLabel={(option) => (option.label)}
                                                                                                    getOptionValue={option => option.label}
                                                                                                    styles={customStyles}
                                                                                                />
                                                                                            </Form.Group>
                                                                                        </Col>

                                                                                    </Row>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    <div className="flex-end">
                                                                        <Button type="button" className="btn-main-text"
                                                                                onClick={() => addCompanyExt()}>
                                                                            <svg width="12" height="12"
                                                                                 viewBox="0 0 12 12"
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
                                                        <div className="flex-vertical-center btn-block">
                                                            <Button className="btn-effect w-200"
                                                                    onClick={() => sendCompanyData()}>
                                                                Yadda saxla
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="bank" title="Bank m.">
                                    <div className="block">
                                        <Form className="form-list">
                                            <div className="add-block">
                                                <div className="block-title">
                                                    Bank haqq??nda m??lumatlar
                                                </div>
                                                <div className="block-inn">
                                                    <Row>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Bank hesab??n?? daxil edin</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        placeholder="Bank hesab??n?? daxil edin"
                                                                        value={bankAccount || ''}
                                                                        onChange={(e => setBankAccount(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            <div className="flex-vertical-center btn-block">
                                                <Button className="btn-effect w-200" onClick={() => sendBankData()}>
                                                    Yadda saxla
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Tab>
                                <Tab eventKey="other" title="Dig??r m??lumatlar">
                                    <div className="block">
                                        <Form className="form-list">
                                            <div className="add-block">
                                                <div className="block-title">
                                                    D??vl??t t??ltifl??ri, f??xri adlar
                                                </div>
                                                <div className="block-inn">
                                                    <div className="addition-content">
                                                        {
                                                            rewardArr.map((item, index) =>
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
                                                                                            rewardArr.splice(index, 1);
                                                                                            setRewardArr([...rewardArr], rewardArr)
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
                                                                        <Row key={index}>
                                                                            <Col xs={4}>
                                                                                <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">T??ltifin ad?? *</span>
                                                                                    <Form.Label>
                                                                                        <Select
                                                                                            placeholder="T??ltifin ad?? se??in"
                                                                                            value={item.honoraryDecreeId || ''}
                                                                                            onChange={(val) => {
                                                                                                rewardArr[index].honoraryDecreeId = val;
                                                                                                setRewardArr([...rewardArr], rewardArr)
                                                                                            }}
                                                                                            isSearchable={reward ? reward.length > 5 : false}
                                                                                            options={reward}
                                                                                            getOptionLabel={(option) => (option.name)}
                                                                                            getOptionValue={option => option.name}
                                                                                            styles={customStyles}
                                                                                        />
                                                                                    </Form.Label>
                                                                                    <div
                                                                                        className="validation-block flex-start">
                                                                                        {

                                                                                            errors['honoraryAchievements[].honoraryDecreeId'] !== '' ?
                                                                                                <span
                                                                                                    className="text-validation">{errors['honoraryAchievements[].honoraryDecreeId']}</span>
                                                                                                : null
                                                                                        }
                                                                                    </div>
                                                                                </Form.Group>
                                                                            </Col>
                                                                            <Col xs={4}>
                                                                                <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">T??ltifi ver??n orqan??n ad?? *</span>
                                                                                    <Form.Label>
                                                                                        <Select
                                                                                            value={item.organizationId || ''}
                                                                                            placeholder="T??ltifi ver??n orqan?? se??in"
                                                                                            onChange={(val) => {
                                                                                                rewardArr[index].organizationId = val;
                                                                                                setRewardArr([...rewardArr], rewardArr);
                                                                                            }}
                                                                                            isSearchable={rewardOrganization ? rewardOrganization.length > 5  : false}
                                                                                            options={rewardOrganization}
                                                                                            getOptionLabel={(option) => (option.name)}
                                                                                            getOptionValue={option => option.name}
                                                                                            styles={customStyles}
                                                                                        />
                                                                                    </Form.Label>
                                                                                    <div
                                                                                        className="validation-block flex-start">
                                                                                        {

                                                                                            errors['honoraryAchievements[].organizationId'] !== '' ?
                                                                                                <span
                                                                                                    className="text-validation">{errors['honoraryAchievements[].organizationId']}</span>
                                                                                                : null
                                                                                        }
                                                                                    </div>
                                                                                </Form.Group>
                                                                            </Col>
                                                                            <Col xs={4}>
                                                                                <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">T??ltifin verilm?? tarixi</span>
                                                                                    <Form.Label className="relative m-0">
                                                                                        <DatePicker
                                                                                            value={item.givenDate || ''}
                                                                                            dateFormat="dd-MM-yyyy"
                                                                                            placeholderText="YYYY-MM-DD"
                                                                                            showMonthDropdown
                                                                                            showYearDropdown
                                                                                            dropdownMode="select"
                                                                                            onChange={(date) => {
                                                                                                rewardArr[index].givenDate = moment(date).format("YYYY-MM-DD");
                                                                                                setRewardArr([...rewardArr], rewardArr)
                                                                                            }}/>
                                                                                        <Button className="btn-transparent">
                                                                                            <svg width="18" height="18"
                                                                                                 viewBox="0 0 18 18"
                                                                                                 fill="none"
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
                                                                        </Row>
                                                                    </div>
                                                            )
                                                        }
                                                        <div className="flex-end">
                                                            <Button type="button" className="btn-main-text"
                                                                    onClick={() => addReward()}>
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

                                            <div className="add-block">
                                                <div className="block-title">
                                                    Sosial s????orta ????had??tnam??si
                                                </div>
                                                <div className="block-inn">
                                                    <Row>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">S.s ????had??tnam??sinin n??mr??si</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        placeholder="N??mr??ni daxil edin"
                                                                        value={warrantyNumber || ''}
                                                                        onChange={(e => setWarrantyNumber(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={8}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">??????inin aid oldu kvota ??zr?? m??lumatlar</span>
                                                                <Form.Label className="relative m-0">
                                                                    <Select
                                                                        placeholder="??????inin aid oldu kvotan?? se??in"
                                                                        value={selectedQuota || ''}
                                                                        onChange={(val) => {
                                                                            setSelectedQuota(val);
                                                                            setQuotaArr(val)
                                                                        }}
                                                                        isSearchable={quota ? quota.length > 5  : false}
                                                                        isMulti
                                                                        options={quota}
                                                                        getOptionLabel={(option) => (option.label)}
                                                                        styles={customStyles}
                                                                    />
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>

                                            <div className="add-block">
                                                <div className="block-title">
                                                    Ail?? t??rkibi haqq??nda
                                                </div>
                                                <div className="block-inn">
                                                    <div className="addition-content">
                                                        {
                                                            familyMemberArr.map((item, index) =>
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
                                                                                        familyMemberArr.splice(index, 1);
                                                                                        setFamilyMemberArr([...familyMemberArr], familyMemberArr)
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
                                                                            className="input-title">Ail?? ??zv??</span>
                                                                                <Form.Label>
                                                                                    <Select
                                                                                        placeholder="Ail?? ??zv?? daxil edin"
                                                                                        value={item.relationType || ''}
                                                                                        onChange={(val) => {
                                                                                            familyMemberArr[index].relationType = val;
                                                                                            setFamilyMemberArr([...familyMemberArr], familyMemberArr)
                                                                                        }}
                                                                                        isSearchable={relationTypeOptions ? relationTypeOptions.length > 5 : false}
                                                                                        options={relationTypeOptions}
                                                                                        getOptionLabel={(option) => (option.label)}
                                                                                        styles={customStyles}
                                                                                    />
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">Soyad??, ad??, ata ad??</span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="Soyad??, ad??, ata ad?? daxil edin"
                                                                                        value={item.fullName || ''}
                                                                                        onChange={(e) => {
                                                                                            familyMemberArr[index].fullName = e.target.value;
                                                                                            setFamilyMemberArr([...familyMemberArr], familyMemberArr)
                                                                                        }}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">Do??um tarixi</span>
                                                                                <Form.Label className="relative m-0">
                                                                                    <DatePicker
                                                                                        value={item.birthDate || ''}
                                                                                        placeholderText="YYYY-MM-DD"
                                                                                        dateFormat="dd-MM-yyyy"
                                                                                        showMonthDropdown
                                                                                        showYearDropdown
                                                                                        showIcon={false}
                                                                                        dropdownMode="select"
                                                                                        onChange={(date) => {
                                                                                            familyMemberArr[index].birthDate = moment(date).format("YYYY-MM-DD");
                                                                                            setFamilyMemberArr([...familyMemberArr], familyMemberArr)
                                                                                        }}/>
                                                                                    <Button className="btn-transparent">
                                                                                        <svg width="18" height="18"
                                                                                             viewBox="0 0 18 18"
                                                                                             fill="none"
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
                                                                            <span
                                                                                className="input-title">Do??um yeri</span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="Do??um yeri daxil edin"
                                                                                        value={item.birthplace || ''}
                                                                                        onChange={(e) => {
                                                                                            familyMemberArr[index].birthplace = e.target.value;
                                                                                            setFamilyMemberArr([...familyMemberArr], familyMemberArr)
                                                                                        }}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <Form.Group className="form-group">
                                                                                <span
                                                                                    className="input-title">???? yeri</span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="Yeri daxil edin"
                                                                                        value={item.workPlace || ''}
                                                                                        onChange={(e) => {
                                                                                            familyMemberArr[index].workPlace = e.target.value;
                                                                                            setFamilyMemberArr([...familyMemberArr], familyMemberArr)
                                                                                        }}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <Form.Group className="form-group">
                                                                            <span
                                                                                className="input-title">V??zif??si</span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="V??zif?? daxil edin"
                                                                                        value={item.position || ''}
                                                                                        onChange={(e) => {
                                                                                            familyMemberArr[index].position = e.target.value;
                                                                                            setFamilyMemberArr([...familyMemberArr], familyMemberArr)
                                                                                        }}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <Form.Group className="form-group">
                                                                                <span
                                                                                    className="input-title">Ya??ay????</span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="Ya??ay???? daxil edin"
                                                                                        value={item.address || ''}
                                                                                        onChange={(e) => {
                                                                                            familyMemberArr[index].address = e.target.value;
                                                                                            setFamilyMemberArr([...familyMemberArr], familyMemberArr)
                                                                                        }}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            )
                                                        }
                                                        <div className="flex-end">
                                                            <Button type="button" className="btn-main-text"
                                                                    onClick={() => addFamilyMember()}>
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
                                            <div className="radio-question">
                                                <Row>
                                                    <Col xs={6}>
                                                        <div className="radio-content">
                                                            <h5>M??hkum olmusunuzmu?</h5>
                                                            <div className="flex-start">
                                                                <div className="radio-block">
                                                                    <label className="radio-label">
                                                                        <input type="radio" name="prisoner"
                                                                               checked={checkPrisoner}
                                                                               onChange={() => {
                                                                                   setCheckPrisoner(true)
                                                                               }}/>
                                                                        <span className="radio-mark"/>
                                                                    </label>
                                                                    <span className="radio-title">B??li</span>
                                                                </div>
                                                                <div className="radio-block">
                                                                    <label className="radio-label">
                                                                        <input type="radio" name="prisoner"
                                                                               checked={!checkPrisoner}
                                                                               onChange={() => {
                                                                                   setCheckPrisoner(false)
                                                                               }}/>
                                                                        <span className="radio-mark"/>
                                                                    </label>
                                                                    <span className="radio-title">Xeyr</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className="radio-content">
                                                            <h5>H??mkarlar ittifaq??n??n ??zv??s??n??zm???</h5>
                                                            <div className="flex-start">
                                                                <div className="radio-block">
                                                                    <label className="radio-label">
                                                                        <input type="radio" name="colleague"
                                                                               checked={checkColleague}
                                                                               onChange={() => {
                                                                                   setCheckColleague(true)
                                                                               }}/>
                                                                        <span className="radio-mark"/>
                                                                    </label>
                                                                    <span className="radio-title">B??li</span>
                                                                </div>
                                                                <div className="radio-block">
                                                                    <label className="radio-label">
                                                                        <input type="radio" name="colleague"
                                                                               checked={!checkColleague}
                                                                               onChange={() => {
                                                                                   setCheckColleague(false)
                                                                               }}/>
                                                                        <span className="radio-mark"/>
                                                                    </label>
                                                                    <span className="radio-title">Xeyr</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="flex-vertical-center btn-block">
                                                <Button className="btn-effect w-200" onClick={() => sendOtherData()}>
                                                    Yadda saxla
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Tab>
                                <Tab eventKey="operation" title="??mrl??r">
                                    <div className="block">
                                        <Table responsive="sm">
                                            <thead>
                                            <tr>
                                                <th>??d</th>
                                                <th>??mr</th>
                                                <th>Tarix</th>
                                                <th>Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                operation.length > 0 ?
                                                    operation.map((item, index) =>
                                                        <tr key={index}>
                                                            <td>{item.id}</td>
                                                            <td>
                                                                {
                                                                    item.type.length > 30 ?
                                                                        <OverlayTrigger placement="top-start"
                                                                                        overlay={<Tooltip
                                                                                            id="tooltip-disabled">{item.type}</Tooltip>} >
                                                                            <p className="m-0 operation-name">{item.type}</p>
                                                                        </OverlayTrigger>
                                                                        :
                                                                        <p className="m-0 operation-name">{item.type}</p>
                                                                }
                                                            </td>
                                                            <td>{item.createdAt}</td>
                                                            <td>
                                                                <div className="flex">
                                                                         <span className={statuses[item.statusAz]}>
                                                                             {item.statusAz}
                                                                         </span>
                                                                    <ul className="btn-block list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button className="btn-export"
                                                                                    onClick={() => getExportDocument(item.id, item.type)}>
                                                                                <svg width="20" height="20"
                                                                                     viewBox="0 0 22 22"
                                                                                     fill="none"
                                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M17.1875 19.25H4.81247C4.63013 19.25 4.45527 19.1776 4.32635 19.0486C4.19742 18.9197 4.125 18.7448 4.125 18.5625V3.4375C4.125 3.25517 4.19742 3.0803 4.32635 2.95137C4.45527 2.82244 4.63013 2.75 4.81247 2.75H13.0627L17.875 7.5625V18.5625C17.875 18.7448 17.8026 18.9197 17.6737 19.0486C17.5447 19.1776 17.3699 19.25 17.1875 19.25V19.25Z"
                                                                                        stroke="#040647"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"/>
                                                                                    <path
                                                                                        d="M13.0625 2.75V7.5625H17.8757"
                                                                                        stroke="#040647"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"/>
                                                                                    <path d="M8.25 11.6875H13.75"
                                                                                          stroke="#040647"
                                                                                          strokeLinecap="round"
                                                                                          strokeLinejoin="round"/>
                                                                                    <path d="M8.25 14.4375H13.75"
                                                                                          stroke="#040647"
                                                                                          strokeLinecap="round"
                                                                                          strokeLinejoin="round"/>
                                                                                </svg>

                                                                            </Button>
                                                                        </li>
                                                                        {
                                                                            item.statusAz === 'T??sdiq g??zl??yir' ?
                                                                                <li>
                                                                                    <Button className="btn-cancel"
                                                                                            onClick={() => changeStatus('REJECTED', item.id)}>
                                                                                        <svg width="14" height="14"
                                                                                             viewBox="0 0 12 12"
                                                                                             fill="none"
                                                                                             xmlns="http://www.w3.org/2000/svg">
                                                                                            <path
                                                                                                d="M5.99688 5.08435L11.0339 0.047383C11.0388 0.0422913 11.0438 0.0372908 11.0489 0.0323831C11.0489 0.0323654 11.0489 0.0323479 11.049 0.0323302L11.1531 0.140279C11.3516 -0.0514605 11.668 -0.0459554 11.8598 0.152578C12.0515 0.351111 12.046 0.667475 11.8475 0.859214L5.99688 5.08435ZM5.99688 5.08435L0.959034 0.0464826L0.95905 0.0464665L0.957171 0.0446523C0.69905 -0.204637 0.287728 -0.197483 0.038437 0.0606401C-0.20476 0.312441 -0.20476 0.711621 0.038437 0.963421L0.0384207 0.963437L0.0402643 0.965281L5.07811 6.00312L0.0402643 11.041L0.0402564 11.041C-0.213419 11.2947 -0.213419 11.706 0.0402564 11.9597L0.0402802 11.9597C0.293992 12.2134 0.705306 12.2134 0.959018 11.9597L0.959033 11.9597L5.99688 6.92189L11.0347 11.9597L11.0347 11.9597L11.0366 11.9616C11.2947 12.2109 11.706 12.2037 11.9553 11.9456L11.9553 11.9456C12.1985 11.6938 12.1985 11.2946 11.9553 11.0428L11.9553 11.0428L11.9535 11.041L6.91568 6.00312L11.9526 0.96616L5.99688 5.08435Z"
                                                                                                fill="#CF3131"
                                                                                                stroke="#CF3131"
                                                                                                strokeWidth="0.3"/>
                                                                                        </svg>
                                                                                    </Button>
                                                                                </li>
                                                                                : null
                                                                        }
                                                                        {
                                                                            item.statusAz === 'T??sdiq g??zl??yir' ?
                                                                                <li>
                                                                                    <Button className="btn-confirm"
                                                                                            onClick={() => changeStatus('APPROVED', item.id)}>
                                                                                        <svg width="16" height="12"
                                                                                             viewBox="0 0 16 12"
                                                                                             fill="none"
                                                                                             xmlns="http://www.w3.org/2000/svg">
                                                                                            <path
                                                                                                d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                                                                fill="#2ED06A"/>
                                                                                        </svg>
                                                                                    </Button>
                                                                                </li>
                                                                                : null
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                    :
                                                    emptyData ?
                                                        <EmptyData/>
                                                        : null
                                            }
                                            </tbody>
                                        </Table>
                                    </div>
                                    <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                                              click={(page) => getOperation(page)}/>
                                </Tab>
                                <Tab eventKey="vacation" title="M??zuniyy??t">
                                    <div className="block">
                                        <div className="table-striped">
                                            <Table responsive="sm">
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
                                    </div>
                                </Tab>
                                <Tab eventKey="salary" title="??m??k haqq??">
                                    <div className="block">
                                        <div className="table-striped">
                                            <Table responsive="sm">
                                                <thead>
                                                <tr>
                                                    <th>??tat ??m??k haqq??</th>
                                                    <th>??m??k ????raitin?? g??r?? ??lav?? ??m??k haqq??</th>
                                                    <th>F??rdi ??lav??si</th>
                                                    <th>F.D elmi d??r??c??sin?? g??r?? ??lav??</th>
                                                    <th>Ba??lan????c tarix</th>
                                                    <th>Son tarix</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    salaryArr.length > 0 ?
                                                        salaryArr.map((item, index) =>
                                                            <tr>
                                                                <td>{item.main}</td>
                                                                <td>{item.conditionalAddition}</td>
                                                                <td>{item.individualAddition}</td>
                                                                <td>{item.academicAddition}</td>
                                                                <td>{item.startDate}</td>
                                                                <td>{item.endDate}</td>
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
                                    </div>
                                </Tab>
                            </Tabs>
                    }
                </Container>
            </div>

        </Aux>

    );
}

export default EditEmployee
