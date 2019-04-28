<template>
  <div class="progress progress-xs">
    <div
        class="progress-bar" :class="['bg-' + this.status]"
        role="progressbar"
        :style="{width: this.value + '%'}"
        :aria-valuenow="this.value"
        aria-valuemin="0"
        aria-valuemax="100"
    ></div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {type: Number, default: 50},
      status: {type: String, default: "info"},
    }
  }
</script>