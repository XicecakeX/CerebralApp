import { Module } from "cerebral";
import mounted from './signals/mounted';
import buttonClicked from './signals/buttonClicked';
import viewClicked from './signals/viewClicked';

export default Module({
  state: {
    id: "",
  },
  signals: {
    mounted,
    buttonClicked,
    viewClicked
  }
})
