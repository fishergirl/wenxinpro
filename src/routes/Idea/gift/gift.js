import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Icon,
  Card,
  Button,
  Table,
  Divider,
  Form,
  Modal,
  Input,
  Popconfirm
} from 'antd';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue.desc);
    });
  };
  return (
    <Modal
      title="添加赠品"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="赠品">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入赠品名称' }],
        })(<Input placeholder="请输入赠品名称"/>)}
      </FormItem>
    </Modal>
  );
});

@connect(({ gift, loading }) => {
  return {
    gift,
    loading: loading.models.gift,
  };
})
@Form.create()
export default class Gift extends Component {
  state = {
    modalVisible: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type:'gift/getGiftList'
    })
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = value => {
    this.props.dispatch({
      type: 'gift/add',
      payload: {
        name:value
      },
    });
    this.setState({
      modalVisible: false,
    });
  };
  handleDelete = item => {
    this.props.dispatch({
      type: 'gift/del',
      payload: {
        giftId:item.giftId
      },
    });
  };
  render() {
    const { gift:{ rows }, loading } = this.props;
    const { modalVisible } = this.state;
    const columns = [{
      title: '',
      key: 'index',
      render: (text,record, index) => <span>{index+1}</span>,
    }, {
      title: '赠品名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: text => <span>{moment(new Date(text) - (8 * 60 * 60 * 1000)).format('YYYY-MM-DD HH:mm')}</span>,
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Popconfirm onConfirm={()=>this.handleDelete(record)} title='确定删除' okText="删除" cancelText="取消">
          <span style={{color:'#1890ff'}}>删除</span>
        </Popconfirm>
      ),
    }];
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="赠品">
        <Card bordered={false}>
          <div style={{marginBottom:16}}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              添加赠品
            </Button>
          </div>
          <Table rowKey='giftId' columns={columns} dataSource={rows} loading={loading} pagination={{showTotal:total => `共 ${total} 条`}}/>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible}/>
      </PageHeaderLayout>
    );
  }
}
