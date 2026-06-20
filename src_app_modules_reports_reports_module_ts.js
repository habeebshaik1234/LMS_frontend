"use strict";
(self["webpackChunkboon_hrms"] = self["webpackChunkboon_hrms"] || []).push([["src_app_modules_reports_reports_module_ts"],{

/***/ 73237:
/*!****************************************************************************************************************************!*\
  !*** ./src/app/modules/reports/pages/common-reports/components/attendance-late-report/attendance-late-report.component.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttendanceLateReportComponent": () => (/* binding */ AttendanceLateReportComponent),
/* harmony export */   "MY_FORMATS": () => (/* binding */ MY_FORMATS)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material-moment-adapter */ 77118);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/core */ 59121);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/paginator */ 36060);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/sort */ 92197);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/table */ 85288);
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! xlsx */ 4126);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jspdf */ 84177);
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jspdf-autotable */ 43015);
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jspdf_autotable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_modules_reports_reports_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/reports/reports.service */ 48569);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/dialog */ 31484);
/* harmony import */ var src_app_modules_reports_excel_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/reports/excel-service.service */ 69172);
/* harmony import */ var src_app_modules_attendance_attendance_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/attendance/attendance.service */ 14362);
/* harmony import */ var src_app_services_pdf_header_service_pdf_header_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/pdf-header-service/pdf-header.service */ 20037);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/datepicker */ 42298);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/input */ 68562);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/select */ 57371);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/flex-layout/flex */ 56722);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ngx-translate/core */ 38699);




























const _c0 = ["table"];
function AttendanceLateReportComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-option", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const e_r27 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", e_r27.empid);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", e_r27.empname, " ");
} }
function AttendanceLateReportComponent_ng_container_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-option", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const v_r28 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", v_r28.shiftid);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](v_r28.shiftname);
} }
function AttendanceLateReportComponent_mat_error_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-error", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "Please select an option."), " ");
} }
function AttendanceLateReportComponent_mat_error_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-error", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "Please select an option."), " ");
} }
function AttendanceLateReportComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 43)(1, "div")(2, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keyup.enter", function AttendanceLateReportComponent_div_53_Template_button_keyup_enter_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r30); const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r29.generatePDF()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "a", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("key.press", function AttendanceLateReportComponent_div_53_Template_a_key_press_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r30); const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r31.generatePDF()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "img", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AttendanceLateReportComponent_div_53_Template_img_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r30); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r32.generatePDF()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keyup.enter", function AttendanceLateReportComponent_div_53_Template_button_keyup_enter_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r30); const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r33.exportAsXLSX()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "a", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "img", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AttendanceLateReportComponent_div_53_Template_img_click_13_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r30); const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r34.exportAsXLSX()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](6, 2, "PDF"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](12, 4, "Excel"));
} }
function AttendanceLateReportComponent_th_60_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "th", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "S. No."));
} }
function AttendanceLateReportComponent_td_61_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "td", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r36 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](i_r36 + 1);
} }
function AttendanceLateReportComponent_th_63_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "th", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "Emp. ID"));
} }
function AttendanceLateReportComponent_td_64_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "td", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r37 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r37.empid);
} }
function AttendanceLateReportComponent_th_66_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "th", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "Emp. Name"));
} }
function AttendanceLateReportComponent_td_67_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "td", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r38 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r38.empname);
} }
function AttendanceLateReportComponent_th_69_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "th", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "Shift"));
} }
function AttendanceLateReportComponent_td_70_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "td", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r39 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", row_r39.shiftname, " ");
} }
function AttendanceLateReportComponent_th_72_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "th", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "Date"));
} }
function AttendanceLateReportComponent_td_73_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "td", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r40 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](2, 1, row_r40.attendancedate, "dd-MM-yyyy"), " ");
} }
function AttendanceLateReportComponent_th_75_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "th", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "Shift InTime"));
} }
function AttendanceLateReportComponent_td_76_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "td", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r41 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind3"](2, 1, row_r41.shiftstarttime, 0, 5), " ");
} }
function AttendanceLateReportComponent_th_78_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "th", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "In Time"));
} }
function AttendanceLateReportComponent_td_79_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "td", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r42 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind3"](2, 1, row_r42.actual_in_time, 0, 5), " ");
} }
function AttendanceLateReportComponent_th_81_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "th", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "Late Hours"));
} }
function AttendanceLateReportComponent_td_82_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "td", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r43 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind3"](2, 1, row_r43.latehours, 0, 5), " ");
} }
function AttendanceLateReportComponent_tr_83_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "tr", 55);
} }
function AttendanceLateReportComponent_tr_84_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "tr", 56);
} }
function AttendanceLateReportComponent_tr_85_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr", 57)(1, "td", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 1, "No data found"));
} }
const _c1 = function () { return [5, 10, 20]; };
const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'DD-MM-YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};
class AttendanceLateReportComponent {
    constructor(reportsService, datePipe, formBuilder, dialog, excelService, attendanceService, dateESI, pdfService) {
        this.reportsService = reportsService;
        this.datePipe = datePipe;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.excelService = excelService;
        this.attendanceService = attendanceService;
        this.dateESI = dateESI;
        this.pdfService = pdfService;
        this.List = [];
        this.minDate = new Date('2020/01/01');
        this.maxDate = new Date();
        this.date = new Date();
        this.startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        this.endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
        this.dateDayArray = [];
        this.headersList = [];
        this.currentDate = new Date();
        this.pageLoading = true;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl('');
        this.searchControlforshift = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl('');
        this.filteredEmployeeList = [];
        this.filteredShiftList = [];
        this.filter = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl();
        this.searchForm = this.formBuilder.group({
            fromDate: [new Date()],
            toDate: [new Date()],
            user: ['0'],
            shift: ['0'],
        });
        this.dataSource = [];
        this.displayedColumns = [
            'sno',
            'empid',
            'empname',
            'shift',
            'fromdate',
            'todate',
            'intime',
            'latehours',
        ];
        this.isLoading = false;
        this.minFromDate = new Date();
        this.minFromDate.setDate(this.currentDate.getDate() - 90);
        this.maxFromDate = new Date();
        this.minToDate = new Date();
        this.minToDate.setDate(this.currentDate.getDate() - 90);
        this.maxToDate = new Date();
    }
    ngOnInit() {
        this.userSession = JSON.parse(sessionStorage.getItem('user') ?? '');
        this.getEmployeelist();
        this.getActiveShiftIds();
        this.Searchform();
    }
    getActiveShiftIds() {
        this.attendanceService.getActiveShiftIds().subscribe((res) => {
            if (res.status) {
                this.shiftDataList = res.data;
                this.filteredShiftList = this.shiftDataList;
                this.searchForm.controls.shift.setValue('0');
            }
        });
    }
    getEmployeelist() {
        let obj = {
            remployee_id: this.userSession.id,
        };
        this.reportsService
            .getReportsuserEmployeesList(obj)
            .subscribe((res) => {
            if (res.status) {
                this.employeelist = [];
                this.employeelist = res.data;
                this.filteredEmployeeList = this.employeelist;
                this.searchForm.controls.user.setValue('0');
            }
        });
        this.searchControl.valueChanges.subscribe(searchText => {
            this.filterEmployees(searchText);
        });
        this.searchControlforshift.valueChanges.subscribe(searchText => {
            this.filterShifts(searchText);
        });
    }
    //All Employees API
    Searchform() {
        this.List = [];
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatTableDataSource(this.List);
        let fromDate = this.datePipe.transform(this.searchForm.controls.fromDate.value, 'y-MM-dd');
        let toDate = this.datePipe.transform(this.searchForm.controls.toDate.value, 'y-MM-dd');
        let userId = this.searchForm.controls.user.value == '0'
            ? null
            : this.searchForm.controls.user.value;
        let shift = this.searchForm.controls.shift.value == '0'
            ? null
            : this.searchForm.controls.shift.value;
        let data = {};
        data = {
            rempid: this.userSession.id,
            employee_id: userId,
            shift_id: shift,
            from_date: fromDate,
            to_date: toDate,
        };
        this.isLoading = true;
        this.reportsService
            .getEmployeeLateAttendanceReportForReportsuser(data)
            .subscribe((res) => {
            this.headersList = [];
            this.List = [];
            if (res.status) {
                let i = 0;
                this.List = res.data;
                this.isLoading = false;
                this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatTableDataSource(this.List);
                this.dataSource.paginator = this.paginator;
                this.pageLoading = false;
            }
        }, (error) => {
            this.isLoading = false;
            error.error.text;
        });
    }
    resetform() {
        this.dataSource.data = [];
        this.searchForm.reset();
        this.searchForm.controls.fromDate.setValue(new Date());
        this.searchForm.controls.toDate.setValue(new Date());
        this.searchForm.controls.user.setValue('0');
        this.searchForm.controls.shift.setValue('0');
        this.Searchform();
    }
    exportAsXLSX() {
        let fromDate = this.datePipe.transform(this.searchForm.controls.fromDate.value, "dd-MM-yyyy");
        let toDate = this.datePipe.transform(this.searchForm.controls.toDate.value, "dd-MM-yyyy");
        const formatTime = (input) => {
            if (!input)
                return '-';
            if (input.includes(' ')) {
                const [datePart, timePart] = input.split(' ');
                return `${datePart} ${timePart.substring(0, 5)}`;
            }
            else {
                return input.substring(0, 5);
            }
        };
        const headerRow = [
            { A: `Report Name: Late Attendance Report`, B: `From Date: ${fromDate}`, C: `To Date: ${toDate}` }
        ];
        const exportData = this.List.map((row, index) => ({
            "S.No": index + 1,
            "Employee ID": row.empid,
            "Employee Name": row.empname,
            "Shift": row.shiftname,
            "Date": this.datePipe.transform(row.attendancedate, "dd-MM-yyyy"),
            "Shift InTime": formatTime(row.shiftstarttime),
            "In Time": formatTime(row.actual_in_time),
            "Late Hours": formatTime(row.latehours),
        }));
        const ws = xlsx__WEBPACK_IMPORTED_MODULE_9__.utils.json_to_sheet(headerRow, { skipHeader: true });
        xlsx__WEBPACK_IMPORTED_MODULE_9__.utils.sheet_add_json(ws, exportData, { origin: 'A2', skipHeader: false });
        const wb = xlsx__WEBPACK_IMPORTED_MODULE_9__.utils.book_new();
        xlsx__WEBPACK_IMPORTED_MODULE_9__.utils.book_append_sheet(wb, ws, 'Late_attendance_Report');
        xlsx__WEBPACK_IMPORTED_MODULE_9__.writeFile(wb, fromDate + '-' + toDate + '-' + 'Late_attendance_Report.xlsx');
    }
    fromDateChange(type, event) {
        this.minToDate = event.value;
        if (event.value !== null) {
            this.maxToDate = new Date();
            // event!.value.getFullYear(),
            // event!.value.getMonth(),
            // event!.value.getDate() + 30
        }
    }
    toDateChange(type, event) {
        this.maxFromDate = event.value;
        // if (event.value !== null) {
        //   this.minFromDate = new Date(
        //     event!.value.getFullYear(),
        //     event!.value.getMonth(),
        //     event!.value.getDate() - 30
        //   );
        // }
    }
    getPageSizes() {
        var customPageSizeArray = [];
        if (this.dataSource.data.length > 5) {
            customPageSizeArray.push(5);
        }
        if (this.dataSource.data.length > 10) {
            customPageSizeArray.push(10);
        }
        if (this.dataSource.data.length > 20) {
            customPageSizeArray.push(20);
        }
        customPageSizeArray.push(this.dataSource.data.length);
        return customPageSizeArray;
    }
    filterEmployees(searchText) {
        this.filteredEmployeeList = this.employeelist.filter((val) => val.empname.toLowerCase().includes(searchText.toLowerCase()));
        if (this.filteredEmployeeList.length <= 0) {
            this.searchControl.setValue('');
        }
    }
    filterShifts(searchText) {
        this.filteredShiftList = this.shiftDataList.filter((val) => val.shiftname.toLowerCase().includes(searchText.toLowerCase()));
        if (this.filteredShiftList.length <= 0) {
            this.searchControlforshift.setValue('');
        }
    }
    generatePDF() {
        const doc = new jspdf__WEBPACK_IMPORTED_MODULE_0__["default"]({ orientation: 'landscape' });
        const reportName = 'Late Attendance Report';
        let fromdate = (this.datePipe.transform(this.searchForm.controls.fromDate.value, "dd-MM-YYYY"));
        let todate = (this.datePipe.transform(this.searchForm.controls.toDate.value, "dd-MM-YYYY"));
        const formatTime = (input) => {
            if (!input)
                return '-';
            if (input.includes(' ')) {
                const [datePart, timePart] = input.split(' ');
                return `${datePart} ${timePart.substring(0, 5)}`;
            }
            else {
                return input.substring(0, 5);
            }
        };
        let manager = '';
        let locationName = '';
        let reportDate = fromdate + ' to ' + todate;
        const headerHeight = 33;
        const tableData = this.List.map((emp, index) => [
            index + 1,
            emp.empid,
            emp.empname,
            emp.shiftname,
            this.datePipe.transform(emp.attendancedate, "dd-MM-yyyy"),
            formatTime(emp.shiftstarttime),
            formatTime(emp.actual_in_time),
            formatTime(emp.latehours)
        ]);
        jspdf_autotable__WEBPACK_IMPORTED_MODULE_1___default()(doc, {
            head: [['S.No.', 'Emp.ID', 'Emp.Name', 'Shift', 'Date', 'Shift InTime', 'In Time', 'Late Hours']],
            body: tableData,
            startY: headerHeight,
            styles: { fontSize: 10 },
            headStyles: { fontSize: 11 },
            margin: { top: headerHeight },
            didDrawPage: (data) => {
                this.pdfService.generatePDFHeader(doc, reportName, locationName, manager, reportDate, false, false);
                doc.setFontSize(10);
                doc.setTextColor(40);
            }
        });
        doc.save('late_attendance_report.pdf');
    }
}
AttendanceLateReportComponent.ɵfac = function AttendanceLateReportComponent_Factory(t) { return new (t || AttendanceLateReportComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_modules_reports_reports_service__WEBPACK_IMPORTED_MODULE_2__.ReportsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_modules_reports_excel_service_service__WEBPACK_IMPORTED_MODULE_3__.ExcelServiceService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_modules_attendance_attendance_service__WEBPACK_IMPORTED_MODULE_4__.AttendanceService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_pdf_header_service_pdf_header_service__WEBPACK_IMPORTED_MODULE_5__.PdfHeaderService)); };
AttendanceLateReportComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: AttendanceLateReportComponent, selectors: [["app-attendance-late-report"]], viewQuery: function AttendanceLateReportComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_12__.MatPaginator, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_13__.MatSort, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.table = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.sorter = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵProvidersFeature"]([
            {
                provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_14__.DateAdapter,
                useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_15__.MomentDateAdapter,
                deps: [_angular_material_core__WEBPACK_IMPORTED_MODULE_14__.MAT_DATE_LOCALE],
            },
            { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_14__.MAT_DATE_FORMATS, useValue: MY_FORMATS },
        ])], decls: 87, vars: 51, consts: [["fxLayout", "column", 1, "first-col"], ["fxLayout", "row", "fxLayout.lt-lg", "column", 2, "padding", "1%", 3, "formGroup"], ["fxLayout", "row", "fxLayout.xs", "column"], ["fxFlex", "", "fxFlex.xs", "100%", "appearance", "outline", 1, "mx-2", "my-2"], ["formControlName", "user", "required", "", "tabindex", "1"], ["matInput", "", "type", "text", 1, "search-align", 3, "formControl", "placeholder"], ["value", "0"], [4, "ngFor", "ngForOf"], ["fxFlex", "", "fxFlex.xs", "100", "appearance", "outline", 1, "mx-2", "my-2"], ["formControlName", "shift", "required", "", "tabindex", "2"], ["matInput", "", "readonly", "", "required", "", "placeholder", "From Date", "formControlName", "fromDate", "tabindex", "3", 3, "min", "max", "matDatepicker", "dateInput", "click"], ["matSuffix", "", 1, "datepicker", 3, "for"], ["fromDate", ""], ["class", "con-error", 4, "ngIf"], ["matInput", "", "readonly", "", "required", "", "formControlName", "toDate", "tabindex", "4", 3, "min", "max", "matDatepicker", "dateInput", "click"], ["toDate", ""], ["fxLayout", "row", "fxFlex.xs", "100%", "fxLayoutAlign", "center", 1, "showLine"], ["tabindex", "5", 1, "btn", "btn-primary", "mr-2", "mb-2", 3, "click"], ["tabindex", "6", 1, "btn", "btn-danger", "mr-2", "mb-2", 3, "click"], ["fxLayout", "row xs-column", "fxLayoutAlign", "end  center", "style", "margin-right: 3%;", 4, "ngIf"], ["fxLayout", "column", 1, "table-pad"], [1, "example-container", "mat-elevation-z1"], ["id", "table"], ["table", ""], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "sno"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "empid"], ["mat-header-cell", "", "class", "no-wrap", 4, "matHeaderCellDef"], ["matColumnDef", "empname"], ["matColumnDef", "shift"], ["mat-cell", "", "class", "no-wrap", 4, "matCellDef"], ["matColumnDef", "fromdate"], ["matColumnDef", "todate"], ["matColumnDef", "intime"], ["matColumnDef", "latehours"], ["class", "headerbox title", "mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "pageSizeOptions"], [3, "value"], [1, "con-error"], ["fxLayout", "row xs-column", "fxLayoutAlign", "end  center", 2, "margin-right", "3%"], [1, "exlprint"], ["mat-icon-button", "", "tabindex", "7", 3, "keyup.enter"], [3, "title", "key.press"], ["src", "./assets/images/icons/pdf.png", "width", "20px", "height", "20px", 3, "click"], ["mat-icon-button", "", "tabindex", "8", 3, "keyup.enter"], [3, "title"], ["src", "./assets/images/icons/excel.png", 3, "click"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-cell", "", 1, "no-wrap"], ["mat-cell", "", 1, "no-wrap"], ["mat-header-row", "", 1, "headerbox", "title"], ["mat-row", ""], [1, "mat-row"], ["colspan", "8", 1, "mat-cell", 2, "text-align", "center"]], template: function AttendanceLateReportComponent_Template(rf, ctx) { if (rf & 1) {
        const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-form-field", 3)(4, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "mat-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](9, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, AttendanceLateReportComponent_ng_container_13_Template, 3, 2, "ng-container", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "mat-form-field", 8)(15, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](17, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "mat-select", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](19, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](20, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](23, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](24, AttendanceLateReportComponent_ng_container_24_Template, 3, 2, "ng-container", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "div", 2)(26, "mat-form-field", 8)(27, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](29, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](30, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dateInput", function AttendanceLateReportComponent_Template_input_dateInput_30_listener($event) { return ctx.fromDateChange("input", $event); })("click", function AttendanceLateReportComponent_Template_input_click_30_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r45); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](33); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](_r2.open()); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](31, "mat-datepicker-toggle", 11)(32, "mat-datepicker", null, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](34, AttendanceLateReportComponent_mat_error_34_Template, 3, 3, "mat-error", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](35, "mat-form-field", 8)(36, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](37);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](38, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](39, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dateInput", function AttendanceLateReportComponent_Template_input_dateInput_39_listener($event) { return ctx.toDateChange("input", $event); })("click", function AttendanceLateReportComponent_Template_input_click_39_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r45); const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](42); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](_r4.open()); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](40, "mat-datepicker-toggle", 11)(41, "mat-datepicker", null, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](43, AttendanceLateReportComponent_mat_error_43_Template, 3, 3, "mat-error", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](44, "div", 16)(45, "span")(46, "button", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AttendanceLateReportComponent_Template_button_click_46_listener() { return ctx.Searchform(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](47);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](48, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](49, "button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AttendanceLateReportComponent_Template_button_click_49_listener() { return ctx.resetform(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](50, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](51);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](52, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](53, AttendanceLateReportComponent_div_53_Template, 14, 6, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](54, "div", 20)(55, "div", 21)(56, "div", 22, 23)(58, "table", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](59, 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](60, AttendanceLateReportComponent_th_60_Template, 3, 3, "th", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](61, AttendanceLateReportComponent_td_61_Template, 2, 1, "td", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](62, 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](63, AttendanceLateReportComponent_th_63_Template, 3, 3, "th", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](64, AttendanceLateReportComponent_td_64_Template, 2, 1, "td", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](65, 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](66, AttendanceLateReportComponent_th_66_Template, 3, 3, "th", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](67, AttendanceLateReportComponent_td_67_Template, 2, 1, "td", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](68, 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](69, AttendanceLateReportComponent_th_69_Template, 3, 3, "th", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](70, AttendanceLateReportComponent_td_70_Template, 2, 1, "td", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](71, 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](72, AttendanceLateReportComponent_th_72_Template, 3, 3, "th", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](73, AttendanceLateReportComponent_td_73_Template, 3, 4, "td", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](74, 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](75, AttendanceLateReportComponent_th_75_Template, 3, 3, "th", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](76, AttendanceLateReportComponent_td_76_Template, 3, 5, "td", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](77, 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](78, AttendanceLateReportComponent_th_78_Template, 3, 3, "th", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](79, AttendanceLateReportComponent_td_79_Template, 3, 5, "td", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](80, 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](81, AttendanceLateReportComponent_th_81_Template, 3, 3, "th", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](82, AttendanceLateReportComponent_td_82_Template, 3, 5, "td", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](83, AttendanceLateReportComponent_tr_83_Template, 1, 0, "tr", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](84, AttendanceLateReportComponent_tr_84_Template, 1, 0, "tr", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](85, AttendanceLateReportComponent_tr_85_Template, 4, 3, "tr", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](86, "mat-paginator", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](33);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](42);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.searchForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](6, 30, "Employee Name"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](9, 32, "Search"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formControl", ctx.searchControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](12, 34, "All Employees"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.filteredEmployeeList);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](17, 36, "Shift"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](20, 38, "Search"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formControl", ctx.searchControlforshift);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](23, 40, "All Shifts"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.filteredShiftList);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](29, 42, "From Date"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("min", ctx.minFromDate)("max", ctx.maxFromDate)("matDatepicker", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("for", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.searchForm.controls.fromDate.errors == null ? null : ctx.searchForm.controls.fromDate.errors.required);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](38, 44, "To Date"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("min", ctx.minToDate)("max", ctx.maxToDate)("matDatepicker", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("for", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.searchForm.controls.toDate.errors == null ? null : ctx.searchForm.controls.toDate.errors.required);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](48, 46, "Search"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](52, 48, "Clear"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.List.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("pageSizeOptions", !ctx.pageLoading ? ctx.getPageSizes() : _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](50, _c1));
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_material_core__WEBPACK_IMPORTED_MODULE_14__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButton, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepicker, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepickerToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__.MatError, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_19__.MatInput, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_12__.MatPaginator, _angular_material_select__WEBPACK_IMPORTED_MODULE_20__.MatSelect, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatNoDataRow, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_21__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_21__.DefaultLayoutAlignDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_21__.DefaultFlexDirective, _angular_common__WEBPACK_IMPORTED_MODULE_10__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslatePipe], styles: ["table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.headerbox[_ngcontent-%COMP%] {\n  height: 45px;\n  background-color: #28acaf !important;\n  align-items: center;\n}\n\n.title[_ngcontent-%COMP%] {\n  font-family: \"Roboto\";\n  font-size: 20px;\n  font-weight: 500;\n  font-stretch: normal;\n  font-style: normal;\n  letter-spacing: 0.32px;\n  color: #ffffff;\n  margin-bottom: 0px;\n}\n\n.mat-header-cell[_ngcontent-%COMP%] {\n  font-family: \"Roboto\";\n  font-size: 16px;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  letter-spacing: 0.32px;\n  color: #ffffff;\n}\n\n  .mat-select-panel[aria-label=\"Items per page:\"] mat-option:last-child:before {\n  content: \"All\";\n  position: relative;\n  display: block;\n}\n\n  .mat-select-panel[aria-label=\"Items per page:\"] mat-option:last-child .mat-option-text {\n  display: none;\n}\n\nmat-card[_ngcontent-%COMP%] {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  display: block;\n  position: relative;\n  padding-left: 0px;\n  padding-right: 0px;\n}\n\n  tr.mat-header-row {\n  height: 45px !important;\n}\n\n .mat-form-field-appearance-outline .mat-form-field-wrapper {\n  margin: 0.2em 0 !important;\n}\n\n.dev-Pad[_ngcontent-%COMP%] {\n  padding: 1%;\n}\n\n.table-pad[_ngcontent-%COMP%] {\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n.example-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  display: flex;\n  flex-direction: column;\n}\n\n@media only screen and (max-width: 800px) and (orientation: portrait) {\n  mat-header-row[_ngcontent-%COMP%], mat-row[_ngcontent-%COMP%] {\n    width: 150%;\n  }\n}\n\ntable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 2px 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0dGVuZGFuY2UtbGF0ZS1yZXBvcnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxtQkFBQTtBQUVGOztBQUFBO0VBQ0UscUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUFHRjs7QUFEQTtFQUVFLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtBQUdGOztBQUNJO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQUVOOztBQUtJO0VBQ0UsYUFBQTtBQUZOOztBQU1BO0VBQ0UseURBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBSEY7O0FBTUE7RUFDRSx1QkFBQTtBQUhGOztBQUtBO0VBQ0UsMEJBQUE7QUFGRjs7QUFJQTtFQUNFLFdBQUE7QUFERjs7QUFHQTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7QUFBRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBRUE7RUFDRTs7SUFFRSxXQUFBO0VBQ0Y7QUFDRjs7QUFDQTs7RUFFRSxpQkFBQTtBQUNGIiwiZmlsZSI6ImF0dGVuZGFuY2UtbGF0ZS1yZXBvcnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuLmhlYWRlcmJveCB7XHJcbiAgaGVpZ2h0OiA0NXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOGFjYWYgIWltcG9ydGFudDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi50aXRsZSB7XHJcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCI7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjMycHg7XHJcbiAgY29sb3I6ICNmZmZmZmY7XHJcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xyXG59XHJcbi5tYXQtaGVhZGVyLWNlbGwge1xyXG4gIC8vIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCI7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjMycHg7XHJcbiAgY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuOjpuZy1kZWVwIHtcclxuICAubWF0LXNlbGVjdC1wYW5lbFthcmlhLWxhYmVsPVwiSXRlbXMgcGVyIHBhZ2U6XCJdIHtcclxuICAgIG1hdC1vcHRpb246bGFzdC1jaGlsZDpiZWZvcmUge1xyXG4gICAgICBjb250ZW50OiBcIkFsbFwiO1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuOjpuZy1kZWVwIHtcclxuICAubWF0LXNlbGVjdC1wYW5lbFthcmlhLWxhYmVsPVwiSXRlbXMgcGVyIHBhZ2U6XCJdIHtcclxuICAgIG1hdC1vcHRpb246bGFzdC1jaGlsZCAubWF0LW9wdGlvbi10ZXh0IHtcclxuICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxubWF0LWNhcmQge1xyXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMjgwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgcGFkZGluZy1sZWZ0OiAwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogMHB4O1xyXG59XHJcblxyXG46Om5nLWRlZXAgdHIubWF0LWhlYWRlci1yb3cge1xyXG4gIGhlaWdodDogNDVweCAhaW1wb3J0YW50O1xyXG59XHJcbjo6bmctZGVlcC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLXdyYXBwZXIge1xyXG4gIG1hcmdpbjogMC4yZW0gMCAhaW1wb3J0YW50O1xyXG59XHJcbi5kZXYtUGFkIHtcclxuICBwYWRkaW5nOiAxJTtcclxufVxyXG4udGFibGUtcGFkIHtcclxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgcGFkZGluZy1yaWdodDogMTVweDtcclxufVxyXG4uZXhhbXBsZS1jb250YWluZXIge1xyXG4gIG92ZXJmbG93LXg6IGF1dG87XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDgwMHB4KSBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCkge1xyXG4gIG1hdC1oZWFkZXItcm93LFxyXG4gIG1hdC1yb3cge1xyXG4gICAgd2lkdGg6IDE1MCU7XHJcbiAgfVxyXG59XHJcbnRhYmxlIHRkLFxyXG50YWJsZSB0aCB7XHJcbiAgcGFkZGluZzogMnB4IDEwcHg7XHJcbn1cclxuXHJcbiJdfQ== */"] });


