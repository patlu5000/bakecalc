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

var Calculator = React.createClass({displayName: 'Calculator',
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
          React.DOM.div({className: "calculator row"}, 
          React.DOM.div({className: "col-md-8"}, 
          React.DOM.form({className: "form-inline"}, 
          ItemsBox({name: "Ingredients", inputsComponent: IngredientInputs, activeItems: this.state.ingredients, presetItems: PRESET_INGREDIENTS, onUserInput: this.handleIngredientsInput}), 
          ItemsBox({name: "Supplies", inputsComponent: SupplyInputs, activeItems: this.state.supplies, presetItems: PRESET_SUPPLIES, onUserInput: this.handleSuppliesInput}), 
          TimeBox({onUserInput: this.handleTimeInput}), 
          OverheadBox({onUserInput: this.handleOverheadInput}), 
          DeliveryBox({onUserInput: this.handleDeliveryInput})
          )
          ), 
          React.DOM.div({className: "col-md-4"}, 
          CalculationBox({ingredients: this.state.ingredients, supplies: this.state.supplies, hours: this.state.hours, wage: this.state.wage, overhead: this.state.overhead, miles: this.state.miles, rate: this.state.rate, onReset: this.resetAllInput})
          )
          )
          );
    }
});

var ItemsBox = React.createClass({displayName: 'ItemsBox',
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
          React.DOM.li({className: "col-md-2"}, AddItemLink({onItemSelect: this.handleItemSelect, item: item}))
          );
      }.bind(this));
      var itemFields = this.props.activeItems.map(function(item) {
        return (
          this.props.inputsComponent({onItemChange: this.handleItemChange, item: item})
          );
      }.bind(this));
      return (
          React.DOM.div({className: "panel input-box"}, 
          React.DOM.div({className: "panel-heading"}, 
          React.DOM.h3({className: "panel-title"}, this.props.name)
          ), 
          React.DOM.div({className: "panel-body"}, 
          itemFields, 
          React.DOM.div(null, "Choose your items below:"), 
          React.DOM.ul({className: "item-links list-inline row"}, 
          itemLinks, 
          React.DOM.li(null, AddItemLink({onItemSelect: this.handleItemSelect, item: { quantity: 1, name: "", cost: null}}))
          )
          )
          )
          );
    }
});

var IngredientInputs = React.createClass({displayName: 'IngredientInputs',
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
        var quantity = React.DOM.input({defaultValue: this.props.item.quantity, type: "number", className: "form-control input-sm", type: "number", ref: "ingredientQuantityInput", onChange: this.handleChange});
        if (this.props.item.unit) {
          var name = React.DOM.span(null, " ", this.props.item.unit + 's', " of ", React.DOM.input({hidden: true, defaultValue: this.props.item.name, type: "text", ref: "ingredientNameInput", onChange: this.handleChange}), React.DOM.a({href: this.props.item.amazonUrl, target: "_blank", className: "item-name"}, this.props.item.name), " at ");
        } else {
          var name = React.DOM.span(null, " ", React.DOM.input({hidden: true, defaultValue: this.props.item.name, type: "text", ref: "ingredientNameInput", onChange: this.handleChange}), React.DOM.a({href: this.props.item.amazonUrl, target: "_blank", className: "item-name"}, this.props.item.name), " at ");
        }
        var costAppend = React.DOM.span({className: "input-group-addon"}, "/", React.DOM.sub(null, this.props.item.unit || 'each'));
      } else {
        var quantity = React.DOM.input({hidden: true, value: this.props.item.quantity, ref: "ingredientQuantityInput"});
        var name = React.DOM.span(null, React.DOM.input({defaultValue: this.props.item.name, type: "text", className: "form-control input-sm", ref: "ingredientNameInput", onChange: this.handleChange, placeholder: "6 spoons of nutella, etc."}), " at ");
        var costAppend = '';
      }
      return (
        React.DOM.div({className: "input-fields"}, 
        quantity, 
        name, 
        React.DOM.div({className: "input-group input-group-sm"}, 
        React.DOM.span({className: "input-group-addon"}, "$"), 
        React.DOM.input({defaultValue: this.props.item.cost, type: "number", className: "form-control", ref: "ingredientCostInput", onChange: this.handleChange}), 
        costAppend
        )
        )
        );
    }
});

