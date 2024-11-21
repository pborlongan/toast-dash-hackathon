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
              name: ''
            }
          ],
        }
      }
    },
    undesirableSkillsResponse: {
      data: {
        data:{

        }
      }
    },
    toolsTechsResponse: {
      data: {
        data: {
          traitMatrix: [
            {
              name: {},
              description: {},
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
        topSkills: [],
        question: ''
      }}
    },
    topSkillsResponse: {
      data: {
        data: {
          undesirableSkills: [],
          message: '',
          question: '',
        }
      }
    },
    ICPProfile: {
      user_id: "12345",
      job_title: '',

      jobToolsSkills: [] as any,
      traitMatrix: [] as any,
      desirableSkills: [] as any,
      undesirableSkills: [] as any
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
        if(this.ICPProfile.jobToolsSkills.length == 0) {
          this.ICPProfile.jobToolsSkills = toolsTechs;
        }else {
          this.ICPProfile.jobToolsSkills = [this.ICPProfile.jobToolsSkills, ...toolsTechs]
        }
        this.toolsTechsResponse = await axios.post('\n' +
          'https://talent-tua-api-endpoints.vercel.app/api/toolsAndTechs', {
          "user_id": this.ICPProfile.user_id,
          "tools_techs": toolsTechs
        })
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
        console.log(this.topSkillsResponse)
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
        this.undesirableSkillsResponse = await axios.post('\n' +
          'https://talent-tua-api-endpoints.vercel.app/api/undesirableSkills', {
          "user_id": this.ICPProfile.user_id,
          "undesirableSkills": skills
        })
        console.log(this.undesirableSkillsResponse)
      }
      catch (error) {
        console.log(error)
      }
    },
  }

})
