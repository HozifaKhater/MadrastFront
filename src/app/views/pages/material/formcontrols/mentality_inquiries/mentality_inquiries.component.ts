import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import {mentality_inquiriesDataService  } from '../../../../../Services/mentality_inquiriesDataService';
import { mentality_inquiries,mentality_inquiriesMaster } from '../../../../../mentality_inquiriesMaster.Model';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const moment = _rollupMoment || _moment;


@Component({
    selector: 'kt-mentality_inquiries',
    templateUrl: './mentality_inquiries.component.html',
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
export class mentality_inquiriesComponent implements OnInit {
	@Input() subject_data: any;
    id: string = "";
    problem_type: string = "";
    answer: string = "";
    ntoes: string = "";

	startDate = new Date(1990, 0, 1);
	date = new FormControl(new Date());
	date10 = new FormControl(moment([2017, 0, 1]));

	serializedDate = new FormControl((new Date()).toISOString());
	minDate = new Date(2011, 0, 1);
	maxDate = new Date(2018, 11, 1);

    events: string[] = [];
    form1: FormGroup;
    constructor(
        private cdRef:ChangeDetectorRef,
        private modalService: NgbModal,
		private router: Router, private user_privDataService: user_privDataService,
		private mentality_inquiriesDataService: mentality_inquiriesDataService, 
		public _fb: FormBuilder) {
        this.form1 = this._fb.group({
          
            problem_type: ['', [Validators.required]],
            answer: ['', [Validators.required]],
            ntoes: [''],

        });
    }

    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }


	add_subject() {

        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {
                problem_type: this.problem_type,
                answer: this.answer,
                ntoes: this.ntoes
            };
            this.mentality_inquiriesDataService.addmentality_inquiries(val).subscribe(res => {
                alert("Added Successfully");
				this.mentality_inquiriesDataService.BClicked("");
            },error => {
                const errorMessages = [];
                for (const fieldName in error.error.errors) {
                  if (error.error.errors.hasOwnProperty(fieldName)) {
                    const fieldErrors = error.error.errors[fieldName];
                    for (const fieldError of fieldErrors) {
                      errorMessages.push(fieldError);
                    }
                  }
                }
                alert(errorMessages)
            })
            this.form1.reset();
        }
	}
	butDisabled: boolean;
    update_subject() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {
                id: this.id,
                problem_type: this.problem_type,
                answer: this.answer,
                ntoes: this.ntoes

            };

            this.mentality_inquiriesDataService.updatementality_inquiries(val).subscribe(res => {
                alert("Updated Succesfully");
				this.mentality_inquiriesDataService.BClicked("");
                this.form1.reset();
                this.is_edit=false;
               
            },error => {
                const errorMessages = [];
                for (const fieldName in error.error.errors) {
                  if (error.error.errors.hasOwnProperty(fieldName)) {
                    const fieldErrors = error.error.errors[fieldName];
                    for (const fieldError of fieldErrors) {
                      errorMessages.push(fieldError);
                    }
                  }
                }
                alert(errorMessages)
            })
        }
	}
    cancel_subject() {
        this.form1.reset();
		this.is_edit=false;
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
		

        this.mentality_inquiriesDataService.aClickedEvent
			.subscribe((data: string) => {	
                this.is_edit=true;		
                this.id = String(this.mentality_inquiriesDataService.id);
                this.problem_type = this.mentality_inquiriesDataService.problem_type;
                this.answer = this.mentality_inquiriesDataService.answer;
                this.ntoes = this.mentality_inquiriesDataService.ntoes;

			
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
}
