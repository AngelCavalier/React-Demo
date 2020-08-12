import React, { Component } from "react";
//API
import { GetCode } from "../../api/account";
//ANTD组件
import { Button, message } from 'antd';
//验证
import { validate_email } from "../../utils/validate";
//定时器
let timer = null;

class Code extends Component {
    constructor(props) {
        super(props) //初始化 props 的值
        this.state = {
            username: props.username,
            module: props.module,
            button_text: "获取验证码",
            button_loading: false,
            button_disabled: false,
        }
    }
    //this.props.username每次都会获取
    componentWillReceiveProps({ username }) {
        this.setState({
            username: username//ES6中 key和数据变量相同的情况，只用写一个,即可以写成 username
        })
    }
    //销毁组件
    componentWillUnmount() {
        clearInterval(timer);
    }

    /**
     * 获取验证码
    */
    getCode = () => {
        const username = this.state.username;
        if (!username) {
            message.warning('用户名不能为空！', 1);
            return false;
        }
        if (!validate_email(username)) {
            message.warning('邮箱格式不正确！', 1);
            return false;
        }
        this.setState({
            button_loading: true,
            button_text: "发送中"
        })
        const requestData = {
            username: username,
            module: this.state.module
        }
        GetCode(requestData).then(response => {
            //验证码提示
            message.success(response.data.message);
            //执行倒计时
            this.countDown();
        }).catch(error => {
            this.setState({
                button_loading: false,
                button_text: "重新获取"
            })
        })
    }
    /**
     * 倒计时
     */
    countDown = () => {
        //倒计时时间
        let sec = 60;
        //修改状态
        this.setState({
            button_loading: false,
            button_disabled: true,
            button_text: `${sec}S`
        })
        //setInterval \ clearInterval 不间断定时器
        //setTimeout  \ clearTimeout  只执行一次
        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                this.setState({
                    button_text: '重新获取',
                    button_disabled: false,
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                button_text: `${sec}S`
            })
        }, 1000)
    }

    render() {
        return <Button type="primary" danger block disabled={this.state.button_disabled} loading={this.state.button_loading} onClick={this.getCode} > {this.state.button_text} </Button>
    }
}

export default Code;