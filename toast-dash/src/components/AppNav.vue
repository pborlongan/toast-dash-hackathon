<template>
  <v-app-bar :elevation="0" class="border-b-sm">
    <v-app-bar-title>TalentTua</v-app-bar-title>
    <template v-slot:append>
      <div class="nav-right mr-10">
        <a href="/">
          About us
        </a>

        <a href="/">
          How it works
        </a>

        <a href="/">
          Contact
        </a>
      </div>
    </template>
  </v-app-bar>
</template>

<style scoped lang="scss">
  a {
    text-decoration: none;
    color: black;
  }

  .nav-right {
    display: flex;
    column-gap: 20px;
  }
</style>
<script setup lang="ts">
</script>
