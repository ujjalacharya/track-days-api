document.addEventListener('DOMContentLoaded', () => {
  const copyButton = document.getElementById('copy');
  copyButton.addEventListener('click', copyToken);
});

function copyToken() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  if (token) {
    navigator.clipboard
      .writeText(token)
      .then(() => {
        let countdown = 10;
        const messageElement = document.getElementById('message');
        const mainTitle = document.getElementById('main_title');
        // messageElement.innerText = `OTP copied to clipboard! This tab will close in ${countdown} seconds.`;

        // Set an interval to update the countdown every second
        const interval = setInterval(() => {
          countdown -= 1;
          mainTitle.innerText = `OTP copied, paste it in the app and start using it!`;
          messageElement.innerText = `This tab will close in ${countdown} seconds.`;

          if (countdown <= 0) {
            clearInterval(interval);
            // messageElement.innerText =
            //   'You can now return to the extension and paste the token.';
            window.close();
          }
        }, 1000); // 1 second
      })
      .catch((err) => {
        document.getElementById('message').innerText = 'Failed to copy token.';
        console.error('Failed to copy token: ', err);
      });
  } else {
    document.getElementById('message').innerText = 'No token found in URL.';
  }
}
