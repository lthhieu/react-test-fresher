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
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button onClick={() => navigate("/")} type="primary">Back Home</Button>}
            />
        </div>

    )
}

export default NotFound;