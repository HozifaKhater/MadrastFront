import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbootstrapComponent } from './ngbootstrap.component';
import { AlertComponent } from './alert/alert.component';
import { AccordionComponent } from './accordion/accordion.component';
import { NgbAlertConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { MaterialPreviewModule } from '../../partials/content/general/material-preview/material-preview.module';
import { ECommerceModule } from '../apps/e-commerce/e-commerce.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from './carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { CollapseComponent } from './collapse/collapse.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent, NgbdModalContentComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PopoverComponent } from './popover/popover.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { RatingComponent } from './rating/rating.component';
import { TabsComponent } from './tabs/tabs.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TypeheadComponent } from './typehead/typehead.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MaterialModule } from '../material/material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
    MatDatepickerModule,
    NativeDateModule,
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
    MatBottomSheetRef,
    MAT_DATE_LOCALE,
    MAT_DATE_FORMATS,

} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { Add_libDataService } from '../../../Services/Add_libDataService';
import { Borrow_bookDataService } from '../../../Services/Borrow_bookDataService';
import { StudentDataService } from '../../../Services/StudentDataService';
import { divisionsDataService } from '../../../Services/divisionsDataService';
import { teams_and_groupsDataService } from '../../../Services/teams_and_groupsDataService';
import { Group_meetingDataService } from '../../../Services/Group_meetingDataService';
import { ObservationsDataService } from '../../../Services/ObservationsDataService';
import { Corr_meetingDataService } from '../../../Services/Corr_meetingDataService';


const routes: Routes = [
    {
        path: '',
        component: NgbootstrapComponent,
        children: [
            {
                path: 'book_data',
                component: AccordionComponent
            },
            {
                path: 'borrow_book',
                component: AlertComponent
            },
            {
                path: 'return_book',
                component: ButtonsComponent
            },
            {
                path: 'show_books',
                component: CarouselComponent
            },
            {
                path: 'trips',
                component: CollapseComponent
            },
            {
                path: 'performance_improvement_formation',
                component: DatepickerComponent
            },
            {
                path: 'strategic_plan_teams_formation',
                component: DropdownComponent
            },
            {
                path: 'meetings',
                component: ModalComponent
            },
            {
                path: 'observers_distribution_table',
                component: PaginationComponent
            },
            {
                path: 'corridor_supervisors_meeting',
                component: PopoverComponent
            },
            {
                path: 'progressbar',
                component: ProgressbarComponent
            },
            {
                path: 'rating',
                component: RatingComponent
            },
            {
                path: 'tabs',
                component: TabsComponent
            },
            {
                path: 'timepicker',
                component: TimepickerComponent
            },
            {
                path: 'tooltip',
                component: TooltipComponent
            },
            {
                path: 'typehead',
                component: TypeheadComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        MatCheckboxModule,
        ECommerceModule,
        MaterialModule,            // <----- this module will be deprecated in the future version.
        MatDatepickerModule,        // <----- import(must)
        MatNativeDateModule,        // <----- import for date formating(optional)
        MatMomentDateModule,
        MaterialModule,
        CommonModule,
        PartialsModule,
        NgbModule,
        CoreModule,
        MaterialPreviewModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PerfectScrollbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatListModule,
        MatSliderModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatNativeDateModule,
        MatMenuModule,
        MatTabsModule,
        MatTooltipModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTableModule,
        MatGridListModule,
        MatToolbarModule,
        MatBottomSheetModule,
        MatExpansionModule,
        MatDividerModule,
        MatSortModule,
        MatStepperModule,
        MatChipsModule,
        MatPaginatorModule,
        CoreModule,
        CommonModule,
        MatRadioModule,
        MatTreeModule,
        MatButtonToggleModule,
        PartialsModule,
        MaterialPreviewModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [RouterModule,
        MaterialModule],
    declarations: [
        NgbootstrapComponent,
        AlertComponent,
        AccordionComponent,
        ButtonsComponent,
        CarouselComponent,
        CollapseComponent,
        DatepickerComponent,
        DropdownComponent,
        ModalComponent,
        NgbdModalContentComponent,
        PaginationComponent,
        PopoverComponent,
        ProgressbarComponent,
        RatingComponent,
        TabsComponent,
        TimepickerComponent,
        TooltipComponent,
        TypeheadComponent,
        DatepickerComponent,
        ModalComponent
    ],
    providers: [
        NgbAlertConfig, Add_libDataService, Borrow_bookDataService, StudentDataService, divisionsDataService,
        teams_and_groupsDataService, Group_meetingDataService, ObservationsDataService, Corr_meetingDataService],
    entryComponents: [
        NgbdModalContentComponent
    ]
})
export class NgbootstrapModule {
}
