<template>
  <div class="defbacklog-entry-grid" style="height:100vh">
    <div style="padding: 5px 0px">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn small v-on="on" @click="addNewRow" class="add-row-btn">
            <v-icon small color="green">mdi-plus</v-icon>New Row
          </v-btn>
        </template>
        <span>Add New Row Entry</span>
      </v-tooltip>
    </div>

    <!-- <virtual-scroller :items="items" item-height="40" content-tag="ul">
      <template slot-scope="props">
        <li :key="props.itemKey">{{props.item.businessLine}}</li>
      </template>
    </virtual-scroller>-->
    <div id="vscroller-cont">
      <!-- <table>
        <tbody>
          <virtual-scroller
            class="scroller"
            :items="items"
            :item-height="40"
            key-field="id"
            container-tag="table"
            v-slot="{ item }"
          >
            <tr>
              <td>{{ item }}</td>
            </tr>
          </virtual-scroller>
        </tbody>
      </table>-->

      <virtual-scroller
        id="vscroller"
        :items="items"
        item-height="20"
        container-tag="b-table-simple"
        content-tag="b-tbody"
      >
        <b-thead slot="before-content">
          <b-tr>
            <b-th>Age</b-th>
            <b-th>Name</b-th>
            <b-th>Company</b-th>
          </b-tr>
        </b-thead>
        <template slot-scope="props">
          <b-tr :key="props.itemKey">
            <b-td>
              <v-text-field
                flat
                solo
                single-line
                dense
                hide-details
                v-model="props.item.site"
                class="input-fields"
              ></v-text-field>
            </b-td>
            <b-td>{{props.item.businessLine}}</b-td>
            <b-td>{{props.item.productLine}}</b-td>
          </b-tr>
        </template>
      </virtual-scroller>

      <!-- <RecycleScroller :items="items" :item-size="32" key-field="id" style="height:calc(100vh - 160px)">
      <template slot="before">
        <div :key="header" class="th" v-for="header in 20" style="width:40px">
          {{ `Col ${header}` }}
        </div>
      </template>
      <template slot-scope="{ item }">
        <div class="td">
          <v-text-field
          flat
          solo
          single-line
          dense
          hide-details
          v-model="item.site"
          class="input-fields"
        ></v-text-field>
        </div>
        <div class="td">
          <v-select
          v-model="item.businessLine"
          :items="sites"
          label="Choose a Site"
          item-text="siteName"
          item-value="siteid"
          solo
          hide-details
          dense
          flat
        ></v-select>
        </div>
        <div class="td">{{ item.productFamily }}</div>
      </template>
      </RecycleScroller>-->
    </div>
  </div>
</template>

<style>
.virtual-scroller .table.b-table > tbody > tr,
.virtual-scroller .table.b-table > tbody > tr > td {
  max-height: 20px;
}
.virtual-scroller .table.b-table > thead > tr > th {
  position: sticky;
  top: 0px;
  z-index: 5;
  background-color: #eee;
}
#vscroller {
  height: calc(100vh - 160px);
  overflow-y: auto;
}
/* .vue-recycle-scroller__slot{
  background-color: #eee;
  position: -webkit-sticky;
  position:sticky;
  top: 0px;
  z-index: 5;
  padding:5px;
}
.scroller {
  height: 100vh;
}
.vue-recycle-scroller__slot,
.vue-recycle-scroller__item-view {
  display: flex;
  width: 100%;
}
.td {
  flex: 1;
}
.th{
  display:inline-block;
}
.th{
  padding:5px;
}
.vue-recycle-scroller__slot .th:first-child,
.vue-recycle-scroller__item-view .td:first-child {
  flex: 2;
} */
</style>

<script>
// @ is an alias to /src
// import { RecycleScroller } from "vue-virtual-scroller";
// import VueVirtualScroller from "vue-virtual-scroller";
// import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
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
    defCount: null,
    headers: [
      'Site',
      'Business Line',
      'Company',
      'col4',
      'col4',
      'col4',
      'col4',
      'col4',
      'col4',
      'col4',
      'col4',
      'col4',
      'col4',
      'col4',
      'col4',
      'col4',
      'col4',
      'col4',
      'col4',
    ],
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
    items: jdata,
    items2: [
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
        id: 2,
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
    newEntryObj() {
      const r = `_${
        Math.random()
          .toString(36)
          .substr(2, 9)}`;

      const x = {
        _id: r,
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
        defBacklog: null,
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

    for (let i = 2017; i < y + 2; i++) {
      z.push(i);
    }
    this.yearOpt = z;
  },
};
</script>
