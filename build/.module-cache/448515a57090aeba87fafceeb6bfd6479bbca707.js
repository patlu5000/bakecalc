/** @jsx React.DOM */
var IngredientBox = React.createClass({displayName: 'IngredientBox',
  getInitialState: function() {
    return { ingredients: require('data/ingredients.json') };
  },
    render: function() {
      var ingredientLinks = this.props.ingredients;
      return (
        React.DOM.div({className: "ingredientBox"}, 
        React.DOM.h3(null, "Ingredients"), 
        React.DOM.span(null, "Choose your ingredients below:"), 
        ingredientLinks
        )
        );
    }
});

var IngredientLink = React.createClass({displayName: 'IngredientLink',
  render: function() {
    return (
      React.DOM.span(null, this.props.name)
      );
  }
});

React.renderComponent(
    IngredientBox(null),
    document.getElementById('content')
    );
