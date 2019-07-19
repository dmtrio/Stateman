import StateMan from "../stateman/StateMan.js";

const renders = {
  renderTitle: (state) => (`From moduleTwo: ${state.currentObj.a}`),
}

const initStateManSubscriptionsModuleTwo = (subscribe) => {
  subscribe(['currentObj'], (state) => {
    return renders.renderTitle(state);
    // return `From moduleTwo: ${state.currentObj}`;
    // console.log('p', state.currentObj, 's', state.arrayIndex);
  });
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

function component(data) {
  const el = data.el;
  const hi = new StateMan(
    'PrimaryState',
    [
      {name: 'arrayIndex', initial: data.index}
    ],[
      viewModelIndexUpdate,
    ],[
      initStateManSubscriptionsModuleTwo
    ]
  );
  console.log('initial', renders.renderTitle(hi));

  return renders.renderTitle;
};

// const data = {
//   index: 10,
// }
// init(data)

export default {component};
