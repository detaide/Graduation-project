<template>
    <div class="w-4/5 h-4/5 chat-auto">
        <div :class="['TUIKit', isH5 && 'TUIKit-h5']" class="resize-chat bg-white w-4/5 h-4/5">
      <div v-if="!(isH5 && currentConversationID)" class="TUIKit-navbar">
        <div
          v-for="item of navbarList"
          :key="item.id"
          :class="['TUIKit-navbar-item', currentNavbar === item.id && 'TUIKit-navbar-item-active']"
          @click="currentNavbar = item.id"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="TUIKit-main-container">
        <div v-if="currentNavbar === 'conversation'" class="TUIKit-main">
          <div v-if="!(isH5 && currentConversationID)" class="TUIKit-main-aside">
            <TUISearch searchType="global"></TUISearch>
            <TUIConversation></TUIConversation>
          </div>
          <div v-if="!isH5 || currentConversationID" class="TUIKit-main-main">
            <TUIChat>
              <h1 style="margin:20px;">欢迎使用易聊</h1>
            </TUIChat>
            <TUIGroup :class="isH5 ? 'chat-popup' : 'chat-aside'" />
            <TUISearch :class="isH5 ? 'chat-popup' : 'chat-aside'" searchType="conversation" />
          </div>
          <TUIGroup v-if="isH5 && !currentConversationID" class="chat-popup" />
          <TUIContact displayType="selectFriend" />
        </div>
        <div v-else-if="currentNavbar === 'contact'" class="TUIKit-main">
          <TUIContact
            displayType="contactList"
            @switchConversation="currentNavbar = 'conversation'"
          />
        </div>
        <TUICallKit class="callkit-container" :allowedMinimized="true" :allowedFullScreen="false" />
      </div>
    </div>
    </div>
    
  </template>
  <script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { TUIStore, StoreName } from "@tencentcloud/chat-uikit-engine";
  import { TUICallKit } from "@tencentcloud/call-uikit-vue";
  import { TUISearch, TUIConversation, TUIChat, TUIContact, TUIGroup } from "@/TUIKit";
  import { isH5 } from "@/TUIKit/utils/env";
  import {TUIChatKit} from "@/TUIKit";
  import * as general from "@/utils/general";
  const currentConversationID = ref<string>("");
  const currentNavbar = ref<string>("conversation");
  const navbarList = [
    {
      id: "conversation",
      label: "会话",
    },
    {
      id: "contact",
      label: "通讯录",
    },
  ];
  TUIStore.watch(StoreName.CONV, {
    currentConversationID: (id: string) => {
      currentConversationID.value = id;
    },
  });

  onMounted(() =>
  {
    // console.log(TUIChatKit, TUIChatKit.SDKAppID, TUIChatKit.chat)
    
  })


  </script>
  <style scoped lang="scss">
    @import "@/TUIKit/assets/styles/common.scss";
    @import "@/TUIKit/assets/styles/sample.scss";

    .chatContainer{
        // width: 80% ;
        // height: 80% ;
    }

    .resize-chat{
        // width: 80%;
        // height: 100%;
        min-height: 80vh;
        min-width: 80vw;
        max-height: 80vh;
        max-width: 80vw;
    }

    .chat-auto
    {
        margin: auto;
    }
  </style>
  