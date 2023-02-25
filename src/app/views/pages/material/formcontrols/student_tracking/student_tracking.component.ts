import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { StudentDataService } from '../../../../../Services/studentDataService';

import { FormControl, FormGroup } from '@angular/forms';
import { Levels } from '../../../../../LevelsMaster.Model';
import { Classes } from '../../../../../ClassesMaster.Model';
import { ActivityDataService } from '../../../../../Services/ActivityDataService';
import { School_year_dataDataService } from '../../../../../Services/School_year_dataDataService';
import { School_year_data } from '../../../../../School_year_dataMaster.Model';
import { SubjectDataService } from '../../../../../Services/SubjectDataService';
import { Subjects } from '../../../../../SubjectMaster.Model';
import { student_trackingDataService } from '../../../../../Services/student_trackingDataService';
import { student_tracking,student_trackingMaster } from '../../../../../student_trackingMaster.Model';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { Employee } from '../../../../../EmployeeMaster.Model';

import { gdwel_7ssDataService } from '../../../../../Services/gdwel_7ssDataService';
import { gdwel_7ss, gdwel_7ssMaster } from '../../../../../gdwel_7ssMaster.Model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'kt-student_tracking',
    templateUrl: './student_tracking.component.html',
    changeDetection: ChangeDetectionStrategy.Default,

})
export class student_trackingComponent implements OnInit, AfterViewInit {
    level: Levels[];
    selectedlevel: any;
    class: Classes[];
    selectedclass: any; 
    selectedterm:any;
    School_year_data:School_year_data[];
    selectedsubject:any;
    Employee:Employee[];
    class_id_from_gdwel:any;
    decoded:any;
    form1: FormGroup;

    butDisabled: boolean;
    constructor(private modalService: NgbModal,
        private cdRef: ChangeDetectorRef,
        private student_trackingDataService: student_trackingDataService,
      private EmployeeDataService:EmployeeDataService,
      private School_year_dataDataService:School_year_dataDataService, 
      private ActivityDataService: ActivityDataService,
      private StudentDataService: StudentDataService,
      private LevelsDataService: LevelsDataService, 
      private gdwel_7ssDataService: gdwel_7ssDataService, 
      private ClassesDataService: ClassesDataService) {
        const userToken = localStorage.getItem(environment.authTokenKey);
        this.decoded = jwt_decode(userToken);

      this.School_year_dataDataService.get_school_year_data_for_dropdown().subscribe(data => this.School_year_data = data,
        error => console.log(error),
        () => {})
        this.EmployeeDataService.get_subject_with_emp_id(this.decoded.id).subscribe(data => this.Employee = data,
          error => console.log(error),
          () => {})

    }
   date : string="";
    date_Change(event){
        console.log("this.student_trackingDataService",event)
        this.student_trackingDataService.term_id=this.selectedterm.year_data_id;
        this.student_trackingDataService.subject_id=this.selectedsubject.subject_id;
        this.student_trackingDataService.level_id=this.selectedlevel.lev_id;
        this.student_trackingDataService.class_id=this.selectedclass.class_id;
        this.student_trackingDataService.date=event.target.value;
    
console.log("this.student_trackingDataService",this.student_trackingDataService)
        this.student_trackingDataService.BClicked("test")


    }


    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlstudent = new FormControl('');

    filteredOptionslev: Observable<any[]>;
    private _filterlev(value: string) {
        const filterValue = value.toLowerCase();
        return this.level.filter(option => option.lev_name.toLowerCase().includes(filterValue));
    }
    displayFnlev(selectedoption) {
        return selectedoption ? selectedoption.lev_name : undefined;
    }

    filteredOptionsclass: Observable<any[]>;
    private _filterclass(value: string) {
        const filterValue = value.toLowerCase();
        return this.class.filter(option => option.class_name.toLowerCase().includes(filterValue));
    }
    displayFnclass(selectedoption) {
        return selectedoption ? selectedoption.class_name : undefined;
    }

  


    change_level(event) {
        this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
            error => console.log(error),
            () => {
                console.log("emp dropdown", this.class);
                this.filteredOptionsclass = this.myControlclass.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.class_name),
                        map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
                    );
            });
    }
    change_class(event) {
        this.ActivityDataService.activity_id = event.class_id;
        this.ActivityDataService.BClicked("test");
        console.log(" this.StudentDataService.student_class_id", this.StudentDataService.student_class_id)
    }
    change_subject(event) {
    
        console.log("lev_id, ",event.emp_subject_id)
        this.gdwel_7ssDataService.get_gdwel_7ss_with_subject_id(event.emp_subject_id).subscribe(data => this.level = data,
            error => console.log(error),
            () => {
                console.log("emp lev_id", this.level);
                this.filteredOptionslev = this.myControllev.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.lev_name),
                        map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
                    );
            });

    }

    ngAfterViewInit() {
    }



    ngOnInit() {

        this.butDisabled = true;
        //(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
        //(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
        //(<HTMLInputElement>document.getElementById("reset_btn")).hidden = false;

        this.LevelsDataService.GetAllLevels().subscribe(data => this.level = data,
            error => console.log(error),
            () => {
                console.log("levels dropdown", this.level);
                this.filteredOptionslev = this.myControllev.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.lev_name),
                        map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
                    );

                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

            });

    
    }

    display = "";
    openModal(content: any, event: any) {

        this.modalService.open(content, { backdrop: true, size: "xl", });
    }
    openModal1() {
        this.display = "show";
        this.cdRef.detectChanges();
    }
    onCloseHandled() {
        this.display = "";
    }
}