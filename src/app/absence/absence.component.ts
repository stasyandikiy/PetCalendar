import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss']
})


export class AbsenceComponent implements OnInit {
  selectedValue: string | undefined;
  textareaControl: FormControl;

  showMe: boolean = false
  toogle(){
    this.showMe=!this.showMe
  }




  constructor() { }

  ngOnInit(): void {
    this.textareaControl = new FormControl;
    this.textareaControl.valueChanges.subscribe((value)=> console.log(value));
  }
  

}
