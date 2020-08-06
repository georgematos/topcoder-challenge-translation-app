import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TranslateService {

  private urlApi = 'https://cors-anywhere.herokuapp.com/translate.google.com/translate_a/single?' + 
  'client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=%25s&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e&';

  constructor(
    private httpClient: HttpClient
  ) { }

  public translate(sourceLang: string, targetLang: string, sourceText: string): Observable<any> {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'User-Agent': 'AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1',
    };
    const params = { 'sl': sourceLang, 'tl': targetLang, 'q': sourceText };
    return this.httpClient.get<any>(this.urlApi, { params: params, headers: headers });
  }

}