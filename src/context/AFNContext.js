const { createContext } = require("react");

const AFNContext = createContext({
  myAFNs: null,
  setMyAFNs: ()=>{}
});

export default AFNContext;