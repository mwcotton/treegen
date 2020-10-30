<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <h1 style=font-size:50px><span class="special-color">Tree</span>Gen</h1>
      </div>
      <v-card class="rounded-card">
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
          <v-select
            v-model="initState"
            :items="initStates"
            label="Initial State"
            required
          ></v-select>
          <v-select
            v-model="choiceRule"
            :items="choiceRules"
            label="System Rules"
            required
          ></v-select>
          <v-select
            v-model="xRule"
            :items="xRules"
            label="Rule for X"
            :disabled="(choiceRule=='Stochastic')"
            :hint="[(choiceRule=='Stochastic') ? 'No rule choice for stochastic system. Rules considered with equal probability.' : '' ]"
            persistent-hint
            required
          ></v-select>
          <v-select
            v-model="fRule"
            :items="fRules"
            label="Rule for F"
            :disabled="(choiceRule=='Stochastic')"
            :hint="[(choiceRule=='Stochastic') ? 'No rule choice for stochastic system. Rules considered with equal probability.' : '' ]"
            persistent-hint
            required
          ></v-select>
          <br>
          <v-select
            v-model="branchStochastic"
            :items="branchStochastics"
            label="Branch Stochasticity"
            required
          ></v-select>
          <v-slider
            v-model="branchAng"
            color="orange"
            label="Branching Angle (°)"
            min="0"
            max="360"
            thumb-label
          ></v-slider>
          <v-select
            v-model="lengthStochastic"
            :items="lengthStochastics"
            label="Length Stochasticity"
            required
          ></v-select>
          <v-slider
            v-model="branchLen"
            color="orange"
            label="Branch Length"
            min="0"
            max="10"
            step=0.1
            thumb-label
          ></v-slider>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip>
              <template v-slot:activator="{ on, attrs }">
                <v-btn 
                  @click="resetForm"
                  color="orange"
                  v-on="on"
                  v-bind="attrs"
                  text>
                  Reset
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <!-- <v-btn
            color="orange"
            text
            @click="submit"
          >
            Submit
          </v-btn> -->
        </v-card-actions>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <h1 style=font-size:50px>Click to draw <span class="special-color">trees!</span></h1>
      </div>
      <v-card class="rounded-card">
        <DrawingBoard
        :lengthStochastic="lengthStochastic"
        :branchStochastic="branchStochastic"
        :branchLen="branchLen"
        :iters="iters"
        :branchAng="branchAng"
        :initState="initState"
        :choiceRule="choiceRule"
        :fRule="fRule"
        :xRule="xRule"
        ></DrawingBoard>
    </v-card>
    </v-col>
  </v-row>
</template>

<script>
import vueP5 from 'vue-p5'
import Logo from '../components/Logo.vue'
import VuetifyLogo from '../components/VuetifyLogo.vue'
 import DrawingBoard from '../components/DrawingBoard.vue'

export default {
  data(){
    return{
      lengthStochastics: ["Deterministic", "50% Variable", "10% Variable"],
      lengthStochastic: "Deterministic",
      branchStochastics: ["Deterministic", "1% Variable", "0.1% Variable"],
      branchStochastic: "Deterministic",
      branchLen: 2,
      iters: 3,
      branchAng: 20,
      initStates: ["X", "F"],
      initState: "X",
      choiceRules: ["Deterministic", "Stochastic"],
      choiceRule: "Deterministic",
      fRules: ["FF", "F[+F]F[-F]F", "F[+F]F[-F][F]", "FF-[-F+F+F]+[+F-F-F]", "F[+F]F", "F[-F]F"],
      fRule: "FF",
      xRules: ["F[+X]F[-X]+X", "F[+X][-X]FX", "F-[[X]+X]+F[+FX]-X", "F-[[X]+X]+F[+FX]-X"],
      xRule: "F[+X]F[-X]+X"
    }
  },
  components: {
    DrawingBoard
  },
  methods: {
    resetForm () {
      this.lengthStochastic = "Deterministic"
      this.branchStochastic = "Deterministic",
      this.branchLen = 2,
      this.iters=  3,
      this.branchAng = 20,
      this.initState = "X",
      this.choiceRule = "Deterministic",
      this.fRule = "FF",
      this.xRule = "F[+X]F[-X]+X"
    },
  },
}
</script>

<style scoped>
h1 .special-color { 
  color:greenyellow; 
} 
.rounded-card{
    border-radius:25px;
}
</style>
