import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';
import { APIFetchUsersWithPaginate } from '@/services/api';
import { SortOrder } from 'antd/lib/table/interface';
import UserInfo from '@/components/admin/user/user.info';
import moment from 'moment';
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

interface MyParams {
    fullName: string,
    email: string,
    isActive: 'active' | 'notActive',
    startTime: Date,
    endTime: Date
}

//record type
type sortInfo = "fullName" | "email" | "createdAt"

const UserTable = () => {
    const actionRef = useRef<ActionType>();
    const [meta, setMeta] = useState({
        current: '1',
        pageSize: '5',
        pages: 0,
        total: 0
    })
    const [userInfo, setUserInfo] = useState<UserWithPaginate | null>(null)
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
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
            render: (_, record) => {
                return (
                    <a onClick={() => {
                        setUserInfo(record);
                        showDrawer()
                    }}>
                        {record._id}
                    </a>
                )
            },
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            search: true,
            ellipsis: true,
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            copyable: true,
            sorter: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            render: (_, record) => (
                <Space>
                    <Tag color={record.isActive ? 'success' : 'error'} key={record._id}>
                        {record.isActive ? 'Đã xác thực' : 'Chưa xác thực'}
                    </Tag>
                </Space>
            ),
            valueType: 'select',
            valueEnum: {
                active: { text: 'Đã xác thực' },
                notActive: { text: 'Chưa xác thực', },
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            // valueType: 'date',
            sorter: true,
            hideInSearch: true,
            render: (_, record) => (
                <span>{moment(record.createdAt).format('DD/MM/YYYY').toString()}</span>
            ),
        },
        {
            title: 'Ngày tạo',
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
            hideInSearch: true,
            render: (text, record, _, action) => (
                <Space>

                    <EditOutlined style={{ color: '#faad14', fontSize: 18, cursor: 'pointer' }} />{' '}
                    <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 18, cursor: 'pointer' }} />
                </Space>
            )
        },
    ];
    return (<>
        <ConfigProvider locale={viVN}>
            <ProTable<UserWithPaginate, MyParams>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort: Record<sortInfo, SortOrder>, filter) => {
                    await waitTime(1000);

                    let queryString = `?current=${params.current}&pageSize=${params.pageSize}`

                    //search
                    const paramsCopy = { ...params }
                    delete paramsCopy.current
                    delete paramsCopy.pageSize
                    delete paramsCopy.keyword
                    const filters = {
                        'fullName=': paramsCopy.fullName ? `/${paramsCopy.fullName}/i` : null,
                        'email=': paramsCopy.email ? `/${paramsCopy.email}/i` : null,
                        'isActive=': paramsCopy.isActive === 'active' ? 'true' : paramsCopy.isActive === 'notActive' ? 'false' : null,
                        'createdAt>=': paramsCopy.startTime || null,
                        'createdAt<=': paramsCopy.endTime || null,
                    };

                    queryString += Object.entries(filters)
                        .filter(([_, value]) => value !== null)
                        .map(([key, value]) => `&${key}${value}`)
                        .join('');

                    //sorter
                    if (Object.entries(sort).length > 0) {
                        queryString += '&sort=' +
                            Object.entries(sort)
                                .map(([key, value]) => value === 'ascend' ? key : value === 'descend' ? `-${key}` : '')
                                .filter(Boolean)
                                .join(',');
                    }
                    console.log(queryString)
                    const res = await APIFetchUsersWithPaginate(queryString)
                    if (res.data) {
                        setMeta(res.data.meta)
                        return {
                            data: res.data?.result as UserWithPaginate[],
                            total: res.data?.meta.total,
                            success: true
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
                    pageSize: +meta.pageSize,
                    current: +meta.current,
                    // onChange: (page) => console.log(page),
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} dòng`,
                    pageSizeOptions: ['5', '10', '50', '100']
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
        <UserInfo
            onClose={onClose}
            open={open}
            data={userInfo}
        />
    </>
    );
};
export default UserTable