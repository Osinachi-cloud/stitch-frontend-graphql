import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { gql } from 'graphql-tag';
import { MutationOptions, FetchResult, InMemoryCache } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from './utils';


@Injectable({
  providedIn: 'root',
})
export class ApolloService {
    // protected baseURL = 'http://localhost:8080';
    // protected uri = 'http://localhost:8085/graphql';

    // constructor(protected apollo: Apollo, protected httpLink: HttpLink, protected httpClient: HttpClient) {
    //     const uri = 'http://localhost:8085/graphql'; 
    //     const http = httpLink.create({ uri });
    //     apollo.create({
    //     link: http,
    //     cache: new InMemoryCache(),
    //     });
    // }

    constructor(
      protected apollo: Apollo,
      protected httpLink: HttpLink,
      protected httpClient: HttpClient
    ) {
      if (!this.apollo.client) {
        const http = httpLink.create({ uri: baseUrl });
        this.apollo.create({
          link: http,
          cache: new InMemoryCache(),
        });
      }
    }

  getApolloInstance(): Apollo {
    
    return this.apollo;

  }
}
