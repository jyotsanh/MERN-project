import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './public';
const outputDir = './public/webp';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file).toLowerCase() === '.svg') {
            sharp(`${inputDir}/${file}`)
                .toFormat('webp')
                .toFile(`${outputDir}/${path.basename(file, '.svg')}.webp`, (err, info) => {
                    if (err) {
                        console.error('Error converting file:', err);
                    } else {
                        console.log('Conversion successful:', info);
                    }
                });
        }
    });
});
