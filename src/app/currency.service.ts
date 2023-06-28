import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private APIKEY = 'ADfIeWnWCuhEA7H4DMi1Ls8gmC4IDK1e';
  private API = 'https://api.apilayer.com/currency_data';
  private LIVE = '/live';
  private CONVERTER = '/convert';
  private SOURCE = 'RUB';
  constructor(private httpClient: HttpClient) {}

  getCurrencyValue(data: any) {
    return this.httpClient.get(
      this.API +
        this.LIVE +
        `?source=${this.SOURCE}&currencies=${data.join(',')}`,
      {
        headers: {
          apikey: this.APIKEY,
        },
      }
    );
  }

  getConvertAmount(amount: number, currency: string) {
    return this.httpClient.get(
      this.API +
        this.CONVERTER +
        `?to=${currency}&from=${this.SOURCE}&amount=${amount}`,
      {
        headers: {
          apikey: this.APIKEY,
        },
      }
    );
  }
}
