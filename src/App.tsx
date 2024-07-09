import React from 'react';
import './App.css';
import {Calendar, Layout, Typography} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
function App() {
    return (
        <Layout>
            <Header className="header">
                <Typography.Title level={2}>AirNet test assignment</Typography.Title>
            </Header>
            <Layout className="content_layout">
                <Sider width="25%" className="sider">
                    <Calendar fullscreen={false}/>
                </Sider>
                <Content className="content">
                    <Calendar></Calendar>
                </Content>
            </Layout>
            <Footer className="footer">To-do test assignment ©{new Date().getFullYear()}</Footer>
        </Layout>
    );
}

export default App;
