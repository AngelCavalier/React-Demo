import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
//ANTD组件
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
//验证
import { validate_password } from "../../utils/validate"
//API
import { Login } from "../../api/account"
//组件
import Code from "../../components/code/index"
//密码加密
import CryptoJS from 'crypto-js'
// 方法
import { setToken, setUsername } from "../../utils/cookies";



class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            code: "",
            module: "login",
            loading: false
        };
    }
    //登录
    onFinish = (values) => {
        const requestData = {
            username: this.state.username,
            password: CryptoJS.MD5(this.state.password).toString(),
            code: this.state.code
        }
        this.setState({
            loading: true
        })
        Login(requestData).then(response => {
            this.setState({
                loading: false
            })
            const data = response.data.data
            //存储token
            setToken(data.token);
            setUsername(data.username);
            //路由跳转
            this.props.history.push('/index')
        }).catch(error => {
            this.setState({
                loading: false
            })
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
        this.props.switchForm("register");
    }

    render() {
        const { username, module, loading } = this.state;
        //const _this = this;
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
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
                                // ({ getFieldValue }) => {
                                //     validator(rule, value) {
                                //         if (validate_email(value)) {
                                //             _this.setState({
                                //                 code_button_disabled: false
                                //             })
                                //             return Promise.resolve();
                                //         }
                                //         return Promise.reject('邮箱格式不正确!');
                                //     },
                                //   })
                            ]
                        }>
                            <Input value={username} onChange={this.inputChangeUsername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password" rules={
                            [
                                { required: true, message: '密码不能为空!' },
                                { pattern: validate_password, message: "请输入大于6位小于20位数字+字母" }
                                // ({ getFieldValue }) => ({//ES6解构
                                //     validator(rule, value) {
                                //         if (value.length < 6) {
                                //             return Promise.reject('不能小于6位!');
                                //         } else {
                                //             return Promise.resolve();
                                //         }
                                //     },
                                // })
                            ]
                        }>
                            <Input onChange={this.inputChangePassword} type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="password" />
                        </Form.Item>
                        <Form.Item name="verification" rules={
                            [
                                { required: true, message: '验证码不能为空' },
                                { len: 6, message: '请输入6位验证码' }
                            ]
                        }>
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
                            <Button type="primary" loading={loading} htmlType="submit" className="login-form-button" block> 登录 </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment >
        )
    }
}

export default withRouter(LoginForm);