import { Component, OnInit } from '@angular/core';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  heroe:any  = [];


  constructor( private _heroes: HeroeService ) { }

  ngOnInit(): void {
    this.heroeHero();
  }

  heroeHero(){
    this._heroes.getHeroe().subscribe( (data:any) =>{
      let objetoHeroe = {};
      objetoHeroe = { ...data, like: `${data.like}%`, dislike: `${data.dislike}%` };

      this.heroe = objetoHeroe;
    })
  }

  like(data) {
    
    data.like = data.like.slice( 0, -1 )
    data.dislike = data.dislike.slice( 0, -1 )

    data.like++;
    data.dislike++;

    let objetoHeroe = {};
    objetoHeroe = { ...data, like: `${data.like}%`, dislike: `${data.dislike}%` };

    this._heroes.voteHeroe(objetoHeroe).subscribe();
  }

  dislike(id) {
    console.log(id)
  }

}
