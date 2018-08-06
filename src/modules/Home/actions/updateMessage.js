

function updateMessage({state, props}) {
  state.set('Home.message', props.value);
}

export default [
  updateMessage
];
