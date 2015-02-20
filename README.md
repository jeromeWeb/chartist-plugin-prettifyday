# Prettify day for Chartist.js
Draw a pretty day representation for chartist.js

## Available options and their defaults values
```javascript
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
```

## Sample usage in Chartist.js

```javascript
var chart = new Chartist.Bar('.ct-chart', {
  labels: [1, 2, 3, 4, 5, 6, 7],
  series: [
    [2, 4, 2, 5, 4, 3, 6]
  ]
}, {
  plugins: [
    Chartist.plugins.ctPrettifyDay({
      startHour: '8:00',
      endHour: '21:00'
    })
  ]
});
```
