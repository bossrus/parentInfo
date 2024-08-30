<script lang="ts" setup>

const { type, value, label, onInput } = defineProps<{
  type: 'text' | 'number';
  value: string | number;
  label: string;
  onInput: (value: string) => void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  onInput(target.value);
};

</script>

<template>
  <div class="form-floating">
    <input
      :name="`${label}Input`"
      :type="type"
      :value="value"
      class="form-control"
      min="0"
      @input="handleInput"
    >
    <label>{{ label }}</label>
  </div>
</template>