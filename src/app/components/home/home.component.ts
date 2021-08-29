import { Component, OnInit } from '@angular/core';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  heroe:any  = [];
  dislikeVote:boolean = false;
  likeVote:boolean = false;
  optionsVote:boolean = true;
  loading:boolean = false;


  constructor( private _heroes: HeroeService ) { }

  ngOnInit(): void {
    this.heroeHero();
  }

  menu(){
    const nav = document.querySelector('.hero__items');
    nav.classList.toggle('open-menu');

    const menuOpen = document.querySelector('.nav-mobile-open');
    menuOpen.classList.toggle('element-hide');

    const menuClose = document.querySelector('.nav-mobile-close');
    menuClose.classList.toggle('element-show');
  }

  heroeHero(){
    this._heroes.getHeroe().subscribe( (data:any) =>{
      let objetoHeroe = {};
      objetoHeroe = { ...data, like: `${data.like}%`, dislike: `${data.dislike}%` };

      this.heroe = objetoHeroe;
    })
  }

  like(data) {
    this.loading = true;

    setTimeout( () =>{
      this.loading = false;
      let like = parseInt( data.like.slice( 0, -1 ) );
      let dislike = parseInt( data.dislike.slice( 0, -1 ) );
  
      let objetoHeroe = {};
      objetoHeroe = { ...data, like: `${like += 1}`, dislike: `${dislike -= 1}` };
  
      this._heroes.voteHeroe(objetoHeroe).subscribe();
      this.likeVote = true;
      this.optionsVote = false;
      this.heroeHero();
    }, 1500)
  }

  dislike(data) {
    this.loading = true;

    setTimeout( ()=>{
      this.loading = false;
      let like = parseInt( data.like.slice( 0, -1 ) );
      let dislike = parseInt( data.dislike.slice( 0, -1 ) );
  
      let objetoHeroe = {};
      objetoHeroe = { ...data, like: `${like -= 1}`, dislike: `${dislike += 1}` };
  
      this._heroes.voteHeroe(objetoHeroe).subscribe();
      this.dislikeVote = true;
      this.optionsVote = false;
      this.heroeHero();
    }, 1500)
  }

  voteAgain(){
    this.dislikeVote = false;
    this.likeVote = false;
    this.optionsVote = true;
  }

  closeAlert(){
    const alertHome = document.querySelector('.alert-home');
    alertHome.classList.toggle('element-hide');
  }

}
