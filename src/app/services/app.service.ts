import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Attendance, AttendanceList, Attendee } from '../interfaces/asitencia.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  _attendence: Attendance[] = [];
  attendance: any[] = [
    {
      date: '12/12/2022',
      attendees: [{
        name: 'Pedro'
      },
      {
        name: 'Pedro'
      },{
        name: 'Pedro'
      },
      {
        name: 'Pedro'
      }]
    },
    {
      date: '13/12/2022',
      attendees: [{
        name: 'Pedro'
      },
      {
        name: 'Pedro'
      },{
        name: 'Pedro'
      },
      {
        name: 'Pedro'
      }]
    },
  ]

  user: User = {
    userName: '',
    password: '',
    email: '',
    userType: ''
  }
  constructor(private storage: Storage, private router: Router, private toastCtrl: ToastController) { }


  registrarAsistencia(attendence: Attendance) {
    this.storage.get('attendance').then( async (resp: AttendanceList[]) => {
      if(resp != null) {
        let atten = resp.filter( f => `${f.date.getDay()}/${f.date.getMonth()}/${f.date.getFullYear()}/` === `${attendence.date.getDay()}/${attendence.date.getMonth()}/${attendence.date.getFullYear()}/`);
        if(atten.length > 0){
          const newAttendenceList = resp.map( att =>{
            if(`${att.date.getDay()}/${att.date.getMonth()}/${att.date.getFullYear()}/` === `${attendence.date.getDay()}/${attendence.date.getMonth()}/${attendence.date.getFullYear()}/`){
              const exists = att.attendees.find(f => f === attendence.name);
              console.log(attendence.name);
              if(!exists){
                att.attendees.push(attendence.name);
              }
              console.log(att);
            }
            return att;
          })
          console.log(newAttendenceList);
          this.storage.get(attendence.asignature).then( resp => {
            if(resp){
              this.storage.set(attendence.asignature,newAttendenceList) 
            }
          })
        }else{
          let attendenceList: AttendanceList[] = [];
          const attendee: AttendanceList = {
            date: attendence.date,
            attendees: [attendence.name]
          };
          if(resp.length > 0){
            attendenceList = resp;
          }
          attendenceList.push(attendee);
          this.storage.get(attendence.asignature).then( resp => {
            if(resp){
              this.storage.set(attendence.asignature,attendenceList) 
            }
          })   
        }
      }
      else {
        let attendenceList: AttendanceList[] = [];
          const attendee: AttendanceList = {
            date: attendence.date,
            attendees: [attendence.name]
          };
          attendenceList.push(attendee);
          this.storage.get(attendence.asignature).then( resp => {
            console.log(resp)
            if(resp){
              this.storage.set(attendence.asignature,attendenceList)   
            }
          })
      }
      
      this.presentToast('Asistencia registrada correctamente');
    });

  } 

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
    })
    toast.present();
  }

  async getAttendenceList(attendanceListName: string) {
    let attendanceList: AttendanceList[] = [];
    await this.storage.get(attendanceListName).then( resp => attendanceList = resp );
    return attendanceList;
  }


  async logOut(){
    await this.storage.remove('loggedIn');
    await this.storage.remove('loggedUser');
    // this.router.navigate(['/login']);
  }
}
