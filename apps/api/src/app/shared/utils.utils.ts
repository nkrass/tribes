export function promiseAllN<T>(collection: Array<Promise<T>>, n = 5): Promise<T[]> {
  let i =0;
  let jobsLeft = collection.length;
  const outcome: T[] = [];
  let rejected = false;
  // create a new promise and capture reference to resolve and reject to avoid nesting of code
  let resolve, reject;
  const pendingPromise: Promise<T[]> = new Promise(function(res, rej ) {
      resolve = res; reject = rej;
  });

  // Guard clause
  if(collection.length === 0) {
      return pendingPromise.then(_ => []);
  }
  
  // execute the j'th thunk
  function runJob(j: number) {
      collection[j].then(result => {
          if(rejected) {
              return; // no op!
          }
          jobsLeft --;
          outcome[j] = result;
          if(jobsLeft <= 0) {
              resolve(outcome);
          } else if(i < collection.length) {
              runJob(i);
              i++;
          } else {
              return; // nothing to do here.
          }
      }).catch(e => {
          if(rejected) {
              return; // no op!
          }
          rejected = true;
          reject(e);
          return;
      });
  }
 
 // bootstrap, while handling cases where the length of the given array is smaller than maxConcurrent jobs
  while(i < Math.min(collection.length, n)) {
      runJob(i); i++;
  }

  return pendingPromise;
}