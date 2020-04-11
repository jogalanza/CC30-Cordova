<template>
  <v-card class="start-at-site">
    <v-toolbar color="green" dense>

      <v-toolbar-title style="color:white">
        Start At Site 
        <span v-if="periodDescription !== ''">{{ ` : ${periodDescription} ${localCurrency ? '(Local Currency)' : ''}` }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <ExpandExport :expand="expand" :hide-currency="false" :local-currency="localCurrency" />

    </v-toolbar>
    <div style="padding:10px;height:100vh">

      <NestGrid
        id="SASGridMain"
        ref="SASGridMain"
        :fields="fields"
        :show-child-header="false"
        :footer-variance-mode="false"
        :field-width-calc="colwidthCalc"
        :text-offset-level="offsetLevel"
        :local-currency="localCurrency"
        :dataAPI="getDataAPI"
        :auto-expand="expand"
      />
    </div>
  </v-card>
</template>
<style scoped>

</style>
<style>
#SASGridMain {
    max-width: 1420px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
}
#SASGridMain {
  max-height: calc(100vh - 160px);
  /* height: calc(100vh - 160px); */
}
#SASGridMain .table.b-table > thead > tr > th:nth-child(7),
#SASGridMain .table.b-table > tbody > tr > td:nth-child(7),
#SASGridMain .table.b-table > tfoot > tr > th:nth-child(7),
#SASGridMain .table.b-table > thead > tr > th:nth-child(9),
#SASGridMain .table.b-table > tbody > tr > td:nth-child(9),
#SASGridMain .table.b-table > tfoot > tr > th:nth-child(9){
  background-color: #eee;
}
</style>
<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';
import reportEntry from '../../mixin/report-entry.js'

export default {
  name: 'StartAtSite',
  components: {
    NestGrid: () => import('../../components/NestedGrids/NestedGridCompare.vue'),
    ExpandExport: () => import('../../components/General/ExpandExport.vue')
  },
  mixins: [mixin,reportEntry],
  data: () => ({
    dataAPI: '/startatsite',
    localCurrency: false,
    offsetLevel: 2,
    expand: false,
    items: [],
  }),
  methods: {
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '300px' : key === 'actions' ? '32px' : '70px',
      };
    },
    handle_periodChanged(e, x) {
      // console.log('StartAtBusiness.handle_periodChanged',e, x)
      this.getInitialData();
    },
    switchCurrency() {
      this.localCurrency = !this.localCurrency;

      const _this = this;
      this.$nextTick(() => {
        _this.$refs.SASGridMain.refreshData();
      });
    },
    updateTable() {
      if (this.$refs.SASGridMain) this.$refs.SASGridMain.refreshData();
    },
    exportReport(level){
      this.$http.post(`setup/export/`, this.periodFilters)
        .then((response) => {
          //console.log(response)
          window.open(`${this.$http.defaults.baseURL}Webpages/Export/Reports.aspx?level=${level}&startatsite=1&name=Site-To-Product-Family&LocalCurrency=${this.localCurrency}`, '_blank');
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
      this.$refs.SASGridMain.refreshData();
    },
  },
  computed: {
    ...mapGetters({
      fields: 'getSASFields',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters'
    }),
    getDataAPI() {
      return `${this.dataAPI}/1/1/${this.localCurrency}`;
    },
  },
  mounted() {
    this.$eventHub.$on('period-changed', this.updateTable);
    this.$eventHub.$on('toggle-expand', this.toggleExpand)
    this.$eventHub.$on('toggle-currency', this.switchCurrency)
    this.$eventHub.$on('refresh', this.updateTable)
    this.configurePeriodDialog([1, 2, 3, 4], true);
  },
  beforeDestroy() {
    this.$eventHub.$off('period-changed', this.updateTable);
    this.$eventHub.$off('toggle-expand', this.toggleExpand) 
    this.$eventHub.$off('toggle-currency', this.switchCurrency)
    this.$eventHub.$off('refresh', this.updateTable)
  },
  updated() {
  },
};
</script>
