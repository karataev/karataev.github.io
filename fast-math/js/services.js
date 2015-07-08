/**
 * Created by postepenno on 08.07.2015.
 */

app.factory("Generator", function () {

  function rnd(a,b) {
    // Generate a random integer between a and b INCLUSIVE
    var x = Math.floor(Math.random() * (b - (a-1))) + a;
    return x;
  }

  function rndNotZero(a,b) {
    // Generate a random integer between a and b INCLUSIVE
    if(a == b) { return false; }
    var x = Math.floor(Math.random() * (b - (a-1))) + a;
    if(x == 0) { x = rndNotZero(a,b); }
    return x;
  }

  function roundUpTo(value,interval) {
    return (Math.ceil(value/interval)) * interval;
  }

  function leadingZero(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  // prime functions from http://www.javascripter.net/faq/numberisprime.htm
  function isPrime(n) {
    if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;
    if (n==leastFactor(n)) return true;
    return false;
  }

  function leastFactor(n){
    if (isNaN(n) || !isFinite(n)) return NaN;
    if (n==0) return 0;
    if (n%1 || n*n<2) return 1;
    if (n%2==0) return 2;
    if (n%3==0) return 3;
    if (n%5==0) return 5;
    var m = Math.sqrt(n);
    for (var i=7;i<=m;i+=30) {
      if (n%i==0)      return i;
      if (n%(i+4)==0)  return i+4;
      if (n%(i+6)==0)  return i+6;
      if (n%(i+10)==0) return i+10;
      if (n%(i+12)==0) return i+12;
      if (n%(i+16)==0) return i+16;
      if (n%(i+22)==0) return i+22;
      if (n%(i+24)==0) return i+24;
    }
    return n;
  }


  return {
    add: function (minIndividual, maxIndividual, minTotal, maxTotal) {
      var total = rnd(minTotal,maxTotal);

      var int1 = total - rnd(
          Math.min(maxIndividual,total-minIndividual),
          Math.max(minIndividual,total-maxIndividual)
        );

      var int2 = total - int1;

      var q = int1.toString() + " + " + int2.toString();
      var y = total.toString();

      var s = rndNotZero(-int1,int1);

      var n = (total + s).toString();

      var answer = { q: q, y: y, n: n };
      return answer;
    },

    subtract: function(minIndividual, maxIndividual, minTotal, maxTotal) {

      var total = rnd(minTotal,maxTotal);

      var int1 = total - rnd(
          Math.min(maxIndividual,total-minIndividual),
          Math.max(minIndividual,total-maxIndividual)
        );

      var int2 = total - int1;

      var q = total.toString() + " - " + int1.toString();
      var y = int2.toString();

      var s1 = Math.max(1,Math.min(int1,int2));
      var s = rndNotZero(-s1,s1);

      var n = (int2 + s).toString();

      var answer = { q: q, y: y, n: n };
      return answer;
    },

    multiply: function(minIndividual, maxIndividual, timesTableMatch) {

      var int1 = rnd(minIndividual,maxIndividual);
      var int2 = rnd(minIndividual,maxIndividual);
      var total = int1 * int2;
      var q = int1.toString() + " x " + int2.toString();
      var y = total.toString();

      if(timesTableMatch == true) {

        if(rnd(0,1) == 1) {
          var n = ((int1+1)*int2).toString();
        } else {
          var n = ((int1-1)*int2).toString();
        }

      } else {
        var s1 = Math.min(total,maxIndividual);
        var n = (total + rndNotZero(-s1,s1)).toString();
      }

      var answer = { q: q, y: y, n: n };
      return answer;
    },

    divide: function(minIndividual, maxIndividual, timesTableMatch) {

      var int1 = rnd(minIndividual,maxIndividual);
      var int2 = rnd(minIndividual,maxIndividual);
      var total = int1 * int2;
      var q = total.toString() + " / " + int2.toString();
      var y = int1.toString();

      if(timesTableMatch == true) {

        if(rnd(0,1) == 1) {
          var n = (int1+1).toString();
        } else {
          var n = (int1-1).toString();
        }

      } else {
        var s1 = Math.min(total,maxIndividual);
        var n = (int1 + rndNotZero(-2,2)).toString();
      }

      var answer = { q: q, y: y, n: n };
      return answer;
    },

    time_add: function(interval,crosshours) {
      var initial_hours = rnd(2,10);
      var initial_minutes, add_minutes, other_minutes;

      if(crosshours == 0) {
        initial_minutes = roundUpTo(rnd(1,25),interval);
        add_minutes = roundUpTo(rnd(1,25),interval);
        other_minutes = add_minutes + ((rnd(1,2) == 1) ? interval : -interval) ;
      } else {
        var s1 = roundUpTo(rnd(1,30),interval);
        var s2 = roundUpTo(rnd(1,30),interval);
        initial_minutes = 60 - s1;
        add_minutes = s1 + s2;
        other_minutes = add_minutes + ((rnd(1,2) == 1) ? interval : -interval) ;
      }

      var q = add_minutes.toString() + ' минут после ' + initial_hours + ':' + leadingZero(initial_minutes,2);
      var y = (initial_hours + crosshours).toString() + ':' + leadingZero((initial_minutes + add_minutes) % 60,2);
      var n = (initial_hours + crosshours).toString() + ':' + leadingZero((initial_minutes + other_minutes) % 60,2);

      var answer = { q: q, y: y, n: n };
      return answer;
    },

    time_subtract: function(interval,crosshours) {
      var initial_hours = rnd(2,10);
      var initial_minutes, add_minutes, other_minutes;

      if(crosshours == 0) {
        initial_minutes = roundUpTo(rnd(30,55),interval);
        subtract_minutes = roundUpTo(rnd(1,25),interval);
        other_minutes = subtract_minutes + ((rnd(1,2) == 1) ? interval : -interval) ;
      } else {
        var initial_minutes = roundUpTo(rnd(1,20),interval);
        var subtract_minutes = roundUpTo(rnd(25,40),interval);
        other_minutes = subtract_minutes + ((rnd(1,2) == 1) ? interval : -interval) ;
      }

      var q = subtract_minutes.toString() + ' минут до ' + initial_hours + ':' + leadingZero(initial_minutes,2);
      var y = (initial_hours - crosshours).toString() + ':' + leadingZero(( (initial_minutes + 60) - subtract_minutes) % 60,2);
      var n = (initial_hours - crosshours).toString() + ':' + leadingZero(( (initial_minutes + 60) - other_minutes) % 60,2);

      var answer = { q: q, y: y, n: n };
      return answer;
    },

    parentheses: function(max_add,max_multiplier) {
      var a = rnd(2,max_add);
      var b = rnd(2,max_add);
      var c = rnd(2,max_multiplier);
      var total = (a+b)*c;
      var other_total = total +- c;

      var q = '(' + a.toString() + ' + ' + b.toString() + ') x ' + c.toString();
      var y = total;
      var n = other_total;

      var answer = { q: q, y: y, n: n };
      return answer;
    },

    solve_for_x: function(max_multiplier,max_x,max_add) {
      var a, x, other_x, z, q, y, n, total, answer;

      a = rnd(2,max_multiplier);
      x = rnd(1,max_x);
      other_x = x + ((rnd(1,2) == 1) ? 1 : -1);
      z = rnd(1,max_add);
      total = (a*x)+z;

      q = a.toString() + 'x + ' + z.toString() + ' = ' + total.toString();
      y = 'x = ' + x.toString();
      n = 'x = ' + other_x.toString();

      answer = { q: q, y: y, n: n };
      return answer;
    },

    is_x_prime: function(min_number,max_number,odd_only) {
      var x,q,y,n;

      x = rnd(min_number,max_number);

      if(odd_only) { x = (Math.ceil(x/2)*2)+1; }

      q = x.toString() + ' - простое число?'

      if (isPrime(x) == true) {
        y = 'Да';
        n = 'Нет';
      } else {
        y = 'Нет';
        n = 'Да';
      }

      var answer = { q: q, y: y, n: n };
      return answer;
    }
  }
})


app.factory("Levels", function (Generator) {

  function rnd(a,b) {
    // Generate a random integer between a and b INCLUSIVE
    var x = Math.floor(Math.random() * (b - (a-1))) + a;
    return x;
  }

  function getTask(levelId) {
    var type;

    switch(levelId) {
      case 1:
        return Generator.add(2,6,4,12,false);
        break;

      case 2:
        type = rnd(1,2);
        switch(type) {
          case 1: return Generator.add(2,10,4,20,false);
          case 2: return Generator.subtract(2,10,4,20,false);
        }
        break;

      case 3:
        type = rnd(1,3);
        switch(type) {
          case 1: return Generator.add(2,19,7,21,true);
          case 2: return Generator.subtract(2,19,7,21,true);
          case 3: return Generator.multiply(3,12,true);
        }
        break;

      case 4:
        type = rnd(1,4);
        switch(type) {
          case 1: return Generator.add(2,24,7,30,true);
          case 2: return Generator.subtract(2,24,7,30,true);
          case 3: return Generator.multiply(4,12,true);
          case 4: return Generator.divide(3,6,true);
        }
        break;

      case 5:
        type = rnd(1,5);
        switch(type) {
          case 1: return Generator.add(5,50,20,60,false);
          case 2: return Generator.subtract(3,34,9,26,false);
          case 3: return Generator.multiply(6,12,false);
          case 4: return Generator.divide(4,9,false);
          case 5: return Generator.time_add(5,0);
        }
        break;

      case 6:
        type = rnd(1,5);
        switch(type) {
          case 1: return Generator.subtract(10,44,21,70,false);
          case 2: return Generator.multiply(7,12,false);
          case 3: return Generator.divide(8,12,false);
          case 4: return Generator.time_add(5,1);
          case 5: return Generator.parentheses(5,5);
        }
        break;

      case 7:
        type = rnd(1,5);
        switch(type) {
          case 1: return Generator.multiply(7,12,false);
          case 2: return Generator.divide(8,12,false);
          case 3: return Generator.time_add(5,1);
          case 4: return Generator.time_subtract(5,1);
          case 5: return Generator.parentheses(6,6);
        }
        break;

      case 8:
        type = rnd(1,5);
        switch(type) {
          case 1: return Generator.multiply(7,12,false);
          case 2: return Generator.divide(8,12,false);
          case 3: return Generator.time_subtract(5,1);
          case 4: return Generator.parentheses(7,7);
          case 5: return Generator.solve_for_x(2,4,3);
        }
        break;

      case 9:
        type = rnd(1,6);
        switch(type) {
          case 1: return Generator.multiply(7,12,false);
          case 2: return Generator.divide(8,12,false);
          case 3: return Generator.time_subtract(5,1);
          case 4: return Generator.parentheses(7,7);
          case 5: return Generator.solve_for_x(2,6,9);
          case 6: return Generator.is_x_prime(8,24,false);
        }
        break;

      case 10:
      default:
        type = rnd(1,6);
        switch(type) {
          case 1: return Generator.multiply(9,13,false);
          case 2: return Generator.divide(8,13,false);
          case 3: return Generator.time_subtract(4,1);
          case 4: return Generator.parentheses(8,8);
          case 5: return Generator.solve_for_x(6,12,20);
          case 6: return Generator.is_x_prime(15,30,true);
        }
        break;
    }
  }

  return {
    generate: function (levelId, questionsPerLevel) {
      var qPerLevel = questionsPerLevel || 6;
      var tasks = [];
      for (var i = 0; i < qPerLevel; i++) {
        var task = getTask(levelId);
        tasks.push(task);
      }
      return tasks;
    }
  }
})
