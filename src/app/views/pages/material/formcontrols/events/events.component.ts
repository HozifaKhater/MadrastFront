import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { Events } from '../../../../../EventsMaster.Model';
import { EventsDataService } from '../../../../../Services/EventsDataService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
@Component({ 
	selector: 'kt-events',
    templateUrl: './events.component.html',
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
export class EventspartyComponent implements OnInit {
	@Input() parties_data: any;
    event_id: number;
    dep_id: string="";
    dep_name: string = "";
    event_loc: string = "";
    event_date: string = "";
    event_name: string = "";
    event_site: string = "";
    event_invitees: string = "";
    event_objectives: string = "";
    event_desc: string = "";
    event_time: string = "";

    selecteddepartment: any;

	departments: Departments[];
    is_edit:boolean=false;
    form1: FormGroup;
    constructor(
        private cdRef: ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        private modalService: NgbModal,
        public _fb: FormBuilder
        , private DepartmentService: DepartmentDataService,
        private EventsDataService: EventsDataService) {
        //this.router.navigate(['/error/403']);
        this.form1 = this._fb.group({         
            selecteddepartment: ['', [Validators.required]],
            event_date: ['', [Validators.required]],
            event_name: ['', [Validators.required]]
  
        });
        this.DepartmentService.GetAlldepartment().subscribe(data => this.departments = data,
			error => console.log());

	}
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }

    
    add_event() {
		
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {

                dep_id: Number(this.selecteddepartment.dep_id),
                dep_name: this.selecteddepartment.dep_name,
                event_loc: this.event_loc,
                event_date: this.event_date,
                event_name: this.event_name,
                event_site: this.event_site,
                event_invitees: this.event_invitees,
                event_objectives: this.event_objectives,
                event_desc: this.event_desc,
                event_time: this.event_time
            };
            this.EventsDataService.addEvents(val).subscribe(res => {
                alert("Saved Successfuly");
                this.EventsDataService.BClicked("b2");
            })
            this.form1.reset();
        }
        
	}
    Events: Events[];
    update_event() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {
                event_id: this.EventsDataService.event_id,
                dep_id: Number(this.selecteddepartment.dep_id),
                dep_name: this.selecteddepartment.dep_name,
                event_loc: this.event_loc,
                event_date: this.event_date,
                event_name: this.event_name,
                event_site: this.event_site,
                event_invitees: this.event_invitees,
                event_objectives: this.event_objectives,
                event_desc: this.event_desc,
                event_time: this.event_time
            };


            this.EventsDataService.updateEvents(val).subscribe(res => {
                alert("Updated Successfully");
                this.EventsDataService.BClicked("b2");
                this.is_edit=false;
            })
            this.form1.reset();
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
		

        this.EventsDataService.aClickedEvent
            .subscribe((data: string) => {
                this.is_edit=true;
                var selected_value = String(this.EventsDataService.dep_id);
				this.selecteddepartment = this.departments[this.departments.findIndex(function (el) {
					return el.dep_id == selected_value;})];
			
				
                this.event_id = this.EventsDataService.event_id;
                this.dep_id = String(this.EventsDataService.dep_id);
                this.dep_name = this.EventsDataService.dep_name;
                this.event_loc = this.EventsDataService.event_loc;
                this.event_date = this.EventsDataService.event_date;
                this.event_name = this.EventsDataService.event_name;
                this.event_site = this.EventsDataService.event_site;
                this.event_invitees = this.EventsDataService.event_invitees;
                this.event_objectives = this.EventsDataService.event_objectives;
                this.event_desc = this.EventsDataService.event_desc;
                this.event_time = this.EventsDataService.event_time;

                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

			});
		
	}


}
