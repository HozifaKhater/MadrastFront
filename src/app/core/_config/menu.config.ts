export class MenuConfig {
    public defaults: any = {
        header: {
            self: {},
            items: [
                {
                    title: 'الصفحة الرئيسية',
                    root: true,
                    alignment: 'left',
                    page: '/dashboard',
                  /*  translate: 'MENU.DASHBOARD',*/
                },
                //{
                //    title: 'الميزات',
                //    root: true,
                //    alignment: 'left',
                //    page: '/dashboard',

                //},
                //{hth
                //    title: 'طلب عرض توضيحي',
                //    root: true,
                //    alignment: 'left',
                //    page: '/dashboard',

                //},
                //{
                //    title: 'Menu1',
                //    root: true,
                //    alignment: 'left',
                //    translate: 'Menu1',
                //    toggle: 'click',
                //    submenu: [
                //        {
                //            title: 'Menu 1',
                //            translate: 'Menu1',
                //            bullet: 'dot',
                //            icon: 'flaticon-interface-7',
                //            submenu: [
                //                {
                //                    title: 'Data Entry',

                //                    bullet: 'dot',
                //                    submenu: [
                //                        {
                //                            title: 'Data Entry',
                //                            page: '/material/form-controls/autocomplete',
                //                            permission: 'accessToECommerceModule'
                //                        },
                //                        {
                //                            title: 'Departments Data',
                //                            page: '/material/form-controls/checkbox'
                //                        },
                //                        {
                //                            title: 'Activity Data',
                //                            page: '/material/form-controls/radiobutton'
                //                        },
                //                        {
                //                            title: 'Subjects',
                //                            page: '/material/form-controls/datepicker'
                //                        },
                //                        {
                //                            title: 'Jobs',
                //                            page: '/material/form-controls/formfield'
                //                        },
                //                        {
                //                            title: 'Employees Data',
                //                            page: '/material/form-controls/input'
                //                        },
                //                        {
                //                            title: 'Students Data',
                //                            page: '/material/form-controls/select'
                //                        },
                //                        {
                //                            title: "User's data",
                //                            page: '/material/form-controls/slider'
                //                        }
                //                        ,
                //                        {
                //                            title: "الحالات",
                //                            page: '/material/form-controls/status'
                //                        }
                //                        ,
                //                        {
                //                            title: "صندوق الاستفسارات النفسيه",
                //                            page: '/material/form-controls/mentality_inquiries'
                //                        }
                //                        ,
                //                        {
                //                            title: "الصندوق المالى",
                //                            page: '/material/form-controls/financial__fund_expenses'
                //                        }
                //                        ,
                //                        {
                //                            title: "امور خاصه بالطالب",
                //                            page: '/material/form-controls/student_matters'
                //                        }//,
                //                        //{
                //                        //	title: 'Slider Toggle',
                //                        //	page: '/material/form-controls/slidertoggle'
                //                        //}
                //                    ]
                //                },
                //                {
                //                    title: 'التقييمات',
                //                    bullet: 'dot',
                //                    submenu: [
                //                        {
                //                            title: 'بنود التقييم',
                //                            page: '/material/navigation/menu'
                //                        },
                //                        {
                //                            title: 'تقييم فرق الخطة الاستراتيجية',
                //                            page: '/material/navigation/sidenav'
                //                        },
                //                        {
                //                            title: 'أداء تقييم',
                //                            page: '/material/navigation/toolbar'
                //                        }
                //                    ]
                //                },
                //                {
                //                    title: 'التحضيرات',
                //                    bullet: 'dot',
                //                    submenu: [
                //                        {
                //                            title: 'كتابة التحضير',
                //                            page: '/material/layout/card'
                //                        },
                //                        {
                //                            title: 'بطاقة رعاية طالب متفوق',
                //                            page: '/material/layout/divider'
                //                        },

                //                        {
                //                            title: 'بطاقة متابعة طالب ضعيف',
                //                            page: '/material/layout/list'
                //                        },
                //                        {
                //                            title: 'غيابات/استئذانات المعلمين',
                //                            page: '/material/layout/grid-list'
                //                        },
                //                        {
                //                            title: 'ادخال غيابات/استئذانات المعلمين',
                //                            page: '/material/layout/grid-list-entry'
                //                        },
                //                        {
                //                            title: 'متابعة الحالة اليومية للهيئة الادارية و التعليمية',
                //                            page: '/material/layout/expansion-panel'
                //                        },

                //                        {
                //                            title: 'الأجنحة',
                //                            page: '/material/layout/tabs'
                //                        },
                //                        {
                //                            title: 'توزيع المشرفين',
                //                            page: '/material/layout/stepper'
                //                        },

                //                        {
                //                            title: 'اعتماد تحضير',
                //                            page: '/material/layout/tree'
                //                        }
                //                    ]
                //                },
                //                {
                //                    title: 'حالة التحضيرات',
                //                    bullet: 'dot',
                //                    submenu: [
                //                        {
                //                            title: 'حالة التحضير',
                //                            page: '/material/buttons-and-indicators/button'
                //                        },
                //                        {
                //                            title: 'افادة تأخير عن بداية الدوام بالمرفق التعليمي',
                //                            page: '/material/buttons-and-indicators/button-toggle'
                //                        },
                //                        {
                //                            title: 'اذن خروج طالب برفقه ولي أمره',
                //                            page: '/material/buttons-and-indicators/chips'
                //                        },
                //                        {
                //                            title: 'نشره داخلية\خارجية',
                //                            page: '/material/buttons-and-indicators/icon'
                //                        },
                //                        {
                //                            title: 'الصفوف',
                //                            page: '/material/buttons-and-indicators/levels'
                //                        },
                //                        {
                //                            title: 'الفصول',
                //                            page: '/material/buttons-and-indicators/classes'
                //                        },
                //                        {
                //                            title: 'المراحل',
                //                            page: '/material/buttons-and-indicators/stages'
                //                        }
                //                    ]
                //                },
                //                {
                //                    title: 'بيانات المدرسة',
                //                    bullet: 'dot',
                //                    submenu: [
                //                        {
                //                            title: 'بيانات المدرسة',
                //                            page: '/material/popups-and-modals/school_data'
                //                        },
                //                        {
                //                            title: 'جدول الحصص',
                //                            page: '/material/popups-and-modals/dialog'
                //                        },
                //                        {
                //                            title: 'اعياد و اجازات',
                //                            page: '/material/popups-and-modals/holiday'
                //                        },
                //                        {
                //                            title: 'Snackbar',
                //                            page: '/material/popups-and-modals/school_year_info'
                //                        },
                //                        {
                //                            title: 'Tooltip',
                //                            page: '/material/popups-and-modals/tooltip'
                //                        }
                //                    ]
                //                },
                //                {
                //                    title: 'Data table',
                //                    bullet: 'dot',
                //                    submenu: [
                //                        {
                //                            title: 'تسجيل الغياب',
                //                            page: '/material/data-table/student_absence'
                //                        },
                //                        {
                //                            title: 'توزيع الطلاب علي الفصول',
                //                            page: '/material/data-table/sort-header'
                //                        },
                //                        {
                //                            title: 'تسلسل الطلبة في الفصل',
                //                            page: '/material/data-table/table'
                //                        }
                //                    ]
                //                }
                //            ]
                //        },
                //        {
                //            title: 'Ng-Bootstrap',
                //            bullet: 'dot',
                //            icon: 'flaticon-web',
                //            submenu: [
                //                {
                //                    title: 'بيانات المكتبة',
                //                    page: '/ngbootstrap/accordion'
                //                },
                //                {
                //                    title: 'استعارة كتاب',
                //                    page: '/ngbootstrap/alert'
                //                },
                //                {
                //                    title: 'ارجاع كتاب',
                //                    page: '/ngbootstrap/buttons'
                //                },
                //                {
                //                    title: 'استعراض الكتب',
                //                    page: '/ngbootstrap/carousel'
                //                },
                //                {
                //                    title: 'رحله جديده',
                //                    page: '/ngbootstrap/collapse'
                //                },
                //                {
                //                    title: 'Subjects',
                //                    page: '/ngbootstrap/datepicker'
                //                },
                //                {
                //                    title: 'تشكيل فرق الخطة الاستراتيجية',
                //                    page: '/ngbootstrap/strategic_plan_teams_formation'
                //                },
                //                {
                //                    title: 'اجتماع جماعة',
                //                    page: '/ngbootstrap/modal'
                //                },
                //                {
                //                    title: 'جدول توزيع الملاحظين',
                //                    page: '/ngbootstrap/pagination'
                //                },
                //                {
                //                    title: 'اجتماع مشرفي الأجنحة',
                //                    page: '/ngbootstrap/popover'
                //                },
                //                {
                //                    title: 'Progressbar',
                //                    page: '/ngbootstrap/progressbar'
                //                },
                //                {
                //                    title: 'Rating',
                //                    page: '/ngbootstrap/rating'
                //                },
                //                {
                //                    title: 'Tabs',
                //                    page: '/ngbootstrap/tabs'
                //                },
                //                {
                //                    title: 'Timepicker',
                //                    page: '/ngbootstrap/timepicker'
                //                },
                //                {
                //                    title: 'Tooltips',
                //                    page: '/ngbootstrap/tooltip'
                //                },
                //                {
                //                    title: 'Typehead',
                //                    page: '/ngbootstrap/typehead'
                //                }
                //            ]
                //        },
                //    ]
                //},
                //{
                //    title: 'Applications',
                //    root: true,
                //    alignment: 'left',
                //    toggle: 'click',
                //    submenu: [
                //        {
                //            title: 'eCommerce',
                //            bullet: 'dot',
                //            icon: 'flaticon-business',
                //            permission: 'accessToECommerceModule',
                //            submenu: [
                //                {
                //                    title: 'Customers',
                //                    page: '/ecommerce/customers'
                //                },
                //                {
                //                    title: 'Products',
                //                    page: '/ecommerce/products'
                //                },
                //            ]
                //        },
                //        {
                //            title: 'User Management',
                //            bullet: 'dot',
                //            icon: 'flaticon-user',
                //            submenu: [
                //                {
                //                    title: 'متابعة الصيانة',
                //                    page: '/user-management/users'
                //                },
                //                {
                //                    title: 'Roles',
                //                    page: '/user-management/roles'
                //                }
                //            ]
                //        },
                //    ]
                //},
                //{
                //    title: 'Custom',
                //    root: true,
                //    alignment: 'left',
                //    toggle: 'click',
                //    submenu: [
                //        {
                //            title: 'Error Pages',
                //            bullet: 'dot',
                //            icon: 'flaticon2-list-2',
                //            submenu: [
                //                {
                //                    title: 'Error 1',
                //                    page: '/error/error-v1'
                //                },
                //                {
                //                    title: 'Error 2',
                //                    page: '/error/error-v2'
                //                },
                //                {
                //                    title: 'Error 3',
                //                    page: '/error/error-v3'
                //                },
                //                {
                //                    title: 'Error 4',
                //                    page: '/error/error-v4'
                //                },
                //                {
                //                    title: 'Error 5',
                //                    page: '/error/error-v5'
                //                },
                //                {
                //                    title: 'Error 6',
                //                    page: '/error/error-v6'
                //                },
                //            ]
                //        },
                //        {
                //            title: 'Wizard',
                //            bullet: 'dot',
                //            icon: 'flaticon2-mail-1',
                //            submenu: [
                //                {
                //                    title: 'Wizard 1',
                //                    page: '/wizard/wizard-1'
                //                },
                //                {
                //                    title: 'Wizard 2',
                //                    page: '/wizard/wizard-2'
                //                },
                //                {
                //                    title: 'Wizard 3',
                //                    page: '/wizard/wizard-3'
                //                },
                //                {
                //                    title: 'Wizard 4',
                //                    page: '/wizard/wizard-4'
                //                },
                //            ]
                //        },
                //    ]
                //},
            ]
        },
        aside: {
            self: {},
            items: [

                {
                    title: 'Google Material',
                    translate: 'Menu1',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon-medal',
                    tooltip: 'مدير المدرسة',
                    pos_id:40,
                    submenu: [
                        {
                            icon: 'flaticon-medal',
                            title: 'مدير المدرسه',
                            tooltip: 'مدير المدرسة',
                            submenu: [

                                
                                {
                                    icon: 'flaticon-logout',
                                    title: 'اذن خروج طالب برفقه ولي أمره',
                                    page: '/material/buttons-and-indicators/student_exit_permit'
                                },
                                {
                                    icon: 'flaticon-interface-7',
                                    title: 'الأنشطة',
                                    page: '/material/form-controls/activities'
                                },
                                {
                                    icon: 'flaticon-list',
                                    title: 'ما قطع من المنهج',
                                    page: '/material/form-controls/ShowTa7diers'
                                },
                                {
                                    icon: 'flaticon-customer',
                                    title: 'أداء تقييم',
                                    page: '/material/navigation/do_evaluation'
                                },
                                {
                                    icon: 'flaticon-notes',
                                    title: 'نشره داخلية وخارجية',
                                    page: '/material/buttons-and-indicators/posted_internal_external'
                                }, 
                                {
                                    icon: 'flaticon-time',
                                    title: 'افادة تأخير عن بداية الدوام بالمرفق التعليمي',
                                    page: '/material/buttons-and-indicators/delay_affidavit'
                                }, 
                                {
                                    icon: 'flaticon2-group',
                                    title: 'اجتماعات',
                                    page: '/ngbootstrap/meetings'
                                },
                                {
                                    icon: 'flaticon-light',
                                    title: 'الخطه اليوميه للمدير',
                                    submenu: [
                                        {
                                            icon: 'flaticon-network',
                                            title: "لقاء اولياء الامور",
                                            page: '/material/form-controls/student_parent_meeting'
                                        },
                                        {
                                            icon: 'flaticon2-position',
                                            title: 'الزيارات الميدانيه',
                                            page: '/material/popups-and-modals/visits'
                                        },
                                        {
                                            icon: 'flaticon2-group',
                                            title: ' زوار المدرسه',
                                            page: '/material/popups-and-modals/visits'
                                        },
                                        {
                                            icon: 'flaticon-add-circular-button',
                                            title: 'امور اخرى',
                                            page: '/material/popups-and-modals/visits_manager'
                                        },
                                        {
                                            icon: 'flaticon-diagram',
                                            title: 'ما يستجد من اعمال',
                                            page: '/material/form-controls/new_work'
                                        },
                                        {
                                            icon: 'flaticon2-group',
                                            title: 'اجتماعات',
                                            page: '/ngbootstrap/meetings'
                                        },
                                            ],
                                },
                              
                                {
                                    icon: 'flaticon-alert',
                                    title: "استدعاء ولى الامر",
                                    page: '/material/form-controls/calling_parent'
                                },
                              
                               
                              
                                {
                                    icon: 'flaticon-light',
                                    title: 'خطة الاسبوعيه/السنويه',
                                    page: '/material/form-controls/terms'
                                },
        
                                {
                                    icon: 'flaticon2-position',
                                    title: 'الزيارات',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon-network',
                                    title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                                    page: '/ngbootstrap/strategic_plan_teams_formation'
                                },
                                {
                                    icon: 'flaticon-customer',
                                    title: 'تقييم فرق الخطة الاستراتيجية',
                                    page: '/material/navigation/evaluate_strategic_plan_teams'
                                },
                               
                               
                            ]
                        },
                        {
                            icon: 'flaticon-avatar',
                            title: 'المدير المساعد لمتابعة المتعلمين',
                            tooltip: 'المدير المساعد لمتابعة المتعلمين',
                            submenu: [
                                {
                                    icon: 'flaticon-notes',
                                    title: 'نشره داخلية وخارجية',
                                    page: '/material/buttons-and-indicators/posted_internal_external'
                                },
                                {
                                    icon: 'flaticon-attachment',
                                    title: 'اعذار الغياب',
                                    page: '/material/data-table/abscence_statistics'
                                },
                                {
                                    icon: 'flaticon-sound',
                                    title: 'رحلات',
                                    page: '/ngbootstrap/trips'
                                },
                                {
                                    icon: 'flaticon-light',
                                    title: 'الخطه اليوميه للمدير المساعد',
                                    submenu: [
                                       
                                        {
                                            icon: 'flaticon2-position',
                                            title: 'الزيارات الميدانيه',
                                            page: '/material/popups-and-modals/visits'
                                        },
                                        {
                                            icon: 'flaticon2-group',
                                            title: 'اجتماعات',
                                            page: '/ngbootstrap/meetings'
                                        },
                                        {
                                            icon: 'flaticon-rotate',
                                            title: "امور خاصه بالطالب",
                                            page: '/material/form-controls/student_matters'
                                        },
                                       
                                        {
                                            icon: 'flaticon-add-circular-button',
                                            title: 'امور اخرى',
                                            page: '/material/popups-and-modals/visits_manager'
                                        },
                                        {
                                            icon: 'flaticon-diagram',
                                            title: 'ما يستجد من اعمال',
                                            page: '/material/form-controls/new_work'
                                        },
                                      
                                            ],
                                },
                              
                               
                               
                                {
                                    icon: 'flaticon-light',
                                    title: 'خطة الاسبوعيه/السنويه',
                                    page: '/material/form-controls/terms'
                                },
                                {
                                    icon: 'flaticon2-group',
                                    title: 'اجتماعات',
                                    page: '/ngbootstrap/meetings'
                                },
                                {
                                    icon: 'flaticon2-position',
                                    title: 'الزيارات',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon-network',
                                    title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                                    page: '/ngbootstrap/strategic_plan_teams_formation'
                                },
                                {
                                    icon: 'flaticon-customer',
                                    title: 'تقييم فرق الخطة الاستراتيجية',
                                    page: '/material/navigation/evaluate_strategic_plan_teams'
                                }
                            
                               
                      
        
                            ]
                        },
                        {
                            icon: 'flaticon-avatar',
                            title: 'المدير المساعد للمتابعة التعليمية',
                            tooltip: 'المدير المساعد للمتابعة التعليمية',
                            submenu: [
                                {
                                    icon: 'flaticon-notes',
                                    title: 'نشره داخلية وخارجية',
                                    page: '/material/buttons-and-indicators/posted_internal_external'
                                },
                             
                                {
                                    icon: 'flaticon2-position',
                                    title: 'الزيارات',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon-folder-3',
                                    title: 'تفارير مرفوعه',
                                    page: '/material/form-controls/supervisor_opinion'
                                },
                                {
                                    icon: 'flaticon-map',
                                    title: 'اجنحه المدرسه',
                                    page: '/material/layout/corridors'
                                },
                                {
                                    icon: 'flaticon-arrows',
                                    title: 'توزيع المشرفين',
                                    page: '/material/layout/supervisors_distribution'
                                },
                                {
                                    icon: 'flaticon-tool',
                                    title: "الصندوق المالى",
                                    page: '/material/form-controls/financial__fund_expenses'
                                },
                                {
                                    icon: 'flaticon-sound',
                                    title: 'رحالات',
                                    page: '/ngbootstrap/trips'
                                },
                                {
                                    icon: 'flaticon-light',
                                    title: 'الخطه اليوميه للمدير المساعد',
                                    submenu: [
                                       
                                        {
                                            icon: 'flaticon2-position',
                                            title: 'الزيارات الميدانيه',
                                            page: '/material/popups-and-modals/visits'
                                        },
                                        {
                                            icon: 'flaticon2-group',
                                            title: 'اجتماعات',
                                            page: '/ngbootstrap/meetings'
                                        },
                                        {
                                            icon: 'flaticon-rotate',
                                            title: "امور خاصه بالطالب",
                                            page: '/material/form-controls/student_matters'
                                        },
                                       
                                        {
                                            icon: 'flaticon-add-circular-button',
                                            title: 'امور اخرى',
                                            page: '/material/popups-and-modals/visits_manager'
                                        },
                                        {
                                            icon: 'flaticon-diagram',
                                            title: 'ما يستجد من اعمال',
                                            page: '/material/form-controls/new_work'
                                        },
                                      
                                            ],
                                },
                                              
                               
                              
                                {
                                    icon: 'flaticon-light',
                                    title: 'خطة الاسبوعيه/السنويه',
                                    page: '/material/form-controls/terms'
                                },
                                {
                                    icon: 'flaticon2-group',
                                    title: 'اجتماعات',
                                    page: '/ngbootstrap/meetings'
                                },
                                {
                                    icon: 'flaticon2-position',
                                    title: 'الزيارات',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon-network',
                                    title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                                    page: '/ngbootstrap/strategic_plan_teams_formation'
                                },
                                {
                                    icon: 'flaticon-customer',
                                    title: 'تقييم فرق الخطة الاستراتيجية',
                                    page: '/material/navigation/evaluate_strategic_plan_teams'
                                },
                               
                               
                            ]
                        },
                        {
                            icon: 'flaticon-avatar',
                            title: 'المدير المساعد للدعم الاداري',
                            tooltip: 'المدير المساعد للدعم الاداري',
                            submenu: [
                                {
                                    icon: 'flaticon-notes',
                                    title: 'نشره داخلية وخارجية',
                                    page: '/material/buttons-and-indicators/posted_internal_external'
                                },
                             
                                {
                                    icon: 'flaticon-user-add',
                                    title: ' بيانات الموظفين',
                                    page: '/material/form-controls/employees'
                                },
                                {
                                    icon: 'flaticon-calendar-1',
                                    title: 'جدول توزيع الملاحظين',
                                    page: '/ngbootstrap/observers_distribution_table'
                                },
                                {
                                    icon: 'flaticon2-group',
                                    title: 'اجتماع مشرفي الأجنحة',
                                    page: '/ngbootstrap/corridor_supervisors_meeting'
                                },
                                {
                                    icon: 'flaticon-refresh',
                                    title: 'متابعة الصيانة',
                                    page: '/user-management/maintenance_follow_up'
                                },
                                {
                                    icon: 'flaticon-sound',
                                    title: 'رحلات',
                                    page: '/ngbootstrap/trips'
                                },
                                {
                                    icon: 'flaticon-rotate',
                                    title: "امور خاصه بالطالب",
                                    page: '/material/form-controls/student_matters'
                                },
                                {
                                    icon: 'flaticon-diagram',
                                    title: 'ما يستجد من اعمال',
                                    page: '/material/form-controls/new_work'
                                },
                                {
                                    icon: 'flaticon-add-circular-button',
                                    title: 'امور اخرى',
                                    page: '/material/popups-and-modals/visits_manager'
                                },
                                {
                                    icon: 'flaticon-light',
                                    title: 'خطة الاسبوعيه/السنويه',
                                    page: '/material/form-controls/terms'
                                },
                                {
                                    icon: 'flaticon2-group',
                                    title: 'اجتماعات',
                                    page: '/ngbootstrap/meetings'
                                },
                                {
                                    icon: 'flaticon2-position',
                                    title: 'الزيارات',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon-network',
                                    title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                                    page: '/ngbootstrap/strategic_plan_teams_formation'
                                },
                                {
                                    icon: 'flaticon-customer',
                                    title: 'تقييم فرق الخطة الاستراتيجية',
                                    page: '/material/navigation/evaluate_strategic_plan_teams'
                                },
                           
                                
                           
                            ]
                        },
                        {
                            icon: 'flaticon-event-calendar-symbol',
                            title: 'جدول الحصص',
                            page: '/material/popups-and-modals/school_schedule'
                        },
                       
                        {
                            icon: 'flaticon-edit',
                            title: 'تعديل البيانات الشخصيه',
                            page: '/material/form-controls/employees'
                        },
                        
                        {
                            icon: 'flaticon-mail-1',
                            title: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                    ]


                },
             

                {
                    title: 'Google Material',
                    translate: 'Menu1',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon-avatar',
                    tooltip: 'المدير المساعد لمتابعة المتعلمين',
                    pos_id:39,
                    submenu: [
                        {
                            icon: 'flaticon-notes',
                            title: 'نشره داخلية وخارجية',
                            page: '/material/buttons-and-indicators/posted_internal_external'
                        },
                        {
                            icon: 'flaticon-attachment',
                            title: 'اعذار الغياب',
                            page: '/material/data-table/abscence_statistics'
                        },
                        {
                            icon: 'flaticon-sound',
                            title: 'رحلات',
                            page: '/ngbootstrap/trips'
                        },
                        {
                            icon: 'flaticon-light',
                            title: 'الخطه اليوميه للمدير المساعد',
                            submenu: [
                               
                                {
                                    icon: 'flaticon2-position',
                                    title: 'الزيارات الميدانيه',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon2-group',
                                    title: 'اجتماعات',
                                    page: '/ngbootstrap/meetings'
                                },
                                {
                                    icon: 'flaticon-rotate',
                                    title: "امور خاصه بالطالب",
                                    page: '/material/form-controls/student_matters'
                                },
                               
                                {
                                    icon: 'flaticon-add-circular-button',
                                    title: 'امور اخرى',
                                    page: '/material/popups-and-modals/visits_manager'
                                },
                                {
                                    icon: 'flaticon-diagram',
                                    title: 'ما يستجد من اعمال',
                                    page: '/material/form-controls/new_work'
                                },
                              
                                    ],
                        },
                      
                       
                       
                        {
                            icon: 'flaticon-light',
                            title: 'خطة الاسبوعيه/السنويه',
                            page: '/material/form-controls/terms'
                        },
                        {
                            icon: 'flaticon2-group',
                            title: 'اجتماعات',
                            page: '/ngbootstrap/meetings'
                        },
                        {
                            icon: 'flaticon2-position',
                            title: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon-network',
                            title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                            page: '/ngbootstrap/strategic_plan_teams_formation'
                        },
                        {
                            icon: 'flaticon-customer',
                            title: 'تقييم فرق الخطة الاستراتيجية',
                            page: '/material/navigation/evaluate_strategic_plan_teams'
                        },
                        {
                            icon: 'flaticon-event-calendar-symbol',
                            title: 'جدول الحصص',
                            page: '/material/popups-and-modals/school_schedule'
                        },
                       
                        {
                            icon: 'flaticon-edit',
                            title: 'تعديل البيانات الشخصيه',
                            page: '/material/form-controls/employees'
                        },
                        
                        {
                            icon: 'flaticon-mail-1',
                            title: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                       
              

                    ]

                },

                {
                    title: 'Google Material',
                    translate: 'Menu1',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon-avatar',
                    tooltip: 'المدير المساعد للمتابعة التعليمية',
                    pos_id:43,
                    submenu: [
                        {
                            icon: 'flaticon-notes',
                            title: 'نشره داخلية وخارجية',
                            page: '/material/buttons-and-indicators/posted_internal_external'
                        },
                     
                        {
                            icon: 'flaticon2-position',
                            title: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon-folder-3',
                            title: 'تفارير مرفوعه',
                            page: '/material/form-controls/supervisor_opinion'
                        },
                        {
                            icon: 'flaticon-map',
                            title: 'اجنحه المدرسه',
                            page: '/material/layout/corridors'
                        },
                        {
                            icon: 'flaticon-arrows',
                            title: 'توزيع المشرفين',
                            page: '/material/layout/supervisors_distribution'
                        },
                        {
                            icon: 'flaticon-tool',
                            title: "الصندوق المالى",
                            page: '/material/form-controls/financial__fund_expenses'
                        },
                        {
                            icon: 'flaticon-sound',
                            title: 'رحالات',
                            page: '/ngbootstrap/trips'
                        },
                        {
                            icon: 'flaticon-light',
                            title: 'الخطه اليوميه للمدير المساعد',
                            submenu: [
                               
                                {
                                    icon: 'flaticon2-position',
                                    title: 'الزيارات الميدانيه',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon2-group',
                                    title: 'اجتماعات',
                                    page: '/ngbootstrap/meetings'
                                },
                                {
                                    icon: 'flaticon-rotate',
                                    title: "امور خاصه بالطالب",
                                    page: '/material/form-controls/student_matters'
                                },
                               
                                {
                                    icon: 'flaticon-add-circular-button',
                                    title: 'امور اخرى',
                                    page: '/material/popups-and-modals/visits_manager'
                                },
                                {
                                    icon: 'flaticon-diagram',
                                    title: 'ما يستجد من اعمال',
                                    page: '/material/form-controls/new_work'
                                },
                              
                                    ],
                        },
                                      
                       
                      
                        {
                            icon: 'flaticon-light',
                            title: 'خطة الاسبوعيه/السنويه',
                            page: '/material/form-controls/terms'
                        },
                        {
                            icon: 'flaticon2-group',
                            title: 'اجتماعات',
                            page: '/ngbootstrap/meetings'
                        },
                        {
                            icon: 'flaticon2-position',
                            title: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon-network',
                            title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                            page: '/ngbootstrap/strategic_plan_teams_formation'
                        },
                        {
                            icon: 'flaticon-customer',
                            title: 'تقييم فرق الخطة الاستراتيجية',
                            page: '/material/navigation/evaluate_strategic_plan_teams'
                        },
                        {
                            icon: 'flaticon-event-calendar-symbol',
                            title: 'جدول الحصص',
                            page: '/material/popups-and-modals/school_schedule'
                        },
                       
                        {
                            icon: 'flaticon-edit',
                            title: 'تعديل البيانات الشخصيه',
                            page: '/material/form-controls/employees'
                        },
                        
                        {
                            icon: 'flaticon-mail-1',
                            title: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                    ]

                },

                {
                    title: 'Google Material',
                    translate: 'Menu1',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon-avatar',
                    tooltip: 'المدير المساعد للدعم الاداري',
                    pos_id:44,
                    submenu: [
                        {
                            icon: 'flaticon-notes',
                            title: 'نشره داخلية وخارجية',
                            page: '/material/buttons-and-indicators/posted_internal_external'
                        },
                     
                        {
                            icon: 'flaticon-user-add',
                            title: ' بيانات الموظفين',
                            page: '/material/form-controls/employees'
                        },
                        {
                            icon: 'flaticon-calendar-1',
                            title: 'جدول توزيع الملاحظين',
                            page: '/ngbootstrap/observers_distribution_table'
                        },
                        {
                            icon: 'flaticon2-group',
                            title: 'اجتماع مشرفي الأجنحة',
                            page: '/ngbootstrap/corridor_supervisors_meeting'
                        },
                        {
                            icon: 'flaticon-refresh',
                            title: 'متابعة الصيانة',
                            page: '/user-management/maintenance_follow_up'
                        },
                        {
                            icon: 'flaticon-sound',
                            title: 'رحالات',
                            page: '/ngbootstrap/trips'
                        },
                        {
                            icon: 'flaticon-light',
                            title: 'الخطه اليوميه للمدير المساعد',
                            submenu: [
                               
                                {
                                    icon: 'flaticon2-position',
                                    title: 'الزيارات الميدانيه',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon2-group',
                                    title: 'اجتماعات',
                                    page: '/ngbootstrap/meetings'
                                },
                                {
                                    icon: 'flaticon-rotate',
                                    title: "امور خاصه بالطالب",
                                    page: '/material/form-controls/student_matters'
                                },
                               
                                {
                                    icon: 'flaticon-add-circular-button',
                                    title: 'امور اخرى',
                                    page: '/material/popups-and-modals/visits_manager'
                                },
                                {
                                    icon: 'flaticon-diagram',
                                    title: 'ما يستجد من اعمال',
                                    page: '/material/form-controls/new_work'
                                },
                              
                                    ],
                        },
                             
                       
                        {
                            icon: 'flaticon-light',
                            title: 'خطة الاسبوعيه/السنويه',
                            page: '/material/form-controls/terms'
                        },
                        {
                            icon: 'flaticon2-group',
                            title: 'اجتماعات',
                            page: '/ngbootstrap/meetings'
                        },
                        {
                            icon: 'flaticon2-position',
                            title: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon-network',
                            title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                            page: '/ngbootstrap/strategic_plan_teams_formation'
                        },
                        {
                            icon: 'flaticon-customer',
                            title: 'تقييم فرق الخطة الاستراتيجية',
                            page: '/material/navigation/evaluate_strategic_plan_teams'
                        },
                        {
                            icon: 'flaticon-event-calendar-symbol',
                            title: 'جدول الحصص',
                            page: '/material/popups-and-modals/school_schedule'
                        },
                       
                        {
                            icon: 'flaticon-edit',
                            title: 'تعديل البيانات الشخصيه',
                            page: '/material/form-controls/employees'
                        },
                        
                        {
                            icon: 'flaticon-mail-1',
                            title: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                    ]

                },


              
                {
                    title: 'Layout Builder',
                    translate: 'Menu1',
                    root: true,
                    icon: 'flaticon-businesswoman',
                    tooltip: 'سكرتارية',
                    pos_id:45,
                    //bullet: 'dot',
                    submenu: [
                        {
                            icon: 'flaticon-event-calendar-symbol',
                            title: 'جدول الحصص',
                            tooltip: 'جدول الحصص',
                            page: '/material/popups-and-modals/school_schedule',
                       },
                        {
                            icon: 'flaticon-list-3',
                            title: 'بيانات المعلمين',
                            page: '/material/form-controls/employees'
                        },
                        {
                            icon: 'flaticon-graphic-2',
                            title: 'احصائية الغياب ',
                            page: '/material/form-controls/daily_absence_stat'
                        },
                        {
                            icon: 'flaticon-confetti',
                            title: 'حفل مدرسي ',
                            page: '/material/form-controls/school_party'
                        },
                        {
                            icon: 'flaticon-presentation-1',
                            title: 'ندوة / محاضرة ',
                            page: '/material/form-controls/events'
                        },
                     
                        {
                            icon: 'flaticon-notes',
                            title: 'نشرات',
                            page: '/material/buttons-and-indicators/icon'
                        },
                        {
                            icon: 'flaticon-mail-1',
                            title: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                    ]
                },

                {
                    title: 'Google Material',
                    translate: 'Menu1',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon2-group',
                    tooltip: 'شؤون طلبة',
                    pos_id:46,
                    submenu: [
                        {
                            icon: 'flaticon-calendar-with-a-clock-time-tools',
                            title: ' تسجيل غياب الطلاب',
                            page: '/material/data-table/student_absence'
                        },
                        {
                            icon: 'flaticon-graphic-2',
                            title: 'احصائية الغياب ',
                            page: '/material/form-controls/daily_absence_stat'
                        },
                        {
                            icon: 'flaticon-list',
                            title: 'اعذار الغياب',
                            page: '/material/data-table/abscence_statistics'
                        },
                        {
                            icon: 'flaticon-danger',
                            title: 'الانذارات',
                            page: '/material/form-controls/enzarat'
                        },
                        {
                            icon: 'flaticon-circle',
                            title: 'تسجيل المخالفات',
                            page: '/material/form-controls/violation_record'
                        },
                        {
                            icon: 'flaticon2-chart',
                            title: 'الحالة السلوكية',
                            page: '/material/form-controls/behavioral_status'
                        },
                       
                        {
                            icon: 'flaticon-folder-3',
                            title: 'تقارير مرفوعه',
                            page: '/material/form-controls/supervisor_opinion'
                        },
                        {
                            icon: 'flaticon-folder-1',
                            title: 'تقرير مجمع عن الطالب',
                            page: '/material/form-controls/behavioral_report'
                        },
                         
                        {
                            icon: 'flaticon-logout',
                            title: 'اذن خروج طالب',
                            page: '/material/buttons-and-indicators/student_exit_permit'
                        },
                        {
                            icon: 'flaticon-user-add',
                            title: 'بيانات طالب',
                            page: '/material/form-controls/students'
                        },
                        {
                            icon: 'flaticon-statistics',
                            title: 'تسلسل الطلبة في الفصل',
                            page: '/material/data-table/students_sequence_in_class'
                        },
                        {
                            icon: 'flaticon-network',
                            title: 'توزيع الطلاب علي الفصول',
                            page: '/material/data-table/distribution_students_to_classes'
                        },
                        {
                            icon: 'flaticon-reply',
                            title: 'نقل فردى من المدرسه للعام الحالى',
                            page: '/material/form-controls/student_transfer'
                        },
                        {
                            icon: 'flaticon-exclamation',
                            title: 'ترك دراسه',
                            page: '/material/form-controls/student_leave'
                        },
                        {
                            icon: 'flaticon-graphic-2',
                            title: 'احصائية الغياب ',
                            page: '/material/form-controls/daily_absence_stat'
                        },
                        {
                            icon: 'flaticon-mail-1',
                            title: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                     
                    ]



                },


                {
                    title: 'Dashboard',
                    root: true,
                    icon: 'flaticon2-protected',
                    //page: '/dashboard',
                    translate: 'MENU.DASHBOARD',
                    tooltip: 'اخصائي نفسي',
                    //bullet: 'dot',
                    pos_id:47,
                    submenu: [
                        {
                            icon: 'flaticon2-layers-2',
                            title: 'بيانات عن الباحث النفسى',
                            page: '/material/form-controls/employees'
                        },
                        {
                            icon: 'flaticon-profile-1',
                            title: 'بيانات المدرسة',
                            page: '/material/popups-and-modals/school_data'
                        },
                        {
                            icon: 'flaticon-network',
                            title: 'توزيع الطلبة حسب الصفوف',
                            page: '/material/navigation/distribution_on_levels'
                        },
                        {
                            icon: 'flaticon-network',
                            title: 'توزيع الطلبة حسب المستوى التحصيلى',
                            page: '/material/navigation/level_statistics'
                        },
                        {
                            icon: 'flaticon-statistics',
                            title: 'التشعيب',
                            page: '/material/navigation/branching'
                        },
                        {
                            icon: 'flaticon2-edit',
                            title: 'تغيير التشعيب',
                            page: '/material/data-table/change-branch'
                        },
                        {
                            icon: 'flaticon-light',
                            title: 'خطة عمل الباحث النفسي للفصل الدراسي',
                            page: '/material/form-controls/terms'
                        },
                        {
                            icon: 'flaticon-imac',
                            title: "الحالات",
                            page: '/material/form-controls/status'
                        }
                        ,
                        {
                            icon: 'flaticon-exclamation-square',
                            title: 'حالات الرسوب في أسابيع',
                            page: '/material/data-table/failure-cases'
                        },
                        {
                            icon: 'flaticon-star',
                            title: 'الطلاب الفائقون دراسيا',
                            page: '/material/data-table/excellent-students'
                        },
                        {
                            icon: 'flaticon2-layers-1',
                            title: 'البيانات الاوليه و التاريخ الدراسى و الحاله الصحيه',
                            page: '/material/data-table/student_basic_data'
                        },
                        {
                            icon: 'flaticon-security',
                            title: "صندوق الاستفسارات النفسيه",
                            page: '/material/form-controls/mentality_inquiries'
                        },
                        
                        {
                            icon: 'flaticon-imac',
                            title: 'الارشاد الجماعى',
                            page: '/material/form-controls/group_instruction'
                        }
                        ,
                        {
                            icon: 'flaticon-imac',
                            title: 'الارشاد الصفى',
                            page: '/material/form-controls/class_instruction'
                        },
                      
                        {
                            icon: 'flaticon-presentation-1',
                            title: 'التوجيهات',
                            page: '/material/form-controls/guide'
                        },
                        {
                            icon: 'flaticon-interface-7',
                            title: 'الأنشطة',
                            page: '/material/form-controls/activities'
                        },
                

                        {
                            icon: 'flaticon-questions-circular-button',
                            title: 'الاختبارات والمقاييس',
                            page: '/material/data-table/tests-metric'
                        },
                     
                        {
                            icon: 'flaticon2-position',
                            title: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon-network',
                            title: 'تشكيل الجماعات',
                            page: '/ngbootstrap/strategic_plan_teams_formation'
                        },
                        {
                            icon: 'flaticon-presentation-1',
                            title: 'تشكيل المجالس',
                            page: 'material/popups-and-modals/board'
                        },
                        {
                            icon: 'flaticon2-group',
                            title: 'اجتماعات',
                            page: '/ngbootstrap/meetings'
                        },
                     {
                            icon: 'flaticon-open-box',
                            title: 'المعوقات و المقترحات',
                            page: '/material/layout/suggestions'
                        },

                        {
                            icon: 'flaticon-mail-1',
                            title: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                    ]

                },
                {
                    title: 'social',
                    translate: 'Menu1',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon2-world',
                    tooltip: 'اخصائي اجتماعي',
                    pos_id:48,
                    submenu: [
                        {
                            icon: 'flaticon2-shield',
                            title: 'الحالات الصحية',
                            page: '/material/form-controls/health_cases'
                        },
                        {
                            icon: 'flaticon-refresh',
                            title: 'الباقون للاعادة',
                            page: '/material/form-controls/RestToRedo'
                        },
                        {
                            icon: 'flaticon-danger',
                            title: 'المتهمون في قضايا',
                            page: '/material/form-controls/AccusedStudents'
                        },
                        {
                            icon: 'flaticon-users-1',
                            title: 'أبناء الشهداء',
                            page: '/material/form-controls/SonsOfMartyrs'
                        },
                        {
                            icon: 'flaticon-layers',
                            title: 'شرائح طلابية أخري',
                            page: '/material/form-controls/OtherStudentSlides'
                        },
                        {
                            icon: 'flaticon-imac',
                            title: 'حالات الغياب',
                            page: '/material/form-controls/absence_cases'
                        }
                        ,
                        {
                            icon: 'flaticon2-chart',
                            title: 'الحالات السلوكيه',
                            page: '/material/form-controls/behavioral_status'
                        },
                        {
                            icon: 'flaticon-medical',
                            title: 'رأي الاخصائي الاجتماعي في تقرير حالة سلوكية والاجراء المتخذ',
                            page: '/material/form-controls/supervisor_opinion'
                        },
                      
                      
                        {
                            icon: 'flaticon-imac',
                            title: 'حالات اضطرابات الكلام',
                            page: '/material/form-controls/speaking_disorder'
                        },
                       
                        {
                            icon: 'flaticon-user',
                            title: 'حالات الفرديه',
                            page: '/material/form-controls/IndividualCases'
                        },
                        {
                            icon: 'flaticon-star',
                            title: 'الطلاب المميزون دراسيا وفي الأنشطة',
                            page: '/material/form-controls/SpecialStudents'
                        },
                        
                        {
                            icon: 'flaticon2-group',
                            title: 'اجتماع جماعة',
                            page: '/ngbootstrap/meetings'
                        },
                        {
                            icon: 'flaticon-network',
                            title: 'تشكيل الجماعات',
                            page: '/ngbootstrap/strategic_plan_teams_formation'
                        },
                        {
                            icon: 'flaticon-presentation-1',
                            title: 'المجالس',
                            page: '/material/popups-and-modals/board'
                        },
                        {
                            icon: 'flaticon-imac',
                            title: 'طلاب سيتم عرضهم علي مجلس النظام',
                            page: '/material/form-controls/RegimeCouncilStudents'
                        },
                        {
                            icon: 'flaticon-refresh',
                            title: 'الباقون للاعادة',
                            page: '/material/form-controls/behaviour_status'
                        },
                        {
                            icon: 'flaticon2-position',
                            title: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon-mail-1',
                            title: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                       
                    ]
                },

                {
                    title: 't7sen ada2',
                    translate: 'Menu1',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon2-time',
                    tooltip: 'تحسين الأداء',
                    pos_id:49,
                    submenu: [
                        {
                            icon: 'flaticon-network',
                            title: 'تشكيل فرق الخطة الاستراتيجية',
                            page: '/ngbootstrap/strategic_plan_teams_formation'
                        },
                        {
                            icon: 'flaticon-sound',
                            title: 'swot',
                            page: '/material/form-controls/swot'
                        }

                    ]
                },

                {
                    title: 'Google Material',
                    translate: 'Menu1',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon2-shelter',
                    tooltip: 'الحارس',
                    pos_id:53,
                    submenu: [
                        {
                            icon: 'flaticon-pin',
                            title: 'تعريف الزياره',
                            page: '/material/popups-and-modals/visit_definition'
                        },
                        {
                            icon: 'flaticon2-position',
                            title: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        }

                    ]
                },
                


                {
                    title: 'Ng-Bootstrap',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon-profile-1',
                    tooltip: 'رئيس قسم',
                    pos_id:38,
                    submenu: [
                        {
                            icon: 'flaticon2-edit',
                            title: 'كتابة التحضير',
                            page: '/material/layout/writing_preparation'
                        },
                        {
                            icon: 'flaticon2-tag',
                            title: 'اعتماد التحضير',
                            page: '/material/buttons-and-indicators/preparation_status'
                        },
                        {
                            icon: 'flaticon-time-1',
                            title: 'بطاقة متابعة طالب ضعيف',
                            page: '/material/layout/poor_student'
                        },
                        {
                            icon: 'flaticon2-analytics',
                            title: 'بطاقة رعاية طالب متفوق',
                            page: '/material/layout/top_student'
                        },
                        {
                            icon: 'flaticon-pin',
                            title: 'تعريف الزياره',
                            page: '/material/popups-and-modals/visit_definition'
                        },
                        {
                            icon: 'flaticon2-position',
                            title: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon2-tag',
                            title: 'اعتماد غيابات/استئذانات المعلمين ',
                            page: '/material/layout/teacher_absences_permissions'
                        },
                        {
                            icon: 'flaticon2-group',
                            title: 'اجتماع جماعة',
                            page: '/ngbootstrap/meetings'
                        },
                        {
                            icon: 'flaticon-interface-7',
                            title: 'الأنشطة',
                            page: '/material/form-controls/activities'
                        },
                        {
                            icon: 'flaticon-squares-3',
                            title: 'الأقسام',
                            page: '/material/form-controls/departments'
                        },
                        {
                            icon: 'flaticon-list-3',
                            title: 'المواد',
                            page: '/material/form-controls/subjects'
                        },
                        {
                            icon: 'flaticon2-speaker',
                            title: 'الوظائف',
                            page: '/material/form-controls/jobs'
                        },
                        {
                            icon: 'flaticon-users',
                            title: "المستخدمين",
                            page: '/material/form-controls/users'
                        },
                        {
                            icon: 'flaticon-user-add',
                            title: 'الموظفين',
                            page: '/material/form-controls/employees'
                        },
                        {
                            icon: 'flaticon2-accept',
                            title: 'بنود التقييم',
                            page: '/material/navigation/evaluation_items'
                        }
                    ]
                },

                {
                    title: 'eCommerce',
                    //bullet: 'dot',
                    icon: 'flaticon-user',
                    tooltip: 'معلم',
                    root: true,
                    pos_id:37,
                    submenu: [

                        {
                            icon: 'flaticon2-edit',
                            title: 'كتابة التحضير',
                            page: '/material/layout/writing_preparation'
                        },
                        {
                            icon: 'flaticon-squares-3',
                            title: 'الأقسام',
                            page: '/material/form-controls/departments'
                        },
                        {
                            icon: 'flaticon-list-3',
                            title: 'المواد',
                            page: '/material/form-controls/subjects'
                        },
                        {
                            icon: 'flaticon2-speaker',
                            title: 'الوظائف',
                            page: '/material/form-controls/jobs'
                        },
                        {
                            icon: 'flaticon-users',
                            title: "المستخدمين",
                            page: '/material/form-controls/users'
                        },
                        {
                            icon: 'flaticon-user-add',
                            title: 'الموظفين',
                            page: '/material/form-controls/employees'
                        },
                        {
                            icon: 'flaticon2-group',
                            title: 'اجتماع جماعة',
                            page: '/ngbootstrap/meetings'
                        },
                        {
                            icon: 'flaticon-time-1',
                            title: 'بطاقة متابعة طالب ضعيف',
                            page: '/material/layout/poor_student'
                        },
                        {
                            icon: 'flaticon2-analytics',
                            title: 'بطاقة رعاية طالب متفوق',
                            page: '/material/layout/top_student'
                        },
                        {
                            icon: 'flaticon-pin',
                            title: 'تعريف الزياره',
                            page: '/material/popups-and-modals/visit_definition'
                        },
                        {
                            icon: 'flaticon2-position',
                            title: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon2-calendar-6',
                            title: 'ادخال غيابات/استئذانات المعلمين',
                            page: '/material/layout/add_absences_permissions'
                        },
                        {
                            icon: 'flaticon2-crisp-icons-1',
                            title: 'متابعه الطلاب',
                            page: '/material/form-controls/student_tracking'
                        }
                        ,
                        {
                            icon: 'flaticon-file-2',
                            title: 'تفرير متابعه الطلاب  ',
                            page: '/material/form-controls/behavioral_status'
                        }
                        ,
                        {
                            icon: 'flaticon2-location',
                            title: 'زياره رئيس القسم  ',
                            page: '/material/form-controls/teacher_opinion_visit'
                        }
                        ,
                        {
                            icon: 'flaticon-sound',
                            title: 'swot',
                            page: '/material/form-controls/swot'
                        }
                        ,
                        {
                            icon: 'flaticon-mail-1',
                            title: 'الرسائل',
                            page: '/material/form-controls/message'
                        }


                    ]
                },

                {
                    title: 'User Management',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon-users',
                    tooltip: 'فريق التخطيط',
                    pos_id:52,
                    submenu: [

                        {
                            icon: 'flaticon-network',
                            title: 'تشكيل فرق الخطة الاستراتيجية',
                            page: '/ngbootstrap/strategic_plan_teams_formation'
                        },
                        {
                            icon: 'flaticon-arrows',
                            title: 'توزيع المشرفين',
                            page: '/material/layout/supervisors_distribution'
                        },
                        {
                            icon: 'flaticon2-group',
                            title: 'اجتماع جماعة',
                            page: '/ngbootstrap/meetings'
                        },
                        {
                            icon: 'flaticon-customer',
                            title: 'تقييم فرق الخطة الاستراتيجية',
                            page: '/material/navigation/evaluate_strategic_plan_teams'
                        },


                    ]
                },

                {
                    title: 'Layout Builder',
                    translate: 'Menu1',
                    root: true,
                    icon: 'flaticon2-menu-4',
                    tooltip: 'المكتبة',
                    pos_id:50,
                    //bullet: 'dot',
                    submenu: [
                        //{
                        //    icon: 'flaticon2-architecture-and-city',
                        //    title: 'accordion',
                        //    page: '/ngbootstrap/Accordion1'
                        //},
                        {
                            icon: 'flaticon-edit-1',
                            title: 'بيانات الكتب',
                            page: '/ngbootstrap/book_data'
                        }
                        ,
                        {
                            icon: 'flaticon-plus',
                            title: 'استعارة كتاب',
                            page: '/ngbootstrap/borrow_book'
                        },
                        {
                            icon: 'flaticon-reply',
                            title: 'ارجاع كتاب',
                            page: '/ngbootstrap/return_book'
                        },
                        {
                            icon: 'flaticon-layers',
                            title: 'استعراض الكتب',
                            page: '/ngbootstrap/show_books'
                        }

                    ]

                },

                //{
                //    title: 'Error Pages',
                //    root: true,
                //    //bullet: 'dot',
                //    icon: 'flaticon2-list-2',
                //    //submenu: [
                //    //    {
                //    //        title: 'Error 1',
                //    //        page: '/error/error-v1'
                //    //    },
                //    //    {
                //    //        title: 'Error 2',
                //    //        page: '/error/error-v2'
                //    //    },
                //    //    {
                //    //        title: 'Error 3',
                //    //        page: '/error/error-v3'
                //    //    },
                //    //    {
                //    //        title: 'Error 4',
                //    //        page: '/error/error-v4'
                //    //    },
                //    //    {
                //    //        title: 'Error 5',
                //    //        page: '/error/error-v5'
                //    //    },
                //    //    {
                //    //        title: 'Error 6',
                //    //        page: '/error/error-v6'
                //    //    },
                //    //]
                //}
                //,
                //{
                //    title: 'Wizard',
                //    root: true,
                //    //bullet: 'dot',
                //    icon: 'flaticon2-mail-1',
                //    //submenu: [
                //    //    {
                //    //        title: 'Wizard 1',
                //    //        page: '/wizard/wizard-1'
                //    //    },
                //    //    {
                //    //        title: 'Wizard 2',
                //    //        page: '/wizard/wizard-2'
                //    //    },
                //    //    {
                //    //        title: 'Wizard 3',
                //    //        page: '/wizard/wizard-3'
                //    //    },
                //    //    {
                //    //        title: 'Wizard 4',
                //    //        page: '/wizard/wizard-4'
                //    //    },
                //    //]
                //},
            ]
        },
    };
    public updatedCategories: any;

    public get configs(): any {
        //this.updatedCategories = this.defaults.aside.items.map(item => ({
        //    ...item,
        //    submenu: item.filter(submenu => submenu.id === "5")
        //}));
        //console.log("new func", this.defaults.aside.items)

        return this.defaults;
    }
}

