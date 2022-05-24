import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Child } from 'src/app/server/childDate/child';
import { FondService } from 'src/app/server/service/fond.service';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-donate-help-form',
  templateUrl: './donate-help.component.html',
  styleUrls: ['./donate-help.component.less']
})
export class DonateHelpComponent implements OnInit{

  childList$!: Observable<Child[]>;

  //для окна выбора
  public SNP: string[] = ["","",""];
  public emptyInput: boolean[] = [true,true,true];
  public count: number = 0;

  //поиск ребёнка
  public isAnyChildFind = true;

  //видимость окон
  public open_exit_windowChoise = false;
  public open_exit_windowHistory = false;
  public idHistory = -1;

  constructor(public fserv: FondService, private store: Store<AppState>,private router: Router) {}

  

  ngOnInit(): void {
    this.childList$ = this.fserv.getAllChildren();
  }

  setOpenPopUpChoice():void {
    this.open_exit_windowChoise = true;
  }

  setExitPopUpChoise():void {
    this.open_exit_windowChoise = false;
  }
  
  getPopUpChoise(): boolean {
    return this.open_exit_windowChoise;
  }

  allIsClear(): boolean {
    return (this.SNP[0]==="" && this.SNP[1]==="" && this.SNP[2]==="") ? true : false;
  }

  foundMatch(child: Child): boolean {
    let match: number = 0;
    const nameC: string[] = [child.surname,child.name,child.patronym];
    this.countParam();
    for(let i=0;i<3;i++){      
      if(!this.emptyInput[i]){
        if(nameC[i].startsWith(this.SNP[i])){
          match = match + 1;
        }
      }
    }
    if(match === this.count){
      return true;
    }
    else{
      return false;
    }
  }

  countParam(){
    this.count=0;
    this.emptyInput = [true,true,true,];
    for(let i=0; i <3; i++){
      if(this.SNP[i]!==""){
        this.emptyInput[i] = false;
        this.count=this.count+1;
      }
    }
  }

  setOpenPopUpHistory(id:number):void {
    this.open_exit_windowHistory = true;
    this.idHistory = id;
  }

  setExitPopUpHistory():void {
    this.open_exit_windowHistory = false;
  }
  
  getPopUpHistory(): boolean {
    return this.open_exit_windowHistory;
  }
}