/***/ }),

/***/ 27185:
/*!**********************************************************************************************************************************!*\
  !*** ./src/app/modules/reports/pages/common-reports/components/attendance-summary-report/attendance-summary-report.component.ts ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttendanceSummaryReportComponent": () => (/* binding */ AttendanceSummaryReportComponent),
/* harmony export */   "MY_FORMATS": () => (/* binding */ MY_FORMATS)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material-moment-adapter */ 77118);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/core */ 59121);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/paginator */ 36060);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/sort */ 92197);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/table */ 85288);
/* harmony import */ var src_app_modules_reports_pages_dialog_detail_dialog_detail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/reports/pages/dialog-detail/dialog-detail.component */ 41442);
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! xlsx */ 4126);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jspdf */ 84177);
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jspdf-autotable */ 43015);
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jspdf_autotable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_modules_reports_reports_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/reports/reports.service */ 48569);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ 31484);
/* harmony import */ var src_app_services_pdf_header_service_pdf_header_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/pdf-header-service/pdf-header.service */ 20037);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/datepicker */ 42298);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/input */ 68562);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/select */ 57371);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/flex-layout/flex */ 56722);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ngx-translate/core */ 38699);



























const _c0 = ["table"];
function AttendanceSummaryReportComponent_ng_container_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-option", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const e_r34 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", e_r34.empid);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](e_r34.empname);
} }
function AttendanceSummaryReportComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 47)(1, "div")(2, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("keyup.enter", function AttendanceSummaryReportComponent_div_39_Template_button_keyup_enter_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r36); const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r35.generatePDF()); })("click", function AttendanceSummaryReportComponent_div_39_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r36); const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r37.generatePDF()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "img", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "button", 51)(9, "a", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("keyup.enter", function AttendanceSummaryReportComponent_div_39_Template_a_keyup_enter_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r36); const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r38.exportAsXLSX()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "img", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AttendanceSummaryReportComponent_div_39_Template_img_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r36); const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r39.exportAsXLSX()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("tabIndex", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](10, 3, "Excel"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("tabIndex", 7);
} }
function AttendanceSummaryReportComponent_th_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "S. No."));
} }
function AttendanceSummaryReportComponent_td_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r41 = ctx.index;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", i_r41 + 1 + ctx_r6.paginator.pageIndex * ctx_r6.paginator.pageSize, " ");
} }
function AttendanceSummaryReportComponent_th_49_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "Emp. Name"));
} }
function AttendanceSummaryReportComponent_td_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r42 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](row_r42.empname);
} }
function AttendanceSummaryReportComponent_th_52_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "Emp. ID"));
} }
function AttendanceSummaryReportComponent_td_53_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r43 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](row_r43.empcode);
} }
function AttendanceSummaryReportComponent_th_55_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "Reporting Manager"));
} }
function AttendanceSummaryReportComponent_td_56_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r44 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](row_r44.reporting_manager);
} }
function AttendanceSummaryReportComponent_th_58_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "Date"));
} }
function AttendanceSummaryReportComponent_td_59_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r45 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 1, row_r45.attendancedate, "dd-MM-yyyy"), " ");
} }
function AttendanceSummaryReportComponent_th_61_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "First In"));
} }
function AttendanceSummaryReportComponent_td_62_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r46 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 1, row_r46.firstlogintime, "dd-MM-yyyy HH:mm"), " ");
} }
function AttendanceSummaryReportComponent_th_64_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "Last Out"));
} }
function AttendanceSummaryReportComponent_td_65_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r47 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 1, row_r47.lastlogouttime, "dd-MM-yyyy HH:mm"), " ");
} }
function AttendanceSummaryReportComponent_th_67_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Early Leave");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function AttendanceSummaryReportComponent_td_68_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r48 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind3"](2, 1, row_r48.early_leaving_time, 0, 5), " ");
} }
function AttendanceSummaryReportComponent_th_70_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "Total Hours"));
} }
function AttendanceSummaryReportComponent_td_71_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r49 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind3"](2, 1, row_r49.totalhours, 0, 5), " ");
} }
function AttendanceSummaryReportComponent_th_73_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "Productive Hours"));
} }
function AttendanceSummaryReportComponent_td_74_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r50 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind3"](2, 1, row_r50.productivehours, 0, 5), " ");
} }
function AttendanceSummaryReportComponent_th_76_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "OT Hours"));
} }
function AttendanceSummaryReportComponent_td_77_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r51 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind3"](2, 1, row_r51.overtime_minutes, 0, 5), " ");
} }
function AttendanceSummaryReportComponent_th_79_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "Permission Hours"));
} }
function AttendanceSummaryReportComponent_td_80_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r52 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind3"](2, 1, row_r52.permissionhours, 0, 5), " ");
} }
function AttendanceSummaryReportComponent_th_82_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "th", 54);
} }
function AttendanceSummaryReportComponent_td_83_Template(rf, ctx) { if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("keyup.enter", function AttendanceSummaryReportComponent_td_83_Template_td_keyup_enter_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r55); const row_r53 = restoredCtx.$implicit; const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r54.openDialog(row_r53)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "button", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AttendanceSummaryReportComponent_td_83_Template_button_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r55); const row_r53 = restoredCtx.$implicit; const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r56.openDialog(row_r53)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "a", 60)(3, "u");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("tabIndex", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 2, "Details"));
} }
function AttendanceSummaryReportComponent_tr_84_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "tr", 61);
} }
function AttendanceSummaryReportComponent_tr_85_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "tr", 62);
} }
function AttendanceSummaryReportComponent_tr_86_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "tr", 63)(1, "td", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 1, "No data found"));
} }
const _c1 = function () { return [5, 10, 20]; };
const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'DD-MM-YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};
class AttendanceSummaryReportComponent {
    constructor(reportsService, datePipe, formBuilder, dialog, pdfService) {
        this.reportsService = reportsService;
        this.datePipe = datePipe;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.pdfService = pdfService;
        this.List = [];
        this.minDate = new Date('1950/01/01');
        this.today = new Date();
        this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1);
        this.pageLoading = true;
        this.displayLength = false;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl('');
        this.filteredEmployeeList = [];
        this.tableOne = [];
        this.filter = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl();
        this.months = [
            { id: 0, month: 'Jan' },
            { id: 1, month: 'Feb' },
            { id: 2, month: 'Mar' },
            { id: 3, month: 'Apr' },
            { id: 4, month: 'May' },
            { id: 5, month: 'Jun' },
            { id: 6, month: 'Jul' },
            { id: 7, month: 'Aug' },
            { id: 8, month: 'Sep' },
            { id: 9, month: 'Oct' },
            { id: 10, month: 'Nov' },
            { id: 11, month: 'Dec' },
        ];
        this.searchForm = this.formBuilder.group({
            fromDate: [this.maxDate],
            toDate: [this.maxDate],
            Users: ['0'],
        });
        this.dataSource = [];
        this.displayedColumns = [
            'sno',
            'empname',
            'empcode',
            'attendancedate',
            'reporting_manager',
            'firstlogintime',
            'earlyleave',
            'lastlogouttime',
            'totalhours',
            'productivehours',
            'ot',
            'ph',
            'action',
        ];
        this.isLoading = false;
    }
    ngOnInit() {
        this.userSession = JSON.parse(sessionStorage.getItem('user') ?? '');
        this.Searchform();
        this.getEmployeelist();
        this.searchForm
            .get('fromDate')
            ?.valueChanges.subscribe((selectedValue) => {
            if (selectedValue != null) {
                this.minToDate = selectedValue._d;
            }
        });
        this.searchControl.valueChanges.subscribe(searchText => {
            this.filterEmployees(searchText);
        });
    }
    getEmployeelist() {
        let obj = {
            remployee_id: this.userSession.id,
        };
        this.reportsService
            .getReportsuserEmployeesList(obj)
            .subscribe((res) => {
            if (res.status) {
                this.employeelist = [];
                this.employeelist = res.data;
                this.filteredEmployeeList = this.employeelist;
                this.searchForm.controls.user.setValue('0');
            }
        });
    }
    //All Employees API
    Searchform() {
        this.List = [];
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatTableDataSource(this.List);
        let fromDate = this.datePipe.transform(this.searchForm.controls.fromDate.value, 'y-MM-d');
        let toDate = this.datePipe.transform(this.searchForm.controls.toDate.value, 'y-MM-d');
        let userId = this.searchForm.controls.Users.value;
        if (userId == '0') {
            userId = null;
        }
        let data = {
            rempid: this.userSession.id,
            employee: userId,
            fromdate: fromDate,
            todate: toDate,
        };
        this.isLoading = true;
        this.reportsService
            .getAttendanceSummaryReportForReportsuser(data)
            .subscribe((res) => {
            this.List = res.data;
            if (res.status) {
                this.List.forEach((e) => {
                    if (e.breaks != null) {
                        e.breaks = e.breaks.split(',');
                    }
                });
                this.displayLength = true;
            }
            this.isLoading = false;
            this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatTableDataSource(this.List);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.pageLoading = false;
        }, (error) => {
            this.isLoading = false;
            error.error.text;
        });
    }
    resetform() {
        this.dataSource.data = [];
        this.searchForm.reset();
        this.searchForm.controls.fromDate.setValue(this.maxDate);
        this.searchForm.controls.toDate.setValue(this.maxDate);
        this.searchForm.controls.Users.setValue('0');
    }
    openDialog(item) {
        const dialogRef = this.dialog.open(src_app_modules_reports_pages_dialog_detail_dialog_detail_component__WEBPACK_IMPORTED_MODULE_0__.DialogDetailComponent, {
            width: '1200px',
            position: { top: `70px` },
            data: { attendanceid: item.id, item: item },
        });
        dialogRef.afterClosed().subscribe((result) => { });
    }
    exportAsXLSX() {
        let fromdate = this.datePipe.transform(this.searchForm.controls.fromDate.value, "dd-MM-yyyy");
        let todate = this.datePipe.transform(this.searchForm.controls.toDate.value, "dd-MM-yyyy");
        const formatTime = (input) => {
            if (!input)
                return '-';
            if (input.includes(' ')) {
                const [datePart, timePart] = input.split(' ');
                return `${datePart} ${timePart.substring(0, 5)}`;
            }
            else {
                return input.substring(0, 5);
            }
        };
        const exportData = this.List.map((row, index) => ({
            "S.No": index + 1,
            "Employee Name": row.empname,
            "Emp. ID": row.empcode,
            "Date": this.datePipe.transform(row.attendancedate, "dd-MM-yyyy"),
            "First In": this.datePipe.transform(row.firstlogintime, "dd-MM-yyyy HH:mm"),
            "Last Out": this.datePipe.transform(row.lastlogouttime, "dd-MM-yyyy HH:mm"),
            "Early Leave": formatTime(row.early_leaving_time),
            "Total Hours": formatTime(row.totalhours),
            "Productive Hours": formatTime(row.productivehours),
            "OT Hours": formatTime(row.overtime_minutes),
            "Permission Hours": formatTime(row.permissionhours)
        }));
        const ws = xlsx__WEBPACK_IMPORTED_MODULE_8__.utils.json_to_sheet(exportData);
        const wb = xlsx__WEBPACK_IMPORTED_MODULE_8__.utils.book_new();
        xlsx__WEBPACK_IMPORTED_MODULE_8__.utils.book_append_sheet(wb, ws, 'Attendance_Summary_Report');
        xlsx__WEBPACK_IMPORTED_MODULE_8__.writeFile(wb, fromdate + " - " + todate + " - " + 'Attendance_Summary_Report.xlsx');
    }
    getPageSizes() {
        var customPageSizeArray = [];
        if (this.dataSource.data.length > 5) {
            customPageSizeArray.push(5);
        }
        if (this.dataSource.data.length > 10) {
            customPageSizeArray.push(10);
        }
        if (this.dataSource.data.length > 20) {
            customPageSizeArray.push(20);
        }
        customPageSizeArray.push(this.dataSource.data.length);
        return customPageSizeArray;
    }
    filterEmployees(searchText) {
        this.filteredEmployeeList = this.employeelist.filter((val) => val.empname.toLowerCase().includes(searchText.toLowerCase()));
        if (this.filteredEmployeeList.length <= 0) {
            this.searchControl.setValue('');
        }
    }
    generatePDF() {
        const doc = new jspdf__WEBPACK_IMPORTED_MODULE_1__["default"]({ orientation: 'landscape' });
        const reportName = 'Attendance Summary Report';
        let fromdate = (this.datePipe.transform(this.searchForm.controls.fromDate.value, "dd-MM-YYYY"));
        let todate = (this.datePipe.transform(this.searchForm.controls.toDate.value, "dd-MM-YYYY"));
        const formatTime = (input) => {
            if (!input)
                return '-';
            if (input.includes(' ')) {
                const [datePart, timePart] = input.split(' ');
                return `${datePart} ${timePart.substring(0, 5)}`;
            }
            else {
                return input.substring(0, 5);
            }
        };
        let manager = '';
        let locationName = '';
        let reportDate = fromdate + ' to ' + todate;
        const headerHeight = 35;
        const tableData = this.List.map((emp, index) => [
            index + 1,
            emp.empname,
            emp.empcode,
            this.datePipe.transform(emp.attendancedate, "dd-MM-yyyy"),
            this.datePipe.transform(emp.firstlogintime, "dd-MM-yyyy HH:mm"),
            this.datePipe.transform(emp.lastlogouttime, "dd-MM-yyyy HH:mm"),
            formatTime(emp.early_leaving_time),
            formatTime(emp.totalhours),
            formatTime(emp.productivehours),
            formatTime(emp.overtime_minutes),
            formatTime(emp.permissionhours),
        ]);
        jspdf_autotable__WEBPACK_IMPORTED_MODULE_2___default()(doc, {
            head: [['S.No.', 'Emp. Name', 'Emp. ID', 'Date', 'First In', 'Last Out', 'Early Leave', 'Total Hrs', 'Productive Hrs', 'OT Hrs', 'Permission Hrs']],
            body: tableData,
            startY: headerHeight,
            styles: { fontSize: 10 },
            headStyles: { fontSize: 11 },
            margin: { top: headerHeight },
            didDrawPage: (data) => {
                this.pdfService.generatePDFHeader(doc, reportName, locationName, manager, reportDate, false, false);
                doc.setFontSize(10);
                doc.setTextColor(40);
            }
        });
        doc.save('attendance_summary_report.pdf');
    }
}
AttendanceSummaryReportComponent.ɵfac = function AttendanceSummaryReportComponent_Factory(t) { return new (t || AttendanceSummaryReportComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_modules_reports_reports_service__WEBPACK_IMPORTED_MODULE_3__.ReportsService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_9__.DatePipe), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_services_pdf_header_service_pdf_header_service__WEBPACK_IMPORTED_MODULE_4__.PdfHeaderService)); };
AttendanceSummaryReportComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: AttendanceSummaryReportComponent, selectors: [["app-attendance-summary-report"]], viewQuery: function AttendanceSummaryReportComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatTable, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__.MatPaginator, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_12__.MatSort, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.table = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.tableOne = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([
            {
                provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_13__.DateAdapter,
                useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_14__.MomentDateAdapter,
                deps: [_angular_material_core__WEBPACK_IMPORTED_MODULE_13__.MAT_DATE_LOCALE],
            },
            { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_13__.MAT_DATE_FORMATS, useValue: MY_FORMATS },
        ])], decls: 88, vars: 37, consts: [["fxLayout", "column"], ["fxLayout", "column", "fxLayout.lt-lg", "column", "fxLayoutAlign.xs", "center", 1, "dev-Pad", 2, "margin-left", "5px", 3, "formGroup"], ["fxLayout", "row", "fxLayout.xs", "column", "fxLayout.lt-lg", "row wrap", "fxFlex.xs", "100%"], ["fxFlex.xs", "100%", "fxFlex", "", "appearance", "outline", 1, "mx-1", "my-1"], ["matInput", "", "readonly", "", "placeholder", "From Date", "formControlName", "fromDate", "tabIndex", "1", 3, "matDatepicker", "min", "max", "click"], ["matSuffix", "", 1, "datepicker", 3, "for"], ["fromDate", ""], ["matInput", "", "readonly", "", "placeholder", "To Date", "formControlName", "toDate", "tabIndex", "2", 3, "matDatepicker", "min", "max", "click"], ["toDate", ""], ["fxFlex.xs", "100%", "fxFlex", "", "fxFlex.lt-lg", "48", "appearance", "outline", 1, "mx-1", "my-1"], ["formControlName", "Users", "required", "", "tabIndex", "3"], ["matInput", "", "type", "text", "placeholder", "  Search", 1, "search-align", 3, "formControl"], ["value", "0"], [4, "ngFor", "ngForOf"], ["fxLayout", "row", "fxLayoutAlign", "center"], [1, "btn", "btn-primary", "mr-2", "mb-2", 3, "tabIndex", "click"], [1, "line", 2, "color", "#1898D5", "font-size", "16px"], [1, "btn", "btn-danger", "mr-2", "mb-2", 3, "tabIndex", "click"], ["fxLayout", "row xs-column", "fxLayoutAlign", "end  center", "style", " margin-right: 3%;", 4, "ngIf"], ["fxLayout", "column", 1, "table-pad"], [1, "mat-elevation-z1", "example-container"], ["id", "table"], ["table", ""], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "sno"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "no-wrap", 4, "matCellDef"], ["matColumnDef", "empname"], ["mat-header-cell", "", "class", "no-wrap", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "empcode"], ["matColumnDef", "reporting_manager"], ["matColumnDef", "attendancedate"], ["matColumnDef", "firstlogintime"], ["matColumnDef", "lastlogouttime"], ["matColumnDef", "earlyleave"], ["matColumnDef", "totalhours"], ["matColumnDef", "productivehours"], ["matColumnDef", "ot"], ["matColumnDef", "ph"], ["matColumnDef", "action"], ["mat-cell", "", 3, "keyup.enter", 4, "matCellDef"], ["class", "headerbox title", "mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "pageSizeOptions"], [3, "value"], ["fxLayout", "row xs-column", "fxLayoutAlign", "end  center", 2, "margin-right", "3%"], [1, "exlprint"], ["mat-icon-button", "", "title", "PDF", 3, "tabIndex", "keyup.enter", "click"], ["src", "./assets/images/icons/pdf.png", "width", "20px", "height", "20px"], ["mat-icon-button", ""], [3, "title", "tabIndex", "keyup.enter"], ["src", "./assets/images/icons/excel.png", 3, "click"], ["mat-header-cell", ""], ["mat-cell", "", 1, "no-wrap"], ["mat-header-cell", "", 1, "no-wrap"], ["mat-cell", ""], ["mat-cell", "", 3, "keyup.enter"], ["mat-icon-button", "", 3, "tabIndex", "click"], [2, "color", "blue"], ["mat-header-row", "", 1, "headerbox", "title"], ["mat-row", ""], [1, "mat-row"], ["colspan", "10", 1, "mat-cell", 2, "text-align", "center"]], template: function AttendanceSummaryReportComponent_Template(rf, ctx) { if (rf & 1) {
        const _r58 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-form-field", 3)(4, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AttendanceSummaryReportComponent_Template_input_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r58); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](10); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](_r0.open()); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "mat-datepicker-toggle", 5)(9, "mat-datepicker", null, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "mat-form-field", 3)(12, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](14, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AttendanceSummaryReportComponent_Template_input_click_15_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r58); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](18); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](_r1.open()); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](16, "mat-datepicker-toggle", 5)(17, "mat-datepicker", null, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "mat-form-field", 9)(20, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](22, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "mat-select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](24, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "mat-option", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](27, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](28, AttendanceSummaryReportComponent_ng_container_28_Template, 3, 2, "ng-container", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "div", 14)(30, "span")(31, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AttendanceSummaryReportComponent_Template_button_click_31_listener() { return ctx.Searchform(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](32);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](33, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](34, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](35, "button", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AttendanceSummaryReportComponent_Template_button_click_35_listener() { return ctx.resetform(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](36, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](37);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](38, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](39, AttendanceSummaryReportComponent_div_39_Template, 12, 5, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](40, "div", 19)(41, "div", 20)(42, "div", 21, 22)(44, "table", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](45, 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](46, AttendanceSummaryReportComponent_th_46_Template, 3, 3, "th", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](47, AttendanceSummaryReportComponent_td_47_Template, 2, 1, "td", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](48, 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](49, AttendanceSummaryReportComponent_th_49_Template, 3, 3, "th", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](50, AttendanceSummaryReportComponent_td_50_Template, 2, 1, "td", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](51, 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](52, AttendanceSummaryReportComponent_th_52_Template, 3, 3, "th", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](53, AttendanceSummaryReportComponent_td_53_Template, 2, 1, "td", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](54, 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](55, AttendanceSummaryReportComponent_th_55_Template, 3, 3, "th", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](56, AttendanceSummaryReportComponent_td_56_Template, 2, 1, "td", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](57, 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](58, AttendanceSummaryReportComponent_th_58_Template, 3, 3, "th", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](59, AttendanceSummaryReportComponent_td_59_Template, 3, 4, "td", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](60, 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](61, AttendanceSummaryReportComponent_th_61_Template, 3, 3, "th", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](62, AttendanceSummaryReportComponent_td_62_Template, 3, 4, "td", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](63, 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](64, AttendanceSummaryReportComponent_th_64_Template, 3, 3, "th", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](65, AttendanceSummaryReportComponent_td_65_Template, 3, 4, "td", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](66, 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](67, AttendanceSummaryReportComponent_th_67_Template, 2, 0, "th", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](68, AttendanceSummaryReportComponent_td_68_Template, 3, 5, "td", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](69, 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](70, AttendanceSummaryReportComponent_th_70_Template, 3, 3, "th", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](71, AttendanceSummaryReportComponent_td_71_Template, 3, 5, "td", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](72, 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](73, AttendanceSummaryReportComponent_th_73_Template, 3, 3, "th", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](74, AttendanceSummaryReportComponent_td_74_Template, 3, 5, "td", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](75, 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](76, AttendanceSummaryReportComponent_th_76_Template, 3, 3, "th", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](77, AttendanceSummaryReportComponent_td_77_Template, 3, 5, "td", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](78, 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](79, AttendanceSummaryReportComponent_th_79_Template, 3, 3, "th", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](80, AttendanceSummaryReportComponent_td_80_Template, 3, 5, "td", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](81, 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](82, AttendanceSummaryReportComponent_th_82_Template, 1, 0, "th", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](83, AttendanceSummaryReportComponent_td_83_Template, 6, 4, "td", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](84, AttendanceSummaryReportComponent_tr_84_Template, 1, 0, "tr", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](85, AttendanceSummaryReportComponent_tr_85_Template, 1, 0, "tr", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](86, AttendanceSummaryReportComponent_tr_86_Template, 4, 3, "tr", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](87, "mat-paginator", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](10);
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx.searchForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](6, 24, "From Date"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matDatepicker", _r0)("min", ctx.minDate)("max", ctx.maxDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("for", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](14, 26, "To Date"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matDatepicker", _r1)("min", ctx.minToDate)("max", ctx.maxDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("for", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](22, 28, "Employee Name"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formControl", ctx.searchControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](27, 30, "All Employees"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.filteredEmployeeList);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("tabIndex", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](33, 32, "Search"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("tabIndex", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](38, 34, "Clear"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.displayLength);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](40);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("pageSizeOptions", !ctx.pageLoading ? ctx.getPageSizes() : _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](36, _c1));
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_material_core__WEBPACK_IMPORTED_MODULE_13__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatButton, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__.MatDatepicker, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__.MatDatepickerToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_18__.MatInput, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__.MatPaginator, _angular_material_select__WEBPACK_IMPORTED_MODULE_19__.MatSelect, _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_7__.MatNoDataRow, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlName, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_20__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_20__.DefaultLayoutAlignDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_20__.DefaultFlexDirective, _angular_common__WEBPACK_IMPORTED_MODULE_9__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_9__.DatePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslatePipe], styles: [".cdk-overlay-container {\n  z-index: 1050 !important;\n}\n\nmat-card[_ngcontent-%COMP%] {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  display: block;\n  position: relative;\n  padding-left: 0px;\n  padding-right: 0px;\n}\n\n  .mat-select-panel[aria-label=\"Items per page:\"] mat-option:last-child:before {\n  content: \"All\";\n  position: relative;\n  display: block;\n}\n\n  .mat-select-panel[aria-label=\"Items per page:\"] mat-option:last-child .mat-option-text {\n  display: none;\n}\n\n.headerbox[_ngcontent-%COMP%] {\n  height: 45px;\n  background-color: #28acaf !important;\n  align-items: center;\n}\n\n.title[_ngcontent-%COMP%] {\n  font-family: \"Roboto\";\n  font-size: 20px;\n  font-weight: 500;\n  font-stretch: normal;\n  font-style: normal;\n  letter-spacing: 0.32px;\n  color: #ffffff;\n  margin-bottom: 0px;\n}\n\n  tr.mat-header-row {\n  height: 45px !important;\n}\n\n .mat-form-field-appearance-outline .mat-form-field-wrapper {\n  margin: 0.2em 0 !important;\n}\n\n.dev-Pad[_ngcontent-%COMP%] {\n  padding-top: 1%;\n  padding-left: 11px;\n  padding-right: 8px;\n}\n\n.table-pad[_ngcontent-%COMP%] {\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n.example-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  display: flex;\n  flex-direction: column;\n}\n\n@media only screen and (max-width: 800px) and (orientation: portrait) {\n  mat-header-row[_ngcontent-%COMP%], mat-row[_ngcontent-%COMP%] {\n    width: 150%;\n  }\n}\n\ntable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 2px 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0dGVuZGFuY2Utc3VtbWFyeS1yZXBvcnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx3QkFBQTtBQUNGOztBQUVBO0VBQ0UseURBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBSUk7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBRE47O0FBUUk7RUFDRSxhQUFBO0FBTE47O0FBU0E7RUFDRSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxtQkFBQTtBQU5GOztBQVFBO0VBQ0UscUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUFMRjs7QUFRQTtFQUNFLHVCQUFBO0FBTEY7O0FBT0E7RUFDRSwwQkFBQTtBQUpGOztBQU1BO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUFIRjs7QUFLQTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7QUFGRjs7QUFJQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBREY7O0FBSUE7RUFDRTs7SUFFRSxXQUFBO0VBREY7QUFDRjs7QUFHQTs7RUFFRSxpQkFBQTtBQURGIiwiZmlsZSI6ImF0dGVuZGFuY2Utc3VtbWFyeS1yZXBvcnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6Om5nLWRlZXAgLmNkay1vdmVybGF5LWNvbnRhaW5lciB7XHJcbiAgei1pbmRleDogMTA1MCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5tYXQtY2FyZCB7XHJcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAyODBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBwYWRkaW5nLWxlZnQ6IDBweDtcclxuICBwYWRkaW5nLXJpZ2h0OiAwcHg7XHJcbn1cclxuXHJcbjo6bmctZGVlcCB7XHJcbiAgLm1hdC1zZWxlY3QtcGFuZWxbYXJpYS1sYWJlbD1cIkl0ZW1zIHBlciBwYWdlOlwiXSB7XHJcbiAgICBtYXQtb3B0aW9uOmxhc3QtY2hpbGQ6YmVmb3JlIHtcclxuICAgICAgY29udGVudDogXCJBbGxcIjtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbjo6bmctZGVlcCB7XHJcbiAgLm1hdC1zZWxlY3QtcGFuZWxbYXJpYS1sYWJlbD1cIkl0ZW1zIHBlciBwYWdlOlwiXSB7XHJcbiAgICBtYXQtb3B0aW9uOmxhc3QtY2hpbGQgLm1hdC1vcHRpb24tdGV4dCB7XHJcbiAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbi5oZWFkZXJib3gge1xyXG4gIGhlaWdodDogNDVweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjhhY2FmICFpbXBvcnRhbnQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG4udGl0bGUge1xyXG4gIGZvbnQtZmFtaWx5OiBcIlJvYm90b1wiO1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBsZXR0ZXItc3BhY2luZzogMC4zMnB4O1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG4gIG1hcmdpbi1ib3R0b206IDBweDtcclxufVxyXG5cclxuOjpuZy1kZWVwIHRyLm1hdC1oZWFkZXItcm93IHtcclxuICBoZWlnaHQ6IDQ1cHggIWltcG9ydGFudDtcclxufVxyXG46Om5nLWRlZXAubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIHtcclxuICBtYXJnaW46IDAuMmVtIDAgIWltcG9ydGFudDtcclxufVxyXG4uZGV2LVBhZCB7XHJcbiAgcGFkZGluZy10b3A6IDElO1xyXG4gIHBhZGRpbmctbGVmdDogMTFweDtcclxuICBwYWRkaW5nLXJpZ2h0OiA4cHg7XHJcbn1cclxuLnRhYmxlLXBhZCB7XHJcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XHJcbn1cclxuLmV4YW1wbGUtY29udGFpbmVyIHtcclxuICBvdmVyZmxvdy14OiBhdXRvO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4MDBweCkgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcclxuICBtYXQtaGVhZGVyLXJvdyxcclxuICBtYXQtcm93IHtcclxuICAgIHdpZHRoOiAxNTAlO1xyXG4gIH1cclxufVxyXG50YWJsZSB0ZCxcclxudGFibGUgdGgge1xyXG4gIHBhZGRpbmc6IDJweCAxMHB4O1xyXG59XHJcblxyXG4iXX0= */"] });


