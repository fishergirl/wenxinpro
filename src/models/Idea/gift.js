import {
  restGiftList,
  restGiftSave,
  restGiftDelete
} from '../../services/api';
import { message } from 'antd';
import { getAccount } from '../../utils/account';

export default {
  namespace: 'gift',

  state: {
    rows:[],
    pageSize:10,
    pages:1,
    total:0
  },

  effects: {
    *getGiftList(_, { call, put, select }) {
      const { pages,pageSize } = yield select(state=>state.gift);
      const res = yield call(restGiftList,{pageIndex:pages,pageSize,accountid: getAccount().accountid});
      if(res.status === 200){
        yield put({
          type:'changeState',
          payload:res.data
        })
      }
    },
    *add({ payload }, { call, put }){
      const res = yield call( restGiftSave,{giftJson:{ accountid: getAccount().accountid,...payload }}  );
      if(res.status === 200){
        yield put.resolve({
          type:'getGiftList'
        });
        message.success('添加成功');
      }
    },
    *del({ payload }, { call, put }){
      const res = yield call( restGiftDelete, { accountid: getAccount().accountid, ...payload} );
      if(res.status === 200){
        yield put.resolve({
          type:'getGiftList',
        });
        message.success('删除成功');
      }
    }
  },

  reducers: {
    changeState( state, { payload }){
      return {
        ...state,
        ...payload
      }
    }
  },
};
