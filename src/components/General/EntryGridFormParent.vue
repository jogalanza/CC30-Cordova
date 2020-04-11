<template>
  <div class="entry-grid-form-parent">
    <b-table
      show-empty
      :busy="loading"
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
          <b-spinner class="align-middle" style="margin-right:10px;width:20px;height:20px"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template v-slot:table-colgroup="scope">
        <col v-for="field in scope.fields" :key="field.key" :style="fieldWidthCalc(field.key)" />
      </template>

      <template v-slot:cell(col1)="row">
        <div class="row-header">{{ row.value }}</div>
      </template>

      <!-- Bind individual month data to v-text-fields -->

      <template v-slot:cell(entryForm)="row">
        <slot v-bind:row="row"></slot>
      </template>

      <!-- end of text-field binding -->

      <template v-slot:foot(col1)="data">
        <span class="text-danger">Total</span>
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
.entry-grid-form-parent .grid3 > .table.b-table.fixed-rowheader > tbody > tr > td:nth-child(1),
.entry-grid-form-parent .grid3 > .table.b-table.fixed-rowheader > tfoot > tr > th:nth-child(1){
  left: 160px;
  z-index: 1;
  background-color: #eee;
  vertical-align: middle;
}
.entry-grid-form-parent tr.row-class > td {
  padding: 0px;
}
.entry-grid-form-parent tr.row-class > td:nth-child(1) {
  background-color: #ddd;
  /* background-color: orange; */
  background-color: white;
}

/* .entry-grid-form-parent tr.row-class > td {
  border: 1px solid #eee;
} */

</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';

export default {
  name: 'EntryGridFormParent',
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
    localCurrency: {
      type:Boolean,
      default: false
    },
    fieldWidthCalc: {
      type: Function,
      default: (key) =>
        ({
          width: key === 'col1' ? '280px' : key === 'actions' ? '32px' : '70px',
        }),
    }
  },
  components: {
  },
  data: () => ({
    loading: false,
    fields: [
      { key: 'col1', label: '' },
      { key: 'entryForm', label: '' },
    ],
    items: [],
  }),
  methods: {
    GetDataEntries(){
      var _this = this
      this.loading = true
      //this.$http.post(`demandactuals/products/${this.siteinfo.siteId}/${this.localCurrency}`, this.periodFilters)
      this.$http.post(this.siteinfo.dataAPI, this.periodFilters)
        .then((response) => {
          if (response.data !== ''){
            //console.log('GetBookingsForecastEntries', response.data)
            _this.items = [...response.data.result]            
          }   
          _this.loading = false       
        })
        .catch((error) => {
          console.error(error)
        }).then(() =>{
          _this.loading = false
        })
    }
  },
  computed: {
    ...mapGetters({
      periodFilters: 'getPeriodFilters'
    }),
  },
  updated() {
  },
  mounted() {
    console.log("EntryGridFormParent mounted", this.siteinfo);
    this.GetDataEntries()
  },
  beforeDestroy() {
    console.log("EntryGridFormParent beforeDestroy");
  },
};
</script>
