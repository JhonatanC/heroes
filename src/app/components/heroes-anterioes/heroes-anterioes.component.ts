import { Component, OnInit } from '@angular/core';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-heroes-anterioes',
  templateUrl: './heroes-anterioes.component.html',
  styleUrls: ['./heroes-anterioes.component.scss']
})
export class HeroesAnterioesComponent implements OnInit {

  heroes:any = [];

  constructor( private _heroes: HeroeService ) { }

  ngOnInit(): void {
    let objetoHeroe = {};

    this._heroes.getHeroes().subscribe( data =>{
      data.shift();
      data.splice(0).map( (element) =>{
        objetoHeroe = { ...element, like: `${element.like}%`, dislike: `${element.dislike}%` },
        this.heroes.push( objetoHeroe );
      })
    })
    
  }

}
