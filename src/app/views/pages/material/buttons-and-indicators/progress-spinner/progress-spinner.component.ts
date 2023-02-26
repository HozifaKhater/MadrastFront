import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';

import { LevelsMaster, Levels } from '../../../../../LevelsMaster.Model';
import { corridorsDataService } from '../../../../../Services/CorridorsDataService';

import { CorridorsMaster, corridor } from '../../../../../CorridorsMaster.Model';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';

import { ClassesMaster, Classes } from '../../../../../ClassesMaster.Model';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-progress-spinner',
	templateUrl: './progress-spinner.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-h2 {
		margin: 10px;
	  }
	  .example-section {
		display: flex;
		align-content: center;
		align-items: center;
		height: 60px;
	  }
	  .example-margin {
		margin: 0 10px;
	  }
	`]
})
export class ProgressSpinnerComponent implements OnInit {
	@Input() nchra_data: any;
	class_id: number;
	class_mr7la: string = "";
	class_level: string = "";
	class_corr: string = "";
	class_name: string = "";

	Levels: Levels[];
	selected_levels: any;
	corridors: corridor[];
	selectedcorridor: any;

	exampleBasic;
	exampleWarn;
	exampleConfig;
    is_edit:boolean=false;
	color = 'primary';
	mode = 'determinate';
	value = 50;

	myControllev = new FormControl('');
	form1: FormGroup;
	constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder, 
		private LevelsDataService: LevelsDataService, 
		private corridorsDataService: corridorsDataService, 
		private ClassesDataService: ClassesDataService) {

		this.form1 = this._fb.group({
			
			class_name: ['', [Validators.required, Validators.pattern]],
			selectedcorridor: ['', [Validators.required]],
			selected_levels: []
		});


		this.corridorsDataService.GetAllCorridors().subscribe(data => this.corridors = data,
			error => console.log());
	}
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	add_class() {

		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

		var val = {
			class_mr7la: this.class_mr7la,
			class_level: this.selected_levels.lev_id.toString(),
			class_corr: this.selectedcorridor.corridor_name,
			class_name: this.class_name
		};
		this.ClassesDataService.addClasses(val).subscribe(res => {
			alert("Added Succesfully");
			this.ClassesDataService.BClicked("b2");
		})
			this.form1.reset();
		}
	}

	update_class() {
		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

			var val = {
				class_id: this.class_id,
				class_mr7la: this.class_mr7la,
				class_level: this.selected_levels.lev_id.toString(),
				class_corr: this.selectedcorridor.corridor_name,
				class_name: this.class_name
			};

			this.ClassesDataService.updateClasses(val).subscribe(res => {
				alert("Updated Successfully");
				this.ClassesDataService.BClicked("b2");
				this.is_edit=false;
			})
				this.form1.reset();
				this.is_edit=false;
			}
	}
	cancel_class() {
		this.form1.reset();
		this.is_edit=false;
	}

	filteredOptionslev: Observable<any[]>;
	private _filterlev(value: string) {
		const filterValue = value.toLowerCase();
		return this.Levels.filter(option => option.lev_name.toLowerCase().includes(filterValue));
	}
	displayFnlev(selectedoption) {
		return selectedoption ? selectedoption.lev_name : undefined;
	}

	levelNameValue: string="";
	corrValue: string="";
	priv_info:any=[];
	
is_edit:boolean=false;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();

			}); 

		this.LevelsDataService.GetAllLevels().subscribe(data => this.Levels = data,
			error => console.log(),
			() => {
				this.filteredOptionslev = this.myControllev.valueChanges
					.pipe(
						startWith(''),
						map(value => value? typeof value === 'string' ? value : value.lev_name : ''),
						map(lev_name => lev_name ? this._filterlev(lev_name) : this.Levels.slice())
					);
			});

		this.ClassesDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.class_id = Number(this.ClassesDataService.class_id);
				this.class_mr7la = this.ClassesDataService.class_mr7la;
				this.class_level = this.ClassesDataService.class_level;
				this.class_corr = this.ClassesDataService.class_corr;
				this.class_name = this.ClassesDataService.class_name;

				this.levelNameValue =  this.ClassesDataService.class_level;
				this.corrValue =  this.ClassesDataService.class_corr;

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
		
	}
}

