<template>
  <div class="defbacklog-entry-grid" style="height:100vh">
    <div style="padding: 5px 0px">
      <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn small v-on="on" @click="addNewRow" class="add-row-btn">
                <v-icon small color="green">mdi-plus</v-icon>
                New Row
              </v-btn>
            </template>
            <span>Add New Row Entry</span>
          </v-tooltip>
    </div>
    <b-table
      show-empty
      fixed
      :sticky-header="readOnly ? 'calc(100vh - 120px)' : 'calc(100vh - 145px)'"
      small
      selectable
      select-mode="single"
      responsive
      :items="items"
      :fields="fields"
      :filter="filter"
      :filterIncludedFields="filterOn"
      thead-class="head-class"
      tbody-tr-class="row-class"
      tfoot-class="foot-class"
      :style="readOnly ? 'height:calc(100vh - 120px)' : 'height:calc(100vh - 145px)'"
      class="fixed-rowheader"
      @filtered="onFiltered"
      @row-clicked="rowClicked"
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

      <template v-slot:cell(actions)="row">
        <div class="row-header">
          <b-form-checkbox v-model="selected" :value="row.index" />
        </div>
      </template>

      <template v-slot:cell(siteid)="row">
        <v-select v-if="row.rowSelected"
          :class="!row.value ? 'required-field' : ''"
          v-model="row.item.siteid"
          @change="siteChanged(row)"
          :items="sites"
          label="Choose a Site"
          item-text="siteName"
          item-value="siteid"
          solo
          hide-details
          dense
          flat
          return-object
        ></v-select>
        <span v-else>{{ row.value }}</span>
      </template>

      <template v-slot:cell(productid)="row">
        <v-select v-if="row.rowSelected"
          :class="!row.value ? 'required-field' : ''"
          v-model="row.item.productid"
          :items="row.item.products"
          label="Choose a Product"
          item-text="name"
          item-value="productid"
          solo
          hide-details
          dense
          flat
        ></v-select>
        <span v-else>{{ row.value }}</span>
      </template>

      <template v-slot:cell(year)="row">
        <v-select v-if="row.rowSelected"
          :class="!row.value ? 'required-field' : ''"
          v-model="row.item.year"
          :items="yearOpt"
          label="Year"
          item-text="siteName"
          item-value="siteid"
          solo
          hide-details
          dense
          flat
        ></v-select>
        <span v-else>{{ row.value }}</span>
      </template>

      <template v-slot:cell(month)="row">
        <v-select v-if="row.rowSelected"
          :class="!row.value ? 'required-field' : ''"
          v-model="row.item.month"
          :items="months"
          label="Month"
          item-text="name"
          item-value="index"
          solo
          hide-details
          dense
          flat
        ></v-select>
        <span v-else>{{ row.value }}</span>
      </template>

      <template v-slot:cell(defBacklog)="row">
        <v-text-field v-if="row.rowSelected"
          type="number"
          flat
          solo
          single-line
          dense
          hide-details
          v-model="row.item.defBacklog"
          class="input-fields"
          :class="!row.value ? 'required-field' : ''"
          @change="defCountChanged"
        ></v-text-field>
        <span v-else>{{ row.value }}</span>
      </template>

      <template v-slot:cell(poNo)="row">
        <v-text-field v-if="row.rowSelected"
          flat
          solo
          single-line
          dense
          hide-details
          v-model="row.item.poNo"
          class="input-fields"
        ></v-text-field>
        <span v-else>{{ row.value }}</span>
      </template>

      <template v-slot:cell(partNo)="row">
        <v-text-field v-if="row.rowSelected"
          flat
          solo
          single-line
          dense
          hide-details
          v-model="row.item.partNo"
          class="input-fields"
        ></v-text-field>
        <span v-else>{{ row.value }}</span>
      </template>

      <template v-slot:cell(comments)="row">
        <v-text-field v-if="row.rowSelected"
          flat
          solo
          single-line
          dense
          hide-details
          v-model="row.item.comments"
          class="input-fields"
        ></v-text-field>
        <span v-else>{{ row.value }}</span>
      </template>

      <template v-slot:cell(reason)="row">
        <v-text-field v-if="row.rowSelected" flat solo dense hide-details v-model="row.item.reason" class="input-fields"></v-text-field>

        <span v-else>{{ row.value }}</span>
      </template>

      <template v-slot:cell(customerName)="row">
        <v-text-field v-if="row.rowSelected"
          flat
          solo
          single-line
          dense
          hide-details
          v-model="row.item.customerName"
          class="input-fields"
        ></v-text-field>
        <span v-else>{{ row.value }}</span>
      </template>

      <template v-slot:cell(partDescription)="row">
        <v-text-field v-if="row.rowSelected"
          flat
          solo
          single-line
          dense
          hide-details
          v-model="row.item.partDescription"
          class="input-fields"
        ></v-text-field>
        <span v-else>{{ row.value }}</span>
      </template>

      <template v-slot:cell()="row">
        <span>{{ row.value }}</span>
      </template>

      <template v-slot:head(actions)="row">
        <span class="text-info"></span>
      </template>

      <template v-slot:head(defBacklog)="row">
        <div>{{ row.label }}</div>
        <!-- <div
          v-if="Number(defCount) !== 0"
          style="color:blue;font-size:0.8rem"
        >{{ `Total: ${defCount}`}}</div> -->
      </template>

      <!-- Footer templates -->
      <template v-slot:foot(actions)="data">
        <div class="row-header">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn small v-on="on" @click="addNewRow" class="add-row-btn">
                <v-icon small color="green">mdi-plus</v-icon>
                New Row
              </v-btn>
            </template>
            <span>Add New Row Entry</span>
          </v-tooltip>
        </div>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template v-slot:foot()="data">
        <!-- <span>{{ calcItems(data.column) }}</span> -->
        <span></span>
      </template>
    </b-table>
  </div>
