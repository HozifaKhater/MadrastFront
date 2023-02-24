import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
//import { PizzaPartyComponent } from './pizza-party.component';

import { School_year_dataDataService } from '../../../../../Services/School_year_dataDataService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-snackbar',
	templateUrl: './snackbar.component.html',
	styles: [`
	`]
})
export class SnackbarComponent implements OnInit {

	exampleBasic;
	exampleCustom;
	exampleDismissal;
    form1: FormGroup;
    constructor(
        private modalService: NgbModal,

        private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
        private _fb: FormBuilder,
        public snackBar: MatSnackBar, 
        private School_year_dataDataService: School_year_dataDataService) {
        this.form1 = this._fb.group({
            year_date_from: [{  disabled: true }, [Validators.required]],
            year_date_to: [{  disabled: true }, [Validators.required]],
           
        });
     }
     openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

    field: any;
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

    
    year_date_to: string;
    year_date_from: string;
    addFieldValue(index) {
        if (index != 0) {
            this.fieldArray.push(this.newAttribute);
            this.newAttribute = {};
        }

    }

    deleteFieldValue(index) {
        if (index != 0) {
            this.fieldArray.splice(index, 1);
        }
    }
    returned_id: any;
    add_year() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
        var val = {

            year_date_from: this.year_date_from,
            year_date_to: this.year_date_to,
        };
        this.School_year_dataDataService.addSchool_year_data(val).subscribe(res => {
            this.returned_id = res.toString(); 
            for (let i = 0; i < this.fieldArray.length; i++) {
                var val2 = {
                    year_data_id: Number(this.returned_id),
                    term_date_from: this.fieldArray[i].name,
                    term_date_to: this.fieldArray[i].name1
                   
                }
                this.School_year_dataDataService.addSchool_year_details(val2)
                .subscribe();
            }

        },error => {
            console.log();
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
        alert("Saved Successfuly");
        this.School_year_dataDataService.BClicked("");
        this.form1.reset();
        
    }}
    update_year() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {

            var val = {
                year_data_id: Number(this.School_year_dataDataService.year_data_id),
                year_date_from: this.year_date_from,
                year_date_to: this.year_date_to,

            };

        this.School_year_dataDataService.updateSchool_year_data (val).subscribe(res => {
            alert("Updated Succesfully");

            this.School_year_dataDataService.deleteSchool_year_details(Number(this.School_year_dataDataService.year_data_id)).subscribe(res => {
               
                    this.returned_id = res.toString(); 
                    for (let i = 0; i < this.fieldArray.length; i++) {
                        var val2 = {
                            year_data_id: Number(this.School_year_dataDataService.year_data_id),
                            term_date_from: this.fieldArray[i].name,
                            term_date_to: this.fieldArray[i].name1
                           
                        }
                        this.School_year_dataDataService.addSchool_year_details(val2)
                        .subscribe();
                        
                    }

                
            })
            this.School_year_dataDataService.BClicked("");
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

    }}
    
    year_data_id: any;
    year_details_info:any[];

	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();

			}); 

        this.School_year_dataDataService.aClickedEvent
            .subscribe((data: string) => {
              
                this.year_data_id = Number(this.School_year_dataDataService.year_data_id);
                this.year_date_from = this.School_year_dataDataService.year_date_from;
                this.year_date_to = this.School_year_dataDataService.year_date_to;
                this.School_year_dataDataService.GetAllSchool_year_data_details_with_year_id(this.School_year_dataDataService.year_data_id).subscribe(data => {this.year_details_info = data},
                    error => console.log(),
                    () => {
                        this.fieldArray.splice(0, this.fieldArray.length);
                        this.year_details_info.forEach(item => {
                        this.fieldArray.push({
                            name: item.term_date_from,
                            name1: item.term_date_to
                        });

                        // open modal
                        var ele = document.getElementById('modalOpener');
                        if (ele) { ele.click() }

                    });
                    }


                );
            })
	}
}
