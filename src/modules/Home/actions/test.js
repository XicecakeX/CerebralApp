import updateMessage from './updateMessage';
import Axios from 'axios';

/**testMessage Function*/
function testMessage(){
  let url = "http://localhost:3000/assets/2";

  Axios.get(url).then(res => {
    console.log(res.data);
  }).catch((error) => {
    //Checking error
    if(error.response){
      //Displaying error message
      alert("ERROR");
    }
  });
}

/**Exporting Action*/
export default[
  testMessage
];
