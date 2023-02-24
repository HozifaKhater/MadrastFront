import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MasterJobsDataService } from '../../../../../Services/MasterJobsDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { MasterJob,MasterJobMaster } from '../../../../../MasterJobMaster.Model';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { Employee } from '../../../../../EmployeeMaster.Model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
const selection = {
  
    viewCode: ``,
    isCodeVisible: false
};



const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'مؤمن', weight: 'مدرس', symbol: 'momen_mahmoud' },
    { position: 2, name: 'مؤمن', weight: 'مدرس', symbol: 'momen_mahmoud' },
    { position: 3, name: 'مؤمن', weight: 'مدرس', symbol: 'momen_mahmoud' },

];

//const ELEMENT_DATA2: PeriodicElement[] = [
//    { position: 1, name: 'zz', weight: 1.0079, symbol: 'H' },
//    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
//];

export interface PeriodicElement {
    name: string;
    position: number;
    weight: string;
    symbol: string;
}



/** An example database that the data source uses to retrieve data for the table. */

export interface UserData {
    id: string;
    name: string;
    progress: string;
    color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
    'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
        id: id.toString(),
        name: name,
        progress: Math.round(Math.random() * 100).toString(),
        color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
}


@Component({
	selector: 'kt-terms',
	templateUrl: './terms.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.mat-slider {
		width: 300px;
	}
	.example-margin {
		  margin: 15px;
	  }
	`],
	encapsulation: ViewEncapsulation.None,
	preserveWhitespaces: false,
})
export class TermsComponent implements OnInit {

	exampleBasicSlider;
	exampleConfigurableSlider;
	exampleChangeEvent;
	autoTicks = false;
	disabled = false;
	invert = false;
	max = 100;
	min = 0;
	showTicks = false;
	step = 1;
	thumbLabel = false;
	value = 0;
	vertical = false;
    foods = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];
    typesOfShoes = ['صلاحيه1', 'صلاحيه2', 'صلاحيه3', 'صلاحيه4', 'صلاحيه5'];
	private _tickInterval = 1;
	myValue = 50;

	get tickInterval(): number | 'auto' {
		return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
	}
	set tickInterval(v) {
		this._tickInterval = Number(v);
	}

	//ngOnInit() {

	//}

	changeSlider() {
		console.log('myValue', this.myValue);
    }

    /* ###############*/
    exampleBasic;
    examplePagination;
    exampleSorting;
    exampleFiltering;
    exampleSelection;
    exampleHTTP;
    exampleMain;

    displayedColumns1 = ['position', 'اسم', 'weight', 'symbol'];
    displayedColumns2: string[] = ['position', 'اسم', 'weight', 'symbol'];
    displayedColumns3: string[] = ['position', 'اسم', 'weight', 'symbol'];
    displayedColumns4: string[] = ['position', 'اسم', 'weight', 'symbol'];
    displayedColumns5: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
    displayedColumns6: string[] = ['created', 'state', 'number', 'title'];
    displayedColumns7: string[] = ['id', 'name', 'progress', 'color'];

    dataSource1 = ELEMENT_DATA;
  /*  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA2);*/
    dataSource3 = new MatTableDataSource(ELEMENT_DATA);
    dataSource4 = new MatTableDataSource(ELEMENT_DATA);
    dataSource5 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    dataSource7: MatTableDataSource<UserData>;


    selection = new SelectionModel<PeriodicElement>(true, []);
    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;


    @ViewChild('matPaginator2', { static: true }) paginator2: MatPaginator;
    @ViewChild('matPaginator6', { static: true }) paginator6: MatPaginator;
    @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator;


    @ViewChild('sort3', { static: true }) sort3: MatSort;
    @ViewChild('sort6', { static: true }) sort6: MatSort;
    @ViewChild('sort7', { static: true }) sort7: MatSort;

    ngAfterViewInit() {
    }
    jobs: MasterJob[];
    constructor(public _fb: FormBuilder, private http: HttpClient, private MasterJobsDataService: MasterJobsDataService, private EmployeeDataService: EmployeeDataService, private user_privDataService: user_privDataService) {
        const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

        // Assign the data to the data source for the table to render
        this.dataSource7 = new MatTableDataSource(users);
        MasterJobsDataService.GetAllActivity().subscribe(data => this.jobs = data,
            error => console.log(error),
            () => console.log("ok"));
        this.butdisableclass = 0;
        this.butdisablework = 0;
    }
    job_id_from_function: any;
    job_name_from_function: any;
    emp_id_from_function: any;
    emp_name_from_function: any;
    employees: Employee[];
    privs: Departments[];
    job_selection(event) {
        this.job_id_from_function = event.source.value.job_id;
        this.job_name_from_function = event.source.value.job_name;
        this.EmployeeDataService.GetAllEmployee_of_job(event.source.value.job_id).subscribe(data => this.employees = data,
            error => console.log(error),
            () => console.log("department dropdown", this.employees));

        this.MasterJobsDataService.GetAllprivs_with_job_id(event.source.value.job_id).subscribe(data => this.privs = data,
            error => console.log(error),
            () => { console.log(this.privs) });
    }
    emp_selection(event) {
        this.emp_id_from_function = event.source.value.emp_id;
        this.emp_name_from_function = event.source.value.emp_name;
      
    }
    butdisableclass: number;
    butdisablework: number;
    side_jobclass_chck_change(event) {
        //if ((<HTMLInputElement>document.getElementById("side_dep_chck")).checked = true) {
        //	console.log("checked changed")
        //}
        console.log(event)
        if (event.checked == true) {
            this.butdisableclass = 1;
        }
        if (event.checked === false) {
            this.butdisableclass = 0;
        }
    }
    side_jobwork_chck_change(event) {
        //if ((<HTMLInputElement>document.getElementById("side_dep_chck")).checked = true) {
        //	console.log("checked changed")
        //}
        console.log(event)
        if (event.checked == true) {
            this.butdisablework = 1;
        }
        if (event.checked === false) {
            this.butdisablework = 0;
        }
    }
    add_users_priv() {
        //var test1
        //test1 = this.departments[this.selecteddepartment]
        //var schoolterm
        //schoolterm = this.activities[this.activity_school_term]
       
            for (let i = 0; i < this.checkbox_array.length; i++) {
                var val2 = {  
                    emp_id: Number(this.emp_id_from_function),
                    priv_name: this.checkbox_array[i],
                    page_name: this.checkbox_array[i],
                    in_class_priv: Number(this.butdisableclass),
                    dep_work: Number(this.butdisablework),
                    job_id: Number(this.job_id_from_function)
                }
                this.user_privDataService.adduser_privs(val2).subscribe(res => { console.log("val2", val2) })
                console.log("checkbox array", this.checkbox_array[i])
            }   
        console.log(val2)
    }
    update_users_priv() {

        /*console.log("emp", emp, this.employeedepartment );*/
  
        this.user_privDataService.deleteuser_privs_empinfo(Number(this.emp_id_from_function)).subscribe(res => {
            
                    for (let i = 0; i < this.checkbox_array.length; i++) {
                        var val2 = {
                            emp_id: Number(this.emp_id_from_function),
                            priv_name: this.checkbox_array[i],
                            page_name: this.checkbox_array[i],
                            in_class_priv: Number(this.butdisableclass),
                            dep_work: Number(this.butdisablework),
                            job_id: Number(this.job_id_from_function)
                        }
                        this.user_privDataService.adduser_privs(val2).subscribe(res => { console.log("val2", val2) });
                        (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
                        (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
                        (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
                        (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
                    }

              
            })
     

    }
    cancel_users_priv() {
        (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
        (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
        (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
    }

   user_id: number;
   emp_id: string;
  priv_name: string;
   page_name: string;
    in_class_priv: string = "";
    dep_work: string = "";
    job_id: string;
    selectedjob: any;
    selectedemployee: any;
    ngOnInit() {
        (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;


        this.user_privDataService.aClickedEvent
            .subscribe((data: string) => {
                console.log("edited");
                (<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
                (<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
                (<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
                (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;

                var selected_value = this.user_privDataService.job_id
                this.selectedjob = this.jobs[this.jobs.findIndex(function (el) {
                    return String(el.job_id) == selected_value
                })];

                this.in_class_priv = this.user_privDataService.in_class_priv;
                this.dep_work = this.user_privDataService.dep_work;
                /*	document.getElementById("save_btn").innerHTML="asdasd"*/
                console.log("edited")
                this.EmployeeDataService.GetAllEmployee_of_job(Number(this.user_privDataService.job_id)).subscribe(data => this.employees = data,
                    error => console.log(error),
                    () => {
                        var selected_value = this.user_privDataService.emp_id;
                        this.selectedemployee = this.employees[this.employees.findIndex(function (el) {
                            return String(el.emp_id) == selected_value
                        })];
                        console.log("department dropdownasdasdsa", this.employees, selected_value, this.employees.findIndex(function (el) {
                            return String(el.emp_id) == selected_value
                        }))
                    });

                this.MasterJobsDataService.GetAllprivs_with_job_id(Number(this.user_privDataService.job_id)).subscribe(data => this.privs = data,
                    error => console.log(error),
                    () => { console.log(this.privs) });
            });

        this.job_id = this.job_id;

        this.in_class_priv = this.in_class_priv;
        this.dep_work = this.dep_work;




        this.exampleSelection = selection;

       /* this.exampleMain = main;*/

        /*this.dataSource2.paginator = this.paginator2;*/

        this.dataSource3.sort = this.sort3;

        // Example 6
     

        // If the user changes the sort order, reset back to the first page.
        this.sort6.sortChange.subscribe(() => this.paginator6.pageIndex = 0);


        // Example 7
        this.dataSource7.paginator = this.paginator7;
        this.dataSource7.sort = this.sort7;
    }

    applyFilter4(filterValue: string) {
        this.dataSource4.filter = filterValue.trim().toLowerCase();
    }

    applyFilter7(filterValue: string) {
        this.dataSource7.filter = filterValue.trim().toLowerCase();

        if (this.dataSource7.paginator) {
            this.dataSource7.paginator.firstPage();
        }
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected5() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource5.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle5() {
        this.isAllSelected5() ?
            this.selection.clear() :
            this.dataSource5.data.forEach(row => this.selection.select(row));
    }
    checkbox_array: any;
    initModelForm(): FormGroup {
        return this._fb.group({
            otherControls: [''],
            // The formArray, empty 
            myChoices: new FormArray([]),
        })
    }
    myForm: FormGroup = this.initModelForm();
    onCheckChange(event) {
        const formArray: FormArray = this.myForm.get('myChoices') as FormArray;

        /* Selected */
        if (event.target.checked) {
            // Add a new control in the arrayForm
            formArray.push(new FormControl(event.target.value));
        }
        /* unselected */
        else {
            // find the unselected element
            let i: number = 0;

            formArray.controls.forEach((ctrl: FormControl) => {
                if (ctrl.value == event.target.value) {
                    // Remove the unselected element from the arrayForm
                    formArray.removeAt(i);
                    return;
                }

                i++;
            });
        }
        this.checkbox_array = formArray.value;
        console.log("arrayofchecks", event.target)
    }
}
