const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  const fileInput = document.querySelector("#file");
  const output = document.querySelector("#output");
  const imageFile = fileInput.files[0];
  const selectedLang = document.querySelectorAll(".lang:checked");

  const langFn = (arr) => {
    let langVal = "";
    for (const lang of arr) {
      langVal = lang.value;
    }
    return langVal;
  };

  if (!imageFile) {
    output.innerText = "Please upload an image file!";
    return;
  } else if (!langFn(selectedLang)) {
    output.innerText = "Please select a language!";
    return;
  }

  // Add loading icon to the button
  btn.innerHTML = "<i class='bx bx-loader bx-spin'></i> Processing...";

  // Display loading icon in the output area
  output.innerHTML = "<i class='bx bx-loader bx-spin'></i> Extracting text...";

  Tesseract.recognize(imageFile, langFn(selectedLang))
    .then(({ data }) => {
      output.innerText = data.text;
      // Remove loading icon from the button
      btn.innerHTML = "Extract Text";
      //Clear input field
      fileInput.value = "";
      // Add event listener to the copy button
      const copyBtn = document.querySelector("#copyBtn");
      copyBtn.style.pointerEvents = "auto";
      copyBtn.addEventListener("click", () => {
        const textToCopy = data.text;
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            alert("Text copied to clipboard");
          })
          .catch((err) => {
            console.error("Error copying text: ", err);
          });
      });
    })
    .catch((err) => {
      output.textContent = `Error: ${err}`;
      // Remove loading icon from the button
      btn.innerHTML = "Extract Text";
    });
});
