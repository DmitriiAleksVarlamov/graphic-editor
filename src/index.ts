import fs from 'node:fs';
import gm from 'gm';
import path from 'node:path';
import express from 'express';
import { ROOT } from './constants';
import multer from 'multer';
import { Readable } from 'node:stream';

// const upload = multer({ dest: 'uploads/' });
const storage = multer.memoryStorage();
const upload = multer({ storage });

const PORT = 8000;
const app = express();

// app.get('/', (req, res) => {
// 	const readStream = fs.createReadStream(
// 		path.resolve(ROOT, 'assets', 'sample_image.jpeg')
// 	);

// 	gm(readStream, 'img.jpg')
// 		// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 		.identify(function (error, data) {
// 			console.log('{ error, data }');
// 		})
// 		.stream(function (error, stdout) {
// 			if (error) {
// 				res.send(error);
// 			}
// 			stdout.pipe(res);
// 		});
// });

app.post('/upload', upload.single('image'), (req, res) => {
	const readableStream = Readable.from(req.file.buffer);

	gm(readableStream, 'img.jpg')
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.identify(function (error, data) {
			console.log('{ error, data }');
		})
		.stream(function (error, stdout) {
			if (error) {
				res.send(error);
			}
			stdout.pipe(res);
		});
	// console.log({ image: req.file });
	// console.log('request');
	// res.send('End');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
	console.log({ error });
	res.status = 500;
	res.send(`Server error was happend ${error.message}`);
});

app.listen(PORT, () => {
	console.log(`'Successfully started on port ${PORT}'`);
});
