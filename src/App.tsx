import React from 'react';
import './App.css';
import {Layout} from "antd";
import HeaderBlock from "./components/HeaderBlock/HeaderBlock";
import FooterBlock from "./components/FooterBlock/FooterBlock";
import ContentBlock from "./components/ContentBlock/ContentBlock";

function App() {
    return (
        <Layout>
            <HeaderBlock/>
            <ContentBlock/>
            <FooterBlock/>
        </Layout>
    );
}

export default App;
