
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Filter from './Filter';
import Home from './home';
import Details from './details';
import Header from './header';

function App() {
  return (
    <Router>  
        <Header />             
       <Route  exact path="/" component={Home} />
       <Route path="/filter" component={Filter} />
       <Route path="/details" component={Details} />
    </Router>
  );
}

export default App;
