import { Badge, Drawer } from "antd"
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
            // span: { xl: 2, xxl: 2 },
            children: <Badge status="processing" text={data?.role} />,
            span: { xs: 1, sm: 4 }
        },
        {
            label: 'Ngày tạo',
            // span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
            children: moment(new Date(data?.createdAt!)).format('DD/MM/YYYY').toString(),
            span: { xs: 1, sm: 2 }
        },
        {
            label: 'Ngày cập nhật',
            // span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
            children: moment(new Date(data?.updatedAt!)).format('DD/MM/YYYY').toString(),
            span: 2
        },
    ];
    console.log(moment(data?.updatedAt.toString(), "DD/MM/YYYY").toString())
    return (
        <Drawer title="Thông tin người dùng" onClose={onClose} open={open} width={'50%'}>
            <Descriptions
                // title="Responsive Descriptions"
                bordered
                column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                items={items}
            />
        </Drawer>
    )
}
export default UserInfo