import { Component, OnInit } from '@angular/core';
import { _7esa, _7esaMaster } from '../../../../_7esaMaster.Model';
import { _7esa_defDataService } from '../../../../Services/_7esaDataService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';

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

  days = [
    'الاحد',
    'الاثنين',
    'الثلاثاء',
    'الاربعاء',
    'الخميس',
  ]

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }
  ngAfterViewInit() {
  }
  ngOnInit() {
    this.getSecurity();
    this.getAllLevels();
    this.get_gdwel_7ss_new();
    // for(var i =0 ; i < 5; i++){
    //   var day = this.days[i];
    //   var events = [];
    //   for(var x=1; x<7; x++){
    //     events.push({
    //       level: (x+1)*2,
    //       class: (x+0)*2,
    //       teacher: `teacher  ${x}`,
    //       eventtime:  x > 1 ? 1 : 2
    //     })
    //   }
    //   this.data.push({
    //     day: day,
    //     events: events
    //   });
    // }

    console.log(this.data)
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
        debugger;
        this.data = result;
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
