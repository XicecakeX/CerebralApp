/**setInput Function*/
function setInput({state, props}){
  //Declaring fields
  let id = props.id;
  let val = props.value;

  //Checking id
  if(id === "selViewOptions"){
    //Setting state
    state.set('Home.viewProps.displayField', "hidden");
    state.set('Home.viewProps.displayInput', "display");
    state.set('Home.viewProps.option', val);
    state.set('Home.viewProps.search', "");
    state.set('Home.viewProps.viewData', {});
  }else if(id === "txtSearch"){
    //Setting state
    state.set('Home.viewProps.search', val);
  }
}

/**Exporting Action*/
export default[setInput];
