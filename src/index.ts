import fs from 'node:fs';
import gm from 'gm';
import path from 'node:path';
import express from 'express';
const PORT = 8000;
const app = express();

app.get('/', (req, res) => {
	const readStream = fs.createReadStream(
		path.resolve(__dirname, 'sample_image.jpeg')
	);
	gm(readStream, 'img.jpg')
		.identify(function (error, data) {
			console.log({ error, data });
		})
		.stream(function (error, stdout) {
			if (error) {
				res.send(error);
			}
			stdout.pipe(res);
		});
});

app.post('/image', (req, res) => {
	console.log('request');
	res.send('End');
});

app.listen(PORT, () => {
	console.log(`'Successfully started on port ${PORT}'`);
});
