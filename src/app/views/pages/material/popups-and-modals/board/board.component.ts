import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
//import { PizzaParty1Component } from './pizza-party.component';

import {board_type,board_typeMaster} from '../../../../../board_typeMaster.Model';
import { board_typeDataService } from '../../../../../Services/board_typeDataService';

import {board,boardMaster} from '../../../../../boardMaster.Model';
import { boardDataService } from '../../../../../Services/boardDataService';

import { Departments,DepartmentMaster } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';

import moment from 'moment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { DatePipe } from '@angular/common';


import {MasterJob} from '../../../../../MasterJobMaster.Model';
import { MasterJobsDataService } from '../../../../../Services/MasterJobsDataService';
import {Employee} from '../../../../../EmployeeMaster.Model';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import * as def from'../../../../../definationsMaster.Model';
import { DefinitionDataService } from '../../../../../Services/Definition';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
//import { PizzaPartyComponent } from '../snackbar/pizza-party.component';

@Component({
	selector: 'kt-board',
	templateUrl: './board.component.html',
	styles: [`
	`]
})
export class boardComponent implements OnInit {

    public Editor = ClassicEditor;
    @ViewChild("myEditor", { static: false }) myEditor: any;

	exampleBasic;
	exampleCustom;
	exampleDismissal;
    board_type_id: any;
    board_type_name: any;
    is_student: any;
    label_student: any;
    is_rank: any;
    label_rank: any;
    is_parent_name: any;
    label_parent_name: any;
    is_parent_job: any;
    label_parent_job: any;
    is_address: any;
    label_address: any;
    is_mobile: any;
    label_mobile: any;
    is_mobile2: any;
    label_mobile2: any;
    is_dep: any;
    dep_name: any;
    is_job: any;
    label_job: any;
    is_emp: any;
    label_emp: any;
    board_id	:string="";
    board_name	:string="";
   
    lev_id	:string="";
    lev_name	:string="";
    student_name	:string="";
    student_id	:string="";
    rank_id	:string="";
    rank_name	:string="";
    parent_name	:string="";
    parent_job	:string="";
    address	:string="";
    mobile	:string="";
    mobile2	:string="";
    dep_id	:string="";
    job_name	:string="";
    job_id	:string="";
    emp_name	:string="";
    emp_id	:string="";
    selecteddepartment:any;
    board_type: board_type[];
    departments: Departments[];
    emp: Employee[];
    job: MasterJob[];
    rank: def.rank[];
    selectedjob:any;
    selectedrank:any;
    selected_board_type:any;
    selectedemp:any;

    selected_visit_type:any;
    visit_types:any;
    is_visit_date:any;
    is_start_time:any;
    is_end_time:any;
    is_name:any;
    is_phone:any;
    is_topic:any;
    is_instructions:any;
    is_notes:any;
    is_vpic:any;
    vpic_label:any;
    
    visit_types_selection:any;
    constructor(private router: Router, private user_privDataService: user_privDataService,
        private datePipe: DatePipe,public snackBar: MatSnackBar,
        private board_typeDataService: board_typeDataService,
        private boardDataService: boardDataService,
        private DepartmentDataService: DepartmentDataService) {
        //let d = new Date();
        //this.year_date_from = String( d.getDate());
        this.board_typeDataService.get_board_type().subscribe((data:any) => this.board_type = data.data,
            error => console.log(error),
            () => { console.log("board_types dropdown", this.board_type) });
        this.DepartmentDataService.GetAlldepartment().subscribe(data => this.departments = data,
            error => console.log(error),
            () => { console.log("DepartmentDataService dropdown", this.departments) });

        let d_from = new Date();
        d_from.setDate(d_from.getDate());
       // console.log("tmr data", this.datePipe.transform(d_from, 'yyyy-MM-dd'))
        this.year_date_from = this.datePipe.transform(d_from, 'yyyy-MM-dd');

     
    }
    onFileChanged(event){}
    board_types_selection(event) {
        this.board_type_id = event.board_board_type_id;
        this.board_type_name = event.board_type_name;
        console.log("board_types dropdown change", event);
        this.board_typeDataService.get_board_type_with_id(event.board_type_id).subscribe((data:any) => this.board_type = data.data,
            error => console.log(error),
            () => {
                console.log("board_types dropdown change", this.board_type );
                
                this.is_student = this.board_type[0].is_student;
                this.label_student = this.board_type[0].label_student;
                this.is_rank = this.board_type[0].is_rank;
                this.label_rank = this.board_type[0].label_rank;
                this.is_parent_name = this.board_type[0].is_parent_name;
                this.label_parent_name = this.board_type[0].label_parent_name;
                this.is_parent_job = this.board_type[0].is_parent_job;
                this.label_parent_job = this.board_type[0].label_parent_job;
                this.is_address = this.board_type[0].is_address;
                this.label_address = this.board_type[0].label_address;
                this.is_mobile = this.board_type[0].is_mobile;
                this.label_mobile = this.board_type[0].label_mobile;
                this.is_mobile2 = this.board_type[0].is_mobile2;
                this.label_mobile2 = this.board_type[0].label_mobile2;
                this.is_job = this.board_type[0].is_job;
                this.label_job = this.board_type[0].label_job;
                this.is_emp = this.board_type[0].is_emp;
                this.label_emp = this.board_type[0].label_emp;
                this.is_dep = this.board_type[0].is_dep;
                this.dep_name = this.board_type[0].dep_name;
              
            });
    }

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	//openSnackBar2() {
	//	this.snackBar.openFromComponent(PizzaPartyComponent, {
	//	  duration: 500,
	//	});
	//}

