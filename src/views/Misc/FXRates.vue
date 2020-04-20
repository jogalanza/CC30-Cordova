<template>
  <v-card class="fx-rates">
    <v-toolbar color="green">

      <v-toolbar-title style="color:white">FX Rates</v-toolbar-title>

      <v-spacer></v-spacer>


      <v-btn icon>
        <v-icon color="white">mdi-file-download</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="white">mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <div style="padding:10px;height:100vh">
      <NestedGridCompare id="fxrates-grid" ref="fxrates-grid"
        :items="items"
        :fields="fields"
        :field-width-calc="colwidthCalc"
        :show-child-header="false"
        :footer-variance-mode="false"
        :foot-clone="false"
        v-on:defbacklog-clicked="defbacklogClicked" />
    </div>
  </v-card>
</template>
<style scoped>

</style>
<style>
#fxrates-grid {
  max-height: calc(100vh - 144px);
  height: calc(100vh - 144px);
}
</style>
<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';

export default {
  name: 'FXRates',
  components: {
    NestedGridCompare: () => import('../../components/NestedGrids/NestedGridCompare.vue'),
  },
  mixins: [mixin],
  data: () => ({
    items: [
      {
        id: 1,
        col1: 'HFM 2020-02 Feb',
        Currency: 'USD',
        actSales: 500,
        BacklogCRD: 23555,
        ContractRelease: null,
        BookShip: 3452,
        DemandForecast: 123,
        defBacklog: -12000,
        SalesForecast: 123,
        Target: 123,
        lastQtr: 123,
        lastYr: 123,
        VSeq: 123,
        VYoy: 123,
        OrgVyoy: 123,
        actBookings: 123,
        BookingsForecast: 123,
        BookToBill: 123,
      },
      {
        id: 2,
        col1: 'HFM 2020-01 Jan',
        Currency: 'USD',
        actSales: 51000,
        BacklogCRD: 23555,
        ContractRelease: null,
        BookShip: 3452,
        DemandForecast: 123,
        defBacklog: 123,
        SalesForecast: 123,
        Target: 123,
        lastQtr: 123,
        lastYr: 123,
        VSeq: 123,
        VYoy: 123,
        OrgVyoy: 123,
        actBookings: 123,
        BookingsForecast: 123,
        BookToBill: 123,
      },
    ],
  }),
  methods: {
    defbacklogClicked(e, x) {
      console.log(e, x);
      this.$refs.backlogDialog.toggleDialog();
    },
    colwidthCalc(key) {
      // console.log('BusinessToSitePriorWeek.colwidthCalc')
      return {
        width: key === 'col1' ? '280px' : key === 'actions' ? '32px' : '100px',
      };
    },
  },
  computed: {
    ...mapGetters({
      fields: 'getFXRateFields',
    }),
  },
  mounted() {
    this.HidePeriodSelector()
  },
  beforeDestroy() {
  },
  updated() {
  },
};
</script>
