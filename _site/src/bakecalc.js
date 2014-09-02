/** @jsx React.DOM */

var PRESET_INGREDIENTS = [ 
{ key: "baking-powder", name: "baking powder", unit: "teaspoon", cost: 0.10, amazonUrl: "http://www.amazon.com/gp/product/B005P0I7T6/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B005P0I7T6&linkCode=as2&tag=bake064-20&linkId=M77A54TG4MQIER5O" }, 
{ key: "butter", name: "butter", unit: "stick", cost: 1.08, amazonUrl: "https://fresh.amazon.com/product?asin=B000R47UXO&qid=211242736&rank=3&sr=1-3&tag=img" }, 
{ key: "chocolate-chips", name: "chocolate chips", unit: "cup", cost: 3.04, amazonUrl: "http://www.amazon.com/gp/product/B004YVOFB6/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B004YVOFB6&linkCode=as2&tag=bake064-20&linkId=AZ5L6KVQPL3DM4KN" }, 
{ key: "cinnamon", name: "cinnamon", unit: "teaspoon", cost: 0.09, amazonUrl: "http://www.amazon.com/gp/product/B00ASD2F8O/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00ASD2F8O&linkCode=as2&tag=bake064-20&linkId=LKNJWCH6FVF6LFJP" }, 
{ key: "cacao-powder", name: "cacao powder", unit: "tablespoon", cost: 0.31, amazonUrl: "http://www.amazon.com/gp/product/B00EKLPLU4/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00EKLPLU4&linkCode=as2&tag=bake064-20&linkId=TWA6AFPCG2WGP5C4" }, 
{ key: "eggs", name: "eggs", unit: null, cost: 0.42, amazonUrl: "https://fresh.amazon.com/product?asin=B00CIZCSIM&qid=211245709&rank=1&sr=1-1&tag=img" }, 
{ key: "flour", name: "flour", unit: "cup", cost: 0.43, amazonUrl: "http://www.amazon.com/gp/product/B004IN43SU/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B004IN43SU&linkCode=as2&tag=bake064-20&linkId=FNFR3GVTBEPSERFC" }, 
{ key: "milk", name: "milk", unit: "cup", cost: 0.40 , amazonUrl: "https://fresh.amazon.com/product?asin=B000O6EG9G&qid=211247028&rank=1&sr=1-1&tag=img" }, 
{ key: "shortening", name: "shortening", unit: "cup", cost: 0.65, amazonUrl: "http://www.amazon.com/Crisco-All-Vegetable-Shortening-48/dp/B00I8G7L0A/ref=sr_1_1?ie=UTF8&qid=1409337504&sr=1-1&keywords=shortening" }, 
{ key: "sugar", name: "sugar", unit: "cup", cost: 1.17, amazonUrl: "http://www.amazon.com/gp/product/B002MBKF0U/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B002MBKF0U&linkCode=as2&tag=bake064-20&linkId=R23X4JS63JLXCD54" }, 
{ key: "vanilla", name: "vanilla", unit: "teaspoon", cost: 0.10, amazonUrl: "http://www.amazon.com/gp/product/B005MIWPGC/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B005MIWPGC&linkCode=as2&tag=bake064-20&linkId=CUKX7EF7XHVQF5LI" }, 
{ key: "vegetable-oil", name: "vegetable oil", unit: "cup", cost: 0.56, amazonUrl: "http://www.amazon.com/gp/product/B00I8G79ES/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00I8G79ES&linkCode=as2&tag=bake064-20&linkId=OGJ3UCLCBRFH2BKK" }, 
{ key: "yeast", name: "yeast", unit: "teaspooon", cost: 0.08, amazonUrl: "http://www.amazon.com/gp/product/B0001CXUHW/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B0001CXUHW&linkCode=as2&tag=bake064-20&linkId=MXWTN4C73Y77SJTT" } 
];

