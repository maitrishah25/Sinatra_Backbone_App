console.log('....loaded');

// models
var Person = Backbone.Model.extend({
  defaults: {name: 'hi', email: 'hi'}

});

// collections
var PersonCollection = Backbone.Collection.extend({
  model: Person,
  url: '/api/people'
});

// views
var PersonView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
  },
  tagName: 'div',
  className: 'person',
  template: _.template($('#person-template').html()),
  render: function(){
    this.$el.empty();
    var $html = $(this.template(this.model.toJSON()));
    this.$el.append($html);
  }
});

var PersonListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
    var people = this.collection.models;
    var $view;
    for (var i = 0; i < people.length; i++) {
      $view = new PersonView({model: people[i]});
      $view.render();
      this.$el.prepend($view.$el);
    }
  }
})

var maitri = new Person({name: 'Maitri', email: 'hi@gmail.com'});
var maitriPainter = new PersonView({
  model: maitri
});


var people = new PersonCollection();
var peoplePainter = new PersonListView({
  collection: people,
  el: $('#people-list')
});

people.fetch();


$('.create-person').on('submit', function(e){
  e.preventDefault();
  var data = $(this).serializeJSON();
  var emailfield = $('#email').val();
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(emailfield.match(mailformat))  {
    people.create(data.person);
    this.reset();
  }  else  {
  // var msg = $(<span>).html('Please enter a valid email address');
  alert("You have entered an invalid email address!");
  $('#email').focus();
  // $('#email').css({'border': '1px solid red'});
  }


});
