import React, {useState} from 'react';
import Aux from '../../hoc/Auxiliary'
import ProtectedRoute from "./ProtectedRoute";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import ScheduleStaff from "../../container/Staff/Schedule/ScheduleStaff";
import CreateStaff from "../../container/Staff/Create/CreateStaff";
import EditStaff from "../../container/Staff/Edit/EditStaff";
import ViewStaff from "../../container/Staff/View/ViewStaff";
import ScheduleEmployee from "../../container/Employee/Schedule/ScheduleEmployee";
import EmployeeCreate from "../../container/Employee/Create/CreateEmployee";
import ViewEmployee from "../../container/Employee/View/ViewEmployee";
import EditEmployee from "../../container/Employee/Edit/EditEmployee";
import SalaryTab from "../../container/Salary/SalaryTab";
import CreateOperation from "../../container/StaffOperation/Operation/Create/CreateOperation";
import CreateSickness from "../../container/StaffOperation/Sickness/CreateSickness/CreateSickness";
import EditSickness from "../../container/StaffOperation/Sickness/EditSickness/EditSickness";
import OperationSchedule from "../../container/StaffOperation/Schedule/ScheduleOperation/OperationSchedule";
import BusinessTripSchedule from "../../container/BusinessTrip/Schedule/BusinessTripSchedule";
import WorkSchedule from "../../container/Work/WorkSchedule/WorkSchedule";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Setting from "../../container/Setting/Setting";
import Calendar from "../../container/Calendar/Calendar";

function Other () {
    const [toggle, setToggle] = useState(false);

    const toggleDrawer = () => {
        setToggle(!toggle)
    }

    return (
        <Aux>
            <Router>
                <Header/>
                <Sidebar click ={toggleDrawer} toggle ={toggle} />
                <main className={['main', toggle ? 'active' : ''].join(' ')}>
                    <Switch>
                        <ProtectedRoute exact path="/employee" component={ScheduleEmployee}/>
                        <ProtectedRoute path="/employee/create" component={EmployeeCreate}/>
                        <ProtectedRoute  exact path="/employee/edit/:id" component={EditEmployee}/>
                        <ProtectedRoute exact path="/employee/view/:id" component={ViewEmployee}/>
                        <ProtectedRoute path="/salary" component={SalaryTab}/>
                        <ProtectedRoute exact path="/staff" component={ScheduleStaff}/>
                        <ProtectedRoute exact path="/staff/edit/:id" component={EditStaff}/>
                        <ProtectedRoute path="/staff/create" component={CreateStaff}/>
                        <ProtectedRoute exact path="/staff/view/:id" component={ViewStaff}/>
                        <ProtectedRoute exact path="/operation" component={OperationSchedule}/>
                        <ProtectedRoute path="/operation/create" component={CreateOperation}/>
                        <ProtectedRoute path="/operation/sickness/create" component={CreateSickness}/>
                        <ProtectedRoute path="/operation/sickness/edit/:id" component={EditSickness}/>
                        <ProtectedRoute path="/businessTrip" component={BusinessTripSchedule}/>
                        <ProtectedRoute path="/workSchedule" component={WorkSchedule}/>
                        <ProtectedRoute path="/calendar" component={Calendar}/>
                        <ProtectedRoute path="/setting" component={Setting}/>
                    </Switch>
                </main>

            </Router>
        </Aux>
    )
}

export default Other
