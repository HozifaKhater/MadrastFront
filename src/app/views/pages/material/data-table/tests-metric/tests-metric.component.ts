import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';

import { LevelsMaster, Levels } from '../../../../../LevelsMaster.Model';
import { Excellent_studentsDataService } from '../../../../../Services/Excellent_studentsDataService';

import { Excellent_studentsMaster, Excellent_students } from '../../../../../Excellent_studentsModel.Master';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';

import { ClassesMaster, Classes } from '../../../../../ClassesMaster.Model';
import { Tests_metricMaster, Tests_metric } from '../../../../../Tests_metricMaster.Model';
import { Tests_metricDataService } from '../../../../../Services/Tests_metricDataService';
import * as def from '../../../../../definationsMaster.Model';
import { PageEvent } from '@angular/material';
import moment from 'moment';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'kt-tests_metric',
	templateUrl: './tests-metric.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestsmetricComponent implements OnInit {
	@Input() absence_data: any;
	tests_id: number;
	tests_type: string = "";
	tests_date: string = "";
	tests_stu_no: number;



	Levels: Levels[];
	selectedlevel: any;
	classes: Classes[];
	selectedclass: any;

	nat: def.nat[];

	exampleBasic;
	exampleConfig;

	length = 100;
	pageSize = 10;
	pageSizeOptions = [5, 10, 25, 100];

	// MatPaginator Output
	pageEvent: PageEvent;

	form1: FormGroup;
	constructor(private modalService: NgbModal,
		private cdRef: ChangeDetectorRef, 
		private router: Router, private user_privDataService: user_privDataService,
		private Tests_metricDataService: Tests_metricDataService,
		public _fb: FormBuilder) {

			this.form1 = this._fb.group({
				tests_type: ['', [Validators.required]],
				tests_stu_no: ['', [Validators.required]],
				tests_date: ['', [Validators.required]]
			
			});
	}

	add_tests() {
		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else { 
			var val = {
				tests_type: this.tests_type,
				tests_date: this.tests_date,
				tests_stu_no: this.tests_stu_no
			};

			this.Tests_metricDataService.addTests_metric(val).subscribe(res => {
				alert(res.toString());
				this.Tests_metricDataService.BClicked("b2");
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
	
	update_tests() {

		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {
			var val = {
				tests_id: this.tests_id,
				tests_type: this.tests_type,
				tests_date: this.tests_date,
				tests_stu_no: this.tests_stu_no
			};

			this.Tests_metricDataService.updateTests_metric(val).subscribe(res => {
				alert("Updated Successfully");
				this.Tests_metricDataService.BClicked("b2");
				this.form1.reset();
				
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
	
	
	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			}); 	
		

		this.Tests_metricDataService.aClickedEvent
			.subscribe((data: string) => {

				this.tests_id = Number(this.Tests_metricDataService.tests_id);
				this.tests_type = this.Tests_metricDataService.tests_type;
				this.tests_date = this.Tests_metricDataService.tests_date;
				this.tests_stu_no = this.Tests_metricDataService.tests_stu_no;


				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
		
	

	}

	setPageSizeOptions(setPageSizeOptionsInput: string) {
		this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
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
