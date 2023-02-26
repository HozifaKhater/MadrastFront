import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { default as _rollupMoment } from 'moment';
import { SubjectDataService } from '../../../../../Services/SubjectDataService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { SideDepartmentMaster,Departments } from '../../../../../DepartmentMaster.Model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'kt-datepicker',
	templateUrl: './datepicker.component.html',
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
export class DatepickerComponent implements OnInit {
	@Input() subject_data: any;
	subject_id: number;
	subject_name: string;
	subject_desc: string = "";

	startDate = new Date(1990, 0, 1);
	date = new FormControl(new Date());

	serializedDate = new FormControl((new Date()).toISOString());
	minDate = new Date(2011, 0, 1);
	maxDate = new Date(2018, 11, 1);
	is_edit:boolean=false;
    events: string[] = [];
    form1: FormGroup;
	departments: Departments[];
    side_departments: SideDepartmentMaster[];
	selecteddepartment:any =[];
	selectedsidedepartment:any=[];

	myControlSideDept = new FormControl('');

    constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private DepartmentService: DepartmentDataService,
		private router: Router, private user_privDataService: user_privDataService,
		private SubjectService: SubjectDataService, public _fb: FormBuilder) {
			this.form1 = this._fb.group({
				subject_id: [''],
				subject_name: ['', [Validators.required]],
				selecteddepartment: ['', [Validators.required]]
			
			});
			this.DepartmentService.GetAllMasterdepartment()
			.subscribe(data => this.departments = data,
				error => console.log());
	}
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	filteredOptionsDept: Observable<any[]>;

    private _filterDept(value: string) {
        const filterValue = value.toLowerCase();
        return this.side_departments.filter(option => option.dep_name.toLowerCase().includes(filterValue));
    }

    displayFnlev(selectedoption) {
        return selectedoption ? selectedoption.dep_name : undefined;
    }

	get_side_dep(event) {
		if(event !== null && event !== undefined && event.length !== 0){
			this.DepartmentService.get_department_def_with_master_id(event.dep_id)
			.subscribe(data => this.side_departments = data,
			error => console.log(),
				() => {
					this.filteredOptionsDept = this.myControlSideDept.valueChanges
						.pipe(
							startWith(''),
							map(value => value? typeof value === 'string' ? value : value.dep_name : ''),
							map(dep_name => dep_name ? this._filterDept(dep_name) : this.side_departments.slice())
						);
				});
		}
	}

	side_dep_chck_change(event) {
		
		if (event.checked == true) {
			this.butDisabled = false;
		}
		if (event.checked === false) {
			this.butDisabled = true;
		}
	}


	dep_name:any;
	dep_id:any;
	parent_id:any

	add_subject() {
		
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
			if (this.butDisabled == true) {
				this.dep_id = Number(this.selecteddepartment.dep_id);
				this.dep_name =this.selecteddepartment.dep_name;
				this.parent_id=0
			}
			 if (this.butDisabled == false)
			{
				 this.dep_id = Number(this.selectedsidedepartment.dep_id);
				 this.dep_name = this.selectedsidedepartment.dep_name;
				 this.parent_id=Number(this.selecteddepartment.dep_id);
			};
            var val = {

                subject_name: this.subject_name,
                subject_desc: this.subject_desc,
				dep_id: this.dep_id,
                dep_name: this.dep_name,
				parent_id:this.parent_id

            };

			this.SubjectService.addSubject(val).subscribe(res => {
                alert(res.toString());
                this.SubjectService.BClicked("")
            },error => {console.log();
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
			if (this.butDisabled == true) {
				this.dep_id = Number(this.selecteddepartment.dep_id);
				this.dep_name = Number(this.selecteddepartment.dep_name);
				this.parent_id=0
			}
			 if (this.butDisabled == false)
			{
				 this.dep_id = Number(this.selectedsidedepartment.dep_id);
				 this.dep_name = Number(this.selectedsidedepartment.dep_name);
				 this.parent_id=Number(this.selecteddepartment.dep_id);
			};
            var val = {
                subject_id: this.SubjectService.subject_id,
                subject_name: this.subject_name,
                subject_desc: this.subject_desc,
				dep_id: this.dep_id,
                dep_name: this.dep_name,
				parent_id:this.parent_id
            };

            this.SubjectService.updateSubject(val).subscribe(res => {
                alert(res.toString());
                this.SubjectService.BClicked("");
                this.form1.reset();
				this.is_edit=false;
            },error => {console.log();
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
	}


	sideValue: string="";
	anotherideDept: Departments[];
	priv_info:any=[];
	dep_check: any;

	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			}); 

		this.butDisabled = true;

	
		
		this.SubjectService.aClickedEvent
			.subscribe((data: string) => {
			    this.is_edit=true;
				this.subject_id = this.SubjectService.subject_id;
				this.subject_name = this.SubjectService.subject_name;
				this.subject_desc = this.SubjectService.subject_desc;
				this.dep_check = false;

				if (Number(this.SubjectService.parent_id) == 0) {
					this.dep_check = false;
					var selected_value = this.SubjectService.parent_id
					this.selecteddepartment = this.departments[this.departments.findIndex(function (el) {
						return el.dep_id == selected_value
					})]
                  
                }
				else if (Number(this.SubjectService.parent_id) != 0) {
					this.dep_check = true;
					var selected_value = this.SubjectService.parent_id
					this.selecteddepartment = this.departments[this.departments.findIndex(function (el) {
						return el.dep_id == selected_value
					})]

					this.DepartmentService.get_department_def_with_master_id(this.SubjectService.parent_id)
					.subscribe(data => this.anotherideDept = data,
						error => console.log(),
						() => {
							var selected_dep_id = this.SubjectService.dep_id;

							this.selectedsidedepartment = this.anotherideDept[this.anotherideDept.findIndex(function (el) {
								return el.dep_id == String(selected_dep_id)
							})]

							this.sideValue = this.selectedsidedepartment.dep_name;
					});
					
					this.butDisabled = false    
                }

				// open modal
				var ele = document.getElementById('modalOpenersubject');
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
