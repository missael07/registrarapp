import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { AttendanceList } from '../interfaces/asitencia.interface';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.page.html',
  styleUrls: ['./attendance-list.page.scss'],
})
export class AttendanceListPage implements OnInit {

  attendance: AttendanceList[] = [
  ]
  asignatureName: string = '';
  constructor(private service: AppService, private storage: Storage) {
    storage.get('loggedUser').then( resp => {
      if(resp){
        this.asignatureName = resp.asignature;
        this.service.getAttendenceList(resp.asignature).then(resp => this.attendance = resp);
      }
    })
  }

  ngOnInit() {
  }

}
