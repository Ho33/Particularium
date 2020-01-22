import { Teacher } from './../../core/model/teacher';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Student } from './../../core/model/student';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private students: AngularFirestoreCollection<String>;
	private teachers: AngularFirestoreCollection<String>;

	constructor(private afStoreSv: AngularFirestore) {
		this.students = this.afStoreSv.collection<String>('students');
		this.teachers = this.afStoreSv.collection<String>('teachers');
	}

	getTeacher(idUser: string) {
		return this.teachers.doc<String>(idUser).valueChanges();
	}

	getStudent(idUser: string) {
		return this.students.doc<String>(idUser).valueChanges();
	}

	addUserProfile(idUser: string, user: Teacher | Student) {
		return this.afStoreSv.collection('user').doc(idUser).set(Object.assign({}, user));
	}

	updateTeacherProfile(idUser: string, teacher: Teacher) {
		return this.afStoreSv
			.collection('user')
			.doc(idUser)
			.update({
				email: teacher.email
			})
			.then(function() {
				console.log('Document successfully updated!');
			});
	}

	updateStudentProfile(idUser: string, student: Student) {
		return this.afStoreSv
			.collection('user')
			.doc(idUser)
			.update({
				email: student.email
			})
			.then(function() {
				console.log('Document successfully updated!');
			});
	}

	addTeacherId(idUser: string) {
		return this.afStoreSv.collection('teachers').doc(idUser).set(Object.assign({0}, idUser));
	}

	addStudentId(idUser: string) {
		return this.afStoreSv.collection('students').doc(idUser).set(Object.assign({0}, idUser));
	}

	isTeacher(idUser: string) {
		var teachers = this.afStoreSv.collection('teachers', (ref) => ref.where(idUser, '==', 'idUser'));
		teachers
			.get()
			.toPromise()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					return doc.exists;
				});
			})
			.catch(() => {
				alert('error');
			});
	}

	isStudent(idUser: string) {
		return this.afStoreSv
			.collection('students', (ref) => ref.where('idUser', '==', idUser))
			.get()
			.toPromise()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					return true;
				});
			})
			.catch(function(error) {
				return false;
			});
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
	addDemand() {
		//to do
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
