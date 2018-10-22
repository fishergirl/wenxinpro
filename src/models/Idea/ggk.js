import {
  restGgkQuery,
  restGgkSave,
  restGgkPrizeList,
  restGgkShakeGoodsList,
  restGgkPrizeSave,
  restGgkPrizeDelete
} from '../../services/api';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getAccount } from '../../utils/account';


export default {
  namespace: 'ggk',

  state: {
    data:{},
    list:[],
    goodsList:[]
  },

  effects: {
    * getGgkData(_, { call, put }) {
      const res = yield call( restGgkQuery, {accountid:getAccount().accountid});
      if(res.status !== 200)return;
      yield put({
        type:'changeState',
        payload:{
          data:res.data
        }
      })
    },
    * SaveGgkData({ payload }, { call, put, select }){
      const { data } = yield select(state=>state.ggk);
      const res = yield call( restGgkSave, {ggkJson:{...data,...payload}});
      if(res.status !== 200)return;
      yield put({ type:'getGgkData' });
      yield put(routerRedux.push('/idea/ggk/info'));
      message.success('保存成功')
    },
    * getGgkList(_, { call, put, select }) {
      let { data } = yield select(state=>state.ggk);
      if(JSON.stringify(data) === '{}'){
        yield put.resolve({type:'getGgkData'});
        data = yield select(state=>state.ggk.data);
      }
      const res = yield call( restGgkPrizeList, {accountid:data.accountid, pid:data.gid});
      if(res.status !== 200)return;
      yield put({
        type:'changeState',
        payload:{
          list:res.data
        }
      })
    },
    * saveGgkPrize({ payload }, { call, put, select }){
      let { data } = yield select(state=>state.ggk);
      const res = yield call( restGgkPrizeSave, {prizeJson:{ pid:data.gid, ...payload }});
      if(res.status !== 200)return;
      yield put({
        type:'getGgkList',
      });
      message.success('保存成功')
    },
    * delGgkPrize({ payload }, { call, put }){
      const res = yield call( restGgkPrizeDelete, payload );
      if(res.status !== 200)return;
      yield put({
        type:'getGgkList',
      });
      message.success('删除成功')
    },
    * getGgkGoodList(_, { call, put }){
      const res = yield call( restGgkShakeGoodsList );
      if(res.status !== 200)return;
      yield put({
        type:'changeState',
        payload:{
          goodsList:res.data.rows
        }
      })
    }
  },

  reducers: {
    changeState( state, { payload }){
      return{
        ...state,
        ...payload
      }
    }
  },
};
