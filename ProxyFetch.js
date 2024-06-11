async function proxyFetch() {
  const req = new Request('https://example.com/api/data');
  const response = await fetch(req);
  const data = await response.text();
  document.getElementById('response').innerText = data;
}

export default {
  async fetch(req) {
    try {
      const url = new URL(req.url);
      const splitted = url.pathname.replace(/^\/*/, '').split('/');
      const address = splitted[0];
      url.pathname = splitted.slice(1).join('/');
      url.hostname = address;
      url.protocol = 'https';
      return fetch(new Request(url, req));
    } catch (e) {
      return new Response(e);
    }
  }
};
