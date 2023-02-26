import { OnInit, Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Add_libDataService } from '../../../../Services/Add_libDataService';
import { Add_libMaster, Add_lib } from '../../../../Add_libMaster.Model';
import * as def from '../../../../definationsMaster.Model';
import { Definition } from '../../../../Definitions.Model';

import { EmployeeDataService } from '../../../../Services/EmployeeDataService';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({ 
	selector: 'kt-accordion',
	templateUrl: './accordion.component.html',
	styles: [`
		.card-header--title {
			display:block;
		}
	`],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [NgbAccordionConfig] // add the NgbAccordionConfig to the component providers
})
export class AccordionComponent implements OnInit {
	@Input() lib_data: any;
	lib_id: number;
	lib_book: string = "";
	lib_ref: string = "";
	lib_book_name: string = "";
	lib_author_name: string = "";
	lib_date: string = "";
	lib_page_no: number;
	lib_rec_no: number;
	lib: FormControl;
	ref: FormControl;
	lib_classification: string = "";

	s_code_arabic: string = "";
    selected: string;
    scodes: Definition[];
    selectedCode: any;
	
    selecteddepartment: any;
    employeedepartment: any;
	exampleAccordion: any;
	exampleOneOpenPanelAtAHome: any;
	exampleTogglePanels: any;
	examplePreventPanelToggle: any;
	exampleGlobalConfigurationOfAccordions: any;
    disabled: boolean;
    disabled_emp: boolean;
	is_edit:boolean=false;
	classif: def.nat[];
	form1: FormGroup;
	constructor(private modalService: NgbModal,
		private cdRef: ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder, config: NgbAccordionConfig, 
		private Add_libDataService: Add_libDataService, 
		private EmployeeService: EmployeeDataService) {
		

		EmployeeService.Getdefinations_with_scode("classif").subscribe(data => this.classif = data,
			error => console.log());

			
		EmployeeService.Getdefinations_with_scode("classif").subscribe(data => this.scodes = data,
				error => console.log());


		this.form1 = this._fb.group({
			lib_rec_no: ['', [Validators.required]],
			lib_book_name: ['', [Validators.required]],
			lib_author_name: ['', [Validators.required]],
		});

	}

	checked_radio: any;
	handleChange(event) {
		if(event !== null && event !== undefined && event.length !== 0){

			if (event.target.value === "employee") {
				this.disabled = true
				this.disabled_emp = false
			}
			else if (event.target.value === "department") {
				this.disabled = false
				this.disabled_emp = true
			}
			this.checked_radio = event.target.value
		}
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
	selectedclassif: any=[];
	selectedclassif2: any;
	date:string = "";

	add_lib() {

		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {
			var val = {

				lib_book: this.butdisableclass,
				lib_ref: this.butdisablework,
				lib_book_name: this.lib_book_name,
				lib_author_name: this.lib_author_name,
				lib_date: this.date,
				lib_page_no: Number(this.lib_page_no),
				lib_rec_no: Number(this.lib_rec_no),
				lib_classification: this.selectedclassif.def_id.toString(),
			};
			this.Add_libDataService.addAdd_lib(val).subscribe(res => {
				alert(res.toString());
				this.Add_libDataService.BClicked("b2");
				this.form1.reset();
				
			})
		}
	}

	update_lib() {
		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {
			var val = {
				lib_id: Number(this.lib_id),
				lib_book: this.butdisableclass,
				lib_ref: this.butdisablework,
				lib_book_name: this.lib_book_name,
				lib_author_name: this.lib_author_name,
				lib_date: this.date,
				lib_page_no: Number(this.lib_page_no),
				lib_rec_no: Number(this.lib_rec_no),
				lib_classification: this.selectedclassif.def_id.toString(),
			};

			this.Add_libDataService.updateAdd_lib(val).subscribe(res => {
				alert("Updated Succesfully");
				this.Add_libDataService.BClicked("b2");
				this.form1.reset();
				
				this.is_edit=false;
			})
		}
	}
	

	classValue: string="";
	anotherClassf: def.nat[];
	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});
		

		this.Add_libDataService.aClickedEvent
			.subscribe((data: string) => {
				
				this.is_edit=true;
				this.lib_id = Number(this.Add_libDataService.lib_id);
				this.lib_book = String(this.Add_libDataService.lib_book);
				this.lib_ref = String(this.Add_libDataService.lib_ref);
				this.lib_book_name = this.Add_libDataService.lib_book_name;
				this.lib_author_name = this.Add_libDataService.lib_author_name;
				this.date = this.Add_libDataService.lib_date;
				this.lib_page_no = Number(this.Add_libDataService.lib_page_no);
				this.lib_rec_no = Number(this.Add_libDataService.lib_rec_no);
				this.lib_classification = this.Add_libDataService.lib_classification;
				
				var id= Number(this.Add_libDataService.lib_classification);
                this.selectedclassif = this.classif[this.classif.findIndex(function (el) {

                    return el.def_id == id;
                })];


				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});

		
	}

	// api methods
	// ng-methods
	beforeChange($event: NgbPanelChangeEvent) {

		if ($event.panelId === 'preventchange-2') {
			$event.preventDefault();
		}

		if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
			$event.preventDefault();
		}
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
