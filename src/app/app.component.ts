import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    this.http
      .get<ConvertResponse>('https://youtube-mp36.p.rapidapi.com/dl', {
        headers: {
          'X-RapidAPI-Key': process.env['API_KEY'] || '',
          'X-RapidAPI-Host': process.env['API_HOST'] || '',
        },
        params: { id: this.videoUrl },
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
