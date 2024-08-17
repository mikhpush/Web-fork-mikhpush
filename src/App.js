import Application from "./components/Application";
import "../node_modules/mobx/dist/mobx.esm";
import { daoesStore } from "../src/components/domen/daoesStore";

// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./mobx.cjs.production.min.js')
// } else {
//   module.exports = require('./mobx.cjs.development.js')
// }
daoesStore.loadDaoes();

function App() {
  return <Application />;
}

export default App;
