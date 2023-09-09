import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';
// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 

const ACTIONS = {
  CHOOSE_OPERATION: 'chooseOperation',
  DELETE: "delete",
  EVALUATE: 'evaluate',
  CHOOSE_DIGIT: 'chooseDigit',
  CLEAR: "clear" };



const inisialState = {
  currentOperator: 0,
  prevOperator: "",
  operation: "" };

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.CHOOSE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperator: payload,
          overwrite: false };

      }
      if (payload === "0" && state.currentOperator === "0") return state;
      if (payload === "0" && state === inisialState) return state;
      if (payload === "." && state.currentOperator === 0) return {
        ...state,
        currentOperator: `${state.currentOperator}${payload}` };

      if (payload === "." && state.currentOperator.includes(".")) return state;
      return {
        ...state,
        currentOperator: `${state.currentOperator || ""}${payload}` };

    case ACTIONS.CLEAR:
      return inisialState;
    case ACTIONS.DELETE:
      if (state.currentOperator === "" || state.currentOperator === 0) return inisialState;
      if (state.currentOperator.length === 1) {
        return { ...state, currentOperator: 0 };
      }
      return {
        ...state,
        currentOperator: state.currentOperator.slice(0, -1) };

    case ACTIONS.CHOOSE_OPERATION:
      // if(state.currentOperator===0 || "" && state.prevOperator === ""  )return state
      // if(state.currentOperator===0 || "" && state.prevOperator === "" &&(payload==="-"))return {
      // ...state,
      // currentOperator:`${payload}`,
      // prevOperator:`${state.prevOperator}${payload}`,
      // }
      if (state.currentOperator === "") {
        return {
          ...state,
          prevOperator: `${state.prevOperator}`,
          operation: `${state.operation}${payload}` };

      }
      //  if (state.currentOperator === "" && state.operation.length >= 1) {
      //   return {
      //     ...state,
      //       prevOperator:`${state.prevOperator}`,
      //     operation:`${state.operation[0]}${payload}`
      //   };
      // }
      // if ( state.currentOperator === "" &&  state.operation.includes("-")){
      //   return{
      //     ...state,
      //      prevOperator:`${state.prevOperator}${state.operation}` ,
      //     operation: payload,
      //     currentOperator:"" ,
      //   }
      // }
      if (state.prevOperator === "")
      return {
        ...state,
        prevOperator: state.currentOperator,
        operation: payload,
        currentOperator: "" };

      return {
        ...state,
        prevOperator: evaluate(state),
        operation: payload,
        currentOperator: "" };

    case ACTIONS.EVALUATE:
      if (state.operation === null || state.currentOperator === "" || state.currentOperator === 0) return inisialState;
      return {
        ...state,
        prevOperator: "",
        operation: "",
        currentOperator: evaluate(state),
        overwrite: true };}


}
function evaluate({ currentOperator, prevOperator, operation }) {
  const prev = parseFloat(prevOperator);
  const current = parseFloat(currentOperator);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  console.log(operation);
  if (operation.length > 2 ? operation = operation[operation.length - 1] /*operation[0].concat(operation[operation.length-1])*/ : operation) console.log(operation);
  switch (operation.length > 2 ? operation = operation[0] : operation) {

    case "+":
      computation = prev + current;
      break;
    case "++":
      computation = prev + current;
      break;
    case "+-":
      computation = prev + -current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "--":
      computation = prev - -current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "*-":
    case "-*":
      computation = prev * -current;
      break;
    case "*+":
    case "+*":
      computation = prev * +current;
      break;
    case "/":
      computation = prev / current;
      break;
    case "/-":
    case "-/":
      computation = prev / -current;
      break;
    case "/+":
    case "+/":
      computation = prev / +current;
      break;}

  return computation.toString();
}

// const test=[1,2,3,4,5,6,7,8]
// console.log(test.shift(),test.pop())
// console.log(test.splice(1,test.length))
const App = () => {


  const [{ currentOperator, prevOperator, operation }, dispatch] = React.useReducer(reducer, inisialState);

  return /*#__PURE__*/(
    React.createElement("div", { className: "container" }, /*#__PURE__*/
    React.createElement("div", { className: "calculator mx-auto border border-primary rounded text-center " }, /*#__PURE__*/
    React.createElement("div", { clasName: "row" }, /*#__PURE__*/
    React.createElement("div", { id: "display", className: "row mx-auto border border-secondary rounded " }, /*#__PURE__*/
    React.createElement("div", { className: "col-12" }, prevOperator, operation), /*#__PURE__*/
    React.createElement("div", { className: "col-12" }, currentOperator)), /*#__PURE__*/

    React.createElement("button", { className: "btn btn-outline-danger col-6 ", id: "clear", onClick: () => dispatch({ type: ACTIONS.CLEAR }) }, "AC"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-danger col-3", id: "delete", onClick: () => dispatch({ type: ACTIONS.DELETE }) }, "DEL"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-info col-3", id: "divide", value: "/", onClick: e => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: e.target.value }) }, "/"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-secondary col-3", id: "zero", value: 0, onClick: e => dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: e.target.value }) }, "0"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-secondary col-3", id: "one", value: 1, onClick: e => dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: e.target.value }) }, "1"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-secondary col-3", id: "two", value: 2, onClick: e => dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: e.target.value }) }, "2"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-info col-3", id: "multiply", value: "*", onClick: e => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: e.target.value }) }, "*"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-secondary col-3", id: "three", value: 3, onClick: e => dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: e.target.value }) }, "3"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-secondary col-3", id: "four", value: 4, onClick: e => dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: e.target.value }) }, "4"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-secondary col-3", id: "five", value: 5, onClick: e => dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: e.target.value }) }, "5"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-info col-3", id: "add", value: "+", onClick: e => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: e.target.value }) }, "+"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-secondary col-3", id: "six", value: 6, onClick: e => dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: e.target.value }) }, "6"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-secondary col-3", id: "seven", value: 7, onClick: e => dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: e.target.value }) }, "7"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-secondary col-3", id: "eight", value: 8, onClick: e => dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: e.target.value }) }, "8"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-info col-3", id: "subtract", value: "-", onClick: e => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: e.target.value }) }, "-"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline-secondary col-3", id: "nine", value: 9, onClick: e => dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: e.target.value }) }, "9"), /*#__PURE__*/

    React.createElement("button", { className: "btn btn-outline-secondary col-3", id: "zero", value: "-", onClick: e => dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: e.target.value }) }, "+/-"), /*#__PURE__*/


    React.createElement("button", { className: "btn btn-outline-secondary col-3", id: "decimal", value: ".", onClick: e => dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: e.target.value }) }, "."), /*#__PURE__*/

    React.createElement("button", { className: "btn btn-outline-success col-6", id: "equals", onClick: () => dispatch({ type: ACTIONS.EVALUATE }) }, "=")))));




};



ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));
//"5 * - + 5"