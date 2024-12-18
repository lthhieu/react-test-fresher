import { selectIsAuthenticated, selectUser } from "@/redux/feature/account/accountSlice"
import { useAppSelector } from "@/redux/hooks"
import { Outlet } from "react-router"
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import React, { useState } from "react";
import NotPermission from "@/pages/not.permission";

const { Header, Sider, Content } = Layout;

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: `nav ${index + 1}`,
    }),
);

const LayoutAdmin = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const user = useAppSelector(selectUser)
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            {!isAuthenticated || user?.role === 'USER' ? <><NotPermission /></> :
                <Layout >
                    <Sider style={{ height: '100vh' }} trigger={null} collapsible collapsed={collapsed} collapsedWidth={0} breakpoint="xs">
                        <Header style={{ color: '#fffc', fontSize: '16px', display: 'flex', gap: 10, alignItems: 'center', padding: '0 20px' }}>
                            <img style={{ width: 'auto', maxHeight: '33px', opacity: .8 }} src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png" />
                            <span>Admin</span></Header>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={items}
                        />
                    </Sider>
                    <Layout>
                        <Header style={{ padding: 0, background: colorBgContainer }}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            }
        </>
    )
}
export default LayoutAdmin