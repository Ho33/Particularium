import { Student } from './../../core/model/student';
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
		if (await this.afAuth.login()) {
			if (this.isTeacher() || this.isStudent()) {
				this.routesv.navigateByUrl('/logged-in');
			} else {
				this.routesv.navigateByUrl('/tipo-usuario');
			}
		}
	}

	private isTeacher(): boolean {
		let result=false;
		this.productSubscription = this.afStore.getTeacher(this.afAuth.getCurrentUserUid()).subscribe((data) => {
      console.log(this.afAuth.getCurrentUserUid());
      console.log(data.id);
			if (data.id === this.afAuth.getCurrentUserUid()) {
				result = false;
			} 
    });
    console.log(result)
		return result;
	}

	private isStudent():boolean {
		let result=false;
		this.productSubscription = this.afStore.getStudent(this.afAuth.getCurrentUserUid()).subscribe((data) => {
      console.log(this.afAuth.getCurrentUserUid());
      console.log(data.data.toString());
			if (data.data.toString() !== undefined || data.data.toString() == this.afAuth.getCurrentUserUid()) {
				result = true;
			} 
    });
    console.log(result)
		return result;
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
