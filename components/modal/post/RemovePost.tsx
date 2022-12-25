import React, {useEffect, useState} from 'react';
import {Divider, Modal, notification, Spin, Typography} from 'antd';
import {ModalFormPropTypes} from "../../../src/types/post";
import {PostType} from "../../../pages/posts/dashboard";
import {useDispatch} from "react-redux";
import {deletePost} from "../../../src/store/posts";
import SpinCircle from "../../spin/SpinCircle";
import {NotificationType} from "../../../src/types/notification";
import {CloseCircleOutlined} from "@ant-design/icons";

const RemovePostModal = (props: ModalFormPropTypes & { data: PostType }) => {
    const dispatch = useDispatch()
    const {isModalOpen, setOpenModal, data} = props
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Post deleted.',
            description:
            'You can undo this action within 30 days from now!',
        });
    };

    useEffect(() => {
        setOpen(isModalOpen)
    }, [isModalOpen])

    const handleOk = () => {
        setLoading(true)
        setTimeout(async () => {
            await dispatch(deletePost({...data}))
            openNotificationWithIcon('success')
            setOpen(false);
            setOpenModal(false)
            setLoading(false)
        }, 300)
    };
    const handleCancel = () => {
        setOpen(false);
        setOpenModal(false)
    };

    return (
        <Spin spinning={loading}>
            {contextHolder}
            <Modal
                title="Are you sure you want to delete this post?"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Delete"
                cancelText="Cancel"
                confirmLoading={loading}
                closeIcon={<CloseCircleOutlined style={{fontSize: '1.25rem'}}/>}
            >
                <Divider/>
                <Typography.Paragraph>
                    Items in your recycle bin will be automatically deleted after 30 days. You can delete them earlier
                    from your recycle bin by going to &ldquo;Activity log&ldquo; in your settings.
                </Typography.Paragraph>
            </Modal>
        </Spin>
    );
};

export default RemovePostModal