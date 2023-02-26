import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './material.component';
import { AutocompleteComponent } from './formcontrols/autocomplete/autocomplete.component';
import { CheckboxComponent } from './formcontrols/checkbox/checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { MaterialPreviewModule } from '../../partials/content/general/material-preview/material-preview.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
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
    MatBottomSheetRef,
    MAT_DATE_LOCALE,

} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';


// Form controls
import { DatepickerComponent } from './formcontrols/datepicker/datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormfieldComponent } from './formcontrols/formfield/formfield.component';
import { InputComponent } from './formcontrols/input/input.component';
import { RadiobuttonComponent } from './formcontrols/radiobutton/radiobutton.component';
import { SelectComponent } from './formcontrols/select/select.component';
import { SliderComponent } from './formcontrols/slider/slider.component';
import { SlidertoggleComponent } from './formcontrols/slidertoggle/slidertoggle.component';
// Navigation
import { MenuComponent } from './navigation/menu/menu.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
// Layout
import { CardComponent } from './layout/card/card.component';
import { DividerComponent } from './layout/divider/divider.component';
import { ExpansionPanelComponent } from './layout/expansion-panel/expansion-panel.component';
import { GridListComponent } from './layout/grid-list/grid-list.component';
import { ListComponent } from './layout/list/list.component';
import { MaterialTabsComponent } from './layout/material-tabs/material-tabs.component';
import { StepperComponent } from './layout/stepper/stepper.component';
import { TreeComponent } from './layout/tree/tree.component';
import { DefaultFormsComponent } from './layout/default-forms/default-forms.component';
// Buttons & indicators
import { ButtonComponent } from './buttons-and-indicators/button/button.component';
import { ButtonToggleComponent } from './buttons-and-indicators/button-toggle/button-toggle.component';
import { ChipsComponent } from './buttons-and-indicators/chips/chips.component';
import { IconComponent } from './buttons-and-indicators/icon/icon.component';
import { ProgressBarComponent } from './buttons-and-indicators/progress-bar/progress-bar.component';
import { ProgressSpinnerComponent } from './buttons-and-indicators/progress-spinner/progress-spinner.component';
import { RipplesComponent } from './buttons-and-indicators/ripples/ripples.component';
// Popups & modals
import { DialogComponent, ModalComponent, Modal2Component, Modal3Component } from './popups-and-modals/dialog/dialog.component';
import { SnackbarComponent } from './popups-and-modals/snackbar/snackbar.component';
import { MaterialTooltipComponent } from './popups-and-modals/material-tooltip/material-tooltip.component';
import { BottomSheetComponent } from './popups-and-modals/bottom-sheet/bottom-sheet.component';
import { BottomSheetExampleComponent } from './popups-and-modals/bottom-sheet/bottom-sheet-example/bottom-sheet-example.component';

// Data table
import { PaginatorComponent } from './data-table/paginator/paginator.component';
import { SortHeaderComponent } from './data-table/sort-header/sort-header.component';
import { MaterialTableComponent } from './data-table/material-table/material-table.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { EditorComponent } from '../editor/editor.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ECommerceModule } from '../apps/e-commerce/e-commerce.module';
import { UserManagementModule } from '../../pages/user-management/user-management.module';
import { HttpModule } from '@angular/http';
import { DepartmentDataService } from '../../../Services/DepartmentDataService';
import { SubjectDataService } from '../../../Services/SubjectDataService';
import { EmployeeDataService } from '../../../Services/EmployeeDataService';
import { corridorsDataService } from '../../../Services/CorridorsDataService';
import { MasterJobsDataService } from '../../../Services/MasterJobsDataService';
import { StudentDataService } from '../../../Services/StudentDataService';
import { ActivityDataService } from '../../../Services/ActivityDataService';
import { Corridor_supervisionDataService } from '../../../Services/Corridor_supervisionDataService';
import { GridListEntryComponent } from './layout/grid-list-entry/grid-list-entry.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Evaluation_itemsDataService } from '../../../Services/Evaluation_itemsDataService';
import { Takeem_masterDataService } from '../../../Services/Takeem_masterDataService';
import { user_privDataService } from '../../../Services/user_privDataService ';
import { DelaysDataService } from '../../../Services/DelaysDataService';
import { Student_premDataService } from '../../../Services/Student_premDataService';
import { HolidaysDataService } from '../../../Services/HolidaysDataService';
import { School_dataDataService } from '../../../Services/School_dataDataService';
import { CalendarModule } from '../calendar/calendar.module';
import { Calendargdwel_7ssModule } from '../calendar-gdwel_7ss/calendar-gdwel_7ss.module';
import { NchraDataService } from '../../../Services/NchraDataService';
import { LevelsDataService } from '../../../Services/LevelsDataService';
import { ClassesDataService } from '../../../Services/ClassesDataService';
import { Mra7lDataService } from '../../../Services/Mra7lDataService';
import { School_year_dataDataService } from '../../../Services/School_year_dataDataService';
import { Visit_typesDataService } from '../../../Services/visit_typesDataService';
import { VisitComponent } from './popups-and-modals/visits/visits.component';
import { VisitsDataService } from '../../../Services/visitsDataService';
import { TripsDataService } from '../../../Services/TripsDataService';
import { teams_and_groupsDataService } from '../../../Services/teams_and_groupsDataService';
import { divisionsDataService } from '../../../Services/divisionsDataService';
import { gdwel_7ssDataService } from '../../../Services/gdwel_7ssDataService';