var PRESET_SUPPLIES = [
{ key: "box", name: "boxes", cost: 0.65, amazonUrl: "http://www.amazon.com/gp/product/B008WCWJ9S/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B008WCWJ9S&linkCode=as2&tag=bake064-20&linkId=C2SMD4NTH3UYTM5J" },
{ key: "cake-circle", name: "cake circles", cost: 0.42, amazonUrl: "http://www.amazon.com/gp/product/B0000CFMP7/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B0000CFMP7&linkCode=as2&tag=bake064-20&linkId=D4AHH6ELM6DEPX2H" },
{ key: "dowel-rod", name: "dowel rods", cost: 0.09, amazonUrl: "http://www.amazon.com/gp/product/B0033F4GSQ/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B0033F4GSQ&linkCode=as2&tag=bake064-20&linkId=JCJLOWT77IYAAOXB" },
];

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
    resetAllInput: function() {
      this.replaceState(this.getInitialState());
    },
    render: function() {
      return (
          <div className="calculator row">
          <div className="col-md-8">
          <form className="form-inline">
          <ItemsBox name="Ingredients" inputsComponent={IngredientInputs} activeItems={this.state.ingredients} presetItems={PRESET_INGREDIENTS} onUserInput={this.handleIngredientsInput} />
          <ItemsBox name="Supplies" inputsComponent={SupplyInputs} activeItems={this.state.supplies} presetItems={PRESET_SUPPLIES} onUserInput={this.handleSuppliesInput} />
          <TimeBox onUserInput={this.handleTimeInput} />
          <OverheadBox onUserInput={this.handleOverheadInput} />
          <DeliveryBox onUserInput={this.handleDeliveryInput} />
          </form>
          </div>
          <div className="col-md-4">
          <CalculationBox ingredients={this.state.ingredients} supplies={this.state.supplies} hours={this.state.hours} wage={this.state.wage} overhead={this.state.overhead} miles={this.state.miles} rate={this.state.rate} onReset={this.resetAllInput} />
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
      item.key = _.uniqueId();
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
          <div className="panel input-box">
          <div className="panel-heading">
          <h3 className="panel-title">{this.props.name}</h3>
          </div>
          <div className="panel-body">
          {itemFields}
          <div>Choose your items below:</div>
          <ul className="item-links list-inline">
          {itemLinks}
          <li><AddItemLink onItemSelect={this.handleItemSelect} item={{ quantity: 1, name: "", cost: null }} /></li>
          </ul>
          </div>
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
      if ( _.contains(_.pluck(PRESET_INGREDIENTS, 'key'), this.props.item.key)) {
        var quantity = <input defaultValue={this.props.item.quantity} type="number" className="form-control input-sm" type="number" ref="ingredientQuantityInput" onChange={this.handleChange} />;
        if (this.props.item.unit) {
          var name = <span> {this.props.item.unit + 's'} of <input hidden defaultValue={this.props.item.name} type="text" ref="ingredientNameInput" onChange={this.handleChange} /><a href={this.props.item.amazonUrl} target="_blank" className="item-name">{this.props.item.name}</a> at </span>;
        } else {
          var name = <span> <input hidden defaultValue={this.props.item.name} type="text" ref="ingredientNameInput" onChange={this.handleChange} /><a href={this.props.item.amazonUrl} target="_blank" className="item-name">{this.props.item.name}</a> at </span>;
        }
        var costAppend = <span className="input-group-addon">/<sub>{this.props.item.unit || 'each'}</sub></span>;
      } else {
        var quantity = <input hidden value={this.props.item.quantity} ref="ingredientQuantityInput" />;
        var name = <span><input defaultValue={this.props.item.name} type="text" className="form-control input-sm" ref="ingredientNameInput" onChange={this.handleChange} placeholder="6 spoons of nutella, etc." /> at </span>;
        var costAppend = '';
      }
      return (
        <div className="input-fields">
        {quantity}
        {name}
        <div className="input-group input-group-sm">
        <span className="input-group-addon">$</span>
        <input defaultValue={this.props.item.cost} type="number" className="form-control" ref="ingredientCostInput" onChange={this.handleChange} />
        {costAppend}
        </div>
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
      if (_.contains(_.pluck(PRESET_SUPPLIES, 'key'), this.props.item.key)) {
        var quantity = <input defaultValue={this.props.item.quantity} type="number" className="form-control input-sm" type="number" ref="supplyQuantityInput" onChange={this.handleChange} />;
        var name = <span><input hidden defaultValue={this.props.item.name} type="text" ref="supplyNameInput" onChange={this.handleChange} /> <a href={this.props.item.amazonUrl} target="_blank" className="item-name">{this.props.item.name}</a> at </span>;
        var costAppend = <span className="input-group-addon">/<sub>'each'</sub></span>;
      } else {
        var quantity = <input hidden defaultValue={this.props.item.quantity} type="number" ref="supplyQuantityInput" onChange={this.handleChange} />;
        var name = <span><input defaultValue={this.props.item.name} type="text" className="form-control input-sm" ref="supplyNameInput" onChange={this.handleChange} placeholder="Doilies, cello wrap, etc." /> at </span>;
        var costAppend = '';
      }
      return (
        <div className="input-fields">
        {quantity}
        {name}
        <div className="input-group input-group-sm">
        <span className="input-group-addon">$</span>
        <input defaultValue={this.props.item.cost} className="form-control" type="number" ref="supplyCostInput" onChange={this.handleChange} />
        {costAppend}
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
        <a onClick={this.handleClick} className="item-link btn btn-danger btn-xs">{displayName}</a>
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
        <div className="panel input-box">
        <div className="panel-heading">
        <h3 className="panel-title">Time</h3>
        </div>
        <div className="panel-body">
        <p><strong>How much is your time worth?</strong></p>
        <div className="input-fields">
        <input type="number" className="form-control input-sm" ref="timeHoursInput" onChange={this.handleChange} /> hours at <div className="input-group input-group-sm">
        <span className="input-group-addon">$</span>
        <input type="number" className="form-control input-sm" ref="timeWageInput" onChange={this.handleChange} />
        <span className="input-group-addon">/<sub>hour</sub></span>
        </div>
        </div>
        <p>You deserve to be paid a fair hourly rate for the time you spend baking. Don't forget sampling, planning or clean-up time!
        </p>
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
        <div className="panel input-box">
        <div className="panel-heading">
        <h3 className="panel-title">Overhead</h3>
        </div>
        <div className="panel-body">
        <div className="input-fields">
        <div className="input-group input-group-sm">
        <span className="input-group-addon">$</span>
        <input type="number" className="form-control input-sm" ref="overheadInput" onChange={this.handleChange} />
        </div>
        </div>
        <p>When you bake, you use electricity, ovens, and other things. A fee for the use of equipment should be added to the cost.</p>
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
        <div className="panel input-box">
        <div className="panel-heading">
        <h3 className="panel-title">Delivery</h3>
        </div>
        <div className="panel-body">
        <div className="input-fields">
        <input type="number" className="form-control input-sm" ref="deliveryMilesInput" onChange={this.handleChange} /> miles at <div className="input-group input-group-sm">
        <span className="input-group-addon">$</span>
        <input defaultValue="0.56" type="number" className="form-control input-sm" ref="deliveryRateInput" onChange={this.handleChange} /> 
        <span className="input-group-addon">/<sub>mile</sub></span>
        </div>
        </div>
        <p>The current <a href="http://www.gsa.gov/portal/content/100715">federal reimbursement rate</a> for mileage is $0.56 per mile, which is a good place to start. Don't forget to charge for the entire round-trip!</p>
        </div>
        </div>
        );
    }
});

