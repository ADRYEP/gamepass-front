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
      devsNames: [],
      genres: [],
      genreNames: [],
      gamesByDev: [],
      allNodes: []
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
        async getDevs(state){
            state.devs = []
            state.devsNames = []

            await axios.get('http://localhost:3000/developer')
                .then((result) => {
                    result.data.forEach(element => {
                        state.devs.push(element)
                        state.devsNames.push(element.name)
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        async getGenres(state){
            state.genres = []
            state.genresNames = []

            await axios.get('http://localhost:3000/genre')
                .then((result) => {
                    result.data.forEach(element => {
                        state.genres.push(element)
                        state.genreNames.push(element.name)
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
                })
        },
        ADD_GAME(state,newGame){
            let games = state.games.concat(newGame)
            state.games = games
        },
        async showGamesByDev(state, name){
            state.gamesByDev = []

            axios.get(`http://localhost:3000/developer/game/${name}`)
                .then((result) => {
                    result.data.forEach(element => {
                        state.gamesByDev.push(element)
                    })
                })
        },
        async getAllGraph(state){
            state.allNodes = []

            await axios.get('http://localhost:3000/game/all/Graph')
                .then((result) => {
                    result.data.forEach(element => {
                        state.allNodes.push(element)
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        },

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
        showGamesByDev({commit},name){
            commit('showGamesByDev', name)
        },
        async createGame({commit}, newGameData){

            let newGame = {
                title: newGameData.title,
                install_size: newGameData.install_size,
                released: newGameData.released,
                cover_image: newGameData.cover_image,
            }

            await axios.post(`http://localhost:3000/game`,newGame)
            commit('ADD_GAME',newGame)

            let addDev = {
                titleGame: newGameData.title,
                nameDev: newGameData.developer
            }
            await axios.post(`http://localhost:3000/game/addDev`,addDev)

            let addGenre = {
                titleGame: newGameData.title,
                nameGenre: newGameData.genre
            }
            await axios.post(`http://localhost:3000/game/addGenre`,addGenre)

        },
        getAllGraph: context => {
            context.commit('getAllGraph')
        },  

    },
  })
  