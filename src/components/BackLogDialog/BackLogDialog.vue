<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" style="overflow:hidden" draggable>
      <v-card id="DeferredBacklogDialog">
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

        <div style="padding:16px">
          <BackLogGrid
            ref="DialogBackLogGrid"
            :info="info"
            :filter-key="key"
            :level="level"
            :start-at-site="startAtSite"
            :main-info="mainInfo"
          />
        </div>

      </v-card>
    </v-dialog>
</template>
<style>
#DeferredBacklogDialog .backlog-grid{
    max-width: 1485px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.5);
    border-radius: 4px;
}
#DeferredBacklogDialog .backlog-grid {
      max-height: calc(100vh - 100px);
}
</style>
<script>
export default {
  name: 'BackLogDialog',
  components: {
    BackLogGrid: () => import('./BackLogQGrid.vue'),
  },
  data: () => ({
    dialog: false,
    filter: null,
    key: 1,
    level: 5,
    startAtSite: false,
    mainInfo: null,
    info: null
  }),
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    // handleDefBacklog_click(row, startAtSite, level) {
    //   console.log('BackLogDialog', row, startAtSite, level);
    //   this.startAtSite = startAtSite
    //   this.level = level
    //   this.dialog = true;
    //   this.key = parseInt(row.item._key)
    //   this.mainInfo = row.item
    //   this.$nextTick(()=>{
    //     this.$refs.BackLogGrid.GetBacklogs()
    //   })
    // },
    InvokeDialog(data) {
      console.log('InvokeDialog', data, this.$refs);
      this.info = data
      this.dialog = true;      
      this.$nextTick(()=>{
        this.$refs.DialogBackLogGrid.GetBacklogs()
      })
    },
  },
  mounted() {
    console.log(this.$refs)
    this.$eventHub.$on('invoke-deferred-backlog-dialog', this.InvokeDialog);
  },
  beforeDestroy() {
    this.$eventHub.$off('invoke-deferred-backlog-dialog', this.InvokeDialog);
  },
};
</script>
