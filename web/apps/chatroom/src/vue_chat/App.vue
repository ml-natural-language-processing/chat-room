<script setup >
// import Chat from './chat'
// import UploadImage from './components/upload/Image'
// import UploadAvatar from './components/upload/Avatar'
// import CustomThumb from './components/upload/CustomThumb.vue'
import DragUpload from './components/upload/DragUpload'
import Layout from './components/layout.vue'


</script>

<template>
<!--  <Chat />-->
<!--  动态组件-->
<!--  <component :is="some condition" ?"Chat":"other component" />-->
<!--  <component :is="UploadImage" />-->
<!--  <component :is="UploadAvatar" />-->
<!--  <component :is="CustomThumb" />-->
<!--  <component :is="DragUpload" />-->
  <component :is="Layout" />
</template>
