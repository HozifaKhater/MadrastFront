// Angular
import { ChangeDetectorRef, Injectable } from '@angular/core';
// RxJS
import { Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable()
export class MenuConfigService {
	// Public properties
	onConfigUpdated$: Subject<any>;
	// Private properties
	private menuConfig: any;

	/**
	 * Service Constructor
	 */
	perm:any[];
	menuRoutes:any[];
	decoded:any;
	pos_id:number=37;
	public asideItems : any[] = [];
	constructor(private http?: HttpClient) {
		// register on config changed event and set default config
		this.onConfigUpdated$ = new Subject();

		  const userToken = localStorage.getItem(environment.authTokenKey);
        this.decoded = jwt_decode(userToken);
        this.get_emp_user_privliges_menus_route(this.decoded.id).subscribe(data => this.perm = data,
			error => console.log(error),
			() => {console.log("this.decoded.id",this.decoded.id),this.menuRoutes = this.perm.map(item => item.menu_route);
		
		})

		this.GetAllEmployee_with_id(this.decoded.id).subscribe(data => { this.pos_id=Number(data[0].emp_pos_id)},
			error => console.log(error),
			() => {	  
				this.getMenus();
		})
	}

	/**
	 * Returns the menuConfig
	 */
	GetAllEmployee_with_id(val: any): Observable<any[]> {
        
        return this.http.get<any>('https://localhost:44337/api/employee/id?id=' + val);
    } 
    get_emp_user_privliges_menus_route(val: any): Observable<any[]> {
        
        return this.http.get<any>('https://localhost:44337/api/login/get_emp_user_privliges_menus_route?id=' + val);
    }
	result :any;
	getMenus() {
		if (this.pos_id < 1){
			this.GetAllEmployee_with_id(this.decoded.id).subscribe(data => {this.pos_id=data[0].emp_pos_id},
				error => console.log(error),
				() => {	 
					
					if (this.menuConfig.aside && this.menuConfig.aside.items ) {
						const asideItems = this.menuConfig.aside.items;
						const submenus = asideItems.reduce((acc, item) => {
						  
						  if (item.submenu && item.pos_id === this.pos_id) {
							  console.log("testtttzzz",this.pos_id)
						  
							acc.push(...item.submenu);
						  }
						  return acc;
						}, []);
						const menuItems = asideItems.filter(item => {
						  if (this.pos_id == 0)
						  {this.getMenus();}
						  item.pos_id === this.pos_id});
						menuItems.forEach(menuItem => {
						  menuItem.submenu = submenus.filter(submenuItem => submenuItem.parentId === menuItem.id);
						});
						this.result = [...menuItems, ...submenus.filter(submenuItem => !submenuItem.parentId)];
						this.result = this.result.filter((item, index) => index !== 0);
						this.menuConfig.aside.items = this.result;
						console.log("menu", this.result, this.menuConfig);
						return this.menuConfig;
					  } 
			})
		}
		else{
			if (this.menuConfig.aside && this.menuConfig.aside.items ) {
				const asideItems = this.menuConfig.aside.items;
				const submenus = asideItems.reduce((acc, item) => {
				  
				  if (item.submenu && item.pos_id === this.pos_id) {
					  console.log("testttt",this.pos_id)
				  
					acc.push(...item.submenu);
				  }
				  return acc;
				}, []);
				
				const menuItems = asideItems.filter(item => item.pos_id === this.pos_id);
				menuItems.forEach(menuItem => {
				  menuItem.submenu = submenus.filter(submenuItem => submenuItem.parentId === menuItem.id);
				});
				this.result = [...menuItems, ...submenus.filter(submenuItem => !submenuItem.parentId)];
				this.result = this.result.filter((item, index) => index !== 0);
				this.menuConfig.aside.items = this.result;
				console.log("menu", this.result, this.menuConfig);
				return this.menuConfig;
			  }
		}
		
	  }
	  
	// getMenus() {
	// 	if (this.menuConfig.aside && this.menuConfig.aside.items) {
	// 	  const asideItems = this.menuConfig.aside.items;
	// 	  const submenus = asideItems.reduce((acc, item) => {
	// 		if (item.submenu && item.category === 5) {
	// 		  acc.push(...item.submenu);
	// 		}
	// 		return acc;
	// 	  }, []);
	// 	  const menuItems = asideItems.filter(item => item.category === 5);
	// 	  menuItems.forEach(menuItem => {
	// 		menuItem.submenu = submenus.filter(submenuItem => submenuItem.parentId === menuItem.id);
	// 	  });
	// 	  this.result = [...menuItems, ...submenus.filter(submenuItem => !submenuItem.parentId)];
	// 	  this.menuConfig.aside.items = this.result;
	// 	  console.log("menu", this.result, this.menuConfig);
	// 	  return this.menuConfig;
	// 	}
	//   }
	  
	  
	  
	  
	  

	/**
	 * Load config
	 *
	 * @param config: any
	 */
	loadConfigs(config: any) {
        this.menuConfig = config;
		this.asideItems = this.menuConfig.aside.items;
        this.onConfigUpdated$.next(this.menuConfig);
      //  console.log("confiiiiiiiiig", config, this.menuConfig, this.onConfigUpdated$)
	}
}
