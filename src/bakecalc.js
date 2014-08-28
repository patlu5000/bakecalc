/** @jsx React.DOM */

var PRESET_INGREDIENTS = [ 
{ "key": "baking-powder", "name": "baking powder", "unit": "teaspoons", "cost": 0.08 }, 
{ "key": "butter", "name": "butter", "unit": "cups", "cost": 0.50 }, 
{ "key": "chocolate-chips", "name": "chocolate chips", "unit": "cups", "cost": 1.10 }, 
{ "key": "cinnamon", "name": "cinnamon", "unit": "teaspoons", "cost": 0.06 }, 
{ "key": "cocoa", "name": "cocoa", "unit": "cups", "cost": 1.54 }, 
{ "key": "eggs", "name": "eggs", "unit": null, "cost": 0.25 }, 
{ "key": "flour", "name": "flour", "unit": "cups", "cost": 0.1 }, 
{ "key": "margarine", "name": "margarine", "unit": "cups", "cost": 0.5 }, 
{ "key": "milk", "name": "milk", "unit": "cups", "cost": 0.17 }, 
{ "key": "shortening", "name": "shortening", "unit": "cups", "cost": 0.66 }, 
{ "key": "sugar", "name": "sugar", "unit": "cups", "cost": 0.3 }, 
{ "key": "vanilla", "name": "vanilla", "unit": "teaspoons", "cost": 0.04 }, 
{ "key": "vegetable-oil", "name": "vegetable oil", "unit": "cups", "cost": 0.46 }, 
{ "key": "yeast", "name": "yeast", "unit": "packages", "cost": 0.51 } 
];

var PRESET_SUPPLIES = [
{ "key": "box", "name": "box", "cost": 0.31 },
{ "key": "cake-board", "name": "cake board", "cost": 1.00 },
{ "key": "cake-circle", "name": "cake circle", "cost": 1.00 },
{ "key": "dowel-rod", "name": "dowel rod", "cost": 1.00 },
{ "key": "serving-stand", "name": "serving stand", "cost": 1.00 }
];

var runningKey = 0;

var Calculator = React.createClass({
  getInitialState: function() {
    return { ingredients: [], supplies: [], hours: 0, wage: 0, overhead: 0, miles: 0, rate: 0 };
  },
    handleIngredientsInput: function(ingredients) {
      this.setState({ ingredients: ingredients });
    },
    handleSuppliesInput: function(supplies) {
      this.setState({ supplies: supplies });
    },
    handleTimeInput: function(hours, wage) {
      this.setState({ hours: hours, wage: wage });
    },
    handleOverheadInput: function(overhead) {
      this.setState({ overhead: overhead });
    },
    handleDeliveryInput: function(miles, rate) {
      this.setState({ miles: miles, rate: rate });
    },
    render: function() {
      var ingredientsTotal = _.reduce(_.map(this.state.ingredients, function(ing){ return ing['cost'] * ing['quantity'] }), function(memo, num){ return memo + num; }, 0).toFixed(2);
      var suppliesTotal = _.reduce(_.map(this.state.supplies, function(ing){ return ing['cost'] * ing['quantity'] }), function(memo, num){ return memo + num; }, 0).toFixed(2);
      var timeTotal = (this.state.hours * this.state.wage).toFixed(2);
      var overheadTotal = Number(this.state.overhead).toFixed(2);
      var deliveryTotal = (this.state.miles * this.state.rate).toFixed(2);
      return (
          <div className="calculator row">
          <div className="col-md-7">
          <form className="form-inline">
          <ItemsBox name="Ingredients" inputsComponent={IngredientInputs} activeItems={this.state.ingredients} presetItems={PRESET_INGREDIENTS} onUserInput={this.handleIngredientsInput} />
          <ItemsBox name="Supplies" inputsComponent={SupplyInputs} activeItems={this.state.supplies} presetItems={PRESET_SUPPLIES} onUserInput={this.handleSuppliesInput} />
          <TimeBox onUserInput={this.handleTimeInput} />
          <OverheadBox onUserInput={this.handleOverheadInput} />
          <DeliveryBox onUserInput={this.handleDeliveryInput} />
          </form>
          </div>
          <div className="col-md-5">
          <h4>Ingredients total: {ingredientsTotal}</h4>
          <h4>Supplies total: {suppliesTotal}</h4>
          <h4>Time total: {timeTotal}</h4>
          <h4>Overhead total: {overheadTotal}</h4>
          <h4>Delivery total: {deliveryTotal}</h4>
          </div>
          </div>
          );
    }
});

var ItemsBox = React.createClass({
  handleItemSelect: function(item) {
    var items = this.props.activeItems;
    item["quantity"] = 1
    if(!item.key) {
      item["key"] = runningKey;
      runningKey = runningKey + 1;
    }
    items.push(item);
    this.props.onUserInput(items);
  },
    handleItemChange: function(key, changes) {
      var items = this.props.activeItems;
      item = _.find(items, function(i){ return i.key == key });
      index = _.indexOf(items, item);
      item = _.extend(item, changes);
      items[index] = item;
      this.props.onUserInput(items);
    },
    render: function() {
      var itemLinks = _.difference(this.props.presetItems, this.props.activeItems).map(function(item) {
        return (
          <li><AddItemLink onItemSelect={this.handleItemSelect} item={item} /></li>
          );
      }.bind(this));
      var itemFields = this.props.activeItems.map(function(item) {
        return (
          this.props.inputsComponent({onItemChange: this.handleItemChange, item: item})
          );
      }.bind(this));
      return (
          <div className="input-box">
          <h3>{this.props.name}</h3>
          {itemFields}
          <div>Choose your items below:</div>
          <ul className="list-inline">
          {itemLinks}
          <li><AddItemLink onItemSelect={this.handleItemSelect} item={{ quantity: 1, name: "", cost: null }} /></li>
          </ul>
          </div>
          );
    }
});

