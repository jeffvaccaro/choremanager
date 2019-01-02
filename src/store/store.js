import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        state_familyName: '',
        state_familyId: '',
        state_memberName: '',
        state_assignedChoresArr: []
    },
    getters: {
        getFamilyName: state => {
            return state.state_familyName
        },
        getFamilyId: state => {
            return state.state_familyId
        },
        getMemberName: state => {
            return state.state_memberName
        },
        getAssignedChoresArr: state => {
            return state.state_assignedChoresArr
        }
    },
    mutations: {
        SET_FAMILY_NAME: (state, familyName) => {
            state.state_familyName = familyName
          },
        SET_FAMILY_ID: (state, familyId) => {
            state.state_familyId = familyId
        },
        SET_MEMBER_NAME: (state, memberName) => {
            state.state_memberName = memberName
        },
        SET_ASSIGNED_CHORES_ARR: (state, arr) => {
            state.state_assignedChoresArr.push(arr)
        }
    },
    actions: {
        setFamilyName: (context, familyName) => {
          context.commit("SET_FAMILY_NAME", familyName)
        },
        setFamilyId: (context, familyId) => {
            context.commit("SET_FAMILY_ID", familyId)
        },
        setMemberName: (context, memberName) => {
            context.commit("SET_MEMBER_NAME", memberName)
        },
        setAssignedChoresArr: (context, arr) => {
            context.commit("SET_ASSIGNED_CHORES_ARR", arr)
        }
      }
})
