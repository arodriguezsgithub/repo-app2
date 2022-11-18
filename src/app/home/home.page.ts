import { Component } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { GithubApiService, User } from '../services/shared/github-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user!: User | null;
  username: string = '';
  subscription!: Subscription;

  constructor(private githubApiService: GithubApiService) { }
  
  getUser() {
    this.subscription = this.githubApiService.getUser$(this.username).subscribe({
      next: (response: User) => this.user = response,
      error: (e: any) => console.error(e),
    })
  }

  clearUser(){
    this.user = null;
    this.username = '';
  }

  ionViewDidLeave(){
    this.subscription.unsubscribe();
  }

}
