import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Employee } from '../../../../EmployeeMaster.Model';
import { EmployeeDataService } from '../../../../Services/EmployeeDataService';
import { LevelsDataService } from '../../../../Services/LevelsDataService';
import { Levels } from '../../../../LevelsMaster.Model';
import { Classes } from '../../../../ClassesMaster.Model';
import { ClassesDataService } from '../../../../Services/ClassesDataService';
import { ObservationsDataService } from '../../../../Services/ObservationsDataService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as def from '../../../../definationsMaster.Model';
import { DefinitionDataService } from '../../../../Services/Definition';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../Services/user_privDataService ';
import { Definition } from '../../../../Definitions.Model';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-pagination',
	templateUrl: './pagination.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
	@Input() observ_data: any;
	observer_id: number;
	observ_ftra: string = "";
	lev_id: number;
	lev_name: string = "";
	class_id: number;
	class_name: string = "";
	emp_id: number;
	emp_name: string = "";
	observ_loc: string = "";
	observe_date: string = "";
    is_edit:boolean=false;
	Employees: Employee[];
	employeedepartment: any=[];
	Levels: Levels[];
	selectedlevel: any=[];
	classes: Classes[];
	selectedclass: any=[];
    selecteddepartment: any=[];
    Departments: any;
    disabled_emp: any;
	page = 4;
	page2 = 1;
	page3 = 4;
	currentPage = 3;
	page4 = 3;
	isDisabled = true;
	page5 = 4;

	toggleDisabled() {
		this.isDisabled = !this.isDisabled;
	}
    time: Definition[];

    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlEmp = new FormControl('');
    myControlTime = new FormControl('');

    class: Classes[];
    level: Levels[];
    form1: FormGroup;
    selectedtime: any=[];
    constructor(
        private modalService: NgbModal,
        private cdRef:ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        public _fb: FormBuilder,
        private DefinitionDataService: DefinitionDataService,
        private LevelsDataService: LevelsDataService,
        private ClassesDataService: ClassesDataService,
		private ObservationsDataService: ObservationsDataService, 
        private EmployeeDataService: EmployeeDataService) {

            this.form1 = this._fb.group({

            });
	}
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
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

    filteredOptionsEmp: Observable<any[]>;
    private _filterEmp(value: string) {
        const filterValue = value.toLowerCase();
        return this.Employees.filter(option => option.emp_name.toLowerCase().includes(filterValue));
    }
    displayFnEmp(selectedoption) {
        return selectedoption ? selectedoption.emp_name : undefined;
    }

    filteredOptionsTime: Observable<any[]>;
    private _filterTime(value: string) {
        const filterValue = value.toLowerCase();
        return this.time.filter(option => option.def_name.toLowerCase().includes(filterValue));
    }
    displayFnTime(selectedoption) {
        return selectedoption ? selectedoption.def_name : undefined;
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

	add_observ() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {

                observ_ftra: String(this.selectedtime.def_id),
                lev_id: Number(this.selectedlevel.lev_id),
                lev_name: this.selectedlevel.lev_name,
                class_id: Number(this.selectedclass.class_id),
                class_name: this.selectedclass.class_name,
                emp_id: Number(this.employeedepartment.emp_id),
                emp_name: this.employeedepartment.emp_name,
                observ_loc: this.observ_loc,
                observe_date: this.observe_date
            };

            this.ObservationsDataService.addObservations(val).subscribe(res => {
                this.ObservationsDataService.BClicked("");
                alert("Added Succesfully");
                this.form1.reset();
                this.form1.reset();
                this.myControlEmp.reset();
                this.myControlTime.reset();
                this.myControlclass.reset();
                this.myControllev.reset();

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

    update_observ() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {
                observer_id: Number(this.observer_id),
                observ_ftra: String(this.selectedtime.def_id),
                lev_id: Number(this.selectedlevel.lev_id),
                lev_name: this.selectedlevel.lev_name,
                class_id: Number(this.selectedclass.class_id),
                class_name: this.selectedclass.class_name,
                emp_id: Number(this.employeedepartment.emp_id),
                emp_name: this.employeedepartment.emp_name,
                observ_loc: this.observ_loc,
                observe_date: this.observe_date
            };

            this.ObservationsDataService.updateObservations(val).subscribe(res => {
                this.ObservationsDataService.BClicked("");
                alert("Updated Succesfully");
                this.form1.reset();
                this.myControlEmp.reset();
                this.myControlTime.reset();
                this.myControlclass.reset();
                this.myControllev.reset();
                this.is_edit=false;
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
    anotherTimeArray: Definition[] =[];
    timeVar: any =[];
    anoterEmployeeArray:Employee[] =[];
    anotherLevelArray: Levels[] = [];
    anotherClassArray: Classes[] = [];
   
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

        this.EmployeeDataService.GetAllEmployee().subscribe(data => this.Employees = data,
            error => console.log(),
            () => {
                this.filteredOptionsEmp = this.myControlEmp.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => value? typeof value === 'string' ? value : value.emp_name : ''),
                        map(emp_name => emp_name ? this._filterEmp(emp_name) : this.Employees.slice())
                    );

            });

        this.DefinitionDataService.Getdefinations_with_scode('time')
        .subscribe(data => this.time = data,
            error => console.log(),
            () => {
                this.filteredOptionsTime = this.myControlTime.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => value? typeof value === 'string' ? value : value.def_name : ''),
                        map(def_name => def_name ? this._filterTime(def_name) : this.time.slice())
                    );
    
            });
		
		this.ObservationsDataService.aClickedEvent
			.subscribe((data: string) => {
                this.is_edit=true;
				this.observer_id = Number(this.ObservationsDataService.observer_id);
				this.observ_ftra = this.ObservationsDataService.observ_ftra;
				this.class_name = this.ObservationsDataService.class_name;
				this.observ_loc = this.ObservationsDataService.observ_loc;
                this.observe_date = this.ObservationsDataService.observe_date;

                this.DefinitionDataService.Getdefinations_with_scode("time")
                .subscribe(data => this.anotherTimeArray = data,
					error => console.log(),
					() => {

						// Get time Object 
						var time = this.ObservationsDataService.observ_ftra;
						this.timeVar = this.anotherTimeArray[this.anotherTimeArray.findIndex(function (el) {
				
							return el.def_id === Number(time);
						})];
						
						this.selectedtime = this.timeVar;

                        // Get Employee Object 
                        var id = this.ObservationsDataService.emp_id;

                        this.EmployeeDataService.GetAllEmployee_with_id(id)
                        .subscribe(data => this.anoterEmployeeArray = data,
							error => console.log(),
							() => {
								this.employeedepartment = this.anoterEmployeeArray[0];

								// Get level Object 
								var level_id = this.ObservationsDataService.lev_id;

								this.LevelsDataService.GetAllLevels_with_id(level_id)
								.subscribe(data => this.anotherLevelArray = data,
								error => console.log(),
								() => {
                                    
									this.selectedlevel = this.anotherLevelArray[0];
                                    
                                    // Get Class Object 
                                    var cls_id = this.ObservationsDataService.class_id;

                                    this.ClassesDataService.GetAllClasses_with_id(cls_id)
                                    .subscribe(data => this.anotherClassArray = data,
                                    error => console.log(),
                                    () => {
                                        
                                        this.selectedclass = this.anotherClassArray[0];
                                      })

								});
								
						});
				});

                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

			});
	}
}
