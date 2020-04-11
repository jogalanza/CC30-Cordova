<template>
  <div class="sales-target-grid">
    <b-table
      show-empty
      fixed
      small
      striped
      :items="items"
      :fields="fields"
      thead-class="d-none"
      tbody-tr-class="row-class"
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
        <col v-for="field in scope.fields" :key="field.key" :style="colwidthCalc(field.key)" />
      </template>

      <template v-slot:cell(col1)="row">
        <div class="row-header">{{ row.value }}</div>
      </template>

      <!-- <template v-slot:cell()="row">
        <span>{{ formatNumber(row.value) }}</span>
      </template>-->

      <template v-slot:cell(actions)="row">
        <span></span>
      </template>

      <!-- Bind individual month data to v-text-fields -->

      <template v-slot:cell(entryForm)="row">
        <SalesTargetEntryGrid :show-headers="true" class="grid3" />
      </template>

      <!-- end of text-field binding -->

      <template v-slot:head(actions)="row">
        <span class="text-info"></span>
      </template>

      <!-- Footer templates -->
      <template v-slot:foot(actions)="data">
        <span class="text-danger"></span>
      </template>

      <template v-slot:foot(col1)="data">
        <span class="text-danger">Total</span>
      </template>

      <template v-slot:foot(defBacklog)="data">
        <!-- <span>{{ calcItems(data.column) }}</span> -->
        <span>{{ defCount }}</span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template v-slot:foot()="data">
        <!-- <span>{{ calcItems(data.column) }}</span> -->
        <span class="sr-only"></span>
      </template>
    </b-table>
  </div>
</template>

<style>
.sales-target-grid
  .v-text-field.v-text-field--solo
  .v-input__control
  input {
  /* background-color: #eee; */
  text-align: center;
  max-height: 100%;
  font-size: 0.9rem;
  /* font-weight: bold; */
}
.sales-target-grid
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.sales-target-grid
  .v-text-field.v-text-field--enclosed
  .v-text-field__details {
  padding: 1px 0px 0px 1px;
  padding: 0px 0px 0px 8px;
}
.sales-target-grid tr.row-class > td {
  padding: 0px;
}
.sales-target-grid tr.row-class > td:nth-child(1) {
  background-color: #ddd;
  /* background-color: orange; */
}

/* .sales-target-grid tr.row-class > td {
  border: 1px solid #eee;
} */
.sales-target-grid
  .v-text-field.v-text-field--enclosed.v-text-field--single-line
  .v-text-field__prefix,
.sales-target-grid
  .v-text-field.v-text-field--enclosed.v-text-field--single-line
  .v-text-field__suffix {
  font-size: 0.8rem;
  color: #444;
}
</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';

export default {
  name: 'SalesTargetGrid',
  mixins: [mixin],
  props: {
    showHeaders: {
      type: Boolean,
      default: true,
    },
    filter: String,
    Currency: {
      type: String,
      default: '',
    },
    siteinfo: {
      type: Object,
      default: null,
    },
  },
  components: {
    SalesTargetEntryGrid: () => import('./SalesTargetEntryGrid.vue'),
  },
  data: () => ({
    defCount: null,
    filterOn: [
      'site',
      'businessLine',
      'productLine',
      'productFamily',
      'poNo',
      'partNo',
      'comments',
      'reason',
      'customerName',
      'partDescription',
    ],
    fields: [
      { key: 'col1', label: '' },
      { key: 'entryForm', label: '' },
    ],
    items: [
      {
        id: 1,
        col1: 'Prod Fam 1',
        jan: 1,
        feb: 2,
        mar: 3,
        apr: 4,
        may: 5,
        jun: 6,
        jul: 7,
        aug: 8,
        sep: 9,
        oct: 10,
        nov: 11,
        dec: 12,
      },
      {
        id: 1,
        col1: 'Commercial',
        jan: 1,
        feb: 2,
        mar: 3,
        apr: 4,
        may: 5,
        jun: 6,
        jul: 7,
        aug: 8,
        sep: 9,
        oct: 10,
        nov: 11,
        dec: 12,
      },
    ],
  }),
  methods: {
    saveEntries() {
      console.log('saving entries');
    },
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '150px'
          : (key === 'entryForm') ? '400px'
            : (key === 'actions') ? '40px'
              : (key === 'month') ? '80px'
                : '100px',
      };
    },
  },
  // watch:{
  //   filter: (newVal, oldVal) => {
  //     console.log(newVal, oldVal);
  //   }
  // },
  computed: {
    ...mapGetters({
      fields1: 'getBookForecastFields',
    }),
  },
  updated() {
    // console.log("BookingsForecastGrid updated");
  },
  mounted() {
    // console.log("BookingsForecastGrid mounted", this.siteinfo);
  },
  beforeDestroy() {
    // console.log("BookingsForecastGrid beforeDestroy");
  },
};
</script>
