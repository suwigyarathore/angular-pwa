import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Tea } from '../logic/Tea';
import { Router } from "@angular/router";
import { GeoLocationService } from '../geo-location.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: Tea[];
  constructor (private data: DataService,
    private router: Router,
    private geoLocationService: GeoLocationService) { }

  ngOnInit () {
    this.data.getList(list => {
      this.list = list;
    })
  }

  goDetails (tea: Tea) {
    this.router.navigate(['/tea', tea._id])
  }

  goToMap (tea: Tea) {
    const mapURL = this.geoLocationService.getMapLink(tea.location);
    location.href = mapURL;
  }

  share (tea: Tea) {
    debugger;
    const shareText = `I had this tea ${ tea.place } and for me it's a ${ tea.rating } star tea`;
    if ('share' in navigator) {
      navigator['share']({
        title: tea.name,
        text: shareText,
        url: window.location.href
      })
        .then(() => console.log('shared'))
        .catch(error => console.log(error));
    } else {
      const shareURL = `whatsapp://send?text=${ encodeURIComponent(shareText) }`;
      location.href = shareURL;
    }
  }

}
