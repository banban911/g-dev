import {AppstoreOutlined, HomeOutlined, LogoutOutlined} from '@ant-design/icons'
import {Menu, MenuProps, Typography} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {selectAuthState, setAuthState} from "../../src/store/auth";
import {useRouter} from "next/router";
import {useMemo, useState} from 'react';
import SpinCircle from '../spin/SpinCircle';
import useTrans from "../../pages/hooks/useTrans";

export default function MainNav() {
    const [loading, setLoading] = useState(false)
    const authState = useSelector(selectAuthState)
    const dispatch = useDispatch()
    const router = useRouter()
    const trans = useTrans()
    const handleLogout = () => {
        setLoading(true)
        localStorage.removeItem('token')
        dispatch(setAuthState(false))
        router.push('/auth/login')
        setLoading(false)
    }

    const selectedKey = useMemo(() => {
        const curPath = router.pathname
        if (curPath === '/') {
            return 'home'
        } else if (curPath === '/posts/dashboard') {
            return 'posts'
        } else {
            return 'home'
        }
    }, [router])


    const items: MenuProps['items'] = [
        {
            label: (<Typography.Link href='/'>
                {trans.nav.home}
            </Typography.Link>),
            key: 'home',
            icon: <HomeOutlined/>
        },
        {
            label: (<Typography.Link href={`/${router.locale}/posts/dashboard`}>
                {trans.nav.posts}
            </Typography.Link>),
            key: 'posts',
            icon: <AppstoreOutlined/>,
        },
        {
            label: (<Typography.Text onClick={handleLogout}>
                {trans.nav.logout}
            </Typography.Text>),
            key: 'logout',
            icon: <LogoutOutlined/>,
        },

    ];

    return (
        loading ? <SpinCircle/> :
            <Menu mode="horizontal" items={items} selectedKeys={[selectedKey]}/>
    )
}