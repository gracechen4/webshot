from selenium import webdriver
from selenium.webdriver import FirefoxOptions

opts = FirefoxOptions()
opts.add_argument("--headless")
driver  = webdriver.Firefox(firefox_options=opts)
driver.get('https://www.cnn.com');
driver.get_screenshot_as_file('/home/njtu1133/factom-db/public/google.png')
