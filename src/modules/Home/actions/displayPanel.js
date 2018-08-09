/**displayPanel Function*/
function displayPanel({state, props}){
  //Declaring fields
  let id = props.id;

  //Checking id
  if(id === "btnAdd"){
    //Setting state
    state.set('Home.addProps.displayPanel', "display");
    state.set('Home.deleteProps.displayPanel', "hidden");
    state.set('Home.viewProps.displayPanel', "hidden");
  }else if(id === "btnDelete"){
    //Setting state
    state.set('Home.addProps.displayPanel', "hidden");
    state.set('Home.deleteProps.displayPanel', "display");
    state.set('Home.viewProps.displayPanel', "hidden");
  }else{
    //Setting state
    state.set('Home.addProps.displayPanel', "hidden");
    state.set('Home.deleteProps.displayPanel', "hidden");
    state.set('Home.viewProps.displayPanel', "display");
  }
}

/**Exporting Action*/
export default[displayPanel];
