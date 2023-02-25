import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, ViewChild, Input } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NchraDataService } from '../../../../../Services/NchraDataService';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';

import { Employee } from '../../../../../EmployeeMaster.Model';
import { Departments } from '../../../../../DepartmentMaster.Model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyUploadAdapter } from './my-upload-adapter';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-icon',
	templateUrl: './icon.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnInit {
	@Input() nchra_data: any;
	nchra_id: number;
	nchra_date: string = "";
	returned_nchra_id: string = "";
	nchra_sender: string = "";
	nchra_topic: string = "";
	nchra_text: string = "";
	nchra_pages_num: string = "";
	nchra_attach: string = "";
	is_file: any;

	data:any;
	Employees: Employee[];
	Employees1: Employee[];
	employeedepartment: any;
	employeedepartmentsender: any;
	employeemorsl: any;
	Departments: Departments[];
	selecteddepartment: any;
	disabled: boolean;
	disabled_emp: boolean;

	
	@ViewChild("myEditor", { static: false }) myEditor: any;


	Editor = ClassicEditor;

	onReady(editor: ClassicEditor): void {
		editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
			return new MyUploadAdapter(loader);
		};
	}
	
	displayParameter: any;

	form1: FormGroup;
	constructor(
		private modalService: NgbModal,

		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder, 
		private EmployeeService: EmployeeDataService, 
		private NchraDataService: NchraDataService, 
		private DepartmentDataService: DepartmentDataService) {

		this.form1 = this._fb.group({
			employeedepartment: ['', [Validators.required]],
			employeedepartmentsender: ['', [Validators.required]],
			selecteddepartment: ['', [Validators.required]]
		});

		this.EmployeeService.GetAllEmployee()
		.subscribe(data => this.Employees = data,
			error => console.log());
			this.EmployeeService.GetAllEmployee()
			.subscribe(data => this.Employees1 = data,
				error => console.log());

		this.DepartmentDataService.GetAlldepartment()
		.subscribe(data => this.Departments = data,
			error => console.log());
	}
	openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }

	checked_radio: any;
