<template>
  <div>
    <Navbar />    
    <v-col
      cols="12"
      sm="6"
      block
    >
      <v-text-field
        v-model="cypher"
        filled
        single-line
        fixed
        color="grey darken-4"
        @keyup.enter="draw()"
      ></v-text-field>
    </v-col>

    <v-divider></v-divider>

    <div @onload="draw()">
      <div id="viz"></div>
    </div>
    <!-- <d3-network
      ref="net"
      :net-nodes="allNodes"
      :options="options"
    /> -->
  </div>
</template>

    <!-- FIXME: load from dist -->
    <script type="text/javascript" src="../dist/neovis.js"></script>
<script>
// import NeoVis from 'neovis.js';
import Navbar from "../components/Navbar";
import { mapState } from "vuex";
export default {
  data: () => ({
    cypher: 'MATCH (n)-[r]-(d) RETURN *',
    viz: ''
  }),
  name: "GraphComponent",
  components: {
    Navbar,
  },
  mounted(){
    this.draw()
  },
  methods: {
    draw() {
      let config = {
        container_id: "viz",
        server_url: "bolt://localhost:7687",
        server_user: "neo4j",
        server_password: "1234",
        labels: {
          Game: {
            caption: "title",
            community: "community",
            image: "https://static.thenounproject.com/png/197951-200.png",

            font: {
              size: 16
            }
          },
          Dev: {
            caption: "name",
            community: "community",
            image: "data:image/jpeg;base64,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",

            font: {
              size: 16
            }
          },
          Genre: {
            caption: "name",
            community: "community",
            image: "data:image/png;base64,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",

            font: {
              size: 16
            }
          },
        },
        relationships: {
          DEVELOPED_BY: {
            thickness: "weight",
            community: "community",
            caption: false,
            color: "#ffffff",

            font: {
              size: 16
            }
          },
          TYPE_OF_GAME: {
            thickness: "weight",
            community: "community",
            caption: false,

            font: {
              size: 16
            }
          },
        },
        initial_cypher: this.cypher,
        arrows: true,
      };

      this.viz = new window.NeoVis.default(config);
      this.viz.render();
    },
  },
  
}
</script>
<style type="text/css">
#viz {
  padding-top: 2rem;
  width: 100%;
  height: 580px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  font: 22pt arial;
}
</style> 
