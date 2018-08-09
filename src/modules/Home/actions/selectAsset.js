/**selectAsset Function*/
function selectAsset({state, props}){
  //Setting state
  console.log(props.data);
  state.set('Home.viewProps.displayField', "display");
  state.set('Home.viewProps.assetOption', props.value)
  state.set('Home.viewProps.viewData', props.data);
}

/**Exporting Action*/
export default[selectAsset];
