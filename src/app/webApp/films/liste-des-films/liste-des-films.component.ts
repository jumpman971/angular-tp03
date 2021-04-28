import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FilmsService } from '../films.service';
import { Subscription } from 'rxjs';
import { Films } from '../films';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liste-des-films',
  templateUrl: './liste-des-films.component.html',
  styleUrls: ['./liste-des-films.component.scss']
})
export class ListeDesFilmsComponent implements OnInit, OnDestroy {
  public stateFilms: Films[];
  stateSubscription: Subscription = new Subscription;

  constructor(
    private _http: HttpClient,
    private _zoneJs: NgZone,
  ) {  
    this.stateFilms = [];
  }

  ngOnInit(): void {
    this._zoneJs.runOutsideAngular(
      () => {
        this._http.get<Films[]>('https://dev.webjs.fr/films.json').subscribe(
          (datas1) => {
            console.log('DATAS1');
            console.table(datas1);

            this._http.get<Films[]>('https://dev.webjs.fr/films2.json').subscribe(
              (datas2) => {
                console.log('DATAS2');
                console.table(datas2);

                this._zoneJs.run(
                  () => {
                    var datas: Films[] = datas1.concat(datas2);
                    this.stateFilms = datas;
                    console.log('DATAS: ', datas);
                  }
                )
              }
            )
          }
        )
      }
    )
  }

  ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    //window.alert('Comp DESTROY')
  }
}
