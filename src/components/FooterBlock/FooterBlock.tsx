import React from 'react';
import {Footer} from "antd/es/layout/layout";

const FooterBlock = () => {
    return (
        <Footer className="footer">Тестовое задание "Список дел" ©{new Date().getFullYear()}</Footer>
    );
};

export default FooterBlock;
