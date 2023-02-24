// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Fake API Angular-in-memory
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// Translate Module
import { TranslateModule } from '@ngx-translate/core';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// UI
import { PartialsModule } from '../../../partials/partials.module';
// Core
import { FakeApiService } from '../../../../core/_base/layout';
// Auth
import { ModuleGuard } from '../../../../core/auth';
// Core => Services
import {
    customersReducer,
    CustomerEffects,
    CustomersService,
    productsReducer,
    ProductEffects,
    ProductsService,
    productRemarksReducer,
    ProductRemarkEffects,
    ProductRemarksService,
    productSpecificationsReducer,
    ProductSpecificationEffects,
    ProductSpecificationsService
} from '../../../../core/e-commerce';
// Core => Utils
import {
    HttpUtilsService,
    TypesUtilsService,
    InterceptService,
    LayoutUtilsService
} from '../../../../core/_base/crud';
// Shared
import {
    ActionNotificationComponent,
    DeleteEntityDialogComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent
} from '../../../partials/content/crud';
// Components
import { ECommerceComponent } from './e-commerce.component';
// Customers
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { ActivityListComponent } from './customers/activities-list/activities-list.component';
import { master_jobsComponent } from './customers/master_jobs-list/master_jobs.component';
import { StudentComponent } from './customers/student-list/student.component';
import { SubjectComponent } from './customers/subjects-list/subjects-list.component';
import { EmployeesListComponent } from './customers/employees-list/employees-list.component';
import { CustomerEditDialogComponent } from './customers/customer-edit/customer-edit.dialog.component';
import { Ta7deirComponent } from './customers/Ta7diers-list/Ta7diers-list.component';
import { CorridorListComponent } from './customers/corridors-list/corridors-list.component';
import { CorridorSupervisionListComponent } from './customers/corridor_supervision-list/corridor_supervision-list';
import { EzonListComponent } from './customers/ezons-list/ezons-list.component';
import { student_trackingListComponent } from './customers/student_tracking-list/student_tracking-list';
import { student_tracking_reportListComponent } from './customers/student_tracking_report-list/student_tracking-list';
// Products
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { RemarksListComponent } from './products/_subs/remarks/remarks-list/remarks-list.component';
import { SpecificationsListComponent } from './products/_subs/specifications/specifications-list/specifications-list.component';
import { SpecificationEditDialogComponent } from './products/_subs/specifications/specification-edit/specification-edit-dialog.component';
// Orders
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrderEditComponent } from './orders/order-edit/order-edit.component';
import { EditorComponent } from '../../editor/editor.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// Material
import {
   
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    MatNativeDateModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MAT_DIALOG_DEFAULT_OPTIONS,
    MatSnackBarModule,
    MatTooltipModule
} from '@angular/material';
import { environment } from '../../../../../environments/environment';
import { CoreModule } from '../../../../core/core.module';
import { NgbProgressbarModule, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HttpModule } from '@angular/http';
import { BadStudentsCardsListComponent } from './customers/bad_students_cards-list/bad_students_cards-list';
import { GoodBadStudentsCardsListComponent } from './customers/good_bad_students_cards-list/good_bad_students_cards-list';
import { EzonListEditStateComponent } from './customers/ezons-list-edit-state/ezons-list-edit-state.component';
import { Ta7deirEditStateComponent } from './customers/Ta7diers-list-edit-state/Ta7diers-list-edit-state.component';
//import { GridListEntryComponent } from '../../material/layout/grid-list-entry/grid-list-entry.component';
/*import { MaterialModule } from '../../material/material.module';*/
import { EvaluationItemsListComponent } from './customers/evaluation_items-list/evaluation_items-list';
import { TakeemMasterListComponent } from './customers/takeem_master-list/takeem_master-list';
import { TakeemMasterTeamsListComponent } from './customers/takeem_master-teams-list/takeem_master-teams-list';
import { TakeemMasterDetailsListComponent } from './customers/takeem_master-details-list/takeem_master-details-list';
import { users_privComponent } from './customers/users_priv-list/users_priv-list.component';
import { visits_otherComponent } from './customers/visits_other-list/visits_other-list.component';
import { DelaysListComponent } from './customers/delays-list/delays-list';
import { StudentPremListComponent } from './customers/student_prem-list/student_prem-list';
import { School_dataListComponent } from './customers/school_data-list/school_data-list';
import { NchraListComponent } from './customers/nchra-list/nchra-list';
import { LevelsListComponent } from './customers/levels-list/levels-list';
import { classesListComponent } from './customers/classes-list/classes-list';
import { Mra7lListComponent } from './customers/mra7l-list/mra7l-list ';
import { SchoolYearListComponent } from './customers/school_year_data-list/school_year_data-list';
import { visit_typesComponent } from './customers/visit_types-list/visit_types-list.component';
import { visitsComponent } from './customers/visits-list/visits-list.component';

