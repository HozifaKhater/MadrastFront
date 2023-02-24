import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import { SubjectDataService } from '../../../../../Services/SubjectDataService';
import { FormControl } from '@angular/forms';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { Departments } from '../../../../../DepartmentMaster.Model';
import { Subjects } from '../../../../../SubjectMaster.Model';
import { Ta7dierJoinEmployeeDataService } from '../../../../../Services/Ta7dierJoinEmployeeDataService';
import { Ta7dierJoinEmployee } from '../../../../../Ta7dierJoinEmpoyee.Model';


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const ELEMENT_DATA2: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
        `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl);
  }
}



@Component({
    selector: 'kt-ShowTa7diersComponent',
    templateUrl: './ShowTa7diersComponent.html',
    changeDetection: ChangeDetectionStrategy.Default,

})

export class ShowTa7diersComponent implements OnInit, AfterViewInit {
    
    dept: Departments[];
    selectedDept: any;
    subj: Subjects[];
    selectedSubject: any;

    constructor(private DepartmentDataService: DepartmentDataService,
      private SubjectDataService: SubjectDataService, 
      private Ta7dierJoinEmployeeDataService: Ta7dierJoinEmployeeDataService) {

    }

    myControlDept = new FormControl('');
    myControlSubj = new FormControl('');


    filteredOptionsDept: Observable<any[]>;

    private _filterDept(value: string) {
        const filterValue = value.toLowerCase();
        return this.dept.filter(option => option.dep_name.toLowerCase().includes(filterValue));
    }

    displayFnDept(selectedoption) {
        return selectedoption ? selectedoption.dep_name : undefined;
    }

    filteredOptionsSubj: Observable<any[]>;

    private _filterSubject(value: string) {
        const filterValue = value.toLowerCase();
        return this.subj.filter(option => option.subject_name.toLowerCase().includes(filterValue));
    }

    displayFnSubj(selectedoption) {
        return selectedoption ? selectedoption.subject_name : undefined;
    }


    Change_Dept(event) {
        this.SubjectDataService.GetAllSubject().subscribe(data => this.subj = data,
            error => console.log(error),
            () => {
                console.log("subject dropdown", this.subj);
                this.filteredOptionsSubj = this.myControlSubj.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.class_name),
                        map(subject_name => subject_name ? this._filterSubject(subject_name) : this.subj.slice())
                    );
            });
    }

    Change_Subj() {

        this.Ta7dierJoinEmployeeDataService.subject_name = this.selectedSubject.subject_name;
        this.Ta7dierJoinEmployeeDataService.emp_dep = this.selectedDept.dep_name;
        this.Ta7dierJoinEmployeeDataService.BClicked("change subject ");
        console.log(" subject name", this.Ta7dierJoinEmployeeDataService.subject_name)
        console.log(" dept name", this.Ta7dierJoinEmployeeDataService.emp_dep)

      }
  

    ngAfterViewInit() {
    }



    ngOnInit() {

        this.DepartmentDataService.GetAlldepartment().subscribe(data => this.dept = data,
            error => console.log(error),
            () => {
                console.log("department dropdown", this.dept);
                this.filteredOptionsDept = this.myControlDept.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.lev_name),
                        map(dep_name => dep_name ? this._filterDept(dep_name) : this.dept.slice())
                    );
            });

    }
}