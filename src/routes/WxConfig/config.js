import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Icon,
  Card,
  Button,
  Form,
  Input,
  Checkbox,
  InputNumber,
  Radio,
  Tooltip
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less'
const FormItem = Form.Item;

@connect(({ account, loading }) => {
  return{
    account,
    configLoading: loading.effects['account/getConfigInfo'],
    saveLoading: loading.effects['account/saveConfig'],
  }
})
@Form.create()
export default class AccountConfig extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({
      type:'account/getConfigInfo'
    });
  }

  componentWillUnmount() {

  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        delete values.limitCheck;
        values.sp1 = values.sp1 ? 2 : 0;
        this.props.dispatch({
          type: 'account/saveConfig',
          payload: values
        });
      }
    });
  };


  render() {
    const { account:{ config }, configLoading, saveLoading, dispatch } = this.props;
    const { getFieldDecorator } = this.props.form;
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 18, offset: 4 },
      },
    };
    //营销配置
    const number = (
      <FormItem className={styles.numberInput}>
        {getFieldDecorator('shakeRedpackLimit', {
          initialValue:config.shakeRedpackLimit
        })(<InputNumber placeholder="请输入" min={0} />)}
      </FormItem>
    );
    return (
      <Fragment>
        <PageHeaderLayout title="营销配置">
          <Card bordered={false} loading={configLoading}>
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
              <FormItem  {...submitFormLayout}>
                {getFieldDecorator('limitCheck', {
                  valuePropName: 'checked',
                  initialValue:false
                })(<Checkbox> 摇一摇红包每人每日限领 {number} 次 </Checkbox>)}
              </FormItem>
              <FormItem  {...submitFormLayout}>
                {getFieldDecorator('sp1', {
                  valuePropName: 'checked',
                  initialValue:false
                })(<Checkbox> 自动回复接入微信客服系统(开启后自动回复功能失效)</Checkbox>)}
              </FormItem>
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" loading={saveLoading}>
                  保存
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={()=>dispatch(routerRedux.push('/wxConfig/account/info'))}>取消</Button>
              </FormItem>
            </Form>
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
