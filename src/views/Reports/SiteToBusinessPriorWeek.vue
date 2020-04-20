<template>
  <v-card class="stb-prior-week">
    <v-toolbar color="green" dense>

      <v-toolbar-title style="color:white">
        Site To Product Family: Prior Week
        <span v-if="periodFilters.selectedWW1">{{ ` : WW${periodFilters.selectedWW1}` }}</span>
        <span v-if="periodDescription !== ''">{{ `, ${periodDescription}` }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <ExpandExport :expand="expand" />
    
    </v-toolbar>
    <div style="padding:10px;height:100vh">
      <NestedGrid
        id="stbpriormain"
        ref="stbpriormain"
        :fields="fields"
        :show-child-header="false"
        :footer-variance-mode="false"
        :field-width-calc="colwidthCalc"
        :text-offset-level="offsetLevel"
        :dataAPI="dataAPI"
        :auto-expand="expand"
        :start-at-site="true" />
    </div>
  </v-card>
</template>
<style scoped>

</style>
<style>
#stbpriormain {
    max-width: 1080px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 0px;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
}
#stbpriormain {
  max-height: calc(100vh - 160px);
  /* height: calc(100vh - 160px); */
}
#stbpriormain .table.b-table > thead > tr > th:nth-child(6),
#stbpriormain .table.b-table > tbody > tr > td:nth-child(6),
#stbpriormain .table.b-table > tfoot > tr > th:nth-child(6),
#stbpriormain .table.b-table > thead > tr > th:nth-child(8),
#stbpriormain .table.b-table > tbody > tr > td:nth-child(8),
#stbpriormain .table.b-table > tfoot > tr > th:nth-child(8){
  background-color: #eee;
}
</style>
<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';
import reportEntry from '../../mixin/report-entry.js'

export default {
  name: 'SiteToBusinessPriorWeek',
  components: {
    NestedGrid: () => import('../../components/NestedGrids/NestedGridCompare.vue'),
    ExpandExport: () => import('../../components/General/ExpandExport.vue')
  },
  mixins: [mixin,reportEntry],
  data: () => ({
    expand: false,
    dataAPI1: 'startatsite/prior/1/1',
    offsetLevel: 2,
    items: [],
  }),
  methods: {
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '300px' : key === 'actions' ? '32px' : '70px',
      };
    },
    updateTable() {
      this.$nextTick(() => {
        if (this.$refs.stbpriormain) this.$refs.stbpriormain.refreshData();
      })         
    },
    exportReport(level){
      this.$http.post(`setup/export/`, this.periodFilters)
        .then((response) => {
          //console.log(response)
          window.open(`${this.$http.defaults.baseURL}Webpages/Export/Reports.aspx?level=${level}&startatsite=1&name=Site-To-Product-Family-Prior&SnapShotWeek=1`, '_blank');
        })
        .catch((error) => {
        // handle error
          console.warn(error);
        })
        .then(() => {
        });
    },
    toggleExpand() {
      this.expand = !this.expand;
      this.updateTable()
    },
    Handle_DefBacklog_Click(row, level) {
      console.log('Handle_DefBacklog_Click', row, level)
      var info = {
        startAtSite: true,
        level: level,
        key: parseInt(row.item._key),
        mainInfo: row.item,
        weeklyMode: true,
        workWeek: this.periodFilters.selectedWW1
      }
      this.$eventHub.$emit('invoke-deferred-backlog-dialog', info)
    },
  },
  computed: {
    ...mapGetters({
      fields: 'getPriorWeekFields',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters',
    }),
    dataAPI(){
      return `/startatsite/prior/1/1/${this.periodFilters.selectedWW1}`
    }
  },
  mounted() {
    this.$eventHub.$on('period-changed', this.updateTable);
    this.$eventHub.$on('toggle-expand', this.toggleExpand)  
    this.$eventHub.$on('refresh', this.updateTable)
    this.$eventHub.$on('deferred-backlog-clicked', this.Handle_DefBacklog_Click)
    this.configurePeriodDialog([2], false, [1]);
  },
  beforeDestroy() {
    this.$eventHub.$off('period-changed', this.updateTable);
    this.$eventHub.$off('toggle-expand', this.toggleExpand)
    this.$eventHub.$off('refresh', this.updateTable)
    this.$eventHub.$off('deferred-backlog-clicked', this.Handle_DefBacklog_Click);
  },
  updated() {
  },
};
</script>
