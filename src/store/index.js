import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

//load Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      games: []
    },
    mutations: {
        async getGames(state){
            state.games = []

            await axios.get('http://localhost:3000/game')
                .then((result) => {
                    result.data.forEach(element => {
                        state.games.push(element)
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        async deleteGame(state,title){
            for (let i = 0; i < state.games.length; i++) {
                state.games = state.games.filter(item => {
                    return item.title !== title
                })
            }
            // state.games = state.games.filter(item => {
            //     console.log(item);
            // })
        }

    },
    actions: {        
        getGames: context => {
            context.commit('getGames')
        },
        async deleteGame({commit}, title){
            commit('deleteGame',title)
            await axios.delete(`http://localhost:3000/game/${title}`)
        }

    },
  })
  