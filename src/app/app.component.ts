import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../config';

interface ConvertResponse {
  status: boolean;
  title?: string;
  link?: string;
  message?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  videoUrl: string = '';
  success: boolean | undefined;
  songTitle: string | undefined;
  songLink: string | undefined;
  errorMessage: string | undefined;

  constructor(private http: HttpClient) {}

  convertVideo() {
    this.success = undefined;
    this.errorMessage = undefined;

    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = this.videoUrl.match(regExp);

    const videoId = match && match[7].length == 11 ? match[7] : false;

    this.http
      .get<ConvertResponse>('https://youtube-mp36.p.rapidapi.com/dl', {
        headers: {
          'X-RapidAPI-Key': config.api_key,
          'X-RapidAPI-Host': config.api_host,
        },
        params: { id: videoId },
      })
      .subscribe(
        (response) => {
          this.success = response.status;
          if (response.status) {
            this.songTitle = response.title;
            this.songLink = response.link;
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          console.log('Error converting video', error);
          this.success = false;
          this.errorMessage =
            'An error occurred while converting the video. Please try again later.';
        }
      );
  }
}
