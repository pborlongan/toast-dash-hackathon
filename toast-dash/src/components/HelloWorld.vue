<template>
  <v-container class="fill-height d-flex flex-column">
    <v-img
      class="bg-grey-lighten-2 w-100"
      max-height="400"
      src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      cover
    ></v-img>

    <h1 class="mt-4">
      Hire based on skills, not resumes
    </h1>

    <h3 class="font-weight-regular mt-2">
      Find the best person for the job by focusing on their abilities and potential, not just their experience, using TalentTua
    </h3>

    <a class="button" href="/demo">
      Create your Ideal Candidate Profile
    </a>
  </v-container>
</template>

<script setup lang="ts">
</script>


<style scoped lang="scss">
@use 'sass:color';
.v-img {
  border-radius: 5px;
}

h3 {
  color: #0D171C;
  font-size: 16px;
}

.button {
  background-color: #99bce1;
  border-radius: 5px;
  margin-top: 1rem;
  padding: 1rem;
  color: #0D171C;
  text-decoration: none;

  &:hover{
    background-color: #c2ccd8;
    color: #0D171C;
  }
}

</style>
