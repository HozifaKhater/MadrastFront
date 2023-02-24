import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { instructionsDataService } from '../../../../../Services/instructionsDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { instructions,instructionsMaster} from '../../../../../instructionsMaster.Model';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'kt-group_instruction',
    templateUrl: './group_instruction.component.html',
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
export class group_instructioncomponentComponent implements OnInit {
	@Input() activity_data: any;
    ser: string = "";
    level_name: string = "";
    level_id: string = "";
    class_name: string = "";
    class_id: string = "";
    topic: string = "";
    group_number: string = "";
    sessions_number: string = "";
    notes: string = "";

	selecteddepartment: any;
	departments: Departments[];
    instructions: instructions[];
    favoriteSeason: string;
	
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
		private cdRef:ChangeDetectorRef,
		private modalService: NgbModal,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,
		private DepartmentService: DepartmentDataService, 
		private instructionsDataService: instructionsDataService) {

			this.DepartmentService.GetAlldepartment().subscribe(data => this.departments = data,
			error => console.log());

			this.form1 = this._fb.group({
				group_number: ['', [Validators.required]],
				sessions_number: ['', [Validators.required]],
				notes: [''],
				topic: ['', [Validators.required]],
				
			});
	}
	
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }

	add_activity() {
		
		if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
			var val = {

				level_name: this.level_name,
				level_id: 0,
				class_name: this.class_name,
				class_id: 0,
				topic: this.topic,
				group_number: this.group_number,
				sessions_number: this.sessions_number,
				notes: this.notes,
				type_name:'ارشاد جماعى',
				type_id:49
			};

			this.instructionsDataService.addinstructions(val).subscribe(res => {
				alert("Saved Successfuly");
				this.form1.reset();
				this.instructionsDataService.BClicked("");

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
	}}
	
	update_department() {
		if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
		var val = {
            ser:Number(this.instructionsDataService.ser),
            level_name: this.level_name,
            level_id: 0,
            class_name: this.class_name,
            class_id: 0,
            topic: this.topic,
            group_number: this.group_number,
            sessions_number: this.sessions_number,
            notes: this.notes,
			type_name:'ارشاد جماعى',
			type_id:49
		};

		this.instructionsDataService.updateinstructions(val).subscribe(res => {
			alert("Updated Successfully");
			this.form1.reset();
			this.instructionsDataService.BClicked("");
			
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
	cancel_department() {
		this.form1.reset();
		
	}
	
    priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});
		

		this.instructionsDataService.aClickedEvent
			.subscribe((data: string) => {
			
                this.ser = String(this.instructionsDataService.ser);
                this.level_name = this.instructionsDataService.level_name;
                this.level_id = this.instructionsDataService.level_id;
                this.class_name = this.instructionsDataService.class_name;
                this.class_id = this.instructionsDataService.class_id;
                this.topic = this.instructionsDataService.topic;
                this.group_number = this.instructionsDataService.group_number;
                this.sessions_number = this.instructionsDataService.sessions_number;
                this.notes = this.instructionsDataService.notes;

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
			
	}

}
