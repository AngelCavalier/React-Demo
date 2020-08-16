import React, { Component, Fragment } from "react";
//antd
import { Form, Input, Button, Table, Switch, message } from "antd";
//api
import { GetList, Delete } from "@api/department"

class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //请求参数
            pageNumber: 1,
            pageSize: 10,
            keyWord: "",
            //复选框数据
            selectRowKeys: [],
            //表头
            columns: [
                { title: '部门名称', dataIndex: 'name', key: 'name' },
                {
                    title: '禁启用',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text, rowData) => {
                        return <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status === "1" ? true : false} />
                    }
                },
                { title: '人员数量', dataIndex: 'number', key: 'number' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    width: 215,
                    render: (text, rowData) => {
                        return (
                            <div className="inline-button">
                                <Button type="primary">编辑</Button>
                                <Button onClick={() => this.onHandelDelete(rowData.id)}>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            //表的数据
            dataSource: []
        };
    }
    //生命周期挂载完成
    componentDidMount() {
        this.loadData();
    }
    //获取列表数据
    loadData = () => {
        const { pageNumber, pageSize, keyWord } = this.state;
        const requestData = {
            pageNumber: pageNumber,
            pageSize: pageSize
        }
        if (keyWord) {
            requestData.name = keyWord
        }
        GetList(requestData).then(response => {
            const responseData = response.data.data//数组
            // console.log(response)
            if (responseData.data) {
                this.setState({
                    dataSource: responseData.data
                })
            }
        })
    }
    //搜索
    onFinish = (value) => {
        this.setState({
            keyWord: value.name,
            pageNumber: 1,
            pageSize: 10,
        })
        //请求接口，更新数据
        this.loadData();
    }
    //删除
    onHandelDelete = (id) => {
        if (!id) { return false; }
        Delete({ id: id }).then(response => {
            message.info(response.data.message)
            //请求接口，更新数据
            this.loadData();
        })
    }
    //复选框
    onCheckbox = (selectRowKeys) => {
        this.setState({ selectRowKeys: selectRowKeys })
    }
    render() {
        const { columns, dataSource } = this.state;
        const rowSelection = {
            onChange: this.onCheckbox
        }
        return (
            <Fragment>
                <Form layout="inline" onFinish={this.onFinish}>
                    <Form.Item label="部门名称" name="username">
                        <Input placeholder="请输入部门名称" />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        <Button type="primary" htmlType="submit"> 搜索</Button>
                    </Form.Item>
                </Form>
                <div className="table-wrap">
                    <Table rowSelection rowKey="id" dataSource={dataSource} columns={columns} bordered></Table>
                </div>
            </Fragment>

        );
    }
}

export default DepartmentList;
