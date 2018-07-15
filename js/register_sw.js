if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("sw.js")
    .then(reg => {
      console.log("Registration of sw successful!");
    })
    .catch(err => {
      console.log("Error occured during registration!", err);
    });
}
