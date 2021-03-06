import { Student } from './../../core/model/student';
import { Component, OnInit } from '@angular/core';
import { SingUpServiceService } from 'src/app/servicios/singUp/sing-up-service.service';

@Component({
  selector: 'app-profileStudent',
  templateUrl: './profileStudent.page.html',
  styleUrls: ['./profileStudent.page.scss'],
})
export class ProfileStudentPage implements OnInit {

  private student: Student = new Student();

  constructor(private signUp: SingUpServiceService) {
  }

  ngOnInit() {
  }

  save() {
    this.signUp.addStudent(this.student);
  }

}
