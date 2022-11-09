import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs'

async function getFormulaOneDrivers () {
    try {
       
        const response = await fetch ('https://www.formula1.com/en/drivers.html');

        const body = await response.text();

        const $ = cheerio.load(body);
        // const wrapper = ('.listing-items--wrapper');

        const items = []
        $('.listing-items--wrapper > .row > .col-12').map((i, el) => {
            const rank = $(el).find('.rank').text();
            const points = $(el).find('.points > .f1-wide--s').text();
            const firstName = $(el).find('.listing-item--name span:first').text();
            const lastName = $(el).find('.listing-item--name span:last').text();
            const team = $(el).find('.listing-item--team').text();

            items.push({
                rank,
                points,
                firstName,
                lastName,
                team
            })
        });

        fs.writeFile('formulaOne.json', JSON.stringify(items),function(error) {
            if(error) return console.log(error);
            console.log('formulaOne.json successfully saved');
        });
    } catch (error) {
      console.log(error);  
    }
}

getFormulaOneDrivers();