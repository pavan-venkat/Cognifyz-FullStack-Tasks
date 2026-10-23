const passwordInput = document.getElementById("password");
if (passwordInput) {
  const rules = {
    lengthRule: value => value.length >= 8,
    upperRule: value => /[A-Z]/.test(value),
    lowerRule: value => /[a-z]/.test(value),
    numberRule: value => /[0-9]/.test(value),
    specialRule: value => /[^A-Za-z0-9]/.test(value)
  };
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");
  passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;
    let score = 0;
    Object.entries(rules).forEach(([id, test]) => {
      const passed = test(value);
      if (passed) score++;
      const item = document.getElementById(id);
      item.textContent = `${passed ? "✓" : "○"} ${item.textContent.slice(2)}`;
      item.classList.toggle("list-group-item-success", passed);
    });
    strengthBar.style.width = `${score * 20}%`;
    strengthBar.className = "progress-bar";
    if (!value) { strengthText.textContent = "Strength: Not entered"; }
    else if (score <= 2) { strengthBar.classList.add("bg-danger"); strengthText.textContent = "Strength: Weak"; }
    else if (score <= 4) { strengthBar.classList.add("bg-warning"); strengthText.textContent = "Strength: Medium"; }
    else { strengthBar.classList.add("bg-success"); strengthText.textContent = "Strength: Strong Password"; }
  });
}
const updateButton = document.getElementById("updateButton");
if (updateButton) {
  updateButton.addEventListener("click", () => {
    const value = document.getElementById("textInput").value.trim();
    const output = document.getElementById("updatedText");
    output.textContent = value ? `${value} — Text Updated Successfully!` : "Please enter text first.";
    output.className = value ? "alert alert-success" : "alert alert-warning";
  });
}
const greetingButton = document.getElementById("greetingButton");
if (greetingButton) {
  greetingButton.addEventListener("click", () => {
    const hour = new Date().getHours();
    document.getElementById("greeting").textContent =
      hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";
  });
}
