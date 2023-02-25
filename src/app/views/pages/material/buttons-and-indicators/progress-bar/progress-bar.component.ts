import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-progress-bar',
	templateUrl: './progress-bar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-h2 {
		margin: 10px;
	}
	.example-section {
		display: flex;
		align-content: center;
		align-items: center;
		height: 60px;
	}

	.example-margin {
		margin: 0 10px;
	}`]
})
export class ProgressBarComponent implements OnInit {
	@Input() levels_data: any;
	lev_id: number;
	lev_name: string = "";
	lev_class_no: number;
	lev_desc: string = "";

	exampleDeterminate;
	exampleIndeterminate;
	exampleBuffer;
	exmapleQuery;
	exampleConfig;
	color = 'primary';
	mode = 'determinate';
	value = 50;
	bufferValue = 75;

    form1: FormGroup;
    constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder, private LevelsDataService: LevelsDataService) {
        this.form1 = this._fb.group({
            lev_desc: ['', [Validators.required]],
            lev_class_no: ['', [Validators.required]],
			lev_name:['', [Validators.required]],
        });

	}
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	add_level() {
		
        if (this.form1.invalid) {
			this.form1.markAllAsTouched();
        } else {
            var val = {
                lev_name: this.lev_name,
                lev_class_no: Number(this.lev_class_no),
                lev_desc: this.lev_desc
            };

			this.LevelsDataService.addLevels(val).subscribe(res => {
				alert("Added Sucessfully");
				this.LevelsDataService.BClicked("b2");
				this.form1.reset();
				
            })
            
        }
	}

	update_level() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {
                lev_id: Number(this.lev_id),
                lev_name: this.lev_name,
                lev_class_no: Number(this.lev_class_no),
                lev_desc: this.lev_desc
            };

            this.LevelsDataService.updateLevels(val).subscribe(res => {
				alert("Updated Succesfully");
				this.LevelsDataService.BClicked("b2");
                
            })
            this.form1.reset();
			this.is_edit=false;
        }
	}
    cancel_level() {
		this.form1.reset();
		this.LevelsDataService.BClicked("b2");
		this.is_edit=false;
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

		this.LevelsDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.lev_id = Number(this.LevelsDataService.lev_id);
				this.lev_name = this.LevelsDataService.lev_name;
				this.lev_class_no = Number(this.LevelsDataService.lev_class_no);
				this.lev_desc = this.LevelsDataService.lev_desc;

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});

	}
}
