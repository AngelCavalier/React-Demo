import React, { Component, Fragment } from "react";
//ANTD组件
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
//组件
import Code from "../../components/code/index"
//验证
import { validate_pass } from "../../utils/validate"
//API
import { Register } from "../../api/account"
//密码加密
import CryptoJS from 'crypto-js'

class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            code: "",
            module: "register"
        };
    }

    onFinish = (values) => {
        const requestData = {
            username: this.state.username,
            password: CryptoJS.SHA1(this.state.password).toString(),
            code: this.state.code
        }
        Register(requestData).then(response => {
            const data = response.data;
            console.log(data)
            message.success(data.message)
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
        console.log('Received values of form: ', values);
    }

    //input输入处理
    inputChangeUsername = (e) => {
        let value = e.target.value;
        this.setState({
            username: value//获取输入框的username
        })
    }
    inputChangePassword = (e) => {
        let value = e.target.value;
        this.setState({
            password: value//获取输入框的password
        })
    }
    inputChangeCode = (e) => {
        let value = e.target.value;
        this.setState({
            code: value//获取输入框的code
        })
    }

    toggleForm = () => {
        this.props.switchForm("login");
    }

    render() {
        const { username, module } = this.state;
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
                        onFinish={this.onFinish}
                    >
                        <Form.Item name="username" rules={
                            [
                                { required: true, message: '邮箱不能为空!' },
                                { type: 'email', message: '邮箱格式不正确' }
                            ]}>
                            <Input onChange={this.inputChangeUsername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
                        </Form.Item>
                        <Form.Item name="password" rules={
                            [
                                { required: true, message: '密码不能为空!' },
                                ({ getFieldValue }) => ({//ES6解构
                                    validator(rule, value) {
                                        let repassword_value = getFieldValue("repassword");
                                        if (!validate_pass(value)) {
                                            return Promise.reject('请输入大于6位小于20位数字+字母密码格式不正确!');
                                        }
                                        if (repassword_value && value !== repassword_value) {
                                            return Promise.reject('两次密码不一致!');
                                        }
                                        return Promise.resolve();
                                    },
                                })
                            ]}>
                            <Input onChange={this.inputChangePassword} type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item name="repassword" rules={
                            [
                                { required: true, message: '再次确认密码不能为空!' },
                                ({ getFieldValue }) => ({//ES6解构
                                    validator(rule, value) {
                                        if (value !== getFieldValue("password")) {
                                            return Promise.reject('两次密码不一致!');
                                        } else {
                                            return Promise.resolve();
                                        }
                                    },
                                })
                            ]}>
                            <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次输入密码" />
                        </Form.Item>
                        <Form.Item name="verification" rules={
                            [
                                { required: true, message: '请输入6位验证码!', len: 6 },
                            ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.inputChangeCode} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={9}>
                                    <Code username={username} module={module}></Code>
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