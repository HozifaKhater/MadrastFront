import { Component,ChangeDetectorRef, OnInit, ElementRef, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MasterJobsDataService } from '../../../../../Services/MasterJobsDataService';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-formfield',
	templateUrl: './formfield.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-container {
		display: flex;
		flex-direction: column;
	  }
	  .example-container > * {
		width: 100%;
	  }

	  .example-container form {
	  	margin-bottom: 20px;
  	  }
  	  .example-container form > * {
	    margin: 5px 0;
      }
  	  .example-container .mat-radio-button {
	    margin: 0 5px;
	  }
	  .example-right-align {
		text-align: right;
	  }
	  input.example-right-align::-webkit-outer-spin-button,
	  input.example-right-align::-webkit-inner-spin-button {
		display: none;
	  }
	  input.example-right-align {
		-moz-appearance: textfield;
	  }
	`]
})
export class FormfieldComponent implements OnInit {
	@Input() jobs_data: any;
	job_id: number;
	job_name: string = "";

	job_desc: string = "";
	in_class_priv: string = "";
	dep_work: string = "";

	options: FormGroup;
	options2: FormGroup;
    foods = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];
    typesOfShoes = ['صلاحيه1', 'صلاحيه2', 'صلاحيه3', 'صلاحيه4', 'صلاحيه5'];
	email = new FormControl('', [Validators.required, Validators.email]);
	hide = true;

	getErrorMessage() {
		return this.email.hasError('required') ? 'You must enter a value' :
			this.email.hasError('email') ? 'Not a valid email' :
				'';
	}
	privs: Array<any>=[];
	privs_edit: Array<any>=[];
	checked: any;
    newArray: Array<any> = [];
    form1: FormGroup;
	constructor(
		private cdRef: ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
		private modalService: NgbModal,
		fb: FormBuilder, public _fb: FormBuilder,private MasterJobsDataService: MasterJobsDataService) {
		this.butdisableclass = 0;
		this.butdisablework = 0;
		this.options = fb.group({
			hideRequired: false,
			floatLabel: 'auto',
        });
        this.form1 = this._fb.group({
            job_id: [{ value: '', disabled: true }],
            job_name: ['', [Validators.required]]
        });

		this.options2 = fb.group({
			// tslint:disable-next-line:object-literal-key-quotes
			'color': 'primary',
			// tslint:disable-next-line:object-literal-key-quotes
			'fontSize': [16, Validators.min(10)],
		});
		this.MasterJobsDataService.GetAllprivs().subscribe(data => this.privs = data,
			error => console.log(),
			() => {
			
				for (var i = 0; i < this.privs.length; i++) {

					var ismatch = false; // we haven't found it yet

					for (var j = 0; j < this.privs_edit.length; j++) {

						if (this.privs[i].menu_id == this.privs_edit[j].menu_id) {
							// we have found this.officeLIST[i]] in this.office, so we can stop searching
							ismatch = true;
							this.privs[i].checked = true;//  checkbox status true
							this.newArray.push(this.privs[i]);
							break;
						}//End if
						// if we never find this.officeLIST[i].office_id in this.office, the for loop will simply end,
						// and ismatch will remain false
					}
					// add this.officeLIST[i] to newArray only if we didn't find a match.
					if (!ismatch) {
						this.privs[i].checked = false;//  checkbox status false
						this.newArray.push(this.privs[i]);
					} //End if
				};
			});
		/*this.checked = true;*/
		//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
		
	
	}
	openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	getFontSize() {
		return Math.max(10, this.options2.value.fontSize);
	}
	butdisableclass: number;
	butdisablework: number;
	side_jobclass_chck_change(event) {
		if(event !== null && event !== undefined && event.length !== 0){

			if (event.checked == true) {
				this.butdisableclass = 1;
			}
			if (event.checked === false) {
				this.butdisableclass = 0;
			}
		}
	}
	side_jobwork_chck_change(event) {
		if(event !== null && event !== undefined && event.length !== 0){

			if (event.checked == true) {
				this.butdisablework = 1;
			}
			if (event.checked === false) {
				this.butdisablework = 0;
			}
		}
	}
	update_jobs() {

		var val = {
			job_id: this.MasterJobsDataService.job_id,
			job_name: this.job_name,
			job_desc: this.job_desc,
			in_class_priv: Number(this.butdisableclass),
			dep_work: Number(this.butdisablework)

		};


		this.MasterJobsDataService.updatejobs(val).subscribe(res => {
			alert(res.toString());
			
			this.MasterJobsDataService.deletedetails_jobs(Number(this.MasterJobsDataService.job_id)).subscribe(res => {
				this.MasterJobsDataService.adddetails_job(val).subscribe(res => {
					this.returned_job_id = res.toString();
					 
					if(this.checkbox_array !== undefined){
						
						for (let i = 0; i < this.checkbox_array.length; i++) {
							var val2 = {
								job_id: Number(this.MasterJobsDataService.job_id),
								priv_name: this.checkbox_array[i],
								page_name: this.checkbox_array[i],
								priv_def_id: Number(this.checkbox_array[i]),
								in_class_priv: Number(this.butdisableclass),
								dep_work: Number(this.butdisablework)
							}
							this.MasterJobsDataService.adddetails_job(val2).subscribe()
						
						}
					}

                })
            })
            this.form1.reset();
            this.MasterJobsDataService.BClicked("");
            

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
  
	returned_job_id: any;
	checkbox_array: any;
	add_jobs() {
		
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {

                job_name: this.job_name,
                job_desc: this.job_desc,
                in_class_priv: Number(this.butdisableclass),
                dep_work: Number(this.butdisablework)
            };
            this.MasterJobsDataService.addjobs(val).subscribe(res => {
                this.returned_job_id = res.toString(); 
				
				if(this.checkbox_array !== undefined){

						for (let i = 0; i < this.checkbox_array.length; i++) {
							var val2 = {
								job_id: Number(this.returned_job_id),
								priv_name: this.checkbox_array[i],
								page_name: this.checkbox_array[i],
								priv_def_id: Number(this.checkbox_array[i]),
								in_class_priv: Number(this.butdisableclass),
								dep_work: Number(this.butdisablework)
							}
							this.MasterJobsDataService.adddetails_job(val2).subscribe()
					
						}
					
				}

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
            
          
            alert("Saved Successfuly");
            this.MasterJobsDataService.BClicked("");
            this.form1.reset();
        }
	}
	initModelForm(): FormGroup {
		return this._fb.group({
			otherControls: [''],
			// The formArray, empty 
			myChoices: new FormArray([]),
		})
	}
	myForm: FormGroup = this.initModelForm();
	onCheckChange(event) {
		if(event !== null && event !== undefined && event.length !== 0){

			const formArray: FormArray = this.myForm.get('myChoices') as FormArray;
			if (event.target.checked) {
				formArray.push(new FormControl(event.target.value));
			}
		
			else {
			
				let i: number = 0;

				formArray.controls.forEach((ctrl: FormControl) => {
					if (ctrl.value == event.target.value) {
						// Remove the unselected element from the arrayForm
						formArray.removeAt(i);
						return;
					}

					i++;
				});
			}
			this.checkbox_array = formArray.value;
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
		
		

		

		this.MasterJobsDataService.aClickedEvent
			.subscribe((data: string) => {
			
				
				this.job_id = Number(this.MasterJobsDataService.job_id);
				this.job_name = this.MasterJobsDataService.job_name;
				this.job_desc = this.MasterJobsDataService.job_desc;
				this.in_class_priv = this.MasterJobsDataService.in_class_priv;
				this.dep_work = this.MasterJobsDataService.dep_work;
				/*	document.getElementById("save_btn").innerHTML="asdasd"*/
				this.MasterJobsDataService.GetAllprivs_with_job_id(Number(this.MasterJobsDataService.job_id)).subscribe(data => this.privs_edit = data,
					error => console.log());

				this.MasterJobsDataService.GetAllprivs().subscribe(data => this.privs = data,
					error => console.log(),
					() => {
                        this.newArray = [];
						for (var i = 0; i < this.privs.length; i++) {

							var ismatch = false; // we haven't found it yet
                           
							for (var j = 0; j < this.privs_edit.length; j++) {
							
								if (this.privs[i].menu_id == this.privs_edit[j].menu_id) {
									// we have found this.officeLIST[i]] in this.office, so we can stop searching
									ismatch = true;

									this.privs[i].checked = true;//  checkbox status true
									this.newArray.push(this.privs[i]);
									break;
								}//End if
								// if we never find this.officeLIST[i].office_id in this.office, the for loop will simply end,
								// and ismatch will remain false
							}
							// add this.officeLIST[i] to newArray only if we didn't find a match.
							if (!ismatch) {
								this.privs[i].checked = false;//  checkbox status false
								this.newArray.push(this.privs[i]);
							} //End if
						};
					});

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
	
	}
}
