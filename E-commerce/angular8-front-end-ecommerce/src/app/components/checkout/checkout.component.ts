import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { CartItem } from 'src/app/models/cart-item';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { Sales } from 'src/app/models/sales';
import { State } from 'src/app/models/state';
import { CartService } from 'src/app/_services/cart.service';
import { CheckoutService } from 'src/app/_services/checkout.service';
import { CountriesService } from 'src/app/_services/countries.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  message: string = "";
  totalPrice: number = 0;
  paymentForm: FormGroup;
  countries: any = [];
  states: any = [];
  cities: [];


  countrySelectd: string;
  stateSelected: string;
  citySelected: string;
  prefixPhone;
  sale: Sales = new Sales();
  address: Address = new Address();
  myCountryArr: Country[] = [];
  myStatesArray: State[] = [];
  myCityArray: City[] = [];
  isLoading: boolean = false;
  constructor(private checkoutService: CheckoutService, private cartService: CartService, private fb: FormBuilder,
    private countryService: CountriesService , private router: Router) { }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      adrs1: ['', Validators.required],
      adrs2: [''],
      zipeCode: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiry: ['', Validators.required],
      cvc: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    })

    this.cartDetails();
    //   this.getCountries();
    this.localCountries()
  }

  localCountries() {
    this.countryService.localCountry().subscribe(
      country => {

        let countryArray: Country[] = [];
        for (let i = 0; i < country.countries.length; i++) {
          let c: Country = new Country();
          c.name = country.countries[i]['name'];
          c.id = country.countries[i]['id'];
          c.phoneCode = country.countries[i]['phoneCode'];
          countryArray.push(c)
        }
        this.myCountryArr = countryArray
      }
    )
  }


  getCountries() {
    this.countryService.getAllCountries().subscribe(
      country => {
        this.countries = country;

      }
    )
  }
  getStetes(country: string) {
    this.countryService.getStatesByCoutry(country).subscribe(
      state => this.states = state
    )
  }
  getCities(state: string) {
    this.countryService.getCitiesByStates(state).subscribe(
      city => {
        this.cities = city;
      }
    )
  }
  onCountrySelected(event) {
    this.countrySelectd = event;
    let country: Country = new Country();
    country = this.myCountryArr.find(c => c.name === this.countrySelectd);
    this.prefixPhone = "+".concat(country.phoneCode);
    this.countryService.localStates().subscribe(
      state => {
        let statesArray: State[] = []
        for (let i = 0; i < state.states.length; i++) {
          let s: State = new State();
          s.name = state.states[i]['name']
          s.id = state.states[i]['id']
          s.country_id = state.states[i]['country_id']
          if (s.country_id == country.id) {
            statesArray.push(s)
          }
        }
        this.myStatesArray = statesArray

      }
    )
  }
  onStateSelect(event) {
    this.stateSelected = event;
    let state: State = new State();
    state = this.myStatesArray.find(s => s.name === this.stateSelected)
    this.countryService.localCities().subscribe(
      data => {
        let cityArray: City[] = [];
        for (let i = 0; i < data.cities.length; i++) {
          let c: City = new City();
          c.id = data.cities[i]['id'];
          c.name = data.cities[i]['name'];
          c.state_id = data.cities[i]['state_id']
          if (c.state_id == state.id) {
            cityArray.push(c)
          }
        }
        this.myCityArray = cityArray
      }
    )

  }
  onCitySelected(event) {
    this.citySelected = event;
  }
  cartDetails() {
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    )
    this.cartService.calculateTotalPrice();
  }


  chargeCreditCard() {
    if (this.totalPrice <= 0) {
      Swal.fire("the price should be higher plus 0", '', 'error');
      return;
    }
    this.isLoading = true;
    let form = document.getElementsByTagName("form")[0];
    let exp_time = form.expiry.value;
    let exp_time_section: string[] = exp_time.split("/", "2");

    (<any>window).Stripe.card.createToken({
      number: form.cardNumber.value,
      exp_month: exp_time_section[0].trim(),
      exp_year: exp_time_section[1].trim(),
      cvc: form.cvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.sale.email = this.paymentForm.get('email').value;
        this.sale.phone = this.prefixPhone+this.paymentForm.get('phone').value;
        this.sale.firstName = this.paymentForm.get('first_name').value;
        this.sale.lastName = this.paymentForm.get('last_name').value;
        this.sale.cardNumber = this.paymentForm.get('cardNumber').value;
        this.sale.cvc = +this.paymentForm.get('cvc').value;
        this.sale.expiryMonth = +exp_time_section[0].trim();
        this.sale.expiryYear = +exp_time_section[1].trim();
        this.sale.amount = this.totalPrice;
        this.address.country = this.countrySelectd;
        this.address.state = this.stateSelected;
        this.address.city = this.citySelected;
        this.address.address1 = this.paymentForm.get('adrs1').value;
        this.address.address2 = this.paymentForm.get('adrs2').value;
        this.address.zipeCode = this.paymentForm.get('zipeCode').value;
        this.sale.address = this.address;
        this.sale.token = token;
        this.checkoutService.chargeCard(this.sale).subscribe(
          res => {
            
            console.log("res success")
            this.message = res.message.toString();
            Swal.fire({
              title:this.message, 
              icon: 'success',
              confirmButtonText: `Save`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.router.navigateByUrl('/')
                this.isLoading = false;
              }
            });
            
            this.paymentForm.reset();
            
          }, error => {
            this.isLoading = false;
            Swal.fire(error.error, '', 'error');
          }
        )
      } else {
        this.isLoading = false;
        Swal.fire(response.error.message, '', 'error');

      }

    });
  }
} 
