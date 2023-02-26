import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Mra7lDataService } from '../../../../../Services/Mra7lDataService';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-ripples',
	templateUrl: './ripples.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RipplesComponent implements OnInit {
	@Input() mra7l_data: any;
	mr7la_id: number;
	mr7la_name: string = "";
	mr7la_code: number;
	mr7la_desc: string = "";

	exampleBasic;
    is_edit:boolean=false;
	centered = false;
  	disabled = false;
  	unbounded = false;

  	radius: number;
  	color: string;
    form1: FormGroup;
    constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder, private Mra7lDataService: Mra7lDataService) {
			
        this.form1 = this._fb.group({
            mr7la_name: ['', [Validators.required]],
			mr7la_code: [],
			mr7la_desc: []
        });
    }
	openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }

	add_mra7l() {
		
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {
                mr7la_name: this.mr7la_name,
                mr7la_code: this.mr7la_code,
                mr7la_desc: this.mr7la_desc
            };
            this.Mra7lDataService.addMra7l(val).subscribe(res => {
				alert("Added Successfully");
				this.Mra7lDataService.BClicked("b2");
            })
            this.form1.reset();
        }
	}

	update_mra7l() {
        if (this.form1.invalid) {
			this.form1.markAllAsTouched();
        } else {
            var val = {
                mr7la_id: this.mr7la_id,
                mr7la_name: this.mr7la_name,
                mr7la_code: this.mr7la_code,
                mr7la_desc: this.mr7la_desc
            };

     

		this.Mra7lDataService.updateMra7l(val).subscribe(res => {
			alert(res.toString());
			this.Mra7lDataService.BClicked("b2");
			
			this.is_edit=false;
		})
            this.form1.reset();
        }

	}
    cancel_mra7l() {
        this.form1.reset();
		
		this.is_edit=false;
	}

	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();

			});
		

		this.Mra7lDataService.aClickedEvent
			.subscribe((data: string) => {
				
				this.is_edit=true;
				this.mr7la_id = Number(this.Mra7lDataService.mr7la_id);
				this.mr7la_name = this.Mra7lDataService.mr7la_name;
				this.mr7la_code = Number(this.Mra7lDataService.mr7la_code);
				this.mr7la_desc = this.Mra7lDataService.mr7la_desc;

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
		


	}

}