var SupplyInputs = React.createClass({displayName: 'SupplyInputs',
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
        var quantity = React.DOM.input({defaultValue: this.props.item.quantity, type: "number", className: "form-control input-sm", type: "number", ref: "supplyQuantityInput", onChange: this.handleChange});
        var name = React.DOM.span(null, React.DOM.input({hidden: true, defaultValue: this.props.item.name, type: "text", ref: "supplyNameInput", onChange: this.handleChange}), " ", React.DOM.a({href: this.props.item.amazonUrl, target: "_blank", className: "item-name"}, this.props.item.name), " at ");
        var costAppend = React.DOM.span({className: "input-group-addon"}, "/", React.DOM.sub(null, "'each'"));
      } else {
        var quantity = React.DOM.input({hidden: true, defaultValue: this.props.item.quantity, type: "number", ref: "supplyQuantityInput", onChange: this.handleChange});
        var name = React.DOM.span(null, React.DOM.input({defaultValue: this.props.item.name, type: "text", className: "form-control input-sm", ref: "supplyNameInput", onChange: this.handleChange, placeholder: "Doilies, cello wrap, etc."}), " at ");
        var costAppend = '';
      }
      return (
        React.DOM.div({className: "input-fields"}, 
        quantity, 
        name, 
        React.DOM.div({className: "input-group input-group-sm"}, 
        React.DOM.span({className: "input-group-addon"}, "$"), 
        React.DOM.input({defaultValue: this.props.item.cost, className: "form-control", type: "number", ref: "supplyCostInput", onChange: this.handleChange}), 
        costAppend
        )
        )
        );
    }
});

var AddItemLink = React.createClass({displayName: 'AddItemLink',
  handleClick: function(event) {
    this.props.onItemSelect(this.props.item);
    return false;
  },
    render: function() {
      var displayName = this.props.item.name || "something else";
      return(
        React.DOM.a({onClick: this.handleClick, className: "item-link btn btn-danger btn-xs"}, displayName)
        );
    }
});

var TimeBox = React.createClass({displayName: 'TimeBox',
  handleChange: function(event) {
    this.props.onUserInput(
      this.refs.timeHoursInput.getDOMNode().value,
      this.refs.timeWageInput.getDOMNode().value
    );
  },
    render: function() {
      return (
        React.DOM.div({className: "panel input-box"}, 
        React.DOM.div({className: "panel-heading"}, 
        React.DOM.h3({className: "panel-title"}, "Time")
        ), 
        React.DOM.div({className: "panel-body"}, 
        React.DOM.p(null, React.DOM.strong(null, "How much is your time worth?")), 
        React.DOM.div({className: "input-fields"}, 
        React.DOM.input({type: "number", className: "form-control input-sm", ref: "timeHoursInput", onChange: this.handleChange}), " hours at ", React.DOM.div({className: "input-group input-group-sm"}, 
        React.DOM.span({className: "input-group-addon"}, "$"), 
        React.DOM.input({type: "number", className: "form-control input-sm", ref: "timeWageInput", onChange: this.handleChange}), 
        React.DOM.span({className: "input-group-addon"}, "/", React.DOM.sub(null, "hour"))
        )
        ), 
        React.DOM.p(null, "You deserve to be paid a fair hourly rate for the time you spend baking. Don't forget sampling, planning or clean-up time!"
        )
        )
        )
        );
    }
});

