import sys
from selenium import webdriver
from selenium.webdriver import FirefoxOptions

#opts = FirefoxOptions()
#opts.add_argument("--headless")
#driver  = webdriver.Firefox(firefox_options=opts)

options = webdriver.ChromeOptions()
options.binary_location = '/usr/bin/google-chrome-stable'
options.add_argument('headless')
driver = webdriver.Chrome(chrome_options=options)

url = str(sys.argv[1])

print(url)

driver.get(url)
required_width = driver.execute_script('return document.body.parentNode.scrollWidth')
total_height = driver.execute_script("return document.body.parentNode.scrollHeight")
driver.set_window_position(0, 0)
driver.set_window_size(required_width, total_height)
driver.get(url)
driver.get_screenshot_as_file('/home/unipeak99/webshot/webshot_based_on_factom/factom-db/public/'+str(sys.argv[2]) +'.png')
driver.quit()