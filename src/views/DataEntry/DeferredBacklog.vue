<template>
  <v-card class="deferred-backlog">
    <v-toolbar color="green" dense>
      <v-toolbar-title style="color:white">
        Deferred Backlog
        <span v-if="periodDescription !== ''">{{ ` : ${periodDescription} ${localCurrency ? '(Local Currency)' : ''}` }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-divider vertical></v-divider>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="addNewClicked">
            <v-icon>mdi-database-plus</v-icon>
          </v-btn>
        </template>
        <span>Add New Item</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-delete-alert</v-icon>
          </v-btn>
        </template>
        <span>Delete Selected Items</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </template>
        <span>Save Changes</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Refresh Data</span>
      </v-tooltip>

      <v-divider vertical></v-divider>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="selectMode = !selectMode">
            <v-icon>{{ selectMode ? 'mdi-checkbox-multiple-marked-outline' : 'mdi-checkbox-multiple-blank-outline'}}</v-icon>
          </v-btn>
        </template>
        <span>{{ selectMode ? 'Turn Off Multi-Select Mode' : 'Turn On Multi-Select Mode'}}</span>
      </v-tooltip>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-toolbar>
      <v-spacer />
      <v-text-field
        v-model="filter"
        dense
        outlined
        hide-details
        clearable
        prepend-inner-icon="mdi-magnify"
        label="Search"
        style="margin-right:10px"
      />

      <v-select
        dense
        :items="sites"
        v-model="activeSite"
        label="Sites"
        item-text="siteName"
        item-value="siteid"
        outlined
        hide-details
        style="margin-right:10px;width:10px;min-width:200px;max-width:200px"
      ></v-select>
    </v-toolbar>
    <div style="padding:10px;height:100vh;overflow-y:auto">
      <v-container style="padding-top:0px">
          <BackLogGrid 
            id="BackLogGrid"
            :read-only="readOnly" 
            :filter="filter" 
            :select-mode="selectMode" />
      </v-container>      
    </div>

    <BackLogEntry ref="backlogEntry" />
  </v-card>
</template>

<style>
#BackLogGrid {
    max-width: 1485px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
}
#BackLogGrid {
  max-height: calc(100vh - 230px);
  /* height: calc(100vh - 160px); */
}
.deferred-backlog
  .v-text-field.v-text-field--solo.v-input--dense
  > .v-input__control {
  min-height: 30px;
}
.deferred-backlog .theme--light.v-btn.v-btn--icon {
  color: white;
}
</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';

export default {
  name: 'DeferredBacklog',
  components: {
    BackLogGrid: () => import('../../components/BackLogDialog/BackLogGrid.vue'),
    BackLogEntry: () => import('../../components/DeferredBacklog/BackLogEntry.vue'),
  },
  data: () => ({
    localCurrency: false,
    activeSite: null,
    selectMode: false,
    readOnly: false,
    filter: null,
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
  methods: {
    addNewClicked(e, x) {
      console.log(e, x);
      this.$refs.backlogEntry.toggleDialog();
    },
    all() {
      this.panel = [...Array(this.items).keys()].map((k, i) => i);
    },
    none() {
      this.panel = [];
    },
  },
  computed: {
    ...mapGetters({
      sites: 'getSites',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters'
    }),
  },
  mounted() {
    this.configurePeriodDialog([2], false);
  },
};
</script>
