/// <reference path="../snackbar/pizza-party.component.ts" />
import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { meeting_typeDataService } from '../../../../../Services/meeting_typeDataService';
import { meeting_type,meeting_typeMaster} from '../../../../../meeting_typeMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-meeting_type',
	templateUrl: './meeting_type.component.html',
	
})
export class meeting_typeComponent implements OnInit {
    is_edit:boolean=false;
	exampleBasic;
	exampleCustomPosition;
	exampleShowHigh;
	exampleDelay;
    exampleManually;
    	meeting_type_id	:	any;
    	meeting_type_name	:	any;
    	is_meeting_date	:	any=0;
    	meeting_date	:	any;
    	is_group_name	:	any=0;
    	group_name	:	any;
    	is_start_time	:	any=0;
    	start_time_label	:	any;
    	is_end_time	:	any=0;
    	end_time_label	:	any;
    	is_group_number	:	any=0;
    	group_number_label	:	any;
    	is_meeting_mem_no	:	any=0;
    	meeting_mem_no_label	:	any;
    	is_meeting_loc	:	any=0;
    	meeting_loc_label	:	any;
    	is_work_plan	:	any=0;
    	work_plan_label	:	any;
    	is_recommendation	:	any=0;
    	recommendation_label	:	any;
    	is_dep	:	any=0;
    	dep_label	:	any;
    	is_subject	:	any=0;
    	subject_label	:	any;
    	is_abscence	:	any=0;
    	abscence_label	:	any;
    	is_course	:	any=0;
    	course_label	:	any;
    	is_content	:	any=0;
    	content_label	:	any ;
    
        is_meeting_date_date_check:any;
        is_group_name_check:any;
        is_start_time_check:any;
        is_end_time_check:any;
        is_group_number_check:any;
        is_meeting_mem_no_check:any;
        is_meeting_loc_check:any;
        is_work_plan_check:any;
        is_recommendation_check:any;
        is_dep_check:any;
        is_subject_check:any;
        is_abscence_check:any;
        is_course_check:any;
        is_content_check:any;
        form1: FormGroup;
        
    onChildButtonClick() { }
    is_phone_chck_change: any
    is_vpic_chck_change: any;
    constructor(
        private modalService: NgbModal,
        private cdRef:ChangeDetectorRef,
        public _fb: FormBuilder,
		private router: Router, private user_privDataService: user_privDataService,
        private meeting_typeDataService: meeting_typeDataService) {

            this.form1 = this._fb.group({

            });
        this.meeting_date = "تاريخ الاجتماع"
        this.start_time_label = "وقت بدء الاجتماع"
        this.end_time_label = "وقت نهايه الاجتماع"
        this.group_name= "اسم المجموعه"
        this.group_number_label = "رقم الاجتماع"
        this.meeting_mem_no_label = "عدد الحاضرين"
        this.meeting_loc_label = "مكان الاجتماع"
        this.work_plan_label = " جدول الاعمال "
        this.recommendation_label = "أهم التوصيات"
        this.end_time_label = "أهم التوصيات"
        this.dep_label = "القسم"
        this.subject_label = "الماده"
        this.course_label = "الحصه"

        this.content_label = "محضر الاجتماع"
        this.abscence_label = "الغياب"
      
    }

    is_course_change:any;
    is_content_change:any;
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
    is_meeting_date_change(event)
    {
        if (event.checked == true) {
            this.is_meeting_date = 1;
        }
        if (event.checked === false) {
            this.is_meeting_date = 0;
        }
    }
    is_group_name_chck_change(event) {
        if (event.checked == true) {
            this.is_group_name = 1;
        }
        if (event.checked === false) {
            this.is_group_name = 0;
        }
    }
   is_start_time_change(event) {
        if (event.checked == true) {
            this.is_start_time = 1;
        }
        if (event.checked === false) {
            this.is_start_time = 0;
        }
    }

    is_end_time_change(event) {
        if (event.checked == true) {
            this.is_end_time = 1;
        }
        if (event.checked === false) {
            this.is_end_time = 0;
        }
    }
    is_group_number_change(event) {
        if (event.checked == true) {
            this.is_group_number = 1;
        }
        if (event.checked === false) {
            this.is_group_number = 0;
        }
    }
    is_meeting_mem_no_change(event) {
        if (event.checked == true) {
            this.is_meeting_mem_no = 1;
        }
        if (event.checked === false) {
            this.is_meeting_mem_no = 0;
        }
    }
    is_meeting_loc_change(event) {
        if (event.checked == true) {
            this.is_meeting_loc = 1;
        }
        if (event.checked === false) {
            this.is_meeting_loc = 0;
        }
    }
    is_work_plan_change(event) {
        if (event.checked == true) {
            this.is_work_plan = 1;
        }
        if (event.checked === false) {
            this.is_work_plan = 0;
        }
    }
    is_recommendation_change(event) {
        if (event.checked == true) {
            this.is_recommendation = 1;
        }
        if (event.checked === false) {
            this.is_recommendation = 0;
        }
    }
   is_dep_change(event) {
        if (event.checked == true) {
            this.is_dep = 1;
        }
        if (event.checked === false) {
            this.is_dep = 0;
        }
    }
    is_subject_change(event) {
        if (event.checked == true) {
            this.is_subject = 1;
        }
        if (event.checked === false) {
            this.is_subject = 0;
        }
    }
    is_abscence_chck_change(event) {
        if (event.checked == true) {
            this.is_abscence = 1;
        }
        if (event.checked === false) {
            this.is_abscence = 0;
        }
    }
	position = 'before';
    add() {
        
        var val = {

            meeting_type_name: String(this.meeting_type_name),
            is_meeting_date: Number(this.is_meeting_date),
            meeting_date: String(this.meeting_date),
            is_group_name: Number(this.is_group_name),
            group_name: String(this.group_name),
            is_start_time: Number(this.is_start_time),
            start_time_label: String(this.start_time_label),
            is_end_time: Number(this.is_end_time),
            end_time_label: String(this.end_time_label),
            is_group_number: Number(this.is_group_number),
            group_number_label: String(this.group_number_label),
            is_meeting_mem_no: Number(this.is_meeting_mem_no),
            meeting_mem_no_label: String(this.meeting_mem_no_label),
            is_meeting_loc: Number(this.is_meeting_loc),
            meeting_loc_label: String(this.meeting_loc_label),
            is_work_plan: Number(this.is_work_plan),
            work_plan_label: String(this.work_plan_label),
            is_recommendation: Number(this.is_recommendation),
            recommendation_label: String(this.recommendation_label),
            is_dep: Number(this.is_dep),
            dep_label: String(this.dep_label),
            is_subject: Number(this.is_subject),
            subject_label: String(this.subject_label),
            is_abscence: Number(this.is_abscence),
            abscence_label: String(this.abscence_label),
            is_course: Number(this.is_course),
            course_label: String(this.course_label),
            is_content: Number(this.is_content),
            content_label: String(this.content_label),
           


        };
        this.meeting_typeDataService.save_in_meeting_type(val).subscribe(res => {
            alert("Added Successfully");
            this.meeting_typeDataService.BClicked("");
        })
    }

