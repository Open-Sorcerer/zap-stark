
async function walletHistory(address: string) {
    const url = `https://voyager.online/api/txns?to${address}=&ps=10&p=1&type=null`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.VOYAGER_API_KEY as string
        },
    });
    const data = await response.json();
    return data;
}



