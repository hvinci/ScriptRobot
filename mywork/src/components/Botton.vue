<!-- eslint-disable vue/multi-word-component-names -->

<!--
 * @Author: hvinci
 * @Date: 2023-11-02 21:13:08
 * @LastEditors: hvinci
 * @LastEditTime: 2023-11-18 18:14:01
 * @Description: 按钮部分设计
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->

<template>
  <div>
    <div id="editor">
      <MonacoEditor class="editor" language="elixir" height="300px" theme="vs" :value="scriptinfo"
        @change="ScriptChange($event)" />
    </div>
    <el-row id="upButtonrow">
      <el-col :span="12" style="margin-bottom: 40px;">
        <el-tooltip content="Use current Script (^=◕ᴥ◕=^)" placement="top" effect="light">
          <el-button class="buttonstyle" @click="apply">APPLY</el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="12" style="margin-bottom: 40px;">
        <el-tooltip content="Reset Script to the Default (=ｘェｘ=)" placement="top" effect="light">
          <el-button class="buttonstyle" @click="reset">RESET</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row id="downButtonrow">
      <el-col :span="12" style="margin-bottom: 40px;">
        <el-upload action="localhost" :before-upload="uploadFile" accept=".script">
          <el-tooltip content="Upload Your Own Script (◞‸◟ )" placement="bottom" effect="light">
            <el-button class="buttonstyle">UPLOAD</el-button>
          </el-tooltip>
        </el-upload>
      </el-col>
      <el-col :span="12" style="margin-bottom: 40px;">
        <el-tooltip content="Download the ActiveScript └(=^‥^=)┐" placement="bottom" effect="light">
          <el-button class="buttonstyle" @click="download">DOWNLOAD</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="text-align: center; margin-bottom: 20px;">
        <el-tooltip content="Click on me if you want to know the syntax!" placement="right" effect="light">
          <el-button class="buttonstyle" @click="bottomLeftButtonClick">Script Structure</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">

import { ElMessageBox, ElMessage } from "element-plus";
import { bus } from "../utils/bus";
import MonacoEditor from "monaco-editor-vue3";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "BottonDesign",
  components: { MonacoEditor },
  setup() {

    // 追踪脚本变化
    const chat = reactive({
      scriptinfo: "",
    });

    /**
     * @description:  save script after change
     * @param {*} script
     * @return {*}
     */
    const ScriptChange = (script: string) => {
      console.log('Script has changed:', script);
      chat.scriptinfo = script;
    };

    /**
     * @description: apply按钮 
     * @return {*}
     */
    const apply = () => {
      console.log('apply Function Called');
      if (bus.activeScript === chat.scriptinfo) {
        ElMessage.warning("Oops, your script is already as effective as a ninja!");
        return;
      } else {
        bus.activeScript = chat.scriptinfo;
      }
    };

    /**
     * @description: download the activeScript
     * @return {*}
     */
    const download = () => {
      ElMessageBox.prompt("Give your script a name, something cooler than a penguin's dream:", "Download", {
        confirmButtonText: "Let's Go!",
        cancelButtonText: "Nah, never mind",
        inputPlaceholder: "Enter an epic script name",
        inputPattern: /^(?!\.)[^\\/:*?"<>|]{1,255}$/,
        inputErrorMessage: "Oops, that name won't work, try something else!",
      })
        .then(({ value }) => {
          createDownloadLink(chat.scriptinfo, value);
          ElMessage({
            type: "success",
            message: `Hang tight, we're downloading your awesome script: ${value}.script! 🚀`,
          });
          console.log(`Downloaded script: ${value}.script`);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Alright, no download this time. You're in charge!",
          });
          console.log("Download cancelled.");
        });
    };

    /**
     * @description: create download link
     * @param {*} script
     * @param {*} filename
     * @return {*}
     */
    const createDownloadLink = (script: string, filename: string) => {
      const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(script);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.href = dataStr;
      downloadAnchorNode.download = `${filename}.script`;
      downloadAnchorNode.style.display = "none";
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      document.body.removeChild(downloadAnchorNode);
    };

    /**
     * @description: reset script to default
     * @return {*}
     */
    const reset = () => {
      chat.scriptinfo = bus.defaultScript;
      console.log("Script reset to default.");
    };

    /**
     * @description: upload script from local
     * @param {*} file
     * @return {*}
     */
    const uploadFile = async (file: Blob) => {
      console.log('Before Upload Function Called');
      console.log('Received File:', file);

      const reader = new FileReader();
      reader.onload = function fileReadCompleted() {
        if (typeof reader.result === 'string') {
          chat.scriptinfo = reader.result;
        } else {
          console.error('File content is not a string.');
        }
      };
      reader.readAsText(file);
      return false;
    };

    chat.scriptinfo = bus.defaultScript;
    console.log("Using defaultScript as scriptinfo:", chat.scriptinfo);
    
    const bottomLeftButtonClick = () => {
          ElMessageBox.alert(
            "step StepName<br/>say \"Hello, World!\" $variableName<br/>listenTimeout 10<br/>branch answer1, StepName1<br/>branch answer2, StepName2<br/>silenceAction StepName<br/>defaultAction StepName<br/>calculate arg1, arg2, arg3<br/>exit"
            ,
            "Announcement", {
      confirmButtonText: "OK",
      dangerouslyUseHTMLString: true, // Add this property to enable HTML in the message
      type: "info", // You can change the type to "success", "warning", or "error" based on the style you prefer
    });
  }

    return {
      ...toRefs(chat), // 添加 chat 对象的属性到返回的对象中
      ScriptChange,     // 添加 ScriptChange 方法到返回的对象中
      apply,
      reset,
      uploadFile,
      download,
      bottomLeftButtonClick, // Add this line
    };
  },
});
</script>


<style scoped>
#editor {
  max-width: 45em;
  height: 30em;
}

#upButtonrow {
  max-width: 25em;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* 居中对齐 */
  margin-top: -450px;
  margin-bottom: 10px;
}

#downButtonrow {
  max-width: 25em;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* 居中对齐 */
  margin-top: 20px;
  margin-bottom: 90px;
}


.editor {
  height: 37em;
  box-shadow: 0px 0px 10px #888888;
  padding-top: 5px;
  padding-bottom: 5px;
}

.buttonstyle {
  font-weight: bold;
  border: none;
  height: 25px;
  padding: 20px 20px;
  margin: -60px 0;
  /* 调整按钮之间的上下外边距 */
  color: #676060;
  background: linear-gradient(to bottom, #e6f65a, #abf65a);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s, box-shadow 0.3s;
  border-radius: 25px;
  transition: background-color 0.3s, box-shadow 0.3s;
  /* 添加过渡效果 */
  min-width: 160px;
  /* 设置按钮的最小宽度 */
}

.buttonstyle:hover {
  background: linear-gradient(to bottom, rgb(102, 234, 172), rgb(133, 201, 221));
  box-shadow: 0px 0px 50px rgb(255, 255, 255);
  /* 使用亮黄色阴影 */
  color: #fff;
  /* 按钮文字在悬停时的颜色，你可以根据需要调整颜色值 */
  animation: moveUpAndDown 0.5s ease infinite;
  /* 应用关键帧动画 */
}

@keyframes moveUpAndDown {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0);
  }
}
#bottomLeftButton {
  position: fixed;
  bottom: 90px;
  left: 640px;
  z-index: 999; /* Adjust the z-index as needed */
}
</style>
