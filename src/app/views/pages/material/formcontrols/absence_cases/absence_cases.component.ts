import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { MasterJobMaster } from '../../../../../MasterJobMaster.Model';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { MasterJobsDataService } from '../../../../../Services/MasterJobsDataService';
import { EmployeeMaster } from '../../../../../EmployeeMaster.Model';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { Levels,LevelsMaster } from '../../../../../LevelsMaster.Model';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';
import { Classes,ClassesMaster} from '../../../../../ClassesMaster.Model';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import { Student, StudentMaster } from '../../../../../StudentMaster.Model';
import { School_dataDataService } from '../../../../../Services/School_dataDataService';
import { School_dataMaster, School_data } from '../../../../../School_dataMaster.Model';
import { Absence_casesDataService } from '../../../../../Services/Absence_casesDataService';
import { Absence_casesMaster, Absence_cases } from '../../../../../Absence_casesMaster.Model';
import * as def from '../../../../../definationsMaster.Model';
import moment from 'moment';
import { Observable } from 'rxjs'; 
import { FormArray, FormBuilder,  FormGroup} from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { ActivityDataService } from '../../../../../Services/ActivityDataService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
    selector: 'kt-absence_cases',
    templateUrl: './absence_cases.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-form {
		min-width: 150px;
		max-width: 500px;
		width: 100%;
	  }
	  .example-full-width {
		width: 100%;
	  }
	  .example-form-field {
		width: 200px;
	  }
	`],
    encapsulation: ViewEncapsulation.None
})
export class Absence_casesComponent implements OnInit {
 
	@Input() employee_data: any;
    absence_cases_id: number;
    lev_id: string = "";
    lev_name: string = "";
    class_id: string = "";
    class_name: string = "";
    student_id: string = "";
    student_name: string = "";
    nationality_id: string = "";
    nationality: string = "";
    phone_no: string = "";
    birth_date: string = "";
    work_start_date: string = "";
    behavioral_notes: string = "";
    self_reasons: string = "";

    returned_absence_id: string = "";

    absence_details_id: number;
    other_situations: string = "";
    date: string = "";
    effort_results: string = "";
    end_year_state: string = "";

    school: School_data[];
  
    jobs: DepartmentMaster[];

 

    nat: def.nat[];
    branch: def.branch[];
    eduregion: def.eduregion[];
    selectedbranch: any;
    selectedschool: any;
    selectedregion: any;
    selectedreason: any;

    level: Levels[];
    selectedlevel: any;

    class: Classes[];
    selectedclass: any;

    student: Student[];
    selectedStudent : any;

    date_of_birth:string="";

    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlStudent = new FormControl('');

    selected_student_id: any;
	selected_student_name: any;

	exampleBasicInputs;
	exampleInputWithACustomErrorStateMatcher;
	exampleAutoResizingTextarea;
	exampleInputWithAClearButton;
	exampleInputWithErrorMessages;
	exampleInputsInAForm;
	exampleInputWithHints;
	exampleInputsWithPrefixesAndSuffixes;
    formName: any;
    errorMessage: string;

    form1: FormGroup;
    selected_level: any;
    selected_class: any;
    selected_student: any;
    constructor(private modalService: NgbModal,
        private cdRef: ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        public _fb: FormBuilder,
        private LevelsDataService: LevelsDataService,
        private ClassesDataService: ClassesDataService,
        private StudentDataService: StudentDataService,
        private Absence_casesDataService: Absence_casesDataService,
        private School_dataDataService: School_dataDataService,
        private EmployeeService: EmployeeDataService,
        private ActivityDataService: ActivityDataService

    ) {
        this.form1 = this._fb.group({
            phone_no: ['', [Validators.required]],
            date_of_birth:[[Validators.required]],
            nationality : [[Validators.required]],
            
        });

    }
  
  
    todate: any;
 
    selectednat: any;
    selectedproced: any;


	matcher = new MyErrorStateMatcher();
	value = 'Clear me';
    add_absence_cases() {

        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
        var val = {

            lev_id: Number(this.selectedlevel.lev_id),
            lev_name: this.selectedlevel.lev_name,
            class_id: Number(this.selectedclass.class_id),
            class_name: this.selectedclass.class_name,
            student_id: Number(this.selectedStudent.student_id),
            student_name: this.selectedStudent.student_name,
            nationality_id:0, 
            nationality_name: this.nationality,
            phone_no: this.phone_no,
            birth_date: this.date_of_birth,
            work_start_date: this.work_start_date,
            behavioral_notes: this.behavioral_notes,
            self_reasons: this.self_reasons

            };

            this.Absence_casesDataService.addAbsenceCases(val).subscribe(res => {
        
                this.returned_absence_id = res['data'][0].Column1;

                var details = {
                    absence_cases_id: this.returned_absence_id,
                    other_situations: this.other_situations,
                    date: this.date,
                    effort_results: this.effort_results,
                    end_year_state: this.end_year_state,
                }

                this.Absence_casesDataService.addAbsenceCasesDetails(details).subscribe();
                
                alert("saved succesfully");
                this.Absence_casesDataService.BClicked("b2");
                this.form1.reset();
                this.myControlStudent.reset();
				this.myControlclass.reset();
				this.myControllev.reset();
                
            })

        }
      
	}

    update_absence_cases() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {
                absence_cases_id: Number(this.Absence_casesDataService.absence_cases_id),
                lev_id: Number(this.selectedlevel.lev_id),
                lev_name: this.selectedlevel.lev_name,
                class_id: Number(this.selectedclass.class_id),
                class_name: this.selectedclass.class_name,
                student_id : Number(this.selected_student_id)	,
                student_name : this.selected_student_name	,
                nationality_id: 0,
                nationality_name: this.nationality,
                phone_no: this.phone_no,
                birth_date: this.date_of_birth,
                work_start_date: this.work_start_date,
                behavioral_notes: this.behavioral_notes,
                self_reasons: this.self_reasons
            };

            this.Absence_casesDataService.updateAbsenceCases(val).subscribe(res => {

                this.Absence_casesDataService.delete_from_absence_cases_details_with_absence_cases_id
                    (Number(this.Absence_casesDataService.absence_cases_id))
                    .subscribe(res => {
                        var details = {
                            absence_cases_id: Number(this.Absence_casesDataService.absence_cases_id),
                            other_situations: this.other_situations,
                            date: this.date,
                            effort_results: this.effort_results,
                            end_year_state: this.end_year_state
                        }
                        this.Absence_casesDataService.addAbsenceCasesDetails(details).subscribe()
                })
            
                alert("Updated Succesfuly");
                this.Absence_casesDataService.BClicked("b2");
                this.form1.reset();
                this.myControlStudent.reset();
				this.myControlclass.reset();
				this.myControllev.reset();
               
            });
        }
	}
  
	
   
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

    filteredOptionsStudents:  Observable<any[]>;

    private _filterStudent(value: string) {
        const filterValue = value.toLowerCase();
        return this.student.filter(option => option.student_name.toLowerCase().includes(filterValue));
    }

    displayFnStudent(selectedoption) {
        return selectedoption ? selectedoption.student_name : undefined;
    }

    change_level(event) {
        if(event !== null && event !== undefined && event.length !== 0){

            this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
                error => console.log(),
                () => {
                    this.filteredOptionsclass = this.myControlclass.valueChanges
                        .pipe(
                            startWith(''),
                            map(value => value? typeof value === 'string' ? value : value.class_name : ''),
                            map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
                        );
                });
        }
    }

    change_class(event) {
        if(event !== null && event !== undefined && event.length !== 0){
            this.class_id = event.class_id;
            this.Change_Student();
        }
    }
    Change_Student(){
        if(this.class_id !== null && this.class_id !== undefined){

            this.StudentDataService.GetAllStudent_of_class(Number(this.class_id)).subscribe(data => this.student = data,
                error => console.log(),
                () => {
                    this.filteredOptionsStudents = this.myControlStudent.valueChanges
                        .pipe(
                            startWith(''),
                            map(value => value? typeof value === 'string' ? value : value.student_name : ''),
                            map(student_name => student_name ? this._filterStudent(student_name) : this.student.slice())
                        );
                });
                
            if(this.selectedStudent !== null && this.selectedStudent !== undefined){
                this.setData();
            }
        }

    }

    setData(){
        this.nationality = this.selectedStudent.student_nationality;
        this.date_of_birth = this.selectedStudent.student_dob;  
        
        this.Absence_casesDataService.student_id = this.selectedStudent.student_id;
        this.Absence_casesDataService.student_name = this.selectedStudent.student_name;

      
    }

    classValue: any;
    levelValue:any;
    studentValue:any;
    studentVar:any;
    classVar:any;
    anotherStuArray:Student[];
    anotherClassArray:Classes[];
    anotherLevelArray: Levels[];
    absence:any[];

    priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});	
       
        this.LevelsDataService.GetAllLevels().subscribe(data => this.level = data,
            error => console.log(),
            () => {
                this.filteredOptionslev = this.myControllev.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => value? typeof value === 'string' ? value : value.lev_name : ''),
                        map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
                    );
            });

		

        this.Absence_casesDataService.aClickedEvent
			.subscribe((data: string) => {

                this.absence_cases_id = this.Absence_casesDataService.absence_cases_id;
                this.nationality_id = this.nationality_id;
                this.nationality = this.Absence_casesDataService.nationality_name;
                this.phone_no = this.Absence_casesDataService.phone_no;
                this.birth_date = this.Absence_casesDataService.birth_date;
                this.work_start_date = this.Absence_casesDataService.work_start_date;
                this.behavioral_notes = this.Absence_casesDataService.behavioral_notes;
                this.self_reasons = this.Absence_casesDataService.self_reasons;

                this.absence_details_id = this.absence_details_id;
                this.other_situations = this.Absence_casesDataService.other_situations;
                this.date = this.Absence_casesDataService.date;
                this.effort_results = this.Absence_casesDataService.effort_results;
                this.end_year_state = this.Absence_casesDataService.end_year_state;
          

                this.selected_student_id = this.Absence_casesDataService.student_id;
				this.selected_student_name = this.Absence_casesDataService.student_name;
        

					this.StudentDataService.GetAlldepartment()
					.subscribe(data => this.anotherStuArray = data,
						error => console.log(),
						() => {
							// Get Student Object 
							var id = this.Absence_casesDataService.student_id;
							this.studentVar = this.anotherStuArray[this.anotherStuArray.findIndex(function (el) {
					
								return el.student_id == id;
							})];
                            
                            this.selectedStudent = this.studentVar;

							this.nationality = this.studentVar.student_nationality;
							this.phone_no = this.studentVar.mother_phone;
							this.date_of_birth =  this.studentVar.student_dob;
							
							// Get Class Object with Student Object 
							var class_id2 = this.studentVar.student_class_id;

							this.ClassesDataService.GetAllClasses_with_id(class_id2)
							.subscribe(data => this.anotherClassArray = data,
								error => console.log(),
							() => {
								this.selectedclass = this.anotherClassArray[0];

								// Get Level Object with Class Object 
								var level_id = this.selectedclass.class_level;

								this.LevelsDataService.GetAllLevels_with_id(level_id)
								.subscribe(data => this.anotherLevelArray = data,
									error => console.log(),
									() => {
										this.selectedlevel = this.anotherLevelArray[this.anotherLevelArray.findIndex(function (el) {
						
											return String(el.lev_id) == level_id;
										})];

                                        this.Absence_casesDataService.get_absence_cases_details_with_absence_cases_id
                                        (this.absence_cases_id)
                                        .subscribe(data => this.absence = data,
                                            error => console.log(),
                                            () => {
                                                this.other_situations = this.absence['data'][0].other_situations;
                                                this.date = this.absence['data'][0].date;
                                                this.effort_results = this.absence['data'][0].effort_results;
                                                this.end_year_state	= this.absence['data'][0].end_year_state;

                                            });
									});
							});

							
							
						});

                
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
