import { Teacher } from './../../core/model/teacher';
import { Student } from './../../core/model/student';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data/data.service';

@Injectable({
	providedIn: 'root'
})
export class SingUpServiceService {
	private userReg: User = {};

	constructor(
		private afAuth: AuthService,
		private afStore: DataService,
		public alert: AlertController,
		private routesv: Router
	) {}

	async register() {
		this.afAuth.setUser(this.userReg);
		return await this.afAuth
			.register()
			.then(() => {
				this.showAlert('Welcome', 'Sign Up successfully!!');
				this.routesv.navigateByUrl('/tipo-usuario'); //Siguiente registro
			})
			.catch((err) => {
				console.log(err); //Alerta
			});
	}

	async addStudent(student: Student) {
		student.email=this.userReg.email;
		student.password=this.userReg.password;
		this.afAuth.setUser(this.userReg);
		return await this.afStore
			.addUserProfile(this.afAuth.getCurrentUserUid(), student)
			.then(() => {
				this.routesv.navigateByUrl('/logged-in'); //Siguiente registro
			})
			.catch((err) => {
				console.log(err); //Alerta
			});
	}

	async addTeacher(teacher: Teacher) {
		teacher.email=this.userReg.email;
		teacher.password=this.userReg.password;
		this.afAuth.setUser(this.userReg);
		return await this.afStore
			.addUserProfile(this.afAuth.getCurrentUserUid(), teacher)
			.then(() => {
				this.routesv.navigateByUrl('/logged-in'); //Siguiente registro
			})
			.catch((err) => {
				console.log(err); //Alerta
			});
	}

	async addStudentId() {
		this.afAuth.setUser(this.userReg);
		console.log(this.userReg);
		return await this.afStore
			.addStudentId(this.afAuth.getCurrentUserUid())
			.then(() => {
				this.routesv.navigateByUrl('/profileStudent'); //Siguiente registro
			})
			.catch((err) => {
				console.log(err); //Alerta
			});
	}
	async addTeacherId() {
		return await this.afStore
			.addTeacherId(this.afAuth.getCurrentUserUid())
			.then(() => {
				this.routesv.navigateByUrl('/profileTeacher'); //Siguiente registro
			})
			.catch((err) => {
				console.log(err); //Alerta
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
	async showAlert(header: string, message: string) {
		const alert = await this.alert.create({
			header,
			message,
			buttons: [ 'OK' ]
		});
		await alert.present();
	}
}
