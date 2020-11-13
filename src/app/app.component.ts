import { HttpClient } from '@angular/common/http';
import { Component, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
//import { PromiseModel } from './promise.model';
import { PromiseService } from './promise.service';

class Post {
  constructor(
    public userId: number,
    public id: string,
    public title: string,
    public body: string
  ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mtest';
  mForm:FormGroup;
  itunesForm:FormGroup;

  items:todoItem[]=[]; 
  //name:string='init'; 
  count:number=0;
  name:string;// = new FormControl('', [Validators.required, Validators.maxLength(15)]);
  private iterableDiffer: IterableDiffer<any>; //Changes listner

  
  results:[];// PromiseModel[];
  data:[]; 
  //data1:[];
   
  constructor(private iterableDiffers: IterableDiffers,private promiseService: PromiseService,private http:HttpClient     
    ) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);

    this.results = [];//init
}

//listening to this.items changes using iterableDiffers
ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.items);
    if (changes) {
        this.getItemsCount();
        console.log('items Changes detected!');
    }
}


  ngOnInit(): void {

    this.mForm = new FormGroup({
      name: new FormControl('')   
      });
    
      this.itunesForm = new FormGroup({
        name: new FormControl('')   
        });
    
        this.itunesForm.patchValue({
          name: '*'
       });

  
  //this.items = [{name:'item1',isDone:true}];

  this.getItemsCount();

  //Promise
  //this.doSearch('*');
  this.search(this.itunesForm.value); //TR '*' //Default

  //Promise
  //TR this.getPosts();//OK

}

  getItemsCount():void {
    this.count = this.items.length;
  }

  add(form:Form){
    console.log('form :' + form);
    
    //let name  
    let item = {name:JSON.stringify(form),isDone:true};
    this.items.push(item);
  
    this.mForm.patchValue({
      name: ''
    });

    
      //new todoItem {'name':'xcvcx','isDone':true});
      //this.mForm.controls.get.name.setValue = '';
  }
  
  delete(index:number){
    this.items.splice(index, 1);
    //this.getItemsCount();
  }


//Promise Sample
doSearch(term:string):any {
  return this.promiseService.search(term)
}
//Promise Sample - OK
//https://www.positronx.io/angular-promises-example-manage-http-requests/
getPosts() {
  let api = "https://jsonplaceholder.typicode.com/posts";

  const promise = new Promise((resolve, reject) => {
    const apiURL = api;
    this.http
      .get<Post[]>(apiURL)
      .toPromise()
      .then((res: any) => {
        // Success
        this.data = res.map((res: any) => {
          return new Post(
            res.userId,
            res.id,
            res.title,
            res.body
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

public search(form:FormGroup) { //term:string
  
  console.log('Search form :' + JSON.stringify(form));    

  const formStr = JSON.stringify(form);
  var obj = JSON.parse(formStr);
  let term = obj.name;




  let apiRoot = 'https://itunes.apple.com/search';

  let api = `${apiRoot}?term=${term}&media=music&limit=20`;

  const promise = new Promise((resolve, reject) => {
    const apiURL = api;
    this.http
      .get<PromiseModel[]>(apiURL)
      .toPromise()
      .then((res: any) => {
        // Success
        this.results = res.results.map((res: any) => {
          return new PromiseModel(
            res.artistName,
            res.artistViewUrl,
            res.artworkUrl30,
            res.collectionName,
            res.country,
            res.primaryGenreName,
            res.releaseDate,
            res.trackName,
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



class todoItem {
  name:string;
  isDone:boolean;
}

class PromiseModel {
  constructor(
    //public artistId: number,
    public artistName: string,
    public artistViewUrl: string,
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


