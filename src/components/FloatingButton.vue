<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" fab bottom right fixed>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add a video game</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field color="grey darken-2" label="Name*" v-model="newGameData.title" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field color="grey darken-2" label="Image link" v-model="newGameData.cover_image" type="text"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  color="grey darken-2"
                  label="Creation year*"
                  type="text"
                  v-model="newGameData.released"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  color="grey darken-2"
                  label="Install Size (ADD GB after the numbers)*"
                  type="text"
                  v-model="newGameData.install_size"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  color="grey darken-2"
                  :items="devs"
                  label="Developer*"
                  v-model="newGameData.developer"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  color="grey darken-2"
                  v-bind:items="genres"
                  label="Genre*"
                  v-model="newGameData.genre"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-2" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="grey darken-2" text @click="dialog = false; createGame()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "FloatingButton",
  data: () => ({
    dialog: false,
    newGameData: {
      'cover_image': ''
    }
  }),
  mounted() {
    this.$store.dispatch("getDevs");
    this.$store.dispatch("getGenres");
  },
  computed: {
    ...mapState({
      devs: (state) => state.devsNames,
      genres: (state) => state.genreNames,
    }),
  },
  methods: {    
    createGame(){
      this.$store.dispatch('createGame', this.newGameData)
    }
  }
};
</script>

<style>
</style>