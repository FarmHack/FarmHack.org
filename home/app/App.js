$(function() {

  App = new (Backbone.View.extend({

    Models: {},
    Views: {},
    Collections: {},

    start: function(){
      this.renderJumboTron()
      this.renderUpcomingEvents()
      this.renderRecentActivity()

      window.onscroll = function() {
        var speed = 3.0;
        $("#top-region").css("background-position",(window.pageXOffset / speed) + "px " + (window.pageYOffset / speed) + "px");
      }
    },

    renderJumboTron: function () {
      $.getJSON('/api/user', function(user) {
        if (user.uid == 0) {
          // @todo I could simplify this using transparency instead of tricky hides and css?
          $('#jumbotron').hide()
          $('#jumbotron').html($('#jumbotron-anonymous').html())
          $('#jumbotron .frame').hide()
          $('#jumbotron .content').hide()
          $('#jumbotron').show()
          $('#jumbotron .frame').css('height', '210px')
          $('#jumbotron .frame').delay(500).slideDown(700)
          $('#jumbotron .content').delay(1200).fadeIn()
        }
        else {
          $('#jumbotron').html("<h1 style='display:none; margin:0;' class='content'>Welcome back " + user.name + "</h1>")
          $('#jumbotron .content').delay(500).fadeIn()
        }
      })
    },

    renderUpcomingEvents: function() {
      var events = new App.Collections.UpcomingEvents()
      var UpcomingEvents = new App.Views.UpcomingEvents({collection: events})
      $('#bottom-region .row-1').html(UpcomingEvents.el)
      UpcomingEvents.spin()
      events.on('sync', function(){
        UpcomingEvents.render()
      })
      events.fetch()
    },

    renderRecentActivity: function() {
      var recentActivityCollection = new App.Collections.RecentActivity()
      var recentActivityView = new App.Views.RecentActivity({collection: recentActivityCollection})
      $('#bottom-region .row-2').html(recentActivityView.el)
      recentActivityView.spin()
      recentActivityCollection.on('sync', function() {
        recentActivityView.render()
      })
      recentActivityCollection.fetch()
    }

  }))
  
})
