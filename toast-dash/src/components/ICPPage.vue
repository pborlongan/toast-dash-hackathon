<template>
  <v-container class="my-4 mx-auto h-100 d-sm-flex flex-column">
    <div>
      <h2 class="font-weight-medium">Find your next great hire with TalentTua</h2>
      <h4 class="font-weight-medium mt-3">Our AI assistant will help you define job roles, input required skills, and create the Ideal Candidate Profile for your next hire.</h4>
    </div>

    <div class="w-100 mt-10">
      <v-text-field color="primary" label="Which job role are you hiring for?" variant="outlined" v-model="jobSearchText">
        <template #append>
          <v-btn class="mb-1 mr-1" outlined color="indigo" @click="displayChat" :disabled="searchButton"> Search </v-btn>
          <v-btn class="mb-1" outlined color="red" @click="clearChat" :disabled="newSearchButton"> Clear Search </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="chat" v-if="chatContainer">
      <div class="chat-bot pa-4">
        <p>You're looking for a: {{ jobSearchText }}</p>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  const jobSearchText = ref('');
  const chatContainer = ref(false);
  const searchButton = ref(false);
  const newSearchButton = ref(true);
  const displayChat = () => {
    chatContainer.value = !chatContainer.value;
    searchButtonValidation();
  }

  const clearChat = () => {
    jobSearchText.value = '';
    searchButton.value = false;
    newSearchButton.value = true;
    chatContainer.value = false;
  }

  const searchButtonValidation = () => {
    searchButton.value = jobSearchText.value != '';
    newSearchButton.value = false;
  }
</script>

<style scoped lang="scss">
 h4 {
   color: #4F7A94;
 }

 .chat {
   background-color: #E8EDF5;
   height: 0;
   border-radius: 5px;
   animation: tobottom 500ms 700ms linear forwards;
 }

 @keyframes tobottom {
   to {
     flex: 1;
   }
 }

 .chat-bot {
   animation: fadeIn 4s forwards;
 }

 @keyframes fadeIn {
   from { opacity: 0; }
   to { opacity: 1; }
 }


</style>


