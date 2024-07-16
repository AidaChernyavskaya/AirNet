import React from 'react';
import './App.css';
import {ConfigProvider, Layout} from "antd";
import HeaderBlock from "./components/HeaderBlock/HeaderBlock";
import FooterBlock from "./components/FooterBlock/FooterBlock";
import ContentBlock from "./components/ContentBlock/ContentBlock";
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

function App() {
    return (
        <ConfigProvider locale={locale}>
            <Layout style={{minHeight:"100vh"}}>
                <HeaderBlock/>
                <ContentBlock/>
                <FooterBlock/>
            </Layout>
        </ConfigProvider>
    );
}

export default App;