/***/ }),

/***/ 98707:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/reports/pages/common-reports/components/checkinoutsummaryreport/checkinoutsummaryreport.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckinoutsummaryreportComponent": () => (/* binding */ CheckinoutsummaryreportComponent),
/* harmony export */   "MY_FORMATS": () => (/* binding */ MY_FORMATS)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material-moment-adapter */ 77118);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/core */ 59121);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/table */ 85288);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 56908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _checkin_out_summary_report_dialog_checkin_out_summary_report_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../checkin-out-summary-report-dialog/checkin-out-summary-report-dialog.component */ 24340);
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! xlsx */ 4126);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_modules_reports_reports_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/reports/reports.service */ 48569);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ 31484);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-spinner */ 88035);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/datepicker */ 42298);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/input */ 68562);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/select */ 57371);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/flex-layout/flex */ 56722);
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/flex-layout/extended */ 63704);
/* harmony import */ var _custom_directive_narration_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../custom-directive/narration.pipe */ 36928);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ngx-translate/core */ 38699);
/* harmony import */ var src_app_custom_directive_limit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/custom-directive/limit */ 69747);

























const _c0 = ["table"];
function CheckinoutsummaryreportComponent_mat_option_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const list_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", list_r7.empid);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", list_r7.empname, " -- ", list_r7.empcode, "");
} }
function CheckinoutsummaryreportComponent_table_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "table", 31)(1, "thead", 32)(2, "tr")(3, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "th", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "th", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "th", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "th", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "th", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "th", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "th", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](29, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "th", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](32, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 10, "A - Absent"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 12, "P - Present"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](11, 14, "W - Week-Off"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](14, 16, "L - Leave"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](17, 18, "H - Holiday"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](20, 20, "HD - Half Day"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](23, 22, "WP - Week-off Present"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](26, 24, "HP - Holiday Present"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](29, 26, "HL - Halfday Leave"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](32, 28, "LP - Loss of Pay"), " ");
} }
function CheckinoutsummaryreportComponent_p_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 43)(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "narration");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("*", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 2, "Note:"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 4, "report_punch_summary_msg"));
} }
function CheckinoutsummaryreportComponent_table_44_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "th", 51)(2, "u");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](7, "limit");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const a_r10 = ctx.$implicit;
    const i_r11 = ctx.index;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](4, 2, a_r10, "d"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](7, 5, ctx_r8.headersList[1][i_r11], 3), " ");
} }
const _c1 = function (a0) { return { color: a0 }; };
function CheckinoutsummaryreportComponent_table_44_ng_container_18_ng_container_14_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "p", 60)(2, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const t_r19 = ctx.$implicit;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](2, _c1, ctx_r18.getColor(t_r19)));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](t_r19);
} }
function CheckinoutsummaryreportComponent_table_44_ng_container_18_ng_container_14_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, CheckinoutsummaryreportComponent_table_44_ng_container_18_ng_container_14_ng_container_2_ng_container_1_Template, 4, 4, "ng-container", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const e_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", e_r14);
} }
function CheckinoutsummaryreportComponent_table_44_ng_container_18_ng_container_14_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "b", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const e_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](2, _c1, ctx_r17.getColor(e_r14)));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](e_r14);
} }
function CheckinoutsummaryreportComponent_table_44_ng_container_18_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, CheckinoutsummaryreportComponent_table_44_ng_container_18_ng_container_14_ng_container_2_Template, 2, 1, "ng-container", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, CheckinoutsummaryreportComponent_table_44_ng_container_18_ng_container_14_ng_template_3_Template, 2, 4, "ng-template", null, 59, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const e_r14 = ctx.$implicit;
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](4);
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r13.isArray(e_r14))("ngIfElse", _r16);
} }
function CheckinoutsummaryreportComponent_table_44_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "tr")(2, "td", 52)(3, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "td", 53)(6, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "td", 54)(9, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "td", 55)(12, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, CheckinoutsummaryreportComponent_table_44_ng_container_18_ng_container_14_Template, 5, 2, "ng-container", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "td")(16, "button", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CheckinoutsummaryreportComponent_table_44_ng_container_18_Template_button_click_16_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r23); const item_r12 = restoredCtx.$implicit; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r22.openDialog(item_r12)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "a", 57)(18, "u");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](item_r12[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](item_r12[1]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](item_r12[2]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](item_r12[3]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", item_r12.slice(4));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("tabIndex", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](20, 7, "Details"));
} }
function CheckinoutsummaryreportComponent_table_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "table", 44)(1, "thead", 45)(2, "tr")(3, "th", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "th", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "th", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "th", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, CheckinoutsummaryreportComponent_table_44_ng_container_15_Template, 8, 8, "ng-container", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](16, "th", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](18, CheckinoutsummaryreportComponent_table_44_ng_container_18_Template, 21, 9, "ng-container", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 6, "S. No."));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 8, "Emp. ID"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](11, 10, "Emp. Name"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](14, 12, "Reporting Manager"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r5.headersList[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r5.List);
} }
function CheckinoutsummaryreportComponent_div_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "No data found."), " ");
} }
const moment = moment__WEBPACK_IMPORTED_MODULE_0__;
const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'MM-YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};
class CheckinoutsummaryreportComponent {
    constructor(reportsService, datePipe, formBuilder, dialog, spinner) {
        this.reportsService = reportsService;
        this.datePipe = datePipe;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.spinner = spinner;
        this.searchForm = _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormGroup;
        this.locationIshide = false;
        this.locationIschecked = false;
        this.selectedLocations = [];
        this.managersDetails = [];
        this.filteredManagers = [];
        this.worklocationDetails = [];
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl('');
        this.searchControlforLoc = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl('');
        this.searchControlforRM = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl('');
        this.filteredLocations = [];
        this.mgrIshide = false;
        this.mgrIschecked = false;
        this.selectedManagers = [];
        this.filteredEmployees = [];
        this.cdate = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl(moment());
        this.List = [];
        this.minDate = new Date('2020/01/01');
        this.maxDate = new Date();
        this.isLoading = false;
        this.dataSource = [];
        this.headersList = [];
        this.dateValue = [];
    }
    ngOnInit() {
        this.companyName = sessionStorage.getItem('companyName');
        this.searchForm = this.formBuilder.group({
            fromDate: [new Date()],
            toDate: [new Date()],
            employees: ['0'],
        });
        this.userSession = JSON.parse(sessionStorage.getItem('user') ?? '');
        this.searchControl.valueChanges.subscribe((searchText) => {
            this.filterEmployees(searchText);
        });
        this.getEmployeelist();
        this.Searchform();
    }
    filterEmployees(searchText) {
        this.filteredEmployees = this.employeelist.filter((val) => val.empcode.toLowerCase().includes(searchText.toLowerCase()) ||
            val.empname.toLowerCase().includes(searchText.toLowerCase()));
        if (this.filteredEmployees.length <= 0) {
            this.searchControl.setValue('');
        }
    }
    getEmployeelist() {
        let obj = {
            remployee_id: this.userSession.id,
        };
        this.reportsService
            .getReportsuserEmployeesList(obj)
            .subscribe((res) => {
            if (res.status) {
                this.employeelist = [];
                this.employeelist = res.data;
                this.filteredEmployees = this.employeelist;
                this.searchForm.controls.Users.setValue('0');
            }
        });
    }
    setMonthAndYear(normalizedMonthAndYear, datepicker) {
        const ctrlValue = this.cdate.value;
        ctrlValue.month(normalizedMonthAndYear.month());
        ctrlValue.year(normalizedMonthAndYear.year());
        this.searchForm.controls.fromDate.setValue(ctrlValue);
        datepicker.close();
    }
    exportAsXLSX() {
        let date = this.datePipe.transform(this.searchForm.controls.fromDate.value, 'MM-YYYY');
        const displayedColumns = Object.keys(this.dataSource.data[0]);
        const headercolumn = [
            'S. No.',
            'Emp. Code',
            'Emp. Name',
            'Reporting Manager',
            ...this.headersList[0].map((date, index) => {
                const dayNumber = index + 1; // Index + 1 for 1-based numbering
                const dayWeek = this.headersList[1][index]?.slice(0, 2) || ''; // Get first two letters of weekday or default to empty string
                return `${dayNumber}${dayWeek}`; // Format as "1Th", "2Fr", etc.
            }),
        ];
        // Example data row; in real usage, map your actual data source here
        const data = this.dataSource.data.map((row) => displayedColumns.map((col) => {
            let value = row[col];
            return Array.isArray(value) ? value.join(', ') : value;
        }));
        // const header = displayedColumns.map((col: any) => col.charAt(0).toUpperCase() + col.slice(1));
        const excelData = [headercolumn, ...data];
        // Create a worksheet
        const ws = xlsx__WEBPACK_IMPORTED_MODULE_7__.utils.aoa_to_sheet(excelData);
        // Create a workbook
        const wb = xlsx__WEBPACK_IMPORTED_MODULE_7__.utils.book_new();
        xlsx__WEBPACK_IMPORTED_MODULE_7__.utils.book_append_sheet(wb, ws, 'Punch Summary Report');
        // Save the file
        xlsx__WEBPACK_IMPORTED_MODULE_7__.writeFile(wb, date + '-' + 'punch_summary_report.xlsx');
    }
    resetform() {
        this.searchForm.controls.employees.setValue('0');
        this.searchForm.controls.fromDate.setValue(new Date());
        this.Searchform();
    }
    getColor(i) {
        let color = '';
        if (i == 'P') {
            return (color = 'green');
        }
        else if (i == 'H') {
            return (color = '#800000');
        }
        else if (i == 'W') {
            return (color = 'blue');
        }
        else if (i == 'L' || i == 'LP') {
            return (color = 'orange');
        }
        else if (i == 'HD') {
            return (color = '#ce06e4');
        }
        else if (i == 'WP') {
            return (color = '#06c3e4');
        }
        else if (i == 'HP') {
            return (color = '#06e471');
        }
        else if (i == 'A') {
            return (color = 'red');
        }
        else if (i == "HL") {
            return color = '#8338ec';
        }
        else {
            return (color = 'black');
        }
    }
    Searchform() {
        if (this.searchForm.valid) {
            this.dateValue = this.datePipe.transform(this.searchForm.controls.fromDate.value, 'y-MM-dd');
            let data = {};
            let employeeid = this.searchForm.controls.employees.value;
            if (employeeid === '0') {
                employeeid = null;
                data = {
                    remployee_id: this.userSession.id,
                    employee_id: employeeid,
                    calendar_date: this.datePipe.transform(this.searchForm.controls.fromDate.value, 'y-MM-dd'),
                };
            }
            else {
                data = {
                    remployee_id: null,
                    employee_id: parseInt(employeeid),
                    calendar_date: this.datePipe.transform(this.searchForm.controls.fromDate.value, 'y-MM-dd'),
                };
            }
            this.spinner.show();
            this.isLoading = true;
            this.reportsService
                .getAttendanceDetailedMonthlyReportForReportsuser(data)
                .subscribe((res) => {
                this.headersList = [];
                this.List = [];
                if (res.status) {
                    let i = 0;
                    res.data.forEach((e) => {
                        if (i < 2) {
                            let header = JSON.parse(e.result);
                            this.headersList.push(header);
                        }
                        else {
                            let header = JSON.parse(e.result);
                            this.List.push(header);
                        }
                        i++;
                    });
                }
                this.isLoading = false;
                this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatTableDataSource(this.List);
                this.spinner.hide();
            }, (error) => {
                this.isLoading = false;
                error.error.text;
                this.spinner.hide();
            });
        }
    }
    // this function is check if the result data is array or string
    isArray(item) {
        return Array.isArray(item);
    }
    openDialog(item) {
        const dialogRef = this.dialog.open(_checkin_out_summary_report_dialog_checkin_out_summary_report_dialog_component__WEBPACK_IMPORTED_MODULE_1__.CheckinOutSummaryReportDialogComponent, {
            width: '1000px',
            position: { top: `70px` },
            data: {
                employeeId: item[1],
                empname: item[2],
                calenderDate: this.dateValue,
            },
        });
        dialogRef.afterClosed().subscribe((result) => { });
    }
}
CheckinoutsummaryreportComponent.ɵfac = function CheckinoutsummaryreportComponent_Factory(t) { return new (t || CheckinoutsummaryreportComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_modules_reports_reports_service__WEBPACK_IMPORTED_MODULE_2__.ReportsService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_9__.DatePipe), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_11__.NgxSpinnerService)); };
CheckinoutsummaryreportComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: CheckinoutsummaryreportComponent, selectors: [["app-checkinoutsummaryreport"]], viewQuery: function CheckinoutsummaryreportComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.table = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([
            {
                provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.DateAdapter,
                useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__.MomentDateAdapter,
                deps: [_angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MAT_DATE_LOCALE],
            },
            { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MAT_DATE_FORMATS, useValue: MY_FORMATS },
        ])], decls: 46, vars: 30, consts: [["fxLayout", "column", 2, "margin-top", "10px", 3, "formGroup"], ["fxLayout", "row", "fxLayout.lt-lg", "column"], ["fxLayout", "row", "fxFlex", "50", "fxLayout.xs", "column"], ["fxFlex", "50", "fxFlex.xs", "100", "appearance", "outline", 1, "mx-2", "my-2"], ["formControlName", "employees", "tabindex", "1"], ["type", "text", "placeholder", "Search", "matInput", "", 1, "search-align", 3, "formControl"], ["value", "0"], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", "readonly", "", "placeholder", "", "formControlName", "fromDate", 3, "matDatepicker", "min", "max", "click"], ["matSuffix", "", 1, "datepicker", 3, "for"], ["startView", "multi-year", 3, "monthSelected"], ["fromDate", ""], ["fxLayout", "row", "fxLayoutAlign", "space-between center"], ["fxFlex", "50", "fxLayout", "row", "fxLayoutAlign", "end"], ["tabIndex", "2", 1, "btn", "btn-primary", "mr-2", "mb-2", 3, "click"], [1, "line", 2, "color", "#1898d5", "font-size", "16px"], ["tabIndex", "3", 1, "btn", "btn-danger", "mr-2", "mb-2", 3, "click"], ["fxFlex", "50", "fxLayoutAlign", "end"], [2, "padding-right", "2%"], ["mat-icon-button", ""], [3, "title", "tabIndex", "keyup.enter"], ["src", "./assets/images/icons/excel.png", 3, "click"], ["class", "rTable", 4, "ngIf"], ["style", "color:red;margin-left: 2%;", 4, "ngIf"], [1, "p-2"], [1, "example-container", 2, "padding", "10px"], ["table", ""], [2, "display", "flex", "overflow-x", "auto", "max-height", "500px"], ["class", "dataTable", "style", "width: 100%", "id", "table", 4, "ngIf"], ["style", "text-align: center; padding-top: 20px", 4, "ngIf"], [3, "value"], [1, "rTable"], [1, "rHeader"], [1, "red-icon"], [1, "green-icon"], [1, "blue-icon"], [1, "orange-icon"], [1, "yellow-icon"], [1, "light-icon"], [1, "wp-icon"], [1, "hp-icon"], [1, "hl-icon"], [1, "legend-item", "orange-icon"], [2, "color", "red", "margin-left", "2%"], ["id", "table", 1, "dataTable", 2, "width", "100%"], [1, "theader"], [1, "sticky-col", "sticky-header", 2, "left", "0"], [1, "sticky-col", "sticky-header", 2, "left", "80px"], [1, "sticky-col", "sticky-header", 2, "left", "180px"], [1, "sticky-col", "sticky-header", 2, "left", "280px"], [4, "ngFor", "ngForOf"], [1, "sticky-header", 2, "width", "60px"], [1, "sticky-col", 2, "left", "0"], [1, "sticky-col", 2, "left", "80px"], [1, "sticky-col", 2, "left", "180px"], [1, "sticky-col", 2, "left", "280px"], ["mat-icon-button", "", 3, "tabIndex", "click"], [2, "color", "blue"], [4, "ngIf", "ngIfElse"], ["singleValue", ""], [2, "margin", "0", 3, "ngStyle"], [3, "ngStyle"], [2, "text-align", "center", "padding-top", "20px"]], template: function CheckinoutsummaryreportComponent_Template(rf, ctx) { if (rf & 1) {
        const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "form", 0)(1, "div", 1)(2, "div", 2)(3, "mat-form-field", 3)(4, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "mat-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, CheckinoutsummaryreportComponent_mat_option_12_Template, 2, 3, "mat-option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "mat-form-field", 3)(14, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](16, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CheckinoutsummaryreportComponent_Template_input_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r24); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](20); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](_r1.open()); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](18, "mat-datepicker-toggle", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "mat-datepicker", 10, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("monthSelected", function CheckinoutsummaryreportComponent_Template_mat_datepicker_monthSelected_19_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r24); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](20); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx.setMonthAndYear($event, _r1)); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "div", 12)(22, "div", 13)(23, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CheckinoutsummaryreportComponent_Template_button_click_23_listener() { return ctx.Searchform(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](25, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](26, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CheckinoutsummaryreportComponent_Template_button_click_27_listener() { return ctx.resetform(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](30, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "div", 17)(32, "div", 18)(33, "button", 19)(34, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("keyup.enter", function CheckinoutsummaryreportComponent_Template_a_keyup_enter_34_listener() { return ctx.exportAsXLSX(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](35, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](36, "img", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CheckinoutsummaryreportComponent_Template_img_click_36_listener() { return ctx.exportAsXLSX(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](37, CheckinoutsummaryreportComponent_table_37_Template, 33, 30, "table", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](38, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](39, CheckinoutsummaryreportComponent_p_39_Template, 6, 6, "p", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](40, "div", 24)(41, "div", 25, 26)(43, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](44, CheckinoutsummaryreportComponent_table_44_Template, 19, 14, "table", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](45, CheckinoutsummaryreportComponent_div_45_Template, 3, 3, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx.searchForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](6, 18, "Employee Name and ID"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formControl", ctx.searchControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](11, 20, "All Employees"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.filteredEmployees);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](16, 22, "Month and Year"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matDatepicker", _r1)("min", ctx.minDate)("max", ctx.maxDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("for", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](25, 24, "Search"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](30, 26, "Clear"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](35, 28, "Excel"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("tabIndex", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.List.length >= 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.List.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.List.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.List.length === 0);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgStyle, _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__.MatDatepicker, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__.MatDatepickerToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_18__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlName, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_19__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_19__.DefaultLayoutAlignDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_19__.DefaultFlexDirective, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_20__.DefaultStyleDirective, _angular_common__WEBPACK_IMPORTED_MODULE_9__.DatePipe, _custom_directive_narration_pipe__WEBPACK_IMPORTED_MODULE_3__.NarrationPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslatePipe, src_app_custom_directive_limit__WEBPACK_IMPORTED_MODULE_4__.Limit], styles: ["table[_ngcontent-%COMP%], td[_ngcontent-%COMP%], th[_ngcontent-%COMP%] {\n  border: 1px solid;\n}\n\n.mat-elevation-z8[_ngcontent-%COMP%] {\n  display: block;\n  max-width: fit-content;\n  margin: 0 auto;\n  overflow-x: auto;\n  white-space: nowrap;\n}\n\nthead[_ngcontent-%COMP%] {\n  background-color: #28acaf;\n  color: white;\n  font-stretch: normal;\n  font-style: normal;\n  letter-spacing: 0.32px;\n  font-weight: normal;\n  font-family: sans-serif;\n}\n\nth[_ngcontent-%COMP%] {\n  padding: 2px;\n  text-align: center;\n}\n\ntd[_ngcontent-%COMP%] {\n  padding: 9px;\n  text-align: center;\n}\n\nmat-card[_ngcontent-%COMP%] {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  display: block;\n  position: relative;\n  padding-left: 0px;\n  padding-right: 0px;\n}\n\n.tablePadding[_ngcontent-%COMP%] {\n  padding-left: 2%;\n  padding-right: 2%;\n  padding-top: 2%;\n}\n\n  .mat-select-panel[aria-label=\"Items per page:\"] mat-option:last-child:before {\n  content: \"All\";\n}\n\n  .mat-select-panel[aria-label=\"Items per page:\"] mat-option:last-child .mat-option-text {\n  display: none;\n}\n\n.headerbox[_ngcontent-%COMP%] {\n  height: 45px;\n  background-color: #28acaf !important;\n  align-items: center;\n}\n\n.title[_ngcontent-%COMP%] {\n  font-family: \"Roboto\";\n  font-size: 20px;\n  font-weight: 500;\n  font-stretch: normal;\n  font-style: normal;\n  letter-spacing: 0.32px;\n  color: #ffffff;\n  margin-bottom: 0px;\n}\n\n  tr.mat-header-row {\n  height: 45px !important;\n}\n\n .mat-form-field-appearance-outline .mat-form-field-wrapper {\n  margin: 0.2em 0 !important;\n}\n\n .mat-drawer-container {\n  background-color: #fafafa;\n  color: rgba(135, 130, 130, 0.87);\n}\n\n.example-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n\n\n.green-icon[_ngcontent-%COMP%] {\n  color: green;\n  border-color: black;\n}\n\n.red-icon[_ngcontent-%COMP%] {\n  color: red;\n  border-color: black;\n}\n\n.blue-icon[_ngcontent-%COMP%] {\n  color: blue;\n  border-color: black;\n}\n\n.yellow-icon[_ngcontent-%COMP%] {\n  color: #800000;\n  border-color: black;\n}\n\n.orange-icon[_ngcontent-%COMP%] {\n  color: #ff8c00;\n  border-color: black;\n}\n\n.light-icon[_ngcontent-%COMP%] {\n  color: #ce06e4;\n  border-color: black;\n}\n\n.wp-icon[_ngcontent-%COMP%] {\n  color: #06c3e4;\n  border-color: black;\n}\n\n.hp-icon[_ngcontent-%COMP%] {\n  color: #06e471;\n  border-color: black;\n}\n\n.rTable[_ngcontent-%COMP%] {\n  width: 90% !important;\n  margin-left: 20px;\n  margin-top: 10px;\n  overflow-x: auto;\n}\n\n.rHeader[_ngcontent-%COMP%] {\n  background-color: #ffffff !important;\n  font-stretch: normal;\n  font-style: normal;\n  letter-spacing: 0.32px;\n  font-weight: bolder;\n  font-family: sans-serif;\n  font-size: 14px;\n  overflow-x: auto;\n}\n\n.search-sty[_ngcontent-%COMP%] {\n  height: 40px;\n}\n\ntd[_ngcontent-%COMP%] {\n  border-color: black;\n}\n\n.theader[_ngcontent-%COMP%] {\n  font-stretch: normal;\n  font-style: normal;\n  letter-spacing: 0.32px;\n  font-weight: normal;\n  font-family: sans-serif;\n  font-size: 15px;\n}\n\n\n\n.sticky-col[_ngcontent-%COMP%] {\n  position: sticky;\n  background-color: white;\n  z-index: 2;\n  white-space: nowrap;\n  border-right: 1px solid #ddd;\n  padding: 4px; \n  box-sizing: border-box;\n  margin: 0;\n}\n\n\n\n.dataTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(1), .dataTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(1) {\n  left: 0; \n  width: 80px; \n}\n\n.dataTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(2), .dataTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(2) {\n  left: 80px; \n  width: 100px; \n}\n\n.dataTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(3), .dataTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(3) {\n  left: 180px; \n  width: 100px; \n}\n\n.dataTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(4), .dataTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(4) {\n  left: 280px; \n  width: 200px; \n}\n\n\n\n.sticky-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  background-color: #28acaf;\n  z-index: 3;\n  color: white;\n  border-bottom: 1px solid #ddd;\n  padding: 2px; \n  box-sizing: border-box;\n  text-align: center;\n}\n\n\n\nthead[_ngcontent-%COMP%]   .sticky-col[_ngcontent-%COMP%] {\n  z-index: 4;\n}\n\n\n\n.dataTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  \n  height: auto; \n  text-align: center;\n  border: 1px solid #ddd;\n  box-sizing: border-box;\n  margin: 0;\n  overflow: hidden; \n  text-overflow: ellipsis; \n}\n\n.wrap[_ngcontent-%COMP%] {\n  white-space: normal !important;\n  word-wrap: break-word !important;\n  overflow-wrap: break-word !important;\n  word-break: break-all !important;\n}\n\n\n\ntable[_ngcontent-%COMP%] {\n  border-collapse: collapse;\n  table-layout: fixed;\n  width: 100%;\n}\n\n\n\ntbody[_ngcontent-%COMP%]   td.sticky-col[_ngcontent-%COMP%] {\n  background-color: white;\n  border-right: 1px solid #ddd;\n  z-index: 1;\n}\n\n\n\nthead[_ngcontent-%COMP%]   .sticky-header[_ngcontent-%COMP%], tbody[_ngcontent-%COMP%]   .sticky-col[_ngcontent-%COMP%] {\n  background-clip: padding-box;\n}\n\n\n\n.compact-content[_ngcontent-%COMP%] {\n  font-size: 12px; \n  line-height: 1.2; \n}\n\n.dataTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(-n+3) {\n  white-space: normal;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  hyphens: auto;\n}\n\n@media screen and (max-width: 767px) {\n  .dataTable[_ngcontent-%COMP%] {\n    width: 100%; \n    table-layout: auto; \n  }\n  .example-container[_ngcontent-%COMP%] {\n    overflow-x: auto; \n    width: 100%; \n  }\n  \n  .dataTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .dataTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .sticky-header[_ngcontent-%COMP%], .sticky-col[_ngcontent-%COMP%] {\n    position: static !important;\n    left: auto !important;\n    width: auto !important; \n    min-width: 100px; \n  }\n  \n  .dataTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .dataTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    white-space: normal;\n    word-wrap: break-word;\n    overflow-wrap: break-word;\n    hyphens: auto;\n    padding: 8px 4px; \n    font-size: 14px; \n  }\n  \n  \n  thead[_ngcontent-%COMP%] {\n    display: table-header-group;\n  }\n}\n\n\n\n@media screen and (min-width: 768px) {\n  \n  .sticky-col[_ngcontent-%COMP%] {\n    position: sticky;\n    z-index: 2;\n    white-space: nowrap;\n  }\n  .sticky-header[_ngcontent-%COMP%] {\n    position: sticky;\n    top: 0;\n    background-color: #28acaf;\n    z-index: 3;\n    color: white;\n  }\n  .dataTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(1), .dataTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(1) {\n    left: 0;\n    width: 80px;\n  }\n  .dataTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(2), .dataTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(2) {\n    left: 80px;\n    width: 100px;\n  }\n  .dataTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(3), .dataTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(3) {\n    left: 180px;\n    width: 100px;\n  }\n  .dataTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(4), .dataTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(4) {\n    left: 300px;\n    width: 150px;\n  }\n}\n\n@media screen and (max-width: 767px) {\n  .rTable[_ngcontent-%COMP%] {\n    width: 100% !important;\n    margin-left: 0;\n    overflow-x: hidden;\n    border: none;\n  }\n  .rHeader[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 10px;\n  }\n  .rHeader[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    padding: 5px;\n    font-size: 12px;\n    white-space: nowrap;\n    background-color: transparent; \n  }\n}\n\n.hl-icon[_ngcontent-%COMP%] {\n  color: #8338ec;\n  border-color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoZWNraW5vdXRzdW1tYXJ5cmVwb3J0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7RUFHRSxpQkFBQTtBQUNGOztBQUNBO0VBQ0UsY0FBQTtFQUVBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFFRjs7QUFBQTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtFQUVBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFFRjs7QUFBQTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtBQUdGOztBQURBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0FBSUY7O0FBRkE7RUFDRSx5REFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFLRjs7QUFIQTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0FBTUY7O0FBREk7RUFDRSxjQUFBO0FBSU47O0FBR0k7RUFDRSxhQUFBO0FBQU47O0FBSUE7RUFDRSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxtQkFBQTtBQURGOztBQUdBO0VBQ0UscUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUFBRjs7QUFFQTtFQUNFLHVCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSwwQkFBQTtBQUVGOztBQUFBO0VBQ0UseUJBQUE7RUFDQSxnQ0FBQTtBQUdGOztBQURBO0VBQ0UsZ0JBQUE7QUFJRjs7QUFEQSxNQUFBOztBQUNBO0VBQ0UsWUFBQTtFQUNBLG1CQUFBO0FBSUY7O0FBRkE7RUFDRSxVQUFBO0VBQ0EsbUJBQUE7QUFLRjs7QUFIQTtFQUNFLFdBQUE7RUFDQSxtQkFBQTtBQU1GOztBQUpBO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0FBT0Y7O0FBTEE7RUFDRSxjQUFBO0VBQ0EsbUJBQUE7QUFRRjs7QUFMQTtFQUNFLGNBQUE7RUFDQSxtQkFBQTtBQVFGOztBQU5BO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0FBU0Y7O0FBUEE7RUFDRSxjQUFBO0VBQ0EsbUJBQUE7QUFVRjs7QUFQQTtFQUNFLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBVUY7O0FBUkE7RUFDRSxvQ0FBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFXRjs7QUFUQTtFQUNFLFlBQUE7QUFZRjs7QUFUQTtFQUNFLG1CQUFBO0FBWUY7O0FBVkE7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtBQWFGOztBQVZBLG1CQUFBOztBQUNBO0VBQ0UsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxtQkFBQTtFQUNBLDRCQUFBO0VBQ0EsWUFBQSxFQUFBLG9CQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0FBYUY7O0FBVkEsK0RBQUE7O0FBQ0E7O0VBRUUsT0FBQSxFQUFBLFdBQUE7RUFDQSxXQUFBLEVBQUEsa0JBQUE7QUFhRjs7QUFWQTs7RUFFRSxVQUFBLEVBQUEsNkNBQUE7RUFDQSxZQUFBLEVBQUEsa0JBQUE7QUFhRjs7QUFWQTs7RUFFRSxXQUFBLEVBQUEseURBQUE7RUFDQSxZQUFBLEVBQUEsa0JBQUE7QUFhRjs7QUFYQTs7RUFFRSxXQUFBLEVBQUEseURBQUE7RUFDQSxZQUFBLEVBQUEsa0JBQUE7QUFjRjs7QUFWQSxrQkFBQTs7QUFDQTtFQUNFLGdCQUFBO0VBQ0EsTUFBQTtFQUNBLHlCQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtFQUNBLFlBQUEsRUFBQSxvQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUFhRjs7QUFWQSx1RUFBQTs7QUFDQTtFQUNFLFVBQUE7QUFhRjs7QUFWQSwwQkFBQTs7QUFDQTtFQUNFLGlDQUFBO0VBQ0EsWUFBQSxFQUFBLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUVBLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBLEVBQUEsMEJBQUE7RUFDQSx1QkFBQSxFQUFBLHNDQUFBO0FBWUY7O0FBVEE7RUFDRSw4QkFBQTtFQUNBLGdDQUFBO0VBQ0Esb0NBQUE7RUFDQSxnQ0FBQTtBQVlGOztBQVRBLGdDQUFBOztBQUNBO0VBQ0UseUJBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUFZRjs7QUFSQSwrQ0FBQTs7QUFDQTtFQUNFLHVCQUFBO0VBQ0EsNEJBQUE7RUFDQSxVQUFBO0FBV0Y7O0FBUEEsd0NBQUE7O0FBQ0E7O0VBRUUsNEJBQUE7QUFVRjs7QUFQQSxtQ0FBQTs7QUFDQTtFQUNFLGVBQUEsRUFBQSxzQkFBQTtFQUNBLGdCQUFBLEVBQUEsd0JBQUE7QUFVRjs7QUFSQTtFQUNFLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSx5QkFBQTtFQUNBLGFBQUE7QUFXRjs7QUFUQTtFQUVFO0lBQ0UsV0FBQSxFQUFBLGtDQUFBO0lBQ0Esa0JBQUEsRUFBQSw0Q0FBQTtFQVdGO0VBUkE7SUFDRSxnQkFBQSxFQUFBLGdDQUFBO0lBQ0EsV0FBQSxFQUFBLDBDQUFBO0VBVUY7RUFQQSx5REFBQTtFQUNBOzs7O0lBSUUsMkJBQUE7SUFDQSxxQkFBQTtJQUNBLHNCQUFBLEVBQUEsb0NBQUE7SUFDQSxnQkFBQSxFQUFBLDJDQUFBO0VBU0Y7RUFOQSxxREFBQTtFQUNBOztJQUVFLG1CQUFBO0lBQ0EscUJBQUE7SUFDQSx5QkFBQTtJQUNBLGFBQUE7SUFDQSxnQkFBQSxFQUFBLDhCQUFBO0lBQ0EsZUFBQSxFQUFBLDBDQUFBO0VBUUY7RUFMQSxtREFBQTtFQUdBLHNEQUFBO0VBQ0E7SUFDRSwyQkFBQTtFQUtGO0FBQ0Y7O0FBRkEsMENBQUE7O0FBQ0E7RUFDRSwyQ0FBQTtFQUNBO0lBQ0UsZ0JBQUE7SUFFQSxVQUFBO0lBQ0EsbUJBQUE7RUFHRjtFQUNBO0lBQ0UsZ0JBQUE7SUFDQSxNQUFBO0lBQ0EseUJBQUE7SUFDQSxVQUFBO0lBQ0EsWUFBQTtFQUNGO0VBRUE7O0lBRUUsT0FBQTtJQUNBLFdBQUE7RUFBRjtFQUdBOztJQUVFLFVBQUE7SUFDQSxZQUFBO0VBREY7RUFJQTs7SUFFRSxXQUFBO0lBQ0EsWUFBQTtFQUZGO0VBSUE7O0lBRUEsV0FBQTtJQUNBLFlBQUE7RUFGQTtBQUNGOztBQU1BO0VBQ0U7SUFDRSxzQkFBQTtJQUNBLGNBQUE7SUFDQSxrQkFBQTtJQUNBLFlBQUE7RUFKRjtFQU9BO0lBQ0UsYUFBQTtJQUNBLHFDQUFBO0lBQ0EsU0FBQTtFQUxGO0VBUUE7SUFDRSxhQUFBO0lBQ0EsbUJBQUE7SUFDQSxZQUFBO0lBQ0EsZUFBQTtJQUNBLG1CQUFBO0lBQ0EsNkJBQUEsRUFBQSxxQ0FBQTtFQU5GO0FBQ0Y7O0FBVUE7RUFDRSxjQUFBO0VBQ0EsbUJBQUE7QUFSRiIsImZpbGUiOiJjaGVja2lub3V0c3VtbWFyeXJlcG9ydC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlLFxyXG50ZCxcclxudGgge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xyXG59XHJcbi5tYXQtZWxldmF0aW9uLXo4IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBtYXgtd2lkdGg6IC1tb3otZml0LWNvbnRlbnQ7XHJcbiAgbWF4LXdpZHRoOiBmaXQtY29udGVudDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBvdmVyZmxvdy14OiBhdXRvO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxudGhlYWQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOGFjYWY7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gXHJcbiAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjMycHg7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcclxufVxyXG50aCB7XHJcbiAgcGFkZGluZzogMnB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG50ZCB7XHJcbiAgcGFkZGluZzogOXB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5tYXQtY2FyZCB7XHJcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAyODBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBwYWRkaW5nLWxlZnQ6IDBweDtcclxuICBwYWRkaW5nLXJpZ2h0OiAwcHg7XHJcbn1cclxuLnRhYmxlUGFkZGluZyB7XHJcbiAgcGFkZGluZy1sZWZ0OiAyJTtcclxuICBwYWRkaW5nLXJpZ2h0OiAyJTtcclxuICBwYWRkaW5nLXRvcDogMiU7XHJcbn1cclxuIFxyXG46Om5nLWRlZXAge1xyXG4gIC5tYXQtc2VsZWN0LXBhbmVsW2FyaWEtbGFiZWw9XCJJdGVtcyBwZXIgcGFnZTpcIl0ge1xyXG4gICAgbWF0LW9wdGlvbjpsYXN0LWNoaWxkOmJlZm9yZSB7XHJcbiAgICAgIGNvbnRlbnQ6IFwiQWxsXCI7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiBcclxuOjpuZy1kZWVwIHtcclxuICAubWF0LXNlbGVjdC1wYW5lbFthcmlhLWxhYmVsPVwiSXRlbXMgcGVyIHBhZ2U6XCJdIHtcclxuICAgIG1hdC1vcHRpb246bGFzdC1jaGlsZCAubWF0LW9wdGlvbi10ZXh0IHtcclxuICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuLmhlYWRlcmJveCB7XHJcbiAgaGVpZ2h0OiA0NXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOGFjYWYgIWltcG9ydGFudDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi50aXRsZSB7XHJcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCI7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjMycHg7XHJcbiAgY29sb3I6ICNmZmZmZmY7XHJcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xyXG59XHJcbjo6bmctZGVlcCB0ci5tYXQtaGVhZGVyLXJvdyB7XHJcbiAgaGVpZ2h0OiA0NXB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuOjpuZy1kZWVwLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XHJcbiAgbWFyZ2luOiAwLjJlbSAwICFpbXBvcnRhbnQ7XHJcbn1cclxuOjpuZy1kZWVwLm1hdC1kcmF3ZXItY29udGFpbmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xyXG4gIGNvbG9yOiByZ2IoMTM1IDEzMCAxMzAgLyA4NyUpO1xyXG59XHJcbi5leGFtcGxlLWNvbnRhaW5lciB7XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxufVxyXG4gXHJcbi8qKioqKi9cclxuLmdyZWVuLWljb24ge1xyXG4gIGNvbG9yOiBncmVlbjtcclxuICBib3JkZXItY29sb3I6IGJsYWNrO1xyXG59XHJcbi5yZWQtaWNvbiB7XHJcbiAgY29sb3I6IHJlZDtcclxuICBib3JkZXItY29sb3I6IGJsYWNrO1xyXG59XHJcbi5ibHVlLWljb24ge1xyXG4gIGNvbG9yOiBibHVlO1xyXG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XHJcbn1cclxuLnllbGxvdy1pY29uIHtcclxuICBjb2xvcjogIzgwMDAwMDtcclxuICBib3JkZXItY29sb3I6IGJsYWNrO1xyXG59XHJcbi5vcmFuZ2UtaWNvbiB7XHJcbiAgY29sb3I6ICNmZjhjMDA7XHJcbiAgYm9yZGVyLWNvbG9yOiBibGFjaztcclxufVxyXG4gXHJcbi5saWdodC1pY29uIHtcclxuICBjb2xvcjogI2NlMDZlNDtcclxuICBib3JkZXItY29sb3I6IGJsYWNrO1xyXG59XHJcbi53cC1pY29uIHtcclxuICBjb2xvcjogIzA2YzNlNDtcclxuICBib3JkZXItY29sb3I6IGJsYWNrO1xyXG59XHJcbi5ocC1pY29uIHtcclxuICBjb2xvcjogIzA2ZTQ3MTtcclxuICBib3JkZXItY29sb3I6IGJsYWNrO1xyXG59XHJcbiBcclxuLnJUYWJsZSB7XHJcbiAgd2lkdGg6IDkwJSAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxufVxyXG4uckhlYWRlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50O1xyXG4gIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBsZXR0ZXItc3BhY2luZzogMC4zMnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIG92ZXJmbG93LXg6IGF1dG87XHJcbn1cclxuLnNlYXJjaC1zdHkge1xyXG4gIGhlaWdodDogNDBweDtcclxuICAvLyBwYWRkaW5nLWxlZnQ6IDEycHg7XHJcbn1cclxudGQge1xyXG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XHJcbn1cclxuLnRoZWFkZXIge1xyXG4gIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBsZXR0ZXItc3BhY2luZzogMC4zMnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG59XHJcbiBcclxuLyogU3RpY2t5IGNvbHVtbnMgKi9cclxuLnN0aWNreS1jb2wge1xyXG4gIHBvc2l0aW9uOiBzdGlja3k7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgei1pbmRleDogMjtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkZGQ7XHJcbiAgcGFkZGluZzogNHB4OyAvKiBSZWR1Y2VkIHBhZGRpbmcgKi9cclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG4gXHJcbi8qIEFkanVzdCBzcGVjaWZpYyBsZWZ0IHZhbHVlcyBiYXNlZCBvbiByZWR1Y2VkIGNvbHVtbiB3aWR0aHMgKi9cclxuLmRhdGFUYWJsZSB0aDpudGgtY2hpbGQoMSksXHJcbi5kYXRhVGFibGUgdGQ6bnRoLWNoaWxkKDEpIHtcclxuICBsZWZ0OiAwOyAvKiBTLiBOby4gKi9cclxuICB3aWR0aDogODBweDsgLyogUmVkdWNlZCB3aWR0aCAqL1xyXG59XHJcbiBcclxuLmRhdGFUYWJsZSB0aDpudGgtY2hpbGQoMiksXHJcbi5kYXRhVGFibGUgdGQ6bnRoLWNoaWxkKDIpIHtcclxuICBsZWZ0OiA4MHB4OyAvKiBBZGp1c3RlZCBiYXNlZCBvbiBuZXcgZmlyc3QgY29sdW1uIHdpZHRoICovXHJcbiAgd2lkdGg6IDEwMHB4OyAvKiBSZWR1Y2VkIHdpZHRoICovXHJcbn1cclxuIFxyXG4uZGF0YVRhYmxlIHRoOm50aC1jaGlsZCgzKSxcclxuLmRhdGFUYWJsZSB0ZDpudGgtY2hpbGQoMykge1xyXG4gIGxlZnQ6IDE4MHB4OyAvKiBBZGp1c3RlZCBiYXNlZCBvbiBuZXcgZmlyc3QgYW5kIHNlY29uZCBjb2x1bW4gd2lkdGhzICovXHJcbiAgd2lkdGg6IDEwMHB4OyAvKiBSZWR1Y2VkIHdpZHRoICovXHJcbn1cclxuLmRhdGFUYWJsZSB0aDpudGgtY2hpbGQoNCksXHJcbi5kYXRhVGFibGUgdGQ6bnRoLWNoaWxkKDQpIHtcclxuICBsZWZ0OiAyODBweDsgLyogQWRqdXN0ZWQgYmFzZWQgb24gbmV3IGZpcnN0IGFuZCBzZWNvbmQgY29sdW1uIHdpZHRocyAqL1xyXG4gIHdpZHRoOiAyMDBweDsgLyogUmVkdWNlZCB3aWR0aCAqL1xyXG59XHJcbiBcclxuIFxyXG4vKiBTdGlja3kgaGVhZGVyICovXHJcbi5zdGlja3ktaGVhZGVyIHtcclxuICBwb3NpdGlvbjogc3RpY2t5O1xyXG4gIHRvcDogMDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjhhY2FmO1xyXG4gIHotaW5kZXg6IDM7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xyXG4gIHBhZGRpbmc6IDJweDsgLyogUmVkdWNlZCBwYWRkaW5nICovXHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuIFxyXG4vKiBFbnN1cmUgei1pbmRleCBmb3Igc3RpY2t5IGhlYWRlcnMgYW5kIGNvbHVtbnMgaXMgbGF5ZXJlZCBjb3JyZWN0bHkgKi9cclxudGhlYWQgLnN0aWNreS1jb2wge1xyXG4gIHotaW5kZXg6IDQ7XHJcbn1cclxuIFxyXG4vKiBHZW5lcmFsIHRhYmxlIHN0eWxpbmcgKi9cclxuLmRhdGFUYWJsZSB0aCwgdGQge1xyXG4gIC8qIFJlZHVjZWQgZGVmYXVsdCBjb2x1bW4gd2lkdGggKi9cclxuICBoZWlnaHQ6IGF1dG87IC8qIFNldCBhIHNtYWxsZXIgZml4ZWQgaGVpZ2h0ICovXHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgLy8gcGFkZGluZzogNHB4O1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47IC8qIEhpZGUgb3ZlcmZsb3cgY29udGVudCAqL1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOyAvKiBBZGQgZWxsaXBzaXMgZm9yIG92ZXJmbG93aW5nIHRleHQgKi9cclxuIFxyXG59XHJcbi53cmFwe1xyXG4gIHdoaXRlLXNwYWNlOiBub3JtYWwgIWltcG9ydGFudDtcclxuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQgIWltcG9ydGFudDtcclxuICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkICFpbXBvcnRhbnQ7XHJcbiAgd29yZC1icmVhazogYnJlYWstYWxsICFpbXBvcnRhbnQ7XHJcbn1cclxuIFxyXG4vKiBSZW1vdmUgZ2FwcyBiZXR3ZWVuIGNvbHVtbnMgKi9cclxudGFibGUge1xyXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgdGFibGUtbGF5b3V0OiBmaXhlZDtcclxuICB3aWR0aDogMTAwJTtcclxuIFxyXG59XHJcbiBcclxuLyogRW5zdXJlIHN0aWNreSBjb2x1bW5zIG1haW50YWluIGZ1bGwgaGVpZ2h0ICovXHJcbnRib2R5IHRkLnN0aWNreS1jb2wge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkZGQ7XHJcbiAgei1pbmRleDogMTtcclxuICAvLyBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuIFxyXG4vKiBQcmV2ZW50IHdoaXRlIGdhcHMgZHVyaW5nIHNjcm9sbGluZyAqL1xyXG50aGVhZCAuc3RpY2t5LWhlYWRlcixcclxudGJvZHkgLnN0aWNreS1jb2wge1xyXG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XHJcbn1cclxuIFxyXG4vKiBBZGQgc3R5bGVzIGZvciBjb21wYWN0IGNvbnRlbnQgKi9cclxuLmNvbXBhY3QtY29udGVudCB7XHJcbiAgZm9udC1zaXplOiAxMnB4OyAvKiBTbWFsbGVyIGZvbnQgc2l6ZSAqL1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjI7IC8qIFRpZ2h0ZXIgbGluZSBoZWlnaHQgKi9cclxufVxyXG4uZGF0YVRhYmxlIHRkOm50aC1jaGlsZCgtbiszKSB7XHJcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcclxuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcclxuICBoeXBoZW5zOiBhdXRvO1xyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiBcclxuICAuZGF0YVRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlOyAvKiBTZXQgdG8gMTAwJSB0byBmaXQgdGhlIHNjcmVlbiAqL1xyXG4gICAgdGFibGUtbGF5b3V0OiBhdXRvOyAvKiBBbGxvdyB0aGUgdGFibGUgdG8gYWRqdXN0IGNvbHVtbiB3aWR0aHMgKi9cclxuICB9XHJcbiBcclxuICAuZXhhbXBsZS1jb250YWluZXIge1xyXG4gICAgb3ZlcmZsb3cteDogYXV0bzsgLyogRW5hYmxlIGhvcml6b250YWwgc2Nyb2xsaW5nICovXHJcbiAgICB3aWR0aDogMTAwJTsgLyogRW5zdXJlIHRoZSBjb250YWluZXIgdGFrZXMgZnVsbCB3aWR0aCAqL1xyXG4gIH1cclxuIFxyXG4gIC8qIFJlbW92ZSBzdGlja3kgcG9zaXRpb25pbmcgZm9yIGFsbCBlbGVtZW50cyBvbiBtb2JpbGUgKi9cclxuICAuZGF0YVRhYmxlIHRoLFxyXG4gIC5kYXRhVGFibGUgdGQsXHJcbiAgLnN0aWNreS1oZWFkZXIsXHJcbiAgLnN0aWNreS1jb2wge1xyXG4gICAgcG9zaXRpb246IHN0YXRpYyAhaW1wb3J0YW50O1xyXG4gICAgbGVmdDogYXV0byAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6IGF1dG8gIWltcG9ydGFudDsgLyogQWxsb3cgY29sdW1ucyB0byBzaXplIG5hdHVyYWxseSAqL1xyXG4gICAgbWluLXdpZHRoOiAxMDBweDsgLyogRW5zdXJlIGEgbWluaW11bSB3aWR0aCBmb3IgcmVhZGFiaWxpdHkgKi9cclxuICB9XHJcbiBcclxuICAvKiBFbnN1cmUgdGhlIGNvbnRlbnQgb2YgYWxsIGNvbHVtbnMgd3JhcHMgcHJvcGVybHkgKi9cclxuICAuZGF0YVRhYmxlIHRoLFxyXG4gIC5kYXRhVGFibGUgdGQge1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcclxuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcclxuICAgIG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgICBoeXBoZW5zOiBhdXRvO1xyXG4gICAgcGFkZGluZzogOHB4IDRweDsgLyogUmVkdWNlIHBhZGRpbmcgZm9yIG1vYmlsZSAqL1xyXG4gICAgZm9udC1zaXplOiAxNHB4OyAvKiBTbGlnaHRseSBzbWFsbGVyIGZvbnQgc2l6ZSBmb3IgbW9iaWxlICovXHJcbiAgfVxyXG4gXHJcbiAgLyogUmVzZXQgYmFja2dyb3VuZCBmb3IgYmV0dGVyIGNvbnRyYXN0IG9uIG1vYmlsZSAqL1xyXG4gXHJcbiBcclxuICAvKiBFbnN1cmUgdGhlIHRhYmxlIGhlYWRlciBpcyB2aXNpYmxlIHdoZW4gc2Nyb2xsaW5nICovXHJcbiAgdGhlYWQge1xyXG4gICAgZGlzcGxheTogdGFibGUtaGVhZGVyLWdyb3VwO1xyXG4gIH1cclxufVxyXG4gXHJcbi8qIEVuc3VyZSBkZXNrdG9wIHZpZXcgcmVtYWlucyB1bmNoYW5nZWQgKi9cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcclxuICAvKiBLZWVwIHlvdXIgZXhpc3RpbmcgZGVza3RvcCBzdHlsZXMgaGVyZSAqL1xyXG4gIC5zdGlja3ktY29sIHtcclxuICAgIHBvc2l0aW9uOiBzdGlja3k7XHJcbiBcclxuICAgIHotaW5kZXg6IDI7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gXHJcbiAgfVxyXG4gXHJcbiAgLnN0aWNreS1oZWFkZXIge1xyXG4gICAgcG9zaXRpb246IHN0aWNreTtcclxuICAgIHRvcDogMDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyOGFjYWY7XHJcbiAgICB6LWluZGV4OiAzO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gIH1cclxuIFxyXG4gIC5kYXRhVGFibGUgdGg6bnRoLWNoaWxkKDEpLFxyXG4gIC5kYXRhVGFibGUgdGQ6bnRoLWNoaWxkKDEpIHtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICB3aWR0aDogODBweDtcclxuICB9XHJcbiBcclxuICAuZGF0YVRhYmxlIHRoOm50aC1jaGlsZCgyKSxcclxuICAuZGF0YVRhYmxlIHRkOm50aC1jaGlsZCgyKSB7XHJcbiAgICBsZWZ0OiA4MHB4O1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gIH1cclxuIFxyXG4gIC5kYXRhVGFibGUgdGg6bnRoLWNoaWxkKDMpLFxyXG4gIC5kYXRhVGFibGUgdGQ6bnRoLWNoaWxkKDMpIHtcclxuICAgIGxlZnQ6IDE4MHB4O1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gIH1cclxuICAuZGF0YVRhYmxlIHRoOm50aC1jaGlsZCg0KSxcclxuLmRhdGFUYWJsZSB0ZDpudGgtY2hpbGQoNCkge1xyXG4gIGxlZnQ6IDMwMHB4O1xyXG4gIHdpZHRoOiAxNTBweDtcclxufVxyXG4gXHJcbn1cclxuIFxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gIC5yVGFibGUge1xyXG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgIG1hcmdpbi1sZWZ0OiAwO1xyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gIH1cclxuIFxyXG4gIC5ySGVhZGVyIHRyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xyXG4gICAgZ2FwOiAxMHB4O1xyXG4gIH1cclxuIFxyXG4gIC5ySGVhZGVyIHRoIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyAvKiBFbnN1cmUgYmFja2dyb3VuZCBpcyB0cmFuc3BhcmVudCAqL1xyXG4gXHJcbiAgfVxyXG59XHJcbiBcclxuLmhsLWljb24ge1xyXG4gIGNvbG9yOiM4MzM4ZWM7XHJcbiAgYm9yZGVyLWNvbG9yOiBibGFjaztcclxufVxyXG4gIl19 */"] });


/***/ }),

/***/ 82541:
/*!************************************************************************************************************************************!*\
  !*** ./src/app/modules/reports/pages/common-reports/components/detailed-attendance-report/attendance-detailed-report.component.ts ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttendanceDetailedReportComponent": () => (/* binding */ AttendanceDetailedReportComponent),
/* harmony export */   "MY_FORMATS": () => (/* binding */ MY_FORMATS)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material-moment-adapter */ 77118);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/core */ 59121);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/paginator */ 36060);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/sort */ 92197);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/table */ 85288);
/* harmony import */ var html_to_pdfmake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-to-pdfmake */ 3247);
/* harmony import */ var html_to_pdfmake__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(html_to_pdfmake__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pdfmake/build/pdfmake */ 41660);
/* harmony import */ var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_app_modules_reports_pages_dialog_detail_dialog_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/reports/pages/dialog-detail/dialog-detail.component */ 41442);
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! xlsx */ 4126);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_modules_reports_reports_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/reports/reports.service */ 48569);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/dialog */ 31484);
/* harmony import */ var src_app_modules_reports_excel_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/reports/excel-service.service */ 69172);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-spinner */ 88035);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/datepicker */ 42298);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/input */ 68562);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/select */ 57371);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/flex-layout/flex */ 56722);
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/flex-layout/extended */ 63704);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ngx-translate/core */ 38699);
/* harmony import */ var src_app_custom_directive_limit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/custom-directive/limit */ 69747);




























