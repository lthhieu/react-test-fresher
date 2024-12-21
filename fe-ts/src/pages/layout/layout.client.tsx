
import { Link, Outlet } from "react-router"
import React from 'react';
import { Avatar, Badge, Dropdown, Input, Layout, MenuProps, Space, theme, Typography } from 'antd';
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
    return (
        <>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <div style={{ display: 'flex', gap: 4, color: '#ff5500', alignItems: 'center' }}>
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
                                    // Tạo danh sách mới từ items gốc
                                    const updatedItems = [...items];

                                    // Thêm phần tử vào danh sách nếu user.role === 'ADMIN'
                                    if (user?.role === 'ADMIN') {
                                        updatedItems.unshift({
                                            label: (
                                                <Link to={'/admin'}>
                                                    Quản lý hệ thống
                                                </Link>
                                            ),
                                            key: '4',

                                        });
                                    }
                                    return (
                                        <div style={contentMenuStyle}>
                                            {React.cloneElement(menu as React.ReactElement,
                                                {
                                                    style: menuStyle,
                                                    items: updatedItems, // Cập nhật danh sách phần tử
                                                }
                                            )}
                                        </div>
                                    )
                                }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <Avatar src={<img src={url} alt="avatar" />} style={{ backgroundColor: '#fff' }} />
                                    </Space>
                                </a>
                            </Dropdown>}
                            <Text style={{ color: '#fffc' }}>{user && user.fullName ? user.fullName : "Tài khoản"}</Text>
                        </Space>


                    </Space>
                </Header>
                <Content style={contentStyle}><Outlet /></Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout >

        </>
    )
}
export default LayoutClient
