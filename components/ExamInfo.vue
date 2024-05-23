<template>
    <div class="exam_info">
      <h2>考试信息</h2>
      <p v-if="type === 'individual'"><b>考生姓名：</b>{{ name }}</p>
      <p v-if="type === 'edu'"><b>考试人数：</b>{{ studentNumbers }}</p>
      <p><b>考试科目：</b>{{ subject }}</p>
      <p><b>考试时间：</b>{{ formatTime(startTime, endTime) }}</p>   
      <p><b>考试地点：</b>{{ loc }}</p>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      type: {
        type: String,
        required: true
      },
      studentNumbers: {
        type: Number,
        default: 1,
      },
      name: {
        type: String,
        default: ''
      },
      subject: {
        type: String,
        default: ''
      },
      startTime: {
        type: String,
        default: ''
      },
      endTime: {
        type: String,
        default: ''
      },
      loc: {
        type: String,
        default: ''
      }
    },
    methods: {
      formatTime(startTime: string, endTime: string) {
        const start = new Date(startTime);
        const end = new Date(endTime);
  
        const year = start.getFullYear();
        const month = start.getMonth() + 1; // Months are 0-based in JavaScript
        const date = start.getDate();
        const startHour = start.getHours();
        const startMinute = start.getMinutes();
        const startSecond = start.getSeconds();
  
        const endHour = end.getHours();
        const endMinute = end.getMinutes();
        const endSecond = end.getSeconds();
  
        return `${year}年${month}月${date}日${startHour}:${startMinute}:${startSecond}到${endHour}:${endMinute}:${endSecond}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .exam_info {
    background-color: #d7bdbd;
    border-radius: 5px;
    padding: 20px;
  }
  </style>
  