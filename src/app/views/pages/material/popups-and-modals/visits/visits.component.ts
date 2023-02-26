import { Component,ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
//import { PizzaParty1Component } from './pizza-party.component';

import {Visity_typesMaster,Visit_types} from '../../../../../Visit_typesMaster.Model';
import { Visit_typesDataService } from '../../../../../Services/Visit_typesDataService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { VisitsDataService } from '../../../../../Services/visitsDataService';

import { Departments,DepartmentMaster } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { Employee } from '../../../../../EmployeeMaster.Model';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import moment from 'moment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-visit',
	templateUrl: './visits.component.html',
	styles: [`
	`]
})
export class VisitComponent implements OnInit {

    public Editor = ClassicEditor;
    @ViewChild("myEditor", { static: false }) myEditor: any;
    is_edit:boolean=false;
	exampleBasic;
	exampleCustom;
	exampleDismissal;
    visit_types: Visity_typesMaster[];
    Visit_types_model: Visit_types[];
    departments: Departments[];
    selecteddepartment: any;
    selected_visit_type: any;
    visit_type_id: any;
    visit_type_name: any;
    is_visit_date: any;
    visit_date: any;
    visit_date2: any;
    is_phone: any;
    phone_label: any;
    is_start_time: any;
    start_time_label: any;
    is_end_time: any;
    end_time_label: any;
    is_name: any;
    name_label: any;
    is_topic: any;
    topic_label: any;
    is_instructions: any;
    instructions_label: any;
    is_job: any;
    job_label: any;
    is_notes: any;
    notes_label: any;
    is_dep: any;
    dep_label: any;
    is_vnote: any;
    vnote_label: any;
    is_vpic: any;
    vpic_label: any;
    is_emp_from: any;
    emp_from_label: any;
    is_emp_to: any;
    emp_to_label: any;
    is_takeem: any;
    takeem_label: any;
    is_emp_from_check:any;
    is_emp_to_check: any;
    is_takeem_check: any;
    selectedemp_from:any=[];
    selectedemp_to:any=[];
    dateValue:string="";
    onFileChanged(event){};
    public visit_id: number = 0;
    form1: FormGroup;
    public visit_date_db: string="";
    public phone: string = "";
    public start_time: string = "";
    public end_time: string = "";
    public name: string = "";
    public topic: string = "";
    public instructions: string = "";
    public job: string = "";
    public notes: string = "";
    public dep_name: string = "";
    public dep_id: string = "0";
    public vnote: string = "";
    public vpic: string = "";
    visitValue:any;
    emp_from:Employee[];
    emp_to:Employee[];
    constructor(
        private EmployeeDataService:EmployeeDataService,
        private modalService: NgbModal,
        public _fb: FormBuilder,
        private cdRef:ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        private datePipe: DatePipe,public snackBar: MatSnackBar,
        private Visit_typesDataService: Visit_typesDataService,
        private VisitsDataService: VisitsDataService,
        private DepartmentDataService: DepartmentDataService) {

            
            this.form1 = this._fb.group({

            });
        
        this.Visit_typesDataService.GetAllVisit_types()
        .subscribe(data => this.visit_types = data,
            error => console.log());
        
            this.DepartmentDataService.GetAlldepartment()
        .subscribe(data => this.departments = data,
            error => console.log());

            this.EmployeeDataService.GetAllEmployee()
            .subscribe(data => this.emp_from = data,
                error => console.log());
                this.EmployeeDataService.GetAllEmployee()
                .subscribe(data => this.emp_to = data,
                    error => console.log());

        let d_from = new Date();
        d_from.setDate(d_from.getDate());

        this.year_date_from = this.datePipe.transform(d_from, 'yyyy-MM-dd');

     
    }
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
    visit_types_selection(event) {
        this.visit_type_id = event.visit_visit_type_id;
        this.visit_type_name = event.visit_type_name;

        this.Visit_typesDataService.GetAllvisit_types_with_id(event.visit_type_id).subscribe(data => this.Visit_types_model = data,
            error => console.log(),
            () => {
                
                this.is_visit_date = this.Visit_types_model[0].is_visit_date;
                this.visit_date = this.Visit_types_model[0].visit_date;
                this.is_phone = this.Visit_types_model[0].is_phone;
                this.phone_label = this.Visit_types_model[0].phone_label;
                this.is_start_time = this.Visit_types_model[0].is_start_time;
                this.start_time_label = this.Visit_types_model[0].start_time_label;
                this.is_end_time = this.Visit_types_model[0].is_end_time;
                this.end_time_label = this.Visit_types_model[0].end_time_label;
                this.is_name = this.Visit_types_model[0].is_name;
                this.name_label = this.Visit_types_model[0].name_label;
                this.is_topic = this.Visit_types_model[0].is_topic;
                this.topic_label = this.Visit_types_model[0].topic_label;
                this.is_instructions = this.Visit_types_model[0].is_instructions;
                this.instructions_label = this.Visit_types_model[0].instructions_label;
                this.is_job = this.Visit_types_model[0].is_job;
                this.job_label = this.Visit_types_model[0].job_label;
                this.is_notes = this.Visit_types_model[0].is_notes;
                this.notes_label = this.Visit_types_model[0].notes_label;
                this.is_dep = this.Visit_types_model[0].is_dep;
                this.dep_label = this.Visit_types_model[0].dep_label;
                this.is_vnote = this.Visit_types_model[0].is_vnote;
                this.vnote_label = this.Visit_types_model[0].vnote_label;
                this.is_vpic = this.Visit_types_model[0].is_vpic;
                this.vpic_label = this.Visit_types_model[0].vpic_label;

                this.is_emp_from = this.Visit_types_model[0].is_emp_from;
                this.emp_from_label = this.Visit_types_model[0].emp_from_label;
                this.is_emp_to = this.Visit_types_model[0].is_emp_to;
                this.is_emp_to = this.Visit_types_model[0].is_emp_to;
                this.is_takeem = this.Visit_types_model[0].is_takeem;
                this.takeem_label = this.Visit_types_model[0].takeem_label;
            });
    }

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	openSnackBar3(message: string, action: string) {
		this.snackBar.open(message, action, {
		  duration: 6500,
		});
	  }
    fieldArray: Array<any> = [
        {
            name: '',
            name1:''
           
        }
    ];
    newAttribute: any = {};

