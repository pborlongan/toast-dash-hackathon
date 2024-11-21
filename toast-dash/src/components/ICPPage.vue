<template>
  <v-container class="my-4 mx-auto h-100 d-sm-flex flex-column">
    <div>
      <h2 class="font-weight-medium">Find your next great hire with TalentTua</h2>
      <h4 class="font-weight-medium mt-3">Our AI assistant will help you define job roles, input required skills, and create the Ideal Candidate Profile for your next hire.</h4>
    </div>

    <div class="w-100 mt-10">
      <v-text-field color="primary" label="Which job role are you hiring for?" variant="outlined" v-model="jobSearchText">
        <template #append>
          <v-btn class="mb-1 mr-1" outlined color="indigo" @click="submitJobTitle" :disabled="searchButton"> Search </v-btn>
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
                <p>{{ store.jobTools.data.data.question }}</p>
              </v-card-text>
              <v-card-actions>
                <div class="d-flex flex-wrap ga-3">
                  <v-btn variant="tonal" v-for="(item) in store.jobTools.data.data.suggested_tools" @click="addJobTools">
                    {{ item.name }}
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </div>
        </div>

        <div class="chat-bot pa-4 d-flex" v-if="response1">
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

        <div class="chat-bot pa-4" v-if="response1">
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
                <p>Select the top desirable skills for this role.</p>
              </v-card-text>
              <v-card-actions>
                <div class="d-flex flex-wrap ga-3">
                  <v-btn variant="tonal" v-for="(item) in store.topSkills" @click="addDesirableSkills">
                    {{ item }}
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </div>
        </div>

        <div class="chat-bot pa-4 d-flex" v-if="response2">
          <div class="response">
            <v-card
              title="You"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <p>
                  {{ response2 }}
                </p>
              </v-card-text>
            </v-card>
          </div>
        </div>


        <div class="chat-bot pa-4" v-if="response2">
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
                <p>{{ store.topSkillsResponse.data.data.question }}</p>
              </v-card-text>
              <v-card-actions>
                <div class="d-flex flex-wrap ga-3">
                  <v-btn variant="tonal" v-for="(item) in store.topSkillsResponse.data.data.undesirableSkills" @click="addUndesirableSkills">
                    {{ item }}
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </div>
        </div>

        <div class="chat-bot pa-4 d-flex" v-if="response3">
          <div class="response">
            <v-card
              title="You"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <p>
                  {{ response3 }}
                </p>
              </v-card-text>
            </v-card>
          </div>
        </div>

        <div class="chat-bot pa-4" v-if="response3">
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
                <p>Thank you so much! We're creating an ideal candidate profile for you:</p>
                <br>

                <div class="mb-4">
                  <p class="text-sm-h6"> Here is the Ideal Candidate profile for a <span style="text-transform: capitalize; font-weight: bold;"> {{ store.ICPProfile.job_title }}</span> </p>
                  <br>
                  <p> <b>Job / Tools:</b> <span v-for="(item, index) in store.ICPProfile.jobToolsSkills">{{ index == store.ICPProfile.desirableSkills.length - 1 ? item : item.toString().concat(', ') }}</span> </p>
                  <p> <b>Desirable Soft Skills: </b> <span v-for="(item, index) in store.ICPProfile.desirableSkills">{{ index == store.ICPProfile.desirableSkills.length - 1 ? item : item.toString().concat(', ') }}</span> </p>
                  <p> <b>Undesirable Soft Skills: </b> <span v-for="(item, index) in store.ICPProfile.undesirableSkills">{{ index == store.ICPProfile.undesirableSkills.length - 1 ? item : item.toString().concat(', ') }}</span> </p>
                </div>

                .
                .
                .

                <p class="mb-4">Please provide an email address so we can email the details to you!</p>
              </v-card-text>
            </v-card>
          </div>
        </div>

        <div class="chat-bot pa-4 d-flex" v-if="response4">
          <div class="response">
            <v-card
              title="You"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <p>
                  {{ response4 }}
                </p>
              </v-card-text>
            </v-card>
          </div>
        </div>


        <div class="chat-bot pa-4" v-if="response4">
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
                <p class="mb-2">Thank you so much! We will be sending it to you shortly.</p>
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
  import {useAppStore} from "@/stores/app";
  const store = useAppStore();

  const jobSearchText = ref('');
  const chatContainer = ref(false);
  const searchButton = ref(false);
  const newSearchButton = ref(true);
  const inputText = ref('');
  const inputChat = ref(true);

  const jobSkills = ref([] as any);
  const desirableSkills = ref([] as any);
  const undesirableSkills = ref([] as any);

  const response1 = ref('');
  const response2 = ref('');
  const response3 = ref('');
  const response4 = ref('');

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

  const addJobTools = (event: Event) => {
    const element = event.currentTarget as Element;
    jobSkills.value.push(element.textContent || '');
    inputText.value = jobSkills.value.join(", ");
    inputChat.value = false;
  }

  const addDesirableSkills = (event: Event) => {
    const element = event.currentTarget as Element;
    desirableSkills.value.push(element.textContent || '');
    inputText.value = desirableSkills.value.join(", ");
    inputChat.value = false;
  }

  const addUndesirableSkills = (event: Event) => {
    const element = event.currentTarget as Element;
    undesirableSkills.value.push(element.textContent || '');
    inputText.value = undesirableSkills.value.join(", ");
    inputChat.value = false;
  }

  const enterInput = () => {
    if(jobSkills.value.length > 0 && response1.value == ''){
      response1.value = jobSkills.value.join(", ");
      store.addSkills(jobSkills.value);
    }else if(desirableSkills.value.length > 0 && response2.value == ''){
      response2.value = desirableSkills.value.join(", ");
      store.addDesirableSkills(desirableSkills.value);
    }else if(undesirableSkills.value.length > 0 && response3.value == ''){
      response3.value = undesirableSkills.value.join(", ");
      store.addUndesirableSkills(undesirableSkills.value);
    }else if(response1.value && response2.value && response3.value && response4.value == ''){
      response4.value = inputText.value;
    }

    inputText.value = '';
    inputChat.value = true;
  }

  watch(inputText, () => {
    if(inputText.value != '') {
      inputChat.value = false;
    }
  })


  const submitJobTitle = () => {
    store.sendJobTitle(jobSearchText.value);
    chatContainer.value = !chatContainer.value;
  }

</script>

<style scoped lang="scss">
 h4 {
   color: #4F7A94;
 }

 .chat {
   height: 500px;
   border-radius: 5px;
   position: relative;

   .chat-bot-enter {
     position: absolute;
     padding: 1rem;
     bottom: 0;
     width: 100%;
   }

   .conversation-container {
     border: none;
     overflow: scroll;
     height: 400px;
     background-color: #E8EDF5;
   }

   .response {
     max-width: fit-content;
     margin-left: auto;
   }
 }

 .chat-bot{
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

 #WebChatContainer {
   width: 100%;
   height: 500px;
 }
</style>


