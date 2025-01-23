import { Modal, Form, App, Table, Typography } from 'antd';
import { useState } from 'react';
import { APICreateBulkUsers, APICreateNewUser } from '@/services/api';
import type { FormProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import type { TableProps } from 'antd';
import { Buffer } from 'buffer';
import * as Excel from 'exceljs';

interface DataType {
    fullName: string;
    email: string;
    phone: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Tên hiển thị',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
    },
];

const { Dragger } = Upload;

interface MyProps {
    openImportUserModal: boolean,
    setOpenImportUserModal: (v: boolean) => void
    refreshTable: () => void
}
const ImportUserModal = (props: MyProps) => {
    const { openImportUserModal, setOpenImportUserModal, refreshTable } = props
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([])
    const [form] = Form.useForm();
    const { message, notification } = App.useApp();

    const handleOk = () => {
        // setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(async () => {
            const bulkData = data.map((v: Exclude<DataType, 'password'>) => ({
                ...v,
                password: '123456'
            }))
            const res = await APICreateBulkUsers(bulkData)
            if (res.statusCode === 201) {
                if (res.data) {
                    notification.success({ message: 'Tạo thành công', description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}` })
                    refreshTable()
                }
                if (!res.data?.detail) {
                    handleCancel()
                }
            } else {
                message.error("Có điều gì đó xảy ra ..")
            }
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        setData([])
        setOpenImportUserModal(false);
    };
    const onFinish: FormProps<RegisterData>['onFinish'] = async (values) => {
        const res = await APICreateNewUser(values);
        if (res.data) {
            message.success(res.message !== "" ? res.message : "Đã tạo tài khoản thành công!");
            form.resetFields()
            setOpenImportUserModal(false);
            // refreshTable()
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
    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        async onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                if (info.file.originFileObj) {
                    //js file fo buffer
                    const arrayBuffer = await info.file.originFileObj.arrayBuffer()
                    const buffer = Buffer.from(arrayBuffer)
                    //load buffer data - read
                    const workbook = new Excel.Workbook();
                    let jsonData: DataType[] = [];
                    await workbook.xlsx.load(buffer).then(function () {
                        const worksheet = workbook.getWorksheet(1);
                        //excel to json
                        if (worksheet) {
                            // read first row as data keys
                            let firstRow = worksheet.getRow(1);
                            if (!firstRow.cellCount) return;
                            let keys = firstRow.values as Array<any>;
                            worksheet.eachRow((row, rowNumber) => {
                                if (rowNumber == 1) return;
                                let values = row.values as Array<any>
                                let obj: any = {};
                                for (let i = 1; i < keys.length; i++) {
                                    obj[keys[i]] = values[i];
                                }
                                jsonData.push(obj);
                            })
                        }

                    });
                    setData(jsonData)
                }
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        //only csv or xlsx
        beforeUpload: (file) => {
            const typeCheck = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv']
            const isValidate = typeCheck.some((element) => element === file.type);
            if (!isValidate) {
                message.error(`${file.name} is not a xlsx or csv file`);
            }
            return isValidate || Upload.LIST_IGNORE;
        },

        //prevent call action
        customRequest: ({ onSuccess }) => {
            if (onSuccess) {
                onSuccess("ok hieulth");
            }
        },


    };
    return (
        <Modal
            title="Import Data User"
            open={openImportUserModal}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Import data"
            width={"45%"}
            okButtonProps={{ disabled: data ? false : true }}
            destroyOnClose={true}
        >
            <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
                <p className="ant-upload-hint">
                    Hỗ trợ tải lên 1 file. Định dạng được hỗ trợ: xlsx, csv
                </p>
            </Dragger>
            <Typography style={{ margin: '20px 0px 10px 0px' }}>Dữ liệu người dùng:</Typography>
            <Table<DataType> columns={columns} dataSource={data} />
        </Modal>
    )
}
export default ImportUserModal