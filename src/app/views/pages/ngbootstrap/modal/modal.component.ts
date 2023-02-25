import { Component,ChangeDetectorRef, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Group_meetingDataService } from '../../../../Services/Group_meetingDataService';
import { Group_meetingMaster, Group_meeting } from '../../../../Group_meetingMaster.Model';
import { meeting_typeDataService } from '../../../../Services/meeting_typeDataService';
import { meeting_type,meeting_typeMaster} from '../../../../meeting_typeMaster.Model';
import moment from 'moment';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import * as def from '../../../../definationsMaster.Model';
import { Observable } from 'rxjs';
import { EmployeeDataService } from '../../../../Services/EmployeeDataService';
import { startWith, map } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../Services/user_privDataService ';
import { DefinitionDataService } from '../../../../Services/Definition';
import { Definition } from '../../../../Definitions.Model';
import { teams_and_groupsDataService } from '../../../../Services/teams_and_groupsDataService';
import { teams_and_groups } from '../../../../teams_and_groupsMaster.Model';
import { DepartmentDataService } from '../../../../Services/DepartmentDataService';
import { DepartmentMaster, Departments } from '../../../../DepartmentMaster.Model';


@Component({
  selector: 'kt-ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-info" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContentComponent {
	@Input() name;
	constructor(public activeModal: NgbActiveModal) { }
}

@Component({
	selector: 'kt-modal',
	templateUrl: './modal.component.html',
	encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
  `]
})
export class ModalComponent implements OnInit {
	@Input() meeting_data: any;
	
@ViewChild('content', { static: true }) modalContent: TemplateRef<any>;
	group_id: number;
	group_name: string = "";
	meeting_no: number;
	meeting_date: string = "";
	meeting_mem_no: number = 0;
	meeting_loc: string = "";
	impor_recomm: string = "";
	bus_table: string = "";
    selecteddepartment: any;
    Departments: any;
	content: string="";
	exampleModalWithDefaultOptions;
	exampleComponentsAsContent;
	exampleModalWithCustomClass;
	exampleScrollableFixedContent;
	exampleScrollingLongContent;
	exampleLargeModal;
	exampleSmallModal;
	exampleVerticallyCentered;


	is_meeting_date	:	any;
    	meeting_date_label	:	any;
    	is_group_name	:	any;
    	group_name_label	:	any;
    	is_start_time	:	any;
    	start_time_label	:	any;
    	is_end_time	:	any;
    	end_time_label	:	any;
    	is_group_number	:	any;
    	group_number_label	:	any;
    	is_meeting_mem_no	:	any;
    	meeting_mem_no_label	:	any;
    	is_meeting_loc	:	any;
    	meeting_loc_label	:	any;
    	is_work_plan	:	any;
    	work_plan_label	:	any;
    	is_recommendation	:	any;
    	recommendation_label	:	any;
    	is_dep	:	any;
    	dep_label	:	any;
    	is_subject	:	any;
    	subject_label	:	any;
    	is_abscence	:	any;
    	abscence_label	:	any;
    	is_course	:	any;
    	course_label	:	any;
    	is_content	:	any;
    	content_label	:	any ;
	group: def.group[];
	meeting_type: meeting_type[];
	meeting_type_model: any;

	slides:Definition[];
    allSlides:any;
    selectedSlide:any=[];
	departments: Departments[];
	closeResult: string;
	closeResult2: string;
	teams_and_groups:teams_and_groups[];
	selected_meeting_type:any;

	form1: FormGroup;
	constructor( 
		private cdRef:ChangeDetectorRef,
		private teams_and_groupsDataService:teams_and_groupsDataService,
		private router: Router, private user_privDataService: user_privDataService,
		private meeting_typeDataService: meeting_typeDataService,
		public _fb: FormBuilder, 
		private modalService: NgbModal, 
		private Group_meetingDataService: Group_meetingDataService, 
		private EmployeeService: EmployeeDataService,
		private DefinitionDataService: DefinitionDataService,
		private DepartmentService: DepartmentDataService) {

		this.form1 = this._fb.group({
			group_name	: [[Validators.required]]
			
		});

		meeting_typeDataService.get_meeting_type()
			.subscribe((data:any) => this.meeting_type = data.data,
			error => console.log());

		this.teams_and_groupsDataService.GetAllteams_and_groups()
			.subscribe(data => this.slides = data,
            error => console.log());

		this.DepartmentService.GetAllMasterdepartment()
			.subscribe(data => this.departments = data,
				error => console.log());


	}
	
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	meeting_type_id	:	any;
    	meeting_type_name	:	any;
	meeting_types_selection(event) {
	//	this.is_meeting_mem_no=1
	
        this.meeting_type_id = event.meeting_type_id;
        this.meeting_type_name = event.meeting_type_name;
        this.meeting_typeDataService.get_meeting_type_with_id(event.meeting_type_id).subscribe((data:any)=> this.meeting_type_model = data.data,
            error => console.log(error),
            () => {
                
				
				this.is_meeting_date =  Number(this.meeting_type_model[0].is_meeting_date)
				this.meeting_date_label = this.meeting_type_model[0].meeting_date
				this.is_group_name = Number(this.meeting_type_model[0].is_group_name)
				this.group_name_label = this.meeting_type_model[0].group_name
				this.is_start_time =  Number(this.meeting_type_model[0].is_start_time)
				this.start_time_label = this.meeting_type_model[0].start_time_label
				this.is_end_time =  Number(this.meeting_type_model[0].is_end_time)
				this.end_time_label = this.meeting_type_model[0].end_time_label
				this.is_group_number =  Number(this.meeting_type_model[0].is_group_number)
				this.group_number_label = this.meeting_type_model[0].group_number_label
				this.is_meeting_mem_no = Number(this.meeting_type_model.is_meeting_mem_no)
				this.meeting_mem_no_label = this.meeting_type_model[0].meeting_mem_no_label
				this.is_meeting_loc =  Number(this.meeting_type_model[0].is_meeting_loc)
				this.meeting_loc_label = this.meeting_type_model[0].meeting_loc_label
				this.is_work_plan =  Number(this.meeting_type_model[0].is_work_plan)
				this.work_plan_label = this.meeting_type_model[0].work_plan_label
				this.is_recommendation =  Number(this.meeting_type_model[0].is_recommendation)
				this.recommendation_label = this.meeting_type_model[0].recommendation_label
				this.is_dep =  Number(this.meeting_type_model[0].is_dep)
				this.dep_label = this.meeting_type_model[0].dep_label
				this.is_subject =  Number(this.meeting_type_model[0].is_subject)
				this.subject_label = this.meeting_type_model[0].subject_label
				this.is_abscence =  Number(this.meeting_type_model[0].is_abscence)
				this.abscence_label = this.meeting_type_model[0].abscence_label
				this.is_course =  Number(this.meeting_type_model[0].is_course)
				this.course_label = this.meeting_type_model[0].course_label
				this.is_content =  Number(this.meeting_type_model[0].is_content)
				this.content_label = this.meeting_type_model[0].content_label

            });
			
    }

	open(content) {
		this.modalService.open(content).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

	open2() {
		const modalRef = this.modalService.open(NgbdModalContentComponent);
		modalRef.componentInstance.name = 'World';
	}

	open3(content) {
		this.modalService.open(content, { windowClass: 'dark-modal' });
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	openLarge(content) {
		this.modalService.open(content, {
			size: 'lg'
		});
	}

	openSmall(content) {
		this.modalService.open(content, {
			size: 'sm'
		});
	}

	openCentred(content) {
		this.modalService.open(content,
			// { centered: true }
		);
	}

	selectedgroup: any;
	dateValue : string="";
	content_meeting:any;
	add_meeting() {
		

		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

			console.log('this.selected_meeting_type' , this.selected_meeting_type);

		var val = {

			group_name: this.selectedSlide.id.toString(),
			meeting_no: Number(this.meeting_no),
			meeting_date: this.dateValue,
			meeting_mem_no: this.meeting_mem_no,
			bus_table: this.bus_table,
			objgroup_meeting: "obj",
			meeting_type_name: this.selected_meeting_type.meeting_type_name,
			dep_name: this.selecteddepartment.dep_name,
			dep_id:this.selecteddepartment.dep_id,
			content:  this.content_meeting,
			meeting_loc: this.meeting_loc,
			impor_recomm:  this.impor_recomm,
			meeting_type_id: this.selected_meeting_type.meeting_type_id,
			route: this.router.url as string

		};
		console.log("asd", val)
		this.Group_meetingDataService.addGroup_meeting(val).subscribe(res => {
			alert("Added Sucessfully");
			this.Group_meetingDataService.BClicked("b2");
		})
			console.log(val)
			this.form1.reset();
		}
	}
	//corridorsDataService: corridorsDataService;
	update_meeting() {

		if (this.form1.invalid) {
			console.log('Form invalid...');
			this.form1.markAllAsTouched();
		} else {

			var val = {
				group_id: Number(this.group_id),

				group_name: this.selectedSlide.id.toString(),
			meeting_no: Number(this.meeting_no),
			meeting_date: this.dateValue,
			meeting_mem_no: this.meeting_mem_no,
			bus_table: this.bus_table,
			objgroup_meeting: "obj",
			meeting_type_name: this.selected_meeting_type.meeting_type_name,
			dep_name: this.selecteddepartment.dep_name,
			dep_id:this.selecteddepartment.dep_id,
			content:  this.content_meeting,
			meeting_loc: this.meeting_loc,
			impor_recomm:  this.impor_recomm,
			meeting_type_id: this.selected_meeting_type.meeting_type_id,
			route: this.router.url as string
			};

			console.log("val", val);


			this.Group_meetingDataService.updateGroup_meeting(val).subscribe(res => {
				alert(res.toString());
				this.Group_meetingDataService.BClicked("b2");
				this.is_edit=false;
			})
			this.form1.reset();
		}
	}
	

	myControlManager = new FormControl('');
	filteredOptionsManager: Observable<any[]>;
    private _filterManager(value: string) {
        const filterValue = value.toLowerCase();
        return this.meeting_type.filter(option => option.meeting_type_name.toLowerCase().includes(filterValue));
    }
    displayFnManager(selectedoption) {
        return selectedoption ? selectedoption.meeting_type_name : undefined;
    }
	selectedManager:any;
	managerValue:string="";
	deptValue: string="";
	is_name:any;
	meetingValue:string="";
	priv_info:any=[];
	is_edit:boolean=false;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});
		
			

		

		this.Group_meetingDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.group_id = Number(this.Group_meetingDataService.group_id);
				this.group_name = this.Group_meetingDataService.group_name;
				this.meeting_no = Number(this.Group_meetingDataService.meeting_no);
				this.meeting_date = this.Group_meetingDataService.meeting_date;
				this.meeting_mem_no = Number(this.Group_meetingDataService.meeting_mem_no);
				this.meeting_loc = this.Group_meetingDataService.meeting_loc;
				this.impor_recomm = this.Group_meetingDataService.impor_recomm;
				this.bus_table = this.Group_meetingDataService.bus_table;
				this.content =this.Group_meetingDataService.content;
				
				this.selectedSlide = this.Group_meetingDataService.group_name;
				this.meetingValue = this.Group_meetingDataService.meeting_type_name;
				this.deptValue= this.Group_meetingDataService.dep_name;
				this.dateValue = this.Group_meetingDataService.meeting_date;
				
			console.log("this.Group_meetingDataService.meeting_type_id",this.Group_meetingDataService)
				this.meeting_typeDataService.get_meeting_type_with_id(this.Group_meetingDataService.meeting_type_id).subscribe((data:any)=> this.meeting_type_model = data.data,
				error => console.log(error),
				() => {
					
					
					this.is_meeting_date =  Number(this.meeting_type_model[0].is_meeting_date)
					this.meeting_date_label = this.meeting_type_model[0].meeting_date
					this.is_group_name = Number(this.meeting_type_model[0].is_group_name)
					this.group_name_label = this.meeting_type_model[0].group_name
					this.is_start_time =  Number(this.meeting_type_model[0].is_start_time)
					this.start_time_label = this.meeting_type_model[0].start_time_label
					this.is_end_time =  Number(this.meeting_type_model[0].is_end_time)
					this.end_time_label = this.meeting_type_model[0].end_time_label
					this.is_group_number =  Number(this.meeting_type_model[0].is_group_number)
					this.group_number_label = this.meeting_type_model[0].group_number_label
					this.is_meeting_mem_no = Number(this.meeting_type_model.is_meeting_mem_no)
					this.meeting_mem_no_label = this.meeting_type_model[0].meeting_mem_no_label
					this.is_meeting_loc =  Number(this.meeting_type_model[0].is_meeting_loc)
					this.meeting_loc_label = this.meeting_type_model[0].meeting_loc_label
					this.is_work_plan =  Number(this.meeting_type_model[0].is_work_plan)
					this.work_plan_label = this.meeting_type_model[0].work_plan_label
					this.is_recommendation =  Number(this.meeting_type_model[0].is_recommendation)
					this.recommendation_label = this.meeting_type_model[0].recommendation_label
					this.is_dep =  Number(this.meeting_type_model[0].is_dep)
					this.dep_label = this.meeting_type_model[0].dep_label
					this.is_subject =  Number(this.meeting_type_model[0].is_subject)
					this.subject_label = this.meeting_type_model[0].subject_label
					this.is_abscence =  Number(this.meeting_type_model[0].is_abscence)
					this.abscence_label = this.meeting_type_model[0].abscence_label
					this.is_course =  Number(this.meeting_type_model[0].is_course)
					this.course_label = this.meeting_type_model[0].course_label
					this.is_content =  Number(this.meeting_type_model[0].is_content)
					this.content_label = this.meeting_type_model[0].content_label
	
				});
				console.log("selectedSlide", this.selectedSlide);
				console.log("meeting_date", this.meeting_date);

				// open modal
				// var ele = document.getElementById('modalOpener');
				// if (ele) { ele.click() }
				this.openModal(this.modalContent,"event");
			});



	}
}
