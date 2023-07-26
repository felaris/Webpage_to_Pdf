const puppeteer = require("puppeteer");

// List of URLs to convert to PDF
const webpageList = [
    "https://www.graphic.com.gh/daily-graphic-editorials/we-need-good-maintenance-culture.html",
    "https://www.graphic.com.gh/daily-graphic-editorials/strengthening-our-electoral-management-system.html",
    "https://www.graphic.com.gh/daily-graphic-editorials/we-stand-with-our-women.html",
    "https://www.graphic.com.gh/daily-graphic-editorials/to-hear-for-life-listen-with-care.html",
    "https://www.graphic.com.gh/daily-graphic-editorials/achieving-national-hiv-response-targets-key.html",
    "https://www.graphic.com.gh/daily-graphic-editorials/e-services-have-come-to-stay.html",
    "https://www.graphic.com.gh/daily-graphic-editorials/govt-imf-meeting-must-yield-right-results-to-turn-economy-around.html",
    "https://www.graphic.com.gh/daily-graphic-editorials/we-need-effective-management-of-our-groundwater.html",
    "https://www.graphic.com.gh/daily-graphic-editorials/time-to-support-our-printing-industry-to-grow-2.html",
    "https://www.graphic.com.gh/daily-graphic-editorials/after-utag-strike.html",

    // Add more URLs as needed
];

(async () => {
    try {
        // Launch a headless browser
        const browser = await puppeteer.launch();

        // Loop through the webpage list and convert each page to PDF
        for (let i = 0; i < webpageList.length; i++) {
            const url = webpageList[i];
            const page = await browser.newPage();

            // Navigate to the webpage
            await page.goto(url, { waitUntil: "networkidle0" });

            // Extract the webpage name from the URL and encode it for filename
            const parsedUrl = new URL(url);
            const fileName = encodeUrlToFilename(parsedUrl.href) + ".pdf";

            // Generate the PDF file
            await page.pdf({ path: fileName, format: "A4" });

            console.log(`Page ${i + 1} converted to PDF: ${fileName}`);

            // Close the current page to free up resources for the next iteration
            await page.close();
        }

        // Close the browser after processing all webpages
        await browser.close();
        console.log("All webpages converted to PDF successfully.");
    } catch (error) {
        console.error("Error occurred:", error);
    }
})();
