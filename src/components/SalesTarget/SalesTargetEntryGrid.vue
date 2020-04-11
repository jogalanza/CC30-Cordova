<template>
  <div class="sales-target-entry-form">
    <b-table
      show-empty
      fixed
      :busy="loading"
      small
      :items="items2"
      :fields="fields"
      foot-clone
      :thead-class=" isStickySupported ? 'd-none' : 'head-class'"
      tbody-tr-class="row-class"
      tfoot-class="foot-class"
      class="fixed-rowheader"
    >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle" style="margin-right:10px;width:20px;height:20px"></b-spinner>
          <strong>{{ saving ? 'Saving...' : 'Loading...'}}</strong>
        </div>
      </template>
      <template v-slot:table-colgroup="scope">
        <col v-for="field in scope.fields" :key="field.key" :style="fieldWidthCalc(field.key)" />
      </template>

      <template v-slot:cell(MonthName)="row">
        <div class="month-label" style="text-align:center">{{ row.value }}</div>
      </template>

      <!-- Bind individual month data to v-text-fields -->

      <template v-slot:cell()="row">
        <v-text-field
          :prefix="localCurrency ? row.item.Symbol : '$'"
          :flat="false"
          solo
          single-line
          dense
          disabled
          hide-details
          :value="calcTarget(items[row.field.key]['SalesTarget'], row.index)"
          class="cc-input cc-input-disabled"
        ></v-text-field>
      </template>

      <template v-slot:head(actions)="row">
        <span class="text-info"></span>
      </template>

      <!-- Footer templates -->
      <template v-slot:foot(actions)="data">
        <span class="text-danger"></span>
      </template>

      <template v-slot:foot(MonthName)="data">
        <div class="month-label" style="text-align:center">Targets</div>
      </template>

      <template v-slot:foot()="data">
        <v-text-field
          type="number"
          :prefix="localCurrency ? row.item.Symbol : '$'"
          :flat="false"
          solo
          single-line
          dense
          hide-details
          :value="formatNumber(items[data.column]['SalesTarget'], false, 0, true)"
          class="cc-input"
          @change="valueChanged($event, data)"
        ></v-text-field>
      </template>
  
    </b-table>
  </div>
</template>

<style>
.sales-target-entry-form tr.row-class > td,
.sales-target-entry-form tfoot > tr > th {
  padding: 0px;
}
.sales-target-entry-form tr.row-class > td:nth-child(1) {
  background-color: #eee;
}

.sales-target-entry-form tr.row-class > td,
.sales-target-entry-form tfoot > tr > th {
  border: 1px solid #eee;
}
.sales-target-entry-form .footer-calcs{
  margin-left: 8px;
}

</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';

export default {
  name: 'SalesTargetEntryGrid',
  mixins: [mixin],
  props: {
    items: Object,
    showHeaders: {
      type: Boolean,
      default: true,
    },
    filter: String,
    Currency: {
      type: String,
      default: '$',
    },
    localCurrency: {
      type:Boolean,
      default: false
    },
    siteinfo: {
      type: Object,
      default: null,
    },
    fieldWidthCalc: {
      type: Function,
      default: (key) =>
        ({
          width: key === 'col1' ? '280px' : key === 'actions' ? '32px' : '70px',
        }),
    },
  },
  components: {},
  data: () => ({
    defCount: null,
    stickySupport: false,
    saving: false,
    loading: false,
    items2: [
      {
        MonthName: 'Month 1', Q1: '', Q2: '', Q3: '', Q4: '',
      },
      {
        MonthName: 'Month 2', Q1: '', Q2: '', Q3: '', Q4: '',
      },
      {
        MonthName: 'Month 3', Q1: '', Q2: '', Q3: '', Q4: '',
      },
    ],
    items1: {
      siteid: 1, productid: 1, Q1: 100, Q2: 200, Q3: 300, Q4: 400,
    },
  }),
  methods: {
    checkProp(data){
      console.log(data)
    },
    SaveEntries() {
      console.log('saving entries', this.items);
      if (this.dirty){
        var _this = this
        this.saving = true
        this.loading = true

        this.$http.post(`salestarget/save`, 
          { periodFilter: this.periodFilters, items: _this.items})
          .then((response) => {
            if (response.data !== ''){
              console.log(response.data)
              // if (response.data.result.payload){
              //   _this.items = [...response.data.result.payload]
              // }
            }
          })
          .catch((error) => { console.error(error) })
          .then(() => {
            _this.saving = false
            _this.loading = false
            _this.dirty = false
          })
      }  
    },
    calcTarget(target, month) {
      //console.log(target, month);

      if (target === 0 || target === null) {
        return 0;
      }
      var result = (month === 0 || month === 1) ? (parseFloat(target) || 0) * 0.3 : (parseFloat(target) || 0) * 0.4;
      return this.formatNumber(result, false, 0);
    },
    valueChanged(event, data){
      console.log(event, data)
      this.items[data.column]['SalesTarget'] = parseInt(event)  //i.e. integer values only
      this.dirty = true
    }
  },
  // watch:{
  //   filter: (newVal, oldVal) => {
  //     console.log(newVal, oldVal);
  //   }
  // },
  computed: {
    ...mapGetters({
      fields: 'getSalesTargetEntryFields',
    }),
  },
  updated() {
    // console.log("BookingsForecastGrid updated");
  },
  mounted() {
    console.log('BookingsForecastGrid mounted', this.isStickySupported());
    this.stickySupport = this.isStickySupported();
    this.$eventHub.$on('save-all', this.SaveEntries)
  },
  beforeDestroy() {
    // console.log("BookingsForecastGrid beforeDestroy");
    this.$eventHub.$off('save-all', this.SaveEntries)
  },
};
</script>
