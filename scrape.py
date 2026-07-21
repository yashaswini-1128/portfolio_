import urllib.request, re, json
url = 'https://portfolio-website-two-blue-82.vercel.app'
html = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
print("--- ASSETS FOUND ---")
images = set(re.findall(r'[\"\']([^\/\"]+\.(?:png|gif|webp|svg|glb))[\"\']', html, re.I))
lotties = set(re.findall(r'[\"\']([^\"\']*\.json)[\"\']', html, re.I))
splines = set(re.findall(r'[\"\']([^\"\']*\.splinecode)[\"\']', html, re.I))
print("IMAGES:", images)
print("LOTTIES:", lotties)
print("SPLINES:", splines)
print("ROBOT OR BOT MENTIONS:", [m for m in re.findall(r'[\"\']([^\"\']*robot[^\"\']*)[\"\']', html, re.I)])
print("BOT:", [m for m in re.findall(r'[\"\']([^\"\']*bot[^\"\']*)[\"\']', html, re.I)])
