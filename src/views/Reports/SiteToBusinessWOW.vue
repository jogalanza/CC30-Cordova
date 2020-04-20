<template>
  <v-card class="stb-wow">
    <v-toolbar color="green" dense>

      <v-toolbar-title style="color:white">
        Site To Business: Week over Week
        <span v-if="periodFilters.selectedWW1">{{ ` : WW${periodFilters.selectedWW1} to WW${periodFilters.selectedWW2}` }}</span>
        <span v-if="periodDescription !== ''">{{ `, ${periodDescription}` }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <ExpandExport 
        :expand="expand" 
        :hide-wow-toggle="false"
        :integrated-mode="integratedMode"/>

    </v-toolbar>
    <div v-if="!integratedMode" style="padding:10px;height:calc(100vh - 140px);overflow-y:auto">
      <div class="week-heading">{{ `WW${periodFilters.selectedWW1}`}}</div>
      <NestGrid
        class="stbwow-grid"
        ref="stbwow1"
        :fields="fields"
        :show-child-header="false"
        :footer-variance-mode="false"
        :field-width-calc="colwidthCalc"
        :text-offset-level="offsetLevel"
        :dataAPI="dataAPIWW1"
        :auto-expand="expand" />

      <div class="week-heading">{{ `WW${periodFilters.selectedWW2}`}}</div>
      <NestGrid
        class="stbwow-grid"
        ref="stbwow2"
        :fields="fields"
        :show-child-header="false"
        :footer-variance-mode="false"
        :field-width-calc="colwidthCalc"
        :text-offset-level="offsetLevel"
        :dataAPI="dataAPIWW2"
        :auto-expand="expand" />

      <div class="week-heading">Variance</div>
      <NestGrid
        class="stbwow-grid"
        ref="stbwowvar"
        :fields="fields"
        :show-child-header="false"
        :footer-variance-mode="false"
        :field-width-calc="colwidthCalc"
        :text-offset-level="offsetLevel"
        :dataAPI="dataAPI"
        :auto-expand="expand" />
    </div>
    <div v-else style="padding:10px;height:100vh">
      <NestGrid
        class="stbwow-grid-main"
        ref="stbwowmain"
        :fields="fieldsMain"
        :show-child-header="false"
        :footer-variance-mode="true"
        :field-width-calc="colwidthCalc"
        :text-offset-level="offsetLevel"
        :dataAPI="dataAPIMain"
        :auto-expand="expand"
        :start-at-site="true" />
    </div>
  </v-card>
</template>
<style scoped>

</style>
<style>
.week-heading{
  padding-top: 16px;
  padding-bottom: 2px;
  font-weight: bold;
  letter-spacing: 0.15rem;
  font-size: 1rem;
  color: .999;
  max-width: 1240px;
    margin-left: auto;
    margin-right: auto;
}
.stbwow-grid-main.fixed-rowheader > .table.b-table > thead > tr > th:nth-child(2),
.stbwow-grid-main.fixed-rowheader > .table.b-table > tbody > tr > td:nth-child(2),
.stbwow-grid-main.fixed-rowheader > .table.b-table > tfoot > tr > th:nth-child(2),
.stbwow-grid-main .table.b-table > tbody > tr > td:nth-child(2),
.stbwow-grid-main .table.b-table > tfoot > tr > th:nth-child(2) {
    text-align: left;
    position: -webkit-sticky;
    position: sticky;
    left: 300px;
    z-index: 5 !important;
}
.stbwow-grid-main.fixed-rowheader > .table.b-table > thead > tr > th:nth-child(2){
  z-index: 6 !important;
}
.stbwow-grid-main .table.b-table > tbody > tr > td:nth-child(2),
.stbwow-grid-main .table.b-table > tfoot > tr > th:nth-child(2),
.stbwow-grid-main .table.b-table > thead > tr > th:nth-child(7),
.stbwow-grid-main .table.b-table > tbody > tr > td:nth-child(7),
.stbwow-grid-main .table.b-table > tfoot > tr > th:nth-child(7),
.stbwow-grid-main .table.b-table > thead > tr > th:nth-child(9),
.stbwow-grid-main .table.b-table > tbody > tr > td:nth-child(9),
.stbwow-grid-main .table.b-table > tfoot > tr > th:nth-child(9),
.stbwow-grid .table.b-table > thead > tr > th:nth-child(6),
.stbwow-grid .table.b-table > tbody > tr > td:nth-child(6),
.stbwow-grid .table.b-table > tfoot > tr > th:nth-child(6),
.stbwow-grid .table.b-table > thead > tr > th:nth-child(8),
.stbwow-grid .table.b-table > tbody > tr > td:nth-child(8),
.stbwow-grid .table.b-table > tfoot > tr > th:nth-child(8){
  background-color: #eee;
}
.stbwow-grid,
.stbwow-grid-main {
    max-width: 1240px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 0px;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
}
.stbwow-grid {
  max-height: calc(100vh - 160px);
  /* height: calc(100vh - 160px); */
}
.stbwow-grid-main {
  max-height: calc(100vh - 160px);
  /* height: calc(100vh - 160px); */
}
.stbwow-grid-main .wow-label{
  font-size: 0.7rem;
  font-weight: normal;
  text-align: right;
  color:#999;
}
</style>
<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';
import reportEntry from '../../mixin/report-entry.js'

export default {
  name: 'SiteToBusinessWOW',
  components: {
    NestGrid: () => import('../../components/NestedGrids/NestedGridCompare.vue'),
    ExpandExport: () => import('../../components/General/ExpandExport.vue')
  },
  mixins: [mixin,reportEntry],
  data: () => ({
    integratedMode: false,
    expand: false,
    dataAPI: '/startatsite/wow/var/1/1',
    dataAPIMain: '/startatsite/wow/1/1',
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
        if (this.integratedMode && this.$refs.stbwowmain) this.$refs.stbwowmain.refreshData()
        if (!this.integratedMode && this.$refs.stbwow1) this.$refs.stbwow1.refreshData();
        if (!this.integratedMode && this.$refs.stbwow2) this.$refs.stbwow2.refreshData();
        if (!this.integratedMode && this.$refs.stbwowvar) this.$refs.stbwowvar.refreshData();
      }) 
    },
    exportReport(level){
      this.$http.post(`setup/export/`, this.periodFilters)
        .then((response) => {
          //console.log(response)
          window.open(`${this.$http.defaults.baseURL}Webpages/Export/Reports.aspx?level=${level}&startatsite=1&name=Site-To-Product-Family-WOW&SnapShotWeek=1&WOWMode=1`, '_blank');
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
    ToggleView(){
      this.integratedMode = !this.integratedMode
      this.expand = false
      this.updateTable()
    }
  },
  computed: {
    ...mapGetters({
      fieldsMain: 'getWOWFields',
      fields: 'getPriorWeekFields',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters',
    }),
    dataAPIWW1(){
      return `/startatsite/prior/1/1/${this.periodFilters.selectedWW1}`
    },
     dataAPIWW2(){
      return `/startatsite/prior/1/1/${this.periodFilters.selectedWW2}`
    }
  },
  mounted() {
    this.$eventHub.$on('period-changed', this.updateTable)
    this.$eventHub.$on('toggle-expand', this.toggleExpand)  
    this.$eventHub.$on('refresh', this.updateTable)
    this.$eventHub.$on('toggle-compact-view', this.ToggleView)
    this.configurePeriodDialog([2], false, [1, 2]);
  },
  beforeDestroy() {
    this.$eventHub.$off('period-changed', this.updateTable)
    this.$eventHub.$off('toggle-expand', this.toggleExpand) 
    this.$eventHub.$off('refresh', this.updateTable)
    this.$eventHub.$off('toggle-compact-view', this.ToggleView)
  },
  updated() {
  },
};
</script>
