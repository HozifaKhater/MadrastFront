// Angular

import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { CalendarModule } from '../calendar/calendar.module';

import { BorrowedBooksListComponent } from '../../pages/dashboard/borrowed_books-list/borrowed_books-list';
import { ShowDelaysListComponent } from '../../pages/dashboard/show_delays-list/show_delays-list';
import { ShowEzonListComponent } from '../../pages/dashboard/show_ezons-list/show_ezons-list.component';
import { ShowvisitsComponent } from '../../pages/dashboard/show_visits-list/show_visits-list.component';
import { ShowGroupmeetingListComponent } from '../../pages/dashboard/show-group-meeting-list/show-group-meeting-list';
import { ShowstudentmattersListComponent } from '../../pages/dashboard/show-student-matters-list/show-student-matters-list';
import { Shownew_workListComponent } from '../../pages/dashboard/show_new_work-list/show_new_work-list';
import { Showusers_privComponent } from '../../pages/dashboard/show_users_priv-list/show_users_priv-list.component';
import { SignalrService } from '../../../Services/notificationDataService';

import {
	MatInputModule,
	MatFormFieldModule,
	MatSelectModule,
	MatCheckboxModule,
	MatIconModule,
	MatTableModule,
	MatSortModule,
	MatPaginatorModule,
	MatProgressSpinnerModule

} from '@angular/material';
import { MatSelectFilterModule } from 'mat-select-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { calling_parentsListComponent } from '../../pages/dashboard/calling_parents-list/calling_parents-list.component';
import { Ta7deirComponent } from '../../pages/dashboard/Ta7diers-list/Ta7diers-list.component';
import { Calendargdwel_7ssModule } from '../../pages/dashboard/calendar-gdwel_7ss/calendar-gdwel_7ss.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { week_Ta7deirComponent } from '../../pages/dashboard/week-Ta7diers-list/week-Ta7diers-list.component';
import { actual_weekTa7diersComponent } from '../../pages/dashboard/actual_weekTa7diers-list/actual_weekTa7diers-list.component';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


/*import { ECommerceModule } from '../apps/e-commerce/e-commerce.module';*/

// import { CalendarComponent } from '../calendar/calendar.component';
@NgModule({
	imports: [
		NgbAlertModule,
		NgbPaginationModule,
		NgbAccordionModule,
		CKEditorModule,
		FormsModule,
        ReactiveFormsModule,
		HttpClientModule,
		/*		ECommerceModule,*/
		Calendargdwel_7ssModule,
		MatCheckboxModule,
		MatInputModule,
		MatIconModule,
		MatFormFieldModule,
		MatSelectModule,
		MatTableModule,
		MatSortModule,
		FullCalendarModule,
		MatSelectFilterModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		CommonModule,
		PartialsModule,
		CoreModule,
		CalendarModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			},
		]),
	],
	providers: [SignalrService],
	declarations: [
		
		DashboardComponent,
		BorrowedBooksListComponent,
		Ta7deirComponent,
		calling_parentsListComponent,
		ShowDelaysListComponent,
		ShowEzonListComponent,
		ShowvisitsComponent,
		ShowGroupmeetingListComponent,
		ShowstudentmattersListComponent,
		Shownew_workListComponent,
		Showusers_privComponent,
		week_Ta7deirComponent,
		actual_weekTa7diersComponent

	],
	exports: [
		week_Ta7deirComponent,
		actual_weekTa7diersComponent,
		BorrowedBooksListComponent,
		Ta7deirComponent,
		calling_parentsListComponent,
		ShowDelaysListComponent,
		ShowEzonListComponent,
		ShowvisitsComponent,
		ShowGroupmeetingListComponent,
		ShowstudentmattersListComponent,
		Shownew_workListComponent,
		Showusers_privComponent
		]
})
export class DashboardModule {
		
}
