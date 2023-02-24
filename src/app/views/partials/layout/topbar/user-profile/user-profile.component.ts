// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';
import { SignalrService } from '../../../../../Services/notificationDataService';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { messagesDataService } from '../../../../../Services/messagesDataService';
import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties
	user$: Observable<User>;

	@Input() avatar: boolean = true;
	@Input() greeting: boolean = true;
	@Input() badge: boolean;
	@Input() icon: boolean;
	@Input() placement: string;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	decoded:any;
	constructor(private messagesDataService: messagesDataService,
		private EmployeeDataService: EmployeeDataService,private store: Store<AppState>,public signalrService: SignalrService) {
	
		const userToken = localStorage.getItem(environment.authTokenKey);
		this.decoded = jwt_decode(userToken);

		signalrService.startConnection();
		signalrService.addListener();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	messages: any[];

	test(){console.log("testtttclickkkkkkkk")}
	emp_name:any="";
	ngOnInit(): void {
		this.signalrService.addListener_msg();
		this.messagesDataService.get_message_with_to_id_emails(this.decoded.id).subscribe((data:any) => this.messages = data.data,
			error => console.log(error),
			() => console.log("department dropdown", this.decoded.id,this.messages));
			this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id).subscribe((data) => {
				this.emp_name = data[0].emp_name;
				console.log("this.emp_name",data)
			},error=>console.log("erorrrrrr",error));
	
		this.user$ = this.store.pipe(select(currentUser));
		var langdir = localStorage.getItem('language')
		console.log(langdir)
	
		// console.log(this.placement)
		if (langdir =='ar')
		{
			this.placement="bottom-left"
		}
		else if (langdir =='en')
		{
			this.placement="bottom-right"
		}
		// if (langdir !== 'ar' && document.getElementsByTagName('div')[0].hasAttribute('placement')) {
		// 	document.getElementsByTagName('div')[0].setAttribute('placement', '"bottom-right');
		// } else if (langdir === 'ar' && !document.getElementsByTagName('div')[0].hasAttribute('placement')) {
		// 	document.getElementsByTagName('div')[0].setAttribute('placement', '"bottom-left');
		// }
	
	}

	/**
	 * Log out
	 */
	logout() {
		//console.log("localStorage.clear()",localStorage.key(0),localStorage)
		// localStorage.clear;
		// localStorage.setItem('language',"ar")
		this.store.dispatch(new Logout());
	}
}
