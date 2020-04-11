<template>
  <v-card class="monthly-trend">
    <v-toolbar color="green" dense>
      <v-toolbar-title style="color:white">
        MONTHLY TREND
        <span class="v-toolbar__title" style="color:white" v-if="periodDescription !== ''">{{ ` ${periodDescription}` }}</span>
      </v-toolbar-title>


      <v-spacer></v-spacer>

      <v-select
        :items="reportTypes"
        v-model="activeReport"
        label="Reports"
        item-text="text"
        item-value="id"
        solo
        flat
        dense
        hide-details
        style="margin-right:10px;min-width:200px;max-width:200px"
        class="report-selector"
        @change="changeReportView"
      ></v-select>

      <ExpandExport :expand="expand" />
  
    </v-toolbar>
    <div style="padding:10px;height:100vh">
      <NestedGrid
        id="MonthTrendGridMain"
        ref="MonthTrendGridMain"
        :fields="fields"
        :show-child-header="false"
        :footer-variance-mode="false"
        :field-width-calc="colwidthCalc"
        :text-offset-level="offsetLevel"
        :dataAPI="get_DataAPI"
        :auto-expand="expand"
      />
    </div>
  </v-card>
</template>
<style scoped>
</style>
<style>
#MonthTrendGridMain {
    max-width: 1450px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
}
#MonthTrendGridMain {
  max-height: calc(100vh - 160px);
  /* height: calc(100vh - 160px); */
}
#MonthTrendGridMain .table.b-table > thead > tr > th:nth-child(5),
#MonthTrendGridMain .table.b-table > tbody > tr > td:nth-child(5),
#MonthTrendGridMain .table.b-table > tfoot > tr > th:nth-child(5),
#MonthTrendGridMain .table.b-table > thead > tr > th:nth-child(9),
#MonthTrendGridMain .table.b-table > tbody > tr > td:nth-child(9),
#MonthTrendGridMain .table.b-table > tfoot > tr > th:nth-child(9),
#MonthTrendGridMain .table.b-table > thead > tr > th:nth-child(13),
#MonthTrendGridMain .table.b-table > tbody > tr > td:nth-child(13),
#MonthTrendGridMain .table.b-table > tfoot > tr > th:nth-child(13),
#MonthTrendGridMain .table.b-table > thead > tr > th:nth-child(17),
#MonthTrendGridMain .table.b-table > tbody > tr > td:nth-child(17),
#MonthTrendGridMain .table.b-table > tfoot > tr > th:nth-child(17),
#MonthTrendGridMain .table.b-table > thead > tr > th:nth-child(18),
#MonthTrendGridMain .table.b-table > tbody > tr > td:nth-child(18),
#MonthTrendGridMain .table.b-table > tfoot > tr > th:nth-child(18){
  background-color: #eee;
}
</style>
<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';
import reportEntry from '../../mixin/report-entry.js'

// MonthlyTrendNestGrid: () => import("../../components/MonthlyTrend/MonthTrendNestGrid.vue"),

export default {
  name: 'MonthlyTrend',
  components: {
    NestedGrid: () => import('../../components/NestedGrids/NestedGridCompare.vue'),
    ExpandExport: () => import('../../components/General/ExpandExport.vue')
  },
  mixins: [mixin,reportEntry],
  data: () => ({
    offsetLevel: 2,
    viewTitle: '',
    activeReport: 1,
    expand: true,
    reportTypes: [
      { id: 1, text: 'Sales Actual' },
      { id: 2, text: 'Sales Forecast' },
      { id: 3, text: 'Bookings Forecast' },
    ],
    items: [],
  }),
  methods: {
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '260px' : key === 'actions' ? '32px' : '70px',
      };
    },
    changeReportView() {
      const _this = this;
      this.$nextTick(() => {
        _this.$refs.MonthTrendGridMain.refreshData();
      });
    },
    updateTable() {
      if (this.$refs.MonthTrendGridMain) this.$refs.MonthTrendGridMain.refreshData();
    },
    exportReport(level){
      this.$http.post(`setup/export/`, this.periodFilters)
        .then((response) => {
          window.open(`${this.$http.defaults.baseURL}Webpages/Export/Reports.aspx?level=${level}&name=Monthly-Trend${this.get_ReportFileName}&type=MonthlyTrend&ReportField=${this.activeReport}`, '_blank');
        })
        .catch((error) => {
          console.warn(error);
        })
        .then(() => {
        });
    },
    toggleExpand() {
      this.expand = !this.expand;
      this.$refs.MonthTrendGridMain.refreshData();
    },
  },
  computed: {
    ...mapGetters({
      fields: 'getMonthlyTrendFields',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters',
      autoDrill: 'getAutoExpand',
    }),
    get_DataAPI() {
      return `monthlytrend/${this.activeReport}/1/1`;
    },
    get_ReportFileName(){
      if (this.activeReport === 1) return '-Sales-Actual'
      if (this.activeReport === 2) return '-Sales-Forecast'
      if (this.activeReport === 3) return '-Bookings-Forecast'
      return '';
    }
  },
  mounted() {
    this.$eventHub.$on('period-changed', this.updateTable)
    this.$eventHub.$on('toggle-expand', this.toggleExpand)   
    this.$eventHub.$on('refresh', this.updateTable)
    this.configurePeriodDialog([3], false)
  },
  beforeDestroy() {
    this.$eventHub.$off('period-changed', this.updateTable)
    this.$eventHub.$off('toggle-expand', this.toggleExpand) 
    this.$eventHub.$off('refresh', this.updateTable)
  },
  updated() {},
};
</script>
