<script lang="ts" setup>
import { usePeopleStore } from '@/store/pinia.ts';
import { ageToText } from '@/services/ageToText.ts';

const { parent, kids } = usePeopleStore();
</script>

<template>
  <div class="main-form">
    <template v-if="parent.name && parent.age">
      <div
        class="form-title"
      >
        Персональные данные
      </div>
      <div class="font-bold">
        {{ parent.name }}, {{ ageToText(parent.age) }}
      </div>
      <div
        v-if="kids.length>0"
        class="kids-preview"
      >
        Дети
        <div
          v-for="(kid, index) in kids"
          :key="index"
          class="kid-bold"
        >
          {{ kid.name }}, {{ ageToText(kid.age) }}
        </div>
      </div>
      <div v-else class="form-title">
        Детей нет
      </div>
    </template>
    <template v-else>
      <div class="form-title">
        Перейдите на форму и введите данные
      </div>
    </template>
  </div>
</template>