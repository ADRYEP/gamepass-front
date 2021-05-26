import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'
import router from '@/router'

//load Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      games: [],
      current_game: [],
      devs: [],
      genres: []
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
            console.log(state.games);
        },
        async getDevs(state){

            await axios.get('http://localhost:3000/developer')
                .then((result) => {
                    result.data.forEach(element => {
                        state.devs.push(element)
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
            console.log(state.devs);
        },
        async getGenres(state){

            await axios.get('http://localhost:3000/genre')
                .then((result) => {
                    result.data.forEach(element => {
                        state.genres.push(element)
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
        },
        async getGameByTitle(state){
            let title = router.currentRoute.params.title
            state.current_game = []

            await axios.get(`http://localhost:3000/game/${title}`)
            .then((result) => {
                result.data.forEach(element => {
                    state.current_game.push(element)
                })
                console.log(state.current_game);
            })
        }

    },
    actions: {        
        getGames: context => {
            context.commit('getGames')
        },        
        getDevs: context => {
            context.commit('getDevs')
        },        
        getGenres: context => {
            context.commit('getGenres')
        },
        getGameByTitle: context => {
            context.commit('getGameByTitle')
        },
        async deleteGame({commit}, title){
            commit('deleteGame',title)
            await axios.delete(`http://localhost:3000/game/${title}`)
        },
        async createGame({commit}, payload){
            commit('createGame',payload)
            console.log(payload);
        }

    },
  })
  