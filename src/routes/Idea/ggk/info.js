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
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './style.less'
@connect(({ ggk, loading }) => {
  return {
    ggk,
    loading: loading.effects['ggk/getGgkData'],
  };
})
export default class GgkInfo extends Component {
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

  render() {
    const { loading, ggk:{ data }, dispatch } = this.props;
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
        <PageHeaderLayout title="刮刮乐">
          <Card className={styles.info} loading={loading}>
            <div style={{marginBottom:30}}>
              <Button type="primary" onClick={()=>dispatch(routerRedux.push('/idea/ggk/update'))} >
                修改刮刮乐配置
              </Button>
              <Button type="primary" style={{marginLeft:20}} onClick={()=>dispatch(routerRedux.push('/idea/ggk/prize'))} >
                配置奖品
              </Button>
            </div>
            <Row gutter={16}>
              <Col {...formItemLayout.labelCol} className='textRight'>
                活动名称：
              </Col>
              <Col {...formItemLayout.wrapperCol}>
                {data.name}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...formItemLayout.labelCol} className='textRight'>
                中奖限制：
              </Col>
              <Col {...formItemLayout.wrapperCol}>
                每天{data.limit}次
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...formItemLayout.labelCol} className='textRight'>
                中奖概率：
              </Col>
              <Col {...formItemLayout.wrapperCol}>
                {data.probability}%
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...formItemLayout.labelCol} className='textRight'>
                活动规则：
              </Col>
              <Col {...formItemLayout.wrapperCol}>
                {data.remark}
              </Col>
            </Row>
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
