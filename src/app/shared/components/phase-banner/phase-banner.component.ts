import { Component, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { BulkScanService } from 'express/services/';

@Component({
  selector: 'app-phase-banner',
  templateUrl: './phase-banner.component.html',
  styleUrls: ['./phase-banner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PhaseBannerComponent {
  @Input() type = 'beta';

  myFunction () {
    const myInput = (document.querySelector('iFrameDrivenImageValue') as HTMLInputElement).value;
	if ((myInput != null) || (myInput.length !== 0)) {
		window.open('https://www.smartsurvey.co.uk/s/PayBubble/?pageurl=' + myInput, '_blank');
	}
  }
}
