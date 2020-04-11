<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      style="overflow:hidden"
      draggable
    >
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>-->
      <v-card>
        <v-toolbar dark color="green">
          <v-toolbar-title>New Deferred Backlog Entry</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn light v-on="on" style="margin-right:20px;box-shadow:none">
                <v-icon>mdi-content-save</v-icon>
                <span style="margin-left:10px">SAVE</span>
              </v-btn>
            </template>
            <span>Save All</span>
          </v-tooltip>

          <v-divider vertical></v-divider>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <div style="padding:10px;height:100vh">
          <DefBacklogEntryGrid />
        </div>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BackLogEntry',
  components: {
    DefBacklogEntryGrid: () => import('./DefBacklogEntryGrid.vue'),
  },
  data: () => ({
    dialog: false,
    filter: null,
  }),
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
  computed: {
    ...mapGetters({
      sites: 'getSites',
    }),
  },
};
</script>
