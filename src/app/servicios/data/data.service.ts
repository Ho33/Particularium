import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Student } from './../../core/model/student';
import { Teacher } from './../../core/model/teacher';
import { User } from './../../interfaces/User';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private students: AngularFirestoreCollection<User>;
	private teachers: AngularFirestoreCollection<User>;
	private users: AngularFirestoreCollection<unknown>;
	private resultTeacher: boolean = false;
	private resultStudent : boolean = false;
	private _isMemberSubscription: Subscription;

	constructor(private afStoreSv: AngularFirestore) {
		this.students = this.afStoreSv.collection<User>('students');
		this.teachers = this.afStoreSv.collection<User>('teachers');
		this.users = this.afStoreSv.collection<unknown>('user');
	}
	 async isMember(idUser: string) {
		 this.resultTeacher = false;
		 await this.getTeacher(idUser).then((data)=>{
			 console.log(data);
			this.resultTeacher = data;
		});
		 await this.getStudent(idUser).then((data)=>{
			console.log(data);
			this.resultStudent = data;
		});
		
		console.log("isTeacher",this.resultTeacher , "isStudent", this.resultStudent);
		 if (this.resultTeacher || this.resultStudent) {
			return true;
		} else {
			return false;
		}
	}

	async getTeacher(idUser: string):Promise<boolean> {
		return await new Promise((resolve, reject) => {
			this.teachers.doc<User>(idUser).valueChanges().subscribe((data) => {
				if (!isNullOrUndefined(data)) {
					console.log('data student', data.email);
					resolve(true);
				}else{
					resolve(false);
				}
			}, reject);
		});
	}

	async getStudent(idUser: string):Promise<boolean> {
		return await new Promise((resolve, reject) => {
			this.students.doc<User>(idUser).valueChanges().subscribe((data) => {
				if (!isNullOrUndefined(data)) {
					console.log('data student', data.email);
					resolve(true);
				}else{
					resolve(false);
				}
			}, reject);
		});
	}

	addUserProfile(idUser: string, user: Teacher | Student) {
		return this.afStoreSv.collection('user').doc(idUser).set(Object.assign({}, user));
	}

	async updateTeacherProfile(idUser: string, teacher: Teacher) {
		return this.afStoreSv
			.collection('user')
			.doc(idUser)
			.update(
				{
				name: teacher.name,
				lastName : teacher.lastname,
				phone : teacher.$phone,
				email : teacher.email,
				password: teacher.password,
				location : teacher.location
				}
			)
			.then(function() {
				console.log('Document successfully updated!');
			});
	}

	async updateStudentProfile(idUser: string, student: Student) {
		return this.afStoreSv
			.collection('user')
			.doc(idUser)
			.update({
				name: student.name,
				lastName : student.lastname,
				email : student.email,
				password: student.password,
				location : student.location
			})
			.then(function() {
				console.log('Document successfully updated!');
			});
	}

	addTeacherId(idUser: string) {
		let user: User = {};
		user.email = idUser;
		return this.afStoreSv.collection('teachers').doc(idUser).set(user);
	}

	addStudentId(idUser: string) {
		let user: User = {};
		user.email = idUser;
		return this.afStoreSv.collection('students').doc(idUser).set(user);
	}

	

	getProfile(idUser: string) {
		let user = this.afStoreSv.collection('user').doc(idUser).get();
		return user
			.toPromise()
			.then((doc) => {
				if (doc.exists) {
					return doc.data();
					console.log('Document data:', doc.data());
				} else {
					// doc.data() will be undefined in this case
					console.log('No such document!');
				}
			})
			.catch(function(error) {
				console.log('Error getting document:', error);
			});
	}
	
	addDemand(idUser:string) {
		
	}
	getDemand() {
		//to do
	}
	getAllDemands() {
		//to do
	}
	addOffer() {
		//to do
	}
	getOffer() {
		//to do
	}
	getAllOffers() {
		//to do
	}
}
