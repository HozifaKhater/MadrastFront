import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { Employee, EmployeeMaster } from '../../../../../EmployeeMaster.Model';
import { EzonDataService } from '../../../../../Services/EzonDataService';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { ezon, EzonMaster } from '../../../../../EzonMaster.Model';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { SignalrService } from '../../../../../Services/notificationDataService';
import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'kt-gridentry-list',
	templateUrl: './grid-list-entry.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	mat-grid-tile {
		background: lightblue;
	  }
	`]
})

export class GridListEntryComponent implements OnInit {
	
@ViewChild('content', { static: true }) modalContent: TemplateRef<any>;
	time = { hour: 13, minute: 30 };
	meridian = true;
	time_from: string;
	time_to: string;
	selecteddepartment: any=[];
	selectedemployee: any=[];
	ezn_date: string="";
	ezn_reason: string;
	
    selectedEmp: any=[];

	ezon: ezon[];

	employees: Employee[];

	departments: Departments[];
	departmentemp(event) {
		
		
	}
    Employee: Employee[];
	emp_info_prem:Employee[];
    form1: FormGroup;
	public read:any = 0;
	decoded:any;
    constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,private EmployeeDataService: EmployeeDataService,
		private DepartmentDataService: DepartmentDataService,
		private EzonDataService: EzonDataService, private datePipe: DatePipe) {
        
			this.form1 = this._fb.group({
            	ezn_date: [[Validators.required]],
          
        	});
			const userToken = localStorage.getItem(environment.authTokenKey);
			this.decoded = jwt_decode(userToken);
				
			this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id)
			.subscribe((data) =>{ 
					this.emp_info_prem = data;
					if( (this.emp_info_prem[0].emp_pos_id == '37') || (this.emp_info_prem[0].emp_pos_id == '38') || (this.emp_info_prem[0].emp_pos_id == '41'))
					{
					this.read=0
					}
					else
					{
					this.read=1
					}
				},
					error => console.log());
		};

		
	emp_id_prem:any;

	add_ezon() {
		if  (this.read===0) {
			this.emp_id_prem=this.decoded.id;
		}
		else{
			this.emp_id_prem=this.selectedEmp.emp_id;
		}

        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {

                emp_id: this.emp_id_prem,
                ezn_date: this.ezn_date,
                ezn_reason: this.ezn_reason,
                time_from: this.time_from,
                time_to: this.time_to,
				route: this.router.url as string,
            };

            this.EzonDataService.addEzon(val).subscribe(res => {
                this.form1.reset();
                alert("Saved Successfully");
                this.EzonDataService.BClicked("test")
            })
        }
	}
	transformDate(date) {
		var dateToDBthis;
		return dateToDBthis.datePipe.transform(date, 'yyyy-MM-dd');
	}
	update_ezon() {
		if  (this.read=0) {
			this.emp_id_prem=this.decoded.id;
		}
		else{
			this.emp_id_prem=this.selectedEmp.emp_id;
		}
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {

            var val = {
                ezn_id: this.EzonDataService.ezn_id,
                emp_id: this.emp_id_prem,
                ezn_date: this.ezn_date,
                ezn_reason: this.ezn_reason,
                time_from: this.time_from,
                time_to: this.time_to,
				route: this.router.url as string
            };



            this.EzonDataService.updateEzon(val).subscribe(res => {
                alert("Updated Successfully");
                this.EzonDataService.BClicked("test");
                this.form1.reset();
                this.is_edit=false;
            })
        }
	}
    cancel_ezon() {
		this.modalService.dismissAll();
        this.form1.reset();
		this.is_edit=false;
	}

	dept: Departments[]=[];
    selectedlevel: any=[];

    emps: Employee[]=[];
    selectedclass: any=[];

    myControlEmp = new FormControl('');
    myControlDept = new FormControl('');

	filteredOptionsDep: Observable<any[]>;

    private _filterDept(value: string) {
        const filterValue = value.toLowerCase();
        return this.dept.filter(option => option.dep_name.toLowerCase().includes(filterValue));
    }

    displayFnDep(selectedoption) {
        return selectedoption ? selectedoption.dep_name : undefined;
    }


    filteredOptionsEmp: Observable<any[]>;

    private _filterEmps(value: string) {
        const filterValue = value.toLowerCase();
        return this.emps.filter(option => option.emp_name.toLowerCase().includes(filterValue));
    }

    displayFnEmp(selectedoption) {
        return selectedoption ? selectedoption.emp_name : undefined;
    }

	change_dept(event) {
		
        if(event !== null && event !== undefined && event.length !== 0){
			this.EmployeeDataService.GetAllEmployee_of_department(event.dep_id)
			.subscribe(data => this.emps = data,
				error => console.log(),
				() => {
					this.filteredOptionsEmp = this.myControlEmp.valueChanges
						.pipe(
							startWith(''),
							map(value => typeof value === 'string' ? value : value.emp_name),
							map(emp_name => emp_name ? this._filterEmps(emp_name) : this.emps.slice())
						);
				});
		}
        
    }

    change_Emp(event) {
		
    }



anotherDeptArray: any=[];
anotherEmployeeArray: any = [];
deptVar:any=[];
deptValue: any;
empValue: any;
	emp_info: any[];
	emp_id_for_dep: any;
	priv_info:any=[];
	is_edit:boolean=false;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(),
			() => {
				this.cdRef.detectChanges();

			}); 

			this.DepartmentDataService.GetAllMasterdepartment()
			.subscribe(data => this.dept = data,
				error => console.log(), 
				() => {

					this.filteredOptionsDep = this.myControlDept.valueChanges
						.pipe(
							startWith(''),
							map(value => value? typeof value === 'string' ? value : value.dep_name : ''),
							map(dep_name => dep_name ? this._filterDept(dep_name) : this.dept.slice())
						);
			});
		
		
		this.EzonDataService.aClickedEvent
			.subscribe((data: string) => {
			//	debugger
			this.is_edit=true;
				this.openModal(this.modalContent,"event");
				this.time_from = this.EzonDataService.time_from;
				this.time_to = this.EzonDataService.time_to;
				this.time_from = this.EzonDataService.time_from;
				this.ezn_date = this.EzonDataService.ezn_date;
				this.ezn_reason = this.EzonDataService.ezn_reason;
				this.emp_id_prem = this.EzonDataService.emp_id;

				this.EmployeeDataService.GetAllEmployee_with_id
				(this.decoded.id)
				.subscribe(data => this.anotherEmployeeArray = data,
				error => console.log(),
				() => {
					this.selectedEmp = this.anotherEmployeeArray[0];

					var dept_id = this.anotherEmployeeArray[0].emp_dep_id;
					
					this.DepartmentDataService.GetAlldepartment_with_id(dept_id)
					.subscribe(data => this.anotherDeptArray = data,
					error => console.log(),
					()=>{
						this.selecteddepartment = this.anotherDeptArray[0];
					});
					
										
					}
				);
				this.openModal(this.modalContent,"event");
				// open modal
				// var ele = document.getElementById('modalOpener');
				// if (ele) { ele.click() }
			
				this.cdRef.detectChanges();



			});
			
	}
	openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
}
