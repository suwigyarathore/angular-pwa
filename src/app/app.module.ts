import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GeoLocationService } from './geo-location.service';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import 'hammerjs';
import { ListComponent } from './list/list.component';
import { TeaComponent } from './tea/tea.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'tea', component: TeaComponent },
  { path: 'tea/:id', component: TeaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TeaComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatToolbarModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    FormsModule,
    ServiceWorkerModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    RouterModule.forRoot(routes)
  ],
  providers: [GeoLocationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
