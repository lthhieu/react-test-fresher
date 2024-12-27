import { Drawer } from "antd"

interface IProps {
    onClose: () => void,
    open: boolean,
    data: UserWithPaginate | null
}
const UserInfo = (props: IProps) => {
    const { data, onClose, open } = props
    return (
        <Drawer title="Thông tin người dùng" onClose={onClose} open={open} width={720}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    )
}
export default UserInfo