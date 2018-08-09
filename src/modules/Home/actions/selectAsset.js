/**selectAsset Function*/
function selectAsset({state, props}){
  //Setting state
  state.set('Home.viewProps.displayField', "display");
  state.set('Home.viewProps.viewData', props.data);
}

/**Exporting Action*/
export default[selectAsset];
