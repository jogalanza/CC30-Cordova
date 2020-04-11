<template>
  <v-card class="demand-actuals">
    <v-toolbar color="green" dense>
      <v-toolbar-title style="color:white">
        Demand Actuals and Forecast
        <span v-if="periodDescription !== ''">{{ ` : ${periodDescription} ${localCurrency ? '(Local Currency)' : ''}` }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <ExpandExport 
        :hide-export-level="true" 
        :hide-export-all="true" 
        :hide-save-all="false"
        :hide-currency="false"
        :local-currency="localCurrency"
        :expand="expand"
        />

    </v-toolbar>
    <div style="padding:10px;height:100vh;overflow-y:auto">
      
      <v-container style="padding-top:0px">
        <div class="table-data-notice">{{ dataNotice }}</div>
        <DataEntryNestedGridParent
          id='demandActualsNestGrid'
          ref='nestedGridParent'
          :fields="fields"
          :items="items"
          :local-currency="localCurrency"
          :field-width-calc="colwidthCalc"
        >
          <template v-slot:default="data">
              <EntryGridFormParent 
                :showHeaders="false" 
                :siteinfo="data.row.item" 
                :local-currency="localCurrency"
                :field-width-calc="colwidthCalc"
                class="grid2">
                  <template v-slot:default="props">
                      <DemandActualsEntryGrid 
                        :show-headers="true"
                        :items="props.row.item.data" 
                        :local-currency="localCurrency"
                        :field-width-calc="colwidthCalc"
                        class="grid3" />
                  </template>
              </EntryGridFormParent>
          </template>
        </DataEntryNestedGridParent>
      </v-container>


    </div>
  </v-card>
</template>
<style>
#demandActualsNestGrid {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
}
#demandActualsNestGrid{
  max-height: calc(100vh - 180px);
  /* height: calc(100vh - 170px); */
}
.demand-actuals .table-data-notice {
    max-width: 1200px;
}
.demand-actuals .fixed-rowheader > .table.b-table > tbody > tr > td.sticky-row{
  top:55px;
}
.demand-actuals .b-table-sticky-header > .table.b-table > thead > tr > th:nth-child(2) {
  z-index: 5 !important;
  left:160px;
}
.grid2 tr{
  border-bottom: 2px solid #ddd;
}
.grid3 tr {
  border-bottom: none
}

/* .grid2 tr:nth-child(even) > td{
  background-color: yellow !important;
}
.grid2 tr:nth-child(even) *{
  background-color: yellow !important;
}
.grid2 tr:nth-child(odd) *{
  background-color: red !important;
}
.grid2 tr:nth-child(odd) > td{
  background-color: white !important;
} */


/* .demand-actuals .b-table-sticky-header > .table.b-table > thead > tr > th:nth-child(3),
.demand-actuals .b-table-sticky-header > .table.b-table > thead > tr > th:nth-child(4),
.demand-actuals-entry-form tr.row-class > td:nth-child(2) .v-input__slot,
.demand-actuals-entry-form tr.row-class > td:nth-child(3) .v-input__slot,
.demand-actuals-entry-form tr.row-class > td:nth-child(3) > .cc-input.cc-input-disabled > .v-input__control > .v-input__slot > .v-text-field__slot,
.demand-actuals-entry-form tr.row-class > td:nth-child(3) > .cc-input.cc-input-disabled > .v-input__control > .v-input__slot > .v-text-field__slot > input,
.demand-actuals-entry-form tfoot > tr> th:nth-child(3) .v-input__slot,
.demand-actuals-entry-form tfoot > tr> th:nth-child(3) > .cc-input.cc-input-disabled > .v-input__control > .v-input__slot > .v-text-field__slot,
.demand-actuals-entry-form tfoot > tr> th:nth-child(3) > .cc-input.cc-input-disabled > .v-input__control > .v-input__slot > .v-text-field__slot > input{
  background-color: #ddd;
} */

/* .demand-actuals-entry-form tr.row-class > td:nth-child(3),
.demand-actuals-entry-form tfoot > tr> th:nth-child(3) {
  border-right: 2px dotted #777;
  padding-right: 2px;
} */
</style>
<script>
// @ is an alias to /src
import { mapGetters, mapState } from 'vuex';
import mixinDataEntry from '../../mixin/data-entry.js'

export default {
  name: 'DemandActuals',
  components: {
    DataEntryNestedGridParent: () => import('../../components/NestedGrids/DataEntryNestedGridParent.vue'),
    DemandActualsEntryGrid: () => import('../../components/DemandActuals/DemandActualsEntryGrid.vue'),
    EntryGridFormParent: () => import('../../components/General/EntryGridFormParent.vue'),
    ExpandExport: () => import('../../components/General/ExpandExport.vue')
  },
  mixins: [mixinDataEntry],
  data: () => ({
    expand: false,
    items: [
      {
        siteId: 1,
        col1: 'Asslar',
        products: [
          { productId: 1, productName: 'Optics' },
          { productId: 2, productName: 'Optics 2' },
          { productId: 3, productName: 'Optics 3' },
          { productId: 4, productName: 'Optics 4' },
        ],
      },
      {
        siteId: 2,
        col1: 'Batam',
        products: [
          { productId: 1, productName: 'New Product' },
          { productId: 2, productName: 'Product 2' },
          { productId: 3, productName: 'Product 3' },
          { productId: 4, productName: 'Product 4' },
        ],
      }
    ],
  }),
  computed: {
    ...mapGetters({
      fields: 'getDemandActualFields',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters'
    }),
    dataNotice: {
      get() { return this.$store.state.dataNotice; }
    }
  },
  methods: {
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '160px'
          : (key === 'entryForm') ? '900px'
            : (key === 'actions') ? '40px'
              : (key === 'MonthName') ? '90px'
                : '90px',
      };
    },
    ToggleExpand() {
      if (this.$refs.nestedGridParent) {
        this.expand = !this.expand
        this.$refs.nestedGridParent.collapseExpand(this.expand);
      }
    },
    GetDataEntrySites(){
      /**
       * Get site for the entry form. This will also extract the data API for the products for each site, which carries the monthly data
       */
        console.log('Data Entry mixin GetDataEntrySites')
        var _this  = this
        this.$http.post(`demandactuals/sites/${this.localCurrency}`, this.periodFilters)
          .then((response) => {
            console.log(response.data)
            if (response.data !== ''){
              _this.items = [...response.data.result]
            }
          })
          .catch((error) => {
            console.error(error)
          })
    },
  },
  mounted() {
    this.$eventHub.$on('toggle-expand', this.ToggleExpand)
    this.configurePeriodDialog([2], false);
    this.GetDataEntrySites()
  },
  beforeDestroy(){
    this.$eventHub.$off('toggle-expand', this.ToggleExpand)
  }
};
</script>
