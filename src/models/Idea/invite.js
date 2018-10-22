import {
  restInvitationPage,
  restInvitationChangeStatus,
  restInvitationQueryOne,
  restInvitationSave
} from '../../services/api';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getAccount } from '../../utils/account';

function changeData(data) {
  if(data)data.rows.forEach((item)=>{
    changeItem(item)
  });
  return data
}
function changeItem(item) {
  item.invitationPrizeList.forEach((ele)=>{
    if(ele.prizeStrategy === 1){
      item.signPrize = ele
    }else{
      item.orderPrize = ele
    }
  });
  return item
}

export default {
  namespace: 'invite',

  state: {
    rows:[],
    pageSize:10,
    pages:1,
    total:0,
    invite:{}
  },

  effects: {
    *getInviteList(_, { call, put, select }) {
      const { pages,pageSize } = yield select(state=>state.invite);
      const res = yield call(restInvitationPage,{pageIndex:pages,pageSize,accountid: getAccount().accountid});
      if(res.status === 200){
        yield put({
          type:'changeState',
          payload:changeData(res.data)
        })
      }
    },
    *changeStatus({ payload }, { call, put }){
      const res = yield call( restInvitationChangeStatus, { accountid: getAccount().accountid, ...payload } );
      if(res.status === 200){
        yield put.resolve({
          type:'getInviteList'
        })
      }
    },
    *getInvite({ payload }, { call, put }){
      const res = yield call( restInvitationQueryOne, { accountid: getAccount().accountid,...payload } );
      if(res.status === 200){
        yield put({
          type:'changeState',
          payload:{
            invite:changeItem(res.data)
          }
        })
      }
    },
    *saveInvite({ payload }, { call, put }){
      const res = yield call( restInvitationSave, payload );
      if(res.status === 200){
        yield put(routerRedux.push('/idea/invite/list'));
      }
    }
  },

  reducers: {
    changeState( state, { payload }){
      return {
        ...state,
        ...payload
      }
    },
    clearInvite(state){
      return {
        ...state,
        invite:{}
      }
    }
  },
};