var OverheadBox = React.createClass({displayName: 'OverheadBox',
  handleChange: function(event) {
    this.props.onUserInput(this.refs.overheadInput.getDOMNode().value);
  },
    render: function() {
      return(
        React.DOM.div({className: "panel input-box"}, 
        React.DOM.div({className: "panel-heading"}, 
        React.DOM.h3({className: "panel-title"}, "Overhead")
        ), 
        React.DOM.div({className: "panel-body"}, 
        React.DOM.div({className: "input-fields"}, 
        React.DOM.div({className: "input-group input-group-sm"}, 
        React.DOM.span({className: "input-group-addon"}, "$"), 
        React.DOM.input({type: "number", className: "form-control input-sm", ref: "overheadInput", onChange: this.handleChange})
        )
        ), 
        React.DOM.p(null, "When you bake, you use electricity, ovens, and other things. A fee for the use of equipment should be added to the cost.")
        )
        )
        );
    }
});

var DeliveryBox = React.createClass({displayName: 'DeliveryBox',
  handleChange: function(event) {
    this.props.onUserInput(
      this.refs.deliveryMilesInput.getDOMNode().value,
      this.refs.deliveryRateInput.getDOMNode().value
      );
  },
    render: function() {
      return (
        React.DOM.div({className: "panel input-box"}, 
        React.DOM.div({className: "panel-heading"}, 
        React.DOM.h3({className: "panel-title"}, "Delivery")
        ), 
        React.DOM.div({className: "panel-body"}, 
        React.DOM.div({className: "input-fields"}, 
        React.DOM.input({type: "number", className: "form-control input-sm", ref: "deliveryMilesInput", onChange: this.handleChange}), " miles at ", React.DOM.div({className: "input-group input-group-sm"}, 
        React.DOM.span({className: "input-group-addon"}, "$"), 
        React.DOM.input({defaultValue: "0.56", type: "number", className: "form-control input-sm", ref: "deliveryRateInput", onChange: this.handleChange}), 
        React.DOM.span({className: "input-group-addon"}, "/", React.DOM.sub(null, "mile"))
        )
        ), 
        React.DOM.p(null, "The current ", React.DOM.a({href: "http://www.gsa.gov/portal/content/100715"}, "federal reimbursement rate"), " for mileage is $0.56 per mile, which is a good place to start. Don't forget to charge for the entire round-trip!")
        )
        )
        );
    }
});

var CalculationBox = React.createClass({displayName: 'CalculationBox',
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
      
      var panelFooter = React.DOM.div({className: "panel-footer"}, React.DOM.h4(null, React.DOM.em(null, "You should charge:"), " ", React.DOM.strong({className: "pull-right"}, "$", grandTotal)), React.DOM.a({onClick: this.handleClickReset, href: "#"}, "reset"))
    } else {
      var panelFooter = React.DOM.div({className: "panel-footer"}, React.DOM.em(null, "Do something on the left to get started!"))
    }
    return (
      React.DOM.div({className: "panel calculation-box"}, 
      React.DOM.ul({className: "list-group"}, 
      CalculationItem({itemName: "Ingredients", itemTotal: ingredientsTotal}), 
      CalculationItem({itemName: "Supplies", itemTotal: suppliesTotal}), 
      CalculationItem({itemName: "Time", itemTotal: timeTotal}), 
      CalculationItem({itemName: "Overhead", itemTotal: overheadTotal}), 
      CalculationItem({itemName: "Delivery", itemTotal: deliveryTotal})
      ), 
      panelFooter
      )
      );
  }
});

var CalculationItem = React.createClass({displayName: 'CalculationItem',
  render: function() {
    if (typeof this.props.itemTotal != 'undefined' && this.props.itemTotal > 0) {
      return (React.DOM.li({className: "list-group-item"}, this.props.itemName, " total: ", React.DOM.strong({className: "pull-right"}, "$", this.props.itemTotal)));
    } else {
      return null;
    }
  }
});

React.renderComponent(
    Calculator(null),
    document.getElementById('content')
    );
