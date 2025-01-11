exports.handler = async (event) => {
  const { path, queryStringParameters } = event;
  const apiEndpoint = 'https://binhusenstore.my.id/'; 

  try {
    const url = new URL(apiEndpoint);
    url.pathname = path.replace(/^\/api/, ''); 
    if (queryStringParameters) {
      url.search = new URLSearchParams(queryStringParameters).toString();
    }

    const response = await fetch(url.toString());

    if (!response.ok) { 
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return {
      statusCode: response.status, 
      body: JSON.stringify(data),
      headers: { 
        'Content-Type': 'application/json',
        'Set-cookie': response.headers.getSetCookie(),
        'Refresh': response.headers.get("refresh")
      },
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500, 
      body: JSON.stringify({ message: 'Error fetching data: ' + error.message }),
    };
  }
};


// exports.handler = async (event) => {
//     const { path, queryStringParameters } = event;
  
//     // // Target API endpoint
//     const apiEndpoint = 'https://binhusenstore.my.id'; 
  
//     // Construct the full URL
//     const url = new URL(apiEndpoint);
//     // url.pathname = path.replace(/^\/api/, ''); // Remove leading "/api"
//     url.pathname = path.replace(".netlify/functions/proxy/", ''); // Remove leading "/api"
//     if (queryStringParameters) {
//       url.search = new URLSearchParams(queryStringParameters).toString();
//     }
  
//     console.log("the url: ", url.toString())
//     try {
//       const response = await fetch(url.toString());
//       const data = await response.json();
  
//       return {
//         statusCode: response.status,
//         body: JSON.stringify(data),
//         headers: {
//           'Content-Type': 'application/json',
//           ...response.headers
//         },
//       };
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ message: 'Error fetching data' }),
//       };
//     }
//   };