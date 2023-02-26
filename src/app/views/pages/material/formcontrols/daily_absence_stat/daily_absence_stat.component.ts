import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { School_partyDataService } from '../../../../../Services/School_partyDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { School_partyMaster, School_party } from '../../../../../School_partyMaster.Model';
import { Daily_absence_statMaster, Daily_absence_stat } from '../../../../../Daily_absence_statMaster.Model';
import { Daily_absence_statDataService } from '../../../../../Services/Daily_absence_statDataService';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { Levels, LevelsMaster } from '../../../../../LevelsMaster.Model';
import * as def from '../../../../../definationsMaster.Model';
import { Router } from '@angular/router';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { user_privDataService } from '../../../../../Services/user_privDataService ';

@Component({ 
	selector: 'kt-dailystat',
    templateUrl: './daily_absence_stat.component.html',
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
export class DailystatpartyComponent implements OnInit {
	@Input() parties_data: any;
    absence_stat_id: number;
    lev_id: string="";
    lev_name: string = "";
    tch3eb: string = "";
    total_num: string = "";
    attendance_num: string = "";
    absence_num: string = "";
    stu_att_score: string = "";
    teach_total_num: string = "";
    teach_attend: string = "";
    teach_absence: string = "";
    teach_att_score: string = "";
    tch3eb_id: string = "";
    selectedbranch: any;
    selectedlevels: any;
    branch: def.branch[];
    is_edit:boolean=false;

    Levels: Levels[];
    Daily_absence_statMaster: Daily_absence_statMaster[];
	
    form1: FormGroup;
    constructor(
        private cdRef: ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        private modalService: NgbModal,
        public _fb: FormBuilder, 
        private LevelsDataService: LevelsDataService,
        private Daily_absence_statDataService: Daily_absence_statDataService, 
        EmployeeService: EmployeeDataService) {
            this.form1 = this._fb.group({         
                selectedlevels: ['', [Validators.required]],
                selectedbranch: ['', [Validators.required]],
                absence_num: ['', [Validators.required]],
                teach_absence: ['', [Validators.required]]
    
            });
            LevelsDataService.GetAllLevels().subscribe(data => this.Levels = data,
                error => console.log());

            EmployeeService.Getdefinations_with_scode("branch").subscribe(data => this.branch = data,
                error => console.log());

	}
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }

    add_dailystat() {

        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {

                lev_id: Number(this.selectedlevels.lev_id),
                lev_name: this.selectedlevels.lev_name,
                tch3eb_id: Number(this.selectedbranch.def_id),
                tch3eb: this.selectedbranch.def_name,
                total_num: this.total_num,
                attendance_num: this.attendance_num,
                absence_num: this.absence_num,
                stu_att_score: this.stu_att_score,
                teach_total_num: this.teach_total_num,
                teach_attend: this.teach_attend,
                teach_absence: this.teach_absence,
                teach_att_score: this.teach_att_score
            };
            this.Daily_absence_statDataService.addDailystat(val).subscribe(res => {
                alert("Saved Successfuly");
                this.Daily_absence_statDataService.BClicked("b2");
            })
            this.form1.reset();
        }
        
	}

    Daily_absence_stat: Daily_absence_stat[];
    update_dailystat() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {
                absence_stat_id: this.Daily_absence_statDataService.absence_stat_id,
                lev_id: Number(this.selectedlevels.lev_id),
                lev_name: this.selectedlevels.lev_name,
                tch3eb_id: Number(this.selectedbranch.def_id),
                tch3eb: this.selectedbranch.def_name,
                total_num: this.total_num,
                attendance_num: this.attendance_num,
                absence_num: this.absence_num,
                stu_att_score: this.stu_att_score,
                teach_total_num: this.teach_total_num,
                teach_attend: this.teach_attend,
                teach_absence: this.teach_absence,
                teach_att_score: this.teach_att_score
            };

            this.Daily_absence_statDataService.updateDailystat(val).subscribe(res => {
                alert("Updated Successfully");
                this.Daily_absence_statDataService.BClicked("b2");
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

        this.Daily_absence_statDataService.aClickedEvent
            .subscribe((data: string) => {
                this.is_edit=true;

                var selected_levels = String(this.Daily_absence_statDataService.lev_id);
                this.selectedlevels = this.Levels[this.Levels.findIndex(function (el) {
                    return String(el.lev_id) == selected_levels;
                })];

                var selected_branch = String(this.Daily_absence_statDataService.tch3eb_id);
                this.selectedbranch = this.branch[this.branch.findIndex(function (el) {
                    return String(el.def_id) == selected_branch;
                })];
				
                this.absence_stat_id = this.Daily_absence_statDataService.absence_stat_id;
                this.lev_id = String(this.Daily_absence_statDataService.lev_id);
                this.lev_name = this.Daily_absence_statDataService.lev_name;
                this.tch3eb = this.Daily_absence_statDataService.tch3eb;
                this.total_num = String(this.Daily_absence_statDataService.total_num);
                this.attendance_num = String(this.Daily_absence_statDataService.attendance_num);
                this.absence_num = String(this.Daily_absence_statDataService.absence_num);
                this.stu_att_score = String(this.Daily_absence_statDataService.stu_att_score);
                this.teach_total_num = String(this.Daily_absence_statDataService.teach_total_num);
                this.teach_attend = String(this.Daily_absence_statDataService.teach_attend);
                this.teach_absence = String(this.Daily_absence_statDataService.teach_absence);
                this.teach_att_score = String(this.Daily_absence_statDataService.teach_att_score);
                this.tch3eb_id = String(this.Daily_absence_statDataService.tch3eb_id);

                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

			});
		
	}


}
