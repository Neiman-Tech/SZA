document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = form.querySelector("input[type='email']");
  const passwordInput = form.querySelector("input[type='password']");
  const submitButton = form.querySelector("button");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    submitButton.disabled = true;
    submitButton.innerText = "Logging in...";

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok) {
        window.location.href = '/main';
      } else {
        alert(result.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      submitButton.disabled = false;
      submitButton.innerText = "Login";
    }
  });
});
