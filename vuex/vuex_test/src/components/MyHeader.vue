<template>
  <div class="todo-header"> 
    <input type="text" v-model="title" @keyup.enter="add" placeholder="请输入你的任务名称，按回车键确认"/>
  </div> 
</template>

<script>
  import {nanoid} from 'nanoid'
  export default {
      name:"MyHeader",
      data(){
        return {
          title:""
        }
      },
      mounted() {
        this.$bus.$on("addRandomTodo",(...param) => {
          const d = new Date();
          const pad = (num) => String(num).padStart(2, '0');
          const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
          const arr = Array.from({length:param[0].random},(_,index)=>({
            id:nanoid(),info:`随机任务：${index+1}，时间：${dateStr}`,done:false
          }))
          this.$emit('addTodo',arr);
        })
      },
      methods:{
        add(e){
          if(e.target.value === ''){
            return;
          }
          const obj = { id:nanoid(),info:e.target.value,done:false };
          this.$emit('addTodo',obj);
          e.target.value = '';
        }
      },
      watch:{
      }
  }
</script>

<style scoped>
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>