/// <reference path="../snackbar/pizza-party.component.ts" />
import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Visit_typesDataService } from '../../../../../Services/visit_typesDataService';
import { Visity_typesMaster,Visit_types } from '../../../../../Visit_typesMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-material-tooltip',
	templateUrl: './material-tooltip.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialTooltipComponent implements OnInit {

	exampleBasic;
	exampleCustomPosition;
	exampleShowHigh;
	exampleDelay;
    exampleManually;
    visit_type_id: any;
    visit_type_name: any;
    is_visit_date: any;
    visit_date: any;
    is_phone: any;
    phone_label: any;
    is_start_time: any;
    start_time_label: any;
    is_end_time: any;
    end_time_label: any;
    is_name: any;
    name_label: any;
    is_topic: any;
    topic_label: any;
    is_instructions: any;
    instructions_label: any;
    is_job: any;
    job_label: any;
    is_notes: any;
    notes_label: any;
    is_dep: any;
    dep_label: any;
    is_vnote: any;
    vnote_label: any;
    is_vpic: any;
    vpic_label: any;
    test1: any;
    visit_types_name: any;
    is_visit_date_check: any;
    is_phone_check: any;
    is_start_time_check: any;
    is_end_time_check: any;
    is_name_check: any;
    is_topic_check: any;
    is_instructions_check: any;
    is_job_check: any;
    is_notes_check: any;
    is_dep_check: any;
    is_vnote_check: any;
    is_vpic_check: any;
    is_emp_from: any;
    emp_from_label: any;
    is_emp_to: any;
    emp_to_label: any;
    is_takeem: any;
    takeem_label: any;
    is_emp_from_check:any;
    is_emp_to_check: any;
    is_takeem_check: any;
    onChildButtonClick() { }
    is_phone_chck_change: any
    is_vpic_chck_change: any;
    form1: FormGroup;
    constructor(
        private modalService: NgbModal,
        private cdRef:ChangeDetectorRef,
        public _fb: FormBuilder,
        private router: Router, private user_privDataService: user_privDataService,
        private Visit_typesDataService: Visit_typesDataService) {
           
            this.form1 = this._fb.group({
    
            });

        this.visit_date = "تاريخ الزياره"

        this.phone_label = "الهاتف"
        this.start_time_label = "وقت بدء الزياره"
        this.end_time_label = "وقت نهايه الزياره"
        this.name_label = "اسم لزائر"
        this.topic_label = "موضوع الزياره"
        this.instructions_label="توجيهات يراها الموجه الفنى"
        this.job_label = "الوظيفه"
        this.notes_label="الملاحظات الفنيه"
        this.dep_label = "القسم"
        this.vnote_label = "vNote"
        this.vpic_label="vPic"
        this.emp_from_label="المعلم الزائر"
        this.emp_to_label="المعلم المستضيف"
        this.takeem_label="تقييم المعلم"
    }
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
    is_visit_date_change(event)
    {
        if (event.checked == true) {
            this.is_visit_date = 1;
        }
        if (event.checked === false) {
            this.is_visit_date = 0;
        }
    }
    is_phone_change(event) {
        if (event.checked == true) {
            this.is_phone = 1;
        }
        if (event.checked === false) {
            this.is_phone = 0;
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
   is_name_change(event) {
        if (event.checked == true) {
            this.is_name = 1;
        }
        if (event.checked === false) {
            this.is_name = 0;
        }
    }
   is_topic_change(event) {
        if (event.checked == true) {
            this.is_topic = 1;
        }
        if (event.checked === false) {
            this.is_topic = 0;
        }
    }
    is_instructions_change(event) {
        if (event.checked == true) {
            this.is_instructions = 1;
        }
        if (event.checked === false) {
            this.is_instructions = 0;
        }
    }
   is_job_change(event) {
        if (event.checked == true) {
            this.is_job = 1;
        }
        if (event.checked === false) {
            this.is_job = 0;
        }
    }
   is_notes_change(event) {
        if (event.checked == true) {
            this.is_notes = 1;
        }
        if (event.checked === false) {
            this.is_notes = 0;
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
   is_vnote_change(event) {
        if (event.checked == true) {
            this.is_vnote = 1;
        }
        if (event.checked === false) {
            this.is_vnote = 0;
        }
    }
    is_vpic_change(event) {
        if (event.checked == true) {
            this.is_vpic = 1;
        }
        if (event.checked === false) {
            this.is_vpic = 0;
        }
    }
    is_emp_from_change(event) {
        if (event.checked == true) {
            this.is_emp_from = 1;
        }
        if (event.checked === false) {
            this.is_emp_from = 0;
        }
    }
    is_emp_to_change(event) {
        if (event.checked == true) {
            this.is_emp_to = 1;
        }
        if (event.checked === false) {
            this.is_emp_to = 0;
        }
    }
    is_takeem_change(event) {
        if (event.checked == true) {
            this.is_takeem = 1;
        }
        if (event.checked === false) {
            this.is_takeem = 0;
        }
    }
    is_edit:boolean=false;
	position = 'before';
    add() {
        
        var val = {
            visit_type_name: this.visit_type_name,
            is_visit_date: this.is_visit_date,
            visit_date: this.visit_date,
            is_phone: this.is_phone,
            phone_label: this.phone_label,
            is_start_time: this.is_start_time,
            start_time_label: this.start_time_label,
            is_end_time: this.is_end_time,
            end_time_label: this.end_time_label,
            is_name: this.is_name,
            name_label: this.name_label,
            is_topic: this.is_topic,
            topic_label: this.topic_label,
            is_instructions: this.is_instructions,
            instructions_label: this.instructions_label,
            is_job: this.is_job,
            job_label: this.job_label,
            is_notes: this.is_notes,
            notes_label: this.notes_label,
            is_dep: this.is_dep,
            dep_label: this.dep_label,
            is_vnote: this.is_vnote,
            vnote_label: this.vnote_label,
            is_vpic: this.is_vpic,
            vpic_label: this.vpic_label,
            is_emp_from: this.is_emp_from,
            emp_from_label: this.emp_from_label,
            is_emp_to: this.is_emp_to,
            emp_to_label: this.emp_to_label,
            is_takeem: this.is_takeem,
            takeem_label: this.takeem_label,



        };

        this.Visit_typesDataService.addvisit_types(val).subscribe(res => {
            alert("Added Successfully");
            this.Visit_typesDataService.BClicked("");
            
        })
    }
    butDisabled: boolean;
    update() {
        var val = {
            visit_type_id : this.Visit_typesDataService.visit_type_id,
            visit_type_name: this.visit_type_name,
            is_visit_date: this.is_visit_date,
            visit_date: this.visit_date,
            is_phone: this.is_phone,
            phone_label: this.phone_label,
            is_start_time: this.is_start_time,
            start_time_label: this.start_time_label,
            is_end_time: this.is_end_time,
            end_time_label: this.end_time_label,
            is_name: this.is_name,
            name_label: this.name_label,
            is_topic: this.is_topic,
            topic_label: this.topic_label,
            is_instructions: this.is_instructions,
            instructions_label: this.instructions_label,
            is_job: this.is_job,
            job_label: this.job_label,
            is_notes: this.is_notes,
            notes_label: this.notes_label,
            is_dep: this.is_dep,
            dep_label: this.dep_label,
            is_vnote: this.is_vnote,
            vnote_label: this.vnote_label,
            is_vpic: this.is_vpic,
            vpic_label: this.vpic_label,
            is_emp_from: this.is_emp_from,
            emp_from_label: this.emp_from_label,
            is_emp_to: this.is_emp_to,
            emp_to_label: this.emp_to_label,
            is_takeem: this.is_takeem,
            takeem_label: this.takeem_label
        };

        this.Visit_typesDataService.updatevisit_types(val).subscribe(res => {
            alert("Updated Successfully");
            this.Visit_typesDataService.BClicked("");
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


        
        this.Visit_typesDataService.aClickedEvent
            .subscribe((data: string) => {
                this.is_edit=true;
                this.visit_type_id = this.Visit_typesDataService.visit_type_id;
                this.visit_type_name = this.Visit_typesDataService.visit_type_name;
                this.is_visit_date_check = this.Visit_typesDataService.is_visit_date;
                this.visit_date = this.Visit_typesDataService.visit_date;
                this.is_phone_check = this.Visit_typesDataService.is_phone;
                this.phone_label = this.Visit_typesDataService.phone_label;
                this.is_start_time_check = this.Visit_typesDataService.is_start_time;
                this.start_time_label = this.Visit_typesDataService.start_time_label;
                this.is_end_time_check = this.Visit_typesDataService.is_end_time;
                this.end_time_label = this.Visit_typesDataService.end_time_label;
                this.is_name_check = this.Visit_typesDataService.is_name;
                this.name_label = this.Visit_typesDataService.name_label;
                this.is_topic_check = this.Visit_typesDataService.is_topic;
                this.topic_label = this.Visit_typesDataService.topic_label;
                this.is_instructions_check = this.Visit_typesDataService.is_instructions;
                this.instructions_label = this.Visit_typesDataService.instructions_label;
                this.is_job_check = this.Visit_typesDataService.is_job;
                this.job_label = this.Visit_typesDataService.job_label;
                this.is_notes_check = this.Visit_typesDataService.is_notes;
                this.notes_label = this.Visit_typesDataService.notes_label;
                this.is_dep_check = this.Visit_typesDataService.is_dep;
                this.dep_label = this.Visit_typesDataService.dep_label;
                this.is_vnote_check = this.Visit_typesDataService.is_vnote;
                this.vnote_label = this.Visit_typesDataService.vnote_label;
                this.is_vpic_check = this.Visit_typesDataService.is_vpic;
                this.vpic_label = this.Visit_typesDataService.vpic_label;
                this.is_emp_from_check = this.Visit_typesDataService.is_emp_from;
                this.emp_from_label = this.Visit_typesDataService.emp_from_label;
                this.is_emp_to_check = this.Visit_typesDataService.is_emp_to;
                this.emp_to_label = this.Visit_typesDataService.emp_to_label;
                this.is_takeem_check = this.Visit_typesDataService.is_takeem;
                this.takeem_label = this.Visit_typesDataService.takeem_label;


                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

            });
           
	}
}
