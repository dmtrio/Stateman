import StateMan from "./StateMan.js";

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
let objs = [{a: 0}, {b: 1}, {c: 2}, {d: 3}, {e: 4}]
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

var viewModelIndexUpdate = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_INDEX':
      var newIndex = Number(action.index);
      // console.log('isSame:', state.arrayIndex === newIndex, 'vals:', state.arrayIndex, newIndex)
      if (state.arrayIndex !== newIndex) {
        state.arrayIndex = newIndex;
      }
      break;
  }
}

function init(data) {
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
  var hi = new StateMan(
    'PrimaryState',
    [
      // {name: 'currentObj', initial: {}},
      {name: 'arrayIndex', initial: data.index}
    ],[
      viewModelIndexUpdate,
      // viewModelUpdate,
    ],[]
  );

  const interval = setInterval(() => {
    // viewModel.update({type: 'UPADATE_CURRENT_OBJ', index: Math.floor(Math.random() * 5)})
    hi.update({type: 'UPDATE_TWO_PROPERTIES', index: Math.floor(Math.random() * 5)});  
  }, 100)
  setTimeout(() => {
    clearInterval(interval);
    console.log(callCount)
  }, 6000);
};

const data = {
  index: 10,
}
init(data)

// const interval = setInterval(() => {
//   callCount++;
// }, 1)
// setTimeout(() => {
//   clearInterval(interval);
//   console.log(callCount)
// }, 10000);