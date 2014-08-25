/** @jsx React.DOM */
var IngredientBox = React.createClass({displayName: 'IngredientBox',
  getInitialState: function() {
    return {data: "data/ingredients.json"};
  },
  render: function() {
    return (
      React.DOM.div({className: "ingredientBox"}, 
      React.DOM.h3(null, "Ingredients"), 
      React.DOM.span(null, "Choose your ingredients below:")
      )
      );
  }
});

var IngredientLink = React.createClass({displayName: 'IngredientLink',
  render: function() {
  }
});

React.renderComponent(
    IngredientBox(null),
    document.getElementById('content')
    );
