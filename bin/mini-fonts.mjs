import Fontmin from 'fontmin';

const fontmin = new Fontmin().src('./fonts/*.ttf').dest('static/fonts');

fontmin.run(function (err) {
	if (err) {
		throw err;
	}
});
