/** @jsx React.DOM */

var defaultIngredients = [ 
{ "key": "baking-powder", "name": "baking powder", "unit": "teaspoons", "cost": 0.08 }, 
{ "key": "baking-powder", "name": "butter", "unit": "cups", "cost": 0.5 }, 
{ "key": "baking-powder", "name": "chocolate chips", "unit": "cups", "cost": 1.1 }, 
{ "key": "baking-powder", "name": "cinnamon", "unit": "teaspoons", "cost": 0.06 }, 
{ "key": "baking-powder", "name": "cocoa", "unit": "cups", "cost": 1.54 }, 
{ "key": "baking-powder", "name": "eggs", "unit": null, "cost": 0.25 }, 
{ "key": "baking-powder", "name": "flour", "unit": "cups", "cost": 0.1 }, 
{ "key": "baking-powder", "name": "margarine", "unit": "cups", "cost": 0.5 }, 
{ "key": "baking-powder", "name": "milk", "unit": "cups", "cost": 0.17 }, 
{ "key": "baking-powder", "name": "shortening", "unit": "cups", "cost": 0.66 }, 
{ "key": "baking-powder", "name": "sugar", "unit": "cups", "cost": 0.3 }, 
{ "key": "baking-powder", "name": "vanilla", "unit": "teaspoons", "cost": 0.04 }, 
{ "key": "baking-powder", "name": "vegetable oil", "unit": "cups", "cost": 0.46 }, 
{ "key": "baking-powder", "name": "yeast", "unit": "packages", "cost": 0.51 } 
];

var runningKey = 0;

var Calculator = React.createClass({displayName: 'Calculator',
  handleIngredientSelect: function(ingredient) {
    var ingredients = this.state.activeIngredients;
    ingredients.push(ingredient);
    this.setState({ activeIngredients: ingredients });
  },
  handleIngredientChange: function(changes) {
    var ingredients = this.state.activeIngredients;
    ingredient = _.find(ingredients, function(ing){ return ing.key == changes.key });
    ingredient[changes.fieldName] = changes.newValue;
    ingredients = _.reject(ingredients, function(ing){ return ing.key == changes.key });
    ingredients.push(ingredient)
    this.setState({ activeIngredients: ingredients });
  },
    getInitialState: function() {
      return { activeIngredients: [] };
    },
    render: function() {
      var ingredientLinks = _.difference(this.props.defaultIngredients, this.state.activeIngredients).map(function(ingredient) {
        return (
          IngredientLink({onIngredientSelect: this.handleIngredientSelect, ingredient: ingredient})
          );
      }.bind(this));
      var ingredientFields = this.state.activeIngredients.map(function(ingredient) {
        return (
          IngredientInputs({onIngredientChange: this.handleIngredientChange, key: ingredient.key, ingredient: ingredient})
          );
      }.bind(this));
      var ingredientsTotal = _.reduce(_.map(this.state.activeIngredients, function(ing){ return ing['cost'] * ing['quantity'] }), function(memo, num){ return memo + num; }, 0).toFixed(2);
      return (
        React.DOM.div({className: "calculator"}, 
        React.DOM.div({className: "ingredientsBox"}, 
        React.DOM.h3(null, "Ingredients"), 
        ingredientFields, 
        React.DOM.div(null, "Choose your ingredients below:"), 
        ingredientLinks
        ), 
        React.DOM.h4(null, "Total: $", ingredientsTotal)
        )
        );
    }
});

var IngredientLink = React.createClass({displayName: 'IngredientLink',
  handleClick: function(event) {
    this.props.onIngredientSelect(this.props.ingredient);
    return false;
  },
    render: function() {
      return(
        React.DOM.a({onClick: this.handleClick}, this.props.ingredient.name + " ")
        );
    }
});

var IngredientInputs = React.createClass({displayName: 'IngredientInputs',
  handleChange: function(event) {
    var changeSummary = { key: this.props.key, fieldName: event.target.className, newValue: event.target.value };
    this.props.onIngredientChange(changeSummary);
    return false;
  },
  render: function() {
    var middleText = this.props.ingredient.unit + " of " + this.props.ingredient.name + " at";
    var endText = "per " + this.props.ingredient.unit;
    return (
      React.DOM.div(null, 
      React.DOM.input({defaultValue: this.props.ingredient.quantity, type: "number", className: "quantity", onChange: this.handleChange}), middleText, 
      React.DOM.input({defaultValue: this.props.ingredient.cost, type: "number", className: "cost", onChange: this.handleChange}), endText
      )
    );
  }
});

React.renderComponent(
    Calculator({defaultIngredients: defaultIngredients}),
    document.getElementById('content')
    );