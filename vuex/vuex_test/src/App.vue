<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo($event)"/>
        <MyList :todo-list="todoList" 
                :changeTodo="changeTodo"
                :deleteTodo="deleteTodo"/>
        <MyFooter v-show="todoList.length > 0"
                  :todo-list="todoList" 
                  :selected-all-flag="selectedAllFlag" 
                  :selected-all="selectedAll"
                  :clear-todoed="clearTodoed"/>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyList from './components/MyList.vue'
import MyFooter from './components/MyFooter.vue'
export default {
  name: 'App',
  components: {
    MyHeader,
    MyList,
    MyFooter
  },
  data(){
    return {
        todoList:[],
        selectedAllFlag:false
    }
  },
  methods:{
    addTodo(e){
      this.todoList.unshift(e);
      this.changeAllFlag();
    },
    changeTodo(id){
      this.todoList.forEach(item=>{
        if(item.id === id){
          item.done = !item.done;
        }
      });
      this.changeAllFlag();
    },
    changeAllFlag(){
      this.selectedAllFlag = this.todoList.length === 0 ? false : this.todoList.find(item=>{
        return item.done === false;
      }) ? false : true;
    },
    selectedAll(){
      this.selectedAllFlag = !this.selectedAllFlag;
      this.todoList.forEach(item=>{
        item.done = this.selectedAllFlag;
      })
    },
    deleteTodo(id){
      // console.log(id);
      if(!confirm('确定删除吗?')){
        return;
      }
      this.todoList = this.todoList.filter(item=>item.id !== id)
      this.changeAllFlag();
    },
    clearTodoed(){
      this.todoList = this.todoList.filter(item=>item.done === false);
      this.changeAllFlag();
    }
  },
  created() {
    document.title = 'Vue抬头';
    let oData = JSON.parse(localStorage.getItem("todoData"));
    if(!oData || !oData.todoList || oData.todoList.length === 0){
      oData = { todoList:[
                          { id:1,info:'吃饭',done:false },
                          { id:2,info:'睡觉',done:true },
                          { id:3,info:'打豆豆',done:false }
                         ],
                        selectedAllFlag:false};
    }
    this.todoList = oData.todoList;
    this.selectedAllFlag = oData.selectedAllFlag;
  },
  watch:{
    todoList:{
      handler(){
        localStorage.setItem("todoData",JSON.stringify(this.$data));
      },
      deep:true
    }
  }
}
</script>

<style>
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
