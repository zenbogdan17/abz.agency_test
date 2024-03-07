import axios from 'axios';

import Banner from './components/Banner';
import Header from './components/Header';
import Cards from './components/Cards';

import './styles/app.scss';
import Form from './components/Form';

axios.defaults.baseURL =
  'https://frontend-test-assignment-api.abz.agency/api/v1';

function App() {
  return (
    <div className="main_container">
      <Header />
      <div className="container">
        <Banner />
        <Cards />
        <Form />
      </div>
    </div>
  );
}

export default App;
