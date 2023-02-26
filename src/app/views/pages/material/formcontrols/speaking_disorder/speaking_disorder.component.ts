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
import { Speaking_disorderDataService } from '../../../../../Services/Speaking_disorderDataService';
import { Speaking_disorderMaster, Speaking_disorder } from '../../../../../Speaking_disorderMaster.Model';
import * as def from '../../../../../definationsMaster.Model';
import moment from 'moment';
import { Observable } from 'rxjs'; 
import { FormArray, FormBuilder,  FormGroup} from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { Definition } from '../../../../../Definitions.Model';
import { DefinitionDataService } from '../../../../../Services/Definition';
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
    selector: 'kt-speaking_disorder',
    templateUrl: './speaking_disorder.component.html',
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
export class Speaking_disorderComponent implements OnInit {
 
	@Input() employee_data: any;
    speech_dis_id: number;
    lev_id: string = "";
    lev_name: string = "";
    class_id: string = "";
    class_name: string = "";
    student_id: string = "";
    student_name: string = "";
    nationality_id: string = "";
    nationality_name: string = "";
    phone_no: string = "";
    birth_date: string = "";
    work_start_date: string = "";
    behavioral_notes: string = "";
    dis_type: string = "";

    returned_speaking_id: string = "";

    speaking_details_id: number;
    other_situations: string = "";
    date: string = "";
    effort_results: string = "";
    end_year_state: string = "";

    psychol_visit_id: number;
    visit_date: string = "";
    visit_results: string = "";

    school: School_data[];
  
    jobs: DepartmentMaster[];
    
    nat: def.nat[];
    branch: def.branch[];
    eduregion: def.eduregion[];
    selectedbranch: any;
    selectedschool: any;
    selectedregion: any;
    selectedreason: any;

    date_of_birth:string="";
    nationality:string="";
    
    
    level: Levels[];
    selectedlevel: any;

    class: Classes[];
    selectedclass: any;

    student: Student[];
    selectedStudent : any;

