/**
 * checking ServiceWorkers api suppport excuting browser
 */
function checkServiceWorkersSupports() {
  if ("serviceWorker" in navigator) {
    console.log("ServiceWorkers is supporting .....");
  } else {
    throw new Error("ServiceWorkers is not supporting .....");
  }
}

/**
 * registering the service workers and return the registered serviceWokers Object
 * @returns {register}
 */
async function onRegisterServiceWorkers() {
  try {
    return await navigator.serviceWorker.register("./sw.js");
  } catch (error) {
    console.log("error: ", error);
  }
}

/**
 * requesting the notification permission from user
 */
async function onRequestNotificationPermission() {
  const status = await Notification.requestPermission();
  if (status !== "granted") {
    throw new Error("permission denied....!");
  } else {
    console.log("permission granted....!");
    // new Notification('Notification granted....!')
    
  }
}
/**
 * main thread runns
 */
async function mainThread() {
    checkServiceWorkersSupports();
    await onRequestNotificationPermission();
    await onRegisterServiceWorkers();
  // showNotification() handles the show notification using Notification api
  // registeredSWinstance.showNotification('hii from main thread');
}
