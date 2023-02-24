import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Evaluation_itemsDataService } from '../../../../../Services/Evaluation_itemsDataService';
import { Evaluation_itemsMaster } from '../../../../../Evaluation_itemsMaster.Model';
import { SubjectDataService } from '../../../../../Services/SubjectDataService';
import { SubjectMaster, Subjects } from '../../../../../SubjectMaster.Model';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms'; 
import * as def from '../../../../../definationsMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'kt-menu',
	templateUrl: './menu.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [Evaluation_itemsDataService]
})
export class MenuComponent implements OnInit {
	/*attemptedQuestionCount: any;*/



	@Input() Evaluation_items_data: any;
	buttons_takem: any
	selectedobject: any;
	selectedsubject: any;
    evaluation_id: number;
    field: any;
	evaluation_object: string = "";
	evaluation_object_name: string = "";
	evaluation_subject: string = "";
	evaluation_subject_id: string = "";
	Evaluation_item_id: string = "";
	Evaluation_item_name: string = "";
	Evaluation_appreciation: string = "";
	Evaluation_score: string = "";



	gha: def.gha[];

	form1: FormGroup;

	exampleBasicMenu;
	exampleNestedMenu;
	exampleMenuWithIcons;
	exampleToggling;
	foods = [
		{ value: 'steak-0', viewValue: 'Steak' },
		{ value: 'pizza-1', viewValue: 'Pizza' },
		{ value: 'tacos-2', viewValue: 'Tacos' }
	];
	gehat = [
		{ value: '1', viewValue: 'قسم' },
		{ value: '2', viewValue: 'موظف' },
		{ value: '3', viewValue: 'مدرس' }
	];
	subjects: Subjects[];
	constructor(private modalService: NgbModal,
		private cdRef: ChangeDetectorRef, private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder, private Evaluation_itemsService: Evaluation_itemsDataService, private SubjectDataService: SubjectDataService, private EmployeeService: EmployeeDataService) {
		this.SubjectDataService.GetAllSubject().subscribe(data => this.subjects = data,
			error => console.log(error),
			() => { console.log("department dropdown", this.subjects) });

		this.form1 = this._fb.group({
			selectedobject: ['', [Validators.required]],
			selectedsubject: ['', [Validators.required]],
			Evaluation_item_name: ['', [Validators.required]]



		});

		EmployeeService.Getdefinations_with_scode("gha").subscribe(data => this.gha = data,
			error => console.log(error),
			() => console.log("ok"));
	}




	add_Evaluation_items() {
		//var test1
		//test1 = this.departments[this.selecteddepartment]
		//var schoolterm
		//schoolterm = this.activities[this.activity_school_term]

		if (this.form1.invalid) {
			console.log('Form invalid...');
			this.form1.markAllAsTouched();
		} else {

		for (let i = 0; i < this.fieldArray.length; i++) {
			var val = {

				evaluation_object: this.selectedobject.def_id,
				evaluation_object_name: this.selectedobject.def_name,
				evaluation_subject: this.selectedsubject.subject_name,
				evaluation_subject_id: Number(this.selectedsubject.subject_id),
			
				Evaluation_item_name: this.Evaluation_item_name,
				Evaluation_appreciation: this.fieldArray[i].name,
				Evaluation_score: Number(this.fieldArray[i].name1)

			};
				console.log("asd", val)
		this.Evaluation_itemsService.addEvaluation_items(val).subscribe(res => {
			alert(res.toString());
			this.Evaluation_itemsService.BClicked("b2");
		})
		console.log(val)
		}
			this.form1.reset();
			
		}
	
	}