    butDisabled: boolean;
    update() {
        var val = {
            meeting_type_id	: Number(this.meeting_typeDataService.meeting_type_id)	,
            meeting_type_name: String(this.meeting_type_name),
            is_meeting_date: String(this.is_meeting_date),
            meeting_date: String(this.meeting_date),
            is_group_name: String(this.is_group_name),
            group_name: String(this.group_name),
            is_start_time: String(this.is_start_time),
            start_time_label: String(this.start_time_label),
            is_end_time: String(this.is_end_time),
            end_time_label: String(this.end_time_label),
            is_group_number: String(this.is_group_number),
            group_number_label: String(this.group_number_label),
            is_meeting_mem_no: String(this.is_meeting_mem_no),
            meeting_mem_no_label: String(this.meeting_mem_no_label),
            is_meeting_loc: String(this.is_meeting_loc),
            meeting_loc_label: String(this.meeting_loc_label),
            is_work_plan: String(this.is_work_plan),
            work_plan_label: String(this.work_plan_label),
            is_recommendation: String(this.is_recommendation),
            recommendation_label: String(this.recommendation_label),
            is_dep: String(this.is_dep),
            dep_label: String(this.dep_label),
            is_subject: String(this.is_subject),
            subject_label: String(this.subject_label),
            is_abscence: String(this.is_abscence),
            abscence_label: String(this.abscence_label),
            is_course: String(this.is_course),
            course_label: String(this.course_label),
            is_content: String(this.is_content),
            content_label: String(this.content_label),
            
        };

        this.meeting_typeDataService.update_meeting_type(val).subscribe(res => {
            alert("Updated Successfully");
            this.meeting_typeDataService.BClicked("");
            this.is_edit=false;
        })

    }
   

    priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();

			}); 


        this.meeting_typeDataService.aClickedEvent
            .subscribe((data: string) => {
                this.is_edit=true;
                this.meeting_type_id = this.meeting_typeDataService.meeting_type_id;
                this.meeting_type_name = this.meeting_typeDataService.meeting_type_name;
                this.is_meeting_date_date_check = this.meeting_typeDataService.is_meeting_date;
                this.meeting_date = this.meeting_typeDataService.meeting_date;
                this.is_group_name_check = this.meeting_typeDataService.is_group_name;
                this.group_name = this.meeting_typeDataService.group_name;
                this.is_start_time_check = this.meeting_typeDataService.is_start_time;
                this.start_time_label = this.meeting_typeDataService.start_time_label;
                this.is_end_time_check = this.meeting_typeDataService.is_end_time;
                this.end_time_label = this.meeting_typeDataService.end_time_label;
                this.is_group_number_check = this.meeting_typeDataService.is_group_number;
                this.group_number_label = this.meeting_typeDataService.group_number_label;
                this.is_meeting_mem_no_check = this.meeting_typeDataService.is_meeting_mem_no;
                this.meeting_mem_no_label = this.meeting_typeDataService.meeting_mem_no_label;
                this.is_meeting_loc_check = this.meeting_typeDataService.is_meeting_loc;
                this.meeting_loc_label = this.meeting_typeDataService.meeting_loc_label;
                this.is_work_plan_check = this.meeting_typeDataService.is_work_plan;
                this.work_plan_label = this.meeting_typeDataService.work_plan_label;
                this.is_recommendation_check = this.meeting_typeDataService.is_recommendation;
                this.recommendation_label = this.meeting_typeDataService.recommendation_label;
                this.is_dep_check = this.meeting_typeDataService.is_dep;
                this.dep_label = this.meeting_typeDataService.dep_label;
                this.is_subject_check = this.meeting_typeDataService.is_subject;
                this.subject_label = this.meeting_typeDataService.subject_label;
                this.is_abscence_check = this.meeting_typeDataService.is_abscence;
                this.abscence_label = this.meeting_typeDataService.abscence_label;
                this.is_course_check = this.meeting_typeDataService.is_course;
                this.course_label = this.meeting_typeDataService.course_label;
                this.is_content_check = this.meeting_typeDataService.is_content;
                this.content_label = this.meeting_typeDataService.content_label;
                


                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }
                
                

            });
	}
}
