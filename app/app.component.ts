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
  dataSource: any = [];
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

  getLocation() {
    if (navigator.geolocation) {
      var resHandle = this.showPosition.bind(this);
      navigator.geolocation.getCurrentPosition(resHandle);
    }
  }

  showPosition(position) {
    this.apiService.getLocation(position.coords.latitude, position.coords.longitude).subscribe(response => {
      this.location = this.parse_city(response) + ", " + this.parse_country(response);
    }, error => {
      console.error(error)
    })
  }

  parse_country(geocode_data) {
    if (geocode_data && geocode_data.results[0].address_components) {
      for (let component in geocode_data.results[0].address_components) {
        if (geocode_data.results[0].address_components[component]["types"].indexOf("country") >= 0) {
          return geocode_data.results[0].address_components[component]['long_name']
        }
      }
      return null
    }
  }

  parse_city(geocode_data) {
    if (geocode_data && geocode_data.results[0].address_components) {
      for (let component in geocode_data.results[0].address_components) {
        if (geocode_data.results[0].address_components[component]["types"].indexOf("locality") >= 0) {
          return geocode_data.results[0].address_components[component]['long_name']
        } else if (geocode_data.results[0].address_components[component]["types"].indexOf("postal_town") >= 0) {
          return geocode_data.results[0].address_components[component]['long_name']
        } else if (geocode_data.results[0].address_components[component]["types"].indexOf("administrative_area_level_2") >= 0) {
          return geocode_data.results[0].address_components[component]['long_name']
        } else if (geocode_data.results[0].address_components[component]["types"].indexOf("administrative_area_level_1") >= 0) {
          return geocode_data.results[0].address_components[component]['long_name']
        }
      }
      return null
    }
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
