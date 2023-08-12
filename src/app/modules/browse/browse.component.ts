import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  search = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.search.valueChanges.subscribe(val => console.log(val, 'search'));
  }
}