var CalculationBox = React.createClass({
  handleClickReset: function(event) {
    this.props.onReset();
    return false;
  },
  render: function() {
    var ingredientsTotal = _.reduce(_.map(this.props.ingredients, function(i){ return i.cost * i.quantity }), function(memo, num){ return memo + num; }, 0).toFixed(2);
    var suppliesTotal = _.reduce(_.map(this.props.supplies, function(s){ return s.cost * s.quantity }), function(memo, num){ return memo + num; }, 0).toFixed(2);
    var timeTotal = (this.props.hours * this.props.wage).toFixed(2);
    var overheadTotal = Number(this.props.overhead).toFixed(2);
    var deliveryTotal = (this.props.miles * this.props.rate).toFixed(2);
    var grandTotal = (Number(ingredientsTotal) + Number(suppliesTotal) + Number(timeTotal) + Number(overheadTotal) + Number(deliveryTotal)).toFixed(2);
    if (grandTotal > 0) {
      
      var panelFooter = <div className="panel-footer"><h4><em>You should charge:</em> <strong className="pull-right">${grandTotal}</strong></h4><a onClick={this.handleClickReset} href="#">reset</a></div>
    } else {
      var panelFooter = <div className="panel-footer"><em>Do something on the left to get started!</em></div>
    }
    return (
      <div className="panel calculation-box">
      <ul className="list-group">
      <CalculationItem itemName="Ingredients" itemTotal={ingredientsTotal} />
      <CalculationItem itemName="Supplies" itemTotal={suppliesTotal} />
      <CalculationItem itemName="Time" itemTotal={timeTotal} />
      <CalculationItem itemName="Overhead" itemTotal={overheadTotal} />
      <CalculationItem itemName="Delivery" itemTotal={deliveryTotal} />
      </ul>
      {panelFooter}
      </div>
      );
  }
});

var CalculationItem = React.createClass({
  render: function() {
    if (typeof this.props.itemTotal != 'undefined' && this.props.itemTotal > 0) {
      return (<li className="list-group-item">{this.props.itemName} total: <strong className="pull-right">${this.props.itemTotal}</strong></li>);
    } else {
      return null;
    }
  }
});

React.renderComponent(
    <Calculator />,
    document.getElementById('content')
    );
