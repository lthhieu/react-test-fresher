import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

const NotPermission = () => {
    let navigate = useNavigate();
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            width: '100%', height: '100vh'
        }}>
            <Result
                status="403" title="403"
                subTitle="Xin lỗi, bạn không có quyền truy cập tài nguyên này !"
                extra={<Button onClick={() => navigate("/")} type="primary">Trang chủ</Button>}
            />
        </div>

    )
}

export default NotPermission;