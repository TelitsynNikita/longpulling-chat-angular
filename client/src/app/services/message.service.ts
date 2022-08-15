import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class MessageService {
  _getApi = 'http://localhost:5200/get-messages'
  _postApi = 'http://localhost:5200/new-messages'


  constructor(private http: HttpClient) { }

  getMessage() {
    this.http.get(this._getApi).subscribe((val: any) => val)
  }

  postMessage(message: any) {
    return this.http.post(this._postApi, message)
  }
}
