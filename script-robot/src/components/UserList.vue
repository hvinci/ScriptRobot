<!--
 * @Author: hvinci
 * @Date: 2023-11-12 22:37:32
 * @LastEditors: hvinci
 * @LastEditTime: 2023-11-18 17:51:33
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="user-list-container">
    <h2 class="tech-title">Masters of the Chativerse</h2>
    <ul class="user-list">
      <li v-for="(user, username) in users" :key="username" class="user-item">
        {{ username }}
      </li>
    <p><b>这些用户名已经被占用,请不要重复使用</b></p>
    <p><b>by.AgentCat</b></p>
    </ul>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    users: Object,
  },
} 
</script>


<style lang="scss">
.user-list-container {
  padding: 20px;
  background-color: #2a9dd6; 
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  width: 200px; 
  align-self: flex-start;
  position: fixed; 
  top: 50px; 
  left: 50px; 
}

.tech-title {
  font-size: 1.5em;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #ffffff; 
  margin-bottom: 10px;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  padding: 10px;
  margin: 5px 0;
  color: #0700087a; 
  background-color: #ffffff; 
  border-radius: 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; 
}

</style>
