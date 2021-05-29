<template>
  <div>
    <navbar />
    <FloatingButton />
    <v-container fluid class="pt-10">
       <v-row v-if="!devs[0]">
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
      <v-row v-else>
        <v-col v-for="item in devs" :key="item.name" cols="6">
          <v-card
            elevation="24"
            outlined
            class="mx-auto"
            max-width="500px"
            dark
          >
            <v-card-title>
              {{ item.name }}
            </v-card-title>

            <v-card-subtitle>
              <v-row>
                <div class="col-10">
                  <strong>{{ item.country }}</strong>
                </div>
                <div class="col-2">
                  <strong>{{ item.creation_year.low }}</strong>
                </div>
              </v-row>
            </v-card-subtitle>

            <v-spacer></v-spacer>

            <v-card-actions>
              <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="ma-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="showGamesByDev(item.name)"
                  >
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="game in gamesByDev"
                    :key="game.title"
                  >
                    <router-link :to="{ name:'Game', params: {title: game.title}}" style="text-decoration: none; color: inherit;">
                      <v-list-item-title>{{ game.title }}</v-list-item-title>
                    </router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import FloatingButton from "../components/FloatingButton";
import { mapState } from "vuex";
export default {
  data: () => ({}),
  name: "DevsComponent",
  components: {
    Navbar,
    FloatingButton,
  },
  mounted() {},
  computed: {
    ...mapState({
      devs: (state) => state.devs,
      gamesByDev: (state) => state.gamesByDev
    }),
  },
  methods: {
    showGamesByDev(name) {
      this.$store.dispatch('showGamesByDev', name)
    },
  },
};
</script>