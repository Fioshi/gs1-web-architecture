import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OceansComponent } from './components/oceans/oceans.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    OceansComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gs-1semes';
}
