<template>
<div class="wrapper">
      <vHead></vHead>
    <vSidebar></vSidebar>
         <div class="content">
            <transition name="move" mode="out-in"><router-view/></transition>
        </div>
</div>
  
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    vHead,
    vSidebar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
