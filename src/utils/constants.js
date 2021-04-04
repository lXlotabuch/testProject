export const DOMAIN = 'https://intense-reaches-12245.herokuapp.com/api'

export const getHeaders = () => ({
  Authorization: localStorage.getItem('token'),
  'Content-Type': 'application/json'
})

export const validName = /^[a-zа-яіїё\s]+$/i;
export const validTelephone = /^[0-9]+$/;

export const letterSubjectSubscribe = 'Good day! Dear customer';
export const letterHtmlSubscribe = `<!DOCTYPE html><html lang='en'> <head> <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <meta http-equiv='X-UA-Compatible' content='ie=edge' /> <title>Document</title>
    </head> <body> <p>Thank you for your subscribe!</p></br> 
<p>Once a week you will receive news about receipts</p></body></html>`

export const letterSubjectContactUs = 'Good day! Dear customer';
export const letterHtmlContactUs = `<!DOCTYPE html><html lang='en'> <head> <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <meta http-equiv='X-UA-Compatible' content='ie=edge' /> <title>Document</title>
    </head> <body> <p>Thank you for your appeal!</p> 
<p>Our manager will contact you soon</p></body></html>`