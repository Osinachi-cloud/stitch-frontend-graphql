// import { Injectable } from '@angular/core';
// import { Apollo } from 'apollo-angular';
// import { HttpLink } from 'apollo-angular/http';
// import { InMemoryCache } from '@apollo/client/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApolloService {
//   private apolloClient: Apollo = {} as Apollo; 

//   constructor(private apollo: Apollo, private httpLink: HttpLink) {
//     this.initApollo();
//   }

//   private initApollo(): void {
//     const uri = 'http://localhost:8085/graphql';
//     const http = this.httpLink.create({ uri });

//     this.apolloClient = this.apollo.create({
//       link: http,
//       cache: new InMemoryCache(),
//     });
//   }

//   getApolloClient(): Apollo {
//     return this.apolloClient;
//   }
// }
