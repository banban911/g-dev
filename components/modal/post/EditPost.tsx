import {Button, Form, Input, Modal, notification, Select} from "antd";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createPost, editPost} from "../../../src/store/posts";
import TextArea from "antd/lib/input/TextArea";
import {ModalFormPropTypes, PostInputTypes} from "../../../src/types/post";
import {PostType} from "../../../pages/posts/dashboard";
import {NotificationType} from "../../../src/types/notification";
import {CloseCircleOutlined} from "@ant-design/icons";
import useTrans from "../../../pages/hooks/useTrans";

const options = [
    {
        label: 'history',
        value: 'history'
    }, {
        label: 'american',
        value: 'american'
    }, {
        label: 'crime',
        value: 'crime'
    }, {
        label: 'english',
        value: 'english'
    }, {
        label: 'fiction',
        value: 'fiction'
    }, {
        label: 'french',
        value: 'french'
    }, {
        label: 'mystery',
        value: 'mystery'
    },
]

const EditPostModal = (props: ModalFormPropTypes & { data: PostType }) => {
    const {isModalOpen, setOpenModal, data} = props
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const trans = useTrans()
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Post saved.',
            description:
                "Let's create a new post!",
        });
    };

    useEffect(() => {
        setIsOpen(isModalOpen)
    }, [isModalOpen])

    const [form] = Form.useForm();

    const handleFinish = (values: PostInputTypes) => {
        setLoading(true)
        setTimeout(async () => {
            await dispatch(editPost({...data, ...values})) //override post info with updated content
            openNotificationWithIcon('success')
            setIsOpen(false)
            setLoading(false)
        }, 300)

    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleAfterclose = () => {
        setIsOpen(false)
        setOpenModal(false)
    }

    return (
        <>
            {contextHolder}
            <Modal
                title={<div style={{textAlign: 'center', marginBottom: '1rem'}}>{trans.post.editTitle}</div>}
                width={1000}
                open={isOpen}
                onOk={form.submit}
                onCancel={handleCancel}
                destroyOnClose
                closable
                maskClosable
                keyboard //support use ESC to close
                confirmLoading={loading}
                centered
                afterClose={handleAfterclose}
                closeIcon={<CloseCircleOutlined style={{fontSize: '1.25rem'}}/>}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                    initialValues={data}
                    onFinish={handleFinish}
                    autoComplete="off"
                    preserve={false}
                >
                    <Form.Item
                        label={trans.post.title}
                        name="title"
                        rules={[{required: true, message: 'Please enter your title!'}]}
                    >
                        <Input placeholder='Your title'/>
                    </Form.Item>

                    <Form.Item
                        label={trans.post.content}
                        name="body"
                        rules={[{required: true, message: 'Please enter your content!'}]}
                    >
                        <TextArea rows={6} placeholder='Write something'/>
                    </Form.Item>

                    <Form.Item
                        label={trans.post.tags}
                        name="tags"
                        rules={[{required: false, message: 'Please select or create your tag!'}]}
                    >
                        <Select
                            mode="tags"
                            style={{width: '100%'}}
                            placeholder="Please select"
                            options={options}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>

    )
}

export default EditPostModal