	openSnackBar3(message: string, action: string) {
		this.snackBar.open(message, action, {
		  duration: 6500,
		});
	  }
    fieldArray: Array<any> = [
        {
            name: '',
            name1:''
           
        }
    ];
    newAttribute: any = {};

    firstField = true;
    firstFieldName = 'First Item name';
    isEditItems: boolean;

    // candidates: any[] = [
    //   {
    //     'name': 'Default Name',
    //     'title': 'Job Title',
    //   },
    //   {
    //     'name': 'Default Name 2',
    //     'title': 'Job Title',
    //   }
    // ];
    year_date_to: string;
    year_date_from: string;
    addFieldValue(index) {
        console.log("field",index)
        if (index != 0) {
            this.fieldArray.push(this.newAttribute);
            console.log("zzzzz", this.fieldArray, this.newAttribute)
            this.newAttribute = {};
        }

    }

    deleteFieldValue(index) {
        if (index != 0) {
            this.fieldArray.splice(index, 1);
            console.log("delete", index)
        }
    }
    returned_id: any;
    add_year() {

        if (this.selecteddepartment === undefined) {
           this.selecteddepartment = [{'dep_name': "", 'dep_id': 0}];
        }
// var dep_id;
// var dep_name;
// dep_id
        var val = {
            
         //   board_id: this.board_id,
            board_name: this.board_name,
            board_type_id: this.board_type_id,
            lev_id: this.lev_id,
            lev_name: this.lev_name,
            student_name: this.student_name,
            student_id: this.student_id,
            rank_id: this.rank_id,
            rank_name: this.rank_name,
            parent_name: this.parent_name,
            parent_job: this.parent_job,
            address: this.address,
            mobile: this.mobile,
            mobile2: this.mobile2,
            dep_name: this.dep_name,
            dep_id: this.dep_id,
            job_name: this.job_name,
            job_id: this.job_id,
            emp_name: this.emp_name,
            emp_id: this.emp_id,
            is_emp: this.is_emp,
            label_emp: this.label_emp,
            

        };
        console.log("asd", val)
        this.boardDataService.save_in_board(val).subscribe(res => {
          
            alert("Added Successfuly");
            this.boardDataService.BClicked("b2");
        })
        
        console.log(val)
    }
    update_year() {
        if (this.selecteddepartment === undefined) {
            this.selecteddepartment = [{'dep_name': "", 'dep_id': 0}];
         }
       
        var val = {
            board_id: this.board_id,
            board_name: this.board_name,
            board_type_id: this.board_type_id,
            lev_id: this.lev_id,
            lev_name: this.lev_name,
            student_name: this.student_name,
            student_id: this.student_id,
            rank_id: this.rank_id,
            rank_name: this.rank_name,
            parent_name: this.parent_name,
            parent_job: this.parent_job,
            address: this.address,
            mobile: this.mobile,
            mobile2: this.mobile2,
            dep_name: this.dep_name,
            dep_id: this.dep_id,
            job_name: this.job_name,
            job_id: this.job_id,
            emp_name: this.emp_name,
            emp_id: this.emp_id,
            is_emp: this.is_emp,
            label_emp: this.label_emp,


        };
        console.log("asd", val)
        this.boardDataService.update_board(val).subscribe(res => {

            alert("Added Successfuly");
            this.boardDataService.BClicked("b2");
   

         
            (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
            (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
            (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
            (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
        })
    
        

    }
    cancel_year() {
        (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
        (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
        (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
    }
    year_data_id: any;
    priv_info:any;
	ngOnInit() {
        this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(error),
            () => {console.log("privvv",this.priv_info);
			}
	); 

        (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
        /*		(<HTMLInputElement>document.getElementById("departmentsdropdown") as ).setv*/

        this.boardDataService.aClickedEvent
            .subscribe((data: string) => {
                //this.newArray = [];
                console.log("edited");
                (<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
                (<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
                (<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
                (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;

                this.board_id = this.boardDataService.board_id;
               // this.board_type_name = this.boardDataService.board_type_name;
              //  this.board_type_id = this.boardDataService.board_type_id;
                this.board_name = this.boardDataService.board_name;
                this.parent_name = this.boardDataService.parent_name;
                this.parent_job = this.boardDataService.parent_job;
                this.address = this.boardDataService.address;
                this.mobile = this.boardDataService.mobile;
                this.mobile2 = this.boardDataService.mobile2;
               


                var selected_value = this.boardDataService.board_type_id
                this.selected_board_type = this.board_type[this.board_type.findIndex(function (el) {
                    return String(el.board_type_id) == selected_value
                })];

                var selected_value = this.boardDataService.dep_id
                this.selecteddepartment = this.departments[this.departments.findIndex(function (el) {
                    return String(el.dep_id) == selected_value
                })];

                var selected_value = this.boardDataService.rank_id
                this.selectedrank = this.rank[this.rank.findIndex(function (el) {
                    return String(el.def_id) == selected_value
                })];

                var selected_value = this.boardDataService.job_id
                this.selectedjob = this.job[this.job.findIndex(function (el) {
                    return String(el.job_id) == selected_value
                })];

                var selected_value = this.boardDataService.rank_id
                this.selectedemp = this.emp[this.emp.findIndex(function (el) {
                    return String(el.emp_id) == selected_value
                })];

                console.log("year_date_from", this.board_type_name);
            })
       
	}
}
