// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';
import { MenuConfig } from 'src/app/core/_config/menu.config';
import { environment } from './../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MenuAsideService {
	// Public properties
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	decoded :any;
	/**
	 * Service constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 */
	constructor(private menuConfigService: MenuConfigService,private http:HttpClient) {
		this.loadMenu();
		//console.log("zzz", this.loadMenu() )
	}

	/**
	 * Load menu list
	 */

	allItems:any[]=[]
	loadMenu() {
		this.allItems = this.menuConfigService.asideItems;
		this.getSecurity();
		// get menu list
		// if(this.menuConfigService.pos_id > 0){
		//const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'aside.items');
		//this.menuList$.next(menuItems)
		//	}
		// else{
		// 	this.GetAllEmployee_with_id(this.decoded.id).subscribe(data => {this.pos_id=data[0].emp_pos_id},
		// 		error => console.log(error),
		// 		() => {	  
		// 			const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'aside.items');
		// 			this.menuList$.next(menuItems)
		// 	})
		// }
		// console.log("reduce",menuItems.flat());

		//  console.log("menulist$", this.menuList$.value.flat());
	}

	getSecurity() {
		const userToken = localStorage.getItem(environment.authTokenKey);
		this.decoded = jwt_decode(userToken);
	
		this.http.get('https://localhost:44337/api/employee/id?id=' + this.decoded.id).subscribe({
		  next: (result: any[]) => {
			debugger;
			var employee = result[0];
			if (employee && employee.emp_pos_id) {
			  var posId = employee.emp_pos_id as number;
			  var userItems = this.allItems.filter(x=>x.pos_id == posId);
			  this.menuList$.next(userItems)
			}
		  },
		  error: (err) => {
			alert(err.message);
		  }
		});
	  }


	// getMenus() {
	// 		const asideItems = this.menuConfig.aside.items;
	// 		const submenus = asideItems.reduce((acc, item) => {
	// 			if (item.submenu && item.category === 5) {
	// 				acc.push(...item.submenu);
	// 			}
	// 			return acc;
	// 		}, []);
	// 		const menuItems = asideItems.filter(item => item.category === 5);
	// 		menuItems.forEach(menuItem => {
	// 			menuItem.submenu = submenus.filter(submenuItem => submenuItem.parentId === menuItem.id);
	// 		});
	// 		this.result = [...menuItems, ...submenus.filter(submenuItem => !submenuItem.parentId)];
	// 		this.menuConfig.aside.items = this.result;
	// 		console.log("menu", this.result, this.menuConfig);
	// 		return this.menuConfig;
	// }

}
