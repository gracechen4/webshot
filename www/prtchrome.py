
from selenium import webdriver
from selenium.webdriver import FirefoxOptions

opts = FirefoxOptions()
opts.add_argument("--headless")



fp = webdriver.FirefoxProfile()
#fp.set_preference('browser.helperApps.neverAsk.saveToDisk',"text/csv,text/comma-separated-values,text/comma-separated-values;charset=UTF-8")
fp.set_preference( "intl.accept_languages", "no,en-us,en" ); 

fp.update_preferences()
#driver  = webdriver.Firefox(firefox_profile=fp, firefox_options=opts)

options = webdriver.ChromeOptions()
options.binary_location = '/usr/bin/google-chrome-stable'
options.add_argument('headless')
driver = webdriver.Chrome(executable_path="./chromedriver",chrome_options=options)

#driver  = webdriver.Firefox(firefox_options=opts)
#driver.get('http://www.google.com');


#yum -y install liberation-*

driver.set_window_position(0, 0)

#original_size = driver.get_window_size()
#required_width = driver.execute_script('return document.body.parentNode.scrollWidth')
#required_height = driver.execute_script('return document.body.parentNode.scrollHeight')
#print(required_width)
#print(required_height)

#driver.set_window_size(1024, required_height)

#driver.set_window_position(0, 0)
#driver.set_window_size(1024, 2768)

url = "https://main.weku.io/community-deals/@amar/for-a-better-weku-600-weku-contest-reward-2-more-days-to-go"
url = "https://main.weku.io/hot"
url = "https://stackoverflow.com/questions/44085722/how-to-get-screenshot-of-full-webpage-using-selenium-and-java"
url = "https://deals.weku.io/community-deals/@delwar/4drrik"
url = "https://steemit.com/@winwinwin/feed"
#url = "https://www.worldcoinindex.com/"
#url = "https://deals.weku.io/@weku-italy"

driver.set_window_position(0, 0)
driver.get(url)
required_width = driver.execute_script('return document.body.parentNode.scrollWidth')
total_height = driver.execute_script("return document.body.parentNode.scrollHeight")
print(total_height)
print(required_width)
driver.set_window_position(0, 0)
driver.set_window_size(required_width, total_height)
driver.get(url)

print(driver.page_source)

#firefox_elem = firefox_driver.find_element_by_tag_name('html')
#firefox_elem.get_screenshot_as_file('./google12.png')


driver.get_screenshot_as_file('./google22.png')
#driver.save_screenshot('./google22.png')
driver.quit()



