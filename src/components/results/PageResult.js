import {Container, Row, Spinner} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import '../../styles/home.css'
import Header from '../Header'
import Summary from '../container/summary'
import DropDown from '../dropdown/DropDown'
import $ from 'jquery';
const constants = require('../../constants');

const PageResult = ({loaded}) => {

  const [Loaded, setLoaded] = useState(loaded);
  const [envs, setEnvs] = useState(['all']);
  const [env, setEnv] = useState();
  const [module, setModule] = useState();
  const [modules, setModules] = useState();
  const [data, setData] = useState([]);

  const getEnvs = () => {
    fetch(constants.API_ENDPOINT + '/api/envs')
    .then(response => response.json())
    .then(data => {
      setEnvs(data.reverse());
      setLoaded(true);
      getModules();
    })
  };

  const getModules = (event) => {
    let env_name = $('#envs').val()
    setEnv(env_name);
    fetch(constants.API_ENDPOINT + '/api/modules?env=' + env_name)
    .then(response => response.json())
    .then(data => {
      data.push('all')
      setModules(data);
      getResults();
    })
  };

  const getResults = (event) => {
    let env_name = $('#envs').val()
    let module_name = $('#modules').val()
    fetch(constants.API_ENDPOINT + '/tasks' + '?env=' + env_name + '&module=' + module_name + '&lastres=true')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setData(data);
    })
  }

  useEffect(()=>{
    document.title = "Wcag monitoring Tool"
    getEnvs()
  },[])

  if (!Loaded){
      return (
        <Spinner animation="border" style={{ marginLeft: "50%"}} />
      )
  }else{
    return (
      <Container fluid>
        <Header />
        <h3>Single Page Results</h3>
        <Row>
          <label> Env Name: </label>
          {envs === undefined ? "" : <DropDown id='envs' list={envs} handleDropdownChange={getModules}/> }
          {modules === undefined ? "" : <label> Module Name: </label> }
          {modules === undefined ? "" : <DropDown id='modules' list={modules} handleDropdownChange={getResults}/> }
        </Row>
        <br />
        {data ? <Summary data={data} />: ''}
      </Container>
    )
  }
}

export default PageResult