import moduleOne from "./src/modules/moduleOne.js";
import moduleTwo from "./src/modules/moduleTwo.js"

const data = {
    index: 10,
  }


const render = render(() => {
  return ( `
    ${moduleOne.init(data)}
    ${moduleTwo.init(data)}
  `)
});

document.getElementById('App').innerHtml(render());

