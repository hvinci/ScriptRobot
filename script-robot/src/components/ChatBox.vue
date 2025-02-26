<!-- eslint-disable vue/multi-word-component-names -->
<!--
 * @Author: hvinci
 * @Date: 2023-11-02 20:13:14
 * @LastEditors: hvinci
 * @LastEditTime: 2023-11-20 13:15:49
 * @Description: 聊天框部分 
-->

<template>
    <div>
        <UserList :users="userList" />
        <beautiful-chat :open="openChat" :colors="colors" :showCloseButton="true" :alwaysScrollToBottom="scrollToBottom"
            :disableUserListToggle="false" :messageStyling="messageStyle" :showEmoji="true" :showFile="true"
            :showEdition="true" :showDeletion="true" :deletionConfirmation="true" :showTypingIndicator="showTyping"
            :showLauncher="true" :participants="involved" :titleImageUrl="imageUrl" :onMessageWasSent="addMessage"
            :messageList="messageList" :isOpen="chatOpen" :close="closeChat" />
    </div>
</template>

<script lang="ts">
import UserList from './UserList.vue';
import { ElMessageBox, ElMessage } from "element-plus";
import { getVari, init, translate } from "../utils/translate";
import { bus } from "../utils/bus";
import { toRefs, watch, defineComponent, reactive } from "vue";
import { STATUS, MESSAGE, VARIABLE } from "../utils/interface";


const DEFAULT_COLORS = {
    header: { bg: "linear-gradient(45deg, #0077B6, #00B7C2)", text: "#ffffff" },
    launcher: { bg: "" },
    messageList: { bg: "#FFFACD" },
    sentMessage: { bg: "#00BB5E", text: "#ffffff" },
    receivedMessage: { bg: "#ffffff", text: "#000000" },
    userInput: { bg: "linear-gradient(45deg, #FFD700, #FFFF00)", text: "#565867" },
};


const DEFAULT_CHAT = {
    OnlineUser: "",
    defaultScript: "const noop = () => {}",
    involved: [
        {
            id: "Service",
            name: "AgentCat",
            imageUrl: "img/cat.png",
        },
    ],
    imageUrl: "img/ChatTitle.jpg",
    messageList: [] as MESSAGE[],
    chatOpen: false,
    showTyping: "",
    colors: DEFAULT_COLORS,
    scrollToBottom: true,
    messageStyle: true,
    activeScript: bus.activeScript,
    status: {} as STATUS,
    stop: true,

    timeoutID: -1,
};

