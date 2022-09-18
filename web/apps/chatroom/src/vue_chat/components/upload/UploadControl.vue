<template>
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
      list-type="picture"
  >
    <el-button type="primary">Click to upload</el-button>
    <!--                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />-->
    <!--                              <template #tip>-->
    <!--                                <div class="el-upload__tip">-->
    <!--                                  jpg/png files with a size less than 500KB.-->
    <!--                                </div>-->
    <!--                              </template>-->
  </el-upload>

</template>

<script setup>
import { ref } from 'vue'

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
