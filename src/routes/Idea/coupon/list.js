import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Input,
  Select,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { format } from '../../../utils/utils'
import styles from './style.less'

const Search = Input.Search;
const Option = Select.Option;
@connect(({ coupon, loading }) => {
  return {
    coupon,
    loading: loading.effects['coupon/getCouponList'],
  };
})
export default class CouponList extends Component {
  state = {
    status:"0",
    cname:''
  };

  componentDidMount() {
    this.props.dispatch({
      type:'coupon/getCouponList'
    })
  }

  componentWillUnmount() {

  }

  selectChange = (value)=>{
    this.setState({status:value});
    this.props.dispatch({
      type:'coupon/getCouponList',
      payload:{
        couponJson:{
          status:value,
          cname:this.state.cname
        }
      }
    })
  };
  handleSearch = (value)=>{
    this.setState({cname:value});
    this.props.dispatch({
      type:'coupon/getCouponList',
      payload:{
        couponJson:{
          status:this.state.status,
          cname:value
        }
      }
    })
  };

  onPaginationChange = (current, pageSize) => {
    const { status,cname } = this.state;
    this.props.dispatch({
      type:'coupon/getCouponList',
      payload:{
        couponJson:{
          status,
          cname
        },
        pageSize:pageSize,
        pageIndex:current,
      }
    });
  };
  render() {
    const { coupon:{ couponData:{ pages, rows, total } }, loading } = this.props;
    const { status } = this.state;
    const columns = [
      {
        title: '优惠卷名称',
        dataIndex: 'cname',
        key: 'cname',
      },
      {
        title: '类型',
        dataIndex: 'ctype',
        key: 'ctype',
        render: text => <span>{text === 1 ? '优惠卷' : '代金卷'}</span>
      },
      {
        title: '使用门槛',
        dataIndex: 'limit',
        key: 'limit',
        render: text => text + ' 元',
      },
      {
        title: '面值',
        dataIndex: 'value',
        key: 'value',
        render: text => text + ' 元',
      },
      {
        title: '有效期',
        dataIndex: 'startTime',
        key: 'startTime',
        render: (text, record) => <span>{format(record.startTime)} 至 {format(record.endTime)}</span>,
      },
      {
        title: '发放总量',
        dataIndex: 'issuance',
        key: 'issuance',
        render: text => <span>{text || '无限制'}</span>,
      },
      {
        title: '剩余库存',
        dataIndex: 'remain',
        key: 'remain'
      },
      {
        title: '每人限领',
        dataIndex: 'getLimit',
        key: 'getLimit',
        render: text => <span>{text || '无限制'}</span>,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => text === 1 ? <span className="green">上架</span> : text === 2 ? <span className="red">下架</span> : '',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => (
          <Fragment>
            <span className={styles.activeBtn} onClick={()=>this.props.dispatch(routerRedux.push('/idea/coupon/update?cid=' + record.cid))}>编辑</span>
            <span className={styles.activeBtn} onClick={()=>this.props.dispatch({type:'coupon/changeCouponStatus',payload:{cid:record.cid,status:record.status,index}})}>
              {record.status === 1 ? '下架' : record.status === 2 ? '上架' : '' }
            </span>
            <span className={styles.activeBtn} onClick={()=>this.props.dispatch({type:'ggk/delGgkPrize',payload:{id:record.prizeId}})}>统计</span>
          </Fragment>
        ),
      }];
    const pagination = {
      showTotal:total => `共 ${total} 条`,
      onChange:this.onPaginationChange,
      total,
      current:pages,
      defaultPageSize:10,
    };
    return (
      <Fragment>
        <PageHeaderLayout title='所有优惠卷'>
          <Card bordered={false} >
            <div style={{marginBottom:16}}>
              <Button icon="plus" type="primary" onClick={()=>this.props.dispatch(routerRedux.push('/idea/coupon/update'))}>
                添加奖品
              </Button>
              <Search
                placeholder="搜索规则"
                onSearch={this.handleSearch}
                style={{ width: 200,float:'right' }}
              />
              <Select
                defaultValue={status}
                onChange={this.selectChange}
                style={{float:'right',marginRight:20}}
              >
                <Option value="0">全部优惠卷</Option>
                <Option value="1">已上架</Option>
                <Option value="2">已下架</Option>
              </Select>
            </div>
            <Table rowKey='cid' columns={columns} dataSource={rows} loading={loading} pagination={pagination}/>
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
