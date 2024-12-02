const http = require('http');
const pLimit = require('p-limit');
const fs = require('fs');

async function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

http.createServer(async function (req, res) {
  const start = performance.now();

  if (req.url.startsWith('/image')) {
    const response = await fetch('https://app.kontrool.de/assets/img/kontrool-logo.png');
    res.write(response.statusText);
  } else if (req.url.startsWith('/google')) {
    const response = await fetch('https://www.google.de/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png');
    res.write(response.statusText);
  } else if (req.url.startsWith('/sleep')) {
    await sleep(1000);
    res.write('OK');
  } else if (req.url.startsWith('/io')) {
    fs.writeFileSync('test+' + (Math.random() * 100000).toString() + '.txt', 'Hello Node.js', 'utf8');
    res.write('written file');
  } else {
    // https://onlinefiletools.com/generate-random-text-file
    // Text of 1024 bytes
    res.write('nurrwqpepmxjascpzhptrhuhohswmctroxyhmxnrvhrnhlcfngavcgvomlcdyutpzewkhtdvbjncutazinnjfsseeblsvhpijnnoerqkbjwumvkhyqinjvglozlhhdpenjxklduhifcpkdaxonjnglympebaqfnmaflubtqsqjconqzywbvtskpgxxbmvgdwofbepuwugddjguzywnomfbiaxsvtzqdyobuzxgcgsiawpizkqnzarvdsxqmwrswmzrjzuvumpgngdgkasnbcsnqsmzpduhvdcffxgzfsbdmwghjemwtthvehcnwnehcfrathjnppookeppwjvfupxhoxtxeyqtnjlutmlzfxbsvjaostbacowxanpznhltllvikepswpkaprvmdxtfchwfaqcbnhictbegpxybppsuhmcpkxstkwqucwfbqvdktlaqeullnxjsynkpibzayzcbafjevtyyzlzbuyruadwaxawotblumdvmrxfbdbujcuinaxrerzixmqeqowqnjsjnpbmsbiznithkddjyyrajbzvzexiwdkmybxtcxpxxxrbwcqovfrxbfinfmhfkjscnlfqabbuzugczrbiqgiwckmwyjxapkmaaayyuxbpnrgxfaambpmilihqvrhgnedfgicenggindmqzqdymbxztxeeoovywjyavddubxmzcnbzpditdzvvkxziqffzyumttagsobtiwvylsblfjdepwanqxamlhamykjagfqkpcqwmwmhzfbntuuwhlujcwvppaqmwpvdqwqaaspskvdfesvzeykkpmxbntbepesielkruyabkdaabrcrxmgzfvpcjfsbqvzzrrlgwkzwvcbrkoeowfmijhygrjpwgwjjwieieocykikltqdibgtnwofhyfhlpgwbjkdrqxeebwbrqvrmaknlheinuhqjrnpkicozfxhlzljhwvhllsbqubefunlbhfdktvoiiqpsyqhswvtesckotdycetyhouhqnzcs');
  }
  res.end();

  console.info(`Request to ${req.url} ${performance.now() - start}ms`);
}).listen(3000); // The server object listens on port 3000
