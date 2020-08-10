import React, { Component, Fragment } from "react";
//ANTD组件
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const onFinish = (values) => {
    console.log('Received values of form: ', values);
}
class RegisterForm extends Component {
    constructor() {
        super()
        this.state = {};
    }

    onFinish = (values) => {
        console.log('Received values of form: ', values);
    }

    toggleForm = () => {
        this.props.switchForm("login");
    }

    render() {
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">注册</h4>
                    <span onClick={this.toggleForm}>登录</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="repassword" rules={[{ required: true, message: 'Please input your Password again!' }]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="repassword" />
                        </Form.Item>
                        <Form.Item name="verification" rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={9}>
                                    <Button type="primary" danger block>
                                        获取验证码
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block> 注册 </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default RegisterForm;