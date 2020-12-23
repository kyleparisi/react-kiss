let timeoutPointer;
const handler = {
  get(target, key) {
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    } else {
      return target[key];
    }
  },
  set: function(obj, prop, value) {
    obj[prop] = value;
    // optimization, if you set multiple values in the state on different
    // lines you'll want the render function to be pushed to the bottom of the
    // call stack
    clearTimeout(timeoutPointer);
    timeoutPointer = setTimeout(render, 0);
    return true;
  }
};
const state = new Proxy({
  name: "Kyle Parisi",
  nested: {
    value: true
  },
  todos: []
}, handler);
window.state = state;


const App = () => {
  return (<div>
    <h1>Hello {state.name}!</h1>
    {state.nested.value && <div>nested value</div>}
    <ul>
      {state.todos.map((todo, i) => {
        return (<li key={i}>{todo}</li>)
      })}
    </ul>
  </div>)
}
window.App = App

function render() {
  console.log("render")
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
}
render();
window.render = render;
