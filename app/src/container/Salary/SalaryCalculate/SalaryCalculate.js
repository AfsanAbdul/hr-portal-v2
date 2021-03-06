import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Table, Container, Button, Form, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {mainAxios} from "../../../components/Axios/axios";
import Paginate from "../../../components/Pagination/Pagination";
import Select, {components} from "react-select";
import {customStyles} from "../../../components/Select/SelectStyle";
import EmptyData from "../../../components/EmptyData/EmptyData";
import Loading from "../../../components/Loading/Loading";
import {
    monthOptions,
    vacancyOptions,
    productionOptions,
    calculationOptions,
    taxOptions,
    exemptionOptions,
    netExemptionOptions,
    employerPayOptions,
    cols
} from "../../../components/Select/SelectOptions"

function SalaryCalculate() {
    let currentMonth = (new Date().getMonth() + 1);
    let currentYear = (new Date().getFullYear());
    const [salary, setSalary] = useState([]);
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(20);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [yearOptions, setYearOptions] = useState([]);
    const [selectedVacancy, setSelectedVacancy] = useState([]);
    const [selectedProduction, setSelectedProduction] = useState([]);
    const [selectedCalculation, setSelectedCalculation] = useState([]);
    const [selectedTax, setSelectedTax] = useState([]);
    const [selectedExemption, setSelectedExemption] = useState([]);
    const [selectedNet, setSelectedNet] = useState([]);
    const [selectedEmployer, setSelectedEmployer] = useState([]);
    const [tableCols, setTableCols] = useState(cols);
    const [selectedYear, setSelectedYear] = useState(currentYear);


    const [loading, setLoading] = useState(false);

    let year = selectedYear !== null ? selectedYear : currentYear;
    let month = selectedMonth !== null ? selectedMonth : currentMonth;

    /*filter*/

    const [department, setDepartment] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [subDepartment, setSubDepartment] = useState([]);
    const [selectedSubDepartment, setSelectedSubDepartment] = useState(null)
    const [fullName, setFullName] = useState('');
    const [showFilter, setShowFilter] = useState(false)
    let depart = selectedDepartment !== null ? selectedDepartment.id : null;
    let subDepart = selectedSubDepartment !== null ? selectedSubDepartment.id : null;
    let name = fullName !== '' ? fullName : null;

    const Option = props => {
        return (<div>
            <components.Option {...props}>
                <label>{props.value}</label>
                {
                    props.isSelected ?
                        <span>
                            <svg width="13" height="10" viewBox="0 0 13 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.8">
                                    <path
                                        d="M12.6778 0.253387C12.28 -0.108232 11.6613 -0.0798913 11.2978 0.319827L5.33596 6.88466L2.45572 3.95657C2.07552 3.57149 1.45786 3.56562 1.07376 3.94484C0.688684 4.32307 0.682818 4.94172 1.06203 5.3268L4.66743 8.99183C4.85216 9.17947 5.10234 9.28405 5.36425 9.28405C5.37012 9.28405 5.37697 9.28405 5.38283 9.28504C5.65258 9.27917 5.9067 9.16384 6.08749 8.96448L12.7441 1.63441C13.1068 1.23366 13.0775 0.615992 12.6778 0.253387Z"
                                        fill="#040647"/>
                                </g>
                            </svg>
                        </span>
                        : null
                }
            </components.Option>
        </div>);
    };

    const getSalary = (page, month, year, departId, subDepartId, name) => {
        setLoading(true)
        let params = {
            page: page - 1,
            size: recordSize,
            departmentId: departId,
            subDepartmentId: subDepartId,
            fullName: name,
        };

        if (month != currentMonth || year != currentYear) {
            params.year = year;
            params.month = month
        }

        mainAxios({
            method: 'get',
            url: 'salaries',
            params
        }).then((res) => {
            setLoading(false)
            setCurrentPage(page)
            setSalary(res.data.content);
            setTotalRecord(res.data.totalElements);
        });
    }

    const getExport = () => {
        mainAxios({
            method: 'get',
            url: 'salaries/download',
            responseType: 'arraybuffer',
        }).then((res) => {
            let file = '??m??k haqq??';
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = window.document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${file}.xlsx`);
            window.document.body.appendChild(link);
            link.click();
        }).catch((error) => {
        });
    }

    const getDepartment = () => {
        mainAxios({
            method: 'get',
            url: 'departments',
        }).then((res) => {
            setDepartment(res.data);
        }).catch((error) => {
            setDepartment([])
        });
    }

    const getSubDepartments = (id) => {
        mainAxios({
            method: 'get',
            url: id !== undefined ? `departments/${id}/sub-departments` : 'sub-departments',
        }).then((res) => {
            setSubDepartment(res.data)
        }).catch((error) => {
            setSubDepartment([])
        });
    }

    const resetFilter = () => {
        setSelectedSubDepartment(null);
        setSelectedDepartment(null);
        setFullName('');
        getSubDepartments();
        getSalary(1, selectedMonth, selectedYear)
    }


    useEffect(() => {
        getDepartment();
        getSubDepartments();
        getSalary(1, selectedMonth, selectedYear);
        for (let i = 2021; i <= currentYear; i++) {
            yearOptions.push({value: i, label: i});
        }
    }, []);

    useEffect(() => {
        let arr = cols.concat(selectedVacancy, selectedProduction, selectedCalculation, selectedTax, selectedExemption, selectedNet, selectedEmployer)
        setTableCols(arr)
    }, [selectedVacancy, selectedProduction, selectedCalculation, selectedTax, selectedExemption, selectedNet, selectedEmployer])

    return (
        <Aux>
            <div className="staff-salary">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title">
                            ??m??k haqq?? hesablama
                        </div>
                        <div className="btn-block flex-end">
                            <Button type="button" className="btn-border" onClick={() => {
                                setShowFilter(!showFilter)
                            }}>
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.7099 2.90769C15.7145 2.89385 15.7053 2.88 15.7053 2.86615V0.461538C15.7145 0.216923 15.5206 0.00923077 15.2714 0C15.2668 0 15.2622 0 15.2576 0H0.732947C0.488331 0 0.285254 0.203077 0.28987 0.447692C0.28987 0.452308 0.28987 0.456923 0.28987 0.461538V2.86615C0.28987 2.88 0.280639 2.89385 0.285254 2.90769C0.285254 2.91231 0.280639 2.92154 0.285254 2.92615C0.285254 2.93538 0.285254 2.94462 0.285254 2.94923C0.285254 2.95846 0.285254 2.96308 0.28987 2.97231C0.294485 2.98154 0.294485 2.98615 0.294485 2.99077C0.294485 2.99538 0.299101 3.00462 0.299101 3.01385C0.299101 3.01846 0.303716 3.02769 0.303716 3.03231C0.308331 3.04154 0.308331 3.04615 0.312947 3.05538C0.317562 3.06 0.317562 3.06923 0.322178 3.07385C0.326793 3.07846 0.326793 3.08769 0.331408 3.09231C0.336024 3.09692 0.340639 3.10615 0.340639 3.11077C0.340639 3.11538 0.34987 3.12462 0.34987 3.12923C0.354485 3.13385 0.359101 3.14308 0.363716 3.14769C0.368331 3.15231 0.372947 3.15692 0.372947 3.16154C0.372947 3.16154 0.382178 3.16154 0.386793 3.16615L5.92064 9.67385V17.5385C5.91602 17.7138 6.01295 17.8754 6.17449 17.9538C6.23449 17.9815 6.2991 18 6.36833 18C6.47448 18 6.57602 17.9631 6.65448 17.8985L9.91295 15.2538C10.0191 15.1662 10.0791 15.0323 10.0745 14.8938V9.67385L15.6037 3.16615C15.6037 3.16615 15.6083 3.16615 15.6129 3.16154C15.6176 3.15692 15.6222 3.15231 15.6268 3.14769C15.6314 3.14308 15.636 3.13385 15.6406 3.12923C15.6453 3.12462 15.6499 3.11538 15.6545 3.11077C15.6591 3.10615 15.6637 3.09692 15.6637 3.09231C15.6683 3.08769 15.6729 3.07846 15.6729 3.07385C15.6776 3.06923 15.6776 3.06 15.6822 3.05538C15.6868 3.04615 15.6868 3.04154 15.6914 3.03231C15.696 3.02769 15.696 3.01846 15.696 3.01385C15.7006 3.00462 15.7006 3 15.7006 2.99077C15.7006 2.98154 15.7053 2.97692 15.7053 2.97231C15.7053 2.96769 15.7099 2.95846 15.7099 2.94923C15.7099 2.94 15.7145 2.93077 15.7145 2.92615C15.7145 2.92154 15.7053 2.91231 15.7099 2.90769ZM9.27141 9.20308C9.19756 9.28615 9.15602 9.39231 9.15141 9.50308V14.6723L6.84372 16.5692V9.50308C6.8391 9.39231 6.79756 9.28615 6.72372 9.20308L1.72987 3.32308H14.2653L9.27141 9.20308ZM14.7822 2.4H1.21295V0.923077H14.7822V2.4Z"
                                        fill="#040647"/>
                                </svg>
                                Filterl??
                            </Button>
                            <Button onClick={() => getExport()} className="btn-main">
                                Export file
                            </Button>
                        </div>
                    </div>
                    {
                        showFilter ?
                            <div className="filter-block">
                                <div className="block flex">
                                    <div className="filter-left">
                                        <div className="filter-item">
                                            <Form.Group className="form-group m-0">
                                                <span className="input-title">Struktur vahidinin ad??</span>
                                                <Select
                                                    placeholder="Struktur vahidini se??in"
                                                    value={selectedDepartment}
                                                    onChange={(val) => {
                                                        setSelectedDepartment(val);
                                                        let id = val.id;
                                                        getSubDepartments(id);
                                                        setSelectedSubDepartment(null)
                                                        let subDepartId = selectedSubDepartment !== null ? selectedSubDepartment.id : null;
                                                        let name = fullName !== '' ? fullName : null
                                                        getSalary(1, month, year, id, subDepartId, name)
                                                    }}
                                                    isSearchable={department ? department.length > 5 : false}
                                                    options={department}
                                                    getOptionLabel={(option) => (option.name)}
                                                    getOptionValue={(option) => (option.name)}
                                                    styles={customStyles}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="filter-item">
                                            <Form.Group className="form-group m-0">
                                                <span className="input-title">Struktur b??lm??nin ad??</span>
                                                <Select
                                                    placeholder="Struktur b??lm??ni se??in"
                                                    value={selectedSubDepartment}
                                                    onChange={(val) => {
                                                        setSelectedSubDepartment(val);
                                                        let id = val.id
                                                        let departId = selectedDepartment !== null ? selectedDepartment.id : null;
                                                        let name = fullName !== '' ? fullName : null
                                                        getSalary(1, month, year, departId, id, name)

                                                    }}
                                                    isSearchable={subDepartment ? subDepartment.length > 5 : false}
                                                    options={subDepartment}
                                                    getOptionLabel={(option) => (option.name)}
                                                    getOptionValue={(option) => (option.name)}
                                                    styles={customStyles}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="filter-item">
                                            <Form.Group className="form-group m-0">
                                                <span className="input-title">??????inin ad??</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="??????inin ad?? daxil edin"
                                                                  value={fullName}
                                                                  onChange={(e) => {
                                                                      setFullName(e.target.value)
                                                                  }}
                                                                  onKeyPress={(e) => {
                                                                      let departId = selectedDepartment !== null ? selectedDepartment.id : null;
                                                                      let subDepartId = selectedSubDepartment !== null ? selectedSubDepartment.id : null;
                                                                      if (e.key === 'Enter') {
                                                                          getSalary(1, month, year, departId, subDepartId, e.target.value)
                                                                      }
                                                                  }}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <Button className="btn-main-border" onClick={() => resetFilter()}>
                                        T??mizl??
                                    </Button>
                                </div>
                            </div>
                            : null
                    }
                    <div className="filter-block">
                        <div className="block flex">
                            <div className="filter-left">
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            defaultValue={{label: currentYear, value: currentYear}}
                                            value={selectedYear.label}
                                            placeholder="Year"
                                            onChange={(val) => {
                                                val = val.value
                                                setSelectedYear(val);
                                                let month = selectedMonth !== null ? selectedMonth : currentMonth;
                                                getSalary(1, month, val, depart, subDepart, name)
                                            }}
                                            options={yearOptions}
                                            styles={customStyles}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            defaultValue={monthOptions[currentMonth - 1]}
                                            value={selectedMonth.label}
                                            placeholder="Month"
                                            onChange={(val) => {
                                                val = val.value
                                                setSelectedMonth(val);
                                                let year = selectedYear !== null ? selectedYear : currentYear
                                                getSalary(1, val, year, depart, subDepart, name)
                                            }}
                                            options={monthOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                        />
                                    </Form.Group>

                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="??tat"
                                            onChange={async (val) => {
                                                setSelectedVacancy(val);
                                            }}
                                            isMulti
                                            options={vacancyOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="??stehsalat t??qvimin?? g??r??"
                                            onChange={(val) => {
                                                setSelectedProduction(val);
                                            }}
                                            isMulti
                                            options={productionOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>

                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="Hesablama"
                                            onChange={(val) => {
                                                setSelectedCalculation(val);
                                            }}
                                            isMulti
                                            options={calculationOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="Vergiy?? c??lb olunmayan m??bl???? (G??z????tl??r v?? HYS)"
                                            onChange={(val) => {
                                                setSelectedTax(val);
                                            }}
                                            isMulti
                                            options={taxOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>

                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="Tutulma"
                                            onChange={(val) => {
                                                setSelectedExemption(val);
                                            }}
                                            isMulti
                                            options={exemptionOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>

                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="Netd??n olan tutulmalar"
                                            onChange={(val) => {
                                                setSelectedNet(val);
                                            }}
                                            isMulti
                                            options={netExemptionOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>

                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="??????g??t??r??n t??r??find??n ??d??nil??c??k "
                                            onChange={(val) => {
                                                setSelectedEmployer(val);
                                            }}
                                            isMulti
                                            options={employerPayOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>

                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        loading ? <Loading/> :
                            <>
                                <div className="block">
                                    {
                                        salary.length > 0 ?
                                            <Table responsive="sm" hover
                                                   className={["m-0", loading ? 'active' : ''].join(' ')}>
                                                <thead>
                                                <tr>
                                                    {
                                                        tableCols.map((item, index) =>
                                                            <th key={index}>
                                                                {
                                                                    item.label.length > 20 ?
                                                                        <OverlayTrigger placement="top-start"
                                                                                        overlay={<Tooltip
                                                                                            id="tooltip-disabled">{item.label}</Tooltip>}>
                                                                            <p className="m-0 operation-name">{item.label}</p>
                                                                        </OverlayTrigger>
                                                                        :
                                                                        <p className="m-0">{item.label}</p>

                                                                }
                                                            </th>
                                                        )
                                                    }
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    salary.map((item, index) =>
                                                        <tr key={index}>
                                                            {
                                                                tableCols.map((tdItem, index) =>
                                                                    <td key={index}>{
                                                                        tdItem.value == 'fullName' ?
                                                                            item[tdItem.value]
                                                                            :
                                                                            item.salaryDetails[tdItem.value]
                                                                    }</td>
                                                                )
                                                            }
                                                        </tr>
                                                    )
                                                }
                                                </tbody>
                                            </Table>
                                            :
                                            <EmptyData/>

                                    }

                                </div>
                                <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                                          click={(page) => getSalary(page, month, year, depart, subDepart, name)}/>
                            </>
                    }
                </Container>
            </div>
        </Aux>

    );
}

export default SalaryCalculate
