import { APIRegister } from '@/services/api';
import type { FormProps } from 'antd';
import { Button, Card, Flex, Form, Input, Divider } from 'antd';
import { useState } from 'react';

const boxStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh',
    backgroundColor: '#f0f2f5'
};
const RegisterPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const onFinish: FormProps<RegisterData>['onFinish'] = async (values) => {
        setLoading(true)
        const res = await APIRegister(values);
        console.log(res)
        setLoading(false);
    };

    const onFinishFailed: FormProps<RegisterData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Flex style={boxStyle} justify='center' align='center'>
            <Card title={<span style={{ fontSize: '24px', fontWeight: 700, justifyContent: 'center', width: '100%', display: 'flex' }}>Đăng ký</span>} style={{ minWidth: 500 }}>
                <Form
                    layout='vertical'
                    name="register"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >
                    <Form.Item<RegisterData>
                        label="Họ tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your fullName!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<RegisterData>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'This is not a valid email!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<RegisterData>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<RegisterData>
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label={null}
                    >
                        <Button block type="primary" htmlType="submit" loading={loading}>
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
                <Divider plain>Hoặc</Divider>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <a href="#">Đăng nhập bây giờ!</a>
                </div>
            </Card>
        </Flex>
    )
}
export default RegisterPage