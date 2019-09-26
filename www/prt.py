from selenium import webdriver
from selenium.webdriver import FirefoxOptions

opts = FirefoxOptions()
opts.add_argument("--headless")
driver  = webdriver.Firefox(firefox_options=opts)
driver.get('http://www.google.com');
driver.get_screenshot_as_file('./google.png')
