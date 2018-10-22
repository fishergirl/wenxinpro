import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import PermanentItem from './permanentItem'
import {
  Row,
  Col,
  Icon,
  Card,
  Badge,
  Popover,
  Button,
  Popconfirm,
  Input,
  Pagination,
  Spin
} from 'antd';

import PopoverInput from '../../components/PopoverInput'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less'

const Search = Input.Search;

@connect(({ qrcode, loading }) => {
  return {
    qrcode,
    loading:loading.effects['qrcode/getQrcodeList']
  }
})

export default class Permanent extends Component {
  state = {
    name:''
  };

  componentDidMount() {
    this.props.dispatch({
      type:'qrcode/getQrcodeList',
      payload:{
        qrcodeType:'permanent',
      }
    })
  }

  addAutoReply = (value) => {
    this.props.dispatch({
      type:'qrcode/saveQrcode',
      payload:{
        accountid: '',
        qrcodeName: value,
        qrcodeType: 'permanent',
        expireSeconds: 2592000,
        avaliable: 'valid',
        responseType: 'responseRadom'
      }
    })
  };

  onPaginationChange = (current, pageSize) => {
    this.props.dispatch({
      type:'qrcode/getQrcodeList',
      payload:{
        pageIndex:current,
        pageSize,
        qrcodeType:'permanent',
        qrcodeName:this.state.name
      }
    });
  };

  onShowSizeChange = (current, pageSize) => {
    this.props.dispatch({
      type:'qrcode/getQrcodeList',
      payload:{
        pageIndex:1,
        pageSize,
        qrcodeType:'permanent',
        qrcodeName:this.state.name
      }
    });
  };

  handleSearch = (value) => {
    this.setState({name:value});
    this.props.dispatch({
      type:'qrcode/getQrcodeList',
      payload:{
        pageIndex:1,
        qrcodeType:'permanent',
        qrcodeName:value
      }
    });
  };

  render() {
    const { qrcode:{ list,total, pageIndex }, loading } = this.props;

    return (
      <Fragment>
        <PageHeaderLayout title="永久二维码">
          <Card bordered={false} style={{minHeight:600,minWidth:800}} >
            <div className={styles.header}>
              <PopoverInput onSubmit={this.addAutoReply} placeholder='请输入规则名称'>
                <Button type="primary">新建永久二维码</Button>
              </PopoverInput>
              <Search
                placeholder="搜索永久二维码"
                onSearch={value => this.handleSearch(value)}
                style={{ width: 200,float:'right' }}
              />
            </div>
            <Spin spinning={loading}>
              {
                list.length > 0 ?
                list.map((item,index)=>(<PermanentItem key={index} {...item} index={index}/>)) :
                <span> 暂无数据 </span>
              }
            </Spin>
            <div className={styles.foot}>
              {
                total > 0 &&
                <Pagination
                  style={{float:'right'}}
                  showSizeChanger
                  // showTotal={total => `共${total}条`}
                  pageSizeOptions={['5','10']}
                  defaultPageSize={5}
                  onShowSizeChange={this.onShowSizeChange}
                  onChange={this.onPaginationChange}
                  current={pageIndex}
                  total={total}/>
              }
            </div>
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
