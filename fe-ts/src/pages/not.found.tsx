import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

const NotFound = () => {
    let navigate = useNavigate();
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            width: '100%', height: '100vh'
        }}>
            <Result
                status="404" title="404"
                subTitle="Xin lỗi, trang bạn truy cập không tồn tại !"
                extra={<Button onClick={() => navigate("/")} type="primary">Trang chủ</Button>}
            />
        </div>

    )
}

export default NotFound;