
import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { corridorsDataService } from '../../../../../Services/CorridorsDataService';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-material-tabs',
	templateUrl: './material-tabs.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.demo-tab-group {
		border: 1px solid #e8e8e8;
	  }
	  .demo-tab-content {
		padding: 16px;
	  }
	`]
})
export class MaterialTabsComponent implements OnInit {
    @Input() corridors_data: any;
    corridor_id: number;
    corridor_name: string;
    corridor_desc: string = "";

    foods = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];
    isHuman: boolean = true;
    isHuman2: boolean = true;
    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;

    // Enter, comma
    separatorKeysCodes = [ENTER, COMMA];

  

    form1: FormGroup;

    constructor(
        private modalService: NgbModal,
        private cdRef:ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        public _fb: FormBuilder, private corridorsDataService: corridorsDataService) {
        this.form1 = this._fb.group({
            corridor_name: ['', [Validators.required]],
            corridor_desc: ['', [Validators.required]]
        });
    }
    is_edit:boolean=false;
    add_corridors() {
      
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {
                corridor_name: this.corridor_name,
                corridor_desc: this.corridor_desc
            };

            this.corridorsDataService.addCorridors(val).subscribe(res => {
                alert(res.toString());
                this.corridorsDataService.BClicked("b2");
                this.form1.reset();
                
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
    }

    update_corridors() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {
                corridor_id: this.corridorsDataService.corridor_id,
                corridor_name: this.corridor_name,
                corridor_desc: this.corridor_desc,

            };

            this.corridorsDataService.updateCorridors(val).subscribe(res => {
                alert(res.toString());
                this.corridorsDataService.BClicked("b2");
                this.form1.reset();
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
    }
   

    priv_info:any=[];
    ngOnInit() {
        this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();

			}); 

        this.corridorsDataService.aClickedEvent
            .subscribe((data: string) => {
                
                this.is_edit=true;
                this.corridor_id = this.corridorsDataService.corridor_id;
                this.corridor_name = this.corridorsDataService.corridor_name;
                this.corridor_desc = this.corridorsDataService.corridor_desc;
           

                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

            });
       
    }
    openModal(content: any, event: any) {

		this.modalService.open(content, { backdrop: true, size: "xl", });
	}
}

