import Layout from "components/layout";

import "styles/index.scss";

const { default: MarvelCharacters } = require("pages/MarvelCharacters");

const App = () => {
  return (
    <Layout>
      <MarvelCharacters />
    </Layout>
  );
};

export default App;
