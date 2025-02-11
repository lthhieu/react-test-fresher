import { DeleteOutlined, EditOutlined, ExportOutlined, ImportOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tag, App } from 'antd';
import { useRef, useState } from 'react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';
import { APIDeleteUser, APIFetchBooksWithPaginate, APIFetchUsersWithPaginate } from '@/services/api';
import { SortOrder } from 'antd/lib/table/interface';
import UserInfo from '@/components/admin/user/user.info';
import moment from 'moment';
import UserModal from '@/components/admin/user/user.modal';
import ImportUserModal from '@/components/admin/user/import.user.modal';
import { CSVLink } from 'react-csv';
import type { PopconfirmProps } from 'antd';
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
    mainText: string,
    author: string,
}

//record type
type sortInfo = "mainText" | "price" | "author" | "createdAt"
const Book = () => {
    const actionRef = useRef<ActionType>();
    const [meta, setMeta] = useState({
        current: '1',
        pageSize: '5',
        pages: 0,
        total: 0
    })
    const [userInfo, setUserInfo] = useState<UserWithPaginate | null>(null)
    const [dataCsv, setDataCsv] = useState<UserWithPaginate[] | null>(null)
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openImportUserModal, setOpenImportUserModal] = useState(false);

    const { message, notification } = App.useApp();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const deleteUser = async (id: string) => {
        const res = await APIDeleteUser(id)
        if (res.data) {
            message.success('Xóa thành công!')
            actionRef.current?.reload()
        } else {
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                placement: 'topRight',
            });
        }
    }

    const showModal = () => {
        setUserInfo(null)
        setOpenModal(true);

    };
    const showModalUpdateUser = (data: UserWithPaginate) => {
        setUserInfo(data)
        setOpenModal(true)
    }
    const showImportUserModal = () => {
        setOpenImportUserModal(true);
    }
    const confirm = (id: string) =>
        new Promise(() => {
            setTimeout(() => {
                deleteUser(id)
            }, 1000);
        });

    const columns: ProColumns<BooksWithPaginate>[] = [
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
                        // setUserInfo(record);
                        // showDrawer()
                    }}>
                        {record._id}
                    </a>
                )
            },
        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            search: true,
            ellipsis: true,
            sorter: true,
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            sorter: true,
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            search: true,
            ellipsis: true,
            sorter: true,
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            search: false,
            sorter: true,
            render: (_, record) => (
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price)}</span>
            )
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            sorter: true,
            hideInSearch: true,
            render: (_, record) => (
                <span>{moment(record.createdAt).format('DD/MM/YYYY').toString()}</span>
            ),
        },
        {
            title: 'Tùy chọn',
            hideInSearch: true,
            render: (text, record, _, action) => (
                <Space>

                    <EditOutlined
                        // onClick={() => showModalUpdateUser(record)}
                        style={{ color: '#faad14', fontSize: 18, cursor: 'pointer' }} />{' '}
                    <Popconfirm
                        title="Xóa sách"
                        description={`Sách ${record.mainText} sẽ bị xóa?`}
                        icon={<QuestionCircleOutlined style={{ color: '#ff4d4f' }} />}
                        placement='left'
                    // onConfirm={() => confirm(record._id)}
                    >
                        <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 18, cursor: 'pointer' }} />
                    </Popconfirm>
                </Space>
            )
        },
    ];

    return (<>
        <ConfigProvider locale={viVN}>
            <ProTable<BooksWithPaginate, MyParams>
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
                        'mainText=': paramsCopy.mainText ? `/${paramsCopy.mainText}/i` : null,
                        'author=': paramsCopy.author ? `/${paramsCopy.author}/i` : null,
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
                    //sort -createdAt is default
                    if (!queryString.includes('createdAt')) {
                        queryString += '&sort=-createdAt'
                    }
                    // console.log(queryString)
                    const res = await APIFetchBooksWithPaginate(queryString)
                    if (res.data) {
                        setMeta(res.data.meta)
                        // setDataCsv(res.data?.result)
                        return {
                            data: res.data?.result as BooksWithPaginate[],
                            total: res.data?.meta.total,
                            success: true
                        }
                    }
                    return []
                }}
                rowKey="_id"
                search={{
                    labelWidth: 'auto',
                }}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                pagination={{
                    pageSize: +meta.pageSize,
                    current: +meta.current,
                    // onChange: (page) => console.log(page),
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} dòng`,
                    pageSizeOptions: ['5', '10', '50', '100']
                }}
                dateFormatter="string"
                headerTitle="Danh sách sách"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={showModal}
                        type="primary"
                    >
                        Thêm mới
                    </Button>,

                ]}
            />
        </ConfigProvider>
        {/* <UserInfo
            onClose={onClose}
            open={open}
            data={userInfo}
        /> */}
        {/* <UserModal userInfo={userInfo} setUserInfo={setUserInfo} openModal={openModal} setOpenModal={setOpenModal} refreshTable={() => actionRef.current?.reload()} />
        <ImportUserModal openImportUserModal={openImportUserModal} setOpenImportUserModal={setOpenImportUserModal} refreshTable={() => actionRef.current?.reload()} /> */}
    </>)
}
export default Book