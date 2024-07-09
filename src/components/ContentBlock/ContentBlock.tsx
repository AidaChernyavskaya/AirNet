import React from 'react';
import {Calendar} from "antd";
import {Content} from "antd/es/layout/layout";

const ContentBlock = () => {
    return (
        <Content className="content">
            <Calendar className="calendar"></Calendar>
        </Content>
    );
};

export default ContentBlock;