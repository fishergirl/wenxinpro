import { restAutoreplyList, restAutoreplySave, restAutoreplyDelete, restKeywordSave, restKeywordDelete, restMsgtextSave, restMaterialSave, restMaterialDelete } from '../../services/api';
import { message } from 'antd';
import { getAccount } from '../../utils/account';

export default {
  namespace: 'keyword',

  state: {
    list:[],
    total:0,
    pageSize:5,
    pageIndex:1,
  },

  effects: {
    *getReplyList({ payload }, {call, put, select}) {
      const { pageIndex, pageSize } = yield select(state=>state.keyword);
      const res = yield call(restAutoreplyList,{pageIndex,pageSize, accountid:getAccount().accountid ,...payload});
      if(res.status === 200){
        yield put({
          type:'changeState',
          payload:{
            list:res.data.rows,
            total:res.data.total,
            pageSize:res.data.pageSize,
            pageIndex:res.data.pages,
          }
        })
      }
    },
    *saveReply({ payload }, {call, put}){
      const res = yield call(restAutoreplySave,{ruleJson:{accountid:getAccount().accountid,...payload}});
      if(res.status === 200){
        yield put.resolve({
          type:'getReplyList'
        });
        message.success('保存成功');
      }
    },
    *deleteReply({ payload }, { call, put } ){
      const res = yield call(restAutoreplyDelete,payload);
      if(res.status === 200){
        yield put.resolve({
          type:'getReplyList'
        });
        message.success('删除成功')
      }
    },
    *restKeywordSave({ payload:{ keywordJson, index } }, { call, put, select }){
      const res = yield call(restKeywordSave,{keywordJson});
      if(res.status === 200){
        let list = yield select((state)=>state.keyword.list);
        list[index].keywordList.push({
          keyid: res.data.keyid,
          ...keywordJson
        });
        yield put({
          type:'changeList',
          payload:list
        });
        message.success('保存成功');
      }
    },
    *restKeywordDelete({ payload:{ keyid, indexs } },{ call, put, select }){
      const res = yield call(restKeywordDelete,{ keyid });
      if(res.status === 200){
        let list = yield select((state)=>state.keyword.list);
        list[indexs[1]].keywordList.splice(indexs[0],1);
        yield put({
          type:'changeList',
          payload:list
        });
        message.success('删除成功')
      }
    },
    *restMsgtextSave({ payload:{value,props},payload }, {call, put}){
      const res = yield call(restMsgtextSave,{msgtextJson:{accountid:props.accountid,content:value}});
      if(res.status === 200){
       yield put.resolve({
         type:'restMaterialSave',
         payload:{
           materialJson:{
             materialid:res.data.materialid,
             pid:props.ruleid
           },
           index:props.index,
           value:value
         }
       })
      }
    },
    *restMaterialSave({ payload:{materialJson,index,value} }, {call, put, select}){
      const res = yield call(restMaterialSave,{materialJson:materialJson});
      if (res.status === 200){
        let list = yield select((state)=>state.keyword.list);
        list[index].materialList.push({
          materialid:res.data.materialid,
          materialType: 'text',
          preview: value
        });
        yield put({
          type:'changeList',
          payload:list
        });
        message.success('保存成功');
      }
    },
    *restMaterialDelete({ payload:{ materialid, indexs } }, { call, put, select }){
      const res = yield call(restMaterialDelete,{materialid});
      if (res.status === 200){
        let list = yield select((state)=>state.keyword.list);
        list[indexs[1]].materialList.splice(indexs[0],1);
        yield put({
          type:'changeList',
          payload:list
        });
        message.success('删除成功')
      }
    }
  },

  reducers: {
    changeState(state, { payload }){
      return {
        ...state,
        ...payload
      }
    },
    changeList(state, { payload }){
      return{
        ...state,
        list:payload
      }
    },
  },
};
