
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchItem } from './searchItem.model';
//import {Post} from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PromiseService {
    apiRoot:string = 'https://itunes.apple.com/search';
    //results:Object[];
    results: [];//SearchItem[];
    data:[];
      
    loading:boolean;

    constructor(private http: HttpClient) {
      this.results = [];
      this.loading = false;
    }


    //https://codecraft.tv/courses/angular/http/http-with-promises/


 //https://www.techiediaries.com/javascript-promises-tutorial-example/#:~:text=You%20first%20create%20an%20instance,the%20promise%20after%20one%20second.
 

      public search(term:string):any {
        let api = `${this.apiRoot}?term=${term}&media=music&limit=20`;
      
        const promise = new Promise((resolve, reject) => {
          const apiURL = api;
          this.http
            .get<PromiseModel[]>(apiURL)
            .toPromise()
            .then((res: any) => {
              // Success
              this.data = res.results.map((res: any) => {
                return new PromiseModel(
                  res.trackName,
                  res.primaryGenreName,
                  res.releaseDate,
                  res.artistName,
                  res.collectionName,
                  res.country,
                  res.artworkUrl30,
                  res.trackViewUrl
                      );
              });
              resolve();
            },
              err => {
                // Error
                reject(err);
              }
            );
        });
        return promise;
      }
      
}

class PromiseModel {
  constructor(
    //public artistId: number,
    public artistName: string,
    //public artistViewUrl: string,
    public artworkUrl30: string,
    // public artworkUrl60: string,
    // public artworkUrl100: string,
    // public collectionCensoredName: string,
    // public collectionExplicitness: string,
    // public collectionId: number,
     public collectionName: string,
    // public collectionPrice: number,
    // public collectionViewUrl: string,
    // public contentAdvisoryRating: string,
     public country: string,
    // public currency: string,
    // public discCount: number,
    // public discNumber: number,
    // public isStreamable: boolean,
    // public kind: string,
    // public previewUrl: string,
     public primaryGenreName: string,
     public releaseDate: string,
    // public trackCensoredName: string,
    // public trackCount: number,
    // public trackExplicitness: string,
    // public trackId: number,
     public trackName: string,
    // public trackNumber: number,
    // public trackPrice: number,
    // public trackTimeMillis: number,
     public trackViewUrl: string
    // public wrapperType: string

  ) { }
}
