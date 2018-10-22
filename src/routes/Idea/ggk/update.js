import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  InputNumber,
  message
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ ggk, loading }) => {
  return {
    ggk,
    loading: loading.effects['ggk/SaveGgkData'],
  };
})
@Form.create()
export default class GgkUpdate extends Component {
  state = {};

  componentDidMount() {
    const { ggk:{ data }, dispatch } = this.props;
    if(JSON.stringify(data) === '{}'){
      dispatch({
        type:'ggk/getGgkData'
      })
    }
  }

  componentWillUnmount() {

  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        this.props.dispatch({
          type: 'ggk/SaveGgkData',
          payload: values,
        });
      }
    });
  };
  render() {
    const { ggk:{ data }, loading, dispatch } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <PageHeaderLayout title='配置刮刮乐'>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Card bordered={false}>
            <FormItem {...formItemLayout} label="活动名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入活动名称',
                  },
                ],
                initialValue:data.name
              })(<Input placeholder="请输入活动名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="每人每天中奖次数限制">
              {getFieldDecorator('limit', {
                rules: [
                  {
                    required: true,
                    message: '请输入中奖次数限制',
                  },
                ],
                initialValue:data.limit
              })(<Input placeholder="请输入中奖次数限制" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="中奖概率">
              {getFieldDecorator('probability', {
                rules: [
                  {
                    required: true,
                    message: '请输入中奖概率',
                  },
                ],
                initialValue:data.probability
              })(<InputNumber placeholder="请输入" />)}
              <span>%</span>
            </FormItem>
            <FormItem {...formItemLayout} label="活动描述">
              {getFieldDecorator('remark', {
                rules: [
                  {
                    message: '请输入活动描述',
                  },
                ],
                initialValue:data.remark
              })(<TextArea style={{ minHeight: 32 }} placeholder="请输入活动描述" rows={4} />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button onClick={()=>dispatch(routerRedux.push('/idea/ggk/info'))}>取消</Button>
              <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit" loading={loading} >提交</Button>
            </FormItem>
          </Card>
        </Form>
      </PageHeaderLayout>
    );
  }
}
