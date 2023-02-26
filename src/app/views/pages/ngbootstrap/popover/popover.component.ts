import { Component,ChangeDetectorRef, OnInit, ViewChild, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Corr_meetingDataService } from '../../../../Services/Corr_meetingDataService';
import { Corr_meetingMaster, Corr_meeting } from '../../../../Corr_meetingMaster.Model';
import moment from 'moment';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-popover',
	templateUrl: './popover.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	// styles: [`.card { padding: 50px 0; text-align: center; overflow:hidden }`],
	providers: [NgbPopoverConfig] // add NgbPopoverConfig to the component providers
})
export class PopoverComponent implements OnInit {
	@Input() cor_data: any;
	corr_meet_id: number;
	corr_meet_date: string = "";
	corr_meet_time: string = "";
	corr_meet_loc: string = "";


	is_edit:boolean=false;
	form1: FormGroup;
	constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder, config: NgbPopoverConfig, 
		private Corr_meetingDataService: Corr_meetingDataService) {

			this.form1 = this._fb.group({
	
			});

	}
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	add_meet() {

		var val = {
			corr_meet_date: this.corr_meet_date,
			corr_meet_time: this.corr_meet_time,
			corr_meet_loc: this.corr_meet_loc
			
		};

		this.Corr_meetingDataService.addCorr_meeting(val).subscribe(res => {
			alert("Added Successfully");
			this.Corr_meetingDataService.BClicked("b2");

		},
		error => {console.log();
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


	update_meet() {

			var val = {
				corr_meet_id: Number(this.corr_meet_id),
				corr_meet_date: this.corr_meet_date,
				corr_meet_time: this.corr_meet_time,
				corr_meet_loc: this.corr_meet_loc
			};

			this.Corr_meetingDataService.updateCorr_meeting(val).subscribe(res => {
				alert(res.toString());
				this.Corr_meetingDataService.BClicked("b2");
				this.is_edit=false;
			},
			error => {console.log();
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
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});  
		
		
		this.Corr_meetingDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.corr_meet_id = Number(this.Corr_meetingDataService.corr_meet_id);
				this.corr_meet_date = this.Corr_meetingDataService.corr_meet_date;
				this.corr_meet_time = this.Corr_meetingDataService.corr_meet_time;
				this.corr_meet_loc = this.Corr_meetingDataService.corr_meet_loc;


				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
	
	}

	
}
