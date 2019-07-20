import StateMan from "../stateman/StateMan.js";

const views = {
  title: (state) => (`From moduleTwo: ${state.currentObj.a}`),
}

const initStateManSubscriptionsModuleTwo = (subscribe) => {
  subscribe(['currentObj'], (state) => {
    return renders.renderTitle(state);
    // console.log('p', state.currentObj, 's', state.arrayIndex);
  });
}

var viewModelIndexUpdate = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_INDEX':
      var newIndex = Number(action.index);
      if (state.arrayIndex !== newIndex) {
        state.arrayIndex = newIndex;
      }
      break;
  }
}

function initComponent(data) {
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

  return (`
    ${views.title(hi)}
  `);
};

const render = (data) => {
  return initComponent(data);
}

export default {render};
