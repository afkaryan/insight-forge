import fs from 'fs';
import pdfParse from 'pdf-parse';

const testPdf = async () => {
    try {
        const filePath = 'uploads/resume-1772795028870.pdf';
        console.log(`Reading file: ${filePath}`);
        if (!fs.existsSync(filePath)) {
            console.error(`File NOT found: ${filePath}`);
            return;
        }
        const dataBuffer = fs.readFileSync(filePath);
        console.log('File read successfully. Parsing...');
        const data = await pdfParse(dataBuffer);
        console.log('Parsed text length:', data.text.length);
        console.log('Sample text:', data.text.substring(0, 100));
    } catch (error) {
        console.error('Error during PDF parsing:', error);
    }
};

testPdf();
