<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" :checked="selectedAllFlag" @click="selectedAll()"/>
    </label>
    <span>
      <span>已完成{{doneNum}}</span> / 全部{{allNum}}
    </span>
    <button class="btn btn-danger" @click="clearTodoed()">清除已完成任务</button>
  </div>
</template>

<script>
export default {
    name:"MyFooter",
    props:['todoList','selectedAllFlag','selectedAll','clearTodoed'],
    computed:{
      doneNum(){
        return this.todoList.reduce((pre,cur)=>{
          return pre + ( cur.done ? 1:0 );
        },0)
      },
      allNum(){
        return this.todoList.length;
      }
    }
}
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 5px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 0px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>