import { AbsenceListComponent } from './customers/absence-list/absence-list';
import { Twze3StudentsListComponent } from './customers/twze3_students-list/twze3_students-list';
import { Add_libListComponent } from './customers/add_lib-list/add_lib-list';
import { Borrow_bookListComponent } from './customers/borrow_book-list/borrow_book-list';
import { ReturnbookListComponent } from './customers/return_book-list/return_book-list';
import { SeqstudentComponent } from './customers/seq-students-list/seq-students-list';
import { TripsComponent } from './customers/trips-master-list/trips-master-list';
//import { DivisionListComponent } from './customers/division-master-list/division-master-list';
import { TeamsListComponent } from './customers/team-list/team-list ';
import { GroupmeetingListComponent } from './customers/group-meeting-list/group-meeting-list';
import { ObservationListComponent } from './customers/observations-list/observations-list';
import { CorrMeetListComponent } from './customers/corr_meeting-list/corr_meeting-list';
import { MaintListComponent } from './customers/Maintenance-list/Maintenance-list';
import { statusComponent } from '../../material/formcontrols/status/status.component';
import { mentality_inquiriesListComponent } from './customers/mentality_inquiries-list/mentality_inquiries-list';
import { statusListComponent } from './customers/status-list/status-list';
import { Show_libListComponent } from './customers/show_lib-list/show_lib-list';
import { student_parent_meetingListComponent } from './customers/student_parent_meeting-list/student_parent_meeting-list.component';
import { DefinitionListComponent } from './customers/Definition-list/Definition-list';
import { social_workerListComponent } from './customers/social_worker-list/social_worker-list';
import { Excellent_studentsListComponent } from './customers/excellent_students-list/excellent_students-list';
import { Tests_metricListComponent } from './customers/tests_metric-list/tests_metric-list';
import { ChangebranchListComponent } from './customers/change_branch-list/change_branch-list';
import { SuggesListComponent } from './customers/suggestions-list/suggestions-list';
import { guideListComponent } from './customers/guide-list/guide-list';
import { failureListComponent } from './customers/failure_cases-list/failure_cases-list ';
import { DisonlevelListComponent } from './customers/disonlevel-list/disonlevel-list';
import { levels_with_stisticslistComponent } from './customers/levels_with_stistics-list/levels_with_stistics.component';
import { branch_statComponent } from './customers/branch_stat-list/branch_stat-list';
import { basic_dataListComponent } from './customers/basic_data/basic_data-list';
import { div_empListComponent } from './customers/div_emp_id-list/div_emp_id-list';
import { training_empListComponent } from './customers/training_emp_id-list/training_emp_id-list';
import { financial_fund_expensesListComponent } from './customers/financial_fund_expenses-list/financial_fund_expenses-list.component';
import { HolidaysComponent } from './customers/holidays-list/holidays-list.component';
import { instructionsListComponent } from './customers/instructions-list/instructions-list';
import { new_workListComponent } from './customers/new_work-list/new_work-list';
import { student_basic_dataListComponent } from './customers/student_basic_data-list/student_basic_data-list';
import { studentmattersListComponent } from './customers/student-matters-list/student-matters-list';
import { permissionListComponent } from './customers/permission-list/permission-list';
import {  teacher_opinion_visitListComponent } from './customers/teacher_opinion_visit-list/teacher_opinion_visit-list.component';
import {  TakeemMasterDetails_reportListComponent } from './customers/takeem_master-details_report-list/takeem_master-details-list';
//import {  TakeemMasterDetails_reportListComponent } from './customers/messaGE/takeem_master-details-list';

