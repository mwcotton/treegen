<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <h1 style=font-size:50px><span class="special-color">Tree</span>Gen</h1>
      </div>
      <v-card>
        <v-card-title class="headline">
          Modeling fractals with L-systems
        </v-card-title>
        <v-card-text>
          <p>Specify details of the L-System below.</p>
        <v-card-text>
          <v-slider
              v-model="iters"
              color="orange"
              label="Number or Iterations"
              min="1"
              max="10"
              thumb-label
            ></v-slider>
          <v-slider
              v-model="ang"
              color="orange"
              label="Branching Anlge (degrees)"
              min="0"
              max="360"
              thumb-label
            ></v-slider>
            <v-slider
              v-model="branLen2"
              color="orange"
              label="Branching Length"
              min="0"
              max="10"
              step=0.1
              thumb-label
            ></v-slider>
          <v-select
            v-model="lengthStoc"
            :items="lengthStochastic"
            label="Length Stochasticity"
            required
          ></v-select>
          <v-select
            v-model="initState"
            :items="initStates"
            label="Initial State"
            required
          ></v-select>
          <v-select
            v-model="xRule"
            :items="xRules"
            label="Rule for X"
            required
          ></v-select>
                    <v-select
            v-model="fRule"
            :items="fRules"
            label="Rule for F"
            required
          ></v-select>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
            color="orange"
            text
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '../components/Logo.vue'
import VuetifyLogo from '../components/VuetifyLogo.vue'

export default {
  data(){
    return{
      lengthStochastic: ["Deterministic", "50% Variable", "10% Variable"],
      lengthStoc: "Deterministic",
      branLen: "2",
      branLen2: 1,
      iters: 1,
      ang: 0
    }
  },
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>

<style scoped>
h1 .special-color { 
  color:greenyellow; 
} 
</style>
