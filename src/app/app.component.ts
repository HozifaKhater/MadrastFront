import { Subscription } from 'rxjs';
// Angular
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// Layout
import { LayoutConfigService, SplashScreenService, TranslationService } from './core/_base/layout';

// language list
import { locale as enLang } from './core/_config/i18n/en';
import { locale as chLang } from './core/_config/i18n/ch';
import { locale as esLang } from './core/_config/i18n/es';
import { locale as jpLang } from './core/_config/i18n/jp';
import { locale as deLang } from './core/_config/i18n/de';
import { locale as frLang } from './core/_config/i18n/fr';
import { locale as arLang } from './core/_config/i18n/ar';
import { SignalrService } from './Services/notificationDataService';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
	// Public properties
	title = 'Metronic';
	loader: boolean;
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param translationService: TranslationService
	 * @param router: Router
	 * @param layoutConfigService: LayoutCongifService
	 * @param splashScreenService: SplashScreenService
	 */
	 public dir: string;
	 decoded:any;
	constructor( 
		private translationService: TranslationService,
				private router: Router,
				private layoutConfigService: LayoutConfigService,
				private splashScreenService: SplashScreenService) {
					
					this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang, arLang);
							var langdir = localStorage.getItem('language')
		console.log(langdir)
		// register translations
		//this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang, arLang);
// 		var langdir = localStorage.getItem('language')
// 		console.log(langdir)
// if (langdir='en'){
// 	this.translationService.loadTranslations(enLang);
// 	document.getElementsByTagName('html')[0].removeAttribute('dir');
// }
// 	else if(langdir='ar'){
// 		this.translationService.loadTranslations(arLang);
// 		document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
// 	}
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
	// 	this.signalRService.startConnection();
    // this.signalRService.addReceiveMessageListener();
	
	//this.SignalrService.addTransferChartDataListener();
	//this.SignalrService.addBroadcastChartDataListener();  
	//this.SignalrService.broadcastChartData(); 
		// enable/disable loader
		this.loader = this.layoutConfigService.getConfig('loader.enabled');

		const routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				// hide splash screen
				this.splashScreenService.hide();

				// scroll to top on every route change
				window.scrollTo(0, 0);

				// to display back the body content
				setTimeout(() => {
					document.body.classList.add('kt-page--loaded');
				}, 500);
			}
		});
		this.unsubscribe.push(routerSubscription);
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}

	
}