import { partyListComponent } from './customers/school_party-list/school_party-list';
import { eventsListComponent } from './customers/events-list/events-list';
import { dailystatListComponent } from './customers/daily_absence_stat-list/daily_absence_stat-list';
import { ViolationsListComponent } from './customers/violations-list/violations-list';
import { Behavioral_statusListComponent } from './customers/behavioral_status-list/behavioral_status-list';

import { swotListComponent } from './customers/swot-list/swot-list.component';
import { messages_inboxListComponent } from './customers/messages_inbox-list/messages_inbox-list.component';
import { SupervisoropinionListComponent } from './customers/Supervisor_opinion-list/Supervisor_opinion-list';
import { Student_transferListComponent } from './customers/Student_transfer-list/Student_transfer-list';
import { Student_leaveListComponent } from './customers/Student_leave-list/Student_leave-list';
import { CatchRecieptListComponent } from './customers/CatchReciept-list/CatchReciept-list';
import { PaymentRecieptListComponent } from './customers/PaymentReciept-list/PaymentReciept-list';
import { Ta7dierTableListComponent } from './customers/Ta7dierTable-list/Ta7dierTable-list';
import { RestToRedoListComponent } from './customers/RestToRedo-list/RestToRedo-list';
import { RestToRedoService } from '../../../../Services/RestToRedoService';
import { SonsOfMartyrsListComponent } from './customers/SonsOfMartyrs-list/SonsOfMartyrs-list';
import { OtherStudentSlidesListComponent } from './customers/OtherStudentSlides-list/OtherStudentSlides-list';
import { IndividualCasesListComponent } from './customers/IndividualCases-list/IndividualCases-list';
import { RegimeCouncilStudentsListComponent } from './customers/RegimeCouncilStudents-list/RegimeCoucilStudents-list';
import { SpecialStudentsListComponent } from './customers/SpecialStudents-list/SpecialStudents-list';
import { behaviors_status_detaisListComponent } from './customers/behaviors_status_detais-list/behaviors_status_detais-list';
import { HealthCasesListComponent } from './customers/health_cases-list/health_cases-list';
import { AbsenceCasesListComponent } from './customers/absence_cases-list/absence_cases-list';
import { SpeakingdisorderListComponent } from './customers/speaking_disorder-list/speaking_disorder-list';
import { behaviours_statusListComponent } from './customers/behaviours_status-list/behaviours_status-list.component';
import { behaviours_statusListComponent1 } from './customers/behaviours_status/behaviours_status-list.component';
import { absence_statisticsListComponent } from './customers/absence_statistics-list/absence_statistics';
import { boardListComponent } from './customers/board-list/board-list.component';
import { board_typeListComponent } from './customers/board_type-list/board_type-list.component';
import { calling_parentsListComponent } from './customers/calling_parents-list/calling_parents-list.component';
import { meeting_typeListComponent } from './customers/meeting_type-list/meeting_type-list.component';
//import { BorrowedBooksListComponent } from './customers/borrowed_books-list/borrowed_books-list';
import { GuiltListComponent } from './customers/guilt-list/guilt-list';
import { AccusedStudentsListComponent } from './customers/AccusedStudents-list/AccusedStudents-list';
import { month_valueListComponent } from './customers/month_value-list/month_value-list.component';
import { advertsListComponent } from './customers/adverts-list/adverts-list.component';
import { _7esaListComponent } from './customers/_7esa-list/_7esa-list.component';
import {  absence_studentComponent } from './customers/absence_student-list/absence_student.component';
// tslint:disable-next-line:class-name
const routes: Routes = [
    {
        path: '',
        component: ECommerceComponent,
        // canActivate: [ModuleGuard],
        // data: { moduleName: 'ecommerce' },
        children: [
            {
                path: '',
                redirectTo: 'customers',
                pathMatch: 'full'
            },
            {
                path: 'customers',
                component: CustomersListComponent
            },
            {
                path: 'orders',
                component: OrdersListComponent
            },
            {
                path: 'products',
                component: ProductsListComponent,
            },
            {
                path: 'products/add',
                component: ProductEditComponent
            },
            {
                path: 'products/edit',
                component: ProductEditComponent
            },
            {
                path: 'products/edit/:id',
                component: ProductEditComponent
            },
            {
                path: 'material',
                loadChildren: () => import('../../material/material.module').then(m => m.MaterialModule)
            },
            //{
            //	path: '',

            //	loadChildren: () => import('../../material/material.module').then(m => m.MaterialModule)
            //},
        ]
    }
];

