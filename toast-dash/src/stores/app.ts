// Utilities
import { defineStore } from 'pinia'
import axios from "axios";

export const useAppStore = defineStore('app', {
  state: () => ({
    //
    jobTools: {
      data: {
        data: {
          question: '',
          suggested_tools: [],
        }
      }
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
    topSkills: [
      "Ambitious Benevolence",
      "Analytical",
      "Analyzes Pitfalls",
      "Animals",
      "Artistic",
      "Assertive",
      "Authoritarian",
      "Authoritative",
      "Authoritative Collaboration",
      "Benevolent Sacrifice",
    ],
    ICPProfile: {
      user_id: '',
      job_title: '',
      jobToolsSkills: [] as any,
      desirableSkills: [] as any,
      undesirableSkills: [] as any
    }
  }),
  actions: {
    async sendJobTitle(jobTitle: any){
      this.ICPProfile.user_id = '12345';
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
    addSkills(skills: []) {
      if(this.ICPProfile.jobToolsSkills.length == 0) {
        this.ICPProfile.jobToolsSkills = skills;
      }else {
        this.ICPProfile.jobToolsSkills = [this.ICPProfile.jobToolsSkills, ...skills]
      }
    },
    async addDesirableSkills(skills: []){
      try {
        this.topSkillsResponse = await axios.post('\n' +
          'https://talent-tua-api-endpoints.vercel.app/api/topSkills', {
          "user_id": this.ICPProfile.user_id,
          "topSkills": this.topSkills
        })

        if(this.ICPProfile.desirableSkills.length == 0) {
          this.ICPProfile.desirableSkills = skills;
        }else {
          this.ICPProfile.desirableSkills = [this.ICPProfile.desirableSkills, ...skills]
        }
      }
      catch (error) {
        console.log(error)
      }
    },
    addUndesirableSkills(skills: []){
      if(this.ICPProfile.undesirableSkills.length == 0) {
        this.ICPProfile.undesirableSkills = skills;
      }else {
        this.ICPProfile.undesirableSkills = [this.ICPProfile.undesirableSkills, ...skills]
      }

      console.log(this.ICPProfile)
    }

  }

})