</template>

<style>
.defbacklog-entry-grid tr.row-class > td:has(.require-field) {
    background-color: red;
}
.defbacklog-entry-grid .head-class {
    font-size: 0.8rem;
}
.defbacklog-entry-grid .foot-class {
    background-color: #eee;
}

.defbacklog-entry-grid .b-table-sticky-header > .table.b-table > thead > tr > th,
.defbacklog-entry-grid tr.row-class > td {
  border: 1px solid #ddd;
  padding: 0px;
}
.defbacklog-entry-grid .b-table-sticky-header > .table.b-table > thead > tr > th{
  background-color: #ddd;
}
.defbacklog-entry-grid .fixed-rowheader > .table.b-table > thead > tr > th:nth-child(1),
.defbacklog-entry-grid tr.row-class > td:nth-child(1) {
  background-color: #eee;
  z-index: 5;
}
.add-row-btn .table.b-table .foot-class span {
    font-size: 0.6rem;
    font-weight: bold;
}

/* non-grid styles */
.defbacklog-entry-grid .required-field {
  /* padding: 0px 0px 0.5px 0px !important;
  background-color: red; */
  border-radius: 0px;
  border-bottom: 1px solid red;
}
.defbacklog-entry-grid .v-text-field.v-text-field--solo .v-input__append-inner {
  display: none;
}
.defbacklog-entry-grid .v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
    min-height: 25px;
    height: 18px;
}
.defbacklog-entry-grid.v-text-field--outlined{
    border-radius: 0px;
}
.defbacklog-entry-grid
  .v-text-field.v-text-field--solo
  .v-input__control
  input {
  /* background-color: #eee; */
  text-align: center;
  max-height: 100%;
  font-size: 0.8rem;
  /* font-weight: bold; */
}
.defbacklog-entry-grid .v-text-field.v-text-field--solo .v-label,
.defbacklog-entry-grid .v-select__selection--comma {
  font-size: 0.8rem;
  text-align: center;
  width: 100%;
}
.defbacklog-entry-grid .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot,
.defbacklog-entry-grid .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 0px;
}
.defbacklog-entry-grid .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
    background-color: transparent;
}
</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';

