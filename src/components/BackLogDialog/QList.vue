<template>
     <q-virtual-scroll
      type="table"
      style="max-height: 70vh"
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :virtual-scroll-sticky-size-end="32"
      :items="items"
      class="backlog-grid"
    >
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <span>
            No records found
          </span>
        </div>
      </template>

      <template v-slot:before>
        <thead class="thead-sticky text-left">
          <tr>
            <th>
              <div class="row-header" style="padding-left:10px;padding-top:2px padding-bottom:5px">
              <v-checkbox hide-details dark style="margin-top:-4px"
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
        </thead>
      </template>

      <template v-slot="{ item: row, index }">
        <tr :key="index">
          <td>
            <div class="row-header" style="padding-left:10px">
              <v-checkbox hide-details style="margin-top:-4px"
                ></v-checkbox>
            </div>
          </td>
                    
          <td v-for="col in fields" :key="index + '-' + col.label" :style="colwidthCalc(col.key)">
            <template v-if="col.key === 'DeferredBacklog'">
                <div class="cell-display" @focus="selectedItem($event, row, col.key, 'number')" tabindex="0" style="text-align:right">
                  <span style="float:left">$</span>
                  {{ formatNumber(row[col.key], false, 0)  }}</div> 
            </template>
            <template v-else-if="col.key === 'ProductFamily'">
                <div class="cell-display" @focus="SelectEditor($event, row, col.key, 'productFamilyEdit', 'productFamily', `${index}-${col.label}-select-editor`)" tabindex="0">
                  <v-select v-if="row.productFamilyEdit === true"
                    :ref="`${index}-${col.label}-select-editor`"
                    v-model="targetObj.productFamily"
                    dense
                    hide-details
                    :items="sites"
                    flat
                    @blur="blurObject($event, row, 'productFamilyEdit', col.key, 'productFamily')"
                    class="select-editor"
                  ></v-select>
                  <span v-else>{{ row[col.key]  }}</span>
                </div> 
            </template>
            <template v-else-if="col.key === 'SiteName'">
                <div class="cell-display" @focus="SelectEditor($event, row, col.key, 'siteEdit', 'siteName', `${index}-${col.label}-select-editor`)" tabindex="0">
                  <v-select v-if="row.siteEdit === true"
                    :ref="`${index}-${col.label}-select-editor`"
                    v-model="targetObj.siteName"
                    dense
                    hide-details
                    item-value="col1"
                    item-text="col1"
                    :items="userSites"
                    flat
                    @blur="blurObject($event, row, 'siteEdit', col.key, 'siteName')"
                    class="select-editor"
                  ></v-select>
                  <span v-else>{{ row[col.key]  }}</span>
                </div> 
            </template>
            <template v-else-if="col.key === 'Year'">
                <div class="cell-display" @focus="SelectEditor($event, row, col.key, 'yearEdit', 'year', `${index}-${col.label}-select-editor`)" tabindex="0">
                  <v-select v-if="row.yearEdit === true"
                    :ref="`${index}-${col.label}-select-editor`"
                    v-model="targetObj.year"
                    dense
                    hide-details
                    :items="yearSelections"
                    flat
                    @blur="blurObject($event, row, 'yearEdit', col.key, 'year')"
                    class="select-editor"
                  ></v-select>
                  <span v-else>{{ row[col.key]  }}</span>
                </div> 
            </template>
            <template v-else-if="col.key === 'MonthName'">
                <div class="cell-display" @focus="SelectEditor($event, row, col.key, 'monthEdit', 'month', `${index}-${col.label}-select-editor`)" tabindex="0">
                  <v-select v-if="row.monthEdit === true"
                    :ref="`${index}-${col.label}-select-editor`"
                    v-model="targetObj.month"
                    dense
                    hide-details
                    :items="monthSelections"
                    flat
                    @blur="blurObject($event, row, 'monthEdit', col.key, 'month')"
                    class="select-editor"
                  ></v-select>
                  <span v-else>{{ row[col.key]  }}</span>
                </div> 
            </template>
            <template v-else-if="col.key === 'RowNum'">
                <div style="text-align:center">
                    {{ row[col.key]  }}
                </div> 
            </template>
            <template v-else>
              <div class="cell-display" @focus="selectedItem($event, row, col.key)" tabindex="0">{{ row[col.key]  }}</div> 
            </template> 
          </td>
        </tr>
      </template>
    </q-virtual-scroll>
</template>