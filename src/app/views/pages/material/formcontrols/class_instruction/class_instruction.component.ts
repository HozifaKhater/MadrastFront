import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { instructionsDataService } from '../../../../../Services/instructionsDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { instructions,instructionsMaster} from '../../../../../instructionsMaster.Model';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { Levels, LevelsMaster } from '../../../../../LevelsMaster.Model';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';
import { Classes, ClassesMaster } from '../../../../../ClassesMaster.Model';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ' ;
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlatformLocation } from '@angular/common';

@Component({
    selector: 'kt-class_instruction',
    templateUrl: './class_instruction.component.html',
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
export class class_instructionComponent implements OnInit {
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
    selectedlevel:any;
	selectedclass:any;

	selecteddepartment: any;
	departments: Departments[];
    instructions: instructions[];
    favoriteSeason: string;
    
	state: string = '';
	selectedState: string = '';

	labelPosition: string = 'before';
	dep_name: any;
	dep_desc: any;
	is_edit:boolean=false;
	changeLablesPositions() {
		this.labelPosition = this.labelPosition === 'before' ? 'after' : 'before';
	}

    form1: FormGroup;
	constructor(
		private modalService: NgbModal,
		private cdRef: ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,
        private LevelsDataService: LevelsDataService,
        private ClassesDataService: ClassesDataService,
        private DepartmentService: DepartmentDataService, 
		private instructionsDataService: instructionsDataService) {

			this.DepartmentService.GetAlldepartment()
			.subscribe(data => this.departments = data,
			error => console.log());

			this.form1 = this._fb.group({
				selected_level: ['', [Validators.required]],
				selected_class: ['', [Validators.required]],
				topic: ['', [Validators.required]],
				notes:[''],
				ser:[''],
			});
	}

    level: Levels[];
    class: Classes[];

    add_activity() {

		var val = {
            level_name: this.selectedlevel.lev_name,
            level_id:Number(this.selectedlevel.lev_id),
            class_name: this.selectedclass.class_name,
            class_id:  Number(this.selectedclass.class_id),
            topic: this.topic,
            group_number: 0,
            sessions_number:0,
            notes: this.notes,
            type_name:'ارشاد صفى',
			type_id:50
		};

        this.instructionsDataService.addinstructions(val).subscribe(res => {
			alert("Saved Successfuly");
            this.instructionsDataService.BClicked("");
            this.form1.reset();
			this.myControllev.reset();
			this.myControlclass.reset();
			this.myControlstudent.reset();

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
			}
		)
	}
	
	update_department() {
	
		var val = {
            ser:Number(this.instructionsDataService.ser),
            level_name: this.selectedlevel.lev_name,
            level_id:Number(this.selectedlevel.lev_id),
            class_name: this.selectedclass.class_name,
            class_id:  Number(this.selectedclass.class_id),
            topic: this.topic,
            group_number: 0,
            sessions_number:0,
            notes: this.notes,
            type_name:'ارشاد صفى',
			type_id:50
		};

		this.instructionsDataService.updateinstructions(val).subscribe(res => {
			alert("Update Successully");
			this.is_edit=false;
            this.instructionsDataService.BClicked("");
            this.form1.reset();
			this.myControllev.reset();
			this.myControlclass.reset();
			this.myControlstudent.reset();
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
			}
		)

	}
	cancel_department() {
		this.is_edit=false;
		this.myControllev.reset();
		this.myControlclass.reset()
		this.myControlstudent.reset()
        this.form1.reset();
	}
    
	myControllev = new FormControl('');
	myControlclass = new FormControl('');
	myControlstudent = new FormControl('');

	filteredOptionslev: Observable<any[]>;
	private _filterlev(value: string) {
		const filterValue = value.toLowerCase();
		return this.level.filter(option => option.lev_name.toLowerCase().includes(filterValue));
	}
	displayFnlev(selectedoption) {
		return selectedoption ? selectedoption.lev_name : undefined;
	}

	filteredOptionsclass: Observable<any[]>;
	private _filterclass(value: string) {
		const filterValue = value.toLowerCase();
		return this.class.filter(option => option.class_name.toLowerCase().includes(filterValue));
	}
	displayFnclass(selectedoption) {
		return selectedoption ? selectedoption.class_name : undefined;
	}



 	change_level(event) {
		if(event !== null && event !== undefined && event.length !== 0){

			this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
				error => console.log(),
				() => {
					var selected_class_status = String(this.instructionsDataService.class_id);
					this.selectedclass = this.class[this.class.findIndex(function (el) {
						
						return String(el.class_id) == selected_class_status;
					})];
					this.filteredOptionsclass = this.myControlclass.valueChanges
						.pipe(
							startWith(''),
							map(value => value? typeof value === 'string' ? value : value.class_name : ''),
							map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
						);
				});
				
		}
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

        this.LevelsDataService.GetAllLevels().subscribe(data => this.level = data,
			error => console.log(),
			() => {
				this.filteredOptionslev = this.myControllev.valueChanges
					.pipe(
						startWith(''),
						map(value => value? typeof value === 'string' ? value : value.lev_name : ''),
						map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
					);
			});

		
		this.instructionsDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;

                this.ser = String(this.instructionsDataService.ser);
                this.topic = this.instructionsDataService.topic;
                this.group_number = this.instructionsDataService.group_number;
                this.sessions_number = this.instructionsDataService.sessions_number;
                this.notes = this.instructionsDataService.notes;

                var selected_level_status = String(this.instructionsDataService.level_id);
                this.selectedlevel = this.level[this.level.findIndex(function (el) {
					
                    return String(el.lev_id) == selected_level_status;
                })];

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
			
	}

	changeState() {
		this.state = this.selectedState;
	}

	display = "";
	openModal(content: any, event: any) {

		this.modalService.open(content, { backdrop: true, size: "xl", });
	}
	openModal1() {
		this.display = "show";
		console.log("clicked")
		this.cdRef.detectChanges();
	}
	onCloseHandled() {
		this.display = "";
	}

}
