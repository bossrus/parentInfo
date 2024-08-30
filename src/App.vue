<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="logo">
      <img
        alt="alef logo"
        src="@/assets/alefLogo.png"
      />
    </div>
    <div class="nav">
      <router-link
        active-class="font-bold"
        exact-active-class="inactive-link"
        to="/"
      >Форма
      </router-link>
      <router-link
        active-class="font-bold"
        exact-active-class="inactive-link"
        to="/preview"
      >Превью
      </router-link>
    </div>
  </header>
  <div class="container">
    <RouterView />
  </div>

  <footer>all rights reserved</footer>
</template>