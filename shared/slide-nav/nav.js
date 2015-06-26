/**
 * Created by postepenno on 26.06.2015.
 */

app.directive("slideNav", function () {
  return {
    scope:{},
    link: function (scope, el, attrs) {
      $('.menu-link').bigSlide({easyClose:false});
    },
    replace:true,
    templateUrl:'../shared/slide-nav/nav-menu-view.html'
  }
})

