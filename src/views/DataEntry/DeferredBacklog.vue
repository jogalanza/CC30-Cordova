<template>
  <v-card class="deferred-backlog">
    <v-toolbar color="green" dense>
      <v-toolbar-title style="color:white">
        Deferred Backlog
        <span v-if="periodDescription !== ''">{{ ` : ${periodDescription} ${localCurrency ? '(Local Currency)' : ''}` }}</span>
        <span v-if="editMode" style="color:red">(Edit Mode)</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <ExpandExport 
        target="defbacklog-grid"
        :hide-export-level="true" 
        :hide-export-all="false" 
        :hide-save-all="false"
        :hide-currency="true"
        :hide-expand="true"
        :hide-add-new="false"
        :hide-delete="false"
        :hide-edit="true"
        :hide-import="false"
        :edit-mode="editMode"
        />
    </v-toolbar>

    <v-toolbar style="height:60px;box-shadow:none"> 
      <v-spacer />
      <v-text-field
        v-model="filter"
        dense
        outlined
        hide-details
        clearable
        prepend-inner-icon="mdi-magnify"
        label="Search"
        style="margin-right:10px"
      />

      <v-select
        dense
        :items="userSites"
        v-model="activeSite"
        label="Sites"
        item-text="col1"
        item-value="col1"
        outlined
        hide-details
        @change="SiteChanged"
        style="margin-right:10px;width:10px;min-width:200px;max-width:200px"
      ></v-select>
    </v-toolbar>
    <div style="padding:10px;height:100vh;overflow-y:auto">
      <v-container style="padding-top:0px">
        <div>
          
        </div>
          <BackLogGrid 
            id="BackLogGrid"
            ref="BackLogGrid"
            target-name="defbacklog-grid"
            :read-only="readOnly" 
            :filter="filter" 
            :site-filter="activeSite"
            :select-mode="selectMode"
            :edit-mode="true"
            :data-entry-mode="true" />
      </v-container>      
    </div>

    <UploadDialog 
      ref="uploadDialog"
      title="Import Deferred Backlog"
      upload-api="invoke/uploaddata"
      paste-api="invoke/pastedata"
      model-api="deferredbacklog/getmodel"
      :fields="fields"
       />

    <BackLogEntry ref="backlogEntry" />
  </v-card>
</template>

<style>
#BackLogGrid {
    max-width: 1485px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.5);
    border-radius: 4px;
}
#BackLogGrid {
  max-height: calc(100vh - 230px);
  /* height: calc(100vh - 160px); */
}
.deferred-backlog
  .v-text-field.v-text-field--solo.v-input--dense
  > .v-input__control {
  min-height: 30px;
}
.deferred-backlog .theme--light.v-btn.v-btn--icon {
  color: white;
}
</style>

<script>
// @ is an alias to /src
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'DeferredBacklog',
  components: {
    BackLogGrid: () => import('../../components/BackLogDialog/BackLogQGrid.vue'),
    BackLogEntry: () => import('../../components/DeferredBacklog/BackLogEntry.vue'),
    ExpandExport: () => import('../../components/General/ExpandExport.vue'),
    UploadDialog: () => import('../../components/General/UploadDialog.vue')
  },
  data: () => ({
    localCurrency: false,
    activeSite: null,
    selectMode: false,
    editMode: false,
    readOnly: false,
    filter: null,
    panel: [],
    items: [],
  }),
  methods: {
    addNewClicked(e, x) {
      console.log(e, x);
      this.$refs.backlogEntry.toggleDialog();
    },
    all() {
      this.panel = [...Array(this.items).keys()].map((k, i) => i);
    },
    none() {
      this.panel = [];
    },
    SiteChanged(){
      this.$nextTick(() => {
        console.log('RefreshTable', this.$refs)
        this.$refs.BackLogGrid.RefreshTable()
      })
    },
    ToggleEditMode(){
      this.editMode = !this.editMode
      this.$nextTick(() =>{
        this.$refs.BackLogGrid.RefreshTable()
      })
    },
    ImportFile(){
      this.$refs.uploadDialog.InvokeDialog()
    }
  },
  computed: {
    ...mapGetters({
      sites: 'getSites',
      fields: 'getBackLogFields',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters',
      userSites: 'getDataEntrySiteFilter'
    }),
    // userSites:{
    //   get(){
    //     return this.$store.state.userInfo.siteAccess
    //   }
    // }
  },
  mounted() {
    this.configurePeriodDialog([2], false)
    this.$eventHub.$on('edit-entry', this.ToggleEditMode)
    this.$eventHub.$on('import-file', this.ImportFile)
    var self = this
    this.$nextTick(() => {
      console.log('deferred backlog mounted', self, this)
      if (self.userSites && self.userSites.length > 0) self.activeSite = self.userSites[0].col1
      //self.SiteChanged()
    })    
  },
  beforeDestroy(){
    this.$eventHub.$off('edit-entry', this.ToggleEditMode)
    this.$eventHub.$off('import-file', this.ImportFile)
  }
};
</script>
