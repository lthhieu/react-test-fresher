import { Modal, Form, Input, App } from 'antd';
import { useEffect, useState } from 'react';
import { APICreateNewUser, APIUpdateUser } from '@/services/api';
import type { FormProps } from 'antd';

interface MyProps {
    openModal: boolean,
    setOpenModal: (v: boolean) => void
    refreshTable: () => void,
    userInfo: UserWithPaginate | null,
    setUserInfo: (data: UserWithPaginate | null) => void
}
const UserModal = (props: MyProps) => {
    const { openModal, setOpenModal, refreshTable, userInfo, setUserInfo } = props
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const { message, notification } = App.useApp();
    useEffect(() => {
        if (userInfo) {
            form.setFieldsValue({
                email: userInfo.email,
                fullName: userInfo.fullName,
                phone: userInfo.phone,
            });
        }
    }, [userInfo]);
    const handleOk = () => {
        // setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            form.submit()
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        form.resetFields()
        setUserInfo(null)
        setOpenModal(false);
    };
    const onFinish: FormProps<RegisterData>['onFinish'] = async (values) => {
        if (userInfo) {
            const res = await APIUpdateUser({
                _id: userInfo._id, fullName: values.fullName, phone: values.phone
            })
            if (res.data) {
                message.success(res.message !== "" ? res.message : "Cập nhật thông tin thành công!");
                form.resetFields()
                setOpenModal(false);
                setUserInfo(null)
                refreshTable()
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra!',
                    description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    placement: 'topRight',
                });
            }
        } else {
            const res = await APICreateNewUser(values);
            if (res.data) {
                message.success(res.message !== "" ? res.message : "Đã tạo tài khoản thành công!");
                form.resetFields()
                setOpenModal(false);
                setUserInfo(null)
                refreshTable()
            } else {
                // message.error(res.message && Array.isArray(res.message) ? res.message[0] : res.message);
                notification.error({
                    message: 'Có lỗi xảy ra!',
                    description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    placement: 'topRight',
                });
            }
        }

    };

    const onFinishFailed: FormProps<RegisterData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Modal
            title={userInfo ? "Cập nhật thông tin người dùng" : 'Tạo mới người dùng'}
            open={openModal}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText={userInfo ? "Cập nhật" : 'Tạo mới'}
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
                    <Input disabled={userInfo ? true : false} />
                </Form.Item>

                <Form.Item<RegisterData>
                    label="Họ tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your fullName!' }]}
                >
                    <Input />
                </Form.Item>

                {!userInfo && <Form.Item<RegisterData>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>}

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