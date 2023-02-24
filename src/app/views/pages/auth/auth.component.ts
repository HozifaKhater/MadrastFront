// Angular
import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
// Layout
import { LayoutConfigService, SplashScreenService, TranslationService } from '../../../core/_base/layout';
// Auth
import { AuthNoticeService } from '../../../core/auth';
import { MatPaginator, MatSort, MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
import { NewsDataService } from '../../../Services/NewsDataService';
import { advertsDataService } from '../../../Services/advertsDataService';
import { CustomersPageRequested, ManyCustomersDeleted, CustomersStatusUpdated } from '../../../core/e-commerce';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../core/_base/crud';
import { Store, ActionsSubject } from '@ngrx/store';
import { AppState } from '../../../core/reducers';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
	selector: 'kt-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
	// Public properties
	today: number = Date.now();
	headerLogo: string;

	displayedColumns = ['news'];

	ELEMENT_DATA: Element[];
       
	dataSource: any;

	@ViewChild(MatSort, { static: true }) sort: MatSort; 
    	
	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	// Filter fields
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	selection = new SelectionModel<any>(true, []);
	customersResult: any[] = [];
	filterStatus: string = '';
	filterType: string = '';
	/**
	 * Component constructor
	 *
	 * @param el
	 * @param render
	 * @param layoutConfigService: LayoutConfigService
	 * @param authNoticeService: authNoticeService
	 * @param translationService: TranslationService
	 * @param splashScreenService: SplashScreenService
	 */
	constructor(
		private advertsDataService:advertsDataService,
		private el: ElementRef,
		private render: Renderer2,
		private layoutConfigService: LayoutConfigService,
		public authNoticeService: AuthNoticeService,
		private translationService: TranslationService,
		private splashScreenService: SplashScreenService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private store: Store<AppState>,
		private NewsDataServic : NewsDataService) 
		{
	
			this.dataSource = new MatTableDataSource([]);
		}
		adverts:any=[];
		get_news() {
			this.advertsDataService.get_adverts_for_dashboard(1,0).subscribe((data: any) => this.ELEMENT_DATA = data.data,
				error => console.log(),
				() => {
					this.dataSource.data = this.ELEMENT_DATA;
					}
				); 
		}

		/**
	 * Load Customers List from service through data-source
	 */
	loadCustomersList() {
		this.selection.clear();
        const queryParams = new QueryParamsModel(
            this.filterConfiguration(),
            this.sort.direction,
            this.sort.active,
            this.paginator.pageIndex,
            this.paginator.pageSize
           
		);

		this.dataSource.sort = this.sort;
		const searchText: string = this.searchInput.nativeElement.value;
		this.dataSource.filter = searchText;

		// Call request from server
		this.store.dispatch(new CustomersPageRequested({ page: queryParams }));
		this.selection.clear();
	}

	/**
	 * Returns object for filter
	 */
	filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;

		if (this.filterStatus && this.filterStatus.length > 0) {
			filter.status = +this.filterStatus;
		}

		if (this.filterType && this.filterType.length > 0) {
			filter.type = +this.filterType;
		}

		filter.lastName = searchText;
		if (!searchText) {
			return filter;
		}

		filter.firstName = searchText;
		filter.email = searchText;
		filter.ipAddress = searchText;
		return filter;
	}
	
	
	isArabic = false;

	ngOnInit(): void {
		this.get_news();

		let dirValue = document.getElementsByTagName('html')[0].hasAttribute('dir');
		if(dirValue){
			document.getElementsByTagName('html')[0].removeAttribute('dir');
		}

		this.translationService.setLanguage(this.translationService.getSelectedLanguage());
		this.headerLogo = this.layoutConfigService.getLogo();

		this.splashScreenService.hide();
	}

	/**
	 * Load CSS for this specific page only, and destroy when navigate away
	 * @param styleUrl
	 */
	private loadCSS(styleUrl: string) {
		return new Promise((resolve, reject) => {
			const styleElement = document.createElement('link');
			styleElement.href = styleUrl;
			styleElement.type = 'text/css';
			styleElement.rel = 'stylesheet';
			styleElement.onload = resolve;
			this.render.appendChild(this.el.nativeElement, styleElement);
		});
	}	
}
