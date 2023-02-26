import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivityDataService } from '../../../../../Services/ActivityDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { ActivityMaster, activity } from '../../../../../ActivityMaster.Model';
import { financial__fund_expenses,financial__fund_expensesMaster } from '../../../../../financial__fund_expenses.Model';
import { financial__fund_expensesDataService } from '../../../../../Services/financial__fund_expensesDataService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'kt-financial__fund_expenses',
    templateUrl: './financial__fund_expenses.component.html',
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
export class financial__fund_expensesComponent implements OnInit {
	
	
	public id: number;
    public type_name: string="";
    public date: string = "";
    public price: string = "";
    public notes: string;

	is_edit:boolean=false;
    form1: FormGroup;
    constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,
		private financial__fund_expensesDataService: financial__fund_expensesDataService,
		) {
			this.form1 = this._fb.group({
		
			});

    }
 
	openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	add_activity() {
		
		var val = {
            type_name: this.type_name,
            date: this.date,
            price: this.price,
            notes: this.notes,
		};

		this.financial__fund_expensesDataService.addfinancial__fund_expenses(val).subscribe(res => {
            alert("Saved Successfuly");
            this.financial__fund_expensesDataService.BClicked("");
            this.form1.reset();

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

	activity: activity[];
	update_department() {
	
		var val = {
            id: this.id,
            type_name: this.type_name,
            date: this.date,
            price: this.price,
            notes: this.notes,

		};

		this.financial__fund_expensesDataService.updatefinancial__fund_expenses(val).subscribe(res => {
            alert(res.toString());
            this.financial__fund_expensesDataService.BClicked("");
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
   

	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});
		

		this.financial__fund_expensesDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
                this.id = this.financial__fund_expensesDataService.id;
                this.type_name = this.financial__fund_expensesDataService.type_name;
                this.date = this.financial__fund_expensesDataService.date;
                this.price = this.financial__fund_expensesDataService.price;
                this.notes = this.financial__fund_expensesDataService.notes;


				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
	}

	
}
