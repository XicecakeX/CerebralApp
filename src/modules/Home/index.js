import { Module } from "cerebral";

import mounted from './signals/mounted';
import textChanged from './signals/textChanged';
import clearClicked from './signals/clearClicked';

export default Module({
  state: {
    message: 'Hello World'
  },
  signals: {
    mounted,
    textChanged,
    clearClicked
  }
})
