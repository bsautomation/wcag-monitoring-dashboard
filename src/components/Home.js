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
  const [data, setData] = useState([]);
  const [isActive, setActive] = useState(false);

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
          if (result.results[0] && result.results[0].count.serious){
            json['date'] = result.results[0].date
            json['total'] = json['total'] ? json['total'] + result.results[0].count.total : result.results[0].count.total;
            json['serious'] = json['serious'] ? json['serious'] + result.results[0].count.serious : result.results[0].count.serious;
            json['critical'] = json['critical'] ? json['critical'] + result.results[0].count.critical : result.results[0].count.critical;
            json['moderate'] = json['moderate'] ? json['moderate'] + result.results[0].count.moderate : result.results[0].count.moderate;
            json['minor'] = json['minor'] ? json['minor'] + result.results[0].count.minor : result.results[0].count.minor;
          }
        })
        if (json['total'])
          chartData.push(json);
      })
      setData(chartData);
      setModule(module_name);
    })
  }

  const getTasks = (event) => {
    setActive(!isActive);
    $(this).parent().find("button").removeClass('active')
    $(this).addClass('active');
    let module_name = $('#modules').val()
    // setLoaded(false)
    fetch(constants.API_ENDPOINT + '/bstack/api/module/results/' + event.target.value + '?env=' + env + '&module=' + module_name)
    .then(response => response.json())
    .then(data => {
      let chartData = [];
      data.builds.forEach(build => {
        let json = {};
        json['build_no'] = build;
        data.tasks[build].forEach(result => {
          if (result.results[0] && result.results[0].count.serious){
            json['date'] = result.results[0].date
            json['total'] = json['total'] ? json['total'] + result.results[0].count.total : result.results[0].count.total;
            json['serious'] = json['serious'] ? json['serious'] + result.results[0].count.serious : result.results[0].count.serious;
            json['critical'] = json['critical'] ? json['critical'] + result.results[0].count.critical : result.results[0].count.critical;
            json['moderate'] = json['moderate'] ? json['moderate'] + result.results[0].count.moderate : result.results[0].count.moderate;
            json['minor'] = json['minor'] ? json['minor'] + result.results[0].count.minor : result.results[0].count.minor;
          }
        })
        if (json['total'])
          chartData.push(json);
      })
      setData(chartData);
      setLoaded(true)
    })
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

  if (!Loaded){
      return (
        <Spinner animation="border" style={{ marginLeft: "50%"}} />
      )
  }else{
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
        {(data.length === 0) ? <span>No Data</span> : <Chart data={data} clickHandler={chartClick}/> }
      </Container>
    )
  }
}

export default Home