export default defineComponent({

    // eslint-disable-next-line vue/multi-word-component-names
    name: "ChatRoom",

    components: {
        UserList,
    },

    setup() {

        let userList = reactive(bus.userList);

        /**
         * @description: 
         * @return {*}
         */
        const defaultChat = {
            ...DEFAULT_CHAT,
            AgentTalk,
            addMessage,
            openChat,
            closeChat,
        };
        
        const chat = reactive({ ...defaultChat });
        
        /**
         * @description: 开启聊天
         * @return {*}
         */

        function openChat() {
            ElMessageBox.prompt(
                "Please enter your funky username:",
                "Newbie Alert",
                {
                    confirmButtonText: "Let's Get Fancy",
                    cancelButtonText: "Never Mind",
                }
            )
                .then(({ value }) => {
                    // 获取用户名和用户输入的参数
                    const username = value.trim();
                    const vars = getVari(bus.ast);

                    initializeChat(username, vars);
                    
                })
                .catch(() => {
                    ElMessage({
                        type: "info",
                        message: "Operation canceled",
                    });
                });
        }
        
        /**
         * @description: 初始化聊天
         * @return {*}
         */        

        function initializeChat(username: string, vars: VARIABLE) {
            
            chat.OnlineUser = username;

            if (Object.keys(bus.userList).includes(username)) {
                ElMessageBox.alert(
                    "Oops! That name is already taken. Try another one!",
                    "Oopsie"
                );
                return;
            }

            let text = "请输入以下参数,用空格分割: ";
            text += "姓名 账户余额";

            const inputPatternString = `^([^\\s]+(\\s|$)){${Object.keys(vars).length}}$`;
            const inputPattern = new RegExp(inputPatternString);

            ElMessageBox.prompt(text, "Variable Initialization", {
                confirmButtonText: "OK",
                cancelButtonText: "I Give Up",
                inputPattern: inputPattern,
                inputErrorMessage: "Invalid input. Please try again.",
            })
                .then(({ value }) => {
                    const varList = value.split(" ");

                    // 给用户输入的变量赋值
                    Object.keys(vars).forEach((key, index) => {
                        vars[key] = varList[index];
                    });

                    chat.status = init(bus.ast, vars);
                    // 清空聊天消息列表
                    chat.messageList = [];

                    const newUser = {
                        username: username,
                        status: chat.status,
                        messageList: chat.messageList,
                    };
                    bus.userList[username] = newUser;

                    handleAnswer(); 
                })
                .catch(() => {
                    ElMessage({
                        type: "info",
                        message: "Input canceled",
                    });
                });
        }

        /**
         * @description: 处理用户输入
         * @return {*}
         */        

        function handleAnswer() {
            try {
                // 初始状态
                const translatedAnswer = translate(bus.ast, chat.status, "", true, false);

                if (translatedAnswer.time > 0) {
                    scheduleSilenceReply(translatedAnswer.time);
                }

                AgentTalk(translatedAnswer.message);

                // 更新chat状态
                Object.assign(chat, {
                    stop: false,
                    chatOpen: true,
                });

            } catch (error) {
                handleTranslationError(error);
            }
        }

        /**
         * @description: 客服发送信息
         * @param {*} message
         * @return {*}
         */
         function AgentTalk(message: string) {
            if (message.length > 0) {
                // 发送消息
                chat.addMessage({
                    author: "Service",
                    type: "text",
                    data: { text: message }
                });
            }
        }

        /**
         * @description:  将消息加入列表中
         * @param {*} message
         * @return {*}
         */
        function addMessage(message: MESSAGE) {

            chat.messageList.push(message);
            // 若是用户发送的则处理计时器
            if (message.author != "Service") {
                if (chat.timeoutID != -1) {
                    clearTimeout(chat.timeoutID);
                }
                AgentTalk(AgentReply(message.data.text));
            }
        }

        /**
         * @description: 根据用户输入获取客服回复
         * @param {*} userTalk
         * @param {*} isSilence
         * @return {*}
         */
        function AgentReply(userTalk: string, isSilence = false) {

            try {
                const reply = translate(bus.ast, chat.status, userTalk, false, isSilence);

                //  若有时间限制则设置定时器
                if (reply.time > 0) 
                    scheduleSilenceReply(reply.time);

                chat.stop = reply.finish;

                return reply.message;

            } catch (error) {
                handleTranslationError(error);
                return "error";
            }
        }

        function scheduleSilenceReply(time: number) {
            // 转换成秒
            const delay = time * 1000; 
            // 设置定时器 如果超时，则调用机器人进行silence回复
            chat.timeoutID = setTimeout(() => AgentTalk(AgentReply("", true)), delay);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function handleTranslationError(error: any) {
            const errorMessage = error.message || "An error occurred.";
            ElMessage.error(errorMessage);
            chat.stop = true;
        }

        /**
         * @description: 关闭聊天
         * @return {*}
         */
        function closeChat() {

            // 关闭聊天框
            chat.chatOpen = false;

            // 关闭计时器
            if (chat.timeoutID !== -1) {
                clearTimeout(chat.timeoutID);
            }
            chat.timeoutID = -1;
        }

        watch(() => chat.stop, () => handleChatStop());

        function handleChatStop() {
            const input = document.querySelector(".sc-user-input--text") as HTMLElement;

            if (input) {
                input.contentEditable = chat.stop ? "false" : "true";
                input.setAttribute("placeholder", chat.stop ? "聊天已结束" : "请输入");
            }
            
            // 保存聊天信息
            bus.userList[chat.OnlineUser].messageList = JSON.parse(
                JSON.stringify(chat.messageList)
            );

            // 暂时保存环境
            chat.messageList = JSON.parse(
                JSON.stringify(
                    bus.userList[chat.OnlineUser].messageList
                )
            );
            chat.status = JSON.parse(
                JSON.stringify(bus.userList[chat.OnlineUser].status)
            );
        }

        return {
            ...toRefs(chat),
            userList,
        };

    },
});

</script>