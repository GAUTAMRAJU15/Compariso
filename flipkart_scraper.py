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

# print payload['product_name']
# print payload['product_price']
f= open("out.txt","a")
for name in payload['product_name']:
	i=0
	for price in payload['product_price']:
		if(i>=1):
			break
		else:
			# print str(name) +" && "+ str(price)
			f.write(str(name) +" && "+ str(price) + "\n")
			
		
			i=i+1

f.close()

