// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { CalendartermsComponent } from './calendar-terms.component';
import { PagesModule } from '../pages.module';
import { ECommerceModule } from '../apps/e-commerce/e-commerce.module';
import { MaterialModule } from '../material/material.module';
import { FullCalendarModule } from '@fullcalendar/angular';

import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
//FullCalendarModule.registerPlugins([
//    dayGridPlugin,
//    timeGridPlugin,
//    listPlugin,
//    interactionPlugin
//])
@NgModule({
	imports: [
		/*		PagesModule,*/
		NgbTooltipModule,
		NgbDropdownModule,
		NgbNavModule,
		NgbModule,
		WidgetModule,
		UiModule,
		ReactiveFormsModule,
		FormsModule,
		FullCalendarModule,
		CommonModule,
		PartialsModule,
		CoreModule,
	],
	providers: [],
	declarations: [
		CalendartermsComponent
	],
	exports: [CalendartermsComponent],
	entryComponents: [CalendartermsComponent]
})
export class CalendartermsModule {


}
