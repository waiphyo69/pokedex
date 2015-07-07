Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId": "toyDetail"
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
    if (!this._pokemonDetail) {
      this.pokemonDetail(
        pokemonId,
        this.toyDetail.bind(this, pokemonId, toyId)
      );
      return;
    }

    var toy = this._pokemonDetail.model.toys().get(toyId);

    var toyDetail = new Pokedex.Views.ToyDetail({
      model: toy,
      pokes: this._pokemonIndex.collection
    });
    $("#pokedex .toy-detail").html(toyDetail.$el);
    toyDetail.render();
  },

  pokemonForm: function () {
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
