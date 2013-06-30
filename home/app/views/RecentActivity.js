$(function() {
  App.Views.RecentActivity = Backbone.View.extend({

    className: "recent-activity",

    addOne: function(model){
      var collectionRow = new App.Views.CollectionRow({model: model})
      collectionRow.render()  
      this.$el.append(collectionRow.el)
    },

    addAll: function(){
      // @todo this does not work as expected, either of the lines
      // _.each(this.collection.models, this.addOne())
      this.collection.each(this.addOne, this)
    },

    render: function() {
      this.addAll()
    }

  })

})


