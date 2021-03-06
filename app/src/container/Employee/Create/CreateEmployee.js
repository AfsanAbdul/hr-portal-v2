import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Button, Container, Row, Col, Form, Tabs, Tab, InputGroup, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import {mainAxios} from "../../../components/Axios/axios";
import DatePicker from "react-datepicker";
import userImage from '../../../assets/img/user.png';
import moment from 'moment';
import {uid} from 'react-uid';
import Swal from 'sweetalert2';
import {customStyles, customGroupStyles} from "../../../components/Select/SelectStyle";
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
    businessOptions
} from '../../../components/Select/SelectOptions';
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../../../components/Loading/Loading";

function EmployeeCreate() {

    const [key, setKey] = useState('general');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [dataVal, setDataVal] = useState('');

    /*check&visibility*/
    const [showPassport, setShowPassport] = useState(false);
    const [showButton, setShowButton] = useState(false);

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
    const [companyArr, setCompanyArr] = useState([{
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

    /*date*/
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

    const uploadImage = (event) => {
        let file = event.target.files[0]
        setPhoto(URL.createObjectURL(file));
        setUploadFile(file);
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

    const addReward = () => {
        setRewardArr(rewardArr => [...rewardArr, {
            givenDate: null,
            honoraryDecreeId: null,
            organizationId: null,
        }])
    }

    const addCompany = () => {
        setCompanyArr(companyArr => [...companyArr, {
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
            method: 'post',
            url: 'employees',
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setKey('contact');
            setShowButton(true);
            setDataVal(res.data);
            if (uploadFile !== "") sendImage(res.data)
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

    const sendGeneralUpdate = () => {
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
            url: `employees/${dataVal}`,
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setKey('contact');
            if (uploadFile !== "") sendImage(dataVal)
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
                "businessPhone": businessPhone !== '' ? plus.concat(businessPhone.toString()) : null,
                "email": email !== '' ? email : null,
                "homePhone": phoneNumber !== '' ? plus.concat(phoneNumber.toString()) : null,
                "internalPhone": businessInternalPhone !== '' ? plus.concat(businessInternalPhone.toString()) : null,
                "livingAddress": livingData,
                "mainMobile": mobileNumber1 !== '' ? plus.concat(mobileNumber1.toString()) : null,
                "registeredAddress": checkAddress ? livingData : registeredData,
                "secondaryMobile": mobileNumber2 !== '' ? plus.concat(mobileNumber2.toString()) : null,
                "sameAddress": checkAddress
            },
        }
        mainAxios({
            method: 'put',
            url: `employees/${dataVal}`,
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setKey('education');
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
            url: `employees/${dataVal}`,
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setKey('company');
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
        for (let i of companyArr) {
            if (i.businessData !== null) {
                i.businessData = i.businessData.value
            }
        }
        let data = {
            "businessInformationSet": companyArr,
        }
        mainAxios({
            method: 'put',
            url: `employees/${dataVal}`,
            data: data
        }).then((res) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                text: 'M??lumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setKey('other');
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

    const sendOtherData = () => {
        setLoading(true);
        let quotas = []
        for (let i of quotaArr) {
            quotas.push(i.value)
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
            url: `employees/${dataVal}`,
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

    const sendBankData = () => {
        setLoading(true);
        let data = {
            "account": {
                number: bankAccount
            },
        }
        mainAxios({
            method: 'put',
            url: `employees/${dataVal}`,
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


    const sendImage = (id) => {
        const formData = new FormData();
        formData.append("image", uploadFile);
        mainAxios({
            method: 'post',
            url: `employees/${id}/image`,
            data: formData
        }).then((res) => {
        });
    }

    useEffect(() => {
        getCity();
        getCountry();
        getRegion();
        getUniversity();
        getCitizenControl();
        getReward();
        getCertificate();
        getRewardOrganization();
    }, []);

    return (
        <Aux>
            <div className="create-staff">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title flex-center">
                            <Link to="/employee" className="flex">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.3333 14H7.58333M12.25 8.75L7 14L12.25 19.25" stroke="#193651"
                                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            ??????i ??lav?? et
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
                                                            <Image src={photo}/>
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
                                                                                  value={idCardNumber}
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
                                                                                  value={idCardPin}
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
                                                                                  placeholder="Soyad??, ad??, ata ad?? daxil edin"
                                                                                  value={fullName}
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
                                                                              value={countryBirth}
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
                                                                    getOptionValue={(option) => (option.name)}
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
                                                                                  value={idCardOrganization}
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
                                                                            isSearchable={militaryOptions ? militaryOptions.length > 5 : false}
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
                                                                                value={workPermissionSerial}
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
                                                                                value={workPermissionNumber}
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
                                                                                value={workPermissionPeriod}
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
                                                                    getOptionValue={(option) => (option.name)}
                                                                    styles={customStyles}
                                                                />
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
                                                                    getOptionValue={(option) => (option.name)}
                                                                    styles={customStyles}
                                                                />
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
                                                                    getOptionValue={(option) => (option.name)}
                                                                    styles={customStyles}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Q??s??b??</span>
                                                                <Form.Label>
                                                                    <Form.Control
                                                                        placeholder="??lk??ni daxil edin"
                                                                        value={settlement}
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
                                                                        value={street}
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
                                                                        value={block}
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
                                                                        value={apartment}
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
                                                                        value={home}
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
                                                                            getOptionValue={(option) => (option.name)}
                                                                            styles={customStyles}
                                                                        />
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
                                                                            getOption={(option) => (option.name)}
                                                                            styles={customStyles}
                                                                        />
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
                                                                            getOptionValue={(option) => (option.name)}
                                                                            styles={customStyles}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">Q??s??b??</span>
                                                                        <Form.Label>
                                                                            <Form.Control
                                                                                placeholder="??lk??ni daxil edin"
                                                                                value={settlement}
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
                                                                                value={street}
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
                                                                                value={block}
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
                                                                                value={apartment}
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
                                                                                value={home}
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
                                                                        <span className="input-title">??lk?? *</span>
                                                                        <Select
                                                                            placeholder="??lk?? se??in"
                                                                            value={selectedRegCountry}
                                                                            onChange={(val) => {
                                                                                setSelectedRegCountry(val);
                                                                            }}
                                                                            isSearchable={countries ? countries.length > 5 : false}
                                                                            options={countries}
                                                                            getOptionLabel={(option) => (option.name)}
                                                                            getOptionValue={(option) => (option.name)}
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
                                                                            getOptionValue={(option) => (option.name)}
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
                                                                            getOptionValue={(option) => (option.name)}
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
                                                                                value={registerSettlement}
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
                                                                                value={registerStreet}
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
                                                                                value={registerBlock}
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
                                                                                value={registerApartment}
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
                                                                                value={registerHome}
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
                                                                        value={phoneNumber}
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
                                                                        value={mobileNumber1}
                                                                        pattern="(^(\\+994)(50|51|55|60|70|77|99)\\d{7}$)|(^$)"
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
                                                                        value={mobileNumber2}
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
                                                                        value={businessPhone}
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
                                                                        value={businessInternalPhone}
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
                                                                        value={email}
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
                                                                        value={emailBusiness}
                                                                        onChange={(e => setEmailBusiness(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            {
                                                showButton ?
                                                    <ul className="flex-vertical-center btn-block list-unstyled">
                                                        <li>
                                                            <Button className="btn-transparent"
                                                                    onClick={() => {
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
                                                                    onClick={() => sendContactData()}>
                                                                Davam et
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                    : null
                                            }
                                        </Form>
                                    </div>
                                </Tab>
                                <Tab eventKey="education" title="T??hsil m??lumatlar??">
                                    <div className="block">
                                        <Form className="form-list">
                                            <div className="add-block">
                                                <div className="block-title">
                                                    T??hsil b??lm??si
                                                </div>
                                                <div className="radio-content-in">
                                                    <div className="flex-start">
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
                                                                                            onChange={(val) => {
                                                                                                educationArr[index].degree = val.value;
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
                                                                                            onChange={(val) => {
                                                                                                educationArr[index].institutionId = val.id;
                                                                                                setEducationArr([...educationArr], educationArr)
                                                                                            }}
                                                                                            isSearchable={university ? university.length > 5 : false}
                                                                                            options={university}
                                                                                            getOptionLabel={(option) => (option.name)}
                                                                                            getOptionValue={(option) => (option.name)}
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
                                                                                                value={item.endDate}
                                                                                                dateFormat="dd-MM-yyyy"
                                                                                                placeholderText="YYYY-MM-DD"
                                                                                                showMonthDropdown
                                                                                                showYearDropdown
                                                                                                dropdownMode="select"
                                                                                                onChange={(date) => {
                                                                                                    educationArr[index].endDate = moment(date).format("YYYY-MM-DD");
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
                                                                                                value={item.graduateDate}
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
                                                                                                value={item.diploma.givenDate}
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
                                                                                            placeholder="T??hsil formas?? se??in"
                                                                                            onChange={(val) => {
                                                                                                educationArr[index].educationType = val.value;
                                                                                                setEducationArr([...educationArr], educationArr)
                                                                                            }}
                                                                                            isSearchable={educationTypeOptions ? educationTypeOptions.length > 5 : false}
                                                                                            options={educationTypeOptions}
                                                                                            getOptionLabel={(option) => (option.label)}
                                                                                            getOptionValue={(option) => (option.label)}
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
                                                                                                        checked={item.foreignOption}
                                                                                                        onChange={(e) => {
                                                                                                            educationArr[index].foreignOption = e.target.checked;
                                                                                                            setEducationArr([...educationArr], educationArr)
                                                                                                        }}/>
                                                                                                    <span
                                                                                                        className="checkmark"/>
                                                                                                </label>
                                                                                            </div>
                                                                                            <span>Nostrifikasiya ????had??tnam??sinin n??mr??si</span>
                                                                                        </div>
                                                                                        <Form.Label>
                                                                                            <Form.Control
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
                                                                                <span className="input-title">Sertifikat??n (v??siq??nin) ad??</span>
                                                                                <Form.Label>
                                                                                    <Select
                                                                                        placeholder="Ad?? se??in"
                                                                                        onChange={(val) => {
                                                                                            certificateArr[index].certificateId = val.id;
                                                                                            setCertificateArr([...certificateArr], certificateArr)
                                                                                        }}
                                                                                        isSearchable={certificate ? certificate.length > 5 : false}
                                                                                        options={certificate}
                                                                                        getOptionLabel={(option) => (option.name)}
                                                                                        getOptionValue={(option) => (option.name)}
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
                                                                                        value={item.endDate}
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
                                                                                    value={academicDegreeNumber}
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
                                                                                    value={academicDegreeOrganization}
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
                                                                                    value={selectedDriverLicence}
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
                                            {
                                                showButton ?
                                                    <ul className="flex-vertical-center btn-block list-unstyled">
                                                        <li>
                                                            <Button className="btn-transparent"
                                                                    onClick={() => {
                                                                        setKey('contact')
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
                                                                    onClick={() => sendEducationData()}>
                                                                Davam et
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                    : null
                                            }
                                        </Form>
                                    </div>
                                </Tab>
                                <Tab eventKey="company" title="??m??k f??aliyy??ti">
                                    <div className="block">
                                        <Form className="form-list">
                                            <div className="add-block">
                                                <div className="block-title">
                                                    Limana q??d??r ??m??k f??aliyy??ti bar??d?? m??lumatlar
                                                </div>
                                                <div className="addition-content">
                                                    {
                                                        companyArr.map((item, index) =>
                                                            <div key={uid(item, index)}
                                                                 className={index === 0 ? '' : 'add-item'}>
                                                                {
                                                                    index === 0 ? null :
                                                                        <div className="add-item-top">
                                                                            <p className="m-0"> #{index + 1}. Dig??r </p>
                                                                            <Button
                                                                                className="btn-remove flex-center"
                                                                                onClick={() => {
                                                                                    companyArr.splice(index, 1);
                                                                                    setCompanyArr([...companyArr], companyArr)
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
                                                                <div>
                                                                    <div className="radio-content">
                                                                        <h5>??sas i?? yeridir yoxsa ??lav?? i?? yeri?</h5>
                                                                        <div className="flex-start">
                                                                            <div className="radio-block">
                                                                                <label className="radio-label">
                                                                                    <input type="radio"
                                                                                           name={`${index}radio`}
                                                                                           checked={item.mainJob}
                                                                                           onChange={() => {
                                                                                               companyArr[index].mainJob = true;
                                                                                               setCompanyArr([...companyArr], companyArr)
                                                                                           }}/>
                                                                                    <span className="radio-mark"/>
                                                                                </label>
                                                                                <span
                                                                                    className="radio-title">??sas i?? yeri</span>
                                                                            </div>
                                                                            <div className="radio-block">
                                                                                <label className="radio-label">
                                                                                    <input type="radio"
                                                                                           name={`${index}radio`}
                                                                                           checked={!item.mainJob}
                                                                                           onChange={() => {
                                                                                               companyArr[index].mainJob = false;
                                                                                               setCompanyArr([...companyArr], companyArr)
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
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">??????inin i??l??diyi ??irk??t</span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="??irk??t daxil et"
                                                                                        value={item.company || ''}
                                                                                        onChange={(e) => {
                                                                                            companyArr[index].company = e.target.value;
                                                                                            setCompanyArr([...companyArr], companyArr)
                                                                                        }}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                            <span
                                                                                className="input-title">Struktur b??lm??</span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="Struktur b??lm?? daxil et"
                                                                                        value={item.department || ''}
                                                                                        onChange={(e) => {
                                                                                            companyArr[index].department = e.target.value;
                                                                                            setCompanyArr([...companyArr], companyArr)
                                                                                        }}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">Alt struktur b??lm??</span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="Alt struktur  b??lm?? daxil et"
                                                                                        value={item.subDepartment || ''}
                                                                                        onChange={(e) => {
                                                                                            companyArr[index].subDepartment = e.target.value;
                                                                                            setCompanyArr([...companyArr], companyArr)
                                                                                        }}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">??????inin i??l??diyi v??zif??</span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="Struktur b??lm?? daxil et"
                                                                                        value={item.position || ''}
                                                                                        onChange={(e) => {
                                                                                            companyArr[index].position = e.target.value;
                                                                                            setCompanyArr([...companyArr], companyArr)
                                                                                        }}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">?????? q??bul tarixi</span>
                                                                                <Form.Label className="relative m-0">
                                                                                    <DatePicker value={item.startDate}
                                                                                                dateFormat="dd-MM-yyyy"
                                                                                                placeholderText="YYYY-MM-DD"
                                                                                                showMonthDropdown
                                                                                                showYearDropdown
                                                                                                dropdownMode="select"
                                                                                                onChange={(date) => {
                                                                                                    companyArr[index].startDate = moment(date).format("YYYY-MM-DD");
                                                                                                    setCompanyArr([...companyArr], companyArr)
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
                                                                        <Col xs={4}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????d??n azad tarixi</span>
                                                                                <Form.Label className="relative m-0">
                                                                                    <DatePicker value={item.endDate}
                                                                                                dateFormat="dd-MM-yyyy"
                                                                                                placeholderText="YYYY-MM-DD"
                                                                                                showMonthDropdown
                                                                                                showYearDropdown
                                                                                                dropdownMode="select"
                                                                                                onChange={(date) => {
                                                                                                    companyArr[index].endDate = moment(date).format("YYYY-MM-DD");
                                                                                                    setCompanyArr([...companyArr], companyArr)
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
                                                                        <Col xs={4}>
                                                                            <Form.Group className="form-group">
                                                                                <span className="input-title">????d??n azad olma madd??si</span>
                                                                                <Form.Label>
                                                                                    <Form.Control
                                                                                        placeholder="????d??n azad olma madd??si  daxil et"
                                                                                        value={item.dismissalReason || ''}
                                                                                        onChange={(e) => {
                                                                                            companyArr[index].dismissalReason = e.target.value;
                                                                                            setCompanyArr([...companyArr], companyArr)
                                                                                        }}/>
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <Form.Group className="form-group">
                                                                                <span
                                                                                    className="input-title">???? statusu</span>
                                                                                <Select
                                                                                    placeholder="???? statusu se??in"
                                                                                    value={item.businessStatus}
                                                                                    onChange={(val) => {
                                                                                        companyArr[index].businessStatus = val;
                                                                                        setCompanyArr([...companyArr], companyArr)
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
                                                                onClick={() => addCompany()}>
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
                                            {
                                                showButton ?
                                                    <ul className="flex-vertical-center btn-block list-unstyled">
                                                        <li>
                                                            <Button className="btn-transparent"
                                                                    onClick={() => {
                                                                        setKey('education')
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
                                                                    onClick={() => sendCompanyData()}>
                                                                Davam et
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                    : null
                                            }
                                        </Form>
                                    </div>
                                </Tab>
                                <Tab eventKey="bank" title="Bank m??lumatlar??">
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
                                                                        value={bankAccount}
                                                                        onChange={(e => setBankAccount(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            {
                                                showButton ?
                                                    <ul className="flex-vertical-center btn-block list-unstyled">
                                                        <li>
                                                            <Button className="btn-transparent"
                                                                    onClick={() => {
                                                                        setKey('education')
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
                                                                    onClick={() => sendBankData()}>
                                                                Davam et
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                    : null
                                            }
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
                                                                            className="input-title">T??ltifin ad??</span>
                                                                                    <Form.Label>
                                                                                        <Select
                                                                                            placeholder="T??ltifin ad?? se??in"
                                                                                            onChange={(val) => {
                                                                                                rewardArr[index].honoraryDecreeId = val.id;
                                                                                                setRewardArr([...rewardArr], rewardArr)
                                                                                            }}
                                                                                            isSearchable={reward ? reward.length > 5 : false}
                                                                                            options={reward}
                                                                                            getOptionLabel={(option) => (option.name)}
                                                                                            getOptionValue={(option) => (option.name)}
                                                                                            styles={customStyles}
                                                                                        />
                                                                                    </Form.Label>
                                                                                    {/* <div className="validation-block flex-start">
                                                                            {

                                                                                errors['honoraryAchievements[].honoraryDecreeId'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['honoraryAchievements[].honoraryDecreeId']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>*/}
                                                                                </Form.Group>
                                                                            </Col>
                                                                            <Col xs={4}>
                                                                                <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">T??ltifi ver??n orqan??n ad??</span>
                                                                                    <Form.Label>
                                                                                        <Select
                                                                                            placeholder="T??ltifi ver??n orqan?? se??in"
                                                                                            onChange={(val) => {
                                                                                                rewardArr[index].organizationId = val.id;
                                                                                                setRewardArr([...rewardArr], rewardArr)
                                                                                            }}
                                                                                            isSearchable={rewardOrganization ? rewardOrganization.length > 5 : false}
                                                                                            options={rewardOrganization}
                                                                                            getOptionLabel={(option) => (option.name)}
                                                                                            getOptionValue={(option) => (option.name)}
                                                                                            styles={customStyles}
                                                                                        />
                                                                                    </Form.Label>
                                                                                    {/* <div className="validation-block flex-start">
                                                                            {

                                                                                errors['honoraryAchievements[].organizationId'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['honoraryAchievements[].organizationId']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>*/}
                                                                                </Form.Group>
                                                                            </Col>
                                                                            <Col xs={4}>
                                                                                <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">T??ltifin verilm?? tarixi</span>
                                                                                    <Form.Label className="relative m-0">
                                                                                        <DatePicker value={item.givenDate}
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
                                                                        value={warrantyNumber}
                                                                        onChange={(e => setWarrantyNumber(e.target.value))}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={8}>
                                                            <Form.Group className="form-group">
                                                                <span
                                                                    className="input-title">??????inin aid oldu kvota ??zr?? m??lumatlar</span>
                                                                <Form.Label className="relative m-0">
                                                                    <Select
                                                                        placeholder="??????inin aid oldu kvotan?? se??in"
                                                                        value={selectedQuota}
                                                                        onChange={(val) => {
                                                                            setSelectedQuota(val);
                                                                            setQuotaArr(val)
                                                                        }}
                                                                        isSearchable={quota ? quota.length > 5 : false}
                                                                        isMulti
                                                                        options={quota}
                                                                        getOptionLabel={(option) => (option.label)}
                                                                        getOptionValue={(option) => (option.label)}
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
                                                                                        onChange={(val) => {
                                                                                            familyMemberArr[index].relationType = val.value;
                                                                                            setFamilyMemberArr([...familyMemberArr], familyMemberArr)
                                                                                        }}
                                                                                        isSearchable={relationTypeOptions ? relationTypeOptions.length > 5 : false}
                                                                                        options={relationTypeOptions}
                                                                                        getOptionLabel={(option) => (option.label)}
                                                                                        getOptionValue={(option) => (option.label)}
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
                                                                                        value={item.birthDate}
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
                                            {
                                                showButton ?
                                                    <ul className="flex-vertical-center btn-block list-unstyled">
                                                        <li>
                                                            <Button className="btn-transparent"
                                                                    onClick={() => {
                                                                        setKey('company')
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
                                                                    onClick={() => sendOtherData()}>
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

export default EmployeeCreate
