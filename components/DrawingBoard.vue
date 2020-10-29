<template>
    <div height=100 width=100%>
    <vue-p5 v-on="{setup, draw, keypressed, mouseclicked}" id="drawingarea" class="bordered" height=100 width=100%></vue-p5>
    </div>
</template>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-p5"></script>

<script>
import Vue from 'vue';
import VueP5 from 'vue-p5';

export default {
    props: {
        lengthStochastic: String,
        branchStochastic: String,
        branchLen: Number,
        iters: Number,
        branchAng: Number,
        initState: String,
        choiceRule: String,
        fRule: String,
        xRule: String
    },
    data: function() {
        return {
        fRules: ["FF", "F[+F]F[-F]F", "F[+F]F[-F][F]", "FF-[-F+F+F]+[+F-F-F]", "F[+F]F", "F[-F]F"],
        xRules: ["F[+X]F[-X]+X", "F[+X][-X]FX", "F-[[X]+X]+F[+FX]-X", "F-[[X]+X]+F[+FX]-X"],
        }
    },
    components: {
        VueP5: () => import("vue-p5"),
    },
    methods: {
        setup(sketch) {
            var drawingarea = document.getElementById("drawingarea");
            sketch.resizeCanvas(drawingarea.offsetWidth, 0.75* window.innerHeight);
            sketch.angleMode(this.DEGREES);
            sketch.noLoop();
        },
        mouseclicked(sketch) {
            console.log('clickity click')
            // Draw Your L-Systems :)
        },
    }
}
</script>

<style scoped>

</style>