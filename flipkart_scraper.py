import urllib2
from BeautifulSoup import BeautifulSoup
# i =0 
keyword = raw_input()
url = "https://www.flipkart.com/search?q="+ keyword
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


f= open("out.txt","w+")
i = 1;	

while(i < len(payload['product_name'])):
	pname =  ''
	pprice =  ''

	for name in range(0,i):
		ppname = payload['product_name'][name]
	for price in range(0,i):
		pprice =  payload['product_price'][name]

	f.write(str(ppname) +" && "+ str(pprice) + "\n")
	i= i+1;


f.close()


