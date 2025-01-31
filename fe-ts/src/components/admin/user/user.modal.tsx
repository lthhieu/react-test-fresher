import { Modal, Form, Input, App } from 'antd';
import { useState } from 'react';
import { APICreateNewUser } from '@/services/api';
import type { FormProps } from 'antd';

interface MyProps {
    openModal: boolean,
    setOpenModal: (v: boolean) => void
    refreshTable: () => void
}
const UserModal = (props: MyProps) => {
    const { openModal, setOpenModal, refreshTable } = props
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const { message, notification } = App.useApp();
    const handleOk = () => {
        // setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            form.submit()
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        form.resetFields()
        setOpenModal(false);
    };
    const onFinish: FormProps<RegisterData>['onFinish'] = async (values) => {
        const res = await APICreateNewUser(values);
        if (res.data) {
            message.success(res.message !== "" ? res.message : "Đã tạo tài khoản thành công!");
            form.resetFields()
            setOpenModal(false);
            refreshTable()
        } else {
            // message.error(res.message && Array.isArray(res.message) ? res.message[0] : res.message);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                placement: 'topRight',
            });
        }
    };

    const onFinishFailed: FormProps<RegisterData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Modal
            title="Tạo mới người dùng"
            open={openModal}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Tạo mới"
        >
            <Form
                layout='vertical'
                name="register"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
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
                    label="Họ tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your fullName!' }]}
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

            </Form>
        </Modal>
    )
}
export default UserModal