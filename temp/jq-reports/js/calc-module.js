/**
 * Created by postepenno on 19.06.2015.
 */

$(document).ready(function () {

// Numeric only control handler
  jQuery.fn.ForceNumericOnly =
    function()
    {
      return this.each(function()
      {
        $(this).keydown(function(e)
        {
          var key = e.charCode || e.keyCode || 0;
          // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
          // home, end, period, and numpad decimal
          return (
          key == 8 ||
          key == 9 ||
          key == 13 ||
          key == 46 ||
          key == 110 ||
          key == 190 ||
          (key >= 35 && key <= 40) ||
          (key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105));
        });
      });
    };

  var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var dayTotalCells = [];
  var totalHoursCell;
  var daysTotalCell;

  var updateTotal = function () {
    var rows = 7;
    var i, j;

    var totalHours = 0;
    for (i = 0; i < rows; i++) {
      var sum = 0;
      for (j = 0; j < days.length; j++) {
        sum += Number($("#shares_" + days[j] + i).val());
      }
      totalHours += sum;
      $("#result" + i).text(sum);
    }
    totalHoursCell.text(totalHours);

    var daysTotal = 0;
    for (i = 0; i < days.length; i++) {
      sum = 0;
      for (j = 0; j < rows; j++) {
        sum += Number($("#shares_" + days[i] + j).val());
      }
      if (sum > 0) daysTotal++;
      dayTotalCells[i].text(sum);
    }
    daysTotalCell.html('<b>Days Total: ' + daysTotal + '</b>');

  }

  var inputs = $('input[type="number"]')
  inputs.ForceNumericOnly();
  inputs.on('input', function () {
    if ($(this).val() > 12) {
      $(this).val(12);
    }
    updateTotal();
  })

  for (var i = 0; i < days.length; i++) {
    dayTotalCells[i] = $('table.tg tr:last-child td:nth-child(' + (3 + i) + ')');
  }

  totalHoursCell = $('table.tg tr:last-child td:last-child');
  daysTotalCell = $('table.tg tr:last-child td:nth-child(2)');



})