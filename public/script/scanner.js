Quagga.init(
  {
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#cam"),
      constraints: {
        width: 480,
        height: 320,
        facingMode: "environment",
      },
    },
    decoder: {
      readers: ["ean_reader", "upc_reader"],
    },
  },
  function (err) {
    if (err) {
      console.error("Error: ", err);
      return;
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
  }
);

Quagga.onDetected(function (result) {
  console.log(
    "Barcode detected and processed : [" + result.codeResult.code + "]",
    result
  );
  // 在這裡可以進一步處理掃描到的條碼數據
});
