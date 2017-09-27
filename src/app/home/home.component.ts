import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  public msg: string;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.getMessage().then(msg => this.msg = msg);
  }
}
