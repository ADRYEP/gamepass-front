<template>
  <div>
    <navbar />
    <FloatingButton />
    <v-container fluid class="pt-10">
      <v-row v-if="!games[0]">
        <v-col>
          <v-alert
            color="red"
            dense
            elevation="11"
            text
            type="error"
          >
            No hay nodos creados! Asegúrate de haber iniciado la base de datos
          </v-alert>
        </v-col>
      </v-row>
      <v-row dense v-else>
        <v-col v-for="item in games" :key="item.title">
          <v-card elevation="24" outlined class="mx-auto" max-width="344px" dark>
            
            <router-link :to="{ name:'Game', params: {title: item.title}}">
              <v-img
                v-if="item.cover_image"
                :src="item.cover_image"
                width="100%"
                height="450px"
              ></v-img>
              
              <v-img
                  v-else
                  src="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                  width="344px"
                  height="450px"
              ></v-img>
            </router-link>

            <v-card-title>
              {{ item.title }}
            </v-card-title>

            <v-card-subtitle v-if="item.released.low">
              {{ item.released.low }}
            </v-card-subtitle>
            <v-card-subtitle v-else>
              {{ item.released }}
            </v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon @click="deleteGame(item.title)"
                ><v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="grey" v-bind="attrs" v-on="on"> mdi-delete </v-icon>
                  </template>
                  <span>Eliminar</span>
                </v-tooltip>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import FloatingButton from "../components/FloatingButton"
import { mapState } from "vuex";
export default {
  data: () => ({
  }),
  name: "Games",
  components: {
    Navbar,
    FloatingButton
  },
  mounted() {
    this.$store.dispatch("getGames");
  },
  computed: {
    ...mapState({
      games: (state) => state.games,
    }),
  },
  methods: {
    deleteGame(title){
      this.$store.dispatch('deleteGame', title)
    }
  }
};
</script>