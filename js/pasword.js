        const ADMIN_PASSWORD = "MasterLeagues2024";
        
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            if (password === ADMIN_PASSWORD) {
                // Guardar sesión por 2 horas
                const session = {
                    loggedIn: true,
                    expires: Date.now() + (2 * 60 * 60 * 1000)
                };
                localStorage.setItem('adminSession', JSON.stringify(session));
                window.location.href = 'admin-panel.html';
            } else {
                errorMessage.style.display = 'block';
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 3000);
            }
        });