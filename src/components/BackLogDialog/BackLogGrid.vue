<template>
<!-- :sticky-header="readOnly ? 'calc(100vh - 60px)' : 'calc(100vh - 145px)'" -->
  <b-table
    ref="gridtable"
      show-empty
      fixed
      :sticky-header="true"
      small
      :selectable="false"
      bordered
      striped
      :select-mode="selectMode ? 'multi' : 'single'"
      responsive
      :items="items"
      :fields="fields"
      :filter="filter"
      :filterIncludedFields="filterOn"
      thead-class="head-class"
      tbody-tr-class="row-class"
      tfoot-class="foot-class"
      :style="readOnly ? 'height:calc(100vh - 60px)' : 'height:calc(100vh - 145px)'"
      @filtered="onFiltered"
      class="backlog-grid"
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

      <template v-slot:head(action)="row">
        <div class="row-header" style="padding-left:5px; padding-bottom:5px">
          <v-checkbox hide-details style="margin-top:-4px"
            ></v-checkbox>
        </div>
      </template>

      <template v-slot:head(defBacklog)="row">
        <div>{{ row.label }}</div>
        <div v-if="Number(defCount) !== 0" style="color:blue;font-size:0.8rem">{{ `Total: ${defCount}`}}</div>
      </template>

      <template v-slot:head()="row">
        <div class="text-padding">{{ row.label }}</div>
      </template>

      <template v-slot:cell(col1)="row">
        <div class="row-header">
          <span>{{ row.value }}</span>
        </div>
      </template>

      <template v-slot:cell(action)="row">
        <div class="row-header" style="padding-left:10px">
          <v-checkbox hide-details style="margin-top:-4px"
            ></v-checkbox>
        </div>
      </template>

      

      <!-- <template v-slot:cell(col1)="row">
        <span>{{ `${row.item.col1} > ${row.item.businessLine} > ${row.item.productLine}` }}</span>
      </template> -->

      <template v-slot:cell(Year)="row">
        <span>{{ row.value }}</span>
      </template>

      <template v-slot:cell(DeferredBacklog)="row">
        <v-text-field
          v-if="row.rowSelected && !readOnly"
          type="number"
          flat
          solo
          single-line
          dense
          hide-details
          prefix="$"
          :value="formatNumber(row.item.DeferredBacklog, true, 0, true)"
          class="cc-input"
        ></v-text-field>
        <div class="text-padding" style="text-align:right" v-else>
          <span style="float:left">$</span>
          {{ formatNumber(row.value, true, 0) }}
        </div>        
      </template>

      <!-- <template v-slot:cell(PONumber)="row">
        <v-text-field
          v-if="row.rowSelected && !readOnly"
          flat
          solo
          single-line
          dense
          hide-details
          v-model="row.item.PONumber"
          class="cc-input"
        ></v-text-field>
        <div class="text-padding" v-else>{{ formatNumber(row.value) }}</div>        
      </template>

      <template v-slot:cell(PartNo)="row">
        <v-text-field
          v-if="row.rowSelected && !readOnly"
          flat
          solo
          single-line
          dense
          hide-details
          v-model="row.item.PartNo"
          class="cc-input"
        ></v-text-field>
        <div class="text-padding" v-else>{{ formatNumber(row.value) }}</div>         
      </template>

      <template v-slot:cell(Comments)="row">
        <v-text-field
          v-if="row.rowSelected && !readOnly"
          flat
          solo
          single-line
          dense
          hide-details
          v-model="row.item.Comments"
          class="cc-input"
        ></v-text-field>
        <div class="text-padding" v-else>{{ formatNumber(row.value) }}</div>          
      </template>

      <template v-slot:cell(Reason)="row">
        <v-text-field
           v-if="row.rowSelected && !readOnly"
          flat
          solo
          dense
          hide-details
          v-model="row.item.Reason"
          class="cc-input"
        ></v-text-field>
        <div class="text-padding" v-else>{{ formatNumber(row.value) }}</div>         
      </template>

      <template v-slot:cell(CustomerName)="row">
        <v-text-field
          v-if="row.rowSelected && !readOnly"
          flat
          solo
          single-line
          dense
          hide-details
          v-model="row.item.CustomerName"
          class="cc-input"
        ></v-text-field>
        <div class="text-padding" v-else>{{ formatNumber(row.value) }}</div>           
      </template>

      <template v-slot:cell(PartDescription)="row">
        <v-text-field
          v-if="row.rowSelected && !readOnly"
          flat
          solo
          single-line
          dense
          hide-details
          v-model="row.item.PartDescription"
          class="cc-input"
        ></v-text-field>
        <div class="text-padding" v-else>{{ formatNumber(row.value) }}</div>   
      </template> -->

      <template v-slot:cell()="row">
        <div class="cell-display" @focus="selectedItem($event, row)" tabindex="0">{{ row.value }}</div>
      </template>

      

      <!-- Footer templates -->
      <template v-slot:foot(actions)="data">
        <span class="text-danger"></span>
      </template>

      <template v-slot:foot(col1)="data">
        <span class="text-danger">Total</span>
      </template>

      <template v-slot:foot(defBacklog)="data">
        <!-- <span>{{ calcItems(data.column) }}</span> -->
        <span>{{ defCount }}</span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template v-slot:foot()="data">
        <!-- <span>{{ calcItems(data.column) }}</span> -->
        <span class=sr-only></span>
      </template>

      <template slot="top-row">
        <td id="topRow" ref="topRow" colspan="12" style="text-align:center;height:1px">
          <div v-if="topLoading" style="padding:10px">
            <b-spinner  class="align-middle" style="width:20px;height:20px;margin-right:10px;color:red"></b-spinner>
          Loading...
          </div>
        </td>
      </template>

      <template slot="custom-foot">
        <!-- <span>{{ calcItems(data.column) }}</span> -->
        <th id="bottomRow" ref="bottomRow" colspan="12" style="text-align:center;padding:0px;height:40">
          <div v-if="bottomLoading" style="padding:10px">
            <b-spinner  class="align-middle" style="width:20px;height:20px;margin-right:10px;color:red"></b-spinner>
          Loading...
          </div>
          
        </th>
      </template>
    </b-table>
  <!-- <div class="backlog-grid" style="height:100vh">
    
  </div> -->
