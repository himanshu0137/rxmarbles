import { run } from '@cycle/rxjs-run';
import { makeDOMDriver } from '@cycle/dom';
import { Observable } from 'rxjs';
import { merge } from 'ramda';

import { Sandbox } from './components/sandbox';

import { appModel } from './app-model';
import { appView } from './app-view';


function main(sources, route) {
  const sandbox = Sandbox(sources);

  const sinks = {
    DOM: appView(sandbox.DOM),
    store: Observable.merge(route, sandbox.data)
      .scan(merge, {}),
  };

  return sinks;
}

// Note: drivers use xstream 
function dummyDriver(initialValue) {
  return (value$) => value$.remember().startWith(initialValue);
}

window.renderDiagram = function (selector = '#app-container', opName, inputs) {
  if(!opName) return;
  const router = appModel(opName, inputs);
  const runner = driver => main(driver, router.route);
  run(runner, {
    DOM: makeDOMDriver(selector),
    store: dummyDriver({}),
  });
  return router.change;
}

