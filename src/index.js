import React from "react";
import ReactDOM from "react-dom";
import {Container} from '@cerebral/react'
import controller from './controller'
import App from './views/App/index.js';

ReactDOM.render((
  <Container controller = {controller}>
    <App />
  </Container>
), document.getElementById("index"));
