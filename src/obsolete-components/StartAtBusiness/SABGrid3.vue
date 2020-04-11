<template>
  <div>
    <b-table
      ref="thisTable"
      show-empty
      fixed
      :items="items"
      :fields="fields"
      :busy="isBusy"
      thead-tr-class="d-none"
      foot-clone
      tfoot-class="foot-class"
      class="fixed-rowheader"
      >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template v-slot:table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="colwidthCalc(field.key)"
        >
      </template>

      <!-- <template v-slot:cell(actions)="row">
        <v-btn icon small @click="row.toggleDetails" max-width="24px" max-height="24px">
          <v-icon small v-if="!row.detailsShowing">mdi-chevron-right</v-icon>
          <v-icon small v-else>mdi-chevron-down</v-icon>
        </v-btn>
      </template> -->

      <template v-slot:cell(col1)="row">
        <div @click="row.toggleDetails" class="row-header">
          <v-icon>{{ row.detailsShowing ? 'mdi-chevron-down' : 'mdi-chevron-right'}}</v-icon>
          {{ row.value }}
        </div>
      </template>

      <template v-slot:cell()="row">
        <span>{{ formatNumber(row.value) }}</span>
      </template>

      <template v-slot:head(actions)="row">
        <span class="text-info"></span>
      </template>

      <template v-slot:row-details="row">
        <SABGrid4 class="grid4"/>
      </template>

      <!-- Footer templates -->
      <template v-slot:foot(actions)="data">
        <span class="text-danger"></span>
      </template>

      <template v-slot:foot(col1)="data">
        <span class="footer-total">Total</span>
      </template>

      <template v-slot:foot(Currency)="data">
        <span class="text-danger"></span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template v-slot:foot()="data">
        <span>{{ calcItems(data.column) }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';
import nestedgridfx from '../../mixin/nested-table-functions.js';

export default {
  name: 'SABGrid3',
  mixins: [mixin, nestedgridfx],
  components: {
    SABGrid4: () => import('./SABGrid4.vue'),
  },
  props: {
    fields: Array,
  },
  data: () => ({
    isBusy: false,
    items: [
      {
        id: 1,
        col1: 'IR Sensing',
        Currency: 'USD',
        actSales: 3,
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
      {
        id: 2,
        col1: 'Photon Detection',
        Currency: 'USD',
        actSales: 5,
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
  computed: {
    ...mapGetters({
      fields1: 'getSABFields',
      autoDrill: 'getAutoExpand',
    }),
  },
  mounted() {
    if (this.autoDrill) {
      this.collapseExpand();
    }
  },
  beforeDestroy() {
    // console.log("SABGrdi3 before Destroy");
  },
};
</script>