</template>

<style>
.backlog-grid .input-text {
    background-color: pink;
    display: block;
    top: 0px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding-left:5px;
}
.backlog-grid .cell-display {
    background-color: yellow;
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    display: block;
    padding-top: 10px;
}
.backlog-grid tr.row-class > td {
  padding: 0px;
  height: 40px;
    position: relative;
    display: table-cell;
}
.backlog-grid .text-padding{
  padding: 0.5rem;
}
/* .backlog-grid .table.b-table > tbody > .table-active > td:nth-child(1) {
    border-left: 5px solid red;
} */
.backlog-grid
  .v-text-field.v-text-field--solo
  .v-input__control
  input {
  /* background-color: #eee; */
  text-align: center;
  max-height: 100%;
  font-size: 0.9rem;
  /* font-weight: bold; */
}


.backlog-grid .v-text-field.v-text-field--solo .v-input__append-inner {
  display: none;
}
.backlog-grid .v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
    min-height: 25px;
    height: 18px;
}
.backlog-grid.v-text-field--outlined{
    border-radius: 0px;
}
.backlog-grid
  .v-text-field.v-text-field--solo
  .v-input__control
  input {
  /* background-color: #eee; */
  text-align: center;
  max-height: 100%;
  font-size: 0.8rem;
  /* font-weight: bold; */
}
.backlog-grid .v-text-field.v-text-field--solo .v-label,
.backlog-grid .v-select__selection--comma {
  font-size: 0.8rem;
  text-align: center;
  width: 100%;
}
.backlog-grid .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot,
.backlog-grid .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 0px;
}
.backlog-grid .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
    background-color: transparent;
}
</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';

