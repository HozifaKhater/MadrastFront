// Angular
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Services
// Widgets model
import { LayoutConfigService, SparklineChartOptions } from '../../../core/_base/layout';
import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';
import { environment } from '../../../../environments/environment.prod';
import { AbsenceDataService } from '../../../Services/AbsenceDataService';
import { Absence_casesDataService } from '../../../Services/Absence_casesDataService';
import { NewsDataService } from '../../../Services/NewsDataService';
import { ClassesDataService } from '../../../Services/ClassesDataService';
import { Absence } from '../../../AbsenceMaster.Model';
import { Classes } from '../../../ClassesMaster.Model';
import { Employee } from '../../../EmployeeMaster.Model';
import { EmployeeDataService } from '../../../Services/EmployeeDataService';
import { Good_bad_students_cardDataService } from '../../../Services/Good_bad_students_cardDataService';
import { Good_bad_students_card } from '../../../Good_bad_students_cardMaster.Model';
import { SignalrService } from '../../../Services/notificationDataService';
import { adverts } from '../../../advertsMaster.Model';
import { advertsDataService } from '../../../Services/advertsDataService';
import { month_value } from '../../../month_valueMaster.Model';
import { month_valueDataService } from '../../../Services/month_valueDataService';
import jwt_decode from 'jwt-decode';
@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	chartOptions1: SparklineChartOptions;
	chartOptions2: SparklineChartOptions;
	chartOptions3: SparklineChartOptions;
	chartOptions4: SparklineChartOptions;
	widget4_1: Widget4Data;
	widget4_2: Widget4Data;
	widget4_3: Widget4Data;
	widget4_4: Widget4Data;

	allAbsence: Absence[];
	number_of_absence: number;

	allClasses: Classes[];
	number_of_classes: number;
	adverts: adverts[];
	month_value: month_value[];
	goodStudents: any;
	allStudents: any;
	number_of_good_students: number;
	number_of_all_students: number;
	number_of_bad_students: any;
	number_of_attendance: any;
	allGoodBadStudents: Good_bad_students_card[];
	GoodBadstudents: any;
test:any;
public pos_id:number = 0;
statistics_abs:any=[];
statistics_att:any=[];
displayedColumns = ['news'];

	ELEMENT_DATA: Element[];
       
	dataSource: any;
news:any="";
	constructor(
		private NewsDataService:NewsDataService,
		private cdRef:ChangeDetectorRef,
		private Absence_casesDataService: Absence_casesDataService,
		private advertsDataService: advertsDataService,
		private month_valueDataService: month_valueDataService,
		private layoutConfigService: LayoutConfigService,
		private AbsenceDataService: AbsenceDataService,
		private ClassesDataService: ClassesDataService,
		private EmployeeDataService: EmployeeDataService,
		private Good_bad_students_cardDataService: Good_bad_students_cardDataService) {
			
				this.NewsDataService.GetNews().subscribe((data: any) => this.news = data.data,
					error => console.log(),
					() => {
						
						}
					); 
		
		const userToken = localStorage.getItem(environment.authTokenKey);
		console.log("userinfo", userToken);
	
this.test=0;
this.advertsDataService.get_adverts_for_dashboard(0,0)
			.subscribe((data:any) => this.adverts = data.data,
				error => console.log(error),
				() => {
					console.log("adverts", this.adverts)
				});
				this.month_valueDataService.get_month_value_for_dashboard()
			.subscribe((data:any) => this.month_value = data.data,
				error => console.log(error),
				() => {
					console.log("month_value", this.month_value)
				});
		// this.AbsenceDataService.GetAllAbsence()
		// 	.subscribe(data => this.allAbsence = data,
		// 		error => console.log(error),
		// 		() => {
		// 			console.log("allAbsence dropdown", this.allAbsence);
		// 			this.number_of_absence = this.allAbsence.length;
		// 		});


		this.Good_bad_students_cardDataService.GetAllGood_bad_students_card()
			.subscribe(data => this.allGoodBadStudents = data,
				error => console.log(error),
				() => {
					console.log("allGoodBadStudents dropdown", this.allGoodBadStudents);
					this.GoodBadstudents = this.allGoodBadStudents.length;
					console.log("number of allGoodBadStudents ", this.GoodBadstudents);
				});

		this.EmployeeDataService.GetGoodStudents().
			subscribe((data: any) => this.goodStudents = data.data,
				error => console.log(error),
				() => {
					this.number_of_good_students = this.goodStudents[0].Column1;
					this.number_of_bad_students = this.GoodBadstudents - this.number_of_good_students;
					console.log("all Good Students dropdown", this.number_of_good_students);
					console.log("all Bad Students dropdown", this.number_of_bad_students);
				});

		this.EmployeeDataService.GetNumberOfStudent().
			subscribe((data: any) => this.allStudents = data.data,
				error => console.log(error),
				() => {
					this.number_of_all_students = this.allStudents[0].Column1;
					this.number_of_attendance = this.number_of_all_students - this.number_of_absence;
					console.log("all Students ", this.number_of_all_students);
					console.log("all attendance ", this.number_of_attendance);
				});



	}
