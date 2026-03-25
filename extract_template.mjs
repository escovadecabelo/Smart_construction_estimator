import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs';

async function readPdf(filePath) {
  const loadingTask = pdfjsLib.getDocument(filePath);
  const pdf = await loadingTask.promise;
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += `--- Page ${i} ---\n` + strings.join(' ') + '\n';
  }
  
  console.log(fullText);
}

const filePath = 'G:/My Drive/Estimates/estimates sent/26405 Pottery Barn Kids - Preston Park Village - Cleaning.pdf';
readPdf(filePath).catch(err => console.error(err));
