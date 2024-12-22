
import { Link, Outlet } from "react-router"
import React from 'react';
import { Avatar, Badge, Col, Dropdown, Input, Layout, MenuProps, Row, Space, theme, Typography } from 'antd';
import { FaReact } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import { LuShoppingCart } from "react-icons/lu";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/feature/account/accountSlice";
import { MdLogout } from "react-icons/md";

const { Text } = Typography;

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
    const url = `${import.meta.env.VITE_BACKEND_URI}/images/avatar/${user?.avatar}`
    const { token } = useToken();

    const contentMenuStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        marginTop: '10px',
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
            icon: <MdLogout color="#ff4d4f" size={18} />,
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

    return (
        <>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <Row style={{ width: '100%' }}>
                        <Col xs={2} sm={4} md={6} lg={6} xl={4} style={{ border: '1px solid green' }}>
                            Col
                        </Col>
                        <Col xs={20} sm={16} md={12} lg={12} xl={14} style={{ border: '1px solid green' }}>
                            Col
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={6} xl={6} style={{ border: '1px solid white' }}>
                            Col
                        </Col>
                    </Row>
                    {/* <div style={{ display: 'flex', gap: 4, color: '#ff5500', alignItems: 'center' }}>
                        <FaReact style={{ fontSize: '32px', }} />
                        <strong style={{ fontSize: 18 }}>Book Store</strong>
                    </div>
                    <div style={{ width: '50%' }}>
                        <Input className="override-input-component-by-hieulth" size="large" placeholder="Bạn muốn tìm gì hôm nay" prefix={<SearchOutlined style={{ color: '#ff5500' }} />} />
                    </div>
                    <Space size="middle">
                        <a href="#">
                            <Badge count={5} size="small" color="#ff5500" style={{ boxShadow: 'none' }}>
                                <Avatar icon={<LuShoppingCart size={26} />} size="large" style={{ backgroundColor: '#333' }} />
                            </Badge>
                        </a>
                        <Space>
                            {user && <Dropdown menu={{ items }} trigger={['click']}
                                dropdownRender={(menu) => {
                                    return (
                                        <div style={contentMenuStyle}>
                                            {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                                        </div>
                                    )
                                }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <Avatar src={<img src={url} alt="avatar" />} style={{ backgroundColor: '#fff' }} />
                                    </Space>
                                </a>
                            </Dropdown>}
                            <Text style={{ color: '#fffc' }}>{user && user.fullName ? user.fullName : "Đăng nhập"}</Text>
                        </Space>


                    </Space> */}
                </Header>
                <Content style={contentStyle}><Outlet /></Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout >

        </>
    )
}
export default LayoutClient
