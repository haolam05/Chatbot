function HandleAnswer(evt) {
  if (evt.keyCode !== 13)
    return;
  if (!evt.target.value)
    return;

  const url = "/chat?message=" + encodeURIComponent(evt.target.value);
  fetch(url).then((val) => {
    if (val.status === 200) {
      return val.json();
    } else {
      AddMessage("Error", `Server Error: ${val.statusText}`);
    }
  }).then((val) => {
    AddMessage("Doctor", val.response);
  });

  AddMessage("Patient", evt.target.value);
  evt.target.value = "";
}

function AddMessage(party, text) {
  const elem = document.getElementById("chat");
  elem.innerHTML += (
    `<div class="${party.toLowerCase()}">` +
      `<span class="name">${party}</span>` +
      `<span class="text">${text}</span>` +
    "</div>");

  const input = document.getElementById("msg");
  input.scrollIntoView();
}