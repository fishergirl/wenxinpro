import React, { Component, Fragment } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  Modal,
  InputNumber,
  Select
} from 'antd';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
const FormItem = Form.Item;
const Option = Select.Option;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, goodsList } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="添加奖品"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} label="选择奖品">
        {form.getFieldDecorator('goodsIndex', {
          rules: [{ required: true, message: '' }],
        })(<Select
          showSearch
          style={{ width: 200 }}
          placeholder="选择奖品"
          filterOption={(input, option) => {
            console.log(option)
          }}
        >
          {
            goodsList.map((item,index)=><Option key={index} value={index}>{item.goodsName}</Option>)
          }
        </Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} label="抽中概率">
        {form.getFieldDecorator('probability', {
          rules: [{ required: true, message: '' }],
        })(<InputNumber  placeholder="请输入" />)}
        <span>&nbsp;%</span>
      </FormItem>
    </Modal>
  );
});

@connect(({ ggk, loading }) => {
  return {
    ggk,
    loading: loading.effects['ggk/getGgkList'],
  };
})
@Form.create()
export default class GgkPrize extends Component {
  state = {
    modalVisible: false
  };

  componentDidMount() {
    this.props.dispatch({type:'ggk/getGgkList'});
    this.props.dispatch({type:'ggk/getGgkGoodList'});
  }

  componentWillUnmount() {

  }
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  handleAdd = fields => {
    const { ggk:{ goodsList } } = this.props;
    this.props.dispatch({
      type: 'ggk/saveGgkPrize',
      payload: {
        name: goodsList[fields.goodsIndex].goodsName,
        goodsCode:goodsList[fields.goodsIndex].goodsCode,
        probability:fields.probability
      },
    });
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { ggk:{ list, goodsList }, loading } = this.props;
    const { modalVisible } = this.state;
    const columns = [
      {
        title: '奖品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '抽中概率',
        dataIndex: 'probability',
        key: 'probability',
        render: text => <span>{text}%</span>
      },
      {
        title: '添加时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: text => <span>{moment(new Date(text) - (8 * 60 * 60 * 1000)).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span style={{color:'#07d'}} onClick={()=>this.props.dispatch({type:'ggk/delGgkPrize',payload:{id:record.prizeId}})}>删除</span>
        ),
      }];
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderLayout title="刮刮乐奖品列表">
        <Card bordered={false} >
          <div style={{marginBottom:16}}>
            <Button type="primary" onClick={() => this.handleModalVisible(true)}>
              添加奖品
            </Button>
            <Button style={{ marginLeft: 20 }} type="primary" onClick={()=>this.props.dispatch(routerRedux.push('/idea/ggk/info'))}>
              返回
            </Button>
          </div>
          <Table rowKey='goodsCode' columns={columns} dataSource={list} loading={loading} pagination={{showTotal:total => `共 ${total} 条`}}/>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} goodsList={goodsList} />
      </PageHeaderLayout>
    );
  }
}
