<template>
  <div class="progress-bar">
    <span class="progress-fill" ref="fill" :style="[{'background-color':color}]"></span>
  </div>
</template>
<script>
export default {
  name: "loading",
  props: {
    color: {
      type: String,
      default: "hsl(260, 90%, 70%)"
    },
    value: {
      type: [String, Number],
      default: 0
    }
  },
  mounted() {
    setTimeout(()=>this.render())
  },
  methods: {
    render(){
      this.$refs.fill.style.width = this.value + "%";
    }
  },
};
</script>
