import React, {useState} from 'react';
import Aux from "../../hoc/Auxiliary";
import {Container, Row, Col, Form, Tabs, Tab, Button, Table, OverlayTrigger, Tooltip} from 'react-bootstrap';
import SettingPlace from "../Setting/SettingTab/SettingPlace";
import SettingEducation from "./SettingTab/SettingEducation";
import SettingOther from "./SettingTab/SettingOther";

function Setting() {
    const [key,setKey]= useState('place')

    return (
        <Aux>
            <div className="setting">
                <div className="title-block flex">
                    <div className="title flex-center">
                        Redaktə
                    </div>
                </div>
                <div className="block">
                    <div className="inner-tab flex-vertical-center">
                        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                            <Tab eventKey="place" title="Yerlər">
                                <SettingPlace key={key}/>
                            </Tab>
                            <Tab eventKey="education" title="Təhsil">
                                <SettingEducation key={key}/>
                            </Tab>
                            <Tab eventKey="other" title="Digər">
                                <SettingOther key={key}/>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Aux>
    );
}

export default Setting
