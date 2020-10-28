<template>
  <div class="to-do">
    <ul class="to-do__list qa-to-do-list random_class">
      <li class="to-do__item qa-to-do-item" v-for="item in items" :key="item">
        {{ item }}
      </li>
    </ul>
    <p class="my_nnum">This is a new paragraph</p>
  </div>
</template>

<script>
export default {
  name: 'ToDo',
  data() {
    return {
      items: [],
    };
  },
};
</script>