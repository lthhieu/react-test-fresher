import { Badge, Drawer } from "antd"
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import moment from "moment";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from "react";
import { Image, Upload } from 'antd';

interface IProps {
    onClose: () => void,
    open: boolean,
    data: BooksWithPaginate | null
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const BookInfo = (props: IProps) => {
    const { data, onClose, open } = props
    // const url = `${import.meta.env.VITE_BACKEND_URI}/images/avatar/${data?.avatar}`
    const items: DescriptionsProps['items'] = [
        {
            label: 'ID',
            children: data?._id,
            span: { xs: 1, sm: 2 }
        },
        {
            label: 'Tên sách',
            children: data?.mainText,
            span: { xs: 1, sm: 2 }
        },
        {
            label: 'Tác giả',
            children: data?.author,
            span: { xs: 1, sm: 2 }
        },
        {
            label: 'Giá tiền',
            children: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data?.price!),
            span: { xs: 1, sm: 2 }
        },
        {
            label: 'Thể loại',
            children: <Badge status="processing" text={data?.category} />,
            span: { xs: 1, sm: 3 }
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
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    useEffect(() => {
        if (data) {
            let temp: UploadFile[] | [] = [], temp1: any = {}
            if (data.thumbnail) {
                temp1 = { uid: '-1', name: 'image-1', status: 'done', url: `${import.meta.env.VITE_BACKEND_URI}/images/book/${data.thumbnail}` }
            }
            if (data.slider && data.slider.length > 0) {
                temp = data.slider.map((el, idx) => ({ uid: idx + '', name: `image${idx}`, status: 'done', url: `${import.meta.env.VITE_BACKEND_URI}/images/book/${el}` }))
            }
            setFileList([temp1, ...temp])
        }
    }, [data])
    const [fileList, setFileList] = useState<UploadFile[] | []>([]);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    return (
        <Drawer title="Thông tin sách" onClose={onClose} open={open} width={'75%'}>
            <Descriptions
                // title="Responsive Descriptions"
                bordered
                column={{ xs: 1, sm: 2 }}
                items={items}
                style={{ marginBottom: 10 }}
            />
            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                showUploadList={{ showRemoveIcon: false }}>
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </Drawer>
    )
}
export default BookInfo