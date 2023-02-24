import { Component, ChangeDetectorRef,OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DelaysDataService } from '../../../../../Services/DelaysDataService';
import { Employee } from '../../../../../EmployeeMaster.Model';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { Observable } from 'rxjs-compat';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-button-toggle',
	templateUrl: './button-toggle.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-selected-value {
		margin: 15px 0;
	  }
	`]
})
export class ButtonToggleComponent implements OnInit {
	@Input() delay_data: any;
	delay_id: number;
	delay_date: string = "";

	delay_emp_name: string = "";
	time_attend: string = "";
	delay_state: number;
	delay_emp_id: number;
	Employees: Employee[];
	employeedepartment: any;
	exampleBasic;
	exampleVertical;
	exampleList;

	myControlEmp = new FormControl('');

	form1: FormGroup;
	constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,
		private EmployeeService: EmployeeDataService,
		private DelaysDataService: DelaysDataService) {
			
			this.form1 = this._fb.group({
				delay_date: ['', [Validators.required]],
				time_attend: ['', [Validators.required]],

			});

			this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees = data,
				error => console.log());
		
	}
	openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	add_delay() {

		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

		var val = {

			delay_date: this.delay_date,
			delay_emp_name: String(this.employeedepartment.emp_name),
			time_attend: this.time_attend,
			delay_state: this.delay_state,
			delay_emp_id: Number(this.employeedepartment.emp_id)
		};

		this.DelaysDataService.addDelays(val).subscribe(res => {
			alert(res.toString());
			this.DelaysDataService.BClicked("b2");

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

	update_delay() {

		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

		var val = {
			delay_id: this.delay_id,
			delay_date: this.delay_date,
			delay_emp_name: String(this.employeedepartment.emp_name),
			time_attend: this.time_attend,
			delay_state: this.delay_state,
			delay_emp_id: Number(this.employeedepartment.emp_id)
		};

		this.DelaysDataService.updateDelays(val).subscribe(res => {
			alert(res.toString());
			this.DelaysDataService.BClicked("b2");
			
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
	cancel_delay() {
		this.form1.reset();
	}

	filteredOptionsEmp: Observable<any[]>;

    private _filterEmp(value: string) {
        const filterValue = value.toLowerCase();
        return this.Employees.filter(option => option.emp_name.toLowerCase().includes(filterValue));
    }

    displayFnEmp(selectedoption) {
        return selectedoption ? selectedoption.emp_name : undefined;
    }

	EmpVar:any=[];
    anotherEmpArray:Employee[]=[];

	priv_info:any=[];
	read:any;
	write:any;
	read_and_Write:any;
	is_edit:boolean=false;
	async ngOnInit() {
		try {
			const priv_info = await this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).toPromise();
			this.priv_info = priv_info;
			if (this.priv_info.length > 0) {
			  this.read = this.priv_info[0].read;
			  this.write = 1;
			  this.read_and_Write = this.priv_info[0].read_and_Write;
			}
			this.cdRef.detectChanges();
		  } catch (error) {
			console.log();
		  }

		  this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees = data,
            error => console.log(), 
            () => {
                this.filteredOptionsEmp = this.myControlEmp.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => value ? typeof value === 'string' ? value : value.lev_name : ''),
                        map(lev_name => lev_name ? this._filterEmp(lev_name) : this.Employees.slice())
                    );
            });

        

		this.DelaysDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.delay_id = Number(this.DelaysDataService.delay_id);
				this.delay_date = this.DelaysDataService.delay_date;
				this.delay_emp_name = this.DelaysDataService.delay_emp_name;
				this.time_attend = this.DelaysDataService.time_attend;
				this.delay_state = Number(this.DelaysDataService.delay_state);
				this.delay_emp_id = Number(this.DelaysDataService.delay_emp_id);

				this.EmployeeService.GetAllEmployee_with_id(this.DelaysDataService.delay_emp_id)
                .subscribe(data => this.anotherEmpArray = data,
                    error => console.log(),
                    () => {
                        // Get Employee Object 
                        var id = this.DelaysDataService.delay_emp_id;
                        this.EmpVar = this.anotherEmpArray[this.anotherEmpArray.findIndex(function (el) {
                
                            return el.emp_id == id.toString();
                        })];
                        
                        this.employeedepartment = this.EmpVar;
					});
                        

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }
			});
				
	}

}


