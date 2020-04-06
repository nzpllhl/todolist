import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

// import daa from ''
export default new Vuex.Store({
  state: {
    list: [], // 列表数据
    inputValue: '',
    nextId: 5,
    valKey: 'all'
  },
  getters: {
    // 未完成
    getDonelength(state) {
      return state.list.filter(item => item.done === false).length;

    },
    // 已完成
    getupdatalength(state) {
      return state.list.filter(item => item.done === true).length;
    },
    // 
    infoLits(state) {
      if (state.valKey === 'all') {
        return state.list
      }
      if (state.valKey === 'undone') {
        return state.list.filter(item => !item.done)
      }
      if (state.valKey === 'done') {
        return state.list.filter(item => item.done)
      }
      return state.list
    }

  }
  ,
  mutations: {
    getListM(state, res) {
      state.list = res
      console.log(state.list, 'lalla');
    },
    changeValue(state, val) {
      state.inputValue = val
    },
    addItemM(state) {
      const obj = {
        id: state.nextId,
        title: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 根据ID
    removeM(state, id) {
      const i = state.list.findIndex(item => item.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
      //localStorage.setItem('data', JSON.stringify(state.list))
    },
    // 修改列表下的选中转态
    Statechange(state, params) {
      // 查找索引
      const i = state.list.findIndex(item => item.id === params.id)
      if (i !== -1) {
        state.list[i].done = params.status
      }
    },
    //// 清除已完成的数据
    cleanDoneM(state) {
      state.list = state.list.filter(item => item.done === false)
    },
    // 修改页面底部的active
    changeKey(state, key) {
      state.valKey = key

    }
  },
  actions: {
    getListA({ commit }, ) {
      axios.get('http://localhost:3000/list').then((data) => {
        let res = data.data
        // localStorage.setItem('data', JSON.stringify(data.data))
        console.log(res);
        commit('getListM', res)
      })
    }
  },
  modules: {
  }
})