@NgModule({
    imports: [
        /*	MaterialModule,*/
        HttpModule,
        CKEditorModule,
        MatDialogModule,
        CommonModule,
        HttpClientModule,
        PartialsModule,
        NgxPermissionsModule.forChild(),
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        MatButtonModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatIconModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTooltipModule,
        NgbProgressbarModule,
        environment.isMockEnabled ? HttpClientInMemoryWebApiModule.forFeature(FakeApiService, {
            passThruUnknownUrl: true,
            dataEncapsulation: false
        }) : [],
        StoreModule.forFeature('products', productsReducer),
        EffectsModule.forFeature([ProductEffects]),
        StoreModule.forFeature('customers', customersReducer),
        EffectsModule.forFeature([CustomerEffects]),
        StoreModule.forFeature('productRemarks', productRemarksReducer),
        EffectsModule.forFeature([ProductRemarkEffects]),
        StoreModule.forFeature('productSpecifications', productSpecificationsReducer),
        EffectsModule.forFeature([ProductSpecificationEffects]),
    ],
    providers: [
        ModuleGuard,
        InterceptService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptService,
            multi: true
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                hasBackdrop: true,
                panelClass: 'kt-mat-dialog-container__wrapper',
                height: 'auto',
                width: '900px'
            }
        },
        TypesUtilsService,
        LayoutUtilsService,
        HttpUtilsService,
        CustomersService,
        ProductRemarksService,
        ProductSpecificationsService,
        ProductsService,
        TypesUtilsService,
        LayoutUtilsService
    ],
    entryComponents: [
        ActionNotificationComponent,
        CustomerEditDialogComponent,
        DeleteEntityDialogComponent,
        FetchEntityDialogComponent,
        UpdateStatusDialogComponent,
        SpecificationEditDialogComponent
    ],
    declarations: [
        visits_otherComponent,
        absence_studentComponent,
	month_valueListComponent,advertsListComponent,_7esaListComponent,
        AccusedStudentsListComponent,
        GuiltListComponent,
       // BorrowedBooksListComponent,
        meeting_typeListComponent,
        calling_parentsListComponent,
        board_typeListComponent,
        boardListComponent,
        absence_statisticsListComponent,
        behaviours_statusListComponent,
        behaviours_statusListComponent1,
        SpeakingdisorderListComponent,
        HealthCasesListComponent, AbsenceCasesListComponent,
        behaviors_status_detaisListComponent,
        RestToRedoListComponent,
        SonsOfMartyrsListComponent,
        OtherStudentSlidesListComponent,
        IndividualCasesListComponent,
        RegimeCouncilStudentsListComponent,
        SpecialStudentsListComponent,
        CatchRecieptListComponent,
        PaymentRecieptListComponent,
        Ta7dierTableListComponent,
        ECommerceComponent,
        // Customers
        CustomersListComponent,
        ActivityListComponent,
        master_jobsComponent,
        StudentComponent,
        SubjectComponent,
        Ta7deirComponent,
        CorridorListComponent,
        EzonListComponent,
        EmployeesListComponent,
        CustomerEditDialogComponent,
        // Orders
        OrdersListComponent,
        OrderEditComponent,
        // Products
        ProductsListComponent,
        ProductEditComponent,
        RemarksListComponent,
        SpecificationsListComponent,
        SpecificationEditDialogComponent,
        GoodBadStudentsCardsListComponent,
        BadStudentsCardsListComponent,
        CorridorSupervisionListComponent,
        EzonListEditStateComponent,
        Ta7deirEditStateComponent,
        EvaluationItemsListComponent,
        TakeemMasterListComponent,
        TakeemMasterTeamsListComponent,
        TakeemMasterDetailsListComponent,
        users_privComponent,
        DelaysListComponent,
        StudentPremListComponent,
        School_dataListComponent,
        NchraListComponent,
        LevelsListComponent,
        classesListComponent,
        Mra7lListComponent,
        SchoolYearListComponent,
        visit_typesComponent,
        visitsComponent,
        AbsenceListComponent,
        Twze3StudentsListComponent,
        Add_libListComponent,
        Borrow_bookListComponent,
        ReturnbookListComponent, SeqstudentComponent, TripsComponent, TeamsListComponent,
        GroupmeetingListComponent, ObservationListComponent, CorrMeetListComponent, MaintListComponent
        //, DivisionListComponent
        , statusListComponent, mentality_inquiriesListComponent, student_parent_meetingListComponent, DefinitionListComponent, social_workerListComponent
        , Excellent_studentsListComponent,
        Tests_metricListComponent, ChangebranchListComponent, SuggesListComponent, guideListComponent, failureListComponent, DisonlevelListComponent, levels_with_stisticslistComponent, branch_statComponent, basic_dataListComponent, div_empListComponent, training_empListComponent, financial_fund_expensesListComponent, HolidaysComponent, instructionsListComponent, new_workListComponent, student_basic_dataListComponent,
         Show_libListComponent,studentmattersListComponent,
        permissionListComponent,
        student_trackingListComponent,student_tracking_reportListComponent,teacher_opinion_visitListComponent,TakeemMasterDetails_reportListComponent
        , partyListComponent, eventsListComponent, dailystatListComponent,
        ViolationsListComponent, Behavioral_statusListComponent, swotListComponent, messages_inboxListComponent,
        SupervisoropinionListComponent, Student_transferListComponent,
        Student_leaveListComponent
    ],
    exports: [
        visits_otherComponent,
        absence_studentComponent,
	 month_valueListComponent,advertsListComponent,_7esaListComponent,
        AccusedStudentsListComponent,
        GuiltListComponent,
       // BorrowedBooksListComponent,
        meeting_typeListComponent,
        calling_parentsListComponent,
        board_typeListComponent,
        boardListComponent,
        absence_statisticsListComponent,
        behaviours_statusListComponent,
        behaviours_statusListComponent1,
        SpeakingdisorderListComponent ,
        HealthCasesListComponent, AbsenceCasesListComponent,
        behaviors_status_detaisListComponent,
        SpecialStudentsListComponent,RegimeCouncilStudentsListComponent,IndividualCasesListComponent,OtherStudentSlidesListComponent, 
        SonsOfMartyrsListComponent,RestToRedoListComponent,
        CatchRecieptListComponent,
        PaymentRecieptListComponent,
        Ta7dierTableListComponent,permissionListComponent,CustomersListComponent, ActivityListComponent, master_jobsComponent, StudentComponent, SubjectComponent, Ta7deirComponent, new_workListComponent, student_basic_dataListComponent,
        CorridorListComponent, EmployeesListComponent, BadStudentsCardsListComponent, GoodBadStudentsCardsListComponent, ProductsListComponent
        , CorridorSupervisionListComponent, EzonListComponent, EzonListEditStateComponent, Ta7deirEditStateComponent,
        TakeemMasterTeamsListComponent, TakeemMasterDetailsListComponent, TakeemMasterListComponent, EvaluationItemsListComponent, users_privComponent, DelaysListComponent, StudentPremListComponent
        , School_dataListComponent, NchraListComponent,
        LevelsListComponent,
        classesListComponent,
        Mra7lListComponent, SchoolYearListComponent, visit_typesComponent, visitsComponent, AbsenceListComponent, Twze3StudentsListComponent, Add_libListComponent,
        Borrow_bookListComponent, ReturnbookListComponent, SeqstudentComponent, TripsComponent,  TeamsListComponent,
        GroupmeetingListComponent, ObservationListComponent, CorrMeetListComponent, MaintListComponent, HolidaysComponent, instructionsListComponent
       // , DivisionListComponent
        , statusListComponent, mentality_inquiriesListComponent, student_parent_meetingListComponent, DefinitionListComponent, social_workerListComponent
        , Excellent_studentsListComponent,
        Tests_metricListComponent, ChangebranchListComponent, SuggesListComponent, guideListComponent, failureListComponent, DisonlevelListComponent, levels_with_stisticslistComponent, branch_statComponent, basic_dataListComponent, div_empListComponent, training_empListComponent, financial_fund_expensesListComponent, Show_libListComponent,
        studentmattersListComponent,student_trackingListComponent,student_tracking_reportListComponent,teacher_opinion_visitListComponent,TakeemMasterDetails_reportListComponent
        , partyListComponent, eventsListComponent, dailystatListComponent,
        ViolationsListComponent, Behavioral_statusListComponent, swotListComponent, messages_inboxListComponent, SupervisoropinionListComponent, Student_transferListComponent,
        Student_leaveListComponent
    ]
})
export class ECommerceModule { }
