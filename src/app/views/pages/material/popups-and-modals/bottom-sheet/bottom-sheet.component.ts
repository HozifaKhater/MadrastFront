import { Component,ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { Employee } from '../../../../../EmployeeMaster.Model';
import { School_dataDataService } from '../../../../../Services/School_dataDataService';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Logo_converterDataService } from '../../../../../Services/Logo_converterDataService';
import { image } from './image.const';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-bottom-sheet',
	templateUrl: './bottom-sheet.component.html'
})
export class BottomSheetComponent implements OnInit {
	@Input() school_data_data: any;
	school_id: number;
	school_name: string = "";
	school_man: string = "";
	school_assis1: string = "";
	school_assis2: string = "";
	school_assis3: string = "";
	school_assis4: string = "";
	school_bdala: string = "";
	school_faks: string = "";
	school_addr: string = "";
	school_dir: string = "";
	school_logo: string = "";
	
	school_assis1_id	:string="";
	school_assis2_id	:string="";
	school_assis3_id	:string="";
	school_assis4_id	:string="";
	school_man_id	:string="";

	public selectedimage;
	public event1;
	imgURL: any;
	receivedImageData: any;
	b64: any="";
	convertedImage: any;
	currVerifiedLoanOfficerPhoto: any;

	Employees: Employee[];
	Employees1: Employee[];
	Employees2: Employee[];
	Employees3: Employee[];
	Employees4: Employee[];

	school_manager: string;
	manager_ass1: string;
	manager_ass2: string;
	manager_ass3:string ;
	manager_ass4:string ;
	selected: string;

	file: any;
	exampleBasic;

	public onFileChanged(event) {

		var file = event.target.files[0],
			reader = new FileReader();

        reader.onloadend = () => {
            this.b64 = reader.result as string;			
		};
	
        reader.readAsDataURL(file)
	}


	imageSource;
  onImageConverted() {
	  this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
	  this.Logo_converterDataService.logo = image;
	
	  this.Logo_converterDataService.AClicked('Component A is clicked!!');
	}

