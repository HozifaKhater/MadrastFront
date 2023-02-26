import { Component,ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
//import { PizzaParty2Component } from './pizza-party.component';

import {Visity_typesMaster,Visit_types} from '../../../../../Visit_typesMaster.Model';
import { Visit_typesDataService } from '../../../../../Services/Visit_typesDataService';

import {Visits,VisitsMaster} from '../../../../../VisitsMaster';
import { VisitsDataService } from '../../../../../Services/visitsDataService';

import { Departments,DepartmentMaster } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
export class VisitManagerComponent implements OnInit {

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
    activity_name: any
    mr7la_desc: any;
   
    public visit_id: number = 0;
  
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
   
    attendance_precent: string = "";
    form1: FormGroup;
    constructor(
        private cdRef:ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        private modalService: NgbModal,
        public _fb: FormBuilder, private datePipe: DatePipe,public snackBar: MatSnackBar,
        private Visit_typesDataService: Visit_typesDataService,
        private VisitsDataService: VisitsDataService,
        private DepartmentDataService: DepartmentDataService) {

        this.form1 = this._fb.group({
         
            job: ['', [Validators.required]],
            topic: ['', [Validators.required]]
            

        });

        this.Visit_typesDataService.GetAllVisit_types().subscribe(data => this.visit_types = data,
            error => console.log());

        this.DepartmentDataService.GetAlldepartment().subscribe(data => this.departments = data,
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
            });

    }

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	//openSnackBar2() {
	//	this.snackBar.openFromComponent(PizzaPartyComponent, {
	//	  duration: 500,
	//	});
	//}

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

    // candidates: any[] = [
    //   {
    //     'name': 'Default Name',
    //     'title': 'Job Title',
    //   },
    //   {
    //     'name': 'Default Name 2',
    //     'title': 'Job Title',
    //   }
    // ];
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
    add_vists() {

        if (this.form1.invalid) {

            this.form1.markAllAsTouched();
        } else {

            var val = {
                
                visit_date: this.visit_date,
                topic: this.topic,
                job: this.job,
                percentage: this.attendance_precent
        
            };
            this.VisitsDataService.addvisits(val).subscribe(res => {
            
                alert("Added Successfuly");
                this.VisitsDataService.BClicked("b2");
            })

        }
    }

    update_vists() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
       
        var val = {
            visit_id: this.visit_id,
            visit_type_name: this.visit_type_name,
            visit_type_id: this.visit_type_id,
            visit_date: this.visit_date,
            phone: this.phone,
            start_time: this.start_time,
            end_time: this.end_time,
            name: this.name,
            topic: this.topic,
            instructions: this.instructions,
            job: this.job,
            notes: this.notes,
            dep_name: this.dep_name,
            dep_id: this.dep_id,
            vnote: this.vnote,
            percentage: this.attendance_precent

        };
        this.VisitsDataService.updatevisits(val).subscribe(res => {

            alert("Updated Successfuly");
            this.VisitsDataService.BClicked("b2");
            this.is_edit=false;

        })
            this.form1.reset();
        }
        

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
                this.visit_date = this.VisitsDataService.visit_date;
                this.phone = this.VisitsDataService.phone;
                this.start_time = this.VisitsDataService.start_time;
                this.end_time = this.VisitsDataService.end_time;
                this.name = this.VisitsDataService.name;
                this.topic = this.VisitsDataService.topic;
                this.instructions = this.VisitsDataService.instructions;
                this.job = this.VisitsDataService.job;
                this.notes = this.VisitsDataService.notes;
                this.attendance_precent = this.VisitsDataService.percentage.toString();

                
                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

            })
       
	}
}