const _c0 = ["table"];
function AttendanceDetailedReportComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const e_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", e_r7.empid);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](e_r7.empname);
} }
function AttendanceDetailedReportComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 24)(1, "div")(2, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 26)(5, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keyup.enter", function AttendanceDetailedReportComponent_div_33_Template_a_keyup_enter_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r8.exportPDF()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AttendanceDetailedReportComponent_div_33_Template_img_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r10.exportPDF()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "button", 26)(11, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keyup.enter", function AttendanceDetailedReportComponent_div_33_Template_a_keyup_enter_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r9); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r11.exportAsXLSX()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "img", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AttendanceDetailedReportComponent_div_33_Template_img_click_13_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r9); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r12.exportAsXLSX()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](6, 4, "PDF"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("tabIndex", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](12, 6, "Excel"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("tabIndex", 5);
} }
function AttendanceDetailedReportComponent_table_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "table", 30)(1, "thead", 31)(2, "tr")(3, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "th", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "th", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "th", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "th", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "th", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "th", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](29, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](5, 9, "A - Absent"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](8, 11, "P - Present"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](11, 13, "W - Week-Off"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](14, 15, "L - Leave"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](17, 17, "H - Holiday"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](20, 19, "HD - Half Day"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](23, 21, "WP - Week-off Present"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](26, 23, "HP - Holiday Present"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](29, 25, "HL - Halfday Leave"));
} }
function AttendanceDetailedReportComponent_table_38_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "th")(2, "u");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](7, "limit");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const a_r15 = ctx.$implicit;
    const i_r16 = ctx.index;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](4, 2, a_r15, "d"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](7, 5, ctx_r13.headersList[1][i_r16], 3), " ");
} }
const _c1 = function (a0) { return { "background-color": a0 }; };
const _c2 = function (a0) { return { color: a0 }; };
function AttendanceDetailedReportComponent_table_38_ng_container_33_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "td", 44)(2, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const e_r19 = ctx.$implicit;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](3, _c1, e_r19 == "H" || e_r19 == "W" ? "#E2E5DE" : "#ffffff"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c2, ctx_r18.getColor(e_r19)));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", e_r19, " ");
} }
function AttendanceDetailedReportComponent_table_38_ng_container_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "tr", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, AttendanceDetailedReportComponent_table_38_ng_container_33_ng_container_2_Template, 4, 7, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", item_r17);
} }
function AttendanceDetailedReportComponent_table_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "table", 41)(1, "thead", 42)(2, "tr")(3, "th")(4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "th")(8, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "th")(12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, AttendanceDetailedReportComponent_table_38_ng_container_15_Template, 8, 8, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "th")(17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "th")(21, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "th")(25, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "th")(29, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](31, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](33, AttendanceDetailedReportComponent_table_38_ng_container_33_Template, 3, 1, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](6, 9, "S. No."), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](10, 11, "Employee"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](14, 13, "Reporting Manager"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r5.headersList[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](19, 15, "Absents"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](23, 17, "Presents"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](27, 19, "Late Count"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](31, 21, "Total"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r5.List);
} }
function AttendanceDetailedReportComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "No data found."), " ");
} }
const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'DD-MM-YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};
class AttendanceDetailedReportComponent {
    constructor(reportsService, datePipe, formBuilder, dialog, excelService, spinner) {
        this.reportsService = reportsService;
        this.datePipe = datePipe;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.excelService = excelService;
        this.spinner = spinner;
        this.List = [];
        this.minDate = new Date('2020/01/01');
        this.maxDate = new Date();
        this.date = new Date();
        this.startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        this.endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
        this.dateDayArray = [];
        this.months = [
            { id: 0, month: 'Jan' },
            { id: 1, month: 'Feb' },
            { id: 2, month: 'Mar' },
            { id: 3, month: 'Apr' },
            { id: 4, month: 'May' },
            { id: 5, month: 'Jun' },
            { id: 6, month: 'Jul' },
            { id: 7, month: 'Aug' },
            { id: 8, month: 'Sep' },
            { id: 9, month: 'Oct' },
            { id: 10, month: 'Nov' },
            { id: 11, month: 'Dec' },
        ];
        this.headersList = [];
        this.filter = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl();
        this.searchForm = this.formBuilder.group({
            fromDate: [new Date()],
            toDate: [new Date()],
            Users: ['0'],
        });
        this.dataSource = [];
        this.displayedColumns = [
            'sno',
            'empname',
            'attendancedate',
            'firstlogintime',
            'lastlogouttime',
            'totalhours',
            'breaks',
            'breaktime',
            'productivehours',
            'action',
        ];
        this.isLoading = false;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl('');
        this.filteredEmployeeList = [];
    }
    ngOnInit() {
        this.userSession = JSON.parse(sessionStorage.getItem('user') ?? '');
        this.companyName = sessionStorage.getItem('companyFullName');
        this.Searchform();
        this.getEmployeelist();
        this.getDateArray(this.startDate, this.endDate);
        this.searchControl.valueChanges.subscribe(searchText => {
            this.filterEmployees(searchText);
        });
    }
    getDateArray(start, end) {
        const arr = [];
        const dt = new Date(start);
        while (dt <= end) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        for (const val of arr) {
            this.obj = {
                date: val,
                day: val.toLocaleDateString('en-US', { weekday: 'short' }),
            };
            this.dateDayArray.push(this.obj);
        }
    }
    getEmployeelist() {
        let obj = {
            remployee_id: this.userSession.id,
        };
        this.reportsService
            .getReportsuserEmployeesList(obj)
            .subscribe((res) => {
            if (res.status) {
                this.employeelist = [];
                this.employeelist = res.data;
                this.filteredEmployeeList = this.employeelist;
                this.searchForm.controls.Users.setValue('0');
            }
        });
    }
    //All Employees API
    Searchform() {
        this.List = [];
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatTableDataSource(this.List);
        let fromDate = this.datePipe.transform(this.searchForm.controls.fromDate.value, 'y-MM-dd');
        let userId = this.searchForm.controls.Users.value;
        let data = {};
        if (userId == '0') {
            userId = null;
            data = {
                remployee_id: this.userSession.id,
                employee_id: userId,
                calendar_date: fromDate,
            };
        }
        else {
            data = {
                remployee_id: null,
                employee_id: userId,
                calendar_date: fromDate,
            };
        }
        this.spinner.show();
        this.isLoading = true;
        this.reportsService.getAttendanceMonthlyReportForReportsuser(data).subscribe((res) => {
            this.headersList = [];
            this.List = [];
            if (res.status) {
                let i = 0;
                res.data.forEach((e) => {
                    if (i < 2) {
                        let header = JSON.parse(e.result);
                        this.headersList.push(header);
                    }
                    else {
                        let header = JSON.parse(e.result);
                        this.List.push(header);
                    }
                    i++;
                });
            }
            this.isLoading = false;
            this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatTableDataSource(this.List);
            this.spinner.hide();
        }, (error) => {
            this.isLoading = false;
            error.error.text;
            this.spinner.hide();
        });
    }
    resetform() {
        this.dataSource.data = [];
        this.searchForm.reset();
        this.searchForm.controls.fromDate.setValue(new Date());
        this.searchForm.controls.toDate.setValue(new Date());
        this.searchForm.controls.Users.setValue('0');
        this.Searchform();
    }
    openDialog(item) {
        const dialogRef = this.dialog.open(src_app_modules_reports_pages_dialog_detail_dialog_detail_component__WEBPACK_IMPORTED_MODULE_2__.DialogDetailComponent, {
            //  width: '500px',position:{top:`70px`},
            data: { attendanceid: item.attendanceid },
        });
        dialogRef.afterClosed().subscribe((result) => { });
    }
    exportAsXLSX() {
        let date = this.datePipe.transform(this.searchForm.controls.fromDate.value, 'MM-YYYY');
        const ws = xlsx__WEBPACK_IMPORTED_MODULE_9__.utils.table_to_sheet(this.table.nativeElement);
        const wb = xlsx__WEBPACK_IMPORTED_MODULE_9__.utils.book_new();
        xlsx__WEBPACK_IMPORTED_MODULE_9__.utils.book_append_sheet(wb, ws, 'Monthly_Detail_Report');
        xlsx__WEBPACK_IMPORTED_MODULE_9__.writeFile(wb, date + '-' + 'Monthly_Detail_Report_for_manager.xlsx');
    }
    getColor(i) {
        let color = '';
        if (i == 'P') {
            return (color = 'green');
        }
        else if (i == 'H') {
            return (color = '#800000');
        }
        else if (i == 'W') {
            return (color = 'blue');
        }
        else if (i == 'L') {
            return (color = 'orange');
        }
        else if (i == "HD") {
            return color = '#ce06e4';
        }
        else if (i == "WP") {
            return color = '#06c3e4';
        }
        else if (i == "HP") {
            return color = '#06e471';
        }
        else if (i == "HL") {
            return color = '#8338ec';
        }
        else {
            return (color = 'red');
        }
    }
    exportPDF() {
        let date = this.datePipe.transform(this.searchForm.controls.fromDate.value, "MMMM-YYYY");
        const pdfTable = this.table.nativeElement;
        const html = html_to_pdfmake__WEBPACK_IMPORTED_MODULE_0___default()(pdfTable.innerHTML);
        pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_1___default().createPdf({
            info: {
                title: date + " - Attendance Monthly Detailed Report",
                author: 'Sreeb tech',
                subject: 'Theme',
                keywords: 'Report',
            },
            footer: function (currentPage, pageCount) {
                return {
                    margin: 10,
                    columns: [
                        {
                            fontSize: 9,
                            text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
                            alignment: 'center',
                        },
                    ],
                };
            },
            content: [
                {
                    columns: [
                        { text: this.companyName, style: 'title', alignment: 'center' },
                    ],
                },
                { columns: [
                        { text: 'Attendance Monthly Detailed Report', style: 'subtitle', alignment: 'left', margin: [0, 5, 0, 10] },
                        { text: `Date: ${date}`, style: 'subtitle', alignment: 'right' },
                    ],
                },
                {
                    canvas: [{ type: 'line', x1: 0, y1: 0, x2: 1110, y2: 0, lineWidth: 1, },],
                }, '\n',
                html,
            ],
            styles: {
                title: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 0, 0, 5],
                },
                subtitle: {
                    fontSize: 12,
                    bold: true,
                    margin: [0, 5, 0, 10],
                },
                date: {
                    fontSize: 10,
                    margin: [0, 0, 0, 5],
                },
                html: {
                    alignment: 'center',
                },
            },
            pageOrientation: 'portrait',
            pageSize: 'A2',
        }).download("Attendance_Monthly_Report.pdf");
    }
    filterEmployees(searchText) {
        this.filteredEmployeeList = this.employeelist.filter((val) => val.empname.toLowerCase().includes(searchText.toLowerCase()));
        if (this.filteredEmployeeList.length <= 0) {
            this.searchControl.setValue('');
        }
    }
}
AttendanceDetailedReportComponent.ɵfac = function AttendanceDetailedReportComponent_Factory(t) { return new (t || AttendanceDetailedReportComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_modules_reports_reports_service__WEBPACK_IMPORTED_MODULE_3__.ReportsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_modules_reports_excel_service_service__WEBPACK_IMPORTED_MODULE_4__.ExcelServiceService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_12__.NgxSpinnerService)); };
AttendanceDetailedReportComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: AttendanceDetailedReportComponent, selectors: [["app-attendance-detailed-report"]], viewQuery: function AttendanceDetailedReportComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_13__.MatPaginator, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_14__.MatSort, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.table = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.sorter = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵProvidersFeature"]([
            {
                provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_15__.DateAdapter,
                useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_16__.MomentDateAdapter,
                deps: [_angular_material_core__WEBPACK_IMPORTED_MODULE_15__.MAT_DATE_LOCALE],
            },
            { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_15__.MAT_DATE_FORMATS, useValue: MY_FORMATS },
        ])], decls: 40, vars: 32, consts: [["fxLayout", "column", 1, "first-col"], ["fxLayout", "row", "fxLayoutAlign.xs", "center", "fxLayoutAlign", "space-between", 2, "padding-left", "1%", 3, "formGroup"], ["fxLayout", "row", "fxLayout.xs", "column", "fxFlex.xs", "100%"], ["fxFlex.xs", "100%", "appearance", "outline", 1, "mx-2", "my-2"], ["formControlName", "Users", "required", "", "tabindex", "1"], ["matInput", "", "type", "text", 1, "search-align", 3, "formControl", "placeholder"], ["value", "0"], [4, "ngFor", "ngForOf"], ["matInput", "", "readonly", "", "formControlName", "fromDate", "tabindex", "2", 3, "matDatepicker", "min", "max", "placeholder", "click"], ["matSuffix", "", 1, "datepicker", 3, "for"], ["fromDate", ""], ["fxLayout", "row", "fxLayoutAlign.xs", "center center"], ["ngStyle.gt-md", "margin-top: 5%", "ngStyle.lt-lg", "margin-top: 5%", "ngStyle.xs", "margin-top: 0px"], ["tabIndex", "2", 1, "btn", "btn-primary", "mr-2", "mb-2", 3, "click"], [1, "line", 2, "color", "#1898d5", "font-size", "16px"], ["tabIndex", "3", 1, "btn", "btn-danger", "mr-2", "mb-2", 3, "click"], ["fxLayout", "row", "fxLayoutAlign", "end", "style", "margin-right: 3%; margin-top: 10px", 4, "ngIf"], ["class", "rTable", 4, "ngIf"], [1, "p-2"], [1, "example-container", 2, "padding", "10px"], ["table", ""], ["style", "width: 100%", "id", "table", 4, "ngIf"], ["style", "text-align: center; padding-top: 20px", 4, "ngIf"], [3, "value"], ["fxLayout", "row", "fxLayoutAlign", "end", 2, "margin-right", "3%", "margin-top", "10px"], [1, "exlprint"], ["mat-icon-button", ""], [3, "title", "tabIndex", "keyup.enter"], ["src", "./assets/images/icons/pdf.png", "width", "20px", "height", "20px", 3, "click"], ["src", "./assets/images/icons/excel.png", 3, "click"], [1, "rTable"], [1, "rHeader"], [1, "red-icon"], [1, "green-icon"], [1, "blue-icon"], [1, "orange-icon"], [1, "yellow-icon"], [1, "light-icon"], [1, "wp-icon"], [1, "hp-icon"], [1, "hl-icon"], ["id", "table", 2, "width", "100%"], [1, "theader"], [2, "width", "auto"], [3, "ngStyle"], [2, "text-align", "center", "padding-top", "20px"]], template: function AttendanceDetailedReportComponent_Template(rf, ctx) { if (rf & 1) {
        const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-form-field", 3)(4, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "mat-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](9, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, AttendanceDetailedReportComponent_ng_container_13_Template, 3, 2, "ng-container", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "mat-form-field", 3)(15, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](17, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AttendanceDetailedReportComponent_Template_input_click_18_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](22); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](_r1.open()); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](19, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](20, "mat-datepicker-toggle", 9)(21, "mat-datepicker", null, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "div", 11)(24, "span", 12)(25, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AttendanceDetailedReportComponent_Template_button_click_25_listener() { return ctx.Searchform(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](27, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](28, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AttendanceDetailedReportComponent_Template_button_click_29_listener() { return ctx.resetform(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](30, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](32, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](33, AttendanceDetailedReportComponent_div_33_Template, 14, 8, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](34, AttendanceDetailedReportComponent_table_34_Template, 30, 27, "table", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](35, "div", 18)(36, "div", 19, 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](38, AttendanceDetailedReportComponent_table_38_Template, 34, 23, "table", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](39, AttendanceDetailedReportComponent_div_39_Template, 3, 3, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.searchForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](6, 18, "Employee Name"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate1"]("placeholder", "  ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](9, 20, "Search"), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formControl", ctx.searchControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](12, 22, "All Employees"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.filteredEmployeeList);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](17, 24, "Date"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](19, 26, "From Date"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("matDatepicker", _r1)("min", ctx.minDate)("max", ctx.maxDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("for", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](27, 28, "Search"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](32, 30, "Clear"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.List.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.List.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.List.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.List.length === 0);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgStyle, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__.MatButton, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__.MatDatepicker, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__.MatDatepickerToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_20__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_21__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_22__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_22__.DefaultLayoutAlignDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_22__.DefaultFlexDirective, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_23__.DefaultStyleDirective, _angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__.TranslatePipe, src_app_custom_directive_limit__WEBPACK_IMPORTED_MODULE_5__.Limit], styles: ["table[_ngcontent-%COMP%], td[_ngcontent-%COMP%], th[_ngcontent-%COMP%] {\n  border: 1px solid;\n}\n\n.mat-elevation-z8[_ngcontent-%COMP%] {\n  display: block;\n  max-width: fit-content;\n  margin: 0 auto;\n  overflow-x: auto;\n  white-space: nowrap;\n}\n\nthead[_ngcontent-%COMP%] {\n  background-color: #28acaf;\n  color: white;\n}\n\n.theader[_ngcontent-%COMP%] {\n  font-stretch: normal;\n  font-style: normal;\n  letter-spacing: 0.32px;\n  font-weight: normal;\n  font-family: sans-serif;\n  font-size: 15px;\n}\n\nth[_ngcontent-%COMP%] {\n  padding: 2px;\n  text-align: center;\n}\n\ntd[_ngcontent-%COMP%] {\n  padding: 2px;\n  text-align: center;\n}\n\nmat-card[_ngcontent-%COMP%] {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  display: block;\n  position: relative;\n  padding-left: 0px;\n  padding-right: 0px;\n}\n\n.tablePadding[_ngcontent-%COMP%] {\n  padding-left: 2%;\n  padding-right: 2%;\n  padding-top: 2%;\n}\n\n  .mat-select-panel[aria-label=\"Items per page:\"] mat-option:last-child:before {\n  content: \"All\";\n}\n\n  .mat-select-panel[aria-label=\"Items per page:\"] mat-option:last-child .mat-option-text {\n  display: none;\n}\n\n.headerbox[_ngcontent-%COMP%] {\n  height: 45px;\n  background-color: #28acaf !important;\n  align-items: center;\n}\n\n.title[_ngcontent-%COMP%] {\n  font-family: \"Roboto\";\n  font-size: 20px;\n  font-weight: 500;\n  font-stretch: normal;\n  font-style: normal;\n  letter-spacing: 0.32px;\n  color: #ffffff;\n  margin-bottom: 0px;\n}\n\n  tr.mat-header-row {\n  height: 45px !important;\n}\n\n .mat-form-field-appearance-outline .mat-form-field-wrapper {\n  margin: 0.2em 0 !important;\n}\n\n .mat-drawer-container {\n  background-color: #fafafa;\n  color: rgba(135, 130, 130, 0.87);\n}\n\n.example-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.green-icon[_ngcontent-%COMP%] {\n  color: green;\n  border-color: black;\n}\n\n.red-icon[_ngcontent-%COMP%] {\n  color: red;\n  border-color: black;\n}\n\n.blue-icon[_ngcontent-%COMP%] {\n  color: blue;\n  border-color: black;\n}\n\n.yellow-icon[_ngcontent-%COMP%] {\n  color: #800000;\n  border-color: black;\n}\n\n.orange-icon[_ngcontent-%COMP%] {\n  color: #ff8c00;\n  border-color: black;\n}\n\n.light-icon[_ngcontent-%COMP%] {\n  color: #ce06e4;\n  border-color: black;\n}\n\n.wp-icon[_ngcontent-%COMP%] {\n  color: #06c3e4;\n  border-color: black;\n}\n\n.hp-icon[_ngcontent-%COMP%] {\n  color: #06e471;\n  border-color: black;\n}\n\n.rTable[_ngcontent-%COMP%] {\n  width: 90% !important;\n  margin-left: 20px;\n}\n\n.rHeader[_ngcontent-%COMP%] {\n  background-color: #ffffff !important;\n}\n\n.hl-icon[_ngcontent-%COMP%] {\n  color: #8338ec;\n  border-color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0dGVuZGFuY2UtZGV0YWlsZWQtcmVwb3J0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7RUFHRSxpQkFBQTtBQUNGOztBQUNBO0VBQ0UsY0FBQTtFQUVBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFFRjs7QUFDQTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtBQUVGOztBQUNBO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7QUFFRjs7QUFDQTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtBQUVGOztBQUFBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0FBR0Y7O0FBREE7RUFDRSx5REFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFJRjs7QUFGQTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0FBS0Y7O0FBQUk7RUFDRSxjQUFBO0FBR047O0FBSUk7RUFDRSxhQUFBO0FBRE47O0FBS0E7RUFDRSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxtQkFBQTtBQUZGOztBQUlBO0VBQ0UscUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUFERjs7QUFHQTtFQUNFLHVCQUFBO0FBQUY7O0FBRUE7RUFDRSwwQkFBQTtBQUNGOztBQUNBO0VBQ0UseUJBQUE7RUFDQSxnQ0FBQTtBQUVGOztBQUFBO0VBQ0UsZ0JBQUE7QUFHRjs7QUFBQTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtBQUdGOztBQURBO0VBQ0UsVUFBQTtFQUNBLG1CQUFBO0FBSUY7O0FBRkE7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7QUFLRjs7QUFIQTtFQUNFLGNBQUE7RUFDQSxtQkFBQTtBQU1GOztBQUpBO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0FBT0Y7O0FBSkE7RUFDRSxjQUFBO0VBQ0EsbUJBQUE7QUFPRjs7QUFKQTtFQUNFLGNBQUE7RUFDQSxtQkFBQTtBQU9GOztBQUxBO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0FBUUY7O0FBTEE7RUFDRSxxQkFBQTtFQUNBLGlCQUFBO0FBUUY7O0FBTkE7RUFDRSxvQ0FBQTtBQVNGOztBQU5BO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0FBU0YiLCJmaWxlIjoiYXR0ZW5kYW5jZS1kZXRhaWxlZC1yZXBvcnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSxcclxudGQsXHJcbnRoIHtcclxuICBib3JkZXI6IDFweCBzb2xpZDtcclxufVxyXG4ubWF0LWVsZXZhdGlvbi16OCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWF4LXdpZHRoOiAtbW96LWZpdC1jb250ZW50O1xyXG4gIG1heC13aWR0aDogZml0LWNvbnRlbnQ7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG50aGVhZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4YWNhZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi50aGVhZGVyIHtcclxuICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMzJweDtcclxuICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG5cclxudGgge1xyXG4gIHBhZGRpbmc6IDJweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxudGQge1xyXG4gIHBhZGRpbmc6IDJweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxubWF0LWNhcmQge1xyXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMjgwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgcGFkZGluZy1sZWZ0OiAwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogMHB4O1xyXG59XHJcbi50YWJsZVBhZGRpbmcge1xyXG4gIHBhZGRpbmctbGVmdDogMiU7XHJcbiAgcGFkZGluZy1yaWdodDogMiU7XHJcbiAgcGFkZGluZy10b3A6IDIlO1xyXG59XHJcblxyXG46Om5nLWRlZXAge1xyXG4gIC5tYXQtc2VsZWN0LXBhbmVsW2FyaWEtbGFiZWw9XCJJdGVtcyBwZXIgcGFnZTpcIl0ge1xyXG4gICAgbWF0LW9wdGlvbjpsYXN0LWNoaWxkOmJlZm9yZSB7XHJcbiAgICAgIGNvbnRlbnQ6IFwiQWxsXCI7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG46Om5nLWRlZXAge1xyXG4gIC5tYXQtc2VsZWN0LXBhbmVsW2FyaWEtbGFiZWw9XCJJdGVtcyBwZXIgcGFnZTpcIl0ge1xyXG4gICAgbWF0LW9wdGlvbjpsYXN0LWNoaWxkIC5tYXQtb3B0aW9uLXRleHQge1xyXG4gICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4uaGVhZGVyYm94IHtcclxuICBoZWlnaHQ6IDQ1cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4YWNhZiAhaW1wb3J0YW50O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLnRpdGxlIHtcclxuICBmb250LWZhbWlseTogXCJSb2JvdG9cIjtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMzJweDtcclxuICBjb2xvcjogI2ZmZmZmZjtcclxuICBtYXJnaW4tYm90dG9tOiAwcHg7XHJcbn1cclxuOjpuZy1kZWVwIHRyLm1hdC1oZWFkZXItcm93IHtcclxuICBoZWlnaHQ6IDQ1cHggIWltcG9ydGFudDtcclxufVxyXG46Om5nLWRlZXAubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIHtcclxuICBtYXJnaW46IDAuMmVtIDAgIWltcG9ydGFudDtcclxufVxyXG46Om5nLWRlZXAubWF0LWRyYXdlci1jb250YWluZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XHJcbiAgY29sb3I6IHJnYigxMzUgMTMwIDEzMCAvIDg3JSk7XHJcbn1cclxuLmV4YW1wbGUtY29udGFpbmVyIHtcclxuICBvdmVyZmxvdy14OiBhdXRvO1xyXG59XHJcblxyXG4uZ3JlZW4taWNvbiB7XHJcbiAgY29sb3I6IGdyZWVuO1xyXG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XHJcbn1cclxuLnJlZC1pY29uIHtcclxuICBjb2xvcjogcmVkO1xyXG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XHJcbn1cclxuLmJsdWUtaWNvbiB7XHJcbiAgY29sb3I6IGJsdWU7XHJcbiAgYm9yZGVyLWNvbG9yOiBibGFjaztcclxufVxyXG4ueWVsbG93LWljb24ge1xyXG4gIGNvbG9yOiAjODAwMDAwO1xyXG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XHJcbn1cclxuLm9yYW5nZS1pY29uIHtcclxuICBjb2xvcjogI2ZmOGMwMDtcclxuICBib3JkZXItY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG4ubGlnaHQtaWNvbiB7XHJcbiAgY29sb3I6ICNjZTA2ZTQ7XHJcbiAgYm9yZGVyLWNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLndwLWljb24ge1xyXG4gIGNvbG9yOiAjMDZjM2U0O1xyXG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XHJcbn1cclxuLmhwLWljb24ge1xyXG4gIGNvbG9yOiAjMDZlNDcxO1xyXG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi5yVGFibGUge1xyXG4gIHdpZHRoOiA5MCUgIWltcG9ydGFudDtcclxuICBtYXJnaW4tbGVmdDogMjBweDtcclxufVxyXG4uckhlYWRlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uaGwtaWNvbiB7XHJcbiAgY29sb3I6IzgzMzhlYztcclxuICBib3JkZXItY29sb3I6IGJsYWNrO1xyXG59Il19 */"] });


/***/ }),

/***/ 25596:
/*!****************************************************************************************************************!*\
  !*** ./src/app/modules/reports/pages/employe-monthly-detail-report/employe-monthly-detail-report.component.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmployeMonthlyDetailReportComponent": () => (/* binding */ EmployeMonthlyDetailReportComponent),
/* harmony export */   "MY_FORMATS": () => (/* binding */ MY_FORMATS)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! xlsx */ 4126);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material-moment-adapter */ 77118);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ 59121);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 56908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pdfmake/build/pdfmake */ 41660);
/* harmony import */ var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pdfmake/build/vfs_fonts */ 50786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _reports_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../reports.service */ 48569);
/* harmony import */ var src_app_services_pdf_header_service_pdf_header_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/pdf-header-service/pdf-header.service */ 20037);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var src_app_modules_payroll_payroll_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/payroll/payroll.service */ 31613);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/card */ 82156);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/datepicker */ 42298);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/input */ 68562);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/radio */ 52922);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/flex-layout/flex */ 56722);
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/flex-layout/extended */ 63704);






















