import StateMan from "../StateMan.js";

let callCount = 0;

var initViewModelSubscriptions = (subscribe) => {
  // subscribe('currentObj', (state) => {
  //   console.log('p', state.currentObj, 's', state.arrayIndex);
  // });
  // subscribe('arrayIndex', (state) => {
  //   console.log('p', state.arrayIndex, 's', state.currentObj);
  // });
  subscribe(['currentObj', 'arrayIndex'], (state) => {
    return `${state.currentObj}, 's', ${state.arrayIndex}`;
    // console.log('p', state.currentObj, 's', state.arrayIndex);
  });
}
let objs = [{a: 0}, {a: 1}, {a: 2}, {a: 3}, {a: 4}]
var viewModelUpdate = (state, action) => {
  switch (action.type) {
    case 'UPADATE_CURRENT_OBJ':
      var obj = objs[action.index];
      if (state.currentObj !== obj) {
        state.currentObj = obj;
      }
      break
    case 'UPDATE_TWO_PROPERTIES':
        callCount++;
        var newIndex = Number(action.index);
        console.log('isSame:', state.arrayIndex === newIndex, 'vals:', state.arrayIndex, newIndex)
        state.update({type: 'UPADATE_CURRENT_OBJ', index: action.index})
        state.update({type: 'UPDATE_CURRENT_INDEX', index: action.index})
      break; 
  }
}

function init(data) {
  // do I need to call it with new anymore?
  var viewModel = new StateMan(
    'PrimaryState',
    [
      {name: 'currentObj', initial: {}},
      // {name: 'arrayIndex', initial: data.index}
    ],[
      // viewModelIndexUpdate,
      viewModelUpdate,
    ],[
      initViewModelSubscriptions
    ]
  );

  const interval = setInterval(() => {
    // viewModel.update({type: 'UPADATE_CURRENT_OBJ', index: Math.floor(Math.random() * 5)})
    viewModel.update({type: 'UPDATE_TWO_PROPERTIES', index: Math.floor(Math.random() * 5)});  
  }, 100)
  setTimeout(() => {
    clearInterval(interval);
    console.log(callCount)
  }, 6000);
};

export default {init};