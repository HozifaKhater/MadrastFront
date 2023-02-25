import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _7esa, _7esaMaster } from '../../../../_7esaMaster.Model';
import { _7esa_defDataService } from '../../../../Services/_7esaDataService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { Employee } from '../../../../EmployeeMaster.Model';
import { EmployeeDataService } from '../../../../Services/EmployeeDataService';

@Component({
  selector: 'app-calendar-gdwel_7ss',
  templateUrl: './calendar-gdwel_7ss.component.html',
  styleUrls: ['./calendar-gdwel_7ss.component.scss']
})

export class gdwel_7ssComponent implements OnInit {

  public calendarForm: FormGroup = this.fb.group({
    selectedlevel: [""],
    selectedclass: [""],
  });

  levels: any[] = [];
  public head: number = 0;
  decoded: any;

  data:any[] = [];
  data2:any[] = [];

  days = [
    'الاحد',
    'الاثنين',
    'الثلاثاء',
    'الاربعاء',
    'الخميس',
  ]

  constructor(
    private cdRef:ChangeDetectorRef,
    private EmployeeDataService: EmployeeDataService,
    private fb: FormBuilder, private http: HttpClient) {
  }
  ngAfterViewInit() {
  }
  public pos_id:number = 0;
  ngOnInit() {
    this.getSecurity();
    this.getAllLevels();
    this.get_gdwel_7ss_new();
    this.get_gdwel_7ss_all();
    this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id).subscribe((data) => {
			this.pos_id= data[0].emp_pos_id
			
		
			this.cdRef.detectChanges();
		},
			error => console.log(error),
            () => { 
		
			});
  }
  openModal(event){
  
    console.log("event",event)
  }
  getSecurity() {
    const userToken = localStorage.getItem(environment.authTokenKey);
    this.decoded = jwt_decode(userToken);

    this.http.get('https://localhost:44337/api/employee/id?id=' + this.decoded.id).subscribe({
      next: (result: any[]) => {
        var employee = result[0];
        if (employee && employee.emp_pos_id) {
          var posId = employee.emp_pos_id as number;
          if (posId == 37 || posId == 38 || posId == 41) {
            this.head = 0
          }
          else {
            this.head = 1
          }
        }
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }


  getAllLevels() {
    this.http.get('https://localhost:44337/api/levels').subscribe({
      next: (result: any[]) => {
        this.levels = result;
      },
      error: (err) => {
        alert(err.message);
      }
    })
  }
  get_gdwel_7ss_new() {
    this.http.get('https://localhost:44337/api/gdwel_7ss/get_gdwel_7ss_new').subscribe({
      next: (result: any[]) => {
        this.data = result;
       
      },
      error: (err) => {
        alert(err.message);
      }
    })
  }

  isApplied(evs :any[], i : number) : boolean{
      return evs.filter(x=>x.position == (i+1)).length > 0;
  }

  getTitle(evs :any[], i : number) : string{
    var hascol =  evs.filter(x=>x.position == (i+1));
    if(hascol && hascol.length > 0){
      return hascol[0].title;
    }
    return "";
}

  get_gdwel_7ss_all() {
    this.http.get('https://localhost:44337/api/gdwel_7ss/get_gdwel_7ss_all').subscribe({
      next: (result: any[]) => {
       
        this.data2 = result;
        console.log("gdwel_7ss",this.data2)
      },
      error: (err) => {
        alert(err.message);
      }
    })
  }

  onSubmit() {
    console.log(this.calendarForm.value)
  }

}