    selected_student_id: any;
	selected_student_name: any;
    
    

    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlStudent = new FormControl('');

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
        private Speaking_disorderDataService: Speaking_disorderDataService,
        private School_dataDataService: School_dataDataService,
        private EmployeeService: EmployeeDataService,
        private DefinitionDataService: DefinitionDataService,
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
    add_speaking_dis() {
		
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {

                lev_id: Number(this.selectedlevel.lev_id),
                lev_name: this.selectedlevel.lev_name,

                class_id : Number(this.selectedclass.class_id),
                class_name: this.selectedclass.class_name,

                student_id: Number(this.selectedStudent.student_id),
                student_name: this.selectedStudent.student_name,
                
                nationality_id: 0, 
                nationality_name: this.nationality,

                phone_no: this.phone_no,
                birth_date: this.date_of_birth,

                work_start_date: this.work_start_date,
                behavioral_notes: this.behavioral_notes,
                
                dis_type: this.dis_type

            };
      
            this.Speaking_disorderDataService.addSpeaking_disorder(val)
            .subscribe(res => {
                this.speech_dis_id = res['data'][0].Column1;

                var details = {
                    speech_dis_id: this.speech_dis_id,
                    other_situations: this.other_situations,
                    date: this.date,
                    effort_results: this.effort_results,
                    end_year_state: this.end_year_state
                }

                this.Speaking_disorderDataService.addSpeaking_disorderDetailsFirst(details)
                .subscribe(res => {

                    var details2 = {
                        speech_dis_id: this.speech_dis_id,
                        visit_date: this.visit_date,
                        visit_results: this.visit_results,
                    }

                    this.Speaking_disorderDataService.addSpeaking_disorderDetailsSecond(details2)
                    .subscribe();

                });
                    
                alert("Saved Succesfully");
                this.Speaking_disorderDataService.BClicked("b2");
                this.form1.reset();
                this.myControlStudent.reset();
				this.myControlclass.reset();
				this.myControllev.reset();
               
            })

        }
      
	}

    update_speaking_dis() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {
                speech_dis_id: Number(this.Speaking_disorderDataService.speech_dis_id),
                lev_id: Number(this.selectedlevel.lev_id),
                lev_name: this.selectedlevel.lev_name,
                class_id: Number(this.selectedclass.class_id),
                class_name: this.selectedclass.class_name,
                student_id : Number(this.selectedStudent.student_id),
                student_name : this.selectedStudent.student_name,
                nationality_id: 0,
                nationality_name: this.nationality,
                phone_no: this.phone_no,
                birth_date: this.date_of_birth,
                work_start_date: this.work_start_date,
                behavioral_notes: this.behavioral_notes,
                dis_type: this.dis_type
            };

            this.Speaking_disorderDataService.updateSpeaking_disorder(val)
            .subscribe(res => {

                this.Speaking_disorderDataService.delete_from_speaking_details_first_with_speech_dis_id
                (Number(this.Speaking_disorderDataService.speech_dis_id))
                .subscribe(res => {
                    var details = {
                        speech_dis_id: this.Speaking_disorderDataService.speech_dis_id,
                        other_situations: this.other_situations,
                        date: this.date,
                        effort_results: this.effort_results,
                        end_year_state: this.end_year_state
                    }
                    this.Speaking_disorderDataService.addSpeaking_disorderDetailsFirst(details)
                    .subscribe(res => {
                        
                        this.Speaking_disorderDataService.delete_from_speaking_details_second_with_speech_dis_id
                        (Number(this.Speaking_disorderDataService.speech_dis_id))
                        .subscribe(res => {
                                var details2 = {
                                    speech_dis_id: this.Speaking_disorderDataService.speech_dis_id,
                                    visit_date: this.visit_date,
                                    visit_results: this.visit_results,
                                }
                                this.Speaking_disorderDataService.addSpeaking_disorderDetailsSecond(details2)
                                .subscribe();
                            });
                            this.is_edit=false;

    


                    })
                    
            })
        
            alert("Updated Succesfuly");
            this.Speaking_disorderDataService.BClicked("b2");
            this.form1.reset();
            this.myControlStudent.reset();
            this.myControlclass.reset();
            this.myControllev.reset();
          

		})
            this.form1.reset();
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
        if(this.class_id !== null && this.class_id !== undefined && this.class_id !== ""){

            this.StudentDataService.GetAllStudent_of_class(this.class_id).subscribe(data => this.student = data,
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
        this.phone_no =  this.selectedStudent.phone;
    }

    classValue: any;
    levelValue:any;
    studentValue:any;
    studentVar:any;
    classVar:any;
    anotherStuArray:Student[];
    anotherClassArray:Classes[];
    anotherLevelArray: Levels[];
    first:any[];
    second:any[];
    is_edit:boolean=false;

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
		
        this.Speaking_disorderDataService.aClickedEvent
			.subscribe((data: string) => {
                this.is_edit=true

                this.speech_dis_id = this.Speaking_disorderDataService.speech_dis_id;
                this.nationality_id = this.nationality_id;
                this.nationality_name = this.Speaking_disorderDataService.nationality_name;
                this.phone_no = this.Speaking_disorderDataService.phone_no;
                this.birth_date = this.Speaking_disorderDataService.birth_date;
                this.work_start_date = this.Speaking_disorderDataService.work_start_date;
                this.behavioral_notes = this.Speaking_disorderDataService.behavioral_notes;
                this.dis_type = this.Speaking_disorderDataService.dis_type;

                this.speaking_details_id = this.speaking_details_id;
                this.other_situations = this.Speaking_disorderDataService.other_situations;
                this.date = this.Speaking_disorderDataService.date;
                this.effort_results = this.Speaking_disorderDataService.effort_results;
                this.end_year_state = this.Speaking_disorderDataService.end_year_state;

                this.psychol_visit_id = this.psychol_visit_id;
                this.visit_date = this.Speaking_disorderDataService.visit_date;
                this.visit_results = this.Speaking_disorderDataService.visit_results;

                this.selected_student_id = this.Speaking_disorderDataService.student_id;
				this.selected_student_name = this.Speaking_disorderDataService.student_name;
        
                this.studentValue = this.Speaking_disorderDataService.student_name;

					this.StudentDataService.GetAlldepartment()
					.subscribe(data => this.anotherStuArray = data,
						error => console.log(),
						() => {
							// Get Student Object 
							var id = this.Speaking_disorderDataService.student_id;
							this.studentVar = this.anotherStuArray[this.anotherStuArray.findIndex(function (el) {
					
								return el.student_id == id;
							})];
                            this.selectedStudent = this.studentVar;

							this.nationality = this.studentVar.student_nationality;
							this.phone_no = this.studentVar.phone;
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
                                         
                                        this.Speaking_disorderDataService.get_speaking_details_first_with_speech_dis_id(this.speech_dis_id)
                                        .subscribe((data:any) => this.first = data.data,
                                            error => console.log(),
                                        () => {

                                            this.other_situations = this.first[0].other_situations;
                                            this.date = this.first[0].date;
                                            this.effort_results = this.first[0].effort_results;
                                            this.end_year_state = this.first[0].end_year_state;

                                            this.Speaking_disorderDataService.get_speaking_details_second_with_speech_dis_id(this.speech_dis_id)
                                            .subscribe((data:any) => this.second = data.data,
                                            error => console.log(),
                                            () => {
                                                    this.visit_date = this.second[0].visit_date;
                                                    this.visit_results = this.second[0].visit_results;
                                            });
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
