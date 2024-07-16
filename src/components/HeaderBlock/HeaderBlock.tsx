import React from 'react';
import {Typography} from "antd";
import {Header} from "antd/es/layout/layout";

const HeaderBlock = () => {
    return (
        <Header className="header">
            <Typography.Title level={2} className="title">AirNet тестовое задание</Typography.Title>
        </Header>
    );
};

export default HeaderBlock;