import { AbsenceDataService } from '../../../Services/AbsenceDataService';
import { Twze3_studentsDataService } from '../../../Services/Twze3_studentsDataService';

import { MatSelectFilterModule } from 'mat-select-filter';
import { financial__fund_expensesDataService } from '../../../Services/financial__fund_expensesDataService';
import { student_mattersDataService } from '../../../Services/student_mattersDataService';
import { statusComponent } from './formcontrols/status/status.component';
import { statusDataService } from '../../../Services/StatusDataService';
import { mentality_inquiriesDataService } from '../../../Services/mentality_inquiriesDataService';
import { mentality_inquiriesComponent } from './formcontrols/mentality_inquiries/mentality_inquiries.component';
import { student_mattersComponent } from './formcontrols/student_matters/student_matters.component';
import { financial__fund_expensesComponent } from './formcontrols/financial__fund_expenses/financial__fund_expenses.component';
import { holidayComponent } from './popups-and-modals/holidays/holiday.component';
import { student_parent_meetingDataService } from '../../../Services/student_parent_meetingDataService ';

import { student_parent_meetingComponent } from './formcontrols/student_parent_meeting/student_parent_meeting.component';
import { DefinitionComponent } from './formcontrols/DefinitionPage/definition.component';
import { ExcellentstudentsComponent } from './data-table/excellent-students/excellent-students.component';
import { TestsmetricComponent } from './data-table/tests-metric/tests-metric.component';
import { chnagebranchComponent } from './data-table/change-branch/change-branch.component';
import { abscence_statisticsComponent } from './data-table/abscence_statistics/abscence_statistics.component';
import { SuggestionsComponent } from './layout/suggestions/suggestions.component';
import { FailurestudentsComponent } from './data-table/failure-cases/failure-cases.component';
import { Failure_casesDataService } from '../../../Services/Failure_casesDataService';
import { DisonLevelComponent } from './navigation/disonlevel/disonlevel.component';
import { new_workComponent } from './formcontrols/new_work/new_work.component';
import { VisitManagerComponent } from './popups-and-modals/visits_manager/visits.component';
import { guideComponent } from './formcontrols/guide/guide.component';
import { student_basic_dataComponent } from './data-table/student_basic_data/student_basic_data.component';
import { level_statisticsComponent } from './navigation/level_statistics/level_statistics.component';
import { branchComponent } from './navigation/branch_stat/branch_stat.component';
import { basic_dataComponent } from './formcontrols/basic_data/basic_data.component';
import { basic_dataDataService } from '../../../Services/basic_dataDataService';
import { TermsComponent } from './formcontrols/terms/terms.component';
import { student_trackingComponent } from './formcontrols/student_tracking/student_tracking.component';
import { student_tracking_reportComponent } from './formcontrols/student_tracking_report/student_tracking.component';


