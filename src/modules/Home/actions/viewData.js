import Axios from 'axios';

/**viewData Function*/
function viewData({state, props}){
  //Declaring fields
  let url = "http://localhost:3000/assets/" + props.option + "/" + props.value;

  //Disabling input fields
  state.set('Home.disabled', true);

  //Attempting to get data
  Axios.get(url).then(res => {
    //Logging data
    console.log(res.data);
    
    //Re-enabling input fields
    state.set('Home.disabled', false);
  }).catch((error) => {
    //Checking error
    if(error.response){
      //Displaying error message
      alert("ERROR");
    }
  });
}

/**Exporting Action*/
export default[viewData];
