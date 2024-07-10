import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { BehaviorSubject } from 'rxjs';
import { AppEventsComponent } from './components/app-events/app-events.component';
import { AppTickerComponent } from './components/app-ticker/app-ticker.component';
import { ClientTickerComponent } from './components/client-ticker/client-ticker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    CommonModule,
    AppEventsComponent,
    AppTickerComponent,
    ClientTickerComponent,
    MatSliderModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
/**
 * The root component of the Angular application.
 */
export class AppComponent {
  // #region Properties (8)

  public AppEvent = new BehaviorSubject<string>('');
  public WorldTicker: BehaviorSubject<string>[] = [];
  public appEventsCount = signal(3);
  public appEventsCounts = computed(() =>
    Array(this.appEventsCount())
      .fill(0)
      .map((x, i) => i + 1),
  );
  public appTickerCount = signal(3);
  public appTickerCounts = computed(() =>
    Array(this.appTickerCount())
      .fill(0)
      .map((x, i) => i + 1),
  );
  public clientTickerCount = signal(3);
  public clientTickerCounts = computed(() =>
    Array(this.clientTickerCount())
      .fill(0)
      .map((x, i) => i + 1),
  );
  public title = 'Node RestTest Angular';

  // #endregion Properties (8)
}
