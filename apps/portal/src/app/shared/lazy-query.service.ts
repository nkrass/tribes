import {Subject, Subscription, filter} from "rxjs";
import {ApolloQueryResult} from "@apollo/client/core";
import * as Apollo from "apollo-angular";
import {QueryRef} from "apollo-angular";
import {take, tap} from "rxjs/operators";
import {Injectable, OnDestroy} from "@angular/core";

@Injectable()
export class LazyQueryService implements OnDestroy{
  lazyQueryRefs: LazyQueryRef<any, any>[] = [];

  create<Q, V>(gql: Apollo.Query<Q, V>) : LazyQueryRef<Q, V>{
    this.lazyQueryRefs.push(new LazyQueryRef<Q, V>(gql))
    return this.lazyQueryRefs[this.lazyQueryRefs.length - 1];
  }

  ngOnDestroy(): void {
    this.lazyQueryRefs.forEach(_ => _.destroy());
  }
}

export class LazyQueryRef<Q, V> {

  valueChanges: Subject<ApolloQueryResult<Q>> = new Subject<ApolloQueryResult<Q>>();

  private queryRef!: QueryRef<Q,  V>;

  private subscription!: Subscription;

  constructor(private gql: Apollo.Query<Q, V>) {
  }

  destroy(){
    this.subscription.unsubscribe();
  }

  refetch(variables: V): Promise<ApolloQueryResult<Q>>{
    if(!this.queryRef){
      this.queryRef = this.gql.watch(variables);
      this.subscription = this.queryRef.valueChanges.pipe(
        tap(d => this.valueChanges.next(d))
      ).subscribe();

      return this.queryRef.valueChanges.pipe(take(1)).toPromise() as Promise<ApolloQueryResult<Q>>;

    }else{
      return this.queryRef.refetch(variables);
    }
  }
}