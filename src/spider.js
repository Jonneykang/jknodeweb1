const pupperteer = require('puppeteer');


const traversalToPDF = async (links,page) => {
    let i = 0;
    while(i < links.length){
        await page.goto(links[i].href);
        await page.waitFor(500);
        await page.waitForSelector('#sidebar');
        await page.$eval('#sidebar', el => {
            el.style.display = 'none';
        });
        await page.waitForSelector('#content');
        await page.pdf({
            path: `PDF/${i+1}.${links[i].name}.pdf`
        });
        console.log(`打印第${i+1}页pdf`);
        i++;
    }
}

(async () => {
    try {
        console.log("***************开始执行***************");
        const browser = await pupperteer.launch({
            headless: true,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            args: ['--start-maximized']
        });
        console.log("************** launch开始执行 ***********");
        const page = await browser.newPage();
        console.log("************** page开始执行 ***********");
        await page.setViewport({
            width: 1920,
            height: 1080
        });
        await page.goto('https://es6.ruanyifeng.com');
        console.log("************** 跳转成功 ***********");
        await page.waitForSelector('#sidebar ol a', {timeout: 60000});

        let links = await page.evaluate(() => {
             return Array.from(document.querySelectorAll('#sidebar ol a')).map(value => {
                const {href, innerText: name} = value
                return {
                    href,
                    name
                }
            });
        })
        await traversalToPDF(links,page);
        await browser.close();
        console.log("*****************执行结束********************");
    } catch (error) {
       console.log(error); 
    }
})();