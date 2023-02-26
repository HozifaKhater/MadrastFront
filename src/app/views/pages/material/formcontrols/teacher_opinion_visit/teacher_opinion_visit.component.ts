import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { teacher_opinion_visitDataService } from '../../../../../Services/teacher_opinion_visitDataService';
import { Takeem_masterDataService } from '../../../../../Services/Takeem_masterDataService';
import { teacher_opinion_visit,teacher_opinion_visitMaster } from '../../../../../teacher_opinion_visitMaster.Model';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const moment = _rollupMoment || _moment;


@Component({
	selector: 'kt-teacher_opinion_visit',
	templateUrl: './teacher_opinion_visit.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-events {
		width: 400px;
		height: 200px;
		border: 1px solid #555;
		overflow: auto;
	  }
	`],
	

})
export class teacher_opinion_visitComponent implements OnInit {
	@Input() subject_data: any;
	ser	:string="";
	takeem_id:string="";
	emp_id:string="";
	is_agree:string="1";
	notes:string="";
	notes1:string="";

	startDate = new Date(1990, 0, 1);
	date = new FormControl(new Date());
	date10 = new FormControl(moment([2017, 0, 1]));

	serializedDate = new FormControl((new Date()).toISOString());
	minDate = new Date(2011, 0, 1);
	maxDate = new Date(2018, 11, 1);

    events: string[] = [];
    form1: FormGroup;
	decoded:any;
	constructor(private modalService: NgbModal,
		private cdRef: ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		private Takeem_masterDataService: Takeem_masterDataService,
		private teacher_opinion_visitDataService: teacher_opinion_visitDataService, 
		public _fb: FormBuilder) {

		const userToken = localStorage.getItem(environment.authTokenKey);
        this.decoded = jwt_decode(userToken);

		this.form1 = this._fb.group({
        });
		
	}

	change_agree(event){
		if(event !== null && event !== undefined && event.length !== 0){

			this.is_agree=event.target.value
		}
	}



	date_Change(event){
		if(event !== null && event !== undefined && event.length !== 0){

			this.Takeem_masterDataService.evaluation_subject_id=this.decoded.id;
			this.Takeem_masterDataService.evaluation_date=event.target.value;
			
			this.Takeem_masterDataService.DClicked("test")
		}
	}


	add_subject() {
            var val = {

			
				takeem_id:  Number(this.takeem_id)	,
				emp_id: Number(this.decoded.id)	,
				is_agree:  Number(this.is_agree)	,
				notes: this.notes	,
				

            };
            this.teacher_opinion_visitDataService.save_in_teacher_opinion_visit(val).subscribe(res => {
                alert("Added Successfully");
                this.teacher_opinion_visitDataService.BClicked("");
				 this.notes="";
				 this.is_agree="1";
            })
          
        
	}
	butDisabled: boolean;
    update_subject() {
       
     
            var val = {
               ser: this.teacher_opinion_visitDataService.ser,
				takeem_id	:  Number(this.takeem_id)	,
				emp_id	: Number(this.decoded.id)	,
				is_agree	:  Number(this.is_agree)	,
				notes	: this.notes	,
            };



            this.teacher_opinion_visitDataService.update_teacher_opinion_visit(val).subscribe(res => {
                alert("Updated Succesfully");
                this.teacher_opinion_visitDataService.BClicked("");
                this.notes="";
				this.is_agree="1";
				this.is_edit=false;
            })
        
	}
    is_edit:boolean=false;
	
    priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});
       
		this.butDisabled = true;
		

		this.teacher_opinion_visitDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.ser	=	this.teacher_opinion_visitDataService.ser	;
				this.takeem_id	=	this.teacher_opinion_visitDataService.takeem_id	;
				this.emp_id	=	this.teacher_opinion_visitDataService.emp_id	;
				this.is_agree	=	this.teacher_opinion_visitDataService.is_agree	;
				this.notes	=	this.teacher_opinion_visitDataService.notes	;
	

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});

	}

	myFilter = (d: any): boolean => {
		const day = d.day();
		// Prevent Saturday and Sunday from being selected.
		return day !== 0 && day !== 6;
	}

	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${type}: ${event.value}`);
	}

	display = "";
	openModal(content: any, event: any) {

		this.modalService.open(content, { backdrop: true, size: "xl", });
	}
	openModal1() {
		this.display = "show";
		this.cdRef.detectChanges();
	}
	onCloseHandled() {
		this.display = "";
	}
}