var IngredientInputs = React.createClass({
  handleChange: function(event) {
    var changes = { 
      quantity: this.refs.ingredientQuantityInput.getDOMNode().value, 
      name: this.refs.ingredientNameInput.getDOMNode().value, 
      cost: this.refs.ingredientCostInput.getDOMNode().value 
    };
    this.props.onItemChange(this.props.item.key, changes);
  },
    render: function() {
      if ( _.contains(_.pluck(PRESET_INGREDIENTS, "key"), this.props.item.key)) {
        var quantity = <input defaultValue={this.props.item.quantity} type="number" className="form-control input-sm" type="number" ref="ingredientQuantityInput" onChange={this.handleChange} />;
        var name = <span> {this.props.item.unit} of <input hidden defaultValue={this.props.item.name} type="text" ref="ingredientNameInput" onChange={this.handleChange} /><strong className="item-name">{this.props.item.name}</strong> at </span>;
        var endText = " per.";
      } else {
        var quantity = <input hidden defaultValue={this.props.item.quantity} type="number" ref="ingredientQuantityInput" onChange={this.handleChange} />;
        var name = <span><input defaultValue={this.props.item.name} type="text" className="form-control input-sm" ref="ingredientNameInput" onChange={this.handleChange} /> at </span>;
        var endText = "";
      }
      return (
        <div className="input-fields">
        {quantity}
        {name}
        <div className="input-group input-group-sm">
        <span className="input-group-addon">$</span>
        <input defaultValue={this.props.item.cost} type="number" className="form-control" ref="ingredientCostInput" onChange={this.handleChange} />
        </div>
        {endText}
        </div>
        );
    }
});

var SupplyInputs = React.createClass({
  handleChange: function(event) {
    var changes = { 
      quantity: this.refs.supplyQuantityInput.getDOMNode().value, 
      name: this.refs.supplyNameInput.getDOMNode().value, 
      cost: this.refs.supplyCostInput.getDOMNode().value 
    };
    this.props.onItemChange(this.props.item.key, changes);
  },
    render: function() {
      if (_.contains(_.pluck(PRESET_SUPPLIES, "key"), this.props.item.key)) {
        var quantity = <input defaultValue={this.props.item.quantity} type="number" className="form-control input-sm" type="number" ref="supplyQuantityInput" onChange={this.handleChange} />;
        var name = <span><input hidden defaultValue={this.props.item.name} type="text" ref="supplyNameInput" onChange={this.handleChange} /> <strong className="item-name">{this.props.item.name}</strong> at </span>;
      } else {
        var quantity = <input hidden defaultValue={this.props.item.quantity} type="number" ref="supplyQuantityInput" onChange={this.handleChange} />;
        var name = <span><input defaultValue={this.props.item.name} type="text" className="form-control input-sm" ref="supplyNameInput" onChange={this.handleChange} /> at </span>;
      }
      return (
        <div className="input-fields">
        {quantity}
        {name}
        <div className="input-group input-group-sm">
        <span className="input-group-addon">$</span>
        <input defaultValue={this.props.item.cost} className="form-control" type="number" ref="supplyCostInput" onChange={this.handleChange} />
        </div>
        </div>
        );
    }
});

var AddItemLink = React.createClass({
  handleClick: function(event) {
    this.props.onItemSelect(this.props.item);
    return false;
  },
    render: function() {
      var displayName = this.props.item.name || "something else";
      return(
        <a onClick={this.handleClick} className="item-link">{displayName}</a>
        );
    }
});

var TimeBox = React.createClass({
  handleChange: function(event) {
    this.props.onUserInput(
      this.refs.timeHoursInput.getDOMNode().value,
      this.refs.timeWageInput.getDOMNode().value
    );
  },
    render: function() {
      return (
        <div className="input-box">
        <h3>Time</h3>
        <div className="input-fields">
        <input type="number" className="form-control input-sm" ref="timeHoursInput" onChange={this.handleChange} /> hours at <div className="input-group input-group-sm">
        <span className="input-group-addon">$</span>
        <input type="number" className="form-control input-sm" ref="timeWageInput" onChange={this.handleChange} />
        </div> an hour.
        </div>
        </div>
        );
    }
});

var OverheadBox = React.createClass({
  handleChange: function(event) {
    this.props.onUserInput(this.refs.overheadInput.getDOMNode().value);
  },
    render: function() {
      return(
        <div className="input-box">
        <h3>Overhead</h3>
        <div className="input-fields">
        <div className="input-group input-group-sm">
        <span className="input-group-addon">$</span>
        <input type="number" className="form-control input-sm" ref="overheadInput" onChange={this.handleChange} />
        </div>
        </div>
        </div>
        );
    }
});

var DeliveryBox = React.createClass({
  handleChange: function(event) {
    this.props.onUserInput(
      this.refs.deliveryMilesInput.getDOMNode().value,
      this.refs.deliveryRateInput.getDOMNode().value
      );
  },
    render: function() {
      return (
        <div className="input-box">
        <h3>Delivery</h3>
        <div className="input-fields">
        <input type="number" className="form-control input-sm" ref="deliveryMilesInput" onChange={this.handleChange} /> miles at <div className="input-group input-group-sm">
        <span className="input-group-addon">$</span>
        <input type="number" className="form-control input-sm" ref="deliveryRateInput" onChange={this.handleChange} /> 
        </div> per mile.
        </div>
        </div>
        );
    }
});

React.renderComponent(
    <Calculator />,
    document.getElementById('content')
    );
