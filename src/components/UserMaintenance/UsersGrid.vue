<template>
  <div class="users-grid" style="height:100vh">
    <b-table
      show-empty
      fixed
      sticky-header="calc(100vh - 260px)"
      striped
      :select-mode="selectMode ? 'multi' : 'single'"
      responsive
      :items="items"
      :fields="fields"
      :filter="filter"
      :filterIncludedFields="filterOn"
      per-page="10"
      thead-class="head-class"
      tbody-tr-class="row-class"
      tfoot-class="foot-class"
      @filtered="onFiltered"
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

       <!-- <template slot="top-row" slot-scope="{ fields }">
        <td v-for="field in fields" :key="field.key" style="padding:2px">
          <b-form-input v-if="field.key !=='action'" :placeholder="field.label" style="text-align:left;font-size:0.8rem"></b-form-input>
        </td>
      </template> -->

      <!-- <template v-slot:thead-top="data">
        <b-tr>
          <b-td colspan="100%">
             <div style="width:100%;min-width:100%;padding:4px;background:yellow;display:flex">
          <v-spacer />
           <v-text-field
              v-model="filter"
              dense
              outlined
              hide-details
              clearable
              prepend-inner-icon="mdi-magnify"
              label="Search"
              style="margin-right:10px;width:200px"
            />

            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              size="md"
              class="my-0"
            ></b-pagination>
        </div>
          </b-td>
        </b-tr>


      </template> -->

      <template v-slot:head(selector)="row">
        <v-checkbox hide-details
        ></v-checkbox>

      </template>

      <template v-slot:cell(col1)="row">
        <div class="row-header">
          <span>{{ row.value }}</span>
        </div>
      </template>

      <template v-slot:cell(selector)="row">
        <v-checkbox :value="row.index"
        ></v-checkbox>

      </template>

      <template v-slot:cell(action)="row">
        <div style="text-align:center">
            <v-btn icon small color="primary">
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
          <v-btn icon small color="warning">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </div>

      </template>

     <template v-slot:cell(siteAccess)="row">
        <span v-if="[1,2].indexOf(row.item.roleId) > -1">All</span>
        <div v-else-if="row.item.siteAccess" style="display:inline-block">
          <v-chip v-for="(site, index) in row.item.siteAccess" :key="index" color="primary" x-small style="margin:2px;float:left">
            {{ site.siteName }}
          </v-chip>
        </div>
      </template>

      <template v-slot:cell(productAccess)="row">
        <span v-if="[1,2].indexOf(row.item.roleId) > -1">All</span>
        <div v-else-if="row.item.productAccess" style="display:inline-block">
          <v-chip v-for="(product, index) in row.item.productAccess" :key="index" color="primary" x-small style="margin:2px">
            {{ product.productFamilyName }}
          </v-chip>
        </div>
      </template>

      <template v-slot:cell()="row">
        <span>{{ row.value }}</span>
      </template>

      <template v-slot:head(actions)="row">
        <span class="text-info"></span>
      </template>

      <!-- Footer templates -->
      <template v-slot:foot(actions)="data">
        <span class="text-danger"></span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template v-slot:foot()="data">
        <!-- <span>{{ calcItems(data.column) }}</span> -->
        <span class=sr-only></span>
      </template>
    </b-table>
  </div>
</template>

<style>
/* .users-grid .table.b-table > tbody > .table-active, .table.b-table > tbody > .table-active > th,
.users-grid .table.b-table > tbody > .table-active > td {
    background-color: lightseagreen;
} */
.users-grid thead > tr > th{
  text-transform: uppercase;
}
.users-grid .table.b-table > tbody > .table-active > td:nth-child(1) {
    border-left: 5px solid red;
}
.users-grid
  .v-text-field.v-text-field--solo
  .v-input__control
  input {
  /* background-color: #eee; */
  text-align: center;
  max-height: 100%;
  font-size: 0.9rem;
  /* font-weight: bold; */
}


.users-grid .v-text-field.v-text-field--solo .v-input__append-inner {
  display: none;
}
.users-grid .v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
    min-height: 25px;
    height: 18px;
}
.users-grid.v-text-field--outlined{
    border-radius: 0px;
}
.users-grid
  .v-text-field.v-text-field--solo
  .v-input__control
  input {
  /* background-color: #eee; */
  text-align: center;
  max-height: 100%;
  font-size: 0.8rem;
  /* font-weight: bold; */
}
.users-grid .v-text-field.v-text-field--solo .v-label,
.users-grid .v-select__selection--comma {
  font-size: 0.8rem;
  text-align: center;
  width: 100%;
}
.users-grid .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot,
.users-grid .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 0px;
}
.users-grid .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
    background-color: transparent;
}
</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';

export default {
  name: 'UsersGrid',
  mixins: [mixin],
  props: {
    filter: String,
    readOnly: {
      type: Boolean,
      default: true,
    },
    selectMode: {
      type: Boolean,
      default: false,
    },
    fields: {
      type: Array,
    },
    items: {
      type: Array,
    },
  },
  components: {

  },
  watch: {
    selectMode: (newVal, oldVal) => {
      console.log(newVal, oldVal);
    },
  },
  data: () => ({
    totalRows: 1,
    currentPage: 1,
    perPage: 1,
    pageOptions: [1, 5, 10, 15],
    defCount: null,
    filterOn: [
      'username',
      'name',
      'siteAccess',
      'productAccess',
      'acctType',
    ],
    items1: [],
  }),
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      // console.log(filteredItems);
      if (this.filter) {
        this.defCount = this.calcItemsPlus('defBacklog', filteredItems);
      } else {
        this.defCount = this.calcItems('defBacklog');
      }
      // this.totalRows = filteredItems.length
      // this.currentPage = 1
    },
    colwidthCalc(key) {
      return {
        width: key === 'username' ? '100px'
          : key === 'name' ? '200px'
            : key === 'acctType' ? '60px'
              : key === 'action' ? '90px'
                : key === 'selector' ? '50px'
                  : '100%',
      };
    },
    refreshData() {
      const _this = this;
      this.$http.post('admin/getusers')
        .then((response) => {
          _this.items = [...response.data.result];
        })
        .catch((error) => {
          console.warn(error);
        });
    },
  },
  computed: {
    ...mapGetters({
      fields1: 'getUserMaintenanceFields',
    }),
  },
  updated() {
    console.log('backloggrid updated');
  },
  mounted() {
    console.log('backloggrid mounted');
    this.defCount = this.calcItems('defBacklog');
    // this.refreshData()
  },
};
</script>
