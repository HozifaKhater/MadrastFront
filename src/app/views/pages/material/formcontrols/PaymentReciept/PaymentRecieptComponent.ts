import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, NgModule } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { PaymentRecieptService } from '../../../../../Services/PaymentRecieptDataService';
import { School_dataDataService } from '../../../../../Services/School_dataDataService';
import { Employee , EmployeeMaster} from '../../../../../EmployeeMaster.Model';

@Component({
	selector: 'kt-PaymentReciept',
	templateUrl: './PaymentRecieptComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})


export class PaymentRecieptComponent implements OnInit {

	id: number;
    serial_number: string = "";
    title: string = "الصندوق المالي المدرسي";
    date_of_reciept : string = "";
    region: string = "";
    school_name: string = "";
    center_number : string = "";
    dinar_value: string = "";
    fels_value: string = "";
    client_name: string = "";
    total_in_arabic: string = "";
    cash_or_check: string = "";
    bank_name:string = "";
    details: string = "";
    identity_number: string="";
    emp_id: string = "";
	
	myValue: boolean = true;
    myControl = new FormControl('');
    form1: FormGroup;
    butDisabled: boolean;
    decoded:any;
    EmployeeData: Employee[];
    SchoolData: any;
    school_id: any;
    
	constructor(public _fb: FormBuilder, private PaymentRecieptService: PaymentRecieptService,
        private EmployeeDataService: EmployeeDataService,private School_dataDataService: School_dataDataService) {
        this.form1 = this._fb.group({
			serial_number	: [[Validators.required]],
			region	: ['', [Validators.required]],
			center_number	: ['', [Validators.required]],
			dinar_value	: ['', [Validators.required]],
			fels_value	: ['', [Validators.required]],
            date_of_reciept	: ['', [Validators.required]],
			client_name	: ['', [Validators.required]],
            cash_or_check	: ['', [Validators.required]],
			bank_name	: ['', [Validators.required]],
            school_name	: ['', [Validators.required]],
            total_in_arabic	: ['', [Validators.required]],
            details	: ['', [Validators.required]],
            identity_number	: ['', [Validators.required]],
        });

        const userToken = localStorage.getItem(environment.authTokenKey);
        this.decoded = jwt_decode(userToken);

        console.log("id", this.decoded.id);

        this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id).subscribe(date=> this.EmployeeData = date,
            error => console.log(error),
            () => {console.log("Emplyee Data ", this.EmployeeData)});

        this.School_dataDataService.GetAllSchool_data().subscribe(
            (data:any) => this.SchoolData = data.data,
            error => console.log(error),
            () => {console.log("school name ", this.SchoolData);
            this.school_name = this.SchoolData[0].school_name;
        });  
	}
 
    AddPaymentReciept(){
        if (this.form1.invalid) {
            console.log('Form invalid...');
            this.form1.markAllAsTouched();
        }else {
            var chck;
            
            if (this.butDisabled == true) {
                chck = Number(this.id);
                console.log("check  ", chck);
            };

            var newPaymentReciept = {
                serial_number: Number(this.serial_number),
                title: this.title,
                date_of_reciept : (<HTMLInputElement>document.getElementById("date_of_reciept")).value,
                region: this.region,
                school_name: this.school_name,
                center_number : Number(this.center_number),
                dinar_value: Number(this.dinar_value),
                fels_value: Number(this.fels_value),
                client_name: this.client_name,
                total_in_arabic: this.total_in_arabic,
                cash_or_check: this.cash_or_check,
                bank_name: this.bank_name,
                details: this.details,
                identity_number: this.identity_number,
                emp_id: Number(this.decoded.id),
            }

            console.log("new Payment reciept", newPaymentReciept);

            this.PaymentRecieptService.SavePaymentReciept(newPaymentReciept).subscribe(res => {
                alert("Added Sucesfully :)");
                this.form1.reset();
                this.PaymentRecieptService.BClicked("");
            })

        }
    }

    UpdatePaymentReciept(){

        var chck;

        if (this.butDisabled == false) {
            chck = Number(this.id);
            console.log("selected id ", chck );
        };

        var updatedPaymentReciept = {
            id: Number(chck),
            serial_number: Number(this.serial_number),
            title: this.title,
            date_of_reciept : (<HTMLInputElement>document.getElementById("date_of_reciept")).value,
            region: this.region,
            school_name: this.school_name,
            center_number : Number(this.center_number),
            dinar_value: Number(this.dinar_value),
            fels_value: Number(this.fels_value),
            client_name: this.client_name,
            total_in_arabic: this.total_in_arabic,
            cash_or_check: this.cash_or_check,
            bank_name: this.bank_name,
            details: this.details,
            identity_number: this.identity_number,
            emp_id: Number(this.decoded.id),
        }

        console.log("updated Payment Reciept", updatedPaymentReciept);

        this.PaymentRecieptService.UpdatePaymentReciept(updatedPaymentReciept).subscribe(res => {
            alert("Updated Sucessfully :)");
            this.form1.reset();
            this.PaymentRecieptService.BClicked("");
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
	
    print(){
        window.print();
    }
    
    ngOnInit() {
        
		this.butDisabled = true;
        (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("reset_btn")).hidden = false;

        this.PaymentRecieptService.aClickedEvent
        .subscribe((data: string) => {
            if (Number(this.PaymentRecieptService.id) != 0) {

                this.butDisabled = false;         
           }

            (<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
            (<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
            (<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
            (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;
            (<HTMLInputElement>document.getElementById("reset_btn")).hidden = true;

            this.id = this.PaymentRecieptService.id;
            this.serial_number = this.PaymentRecieptService.serial_number.toString();
            this.title = this.PaymentRecieptService.title;
            this.region = this.PaymentRecieptService.region;
            this.center_number = this.PaymentRecieptService.center_number.toString();
            this.dinar_value = this.PaymentRecieptService.dinar_value.toString();
            this.fels_value = this.PaymentRecieptService.fels_value.toString();
            this.date_of_reciept = this.PaymentRecieptService.date_of_reciept;
            this.client_name = this.PaymentRecieptService.client_name;
            this.total_in_arabic = this.PaymentRecieptService.total_in_arabic;
            this.cash_or_check = this.PaymentRecieptService.cash_or_check;
            this.bank_name = this.PaymentRecieptService.bank_name;
            this.details = this.PaymentRecieptService.details;
            this.emp_id = this.PaymentRecieptService.emp_id.toString();
            this.school_name = this.SchoolData[0].school_name;
            this.identity_number = this.PaymentRecieptService.identity_number;

        });
	
	}

	


}