export default {
  name: 'DefBacklogEntryGrid',
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
  },
  components: {},
  watch: {
    selectMode: (newVal, oldVal) => {
      console.log(newVal, oldVal);
    },
  },
  data: () => ({
    selected: [],
    defCount: null,
    yearOpt: [],
    monthOpt: [],
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
    items2: jdata,
    items: [
      {
        id: 1,
        col1: 'Commercial',
        siteid: null,
        productid: null,
        year: null,
        month: null,
        businessLine: 'Detection',
        productLine: 'IR Sensing',
        productFamily: 'Pyroelectric Sensors',
        site: 'ESG',
        defBacklog: 123,
        poNo: 123,
        partNo: 123,
        comments: 'sample comment',
        reason: 'No reason at all',
        customerName: 'the customer',
        partDescription: 'sample part description',
        products: [
          {
            productid: 1,
            name: 'Pyroelectric Sensors',
            sbu: 'Commercial',
            biz: 'Detection',
            line: 'IR Sensing',
          },
          {
            productid: 2,
            name: 'Thermopile',
            sbu: 'Commercial',
            biz: 'Detection',
            line: 'IR Sensing',
          },
        ],
      },
      {
        id: 1,
        col1: 'Commercial',
        siteid: null,
        productid: null,
        year: null,
        month: null,
        businessLine: 'Detection',
        productLine: 'IR Sensing',
        productFamily: 'Pyroelectric Sensors',
        site: 'ESG',
        defBacklog: 123,
        poNo: 123,
        partNo: 123,
        comments: 'sample comment',
        reason: 'No reason at all',
        customerName: 'the customer',
        partDescription: 'sample part description',
        products: [
          {
            productid: 1,
            name: 'Pyroelectric Sensors',
            sbu: 'Commercial',
            biz: 'Detection',
            line: 'IR Sensing',
          },
          {
            productid: 2,
            name: 'Thermopile',
            sbu: 'Commercial',
            biz: 'Detection',
            line: 'IR Sensing',
          },
        ],
      },
    ],
  }),
  methods: {
    rowClicked(e, x, y) {
      console.log('rowClicked', e, x, y);
    },
    newEntryObj() {
      const x = {
        id: null,
        siteid: null,
        productid: null,
        year: null,
        month: null,
        col1: 'Commercial',
        businessLine: 'Detection',
        productLine: 'IR Sensing',
        productFamily: 'Pyroelectric Sensors',
        site: 'ESG',
        defBacklog: 0,
        poNo: null,
        partNo: null,
        comments: '',
        reason: '',
        customerName: '',
        partDescription: '',
        products: [],
      };

      return x;
    },
    addNewRow() {
      this.items.push(this.newEntryObj());
      // this.items.splice(0, 0, this.newEntryObj());
    },
    removeRow(row) {
      console.log(row);
      if (row.index >= 0) {
        this.items.splice(row.index, 1);
      }
    },
    siteChanged(row) {
      console.log(row);
      if (row.item.products.length == 0) {
        row.item.products.push('test prod1');
        row.item.products.push('test prod2');
      }
    },
    defCountChanged() {
      this.defCount = this.calcItems('defBacklog');
    },
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
        width:
          key === 'col1'
            ? '100px'
            : key === 'comments'
              || key === 'customerName'
              || key === 'reason'
              || key === 'partDescription'
              ? '150px'
              : key === 'month' || key === 'year'
                ? '70px'
                : key === 'defBacklog'
                  ? '130px'
                  : key === 'productid'
                    ? '160px'
                    : key === 'siteid'
                      ? '120px'
                      : key === 'actions'
                        ? '40px'
                        : '80px',
      };
    },
  },
  computed: {
    ...mapGetters({
      fields: 'getBackLogEntryFields',
      sites: 'getSites',
      months: 'getMonths',
    }),
  },
  updated() {
    console.log('backloggrid updated');
  },
  mounted() {
    console.log('backloggrid mounted');
    this.defCount = this.calcItems('defBacklog');
    const x = new Date();
    const y = x.getFullYear();
    const z = [];

    for (let i = 2017; i < (y + 2); i++) {
      z.push(i);
    }
    this.yearOpt = z;
  },
};
</script>
