<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @click="changeTodo(todo.id)"/>
      <span v-show="!todo.isEdit">{{todo.info}}</span>
      <input type="text" 
             class="todoInput" 
             v-show="todo.isEdit" 
             :value="todo.info"
             @blur="todoBlur(todo,$event)"
             @keyup.enter="todoBlur(todo,$event)"
             ref="todoInput">
    </label>
    <button class="btn btn-danger" @click="deleteTodo(todo.id)" >删除</button>
    <button class="btn btn-edit" v-show="!todo.isEdit" @click="editTodo(todo)" >编辑</button>
  </li>
</template>

<script>
export default {
    name:"MyItem",
    props:['todo','changeTodo','deleteTodo'],
    methods:{
      editTodo(todo){
        if(todo.hasOwnProperty('isEdit')){
          todo.isEdit = true;
        }else{
          this.$set(todo,'isEdit',true);
        }
        this.$nextTick(() => {
          this.$refs.todoInput.focus();
        });
      },
      todoBlur(todo,evt){
        todo.info = evt.target.value;
        this.$bus.$emit("updateTodo",todo);
        todo.isEdit = false;
      }
    }
}
</script>

<style scoped>
.todoInput{
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
.btn-edit {
  color: #fff;
  background-color: aquamarine;
  border: 1px solid aquamarine;
  margin-right: 5px;
}
li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: 3px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover{
  background-color: #ccc;
}
li:hover .btn{
  display:initial;
}
</style>