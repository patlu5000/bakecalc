/** @jsx React.DOM */

var PRESET_INGREDIENTS = [ 
{ "key": "baking-powder", "name": "baking powder", "unit": "teaspoons", "cost": 0.08 }, 
{ "key": "butter", "name": "butter", "unit": "cups", "cost": 0.5 }, 
{ "key": "chocolate-chips", "name": "chocolate chips", "unit": "cups", "cost": 1.1 }, 
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
{ "key": "box", "name": "box", "cost": 1.00 },
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
          <ItemsBox name="Ingredients" inputsComponent={IngredientInputs} activeItems={this.state.ingredients} presetItems={PRESET_INGREDIENTS} onUserInput={this.handleIngredientsInput} />
          <ItemsBox name="Supplies" inputsComponent={SupplyInputs} activeItems={this.state.supplies} presetItems={PRESET_SUPPLIES} onUserInput={this.handleSuppliesInput} />
          <TimeBox onUserInput={this.handleTimeInput} />
          <OverheadBox onUserInput={this.handleOverheadInput} />
          <DeliveryBox onUserInput={this.handleDeliveryInput} />
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
          <AddItemLink onItemSelect={this.handleItemSelect} item={item} />
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
          {itemLinks}
          <AddItemLink onItemSelect={this.handleItemSelect} item={{ quantity: 1, name: "", cost: null }} />
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
        var firstInput = <input defaultValue={this.props.item.quantity} type="number" ref="ingredientQuantityInput" onChange={this.handleChange} />;
        var middleText = this.props.item.unit + " of " + this.props.item.name + " at ";
        var endText = "per ";
        var hiddenInput = <input hidden defaultValue={this.props.item.name} type="text" ref="ingredientNameInput" onChange={this.handleChange} />;
      } else {
        var firstInput = <input defaultValue={this.props.item.name} type="text" ref="ingredientNameInput" onChange={this.handleChange} />;
        var middleText = " at ";
        var endText = "";
        var hiddenInput = <input hidden defaultValue={this.props.item.quantity} type="number" ref="ingredientQuantityInput" onChange={this.handleChange} />;
      }
      return (
        <div>
        {firstInput}
        {middleText}
        <input defaultValue={this.props.item.cost} type="number" ref="ingredientCostInput" onChange={this.handleChange} />
        {endText}
        {hiddenInput}
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
        var firstInput = <input defaultValue={this.props.item.quantity} type="number" ref="supplyQuantityInput" onChange={this.handleChange} />;
        var middleText = this.props.item.name + " at ";
        var hiddenInput = <input hidden defaultValue={this.props.item.name} type="text" ref="supplyNameInput" onChange={this.handleChange} />;
      } else {
        var firstInput = <input defaultValue={this.props.item.name} type="text" ref="supplyNameInput" onChange={this.handleChange} />;
        var middleText = " at ";
        var hiddenInput = <input hidden defaultValue={this.props.item.quantity} type="number" ref="supplyQuantityInput" onChange={this.handleChange} />;
      }
      return (
        <div>
        {firstInput}
        {middleText}
        <input defaultValue={this.props.item.cost} type="number" ref="supplyCostInput" onChange={this.handleChange} />
        {hiddenInput}
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
        <a onClick={this.handleClick}>{displayName}</a>
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
        <div>
        <h3>Time</h3>
        <input type="number" ref="timeHoursInput" onChange={this.handleChange} /> hours at 
        <input type="number" ref="timeWageInput" onChange={this.handleChange} /> an hour
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
        <div>
        <h3>Overhead</h3>
        <input type="number" ref="overheadInput" onChange={this.handleChange} />
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
        <div>
        <h3>Delivery</h3>
        <input type="number" ref="deliveryMilesInput" onChange={this.handleChange} /> miles at 
        <input type="number" ref="deliveryRateInput" onChange={this.handleChange} /> per mile
        </div>
        );
    }
});

React.renderComponent(
    <Calculator />,
    document.getElementById('content')
    );
