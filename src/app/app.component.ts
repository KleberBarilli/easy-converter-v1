// app.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ConvertResponse {
  success: boolean;
  song_title?: string;
  song_link?: string;
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
      .post<ConvertResponse>('/convert-mp3', { videoUrl: this.videoUrl })
      .subscribe(
        (response) => {
          this.success = response.success;

          if (response.success) {
            this.songTitle = response.song_title;
            this.songLink = response.song_link;
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
