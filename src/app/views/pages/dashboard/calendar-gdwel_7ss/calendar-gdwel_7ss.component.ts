import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { gdwel_7ssDataService } from '../../../../Services/gdwel_7ssDataService';
import { Event } from './calendar-gdwel_7ssevent.model';
import { category, calendarEventsModel } from './calendar-gdwel_7ssdata';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Employee } from '../../../../../../src/app/EmployeeMaster.Model';
import { Subjects } from '../../../../../../src/app/SubjectMaster.Model'; Component
import { SubjectDataService } from '../../../../Services/SubjectDataService';
import { EmployeeDataService } from '../../../../Services/EmployeeDataService';
import { Observable } from 'rxjs';
import { Classes } from '../../../../ClassesMaster.Model';
import { ClassesDataService } from '../../../../Services/ClassesDataService';
import { LevelsDataService } from '../../../../Services/LevelsDataService';
import { Levels } from '../../../../LevelsMaster.Model';
import { _7esa, _7esaMaster } from '../../../../_7esaMaster.Model';
import { _7esa_defDataService } from '../../../../Services/_7esaDataService';
import { map, startWith } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-calendar-gdwel_7ss',
  templateUrl: './calendar-gdwel_7ss.component.html',
  styleUrls: ['./calendar-gdwel_7ss.component.scss']
})

export class gdwel_7ssComponent implements OnInit {
  @ViewChild('fullcalendar', { static: true }) fullcalendar: FullCalendarComponent;

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // event form
  formData: FormGroup;
  formEditData: FormGroup;

  // Form submition value
  submitted: boolean;

  // Form category data
  category: Event[];

