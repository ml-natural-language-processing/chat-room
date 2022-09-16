<script setup>

import {reactive, ref} from "vue";
import {getGrpcResponse, setChatAttr} from "../grpc_component";
import {ElMessage, ElMessageBox} from 'element-plus'
import ChatScrollbar from './chatScrollbar'
import { genFileId } from 'element-plus'


const textarea = ref('')
const state = reactive(["官方广播： 欢迎yao进入聊天\n"])

async function sendMessage() {
  setChatAttr(1, 'a', textarea.value)
  const resp = await getGrpcResponse()
  console.log(resp)
  state.push(textarea.value)
  textarea.value = ''
  console.log(fileList.value[2])
}
const uploadRef = ref()

// const submitUpload = () => {
//   console.log(
//       uploadRef.value
//   )
// }
const fileList = ref([

])

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed = (files) => {
  uploadRef.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  uploadRef.value.handleStart(file)
}

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
      `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
      () => true,
      () => false
  )
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
                <el-upload
                    v-model:file-list="fileList"
                    class="upload-demo"
                    ref="uploadRef"
                    :auto-upload="false"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :limit="1"
                    :show-file_list="true"
                >
                  <el-button type="primary">Click to upload</el-button>
<!--                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />-->
<!--                              <template #tip>-->
<!--                                <div class="el-upload__tip">-->
<!--                                  jpg/png files with a size less than 500KB.-->
<!--                                </div>-->
<!--                              </template>-->
                </el-upload>
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