document.addEventListener('DOMContentLoaded', function() {
  checkAuthStatus();
});

function checkAuthStatus() {
  fetch('check_auth.php')
    .then(response => response.json())
    .then(data => {
      if (data.isAuthenticated) {
        const authButtons = document.querySelector('.auth-buttons');
        authButtons.innerHTML = `
          <a href="account.php">${data.username} | Личный кабинет</a>
          <a href="logout.php">Выйти</a>
        `;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
