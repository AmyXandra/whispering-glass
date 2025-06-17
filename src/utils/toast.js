export function showToast(message, duration = 3000) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  const container = document.getElementById("toast-container");
  container.appendChild(toast);

  // Auto-dismiss after `duration`
  setTimeout(() => {
    toast.style.animation = "slideOut 0.4s forwards";
    toast.addEventListener("animationend", () => toast.remove());
  }, duration);
}
