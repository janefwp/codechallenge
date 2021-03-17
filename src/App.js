import logo from './logo.svg';
import './App.css';
import JsonData from './components/JsonData'
import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'

function App() {
  // return (
  //   <Router>
  //     <maim>
  //       <Container>
  //       <Route path='/' component={JasonData} exact />
  //       </Container>
  //     </maim>
  //   </Router>
  // )
  return (
    <div className="App">
      <JsonData />
    </div>
  );
}

export default App;
