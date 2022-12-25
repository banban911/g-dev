import {Layout as AntdLayout} from "antd";

export default function Layout({children}) {
    const {Sider, Content} = AntdLayout;
    return (
        <>
            <AntdLayout>
                <Sider collapsible>Sider</Sider>
                <Content>{children}</Content>
            </AntdLayout>
        </>
    );
}
	