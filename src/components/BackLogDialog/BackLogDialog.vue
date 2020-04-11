<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" style="overflow:hidden" draggable>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>Deferred Backlog</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="filter"
            flat
            solo-inverted
            hide-details
            clearable
            prepend-inner-icon="mdi-magnify"
            label="Search"
            class=" d-none d-sm-flex"
            style="margin-right:16px"
          />
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <div>
          <BackLogGrid :filter="filter" />
        </div>

      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'BackLogDialog',
  components: {
    BackLogGrid: () => import('./BackLogGrid.vue'),
  },
  data: () => ({
    dialog: false,
    filter: null,
  }),
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    handleDefBacklog_click(e, x) {
      console.log('BackLogDialog', e, x);
      this.dialog = true;
    },
  },
  mounted() {
    this.$eventHub.$on('defbacklog-clicked', this.handleDefBacklog_click);
  },
  beforeDestroy() {
    this.$eventHub.$off('defbacklog-clicked', this.handleDefBacklog_click);
  },
};
</script>
