import urllib2
from BeautifulSoup import BeautifulSoup
# i =0 
url = "https://www.flipkart.com/search?q=iphone"
text = urllib2.urlopen(url).read()
soup = BeautifulSoup(text)

payload = {
'product_name': [],
'product_price': []
}

result  ={
	'data': []
}
product_name = soup.findAll('div',attrs={'class':'_3wU53n'})
product_price = soup.findAll('div',attrs={'class': '_1vC4OE _2rQ-NK'})


for div in product_name:
    links = div.findAll(text=True)
    for a in links:
        payload['product_name'].append(a)

for div in product_price:
    links = div.findAll(text=True)
    for a in links:
        payload['product_price'].append(a)


print payload