  constructor(
    private cdRef:ChangeDetectorRef,
    private EmployeeDataService: EmployeeDataService,
    private fb: FormBuilder, private http: HttpClient) {
  // Date added in event
  newEventDate: Date;

  // Edit event
  editEvent: EventInput;

  // Delete event
  deleteEvent: EventInput;
  //calendarOptions:OptionsInput;
  calendarWeekends: any;
  // show events
  calendarEvents: any;
  calendarEventsModel: calendarEventsModel[];
  // calendar plugin
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];
  subjects: Subjects[];
  Employees: Employee[];
  emps: Employee[];
  decoded: any;
  public head: number = 1;
  constructor(
    private _7esa_defDataService: _7esa_defDataService,
    public _fb: FormBuilder, private LevelsDataService: LevelsDataService, private ClassesDataService: ClassesDataService,
    private modalService: NgbModal, private formBuilder: FormBuilder
    , private gdwel_7ssDataService: gdwel_7ssDataService, private SubjectDataService: SubjectDataService, private EmployeeService: EmployeeDataService) {

  }
  ngAfterViewInit() {
    
   
  }
  public pos_id:number = 0;
  level: Levels[];
  selectedlevel: any;
  class: Classes[];
  selectedclass: any;
  form1: FormGroup;
  myControllev = new FormControl('');
  myControlclass = new FormControl('');
  myControlstudent = new FormControl('');

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
  change_level(event) {
    let valu = 0;
    if (event.lev_id) {
      valu = event.lev_id
    }
    this.ClassesDataService.GetAllClasses_with_level_id(valu).subscribe(data => this.class = data,
      error => console.log(error),
      () => {
        console.log("emp dropdown", this.class);
        this.filteredOptionsclass = this.myControlclass.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.class_name),
            map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
          );
      });
  }
  change_subject(event) {
    this.EmployeeService.get_emp_def_with_subject_id(event.subject_id).subscribe(data => this.emps = data,
      error => console.log(error),
      () => console.log("emp dropdown", this.emps));
  }


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
    this.SubjectDataService.GetAllSubject().subscribe(data => this.subjects = data,
      error => console.log(error),
      () => { console.log("subjects dropdown", this.subjects) });

    this._fetchData();

    const userToken = localStorage.getItem(environment.authTokenKey);
    this.decoded = jwt_decode(userToken);
    this.LevelsDataService.GetAllLevels().subscribe(data => this.level = data,
      error => console.log(error),
      () => {
        console.log("emp dropdown", this.level);
        this.filteredOptionslev = this.myControllev.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.lev_name),
            map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
          );
      });
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Calendar', active: true }];

    this.formData = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });

    this.formEditData = this.formBuilder.group({
      editTitle: [],
      editCategory: [],
    });

    this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees = data,
      error => console.log(error),
      () => console.log("emp dropdown", this.Employees));

  }

  get form() {
    return this.formData.controls;
  }

  openModal(content: any, event: any) {
    if ((this.Employee[0].emp_pos_id == String(37)) || (this.Employee[0].emp_pos_id == String(38)) || (this.Employee[0].emp_pos_id == String(41))) {
      // this.newEventDate = event.date;
      // this.modalService.open(content);
    }
    else {
      //this.newEventDate = event.date;
      //this.modalService.open(content);
    }
  }

  onEventDrop(editcontent: any, event: any) {
    console.log("at7rkt?", event)
    this.formEditData = this.formBuilder.group({
      editTitle: event.event.title,
      editCategory: event.event.classNames[event.event.classNames.length - 1],
    });
    this.editEvent = { id: event.event.id, title: event.event.title, start: event.event.start, classNames: event.event.classNames[event.event.classNames.length - 1] };
    console.log("got it", this.editEvent, editcontent)
    var val = {
      id: Number(event.event.id),
      title: event.event.title,
      start: event.event.start,
      end: event.event.end,
      className: event.event.classNames[event.event.classNames.length - 1]

    };
    console.log("asd", val)
    this.gdwel_7ssDataService.updategdwel_7ss(val).subscribe(res => {
      alert(res.toString());
    })
    // this.modalService.open(editcontent);
  }
  gdwel_info: any;
  openEditModal(editcontent: any, event: any) {
    console.log("openmodal", event.event.id)
    this.gdwel_7ssDataService.GetAllgdwel_7ss_with_id(event.event.id).subscribe(data => { this.gdwel_info = data },
      error => console.log(error),
      () => {
        console.log("year_details", this.gdwel_info);
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
   // this.modalService.open(editcontent);

  }

  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
      showConfirmButton: false,
      timer: 2000
    });
  }

  editEventSave() {

    const editTitle = this.formEditData.get('editTitle').value;
    const editCategory = this.formEditData.get('editCategory').value;
    const editId = this.calendarEvents.findIndex(x => x.id + '' === this.editEvent.id + '');
    // tslint:disable-next-line: radix
    this.calendarEvents[editId] = { ...this.editEvent, title: editTitle, id: parseInt(this.editEvent.id + ''), className: editCategory };
    this.formEditData = this.formBuilder.group({
      editTitle: '',
      editCategory: '',
    });
    console.log("fen!", this.calendarEvents[editId])
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
    console.log("asd", val)
    this.gdwel_7ssDataService.updategdwel_7ss(val).subscribe(res => {
      this._fetchData();
      alert(res.toString());
    })
    this.modalService.dismissAll();
  }

  deleteEventData() {
    const deleteId = this.editEvent.id;
    const deleteEvent = this.calendarEvents.findIndex(x => x.id + '' === deleteId + '');
    this.calendarEvents[deleteEvent] = { ...this.deleteEvent, id: '' };
    delete this.calendarEvents[deleteEvent].id;
    this.modalService.dismissAll();
    this.gdwel_7ssDataService.deletegdwel_7ss(Number(deleteId)).subscribe(res => {
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

  selectedreplaceemp: any;
  selectedemp: any;
  selectedsubjects1: any;
  saveEvent() {
    if (this.formData.valid) {
      const title = this.formData.get('title').value;
      // tslint:disable-next-line: no-shadowed-variable
      const category = this.formData.get('category').value;
      //  console.log("calen", this.formData.get('start'), "calenssss11")
      //   this.calendarEvents = this.calendarEvents.concat({
      //     id: this.calendarEvents.length + 1,
      //     title,
      //     className: category,
      //     start: this.newEventDate || new Date()
      //   });
      //   var val = {

      //     title: this.selectedsubjects1.subject_name,
      //     start: this.calendarEvents[this.calendarEvents.length - 1].start,
      //     end: this.calendarEvents[this.calendarEvents.length - 1].end,
      //     className: this.calendarEvents[this.calendarEvents.length - 1].className ,
      //     emp_id:Number(this.selectedemp.emp_id),
      //     emp_name:this.selectedemp.emp_name,
      //     subject_id:Number(this.selectedsubjects1.subject_id),
      //     class_id:0,
      //     level_id : 0

      // };
      // console.log("asd", val)
      // this.gdwel_7ssDataService.addgdwel_7ss(val).subscribe(res => {
      //    this._fetchData();
      // })
      const startWeek = new Date("2023-02-08");
      const endWeek = new Date("2023-07-08");
      const weekInMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

      for (let currentStart = startWeek; currentStart <= endWeek; currentStart.setTime(currentStart.getTime() + weekInMs)) {
        const event = {
          id: this.calendarEvents.length + 1,
          title: title,
          className: category,
          start: currentStart,
          end: ""//new Date(currentStart.getTime() + 24 * 60 * 60 * 1000) // 1 day from start date
        };

        this.calendarEvents = this.calendarEvents.concat(event);

        var val = {
          title: this.selectedsubjects1.subject_name,
          start: event.start,
          end: event.end,
          className: event.className,
          emp_id: Number(this.selectedemp.emp_id),
          emp_name: this.selectedemp.emp_name,
          subject_id: Number(this.selectedsubjects1.subject_id),
          class_id: this.selectedclass.class_id,
          level_id: this.selectedlevel.lev_id
        };

        console.log("asd", val);
        this.gdwel_7ssDataService.addgdwel_7ss(val).subscribe(res => {
          this._fetchData();
        });
      }




      this.position();
      this.formData = this.formBuilder.group({
        title: '',
        category: ''
      });
      this.modalService.dismissAll();
    }
    this.submitted = true;
    //this.calculateWeekends(2022)

    //  console.log("calen", this.calendarEvents[this.calendarEvents.length - 1].id, "calenssss",this.calendarEvents.id  )
  }

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


    this.gdwel_7ssDataService.get_gdwel_7ss_with_class_id(event.class_id).subscribe(data => {

      for (var ii = 0; ii < data.length; ii++) {
        data[ii]['textColor'] = 'red';
        data[ii]['backgroundColor'] = 'black';
      }

      this.calendarEvents = data;
    },
      error => console.log(error),
      () => console.log("emp dropdown", this.calendarEvents));
  }
  yourEventResizeFunction(event) { }
  sl = [
    { start: '09:00:00', end: '09:30:00' },
    { start: '09:30:00', end: '10:00:00' },
    { start: '10:00:00', end: '10:30:00' },
  ];
  public minTime: any = "00:00:00";
  public maxTime: any = "00:00:00";
  public duration: any = "00:00:00";
  _fetchData() {
    // Event category
    this.category = category;
    // Calender Event Data
    //  this.calendarEvents = calendarEvents;
    //this.calendarOptions.slotDuration="00:45"
    this._7esa_defDataService.get_7esa_def().subscribe((data: any) => {
      console.log("_7esa_defDataService", data.data)
      this.duration = data.data[0].duration

      this.minTime = data.data.reduce((earliest, current) => {
        return (earliest < current.start_time) ? earliest : current.start_time;
      }, data.data[0].start_time);

      this.maxTime = data.data.reduce((latest, current) => {
        return (latest > current.end_time) ? latest : current.end_time;
      }, data.data[0].end_time);
      console.log("startendtime", this.minTime, this.maxTime)
    })
    const userToken = localStorage.getItem(environment.authTokenKey);
    this.decoded = jwt_decode(userToken);
    this.EmployeeService.GetAllEmployee_with_id(this.decoded.id).subscribe((data) => {
      console.log("gdwel_data---", this.Employee);
      if ((data[0].emp_pos_id == 37) || (data[0].emp_pos_id == 38) || (data[0].emp_pos_id == 41)) {
        this.head = 0
      }
      else {
        this.head = 1
      }
      if ((data[0].emp_pos_id == 37) || (data[0].emp_pos_id == 41)) {
        console.log("gdwel_data2")
        this.gdwel_7ssDataService.GetAllgdwel_7ss().subscribe((data: any) => {

          for (let i = 0; i < data.length; i++) {
            data[i].title = data[i].class_name;
            this.calendarEvents = data
          }

          console.log("emp gdwel_data", this.calendarEvents);
        },
          error => console.log(error),
          () => {

          });
      }
      else if ((data[0].emp_pos_id == 38)) {
        console.log("gdwel_data2")
        this.gdwel_7ssDataService.GetAllgdwel_7ss().subscribe(data => this.calendarEvents = data,
          error => console.log(error),
          () => { console.log("emp gdwel_data", this.calendarEvents) });
      }
      else {
        console.log("gdwel_data1")
        let v = 0;
        if (this.selectedclass && this.selectedclass.class_id) {
          v = this.selectedclass.class_id;
        }
        this.gdwel_7ssDataService.GetAllgdwel_7ss().subscribe(data => this.calendarEvents = data,
          error => console.log(error),
          () => console.log("gdwel_data", this.calendarEvents));
      }

  get_gdwel_7ss_all() {
    this.http.get('https://localhost:44337/api/gdwel_7ss/get_gdwel_7ss_all').subscribe({
      next: (result: any[]) => {
       
        this.data2 = result;
        console.log("gdwel_7ss",this.data2)
      },
      error: (err) => {
        alert(err.message);
      // form submit
      this.submitted = false;
      if (document.getElementById('calendarID')) {
        document.getElementById('calendarID').click()
      }
    })

  }

  closeEventModal() {
    const title = this.formData.get('title').value;
    // tslint:disable-next-line: no-shadowed-variable
    const category = this.formData.get('category').value;
    this.formData = this.formBuilder.group({
      title: '',
      category: ''
    });
    this.modalService.dismissAll();
  }
  totalNumberOfDays = 0;
  totalNumberOfgdwel_7ss = 0;
  totalNumberOfSaturdays = 0;
  totalNumberOfSundays = 0;
  calculateWeekends(year: number) {

    var date = new Date(`January 1, ${year}`)
    var endDate = new Date(`December 31, ${year}`)

    for (var d = date; d <= endDate; d.setDate(d.getDate() + 1)) {

      this.totalNumberOfDays++;
      if (d.getDay() == 0) {
        this.totalNumberOfSundays++;
      } else if (d.getDay() == 6) {
        this.totalNumberOfSaturdays++;
      }
    }
    this.totalNumberOfgdwel_7ss = this.totalNumberOfSaturdays + this.totalNumberOfSundays;

    console.log(this.totalNumberOfSaturdays)
    console.log(this.totalNumberOfSundays)
  }

}
