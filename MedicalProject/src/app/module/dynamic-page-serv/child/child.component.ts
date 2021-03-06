import { ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Child } from 'src/app/server/Date/child';

@Component({
  selector: 'dynamic-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements OnInit{

  @Input() childCurr: Child = new Child;

  public nameChild: string;
  public status: boolean;

  public urlView: string = "";
  public childrenView: boolean = false;
  public donateView: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(){
    this.nameChild = this.childCurr.name + " " + this.childCurr.patronym + " " + this.childCurr.surname;
    if(this.childCurr.donatSum < this.childCurr.needSum){
      this.status = false;
    }
    else{
      this.status = true;
    }

    //выбираем вид отображения информации
    this.urlView = this.router.url;
    this.childrenView = this.urlView.includes("children");
    this.donateView = this.urlView.includes("donateHelp");
  }
}
