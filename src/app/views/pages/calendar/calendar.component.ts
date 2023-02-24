import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { EventInput } from '@fullcalendar/core';
import { HolidaysDataService } from '../../../Services/HolidaysDataService';
import { Event } from './event.model';
import { category, calendarEvents, calendarEventsModel } from './data';
import { FullCalendarComponent } from '@fullcalendar/angular';
//import { CalendarOptions } from '@fullcalendar/angular';

import moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

/**
 * Calendar Component
 */
export class CalendarComponent implements OnInit {
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

  // Date added in event
  newEventDate: Date;

  // Edit event
  editEvent: EventInput;

  // Delete event
  deleteEvent: EventInput;

  calendarWeekends: any;
  // show events
  calendarEvents: any;
  calendarEventsModel: calendarEventsModel[];
  // calendar plugin
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder
    , private HolidaysDataService: HolidaysDataService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Calendar', active: true }];

    /**
     * Event Model validation
     */
    this.formData = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
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
  yourEventResizeFunction(event) {
    console.log(event);
    // Do something with the event here, such as updating the event in a database or displaying a notification
  }
  /**
   * Open Event Modal
   * @param content modal content
   * @param event calendar event
   */
  openModal(content: any, event: any) {
    this.newEventDate = event.date;
    this.modalService.open(content);
  }

  /**
   * Open Event Modal For Edit
   * @param editcontent modal content
   * @param event calendar event
   */
  onEventDrop(editcontent: any, event: any) {
    console.log("at7rkt?", event)
    this.formEditData = this.formBuilder.group({
      editTitle: event.event.title,
      editCategory: event.event.classNames[event.event.classNames.length - 1],
    });
    // tslint:disable-next-line: max-line-length
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
    this.HolidaysDataService.updateholidays(val).subscribe(res => {
      alert(res.toString());
    })
    // this.modalService.open(editcontent);
  }
  openEditModal(editcontent: any, event: any) {
    //console.log("btt7rk hna01")
    this.formEditData = this.formBuilder.group({
      editTitle: event.event.title,
      editCategory: event.event.classNames[event.event.classNames.length - 1],
    });
    // tslint:disable-next-line: max-line-length
    this.editEvent = { id: event.event.id, title: event.event.title, start: event.event.start, classNames: event.event.classNames[event.event.classNames.length - 1] };
    this.modalService.open(editcontent);

  }

  /**
   * Show successfull Save Dialog
   */
  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
      showConfirmButton: false,
      timer: 2000
    });
  }

  /**
   * Upldated event title save in calendar
   */

  editEventSave() {
    console.log("btt7rk hna1")
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
      title: this.calendarEvents[editId].title,
      start: this.calendarEvents[editId].start,
      end: this.calendarEvents[editId].end,
      className: this.calendarEvents[editId].className

    };
    console.log("asd", val)
    this.HolidaysDataService.updateholidays(val).subscribe(res => {
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
    this.HolidaysDataService.deleteholidays(Number(deleteId)).subscribe(res => {
    })
  }

  /**
   * Model Data save and show the event in calendar
   */
  saveEvent() {
    if (this.formData.valid) {
      const title = this.formData.get('title').value;
      // tslint:disable-next-line: no-shadowed-variable
      const category = this.formData.get('category').value;
      console.log("calen", this.formData.get('start'), "calenssss11")
      this.calendarEvents = this.calendarEvents.concat({
        id: this.calendarEvents.length + 1,
        title,
        className: category,
        start: this.newEventDate || new Date()
      });
      this.position();
      this.formData = this.formBuilder.group({
        title: '',
        category: ''
      });
      this.modalService.dismissAll();
    }
    this.submitted = true;
    //this.calculateWeekends(2022)
    var val = {

      title: this.calendarEvents[this.calendarEvents.length - 1].title,
      start: this.calendarEvents[this.calendarEvents.length - 1].start,
      end: this.calendarEvents[this.calendarEvents.length - 1].end,
      className: this.calendarEvents[this.calendarEvents.length - 1].className

    };
    console.log("asd", val)
    this.HolidaysDataService.addholidays(val).subscribe(res => {

    })
    console.log("calen", this.calendarEvents[this.calendarEvents.length - 1].id, "calenssss", this.calendarEvents.id)
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

  private _fetchData() {
    // Event category
    this.category = category;
    // Calender Event Data
    this.calendarEvents = calendarEvents;
    //this.HolidaysDataService.GetAllholidays().subscribe(data => this.calendarEvents = data,
    //    error => console.log(error),
    //    () => console.log("emp dropdown", this.calendarEvents));
    // form submit
    this.submitted = false;
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
  totalNumberOfHolidays = 0;
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
    this.totalNumberOfHolidays = this.totalNumberOfSaturdays + this.totalNumberOfSundays;

    console.log(this.totalNumberOfSaturdays)
    console.log(this.totalNumberOfSundays)
  }

}
