<template>
  <el-scrollbar ref="chatScrollbar" style="height: 500px">
    <div ref="innerRef">
      <p v-for="(item, index) in state" :key="item" class="scrollbar-demo-item" :style="{height: (item.split('\n').length)*18+'px'}">
        {{ item }}
      </p>
    </div>

    <el-divider/>
  </el-scrollbar>
</template>

<script setup>
import {watch, watchPostEffect, watchSyncEffect, computed, reactive, ref, watchEffect, onMounted} from 'vue'
const innerRef = ref()
const chatScrollbar = ref()
const props = defineProps(["state",])


watch(
    ()=>props.state,
    ()=>{
      setTimeout(()=>{
        chatScrollbar.value.setScrollTop(innerRef.value.clientHeight)
      },0.05);

    },
    {
      deep: true, // 深度监听
      immediate: false
    }
)


</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  /*justify-content: space-around;*/
  /*height: 50px;*/
  margin: 10px;
  /*text-align: center;*/
  border-radius: 10px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  white-space: pre-line;
}


</style>
