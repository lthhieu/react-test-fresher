import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useRef } from 'react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';
import { APIFetchUsersWithPaginate } from '@/services/api';
export const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
};


const columns: ProColumns<UserWithPaginate>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: 'ID',
        dataIndex: '_id',
        ellipsis: true,
        search: false,
        copyable: true,
        // render: (_, record) => (
        //     <a href='#'>
        //         {record._id}
        //     </a>
        // ),
    },
    {
        // disable: true,
        title: 'Full name',
        dataIndex: 'fullName',
        search: true,
        // filters: true,
        // onFilter: true,
        ellipsis: true,
        sorter: true,

        // valueType: 'select',
        // valueEnum: {
        //     all: { text: '超长'.repeat(50) },
        //     open: {
        //         text: '未解决',
        //         status: 'Error',
        //     },
        //     closed: {
        //         text: '已解决',
        //         status: 'Success',
        //         disabled: true,
        //     },
        //     processing: {
        //         text: '解决中',
        //         status: 'Processing',
        //     },
        // },
    },
    {
        // disable: true,
        title: 'Email',
        dataIndex: 'email',
        search: true,
        copyable: true,
        sorter: true,
        // filters: true,
        // onFilter: true,
        // ellipsis: true,
        // valueType: 'select',
        // valueEnum: {
        //     all: { text: '超长'.repeat(50) },
        //     open: {
        //         text: '未解决',
        //         status: 'Error',
        //     },
        //     closed: {
        //         text: '已解决',
        //         status: 'Success',
        //         disabled: true,
        //     },
        //     processing: {
        //         text: '解决中',
        //         status: 'Processing',
        //     },
        // },
    },
    {
        // disable: true,
        title: 'Trạng thái',
        dataIndex: 'isActive',
        // search: true,
        // renderFormItem: (_, { defaultRender }) => {
        //     return defaultRender(_);
        // },
        render: (_, record) => (
            <Space>
                <Tag color={record.isActive ? 'success' : 'error'} key={record._id}>
                    {record.isActive ? 'Đã xác thực' : 'Chưa xác thực'}
                </Tag>
            </Space>
        ),
        // search: false,
        valueType: 'select',
        valueEnum: {
            active: { text: 'Đã xác thực' },
            notActive: { text: 'Chưa xác thực', },
        },
    },
    {
        title: 'Ngày tạo',
        // key: 'showTime',
        dataIndex: 'createdAt',
        valueType: 'date',
        sorter: true,
        hideInSearch: true,
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
            transform: (value) => {
                return {
                    startTime: value[0],
                    endTime: value[1],
                };
            },
        },
    },
    {
        title: 'Tùy chọn',
        render: (text, record, _, action) => (
            <Space>

                <EditOutlined style={{ color: '#faad14', fontSize: 18, cursor: 'pointer' }} />{' '}
                <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 18, cursor: 'pointer' }} />
            </Space>
        )
    },
];

const UserTable = () => {
    const actionRef = useRef<ActionType>();
    return (
        <ConfigProvider locale={viVN}>
            <ProTable<UserWithPaginate>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(sort, filter);
                    await waitTime(2000);
                    const res = await APIFetchUsersWithPaginate()
                    if (res.data) {
                        return {
                            data: res.data?.result as UserWithPaginate[],
                            // total: res.data?.meta.total
                        }
                    }
                    return []
                }}
                // editable={{
                //     type: 'multiple',
                // }}
                // columnsState={{
                //     persistenceKey: 'pro-table-singe-demos',
                //     persistenceType: 'localStorage',
                //     defaultValue: {
                //         option: { fixed: 'right', disable: true },
                //     },
                //     onChange(value) {
                //         console.log('value: ', value);
                //     },
                // }}
                rowKey="_id"
                search={{
                    labelWidth: 'auto',
                }}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                // form={{
                //     // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
                //     syncToUrl: (values, type) => {
                //         if (type === 'get') {
                //             return {
                //                 ...values,
                //                 created_at: [values.startTime, values.endTime],
                //             };
                //         }
                //         return values;
                //     },
                // }}
                pagination={{
                    pageSize: 5,
                    onChange: (page) => console.log(page),
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} dòng`
                }}
                dateFormatter="string"
                headerTitle="Danh sách người dùng"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            actionRef.current?.reload();
                        }}
                        type="primary"
                    >
                        Thêm mới
                    </Button>,
                ]}
            />
        </ConfigProvider>

    );
};
export default UserTable