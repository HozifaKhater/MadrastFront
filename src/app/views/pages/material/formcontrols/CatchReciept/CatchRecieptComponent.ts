import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, NgModule } from '@angular/core';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { Http, Response, Headers } from '@angular/http';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { swotDataService } from '../../../../../Services/swotDataService';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CatchRecieptService } from '../../../../../Services/CatchRecieptService';
import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { School_dataDataService } from '../../../../../Services/School_dataDataService';
import { Employee , EmployeeMaster} from '../../../../../EmployeeMaster.Model';

@Component({
	selector: 'kt-CatchReciept',
	templateUrl: './CatchRecieptComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})


export class CatchRecieptComponent implements OnInit {

	id: number;
    title: string = "الصندوق المالي المدرسي";
    serial_number: string = "";
    region: string = "";
    center_number : string = "";
    school_name: string = "";
    dinar_value: string = "";
    fels_value: string = "";
    date_of_reciept : string = "";
    client_name: string = "";
    emp_id: string = "";
    total_in_arabic: string = "";
    cache_or_check: string = "";
    bank_name:string = "";
    details: string = "";

	
	myValue: boolean = true;
    myControl = new FormControl('');
    form1: FormGroup;
    butDisabled: boolean;
    decoded:any;
    EmployeeData: Employee[];
    SchoolData: any;
    school_id: any;
 //   location: Location;
    
	constructor(public _fb: FormBuilder, private CatchRecieptService: CatchRecieptService,
        private EmployeeDataService: EmployeeDataService,private School_dataDataService: School_dataDataService) {
        this.form1 = this._fb.group({
			serial_number	: [[Validators.required]],
			region	: ['', [Validators.required]],
			center_number	: ['', [Validators.required]],
			dinar_value	: ['', [Validators.required]],
			fels_value	: ['', [Validators.required]],
            date_of_reciept	: ['', [Validators.required]],
			client_name	: ['', [Validators.required]],
            cache_or_check	: ['', [Validators.required]],
			bank_name	: ['', [Validators.required]],
            school_name	: ['', [Validators.required]],
            total_in_arabic	: ['', [Validators.required]],
            details	: ['', [Validators.required]],
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
 
    AddCatchReciept(){
        if (this.form1.invalid) {
            console.log('Form invalid...');
            this.form1.markAllAsTouched();
        }else {
            var chck;
            
            if (this.butDisabled == true) {
                chck = Number(this.id);
                console.log("check  ", chck);
            };

            var newCatchReciept = {
                title: this.title,
                serial_number: Number(this.serial_number),
                region: this.region,
                center_number : Number(this.center_number),
                school_name: this.school_name,
                dinar_value: Number(this.dinar_value),
                fels_value: Number(this.fels_value),
                date_of_reciept : (<HTMLInputElement>document.getElementById("date_of_reciept")).value,
                client_name: this.client_name,
                emp_id: Number(this.decoded.id),
                total_in_arabic: this.total_in_arabic,
                cache_or_check: this.cache_or_check,
                bank_name: this.bank_name,
                details: this.details
            }

            console.log("new catch reciept", newCatchReciept);

            this.CatchRecieptService.SaveCatchReciept(newCatchReciept).subscribe(res => {
                alert("Added Sucesfully :)");
                this.form1.reset();
                this.CatchRecieptService.BClicked("");
            })

        }
    }

    UpdateCatchReciept(){

         var chck;

        if (this.butDisabled == false) {
            chck = Number(this.id);
            console.log("selected id ", chck );
        };

        var updatedCatchReciept = {
            id: Number(chck),
            title: this.title,
            serial_number: this.serial_number,
            region: this.region,
            center_number : this.center_number,
            school_name: this.school_name,
            dinar_value: this.dinar_value,
            fels_value: this.fels_value,
            date_of_reciept : this.date_of_reciept,
            client_name: this.client_name,
            emp_id: Number(this.decoded.id),
            total_in_arabic: this.total_in_arabic,
            cache_or_check: this.cache_or_check,
            bank_name: this.bank_name,
            details: this.details
        }

        console.log("updatedCatchReciept", updatedCatchReciept);

        this.CatchRecieptService.UpdateCatchReciept(updatedCatchReciept).subscribe(res => {
            alert("Updated Sucessfully :)");
            this.form1.reset();
            this.CatchRecieptService.BClicked("");
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

        this.CatchRecieptService.aClickedEvent
        .subscribe((data: string) => {
            if (Number(this.CatchRecieptService.id) != 0) {

                this.butDisabled = false;         
           }

            (<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
            (<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
            (<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
            (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;
            (<HTMLInputElement>document.getElementById("reset_btn")).hidden = true;

            this.id = this.CatchRecieptService.id;
            this.serial_number = this.CatchRecieptService.serial_number.toString();
            this.title = this.CatchRecieptService.title;
            this.region = this.CatchRecieptService.region;
            this.center_number = this.CatchRecieptService.center_number.toString();
            this.dinar_value = this.CatchRecieptService.dinar_value.toString();
            this.fels_value = this.CatchRecieptService.fels_value.toString();
            this.date_of_reciept = this.CatchRecieptService.date_of_reciept;
            this.client_name = this.CatchRecieptService.client_name;
            this.total_in_arabic = this.CatchRecieptService.total_in_arabic;
            this.cache_or_check = this.CatchRecieptService.cache_or_check;
            this.bank_name = this.CatchRecieptService.bank_name;
            this.details = this.CatchRecieptService.details;
            this.emp_id = this.CatchRecieptService.emp_id.toString();
            this.school_name = this.SchoolData[0].school_name;

        });
	
	}

	


}
