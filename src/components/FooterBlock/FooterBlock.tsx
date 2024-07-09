import React from 'react';
import {Footer} from "antd/es/layout/layout";

const FooterBlock = () => {
    return (
        <Footer className="footer">To-do test assignment ©{new Date().getFullYear()}</Footer>
    );
};

export default FooterBlock;
