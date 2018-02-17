import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor (private snackBar: MatSnackBar, private swUpdate: SwUpdate) {

  }

  updateNetworkStatusUI () {
    if (navigator.onLine) {
      (document.querySelector("body") as any).style = "";
    } else {
      (document.querySelector("body") as any).style = "filter: grayscale(1)";
    }
  }

  ngOnInit () {
    this.swUpdate.available.subscribe(update => {
      const sb = this.snackBar.open("There is an update avialable", "Install now", { duration: 4000 })
      sb.onAction().subscribe(() => {
        if (update.type == 'UPDATE_AVAILABLE') {
          this.swUpdate.activateUpdate();
        }
      })
    })
    this.swUpdate.checkForUpdate();

    this.updateNetworkStatusUI();
    window.addEventListener("online", this.updateNetworkStatusUI);
    window.addEventListener("offline", this.updateNetworkStatusUI);
    if ((navigator as any).standalone == false) {
      // This is an iOS device and we are in the browser
      this.snackBar.open("You can add this PWA to the Home Screen",
        "", { duration: 3000 });
    }
    if ((navigator as any).standalone == undefined) {
      // It's not iOS
      if (window.matchMedia("(display-mode: browser").matches) {
        // We are in the browser
        window.addEventListener("beforeinstallprompt", event => {
          event.preventDefault();
          const sb = this.snackBar.open("Do you want to install this App?", "Install",
            { duration: 5000 });
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then(result => {
              if (result.outcome == "dismissed") {
                //TODO: Track no installation 
              } else {
                //TODO: It was installed
              }
            });
          });
          return false;
        });
      }
    }
  }
}
