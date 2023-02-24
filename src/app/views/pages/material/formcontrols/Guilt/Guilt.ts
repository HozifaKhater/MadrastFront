import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccusedStudentService } from '../../../../../Services/AccusedStudentService';
import { GuiltServices } from '../../../../../Services/GuiltServices';


@Component({
    selector: 'kt-Guilt',
    templateUrl: './Guilt.html',
    changeDetection: ChangeDetectionStrategy.Default,

})
export class GuiltComponent implements OnInit, AfterViewInit {
    
    public id: number;
    public guilt: string = "";
    public date_of_guilt: string = "";
    public details_of_guilt: string = "";
    public student_id: string = "";
    public student_name: string = "";

    
    form1: FormGroup;
    butDisabled: boolean;

    constructor(public _fb: FormBuilder,
        private GuiltServices: GuiltServices,
        private AccusedStudentService: AccusedStudentService) {
            this.form1 = this._fb.group({
                guilt:[[Validators.required]],
                date_of_guilt : [[Validators.required]],
                details_of_guilt:[[Validators.required]]
            }); 
    } 
   
    ngAfterViewInit() {

    }

    AddGuilt(){
        if (this.form1.invalid) {
            console.log('Form invalid...');
            this.form1.markAllAsTouched();
        }else {
            var chck;
            
            if (this.butDisabled == true) {
                chck = Number(this.id);
                console.log("check  ", chck);
            };

            var newGuilt = {
                guilt: this.guilt,
                date_of_guilt: this.date_of_guilt,
                details_of_guilt : this.details_of_guilt,
                student_id: this.AccusedStudentService.student_id,
                student_name: this.AccusedStudentService.student_name
            }

            console.log("new Guilt", newGuilt);

            this.GuiltServices.SaveGuilt(newGuilt).subscribe(res => {
                this.form1.reset();
                this.GuiltServices.BClicked("");
            })

        }
    }

    UpdateGuilt(){

        var chck;

        if (this.butDisabled == false) {
           chck = Number(this.id);
           console.log("selected id ", chck );
        };

        var updatedGuilt = {
            guilt: this.guilt,
            date_of_guilt: this.date_of_guilt,
            details_of_guilt : this.details_of_guilt,  
            student_id: this.AccusedStudentService.student_id,
            student_name: this.AccusedStudentService.student_name          
       }

       console.log("updated Guilt", updatedGuilt);

       this.GuiltServices.UpdateGuilt(updatedGuilt).subscribe(res => {
           this.form1.reset();
           this.GuiltServices.BClicked("");
           (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
           (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
           (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
           (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
       })
   }
   
  

   Cancle() {
       this.form1.reset();
       (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
       (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
       (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
       (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
   }



    ngOnInit() {

        this.butDisabled = true;
        (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("reset_btn")).hidden = false;

        this.GuiltServices.aClickedEvent
        .subscribe((data: string) => {
            this.guilt = this.GuiltServices.guilt;
            this.date_of_guilt = this.GuiltServices.date_of_guilt;
            this.details_of_guilt = this.GuiltServices.details_of_guilt;
        });

    }
}