decoded:any;
Employee:Employee[]
	ngOnInit(): void {
		// this.SignalrService.startConnection();
		//  this.SignalrService.addTransferChartDataListener();
		//  this.SignalrService.addBroadcastChartDataListener();  
		//  this.SignalrService.broadcastChartData(); 
		const userToken = localStorage.getItem(environment.authTokenKey);
		this.decoded = jwt_decode(userToken);
		console.log("this.decoded",this.decoded.id)
		
		this.ClassesDataService.get_class_count_for_teacher(this.decoded.id)
			.subscribe((data:any) => {
				console.log("allClasses dropdown", this.allClasses);
				this.number_of_classes = data[0].class_count;
			},
				error => console.log(error),
				() => {
					
				});
		this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id).subscribe((data) => {
			this.pos_id= data[0].emp_pos_id
			
			console.log("this.pos_id",this.pos_id)
			
			if( (this.pos_id == 37) || (this.pos_id == 38) || (this.pos_id == 41))
			{
				this.advertsDataService.get_adverts_for_dashboard(0,data[0].emp_dep_id)
			.subscribe((data:any) => this.adverts = data.data,
				error => console.log(error),
				() => {
					console.log("adverts", this.adverts)
				});
			  
				this.Absence_casesDataService.get_statistics_absenec_for_dashboard_abs(this.decoded.id)
				.subscribe((data:any) => this.statistics_abs = data.data,
					error => console.log(error),
					() => {
						this.number_of_absence=this.statistics_abs[0].absences_students
						console.log("statsicssss[0]", this.statistics_abs[0])
					});
					this.Absence_casesDataService.get_statistics_absenec_for_dashboard_att(this.decoded.id)
				.subscribe((data:any) => this.statistics_att = data.data,
					error => console.log(error),
					() => {
						this.number_of_attendance=this.statistics_att[0].attend_students
						console.log("statsicssss", this.statistics_att)
					}); 
			 
			}
			else
			{
				this.advertsDataService.get_adverts_for_dashboard(0,0)
			.subscribe((data:any) => this.adverts = data.data,
				error => console.log(error),
				() => {
					console.log("adverts", this.adverts)
				});
				this.Absence_casesDataService.get_statistics_absenec_for_dashboard_all_abs()
				.subscribe((data:any) => this.statistics_abs = data.data,
					error => console.log(error),
					() => {
						this.number_of_absence=this.statistics_abs[0].absences_students
						console.log("statsicssss[0]", this.statistics_abs[0])
					});
					this.Absence_casesDataService.get_statistics_absenec_for_dashboard_all_att()
				.subscribe((data:any) => this.statistics_att = data.data,
					error => console.log(error),
					() => {
						this.number_of_attendance=this.statistics_att[0].attend_students
						console.log("statsicssss", this.statistics_att)
					}); 
			}
	
			this.cdRef.detectChanges();
		},
			error => console.log(error),
            () => { 
			console.log("Employee[0].pos_id",this.Employee)
			});

		this.chartOptions1 = {
			data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
			color: this.layoutConfigService.getConfig('colors.state.brand'),
			border: 3
		};
		this.chartOptions2 = {
			data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
			color: this.layoutConfigService.getConfig('colors.state.danger'),
			border: 3
		};
		this.chartOptions3 = {
			data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
			color: this.layoutConfigService.getConfig('colors.state.success'),
			border: 3
		};
		this.chartOptions4 = {
			data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
			color: this.layoutConfigService.getConfig('colors.state.primary'),
			border: 3
		};

		// @ts-ignore
		this.widget4_1 = shuffle([
			{
				pic: './assets/media/files/doc.svg',
				title: 'Metronic Documentation',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/jpg.svg',
				title: 'Project Launch Evgent',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/pdf.svg',
				title: 'Full Developer Manual For 4.7',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/javascript.svg',
				title: 'Make JS Development',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/zip.svg',
				title: 'Download Ziped version OF 5.0',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/pdf.svg',
				title: 'Finance Report 2016/2017',
				url: 'https://keenthemes.com.my/metronic',
			},
		]);
		// @ts-ignore
		this.widget4_2 = shuffle([
			{
				pic: './assets/media/users/100_4.jpg',
				username: 'Anna Strong',
				desc: 'Visual Designer,Google Inc.',
				url: 'https://keenthemes.com.my/metronic',
				buttonClass: 'btn-label-brand'
			}, {
				pic: './assets/media/users/100_14.jpg',
				username: 'Milano Esco',
				desc: 'Product Designer, Apple Inc.',
				url: 'https://keenthemes.com.my/metronic',
				buttonClass: 'btn-label-warning'
			}, {
				pic: './assets/media/users/100_11.jpg',
				username: 'Nick Bold',
				desc: 'Web Developer, Facebook Inc.',
				url: 'https://keenthemes.com.my/metronic',
				buttonClass: 'btn-label-danger'
			}, {
				pic: './assets/media/users/100_1.jpg',
				username: 'Wilter Delton',
				desc: 'Project Manager, Amazon Inc.',
				url: 'https://keenthemes.com.my/metronic',
				buttonClass: 'btn-label-success'
			}, {
				pic: './assets/media/users/100_5.jpg',
				username: 'Nick Stone',
				desc: 'Visual Designer, Github Inc.',
				url: 'https://keenthemes.com.my/metronic',
				buttonClass: 'btn-label-dark'
			},
		]);
		// @ts-ignore
		this.widget4_3 = shuffle([
			{
				icon: 'flaticon-pie-chart-1 kt-font-info',
				title: 'Metronic v6 has been arrived!',
				url: 'https://keenthemes.com.my/metronic',
				value: '+$500',
				valueColor: 'kt-font-info'
			}, {
				icon: 'flaticon-safe-shield-protection kt-font-success',
				title: 'Metronic community meet-up 2019 in Rome.',
				url: 'https://keenthemes.com.my/metronic',
				value: '+$1260',
				valueColor: 'kt-font-success'
			}, {
				icon: 'flaticon2-line-chart kt-font-danger',
				title: 'Metronic Angular 8 version will be landing soon..',
				url: 'https://keenthemes.com.my/metronic',
				value: '+$1080',
				valueColor: 'kt-font-danger'
			}, {
				icon: 'flaticon2-pie-chart-1 kt-font-primary',
				title: 'ale! Purchase Metronic at 70% off for limited time',
				url: 'https://keenthemes.com.my/metronic',
				value: '70% Off!',
				valueColor: 'kt-font-primary'
			}, {
				icon: 'flaticon2-rocket kt-font-brand',
				title: 'Metronic VueJS version is in progress. Stay tuned!',
				url: 'https://keenthemes.com.my/metronic',
				value: '+134',
				valueColor: 'kt-font-brand'
			}, {
				icon: 'flaticon2-notification kt-font-warning',
				title: 'Black Friday! Purchase Metronic at ever lowest 90% off for limited time',
				url: 'https://keenthemes.com.my/metronic',
				value: '70% Off!',
				valueColor: 'kt-font-warning'
			}, {
				icon: 'flaticon2-file kt-font-focus',
				title: 'Metronic React version is in progress.',
				url: 'https://keenthemes.com.my/metronic',
				value: '+13%',
				valueColor: 'kt-font-focus'
			},
		]);
		// @ts-ignore
		this.widget4_4 = shuffle([
			{
				pic: './assets/media/client-logos/logo5.png',
				title: 'Trump Themes',
				desc: 'Make Metronic Development',
				url: 'https://keenthemes.com.my/metronic',
				value: '+$2500',
				valueColor: 'kt-font-brand'
			}, {
				pic: './assets/media/client-logos/logo4.png',
				title: 'StarBucks',
				desc: 'Good Coffee & Snacks',
				url: 'https://keenthemes.com.my/metronic',
				value: '-$290',
				valueColor: 'kt-font-brand'
			}, {
				pic: './assets/media/client-logos/logo3.png',
				title: 'Phyton',
				desc: 'A Programming Language',
				url: 'https://keenthemes.com.my/metronic',
				value: '+$17',
				valueColor: 'kt-font-brand'
			}, {
				pic: './assets/media/client-logos/logo2.png',
				title: 'GreenMakers',
				desc: 'Make Green Development',
				url: 'https://keenthemes.com.my/metronic',
				value: '-$2.50',
				valueColor: 'kt-font-brand'
			}, {
				pic: './assets/media/client-logos/logo1.png',
				title: 'FlyThemes',
				desc: 'A Let\'s Fly Fast Again Language',
				url: 'https://keenthemes.com.my/metronic',
				value: '+200',
				valueColor: 'kt-font-brand'
			},
		]);
	}
}
