<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      other
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          color="orange"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
            <v-list-item-subtitle v-text="About" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <h2><span class="special-color">Tree</span>Gen</h2>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span
        ><a
          class="bottomlink"
          href="https://github.com/Down-To-Programme/treegen"
          >Find the repository!</a
        >
        DownToProgramme &copy; {{ new Date().getFullYear() }}
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-pencil",
          title: "Draw Trees",
          to: "/",
        },
        {
          icon: "mdi-information",
          title: "About",
          to: "/about",
        },
        {
          icon: "mdi-link",
          title: "Links",
          to: "/links",
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: "DownToProgramme",
    };
  },
};
</script>

<style scoped>
.bottomlink {
  color: greenyellow;
}
h2 .special-color {
  color: greenyellow;
}
</style>
