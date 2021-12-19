import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FlashCardsComponent} from "./flash-cards/flash-cards.component";

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit {
  constructor(private readonly matDialog: MatDialog) {}

  ngOnInit(): void {
    this.open();
  }

  public open(): void {
    this.matDialog.open(FlashCardsComponent);
  }
}
