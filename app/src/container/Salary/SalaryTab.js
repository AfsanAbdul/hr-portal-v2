import React, {useState} from 'react';
import Aux from "../../hoc/Auxiliary";
import {Container,Tabs, Tab} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import SalaryCalculate from "./SalaryCalculate/SalaryCalculate";
import SalaryEmployeeData from "./SalaryEmployeeData/SalaryEmployeeData";


function SalaryTab() {
    let location = useLocation();
    const [key, setKey] = useState(location.state !== null ? location.state : 'salary')

    return (
        <Aux>
            <div className="staff operation">
                <Container fluid>
                    <div className="inner-tab flex-vertical-center">
                        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                            <Tab eventKey="salary" title="Əmək haqqı hesablama">
                                <SalaryCalculate key={key}/>
                            </Tab>
                            <Tab eventKey="employee" title="İşçilərin əmək haqqı ">
                                <SalaryEmployeeData key={key}/>
                            </Tab>
                        </Tabs>
                    </div>
                </Container>
            </div>
        </Aux>

    );
}

export default SalaryTab