is_dep:boolean=true;
	handleChange(evt) {
		if (evt.target.value === "employee") {
			this.disabled = true
			this.disabled_emp = false
		}
		else if (evt.target.value === "department") {
			this.disabled = false
			this.disabled_emp = true
		}
		else if (evt.target.value != "department" && "employee") {
			this.disabled = false
			this.disabled_emp = false
		}
		this.checked_radio = evt.target.value
	}
	selected_obj_id: any;
	selected_obj_name: any;

	file: File;
	base64textString: string;
	nachra_file_type:any;
	

	handleFileSelect(evt) {
		const files = evt.target.files;
		this.file = files[0];
		this.nachra_file_type=files[0].type
		// FileReader API
		const reader = new FileReader();
		// Reading image as base64 string
		reader.readAsDataURL(this.file);
		reader.onload = () => {
			this.base64textString = reader.result as string;
			this.nchra_attach=this.base64textString;
		};
	}

	add_nchra() {
		var is_dep_value = 1
		if (this.checked_radio === "department") {is_dep_value = 1}
		if (this.checked_radio === "employee") {is_dep_value = 0}
		var val = {

			nchra_date: this.nchra_date,
			nchra_sender: String(this.employeedepartmentsender.emp_id),
			nchra_topic: this.nchra_topic,
			nchra_text: this.nchra_text,
			nchra_pages_num: this.nchra_pages_num,
			nchra_attach: this.nchra_attach,
			nachra_file_type: this.nachra_file_type,
			is_file: this.is_file,
			is_dep:is_dep_value
		};

		this.NchraDataService.addNchra(val).subscribe(res => {
			
			this.NchraDataService.BClicked("b2");
			this.returned_nchra_id = res.toString();

			
			if (this.checked_radio === "employee") {
				for (let i = 0; i < this.employeedepartment.length; i++) {
					this.selected_obj_id = Number(this.employeedepartment[i].emp_id);
					this.selected_obj_name = this.employeedepartment[i].emp_name;

					var val2 = {
						nchra_id: Number(this.returned_nchra_id),
						nchra_obj_id: this.selected_obj_id,
						nchra_obj_name: this.selected_obj_name
					}
					this.NchraDataService.addNchradetails(val2).subscribe();
				}
			}
			else  {
				
				for (let i = 0; i < this.selecteddepartment.length; i++) {

					this.selected_obj_id = Number(this.selecteddepartment[i].dep_id);
					this.selected_obj_name = this.selecteddepartment[i].dep_name;

					var val2 = {
						nchra_id: Number(this.returned_nchra_id),
						nchra_obj_id: this.selected_obj_id,
						nchra_obj_name: this.selected_obj_name
					}

					this.NchraDataService.addNchradetails(val2).subscribe()
				}
			};

			alert("Added Succesfully");

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
		});	
	}


	update_nchra() {
		var is_dep_value = 1
		if (this.checked_radio === "department") {is_dep_value = 1}
		if (this.checked_radio === "employee") {is_dep_value = 0}
			var val = {
				nchra_id: this.NchraDataService.nchra_id,
				nchra_date: this.nchra_date,
				nchra_sender: String(this.employeedepartmentsender.emp_id),
				nchra_topic: this.nchra_topic,
				nchra_text: this.nchra_text,
				nchra_pages_num: this.nchra_pages_num,
				nchra_attach: this.nchra_attach,
				nachra_file_type: this.nachra_file_type,
				is_file: this.is_file,
				is_dep:is_dep_value

			};

		this.NchraDataService.updateNchra(val).subscribe(res => {
			
			this.NchraDataService.deleteNchradel(this.NchraDataService.nchra_id)
			.subscribe(res => {
				this.NchraDataService.BClicked("b2");
				this.returned_nchra_id = res.toString();

				if (this.checked_radio === "department") {
					for (let i = 0; i < this.selecteddepartment.length; i++) {

						this.selected_obj_id = Number(this.selecteddepartment[i].dep_id),
							this.selected_obj_name = this.selecteddepartment[i].dep_name

						var val = {
							nchra_id: Number(this.nchra_id),
							nchra_obj_id: this.selected_obj_id,
							nchra_obj_name: this.selected_obj_name
						}

						this.NchraDataService.addNchradetails(val).subscribe();
					}
				};

				if (this.checked_radio === "employee") {
					for (let i = 0; i < this.employeedepartment.length; i++) {
						this.selected_obj_id = Number(this.employeedepartment[i].emp_id),
							this.selected_obj_name = this.employeedepartment[i].emp_name

						var val = {
							nchra_id: Number(this.nchra_id),

							nchra_obj_id: this.selected_obj_id,
							nchra_obj_name: this.selected_obj_name


						}
						this.NchraDataService.addNchradetails(val).subscribe();
					}
				};

			});

			alert("Updated Succesfully");
			this.NchraDataService.BClicked("b2");
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

	cancel_nchra() {
		this.form1.reset();
		
	}


	openFile(base64textString) {

		const base64Data = base64textString.substring(base64textString.indexOf(',') + 1);
		const fileType = 'application/pdf';
		const base64File = base64Data;
		const blob = this.b64toBlob(base64File, fileType);
		const blobUrl = URL.createObjectURL(blob);
		window.open(blobUrl, '_blank');
	}

	b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
		const byteCharacters = atob(b64Data);
		const byteArrays = [];

		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			const slice = byteCharacters.slice(offset, offset + sliceSize);

			const byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			const byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}

		return new Blob(byteArrays, { type: contentType });
	}
	employeeName:string;

	priv_info:any=[];
	nchra_details:any[]=[];
	is_edit:boolean=false;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			}); 

		

		this.NchraDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.nchra_id = Number(this.NchraDataService.nchra_id);
				this.nchra_date = this.NchraDataService.nchra_date;
				this.nchra_sender = this.NchraDataService.nchra_sender;
				this.nchra_topic = this.NchraDataService.nchra_topic;
				this.nchra_text = this.NchraDataService.nchra_text;
				this.nchra_attach = this.NchraDataService.nchra_attach;
				this.nachra_file_type = this.NchraDataService.nachra_file_type;
				this.is_file = this.NchraDataService.is_file;
				this.nchra_pages_num = this.NchraDataService.nchra_pages_num.toString();

				this.employeeName =  this.NchraDataService.nchra_sender;
				var selected_emp = this.NchraDataService.nchra_sender;
                this.employeedepartmentsender = this.Employees1[this.Employees1.findIndex(function (el) {
                    return String(el.emp_id) == selected_emp
                })];
				// open modal
			if (this.NchraDataService.is_dep == 1)
			{
				this.NchraDataService.get_nchra_details_with_nchra_id(this.NchraDataService.nchra_id).subscribe(data => this.nchra_details = data,
					error => console.log(),
					() => {

						console.log("this.trip_details",this.nchra_details)
						this.selecteddepartment = this.Departments.filter((x) =>
						this.nchra_details.some((member) => member.nchra_obj_id === x.dep_id)
					  );
					})
			}
			if (this.NchraDataService.is_dep == 0)
			{
				this.is_dep=false;
				this.NchraDataService.get_nchra_details_with_nchra_id(this.NchraDataService.nchra_id).subscribe(data => this.nchra_details = data,
					error => console.log(),
					() => {

						console.log("this.trip_details",this.nchra_details)
						this.employeedepartment = this.Employees.filter((x) =>
						this.nchra_details.some((member) => member.nchra_obj_id === x.emp_id)
					  );
					})
			}
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});

		
	}

}
