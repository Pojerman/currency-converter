import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CurrencyService]
})
export class AppComponent implements OnInit {
  title = 'converter-currency'
  currency: string[] = ['USD', 'EUR', 'GBP']
  addCurrency: string[] = ['CNY', 'JPY', 'TRY']
  selectedCurrency: string | null = null
  amountValue!: number | undefined
  changeValue: number = 0
  currencyValue!: any
  currentDate!: Date
  currencyMap: Map<any, any> = new Map()
  changeValueMap: Map<any, any> = new Map()


  constructor(private currencyService: CurrencyService) {
    this.updateCurrentDate();
    setInterval(() => {
      this.updateCurrentDate();
    }, 1000);
  }

  updateCurrentDate() {
    this.currentDate = new Date();
    this.currentDate.setHours(this.currentDate.getHours() + 1);
  }

  ngOnInit() {
    setInterval(() => {
      if(this.amountValue === undefined) {
        this.currencyService.getCurrencyValue(this.currency).subscribe((response:any) => {
          this.currencyValue = response.quotes
          this.getValue()
        })
      } else {
        this.converterValue()
      }
    }, 5000)

  }

  getValue() {
      this.currencyValue = Object.values(this.currencyValue)
      this.currency.map((el:string, idx:number) => {
        if(this.currencyMap.get(el)) {
          this.changeValueMap.set(el, this.currencyMap.get(el) - this.currencyValue[idx])
        } else {
          this.changeValueMap.set(el, 0)
        }
        this.currencyMap.set(el, this.currencyValue[idx])
      });
  }

  converterValue() {
    this.currency.map(currency => {
      this.currencyService.getConvertAmount(this.amountValue!, currency).subscribe((response: any) => {
        this.currencyValue = response
        this.currencyMap.set(currency, this.currencyValue.result)
      })
    })
  }

  addedCurrency(data:string) {
    this.selectedCurrency = data
    if(this.selectedCurrency) {
      const index = this.addCurrency.indexOf(this.selectedCurrency)
      if(index !== -1) {
        this.currency.push(this.selectedCurrency!)
        this.addCurrency.splice(index, 1)
        this.selectedCurrency = null
        this.currencyService.getCurrencyValue(this.currency).subscribe((response:any) => {
          this.currencyValue = response.quotes
          this.getValue()
        })
      }
    }
  }

  clearAmount() {
    this.amountValue = undefined
  }
}

