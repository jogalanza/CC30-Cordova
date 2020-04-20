<style>
.table-danger, .table-danger > th, .table-danger > td {
    background-color: #eee;
}
.head-class{
  font-size: 0.85rem;
}
.row-class{
  font-size: 0.85rem;
}
.table.b-table .foot-class span{
  font-size: 0.85rem;
  font-weight: bold;
}
.table.b-table > tbody > tr.b-table-details > td {
    padding:0px;
}
.b-table-sticky-header > .table.b-table > thead > tr > th {
    z-index: 4 !important;
}

.row-header{
  cursor:pointer;
}
.row-header.no-link{
  cursor: default;
}
span.row-text.row-text-negative,
div.row-text.row-text-negative{
  color: red !important;
}
/* .foot-class span,
.foot-class div {
  color:green;
} */
.foot-class div.row-text {
  font-size: 0.75rem;
}
.foot-class > tr > th{
  vertical-align: middle;
}
.footer-total{
  margin-left: 26px;
}
.grid2 .footer-total{
  margin-left: 59px;
}
.grid3 .footer-total{
  margin-left: 91px;
}
.grid4 .footer-total{
  margin-left: 123px;
}
.grid5 .footer-total{
  margin-left: 142px;
}

/* .grid2 .row-header{
  margin-left: 32px;
}
.grid3 .row-header{
  margin-left: 64px;
}
.grid4 .row-header{
  margin-left: 96px;
}
.grid5 .row-header{
  margin-left: 142px;
} */

/*
row headers version 2 - bundled cell
<b-table class="fixed-rowheader" />

.fixed-rowheader > .table.b-table > tbody > .b-table-details > .grid2 .table.b-table > thead > tr > th:nth-child(1),
.fixed-rowheader > .table.b-table > tbody > .b-table-details > .grid2 .table.b-table > tbody > tr > td:nth-child(1),
.fixed-rowheader > .table.b-table > tbody > .b-table-details > .grid2 .table.b-table > tfoot > tr > th:nth-child(1) {

*/
.b-table-sticky-header > .table.b-table > thead > tr > th{
  box-shadow: 0px 1px 0px #ddd;
}
.fixed-rowheader > .table.b-table > tbody > tr > td.sticky-row {
    position: -webkit-sticky;
    position: sticky;
    top: 40px;
    z-index: 2;
    background-color: #eee;
}
.fixed-rowheader > .table.b-table > tbody > tr > td.sticky-row:nth-child(1) {
    z-index: 3;
}
.fixed-rowheader > .table.b-table > thead > tr > th:nth-child(1),
.fixed-rowheader > .table.b-table > tbody > tr > td:nth-child(1),
.fixed-rowheader > .table.b-table > tfoot > tr > th:nth-child(1) {
    text-align: left;
    position: -webkit-sticky;
    position: sticky;
    left: 0px;
}


/* @media (min-width: 576px){
  .fixed-rowheader > .table.b-table > thead > tr > th:nth-child(1),
  .fixed-rowheader > .table.b-table > tbody > tr > td:nth-child(1),
  .fixed-rowheader > .table.b-table > tfoot > tr > th:nth-child(1) {
      position:relative;
  }
}
@media (min-width: 576px){
.table.b-table.fixed-rowheader > thead > tr > th:nth-child(1),
.table.b-table.fixed-rowheader > tbody > tr > td:nth-child(1),
.table.b-table.fixed-rowheader > tfoot > tr > th:nth-child(1) {
      position:relative;
  }
} */
.grid2 > .table.b-table.fixed-rowheader > thead > tr > th:nth-child(1),
.grid2 > .table.b-table.fixed-rowheader > tbody > tr > td:nth-child(1),
.grid2 > .table.b-table.fixed-rowheader > tfoot > tr > th:nth-child(1),
.grid3 > .table.b-table.fixed-rowheader > thead > tr > th:nth-child(1),
.grid3 > .table.b-table.fixed-rowheader > tbody > tr > td:nth-child(1),
.grid3 > .table.b-table.fixed-rowheader > tfoot > tr > th:nth-child(1),
.grid4 > .table.b-table.fixed-rowheader > thead > tr > th:nth-child(1),
.grid4 > .table.b-table.fixed-rowheader > tbody > tr > td:nth-child(1),
.grid4 > .table.b-table.fixed-rowheader > tfoot > tr > th:nth-child(1),
.grid5 > .table.b-table.fixed-rowheader > thead > tr > th:nth-child(1),
.grid5 > .table.b-table.fixed-rowheader > tbody > tr > td:nth-child(1),
.grid5 > .table.b-table.fixed-rowheader > tfoot > tr > th:nth-child(1){
    text-align: left !important;
    position: -webkit-sticky;
    position: sticky;
    left: 0px;
}

.cc-app-dark thead > tr > th{
    background-color: #444 !important;
    color: white !important;
    font-weight: normal;
    border-right: 1px solid #444;
}

.fixed-rowheader-color{
    background-color: #eee !important;
}

thead .white-header {
  background-color: white !important;
}
tr.row-class > td:nth-child(1){
  z-index: 1;
}
tr.row-class > td{
  vertical-align: middle;
}
.table td{
  vertical-align: middle;
}
</style>
