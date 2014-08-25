/** @jsx React.DOM */

var defaultIngredients = [ { "name": "baking powder", "unit": "teaspoons", "cost": 0.08 }, { "name": "butter", "unit": "cups", "cost": 0.5 }, { "name": "chocolate chips", "unit": "cups", "cost": 1.1 }, { "name": "cinnamon", "unit": "teaspoons", "cost": 0.06 }, { "name": "cocoa", "unit": "cups", "cost": 1.54 }, { "name": "eggs", "unit": null, "cost": 0.25 }, { "name": "flour", "unit": "cups", "cost": 0.1 }, { "name": "margarine", "unit": "cups", "cost": 0.5 }, { "name": "milk", "unit": "cups", "cost": 0.17 }, { "name": "shortening", "unit": "cups", "cost": 0.66 }, { "name": "sugar", "unit": "cups", "cost": 0.3 }, { "name": "vanilla", "unit": "teaspoons", "cost": 0.04 }, { "name": "vegetable oil", "unit": "cups", "cost": 0.46 }, { "name": "yeast", "unit": "packages", "cost": 0.51 } ];

var IngredientBox = React.createClass({displayName: 'IngredientBox',
    render: function() {
      var ingredientLinks = this.props.ingredients.map(function(ingredient) {
        return (
          IngredientLink({name: ingredient.name})
          );
      });
      return (
        React.DOM.div({className: "ingredientBox"}, 
        React.DOM.h3(null, "Ingredients"), 
        IngredientsForm(null), 
        React.DOM.div(null, "Choose your ingredients below:"), 
        ingredientLinks
        )
        );
    }
});

var IngredientLink = React.createClass({displayName: 'IngredientLink',
  onClick: function(event) {
    this.getDOMNode().hide();
  },
  render: function() {
    return (
      React.DOM.a({onClick: this.onClick}, this.props.name + " ")
      );
  }
});

var IngredientsForm = React.createClass({displayName: 'IngredientsForm',
  render: function() {
    return (
      React.DOM.form(null, 
      React.DOM.div(null, "Form:")
      )
      );
  }
});

var IngredientInputs = React.createClass({displayName: 'IngredientInputs',
  render: function() {
  }
});

React.renderComponent(
    IngredientBox({ingredients: defaultIngredients}),
    document.getElementById('content')
    );
