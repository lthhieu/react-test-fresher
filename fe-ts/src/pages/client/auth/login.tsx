import { boxStyle } from "@/pages/client/auth/register"
import { App, Button, Card, Divider, Flex, Form, Input } from "antd"
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import type { FormProps } from 'antd';
import { APILogin } from "@/services/api";
import { handleLogin } from "@/redux/feature/accountSlice";
import { useAppDispatch } from "@/redux/hooks";

const LoginPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    let navigate = useNavigate();
    const dispatch = useAppDispatch()
    const { message } = App.useApp();
    const onFinish: FormProps<LoginData>['onFinish'] = async (values) => {
        setLoading(true)
        const res = await APILogin(values.username, values.password);
        if (res.data) {
            message.success(res.message !== "" ? res.message : "Đăng nhập thành công!");
            localStorage.setItem('access_token', res.data.access_token);
            dispatch(handleLogin({
                isAuthenticated: true,
                user: res.data.user
            }))
            navigate("/");
        } else {
            message.error(res.message && Array.isArray(res.message) ? res.message[0] : res.message);
        }
        setLoading(false);
    };

    const onFinishFailed: FormProps<LoginData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Flex style={boxStyle} justify='center' align='center'>
            <Card title={<span style={{ fontSize: '24px', fontWeight: 700, justifyContent: 'center', width: '100%', display: 'flex' }}>Đăng nhập</span>} style={{ minWidth: 500 }}>
                <Form
                    layout='vertical'
                    name="login"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >

                    <Form.Item<LoginData>
                        label="Email"
                        name="username"
                        rules={[{ required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'This is not a valid email!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<LoginData>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label={null}
                    >
                        <Button block type="primary" htmlType="submit" loading={loading}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
                <Divider plain>Hoặc</Divider>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to="/register">Đăng ký bây giờ!</Link>
                </div>
            </Card>
        </Flex>
    )
}
export default LoginPage