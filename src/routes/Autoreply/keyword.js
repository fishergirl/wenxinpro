import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import Keyword from './keywordItem'
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
import styles from './keyword.less'


const Search = Input.Search;

@connect(({ keyword, loading }) => {
  return {
    keyword,
    loading: loading.effects['keyword/getReplyList']
  }
})

export default class Keywords extends Component {
  state = {
    name:'',
  };

  componentDidMount() {
    this.props.dispatch({
      type:'keyword/getReplyList',
      payload:{
        ruleType:'keyword',
      }
    })
  }
  componentWillUnmount(){

  }

  addAutoReply = (value) => {
    this.props.dispatch({
      type:'keyword/saveReply',
      payload:{
        responseType:'responseRadom',
        ruleType:'keyword',
        name:value,
      }
    })
  };

  onPaginationChange = (current, pageSize) => {
    this.props.dispatch({
      type:'keyword/getReplyList',
      payload:{
        pageSize:pageSize,
        pageIndex:current,
        ruleType:'keyword',
        name:this.state.name,
      }
    });
  };

  onShowSizeChange = (current, pageSize) => {
    this.props.dispatch({
      type:'keyword/getReplyList',
      payload:{
        pageSize:pageSize,
        pageIndex:1,
        ruleType:'keyword',
        name:this.state.name,
      }
    });
  };

  handleSearch = (value) => {
    this.setState({name:value});
    this.props.dispatch({
      type:'keyword/getReplyList',
      payload:{
        pageIndex:1,
        ruleType:'keyword',
        name:value,
      }
    });
  };


  render() {
    const { keyword:{ list,total,pageIndex }, loading } = this.props;
    return (
      <Fragment>
        <PageHeaderLayout title="关键词回复">
          <Card bordered={false} style={{minHeight:600,minWidth:800}} >
            <div className={styles.header}>
              <PopoverInput onSubmit={this.addAutoReply} placeholder='请输入规则名称'>
                <Button type="primary">新建自动回复</Button>
              </PopoverInput>
              <Search
                placeholder="搜索规则"
                onSearch={value => this.handleSearch(value)}
                style={{ width: 200,float:'right' }}
              />
            </div>
            <Spin spinning={loading}>
              {
                list.length > 0 ?
                list.map((item,index)=>(<Keyword key={index} {...item} index={index}/>))
                : <span> 暂无数据 </span>
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
