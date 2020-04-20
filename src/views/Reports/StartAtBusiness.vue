<template>
  <v-card class="home">
    <v-toolbar color="green" dense>

      <v-toolbar-title style="color:white">
        {{ viewMode }}
        <span class="v-toolbar__title" style="color:white" v-if="periodDescription !== ''">{{ ` ${periodDescription}` }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <ExpandExport :expand="expand" />

    </v-toolbar>
    <div style="padding:10px;height:100vh">
      <NestGrid
        id="SABGridMain"
        ref="refSABGridMain"
        :fields="fields"
        :show-child-header="false"
        :footer-variance-mode="false"
        :field-width-calc="colwidthCalc"
        :text-offset-level="offsetLevel"
        :dataAPI="dataAPI"
        :auto-expand="expand"
      />
    </div>
  </v-card>
</template>
<style scoped>

</style>
<style>
#SABGridMain {
    max-width: 1485px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
}
#SABGridMain {
  max-height: calc(100vh - 160px);
  /* height: calc(100vh - 160px); */
}
#SABGridMain .table.b-table > thead > tr > th:nth-child(7),
#SABGridMain .table.b-table > tbody > tr > td:nth-child(7),
#SABGridMain .table.b-table > tfoot > tr > th:nth-child(7),
#SABGridMain .table.b-table > thead > tr > th:nth-child(9),
#SABGridMain .table.b-table > tbody > tr > td:nth-child(9),
#SABGridMain .table.b-table > tfoot > tr > th:nth-child(9){
  background-color: #eee;
}
</style>
<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';
import reportEntry from '../../mixin/report-entry.js'

// SABGrid1: () => import('../../components/StartAtBusiness/SABGrid1.vue'),

export default {
  name: 'StartAtBusiness',
  components: {
    NestGrid: () => import('../../components/NestedGrids/NestedGridCompare.vue'),
    ExpandExport: () => import('../../components/General/ExpandExport.vue')
  },
  mixins: [mixin, reportEntry],
  data: () => ({
    expand: false,
    dataAPI: '/startatbusiness/1/1',
    offsetLevel: 5,
    SABMode: true,
    items: []
  }),
  methods: {
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '300px' : key === 'actions' ? '32px' : '70px',
      };
    },
    exportReport(level){
      this.$http.post(`setup/export/`, this.periodFilters)
        .then((response) => {
          //console.log(response)
          window.open(`${this.$http.defaults.baseURL}Webpages/Export/Reports.aspx?level=${level}&name=Business-To-Site`, '_blank');
        })
        .catch((error) => {
        // handle error
          console.warn(error);
        })
        .then(() => {
        });
    },
    handleViewChange() {
      // console.log('handleViewChange', this.$nextTick)
      this.SABMode = !this.SABMode;
      this.dataAPI = this.SABMode ? '/startatbusiness' : '/startatsite';
      this.offsetLevel = this.SABMode ? 5 : 2;

      this.fields = this.SABMode ? this.$store.getters.getSABFields : this.$store.getters.getSASFields;

      const _this = this;
      this.$nextTick(() => {
        // console.log('the next tick')
        _this.$refs.refSABGridMain.refreshData();
      });
      // this.$refs.refSABGridMain.refreshData()
    },
    toggleExpand() {
      this.expand = !this.expand;
      this.$refs.refSABGridMain.refreshData();
    },
    updateTable() {
      if (this.$refs.refSABGridMain) this.$refs.refSABGridMain.refreshData();
    },
    Handle_DefBacklog_Click(row, level) {
      console.log('Handle_DefBacklog_Click', row, level)
      var info = {
        startAtSite: false,
        level: level,
        key: parseInt(row.item._key),
        mainInfo: row.item,
        weeklyMode: false
      }
      this.$eventHub.$emit('invoke-deferred-backlog-dialog', info)
    },
  },
  computed: {
    ...mapGetters({
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters',
      autoDrill: 'getAutoExpand',
    }),
    fields: {
      get() {
        return this.SABMode ? this.$store.getters.getSABFields : this.$store.getters.getSASFields;
      },
      set(value) {

      },
    },
    viewMode() {
      // console.log('change viewMode')
      return this.SABMode ? 'Business To Site' : 'Site To Product Family';
    },
  },
  mounted() {
    //console.log(this.$http.defaults.baseURL, 'test')
    this.$eventHub.$on('period-changed', this.updateTable)
    this.$eventHub.$on('toggle-expand', this.toggleExpand)    
    this.$eventHub.$on('refresh', this.updateTable)
    this.$eventHub.$on('deferred-backlog-clicked', this.Handle_DefBacklog_Click);
    this.configurePeriodDialog([1, 2, 3, 4], true);
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
