<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @click="changeTodo(todo.id)"/>
      <span>{{todo.info}}</span>
    </label>
    <button class="btn btn-danger" @click="deleteTodo(todo.id)" >删除</button>
  </li>
</template>

<script>
export default {
    name:"MyItem",
    props:['todo','changeTodo','deleteTodo']
}
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
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