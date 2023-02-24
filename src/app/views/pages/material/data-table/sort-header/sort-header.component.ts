import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Sort } from '@angular/material';
import { MatTableDataSource, MatSort } from '@angular/material';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { LevelsMaster, Levels } from '../../../../../LevelsMaster.Model';
import { Twze3_studentsMaster, Twze3_students } from '../../../../../Twze3_studentsMaster.Model';
import { Twze3_studentsDataService } from '../../../../../Services/Twze3_studentsDataService';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import { StudentMaster, Student } from '../../../../../StudentMaster.Model';
import { AbsenceDataService } from '../../../../../Services/AbsenceDataService';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
export interface Element {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

const ELEMENT_DATA: Element[] = [
	{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
	{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
	{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
	{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
	{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
	{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
	{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
	{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
	{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
	{ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
	{ position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
	{ position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
	{ position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
	{ position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
	{ position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
	{ position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
	{ position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
	{ position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
	{ position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
	{ position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

function compare(a, b, isAsc) {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
	selector: 'kt-sort-header',
	templateUrl: './sort-header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.mat-sort-header-container {
		align-items: center;
	  }
	  .example-container {
		display: flex;
		flex-direction: column;
		min-width: 300px;
	  }
	  .mat-table {
		overflow: auto;
		max-height: 500px;
	  }
	  .mat-header-cell.mat-sort-header-sorted {
		color: black;
	  }
	`]
})
export class SortHeaderComponent implements OnInit, AfterViewInit {
	@Input() twze3_students_data: any;
	twze3_id: number;
	twze3_lev: string = "";
	student_id: number;
	student_name: string = "";
	class_id: number;
	class_name: string = "";

	Student: Student[];

	departmentemp(event) {

		this.AbsenceDataService.grade_id = event.lev_id;
       // console.log("wwww", this.selectedlevel, event.lev_id, event, "zzzzz", this.AbsenceDataService.grade_id);

		this.AbsenceDataService.BClicked('Component A is clicked!!');
		

	}

	levels: Levels[];
	selectedlevel: any;

	exampleBasic;
	exampleConfig;

	displayedColumns = ['position', 'name', 'weight', 'symbol'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);

	desserts = [
		{ name: 'Frozen yogurt', calories: '159', fat: '6', carbs: '24', protein: '4' },
		{ name: 'Ice cream sandwich', calories: '237', fat: '9', carbs: '37', protein: '4' },
		{ name: 'Eclair', calories: '262', fat: '16', carbs: '24', protein: '6' },
		{ name: 'Cupcake', calories: '305', fat: '4', carbs: '67', protein: '4' },
		{ name: 'Gingerbread', calories: '356', fat: '16', carbs: '49', protein: '4' },
	];

	sortedData;

  @ViewChild('sort1', {static: true}) sort1: MatSort;
  @ViewChild('sort2', {static: true}) sort2: MatSort;


	add_twze3() {
		//var test1
		//test1 = this.departments[this.selecteddepartment]
		//var schoolterm
		//schoolterm = this.activities[this.activity_school_term]
		var val = {

			twze3_lev: this.selectedlevel.twze3_lev,
			student_id: Number(this.student_id),
			student_name: this.student_name,
			class_id: Number(this.class_id),
			class_name: this.class_name
		};
		//console.log("asd", val)
		this.Twze3_studentsDataService.addTwze3_students(val).subscribe(res => {
			alert(res.toString());
		})
		//console.log(val)
	}
	//corridorsDataService: corridorsDataService;
	update_twze3() {

		var val = {
			twze3_id: this.twze3_id,
		
			twze3_lev: this.selectedlevel.twze3_lev,
			student_id: Number(this.student_id),
			student_name: this.student_name,
			class_id: Number(this.class_id),
			class_name: this.class_name
		};

	//	console.log("val", val);


		this.Twze3_studentsDataService.updateTwze3_students(val).subscribe(res => {
			alert(res.toString());
			
		})

	}
	cancel_twze3() {
	
	}
	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(error),
            () => {this.cdRef.detectChanges();
			}
	); 
		
		/*		(<HTMLInputElement>document.getElementById("departmentsdropdown") as ).setv*/

		this.Twze3_studentsDataService.aClickedEvent
			.subscribe((data: string) => {
				//console.log("edited");
				
				this.twze3_id = Number(this.Twze3_studentsDataService.twze3_id);

				this.twze3_lev = this.Twze3_studentsDataService.twze3_lev;
				this.student_id = Number(this.Twze3_studentsDataService.student_id);
				this.student_name = this.Twze3_studentsDataService.student_name;
				this.class_id = Number(this.Twze3_studentsDataService.class_id);
				this.class_name = this.Twze3_studentsDataService.class_name;

			});
		var test1

		this.twze3_id = this.twze3_id;
		this.twze3_lev = this.twze3_lev;
		this.student_id = this.student_id;
		this.student_name = this.student_name;
		this.class_id = this.class_id;
		this.class_name = this.class_name;

	}

	constructor(	private cdRef:ChangeDetectorRef,private router: Router, private user_privDataService: user_privDataService,
		private Twze3_studentsDataService: Twze3_studentsDataService, private LevelsDataService: LevelsDataService,
		private AbsenceDataService: AbsenceDataService,
		private StudentDataService: StudentDataService) {
		this.LevelsDataService.GetAllLevels().subscribe(data => this.levels = data,
			error => console.log(error),
			() => console.log());
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort2;
	}

	sortData(_sort: Sort) {
		const data = this.desserts.slice();
		if (!_sort.active || _sort.direction === '') {
			this.sortedData = data;
			return;
		}

		this.sortedData = data.sort((a, b) => {
			const isAsc = _sort.direction === 'asc';
			switch (_sort.active) {
				case 'name': return compare(a.name, b.name, isAsc);
				case 'calories': return compare(+a.calories, +b.calories, isAsc);
				case 'fat': return compare(+a.fat, +b.fat, isAsc);
				case 'carbs': return compare(+a.carbs, +b.carbs, isAsc);
				case 'protein': return compare(+a.protein, +b.protein, isAsc);
				default: return 0;
			}
		});
	}
}
