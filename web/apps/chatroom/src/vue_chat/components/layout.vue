<script setup>

import {ref} from "vue";
import {getGrpcResponse, setChatAttr} from "../grpc_component";
import {ElMessage, ElMessageBox} from 'element-plus'
import ChatScrollbar from './chatScrollbar'

const textarea = ref('')

async function sendMessage() {
  setChatAttr(1, 'a', textarea.value)
  const resp = await getGrpcResponse()
  console.log(resp)
  textarea.value = ''

}

const fileList = ref([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])
const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
      `The limit is 3, you selected ${files.length} files this time, add up to ${
          files.length + uploadFiles.length
      } totally`
  )
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

<!--            <el-scrollbar height="400px">-->
<!--              <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>-->
              <component :is="ChatScrollbar" />


<!--            </el-scrollbar>-->

          </el-card>


        </el-main>
        <el-footer>Footer

          <div class="common-layout2">
            <el-input
                v-model="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
                type="textarea"
                placeholder="Please input"
                @keyup.ctrl.enter.native="sendMessage"
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
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    multiple
                >
                  <el-button type="primary">Click to upload</el-button>
                  <!--            <template #tip>-->
                  <!--              <div class="el-upload__tip">-->
                  <!--                jpg/png files with a size less than 500KB.-->
                  <!--              </div>-->
                  <!--            </template>-->
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
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

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