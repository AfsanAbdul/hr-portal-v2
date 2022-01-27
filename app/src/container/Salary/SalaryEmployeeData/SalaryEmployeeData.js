import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Table, Container, Button, Form, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {mainAxios} from "../../../components/Axios/axios";
import Paginate from "../../../components/Pagination/Pagination";
import Select, {components} from "react-select";
import {customStyles} from "../../../components/Select/SelectStyle";
import EmptyData from "../../../components/EmptyData/EmptyData";
import Loading from "../../../components/Loading/Loading";

function SalaryEmployeeData() {

    const [employeeArr, setEmployeeArr] = useState([]);

    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(20);

    const [loading, setLoading] = useState(false);

    const getEmployeeData = (page) => {
        setLoading(true)
        let params = {
            page: page - 1,
            size: recordSize,
        };

        mainAxios({
            method: 'get',
            url: '/employees/with-salaries',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params
        }).then((res) => {
            setLoading(false)
            setCurrentPage(page)
            setEmployeeArr(res.data.content);
            setTotalRecord(res.data.totalElements);
        });
    }


    useEffect(() => {
        getEmployeeData(1)
    }, []);

    return (
        <Aux>
            <div className="staff-salary">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title">
                            Əmək haqqı hesablama
                        </div>
                    </div>
                    {
                        loading ? <Loading/> :
                            <>
                                <div className="block">
                                    {
                                        employeeArr.length > 0 ?
                                            <Table responsive="sm" hover
                                                   className={["m-0", loading ? 'active' : ''].join(' ')}>
                                                <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>S.A.A</th>
                                                    <th>Struktur bölmə</th>
                                                    <th>Alt struk. bölmə</th>
                                                    {/*<th>Tabe struk. bölmə</th>*/}
                                                    <th>Vəzifəsi</th>
                                                    <th>Ştat əmək haqqı</th>
                                                    <th>Əmək şərait. görə əlavə ə. haq.</th>
                                                    <th>Fərdi əlavəsi</th>
                                                    <th>F.D elmi dərəcə. görə əlavə</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    employeeArr.map((item, index) =>
                                                        <tr key={index}>
                                                            <td>{item.id}</td>
                                                            <td>{item.fullName}</td>
                                                            <td>{item.department !== null ?  item.department.name : ''}</td>
                                                            <td>{item.subDepartment !== null ?  item.subDepartment.name : ''}</td>
                                                            <td>{item.position !== null ?  item.position.name : ''}</td>
                                                            <td>{item.salaryInformation !== null ? item.salaryInformation.main : '' }</td>
                                                            <td>{item.salaryInformation !== null ? item.salaryInformation.conditionalAddition : '' }</td>
                                                            <td>{item.salaryInformation !== null ? item.salaryInformation.individualAddition : '' }</td>
                                                            <td>{item.salaryInformation !== null ? item.salaryInformation.academicAddition : '' }</td>
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
                                          click={(page) => getEmployeeData(page)}/>
                            </>
                    }
                </Container>
            </div>
        </Aux>

    );
}

export default SalaryEmployeeData
