// Angular
import { AfterViewInit, Component, OnInit } from '@angular/core';
// Layout
import { LayoutConfigService, ToggleOptions } from '../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
import { Logo_converterDataService } from '../../../Services/Logo_converterDataService';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
	selector: 'kt-brand',
	templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit, AfterViewInit {
	// Public properties
	headerLogo: string;
	headerStickyLogo: string;

	toggleOptions: ToggleOptions = {
		target: 'body',
		targetState: 'kt-aside--minimize',
		togglerState: 'kt-aside__brand-aside-toggler--active'
	};

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 * @param htmlClassService: HtmlClassService
	 */


	src: any;

	constructor(private layoutConfigService: LayoutConfigService, public htmlClassService: HtmlClassService, private Logo_converterDataService: Logo_converterDataService,
		private sanitizer: DomSanitizer) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
     hidden = true;
	ngOnInit(): void {
        console.log("srccccccccccccc", this.src);
        //if (this.Logo_converterDataService.logo === "") {
        //    (<HTMLImageElement>document.getElementById("logo_image")).style.display = "none";
        //    console.log("noneeeeeeeee");
        //}
       
		this.Logo_converterDataService.aClickedEvent
			.subscribe((data: string) => {
				console.log("edited");
              //  this.src = String(this.Logo_converterDataService.logo);
                (<HTMLImageElement>document.getElementById("site_logo")).src = String(this.Logo_converterDataService.logo);
                (<HTMLImageElement>document.getElementById("site_logo")).style.display = "normal";
                //(<HTMLImageElement>document.getElementById("site_logo")).style.display = "none";
				console.log(this.src);
			});
		this.src = this.src;

		this.headerLogo = this.layoutConfigService.getLogo();
		this.headerStickyLogo = this.layoutConfigService.getStickyLogo();
	}

	/**
	 * On after view init
	 */
	ngAfterViewInit(): void {
	}
}
