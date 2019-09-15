import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  searchBusiness(location, limit) {
    return this.http.get("https://alpharetta-top-ice-cream-shops-simple-api.amitmourya.me/api/businesses?location=" + location + "&limit=" + limit)
  }

}