export default {
  name: 'BackLogGrid',
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
  components: {

  },
  watch: {
    selectMode: (newVal, oldVal) => {
      console.log(newVal, oldVal);
    },
  },
  data: () => ({
    topLoading: false,
    bottomLoading: false,
    loadDirection: 'down',
    loadMoreTop: true,
    defCount: null,
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
    items: [],
    pagination: {
      page: 1,
      itemsPerPage: 32,
      maxPage: 10
    },
    targetObj: {
      element: null,
      text: '',
      rowItem: null,
      key: null
    }
  }),
  methods: {
    tableScroll(event){
      console.log('tableScroll', event)
    },
    assignValue(){
      if (this.targetObj.element) {
        this.targetObj.element.blur()
        this.targetObj.element = null 
      }
    },
    onKeyDown(e){
      console.log('onKeyDown', e)
      if (e.key === 'Enter'){
        console.log('enter key', this.targetObj.element)
        if (this.targetObj.element) {
          this.targetObj.element.blur()
          this.targetObj.element = null 
        }
      }else if (e.key !== 'Tab'){
        if (this.targetObj.element){
          if (e.keyCode !== 13) this.targetObj.text += e.key  //String.fromCharCode(e.keyCode)
          if (this.targetObj.rowItem && this.targetObj.key){
            this.$set(this.targetObj.rowItem, this.targetObj.key, this.targetObj.text)
          } 
        }
      }
    },
    removeItem(e){
      console.log('removeItem', e)
      var val = e.target.value
       if (this.targetObj.rowItem && this.targetObj.key){
          this.$set(this.targetObj.rowItem, this.targetObj.key, val)
        } 
      e.target.removeEventListener('blur', null)
      e.target.remove()
    },
    selectedItem(event, row){
      console.log('selectedItem', event, row, row.item.value)
      // if (this.targetObj.element){
      //   this.targetObj.element.removeEventListener('blur', this.assignValue)
      // }
      this.targetObj.text = ''
      this.targetObj.rowItem = row.item
      this.targetObj.key = row.field.key
      var input = document.createElement("input");
      input.type = "text";
      input.className = 'input-text'
      input.value = row.value || ''
      input.addEventListener('blur', this.removeItem)
      event.target.appendChild(input)
      //this.targetObj.element = event.target
      input.focus()

      /**
       * Target: TD
       */
      // event.target.offsetParent.tabIndex = 0
      // this.targetObj.text = ''
      // this.targetObj.rowItem = row.item
      // this.targetObj.key = row.field.key
      // //event.target.addEventListener('blur', this.assignValue)
      // this.targetObj.element = event.target.offsetParent
      // this.targetObj.element.focus()
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
        width: key === 'col1' ? '160px'
          : (key === 'comments' || key === 'customerName' || key === 'reason' || key === 'partDescription') ? '120px'
            : (key === 'MonthName' || key === 'Year') ? '60px'
              : (key === 'defBacklog') ? '120px'
              : (key === 'action') ? '30px'
              : (key === 'RowNum') ? '50px'
              : (key === 'ProductFamily') ? '160px'
                : '80px',
      };
    },
    GetBacklogs(){
      var _this = this
      this.$http.post(`deferredbacklog/1/5`, {
        periodFilter: this.periodFilters,
        pagination: this.pagination
      })
        .then((response) => {
          if (response.data !== ''){
            if (_this.pagination.page === 1){
              _this.items = [...response.data.result]
            }else if(_this.pagination.page > 1 && response.data.result.length > 0){
              _this.items = [...response.data.result]
            }            
          }         
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          _this.topLoading = false
          _this.bottomLoading = false
          _this.ResetScrolls()
        })
    },
    ResetScrolls(){
      this.$nextTick(() => {
        if (this.loadDirection === 'down'){
          console.log('resetting scroll top')
          this.$refs.gridtable.$el.scrollTop = 100
        }else{
          console.log('resetting scroll bottom')
          this.$refs.gridtable.$el.scrollTop = 200  //this.$refs.gridtable.$el.scrollHeight - 200
        }
      })
      
    },
    RefreshTable(){
      this.pagination.page = 1
      this.GetBacklogs()
    },
    scrollTrigger(){
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          console.log(entry)
          if (entry.isIntersecting){
            if (entry.target.id === 'bottomRow'){
              console.log('scroll down, load more')
              this.LoadMoreDown()
            }else{
              console.log('scroll up, load more', this.$refs.gridtable.$el.scrollTop)
              //this.LoadMoreUp()
              this.loadMoreTop = true
            } 
          }          
        })
      })

      if (this.$refs.topRow) observer.observe(this.$refs.topRow)
      if (this.$refs.bottomRow) observer.observe(this.$refs.bottomRow)
    },
    LoadMoreDown(){
      this.pagination.page++
      this.bottomLoading = true
      this.loadDirection = 'down'
      this.GetBacklogs()
    },
    LoadMoreUp(){
      if (this.pagination.page === 1) return
      this.pagination.page--
      if (this.pagination.page < 1) this.pagination.page = 1
      this.topLoading = true
      this.loadDirection = 'up'
      this.GetBacklogs()
    },
    TableScroll(e){
      console.log('TableScroll', e.target.scrollTop, e.target.scrollHeight)
      if (this.loadMoreTop && e.target.scrollTop === 0){
        this.loadMoreTop = false
        this.LoadMoreUp()
      }
    },
  },
  computed: {
    ...mapGetters({
      fields: 'getBackLogFields',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters'
    }),
  },  
  mounted() {
    console.log('backloggrid mounted', this.$refs.gridtable.$el);
    this.$refs.gridtable.$el.addEventListener('scroll', this.TableScroll)
    this.$eventHub.$on('period-changed', this.RefreshTable)
    console.log('backloggrid mounted', this.$refs.gridtable.$children[2].$el);
    this.defCount = this.calcItems('defBacklog');
    this.GetBacklogs()
    this.scrollTrigger()
    // window.addEventListener("keypress", function(e) {
    //   console.log(String.fromCharCode(e.keyCode), e.keyCode);
    //   if (this.targetObj.element){
    //     if (e.keyCode !== 13) this.targetObj.text += String.fromCharCode(e.keyCode)
    //     if (this.targetObj.rowItem && this.targetObj.key){
    //       this.$set(this.targetObj.rowItem, this.targetObj.key, this.targetObj.text)
    //     } 
    //   }      
    // }.bind(this));

    //window.addEventListener("keydown", this.onKeyDown);
  },
  beforeDestroy(){
    this.$eventHub.$off('period-changed', this.RefreshTable)
    this.$refs.gridtable.$el.removeEventListener('scroll', this.TableScroll)
    //window.removeEventListener("keydown", this.onKeyDown);
  },
  updated(){
    //console.log('backloggrid updated', this.$refs, this.$refs.gridtable.$children[2].$el);
  }
};
</script>
