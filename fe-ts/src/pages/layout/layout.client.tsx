
import { Link, Outlet, useNavigate } from "react-router"
import React from 'react';
import { App, Avatar, Badge, Col, Dropdown, Grid, Input, Layout, MenuProps, Row, Space, theme, Typography } from 'antd';
import { FaReact } from "react-icons/fa";
import { LoginOutlined, LogoutOutlined, MenuOutlined, SearchOutlined, SignatureOutlined } from "@ant-design/icons";
import { LuShoppingCart } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleLogoutAsync, selectIsAuthenticated, selectUser } from "@/redux/feature/account/accountSlice";

const { Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;
const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    // height: 64,
    // paddingInline: '12%',
    padding: 0,
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
    color: '#ccc',
    backgroundColor: '#333',
};

const layoutStyle: React.CSSProperties = {
    // borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    minHeight: '100vh'
};

const { useToken } = theme;

const LayoutClient = () => {
    const user = useAppSelector(selectUser)
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const url = `${import.meta.env.VITE_BACKEND_URI}/images/avatar/${user?.avatar}`
    const { token } = useToken();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { message } = App.useApp();

    const contentMenuStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        marginTop: '-10px',
    };

    const menuStyle: React.CSSProperties = {
        boxShadow: 'none',
    };

    const items: MenuProps['items'] = [
        {
            label: (
                <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
                    Quản lý tài khoản
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
                    Lịch sử mua hàng
                </a>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: 'Đăng xuất',
            key: '3',
            style: { color: '#ff4d4f' },
            icon: <LogoutOutlined color="#ff4d4f" size={18} />,
            onClick: async () => {
                const res = await dispatch(handleLogoutAsync())
                if (res.payload.includes('success')) {
                    message.success("Đăng xuất thành công!");
                    navigate('/')
                }
            }
        },
    ];

    const itemsOption: MenuProps['items'] = [
        {
            label: (
                <Link to={'/login'}>
                    Đăng nhập
                </Link>
            ),
            key: '0',
            icon: <LoginOutlined color="#ff4d4f" size={18} />,
        },
        {
            label: (
                <Link to={'/register'}>
                    Đăng ký
                </Link>
            ),
            key: '1',
            icon: <SignatureOutlined color="#ff4d4f" size={18} />,
        },
    ];

    if (user?.role === 'ADMIN') {
        items.unshift({
            label: (
                <Link to={'/admin'}>
                    Quản lý hệ thống
                </Link>
            ),
            key: '4',

        });
    }

    const screens = useBreakpoint();

    return (
        <>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <Row style={{ width: '100%' }}>
                        <Col xs={0} sm={4} md={6} style={{ color: '#ff5500', }}>
                            <Row style={{ height: '100%' }}>
                                <Col sm={24} md={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} >
                                    <FaReact style={{ fontSize: '32px', }} />
                                    {screens.md && <strong style={{ fontSize: 18 }}>Book Store</strong>}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={20} sm={14} md={12} >
                            <div style={{ width: '100%', paddingLeft: 30 }}>
                                <Input className="override-input-component-by-hieulth" size="large" placeholder="Bạn muốn tìm gì hôm nay" prefix={<SearchOutlined style={{ color: '#ff5500' }} />} />
                            </div>
                        </Col>
                        <Col xs={4} sm={0}>
                            <Dropdown menu={{ items: isAuthenticated ? items : itemsOption }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                                <MenuOutlined />
                            </Dropdown>
                        </Col>
                        <Col xs={0} sm={6} md={6} >
                            {isAuthenticated ? <>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '8px' }}>
                                    <a href="#">
                                        <Badge count={5} size="small" color="#ff5500" style={{ boxShadow: 'none' }}>
                                            <Avatar icon={<LuShoppingCart size={26} />} size="large" style={{ backgroundColor: '#333' }} />
                                        </Badge>
                                    </a>
                                    <Dropdown menu={{ items }} trigger={['click']}
                                        dropdownRender={(menu) => {
                                            return (
                                                <div style={contentMenuStyle}>
                                                    {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                                                </div>
                                            )
                                        }}
                                    >
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <Avatar src={<img src={url} alt="avatar" />} style={{ backgroundColor: '#fff' }} />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                    <Paragraph ellipsis={true} style={{ color: '#fffc', width: '100%', textAlign: 'justify' }}>{user && user.fullName ? user.fullName : "username"}</Paragraph>
                                </div></> : <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', height: '100%', marginLeft: 30 }}>
                                <LoginOutlined style={{ fontSize: 24, color: '#fffc', }} />{' '}
                                <Link style={{ display: 'flex' }} to={'/login'}><Text ellipsis={true} style={{ color: '#fffc', textDecoration: 'underline', }}>Đăng nhập</Text></Link></div>}
                        </Col>
                    </Row>
                </Header>
                <Content style={contentStyle}><Outlet /></Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout >

        </>
    )
}
export default LayoutClient
