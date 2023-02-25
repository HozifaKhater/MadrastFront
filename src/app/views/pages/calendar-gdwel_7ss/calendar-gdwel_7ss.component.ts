import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _7esa, _7esaMaster } from '../../../_7esaMaster.Model';
import { _7esa_defDataService } from '../../../Services/_7esaDataService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../src/environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { Employee } from '../../../EmployeeMaster.Model';
import { EmployeeDataService } from '../../../Services/EmployeeDataService';
import { SubjectDataService } from '../../../Services/SubjectDataService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { gdwel_7ssDataService } from '../../../Services/gdwel_7ssDataService';
import { Classes } from '../../../ClassesMaster.Model';
import { ClassesDataService } from '../../../Services/ClassesDataService';
import { Subjects } from '../../../../../src/app/SubjectMaster.Model';

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
  class: Classes[];
  classes: Classes[];
  data:any[] = [];
  data2:any[] = [];
  selectedclass: any;
  subjects: Subjects[];
  Employees: Employee[];
  emps: Employee[];
  Employee: Employee[];
  newEventDate: Date;
  events_info:any[]=[];
  startTime = '';
  days = [
    'الاحد',
    'الاثنين',
    'الثلاثاء',
    'الاربعاء',
    'الخميس',
  ]
  is_edit:boolean=true;
  constructor(
    private gdwel_7ssDataService:gdwel_7ssDataService,
    private ClassesDataService:ClassesDataService,
    private EmployeeService:EmployeeDataService,
    private SubjectDataService:SubjectDataService,
     private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private cdRef:ChangeDetectorRef,
    private EmployeeDataService: EmployeeDataService,
    private fb: FormBuilder, private http: HttpClient) {
  }
  ngAfterViewInit() {
  }
  public pos_id:number = 0;
  formData: FormGroup;
  ngOnInit() {
    this.is_edit=false;
    this.getSubjects();
    this.getEmployeess();
    this.formData = this.formBuilder.group({
      selectedsubjects1: ['', [Validators.required]],
      selectedemp: ['', [Validators.required]],
      selectedreplaceemp: ['', [Validators.required]],
    });
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
		// اشرحلى هنا على
			});
  }
  openModal(content: any,event) {

    console.log("event",event)
    this.events_info=event;
    if (event.id)
    {this.is_edit=true;}
    this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id).subscribe((data) => {
		
    if(this.selectedclass){
      this.startTime =  event.start//.substring(0, event.start.indexOf("+"));
      
      console.log("eventstet", event)
      console.log("startrimetest",this.startTime)
      this.modalService.open(content);
    }
    else
    { alert("من فضلك قم باختيار الصف والفصل")}
    this.getSubjects();
  })
}
filteredEmps : any[] = [];
employeeChanged(valueSelected){
  this.filteredEmps = this.emps.filter((emp)=> emp.emp_id != valueSelected.emp_id);
}
  getSubjects() {
    var class_id = 0;
    if(this.selectedclass){
      class_id = this.selectedclass.class_id
      this.SubjectDataService.GetAllSubjectWithClassId(class_id,this.startTime).subscribe(data => this.subjects = data,
        error => console.log(error),
        () => { console.log("subjects dropdown", this.subjects) });
    }else{
      this.SubjectDataService.GetAllSubject().subscribe(data => this.subjects = data,
        error => console.log(error),
        () => { console.log("subjects dropdown", this.subjects) });
    }
   
  }

  getEmployeess() {
    this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees = data,
      error => console.log(error),
      () => console.log("emp dropdown", this.Employees));
  }
  change_subject(event) {
    console.log("eventsHozaifa",this.startTime)
    console.log("eventsHozaifa",event)
    this.EmployeeService.get_emp_def_with_subject_id_with_validation(event.subject_id, this.startTime).subscribe(data => {debugger;this.emps = data},
      error => console.log(error),
      () => console.log("emp dropdown", this.emps));
  }
  change_level(event) {
    let valu = 0;
    console.log("this.",event)
    if (event) {
      valu = event
    }
    this.ClassesDataService.GetAllClasses_with_level_id(valu).subscribe(data => this.classes = data,
      error => console.log(error),
      () => {
       console.log("this.class",this.class)
        
      });
  }

  getSecurity() {
    const userToken = localStorage.getItem(environment.authTokenKey);
    this.decoded = jwt_decode(userToken);

    this.http.get('https://localhost:44337/api/employee/id?id=' + this.decoded.id).subscribe({
      next: (result: any[]) => {
        var employee = result[0];
        if (employee && employee.emp_pos_id) {
          var posId = employee.emp_pos_id as number;
          if (posId == 37  || posId == 41) {
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
  selectedreplaceemp: any;
  selectedemp: any;
  selectedsubjects1: any;
  selectedlevel: any;
  submitted: boolean;
  closeEventModal() {
    this.modalService.dismissAll();
  }
  saveEvent() {

      if (this.formData.valid) {

        const startWeek = new Date(this.startTime);
        const endWeek = new Date("2023-07-08");
        var val = {
          title: this.selectedsubjects1.subject_name,
          start: startWeek,
          end: endWeek,
          className: '',
          emp_id: Number(this.selectedemp.emp_id),
          emp_name: this.selectedemp.emp_name,
          subject_id: Number(this.selectedsubjects1.subject_id),
          class_id: this.selectedclass.class_id,
          level_id: this.selectedlevel.lev_id
        };
        console.log("val",val)
        this.gdwel_7ssDataService.addgdwel_7ss(val).subscribe(res => {
          this.getSecurity();
      this.getAllLevels();
      this.get_gdwel_7ss_new();
      this.get_gdwel_7ss_all();
          this.formData = this.formBuilder.group({
            title: '',
            category: ''
          });
          this.modalService.dismissAll();
          this.submitted = true;
        }) ,error => console.log(error);
  
      }

   
  }
  editEventSave() {

    if (this.formData.valid) {

      const startWeek = new Date(this.startTime);
      const endWeek = new Date("2023-07-08");
      var val = {
        id:this.events_info[0].id,
        title: this.selectedsubjects1.subject_name,
        start: startWeek,
        end: endWeek,
        className: '',
        emp_id: Number(this.selectedemp.emp_id),
        emp_name: this.selectedemp.emp_name,
        subject_id: Number(this.selectedsubjects1.subject_id),
        class_id:this.events_info[0].class,
        level_id: this.events_info[0].level
      };
      console.log("val",val)
      this.gdwel_7ssDataService.updategdwel_7ss(val).subscribe(res => {
        this.getSecurity();
    this.getAllLevels();
    this.get_gdwel_7ss_new();
    this.get_gdwel_7ss_all();
        this.formData = this.formBuilder.group({
          title: '',
          category: ''
        });
        this.modalService.dismissAll();
        this.submitted = true;
      }) ,error => console.log(error);

    }

 
}
deleteEventData() {

  this.gdwel_7ssDataService.deletegdwel_7ss(Number(this.events_info[0].id)).subscribe(res => {
  })
}
  onSubmit() {
    console.log("submitedddd",this.calendarForm.value)
  }

}
