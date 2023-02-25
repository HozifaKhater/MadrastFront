import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { new_workDataService } from '../../../../../Services/new_workDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { new_work,new_workMaster } from '../../../../../new_workMaster.Model';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';

@Component({
    selector: 'kt-new_work',
    templateUrl: './new_work.component.html',
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
export class new_workComponent implements OnInit {
	@Input() nework_data: any;
	ser: string = "";
	new_work: string = "";
	dep_id: string = "";
    date: any;
	

	form1: FormGroup;
  
	dep_desc: any;

 
    constructor(
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,
		private DepartmentService: DepartmentDataService, 
		private new_workDataService: new_workDataService, 
		) {
			this.form1 = this._fb.group({
			
			});
  
	}

	add_nework() {
			var val = {
				new_work_var: this.new_work,
				date:this.date

			};
			this.new_workDataService.addnew_work(val).subscribe(res => {
				alert("Saved Successfuly");
				this.new_workDataService.BClicked("b2");
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

	update_nework() {

		var val = {
			ser: Number(this.new_workDataService.ser),
			new_work_var: this.new_work,
			date:this.date
		};

        this.new_workDataService.updatenew_work(val).subscribe(res => {
			alert(res.toString());
			this.new_workDataService.BClicked("b2");
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
	cancel_nework() {
		this.is_edit=false;
	}

	priv_info:any=[];
	
is_edit:boolean=false;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();

			}); 
		
		this.new_workDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.new_work = this.new_workDataService.new_work_var;
				this.date = this.new_workDataService.date;
		

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});

	}

}
