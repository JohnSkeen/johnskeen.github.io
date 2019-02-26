var gulp = require('gulp');
var svgSprite = require("gulp-svg-sprites");

var config = {
  mode: "symbols",
  preview: {
    symbols: './preview/symbols.html'
  },
  selector: "%f",
  svg: {
    symbols: 'symbols.svg'
  },
  transformData: function (data, config) {
    data.svg.map(function(item) {
      //change id attribute
      item.data=item.data.replace(/id=\"([^\"]+)\"/gm, 'id="'+item.name+'-$1"');

      //change id in fill attribute
      item.data=item.data.replace(/fill=\"url\(\#([^\"]+)\)\"/gm, 'fill="url(#'+item.name+'-$1)"');

      //change id in mask attribute
      item.data=item.data.replace(/mask=\"url\(\#([^\"]+)\)\"/gm, 'mask="url(#'+item.name+'-$1)"');

      //replace double id for the symbol tag
      item.data=item.data.replace('id="'+item.name+'-'+item.name+'"', 'id="'+item.name+'"');
      return item;
    });
    return data; // modify the data and return it
  }
};

gulp.task('sprites', function () {
    return gulp.src('assets/svg/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest("assets"));
});
