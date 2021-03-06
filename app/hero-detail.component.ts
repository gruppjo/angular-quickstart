import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="hero">
      <h2>{{ hero.name }} details!</h2>
      <div><label>id: </label>{{ hero.id }}</div>
      <div>
        <label>name: </label>
        <input placeholder="name"
          [(ngModel)]="hero.name"
        />
      </div>
    </div>
    <button (click)="goBack()">Back</button>
    <button (click)="save()">Save</button>
  `
})

export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { };

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // implicit type conversion to Number
      this.heroService.getHero(id)
      .then(hero => this.hero = hero);
    });
  };

  goBack(): void {
    this.location.back();
  };

  save(): void {
    this.heroService.update(this.hero)
    .then(() => this.goBack());
  }
}
