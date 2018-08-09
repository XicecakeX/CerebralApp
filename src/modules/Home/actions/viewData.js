import Axios from 'axios';

/**viewData Function*/
function viewData({state, props}){
  //Declaring fields
  let url = "http://localhost:3000/assets?" + props.option + "=" + props.value;

  //Disabling input fields
  state.set('Home.disabled', true);
  state.set('Home.viewProps.disabled', true);

  //Attempting to get data
  Axios.get(url).then(res => {
    //Checking data
    if(res.data[0] === "Single"){
      //Displaying data fieldset
      state.set('Home.viewProps.displayField', "display");
    }else{
      //Setting state
      state.set('Home.viewProps.data', res.data[1]);
      state.set('Home.viewProps.displaySelect', "display");
    }

    //Re-enabling input components
    state.set('Home.disabled', false);
    state.set('Home.viewProps.disabled', false);
    state.set('Home.viewProps.viewData', res.data[1]);

  }).catch((error) => {
    //Checking error
    if(error.response.status === 404){
      //Displaying error message
      alert("The " + props.option + " of " + props.value + " does not exist.");

      //Re-enabling input fields
      state.set('Home.disabled', false);
      state.set('Home.viewProps.disabled', false);
    }
  });
}

/**Exporting Action*/
export default[viewData];
