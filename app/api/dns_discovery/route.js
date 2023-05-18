import querystring from 'querystring';
// import { parse } from 'url'; 
// import dns from 'dns';
import ip from 'ip';
import find from 'local-devices'

export async function GET(request, context) {
    const query = querystring.parse(request.url.split('?')[1]);
    const cidr = query.cidr;
    console.log('CIDR: ' + cidr); //
    const network = ip.cidrSubnet(cidr);
    console.log('Network: ' + JSON.stringify(network)); //
    // const start = ip.toLong(network.firstAddress);
    // console.log('1st address: ' + start);
    // const end = ip.toLong(network.lastAddress);
    // console.log('Last address: ' + end);
    if (!cidr) {
        return new Response("Please provide a CIDR parameter", { status: 400 });
    }
    const data = { message: `Starting scan for ${cidr}...` };
    const results = await reverseLookup(cidr);
    // for (let i = start; i <= end; i++) {
    //     const ipAddress = ip.fromLong(i);
        
    //     try {
    //         const hostname = await dns.reverse(ipAddress);
    //         results.push({ ipAddress, hostname });
    //         console.log('Hostname: ', hostname);
    //     } catch (error) {
    //         console.log('Reverse DNS lookup failed for IP address', ipAddress);
    //     }
    // }
    // const json = JSON.stringify(results);
    return new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
      },
    });
}

async function reverseLookup(cidr) {
    return new Promise((resolve, reject) => {
      find().then(devices => {
        console.log(devices); //
        resolve(devices);
      }).catch(error => {
        reject(error);
      });
    });
  }