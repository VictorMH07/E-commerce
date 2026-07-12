import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';

import { HeroBanner } from '../../shared/components/hero-banner/hero-banner';

@Component({
  selector: 'app-home',
  imports: [RouterLink, HeroBanner],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
