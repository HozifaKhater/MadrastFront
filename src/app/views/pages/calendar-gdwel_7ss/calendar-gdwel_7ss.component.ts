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
    private cdRef: ChangeDetectorRef,
    private _7esa_defDataService: _7esa_defDataService,
    public _fb: FormBuilder, private LevelsDataService: LevelsDataService, private ClassesDataService: ClassesDataService,
    private modalService: NgbModal, private formBuilder: FormBuilder
    , private gdwel_7ssDataService: gdwel_7ssDataService, private SubjectDataService: SubjectDataService, private EmployeeService: EmployeeDataService) {
      
      this.form1 = this._fb.group({
				
	
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
        error => console.log());
    }else{
      this.SubjectDataService.GetAllSubject().subscribe(data => this.subjects = data,
        error => console.log());
    }
   
  }

  getEmployeess() {
    this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees = data,
      error => console.log());
  }
  change_subject(event) {
    console.log("eventsHozaifa",this.startTime)
    console.log("eventsHozaifa",event)
    this.EmployeeService.get_emp_def_with_subject_id_with_validation(event.subject_id, this.startTime).subscribe(data => {debugger;this.emps = data},
      error => console.log(error),
      () => console.log("emp dropdown", this.emps));

  getLevels() {
    this.LevelsDataService.GetAllLevels().subscribe(data => this.level = data,
      error => console.log(),
      () => {
        this.filteredOptionslev = this.myControllev.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.lev_name),
            map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
          );
      });
  }
  change_level(event) {
    if(event !== null && event !== undefined && event.length !== 0){

    let valu = 0;
    console.log("this.",event)
    if (event) {
      valu = event
    }
    this.ClassesDataService.GetAllClasses_with_level_id(valu).subscribe(data => this.classes = data,
      error => console.log(error),
    this.ClassesDataService.GetAllClasses_with_level_id(valu).subscribe(data => this.class = data,
      error => console.log(),
      () => {
       console.log("this.class",this.class)
        
        this.filteredOptionsclass = this.myControlclass.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.class_name),
            map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
          );
      });
    }
  }

  getSecurity() {
  filteredEmps : any[] = [];
  employeeChanged(valueSelected){
      this.filteredEmps = this.emps.filter((emp)=> emp.emp_id != valueSelected.emp_id);
  }

  change_subject(event) {
    if(event !== null && event !== undefined && event.length !== 0){

    this.EmployeeService.get_emp_def_with_subject_id_with_validation(event.subject_id, this.startTime).subscribe(data => this.emps = data,
      error => console.log());
    }
  }

  ngOnInit() {

    this._fetchData()
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
    this.getLevels();
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Calendar', active: true }];

    /**
     * Event Model validation
     */
    this.formData = this.formBuilder.group({
      selectedsubjects1: ['', [Validators.required]],
      selectedemp: ['', [Validators.required]],
      selectedreplaceemp: ['', [Validators.required]],
    });

    /**
     * Edit Event Model Data
     */
    this.formEditData = this.formBuilder.group({
      editTitle: [],
      editCategory: [],
    });

    this._fetchData();
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  startTime = '';
  /**
   * Open Event Modal
   * @param content modal content
   * @param event calendar event
   */
  openModal(content: any, event: any) {
    if(this.selectedclass){
      if ((this.Employee[0].emp_pos_id == String(37)) || (this.Employee[0].emp_pos_id == String(38)) || (this.Employee[0].emp_pos_id == String(41))) {
        // this.newEventDate = event.date;
        // this.modalService.open(content);
      }
      else {
        this.newEventDate = event.date;
        this.startTime = event.dateStr.substring(0, event.dateStr.indexOf("+"));;
        this.modalService.open(content);
      }
    }else{
      alert("من فضلك قم باختيار الصف والفصل")
    }
    this.getSubjects();
  }

  /**
   * Open Event Modal For Edit
   * @param editcontent modal content
   * @param event calendar event
   */
  onEventDrop(editcontent: any, event: any) {
    this.formEditData = this.formBuilder.group({
      editTitle: event.event.title,
      editCategory: event.event.classNames[event.event.classNames.length - 1],
    });
  }
    // tslint:disable-next-line: max-line-length
    this.editEvent = { id: event.event.id, title: event.event.title, start: event.event.start, classNames: event.event.classNames[event.event.classNames.length - 1] };
    var val = {
      id: Number(event.event.id),
      title: event.event.title,
      start: event.event.start,
      end: event.event.end,
      className: event.event.classNames[event.event.classNames.length - 1]


  getAllLevels() {
    this.http.get('https://localhost:44337/api/levels').subscribe({
      next: (result: any[]) => {
        this.levels = result;
      },
      error: (err) => {
        alert(err.message);
      }
    };
    this.gdwel_7ssDataService.updategdwel_7ss(val).subscribe(res => {
      alert(res.toString());
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
  gdwel_info: any;
  openEditModal(editcontent: any, event: any) {
    this.gdwel_7ssDataService.GetAllgdwel_7ss_with_id(event.event.id).subscribe(data => { this.gdwel_info = data },
      error => console.log(),
      () => {
        var selected_subject = String(this.gdwel_info.subject_id);
        this.selectedsubjects1 = this.subjects[this.subjects.findIndex(function (el) {
          return String(el.subject_id) == selected_subject;
        })];

        var selected_emp = String(this.EmployeeService.emp_educationa_qualification_country_id);
        this.selectedreplaceemp = this.Employees[this.Employees.findIndex(function (el) {
          return String(el.emp_id) == selected_emp;
        })];
      })
    this.formEditData = this.formBuilder.group({
      editTitle: event.event.title,
      editCategory: event.event.classNames[event.event.classNames.length - 1],
    });
    // tslint:disable-next-line: max-line-length
    this.editEvent = { id: event.event.id, title: event.event.title, start: event.event.start, classNames: event.event.classNames[event.event.classNames.length - 1] };
    this.modalService.open(editcontent);

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
  /**
   * Upldated event title save in calendar
   */

  editEventSave() {
    //this.OptionsInput.slotLabelFormat
    const editTitle = this.formEditData.get('editTitle').value;
    const editCategory = this.formEditData.get('editCategory').value;
    const editId = this.calendarEvents.findIndex(x => x.id + '' === this.editEvent.id + '');
    // tslint:disable-next-line: radix
    this.calendarEvents[editId] = { ...this.editEvent, title: editTitle, id: parseInt(this.editEvent.id + ''), className: editCategory };
    this.formEditData = this.formBuilder.group({
      editTitle: '',
      editCategory: '',
    });
    var val = {
      id: this.calendarEvents[editId].id,
      title: this.selectedsubjects1.subject_name,
      start: this.calendarEvents[this.calendarEvents.length - 1].start,
      end: this.calendarEvents[this.calendarEvents.length - 1].end,
      className: this.calendarEvents[this.calendarEvents.length - 1].className,
      emp_id: Number(this.selectedemp.emp_id),
      emp_name: this.selectedemp.emp_name,
      subject_id: Number(this.selectedsubjects1.subject_id),
      class_id: this.selectedclass.class_id,
      level_id: this.selectedlevel.lev_id

    };
    this.gdwel_7ssDataService.updategdwel_7ss(val).subscribe(res => {
      this._fetchData();
      alert(res.toString());
    })
    this.modalService.dismissAll();
  }

  /**
   * Delete the event from calendar
   */
  deleteEventData() {
    const deleteId = this.editEvent.id;
    const deleteEvent = this.calendarEvents.findIndex(x => x.id + '' === deleteId + '');
    this.calendarEvents[deleteEvent] = { ...this.deleteEvent, id: '' };
    delete this.calendarEvents[deleteEvent].id;
    this.modalService.dismissAll();
    this.gdwel_7ssDataService.deletegdwel_7ss(Number(deleteId)).subscribe(res => {
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



     // const weekInMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      // this.ssData = [];
      // for (let currentStart = startWeek; currentStart <= endWeek; currentStart.setTime(currentStart.getTime() + weekInMs)) {
      //   var event = {
      //     id: this.calendarEvents.length + 1,
      //     start: currentStart,
      //     end: ""//new Date(currentStart.getTime() + 24 * 60 * 60 * 1000) // 1 day from start date
      //   };

      //   this.calendarEvents = this.calendarEvents.concat(event);

      //   var val = {
      //     title: this.selectedsubjects1.subject_name,
      //     start: currentStart,
      //     end: '',
      //     className: '',
      //     emp_id: Number(this.selectedemp.emp_id),
      //     emp_name: this.selectedemp.emp_name,
      //     subject_id: Number(this.selectedsubjects1.subject_id),
      //     class_id: this.selectedclass.class_id,
      //     level_id: this.selectedlevel.lev_id
      //   };

      //   console.log("asd", val);
      //   this.ssData.push(val)
      // }


      this.gdwel_7ssDataService.addgdwel_7ss(val).subscribe(res => {
        this._fetchData();
        this.position();
        this.formData = this.formBuilder.group({
          title: '',
          category: ''
        });
        this.modalService.dismissAll();
        this.submitted = true;
      });

    }
    //this.calculateWeekends(2022)

    //  console.log("calen", this.calendarEvents[this.calendarEvents.length - 1].id, "calenssss",this.calendarEvents.id  )
  }

  /**
   * Open Delete Confirmation Modal
   */
  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.deleteEventData();
        Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      }
    });
  }
  Employee: Employee[];
  change_class(event) {
    if(event !== null && event !== undefined && event.length !== 0){

    this.gdwel_7ssDataService.get_gdwel_7ss_with_class_id(event.class_id).subscribe(data => this.calendarEvents = data,
      error => console.log());
    }
  }
  yourEventResizeFunction(event) { }
  public minTime: any = "09:00:00";
  public maxTime: any = "18:00:00";
  public duration: any = "00:00";
  _fetchData() {
    this._7esa_defDataService.get_7esa_def().subscribe((data: any) => {
      this.duration = data.data[0].duration

      //  this.minTime = data.data.reduce((earliest, current) => {
      //   return (earliest < current.start_time) ? earliest : current.start_time;
      // }, data.data[0].start_time);

      // this.maxTime = data.data.reduce((latest, current) => {
      //   return (latest > current.end_time) ? latest : current.end_time;
      // }, data.data[0].end_time);
    })
    // Event category
    this.category = category;
    // Calender Event Data
    //  this.calendarEvents = calendarEvents;
    const userToken = localStorage.getItem(environment.authTokenKey);
    this.decoded = jwt_decode(userToken);
    this.EmployeeService.GetAllEmployee_with_id(this.decoded.id).subscribe((data) => {
      this.Employee = data
      if ((data[0].emp_pos_id == 37) || (data[0].emp_pos_id == 38) || (data[0].emp_pos_id == 41)) {
        this.head = 0
      }
      else {
        this.head = 1
      }
      if ((data[0].emp_pos_id == 37) || (data[0].emp_pos_id == 41)) {
        this.gdwel_7ssDataService.GetAllgdwel_7ss().subscribe((data: any) => {

          for (let i = 0; i < data.length; i++) {
            data[i].title = data[i].class_name;
            this.calendarEvents = data
            this.cdRef.detectChanges();
          }

        },
          error => console.log(),
          () => {

          });
      }
      else if ((data[0].emp_pos_id == 38)) {
        this.gdwel_7ssDataService.GetAllgdwel_7ss().subscribe(data => { this.calendarEvents = data; this.cdRef.detectChanges(); },
          error => console.log() );
      }
      else {
        let v = 0;
        if (this.selectedclass && this.selectedclass.class_id) {
          v = this.selectedclass.class_id;
        }
        this.gdwel_7ssDataService.GetAllgdwel_7ss().subscribe((data) => {
          data.forEach(element => {
            element.start = new Date(element.start)
          });

   
  }
  editEventSave() {
          this.calendarEvents = data;
          this.cdRef.detectChanges();
        },
          error => console.log());
      }

      // form submit
      this.submitted = false;
      if (document.getElementById('calendarID')) {
        document.getElementById('calendarID').click()
      }
    })


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

  }

}
