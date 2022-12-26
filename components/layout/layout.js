import {Layout as AntdLayout} from "antd";
import MainNav from "../navbar/MainNav";
import MainFooter from "../footer/MainFooter";
import styles from './layout.module.css'

export default function Layout({children}) {
    const {Header, Footer, Content} = AntdLayout;
    return (
        <>
            <AntdLayout className={styles.layout}>
                <AntdLayout>
                    <Header className={styles.header}>
                        <MainNav/>
                    </Header>
                    <Content className={styles.content}>{children}</Content>
                    <Footer className={styles.footer}>
                        <MainFooter/>
                    </Footer>
                </AntdLayout>
            </AntdLayout>
        </>
    );
}
