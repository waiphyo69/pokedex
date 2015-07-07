Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li.poke-list-item": "selectPokemonFromList",
  },

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
    "click .toys li": "selectToyFromList"
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
    var $target = $(event.currentTarget);
    var toyId = $target.data('id');
    var toy = this.model.toys().get(toyId);
    var pokes = new Pokedex.Collections.Pokemon();

    pokes.fetch({success: function(){
        var toyDetail = new Pokedex.Views.ToyDetail({
          model: toy,
          pokes: pokes
        })
        toyDetail.render();
      }
    });
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  initialize: function (options) {
    if (options.pokes) { this.pokes = options.pokes; }
  },

  render: function () {
    $('.toy-detail').html(JST["toyDetail"]({
      toy: this.model,
      pokes: this.pokes
    }));
    return this;
  }
});


$(function () {
  var pokemonIndex = new Pokedex.Views.PokemonIndex();
  pokemonIndex.refreshPokemon();
  $("#pokedex .pokemon-list").html(pokemonIndex.$el);
});