const _c0 = ["TABLE"];
function EmployeMonthlyDetailReportComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 26)(1, "div")(2, "button", 27)(3, "a", 28)(4, "img", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function EmployeMonthlyDetailReportComponent_div_33_Template_img_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r4.generatePdf()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "button", 27)(6, "a", 30)(7, "img", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function EmployeMonthlyDetailReportComponent_div_33_Template_img_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r6.exportAsXLSX()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("tabIndex", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("tabIndex", 5);
} }
function EmployeMonthlyDetailReportComponent_table_42_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "table", 32)(1, "thead", 33)(2, "tr")(3, "th", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "A - Absent");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "th", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "P - Present");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "th", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "W - Week-Off");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "th", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "L - Leave");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, "H - Holiday");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "th", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "HD - Half Day");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "th", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16, "WP - Week-off Present");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "th", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18, "HP - Holiday Present");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "th", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, "HL - Halfday Leave");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
} }
const _c1 = function (a0) { return { "underline": a0 }; };
function EmployeMonthlyDetailReportComponent_div_43_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "th")(2, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const a_r11 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](3, _c1, ctx_r8.checkNumber(ctx_r8.getColVal(a_r11))));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r8.getColVal(a_r11));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r8.getColVal(a_r11, "day"));
} }
const _c2 = function (a0) { return { "background-color": a0 }; };
const _c3 = function (a0) { return { "color": a0 }; };
function EmployeMonthlyDetailReportComponent_div_43_ng_container_8_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "td", 53)(2, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const e_r15 = ctx.$implicit;
    const item_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](3, _c2, item_r13[e_r15] == "A" ? "#F5DADF" : item_r13[e_r15] == "H" || item_r13[e_r15] == "W" ? "#E2E5DE" : "#ffffff"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c3, ctx_r14.getColor(item_r13[e_r15], e_r15)));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", item_r13[e_r15], " ");
} }
function EmployeMonthlyDetailReportComponent_div_43_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "tr", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, EmployeMonthlyDetailReportComponent_div_43_ng_container_8_ng_container_2_Template, 4, 7, "ng-container", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r9.headersList);
} }
function EmployeMonthlyDetailReportComponent_div_43_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " No data found. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function EmployeMonthlyDetailReportComponent_div_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 43)(1, "div", 44, 45)(3, "table", 46)(4, "thead")(5, "tr", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, EmployeMonthlyDetailReportComponent_div_43_ng_container_6_Template, 7, 5, "ng-container", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, EmployeMonthlyDetailReportComponent_div_43_ng_container_8_Template, 3, 1, "ng-container", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, EmployeMonthlyDetailReportComponent_div_43_div_9_Template, 2, 0, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r3.headersList);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r3.List);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.List.length === 0);
} }
const moment = moment__WEBPACK_IMPORTED_MODULE_0__;
pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_1__.vfs = pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_2__.pdfMake?.vfs;
const htmlToPdfmake = __webpack_require__(/*! html-to-pdfmake */ 3247);
const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'MMM-YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};
class EmployeMonthlyDetailReportComponent {
    constructor(reportsService, pdfService, datePipe, formBuilder, fb, payrollService) {
        this.reportsService = reportsService;
        this.pdfService = pdfService;
        this.datePipe = datePipe;
        this.formBuilder = formBuilder;
        this.fb = fb;
        this.payrollService = payrollService;
        //isCalendarBased: boolean = true;
        this.List = [];
        this.minDate = new Date('2020/01/01');
        this.maxDate = new Date();
        this.headersList = [];
        this.months = [
            { id: 0, month: 'Jan' },
            { id: 1, month: 'Feb' },
            { id: 2, month: 'Mar' },
            { id: 3, month: 'Apr' },
            { id: 4, month: 'May' },
            { id: 5, month: 'Jun' },
            { id: 6, month: 'Jul' },
            { id: 7, month: 'Aug' },
            { id: 8, month: 'Sep' },
            { id: 9, month: 'Oct' },
            { id: 10, month: 'Nov' },
            { id: 11, month: 'Dec' },
        ];
        this.searchForm = this.formBuilder.group({
            fromDate: [new Date()],
            toDate: [new Date()],
            Users: ['0'],
            reportType: ['calendar'],
        });
        this.cdate = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl(moment());
        this.dateRangeLabel = '';
        this.date = [];
    }
    ngOnInit() {
        this.userSession = JSON.parse(sessionStorage.getItem('user') ?? '');
        this.companyName = sessionStorage.getItem('companyFullName');
        this.Searchform();
        // this.setCurrentMonthDateRange();
        this.myForm = this.fb.group({
            reportType: ['calendar'],
        });
        this.getLeaveDate();
    }
    Searchform() {
        this.headersList = [];
        this.List = [];
        let fromDate = new Date(this.searchForm.controls.fromDate.value).getFullYear() + '-' + (new Date(this.searchForm.controls.fromDate.value).getMonth() + 1) + '-' + '01';
        let reportType = this.searchForm.get('reportType')?.value;
        let data = {
            manager_employee_id: null,
            employee_id: this.userSession.id,
            calendar_date: fromDate,
            date_filter_type: reportType === 'calendar' ? 0 : 1,
        };
        this.reportsService.getAttendanceMonthlyReport(data).subscribe((res) => {
            if (res.status && res.data.length > 0) {
                this.List = res.data;
                this.headersList = Object.keys(res.data[0]);
            }
            else {
                console.warn('No data found in response.');
            }
        }, (error) => {
            console.error('API Error:', error);
        });
    }
    formatDate(date) {
        if (!date)
            return '';
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    onReportTypeChange(event) {
        this.searchForm.controls['reportType'].setValue(event.value);
        //this.isCalendarBased = event.value === 'calendar';
        this.Searchform();
        this.setCurrentMonthDateRange();
    }
    clearSelection() {
        this.setCurrentMonthDateRange();
        this.searchForm.controls.fromDate.setValue(new Date());
        this.resetForm();
    }
    setCurrentMonthDateRange() {
        const today = moment();
        const selectedMonth = this.searchForm.controls.fromDate.value;
        const currentYear = today.year();
        const currentMonth = today.month();
        const reportType = this.searchForm.controls.reportType.value;
        if (!this.date || this.date.length === 0) {
            console.warn('Pay schedule data not loaded.');
            return;
        }
        let sDate;
        let eDate;
        if (reportType === 'calendar') {
            // Calendar based month
            sDate = moment().year(currentYear).month(currentMonth).startOf('month');
            if (today.month() === currentMonth && today.year() === currentYear) {
                eDate = today;
            }
            else {
                eDate = moment().year(currentYear).month(currentMonth).endOf('month');
            }
        }
        else {
            if (this.leaveWindowStartDate === '1') {
                sDate = moment(selectedMonth).startOf('month').startOf('day');
                const leaveWindowEndDate = moment(selectedMonth)
                    .endOf('month')
                    .startOf('day');
                if (moment(leaveWindowEndDate).isAfter(moment())) {
                    eDate = moment().startOf('day');
                }
                else {
                    eDate = leaveWindowEndDate;
                }
            }
            else if (this.leaveWindowStartDate === 'LAST_BUT_2_DAYS') {
                sDate = moment(selectedMonth)
                    .subtract(1, 'month')
                    .endOf('month')
                    .subtract(2, 'days')
                    .startOf('day');
                const leaveWindowEndDate = moment(selectedMonth)
                    .endOf('month')
                    .subtract(3, 'days')
                    .startOf('day');
                if (moment(leaveWindowEndDate).isAfter(moment())) {
                    eDate = moment().startOf('day');
                }
                else {
                    eDate = leaveWindowEndDate;
                }
            }
            else if (this.leaveWindowStartDate === 'LAST_BUT_1_DAY') {
                sDate = moment(selectedMonth)
                    .subtract(1, 'month')
                    .endOf('month')
                    .subtract(1, 'days')
                    .startOf('day');
                const leaveWindowEndDate = moment(selectedMonth)
                    .endOf('month')
                    .subtract(2, 'days')
                    .startOf('day');
                if (moment(leaveWindowEndDate).isAfter(moment())) {
                    eDate = moment().startOf('day');
                }
                else {
                    eDate = leaveWindowEndDate;
                }
            }
            else if (this.leaveWindowStartDate === 'LAST_DAY') {
                sDate = moment(selectedMonth)
                    .subtract(1, 'month')
                    .endOf('month')
                    .startOf('day');
                const leaveWindowEndDate = moment(selectedMonth)
                    .endOf('month')
                    .subtract(1, 'day')
                    .startOf('day');
                if (moment(leaveWindowEndDate).isAfter(moment())) {
                    eDate = moment().startOf('day');
                }
                else {
                    eDate = leaveWindowEndDate;
                }
            }
            else {
                const startDate = Number(this.leaveWindowStartDate);
                sDate = moment(selectedMonth)
                    .subtract(1, 'month')
                    .startOf('month')
                    .add(startDate - 1, 'days')
                    .startOf('day');
                const leaveWindowEndDate = moment(selectedMonth)
                    .startOf('month')
                    .add(startDate - 2, 'days')
                    .startOf('day');
                if (moment(leaveWindowEndDate).isAfter(moment())) {
                    eDate = moment().startOf('day');
                }
                else {
                    eDate = leaveWindowEndDate;
                }
            }
        }
        this.dateRangeLabel = `${sDate.format('DD MMM YYYY')} - ${eDate.format('DD MMM YYYY')}`;
        // this.searchForm.controls['fromDate'].setValue(eDate.toDate());
        // this.searchForm.controls['toDate'].setValue(eDate.toDate());
    }
    resetForm() {
        this.List = [];
        this.headersList = [];
        this.setCurrentMonthDateRange();
        let reportType = this.searchForm.controls.reportType.value;
        let startDate, endDate;
        if (reportType === 'leaveWindow') {
            let today = new Date();
            startDate = new Date(today.getFullYear(), today.getMonth() - 1);
            endDate = new Date(today.getFullYear(), today.getMonth());
        }
        else {
            let today = new Date();
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        }
        this.searchForm.reset({
            fromDate: startDate,
            toDate: endDate,
            Users: '0',
            reportType: reportType,
            //reportType: this.isCalendarBased ? 'calendar' : 'leaveWindow',
        });
        this.Searchform();
    }
    getColor(i, e) {
        let color = '';
        if (i == "P") {
            return color = 'green';
        }
        else if (i == "H") {
            return color = '#800000';
        }
        else if (i == "W") {
            return color = 'blue';
        }
        else if (i == "L") {
            return color = 'orange';
        }
        else if (i == "HD") {
            return color = '#ce06e4';
        }
        else if (i == "WP") {
            return color = '#06c3e4';
        }
        else if (i == "HP") {
            return color = '#06e471';
        }
        else if (i == "HL") {
            return color = '#8338ec';
        }
        else if (i == "A") {
            return color = 'red';
        }
        else if (e == 'Absents' && Number(i) > 0) {
            return color = 'red';
        }
        else if (e == 'Presents') {
            return color = 'green';
        }
        else if (e == 'Late_count' && Number(i) > 0) {
            return color = 'red';
        }
        else {
            return color = 'black';
        }
    }
    exportAsXLSX() {
        let date = this.datePipe.transform(this.searchForm.controls.fromDate.value, 'MM-YYYY');
        const ws = xlsx__WEBPACK_IMPORTED_MODULE_8__.utils.table_to_sheet(this.table.nativeElement);
        const wb = xlsx__WEBPACK_IMPORTED_MODULE_8__.utils.book_new();
        xlsx__WEBPACK_IMPORTED_MODULE_8__.utils.book_append_sheet(wb, ws, 'Monthly_Detail_Report');
        xlsx__WEBPACK_IMPORTED_MODULE_8__.writeFile(wb, date + '-' + 'Monthly_Detail_Report_for_employee.xlsx');
    }
    exportPDF() {
        let date = this.datePipe.transform(this.searchForm.controls.fromDate.value, 'MMMM-YYYY');
        const pdfTable = this.table.nativeElement;
        const html = htmlToPdfmake(pdfTable.innerHTML);
        pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_1__.createPdf({
            info: {
                title: date + ' - Attendance Monthly Detailed Report',
                author: 'Sreeb tech',
                subject: 'Theme',
                keywords: 'Report',
            },
            footer: function (currentPage, pageCount) {
                return {
                    margin: 10,
                    columns: [
                        {
                            fontSize: 9,
                            text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
                            alignment: 'center',
                        },
                    ],
                };
            },
            content: [
                {
                    columns: [
                        { text: this.companyName, style: 'title', alignment: 'center' },
                    ],
                },
                {
                    columns: [
                        {
                            text: 'Attendance Monthly Detailed Report',
                            style: 'subtitle',
                            alignment: 'left',
                            margin: [0, 5, 0, 10],
                        },
                        { text: `Date: ${date}`, style: 'subtitle', alignment: 'right' },
                    ],
                },
                {
                    canvas: [
                        { type: 'line', x1: 0, y1: 0, x2: 1110, y2: 0, lineWidth: 1 },
                    ],
                },
                '\n',
                html,
            ],
            styles: {
                title: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 0, 0, 5],
                },
                subtitle: {
                    fontSize: 12,
                    bold: true,
                    margin: [0, 5, 0, 10],
                },
                date: {
                    fontSize: 10,
                    margin: [0, 0, 0, 5],
                },
                html: {
                    alignment: 'center',
                },
            },
            pageOrientation: 'portrait',
            pageSize: 'A2',
        })
            .download('Attendance_Monthly_Report.pdf');
    }
    setMonthAndYear(normalizedMonthAndYear, datepicker) {
        const ctrlValue = this.cdate.value;
        ctrlValue.month(normalizedMonthAndYear.month());
        ctrlValue.year(normalizedMonthAndYear.year());
        this.searchForm.controls.fromDate.setValue(ctrlValue);
        datepicker.close();
        this.setCurrentMonthDateRange();
    }
    getLeaveDate() {
        this.payrollService.getCompanyPaySchedule().subscribe((res) => {
            if (res && res.data) {
                this.date = res.data;
                this.date[0].forEach((i) => {
                    if (i.rule_name === 'LEAVE_WINDOW_START_DATE') {
                        this.leaveWindowStartDate = i.rule_value;
                    }
                    else if (i.rule_name === 'LEAVE_WINDOW_END_DATE') {
                        this.leaveWindowEndDate = i.rule_value;
                        const today = moment();
                        if (this.leaveWindowEndDate === 'LAST_BUT_1_DAY') {
                            const lastDay = moment()
                                .endOf('month')
                                .subtract(1, 'day')
                                .startOf('day');
                            if (lastDay.isBefore(today)) {
                                this.maxDate = new Date(moment().add(1, 'month').format());
                            }
                        }
                        else if (this.leaveWindowEndDate === 'LAST_BUT_2_DAYS') {
                            const lastDay = moment()
                                .endOf('month')
                                .subtract(2, 'days')
                                .startOf('day');
                            if (lastDay.isBefore(today)) {
                                this.maxDate = new Date(moment().add(1, 'month').format());
                            }
                        }
                        else if (this.leaveWindowEndDate === 'LAST_BUT_3_DAYS') {
                            const lastDay = moment()
                                .endOf('month')
                                .subtract(3, 'days')
                                .startOf('day');
                            if (lastDay.isBefore(today)) {
                                this.maxDate = new Date(moment().add(1, 'month').format());
                            }
                        }
                        else {
                            if (moment().date() > Number(this.leaveWindowEndDate)) {
                                this.maxDate = new Date(moment().add(1, 'month').format());
                            }
                        }
                    }
                });
                this.setCurrentMonthDateRange();
            }
        });
    }
    // setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    //   console.log('setMonthAndYear triggered');
    //   const selectedYear = normalizedMonthAndYear.year();
    //   const selectedMonth = normalizedMonthAndYear.month();
    //   const reportType = this.searchForm.controls.reportType.value;
    //   if (!this.date || this.date.length === 0) {
    //     console.warn('Pay schedule data not loaded.');
    //     return;
    //   }
    //   const selectedMonthStart = moment().year(selectedYear).month(selectedMonth).startOf('month');
    //   const selectedMonthEnd = moment().year(selectedYear).month(selectedMonth).endOf('month');
    //   let startDate: Moment = selectedMonthStart;
    //   let endDate: Moment = selectedMonthEnd;
    //   if (reportType !== 'calendar') {
    //     // Match a pay schedule range that overlaps with the selected month
    //     const matchedRange = this.date.find((item: any) => {
    //       const rangeStart = moment(item.startDate);
    //       const rangeEnd = moment(item.endDate);
    //       return (
    //         selectedMonthStart.isBetween(rangeStart, rangeEnd, null, '[]') ||
    //         selectedMonthEnd.isBetween(rangeStart, rangeEnd, null, '[]') ||
    //         (rangeStart.isSameOrAfter(selectedMonthStart) && rangeEnd.isSameOrBefore(selectedMonthEnd))
    //       );
    //     });
    //     if (matchedRange) {
    //       startDate = moment(matchedRange.startDate);
    //       endDate = moment(matchedRange.endDate);
    //     } else {
    //       console.warn('No payroll range found for selected month.');
    //     }
    //   }
    //   this.dateRangeLabel = `${startDate.format('DD MMM YYYY')} - ${endDate.format('DD MMM YYYY')}`;
    //   console.log('From Date:', startDate.format('DD MMM YYYY'));
    //   console.log('To Date:', endDate.format('DD MMM YYYY'));
    //   console.log('Formatted Range:', this.dateRangeLabel);
    //   this.searchForm.controls['fromDate'].setValue(startDate.toDate());
    //   this.searchForm.controls['toDate'].setValue(endDate.toDate());
    //   datepicker.close();
    // }
    checkNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
    getColVal(a, type = 'dt') {
        return (type == 'dt') ? a.split('_')[0] : a.split('_')[1];
    }
    generatePdf() {
        let fromDate = new Date(this.searchForm.controls.fromDate.value);
        let month_selected = `${fromDate.toLocaleString('default', { month: 'long' })} - ${fromDate.getFullYear()}`;
        let selections = ``;
        let currentDateFormat = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        let headers = this.headersList;
        let rpt_headers = this.headersList;
        let tblWidths = [];
        headers.forEach((c) => {
            let width = c.split('_')[0]?.toString().length == 2 ? 6 : (15);
            width = ((['Absents', 'Presents', 'Total', 'Late_Count'].includes(c)) ? 11 : width);
            width = ((c == 'S_No') ? 6 : width);
            tblWidths.push({ cellWidth: width });
        });
        headers = headers.map((c) => {
            c = c.replace(/_/g, ' ');
            return c;
        });
        let statusHeaders = ['A - Absent', 'P - Present', 'W - Week-Off', 'L - Leave', 'H - Holiday', 'HD - Half Day', 'WP - Week-off Present', 'HP - Holiday Present', 'HL - Halfday Leave'];
        selections = `Employee: ${this.userSession.firstname || '' + ' ' + this.userSession.middlename || 0 || 0},     Month Selected: ${month_selected}`;
        let footer_text = `${statusHeaders.toString()}`;
        let tblBody = [...this.List?.map((row) => rpt_headers.map((h) => row[h] ?? '')),];
        let tables = [{ headers: headers, sub_head: '', body: tblBody, widths: tblWidths, table_name: 'Attendance Monthly Detailed Report', startY: 10, cellFontSize: 7, headFontSize: 7, cellPadding: 0.5, footer_text: footer_text }];
        this.pdfService.generatePDF_common(headers.length > 25 ? 'landscape' : 'portrait', 'Attendance Monthly Detailed Report', selections, tables, `${currentDateFormat} - Attendance Monthly Detailed Report.pdf`);
    }
}
EmployeMonthlyDetailReportComponent.ɵfac = function EmployeMonthlyDetailReportComponent_Factory(t) { return new (t || EmployeMonthlyDetailReportComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_reports_service__WEBPACK_IMPORTED_MODULE_3__.ReportsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_pdf_header_service_pdf_header_service__WEBPACK_IMPORTED_MODULE_4__.PdfHeaderService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_9__.DatePipe), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_modules_payroll_payroll_service__WEBPACK_IMPORTED_MODULE_5__.PayrollService)); };
EmployeMonthlyDetailReportComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: EmployeMonthlyDetailReportComponent, selectors: [["app-employe-monthly-detail-report"]], viewQuery: function EmployeMonthlyDetailReportComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.table = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵProvidersFeature"]([
            {
                provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.DateAdapter,
                useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_11__.MomentDateAdapter,
                deps: [_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MAT_DATE_LOCALE],
            },
            { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MAT_DATE_FORMATS, useValue: MY_FORMATS },
        ])], decls: 44, vars: 10, consts: [["fxLayout", "column", 1, "first-col"], [1, "mt-card", "mat-elevation-z0"], [1, "mt-card-header"], [1, "mt-card-title"], ["fxLayout", "column", "fxLayoutAlign", "center start", 2, "padding-left", "1%"], [3, "formGroup"], ["formControlName", "reportType", "fxLayout", "row", 3, "change"], ["value", "calendar"], ["value", "leave"], ["fxLayout", "row", "fxLayoutAlign.xs", "center", "fxLayoutAlign", "space-between", 2, "padding-left", "1%", 3, "formGroup"], ["fxLayout", "row", "fxLayout.xs", "column", "fxFlex.xs", "100%"], ["fxFlex.xs", "100%", "appearance", "outline", 1, "mx-2", "my-2"], ["matInput", "", "readonly", "", "placeholder", "", "formControlName", "fromDate", 3, "matDatepicker", "min", "max", "click"], ["matSuffix", "", 1, "datepicker", 3, "for"], ["startView", "multi-year", 3, "monthSelected"], ["fromDate", ""], ["fxLayout", "row", "fxLayoutAlign.xs", "center center"], ["ngStyle.gt-md", "margin-top: 5%", "ngStyle.lt-lg", "margin-top: 5%", "ngStyle.xs", "margin-top: 0px"], ["tabIndex", "2", 1, "btn", "btn-primary", "mr-2", "mb-2", 3, "click"], [1, "line", 2, "color", "#1898d5", "font-size", "16px"], ["tabIndex", "3", 1, "btn", "btn-danger", "mr-2", "mb-2", 3, "click"], ["fxLayout", "row xs-column", "fxLayoutAlign", "end", "style", "margin-right: 3%;margin-top: 10px;", 4, "ngIf"], [1, "date-range-container", 2, "margin-left", "20px"], [1, "line_break"], ["class", "rTable", 4, "ngIf"], ["class", "p-2", 4, "ngIf"], ["fxLayout", "row xs-column", "fxLayoutAlign", "end", 2, "margin-right", "3%", "margin-top", "10px"], ["mat-icon-button", ""], ["title", "PDF", 3, "tabIndex"], ["src", "./assets/images/icons/pdf.png", "width", "20px", "height", "20px", 3, "click"], ["title", "Excel", 3, "tabIndex"], ["src", "./assets/images/icons/excel.png", 3, "click"], [1, "rTable"], [1, "rHeader"], [1, "red-icon"], [1, "green-icon"], [1, "blue-icon"], [1, "orange-icon"], [1, "yellow-icon"], [1, "light-icon"], [1, "wp-icon"], [1, "hp-icon"], [1, "hl-icon"], [1, "p-2"], [1, "example-container"], ["table", ""], [1, "custom-table"], [2, "width", "auto"], [4, "ngFor", "ngForOf"], ["style", "text-align: center; padding-top: 20px", 4, "ngIf"], [3, "ngClass"], [2, "font-size", "x-small"], [2, "width", "auto", "white-space", "initial"], [3, "ngStyle"], [2, "text-align", "center", "padding-top", "20px"]], template: function EmployeMonthlyDetailReportComponent_Template(rf, ctx) { if (rf & 1) {
        const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "mat-card", 1)(2, "mat-card-header", 2)(3, "mat-card-title", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, " Attendance Monthly Detail Report ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 4)(7, "form", 5)(8, "mat-radio-group", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("change", function EmployeMonthlyDetailReportComponent_Template_mat_radio_group_change_8_listener($event) { return ctx.onReportTypeChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "mat-radio-button", 7)(10, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Calendar based");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, "\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "mat-radio-button", 8)(14, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "Leave window based");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "div", 9)(17, "div", 10)(18, "mat-form-field", 11)(19, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, "Month and Year");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "input", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function EmployeMonthlyDetailReportComponent_Template_input_click_21_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r18); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](24); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](_r0.open()); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](22, "mat-datepicker-toggle", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "mat-datepicker", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("monthSelected", function EmployeMonthlyDetailReportComponent_Template_mat_datepicker_monthSelected_23_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r18); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](24); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.setMonthAndYear($event, _r0)); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "div", 16)(26, "span", 17)(27, "button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function EmployeMonthlyDetailReportComponent_Template_button_click_27_listener() { return ctx.Searchform(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](28, " Search ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](29, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](30, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function EmployeMonthlyDetailReportComponent_Template_button_click_30_listener() { return ctx.clearSelection(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](31, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](32, "Clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](33, EmployeMonthlyDetailReportComponent_div_33_Template, 8, 2, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "div", 22)(35, "label")(36, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](37, "Date Range :");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](38, "\u00A0\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](39, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](40);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](41, "hr", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](42, EmployeMonthlyDetailReportComponent_table_42_Template, 21, 0, "table", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](43, EmployeMonthlyDetailReportComponent_div_43_Template, 10, 3, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.myForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.searchForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("matDatepicker", _r0)("min", ctx.minDate)("max", ctx.maxDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("for", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.List.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.dateRangeLabel);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.List.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.List.length > 0);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgStyle, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButton, _angular_material_card__WEBPACK_IMPORTED_MODULE_13__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_13__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_13__.MatCardTitle, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__.MatDatepicker, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__.MatDatepickerToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_16__.MatInput, _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__.MatRadioButton, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_18__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_18__.DefaultLayoutAlignDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_18__.DefaultFlexDirective, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_19__.DefaultClassDirective, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_19__.DefaultStyleDirective], styles: ["table[_ngcontent-%COMP%], td[_ngcontent-%COMP%], th[_ngcontent-%COMP%] {\n  border: 1px solid;\n}\n\n.mat-elevation-z8[_ngcontent-%COMP%] {\n  display: block;\n  max-width: fit-content;\n  margin: 0 auto;\n  overflow-x: auto;\n  white-space: nowrap;\n}\n\nthead[_ngcontent-%COMP%] {\n  background-color: #28acaf;\n  color: white;\n}\n\n.theader[_ngcontent-%COMP%] {\n  font-stretch: normal;\n  font-style: normal;\n  letter-spacing: 0.32px;\n  font-weight: normal;\n  font-family: sans-serif;\n  font-size: 14px;\n}\n\nth[_ngcontent-%COMP%] {\n  padding: 2px;\n  text-align: center;\n}\n\ntd[_ngcontent-%COMP%] {\n  padding: 2px;\n  text-align: center;\n}\n\nmat-card[_ngcontent-%COMP%] {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  display: block;\n  position: relative;\n  padding-left: 0px;\n  padding-right: 0px;\n}\n\n.tableP[_ngcontent-%COMP%] {\n  padding-left: 1%;\n  padding-right: 1%;\n  padding-bottom: 1%;\n}\n\n  .mat-select-panel[aria-label=\"Items per page:\"] mat-option:last-child:before {\n  content: \"All\";\n}\n\n  .mat-select-panel[aria-label=\"Items per page:\"] mat-option:last-child .mat-option-text {\n  display: none;\n}\n\n tr.mat-header-row {\n  height: 45px !important;\n}\n\n .mat-form-field-appearance-outline .mat-form-field-wrapper {\n  margin: 0.2em 0 !important;\n}\n\n.custom[_ngcontent-%COMP%] {\n  margin-top: 3%;\n  width: 80px !important;\n  height: 40px;\n}\n\n.line_break[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 5px;\n  float: left;\n  color: black;\n  padding-top: 3px;\n  background-color: rgba(255, 255, 255, 0.5);\n}\n\n.example-container[_ngcontent-%COMP%] {\n  align-content: space-between;\n  padding: 5px;\n  height: 450px;\n  overflow: auto;\n  line-height: normal;\n}\n\n\n\n.green-icon[_ngcontent-%COMP%] {\n  color: green;\n  border-color: black;\n}\n\n.red-icon[_ngcontent-%COMP%] {\n  color: red;\n  border-color: black;\n}\n\n.blue-icon[_ngcontent-%COMP%] {\n  color: blue;\n  border-color: black;\n}\n\n.yellow-icon[_ngcontent-%COMP%] {\n  color: #800000;\n  border-color: black;\n}\n\n.orange-icon[_ngcontent-%COMP%] {\n  color: #FF8C00;\n  border-color: black;\n}\n\n.light-icon[_ngcontent-%COMP%] {\n  color: #ce06e4;\n  border-color: black;\n}\n\n.wp-icon[_ngcontent-%COMP%] {\n  color: #06c3e4;\n  border-color: black;\n}\n\n.hp-icon[_ngcontent-%COMP%] {\n  color: #06e471;\n  border-color: black;\n}\n\n.rTable[_ngcontent-%COMP%] {\n  width: 90% !important;\n  margin-left: 20px;\n}\n\n.rHeader[_ngcontent-%COMP%] {\n  background-color: #ffffff !important;\n}\n\n.hl-icon[_ngcontent-%COMP%] {\n  color: #8338ec;\n  border-color: black;\n}\n\n.date-range-container[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: bold;\n  margin-top: 10px;\n  color: #333;\n}\n\n.underline[_ngcontent-%COMP%] {\n  text-decoration: underline;\n}\n\n.custom-table[_ngcontent-%COMP%] {\n  align-items: flex-start;\n  width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  font-size: smaller;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtcGxveWUtbW9udGhseS1kZXRhaWwtcmVwb3J0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQUE7QUFDSjs7QUFDRTtFQUNFLGNBQUE7RUFFQSxzQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBRUo7O0FBQUE7RUFDRSx5QkFBQTtFQUNBLFlBQUE7QUFHRjs7QUFEQTtFQUNFLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0FBSUY7O0FBRkE7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7QUFLRjs7QUFGQTtFQUNHLFlBQUE7RUFDQSxrQkFBQTtBQUtIOztBQUhBO0VBQ0UseURBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBTUY7O0FBSkU7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFPSjs7QUFITTtFQUNFLGNBQUE7QUFNUjs7QUFDTTtFQUNFLGFBQUE7QUFFUjs7QUFHRTtFQUNFLHVCQUFBO0FBQUo7O0FBRUU7RUFDRSwwQkFBQTtBQUNKOztBQUNFO0VBQ0UsY0FBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtBQUVKOztBQUFBO0VBQ0ksV0FBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsMENBQUE7QUFHSjs7QUFEQTtFQUNFLDRCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7QUFJRjs7QUFBQSxpQkFBQTs7QUFDQTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtBQUdGOztBQURBO0VBQ0EsVUFBQTtFQUNBLG1CQUFBO0FBSUE7O0FBRkE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QUFLQTs7QUFIQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQU1BOztBQUpBO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0FBT0Y7O0FBSkE7RUFDRSxjQUFBO0VBQ0EsbUJBQUE7QUFPRjs7QUFKQTtFQUNFLGNBQUE7RUFDQSxtQkFBQTtBQU9GOztBQUxBO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0FBUUY7O0FBTEE7RUFDRSxxQkFBQTtFQUNBLGlCQUFBO0FBUUY7O0FBTkE7RUFDRSxvQ0FBQTtBQVNGOztBQU5BO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0FBU0Y7O0FBTkE7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUFTRjs7QUFOQTtFQUNFLDBCQUFBO0FBU0Y7O0FBTkE7RUFDRSx1QkFBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFTRiIsImZpbGUiOiJlbXBsb3llLW1vbnRobHktZGV0YWlsLXJlcG9ydC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlLCB0ZCwgdGgge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQ7XHJcbiAgfVxyXG4gIC5tYXQtZWxldmF0aW9uLXo4IHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgbWF4LXdpZHRoOiAtbW96LWZpdC1jb250ZW50O1xyXG4gICAgbWF4LXdpZHRoOiBmaXQtY29udGVudDtcclxuICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgb3ZlcmZsb3cteDogYXV0bztcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxudGhlYWR7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4YWNhZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuLnRoZWFkZXJ7XHJcbiAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjMycHg7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxudGgge1xyXG4gIHBhZGRpbmc6IDJweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gfVxyXG50ZCB7XHJcbiAgIHBhZGRpbmc6IDJweDtcclxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbm1hdC1jYXJkIHtcclxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDI4MG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHBhZGRpbmctbGVmdDogMHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDBweDtcclxufVxyXG4gIC50YWJsZVB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDElO1xyXG4gICAgcGFkZGluZy1yaWdodDogMSU7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMSU7XHJcbiAgfVxyXG4gIDo6bmctZGVlcCB7XHJcbiAgICAubWF0LXNlbGVjdC1wYW5lbFthcmlhLWxhYmVsPVwiSXRlbXMgcGVyIHBhZ2U6XCJdIHtcclxuICAgICAgbWF0LW9wdGlvbjpsYXN0LWNoaWxkOmJlZm9yZSB7XHJcbiAgICAgICAgY29udGVudDogJ0FsbCc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIDo6bmctZGVlcCB7XHJcbiAgICAubWF0LXNlbGVjdC1wYW5lbFthcmlhLWxhYmVsPVwiSXRlbXMgcGVyIHBhZ2U6XCJdIHtcclxuICAgICAgbWF0LW9wdGlvbjpsYXN0LWNoaWxkIC5tYXQtb3B0aW9uLXRleHQge1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiBcclxuICA6Om5nLWRlZXB0ci5tYXQtaGVhZGVyLXJvdyB7XHJcbiAgICBoZWlnaHQ6IDQ1cHggIWltcG9ydGFudDtcclxuICB9XHJcbiAgOjpuZy1kZWVwLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XHJcbiAgICBtYXJnaW46IDAuMmVtIDAgIWltcG9ydGFudDtcclxuICB9XHJcbiAgLmN1c3RvbSB7XHJcbiAgICBtYXJnaW4tdG9wOiAzJTtcclxuICAgIHdpZHRoOiA4MHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbn1cclxuLmxpbmVfYnJlYWsge1xyXG4gICAgd2lkdGg6MTAwJTtcclxuICAgIGhlaWdodDogNXB4O1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBwYWRkaW5nLXRvcDogM3B4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwuNSk7XHJcbn1cclxuLmV4YW1wbGUtY29udGFpbmVyIHtcclxuICBhbGlnbi1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIHBhZGRpbmc6IDVweDtcclxuICBoZWlnaHQ6IDQ1MHB4O1xyXG4gIG92ZXJmbG93OiBhdXRvO1xyXG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbiAgLy9vdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4vKiogdGFibGUgaGludCAqKi9cclxuLmdyZWVuLWljb24ge1xyXG4gIGNvbG9yOiBncmVlbjtcclxuICBib3JkZXItY29sb3I6IGJsYWNrO1xyXG59XHJcbi5yZWQtaWNvbiB7XHJcbmNvbG9yOiByZWQ7XHJcbmJvcmRlci1jb2xvcjogYmxhY2s7XHJcbn1cclxuLmJsdWUtaWNvbiB7XHJcbmNvbG9yOiBibHVlO1xyXG5ib3JkZXItY29sb3I6IGJsYWNrO1xyXG59XHJcbi55ZWxsb3ctaWNvbiB7XHJcbmNvbG9yOiAjODAwMDAwO1xyXG5ib3JkZXItY29sb3I6IGJsYWNrO1xyXG59XHJcbi5vcmFuZ2UtaWNvbiB7XHJcbiAgY29sb3I6ICNGRjhDMDA7XHJcbiAgYm9yZGVyLWNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmxpZ2h0LWljb24ge1xyXG4gIGNvbG9yOiAjY2UwNmU0O1xyXG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi53cC1pY29uIHtcclxuICBjb2xvcjojMDZjM2U0O1xyXG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XHJcbn1cclxuLmhwLWljb24ge1xyXG4gIGNvbG9yOiMwNmU0NzE7XHJcbiAgYm9yZGVyLWNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLnJUYWJsZXtcclxuICB3aWR0aDogOTAlICFpbXBvcnRhbnQ7XHJcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbn1cclxuLnJIZWFkZXJ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50OztcclxufVxyXG5cclxuLmhsLWljb24ge1xyXG4gIGNvbG9yOiM4MzM4ZWM7XHJcbiAgYm9yZGVyLWNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmRhdGUtcmFuZ2UtY29udGFpbmVyIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLnVuZGVybGluZSB7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbn1cclxuXHJcbi5jdXN0b20tdGFibGUge1xyXG4gIGFsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuICBib3JkZXItc3BhY2luZzogMDtcclxuICBmb250LXNpemU6IHNtYWxsZXI7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 93688:
/*!***********************************************************!*\
  !*** ./src/app/modules/reports/reports-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReportsRoutingModule": () => (/* binding */ ReportsRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_pages_main_main_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/pages/main/main.component */ 40440);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);




const routes = [
    { path: '', component: src_app_pages_main_main_component__WEBPACK_IMPORTED_MODULE_0__.MainComponent, children: [] }
];
class ReportsRoutingModule {
}
ReportsRoutingModule.ɵfac = function ReportsRoutingModule_Factory(t) { return new (t || ReportsRoutingModule)(); };
ReportsRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: ReportsRoutingModule });
ReportsRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ReportsRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 85187:
/*!***************************************************!*\
  !*** ./src/app/modules/reports/reports.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReportsModule": () => (/* binding */ ReportsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _reports_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reports-routing.module */ 93688);
