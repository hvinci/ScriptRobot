<!--
 * @Author: hvinci
 * @Date: 2023-11-03 22:19:08
 * @LastEditors: hvinci
 * @LastEditTime: 2023-11-20 00:23:11
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <Chat id="chat" />
  <div id="app">
    <img id="logo" alt="vinci logo" src="./assets/logo.png" />
    <h1>vinci's Agent</h1>
    <BottonDesign /> 
    <p><b>领域特定语言的客服机器人 made by vinci</b></p>
    <TechTime />
    <p id="start-chat">点击这里开始聊天 ⬇︎</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chat from "./components/ChatBox.vue";
import BottonDesign from "./components/Botton.vue";
import TechTime from "./components/TechTime.vue"; 

export default defineComponent({
  name: "App",
  components: { Chat, BottonDesign, TechTime },
});

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e5f0fa;
  text-align: -webkit-center;
  background-image: url(./assets/background.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#user-list {
  position: absolute;
  top: 0;
  left: 100;
}


#logo {
  max-height: 13em;
  margin-bottom: 20px;
  margin-top: 60px;
  width: auto;
}

#chat>div.sc-chat-window.opened {
  z-index: 1999;
}

#chat>div.sc-launcher.opened {
  z-index: 1999;
}

#chat>div.sc-launcher {
  z-index: 1999;
}

.sc-header--img {
  max-height: 2.5em;
  max-width: 3em;
}

.sc-message--content.received .sc-message--text {
  text-align: left;
}

.sc-header--title.enabled {
  pointer-events: none;
}

.el-message-box {
  max-width: 90%;
}

#start-chat {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  bottom: 48px;
  right: 0px;
  font-size: 16px;
  color: rgb(233, 167, 13);
  writing-mode: vertical-rl;
  text-orientation: upright;
  animation: blink 1s infinite alternate;
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }

  100% {
    opacity: 1;
  }
}</style>
