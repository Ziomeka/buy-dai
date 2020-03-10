<template>
  <div>
    <h1>This is page with settings</h1>
    {{blockchainUser.isDaiEnabled}}
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Settings',
  computed: {
    ...mapState(['blockchainUser']),
  },
};
</script>
