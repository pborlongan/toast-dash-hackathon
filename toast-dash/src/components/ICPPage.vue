<template>
  <v-container class="my-4 mx-auto h-100 d-sm-flex flex-column">
    <div>
      <h2 class="font-weight-medium">Find your next great hire with TalentTua</h2>
      <h4 class="font-weight-medium mt-3">Our assistant will help you define job roles, input required skills, and create the Ideal Candidate Profile for your next hire.</h4>
    </div>

    <div class="job-search-container w-100 my-10">
      <v-text-field color="primary" label="Which job role are you hiring for?" variant="outlined" v-model="jobSearchText">
        <template #append>
          <v-btn class="mb-1 mr-1" outlined color="indigo" @click="submitJobTitle" :disabled="searchButton"> Search </v-btn>
          <v-btn class="mb-1" outlined color="red" @click="clearChat" :disabled="newSearchButton"> Clear Search </v-btn>
        </template>
      </v-text-field>
    </div>
    <div class="chat" v-if="chatContainer">
      <div class="conversation-container" id="conversation-container">

        <div class="chat-bot pa-4">
          <div class="assistant">
            <v-avatar color="info" size="x-large">
              <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
            <v-card
              title="TalentTua Assistant"
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
                <div class="d-flex flex-wrap ga-3 w-100">
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
              title="TalentTua Assistant"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <p>{{ store.toolsTechsResponse.data.data.question }} Rate each one from 1-4.</p>
              </v-card-text>
              <v-expansion-panels variant="accordion" class="pa-4" multiple>
                <v-expansion-panel
                  v-for="item in store.toolsTechsResponse.data.data.traitMatrix"
                >
                  <v-expansion-panel-title>{{ item.Mastery }} </v-expansion-panel-title>
                  <v-expansion-panel-text class="border-t-md d-flex">
                    <div class="d-flex flex-col">
                      <p class="my-3 mr-3"> {{ item.trait1.name }} </p>
                      <br />
                      <div class="d-flex ga-2">
                        <v-btn v-for="(number, index) in 4" :key="index" @click="addRange(item.Mastery,  'one', item.trait1, index+1)"> {{ number }}</v-btn>
                      </div>
                    </div>

                    <div class="d-flex flex-col">
                      <p class="my-3 mr-3"> {{ item.trait2.name }} </p>
                      <br />
                      <div class="d-flex ga-2">
                        <v-btn v-for="(number, index) in 4" :key="index" @click="addRange(item.Mastery, 'two', item.trait2, index+1)"> {{ number }}</v-btn>
                      </div>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-card-text>
                <p>Are you done rating all of the traits?</p>
              </v-card-text>
              <v-card-actions>
                <div class="d-flex flex-wrap ga-3 w-100">
                  <v-btn variant="tonal" @click="sendTraitsMatrix">
                    Yes
                  </v-btn>
                  <v-btn variant="tonal" @click="sendTraitsMatrix">
                    No
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
              title="TalentTua Assistant"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <p>{{store.traitsMatrixResponse.data.data.message}}</p>
                <p>{{ store.traitsMatrixResponse.data.data.question }}</p>
              </v-card-text>
              <v-card-actions>
                <div class="d-flex flex-wrap ga-3">
                  <v-btn variant="tonal" v-for="(item) in store.traitsMatrixResponse.data.data.topSkills" @click="addDesirableSkills">
                    {{ item.trait }}
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
              title="TalentTua Assistant"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <p>{{store.topSkillsResponse.data.data.message}}</p>
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
              title="TalentTua Assistant"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <h4 class="text-sm-h6">Here's your Ideal Candidate Profile!</h4>
                <b>Job Title: </b><span style="text-transform: capitalize">{{ store.ICPResponse.data.data.idealCandidateProfile.jobTitle }}</span>
                <br/>
                <b>Tools And Technologies for Day 1: </b><span v-for="(item, index) in store.ICPResponse.data.data.idealCandidateProfile.toolsTechnologies" style="text-transform: capitalize">{{ store.ICPResponse.data.data.idealCandidateProfile.toolsTechnologies.length == index + 1 ? (item as any).concat('') : (item as any).concat(', ')  }}</span>
                <br />
                <b>Your Top Desired Soft Skills: </b><span v-for="(item, index) in store.ICPResponse.data.data.idealCandidateProfile.topSkills" style="text-transform: capitalize">{{ store.ICPResponse.data.data.idealCandidateProfile.topSkills.length == index + 1 ? (item as any).concat('') : (item as any).concat(', ') }}</span>
                <br />
                <b>Your Top Undesired Soft Skills: </b><span v-for="(item, index) in store.ICPResponse.data.data.idealCandidateProfile.undesirableSkills" style="text-transform: capitalize">{{ store.ICPResponse.data.data.idealCandidateProfile.undesirableSkills.length == index + 1 ? (item as any).concat('') : (item as any).concat(', ')  }}</span>
                <br />
                <b v-if="store.ICPResponse.data.data.pdfLink">Want to learn more about your Ideal Profile Candidate? Download your generated PDF here: <a :href="store.ICPResponse.data.data.pdfLink">PDF Link</a></b>
                <p class="my-4">
                  {{store.ICPResponse.data.data.question}}
                </p>
              </v-card-text>

              <v-card-actions>
                <div class="d-flex flex-wrap ga-3 w-100">
                  <v-btn variant="tonal" @click="sendICPResponse">
                    Yes
                  </v-btn>
                  <v-btn variant="tonal" @click="sendICPResponse">
                    No
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </div>
        </div>

        <div class="chat-bot pa-4 d-flex" v-if="response5">
          <div class="response">
            <v-card
              title="You"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <p>
                  {{ response5 }}
                </p>
              </v-card-text>
            </v-card>
          </div>
        </div>

        <div class="chat-bot pa-4" v-if="response5">
          <div class="assistant">
            <v-avatar color="info" size="x-large">
              <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
            <v-card
              title="TalentTua Assistant"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <p class="my-4">Thank you! Please provide your email address if you would like the ICP emailed and if you would like to use the TalentTua process to help match candidates to the profile.</p>
              </v-card-text>
            </v-card>
          </div>
        </div>

        <div class="chat-bot pa-4 d-flex" v-if="response6">
          <div class="response">
            <v-card
              title="You"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <p>
                  {{ response6 }}
                </p>
              </v-card-text>
            </v-card>
          </div>
        </div>

        <div class="chat-bot pa-4" v-if="response6">
          <div class="assistant">
            <v-avatar color="info" size="x-large">
              <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
            <v-card
              title="TalentTua Assistant"
              subtitle="New"
              variant="tonal"
            >
              <v-card-text>
                <p class="my-6">Thank you! You are now subscribed to our newsletter.</p>
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
  const response5 = ref('');
  const response6 = ref('');

  const clearChat = () => {
    jobSearchText.value = '';
    searchButton.value = false;
    newSearchButton.value = true;
    chatContainer.value = false;
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
    if (jobSkills.value.length > 0 && response1.value == '') {
      response1.value = jobSkills.value.join(", ");
      store.sendToolsTechs(jobSkills.value);
    } else if (desirableSkills.value.length > 0 && response3.value == '') {
      response3.value = desirableSkills.value.join(", ");
      store.addDesirableSkills(desirableSkills.value);
    } else if (undesirableSkills.value.length > 0 && response4.value == '') {
      response4.value = undesirableSkills.value.join(", ")
      store.addUndesirableSkills(undesirableSkills.value);
    } else if (response1.value && response2.value && response3.value && response4.value && response5.value && response6.value == '') {
      response6.value = inputText.value;
    }

    inputText.value = '';
    inputChat.value = true;
    scrollToBottom()
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

  const scrollToBottom = () => {
    const element = document.getElementById('conversation-container');
    if(element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  const addRange = (mastery: any, traitNum: any, trait: any, ranking: any) => {
    const newTraitRanking = {
      "name": trait.name,
      "description": trait.description,
      "ranking": ranking,
    }
    if(store.ICPProfile.traitMatrix.find((obj: any) => obj.Mastery === mastery)) {
      const target = store.ICPProfile.traitMatrix.find((obj: any) => obj.Mastery === mastery);
      switch (trait) {
        case "one":
          target.trait1 = newTraitRanking;
          break;
        case "two":
          target.trait2 = newTraitRanking;
          break;
        default:
          break;
      }
    }
  }

  const sendTraitsMatrix = (event: Event) => {
    const element = event.currentTarget as Element;
    const text = element.getElementsByClassName('v-btn__content')[0].textContent;
    if(text){
      if(text.trim() == 'Yes'){
        store.sendTraitsMatrix()
        response2.value = text || '';
      }
    }
  }

  const sendICPResponse = (event: Event) => {
    const element = event.currentTarget as Element;
    const text = element.getElementsByClassName('v-btn__content')[0].textContent;
    if(text){
      if(text.trim() == 'Yes'){
        response5.value = text || '';
      }
    }
  }



</script>

<style scoped lang="scss">
.btn-active {
  background-color: #0d47a1;
  color: white;
}
 h4 {
   color: #4F7A94;
 }

 .chat {
   height: 500px;
   border-radius: 5px;
   position: relative;

   .chat-bot-enter {
     position: absolute;
     bottom: 0;
     width: 100%;

     @media screen and (max-width: 1023px){
       bottom: -28px;
       :deep(.v-input) {
          display: flex;
          flex-direction: column;
       }
       :deep(.v-input__append) {
         margin-left: 0;
         justify-content: center;
         .v-btn {
           margin-top: 1rem;
         }
       }
     }

     :deep(.v-input__details) {
       display: none;
     }
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

 .v-card-actions {
   :deep(.v-btn){
     height: fit-content;
     padding: 10px;
   }
   :deep(.v-btn__content) {
     white-space: break-spaces;
     text-align: left;
   }
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
   @media screen and (max-width: 1024px) {
     flex-direction: column;
     row-gap: 10px;
   }
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

 .job-search-container {
  @media screen and (max-width: 1023px) {
    .v-input {
      display: flex;
      flex-direction: column;
    }
    :deep(.v-input__append){
      margin-top: 1rem;
      margin-left: 0;
      justify-content: center;
    }
    :deep(.v-input__details) {
      display: none;
    }
  }
 }
</style>


