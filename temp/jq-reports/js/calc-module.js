/**
 * Created by postepenno on 19.06.2015.
 */

$(document).ready(function () {

  var updateTotal = function () {

    var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    var rows = 7;

    for (var i = 0; i < rows; i++) {
      var sum = 0;
      for (var j = 0; j < days.length; j++) {
        sum += Number($("#shares_" + days[j] + i).val());
      }
      $("#result" + i).text(sum);
    }
  }

  $('input[type="number"]').on('input', function () {
    //console.log($(this).val());
    updateTotal();
  })

})