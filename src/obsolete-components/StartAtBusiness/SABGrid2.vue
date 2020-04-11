<template>
  <div>
    <b-table
      ref="thisTable"
      :busy="isBusy"
      show-empty
      fixed
      :items="items"
      :fields="fields"
      :thead-tr-class="!showHeaders ? 'd-none' : ''"
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
        <SABGrid3 :fields="fields" class="grid3"/>
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
  name: 'SABGrid2',
  mixins: [mixin, nestedgridfx],
  components: {
    SABGrid3: () => import('./SABGrid3.vue'),
  },
  props: {
    fields: Array,
    dataAPI: {
      type: String,
      default: '',
    },
    autoDrill: {
      type: Boolean,
      default: false,
    },
    showHeaders: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isBusy: false,
    items: [
      {
        id: 1,
        col1: 'Detection',
        Currency: 'USD',
        actSales: 10,
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
        col1: 'Lighting',
        Currency: 'USD',
        actSales: 30,
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
    checkToggle(row, e) {
      console.log(row, e);
      row.toggleDetails();
    },
  },
  computed: {
    ...mapGetters({
      fields1: 'getSABFields',
      autoDrill1: 'getAutoExpand',
    }),
  },
  mounted() {
    console.log(this.dataAPI);
    if (this.autoDrill) {
      this.collapseExpand();
    }
  },
};
</script>
