<script setup>
import {ref, reactive} from 'vue'
import {
  Eleme,
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import {setChatAttr, getGrpcResponse} from './grpc_component'

const state = reactive({count: 0})
function increment(){
  state.count++
  console.log(state.count)
}

const awesome = ref(true)

function toggle() {
  awesome.value = !awesome.value
}

const percentage1 = ref(0)


setInterval(() => {
  percentage1.value = (percentage1.value % 100) + 10
}, 500)

let input = ref('')

const textarea2 = ref('')
async function sendMessage(){
  console.log(textarea2)
  setChatAttr(1, 'a', textarea2.value)
  const resp = await getGrpcResponse()
  console.log(resp)
  textarea2.value = ''

}
const format = (percentage1) => (percentage1 === 100 ? 'Full' : `${percentage1}%`)
</script>


<template>
  <el-button @click="increment" type="primary"> {{state.count}} </el-button>

  <el-button @click="toggle" type="primary">toggle</el-button>


  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh ha 😢</h1>

  <div class="demo-progress">
    <el-progress :percentage="percentage1" :format="format" />
    <el-progress :percentage="100" :format="format"/>
    <el-progress :percentage="100" status="success"/>
    <el-progress :percentage="100" status="warning"/>
    <el-progress :percentage="50" status="exception"/>
  </div>

  <el-input
      v-model="input"
      type="password"
      placeholder="Please input password"
      show-password
  />

  <div style="margin: 120px 0"/>
  <el-input
      v-model="textarea2"
      :autosize="{ minRows: 2, maxRows: 4 }"
      type="textarea"
      placeholder="Please input"
  />
  <el-button id="aaaa" @click="sendMessage" type="success">send</el-button>

  <div style="margin: 120px 0"/>
  <div style="margin: 120px 0"/>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>





<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  margin-right: 15px;
  /*width: 350px;*/
}


</style>
