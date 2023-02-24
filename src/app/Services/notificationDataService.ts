import { Injectable } from '@angular/core';
//import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { EmployeeDataService } from '../Services/EmployeeDataService';
import { NotificationModel } from '../notification-model';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
 export class SignalrService {
  public data : NotificationModel[] = [];
  public connectionId: string;
  public bradcastedData: any;
  decoded:any;
  constructor(private EmployeeDataService: EmployeeDataService) { 
    
        const userToken = localStorage.getItem(environment.authTokenKey);
		this.decoded = jwt_decode(userToken);
  }

  private hubConnection: signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:44337/Notify',{ skipNegotiation: true,
                              transport: signalR.HttpTransportType.WebSockets})
                              .build();
      this.hubConnection
        .start()
        .then(() => {
            console.log('Connection started');
            this.getConnectionId()
        })
        .catch(err => console.log('Error while starting connection: ' + err))
        this.hubConnection.onclose((d)=>{
          this.hubConnection
        .start()
        .then(() => {
            console.log('Connection started');
            this.getConnectionId()
        })
        .catch(err => console.log('Error while starting connection: ' + err))
        })
    }
    
    public addListener = () => {
      this.hubConnection.on('GeneralNotification', (res : NotificationModel) => {
        console.log('Notification Model', res);
        this.data.push(res);
      });
    }
    public addListener_msg = () => {
      this.hubConnection.on('GeneralMessage', (res : NotificationModel) => {
        console.log('Notification Model', res);
        this.data.push(res);
      });
    }

    public addListener2 = () => {
      this.hubConnection.on('SaveConnectionId', (connId) => {
        
      });
    }

    private getConnectionId = () => {
      console.log("connectionfunction")
      var userId = this.decoded.id;
      console.log("userId",userId)
      this.hubConnection.invoke('getconnectionid')
      .then((data) => {
        console.log("connection id",data);
        this.connectionId = data;
        this.EmployeeDataService.update_emp_def_connection_id({emp_id:userId, connection_id:data}).subscribe(res => {			
        })
      });
    }
}
