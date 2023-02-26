import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Good_bad_students_cardDataService } from '../../../../../Services/Good_bad_students_cardDataService';
import { SubjectDataService } from '../../../../../Services/SubjectDataService';

import { SubjectMaster, Subjects } from '../../../../../SubjectMaster.Model';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';
import { Levels, LevelsMaster } from '../../../../../LevelsMaster.Model';
import { Classes, ClassesMaster } from '../../../../../ClassesMaster.Model';
import { Student,StudentMaster } from '../../../../../StudentMaster.Model';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import { ActivityDataService } from '../../../../../Services/ActivityDataService';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'kt-divider',
	templateUrl: './divider.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.mat-list-icon {
		color: rgba(0, 0, 0, 0.54);
	  }
	  .mat-toolbar > * + .mat-divider-vertical {
		margin-right: 16px;
	}
	.mat-toolbar > .mat-divider-vertical + * {
		margin-right: 24px;
		margin-left: -1px;
	}
	`],
	providers: [Good_bad_students_cardDataService]
})
export class DividerComponent implements OnInit {
	@Input() good_bad_students_card_data: any;
	student_card_id: number;
	good_card_id: string;
	bad_card_id: string = "";
	grade_id: string = "";
	garde_name: string = "";
	class_id: string;
	class_name: string = "";
	subject_id: string = "";
	subject_name: string = "";
	student_id: string;
	student_name: string = "";
	good_ebda3: string = "";
	good_tahfeez: string = "";
	good_result: string;
	bad_da3f: string = "";
	bad_da3f_reasons: string = "";
	bad_cure_ways: string = "";
	bad_result: string = "";
 
	
	exampleBasicDivider;
	exampleVertical;
	exampleList;

	level: Levels[];
    selectedlevel: any;

    class: Classes[];
    selectedclass: any;

	selectedsubject: any;
	student: Student[];
    selectedStudent : any;

	studentNameValue : string;
	subjectNameValue: string;
	levelNameValue: string;
	classNameValue: string;

	myControllev = new FormControl('');
    myControlclass = new FormControl('');
	myControlStudent = new FormControl('');
	myControlsub = new FormControl('');


    subjects: Subjects[];

    form1: FormGroup;
	constructor(private modalService: NgbModal,
		private cdRef: ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		private StudentDataService: StudentDataService,
		private ActivityDataService: ActivityDataService,
		private ClassesDataService: ClassesDataService, 
		private LevelsDataService: LevelsDataService, 
		public _fb: FormBuilder,
		private Good_bad_students_cardService: Good_bad_students_cardDataService,
		 private SubjectDataService: SubjectDataService) {
        //this.form1 = this._fb.group({
        //    selectedsubject: ['', [Validators.required]],
        //    good_ebda3: ['', [Validators.required]],
        //    good_tahfeez: ['', [Validators.required]],
        //    good_result: ['', [Validators.required]]
        //});
        this.SubjectDataService.GetAllSubject().subscribe(data => this.subjects = data,
			error => console.log(error),
            () => { console.log("department dropdown") });

        this.ClassesDataService.GetAllClasses().subscribe(data => this.class = data,
            error => console.log(error),
            () => { console.log("department dropdown") });

        this.LevelsDataService.GetAllLevels().subscribe(data => this.level = data,
            error => console.log(error),
            () => { console.log("department dropdown") });
	}

	add_good_bad_students_card() {
		//var test1
		//test1 = this.departments[this.selecteddepartment]
		//var schoolterm
		//schoolterm = this.activities[this.activity_school_term]
        //if (this.form1.invalid) {
        //    console.log('Form invalid...');
        //    this.form1.markAllAsTouched();
        //} else {
            var val = {

                good_card_id: 0,
                bad_card_id: 0,
                
                grade_id: Number(this.selectedlevel.lev_id),
				garde_name: this.selectedlevel.lev_name,

				class_id: Number(this.selectedclass.class_id),
				class_name: this.selectedclass.class_name,

                subject_id: Number(this.selectedsubject.subject_id),
				subject_name: this.selectedsubject.subject_name,

				student_id: Number(this.selectedStudent.student_id),
				student_name: this.selectedStudent.student_name,

                good_ebda3: this.good_ebda3,
                good_tahfeez: this.good_tahfeez,
                good_result: this.good_result,

                bad_da3f: "",
                bad_da3f_reasons: "",
                bad_cure_ways: "",
                bad_result: ""

            };
            console.log("new card", val)

            this.Good_bad_students_cardService.addGood_bad_students_card(val).subscribe(res => {
                alert("Added Succesfully");
                this.Good_bad_students_cardService.BClicked("")
            })
            console.log(val)
        //    this.form1.reset();
        //}
	}
  
	update_goodbadstudents() {

    /*console.log("emp", emp, this.employeedepartment );*/
        //if (this.form1.invalid) {
        //    console.log('Form invalid...');
        //    this.form1.markAllAsTouched();
        //} else {
            var val = {

                student_card_id: this.student_card_id,
                good_card_id: 0,
                bad_card_id: 0,
                
                grade_id: Number(this.selectedlevel.lev_id),
				garde_name: this.selectedlevel.lev_name,

				class_id: Number(this.selectedclass.class_id),
				class_name: this.selectedclass.class_name,

                subject_id: Number(this.selectedsubject.subject_id),
				subject_name: this.selectedsubject.subject_name,

				student_id: Number(this.selectedStudent.student_id),
				student_name: this.selectedStudent.student_name,

                good_ebda3: this.good_ebda3,
                good_tahfeez: this.good_tahfeez,
                good_result: this.good_result,

                bad_da3f: "",
                bad_da3f_reasons: "",
                bad_cure_ways: "",
                bad_result: ""
            };

            console.log("updated card", val);

            this.Good_bad_students_cardService.updateGood_bad_students_card(val).subscribe(res => {
                alert("Updated Successfully");
                this.Good_bad_students_cardService.BClicked("")
/*                this.form1.reset()*/;
this.is_edit=false;
            })
/*        }*/

	}
    cancel_goodbadstudents() {
/*        this.form1.reset();*/
this.is_edit=false;
	}


	filteredOptions: Observable<any[]>;

	private _filter(value: string) {
		const filterValue = value.toLowerCase();
		return this.subjects.filter(option => option.subject_name.toLowerCase().includes(filterValue));		
	}
	displayFn(selectedoption) {
		return selectedoption ? selectedoption.subject_name : undefined;
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

    change_level(event) {
        this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
            error => console.log(error),
            () => {
                console.log("class dropdown", this.class);
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
        this.class_id = event.class_id;
        console.log(" class id",  event.class_id);
        this.Change_Student();
    }

	filteredOptionsStudents:  Observable<any[]>;

    private _filterStudent(value: string) {
        const filterValue = value.toLowerCase();
        return this.student.filter(option => option.student_name.toLowerCase().includes(filterValue));
    }

    displayFnStudent(selectedoption) {
        return selectedoption ? selectedoption.student_name : undefined;
    }

	Change_Student(){
        this.StudentDataService.GetAllStudent_of_class(this.class_id).subscribe(data => this.student = data,
            error => console.log(error),
            () => {
                console.log("student dropdown", this.student);
                
                this.filteredOptionsStudents = this.myControlStudent.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.student_name),
                        map(student_name => student_name ? this._filterStudent(student_name) : this.student.slice())
                    );
            });

            
        console.log("selected student", this.selectedStudent);
        this.setData();

    }
  
    setData(){        
        this.Good_bad_students_cardService.student_id = this.selectedStudent.student_id;
        this.Good_bad_students_cardService.student_name = this.selectedStudent.student_name;
    }


	priv_info:any;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(error),
            () => {console.log("privvv",this.priv_info);
		}); 

		this.SubjectDataService.GetAllSubject().subscribe(data => this.subjects = data,
			error => console.log(error),
			() => {
				console.log("emp dropdown", this.subjects);
				this.filteredOptions = this.myControlsub.valueChanges
					.pipe(
						startWith(''),
						map(value => typeof value === 'string' ? value : value.subject_name),
						map(subject_name => subject_name ? this._filter(subject_name) : this.subjects.slice())
					);
			});

		this.LevelsDataService.GetAllLevels().subscribe(data => this.level = data,
			error => console.log(error),
			() => {
				console.log("emp dropdown", this.level);
				this.filteredOptionslev = this.myControllev.valueChanges
					.pipe(
						startWith(''),
						map(value => typeof value === 'string' ? value : value.lev_name),
						map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
					);
			});

		this.ClassesDataService.GetAllClasses().subscribe(data => this.class = data,
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
		

		this.Good_bad_students_cardService.aClickedEvent
			.subscribe((data: string) => {
				console.log("edited");
				//(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
				//(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
				//(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
				//(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;

				this.student_card_id = Number(this.Good_bad_students_cardService.student_card_id);
				this.good_card_id = this.Good_bad_students_cardService.good_card_id;
				this.bad_card_id = this.Good_bad_students_cardService.bad_card_id;

				this.grade_id = this.Good_bad_students_cardService.grade_id;
				this.garde_name = this.Good_bad_students_cardService.garde_name;

				this.class_id = this.Good_bad_students_cardService.class_id;
				this.class_name = this.Good_bad_students_cardService.class_name;

				this.subject_id = this.Good_bad_students_cardService.subject_id;
				this.subject_name = this.Good_bad_students_cardService.subject_name;

				this.student_id = this.Good_bad_students_cardService.student_id;
				this.student_name = this.Good_bad_students_cardService.student_name;

				this.good_ebda3 = this.Good_bad_students_cardService.good_ebda3;
				this.good_tahfeez = this.Good_bad_students_cardService.good_tahfeez;
				this.good_result = this.Good_bad_students_cardService.good_result;

				this.bad_da3f = this.Good_bad_students_cardService.bad_da3f;
				this.bad_da3f_reasons = this.Good_bad_students_cardService.bad_da3f_reasons;
				this.bad_cure_ways = this.Good_bad_students_cardService.bad_cure_ways;
                this.bad_result = this.Good_bad_students_cardService.bad_result;

				this.studentNameValue = this.Good_bad_students_cardService.student_name;
				this.subjectNameValue = this.Good_bad_students_cardService.subject_name;
				this.levelNameValue = this.Good_bad_students_cardService.garde_name;
				this.classNameValue = this.Good_bad_students_cardService.class_name;

                var selected_subject = String(this.Good_bad_students_cardService.subject_id);
                this.selectedsubject = this.subjects[this.subjects.findIndex(function (el) {
                    return String(el.subject_id) == selected_subject;

                })];

                var selectedlevel = String(this.Good_bad_students_cardService.grade_id);
                this.selectedlevel = this.level[this.level.findIndex(function (el) {
                    return String(el.lev_id) == selectedlevel;

                })];

                var selectedclass = String(this.Good_bad_students_cardService.class_id);
                this.selectedclass = this.class[this.class.findIndex(function (el) {
                    return String(el.class_id) == selectedclass;

                })];
				console.log("edited")

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

		});

		(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
		
	}

	display = "";
	openModal(content: any, event: any) {

		this.modalService.open(content, { backdrop: true, size: "xl", });
	}
	openModal1() {
		this.display = "show";
		console.log("clicked")
		this.cdRef.detectChanges();
	}
	onCloseHandled() {
		this.display = "";
	}
}
