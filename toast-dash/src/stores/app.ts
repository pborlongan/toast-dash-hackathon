// Utilities
import { defineStore } from 'pinia'
import axios from "axios";

export const useAppStore = defineStore('app', {
  state: () => ({
    jobTools: {
      data: {
        data: {
          question: '',
          suggested_tools: [
            {
              name: '',
              isSelected: false
            }
          ],
        }
      }
    },
    toolsTechsResponse: {
      data: {
        data: {
          traitMatrix: [
            {
              Dynamic_Balanced: '',
              Gentle_Balanced: '',
              Mastery: '',
              Novice: '',
              activeButton1: 0,
              activeButton2: 0,
              trait1: {
                name: '',
                description: '',
                ranking: '',
              },
              trait2: {
                name: '',
                description: '',
                ranking: '',
              }
            }
          ],
          question: "",
        },
      }
    },
    traitsMatrixResponse: {
      data:{
      data: {
        message: '',
        topSkills: [
          {
            trait: '',
            rating: '',
            importance: '',
            frequency:'',
            isSelected: false
          }
        ],
        question: ''
      }}
    },
    ICPResponse: {
      data: {
        data: {
          idealCandidateProfile: {
            HatsCenter: [],
            jobTitle: "",
            screeningQuestions: [],
            toolsTechnologies: [],
            topSkills: [],
            traitsMatrix: [],
            undesirableSkills: [],
            userId: "",
          },
          message: "",
          pdfLink: "",
          question: "",
        }
      }
    },
    topSkillsResponse: {
      data: {
        data: {
          undesirableSkills: [] as string[],
          message: '',
          question: '',
        }
      }
    },
    ICPProfile: {
      user_id: "12345",
      job_title: '',

      jobToolsSkills: [] as string[],
      traitMatrix: [] as object[],
      desirableSkills: [] as string[],
      undesirableSkills: [] as string[]
    }
  }),
  actions: {
    async sendJobTitle(jobTitle: any){
      this.ICPProfile.job_title = jobTitle;
      try {
        this.jobTools = await axios.post('https://talent-tua-api-endpoints.vercel.app/api/jobTitle', {
          "user_id": "12345",
          "job_title": jobTitle
        })
      }
      catch (error) {
        console.log(error)
      }
    },
    async sendToolsTechs(toolsTechs: []) {
      try {
        this.toolsTechsResponse = await axios.post('\n' +
          'https://talent-tua-api-endpoints.vercel.app/api/toolsAndTechs', {
          "user_id": this.ICPProfile.user_id,
          "tools_techs": toolsTechs
        })

        this.ICPProfile.traitMatrix = this.toolsTechsResponse.data.data.traitMatrix;
      } catch (error){
        console.log(error)
      }
    },
    async addDesirableSkills(skills: []){
      try {
        this.topSkillsResponse = await axios.post('\n' +
          'https://talent-tua-api-endpoints.vercel.app/api/topSkills', {
          "user_id": this.ICPProfile.user_id,
          "topSkills": skills
        })
      }
      catch (error) {
        console.log(error)
      }
    },
    async sendTraitsMatrix(){
      try {
        this.traitsMatrixResponse = await axios.post('\n' +
          'https://talent-tua-api-endpoints.vercel.app/api/traitMatrix', {
          "user_id": this.ICPProfile.user_id,
          "traitMatrix": this.ICPProfile.traitMatrix
        })
      }
      catch (error) {
        console.log(error)
      }
    },
    async addUndesirableSkills(skills: []){
      try {
        this.ICPResponse = await axios.post('\n' +
          'https://talent-tua-api-endpoints.vercel.app/api/undesirableSkills', {
          "user_id": this.ICPProfile.user_id,
          "undesirableSkills": skills
        })
        console.log(this.ICPResponse)
      }
      catch (error) {
        console.log(error)
      }
    },
  }

})
