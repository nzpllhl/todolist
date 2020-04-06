<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="changeValue" />
    <a-button type="primary" @click="addToList">添加事项</a-button>
    <a-list bordered class="dt_list" :dataSource="infoLits">
      <a-list-item class="dt_item" slot="renderItem" slot-scope="item">
        <a-checkbox @change="(e)=>{cbState(e,item.id)}" :checked="item.done">{{item.title}}</a-checkbox>
        <a @click="remove(item.id)">删除</a>
      </a-list-item>
      <!--  -->
      <div slot="footer" class="footer">
        <span>0条剩余</span>
        <a-button-group>
          <a-button :type="valkey === 'all' ? 'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button
            :type="valkey === 'undone' ? 'primary':'default'"
            @click="changeList('undone')"
          >未完成{{getDonelength}}条</a-button>
          <a-button
            :type="valkey === 'done' ? 'primary':'default'"
            @click="changeList('done')"
          >已完成{{getupdatalength}}</a-button>
        </a-button-group>
        <a @click="clean">清除已完</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      //list: this.$store.state.list
    };
  },
  computed: {
    ...mapState(["inputValue", "valkey"]),
    ...mapGetters(["getDonelength", "getupdatalength", "infoLits"])
  },
  created() {
    this.$store.dispatch("getListA");
  },
  methods: {
    changeValue(e) {
      let val = e.target.value;
      console.log(val);
      this.$store.commit("changeValue", val);
    },
    addToList() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning("请输入内容！");
      }
      this.$store.commit("addItemM");
    },
    // 根据 id 删除对应的数据
    remove(id) {
      console.log(id);

      this.$store.commit("removeM", id);
    },
    // 监听e.target.checked
    cbState(e, id) {
      console.log(e.target.checked, id);
      const params = {
        id: id,
        status: e.target.checked
      };
      this.$store.commit("Statechange", params);
    },
    // 清除已完成的数据
    clean() {
      this.$store.commit("cleanDoneM");
    },
    // 修改页面底部的active
    changeList(key) {
      console.log(key);

      this.$store.commit("changeKey", key);
    }
  }
};
</script>

<style>
#app {
  padding: 0;
  margin-top: 50px;
}
#app .my_ipt {
  width: 500px;
  margin-left: 100px;
}
#app .dt_list {
  width: 500px;
  margin-top: 10px;
  margin-left: 100px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
