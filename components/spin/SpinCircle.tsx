import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import {FC} from "react";

const antIcon = <LoadingOutlined style={{fontSize: 48}} spin/>;

const SpinCircle: FC = () => {
    const styles = {
        minWidth: '100vw',
        minHeight: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return (
        <div style={styles}>
            <Spin indicator={antIcon}/>
        </div>
    )
}

export default SpinCircle