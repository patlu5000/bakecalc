/** @jsx React.DOM */
var React = require('react');

var IngredientBox = React.createClass({displayName: 'IngredientBox',
  render: function() {
    return (
      React.DOM.div({className: "ingredientBox"}, 
      React.DOM.h1(null, "Comments")
      )
      );
  }
});

React.renderComponent(
    IngredientBox(null),
    document.getElementById('content')
    );
