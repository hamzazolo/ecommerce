import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const httpOptionsAuth = {
  headers: new HttpHeaders({

    'api-token': 'rtdfaBMoRFqVBCINPEzOhTlraNL6CDwD1G8v_uzne6gSjb3mh6IGrpEboN0kZCTVyy4',
    'Accept': 'application/json',
    'user-email': 'bouzidi.hamza.pro@gmail.com'
  })
};

const httpOptions = {
  headers: new HttpHeaders({

    'Authorization': '',
    'Accept': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  constructor(private http: HttpClient) { }

  // web site https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
  // Authorization valide for 24h
  authApiCountry = "https://www.universal-tutorial.com/api/getaccesstoken";
  apiCountries = "https://www.universal-tutorial.com/api/countries/";
  apiStates = "https://www.universal-tutorial.com/api/states/"
  apiCities = "https://www.universal-tutorial.com/api/cities/"
  myToken: string;
  auth() {
    return this.http.get<any>(`${this.authApiCountry}`, httpOptionsAuth)
  }
  getAllCountries() {
    this.auth().subscribe(
      token => {
        this.myToken = token['auth_token'] 
        console.log("token country : " + this.myToken)
      }
    )
  //  httpOptions.headers.set('Authorization', 'Bearer '+this.myToken);
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.myToken}`, 'Accept':'application/json'});
    return this.http.get<any>(`${this.apiCountries}`, {headers: headers})
  }
  getStatesByCoutry(country: string) {
    const headers = new HttpHeaders({'Authorization': this.myToken, 'Accept':'application/json'});
  //  httpOptions.headers.set('Authorization', 'Bearer '+this.myToken);
    return this.http.get<any>(`${this.apiStates}${country}`, {headers: headers})
  }
  getCitiesByStates(state: string) {
    httpOptions.headers.set('Authorization', 'Bearer '+this.myToken);
    return this.http.get<any>(`${this.apiCities}${state}`, httpOptions)
  }

  localCountry(){
    return this.http.get<any>("assets/countries.json");
  }
  localStates(){
    return this.http.get<any>("assets/states.json");
  }
  localCities(){
    return this.http.get<any>("assets/cities.json"); 
  }
}
