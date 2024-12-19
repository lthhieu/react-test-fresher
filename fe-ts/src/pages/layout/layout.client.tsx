
import { Outlet } from "react-router"
import React from 'react';
import { Input, Layout } from 'antd';
import { FaReact } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    // height: 64,
    paddingInline: 100,
    lineHeight: '64px',
    backgroundColor: '#333',
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
                    <div style={{ display: 'flex', gap: 4, color: 'orange', alignItems: 'center' }}>
                        <FaReact style={{ fontSize: '32px', }} />
                        <strong>Book Store</strong>
                    </div>
                    <div style={{ width: '50%' }}>
                        <Input size="large" placeholder="large size" prefix={<SearchOutlined style={{ color: '#ccc' }} />} />

                    </div>
                    <div style={{ color: '#ccc' }}>ava cart</div>
                </Header>
                <Content style={contentStyle}><Outlet /></Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout >

        </>
    )
}
export default LayoutClient
