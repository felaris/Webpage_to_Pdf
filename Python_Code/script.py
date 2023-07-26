
import os
import requests
from weasyprint import HTML
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def download_website(url, output_dir):
    try:
        # Use Selenium with Chrome WebDriver to load the page and capture its content
        options = webdriver.ChromeOptions()
        options.headless = True
        driver = webdriver.Chrome(options=options)
        driver.get(url)

        # Wait for the page to load dynamically
        wait = WebDriverWait(driver, 10)
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))

        page_content = driver.page_source
        driver.quit()
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return None

    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    filename = os.path.join(
        output_dir, f"{url.split('://')[1].replace('/', '_')}.html")
    with open(filename, "w", encoding="utf-8") as file:
        file.write(page_content)

    return filename


def convert_to_pdf(html_file, output_dir):
    pdf_file = os.path.join(output_dir, os.path.splitext(
        os.path.basename(html_file))[0] + ".pdf")
    HTML(html_file).write_pdf(pdf_file)
    return pdf_file


def main():
    #Add all links website here
    websites = []

    output_directory = "pdf_output"

    for website in websites:
        html_file = download_website(website, output_directory)
        if html_file:
            pdf_file = convert_to_pdf(html_file, output_directory)
            print(f"Converted {website} to {pdf_file}")


if __name__ == "__main__":
    main()
