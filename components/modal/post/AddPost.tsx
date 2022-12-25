import {Form, Input, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createPost} from "../../../src/store/posts";
import TextArea from "antd/lib/input/TextArea";
import {ModalFormPropTypes, PostInputTypes} from "../../../src/types/post";
import {CloseCircleOutlined, CloseSquareFilled} from "@ant-design/icons";
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

const AddPostModal = (props: ModalFormPropTypes) => {
    const {isModalOpen, setOpenModal} = props
    console.log('isOpen pass down', isModalOpen)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const trans = useTrans()
    const dispatch = useDispatch()

    useEffect(() => {
        setIsOpen(isModalOpen)
    }, [isModalOpen])

    const [form] = Form.useForm();

    const handleFinish = (values: PostInputTypes) => {
        dispatch(createPost(values))
        Modal.destroyAll()
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleAfterclose = () => {
        setIsOpen(false)
        setOpenModal(false)
    }

    return (
        <Modal
            title={<div style={{textAlign: 'center', marginBottom: '1rem'}}>{trans.post.addTitle}</div>}
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
                initialValues={{
                    title: '',
                    body: '',
                    tags: []
                }}
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
    )
}

export default AddPostModal