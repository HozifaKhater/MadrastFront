import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { School_partyDataService } from '../../../../../Services/School_partyDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { School_partyMaster, School_party } from '../../../../../School_partyMaster.Model';
import { School_year_data,School_year_dataMaster } from '../../../../../School_year_dataMaster.Model';
import { School_year_dataDataService } from '../../../../../Services/School_year_dataDataService';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-parties',
    templateUrl: './school_party.component.html',
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
export class SchoolpartyComponent implements OnInit {
	@Input() parties_data: any;
    sch_party_id: number;
    dep_id: string="";
    dep_name: string = "";
    party_occ: string = "";
    party_date: string = "";
    party_duration: string = "";
    party_loc: string = "";
    party_sponsor: string = "";
    party_invitees: string = "";
    external_part: string = "";
    party_desc: string = "";

    selecteddepartment: any;

	departments: Departments[];
    School_partyMaster: School_partyMaster[];
    favoriteSeason: string;
   
    is_edit:boolean=false;
	semesters = [
		{ value: '1', viewValue: 'الأول' },
		{ value: '2', viewValue: 'الثاني' }
	];

	labelPosition: string = 'before';


	changeLablesPositions() {
		this.labelPosition = this.labelPosition === 'before' ? 'after' : 'before';
	}
    form1: FormGroup;
    constructor(
        private modalService: NgbModal,public _fb: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        private DepartmentService: DepartmentDataService,
        private School_partyDataService: School_partyDataService) {
        //this.router.navigate(['/error/403']);
        this.form1 = this._fb.group({         
            selecteddepartment: ['', [Validators.required]],
            party_date: ['', [Validators.required]],
            party_loc: ['', [Validators.required]]
  
        });
        this.DepartmentService.GetAlldepartment().subscribe(data => this.departments = data,
			error => console.log());

	}

    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }

    add_party() {
		
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {

                dep_id: Number(this.selecteddepartment.dep_id),
                dep_name: this.selecteddepartment.dep_name,
                party_occ: this.party_occ,
                party_date: this.party_date,
                party_duration: Number(this.party_duration),
                party_loc: this.party_loc,
                party_sponsor: this.party_sponsor,
                party_invitees: this.party_invitees,
                external_part: this.external_part,
                party_desc: this.party_desc
            };
            this.School_partyDataService.addParty(val).subscribe(res => {
                alert("Saved Successfuly");
                this.School_partyDataService.BClicked("b2");
            })
            this.form1.reset();
        }
        
	}
    School_party: School_party[];
    update_party() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {
                sch_party_id: this.School_partyDataService.sch_party_id,
                dep_id: Number(this.selecteddepartment.dep_id),
                dep_name: this.selecteddepartment.dep_name,
                party_occ: this.party_occ,
                party_date: this.party_date,
                party_duration: Number(this.party_duration),
                party_loc: this.party_loc,
                party_sponsor: this.party_sponsor,
                party_invitees: this.party_invitees,
                external_part: this.external_part,
                party_desc: this.party_desc
            };

            this.School_partyDataService.updateParty(val).subscribe(res => {
                alert("Updated Successfully");
                this.School_partyDataService.BClicked("b2");
                
this.is_edit=false;
               
                this.is_edit=false;
            })
            this.form1.reset();
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
		
        this.School_partyDataService.aClickedEvent
            .subscribe((data: string) => {
                this.is_edit=true;
                this.sch_party_id = this.School_partyDataService.sch_party_id;
                this.dep_id = String(this.School_partyDataService.dep_id);
                this.dep_name = this.School_partyDataService.dep_name;
                this.party_occ = this.School_partyDataService.party_occ;
                this.party_date = this.School_partyDataService.party_date;
                this.party_duration = String(this.School_partyDataService.party_duration);
                this.party_loc = this.School_partyDataService.party_loc;
                this.party_sponsor = this.School_partyDataService.party_sponsor;
                this.party_invitees = this.School_partyDataService.party_invitees;
                this.external_part = this.School_partyDataService.external_part;
                this.party_desc = this.School_partyDataService.party_desc;
        
                var selected_value = String(this.School_partyDataService.dep_id);
				this.selecteddepartment = this.departments[this.departments.findIndex(function (el) {
					return el.dep_id == selected_value;})];
                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

			});
		
	}


}
