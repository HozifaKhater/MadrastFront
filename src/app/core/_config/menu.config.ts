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
                //                            page: '/material/buttons-and-indicators/progress-bar'
                //                        },
                //                        {
                //                            title: 'الفصول',
                //                            page: '/material/buttons-and-indicators/progress-spinner'
                //                        },
                //                        {
                //                            title: 'المراحل',
                //                            page: '/material/buttons-and-indicators/ripples'
                //                        }
                //                    ]
                //                },
                //                {
                //                    title: 'بيانات المدرسة',
                //                    bullet: 'dot',
                //                    submenu: [
                //                        {
                //                            title: 'بيانات المدرسة',
                //                            page: '/material/popups-and-modals/bottom-sheet'
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
                //                            page: '/material/popups-and-modals/snackbar'
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
                //                            page: '/material/data-table/paginator'
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
                //                    page: '/ngbootstrap/dropdown'
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
                title: 't7sen ada2',
                translate: 'Menu1',
                root: true,
                //bullet: 'dot',
                icon: 'flaticon2-browser-2',
                tooltip: 'تعريفات ',
                pos_id:0,
                submenu: [
                    {
                        icon: 'flaticon2-open-box text-info',
                        title: 'تعريف اجتماع ',
                        page: '/material/popups-and-modals/meeting_type'
                    },

                    {
                        icon: 'flaticon2-open-box text-info',
                        title: 'تعريف الزياره',
                        page: '/material/popups-and-modals/tooltip'
                    },

                    {
                        icon: 'flaticon2-open-box text-info',
                        title: 'الأقسام',
                        page: '/material/form-controls/checkbox'
                    },

                    {
                        icon: 'flaticon2-open-box text-info',
                        title: 'الوظائف',
                        page: '/material/form-controls/formfield'
                    },
                    {
                        icon: 'flaticon2-open-box text-info',
                        title: "المستخدمين",
                        page: '/material/form-controls/slider'
                    },

                    {
                        icon: 'flaticon2-open-box text-info',
                        title: 'الموظفين',
                        page: '/material/form-controls/input'
                    },

                    {
                        icon: 'flaticon2-open-box text-info',
                        title: 'الصفوف',
                        page: '/material/buttons-and-indicators/progress-bar'
                    },
                    {
                        icon: 'flaticon2-open-box text-info',
                        title: 'الفصول',
                        page: '/material/buttons-and-indicators/progress-spinner'
                    },
                    {
                        icon: 'flaticon2-open-box text-info',
                        title: 'المراحل',
                        page: '/material/buttons-and-indicators/ripples'
                    },

                    {
                        icon: 'flaticon2-architecture-and-city',
                        title: 'مواد',
                        page: '/material/form-controls/subjects'
                    },
                    {
                        icon: 'flaticon2-architecture-and-city',
                        title: 'swot',
                        page: '/material/form-controls/swot'
                    },
                    {
                        icon: 'flaticon2-open-box text-info',
                        title: 'تعريف الزياره',
                        page: '/material/popups-and-modals/tooltip'
                    },


                ]
            },
                {
                    title: 'Google Material',
                    translate: 'Menu1',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon2-architecture-and-city',
                    tooltip: 'مدير المدرسة',
                    pos_id:40,
                    submenu: [
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'مدير المدرسه',
                            tooltip: 'مدير المدرسة',
                            submenu: [
                       
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'اذن خروج طالب برفقه ولي أمره',
                                    tooltip: 'اذن خروج طالب برفقه ولي أمره',
                                    page: '/material/buttons-and-indicators/chips'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'الأنشطة',
                                    tooltip: 'الأنشطة',
                                    page: '/material/form-controls/radiobutton'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'ما قطع من المنهج',
                                    tooltip: 'ما قطع من المنهج',
                                    page: '/material/form-controls/ShowTa7diers'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'أداء تقييم',
                                    tooltip: 'أداء تقييم',
                                    page: '/material/navigation/toolbar'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'نشره داخلية وخارجية',
                                    tooltip: 'نشره داخلية وخارجية',
                                    page: '/material/buttons-and-indicators/icon'
                                }, 
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'افادة تأخير عن بداية الدوام بالمرفق التعليمي',
                                    tooltip: 'افادة تأخير عن بداية الدوام بالمرفق التعليمي',
                                    page: '/material/buttons-and-indicators/button-toggle'
                                }, 
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'اجتماعات',
                                    tooltip: 'اجتماعات',
                                    page: '/ngbootstrap/modal'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'الخطه اليوميه للمدير',
                                    tooltip: 'الخطه اليوميه للمدير',
                                    submenu: [
                                        {
                                            icon: 'flaticon2-open-box text-info',
                                            title: "لقاء اولياء الامور",
                                            tooltip: "لقاء اولياء الامور",
                                            page: '/material/form-controls/student_parent_meeting'
                                        },
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: 'الزيارات الميدانيه',
                                            tooltip: 'الزيارات الميدانيه',
                                            page: '/material/popups-and-modals/visits'
                                        },
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: ' زوار المدرسه',
                                            tooltip: ' زوار المدرسه',
                                            page: '/material/popups-and-modals/visits'
                                        },
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: 'امور اخرى',
                                            tooltip: 'امور اخرى',
                                            page: '/material/popups-and-modals/visits_manager'
                                        },
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: 'ما يستجد من اعمال',
                                            tooltip: 'ما يستجد من اعمال',
                                            page: '/material/form-controls/new_work'
                                        },
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: 'اجتماعات',
                                            tooltip: 'اجتماعات',
                                            page: '/ngbootstrap/modal'
                                        },
                                            ],
                                },
                              
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: "استدعاء ولى الامر",
                                    tooltip: "استدعاء ولى الامر",
                                    page: '/material/form-controls/calling_parent'
                                },
                              
                               
                              
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'خطة الاسبوعيه/السنويه',
                                    tooltip: 'خطة الاسبوعيه/السنويه',
                                    page: '/material/form-controls/terms'
                                },
        
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'الزيارات',
                                    tooltip: 'الزيارات',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                                    tooltip: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                                    page: '/ngbootstrap/dropdown'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'تقييم فرق الخطة الاستراتيجية',
                                    tooltip: 'تقييم فرق الخطة الاستراتيجية',
                                    page: '/material/navigation/sidenav'
                                },
                               
                               
                            ]
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'المدير المساعد لمتابعة المتعلمين',
                            tooltip: 'المدير المساعد لمتابعة المتعلمين',
                            submenu: [
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'نشره داخلية وخارجية',
                                    tooltip: 'نشره داخلية وخارجية',
                                    page: '/material/buttons-and-indicators/icon'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'اعذار الغياب',
                                    tooltip: 'اعذار الغياب',
                                    page: '/material/data-table/abscence_statistics'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'رحلات',
                                    tooltip: 'رحلات',
                                    page: '/ngbootstrap/collapse'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'الخطه اليوميه للمدير المساعد',
                                    submenu: [
                                       
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: 'الزيارات الميدانيه',
                                            tooltip: 'الزيارات الميدانيه',
                                            page: '/material/popups-and-modals/visits'
                                        },
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: 'اجتماعات',
                                            tooltip: 'اجتماعات',
                                            page: '/ngbootstrap/modal'
                                        },
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: "امور خاصه بالطالب",
                                            tooltip: "امور خاصه بالطالب",
                                            page: '/material/form-controls/student_matters'
                                        },
                                       
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: 'امور اخرى',
                                            tooltip: 'امور اخرى',
                                            page: '/material/popups-and-modals/visits_manager'
                                        },
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: 'ما يستجد من اعمال',
                                            tooltip: 'ما يستجد من اعمال',
                                            page: '/material/form-controls/new_work'
                                        },
                                      
                                            ],
                                },
                              
                               
                               
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'خطة الاسبوعيه/السنويه',
                                    tooltip: 'خطة الاسبوعيه/السنويه',
                                    page: '/material/form-controls/terms'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'اجتماعات',
                                    tooltip: 'اجتماعات',
                                    page: '/ngbootstrap/modal'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'الزيارات',
                                    tooltip: 'الزيارات',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                                    tooltip: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                                    page: '/ngbootstrap/dropdown'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'تقييم فرق الخطة الاستراتيجية',
                                    tooltip: 'تقييم فرق الخطة الاستراتيجية',
                                    page: '/material/navigation/sidenav'
                                }
                            
                               
                      
        
                            ]
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'المدير المساعد للمتابعة التعليمية',
                            tooltip: 'المدير المساعد للمتابعة التعليمية',
                            submenu: [
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'نشره داخلية وخارجية',
                                    tooltip: 'نشره داخلية وخارجية',
                                    page: '/material/buttons-and-indicators/icon'
                                },
                             
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'الزيارات',
                                    tooltip: 'الزيارات',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'تفارير مرفوعه',
                                    tooltip: 'تفارير مرفوعه',
                                    page: '/material/form-controls/supervisor_opinion'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'اجنحه المدرسه',
                                    tooltip: 'اجنحه المدرسه',
                                    page: '/material/layout/tabs'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'توزيع المشرفين',
                                    tooltip: 'توزيع المشرفين',
                                    page: '/material/layout/stepper'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: "الصندوق المالى",
                                    tooltip: "الصندوق المالى",
                                    page: '/material/form-controls/financial__fund_expenses'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'رحالات',
                                    tooltip: 'رحالات',
                                    page: '/ngbootstrap/collapse'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'الخطه اليوميه للمدير المساعد',
                                    tooltip: 'الخطه اليوميه للمدير المساعد',
                                    submenu: [
                                       
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: 'الزيارات الميدانيه',
                                            tooltip: 'الزيارات الميدانيه',
                                            page: '/material/popups-and-modals/visits'
                                        },
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: 'اجتماعات',
                                            tooltip: 'اجتماعات',
                                            page: '/ngbootstrap/modal'
                                        },
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: "امور خاصه بالطالب",
                                            tooltip: "امور خاصه بالطالب",
                                            page: '/material/form-controls/student_matters'
                                        },
                                       
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: 'امور اخرى',
                                            tooltip: 'امور اخرى',
                                            page: '/material/popups-and-modals/visits_manager'
                                        },
                                        {
                                            icon: 'flaticon2-architecture-and-city',
                                            title: 'ما يستجد من اعمال',
                                            tooltip: 'ما يستجد من اعمال',
                                            page: '/material/form-controls/new_work'
                                        },
                                      
                                            ],
                                },
                                              
                               
                              
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'خطة الاسبوعيه/السنويه',
                                    tooltip: 'خطة الاسبوعيه/السنويه',
                                    page: '/material/form-controls/terms'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'اجتماعات',
                                    tooltip: 'اجتماعات',
                                    page: '/ngbootstrap/modal'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'الزيارات',
                                    tooltip: 'الزيارات',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                                    tooltip: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                                    page: '/ngbootstrap/dropdown'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'تقييم فرق الخطة الاستراتيجية',
                                    tooltip: 'تقييم فرق الخطة الاستراتيجية',
                                    page: '/material/navigation/sidenav'
                                },
                               
                               
                            ]
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'المدير المساعد للدعم الاداري',
                            tooltip: 'المدير المساعد للدعم الاداري',
                            submenu: [
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'نشره داخلية وخارجية',
                                    tooltip: 'نشره داخلية وخارجية',
                                    page: '/material/buttons-and-indicators/icon'
                                },
                             
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: ' بيانات الموظفين',
                                    tooltip: ' بيانات الموظفين',
                                    page: '/material/form-controls/input'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'جدول توزيع الملاحظين',
                                    tooltip: 'جدول توزيع الملاحظين',
                                    page: '/ngbootstrap/pagination'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'اجتماع مشرفي الأجنحة',
                                    tooltip: 'اجتماع مشرفي الأجنحة',
                                    page: '/ngbootstrap/popover'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'متابعة الصيانة',
                                    tooltip: 'متابعة الصيانة',
                                    page: '/user-management/users'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'رحالات',
                                    tooltip: 'رحالات',
                                    page: '/ngbootstrap/collapse'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: "امور خاصه بالطالب",
                                    tooltip: "امور خاصه بالطالب",
                                    page: '/material/form-controls/student_matters'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'ما يستجد من اعمال',
                                    tooltip: 'ما يستجد من اعمال',
                                    page: '/material/form-controls/new_work'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'امور اخرى',
                                    tooltip: 'امور اخرى',
                                    page: '/material/popups-and-modals/visits_manager'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'خطة الاسبوعيه/السنويه',
                                    page: '/material/form-controls/terms'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'اجتماعات',
                                    tooltip: 'اجتماعات',
                                    page: '/ngbootstrap/modal'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'الزيارات',
                                    tooltip: 'الزيارات',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                                    tooltip: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                                    page: '/ngbootstrap/dropdown'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'تقييم فرق الخطة الاستراتيجية',
                                    tooltip: 'تقييم فرق الخطة الاستراتيجية',
                                    page: '/material/navigation/sidenav'
                                },
                           
                                
                           
                            ]
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'جدول الحصص',
                            tooltip: 'جدول الحصص',
                            page: '/material/popups-and-modals/dialog'
                        },
                       
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تعديل البيانات الشخصيه',
                            tooltip: 'تعديل البيانات الشخصيه',
                            page: '/material/form-controls/input'
                        },
                        
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الرسائل',
                            tooltip: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                    ]


                },
             

                {
                    title: 'Google Material',
                    translate: 'Menu1',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon2-browser-2',
                    tooltip: 'المدير المساعد لمتابعة المتعلمين',
                    pos_id:39,
                    submenu: [
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'نشره داخلية وخارجية',
                            tooltip: 'نشره داخلية وخارجية',
                            page: '/material/buttons-and-indicators/icon'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اعذار الغياب',
                            tooltip: 'اعذار الغياب',
                            page: '/material/data-table/abscence_statistics'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'رحلات',
                            tooltip: 'رحلات',
                            page: '/ngbootstrap/collapse'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الخطه اليوميه للمدير المساعد',
                            tooltip: 'الخطه اليوميه للمدير المساعد',
                            submenu: [
                               
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'الزيارات الميدانيه',
                                    tooltip: 'الزيارات الميدانيه',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'اجتماعات',
                                    tooltip: 'اجتماعات',
                                    page: '/ngbootstrap/modal'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: "امور خاصه بالطالب",
                                    tooltip: "امور خاصه بالطالب",
                                    page: '/material/form-controls/student_matters'
                                },
                               
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'امور اخرى',
                                    tooltip: 'امور اخرى',
                                    page: '/material/popups-and-modals/visits_manager'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'ما يستجد من اعمال',
                                    tooltip: 'ما يستجد من اعمال',
                                    page: '/material/form-controls/new_work'
                                },
                              
                                    ],
                        },
                      
                       
                       
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'خطة الاسبوعيه/السنويه',
                            tooltip: 'خطة الاسبوعيه/السنويه',
                            page: '/material/form-controls/terms'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اجتماعات',
                            tooltip: 'اجتماعات',
                            page: '/ngbootstrap/modal'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الزيارات',
                            tooltip: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                            tooltip: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                            page: '/ngbootstrap/dropdown'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تقييم فرق الخطة الاستراتيجية',
                            tooltip: 'تقييم فرق الخطة الاستراتيجية',
                            page: '/material/navigation/sidenav'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'جدول الحصص',
                            tooltip: 'جدول الحصص',
                            page: '/material/popups-and-modals/dialog'
                        },
                       
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تعديل البيانات الشخصيه',
                            tooltip: 'تعديل البيانات الشخصيه',
                            page: '/material/form-controls/input'
                        },
                        
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الرسائل',
                            tooltip: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                       
              

                    ]

                },

                {
                    title: 'Google Material',
                    translate: 'Menu1',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon2-browser-2',
                    tooltip: 'المدير المساعد للمتابعة التعليمية',
                    pos_id:43,
                    submenu: [
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'نشره داخلية وخارجية',
                            tooltip: 'نشره داخلية وخارجية',
                            page: '/material/buttons-and-indicators/icon'
                        },
                     
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الزيارات',
                            tooltip: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تفارير مرفوعه',
                            tooltip: 'تفارير مرفوعه',
                            page: '/material/form-controls/supervisor_opinion'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اجنحه المدرسه',
                            tooltip: 'اجنحه المدرسه',
                            page: '/material/layout/tabs'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'توزيع المشرفين',
                            page: '/material/layout/stepper'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: "الصندوق المالى",
                            tooltip: "الصندوق المالى",
                            page: '/material/form-controls/financial__fund_expenses'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'رحالات',
                            tooltip: 'رحالات',
                            page: '/ngbootstrap/collapse'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الخطه اليوميه للمدير المساعد',
                            tooltip: 'الخطه اليوميه للمدير المساعد',
                            submenu: [
                               
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'الزيارات الميدانيه',
                                    tooltip: 'الزيارات الميدانيه',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'اجتماعات',
                                    tooltip: 'اجتماعات',
                                    page: '/ngbootstrap/modal'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: "امور خاصه بالطالب",
                                    tooltip: "امور خاصه بالطالب",
                                    page: '/material/form-controls/student_matters'
                                },
                               
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'امور اخرى',
                                    tooltip: 'امور اخرى',
                                    page: '/material/popups-and-modals/visits_manager'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'ما يستجد من اعمال',
                                    tooltip: 'ما يستجد من اعمال',
                                    page: '/material/form-controls/new_work'
                                },
                              
                                    ],
                        },
                                      
                       
                      
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'خطة الاسبوعيه/السنويه',
                            tooltip: 'خطة الاسبوعيه/السنويه',
                            page: '/material/form-controls/terms'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اجتماعات',
                            tooltip: 'اجتماعات',
                            page: '/ngbootstrap/modal'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الزيارات',
                            tooltip: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                            tooltip: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                            page: '/ngbootstrap/dropdown'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تقييم فرق الخطة الاستراتيجية',
                            tooltip: 'تقييم فرق الخطة الاستراتيجية',
                            page: '/material/navigation/sidenav'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'جدول الحصص',
                            tooltip: 'جدول الحصص',
                            page: '/material/popups-and-modals/dialog'
                        },
                       
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تعديل البيانات الشخصيه',
                            tooltip: 'تعديل البيانات الشخصيه',
                            page: '/material/form-controls/input'
                        },
                        
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الرسائل',
                            tooltip: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                    ]

                },

                {
                    title: 'Google Material',
                    translate: 'Menu1',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon2-browser-2',
                    tooltip: 'المدير المساعد للدعم الاداري',
                    pos_id:44,
                    submenu: [
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'نشره داخلية وخارجية',
                            tooltip: 'نشره داخلية وخارجية',
                            page: '/material/buttons-and-indicators/icon'
                        },
                     
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: ' بيانات الموظفين',
                            tooltip: ' بيانات الموظفين',
                            page: '/material/form-controls/input'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'جدول توزيع الملاحظين',
                            tooltip: 'جدول توزيع الملاحظين',
                            page: '/ngbootstrap/pagination'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اجتماع مشرفي الأجنحة',
                            tooltip: 'اجتماع مشرفي الأجنحة',
                            page: '/ngbootstrap/popover'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'متابعة الصيانة',
                            tooltip: 'متابعة الصيانة',
                            page: '/user-management/users'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'رحالات',
                            tooltip: 'رحالات',
                            page: '/ngbootstrap/collapse'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الخطه اليوميه للمدير المساعد',
                            tooltip: 'الخطه اليوميه للمدير المساعد',
                            submenu: [
                               
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'الزيارات الميدانيه',
                                    tooltip: 'الزيارات الميدانيه',
                                    page: '/material/popups-and-modals/visits'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'اجتماعات',
                                    tooltip: 'اجتماعات',
                                    page: '/ngbootstrap/modal'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: "امور خاصه بالطالب",
                                    tooltip: "امور خاصه بالطالب",
                                    page: '/material/form-controls/student_matters'
                                },
                               
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'امور اخرى',
                                    tooltip: 'امور اخرى',
                                    page: '/material/popups-and-modals/visits_manager'
                                },
                                {
                                    icon: 'flaticon2-architecture-and-city',
                                    title: 'ما يستجد من اعمال',
                                    tooltip: 'ما يستجد من اعمال',
                                    page: '/material/form-controls/new_work'
                                },
                              
                                    ],
                        },
                             
                       
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'خطة الاسبوعيه/السنويه',
                            tooltip: 'خطة الاسبوعيه/السنويه',
                            page: '/material/form-controls/terms'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اجتماعات',
                            tooltip: 'اجتماعات',
                            page: '/ngbootstrap/modal'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الزيارات',
                            tooltip: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                            tooltip: 'تشكيل فرق الخطة الاستراتيجية/شعبه تحسين الاداء',
                            page: '/ngbootstrap/dropdown'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تقييم فرق الخطة الاستراتيجية',
                            titleq: 'تقييم فرق الخطة الاستراتيجية',
                            page: '/material/navigation/sidenav'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'جدول الحصص',
                            tooltip: 'جدول الحصص',
                            page: '/material/popups-and-modals/dialog'
                        },
                       
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تعديل البيانات الشخصيه',
                            tooltip: 'تعديل البيانات الشخصيه',
                            page: '/material/form-controls/input'
                        },
                        
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الرسائل',
                            tooltip: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                    ]

                },


              
                {
                    title: 'Layout Builder',
                    translate: 'Menu1',
                    root: true,
                    icon: 'flaticon2-expand',
                    tooltip: 'سكرتارية',
                    pos_id:45,
                    //bullet: 'dot',
                    submenu: [
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'جدول الحصص',
                            tooltip: 'جدول الحصص',
                            page: '/material/popups-and-modals/dialog',
                       },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'بيانات المعلمين',
                            tooltip: 'بيانات المعلمين',
                            page: '/material/form-controls/input'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'احصائية الغياب ',
                            tooltip: 'احصائية الغياب ',
                            page: '/material/form-controls/daily_absence_stat'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'حفل مدرسي ',
                            tooltip: 'حفل مدرسي ',
                            page: '/material/form-controls/school_party'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'ندوة / محاضرة ',
                            tooltip: 'ندوة / محاضرة ',
                            page: '/material/form-controls/events'
                        },
                     
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'نشرات',
                            tooltip: 'نشرات',
                            page: '/material/buttons-and-indicators/icon'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
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
                    icon: 'flaticon2-browser-2',
                    tooltip: 'شؤون طلبة',
                    pos_id:46,
                    submenu: [
                       
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'احصائية الغياب ',
                            page: '/material/form-controls/daily_absence_stat'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اعذار الغياب',
                            page: '/material/data-table/abscence_statistics'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الانذارات',
                            page: '/material/form-controls/enzarat'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تسجيل المخالفات',
                            page: '/material/form-controls/violation_record'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الحالة السلوكية',
                            page: '/material/form-controls/behavioral_status'
                        },
                       
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تقارير مرفوعه',
                            page: '/material/form-controls/supervisor_opinion'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تقرير مجمع عن الطالب',
                            page: '/material/form-controls/behavioral_report'
                        },
                         
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اذن خروج طالب',
                            page: '/material/buttons-and-indicators/chips'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'بيانات طالب',
                            page: '/material/form-controls/select'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تسلسل الطلبة في الفصل',
                            page: '/material/data-table/table'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'توزيع الطلاب علي الفصول',
                            page: '/material/data-table/sort-header'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'نقل فردى من المدرسه للعام الحالى',
                            page: '/material/form-controls/student_transfer'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'ترك دراسه',
                            page: '/material/form-controls/student_leave'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'احصائية الغياب ',
                            page: '/material/form-controls/daily_absence_stat'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                     
                    ]



                },


                {
                    title: 'Dashboard',
                    root: true,
                    icon: 'flaticon2-browser-2',
                    //page: '/dashboard',
                    translate: 'MENU.DASHBOARD',
                    tooltip: 'اخصائي نفسي',
                    //bullet: 'dot',
                    pos_id:47,
                    submenu: [
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'بيانات عن الباحث النفسى',
                            page: '/material/form-controls/input'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'بيانات المدرسة',
                            page: '/material/popups-and-modals/bottom-sheet'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'توزيع الطلبة حسب الصفوف',
                            page: '/material/navigation/disonlevel'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'توزيع الطلبة حسب المستوى التحصيلى',
                            page: '/material/navigation/level_statistics'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'التشعيب',
                            page: '/material/navigation/branch_stat'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تغيير التشعيب',
                            page: '/material/data-table/change-branch'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'خطة عمل الباحث النفسي للفصل الدراسي',
                            page: '/material/form-controls/terms'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: "الحالات",
                            page: '/material/form-controls/status'
                        }
                        ,
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'حالات الرسوب في أسابيع',
                            tooltip: 'حالات الرسوب في أسابيع',
                            page: '/material/data-table/failure-cases'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الطلاب الفائقون دراسيا',
                            page: '/material/data-table/excellent-students'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'البيانات الاوليه و التاريخ الدراسى و الحاله الصحيه',
                            page: '/material/data-table/student_basic_data'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: "صندوق الاستفسارات النفسيه",
                            page: '/material/form-controls/mentality_inquiries'
                        },
                        
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الارشاد الجماعى',
                            page: '/material/form-controls/group_instruction'
                        }
                        ,
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الارشاد الصفى',
                            page: '/material/form-controls/class_instruction'
                        },
                      
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'التوجيهات',
                            page: '/material/form-controls/guide'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الأنشطة',
                            page: '/material/form-controls/radiobutton'
                        },
                

                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الاختبارات والمقاييس',
                            page: '/material/data-table/tests-metric'
                        },
                     
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تشكيل   الجماعات',
                            page: '/ngbootstrap/dropdown'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تشكيل المجالس',
                            page: 'material/popups-and-modals/board'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اجتماعات',
                            page: '/ngbootstrap/modal'
                        },
                     {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'المعوقات و المقترحات',
                            page: '/material/layout/suggestions'
                        },

                        {
                            icon: 'flaticon2-architecture-and-city',
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
                    icon: 'flaticon2-browser-2',
                    tooltip: 'اخصائي اجتماعي',
                    pos_id:48,
                    submenu: [
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الحالات الصحية',
                            page: '/material/form-controls/health_cases'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الباقون للاعادة',
                            page: '/material/form-controls/RestToRedo'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'المتهمون في قضايا',
                            page: '/material/form-controls/AccusedStudents'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'أبناء الشهداء',
                            page: '/material/form-controls/SonsOfMartyrs'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'شرائح طلابية أخري',
                            page: '/material/form-controls/OtherStudentSlides'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'حالات الغياب',
                            page: '/material/form-controls/absence_cases'
                        }
                        ,
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الحالات السلوكيه',
                            page: '/material/form-controls/behavioral_status'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'رأي الاخصائي الاجتماعي في تقرير حالة سلوكية والاجراء المتخذ',
                            page: '/material/form-controls/supervisor_opinion'
                        },
                      
                      
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'حالات اضطرابات الكلام',
                            page: '/material/form-controls/speaking_disorder'
                        },
                       
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'حالات الفرديه',
                            page: '/material/form-controls/IndividualCases'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الطلاب المميزون دراسيا وفي الأنشطة',
                            page: '/material/form-controls/SpecialStudents'
                        },
                        
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اجتماع جماعة',
                            page: '/ngbootstrap/modal'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تشكيل الجماعات',
                            page: '/ngbootstrap/dropdown'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'المجالس',
                            page: '/material/popups-and-modals/board'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'طلاب سيتم عرضهم علي مجلس النظام',
                            page: '/material/form-controls/RegimeCouncilStudents'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الباقون للاعادة',
                            page: '/material/form-controls/behaviour_status'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
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
                    icon: 'flaticon2-browser-2',
                    tooltip: 'تحسين الأداء',
                    pos_id:49,
                    submenu: [
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تشكيل فرق الخطة الاستراتيجية',
                            page: '/ngbootstrap/dropdown'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
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
                    icon: 'flaticon2-browser-2',
                    tooltip: 'الحارس',
                    pos_id:53,
                    submenu: [
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تعريف الزياره',
                            page: '/material/popups-and-modals/tooltip'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        }

                    ]
                },
                


                {
                    title: 'Ng-Bootstrap',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon2-digital-marketing',
                    tooltip: 'رئيس قسم',
                    pos_id:38,
                    submenu: [
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'كتابة التحضير',
                            tooltip: 'كتابة التحضير',
                            page: '/material/layout/card'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اعتماد التحضير',
                            tooltip: 'اعتماد التحضير',
                            page: '/material/buttons-and-indicators/button'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'بطاقة متابعة طالب ضعيف',
                            tooltip: 'بطاقة متابعة طالب ضعيف',
                            page: '/material/layout/list'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'بطاقة رعاية طالب متفوق',
                            tooltip: 'بطاقة رعاية طالب متفوق',
                            page: '/material/layout/divider'
                        },
                        
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الزيارات',
                            tooltip: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اعتماد غيابات/استئذانات المعلمين ',
                            tooltip: 'اعتماد غيابات/استئذانات المعلمين ',
                            page: '/material/layout/grid-list'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'ما قطع من المنهج',
                            tooltip: 'ما قطع من المنهج',
                            page: '/material/form-controls/ShowTa7diers'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اجتماعات',
                            tooltip: 'اجتماعات',
                            page: '/ngbootstrap/modal'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الأنشطة',
                            tooltip: 'الأنشطة',
                            page: '/material/form-controls/radiobutton'
                        },
                        
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'جدول الحصص',
                            tooltip: 'جدول الحصص',
                            page: '/material/popups-and-modals/dialog',
                       },
                       
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الرسائل',
                            tooltip: 'الرسائل',
                            page: '/material/form-controls/message'
                        }
                    ]
                },

                {
                    title: 'eCommerce',
                    //bullet: 'dot',
                    icon: 'flaticon2-list-2',
                    tooltip: 'معلم',
                    root: true,
                    pos_id:37,
                    submenu: [

                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'كتابة التحضير',
                            tooltip: 'كتابة التحضير',
                            page: '/material/layout/card'
                        },
                       
                       
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: ' تسجيل غياب الطلاب',
                            page: '/material/data-table/paginator'
                        },
                        
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اجتماع جماعة',
                            tooltip: 'اجتماع جماعة',
                            page: '/ngbootstrap/modal'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'بطاقة متابعة طالب ضعيف',
                            tooltip: 'بطاقة متابعة طالب ضعيف',
                            page: '/material/layout/list'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'بطاقة رعاية طالب متفوق',
                            tooltip: 'بطاقة رعاية طالب متفوق',
                            page: '/material/layout/divider'
                        },
                       
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الزيارات',
                            tooltip: 'الزيارات',
                            page: '/material/popups-and-modals/visits'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'ادخال غيابات/استئذانات المعلمين',
                            tooltip: 'ادخال غيابات/استئذانات المعلمين',
                            page: '/material/layout/grid-list-entry'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'متابعه الطلاب',
                            tooltip: 'متابعه الطلاب',
                            page: '/material/form-controls/student_tracking'
                        }
                        ,
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تفرير متابعه الطلاب  ',
                            tooltip: 'تفرير متابعه الطلاب  ',
                            page: '/material/form-controls/behavioral_status'
                        }
                        ,
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'زياره رئيس القسم  ',
                            tooltip: 'زياره رئيس القسم  ',
                            page: '/material/form-controls/teacher_opinion_visit'
                        }
                        ,
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'swot',
                            titleq: 'swot',
                            page: '/material/form-controls/swot'
                        }
                        ,
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'الرسائل',
                            tooltip: 'الرسائل',
                            page: '/material/form-controls/message'
                        }

                    ]
                },

                {
                    title: 'User Management',
                    root: true,
                    //bullet: 'dot',
                    icon: 'flaticon2-expand',
                    tooltip: 'فريق التخطيط',
                    pos_id:52,
                    submenu: [

                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تشكيل فرق الخطة الاستراتيجية',
                            page: '/ngbootstrap/dropdown'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'توزيع المشرفين',
                            page: '/material/layout/stepper'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'اجتماع جماعة',
                            page: '/ngbootstrap/modal'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'تقييم فرق الخطة الاستراتيجية',
                            page: '/material/navigation/sidenav'
                        },


                    ]
                },

                {
                    title: 'Layout Builder',
                    translate: 'Menu1',
                    root: true,
                    icon: 'flaticon2-user-outline-symbol',
                    tooltip: 'المكتبة',
                    pos_id:50,
                    //bullet: 'dot',
                    submenu: [

                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'بيانات الكتب',
                            page: '/ngbootstrap/accordion'
                        }
                        ,
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'استعارة كتاب',
                            page: '/ngbootstrap/alert'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'ارجاع كتاب',
                            page: '/ngbootstrap/buttons'
                        },
                        {
                            icon: 'flaticon2-architecture-and-city',
                            title: 'استعراض الكتب',
                            page: '/ngbootstrap/carousel'
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

