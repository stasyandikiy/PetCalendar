import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { AbsenceSchedule } from '../shared/Absence';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss']
})


export class AbsenceComponent implements OnInit {
  selectedValue: string | undefined;
  textareaControl: FormControl;
  dateBefore = new FormControl('');
  dateAfter = new FormControl('');

  showMe: boolean = false;
  toogle(){
    this.showMe=!this.showMe;
  }

   submitAbsence() {
    let dateEndAbs = moment(this.dateAfter.value);
    let dateStartAbs = moment(this.dateBefore.value);
    let dateSelect = (dateEndAbs.diff(dateStartAbs, 'days'));//Количество дней отгула
    

    if(dateSelect > -1/* && dateSelect < 10*/){
      let allDate = [];
      let temporaryDate;

      for(let i = 1; i < dateSelect+2; i++){
        let countDay = (dateStartAbs.diff(moment(), 'days'));//кол-дней для прибавления к текущей даты и определения числа начала отгула
        temporaryDate = moment().add('days', countDay+i);
        let keyDate = temporaryDate.format( 'DD MM YYYY' );
        allDate.push(keyDate);
      }//Добавление дат в массив дат которые выбраны

      allDate.forEach(key=>{
        AbsenceSchedule[key] = this.selectedValue;
      })
     
    }
  }

  ngOnInit(): void {
    this.textareaControl = new FormControl;
    this.textareaControl.valueChanges.subscribe((value)=> console.log(value));
  }
  

}
