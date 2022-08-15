import {Component, AfterViewInit, DoCheck} from '@angular/core';
import {MessageService} from "./services/message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {mergeMap, of, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  messages: any = []
  myForm: FormGroup

  constructor(
    private messageService: MessageService,
    private builder: FormBuilder,
    private http: HttpClient
  ) {
    this.myForm = builder.group({
      'message': ['', [Validators.required]]
    })

    this.onGetMessage()
  }

  async onSendMessage(form: any) {
    await this.messageService.postMessage({
      message: form.value.message,
      id: Date.now()
    }).subscribe()

  }

   async onGetMessage() {
    await this.http.get('http://localhost:5200/get-messages').subscribe(
      val => {
        this.messages = [...this.messages, val]

        this.onGetMessage()
      },
      err => {
        setTimeout(this.onSendMessage, 0)
      }
    )
     this.myForm.reset()
  }
}
