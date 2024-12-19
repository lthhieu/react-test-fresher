
import { Outlet } from "react-router"
import React from 'react';
import { Flex, Layout } from 'antd';
import { AndroidOutlined } from "@ant-design/icons";

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    // height: 64,
    paddingInline: 100,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: 'red',
    backgroundColor: '#fff',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fffc',
    backgroundColor: '#001529',
};

const layoutStyle: React.CSSProperties = {
    // borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    minHeight: '100vh'
};

const LayoutClient = () => {
    return (
        <>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <div style={{ display: 'flex' }}>
                        <AndroidOutlined style={{ fontSize: '32px', color: '#fffc' }} />
                        <p>MenuFoldOutlined</p>
                    </div>
                    <div style={{ width: '500px' }}>
                        <p>MenuFoldOutlined</p>

                    </div>
                    <div>ava cart</div>
                </Header>
                <Content style={contentStyle}><Outlet /></Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout >

        </>
    )
}
export default LayoutClient
