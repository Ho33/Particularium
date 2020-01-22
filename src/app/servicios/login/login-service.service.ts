import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoginServiceService {
  private userReg: User = {};
  private productSubscription: Subscription;
	constructor(private afAuth: AuthService, private afStore: DataService, private routesv: Router) {}

	async logout() {
		this.afAuth.setUser(this.userReg);
		this.afAuth.logOut();
		return await this.afAuth
			.logOut()
			.then(() => {
				this.routesv.navigateByUrl('/home');
			})
			.catch((err) => {
				console.log(err); //Alerta
			});
	}

	async login() {
    this.afAuth.setUser(this.userReg);
    return await this.afAuth
			.login()
			.then(() => {
        console.log(this.isTeacher())
				if (!this.isTeacher() && !this.isStudent()) {
					this.routesv.navigateByUrl('/logged-in');
				} else {
					this.routesv.navigateByUrl('/tipo-usuario');
				}
			})
			.catch((err) => {
				console.log(err); //Alerta
			});
	}
	private async isTeacher() {
    let data:string;
      this.productSubscription = this.afStore.getTeacher(this.afAuth.getCurrentUserUid()).subscribe(data => {
        data = data;
      });
      console.log(data);
    if(data != this.afAuth.getCurrentUserUid() || data != undefined){
	  return false;
    }else{return true;}
  }
  private async isStudent() {
    let data:string;
    this.productSubscription = this.afStore.getTeacher(this.afAuth.getCurrentUserUid()).subscribe(data => {
      data = data;
    });
    console.log(data);
  if(data != this.afAuth.getCurrentUserUid() || data != undefined){
  return false;
  }else{return true;}
	}

	/**
   * Getter $userReg
   * @return {User }
   */
	public get $userReg(): User {
		return this.userReg;
	}

	/**
   * Setter $userReg
   * @param {User } value
   */
	public set $userReg(value: User) {
		this.userReg = value;
	}
}
