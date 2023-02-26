import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ta7dier_masterDataService } from '../../../../../Services/Ta7dier_masterDataService';
import { SubjectDataService } from '../../../../../Services/SubjectDataService';
import { Ta7dier, Ta7dier_masterMaster } from '../../../../../Ta7dier_masterMaster.Model';
import { SubjectMaster, Subjects } from '../../../../../SubjectMaster.Model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Levels,LevelsMaster } from '../../../../../LevelsMaster.Model';
import { eachWeekOfInterval, getWeek, format,Locale } from 'date-fns';
import * as loc    from 'date-fns/locale';
import * as loc_test    from 'date-fns';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { Employee,EmployeeMaster } from '../../../../../EmployeeMaster.Model';
import { gdwel_7ssDataService } from '../../../../../Services/gdwel_7ssDataService';
import { gdwel_7ss,gdwel_7ssMaster } from '../../../../../gdwel_7ssMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
	selector: 'kt-card',
	templateUrl: './card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-card {
		max-width: 400px;
	  }
	.example-header-image {
		background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
		background-size: cover;
	  }
	`]

})
export class CardComponent implements OnInit {
	breadCrumbItems: Array<{}>;

	public Editor = ClassicEditor;
	@ViewChild("myEditor", { static: false }) myEditor: any;
	@Input() ta7dier_master_data: any;
	ta7dier_id: number;
	emp_id: string;
	emp_name: string = "";
	subject_id: string = "";
	subject_name: string = "";
	grade_id: string;
	grade_name: string = "";
	ta7dier_date: string = "";
	ta7dier_week: string = "";
	ta7dier_day: string;
	ta7dier_state_id: string = "";
	state_name: string = "";
	ta7dier_name: string = "";
	ta7dier_body: string;
	ta7dier_notes: string = "";
	ta7dier_supervision_state_id: string = "";
	ta7dier_supervision_state_name: string = "";
	ta7dier_state_name: string = "";
	ta7dier_file:string="";
	is_edit:boolean=false;
	public onChange({ editor }: ChangeEvent) {
		const data = editor.getData();
		this.data = data;
	}
	
	
	weeks = [
		{ value: '1', viewValue: 'اسبوع1' },
		{ value: '2', viewValue: 'اسبوع2' },
		{ value: '3', viewValue: 'اسبوع3' }
	];
	days = [
		{ value: '1', viewValue: 'الاحد' },
		{ value: '2', viewValue: 'الاثنين' },
		{ value: '3', viewValue: 'الثلاثاء' },
		{ value: '3', viewValue: 'الاربعاء' },
		{ value: '3', viewValue: 'الخميس' }
	];
	class = [
		{ value: '1', viewValue: 'صف1' },
		{ value: '2', viewValue: 'صف2' },
		{ value: '3', viewValue: 'صف3' }
	];
    subjects: Subjects[];
    levels: Levels[];
	Employee: Employee[];
	gdwel_7ss: gdwel_7ss[];
    selectedsubject: any;

    selectedlevel: any;
    selectedday: any;
    selectedweek: any;
    data: any="";
    form1: FormGroup;
	decoded:any;
	hasPermission = false;
	constructor(private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private gdwel_7ssDataService: gdwel_7ssDataService,
		private EmployeeDataService: EmployeeDataService,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,
		private LevelsDataService: LevelsDataService,
		private ta7dier_masterDataService: ta7dier_masterDataService, 
		private SubjectDataService: SubjectDataService) {
		
			const userToken = localStorage.getItem(environment.authTokenKey);
			this.decoded = jwt_decode(userToken);
	
			this.test();

			this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id).subscribe(data => this.Employee = data,
			error => console.log(),
            () => { 
				this.SubjectDataService.get_subject_def_with_dep_id(this.Employee[0].emp_dep_id).subscribe(data => this.subjects = data,
				error => console.log());
			
			});

			this.gdwel_7ssDataService.get_gdwel_7ss_with_emp_id(this.decoded.id).subscribe(data => this.levels = data,
				error => console.log());

        	this.form1 = this._fb.group({
				selectedsubject: ['', [Validators.required]],
				
				selecteddate: [{ value: '', disabled: false }, [Validators.required]],
        	});
    }


	test (){
		
		type ArabicLocale =Locale & {
			firstDayOfWeek: number;
			weekdays: string[];
			weekdaysShort: string[];
			months: string[];
			monthsShort: string[];
		  };
		
		const arabicEGLocale: ArabicLocale = {
		  firstDayOfWeek: 6,
		  weekdays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
		  weekdaysShort: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
		  months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
		  monthsShort: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
		};
		
		function toArabicOrdinal(num) {
		  const arabicOrdinals = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر'];
		  return arabicOrdinals[num - 1];
		}
		
		const date1 = new Date(2022, 1, 1); // January 1, 2022
		const date2 = new Date(2023, 2, 1); // July 1, 2022
		
		const weeks = eachWeekOfInterval({ start: date1, end: date2 });
		const weekLabels = weeks.map((week, index) => {
		  const start = week[0];
		  const weekOfYear = getWeek(start, { locale: arabicEGLocale });
		return `[{الاسبوع ${index+1}},"id":${index+1}]`;
		});
		
		 
	}

		file: File;
		base64textString: string;
		ta7dier_file_type:any;

	handleFileSelect(evt) {
		  const files = evt.target.files;
		  this.file = files[0];
		  this.ta7dier_file_type=files[0].type
		  // FileReader API
		  const reader = new FileReader();
		  // Reading image as base64 string
		  reader.readAsDataURL(this.file);
		  reader.onload = () => {
			this.base64textString = reader.result as string;
			this.ta7dier_file=this.base64textString;
		//	console.log("uploaded",this.base64textString )
		  };
	}

		disable:any;
		is_file:any;
	side_dep_chck_change(event) {
			if (event.checked == true) {
				this.disable = true;
				this.is_file=1
			}
			if (event.checked === false) {
				this.disable = false;
				this.is_file=0
			}
	}

	add_ta7dier_master() {
		
		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

			var val = {

				emp_id:this.decoded.id,
				emp_name: this.emp_name,
				subject_id: Number(this.selectedsubject.subject_id),
				subject_name: this.selectedsubject.subject_name,
				grade_id: this.selectedlevel.lev_id,
				grade_name: this.selectedlevel.lev_name,
				ta7dier_date: this.ta7dier_date,
				ta7dier_week: Number(this.selectedweek.value),
				ta7dier_day: Number(this.selectedday.value),
				ta7dier_state_id: Number(this.ta7dier_state_id),
				state_name: this.state_name,
				ta7dier_name: this.ta7dier_name,
				ta7dier_body: this.data,
				ta7dier_notes: this.ta7dier_notes,
				ta7dier_supervision_state_id: Number(this.ta7dier_supervision_state_id),
				ta7dier_supervision_state_name: this.ta7dier_supervision_state_name,
				ta7dier_state_name: this.ta7dier_state_name,
				ta7dier_file:this.ta7dier_file,
				ta7dier_file_type:this.ta7dier_file_type,
				is_file: this.is_file,
				route: this.router.url as string,

			};
			this.ta7dier_masterDataService.addTa7dier_master(val).subscribe(res => {
				alert("Saved Successfuly");
				this.ta7dier_masterDataService.BClicked("");
				this.form1.reset();
			})
			this.form1.reset();
		}
	}

	ta7diers: Ta7dier_masterMaster[];
	
	udpate_ta7dier_master() {

		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

		var val = {
			ta7dier_id: Number(this.ta7dier_id),
			
			emp_id: this.decoded.id,
			emp_name: this.emp_name,
			subject_id: Number(this.selectedsubject.subject_id),
			subject_name: this.selectedsubject.subject_name,
            grade_id: this.selectedlevel.lev_id,
            grade_name: this.selectedlevel.lev_name,
			ta7dier_date: this.ta7dier_date,
            ta7dier_week: Number(this.selectedweek.value),
            ta7dier_day: Number(this.selectedday.value),
			ta7dier_state_id: Number(this.ta7dier_state_id),
			state_name: this.state_name,
			ta7dier_name: this.ta7dier_name,
			ta7dier_body: this.data,
			ta7dier_notes: this.ta7dier_notes,
			ta7dier_supervision_state_id: Number(this.ta7dier_supervision_state_id),
			ta7dier_supervision_state_name: this.ta7dier_supervision_state_name,
			ta7dier_state_name: this.ta7dier_state_name,
			ta7dier_file:this.ta7dier_file,
			ta7dier_file_type:this.ta7dier_file_type,
			is_file: this.is_file,
			route: this.router.url as string
		};

		this.ta7dier_masterDataService.updateTa7dier_master(val).subscribe(res => {
            alert(res.toString());
            this.ta7dier_masterDataService.BClicked("");
            this.form1.reset();
			this.is_edit=false;
		})
			this.form1.reset();
		}
	}
    
	openFile(base64textString) {
		
	const base64Data = base64textString.substring(base64textString.indexOf(',') + 1);
		const fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
		const base64File = base64Data;
		const blob = this.b64toBlob(base64File, fileType);
		const blobUrl = URL.createObjectURL(blob);
		// const link = document.createElement('a');
		// 	link.download = "test.pdf";
		// 	link.href = blobUrl;
		// 	link.click();
		window.open(blobUrl, '_blank');
	  }
	
	  b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
		const byteCharacters = atob(b64Data);
		const byteArrays = [];
	  
		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		  const slice = byteCharacters.slice(offset, offset + sliceSize);
	  
		  const byteNumbers = new Array(slice.length);
		  for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		  }
	  
		  const byteArray = new Uint8Array(byteNumbers);
		  byteArrays.push(byteArray);
		}
	  
		return new Blob(byteArrays, { type: contentType });
	  }
	  myControllev = new FormControl('');

	  filteredOptionslev: Observable<any[]>;
	  private _filterlev(value: string) {
		  const filterValue = value.toLowerCase();
		  return this.levels.filter(option => option.lev_name.toLowerCase().includes(filterValue));
	  }
	  displayFnlev(selectedoption) {
		  return selectedoption ? selectedoption.lev_name : undefined;
	  }

	priv_info:any[] = [];
	ngOnInit() {
		
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>{
			this.priv_info = data;
			if(this.priv_info[0].write == 1 || this.priv_info[0].read_and_write == 1){
				this.hasPermission = true
				this.cdRef.detectChanges();
			}}); 

			this.LevelsDataService.GetAllLevels().subscribe(data => this.levels = data,
				error => console.log(),
				() => {
					this.filteredOptionslev = this.myControllev.valueChanges
						.pipe(
							startWith(''),
							map(value => value? typeof value === 'string' ? value : value.lev_name : ''),
							map(lev_name => lev_name ? this._filterlev(lev_name) : this.levels.slice())
						);
				});
		
		this.ta7dier_masterDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.ta7dier_id = Number(this.ta7dier_masterDataService.ta7dier_id);
				
				this.emp_id = this.ta7dier_masterDataService.emp_id;
				this.emp_name = this.ta7dier_masterDataService.emp_name;
				//this.subject_id = this.ta7dier_masterDataService.subject_id;
				//this.subject_name = this.ta7dier_masterDataService.subject_name;
				this.grade_id = this.ta7dier_masterDataService.grade_id;
				this.grade_name = this.ta7dier_masterDataService.grade_name;
				this.ta7dier_date = this.ta7dier_masterDataService.ta7dier_date;
				this.ta7dier_week = this.ta7dier_masterDataService.ta7dier_week;
				this.ta7dier_day = this.ta7dier_masterDataService.ta7dier_day;
				this.ta7dier_state_id = this.ta7dier_masterDataService.ta7dier_state_id;
				this.state_name = this.ta7dier_masterDataService.state_name;
				this.ta7dier_name = this.ta7dier_masterDataService.ta7dier_name;
				this.data = this.ta7dier_masterDataService.ta7dier_body;
				this.ta7dier_notes = this.ta7dier_masterDataService.ta7dier_notes;
				this.ta7dier_supervision_state_id = this.ta7dier_masterDataService.ta7dier_supervision_state_id;
				this.ta7dier_supervision_state_name = this.ta7dier_masterDataService.ta7dier_supervision_state_name;
				this.ta7dier_state_name = this.ta7dier_masterDataService.ta7dier_state_name;

				

				this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id).subscribe(data => this.Employee = data,
					error => console.log(),
					() => { 
						this.SubjectDataService.get_subject_def_with_dep_id(this.Employee[0].emp_dep_id).subscribe(data => this.subjects = data,
						error => console.log(),
						() => {
							var selected_value_emp = this.ta7dier_masterDataService.subject_id
							this.selectedsubject = this.subjects[this.subjects.findIndex(function (el) {
								return String(el.subject_id) == selected_value_emp
							})];
						}); 
					});

					
					this.LevelsDataService.GetAllLevels().subscribe(data => this.levels = data,
						error => console.log(),
						() => {
							var selected_level = Number(this.ta7dier_masterDataService.grade_id);
							this.selectedlevel = this.levels[this.levels.findIndex(function (el) {
								return el.lev_id == selected_level;
							})];
						});
							
                var selected_week = String(this.ta7dier_masterDataService.ta7dier_week);
                this.selectedweek = this.weeks[this.weeks.findIndex(function (el) {

                    return String(el.value) == selected_week;

                })];

                var selected_day = String(this.ta7dier_masterDataService.ta7dier_day);
                this.selectedday = this.days[this.days.findIndex(function (el) {

                    return String(el.value) == selected_day;

                })];

				
				this.cdRef.detectChanges();

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
	
		this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];
		
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
