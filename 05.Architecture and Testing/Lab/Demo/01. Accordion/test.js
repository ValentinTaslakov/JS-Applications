const { chromium } = require('playwright-chromium');
const { expect } = require('chai');


let browser, page; // Declare reusable variables
//декларираме променливи локално които ще използваме в тестовете
// Функциите трябва да са асинхронни защото чакаме отговор от външни АПИ-та
//долу казваме какво да се направи преди да стартират тестовете и след като приключат 
describe('E2E tests', async function () {
    this.timeout(5000);

    before(async () => { browser = await chromium.launch({headless: false, slowMo: 500}); });
        //{headless: false, slowMo: 500} се използва за де се визуализира теста, и служи за debug
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('load article title', async () => {
        await page.goto('http://localhost:5500');
            //отиваме на тази страница
        await page.waitForSelector('.accordion div.head>span');
            //чакаме докато се появи спан-а в който е съдържанието което ще търсим

        const content = await page.textContent('#main');
            //взимам съдиржанието на майн-а в променлива
            //и долу го сравнявам с това което очаквам
            //като contain най-вероятно игнорира малки и главни букви и 
            // и намира съвпаденията независимо от останалия текст или фразата
            //която търсим ако е в комбинация с друг текст се игнорира 
        expect(content).to.contain('Scalable Vector Graphics');
        expect(content).to.contain('Open standard');
        expect(content).to.contain('Unix');
        expect(content).to.contain('ALGOL');
    });
    
    it('has working More button', async () => {
        //only => изпълнява се само този тест
        await page.goto('http://localhost:5500');
        await page.click('text=More');
            //изчакваме страницата да регистрира клик на бутон с текст More
            //като така изписано е case insensetive, а ако е 'text="More"' е sensetive
        await page.waitForSelector('.extra p');
            //понеже се изпраща заявка при натискането на бутона, казваме на страницата
            // да изчака да се зареди параграфа в който е текста
        const text = await page.textContent('.extra p');
            //след като се появи взимаме текста в променлива
        const visible = await page.isVisible('.extra p');
            //взимаме в променлива дали параграфа се визуализира
        expect(text).to.contain('Scalable Vector Graphics (SVG) is an Extensible Markup Language');
            //сравнянваме текста със първото изречение на очаквания отговор
        expect(visible).to.be.true;
            //очакваме че параграфа ще се визуализира
    })

    it.only('has working Less button', async () => {
        //only => изпълнява се само този тест
        await page.goto('http://localhost:5500');
        await page.click('text=More');
            //изчакваме страницата да регистрира клик на бутон с текст More
            //като така изписано е case insensetive, а ако е 'text="More"' е sensetive
        await page.waitForSelector('.extra p');
            //понеже се изпраща заявка при натискането на бутона, казваме на страницата
            // да изчака да се зареди параграфа в който е текста
        
        let visible = await page.isVisible('.extra p');
            //взимаме в променлива дали параграфа се визуализира
        expect(visible).to.be.true;
            //очакваме че параграфа ще се визуализира
        
            //горе си стартираме теста дали работи More button-a
            //после даваме да се кликне на Less button 
            //правим проверка дали се вижда параграфа
            //като очакваме да не се вижда
        await page.click('text=Less');
        visible = await page.isVisible('.extra p');
        expect(visible).to.be.false
    })
});