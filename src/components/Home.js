import {Container, Row, Spinner, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import '../styles/home.css'
import Header from './Header'
import Chart from './charts/Charts'
import DropDown from './dropdown/DropDown'
import $ from 'jquery';
const constants = require('../constants');

const Home = ({loaded}) => {

  const [Loaded, setLoaded] = useState(loaded);
  const [envs, setEnvs] = useState(['all']);
  const [env, setEnv] = useState();
  const [module, setModule] = useState();
  const [modules, setModules] = useState();
  const [chartdata, setChartData] = useState([]);
  const [isActive, setActive] = useState(false);

  const getNum = (number) => {
    if (isNaN(number)) {
      return 0;
    }
    return number;
  }

  const getEnvs = () => {
    fetch(constants.API_ENDPOINT + '/bstack/api/envs')
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
    fetch(constants.API_ENDPOINT + '/bstack/api/modules?env=' + env_name)
    .then(response => response.json())
    .then(data => {
      data.push('all')
      setModules(data);
      getResults();
    })
  };

  const getResults = (event) => {
    setLoaded(false)
    let env_name = $('#envs').val()
    let module_name = $('#modules').val()
    let last_build = $('.active').val()
    fetch(constants.API_ENDPOINT + '/bstack/api/module/results/' + last_build + '?env=' + env_name + '&module=' + module_name)
    .then(response => response.json())
    .then(data => {
      let chartData = [];
      data.builds.forEach(build => {
        let json = {};
        json['build_no'] = build;
        data.tasks[build].forEach(result => {
          if (result.results[0] && result.results[0].count){
            json['date'] = result.results[0].date
            json['total'] = json['total'] ? json['total'] + getNum(result.results[0].count.total) : getNum(result.results[0].count.total);
            json['serious'] = json['serious'] ? json['serious'] + getNum(result.results[0].count.serious) : getNum(result.results[0].count.serious);
            json['critical'] = json['critical'] ? json['critical'] + getNum(result.results[0].count.critical) : getNum(result.results[0].count.critical);
            json['moderate'] = json['moderate'] ? json['moderate'] + getNum(result.results[0].count.moderate) : getNum(result.results[0].count.moderate);
            json['minor'] = json['minor'] ? json['minor'] + getNum(result.results[0].count.minor) : getNum(result.results[0].count.minor);
          }
        })
        if (json['total'])
          chartData.push(json);
      })
      setChartData(chartData);
      setModule(module_name);
      setLoaded(true)
    })
  }

  const getTasks = (event) => {
    setActive(!isActive);
    setLoaded(false)
    getResults(event);
  }

  const chartClick = (event) => {
    let env_name = $('#envs').val()
    let module_name = $('#modules').val();
    let build_no = event.activePayload[0].payload.build_no;
    window.location.href = '/result/' + env_name + '/' + module_name + '/' + build_no;
  }

  useEffect(()=>{
    document.title = "Wcag monitoring Tool"
    getEnvs()
  },[])

  return (
    <Container fluid>
      <Header />
      <h3>WCAG Monitoring Tool</h3>
      <Row>
        <label> Env Name: </label>
        {envs === undefined ? "" : <DropDown id='envs' list={envs} handleDropdownChange={getModules}/> }
        {modules === undefined ? "" : <label> Module Name: </label> }
        {modules === undefined ? "" : <DropDown id='modules' list={modules} handleDropdownChange={getResults}/> }
        {modules === undefined ? "" : <Button variant="outline-dark" type="submit" value="3" onClick={getTasks} active={!isActive ? 'active': null}>Last 3</Button> }
        {modules === undefined ? "" : <Button variant="outline-dark" type="submit" value="5" onClick={getTasks} active={isActive ? 'active': null}>Last 5</Button> }
      </Row>
      <br />
      {!Loaded ? <Spinner animation="border" style={{ marginLeft: "50%"}} /> : ''}
      {(chartdata.length === 0) && Loaded ? <span>No Data</span> : <Chart data={chartdata} clickHandler={chartClick}/> }
    </Container>
  )
}

export default Home