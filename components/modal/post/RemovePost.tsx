import React, {useEffect, useState} from 'react';
import {Divider, Modal, Typography} from 'antd';
import {ModalFormPropTypes} from "../../../src/types/post";
import {PostType} from "../../../pages/posts/dashboard";
import {useDispatch} from "react-redux";
import {deletePost} from "../../../src/store/posts";

const RemovePostModal = (props: ModalFormPropTypes & { data: PostType }) => {
    const dispatch = useDispatch()
    const {isModalOpen, setOpenModal, data} = props
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setOpen(isModalOpen)
    }, [isModalOpen])

    const handleOk = async () => {
        await dispatch(deletePost)
        setOpen(false);
        setOpenModal(false)
    };
    const handleCancel = () => {
        setOpen(false);
        setOpenModal(false)
    };

    return (
        <>
            <Modal
                title="Are you sure you want to delete this post?"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Delete"
                cancelText="Cancel"
                confirmLoading={loading}
            >
                <Divider/>
                <Typography.Paragraph>
                    Items in your recycle bin will be automatically deleted after 30 days. You can delete them earlier
                    from your recycle bin by going to &ldquo;Activity log&ldquo; in your settings.
                </Typography.Paragraph>
            </Modal>
        </>
    );
};

export default RemovePostModal