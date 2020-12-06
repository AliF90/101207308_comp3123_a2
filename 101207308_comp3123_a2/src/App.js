import logo from './logo.svg';
import './App.css';
import { Row , Col, Container , Image} from 'react-bootstrap';
import React , { Component } from 'react';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      weather  : null,
      main  : null,
      wind  : null,
      sys  : null,
      name  : null,
      iconhref : null,
      isMounted : false
     };
  }

  componentDidMount() {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=e105273b7411e9acf88e353714c0b4fe`)
    .then(res => {
        const { weather , main , wind , sys , name } = res.data;
        let ref =  `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
        this.setState({ weather : weather[0] , main , wind , sys , name , iconhref : ref ,isMounted : true });
    })
}

  render() {
    const { weather , main , wind , sys , name , iconhref ,isMounted } = this.state;
    if(isMounted){
      return (
        <Container fluid>
          <Row className="justify-content-center" id="header">
            <Col className="text-center">
                Weather App
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <Col xs="4" className="" id="weathercard">
              <Row className="justify-content-between">
                <Col xs="3" className="h3 p-5">
                  {name}
                </Col>
                <Col xs="3" className="justify-content-center">
                  <Row className="mt-1 p-0">
                    <Image src={iconhref}/>
                  </Row>
                  <Row className="justify-content-center h5 mr-1">
                    {weather.main}
                  </Row>
                </Col>
              </Row>
              <Row className="justify-content-center mt-3">
                <Col xs="6" className="">
                  <Row className="h6 justify-content-center">
                    Tempreture: {main.temp}
                  </Row>
                  <Row className="h6 justify-content-center mt-3">
                    Feels Like: {main.feels_like}
                  </Row>
                  <Row className="h6 justify-content-center mt-3">
                    Min Tempreture: {main.temp_min}
                  </Row>
                  <Row className="h6 justify-content-center mt-3">
                    Max Tempreture: {main.temp_max}
                  </Row>
                  <Row className="h6 justify-content-center mt-3">
                    Humidity: {main.humidity}
                  </Row>
                  <Row className="h6 justify-content-center mt-3 mb-5">
                    Wind Speed: {wind.speed }
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }else{
      return(
        <Row>
          Loading
        </Row>
      )
    }
  

  }
}

export default App;


