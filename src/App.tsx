import React from 'react';
import './App.css';
import {Calendar, Layout, Typography} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import HeaderBlock from "./components/HeaderBlock/HeaderBlock";
import FooterBlock from "./components/FooterBlock/FooterBlock";

function App() {
    return (
        <Layout>
            <HeaderBlock/>
            <Content className="content">
                <Calendar className="calendar"></Calendar>
            </Content>
            <FooterBlock/>
        </Layout>
    );
}

export default App;
