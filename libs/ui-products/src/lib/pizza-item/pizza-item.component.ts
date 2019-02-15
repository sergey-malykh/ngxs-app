import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'ngxs-app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaItemComponent implements OnInit {
  @Input() pizza: any;

  constructor() {}

  ngOnInit() {}
}
