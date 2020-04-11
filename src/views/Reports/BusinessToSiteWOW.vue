<template>
  <v-card class="bts-wow">
    <v-toolbar color="green" dense>

      <v-toolbar-title style="color:white">
        Business To Site: Week over Week
        <span v-if="periodFilters.selectedWW1">{{ ` : WW${periodFilters.selectedWW1} to WW${periodFilters.selectedWW2}` }}</span>
        <span v-if="periodDescription !== ''">{{ `, ${periodDescription}` }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <ExpandExport :expand="expand" />
   
    </v-toolbar>
    <div style="padding:10px;height:100vh">
      <NestGrid
        id="btswow"
        ref="btswow"
        :fields="fields"
        :show-child-header="false"
        :footer-variance-mode="true"
        :field-width-calc="colwidthCalc"
        :text-offset-level="offsetLevel"
        :dataAPI="dataAPI"
        :auto-expand="expand" />
    </div>
  </v-card>
</template>
<style scoped>

</style>
<style>
#btswow.fixed-rowheader > .table.b-table > thead > tr > th:nth-child(2),
#btswow.fixed-rowheader > .table.b-table > tbody > tr > td:nth-child(2),
#btswow.fixed-rowheader > .table.b-table > tfoot > tr > th:nth-child(2),
#btswow .table.b-table > tbody > tr > td:nth-child(2),
#btswow .table.b-table > tfoot > tr > th:nth-child(2) {
    text-align: left;
    position: -webkit-sticky;
    position: sticky;
    left: 300px;
    z-index: 5 !important;
}
#btswow.fixed-rowheader > .table.b-table > thead > tr > th:nth-child(2){
  z-index: 6 !important;
}
#btswow .table.b-table > tbody > tr > td:nth-child(2),
#btswow .table.b-table > tfoot > tr > th:nth-child(2),
#btswow .table.b-table > thead > tr > th:nth-child(7),
#btswow .table.b-table > tbody > tr > td:nth-child(7),
#btswow .table.b-table > tfoot > tr > th:nth-child(7),
#btswow .table.b-table > thead > tr > th:nth-child(9),
#btswow .table.b-table > tbody > tr > td:nth-child(9),
#btswow .table.b-table > tfoot > tr > th:nth-child(9){
  background-color: #eee;
}
#btswow {
    max-width: 1240px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    padding-top: 0px;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
}
#btswow {
  max-height: calc(100vh - 160px);
  /* height: calc(100vh - 160px); */
}
#btswow .wow-label{
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
  name: 'BusinessToSiteWOW',
  components: {
    NestGrid: () => import('../../components/NestedGrids/NestedGridCompare.vue'),
    ExpandExport: () => import('../../components/General/ExpandExport.vue')
  },
  mixins: [mixin,reportEntry],
  data: () => ({
    expand: false,
    dataAPI: '/startatbusiness/wow/1/1',
    offsetLevel: 5,
    items: [],
  }),
  methods: {
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '300px' 
          : key === 'actions' ? '32px' 
          : key === 'wowLabel' ? '60px'
          : '80px',
      };
    },
    updateTable() {
      if (this.$refs.btswow) this.$refs.btswow.refreshData();
    },
    exportReport(level){ 
      this.$http.post(`setup/export/`, this.periodFilters)
        .then((response) => {
          //console.log(response)
          window.open(`${this.$http.defaults.baseURL}Webpages/Export/Reports.aspx?level=${level}&name=Business-To-Site-WOW&SnapShotWeek=1&WOWMode=1`, '_blank');
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
      this.$refs.btswow.refreshData();
    },
  },
  computed: {
    ...mapGetters({
      fields: 'getWOWFields',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters',
    }),
  },
  mounted() {
    this.$eventHub.$on('period-changed', this.updateTable);
    this.$eventHub.$on('toggle-expand', this.toggleExpand) 
    this.$eventHub.$on('refresh', this.updateTable)
    this.configurePeriodDialog([2], false, [1, 2]);
  },
  beforeDestroy() {
    this.$eventHub.$off('period-changed', this.updateTable)
    this.$eventHub.$off('toggle-expand', this.toggleExpand) 
    this.$eventHub.$off('refresh', this.updateTable)
  },
  updated() {
  },
};
</script>
