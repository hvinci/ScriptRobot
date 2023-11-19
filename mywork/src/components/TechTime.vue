<!--
 * @Author: hvinci
 * @Date: 2023-11-18 05:21:46
 * @LastEditors: hvinci
 * @LastEditTime: 2023-11-20 00:21:06
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="tech-time">
    <div class="date">{{ currentDate }}</div>
    <div class="time">{{ currentTime }}</div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const currentDate = ref<string>("");
    const currentTime = ref<string>("");

    const updateDate = () => {
      const now = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      const locales = "en-US";
      currentDate.value = now.toLocaleDateString(locales, options as Intl.DateTimeFormatOptions);
    };

    const updateTime = () => {
      const now = new Date();
      const locales = "en-US";
      currentTime.value = now.toLocaleTimeString(locales);
    };

    onMounted(() => {
      updateDate();
      updateTime();
      setInterval(updateTime, 1000);
    });

    return { currentDate, currentTime };
  },
};
</script>


  
<style scoped>
.tech-time {
  position: absolute;
  top: 50px;
  right: 50px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Courier New", monospace;
  color: rgb(66, 223, 31);
}

.time {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}</style>