	update_Evaluation_items() {

		if (this.form1.invalid) {
			console.log('Form invalid...');
			this.form1.markAllAsTouched();
		} else {

			/*console.log("emp", emp, this.employeedepartment );*/
			for (let i = 0; i < this.fieldArray.length; i++) {
				var val = {
					evaluation_id: Number(this.evaluation_id),
					evaluation_object: this.selectedobject.def_id,
					evaluation_object_name: this.selectedobject.def_name,
					evaluation_subject: this.selectedsubject.subject_name,
					evaluation_subject_id: Number(this.selectedsubject.subject_id),
					Evaluation_item_name: this.Evaluation_item_name,
					Evaluation_appreciation: this.fieldArray[i].name,
					Evaluation_score: Number(this.fieldArray[i].name1)

				};

				console.log("val", val);


				this.Evaluation_itemsService.updateEvaluation_items(val).subscribe(res => {
					alert(res.toString());
					this.Evaluation_itemsService.BClicked("b2");
					(<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
					(<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
					(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
					(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
				})
			}
			this.form1.reset();
		}
	}
	cancel_Evaluation_items() {
		this.form1.reset();
		(<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
		(<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
		(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
	}
	priv_info:any;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(error),
            () => {console.log("privvv",this.priv_info);
			}
	); 
		//(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		//(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
		/*		(<HTMLInputElement>document.getElementById("departmentsdropdown") as ).setv*/

		this.Evaluation_itemsService.aClickedEvent
			.subscribe((data: string) => {
				console.log("edited");

				console.log("evaluation_object", this.Evaluation_itemsService.evaluation_object);
				var selected_value = String(this.Evaluation_itemsService.evaluation_object);
				this.selectedobject = this.gha[this.gha.findIndex(function (el) {
					return String(el.def_id) == selected_value;
				})];

				console.log("evaluation_subject_id", this.Evaluation_itemsService.evaluation_subject_id);
				var selected_value = String(this.Evaluation_itemsService.evaluation_subject_id);
				this.selectedsubject = this.subjects[this.subjects.findIndex(function (el) {
					return String(el.subject_id) == selected_value;
				})];

	

				//(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
				//(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
				//(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
				//(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;


				this.evaluation_id = Number(this.Evaluation_itemsService.evaluation_id);
				this.evaluation_object = this.Evaluation_itemsService.evaluation_object;
				this.evaluation_object_name = this.Evaluation_itemsService.evaluation_object_name;
				this.evaluation_subject = this.Evaluation_itemsService.evaluation_subject;
				this.evaluation_subject_id = this.Evaluation_itemsService.evaluation_subject_id;
				this.Evaluation_item_id = this.Evaluation_itemsService.evaluation_item_id;
				this.Evaluation_item_name = this.Evaluation_itemsService.evaluation_item_name;
				this.Evaluation_appreciation = this.Evaluation_itemsService.evaluation_appreciation;
				this.Evaluation_score = this.Evaluation_itemsService.evaluation_score;

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }
			});
		var test1

		this.evaluation_id = this.evaluation_id;
		this.evaluation_object = this.evaluation_object;
		this.evaluation_object_name = this.evaluation_object_name;
		this.evaluation_subject = this.evaluation_subject;
		this.evaluation_subject_id = this.evaluation_subject_id;
		this.Evaluation_item_id = this.Evaluation_item_id;
		this.Evaluation_item_name = this.Evaluation_item_name;
		this.Evaluation_appreciation = this.Evaluation_appreciation;
		this.Evaluation_score = this.Evaluation_score;
		this.buttons_takem = this.buttons_takem;

	}
	fieldArray: Array<any> = [
		{
			name: '',
			name1: ''
		}
	];
	newAttribute: any = {};

	firstField = true;
	firstFieldName = 'First Item name';
	isEditItems: boolean;

	// candidates: any[] = [
	//   {
	//     'name': 'Default Name',
	//     'title': 'Job Title',
	//   },
	//   {
	//     'name': 'Default Name 2',
	//     'title': 'Job Title',
	//   }
	// ];

	addFieldValue(index) {
if (index !=0){
		this.fieldArray.push(this.newAttribute);
		console.log("zzzzz", this.fieldArray, this.newAttribute)
		this.newAttribute = {};
}
	}

	deleteFieldValue(index) {
		if (index != 0) {
			this.fieldArray.splice(index, 1);
			console.log("delete", index)
		}
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
