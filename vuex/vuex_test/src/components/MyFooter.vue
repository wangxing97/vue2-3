<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" :checked="selectedAllFlag" @click="selectedAll()"/>
    </label>
    <span>
      <span>已完成{{doneNum}}</span> / 全部{{allNum}}
    </span>
    <div>
      <button class="btn btn-danger" @click="clearTodoed()">清除已完成任务</button>
      <button class="btn btn-random" @click="addRandomTodo()">随机添加1-10条任务</button>
    </div>
  </div>
</template>

<script>
export default {
    name:"MyFooter",
    props:['todoList','selectedAllFlag','selectedAll','clearTodoed'],
    methods:{
      addRandomTodo(){
        this.$bus.$emit("addRandomTodo",{random:Math.floor(Math.random()*10 + 1)});
      }
    },
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
.btn-random {
  color: #fff;
  background-color: darkviolet;
  border: 1px solid darkviolet;
}
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

.todo-footer div {
  float: right;
}
.todo-footer div button{
  margin-left: 3px;
  margin-top: 5px;
}
</style>