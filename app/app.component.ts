import {Component, OnInit} from '@angular/core';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'reviewBy', 'review'];
  dataSource: any;
  isLoadingResults = true;
  location: any;
  limit: any;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.location = "Alpharetta";
    this.limit = "5";
    this.search();
  }

  search() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.apiService.searchBusiness(this.location, this.limit);
        }),
        map(data => {
          this.isLoadingResults = false;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {
      this.dataSource = data
    });
  }
}
