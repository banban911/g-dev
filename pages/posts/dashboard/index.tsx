import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppThunkDispatch} from '../../../src/store';
import {getPosts, selectPostState} from '../../../src/store/posts';
import SpinCircle from "../../../components/spin/SpinCircle";
import styles from './dashboard.module.css'
import {Button, Card, Col, FloatButton, QRCode, Row, Tag, Tour, TourProps, Typography} from "antd";
import {
    CustomerServiceOutlined,
    DeleteOutlined,
    EditOutlined,
    InfoCircleOutlined, MenuOutlined,
    PlusOutlined
} from "@ant-design/icons";
import AddPostModal from "../../../components/modal/post/AddPost";
import RemovePostModal from "../../../components/modal/post/RemovePost";
import EditPostModal from "../../../components/modal/post/EditPost";
import {PostInputTypes} from "../../../src/types/post";
import useTrans from "../../hooks/useTrans";

export interface PostType {
    id: number | string,
    title: string
    body: string
    userId: number,
    tags: [string],
    reactions: number
}

const Posts = () => {
    const {post, loading, error} = useSelector(selectPostState)
    const dispatch = useDispatch<AppThunkDispatch>()
    const deleteRef = useRef(null);
    const editRef = useRef(null);
    const addRef = useRef(null);
    const trans = useTrans();
    const steps: TourProps['steps'] = [
        {
            title: trans.post.logginSuccess,
            description: trans.post.takeATour,
            target: null,
            prevButtonProps: {
                children: <div>{trans.button.previous}</div>
            },
            nextButtonProps: {
                children: <div>{trans.button.next}</div>
            }
        },
        {
            title: trans.post.create,
            description: trans.post.addPost,
            placement: 'top',
            target: () => addRef.current,
            prevButtonProps: {
                children: <div>{trans.button.previous}</div>
            },
            nextButtonProps: {
                children: <div>{trans.button.next}</div>
            }
        },
        {
            title: trans.post.edit,
            description: trans.post.editOldPost,
            placement: 'right',
            target: () => editRef.current,
            prevButtonProps: {
                children: <div>{trans.button.previous}</div>
            },
            nextButtonProps: {
                children: <div>{trans.button.next}</div>
            }
        },
        {
            title: trans.post.remove,
            description: trans.post.removePost,
            placement: 'top',
            target: () => deleteRef.current,
            prevButtonProps: {
                children: <div>{trans.button.previous}</div>
            },
            nextButtonProps: {
                children: <div>{trans.button.next}</div>
            }
        },

    ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, []);

    //fetch initial data
    useEffect(() => {
        dispatch(getPosts())
    }, [])

    const [openTour, setOpenTour] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openRemoveModal, setOpenRemoveModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [curPost, setCurPost] = useState<PostType>({
        id: '',
        title: '',
        body: '',
        userId: 0,
        tags: [''],
        reactions: 0
    })

    const handleRemove = (item: PostType) => {
        setCurPost(item)
        setOpenRemoveModal(true)
    }

    const handleEdit = (item: PostType) => {
        setCurPost(item)
        setOpenEditModal(true)
    }

    if (error) {
        return (<div>{error}</div>)
    } else {
        return (loading ? <SpinCircle/> :
                <div className={styles.container}>
                    <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />
                    <Row gutter={[16, 24]}>
                        {post && post.map((item, idx) => (
                            <Col xl={{span: 4}} lg={{span: 8}} sm={{span: 12}} offset={1} key={`${item.id}_${idx}`}
                            >
                                <Card
                                    title={item.title}
                                    bordered={false}
                                    style={{width: '100%'}}
                                    actions={[
                                        <DeleteOutlined key="delete" onClick={() => handleRemove(item)} ref={item.id === 1 ? deleteRef : null} />,
                                        <EditOutlined key="edit" onClick={() => handleEdit(item)} ref={item.id === 1 ? editRef : null} />,
                                    ]}>
                                    <Typography.Paragraph
                                        ellipsis={{rows: 4, expandable: true, symbol: 'more'}}
                                    >{item.body}</Typography.Paragraph>
                                    <div>
                                        <div style={{display: `${loading ? 'block' : 'none'}`}}>
                                            <QRCode value="http://localhost:3000/posts/dashboard"/>
                                        </div>
                                        {item.tags.map((tag, idx) => (
                                            <Tag key={idx}>{tag}</Tag>
                                        ))}
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <AddPostModal isModalOpen={openAddModal} setOpenModal={setOpenAddModal}/>

                    <RemovePostModal isModalOpen={openRemoveModal} setOpenModal={setOpenRemoveModal} data={curPost}/>
                    <EditPostModal isModalOpen={openEditModal} setOpenModal={setOpenEditModal} data={curPost}/>
                    <FloatButton style={{ right: 94 }} tooltip={trans.post.create} onClick={() => setOpenAddModal(true)} type="primary" icon={<PlusOutlined/>} ref={addRef}/>
                    <FloatButton.Group
                        trigger="click"
                        type="default"
                        style={{ right: 24 }}
                        icon={<MenuOutlined />}
                    >
                        <FloatButton tooltip={trans.post.takeATour} onClick={() => setOpenTour(true)} type="default" icon={<InfoCircleOutlined />} />
                        <FloatButton.BackTop />
                    </FloatButton.Group>
                </div>

        )
    }
}
export default Posts

