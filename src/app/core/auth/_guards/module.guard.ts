// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Module reducers and selectors
import { AppState} from '../../../core/reducers/';
import { currentUserPermissions } from '../_selectors/auth.selectors';
import { Permission } from '../_models/permission.model';
import { find } from 'lodash';
// Angular
// RxJS
import { Subject } from 'rxjs';
import { environment } from '../../../../../src/environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ModuleGuard implements CanActivate {

    perm:any[];
	menuRoutes:any[];
	decoded:any;

    constructor(private store: Store<AppState>, private router: Router,private http?: HttpClient) {
        
     }
     get_emp_user_privliges_menus_route(val: any): Observable<any[]> {
        
        return this.http.get<any>('https://localhost:44337/api/login/get_emp_user_privliges_menus_route?id=' + val);
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const userToken = localStorage.getItem(environment.authTokenKey);
        this.decoded = jwt_decode(userToken);
        const moduleName = state.url as string;
        return this.get_emp_user_privliges_menus_route(this.decoded.id).pipe(
          map(data => {
            this.perm = data;
            
            this.menuRoutes = this.perm.map(item => item.menu_route);
            this.menuRoutes.push("/dashboard")
            this.menuRoutes.push("/material/data-table/abscence_statistics")
            this.menuRoutes.push("/material/form-controls/RestToRedo")
            if (this.menuRoutes.includes(moduleName)) {
              return true;
            } else {
              this.router.navigate(['/dashboard']);
              return false;
            }
          }),
          catchError(error => {
            return of(false);
          })
        );
      }
      
   // moduleName:string;
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        
	// 	  const userToken = localStorage.getItem(environment.authTokenKey);
    //       this.decoded = jwt_decode(userToken);
    //       const moduleName = state.url as string;
    //       this.get_emp_user_privliges_menus_route(this.decoded.id).subscribe(
    //         data => {
    //           this.perm = data;
    //           this.menuRoutes = this.perm.map(item => item.menu_route);
    //           console.log("this.perm ",this.menuRoutes )
    //           if (this.menuRoutes.includes(moduleName)) {
    //             console.log("allowed",moduleName)
    //             return of(true);
    //           } else {
    //             console.log("not allowed",moduleName)
    //             //this.router.navigate(['/dashboard']);
    //             return of(false);
    //           }
    //         },
    //         error => console.log(error)
    //       );
     
    //   }
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {

    //     const moduleName = route.data['moduleName'] as string;
    //     if (!moduleName) {
    //         return of(false);
    //     }

    //     return this.store
    //         .pipe(
    //             select(currentUserPermissions),
    //             map((permissions: Permission[]) => {
    //                 const _perm = find(permissions, (elem: Permission) => {
    //                     return elem.title.toLocaleLowerCase() === moduleName.toLocaleLowerCase();
    //                 });
    //                 return _perm ? true : false;
    //             }),
    //             tap(hasAccess => {
    //                 if (!hasAccess) {
    //                     this.router.navigateByUrl('/error/403');
    //                 }
    //             })
    //         );
    // }
}