import { CalendartermsModule } from '../calendar-terms/calendar-terms.module';
import { class_instructionComponent } from './formcontrols/class_instruction/class_instruction.component';
import { group_instructioncomponentComponent } from './formcontrols/group_instruction/group_instruction.component';
import { ModuleGuard } from '../../../core/auth/_guards/module.guard';
import { permissionComponent } from './navigation/permission/permission.component';
import { student_trackingDataService } from '../../../Services/student_trackingDataService';

import { teacher_opinion_visitComponent } from './formcontrols/teacher_opinion_visit/teacher_opinion_visit.component';
import { messagesComponent } from './formcontrols/message/message.component';
import { teacher_opinion_visitDataService } from '../../../Services/teacher_opinion_visitDataService';

import { SchoolpartyComponent } from './formcontrols/school_party/school_party.component';
import { School_partyDataService } from '../../../Services/School_partyDataService';
import { EventspartyComponent } from './formcontrols/events/events.component';
import { EventsDataService } from '../../../Services/EventsDataService';
import { DailystatpartyComponent } from './formcontrols/daily_absence_stat/daily_absence_stat.component';
import { Daily_absence_statDataService } from '../../../Services/Daily_absence_statDataService';
import { ViolationrecordComponent } from './formcontrols/violation_record/violation_record.component';
import { Violation_recordDataService } from '../../../Services/Violation_recordDataService';
import { BehavestatusComponent } from './formcontrols/behavioral_status/behavioral_status.component';
import { Behavioral_statusDataService } from '../../../Services/Behavioral_statusDataService';

import { swotComponent } from './formcontrols/swot/swot.component';
import {swotDataService  } from '../../../Services/swotDataService';
import {messagesDataService  } from '../../../Services/messagesDataService';

