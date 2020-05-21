import { h, render, Component } from 'preact';
import './style.css';

class App extends Component {
  render () {
    return (
      <div>
        <h1>Hello, world!</h1>
        <div class="banner"></div>
      </div>
    );
  }
}

render(<App />, document.body);
