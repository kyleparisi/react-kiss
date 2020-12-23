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
    console.log("render")
    render();
  }
};
const state = new Proxy({
  name: "Kyle Parisi",
  nested: {
    value: true
  }
}, handler);
window.state = state;


const App = () => {
  return (<div>
    <h1>Hello {state.name}!</h1>
    {state.nested.value && <div>nested value</div>}
  </div>)
}
window.App = App

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
}
render();
window.render = render;