/* harmony import */ var _pages_summary_report_summary_report_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/summary-report/summary-report.component */ 40165);
/* harmony import */ var _pages_detail_report_detail_report_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/detail-report/detail-report.component */ 61563);
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! @angular/flex-layout */ 62681);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_app_material_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/material/material.module */ 90898);
/* harmony import */ var _pages_dialog_detail_dialog_detail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/dialog-detail/dialog-detail.component */ 41442);
/* harmony import */ var _pages_employe_monthly_detail_report_employe_monthly_detail_report_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/employe-monthly-detail-report/employe-monthly-detail-report.component */ 25596);
/* harmony import */ var src_app_custom_directive_limit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/custom-directive/limit */ 69747);
/* harmony import */ var _pages_late_attendance_report_late_attendance_report_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/late-attendance-report/late-attendance-report.component */ 66393);
/* harmony import */ var _pages_shifts_wise_report_shifts_wise_report_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/shifts-wise-report/shifts-wise-report.component */ 54135);
/* harmony import */ var _pages_shift_employees_dialog_shift_employees_dialog_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/shift-employees-dialog/shift-employees-dialog.component */ 21462);
/* harmony import */ var _pages_admin_attendance_detailed_report_admin_attendance_detailed_report_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/admin-attendance-detailed-report/admin-attendance-detailed-report.component */ 65850);
/* harmony import */ var _pages_admin_shiftwise_emp_report_admin_shiftwise_emp_report_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/admin-shiftwise-emp-report/admin-shiftwise-emp-report.component */ 27659);
/* harmony import */ var _pages_admin_shift_employee_dialog_admin_shift_employee_dialog_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pages/admin-shift-employee-dialog/admin-shift-employee-dialog.component */ 92060);
/* harmony import */ var _pages_admin_attendance_summary_report_admin_attendance_summary_report_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pages/admin-attendance-summary-report/admin-attendance-summary-report.component */ 63522);
/* harmony import */ var _pages_report_users_configuration_report_users_configuration_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pages/report-users-configuration/report-users-configuration.component */ 61487);
/* harmony import */ var _pages_common_reports_common_reports_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pages/common-reports/common-reports.component */ 53112);
/* harmony import */ var _pages_common_reports_components_leave_report_leave_report_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pages/common-reports/components/leave-report/leave-report.component */ 38342);
/* harmony import */ var _pages_common_reports_components_Detailed_Payroll_Report_detailed_payroll_report_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pages/common-reports/components/Detailed-Payroll-Report/detailed-payroll-report.component */ 24695);
/* harmony import */ var _pages_common_reports_components_EPF_reports_epf_reports_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pages/common-reports/components/EPF-reports/epf-reports.component */ 47884);
/* harmony import */ var _pages_common_reports_components_ESI_reports_esireports_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pages/common-reports/components/ESI-reports/esireports.component */ 58918);
/* harmony import */ var _pages_common_reports_components_Shiftwise_attendance_report_shiftwise_report_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./pages/common-reports/components/Shiftwise-attendance-report/shiftwise-report.component */ 16941);
/* harmony import */ var _pages_common_reports_components_attendance_late_report_attendance_late_report_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./pages/common-reports/components/attendance-late-report/attendance-late-report.component */ 73237);
/* harmony import */ var _pages_common_reports_components_attendance_summary_report_attendance_summary_report_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pages/common-reports/components/attendance-summary-report/attendance-summary-report.component */ 27185);
/* harmony import */ var _pages_common_reports_components_detailed_attendance_report_attendance_detailed_report_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./pages/common-reports/components/detailed-attendance-report/attendance-detailed-report.component */ 82541);
/* harmony import */ var _pages_common_reports_components_employee_details_employee_details_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./pages/common-reports/components/employee-details/employee-details.component */ 68671);
/* harmony import */ var _pages_common_reports_components_employee_payment_report_employee_payment_report_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./pages/common-reports/components/employee-payment-report/employee-payment-report.component */ 35637);
/* harmony import */ var _pages_common_reports_components_professional_tax_report_professional_tax_report_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./pages/common-reports/components/professional-tax-report/professional-tax-report.component */ 83053);
/* harmony import */ var _pages_common_reports_components_report_popup_cm_report_popup_cm_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./pages/common-reports/components/report-popup-cm/report-popup-cm.component */ 93036);
/* harmony import */ var _pages_employee_summary_report_employee_summary_report_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./pages/employee-summary-report/employee-summary-report.component */ 12456);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);
/* harmony import */ var _pages_employee_late_attendance_report_employee_late_attendance_report_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./pages/employee-late-attendance-report/employee-late-attendance-report.component */ 2633);
/* harmony import */ var _pages_future_shifts_report_future_shifts_report_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./pages/future-shifts-report/future-shifts-report.component */ 17908);
/* harmony import */ var _pages_otreports_otreports_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./pages/otreports/otreports.component */ 90303);
/* harmony import */ var _pages_ot_reports_dialog_ot_reports_dialog_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./pages/ot-reports-dialog/ot-reports-dialog.component */ 12122);
/* harmony import */ var _pages_current_day_punch_details_current_day_punch_details_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./pages/current-day-punch-details/current-day-punch-details.component */ 58736);
/* harmony import */ var _pages_dialog_currentdaypunchdetails_dialog_currentdaypunchdetails_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./pages/dialog-currentdaypunchdetails/dialog-currentdaypunchdetails.component */ 18788);
/* harmony import */ var _pages_checkin_out_summary_report_checkin_out_summary_report_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./pages/checkin-out-summary-report/checkin-out-summary-report.component */ 49877);
/* harmony import */ var _pages_checkin_out_summary_report_dialog_checkin_out_summary_report_dialog_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./pages/checkin-out-summary-report-dialog/checkin-out-summary-report-dialog.component */ 24340);
/* harmony import */ var _pages_admin_checkin_out_summary_report_admin_checkin_out_summary_report_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./pages/admin-checkin-out-summary-report/admin-checkin-out-summary-report.component */ 78112);
/* harmony import */ var _pages_common_reports_components_checkinoutsummaryreport_checkinoutsummaryreport_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./pages/common-reports/components/checkinoutsummaryreport/checkinoutsummaryreport.component */ 98707);
/* harmony import */ var _pages_employee_missed_punch_out_report_employee_missed_punch_out_report_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./pages/employee-missed-punch-out-report/employee-missed-punch-out-report.component */ 93011);
/* harmony import */ var _pages_manager_missed_punch_out_report_manager_missed_punch_out_report_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./pages/manager-missed-punch-out-report/manager-missed-punch-out-report.component */ 55530);
/* harmony import */ var _pages_hr_missed_punch_out_report_hr_missed_punch_out_report_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./pages/hr-missed-punch-out-report/hr-missed-punch-out-report.component */ 68911);
/* harmony import */ var _pages_currentday_attendance_report_currentday_attendance_report_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./pages/currentday-attendance-report/currentday-attendance-report.component */ 51280);
/* harmony import */ var _pages_extra_days_penalty_report_employee_extra_days_penalty_report_employee_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./pages/extra-days-penalty-report-employee/extra-days-penalty-report-employee.component */ 64745);
/* harmony import */ var _pages_extra_days_penalty_report_manager_extra_days_penalty_report_manager_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./pages/extra-days-penalty-report-manager/extra-days-penalty-report-manager.component */ 1665);
/* harmony import */ var _pages_admin_late_attendance_detailed_report_admin_late_attendance_detailed_report_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./pages/admin-late-attendance-detailed-report/admin-late-attendance-detailed-report.component */ 19693);
/* harmony import */ var _pages_employee_daily_punch_summary_report_employee_daily_punch_summary_report_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./pages/employee-daily-punch-summary-report/employee-daily-punch-summary-report.component */ 35973);
/* harmony import */ var _pages_daily_punch_report_daily_punch_report_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./pages/daily-punch-report/daily-punch-report.component */ 94994);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! @ngx-translate/core */ 38699);
/* harmony import */ var src_app_modules_payroll_payroll_module__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! src/app//modules/payroll/payroll.module */ 99325);
/* harmony import */ var _pages_month_year_selection_month_year_selection_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./pages/month-year-selection/month-year-selection.component */ 17834);
/* harmony import */ var _reports_pages_employee_detail_report_employee_detail_report_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ../reports/pages/employee-detail-report/employee-detail-report.component */ 29963);
/* harmony import */ var _pages_admin_attendance_monthly_report_source_admin_attendance_monthly_report_source_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./pages/admin-attendance-monthly-report-source/admin-attendance-monthly-report-source.component */ 43549);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! @angular/core */ 22560);


























































