<template>
  <a-input-number v-if="type === 'number'" :style="{ width: '80px' }" size="small"
    :default-value="(defaultValue as number)" @change="handleChange" />
  <a-switch v-else :default-checked="(defaultValue as boolean)" size="small" @change="handleChange" />
</template>

<script lang="ts" setup>
import { prop } from 'cheerio/lib/api/attributes';

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  defaultValue: {
    type: [String, Boolean, Number],
    default: '',
  },
});
const emit = defineEmits(['inputChange']);
const handleChange = (value: unknown) => {
  console.log(value);
  console.log(props.name);


  emit('inputChange', {
    value,
    key: props.name,
  });
};
</script>
