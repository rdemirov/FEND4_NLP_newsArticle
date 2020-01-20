import { checkUrl } from "./helpers";

function handleSubmit(event) {
  event.preventDefault();
  let formUrl = document.getElementById("url").value;
  const urlValid = checkUrl(formUrl);
  const resultsDiv = document.getElementById("sentimentResults");
  while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.firstChild);
  }

  if (urlValid) {
    fetch(`http://localhost:${app_port}/analyzeSentiment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: formUrl })
    })
      .then(res => res.json())
      .then(function(res) {
        if (res.error) alert(res.error);
        else {
          const responseProps = Object.keys(res);
          for (let index = 0; index < responseProps.length; index++) {
            if (responseProps[index] !== "text") {
              const elementLabel = document.createElement("div");
              const elementValue = document.createElement("div");
              elementLabel.className = "dataLabel";
              let splitString = responseProps[index]
                .split("_")
                .map(item => item.charAt(0).toUpperCase() + item.slice(1));
              const fieldLabel = splitString.join(" ");
              elementLabel.textContent = fieldLabel;
              elementValue.classList.add("dataCell");
              elementValue.setAttribute("id", responseProps[index]);
              if (responseProps[index] === "polarity") {
                if (res["polarity"] === "positive")
                  elementValue.classList.add("colorGreen");
                else elementValue.classList.add("colorRed");
              }
              elementValue.textContent = res[responseProps[index]];
              resultsDiv.appendChild(elementLabel);
              resultsDiv.appendChild(elementValue);
            }
          }
          const resultsParagraph = document.createElement("p");
          resultsParagraph.setAttribute("id", "resultsText");
          resultsParagraph.className = "dataCell_text";
          resultsParagraph.textContent = res["text"];
          resultsDiv.appendChild(resultsParagraph);
        }
      });
  } else {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.textContent = "Please enter a valid URL";
    resultsDiv.appendChild(errorDiv);
  }
}

export { handleSubmit };
