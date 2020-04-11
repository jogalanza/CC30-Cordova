<template>
  <v-card id="sales-target">
    <v-toolbar color="green" dense>
      <v-toolbar-title style="color:white">
        Sales Target
        <span v-if="periodDescription !== ''">{{ ` : ${periodDescription} ${localCurrency ? '(Local Currency)' : ''}` }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <ExpandExport 
        :hide-export-level="true" 
        :hide-export-all="true" 
        :hide-save-all="false"
        :hide-currency="true"
        :local-currency="localCurrency"
        :expand="expand"
        />

    </v-toolbar>

    <div style="padding:10px;height:100vh;overflow-y:auto">

      <v-container style="padding-top:0px">
        <div class="table-data-notice">{{ dataNotice }}</div>
         <DataEntryNestedGridParent
          id='salesTargetNestGrid'
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
                      <SalesTargetEntryGrid 
                        :show-headers="true"
                        :items="props.row.item" 
                        :local-currency="localCurrency"
                        :field-width-calc="colwidthCalc"
                        class="grid3" />
                  </template>
              </EntryGridFormParent>
          </template>
        </DataEntryNestedGridParent>

        <!-- <SalesTargetNestGrid ref="stnestgrid" :showHeaders="false" /> -->
      </v-container>


    </div>
  </v-card>
</template>
<style>
#salesTargetNestGrid{
  max-width:860px;
  margin-left:auto;
  margin-right:auto;
  box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
  border-radius: 4px;
}
#salesTargetNestGrid{
  max-height: calc(100vh - 180px);
  /* height: calc(100vh - 170px); */
}
#sales-target .table-data-notice {
    max-width: 860px;
}
#sales-target .b-table-sticky-header > .table.b-table > thead > tr > th:nth-child(2) {
  z-index: 5 !important;
  left:160px;
}
</style>
<script>
import { mapGetters, mapState } from 'vuex';
import mixinDataEntry from '../../mixin/data-entry.js'

export default {
  name: 'SalesTarget',
  components: {
    SalesTargetEntryGrid: () => import('../../components/SalesTarget/SalesTargetEntryGrid.vue'),
    SalesTargetNestGrid: () => import('../../components/SalesTarget/SalesTargetNestGrid.vue'),
    DataEntryNestedGridParent: () => import('../../components/NestedGrids/DataEntryNestedGridParent.vue'),
    EntryGridFormParent: () => import('../../components/General/EntryGridFormParent.vue'),
    ExpandExport: () => import('../../components/General/ExpandExport.vue')
  },
  mixins: [mixinDataEntry],
  data: () => ({
    panel: [],
    items: [
      {
        siteId: 1,
        siteName: 'Asslar',
        products: [
          { productId: 1, productName: 'Optics' },
          { productId: 2, productName: 'Optics 2' },
          { productId: 3, productName: 'Optics 3' },
          { productId: 4, productName: 'Optics 4' },
        ],
      },
      {
        siteId: 2,
        siteName: 'Batam',
        products: [
          { productId: 1, productName: 'New Product' },
          { productId: 2, productName: 'Product 2' },
          { productId: 3, productName: 'Product 3' },
          { productId: 4, productName: 'Product 4' },
        ],
      },
      {
        siteId: 3,
        siteName: 'Manila',
        products: [
          { productId: 1, productName: 'New Product' },
          { productId: 2, productName: 'Product 2' },
          { productId: 3, productName: 'Product 3' },
          { productId: 4, productName: 'Product 4' },
        ],
      },
      {
        siteId: 4,
        siteName: 'Montreal',
        products: [
          { productId: 1, productName: 'New Product' },
          { productId: 2, productName: 'Product 2' },
          { productId: 3, productName: 'Product 3' },
          { productId: 4, productName: 'Product 4' },
        ],
      },
    ],
  }),
  computed: {
    ...mapGetters({
      fields: 'getSalesTargetFields',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters'
    }),
    dataNotice: {
      get() { return this.$store.state.dataNotice; }
    }
  },
  methods: {
    toggleExpCol() {
      if (this.$refs.bfnestgrid) {
        this.$refs.bfnestgrid.collapseExpand();
      }
    },
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '160px'
          : (key === 'entryForm') ? '420px'
            : (key === 'actions') ? '40px'
              : (key === 'MonthName') ? '100px'
                : '80px',
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
        this.$http.post(`salestraget/sites/${this.localCurrency}`, this.periodFilters)
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
    this.configurePeriodDialog([3], false);
    this.GetDataEntrySites()
  },
  beforeDestroy(){
    this.$eventHub.$off('toggle-expand', this.ToggleExpand)
  }
};
</script>
