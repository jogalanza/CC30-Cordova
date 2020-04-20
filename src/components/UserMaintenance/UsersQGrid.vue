<template>
  <div class="users-grid" style="height:100vh">

    <q-table      
      class="my-sticky-header-table"      
      :data="items"
      :columns="fields"
      :loading="loading"
      row-key="userId"
      selection="multiple"
      :selected.sync="selected"
      virtual-scroll
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      style="overflow:hidden"
      :rows-per-page-options="[0]"
      :pagination="pagination"
      :hide-bottom="true"
      :sort-method="customSort"
      binary-state-sort
      @virtual-scroll="onScroll"
    >
    <!-- :pagination="pagination"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll" -->

       <template v-slot:header="props">
        <q-tr :props="props">
          <q-th style="width:40px">
              <v-checkbox :value="selected.length > 0" @click.stop="toggleSelectAll"
            ></v-checkbox>
          </q-th>
          

          <q-th
            v-for="col in props.cols"
            :key="col.key"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <!-- @click="rowClicked(props) -->
        <q-tr :props="props">
          <q-td key="userId">
              <v-checkbox v-model="props.selected"
            ></v-checkbox>
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            :style="colwidthCalc(col.name)"
          >
          <template v-if="col.name === 'siteAccess'">
            <div v-if="props.row.roleId > 2 && props.row.restriction === 1" style="display:inline-block;white-space:normal">
              <v-chip v-for="(site, index) in col.value" :key="index" color="primary" x-small style="margin:2px">
                {{ site.siteName }}
              </v-chip>
            </div>
          </template>
          <!-- <template v-else-if="col.name === 'name'">
            <div v-if="props.selected">
                <q-input v-model="items[props.row.index].name" />
            </div>
            <div v-else style="display:inline-block;white-space:normal">
              <v-chip>
                {{ col.value }}
              </v-chip>
            </div>
          </template> -->
          <template v-else-if="col.name === 'productAccess'">
            <div v-if="props.row.roleId > 2 && props.row.restriction === 2" style="display:inline-block;white-space:normal">
              <v-chip v-for="(product, index) in col.value" :key="index" color="primary" x-small style="margin:2px">
                {{ product.ProductFamily }}
              </v-chip>
            </div>
          </template>
          <template v-else-if="col.name === 'action'">
            <div style="text-align:center">
              <v-btn icon small color="primary" @click.stop="userEdit(props.row.userId)">
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-btn>
              <v-btn icon small color="warning" @click.stop="ConfirmDelete(props.row.userId)">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </template>
           <template v-else>
              {{ col.value }}
          </template>            
          </q-td>

        </q-tr>
        <!-- <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>           
          </q-td>
        </q-tr> -->
      </template>

    </q-table>
  </div>
</template>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: calc(100vh - 240px)

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #ddd
    font-weight: bold
    text-transform: uppercase

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';

const pageSize = 20
const nextPage = 1

export default {
  name: 'UsersQGrid',
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
    QGrid: () => import('./UsersQGrid.vue')
  },
  watch: {
    selectMode: (newVal, oldVal) => {
      console.log(newVal, oldVal);
    },
  },
  data: () => ({
    deleteId: null,
    nextPage,
    selected: [],
    _index: 0,
    loading: false,
    pagination: {
        // sortBy: 'desc',
        // descending: false,
        page: 1,
        rowsPerPage: 0,
        //rowsNumber: 5
      },
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
    checkObject(obj){
      console.log('Check Object', obj)
    },
    userEdit(data){
      this.$eventHub.$emit('user-edit', data)
    },
    customSort (rows, sortBy, descending) {
      const data = [ ...rows ]

      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a
          const y = descending ? a : b

          if (sortBy === 'name') {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          }
          else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy])
          }
        })
      }

      return data
    },
    test(event, props, index){
      console.log('test', event, props, index, this.table)
      const newMessage = event.Target.value
      this.$set(this.items[index], 'name', newMessage)
    },
    rowClicked(props){
      console.log('row Clicked')
      props.selected = true
    },
    checkCol(props, col){
      console.log('checkCol', props, col)
      return col.key
    },
    concatProducts(data){
      console.log(data)
      var result = null
      if (data.value){
        data.value.forEach(element => {
          result !== null ? result += `, ${element.productFamilyName}` : (result = element.productFamilyName)
        });
      }
      
      return result
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
        width: key === 'username' ? '100px'
          : key === 'name' ? '120px'
            : key === 'acctType' ? '60px'
              : key === 'action' ? '90px'
                : key === 'selector' ? '50px'
                  : '160px',
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
    onScroll ({ to, ref }) {      
      const lastIndex = this.items.length - 1
      console.log('onScroll', to, ref, this.nextPage, this.lastPage, lastIndex)
      if (this.loading !== true && this.nextPage < this.lastPage && to === lastIndex) {
        this.loading = true

        setTimeout(() => {
          this.nextPage++
          console.log('fetch next page??', this.nextPage)
          this.$nextTick(() => {
            ref.refresh()
            this.loading = false
          })
        }, 500)
      }
    },
    ConfirmDelete(id){
      this.deleteId = id
      var caller = {
        Target: this,
        message: 'Do you really want to delete this item?',
        title: 'Delete User',
        callback: 'DeleteRecord'
      }
      this.$eventHub.$emit('show-confirm', caller)
    },
    DeleteRecord(){
      var _this = this
      this.$http.post(`admin/user/delete/${this.deleteId}`)
      .then((response) => {
        if (response.data.result.success){
          _this.$eventHub.$emit('refresh-users')
        } 
        _this.$eventHub.$emit('show-alert', response.data.result)
      })
      .catch((error) => {
        console.error('DeleteRecord', error)
      })
    },
    toggleSelectAll(){
      if (this.selected.length === 0){
        this.selected = [...this.items]
      }else{
        this.selected = []
      }
    }
  },
  computed: {
    ...mapGetters({
      fields1: 'getUserMaintenanceFields',
    }),
    getIndex(){
      this._index += 1
      return this._index
    },
    lastPage(){
      return Math.ceil(this.items.length / pageSize)
    }
  },
  updated() {
    console.log('backloggrid updated');
  },
  mounted() {
    console.log('backloggrid mounted');
    this.defCount = this.calcItems('defBacklog');
    this.pagination.rowsNumber = this.items.length
    // this.refreshData()
  },
};
</script>
