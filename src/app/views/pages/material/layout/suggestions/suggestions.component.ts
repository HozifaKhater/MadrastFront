import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ta7dier_masterDataService } from '../../../../../Services/Ta7dier_masterDataService';
import { SubjectDataService } from '../../../../../Services/SubjectDataService';
import { Ta7dier, Ta7dier_masterMaster } from '../../../../../Ta7dier_masterMaster.Model';
import { SubjectMaster, Subjects } from '../../../../../SubjectMaster.Model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import * as def from '../../../../../definationsMaster.Model';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { SuggestionsMaster, Suggestions } from '../../../../../SuggestionsMaster.Model';
import { SuggestionsDataService } from '../../../../../Services/SuggestionsDataService';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Definition } from '../../../../../Definitions.Model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
	selector: 'kt-sugg',
	templateUrl: './suggestions.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-card {
		max-width: 400px;
	  }
	.example-header-image {
		background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
		background-size: cover;
	  }
	`]

})
export class SuggestionsComponent implements OnInit {
	breadCrumbItems: Array<{}>;


	sugg: def.sugg[];
	form1: FormGroup;

	public Editor = ClassicEditor;
	@ViewChild("myEditor", { static: false }) myEditor: any;
	@Input() ta7dier_master_data: any;
	sugg_id: number;
	sugg_body: string;
	sugg_title: string = "";
	sugg_file: string = "";
	sugg_type: string = "";
	sugg_upload: string = "";

	public onChange({ editor }: ChangeEvent) {
		const data = editor.getData();
		this.data = data;
	}
	
	
	subjects: Subjects[];
	selectedsubject: any;
	data: any;
	constructor(private modalService: NgbModal,
		private cdRef: ChangeDetectorRef, private router: Router, private user_privDataService: user_privDataService,
		private SuggestionsDataService: SuggestionsDataService, public _fb: FormBuilder, private EmployeeService: EmployeeDataService) {
		this.form1 = this._fb.group({
			sugg_body: ['', [Validators.required]],
			sugg_title: ['', [Validators.required]],
			sugg_file: ['', [Validators.required]],
			sugg_upload: ['', [Validators.required]]
		});

		EmployeeService.Getdefinations_with_scode("sugg").subscribe(data => this.sugg = data,
			error => console.log());

	}

	selectedsuggtype: any =[];

	add_sugg() {
		
		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

			var val = {
				sugg_body: this.sugg_body,
				sugg_title: this.sugg_title,
				sugg_file: this.sugg_file,
				sugg_type: this.selectedsuggtype.def_name,
				sugg_upload: this.sugg_upload
			};

			this.SuggestionsDataService.addSuggestions(val).subscribe(res => {
				alert("Added Successfully");
				this.SuggestionsDataService.BClicked("b2");
			})
				this.form1.reset();
		}
	}

	SuggestionsMaster: SuggestionsMaster[];

	update_sugg() {
		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

			var val = {
				sugg_id: Number(this.sugg_id),
				sugg_body: this.sugg_body,
				sugg_title: this.sugg_title,
				sugg_file: this.sugg_file,
				sugg_type: this.selectedsuggtype.def_name,
				sugg_upload: this.sugg_upload

			};

			this.SuggestionsDataService.updateSuggestions(val).subscribe(res => {
				alert("Updated Successfully");
				this.SuggestionsDataService.BClicked("b2");
				this.is_edit=false;
			})
			this.form1.reset();
		}
	}
	myControlType = new FormControl('');
	filteredOptionsTypes: Observable<any[]>;
    private _filterType(value: string) {
        const filterValue = value.toLowerCase();
        return this.sugg.filter(option => option.def_name.toLowerCase().includes(filterValue));
    }
    displayFnType(selectedoption) {
        return selectedoption ? selectedoption.def_name : undefined;
    }


	anotherDefArray: Definition[];
	typeVar: any=[];
	
	priv_info:any=[];
	is_edit:boolean=false;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			}); 

			this.EmployeeService.Getdefinations_with_scode("sugg")
			.subscribe(data => this.sugg = data,
				error => console.log(),
				() => {
					this.filteredOptionsTypes = this.myControlType.valueChanges
						.pipe(
							startWith(''),
							map(value => value? typeof value === 'string' ? value : value.def_name : ''),
							map(def_name => def_name ? this._filterType(def_name) : this.sugg.slice())
						);
				});

		this.SuggestionsDataService.aClickedEvent
			.subscribe((data: string) => {
				
this.is_edit=true;
				this.sugg_id = Number(this.SuggestionsDataService.sugg_id);
				this.sugg_body = this.SuggestionsDataService.sugg_body;
				this.sugg_title = this.SuggestionsDataService.sugg_title;
				this.sugg_file = this.SuggestionsDataService.sugg_file;
				this.sugg_type = this.SuggestionsDataService.sugg_type;
				this.sugg_upload = this.SuggestionsDataService.sugg_upload;

				this.EmployeeService.Getdefinations_with_scode("sugg")
				.subscribe(data => this.anotherDefArray = data,
					error => console.log(),
					() => {
						var type = this.SuggestionsDataService.sugg_type;
					
						this.typeVar = this.anotherDefArray[this.anotherDefArray.findIndex(function (el) {

							return el.def_name == type;
						})];

						this.selectedsuggtype = this.typeVar;
		
					});
				
				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
		
	}

	display = "";
	openModal(content: any, event: any) {

		this.modalService.open(content, { backdrop: true, size: "xl", });
	}
	openModal1() {
		this.display = "show";
		this.cdRef.detectChanges();
	}
	onCloseHandled() {
		this.display = "";
	}
}