class ReportsModule {
}
ReportsModule.ɵfac = function ReportsModule_Factory(t) { return new (t || ReportsModule)(); };
ReportsModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_53__["ɵɵdefineNgModule"]({ type: ReportsModule });
ReportsModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_53__["ɵɵdefineInjector"]({ imports: [_angular_common__WEBPACK_IMPORTED_MODULE_54__.CommonModule,
        _reports_routing_module__WEBPACK_IMPORTED_MODULE_0__.ReportsRoutingModule,
        src_app_material_material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_55__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_55__.ReactiveFormsModule,
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_56__.FlexLayoutModule,
        src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_29__.SharedModule,
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_57__.TranslateModule,
        src_app_modules_payroll_payroll_module__WEBPACK_IMPORTED_MODULE_49__.PayrollModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_53__["ɵɵsetNgModuleScope"](ReportsModule, { declarations: [_pages_summary_report_summary_report_component__WEBPACK_IMPORTED_MODULE_1__.SummaryReportComponent,
        _pages_detail_report_detail_report_component__WEBPACK_IMPORTED_MODULE_2__.DetailReportComponent,
        _pages_dialog_detail_dialog_detail_component__WEBPACK_IMPORTED_MODULE_4__.DialogDetailComponent,
        _pages_employe_monthly_detail_report_employe_monthly_detail_report_component__WEBPACK_IMPORTED_MODULE_5__.EmployeMonthlyDetailReportComponent,
        src_app_custom_directive_limit__WEBPACK_IMPORTED_MODULE_6__.Limit,
        _pages_late_attendance_report_late_attendance_report_component__WEBPACK_IMPORTED_MODULE_7__.LateAttendanceReportComponent,
        _pages_shifts_wise_report_shifts_wise_report_component__WEBPACK_IMPORTED_MODULE_8__.ShiftsWiseReportComponent,
        _pages_shift_employees_dialog_shift_employees_dialog_component__WEBPACK_IMPORTED_MODULE_9__.ShiftEmployeesDialogComponent,
        _pages_admin_attendance_detailed_report_admin_attendance_detailed_report_component__WEBPACK_IMPORTED_MODULE_10__.AdminAttendanceDetailedReportComponent,
        _pages_admin_shiftwise_emp_report_admin_shiftwise_emp_report_component__WEBPACK_IMPORTED_MODULE_11__.AdminShiftwiseEmpReportComponent,
        _pages_admin_shift_employee_dialog_admin_shift_employee_dialog_component__WEBPACK_IMPORTED_MODULE_12__.AdminShiftEmployeeDialogComponent,
        _pages_admin_attendance_summary_report_admin_attendance_summary_report_component__WEBPACK_IMPORTED_MODULE_13__.AdminAttendanceSummaryReportComponent,
        _pages_report_users_configuration_report_users_configuration_component__WEBPACK_IMPORTED_MODULE_14__.ReportUsersConfigurationComponent,
        _pages_common_reports_common_reports_component__WEBPACK_IMPORTED_MODULE_15__.CommonReportsComponent,
        _pages_common_reports_components_leave_report_leave_report_component__WEBPACK_IMPORTED_MODULE_16__.LeaveReportComponent,
        _pages_common_reports_components_employee_payment_report_employee_payment_report_component__WEBPACK_IMPORTED_MODULE_25__.EmployeePaymentReportComponent,
        _pages_common_reports_components_Detailed_Payroll_Report_detailed_payroll_report_component__WEBPACK_IMPORTED_MODULE_17__.DetailedPayrollReportComponent,
        _pages_common_reports_components_professional_tax_report_professional_tax_report_component__WEBPACK_IMPORTED_MODULE_26__.ProfessionalTaxReportComponent,
        _pages_common_reports_components_attendance_late_report_attendance_late_report_component__WEBPACK_IMPORTED_MODULE_21__.AttendanceLateReportComponent,
        _pages_common_reports_components_detailed_attendance_report_attendance_detailed_report_component__WEBPACK_IMPORTED_MODULE_23__.AttendanceDetailedReportComponent,
        _pages_common_reports_components_attendance_summary_report_attendance_summary_report_component__WEBPACK_IMPORTED_MODULE_22__.AttendanceSummaryReportComponent,
        _pages_common_reports_components_employee_details_employee_details_component__WEBPACK_IMPORTED_MODULE_24__.EmployeeDetailsComponent,
        _pages_common_reports_components_report_popup_cm_report_popup_cm_component__WEBPACK_IMPORTED_MODULE_27__.ReportPopupCmComponent,
        _pages_common_reports_components_Shiftwise_attendance_report_shiftwise_report_component__WEBPACK_IMPORTED_MODULE_20__.ShiftwiseReportComponent,
        _pages_common_reports_components_EPF_reports_epf_reports_component__WEBPACK_IMPORTED_MODULE_18__.EPFReportsComponent,
        _pages_common_reports_components_ESI_reports_esireports_component__WEBPACK_IMPORTED_MODULE_19__.ESIreportsComponent,
        _pages_employee_summary_report_employee_summary_report_component__WEBPACK_IMPORTED_MODULE_28__.EmployeeSummaryReportComponent,
        _pages_employee_late_attendance_report_employee_late_attendance_report_component__WEBPACK_IMPORTED_MODULE_30__.EmployeeLateAttendanceReportComponent,
        _pages_future_shifts_report_future_shifts_report_component__WEBPACK_IMPORTED_MODULE_31__.FutureShiftsReportComponent,
        _pages_otreports_otreports_component__WEBPACK_IMPORTED_MODULE_32__.OTReportsComponent,
        _pages_ot_reports_dialog_ot_reports_dialog_component__WEBPACK_IMPORTED_MODULE_33__.OtReportsDialogComponent,
        _pages_current_day_punch_details_current_day_punch_details_component__WEBPACK_IMPORTED_MODULE_34__.CurrentDayPunchDetailsComponent,
        _pages_dialog_currentdaypunchdetails_dialog_currentdaypunchdetails_component__WEBPACK_IMPORTED_MODULE_35__.DialogCurrentdaypunchdetailsComponent,
        _pages_checkin_out_summary_report_checkin_out_summary_report_component__WEBPACK_IMPORTED_MODULE_36__.CheckinOutSummaryReportComponent,
        _pages_checkin_out_summary_report_dialog_checkin_out_summary_report_dialog_component__WEBPACK_IMPORTED_MODULE_37__.CheckinOutSummaryReportDialogComponent,
        _pages_admin_checkin_out_summary_report_admin_checkin_out_summary_report_component__WEBPACK_IMPORTED_MODULE_38__.AdminCheckinOutSummaryReportComponent,
        _pages_common_reports_components_checkinoutsummaryreport_checkinoutsummaryreport_component__WEBPACK_IMPORTED_MODULE_39__.CheckinoutsummaryreportComponent,
        _pages_employee_missed_punch_out_report_employee_missed_punch_out_report_component__WEBPACK_IMPORTED_MODULE_40__.EmployeeMissedPunchOutReportComponent,
        _pages_manager_missed_punch_out_report_manager_missed_punch_out_report_component__WEBPACK_IMPORTED_MODULE_41__.ManagerMissedPunchOutReportComponent,
        _pages_hr_missed_punch_out_report_hr_missed_punch_out_report_component__WEBPACK_IMPORTED_MODULE_42__.HrMissedPunchOutReportComponent,
        _pages_currentday_attendance_report_currentday_attendance_report_component__WEBPACK_IMPORTED_MODULE_43__.CurrentdayAttendanceReportComponent,
        _pages_extra_days_penalty_report_employee_extra_days_penalty_report_employee_component__WEBPACK_IMPORTED_MODULE_44__.ExtraDaysPenaltyReportEmployeeComponent,
        _pages_extra_days_penalty_report_manager_extra_days_penalty_report_manager_component__WEBPACK_IMPORTED_MODULE_45__.ExtraDaysPenaltyReportManagerComponent,
        _pages_admin_late_attendance_detailed_report_admin_late_attendance_detailed_report_component__WEBPACK_IMPORTED_MODULE_46__.AdminLateAttendanceDetailedReportComponent,
        _pages_employee_daily_punch_summary_report_employee_daily_punch_summary_report_component__WEBPACK_IMPORTED_MODULE_47__.EmployeeDailyPunchSummaryReportComponent,
        _pages_daily_punch_report_daily_punch_report_component__WEBPACK_IMPORTED_MODULE_48__.DailyPunchReportComponent,
        _reports_pages_employee_detail_report_employee_detail_report_component__WEBPACK_IMPORTED_MODULE_51__.EmployeeDetailReportComponent,
        _pages_month_year_selection_month_year_selection_component__WEBPACK_IMPORTED_MODULE_50__.MonthYearSelectionComponent,
        _pages_admin_attendance_monthly_report_source_admin_attendance_monthly_report_source_component__WEBPACK_IMPORTED_MODULE_52__.AdminAttendanceMonthlyReportSourceComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_54__.CommonModule,
        _reports_routing_module__WEBPACK_IMPORTED_MODULE_0__.ReportsRoutingModule,
        src_app_material_material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_55__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_55__.ReactiveFormsModule,
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_56__.FlexLayoutModule,
        src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_29__.SharedModule,
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_57__.TranslateModule,
        src_app_modules_payroll_payroll_module__WEBPACK_IMPORTED_MODULE_49__.PayrollModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_modules_reports_reports_module_ts.js.map