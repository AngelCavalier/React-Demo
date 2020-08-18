import React, { Component, Fragment } from "react";
//
import { Link } from "react-router-dom";
//antd
import { Form, Input, Button, Table, Switch, message, Modal } from "antd";
//api
import { GetList, Delete, Status } from "@api/department"

class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //请求参数
            pageNumber: 1,
            pageSize: 10,
            keyWord: "",
            //复选框数据
            selectedRowKeys: [],
            //警告弹窗
            visible: false,
            //弹窗确定按钮 loading
            confirmLoading: false,
            //id
            id: "",
            //表格加载
            loadingTable: false,
            //表头
            columns: [
                { title: '部门名称', dataIndex: 'name', key: 'name' },
                {
                    title: '禁启用',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text, rowData) => {
                        return <Switch onChange={() => this.onHandelSwitch(rowData)} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status === "1" ? true : false} />
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
                                <Button type="primary">
                                    <Link to={{ pathname: '/index/department/add', state: { id: rowData.id } }}>编辑</Link>
                                </Button>
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
        this.setState({ loadingTable: true })
        GetList(requestData).then(response => {
            const responseData = response.data.data//数组
            // console.log(response)
            if (responseData.data) {
                this.setState({
                    dataSource: responseData.data
                })
            }
            this.setState({ loadingTable: false })
        }).catch(error => {
            this.setState({ loadingTable: false })
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
    onHandelDelete(id) {
        if (!id) {//批量删除
            if (this.state.selectedRowKeys.length === 0) { return false; }
            id = this.state.selectedRowKeys.join();
        }
        this.setState({
            visible: true,
            id
        })

    }
    //禁启用
    onHandelSwitch(data) {
        if (!data.status) { return false; }
        const requestData = {
            id: data.id,
            status: data.status === "1" ? false : true
        }
        this.setState({ id: data.id })
        Status(requestData).then(response => {
            message.info(response.data.message)
            this.setState({ id: "" })
        }).catch(error => {
            this.setState({ id: "" })
        })
    }
    //复选框
    onCheckbox = (selectedRowKeys) => {
        this.setState({ selectedRowKeys: selectedRowKeys })
    }
    //弹窗
    modalThen = () => {
        this.setState({
            confirmLoading: true
        })
        Delete({ id: this.state.id }).then(response => {
            message.info(response.data.message)
            this.setState({
                visible: false,
                id: "",
                confirmLoading: false,
                selectedRowKeys: []
            })
            //请求接口，更新数据
            this.loadData();
        })

    }
    render() {
        const { columns, dataSource, loadingTable } = this.state;
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
                    <Table loading={loadingTable} rowSelection={rowSelection} rowKey="id" dataSource={dataSource} columns={columns} bordered></Table>
                    <Button onClick={() => this.onHandelDelete()}>批量删除</Button>
                </div>
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.modalThen}
                    onCancel={() => { this.setState({ visible: false }) }}
                    okText="确认"
                    cancelText="取消"
                    confirmLoading={this.state.confirmLoading}
                >
                    <p className="text-center">确定删除此信息？<strong className="color-red">删除后将无法恢复。</strong></p>
                </Modal>
            </Fragment>

        );
    }
}

export default DepartmentList;
