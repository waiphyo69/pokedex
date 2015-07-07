Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail"
  },

  pokemonDetail: function (id, callback) {
    // if (!this._pokemonIndex) {
    //   this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
    //   return;
    // }

    // var pokemon = this._pokemonIndex.collection.get(id);
    //
    // this._pokemonDetail =
    //     new Pokedex.Views.PokemonDetail({ model: pokemon });
    // $("#pokedex .pokemon-detail").html(this._pokemonDetail.$el);
    // this._pokemonDetail.refreshPokemon({ success: callback });
    if (!this._pokemonIndex){
      this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
    }

    var pokemon = this._pokemonIndex.collection.get(id);

    this._pokemonDetail = new Pokedex.Views.PokemonDetail ({
        model: pokemon,
      });

    $("#pokedex .pokemon-detail").html(this._pokemonDetail.$el)

    this._pokemonDetail.refreshPokemon({ success: callback });
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
    this._pokemonIndex.refreshPokemon({
      success: callback
    });
    // this.pokemonForm();
  },

  toyDetail: function (pokemonId, toyId) {
  },

  pokemonForm: function () {
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
