import { Avatar, Badge, Drawer } from "antd"
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import moment from "moment";
interface IProps {
    onClose: () => void,
    open: boolean,
    data: UserWithPaginate | null
}

const UserInfo = (props: IProps) => {
    const { data, onClose, open } = props
    const url = `${import.meta.env.VITE_BACKEND_URI}/images/avatar/${data?.avatar}`
    const items: DescriptionsProps['items'] = [
        {
            label: 'ID',
            children: data?._id,
            span: { xs: 1, sm: 2 }
        },
        {
            label: 'Tên hiển thị',
            children: data?.fullName,
            span: { xs: 1, sm: 2 }
        },
        {
            label: 'Email',
            children: data?.email,
            span: { xs: 1, sm: 2 }
        },
        {
            label: 'Số điện thoại',
            children: data?.phone,
            span: { xs: 1, sm: 2 }
        },
        {
            label: 'Quyền hạn',
            children: <Badge status="processing" text={data?.role} />,
            span: { xs: 1, sm: 2 }
        },
        {
            label: 'Ảnh đại diện',
            children: <Avatar size={40} src={url}></Avatar>,
            span: { xs: 1, sm: 2 }
        },
        {
            label: 'Ngày tạo',
            children: moment(data?.createdAt!).format('DD/MM/YYYY').toString(),
            span: { xs: 1, sm: 2 }
        },
        {
            label: 'Ngày cập nhật',
            children: moment(data?.updatedAt!).format('DD/MM/YYYY').toString(),
            span: { xs: 1, sm: 2 }
        },
    ];
    console.log(moment("2014-02-27T10:00:00").format('DD-MM-YYYY'))
    return (
        <Drawer title="Thông tin người dùng" onClose={onClose} open={open} width={'50%'}>
            <Descriptions
                // title="Responsive Descriptions"
                bordered
                column={{ xs: 1, sm: 2 }}
                items={items}
            />
        </Drawer>
    )
}
export default UserInfo