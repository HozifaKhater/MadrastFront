// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { gdwel_7ssComponent } from './calendar-gdwel_7ss.component';
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
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormArray, FormBuilder, } from '@angular/forms';
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
import {
    MatAutocompleteModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSliderModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatListModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatMenuModule,
    MatTreeModule,
    MAT_BOTTOM_SHEET_DATA,
   
    MAT_DATE_LOCALE,
    MAT_DATE_FORMATS,

} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
	imports: [
    /*		PagesModule,*/
        MatAutocompleteModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatSelectModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatSliderModule,
        MatPaginatorModule,
        MatSortModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatStepperModule,
        MatToolbarModule,
        MatDividerModule,
        MatTabsModule,
        MatTableModule,
        MatTooltipModule,
        MatListModule,
        MatGridListModule,
        MatButtonToggleModule,
        MatBottomSheetModule,
        MatExpansionModule,
        MatMenuModule,
        MatTreeModule,
     
     
     
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
        gdwel_7ssComponent
	],
    exports: [gdwel_7ssComponent],
    entryComponents: [gdwel_7ssComponent]
})
export class Calendargdwel_7ssModule {


}