    firstField = true;
    firstFieldName = 'First Item name';
    isEditItems: boolean;

    year_date_to: string;
    year_date_from: string;
    addFieldValue(index) {
        if (index != 0) {
            this.fieldArray.push(this.newAttribute);
            this.newAttribute = {};
        }

    }

    deleteFieldValue(index) {
        if (index != 0) {
            this.fieldArray.splice(index, 1);
        }
    }
    returned_id: any;
    add_year() {

        if (this.selecteddepartment === undefined) {
           this.selecteddepartment = [{'dep_name': "", 'dep_id': 0}];
        }
        if (this.selectedemp_from.length < 1) {
            this.selectedemp_from = [{'emp_name': "", 'emp_id': 0}];
         }
         if (this.selectedemp_to.length < 1) {
            this.selectedemp_to = [{'emp_name': "", 'emp_id': 0}];
         }

        var val = {
            
            visit_type_name: this.selected_visit_type.visit_type_name,
            visit_type_id: this.selected_visit_type.visit_type_id,
            visit_date: this.visit_date2,
            start_time: this.start_time,
            end_time: this.end_time,
            name: this.name,
            phone: this.selected_visit_type.phone_label,
            topic: this.selected_visit_type.topic_label,
            instructions: this.selected_visit_type.instructions_label,
            job: this.selected_visit_type.job_label,
            notes: this.notes,
            dep_name: this.selecteddepartment.dep_name,
            dep_id: this.selecteddepartment.dep_id,
            vnote: this.selected_visit_type.vnote_label,
            emp_from_id:this.selectedemp_from.emp_id,
            emp_to_id:this.selectedemp_to.emp_id,
        };

        this.VisitsDataService.addvisits(val).subscribe(res => {
            alert("Added Successfuly");
            this.VisitsDataService.BClicked("b2");
        })
        
    }

    update_year() {
        if (this.selecteddepartment === undefined) {
            this.selecteddepartment = [{'dep_name': "", 'dep_id': 0}];
         }
       
        var val = {
            visit_id: this.visit_id,
            visit_type_name: this.visit_type_name,
            visit_type_id: this.visit_type_id,
            visit_date: this.visit_date2,
            start_time: this.start_time,
            end_time: this.end_time,
            name: this.name,
            phone: this.phone,
            topic: this.topic,
            instructions: this.instructions,
            job: this.job,
            notes: this.notes,
            dep_name: this.selecteddepartment.dep_name,
            dep_id: this.selecteddepartment.dep_id,
            vnote: this.vnote,
            emp_from_id:this.selectedemp_from.emp_id,
            emp_to_id:this.selectedemp_to.emp_id

        };

        this.VisitsDataService.updatevisits(val).subscribe(res => {
            alert("Updated Successfuly");
            this.VisitsDataService.BClicked("b2");
            this.is_edit=false;

        })
    
        

    }
    
    year_data_id: any;
	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});


        this.VisitsDataService.aClickedEvent
            .subscribe((data: string) => {
                this.is_edit=true;

                this.visit_id = this.VisitsDataService.visit_id;
               // this.visit_type_name = this.VisitsDataService.visit_type_name;
              //  this.visit_type_id = this.VisitsDataService.visit_type_id;
                this.visit_date_db = this.VisitsDataService.visit_date;
                this.phone = this.VisitsDataService.phone;
                this.start_time = this.VisitsDataService.start_time;
                this.end_time = this.VisitsDataService.end_time;
                this.name = this.VisitsDataService.name;
                this.topic = this.VisitsDataService.topic;
                this.instructions = this.VisitsDataService.instructions;
                this.job = this.VisitsDataService.job;
                this.notes = this.VisitsDataService.notes;
               // this.dep_name = this.VisitsDataService.dep_name;
               // this.dep_id = this.VisitsDataService.dep_id;
                this.vnote = this.VisitsDataService.vnote;
                this.dateValue=this.VisitsDataService.visit_date;

                var selected_value = this.VisitsDataService.visit_type_id
                this.selected_visit_type = this.visit_types[this.visit_types.findIndex(function (el) {
                    return String(el.visit_type_id) == selected_value
                })];

                var selected_value = this.VisitsDataService.dep_id
                this.selecteddepartment = this.departments[this.departments.findIndex(function (el) {
                    return String(el.dep_id) == selected_value
                })];
                var selected_value_emp_from = this.VisitsDataService.emp_from_id
                this.selectedemp_from = this.emp_from[this.emp_from.findIndex(function (el) {
                    return String(el.emp_id) == selected_value_emp_from
                })];
                var selected_value_emp_to_id = this.VisitsDataService.emp_to_id
                this.selectedemp_to = this.emp_to[this.emp_to.findIndex(function (el) {
                    return String(el.emp_id) == selected_value_emp_to_id
                })];

                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

            });

       
	}
}
