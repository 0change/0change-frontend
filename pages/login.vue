<template>
  <div class="text-center">
    <div style="max-width: 40em; margin: auto">
      <h1>You are not logged in</h1>
      <p>this page needs to be logged in</p>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'coreui-no-sidemenu',
    mounted: function() {
      if(this.$auth.loggedIn)
        window.location.href = '/';
    }
  }
</script>