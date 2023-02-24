// Angular
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SignalrService } from '../../../../../Services/notificationDataService';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { messagesDataService } from '../../../../../Services/messagesDataService';
import { ta7dier_masterDataService } from '../../../../../Services/Ta7dier_masterDataService';
import { EzonDataService } from '../../../../../Services/EzonDataService';
import { Group_meetingDataService } from '../../../../../Services/Group_meetingDataService';

import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
@Component({
	selector: 'kt-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['notification.component.scss']
})
export class NotificationComponent {

	// Show dot on top of the icon
	@Input() dot: string;

	// Show pulse on icon
	@Input() pulse: boolean;

	@Input() pulseLight: boolean;

	// Set icon class name
	@Input() icon: string = 'flaticon2-bell-alarm-symbol';
	@Input() iconType: '' | 'success';

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	// Set bg image path
	@Input() bgImage: string;

	// Set skin color, default to light
	@Input() skin: 'light' | 'dark' = 'light';

	@Input() type: 'brand' | 'success' = 'success';

	/**
	 * Component constructor
	 *
	 * @param sanitizer: DomSanitizer
	 */
	decoded:any;
	messages: any[];
	constructor(
		private EzonDataService:EzonDataService,
		private Group_meetingDataService:Group_meetingDataService,
		private ta7dier_masterDataService:ta7dier_masterDataService,
		private router:Router,private sanitizer: DomSanitizer,private messagesDataService: messagesDataService,
		private EmployeeDataService: EmployeeDataService,public signalrService: SignalrService) {
	
		const userToken = localStorage.getItem(environment.authTokenKey);
		this.decoded = jwt_decode(userToken);

		signalrService.startConnection();
		signalrService.addListener();
	}
	subjects_info:any=[];
	id:any;
	test(message:any){
	if (message.title=="تحضيرات")
	{
		console.log("message",message)
		this.ta7dier_masterDataService.ta7dier_id = message.object_id	;
		this.ta7dier_masterDataService.GetAllTa7dier_master_with_id(message.object_id).subscribe(data => this.subjects_info = data,
			error => console.log(),
			() => {
				for (let item of this.subjects_info) {
					this.ta7dier_masterDataService.emp_id = item.emp_id;
					this.ta7dier_masterDataService.emp_name = item.emp_name;
					this.ta7dier_masterDataService.subject_id = item.subject_id;
					this.ta7dier_masterDataService.subject_name = item.subject_name;
					this.ta7dier_masterDataService.grade_id = item.grade_id;
					this.ta7dier_masterDataService.grade_name = item.grade_name;
					this.ta7dier_masterDataService.ta7dier_date = item.ta7dier_date;
					this.ta7dier_masterDataService.ta7dier_week = item.ta7dier_week;
					this.ta7dier_masterDataService.ta7dier_day = item.ta7dier_day;
					this.ta7dier_masterDataService.ta7dier_state_id = item.ta7dier_state_id;
					this.ta7dier_masterDataService.state_name = item.state_name;
					this.ta7dier_masterDataService.ta7dier_name = item.ta7dier_name;
					this.ta7dier_masterDataService.ta7dier_body = item.ta7dier_body;
					this.ta7dier_masterDataService.ta7dier_notes = item.ta7dier_notes;
					this.ta7dier_masterDataService.ta7dier_supervision_state_id = item.ta7dier_supervision_state_id;
					this.ta7dier_masterDataService.ta7dier_supervision_state_name = item.ta7dier_supervision_state_name;
					this.ta7dier_masterDataService.ta7dier_state_name = item.ta7dier_state_name;
					this.ta7dier_masterDataService.ta7dier_file = item.ta7dier_file;
				};
				console.log('Component A is clicked!!', this.ta7dier_masterDataService.ta7dier_id);
				//this.ta7dier_masterDataService.AClicked('Component A is clicked!!');
			}
		);
		
		this.ta7dier_masterDataService.AClicked("")
		this.router.navigate(['/material/layout/card_not',message.object_id]);
		console.log("تحضيرات",message)
	}
	if (message.title=="اذونات")
	{
		console.log("message",message)
		this.EzonDataService.ezn_id = Number(message.object_id);
		this.EzonDataService.GetAllEzon_with_id(message.object_id).subscribe(data => this.subjects_info = data,
			error => console.log(),
			() => {
				for (let item of this.subjects_info) {
					
					this.EzonDataService.absent_ezn_id = item.absent_ezn_id;
					this.EzonDataService.premit_id = item.premit_id;
					this.EzonDataService.emp_id = item.emp_id;
					this.EzonDataService.ezn_date = item.ezn_date;
					this.EzonDataService.ezn_reason = item.ezn_reason;
					this.EzonDataService.time_from = item.time_from;
					this.EzonDataService.time_to = item.time_to;
					this.EzonDataService.ezn_state = item.ezn_state;
				};
				this.EzonDataService.AClicked('Component A is clicked!!');
			}
		);
		
		this.EzonDataService.AClicked("")
		this.router.navigate(['/material/layout/grid-list-entry_not',message.object_id]);
		console.log("تحضيرات",message)
	}
	if (message.title=="رسائل")
	{
		console.log("message",message)
		this.messagesDataService.msg_id=message.object_id;
		this.messagesDataService.get_messages_emails_to_emp_id_with_msg_id(message.object_id).subscribe((data:any) => this.subjects_info = data.data,
			error => console.log("errorrrrrrrrrrr"),
			() => {
				console.log("this.subjects_info",this.subjects_info)
				for (let item of this.subjects_info) {
					this.messagesDataService.from_emp_id = item.from_emp_id;
					this.messagesDataService.title = item.title;
					this.messagesDataService.body = item.body;
					this.messagesDataService.date = item.date;
					this.messagesDataService.reply = item.reply;
				   
				   

				};
				console.log('Component A is clicked!!', this.messagesDataService);
				this.messagesDataService.AClicked('Component A is clicked!!');
			}
		);
		
		this.messagesDataService.AClicked("")
		this.router.navigate(['/material/form-controls/message_not',message.object_id]);
		console.log("تحضيرات",message)
	}
	if (message.title=="اجتماعات")
	{
		console.log("message",message)
		this.Group_meetingDataService.group_id=message.object_id;
		this.Group_meetingDataService.GetAllGroup_meeting_with_id(message.object_id).subscribe(data => this.subjects_info = data,
			error => console.log("errorrrrrrrrrrr"),
			() => {
				for (let item of this.subjects_info) {
					
					this.Group_meetingDataService.group_name = item.group_name;
					this.Group_meetingDataService.meeting_no = item.meeting_no;
					this.Group_meetingDataService.meeting_date = item.meeting_date;
					this.Group_meetingDataService.meeting_mem_no = item.meeting_mem_no;
					this.Group_meetingDataService.meeting_loc = item.meeting_loc;
					this.Group_meetingDataService.impor_recomm = item.impor_recomm;
					this.Group_meetingDataService.bus_table = item.bus_table;
		
				};
				console.log('Component A is clicked!!', this.Group_meetingDataService.group_id);
				this.Group_meetingDataService.AClicked('Component A is clicked!!');
			}
		);
		this.Group_meetingDataService.AClicked("")
		this.router.navigate(['/ngbootstrap/modal_not',message.object_id]);
		console.log("تحضيرات",message)
	}
	}
	ngOnInit(): void {
		this.messagesDataService.get_message_with_to_id(this.decoded.id).subscribe((data:any) => this.messages = data.data,
			error => console.log(error),
			() => console.log("messages", this.decoded.id,this.messages));
	}
	backGroundStyle(): string {
		if (!this.bgImage) {
			return 'none';
		}

		return 'url(' + this.bgImage + ')';
	}
}
