<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <h1 style="font-size: 50px">
          <span class="special-color">Useful</span> Links
        </h1>
      </div>
      <v-card class="rounded-card">
        <v-flex class="main-box">
          <ul>
            <li>
              <a href="http://algorithmicbotany.org/papers/#abop">Here</a> is a
              link to the textbook that inspired this project, An Algorithmic
              Beauty of Plants. You can learn more about L-systems in the first
              chapter.
            </li>
            <li>
              <a href="https://github.com/Down-To-Programme/treegen">Here</a> is
              a link to our GitHub repository for this project, if you would
              like to report a bug, provide feedback or make take a look at our
              code. There, you can find more info about our development process
              in the README.
            </li>
            <li>
              <a
                href="https://eng.qualia.com/drawing-fractals-in-the-browser-with-l-systems-and-es6-6cecfd74e084"
              >
                Here</a
              >
              is a link to a useful tutorial that you can follow to learn how to
              develop your own L-system generation software.
            </li>
          </ul>
        </v-flex>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
h1 .special-color {
  color: greenyellow;
}

p {
  color: rgb(180, 180, 180);
}
li {
  color: rgb(180, 180, 180);
}
h3 {
  color: greenyellow;
}

.rounded-card {
  border-radius: 25px;
}

.main-box {
  padding: 20px;
}

a {
  color: orange;
}
</style>
