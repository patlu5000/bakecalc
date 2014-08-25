/** @jsx React.DOM */
var IngredientBox = React.createClass({displayName: 'IngredientBox',
  render: function() {
    return (
      React.DOM.div({className: "ingredientBox"}, 
      React.DOM.h1(null, "Ingredients"), 
      React.DOM.span(null, "Choose your ingredients below:")
      )
      );
  }
});

React.renderComponent(
    IngredientBox(null),
    document.getElementById('content')
    );
