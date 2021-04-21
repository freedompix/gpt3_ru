let gateURL = new URL("https://api.aicloud.sbercloud.ru/public/v1/public_inference/gpt3/predict");


async function loadJSON(url, text) {

  let rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' },

    body: JSON.stringify({ "text": text }) });



  let content = await rawResponse.json();
  let time = Math.random();

  console.log(content);
  return content.predictions.replace(text, "");

}














///
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items:
      [{
        "id": 1,
        "text": "Пример рeзультата, который можно добавить в цепочку входных данных, нажав плюс в нижнем углу, или удалить нажав иконку с корзиной." }],


      items2:
      [{
        "id": 1,
        "text": "Нейросеть может генерировать философские модели будущего выражаемые в " }] };






  }

  removeItem(index) {
    //let {items} = this.state.items;
    let items = this.state.items;
    items.splice(index, 1);
    this.setState({ items });
    console.log("Item was terminated. Total items: " + index);
  }

  removeItem2(index) {
    let { items2 } = this.state;
    items2.splice(index, 1);
    this.setState({ items2 });
    console.log("Item2 was terminated. Total items: " + index);
  }

  addToTop(index)
  {
    let items = this.state.items;
    let items2 = this.state.items2;


    let newId = Math.random();
    let newElem = { "id": newId, "text": items[index].text };
    this.state.items2.push(newElem);
    this.setState(this.state);

  }

  async add() {
    document.getElementById("sendButton1").style.display = "none";
    document.getElementById("progressBar").style.display = "block";

    //arrayOfTexts  
    let arrayOfTexts = this.state.items2.map(x => x.text).join("\n\n"); //join all texts from items
    console.log("Texts sum: " + arrayOfTexts);


    await loadJSON("https://api.aicloud.sbercloud.ru/public/v1/public_inference/gpt3/predict", arrayOfTexts).
    catch(e => {
      console.log('Error: ', e.message);
      alert('Error: ' + e.message);
    }).
    then(data => {

      //correction text linebreack  
      data = data.replace(/[\r|\n|\r\n|\n\n|\r\n\r\n]$/, '');
      data = data.replace(/^[\r|\n|\r\n|\n\n|\r\n\r\n]/, '');

      console.log(data);
      //alert(data);
      console.log(this.state.items.length);
      let newId = Math.random();


      let newElem = { "id": newId, "text": data };
      this.state.items.unshift(newElem);
      this.setState(this.state);




    });
    document.getElementById("progressBar").style.display = "none";
    document.getElementById("sendButton1").style.display = "inline-block";







  }

  onValInputChange(e) {
    let index = parseInt(e.target.getAttribute("data-index"));
    let items2 = this.state.items2;
    let value = e.target.value;
    items2[index].text = e.target.value;
    this.setState(state => ({}));


  }

  onValInputChange1(e) {
    let index = parseInt(e.target.getAttribute("data-index"));
    let items = this.state.items;
    let value = e.target.value;
    items[index].text = e.target.value;
    this.setState(state => ({}));


  }





  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "mainBlock" }, /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/React.createElement("div", { className: "col s12" }, /*#__PURE__*/React.createElement("h3", null, "Input chain:"))),


      this.state.items2.map((item, index) => /*#__PURE__*/



      React.createElement("div", { className: "row", key: index }, /*#__PURE__*/
      React.createElement("div", { className: "input-field col s12" }, /*#__PURE__*/
      React.createElement("div", { className: "containerForText" }, /*#__PURE__*/
      React.createElement("textarea", {
        className: "myTextarea",
        rows: "6",
        value: item.text,
        "data-index": index,
        onChange: this.onValInputChange.bind(this) }),


      this.state.items2.length > 1 && /*#__PURE__*/
      React.createElement("div", { className: "button text-align-right" }, /*#__PURE__*/
      React.createElement("a", { onClick: this.removeItem2.bind(this, index), className: "waves-effect waves-light btn-small blue lighten-2" }, /*#__PURE__*/React.createElement("i", { className: "small material-icons" }, "delete_forever"))))),








      this.state.items2.length - 1 !== index && /*#__PURE__*/
      React.createElement("div", { className: "col s12 text-align-center" }, /*#__PURE__*/React.createElement("i", { className: "small material-icons" }, "add_circle")))), /*#__PURE__*/






      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col s12 text-align-center" }, /*#__PURE__*/
      React.createElement("a", { id: "sendButton1", className: "waves-effect waves-light btn-large blue lighten-2", onClick: this.add.bind(this) }, "Generate"), /*#__PURE__*/
      React.createElement("div", { className: "progress gray lighten-2", id: "progressBar" }, /*#__PURE__*/
      React.createElement("div", { className: "indeterminate blue lighten-2" })))), /*#__PURE__*/











      React.createElement("div", { className: "row" }, /*#__PURE__*/React.createElement("div", { className: "col s12" }, /*#__PURE__*/React.createElement("h3", null, "Results:"))),


      this.state.items.map((item, index) => /*#__PURE__*/

      React.createElement("div", { className: "row", key: item.id }, /*#__PURE__*/
      React.createElement("div", { className: "input-field col s12" }, /*#__PURE__*/
      React.createElement("div", { className: "containerForText" }, /*#__PURE__*/

      React.createElement("textarea", {
        "data-index": index,
        className: "myTextarea",
        rows: "6",

        value: item.text,
        onChange: this.onValInputChange1.bind(this) }), /*#__PURE__*/



      React.createElement("div", { className: "button text-align-right" }, /*#__PURE__*/
      React.createElement("a", { onClick: this.addToTop.bind(this, index), className: "waves-effect waves-light btn-small blue lighten-2" }, /*#__PURE__*/React.createElement("i", { className: "small material-icons" }, "add")), " \xA0", /*#__PURE__*/
      React.createElement("a", { onClick: this.removeItem.bind(this, index), className: "waves-effect waves-light btn-small blue lighten-2" }, /*#__PURE__*/React.createElement("i", { className: "small material-icons" }, "delete_forever"), " "), "\xA0")))))));














  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));