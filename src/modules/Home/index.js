import { Module } from "cerebral";
import mounted from './signals/mounted';
import assetSelected from './signals/assetSelected';
import buttonClicked from './signals/buttonClicked';
import inputUpdated from './signals/inputUpdated';
import viewClicked from './signals/viewClicked';

export default Module({
  state: {
    addProps: {
      displayPanel: "hidden"
    },
    deleteProps: {
      displayPanel: "hidden"
    },
    disabled: false,
    id: "",
    viewProps: {
      assetOption: "Choose Asset",
      data: {},
      disabled: false,
      displayField: "hidden",
      displayInput: "hidden",
      displayPanel: "hidden",
      displaySelect: "hidden",
      option: "Choose Option",
      search: "",
      viewData: {}
    }
  },
  signals: {
    mounted,
    assetSelected,
    buttonClicked,
    inputUpdated,
    viewClicked
  }
})
