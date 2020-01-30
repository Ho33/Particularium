import { Student } from './../../core/model/student';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable({
	providedIn: 'root'
})
export class LoginServiceService {
	private userReg: User = {};
	private result: boolean = false;
	private uIdSubscription: Subscription;
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
		if (await this.afAuth.login()) {
			this.isMember();
		}
	}

	isMember() {
		this.afStore.isMember(this.afAuth.getCurrentUserUid()).then((data)=>{
			if (data) {
				this.routesv.navigateByUrl('/logged-in');
			}else{
				this.routesv.navigateByUrl('/tipo-usuario');
			}
		});
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
