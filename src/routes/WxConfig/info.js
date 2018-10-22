import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Icon,
  Card,
  Button
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less'
@connect(({ account, loading }) => {
  return{
    account,
    infoLoading: loading.effects['account/getAccountInfo'],
  }
})
export default class AccountInfo extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'account/getAccountInfo',
      payload: {
        userCode:'FD68C372E46469B48193EB9124109E6E'
      }
    });
  }

  componentWillUnmount() {

  }

  render() {
    const { account:{ account }, infoLoading, dispatch } = this.props;
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
    return (
      <Fragment>
        <PageHeaderLayout title="公众账号">
          <Card className={styles.info} loading={infoLoading}>
            <div style={{marginBottom:30}}>
              <Button type="primary" onClick={()=>dispatch(routerRedux.push('/wxConfig/account/update'))} >
                修改公众号
              </Button>
              <Button type="primary" style={{marginLeft:20}} onClick={()=>dispatch(routerRedux.push('/wxConfig/account/config'))} >
                营销配置
              </Button>
            </div>
            <Row gutter={16}>
              <Col {...formItemLayout.labelCol} className='textRight'>
                公众账号名称：
              </Col>
              <Col {...formItemLayout.wrapperCol}>
                {account.accountName}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...formItemLayout.labelCol} className='textRight'>
                公众账号TOKEN：
              </Col>
              <Col {...formItemLayout.wrapperCol}>
                {account.token}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...formItemLayout.labelCol} className='textRight'>
                微信号：
              </Col>
              <Col {...formItemLayout.wrapperCol}>
                {account.accountNum}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...formItemLayout.labelCol} className='textRight'>
                原始号：
              </Col>
              <Col {...formItemLayout.wrapperCol}>
                {account.originalId}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...formItemLayout.labelCol} className='textRight'>
                公众账号appid：
              </Col>
              <Col {...formItemLayout.wrapperCol}>
                {account.appid}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...formItemLayout.labelCol} className='textRight'>
                公众号描述：
              </Col>
              <Col {...formItemLayout.wrapperCol}>
                {account.accountdesc}
              </Col>
            </Row>
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
