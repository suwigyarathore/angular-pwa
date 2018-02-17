import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Tea } from '../logic/Tea';
import { GeoLocationService } from '../geo-location.service'
import { TastingRating } from '../logic/TastingRating';
import { Router } from '@angular/router'
import { DataService } from '../data.service';

@Component({
  selector: 'app-tea',
  templateUrl: './tea.component.html',
  styleUrls: ['./tea.component.css']
})
export class TeaComponent implements OnInit, OnDestroy {

  constructor (private route: ActivatedRoute,
    private geoLocationService: GeoLocationService,
    private router: Router,
    private dataService: DataService) { }

  routingSubscription: Subscription
  tea: Tea;
  types: string[] = ['Black Tea', 'Yellow Tea', 'Assam Tea', 'Green Tea', 'Masala Tea'];
  tastingEnabled = false;

  ngOnInit () {
    this.tea = new Tea();
    this.routingSubscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.dataService.get(params['id'], (tea: Tea) => {
          this.tastingEnabled = !!tea.tastingRating;
          this.tea = tea
        })
      }
    })

    this.geoLocationService.requestLocation(location => {
      if (location) {
        this.tea.location.latitude = location.latitude;
        this.tea.location.longitude = location.longitude;
      }
    })
  }

  ngOnDestroy () {
    this.routingSubscription.unsubscribe();
  }

  tastingRatingChanged (checked: boolean) {
    if (checked) {
      this.tea.tastingRating = new TastingRating();
    } else {
      this.tea.tastingRating = null;
    }
  }

  cancel () {
    this.router.navigate(['/']);
  }

  save () {
    this.dataService.save(this.tea, result => result && this.router.navigate(['/']));
  }

}
