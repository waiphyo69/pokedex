Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li.poke-list-item": "selectPokemonFromList",
  },
  // this.$pokeList.on(
  //   'click', 'li.poke-list-item', this.selectPokemonFromList.bind(this)
  // );
  // this.$newPoke.on(
  //   'submit', this.submitPokemonForm.bind(this)
  // );
  // this.$pokeDetail.on(
  //   'click', '.toys li', this.selectToyFromList.bind(this)
  // );
  // this.$toyDetail.on(
  //   'change', 'select', this.reassignToy.bind(this)
  // );

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
    this.listenTo(this.collection, "sync add", this.render);
  },

  addPokemonToList: function (pokemon) {
    var content = JST["pokemonListItem"]( {pokemon: pokemon} );
    this.$el.append(content);
  },

  refreshPokemon: function (options) {
    this.collection.fetch();
  },

  render: function () {
      this.$el.empty();
      this.collection.each( function (pokemon) {
      this.addPokemonToList(pokemon);
    }.bind(this));
    return this;
  },

  selectPokemonFromList: function (event) {
    var $target = $(event.currentTarget);
    var pokeId = $target.data('id');
    var pokemon = this.collection.get(pokeId);
    var pokemonDetail = new Pokedex.Views.PokemonDetail ({
        model: pokemon,
      });

    $("#pokedex .pokemon-detail").html(pokemonDetail.$el)

    pokemonDetail.refreshPokemon();
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
  },

  refreshPokemon: function (options) {
    this.model.fetch({
      success: (function () {
        this.render();
      }).bind(this)
    });
  },

  render: function () {
    var content = JST["pokemonDetail"]({ pokemon: this.model });
    this.$el.html(content);

    var that = this;

    this.model.fetch({ success: function () {
        that.model.toys().each (function (toy) {
          that.$el.append(JST["toyListItem"]({toy: toy}));
        })
      }
    });
  },

  selectToyFromList: function (event) {
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
  }
});


$(function () {
  var pokemonIndex = new Pokedex.Views.PokemonIndex();
  pokemonIndex.refreshPokemon();
  $("#pokedex .pokemon-list").html(pokemonIndex.$el);
});
