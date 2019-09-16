import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  searchBusiness(location, limit) {
    return this.http.get("/api/businesses?location=" + location + "&limit=" + limit)
  }

  getLocation(lat, lng) {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyDrNJzu3wIqBtryCwDJxCsbebT1wLeLZpA")
  }

}
