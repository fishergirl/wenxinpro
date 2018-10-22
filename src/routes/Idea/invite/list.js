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
} from 'antd';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './style.less'

@connect(({ invite, loading }) => {
  return {
    invite,
    loading: loading.models.invite,
  };
})

export default class List extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({
      type:'invite/getInviteList'
    })
  }

  handleUpline = item => {
    //1.已上线 2.已下线 3.待上线
    let status = item.status === 1 ? 2 : ( item.status === 2 ||  item.status === 3 ) ? 1 : '';
    this.props.dispatch({
      type: 'invite/changeStatus',
      payload: {
        id:item.id,
        status
      },
    });
  };

  render() {
    const { invite:{ rows }, loading } = this.props;
    const columns = [
      {
        title: '活动名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '活动奖金',
        dataIndex: 'reward',
        key: 'reward',
        render: text => <span>{text.toFixed(2)}元</span>
      },
      {
        title: '已发红包金额',
        key: 'yifa',
        render: (text, record) => <span>{(record.reward - record.remain).toFixed(2)}元</span>
      },
      {
        title: '剩余奖金',
        dataIndex: 'remain',
        key: 'remain',
        render: text => <span>{text.toFixed(2)}元</span>
      },
      {
        title: '活动开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        render: text => <span>{moment(new Date(text) - (8 * 60 * 60 * 1000)).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '活动结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        render: text => <span>{moment(new Date(text) - (8 * 60 * 60 * 1000)).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '活动状态',
        dataIndex: 'status',
        key: 'status',
        render: text => <span>{text === 1 ? '上线中' : text === 2 ? '已下线' : '待上线'}</span>,
      },
      {
        title: '推荐注册奖励',
        dataIndex: 'signPrize',
        key: 'signPrize',
        render: text => <span>{text ? `奖励红包${text.min !== text.max ? `${text.min}~${text.max}`: text.min }元` : '暂无' }</span>,
      },
      {
        title: '推荐下单奖励',
        dataIndex: 'orderPrize',
        key: 'orderPrize',
        render: text => <span>{text ? `奖励红包${text.min !== text.max ? `${text.min}~${text.max}`: text.min }元` : '暂无' }</span>,
      },
      {
        title: '红包提现限制',
        dataIndex: 'minCash',
        key: 'minCash',
        render: text => <span>{text}元起提现</span>,
      },
      {
        title: '操作',
        dataIndex:'status',
        key: 'action',
        render: (text, record) => (
          <Fragment>
            <span className={styles.activeBtn} onClick={()=>this.props.dispatch(routerRedux.push('/idea/invite/inviteUpdate?id='+record.id))}>编辑</span>
            <span className={styles.activeBtn} onClick={()=>this.handleUpline(record)}>{text === 1 ? '下线' : text === 2 || text === 3 ? '上线' : ''}</span>
          </Fragment>
        ),
    }];

    return (
      <PageHeaderLayout title="推荐有奖">
        <Card bordered={false} >
          <div style={{marginBottom:16}}>
            <Button icon="plus" type="primary" onClick={()=>this.props.dispatch(routerRedux.push('/idea/invite/inviteUpdate'))}>
              添加活动
            </Button>
          </div>
          <Table rowKey='id' columns={columns} dataSource={rows} loading={loading} pagination={{showTotal:total => `共 ${total} 条`}}/>
        </Card>
      </PageHeaderLayout>
    );
  }
}
