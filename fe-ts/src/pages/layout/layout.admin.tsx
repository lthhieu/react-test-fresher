import { selectIsAuthenticated, selectUser } from "@/redux/feature/account/accountSlice"
import { useAppSelector } from "@/redux/hooks"
import { Outlet, useNavigate } from "react-router"
import { BookOutlined, HomeFilled, HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, } from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, theme } from 'antd';
import React, { useState } from "react";
import NotPermission from "@/pages/not.permission";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
    const navigate = useNavigate()
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const user = useAppSelector(selectUser)
    const url = `${import.meta.env.VITE_BACKEND_URI}/images/avatar/${user?.avatar}`
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
                            <Avatar src={<img src={url} alt="avatar" />} style={{ backgroundColor: '#fffc' }} />
                            <span>{user?.fullName}</span></Header>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key: '1',
                                    icon: <HomeOutlined />,
                                    label: 'Trang chủ',
                                    onClick: () => navigate('/admin')
                                },
                                {
                                    key: '2',
                                    icon: <UserOutlined />,
                                    label: 'Người dùng',
                                    onClick: () => navigate('/admin/books')
                                },
                                {
                                    key: '3',
                                    icon: <BookOutlined />,
                                    label: 'Sách',
                                    onClick: () => navigate('/admin/users')
                                },
                            ]}
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