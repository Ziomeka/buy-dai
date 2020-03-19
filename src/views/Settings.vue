<template>
  <div>
    <h1>This is page with settings</h1>
    <toggle-dai-enable/>
    <toggle-user-type/>
  </div>
</template>
<script>
import ToggleDaiEnable from '@/components/ToggleDaiEnable.vue';
import ToggleUserType from '@/components/ToggleUserType.vue';

export default {
  name: 'Settings',
  components: {
    ToggleDaiEnable,
    ToggleUserType,
  },
};
</script>
