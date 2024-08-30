<script lang="ts" setup>

import InputForm from '@/components/_shared/inputForm.vue';
import { usePeopleStore } from '@/store/pinia.ts';
import { onUnmounted, ref } from 'vue';
import { IPeopleInfo } from '@/types/types.ts';
import { removeLeadingZeros } from '@/services/removeLeadingZeros.ts';
import { useRouter } from 'vue-router';

const { parent, kids, updatePeople, updateKids } = usePeopleStore();

const router = useRouter();

const parentLocal = ref<IPeopleInfo>(JSON.parse(JSON.stringify(parent)));
const kidsLocal = ref<IPeopleInfo[]>(JSON.parse(JSON.stringify(kids)));

const error = ref<string[]>([]);
const timer = ref<(number | null)[]>([]);

const handleInputChange = (value: string | number, field: keyof IPeopleInfo, index: number) => {
  clearError(index);
  const target = index == 5 ? parentLocal.value : kidsLocal.value[index];
  target[field] = field === 'name' ? value : removeLeadingZeros(value);
};

const saveToStore = () => {
  if (!checkFormValidity()) return;
  updatePeople(parentLocal.value);
  updateKids(kidsLocal.value);
  router.push('/preview');
};

const validationFields = (field: IPeopleInfo, index: number) => {
  const subjectType = index > 4 ? 'родителя' : 'ребёнка';
  let errorMsg = '';
  if (!field.name?.trim()) errorMsg = `Имя ${subjectType} обязательно к заполнению!`;
  if (index > 4) {
    if (!field.age || field.age < 5 || field.age > 122)
      errorMsg += (errorMsg && '\n') + `Неверно введённый возраст.`;
  } else {
    if ((field.age !== 0 && !field.age) || (parent.age - field.age) < 5)
      errorMsg += (errorMsg && '\n') + `Возраст ребёнка должен быть минимум на 5 лет меньше возраста родителя.`;
  }
  setError(errorMsg, index);
};

const checkFormValidity = (): boolean => {

  validationFields(parentLocal.value, 5);

  kidsLocal.value.forEach((kid, index) => {
    validationFields(kid, index);
  });
  return !(error.value.some((err) => err));
};

const addKid = () => {
  if (!checkFormValidity() || kidsLocal.value.length >= 5) return;
  kidsLocal.value.push({ name: '', age: 0 });
};

const clearError = (index: number) => {
  error.value[index] = '';
  if (timer.value[index]) {
    clearTimeout(timer.value[index]);
    timer.value[index] = null;
  }
};

const setError = (value: string, index: number) => {
  if (timer.value[index]) {
    clearTimeout(timer.value[index]);
  }
  error.value[index] = value;
  if (value) {
    timer.value[index] = setTimeout(() => clearError(index), 10000);
  }
};

const deleteKid = (index: number) => {
  if (kidsLocal.value.length > 0 && index >= 0 && index < kidsLocal.value.length) {
    kidsLocal.value.splice(index, 1);
  }
};

onUnmounted(() => {
  timer.value.forEach(t => {
    if (t !== null && t !== undefined) {
      clearTimeout(t);
    }
  });
});

</script>

<template>
  <div v-if="parentLocal" class="main-form">
    <div class="form-title">
      Персональные данные
    </div>
    <div class="form-column">
      <InputForm
        :onInput="(value) => handleInputChange(value, 'name', 5)"
        :value="parentLocal.name"
        label="Имя"
        type="text"
      />
      <InputForm
        :onInput="(value) => handleInputChange(value, 'age', 5)"
        :value="parentLocal.age"
        label="Возраст"
        type="number"
      />
      <div v-if="error[5]" class="error">
        {{ error[5] }}
      </div>
    </div>
    <div v-if="kidsLocal" class="kids-form">
      <div class="kids-form-title">
        Дети (макс. 5)
        <button
          v-if="kidsLocal.length<5"
          class="btn"
          @click="addKid"
        >
          + Добавить ребёнка
        </button>
      </div>
      <template v-if="kidsLocal.length > 0">
        <template v-for="(kid, index) in kidsLocal" :key="index">
          <div
            class="kids-inputs"
          >
            <InputForm
              :onInput="(value) => handleInputChange(value, 'name', index)"
              :value="kid.name"
              label="Имя"
              type="text"
            />
            <InputForm
              :onInput="(value) => handleInputChange(value, 'age', index)"
              :value="kid.age"
              label="Возраст"
              type="number"
            />
            <div
              class="delete-button"
              @click="deleteKid(index)"
            >
              Удалить
            </div>
          </div>
          <div v-if="error[index]" class="error">
            {{ error[index] }}
          </div>
        </template>
      </template>
    </div>
    <button
      class="btn-blue"
      @click="saveToStore"
    >
      Сохранить
    </button>
  </div>
</template>
