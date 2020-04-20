<template> 
    <q-table
      ref="table"
      :data="items"
      :columns="fields"
      row-key="RowNum"
      virtual-scroll
      :virtual-scroll-item-size="48"
      :pagination="pagination"
      :rows-per-page-options="[0]"
      :loading="loading"      
      class="upload-edit-grid"
    >
      <template v-slot:loading>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle" style="margin-right:10px;width:20px;height:20px"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-slot:no-data="{ icon, message, filter }" class="jared">
        <div v-if="!loading" class="loading-bar full-width row flex-center text-accent q-gutter-sm" >
          <span>
            There are no records to show
          </span>
        </div>
      </template>

      

      <template v-slot:bottom></template>

      <template v-slot:header="props">
        <tr>
            <th style="width:40px">
              <div class="row-header" style="padding-left:5px;padding-top:2px padding-bottom:5px">
              <v-checkbox 
                hide-details 
                dark style="margin-top:-4px"
                :value="selectedCount"
                @change="SelectAllChange($event, props.row)"
              ></v-checkbox>
            </div>
            </th>
            <th v-for="col in fields" :key="'1--' + col.key" :style="colwidthCalc(col.key)">
              <template v-if="col.key === 'RowNum'">
                <div style="white-space:normal;padding-left:6px;text-align:center">{{ col.label }}</div>
              </template>
              <template v-else>
                <div style="white-space:normal;padding-left:6px">{{ col.label }}</div>
              </template>                            
            </th>
          </tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" :key="props.key === null ? `m_${GenUID()}` : `m_${props.key}`">
           <td>
            <div class="row-header" style="padding-left:8px">
              <v-checkbox hide-details style="margin-top:-4px" :value="props.row.selected"
                @change="SelectChange($event, props.row)"
                ></v-checkbox>
            </div>
          </td>

          <td v-for="col in props.cols" :key="props.key + '-' + col.label" :style="colwidthCalc(col.key)">            
            <template v-if="col.datatype === 'Currency'">
                <div class="cell-display" @focus="SelectItem($event, props.row, col.key, 'number')" tabindex="0" style="text-align:right">
                  <span style="float:left">$</span>
                  {{ formatNumber(props.row[col.key], false, 0)  }}
                </div> 
            </template>
            <template v-else-if="col.datatype === 'ProductFamily'">
                <div class="cell-display" @focus="SelectEditor($event, props.row, col.key, 'productFamilyEdit', 'productFamily', `${props.key}-${col.label}-select-editor`)" tabindex="0">
                  <v-select v-if="props.row.productFamilyEdit === true"
                    :ref="`${props.key}-${col.label}-select-editor`"
                    v-model="targetObj.productFamily"
                    dense
                    hide-details
                    :items="userProducts"
                    item-text="ProductFamily"
                    item-value="ProductFamily"
                    flat
                    @blur="BlurObject($event, props.row, 'productFamilyEdit', col.key, 'productFamily')"
                    class="select-editor"
                  ></v-select>
                  <div class="static-text" v-else>{{ props.row[col.key]  }}</div>
                </div> 
            </template>
            <template v-else-if="col.datatype === 'Site'">
                <div class="cell-display" @focus="SelectEditor($event, props.row, col.key, 'siteEdit', 'siteName', `${props.key}-${col.key}-select-editor`)" tabindex="0">
                  <v-select v-if="props.row.siteEdit === true"
                    :ref="`${props.key}-${col.key}-select-editor`"
                    v-model="targetObj.siteName"
                    dense
                    hide-details
                    item-value="col1"
                    item-text="col1"
                    :items="userSites"
                    flat
                    @blur="BlurObject($event, props.row, 'siteEdit', col.key, 'siteName')"
                    class="select-editor"
                  ></v-select>
                  <div class="static-text" v-else>{{ props.row[col.key]  }}</div>
                </div> 
            </template>
            <template v-else-if="col.datatype === 'Year'">
                <div class="cell-display" @focus="SelectEditor($event, props.row, col.key, 'yearEdit', 'year', `${props.key}-${col.label}-select-editor`)" tabindex="0">
                  <v-select v-if="props.row.yearEdit === true"
                    :ref="`${props.key}-${col.label}-select-editor`"
                    v-model="targetObj.year"
                    dense
                    hide-details
                    :items="yearSelections"
                    flat
                    @blur="BlurObject($event, props.row, 'yearEdit', col.key, 'year')"
                    class="select-editor"
                  ></v-select>
                  <div class="static-text" v-else>{{ props.row[col.key]  }}</div>
                </div> 
            </template>
            <template v-else-if="col.datatype === 'Month'">
                <div class="cell-display" @focus="SelectEditor($event, props.row, col.key, 'monthEdit', 'month', `${props.key}-${col.label}-select-editor`)" tabindex="0">
                  <v-select v-if="props.row.monthEdit === true"
                    :ref="`${props.key}-${col.label}-select-editor`"
                    v-model="targetObj.month"
                    dense
                    hide-details
                    :items="monthSelections"
                    flat
                    @blur="BlurObject($event, props.row, 'monthEdit', col.key, 'month')"
                    class="select-editor"
                  ></v-select>
                  <div class="static-text" v-else>{{ props.row[col.key]  }}</div>
                </div> 
            </template>
            <template v-else-if="col.datatype === 'HoldType'">
                <div class="cell-display" @focus="SelectEditor($event, props.row, col.key, 'holdTypeEdit', 'holdType', `${props.key}-${col.label}-select-editor`)" tabindex="0">
                  <v-select v-if="props.row.holdTypeEdit === true"
                    :ref="`${props.key}-${col.label}-select-editor`"
                    v-model="targetObj.holdType"
                    dense
                    hide-details
                    :items="holdTypes"
                    flat
                    @blur="BlurObject($event, props.row, 'holdTypeEdit', col.key, 'holdType')"
                    class="select-editor"
                  ></v-select>
                  <div class="static-text" v-else>{{ props.row[col.key]  }}</div>
                </div> 
            </template>            
            <template v-else-if="col.datatype === 'text'">
              <div class="cell-display" @focus="SelectItem($event, props.row, col.key)" tabindex="0">{{ props.row[col.key]  }}</div> 
            </template> 
            <template v-else>
                <div style="text-align:center">
                    {{ props.row[col.key]  }}
                </div> 
            </template>
          </td>
        </q-tr>
      </template>

    </q-table>
