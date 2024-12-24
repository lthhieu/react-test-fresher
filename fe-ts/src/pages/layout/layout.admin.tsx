import { selectIsAuthenticated, selectUser } from "@/redux/feature/account/accountSlice"
import { useAppSelector } from "@/redux/hooks"
import { Link, Outlet } from "react-router"
import { BookOutlined, DashboardOutlined, DownOutlined, HomeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Grid, Layout, Menu, MenuProps, Space, theme, Typography } from 'antd';
import React, { useEffect, useState } from "react";
import NotPermission from "@/pages/not.permission";
const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;


const LayoutAdmin = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const user = useAppSelector(selectUser)
    const screens = useBreakpoint();
    const url = `${import.meta.env.VITE_BACKEND_URI}/images/avatar/${user?.avatar}`
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    useEffect(() => {
        if (screens.xs) {
            setCollapsed(true)
        }
    }, [screens])

    const items = [
        {
            label: (
                <Link to='/admin'>
                    Tổng quan
                </Link>
            ),
            key: '0',
            icon: <DashboardOutlined />,
        },
        {
            label: (
                <Link to='/admin/users'>
                    Người dùng
                </Link>
            ),
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: (
                <Link to='/admin/books'>
                    Sách
                </Link>
            ),
            key: '2',
            icon: <BookOutlined />,
        },
    ];
    const itemsOption: MenuProps['items'] = [
        {
            label: (
                <Link to={'/'}>
                    Trang chủ
                </Link>
            ),
            key: '0',
            icon: <HomeOutlined />,
        },
        {
            label: 'Đăng xuất',
            key: '3',
            style: { color: '#ff4d4f' },
            icon: <LogoutOutlined color="#ff4d4f" size={18} />,
        },
    ];
    const { token } = useToken();
    const contentMenuStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        marginTop: '-20px',
        marginRight: '20px'
    };

    const menuStyle: React.CSSProperties = {
        boxShadow: 'none',
    };
    return (
        <>
            {!isAuthenticated || user?.role === 'USER' ? <><NotPermission /></> :
                <Layout >
                    <Sider style={{ height: '100vh' }} trigger={null} collapsible collapsed={collapsed} collapsedWidth={0} breakpoint="xs">
                        <Header style={{ color: '#fffc', fontSize: '16px', display: 'flex', gap: 10, alignItems: 'center', padding: '0 20px' }}>
                            <Avatar src={<img src={url} alt="avatar" />} style={{ backgroundColor: '#fffc', width: '30%' }} />
                            {/* <span>{user?.fullName}</span> */}
                            <Text
                                style={{ color: '#fffc', width: '100%' }}
                                ellipsis>
                                {user?.fullName}
                            </Text>
                        </Header>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['0']}
                            items={items}
                        />
                    </Sider>
                    <Layout>
                        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                            <Dropdown trigger={['click']} menu={{ items: itemsOption }}
                                dropdownRender={(menu) => {

                                    return (
                                        <div style={contentMenuStyle}>
                                            {React.cloneElement(menu as React.ReactElement,
                                                {
                                                    style: menuStyle,
                                                }
                                            )}
                                        </div>
                                    )
                                }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space style={{ marginRight: 20 }}>
                                        Tùy chọn
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
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