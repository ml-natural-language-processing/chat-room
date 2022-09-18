<script setup>

import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from 'element-plus'
import ChatScrollbar from './chatScrollbar'
import UploadControl from './upload/UploadControl'
import {ChatManager} from '../chat'
const chatMananger = new ChatManager()
chatMananger.addSocketEvent()


const textarea = ref('')

const state = reactive(["Welcome to the Tensor Space.\n"])
chatMananger.registerState(state)

async function sendMessage() {
  chatMananger.socketSendMsg(textarea.value)
  await chatMananger.grpcSemdMsg(textarea.value)
  textarea.value = ''
}


</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="38.2%">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main

          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>Card name</span>
                <el-button class="button" text>Operation button</el-button>
              </div>
            </template>

              <component :is="ChatScrollbar"  :state="state"  />

          </el-card>


        </el-main>
        <el-footer>Footer

          <div class="common-layout2">
            <el-input
                v-model="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
                type="textarea"
                placeholder="Please input"
                @keydown.shift.enter="sendMessage"
                @keydown.ctrl.enter="sendMessage"
            />
            <el-container>
              <el-aside width="50%">
                <br>
                <el-button @click="sendMessage" type="success">send</el-button>
              </el-aside>
              <el-main>
                <component :is="UploadControl" />
              </el-main>
            </el-container>
          </div>

        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  /*width: 480px;*/
}

</style>