import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class InMemoryDataService implements InMemoryDbService {
  
  categories = [
    {id: 1, pk:1, category: 'JavaScript'},
    {id: 2, pk:2, category: 'Sass'},
    {id: 3, pk:3, category: 'HTML'},
    {id: 4, pk:4, category: 'Angular'},
    {id: 5, pk:5, category: 'CSS'},
  ];
  
  questions = [
    {
      id: 1,
      pk: 1,
      question: 'What is JavaScript', 
      categories: [this.categories[0]]
    },
    {
      id: 2, 
      pk: 2,
      question: 'What is HTML', 
      categories: [this.categories[2]]
    },
    {
      id: 3, 
      pk: 3,
      question: 'What is CSS', 
      categories: [this.categories[4]]
    },
  ];

  screens = [
    {
      id: 1,
      pk: 1,
      name: "JavaScript Developer",
      questions: [this.questions[0], this.questions[1]],
      score: 0,
      questions_answered: 0,
      url: 'one',
    },
    {
      id: 2,
      pk: 2,
      name: "HTML Developer",
      questions: [this.questions[1]],
      url: 'two',
      score: 0,
      questions_answered: 0
    }
  ];

  candidates = [
    {
      id: 1,
      pk: 1,
      first_name: 'Bob',
      surname: 'Jones',
      email: 'bob@bob.com',
      screen: this.screens[0].url,
      screen_pk: 1,
      screen_name: this.screens[0].name
    },
    {
      id: 2,
      pk: 2,
      first_name: 'Billy',
      surname: 'Bob',
      email: 'billy@bob.com',
      screen: this.screens[1].url,
      screen_pk: 2,
      screen_name: this.screens[1].name
    }
  ];

  responseInterceptor(responseOptions, requestInfo) {
    try {
      if (Array.isArray(responseOptions.body)) {
        responseOptions.body.map(i => i.pk = i.id);
      } else{
        responseOptions.body.pk = responseOptions.body.id;
      }
    } catch (err) {}

    return responseOptions;
  }
  
  post(reqInfo): Observable<HttpResponse<any>> {
    const resourceUrl = reqInfo.resourceUrl;
    
    if (resourceUrl.includes('login')){
      return of(new HttpResponse(
        {
          body: {token: "faketoken"},
          status: 200
        }
      ));
    } else if (resourceUrl.includes('logout')){
      return of(new HttpResponse(
        {
          body: {},
          status: 200
        }
      ));
    } else if (resourceUrl.includes('candidates')) {
      let data = reqInfo.req.body;
      let screen = this.screens.find(
        s => s.url === reqInfo.req.body.screen);
      //data.screen = screen;
      data.screen_name = screen.name;
      data.id = Math.max(...reqInfo.collection.map(c => c.pk)) + 1;
      data.pk = data.id;
      data.screen_pk = screen.pk;
      reqInfo.collection.push(data);

      return of(new HttpResponse(
        {
          body: {},
          status: 200
        }
      ));
    }
  }

  
  put(reqInfo): Observable<HttpResponse<any>> {
    const resourceUrl = reqInfo.resourceUrl;
    let item = reqInfo.collection.find(i => i.id === reqInfo.req.body.pk);

    if (resourceUrl.includes('screens')){
      item.name = reqInfo.req.body.name;
      item.questions = reqInfo.req.body.questions;
      return of(new HttpResponse(
        {
          body: {},
          status: 200
        }
      ));
    } else if (resourceUrl.includes('candidates')) {
      let data = reqInfo.req.body;
      item.first_name = data.first_name;
      item.surname = data.surname;
      item.email = data.email;
      item.screen = data.screen;
      let screen = this.screens.find(
        s => s.url === reqInfo.req.body.screen);
      item.screen_name = screen.name;
      item.screen_pk = screen.pk;

      return of(new HttpResponse(
        {
          body: {},
          status: 200
        }
      ));
    }

  } 


  createDb() {

    const categories = this.categories;

    const questions = this.questions;

    const screens = this.screens;

    const candidates = this.candidates;

    return {
      categories, 
      questions,
      screens,
      candidates
    };
  }
  
}
