Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var content = JST["pokemonDetail"]({ pokemon: pokemon });
  this.$pokeDetail.html(content);
  var that = this;

  pokemon.fetch({ success: function () {
      var toys = pokemon.toys();

      toys.forEach( function (toy) {
        that.addToyToList(toy);
      });
    }
  });
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  // Phase II
  this.$toyDetail.empty();

  // Phase IB
  var $target = $(event.currentTarget);

  var pokeId = $target.data('id');
  var pokemon = this.pokes.get(pokeId);

  this.renderPokemonDetail(pokemon);
};