	form1: FormGroup;
	constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,
		private httpClient: HttpClient, 
		private sanitizer: DomSanitizer,
		private EmployeeService: EmployeeDataService,
		private School_dataDataService: School_dataDataService, 
		private Logo_converterDataService: Logo_converterDataService) {
			this.form1 = this._fb.group({
				school_name: ['', [Validators.required]],
				employeedepartment1: [],
				employeedepartment2: [],
				employeedepartment3: [],
				employeedepartment4: [],
				employeedepartment5: [],
				school_bdala: ['', [Validators.required]],
				school_faks: [],
				school_addr: [],
				school_dir: []
			});
		
			this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees = data,
				error => console.log());

			this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees1 = data,
				error => console.log());

			this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees2 = data,
				error => console.log());

			this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees3 = data,
				error => console.log());

			this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees4 = data,
				error => console.log());
	}
	openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	myControlManager = new FormControl('');
	filteredOptionsManager: Observable<any[]>;
    private _filterManager(value: string) {
        const filterValue = value.toLowerCase();
        return this.Employees.filter(option => option.emp_name.toLowerCase().includes(filterValue));
    }
    displayFnManager(selectedoption) {
        return selectedoption ? selectedoption.emp_name : undefined;
    }
	selectedManager:any =[];
	managerValue:string="";

	


	myControlAss1 = new FormControl('');
	filteredOptionsAs1: Observable<any[]>;
    private _filterAss1(value: string) {
        const filterValue = value.toLowerCase();
        return this.Employees1.filter(option => option.emp_name.toLowerCase().includes(filterValue));
    }
    displayFnAss1(selectedoption) {
        return selectedoption ? selectedoption.emp_name : undefined;
    }
	selectedAss1:any =[];
	Ass1Value:string="";



	myControlAss2 = new FormControl('');
	filteredOptionsAss2: Observable<any[]>;
    private _filterAss2(value: string) {
        const filterValue = value.toLowerCase();
        return this.Employees2.filter(option => option.emp_name.toLowerCase().includes(filterValue));
    }
    displayFnAss2(selectedoption) {
        return selectedoption ? selectedoption.emp_name : undefined;
    }
	selectedAss2:any =[];
	Ass2Value:string="";



	myControlAss3 = new FormControl('');
	filteredOptionsAss3: Observable<any[]>;
    private _filterAss3(value: string) {
        const filterValue = value.toLowerCase();
        return this.Employees3.filter(option => option.emp_name.toLowerCase().includes(filterValue));
    }
    displayFnAss3(selectedoption) {
        return selectedoption ? selectedoption.emp_name : undefined;
    }
	selectedAss3:any=[];
	Ass3Value:string="";



	myControlAss4 = new FormControl('');
	filteredOptionsAss4: Observable<any[]>;
    private _filterAss4(value: string) {
        const filterValue = value.toLowerCase();
        return this.Employees4.filter(option => option.emp_name.toLowerCase().includes(filterValue));
    }
    displayFnAss4(selectedoption) {
        return selectedoption ? selectedoption.emp_name : undefined;
    }
	selectedAss4:any =[];
	Ass4Value:string="";


	add_school() {
		if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
			
		var val = {

			school_name:this.school_name,
			school_man: this.selectedManager.emp_name,
			school_assis1: this.selectedAss1.emp_name,
			school_assis2: this.selectedAss2.emp_name,
			school_assis3: this.selectedAss3.emp_name,
			school_assis4: this.selectedAss4.emp_name,
			school_bdala: this.school_bdala,
			school_faks: this.school_faks,
			school_addr: this.school_addr,
			school_dir: this.school_dir,
			school_logo: this.b64,
			school_assis1_id: Number(this.selectedManager.emp_id)	,
			school_assis2_id: Number(this.selectedAss1.emp_id)	,
			school_assis3_id:  Number(this.selectedAss2.emp_id)	,
			school_assis4_id: Number(this.selectedAss3.emp_id),
			school_man_id	:  Number(this.selectedAss4.emp_id)	

		};

		this.School_dataDataService.addSchool_data(val).subscribe(res => {
           alert("Added Successfully");
		   this.form1.reset();

		   this.myControlAss1.reset();
			this.myControlAss2.reset();
			this.myControlAss3.reset();
			this.myControlAss4.reset();
			this.myControlManager.reset();

		   this.School_dataDataService.BClicked("");
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
        this.Logo_converterDataService.logo = this.b64;
        this.Logo_converterDataService.AClicked('Component A is clicked!!');
	}
	}
	//corridorsDataService: corridorsDataService;
	update_school() {
		if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
			
		var val = {
			school_id: Number(this.school_id),

			school_name:this.school_name,
			school_man: this.selectedManager.emp_name,
			school_assis1: this.selectedAss1.emp_name,
			school_assis2: this.selectedAss2.emp_name,
			school_assis3: this.selectedAss3.emp_name,
			school_assis4: this.selectedAss4.emp_name,
			school_bdala: this.school_bdala,
			school_faks: this.school_faks,
			school_addr: this.school_addr,
			school_dir: this.school_dir,
			school_logo: this.b64,
			school_assis1_id: Number(this.selectedManager.emp_id)	,
			school_assis2_id: Number(this.selectedAss1.emp_id)	,
			school_assis3_id:  Number(this.selectedAss2.emp_id)	,
			school_assis4_id: Number(this.selectedAss3.emp_id),
			school_man_id	:  Number(this.selectedAss4.emp_id)	
		};


		this.School_dataDataService.updateSchool_data(val).subscribe(res => {
			alert("Updated Successfully");
			this.form1.reset();
			
this.is_edit=false;
			this.myControlAss1.reset();
			this.myControlAss2.reset();
			this.myControlAss3.reset();
			this.myControlAss4.reset();
			this.myControlManager.reset();
			this.School_dataDataService.BClicked("");
			
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
	}
	cancel_school() {
		this.form1.reset();
		
this.is_edit=false;
	}


	anotherArrayMang:Employee[];
	Mang: any = [];
	Ass1: any =[];
	Ass2: any =[];
	Ass3: any = [];
	Ass4: any = [];
	is_edit:boolean=false;
	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});


			this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees = data,
				error => console.log(),
				() => {
					this.filteredOptionsManager = this.myControlManager.valueChanges
					.pipe(
						startWith(''),
						map(value => value? typeof value === 'string' ? value : value.emp_name :''),
						map(emp_name => emp_name ? this._filterManager(emp_name) : this.Employees.slice())
					);
			});

			this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees1 = data,
				error => console.log(),
				() => {
					this.filteredOptionsAs1 = this.myControlAss1.valueChanges
					.pipe(
						startWith(''),
						map(value => value? typeof value === 'string' ? value : value.emp_name :''),
						map(emp_name => emp_name ? this._filterAss1(emp_name) : this.Employees1.slice())
					);
			});

			this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees2 = data,
				error => console.log(),
				() => {
					this.filteredOptionsAss2 = this.myControlAss2.valueChanges
					.pipe(
						startWith(''),
						map(value => value? typeof value === 'string' ? value : value.emp_name:''),
						map(emp_name => emp_name ? this._filterAss2(emp_name) : this.Employees2.slice())
					);
			});
			this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees3 = data,
				error => console.log(),
				() => {
					this.filteredOptionsAss3 = this.myControlAss3.valueChanges
					.pipe(
						startWith(''),
						map(value => value? typeof value === 'string' ? value : value.emp_name : ''),
						map(emp_name => emp_name ? this._filterAss3(emp_name) : this.Employees3.slice())
					);
			});
			this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees4 = data,
				error => console.log(),
				() => {
					this.filteredOptionsAss4 = this.myControlAss4.valueChanges
					.pipe(
						startWith(''),
						map(value => value? typeof value === 'string' ? value : value.emp_name :''),
						map(emp_name => emp_name ? this._filterAss4(emp_name) : this.Employees4.slice())
					);
			});

		this.School_dataDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.school_id = Number(this.School_dataDataService.school_id);
				this.school_name = this.School_dataDataService.school_name;
				this.school_man = this.School_dataDataService.school_man;
				this.school_assis1 = this.School_dataDataService.school_assis1;
				this.school_assis2 = this.School_dataDataService.school_assis2;
				this.school_assis3 = this.School_dataDataService.school_assis3;
				this.school_assis4 = this.School_dataDataService.school_assis4;
				this.school_bdala = this.School_dataDataService.school_bdala;
				this.school_faks = this.School_dataDataService.school_faks;
				this.school_addr = this.School_dataDataService.school_addr;
				this.school_dir = this.School_dataDataService.school_dir;
				this.school_logo = this.School_dataDataService.school_logo;

				this.school_manager = this.School_dataDataService.school_man;
				this.manager_ass1 = this.School_dataDataService.school_assis1;
				this.manager_ass2 = this.School_dataDataService.school_assis2;
				this.manager_ass3 = this.School_dataDataService.school_assis3;
				this.manager_ass4 = this.School_dataDataService.school_assis4;

				
				this.EmployeeService.GetAllEmployee_with_id(this.School_dataDataService.school_man_id)
				.subscribe(data => this.anotherArrayMang = data,
					error => console.log(),
					() => {
						var mang_id = this.School_dataDataService.school_man_id;
						this.Mang = this.anotherArrayMang[this.anotherArrayMang.findIndex(function (el) {
				
							return el.emp_id == mang_id;
						})];

						this.selectedManager = this.Mang;

						var ass1_id = this.School_dataDataService.school_assis1_id;
						this.selectedAss1 = this.Employees1[this.Employees1.findIndex(function (el) {
				
							return el.emp_id == ass1_id;
						})];

					//	this.selectedAss1 = this.Ass1;

						var ass2_id = this.School_dataDataService.school_assis2_id;
						this.selectedAss2 = this.Employees2[this.Employees2.findIndex(function (el) {
				
							return el.emp_id == ass2_id;
						})];

					//	this.selectedAss2 = this.Ass2;

						var ass3_id = this.School_dataDataService.school_assis3_id;
						this.selectedAss3 = this.Employees3[this.Employees3.findIndex(function (el) {
				
							return el.emp_id == ass3_id;
						})];

						//this.selectedAss3 = this.Ass3;

						var ass4_id = this.School_dataDataService.school_assis4_id;
						this.selectedAss4 = this.Employees4[this.Employees4.findIndex(function (el) {
				
							return el.emp_id == ass4_id;
						})];

						//this.selectedAss4 = this.Ass4;

					});
				
				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});

		
		
	}
}
