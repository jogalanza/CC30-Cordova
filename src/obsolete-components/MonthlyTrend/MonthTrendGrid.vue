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
        <div class="row-header">
          {{ row.value }}
        </div>
      </template>

      <template v-slot:cell(q1)="row">
        <span>{{ calcQuarter(row, 1) }}</span>
      </template>

      <template v-slot:cell(q2)="row">
        <span>{{ calcQuarter(row, 2) }}</span>
      </template>

      <template v-slot:cell(q3)="row">
        <span>{{ calcQuarter(row, 3) }}</span>
      </template>

      <template v-slot:cell(q4)="row">
        <span>{{ calcQuarter(row, 4) }}</span>
      </template>

      <template v-slot:cell(total)="row">
        <span>{{ calcRowTotal(row) }}</span>
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
import mtmixin from './mt-mixin.js';

export default {
  name: 'MonthTrendGrid',
  mixins: [mixin, nestedgridfx, mtmixin],
  components: {
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
        jan: 100,
        feb: 500,
        mar: 23555,
        apr: 3452,
        may: 123,
        jun: 123,
        jul: 123,
        aug: 123,
        sep: 123,
        oct: 123,
        nov: 123,
        dec: 123,
        q1: 5,
        q2: null,
        q3: null,
        q4: null,
        total: null,
      },
      {
        id: 2,
        col1: 'Lighting',
        jan: 2,
        feb: 2,
        mar: 2,
        apr: 2,
        may: 2,
        jun: 2,
        jul: 2,
        aug: 2,
        sep: 2,
        oct: 2,
        nov: 2,
        dec: 2,
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        total: null,
      },
    ],
  }),
  methods: {
    checkToggle(row, e) {
      console.log(row, e);
      row.toggleDetails();
    },
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '250px' : key === 'actions' ? '32px' : '70px',
      };
    },
  },
  computed: {
    ...mapGetters({
      fields1: 'getMonthlyTrendFields',
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
