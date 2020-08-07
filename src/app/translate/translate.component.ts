import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '../services/translate-service.service';
import { languages } from '../services/data-source';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  public languages = languages;
  public sourceLang: string;
  public response: string;
  public validationError: string;
  public applicationError: string;

  public form = new FormGroup({
    sourceText: new FormControl('', Validators.required),
    sourceLang: new FormControl('', Validators.required),
    targetLang: new FormControl('', Validators.required),
  });

  constructor(
    private service: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  public translate(): void {
    this.applicationError = undefined;
    if (!this.form.invalid) {
      this.validationError = undefined;
      this.service.translate(
        this.form.get('sourceLang').value,
        this.form.get('targetLang').value,
        this.form.get('sourceText').value,
      ).subscribe((result) => {
        this.response = result.sentences[0].trans;
      }, (err: any) => {
        this.applicationError = err;
      });
    } else {
      this.validationError = 'O formulário contém erros, verifique se os campos estão preenchidos';
      this.response = undefined;
    }
  }

}
