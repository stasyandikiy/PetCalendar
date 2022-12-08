import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../shared/date.service';
import { Task, TasksService } from '../shared/tasks.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  form: FormGroup
  tasks: Task[] = []

  constructor(public dateService: DateService,
      public tasksService: TasksService) { 
  }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value=> this.tasksService.load(value))
    ).subscribe(tasks=>{
      this.tasks = tasks
    })

    this.form =new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }
  submit(){ 
    const {title} = this.form.value

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }
    this.tasksService.create(task).subscribe(task=>{
      this.tasks.push(task)
      this.form.reset()
    }, err=>console.error(err))
  }
  
    remove(task: Task) {
      this.tasksService.remove(task).subscribe(()=>{
        this.tasks= this.tasks.filter(t=> t.id !== task.id)
      }, err=>console.error(err))
    }

    
  }

