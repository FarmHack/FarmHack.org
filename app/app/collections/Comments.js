$(function() {

  App.Collections.Comments = Backbone.Collection.extend({
    //url: "http://dev.farmhack.gotpantheon.com/api/comments/changed",
    url: "/api/comments/changed",
    model: App.Models.Comment,
    comparator: function(m) {
    	var sort = (parseFloat(m.get('changed'))*(-1))
    	return sort
    },
  })

})
