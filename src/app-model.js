import { Observable, Subject } from 'rxjs';


const DEFAULT_EXAMPLE = 'merge';

export function appModel(opName, initialInput) {
  // return Observable.fromEvent(window, 'hashchange')
  //   .map(hashEvent => hashEvent.target.location.hash.replace('#', ''))
  //   .startWith(window.location.hash.replace('#', ''))
  //   .map(route => route || DEFAULT_EXAMPLE)
  //   .distinctUntilChanged()
  //   .map(route => ({ route, inputs: undefined }));
  const inputChangeSubject = new Subject();
  let changeDiagram = (input) => {
    inputChangeSubject.next(input);
  }
  const router = new Observable((observer) => {
    inputChangeSubject.subscribe(i => {
      observer.next({
        route: opName,
        inputs: i
      });
    });
    observer.next({
      route: opName,
      inputs: initialInput
    });
  });
  return {
    route: router,
    change: changeDiagram
  };
};