</template>

<style lang="sass">
.upload-edit-grid .q-table
  table-layout: fixed
.upload-edit-grid .q-table thead tr > *,
.upload-edit-grid .q-table > .tfoot-sticky tr > *
  position: sticky
  opacity: 1
  z-index: 1
  background: #222
  font-weight: 500
  color: white
  top: 0
  padding: 4px
  border-right: 1px solid #444
.upload-edit-grid .q-table tbody tr td
  border-right: 1px solid #eee

.q-table--dense.upload-edit-grid .q-table tbody tr
  height: 50px


.thead-sticky tr:last-child > *
  top: 0

.v-input.select-editor
  top: 0
  display: block
  position: absolute
  background-color: pink
  color: black
  bottom: 0px
  margin-left: -6px
  margin-top:0px
  .v-select__slot
    padding-top:6px  
    
</style>
<style>
.upload-edit-grid .q-table__bottom {
    min-height: 0px;
    height: 30px;
    max-height: 30px;
    padding: 6px;
    border: none;
    display: none;
}
.upload-edit-grid .input-text {
    background-color: pink;
    display: block;
    top: 0px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding-left:5px;    
    padding-right: 5px;
}
.upload-edit-grid .static-text{
  min-width:100%;
  min-height: 100%;
}
.upload-edit-grid .cell-display {
    /* background-color: yellow; */
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    display: block;
    padding-top: 14px;
    padding-left:6px;
    padding-right: 6px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.upload-edit-grid .theme--light.v-text-field > .v-input__control > .v-input__slot:before,
.upload-edit-grid .theme--light.v-text-field > .v-input__control > .v-input__slot:after {
    border-style: none;
}
.upload-edit-grid tr.row-class > td {
  padding: 0px;
  height: 40px;
    position: relative;
    display: table-cell;
}
.upload-edit-grid .text-padding{
  padding: 0.5rem;
}
/* .upload-edit-grid .table.b-table > tbody > .table-active > td:nth-child(1) {
    border-left: 5px solid red;
} */
.upload-edit-grid
  .v-text-field.v-text-field--solo
  .v-input__control
  input {
  /* background-color: #eee; */
  text-align: center;
  max-height: 100%;
  font-size: 0.9rem;
  /* font-weight: bold; */
}
.upload-edit-grid .q-table th,
.upload-edit-grid .q-table td{
  padding: 0px;
}

.upload-edit-grid .v-text-field.v-text-field--solo .v-input__append-inner {
  display: none;
}
.upload-edit-grid .v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
    min-height: 25px;
    height: 18px;
}
.upload-edit-grid.v-text-field--outlined{
    border-radius: 0px;
}
.upload-edit-grid
  .v-text-field.v-text-field--solo
  .v-input__control
  input {
  /* background-color: #eee; */
  text-align: center;
  max-height: 100%;
  font-size: 0.8rem;
  /* font-weight: bold; */
}
.upload-edit-grid .v-text-field.v-text-field--solo .v-label,
.upload-edit-grid .v-select__selection--comma {
  font-size: 0.8rem;
  text-align: left;
  width: 100%;
  padding-left: 6px;
}
.upload-edit-grid .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot,
.upload-edit-grid .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 0px;
}
.upload-edit-grid .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
    background-color: transparent;
}
</style>

