import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { messagesDataService } from '../../../../../Services/messagesDataService';
import { messages,messagesMaster } from '../../../../../messagesMaster.Model';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { Employee,EmployeeMaster } from '../../../../../EmployeeMaster.Model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { MyUploadAdapter } from '../../buttons-and-indicators/icon/my-upload-adapter';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { user_privDataService } from '../../../../../Services/user_privDataService ';

const moment = _rollupMoment || _moment;


@Component({
	selector: 'kt-message',
	templateUrl: './message.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-events {
		width: 400px;
		height: 200px;
		border: 1px solid #555;
		overflow: auto;
	  }
	`],
	

})
export class messagesComponent implements OnInit {
	@Input() subject_data: any;
	
@ViewChild('content', { static: true }) modalContent: TemplateRef<any>;
	subject_id: number;
	title: string;
	body: string = "";
	selectedemp:any;
	Editor = ClassicEditor;
	returned_id: any;
	

	startDate = new Date(1990, 0, 1);
	date = new FormControl(new Date());
	date10 = new FormControl(moment([2017, 0, 1]));

	serializedDate = new FormControl((new Date()).toISOString());
	minDate = new Date(2011, 0, 1);
	maxDate = new Date(2018, 11, 1);
	selectedFiles:FileList;
    events: string[] = [];
    form1: FormGroup;
	myControl = new FormControl('');
	decoded:any;
	Employees: Employee[];
	data:any;
	nchra_text:any;
	constructor(
        private user_privDataService: user_privDataService,
		private modalService: NgbModal,
		private cdRef: ChangeDetectorRef,
		private router:Router,
		private EmployeeDataService:EmployeeDataService,
		private messagesDataService: messagesDataService, 
		public _fb: FormBuilder) {
			const userToken = localStorage.getItem(environment.authTokenKey);
			this.decoded = jwt_decode(userToken);
			
			this.form1 = this._fb.group({
			
			});
	}
		
	onReady(editor: ClassicEditor): void {
		editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
			return new MyUploadAdapter(loader);
		};
	}
		selectedemps: any[] = [];
		add(emp: any) {
			if (!this.selectedemps.includes(emp)) {
			  this.selectedemps.push(emp);
			}
		  }
		
		  remove(emp: any): void {
			const index = this.selectedemps.indexOf(emp);
		
			if (index >= 0) {
			  this.selectedemps.splice(index, 1);
			}
		  }

	msg_change(){
		this.messagesDataService.body=this.body;
	}
	title_change(){
		this.messagesDataService.title=this.title;
	}
	sendmessage() {
		
		var val = {

			from_emp_id:this.decoded.id,
			title: this.title,
			body: this.body,
			reply:0
		};
        this.messagesDataService.save_in_messages(val).subscribe(res => {
            this.returned_id = res;
            for (let i = 0; i < this.selectedemps.length; i++) {
                var val = {
					msg_id: String(this.returned_id.data[0].id),
					to_emp_id: this.selectedemps[i].emp_id,
					route:this.router.url as string,
					from_emp_id:this.decoded.id
                }
                this.messagesDataService.save_in_messages_to_emp_id(val).subscribe();
            }
            alert("Saved Successfully");
			this.messagesDataService.BClicked("");
		})
	}

	reply_message(){
		var val = {

			from_emp_id:this.decoded.id,
			title: this.title,
			body: this.body,
			reply:this.messagesDataService.msg_id
		};

		this.messagesDataService.save_in_messages(val).subscribe(res => {
            this.returned_id = res;
           
                var val2 = {
					msg_id: String(this.returned_id.data[0].id),
					to_emp_id: this.messagesDataService.from_emp_id,
                }
                this.messagesDataService.save_in_messages_to_emp_id(val2).subscribe();
            
            alert("Saved Successfully");
			this.messagesDataService.BClicked("");
     
		})
	}
	
	butDisabled: boolean;
	
    
	search: any;
	change_search(event){
		this.search=this.selectedemp.emp_name
	}
	filteredOptions: Observable<any[]>;
    private _filter(value: string) {
        const filterValue = value.toLowerCase();
        return this.Employees.filter(option => option.emp_name.toLowerCase().includes(filterValue));
    }
    displayFn(selectedoption) {
       //return "";
		 return selectedoption ? selectedoption.emp_name : undefined;
    }
	dropdownSettings = {};
	
	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();

			}); 

		this.dropdownSettings = { 
			singleSelection: false, 
			text:"Select Countries",
			selectAllText:'Select All',
			unSelectAllText:'UnSelect All',
			enableSearchFilter: true,
			classes:"myclass custom-class"
		  }; 

		this.butDisabled = true;
		this.EmployeeDataService.GetAllEmployee().subscribe(data => this.Employees = data,
            error => console.log(),
            () => {
				
                this.filteredOptions = this.myControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => value? typeof value === 'string' ? value : value.emp_name : ''),
                        map(emp_name => emp_name ? this._filter(emp_name) : this.Employees.slice())
                    );
            });
		

		this.messagesDataService.aClickedEvent
			.subscribe((data: string) => {
				
				this.openModal(this.modalContent,"event")
				
				this.title = this.messagesDataService.title;
				this.body = this.messagesDataService.body;

				// open modal
				// var ele = document.getElementById('modalOpener');
				// if (ele) { ele.click() }

			});
	}

	myFilter = (d: any): boolean => {
		const day = d.day();
		// Prevent Saturday and Sunday from being selected.
		return day !== 0 && day !== 6;
	}

	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${type}: ${event.value}`);
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
