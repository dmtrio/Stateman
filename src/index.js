import moduleOne from "./modules/moduleOne.js";
import moduleTwo from "./modules/moduleTwo.js"

const data = {
    index: 10,
  }

const render = () => {
  return ( `
    <div>
      ${moduleOne.init(data)}
      ${moduleTwo.init(data)}
    </div>
  `);
};

document.getElementById('App').innerHtml(render());