<script>
// @ is an alias to /src
import { mapGetters, mapState } from 'vuex';
import mixin from '../../mixin/mixin.js';
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'InlineEditGrid',
  mixins: [mixin],
  props: {
    targetName: {
      type: String,
      default: 'upload-edit-grid'
    },
   modelApi: {
     type:String,
     default: null
   },
   fields: {
     type: Array,
     default: []
   },
   items: {
     type: Array,
     default: []
   },
   selectedCount: {
     type: Number,
     default: 0
   }
  },
  components: {
  },
  data: () => ({
    loading: false,
    items1: [],
    activeComponent: null,
    defCount: null,
    pagination: {
      page: 1,
      itemsPerPage: 32,
      maxPage: 10,
      rowsPerPage: 0
    },
    targetObj: {
      element: null,
      text: '',
      rowItem: null,
      key: null,
      siteName: null
    },
    userProducts: []
  }),
  methods: {
    checkObject(props, col){
      console.log(props, col)      
    },
    SelectChange(event, row){
      //console.log('SelectChange', event, row)
      row.selected = event
    },
    SelectAllChange(event, row){
      //console.log('SelectAllChange', event, row)
      var _this = this
      this.items.forEach(element => {
        _this.$set(element, 'selected', event)
      })
    },
    BlurObject(e, row, key, targetKey, valueKey){
      console.log('Blue Object', e, row, key)
      if (targetKey === 'Site'){
        this.GetUserProducts(this.targetObj[valueKey])
        if (this.targetObj[valueKey] !== row.Site) {
          this.$nextTick(() => {
            this.$set(row, 'ProductFamily', '')
          })
        }
      }
      console.log(row[targetKey], this.targetObj[valueKey])
      if (row[targetKey] !== this.targetObj[valueKey]) row.dirty = true

      this.$set(row, targetKey, this.targetObj[valueKey])
      this.$set(row, key, false)
    },
    RemoveItem(e){
      console.log('RemoveItem', e)
      var val = e.target.value
       if (this.targetObj.rowItem && this.targetObj.key){
         console.log('assign value', val, parseInt(val))
          if (val !== this.targetObj.rowItem[this.targetObj.key]) this.targetObj.rowItem.dirty = true

          this.$set(this.targetObj.rowItem, this.targetObj.key, e.target.type === 'number' ? parseFloat(val) || 0 : val)
        } 
      e.target.removeEventListener('blur', this.RemoveItem)
      e.target.remove()
    },
    SelectItem(event, row, key, type='text'){
      console.log('SelectItem', event, row, row.DeferredBacklog, row[key])
      this.targetObj.text = ''
      this.targetObj.rowItem = row
      this.targetObj.key = key
      var input = document.createElement("input");
      input.type = type;
      input.className = 'input-text'
      input.value = type === 'text' ? row[key] : parseFloat(row[key]) || 0
      if (type === 'number') input.style.textAlign = 'right'
      input.addEventListener('blur', this.RemoveItem)
      event.target.appendChild(input)
      input.focus()
    },
    SelectEditor(event, row, key, rowFlag, tempKey, ref){
      if (key === 'ProductFamily') this.GetUserProducts(row.SiteName)
      this.$set(this.targetObj, tempKey, row[key])
      this.$set(row, rowFlag, true)
      
  
      this.$nextTick(() => {
        console.log(event.target.firstElementChild, this.$refs, this.$refs[ref][0])
        this.$refs[ref][0].focus()
      })
    },
    colwidthCalc(key) {
      return {
        'width': key === 'Site' ? '160px'
          : (key === 'Comments' || key === 'CustomerName' || key === 'Reason' || key === 'PartDescription') ? '150px'
            : (key === 'Month' || key === 'Year') ? '80px'
              : (key === 'DeferredBacklog') ? '110px'
              : (key === 'action') ? '30px'
              : (key === 'RowNum') ? '60px'
              : (key === 'ProductFamily') ? '180px'
                : '100px',
      };
    },
    GenUID(){
      return uuidv4()
    },
    GetUserProducts(site){
      var _this = this
      this.$http.post(`dataentry/products`, {
        periodFilter: this.periodFilters,
        site: site
      })
        .then((response) => {
          if (response.data !== ''){
            _this.userProducts = response.data.result
          }         
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
        })
    },
    GetHoldTypes(){
      var _this = this
      this.$http.post(`deferredbacklog/holdtypes`)
        .then((response) => {
          if (response.data !== ''){
            _this.holdTypes = response.data.result
          }else this.$eventHub.$emit('session-timeout')         
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
        })
    },
    SaveChanges(){
      console.log('saving...')
      var list = []
      this.items.forEach(element => {
          if (element.dirty){ list.push(element) }          
        });
      
      var _this = this
      this.$http.post(`deferredbacklog/save`, {
        items: list
      })
      .then((response) => {
        if (response.data !== ''){
          var result = response.data.result
          _this.$eventHub.$emit('show-alert', response.data.result)
          //clear dirty flag on successful save
          if (result.success){
            _this.SetObjectKeyValue(_this.items, 'dirty', false)
            _this.RefreshTable()
          } 
        }else this.$eventHub.$emit('session-timeout')        
      })
      .catch((error) => {
        console.error(error)
        this.NotifyRequestError(error)
      })
      .finally(() => {
      })
    },
    CheckValidSiteProduct(){        
        var siteProducts = this.GetSiteProductsList()
        if (siteProducts.length > 0){
          var _this = this
          this.$http.post(`check/siteproducts`, {
            siteProducts: siteProducts
          })
          .then((response) => {
            var result = response.data.result
            if (!result.success) _this.$eventHub.$emit('show-alert', response.data.result)
            else _this.SaveChanges()
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
          })
        }        
    },
    GetSiteProductsList(){
      var list = []
        var obj = {}

        //Create unique list
        this.items.forEach(element => {
          if (element.dirty){ obj[`${element.SiteName}-${element.ProductFamily}`] = 1 }          
        });
        //Convert to string array
        Object.keys(obj).map((key) => { list.push(key) })
        return list
    },  
    MapRowNum(){
      this.items.map((element, index) => {
        element.RowNum = index + 1
        element.isNew = true
        element.dirty = true
      })
    }
  },
  computed: {
    ...mapGetters({
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters'
    }),    
    userSites:{
      get(){
        return this.$store.state.userInfo.siteAccess
      }
    },
    yearSelections:{
      get(){
        return this.$store.state.yearSelections
      }
    },
    monthSelections:{
      get(){
        return this.$store.state.monthSelections
      }
    },
    holdTypes:{
      get(){
        return this.$store.state.holdTypes
      },
      set(value){
        this.$store.commit('setHoldTypes', value)
      }
    }
  },  
  mounted() { 
     
  },
  beforeDestroy(){
  },
  updated(){
  }
};
</script>