import { SupervisoropinionComponent } from './formcontrols/supervisor_opinion/supervisor_opinion.component';
import { Supervisor_opinionDataService } from '../../../Services/Supervisor_opinionDataService';
import { Student_transComponent } from './formcontrols/student_transfer/student_transfer.component';
import { Student_transferDataService } from '../../../Services/Student_transferDataService';
import { Student_leaveComponent } from './formcontrols/student_leave/student_leave.component';
import { Student_leaveDataService } from '../../../Services/Student_leaveDataService';
import { CatchRecieptComponent } from './formcontrols/CatchReciept/CatchRecieptComponent';
import { PaymentRecieptComponent } from './formcontrols/PaymentReciept/PaymentRecieptComponent';
import { ShowTa7diersComponent } from './formcontrols/ShowTa7diers/ShowTa7diersComponent';
import { CatchRecieptService } from '../../../Services/CatchRecieptService';
import { PaymentRecieptService } from '../../../Services/PaymentRecieptDataService';
import { Ta7dierJoinEmployeeDataService } from '../../../Services/Ta7dierJoinEmployeeDataService';
import { RestToRedoService } from '../../../Services/RestToRedoService';
import { RestToRedoComponent } from './formcontrols/RestToRedo/RestToRedoComponent';
import { AccusedStudentsComponent } from './formcontrols/AccusedStudents/AccuesdStudentsComponent';
import { AccusedStudentService } from '../../../Services/AccusedStudentService';
import { SonsOfMartyrsComponent } from './formcontrols/SonsOfMartyrs/SonsOfMartyrsComponent';
import { OtherStudentSlideComponent } from './formcontrols/OtherStudentSlides/OtherStudentSlideComponent';
import { IndividualCasesComponent } from './formcontrols/IndividualCases/IndividualCasesComponent';
import { RegimeCouncilStudentsComponent } from './formcontrols/RegimeCouncilStudents/RegimeCouncilStudentsComponent';
import { SpecialStudentsComponent } from './formcontrols/SpecialStudents/SpecialStudentsComponent';
import { behaviours_statusDataService } from '../../../Services/behaviours_statusDataService';
import {behaviours_statusComponent  } from './formcontrols/behaviour_status/behaviour_statusComponent';
import { EnzaratComponent } from './formcontrols/enzarat/enzarat.component';
import { BehavioralreportComponent } from './formcontrols/behavioral_report/behavioral_report.component';
import { Health_casesComponent } from './formcontrols/health_cases/health_cases.component';
import { Health_casesDataService } from '../../../Services/Health_casesDataService';
import { Absence_casesComponent } from './formcontrols/absence_cases/absence_cases.component';
import { Absence_casesDataService } from '../../../Services/Absence_casesDataService';
import { Speaking_disorderComponent } from './formcontrols/speaking_disorder/speaking_disorder.component';
import { Speaking_disorderDataService } from '../../../Services/Speaking_disorderDataService';
import {calling_parentsComponent  } from './formcontrols/calling_parent/calling_parent.component';
import { boardComponent } from './popups-and-modals/board/board.component';
import { board_typeComponent } from './popups-and-modals/board_type/board_type.component';
import { meeting_typeComponent } from './popups-and-modals/meeting_type/meeting_type.component';
import { GuiltComponent } from './formcontrols/Guilt/Guilt';
import { _7saComponent } from './formcontrols/_7sa/_7sa.component';
import { _7esa_defDataService } from '../../../Services/_7esaDataService';
import { advertsComponent } from './formcontrols/adverts/adverts.component';
import { advertsDataService } from '../../../Services/advertsDataService';
import { month_valueComponent } from './formcontrols/month_value/month_value.component';
import { month_valueDataService } from '../../../Services/month_valueDataService';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
/*import { MatTimepickerModule } from 'mat-timepicker';*/
const routes: Routes = [
     {
       
        path: '',
        component: MaterialComponent,
       
        children: [
            {
                path: 'form-controls/RestToRedo',
                component: RestToRedoComponent,
                
            },
            {
                path: 'form-controls/SonsOfMartyrs',
                component: SonsOfMartyrsComponent,
                
            },
            {
                path: 'form-controls/OtherStudentSlides',
                component: OtherStudentSlideComponent,
                
            },
            {
                path: 'form-controls/IndividualCases',
                component: IndividualCasesComponent,
                
            },
            {
                path: 'form-controls/RegimeCouncilStudents',
                component: RegimeCouncilStudentsComponent,
                
            },
            {
                path: 'form-controls/SpecialStudents',
                component: SpecialStudentsComponent,
                
            },
            {
                path: 'form-controls/AccusedStudents',
                component: AccusedStudentsComponent,
                
            },
            {
                path: 'form-controls/autocomplete',
                component: AutocompleteComponent,
                
            },
            {
                path: 'form-controls/departments',
                component: CheckboxComponent,
             
            },
            {
                path: 'form-controls/DefinitionPage',
                component: DefinitionComponent,
                canActivate: [ModuleGuard],
            },
            {
                path: 'form-controls/subjects',
                component: DatepickerComponent
            },
            {
                path: 'form-controls/jobs',
                component: FormfieldComponent
            },
            {
                path: 'form-controls/employees',
                component: InputComponent
            },
            {
                path: 'form-controls/mentality_inquiries',
                component: mentality_inquiriesComponent
            },
            {
                path: 'form-controls/activities',
                component: RadiobuttonComponent
            },
            {
                path: 'form-controls/students',
                component: SelectComponent
            },
            {
                path: 'form-controls/users',
                component: SliderComponent
            },
            {
                path: 'form-controls/slidertoggle',
                component: SlidertoggleComponent
            },

            {
                path: 'form-controls/student_parent_meeting',
                component: student_parent_meetingComponent
            },
            {
                path: 'form-controls/group_instruction',
                component: group_instructioncomponentComponent
            },
            {
                path: 'form-controls/class_instruction',
                component: class_instructionComponent
            },
            {
                path: 'navigation/evaluation_items',
                component: MenuComponent
            },
            {
                path: 'navigation/evaluate_strategic_plan_teams',
                component: SidenavComponent
            },
            {
                path: 'navigation/do_evaluation',
                component: ToolbarComponent
            },
            {
                path: 'navigation/branching',
                component: branchComponent
            },
            {
                path: 'navigation/distribution_on_levels',
                component: DisonLevelComponent
            },
            {
                path: 'navigation/level_statistics',
                component: level_statisticsComponent
            },
            {
                path: 'layout/writing_preparation',
                component: CardComponent
            },
            {
                path: 'layout/top_student',
                component: DividerComponent
            },
            {
                path: 'layout/daily_admin_status',
                component: ExpansionPanelComponent
            },
            {
                path: 'layout/teacher_absences_permissions',
                component: GridListComponent
            },
            {
                path: 'layout/add_absences_permissions',
                component: GridListEntryComponent
            },
            {
                path: 'layout/poor_student',
                component: ListComponent
            },
            {
                path: 'layout/corridors',
                component: MaterialTabsComponent
            },
            {
                path: 'layout/supervisors_distribution',
                component: StepperComponent
            },
            {
                path: 'layout/default-forms',
                component: DefaultFormsComponent
            },
            {
                path: 'layout/tree',
                component: TreeComponent
            },
            {
                path: 'buttons-and-indicators/preparation_status',
                component: ButtonComponent
            },
            {
                path: 'buttons-and-indicators/delay_affidavit',
                component: ButtonToggleComponent
            },
            {
                path: 'buttons-and-indicators/student_exit_permit',
                component: ChipsComponent
            },
            {
                path: 'buttons-and-indicators/posted_internal_external',
                component: IconComponent
            },
            {
                path: 'buttons-and-indicators/levels',
                component: ProgressBarComponent
            },
            {
                path: 'buttons-and-indicators/classes',
                component: ProgressSpinnerComponent
            },
            {
                path: 'buttons-and-indicators/stages',
                component: RipplesComponent
            },
            {
                path: 'popups-and-modals/school_data',
                component: BottomSheetComponent
            },
            {
                path: 'popups-and-modals/school_schedule',
                component: DialogComponent
            },
            {
                path: 'popups-and-modals/holiday',
                component: holidayComponent
            },
            {
                path: 'popups-and-modals/school_year_info',
                component: SnackbarComponent
            },
            {
                path: 'popups-and-modals/visits',
                component: VisitComponent
            },
            {
                path: 'popups-and-modals/meeting_type',
                component: meeting_typeComponent
            },
            {
                path: 'popups-and-modals/visit_definition',
                component: MaterialTooltipComponent
            },
            {
                path: 'popups-and-modals/visits_manager',
                component: VisitManagerComponent
            },
            {
                path: 'data'
            },
            {
                path: 'data-table/student_absence',
                component: PaginatorComponent
            },
            {
                path: 'data-table/distribution_students_to_classes',
                component: SortHeaderComponent
            },
            {
                path: 'data-table/failure-cases',
                component: FailurestudentsComponent
            },
            {
                path: 'data-table/students_sequence_in_class',
                component: MaterialTableComponent
            },

            {
                path: 'form-controls/status',
                component: statusComponent
            }
            ,

            {
                path: 'form-controls/new_work',
                component: new_workComponent
            }
            ,

            {
                path: 'form-controls/student_matters',
                component: student_mattersComponent
            }
            ,

            {
                path: 'form-controls/financial__fund_expenses',
                component: financial__fund_expensesComponent
            }
            ,
            {
                path: 'form-controls/guide',
                component: guideComponent
            },
            {
                path: 'form-controls/basic_data',
                component: basic_dataComponent
            }
            ,
            {
                path: 'data-table/excellent-students',
                component: ExcellentstudentsComponent
            },
            {
                path: 'data-table/tests-metric',
                component: TestsmetricComponent
            },
            {
                path: 'data-table/student_basic_data',
                component: student_basic_dataComponent
            },
            {
                path: 'data-table/change-branch',
                component: chnagebranchComponent
            },
            {
                path: 'layout/suggestions',
                component: SuggestionsComponent
            },
            {
                path: 'form-controls/terms',
                component: TermsComponent
            },
            {
                path: 'navigation/permission',
                component: permissionComponent
            }
            ,
            {
                path: 'form-controls/student_tracking',
                component: student_trackingComponent
            }
            ,
            {
                path: 'form-controls/student_tracking_report',
                component: student_tracking_reportComponent
            }
            ,
            {
                path: 'form-controls/teacher_opinion_visit',
                component: teacher_opinion_visitComponent
            }
            ,
            {
                path: 'form-controls/message',
                component:messagesComponent

            },           
            {
                path: 'form-controls/school_party',
                component: SchoolpartyComponent
            },
            {
                path: 'form-controls/events',
                component: EventspartyComponent
            },
            {
                path: 'form-controls/daily_absence_stat',
                component: DailystatpartyComponent
            },
            {
                path: 'form-controls/violation_record',
                component: ViolationrecordComponent
            },
            {
                path: 'form-controls/behavioral_status',
                component: BehavestatusComponent
            },
            {
                path: 'form-controls/swot',//abscence_statisticsComponent
                component: swotComponent
            },
            {
                path: 'data-table/abscence_statistics',
                component: abscence_statisticsComponent
            },
            {
                path: 'form-controls/supervisor_opinion',
                component: SupervisoropinionComponent
            },
            {
                path: 'form-controls/student_transfer',
                component: Student_transComponent
            },
            {
                path: 'form-controls/student_leave',
                component: Student_leaveComponent
            },
            {
                path: 'form-controls/CatchReciept',
                component: CatchRecieptComponent,
                
            },
            {
                path: 'form-controls/PaymentReciept',
                component: PaymentRecieptComponent,
                
            },
            {
                path: 'form-controls/ShowTa7diers',
                component: ShowTa7diersComponent,
                
            }
            ,
            {
                path: 'form-controls/behaviour_status',
                component: behaviours_statusComponent,
                
            },
            {
                path: 'form-controls/enzarat',
                component: EnzaratComponent,

            },
            {
                path: 'form-controls/behavioral_report',
                component: BehavioralreportComponent,

            },
            {
                path: 'form-controls/health_cases',
                component: Health_casesComponent,

            },
            {
                path: 'form-controls/absence_cases',
                component: Absence_casesComponent,

            },
            
   	    {
            path: 'form-controls/speaking_disorder',
            component: Speaking_disorderComponent,

        },
        {
            path: 'popups-and-modals/board',
            component: boardComponent
        },
        {
            path: 'popups-and-modals/board_type',
            component: board_typeComponent
        },
            
        
        {
         path: 'form-controls/_7sa',
         component: _7saComponent,

     },
            
     {
      path: 'form-controls/adverts',
      component: advertsComponent,

  },
            
  {
   path: 'form-controls/month_value',
   component: month_valueComponent,

},
     
{
    path: 'form-controls/calling_parent',
    component: calling_parentsComponent,

}
        ]
    },
];

