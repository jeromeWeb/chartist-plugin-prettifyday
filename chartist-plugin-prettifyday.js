/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

  var defaultOptions = {
    startHour: null,
    endHour: null,
    textAnchor: 'middle',
    labelClass: 'ct-label',
    labelOffset: {
        x: 0,
        y: 0
    }
  };

  Chartist.plugins = Chartist.plugins || {};
  Chartist.plugins.ctPrettifyDay = function(options) {

    options = Chartist.extend({}, defaultOptions, options);

    return function ctPrettifyDay(chart) {
    	
      Chartist.plugins.ctPrettifyDay.drawClock = function(x,y, text)
      {
    	  if (text)
		  {
              chart.svg.elem('text', {
                  x: x + options.labelOffset.x,
                  y: y + options.labelOffset.y,
                  style: 'text-anchor: ' + options.textAnchor
                }, options.labelClass, true).text(text);    	    	    		   
		  }
    	  
            // Draw little clock needle
            chart.svg.elem('line',{
                x1: x,
                y1: y,
                x2: x-2,
                y2: y,
                style: "stroke-linecap: round; stroke-width: 1px;"
            }, 'ct-day-clock', true);

            // Draw long clock needle
            chart.svg.elem('line',{
                x1: x,
                y1: y,
                x2: x,
                y2: y-3,
                style: "stroke-linecap: round; stroke-width: 1px;"
            }, 'ct-day-clock', true);

            // circle label
            chart.svg.elem('circle',{
                cx: x,
                cy: y,
                r: 6
            }, 'ct-day-clock', true);
      }
      
      if(chart instanceof Chartist.Bar) {

        chart.on('created', function(data) {
            
        	Chartist.plugins.ctPrettifyDay.drawClock(data.chartRect.x1 + 10, data.chartRect.y2 + 60, options.startHour);
        	Chartist.plugins.ctPrettifyDay.drawClock(data.chartRect.x2 - 10, data.chartRect.y2 + 60, options.endHour);
            var d = [
                 // Start at the end point from the cartesian coordinates
                 'M', data.chartRect.x1 + 10, data.chartRect.y2 + 60,
                 'Q', (data.chartRect.x2 - data.chartRect.x1) / 2, data.chartRect.y2 , data.chartRect.x2 - 10, data.chartRect.y2 + 60
               ];
            
            // draw slice
            chart.svg.elem('path',{
                d: d.join(' '),
                "stroke-dasharray": "5,5",
            }, 'ct-day-clock', true);

        });
      
      }
    };
  };
}(window, document, Chartist));