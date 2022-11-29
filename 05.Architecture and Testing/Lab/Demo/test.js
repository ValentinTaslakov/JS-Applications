//const { chromium } = require('playwright-chromium');
////зареждаме chromium от библиотеката
//
//(async () => {
//  const browser = await chromium.launch();
//    //стартира браузъра и го запазваме в променлива 
//    //можем да използваме  await chromium.launch({headless: false, slowMo: 2000 })
//    //за да се покаже браузъра и да видим изпълнението на кода, а не само резултата
//  const page = await browser.newPage();
//    //казваме на браузъра да отвори нова страница, 
//    //и тази страница я запазваме в променлива
//  await page.goto('https://google.com/');
//    // казваме на page да отиде на този адрес
//  await page.screenshot({ path: `example.png` });
//   // казваме на page да направи снимка на екрана и да го запази във файл със 
//   //съответното име, формат и място на записване
//  await browser.close();
//    //затваряме браузъра
//
//    // !!! този браузър е виртуален, емулиран от playwright
//})();

const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
//const { it } = require('node:test');

let browser, page; // Declare reusable variables
//декларираме променливи локално които ще използваме в тестовете
// Функциите трябва да са асинхронни защото чакаме отговор от външни АПИ-та
//долу казваме какво да се направи преди да стартират тестовете и след като приключат 
describe('E2E tests', async function () {
    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('load article title', async () => {
        await page.goto('http://localhost:5500');
        await page.screenshot({ path: 'page.png' });
    });
});


