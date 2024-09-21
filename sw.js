console.log("service workers filw first line....");

/**
 * Converts a Base64 URL-encoded string to a Uint8Array.
 * @param {string} base64String - The Base64 URL-encoded string.
 * @returns {Uint8Array} - The resulting Uint8Array.
 */
function urlBase64ToUint8Array(base64String) {
    // Add padding if necessary
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+') // Convert '-' to '+'
        .replace(/_/g, '/'); // Convert '_' to '/'
    
    // Decode base64 string to binary data
    const rawData = atob(base64);
    
    // Create Uint8Array from the binary data
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
}

/**
 * takes subscription object and saves in DB and return api response
 * @param {subscription} 
 * @returns {api_response}
 */
async function saveSubscription(subscription){
    console.log('subscription: ', subscription);
    try {
       const api_response = await fetch('http://localhost:7000/save-subscription',{
           method:'POST',
           headers:{"Content-Type":'application/json'},
           body:JSON.stringify(subscription),           
        }) 
       return api_response.json();
    } catch (error) {
        
    }
}

self.addEventListener('activate',async (event)=>{
   const pushServiceSubscribedObject= await self.registration.pushManager.subscribe({
       userVisibleOnly: true,
       applicationServerKey: urlBase64ToUint8Array('BPBmFbhfrby7KVOLtTgehTrNYhhh6wvDTcRtNjo7EbiwlZIitfBcIdj1XfISDXkKL7xRH1F3Pz7MXM1nY5g5yh8')
    });
    
   const api_res = await saveSubscription(pushServiceSubscribedObject);
})


self.addEventListener('push',(event)=>{
    self.registration.showNotification("msg from server header",{body:event.data.text()});
})