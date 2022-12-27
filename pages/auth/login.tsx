import { useDispatch, useSelector } from "react-redux";
import { Fragment, ReactElement, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  notification,
  Space,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import auth, { selectAuthState, setAuthState } from "../../src/store/auth";
import SpinCircle from "../../components/spin/SpinCircle";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useTrans from "../hooks/useTrans";

export default function Login() {
  type NotificationType = "success" | "info" | "warning" | "error";

  interface loginInfo {
    username: string;
    password: string;
  }

  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const trans = useTrans();

  const loginErrorNotif = (type?: NotificationType) => {
    api["error"]({
      message: trans.login.fail,
      description: trans.login.loginFailMsg,
    });
  };

  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const router = useRouter();

  const login = async (values: loginInfo) => {
    const { username, password } = values;
    const res = await axios.post(`http://localhost:3000/api/auth/login`, {
      username,
      password,
    });
    return res;
  };

  const onFinish = (values: loginInfo) => {
    setLoading(true);
    setTimeout(async () => {
      const res = await login(values);
      if (res) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        dispatch(setAuthState(true));
      }
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    if (authState) {
      router.push("/posts/dashboard");
    }
  }, [authState]);

  const onFinishFailed = async (errorInfo: any) => {};
  return loading ? (
    <SpinCircle />
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `calc(100vh - 64px)`,
      }}
    >
      {contextHolder}
      <Card
        title={<div style={{ textAlign: "center" }}>Welcome back.</div>}
        bordered={false}
        loading={loading}
        style={{ width: "33vw", minWidth: "400px", maxWidth: "500px" }}
      >
        <Form
          name='basic'
          initialValues={{ username: "", password: "" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='on'
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder='Username' prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder='Password' prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <Checkbox>Remember me</Checkbox>
              <Typography.Link className='login-form-forgot' href=''>
                Forgot password
              </Typography.Link>
            </Space>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Fragment>{page}</Fragment>;
};
