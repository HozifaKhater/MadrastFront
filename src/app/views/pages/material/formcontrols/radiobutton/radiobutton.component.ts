import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ActivityDataService } from '../../../../../Services/ActivityDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { ActivityMaster, activity } from '../../../../../ActivityMaster.Model';
import { School_year_data, School_year_dataMaster } from '../../../../../School_year_dataMaster.Model';
import { School_year_dataDataService } from '../../../../../Services/School_year_dataDataService';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import moment from 'moment';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { DefinitionDataService } from '../../../../../Services/Definition';
import { Definition } from '../../../../../Definitions.Model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlatformLocation } from '@angular/common';
@Component({
    selector: 'kt-radiobutton',
    templateUrl: './radiobutton.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
	mat-radio-button {
		padding-right: 16px;
	}
	.example-radio-group {
		display: inline-flex;
		flex-direction: column;
	  } 
	  .example-radio-button {
		margin: 15px;
	  }
	.example-selected-value {
		margin: 15px 0;
	}
	`]
})
export class RadiobuttonComponent implements OnInit {
    @Input() activity_data: any;
    activity_id: string = "";
    activity_name: string = "";
    activity_dep: string = "";
    activity_level: any;
    activity_date: any = new Date();

    activity_school_term: any;
    activity_notes: string = "";
    dep_id: string = "";
    year_data: School_year_data[];
    selecteddepartment: any;
    activity_school_year: any;
   

    departments: Departments[];
    activities: ActivityMaster[];
    favoriteSeason: string;
    
    semesters = [
        { value: '1', viewValue: 'الأول' },
        { value: '2', viewValue: 'الثاني' }
    ];

    scodes: Definition[];
    selectedCode: any;
    selectedActivityLevel: any;
    activityvalue: string;

    state: string = '';
    selectedState: string = '';

    labelPosition: string = 'before';
    dep_name: any;
    dep_desc: any;

    changeLablesPositions() {
        this.labelPosition = this.labelPosition === 'before' ? 'after' : 'before';
    }
    
    form1: FormGroup;
    constructor(
        private location: PlatformLocation,
        private modalService: NgbModal,
        private cdRef:ChangeDetectorRef,public _fb: FormBuilder,
        private router: Router, private user_privDataService: user_privDataService,
        private DefinitionService: DefinitionDataService,
        private DepartmentService: DepartmentDataService,
        private ActivityService: ActivityDataService,

        private School_year_dataDataService: School_year_dataDataService) {

            this.form1 = this._fb.group({
            activity_id: [{ value: '', disabled: true }],
            activity_name: ['', [Validators.required]],
            selecteddepartment: ['', [Validators.required]],
            activity_school_year: ['', [Validators.required]],
            activity_school_term: ['', [Validators.required]]
            });

            this.DepartmentService.GetAlldepartment()
            .subscribe(data => this.departments = data,
                error => console.log());

            this.School_year_dataDataService.get_school_year_data_for_dropdown()
            .subscribe(data => this.year_data = data,
                error => console.log());

            this.DefinitionService.Getdefinations_with_scode('activity_level')
            .subscribe(data => this.scodes = data,
                error => console.log());
    }

    add_activity() {
        
        if (this.form1.invalid) {

            this.form1.markAllAsTouched();
        } else {
            var val = {

                activity_name: this.activity_name,
                activity_dep: String(this.selecteddepartment.dep_id),
                activity_school_year: this.activity_school_year.year_data,
                activity_school_year_id: Number(this.activity_school_year.year_data_id),
                activity_level: this.activity_level.def_id,
                activity_date: this.activity_date,
                activity_school_term: this.activity_school_term.value,
                activity_notes: String(this.activity_notes)
            };

            this.ActivityService.addActivity(val).subscribe(res => {
                alert("Saved Successfuly");
                this.ActivityService.BClicked("b2");
            }, error => {
                console.log();
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

    activity: activity[];
    update_activity() {
        if (this.form1.invalid) {

            this.form1.markAllAsTouched();
        } else {
            var val = {
                activity_id: this.ActivityService.activity_id,
                activity_name: this.activity_name,
                activity_dep: String(this.selecteddepartment.dep_id),
                activity_school_year: this.activity_school_year.year_data,
                activity_school_year_id: Number(this.activity_school_year.year_data_id),
                activity_level: String(this.activity_level.def_id),
                activity_date: this.activity_date,
                activity_school_term: this.activity_school_term.value,
                activity_notes: String(this.activity_notes)
            };

            this.ActivityService.updateActivity(val).subscribe(res => {
                alert("Updated Successfully");
                this.ActivityService.BClicked("b2");
                this.is_edit=false;
                
            }, error => {
                console.log();
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

    cancel_department() {
        this.form1.reset();
       
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

        window.addEventListener('popstate', () => {
          
          });
        this.ActivityService.aClickedEvent
            .subscribe((data: string) => {
                this.is_edit=true;
                var selected_value = String(this.ActivityService.activity_dep);
                this.selecteddepartment = this.departments[this.departments.findIndex(function (el) {
                    return el.dep_id == selected_value;
                })];

                var selected_value1 = String(this.ActivityService.activity_school_year_id);
                this.activity_school_year = this.year_data[this.year_data.findIndex(function (el) {

                    return String(el.year_data_id) == selected_value1;

                })];

                var selected_value2 = String(this.ActivityService.activity_level);
                this.activity_level = this.scodes[this.scodes.findIndex(function (el) {

                    return String(el.def_id) == selected_value2;

                })];


                var selected_value3 = String(this.ActivityService.activity_school_term);
                this.activity_school_term = this.semesters[this.semesters.findIndex(function (el) {

                    return String(el.value) == selected_value3;

                })];

                this.activity_id = String(this.ActivityService.activity_id);
                this.activity_name = this.ActivityService.activity_name;
                this.activity_dep = this.ActivityService.activity_dep;
                this.activity_date = new Date(this.ActivityService.activity_date);
                this.activity_notes = this.ActivityService.activity_notes;

                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }
            });

    }

    changeState() {
        this.state = this.selectedState;
    }
    display = "";
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
    openModal1() {
        this.display = "show";
        this.cdRef.detectChanges();
    }
    onCloseHandled() {
        this.display = "";
    }
}
