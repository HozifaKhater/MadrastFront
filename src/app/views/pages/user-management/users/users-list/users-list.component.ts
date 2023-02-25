import { Input } from '@angular/core';
// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MaintenanceDataService } from '../../../../../Services/MaintenanceDataService';
import { FormBuilder, FormGroup} from '@angular/forms';
import { user_privDataService } from '../../../../../Services/user_privDataService ';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'kt-users-list',
	templateUrl: './users-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent implements OnInit {

	@Input() maint_data: any;
	maint_id: number;
	maint_date: string = "";
	maint_type: string = "";
	maint_loc: string = "";
	maint_work: string = "";
	maint_notes: string = "";

    constructor(
      private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private user_privDataService: user_privDataService,
        public _fb: FormBuilder,
		private router: Router,
		private MaintenanceDataService: MaintenanceDataService,
        private cdr: ChangeDetectorRef) {
			this.form1 = this._fb.group({

			});
    }
    openModal(content: any, event: any){

      this.modalService.open(content);
  }
    form1: FormGroup;
	add_maint() {
            var val = {
                maint_date: this.maint_date,
                maint_type: this.maint_type,
                maint_loc: this.maint_loc,
                maint_work: this.maint_work,
                maint_notes: this.maint_notes

            };
            this.MaintenanceDataService.addMaintenance(val).subscribe(res => {
                alert("Added Successfully");
                this.MaintenanceDataService.BClicked("")

            },
			error => {console.log(error);
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

	update_maint() {

            var val = {
                maint_id: Number(this.maint_id),
                maint_date: this.maint_date,
                maint_type: this.maint_type,
                maint_loc: this.maint_loc,
                maint_work: this.maint_work,
                maint_notes: this.maint_notes
            };

            this.MaintenanceDataService.updateMaintenance(val).subscribe(res => {
                alert("Updated Successfully");
                this.MaintenanceDataService.BClicked("");
               
                
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
  
	priv_info:any=[];
  is_edit:boolean=false;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			}); 

		this.MaintenanceDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.maint_id = Number(this.MaintenanceDataService.maint_id);
				this.maint_date = this.MaintenanceDataService.maint_date;
				this.maint_type = this.MaintenanceDataService.maint_type;
				this.maint_loc = this.MaintenanceDataService.maint_loc;
				this.maint_work = this.MaintenanceDataService.maint_work;
				this.maint_notes = this.MaintenanceDataService.maint_notes;

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
		
	}

}