@NgModule({
    imports: [
        // material modules
        /*		MatTimepickerModule,*/
  
        MatSelectFilterModule,
        Calendargdwel_7ssModule,
        CalendarModule,
        HttpModule,
        ECommerceModule,
        CKEditorModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatListModule,
        MatSliderModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatCheckboxModule,
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
        MatDialogModule,
        MatRippleModule,
        CoreModule,
        CommonModule,
        MatRadioModule,
        MatTreeModule,
        MatButtonToggleModule,
        PartialsModule,
        MaterialPreviewModule,
        FormsModule,
        ReactiveFormsModule,
        UserManagementModule,
        RouterModule.forChild(routes),
        NgbModule,
        CalendartermsModule,
    ],
    exports: [RouterModule,
        SortHeaderComponent],
    entryComponents: [
   
        DialogComponent,
        ModalComponent,
        Modal2Component,
        Modal3Component,
        IconComponent,
        TreeComponent,
        BottomSheetExampleComponent
    ],
    providers: [
	   advertsDataService,_7esa_defDataService,month_valueDataService,
        Speaking_disorderDataService,
        Health_casesDataService, Absence_casesDataService,
        behaviours_statusDataService,
        RestToRedoService,
        AccusedStudentService,
        SonsOfMartyrsComponent,
        OtherStudentSlideComponent,
        IndividualCasesComponent,
        RegimeCouncilStudentsComponent,
        SpecialStudentsComponent,
        CatchRecieptService,
        PaymentRecieptService,
        Ta7dierJoinEmployeeDataService,
        MatIconRegistry,
        { provide: MatBottomSheetRef, useValue: {} },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        DepartmentDataService, SubjectDataService,
        EmployeeDataService, 
        corridorsDataService, MasterJobsDataService,
        StudentDataService, ActivityDataService,
        Corridor_supervisionDataService, DatePipe,
        Evaluation_itemsDataService, Takeem_masterDataService, user_privDataService
        , DelaysDataService, Student_premDataService, HolidaysDataService,
        School_dataDataService,
        NchraDataService, LevelsDataService,
        ClassesDataService, Mra7lDataService, School_year_dataDataService, Visit_typesDataService, VisitsDataService,
        TripsDataService,
        teams_and_groupsDataService,
        divisionsDataService,
        gdwel_7ssDataService, AbsenceDataService, Twze3_studentsDataService
        , financial__fund_expensesDataService, student_mattersDataService, statusDataService, mentality_inquiriesDataService
        , student_parent_meetingDataService, Failure_casesDataService,basic_dataDataService,student_mattersDataService,student_trackingDataService,teacher_opinion_visitDataService,
        School_partyDataService, EventsDataService, Daily_absence_statDataService, Violation_recordDataService, Behavioral_statusDataService,
        swotDataService, messagesDataService
        , Supervisor_opinionDataService, Student_transferDataService, Student_leaveDataService,GuiltComponent
    ],
    declarations: [
	 _7saComponent,advertsComponent,month_valueComponent,
        GuiltComponent,
        meeting_typeComponent,
        board_typeComponent,
        boardComponent,
        calling_parentsComponent,
        Speaking_disorderComponent,
        EnzaratComponent,
        BehavioralreportComponent,
        Health_casesComponent,
        Absence_casesComponent,
        RestToRedoComponent,
        behaviours_statusComponent,
        AccusedStudentsComponent,
        SonsOfMartyrsComponent,
        OtherStudentSlideComponent,
        IndividualCasesComponent,
        RegimeCouncilStudentsComponent,
        SpecialStudentsComponent,
        CatchRecieptComponent,
        PaymentRecieptComponent,
        ShowTa7diersComponent,
        abscence_statisticsComponent,
        messagesComponent,
        swotComponent,
        teacher_opinion_visitComponent,
        student_tracking_reportComponent,
        student_trackingComponent,
        permissionComponent,
        class_instructionComponent,
        group_instructioncomponentComponent,
   
       
        DefinitionComponent,
        holidayComponent,
        financial__fund_expensesComponent,
        student_mattersComponent,
        mentality_inquiriesComponent,
        statusComponent,
        EditorComponent,
        MaterialComponent,
        AutocompleteComponent,
        CheckboxComponent,
        DatepickerComponent,
        FormfieldComponent,
        InputComponent,
        RadiobuttonComponent,
        SelectComponent,
        SliderComponent,
        SlidertoggleComponent,
        MenuComponent,
        SidenavComponent,
        ToolbarComponent,
        CardComponent,
        DividerComponent,
        ExpansionPanelComponent,
        GridListComponent,
        GridListEntryComponent,
        ListComponent,
        MaterialTabsComponent,
        StepperComponent,
        ButtonComponent,
        ButtonToggleComponent,
        ChipsComponent,
        IconComponent,
        ProgressBarComponent,
        ProgressSpinnerComponent,
        DialogComponent,
        ModalComponent,
        Modal2Component,
        Modal3Component,
       
        SnackbarComponent,
        MaterialTooltipComponent,
        PaginatorComponent,
        SortHeaderComponent,
        MaterialTableComponent,
        DefaultFormsComponent,
        TreeComponent,
        BottomSheetComponent,
        BottomSheetExampleComponent,
        RipplesComponent,
        VisitComponent,
        student_parent_meetingComponent,
        ExcellentstudentsComponent,
        TestsmetricComponent,
        chnagebranchComponent,
        SuggestionsComponent,
        FailurestudentsComponent,
        DisonLevelComponent,
        new_workComponent,
        VisitManagerComponent,
        guideComponent,
        student_basic_dataComponent,
        level_statisticsComponent,
        branchComponent,
        basic_dataComponent,
        TermsComponent,

        SchoolpartyComponent,
        EventspartyComponent,
        DailystatpartyComponent,
        ViolationrecordComponent,
        BehavestatusComponent,
        SupervisoropinionComponent,
        Student_transComponent,
        Student_leaveComponent


    ]
})
export class MaterialModule {
    public Editor = ClassicEditor;
}

