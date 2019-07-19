import moduleOne from "./src/modules/moduleOne.js";
import moduleTwo from "./src/modules/moduleTwo.js"

const data = {
    index: 10,
  }


const render = render(() => {
  return ( `
    <div>
      ${moduleOne.init(data)}
      ${moduleTwo.init(data)}
    </div>
  `)
});

document.getElementById('App').innerHtml(render());

