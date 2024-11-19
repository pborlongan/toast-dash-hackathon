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
      <div class="conversation-container">

        <div class="chat-bot pa-4">
          <div class="assistant">
            <v-avatar color="info" size="x-large">
              <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
            <v-card
              title="TalentTua AI Assistant"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <p>Hello! In order to build your Ideal Candidate Profile, we need you to answer a few questions related to the role.
                </p>
                <br />
                <p>To start, which seniority level are you looking for for this role?</p>
              </v-card-text>
              <v-card-actions>
                <v-btn variant="tonal" @click="addSeniority">Entry level</v-btn>
                <v-btn variant="tonal" @click="addSeniority">Junior</v-btn>
                <v-btn variant="tonal" @click="addSeniority">Intermediate</v-btn>
                <v-btn variant="tonal" @click="addSeniority">Senior</v-btn>
                <v-btn variant="tonal" @click="addSeniority">Manager</v-btn>
                <v-btn variant="tonal" @click="addSeniority" >Executive</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>

        <div class="chat-bot pa-4 d-flex" v-if="chatBot2">
          <div class="response">
            <v-card
              title="You"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <p>
                  {{ response1 }}
                </p>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
      <div class="chat-bot-enter">
        <v-text-field class="chat-bot-input" v-model="inputText">
          <template #append>
            <v-btn class="mb-1 mr-1" outlined color="indigo" @click="enterInput" :disabled="inputChat"> Enter </v-btn>
          </template>
        </v-text-field>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  const jobSearchText = ref('');
  const chatContainer = ref(false);
  const searchButton = ref(false);
  const newSearchButton = ref(true);
  const inputText = ref('');
  const inputChat = ref(true);
  const chatBot2 = ref(false);
  const response1 = ref('');

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

  const addSeniority = (event: Event) => {
    const element = event.currentTarget as Element;
    inputText.value = element.textContent || '';
    inputChat.value = false;
  }

  const enterInput = () => {
    response1.value = inputText.value;
    inputText.value = '';
    inputChat.value = true;
    chatBot2.value = true;
  }
</script>

<style scoped lang="scss">
 h4 {
   color: #4F7A94;
 }

 .chat {
   height: 730px;
   background-color: #E8EDF5;
   flex: 1;
   border-radius: 5px;
   position: relative;

   .chat-bot-enter {
     position: absolute;
     padding: 1rem;
     bottom: 0;
     width: 100%;
   }

   .conversation-container {
     overflow: scroll;
     height: 400px;
   }

   .response {
     max-width: fit-content;
     margin-left: auto;
   }
 }

 .chat-bot, .chat-bot-2 {
   animation: fadeIn 2s forwards;
 }

 @keyframes fadeIn {
   from { opacity: 0; }
   to { opacity: 1; }
 }

 .response {

   :deep(.v-card-item__content){
     display: flex;
     flex-direction: row;
     align-items: flex-end;
     column-gap: 10px;

     .v-card-subtitle {
       color: #07446a;
       font-weight: bold;
     }
   }
 }

 .assistant {
   display: flex;
   column-gap: 10px;
   .v-card {
     background-color: #ffffff !important;
     width: 100%;
   }

   :deep(.v-card-item__content){
     display: flex;
     flex-direction: row;
     align-items: flex-end;
     column-gap: 10px;

     .v-card-subtitle {
       color: #07446a;
       font-weight: bold;
     }
   }

   .v-card-text {
     padding-bottom: 0;
   }

   .v-card-actions {
     padding: 1rem;
   }
 }



</style>


