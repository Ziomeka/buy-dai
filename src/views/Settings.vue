<template>
  <div>
    <h1>This is page with settings</h1>
    <toggle-dai-enable/>
  </div>
</template>
<script>
import ToggleDaiEnable from '@/components/ToggleDaiEnable.vue';

export default {
  name: 'Settings',
  components: {
    ToggleDaiEnable,
  },
};
</script>
