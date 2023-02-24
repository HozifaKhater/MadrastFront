/// <reference path="../snackbar/pizza-party.component.ts" />
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { board_typeDataService } from '../../../../../Services/board_typeDataService';
import { board_typeMaster,board_type } from '../../../../../board_typeMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
@Component({
	selector: 'kt-board_type',
	templateUrl: './board_type.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class board_typeComponent implements OnInit {

	exampleBasic;
	exampleCustomPosition;
	exampleShowHigh;
	exampleDelay;
    exampleManually;
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
    dob: any;
    notes: any;

    is_student_check: any;
    is_rank_check: any;
    is_parent_name_check: any;
    is_parent_job_check: any;
    is_address_check: any;
    is_mobile_check: any;
    is_mobile2_check: any;
    is_dep_check: any;
    is_job_check: any;
    is_emp_check: any;
   
    job_label:any;
    dep_label:any;
    onChildButtonClick() { }
    is_phone_chck_change: any
    is_vpic_chck_change: any;
    constructor(private router: Router, private user_privDataService: user_privDataService,
        private board_typeDataService: board_typeDataService) {
        this.label_student = "الطالب"

        this.label_rank = "المركز"
        this.label_parent_name = "اسم ولى الامر"
        this.label_parent_job = "وظيفه ولى الامر"
        this.label_address = "عنوان"
        this.label_mobile = "هاتف المنزل"
        this.label_mobile2="هاتف العمل"
        this.dep_name = "الفسم"
        this.label_job="الوظيفه"
        this.label_emp = "اسم الموظف"
       
      //  this.test1="بررر"
    }
    //dep_check: any=1;
    is_student_change(event)
    {
        console.log(event)
        if (event.checked == true) {
            this.is_student = 1;
           // (<HTMLInputElement>document.getElementById("visit_date_id")).setAttribute('disabled','false')
        }
        if (event.checked === false) {
            this.is_student = 0;
           // (<HTMLInputElement>document.getElementById("visit_date_id")).setAttribute('disabled', 'true')
        }
    }
    is_rank_change(event) {
        console.log(event)
        if (event.checked == true) {
            this.is_rank = 1;
     //       (<HTMLImageElement>document.getElementById("is_phone_id")).setAttribute('disabled', 'false')
        }
        if (event.checked === false) {
            this.is_rank = 0;
      //      (<HTMLImageElement>document.getElementById("is_phone_id")).setAttribute('disabled', 'true')
        }
    }
    is_parent_name_change(event) {
        console.log(event)
        if (event.checked == true) {
            this.is_parent_name= 1;
        //    (<HTMLImageElement>document.getElementById("is_start_time_id")).setAttribute('disabled', 'false')
        }
        if (event.checked === false) {
            this.is_parent_name = 0;
           // (<HTMLImageElement>document.getElementById("is_start_time_id")).setAttribute('disabled', 'true')
        }
    }

    is_parent_job_change(event) {
        console.log(event)
        if (event.checked == true) {
            this.is_parent_job = 1;
           // (<HTMLImageElement>document.getElementById("is_end_time_id")).setAttribute('disabled', 'false')
        }
        if (event.checked === false) {
            this.is_parent_job = 0;
         //   (<HTMLImageElement>document.getElementById("is_end_time_id")).setAttribute('disabled', 'true')
        }
    }
    is_address_change(event) {
        console.log(event)
        if (event.checked == true) {
            this.is_address = 1;
          //  (<HTMLImageElement>document.getElementById("is_name_id")).setAttribute('disabled', 'false')
        }
        if (event.checked === false) {
            this.is_address = 0;
          //  (<HTMLImageElement>document.getElementById("is_name_id")).setAttribute('disabled', 'true')
        }
    }
    is_mobile_change(event) {
        console.log(event)
        if (event.checked == true) {
            this.is_mobile = 1;
         //   (<HTMLImageElement>document.getElementById("is_topic_id")).setAttribute('disabled', 'false')
        }
        if (event.checked === false) {
            this.is_mobile = 0;
          //  (<HTMLImageElement>document.getElementById("is_topic_id")).setAttribute('disabled', 'true')
        }
    }
    is_mobile2_change(event) {
        console.log(event)
        if (event.checked == true) {
            this.is_mobile2 = 1;
          //  (<HTMLImageElement>document.getElementById("is_instructions_id")).setAttribute('disabled', 'false')
        }
        if (event.checked === false) {
            this.is_mobile2 = 0;
         //   (<HTMLImageElement>document.getElementById("is_instructions_id")).setAttribute('disabled', 'true')
        }
    }
    is_dep_change(event) {
        console.log(event)
        if (event.checked == true) {
            this.is_dep = 1;
          //  (<HTMLImageElement>document.getElementById("is_dep_id")).setAttribute('disabled', 'false')
        }
        if (event.checked === false) {
            this.is_dep = 0;
          //  (<HTMLImageElement>document.getElementById("is_dep_id")).setAttribute('disabled', 'true')
        }
    }
   is_job_change(event) {
        console.log(event)
        if (event.checked == true) {
            this.is_job = 1;
          //  (<HTMLImageElement>document.getElementById("is_job_id")).setAttribute('disabled', 'false')
        }
        if (event.checked === false) {
            this.is_job = 0;
          //  (<HTMLImageElement>document.getElementById("is_job_id")).setAttribute('disabled', 'true')
        }
    }
    is_emp_change(event) {
        console.log(event)
        if (event.checked == true) {
            this.is_emp = 1;
           // (<HTMLImageElement>document.getElementById("is_notes_id")).setAttribute('disabled', 'false')
        }
        if (event.checked === false) {
            this.is_emp = 0;
         //   (<HTMLImageElement>document.getElementById("is_notes_id")).setAttribute('disabled', 'true')
        }
    }
 
  
	position = 'before';
    add() {
        //var test1
        //test1 = this.departments[this.selecteddepartment]
        //var schoolterm
        //schoolterm = this.activities[this.activity_school_term]
        var val = {
           // board_type_id	: this.	board_type_id	,
            board_type_name: this.board_type_name,
            is_student: this.is_student,
            label_student: this.label_student,
            is_rank: this.is_rank,
            label_rank: this.label_rank,
            is_parent_name: this.is_parent_name,
            label_parent_name: this.label_parent_name,
            is_parent_job: this.is_parent_job,
            label_parent_job: this.label_parent_job,
            is_address: this.is_address,
            label_address: this.label_address,
            is_mobile: this.is_mobile,
            label_mobile: this.label_mobile,
            is_mobile2: this.is_mobile2,
            label_mobile2: this.label_mobile2,
            is_dep: this.is_dep,
            dep_name: this.dep_name,
            is_job: this.is_job,
            label_job: this.label_job,
            is_emp: this.is_emp,
            label_emp: this.label_emp,
            
        };
        console.log("asd", val)
        this.board_typeDataService.save_in_board_type(val).subscribe(res => {
            alert(res.toString());
            this.board_typeDataService.BClicked("");
        })
        console.log(val)
    }
    butDisabled: boolean;
    update() {
        var val = {
            board_type_id	: this.board_type_id	,
           board_type_name: this.board_type_name,
           is_student: this.is_student,
           label_student: this.label_student,
           is_rank: this.is_rank,
           label_rank: this.label_rank,
           is_parent_name: this.is_parent_name,
           label_parent_name: this.label_parent_name,
           is_parent_job: this.is_parent_job,
           label_parent_job: this.label_parent_job,
           is_address: this.is_address,
           label_address: this.label_address,
           is_mobile: this.is_mobile,
           label_mobile: this.label_mobile,
           is_mobile2: this.is_mobile2,
           label_mobile2: this.label_mobile2,
           is_dep: this.is_dep,
           dep_name: this.dep_name,
           is_job: this.is_job,
           label_job: this.label_job,
           is_emp: this.is_emp,
           label_emp: this.label_emp,
        };

        console.log("val", val);


        this.board_typeDataService.update_board_type(val).subscribe(res => {
            alert(res.toString());
            this.board_typeDataService.BClicked("");
            (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
            (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
            (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
            (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
        })

    }
    cancel() {
        (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
        (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
        (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
    }
    
    priv_info:any;
	ngOnInit() {
        this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(error),
            () => {console.log("privvv",this.priv_info);
			}
	); 

        (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
        this.board_typeDataService.aClickedEvent
            .subscribe((data: string) => {
                console.log("edited");
                (<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
                (<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
                (<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
                (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;

                this.board_type_id = this.board_typeDataService.board_type_id;
                this.board_type_name = this.board_typeDataService.board_type_name;
                this.is_student_check = this.board_typeDataService.is_student;
                this.label_student = this.board_typeDataService.label_student;
                this.is_rank_check = this.board_typeDataService.is_rank;
                this.label_rank = this.board_typeDataService.label_rank;
                this.is_parent_name_check = this.board_typeDataService.is_parent_name;
                this.label_parent_name = this.board_typeDataService.label_parent_name;
                this.is_parent_job_check = this.board_typeDataService.is_parent_job;
                this.label_parent_job = this.board_typeDataService.label_parent_job;
                this.is_address_check = this.board_typeDataService.is_address;
                this.label_address = this.board_typeDataService.label_address;
                this.is_mobile_check = this.board_typeDataService.is_mobile;
                this.label_mobile = this.board_typeDataService.label_mobile;
                this.is_mobile2_check = this.board_typeDataService.is_mobile2;
                this.label_mobile2 = this.board_typeDataService.label_mobile2;
                this.is_dep_check = this.board_typeDataService.is_dep;
                this.dep_name = this.board_typeDataService.dep_name;
                this.is_job_check = this.board_typeDataService.is_job;
                this.label_job = this.board_typeDataService.label_job;
                this.is_emp_check = this.board_typeDataService.is_emp;
                this.label_emp = this.board_typeDataService.label_emp;




                console.log(this.board_typeDataService.board_type_name)
                /*	document.getElementById("save_btn").innerHTML="asdasd"*/
                console.log("edited")

            });
	}
}
