import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DepartmentMaster, SideDepartmentMaster } from '../../../../../DepartmentMaster.Model';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { Levels } from '../../../../../LevelsMaster.Model';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';
import { Classes} from '../../../../../ClassesMaster.Model';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import { Student } from '../../../../../StudentMaster.Model';
import { student_parent_meetingDataService } from '../../../../../Services/student_parent_meetingDataService ';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup} from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
    selector: 'kt-student_parent_meeting',
    templateUrl: './student_parent_meeting.component.html',
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
export class student_parent_meetingComponent implements OnInit {
 
	@Input() employee_data: any;
    id: string = "";
    date: string = "";
    level_name: string = "";
    level_id: string = "";
    class_name: string = "";
    class_id: string = "";
    student_id: string = "";
    student_name: string = "";
    reason: string = "";


    level: Levels[];
    selectedlevel: any;

    class: Classes[];
    selectedclass: any;

	student: Student[];
    selectedStudent : any;

    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlStudent = new FormControl('');

	StudentNameValue:any;
	classNameValue: string;
	LevelNameValue:string;

	departments: DepartmentMaster[];
    side_departments: SideDepartmentMaster[];
    jobs: DepartmentMaster[];
  
    form1: FormGroup;
    form2: FormGroup;
    
    constructor(
        private modalService: NgbModal,
        private cdRef:ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        public _fb: FormBuilder,
        private LevelsDataService: LevelsDataService,
        private ClassesDataService: ClassesDataService,
        private StudentDataService: StudentDataService,
        private student_parent_meetingDataService: student_parent_meetingDataService,
       ) {
        this.form1 = this._fb.group({
            date: ['', [Validators.required]],
            reason: ['', [Validators.required]]
        });
        this.form2 = this._fb.group({
			selectedStudent: ['', [Validators.required]],
			selectedclass: ['', [Validators.required]],
			selectedlevel: ['', [Validators.required]]
		});
        
    }
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
    todate: any;
	selectedjob: any;

	matcher = new MyErrorStateMatcher();
	value = 'Clear me';
    add_meeting() {

            var val = {
                date: this.date,
                level_id: this.selectedlevel.lev_id,
			    level_name: this.selectedlevel.lev_name,
			    class_id: this.selectedclass.class_id,			
			    class_name: this.selectedclass.class_name,
                student_id: Number(this.student_id),
                student_name: this.student_name,
                reason: this.reason
            };

            this.student_parent_meetingDataService.addstudent_parent_meeting(val).subscribe(res => {
               
                alert("Added succesfully");
                this.student_parent_meetingDataService.BClicked("b2");

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

    update_meeting() {
        var val = {
            id: Number(this.student_parent_meetingDataService.id),
            date: this.date,
            level_id: this.level_id,
			level_name: this.level_name,
			class_id: this.class_id, 
			class_name: this.class_name,          
            student_id: Number(this.selectedStudent.student_id),
            student_name: this.selectedStudent.student_name,
            reason: this.reason
		};      

        this.student_parent_meetingDataService.updatestudent_parent_meeting(val).subscribe(res => {
           
            alert("Updated Successfully");
            this.student_parent_meetingDataService.BClicked("b2");
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
    cancel_meeting() {
        this.form1.reset();
		
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
        if(this.class_id !== ""){

            this.StudentDataService.GetAllStudent_of_class(this.class_id)
            .subscribe(data => this.student = data,
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
        this.student_id = this.selectedStudent.student_id;
        this.student_name = this.selectedStudent.student_name;
    }

    classValue: any;
    levelValue:any;
    studentValue:any;
    studentVar:any;
    classVar:any;
    anotherStuArray:Student[];
    anotherClassArray:Classes[];
    anotherLevelArray: Levels[];
 
	priv_info:any=[];
    is_edit:boolean=false;
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


		this.student_parent_meetingDataService.aClickedEvent
			.subscribe((data: string) => {
				
this.is_edit=true;
                this.id = this.student_parent_meetingDataService.id.toString();
				this.level_id = this.student_parent_meetingDataService.level_id;
				this.level_name = this.student_parent_meetingDataService.level_name;
				this.class_id = this.student_parent_meetingDataService.class_id;
				this.class_name = this.student_parent_meetingDataService.class_name;
				this.student_id = this.student_parent_meetingDataService.student_id;
				this.student_name = this.student_parent_meetingDataService.student_name;
				this.date = this.student_parent_meetingDataService.date;
                this.reason = this.student_parent_meetingDataService.reason;

                var std_id =  this.student_parent_meetingDataService.student_id;
                this.StudentDataService.GetAllstudents_with_id(Number(std_id))
					.subscribe(data => this.anotherStuArray = data,
						error => console.log(),
						() => {
							// Get Student Object 
                            this.selectedStudent = this.anotherStuArray[0];
							
							// Get Class Object with Student Object 
							var class_id2 = this.student_parent_meetingDataService.class_id;

							this.ClassesDataService.GetAllClasses_with_id(Number(class_id2))
							.subscribe(data => this.anotherClassArray = data,
								error => console.log(),
							() => {
								this.selectedclass = this.anotherClassArray[0];

								// Get Level Object with Class Object 
								var level_id = this.student_parent_meetingDataService.level_id;

								this.LevelsDataService.GetAllLevels_with_id(level_id)
								.subscribe(data => this.anotherLevelArray = data,
									error => console.log(),
									() => {
										this.selectedlevel = this.anotherLevelArray[0];
									});
							});

                        });

                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

            });
		

	}
}
