import urllib.request, re

url = 'https://portfolio-website-two-blue-82.vercel.app'
html = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
chunks = re.findall(r'src=["\'](/_next/static/chunks/[^"\']+)["\']', html)

urls = []
for c in chunks:
    try:
        js = urllib.request.urlopen(urllib.request.Request(url + c, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
        urls.extend(re.findall(r'https://[a-zA-Z0-9./-]+\.(?:splinecode|glb|gltf|json)', js))
        urls.extend(re.findall(r'https://prod\.spline\.design/[a-zA-Z0-9./-]+', js))
    except Exception as e:
        pass

print('Found URLs:', set(urls))
