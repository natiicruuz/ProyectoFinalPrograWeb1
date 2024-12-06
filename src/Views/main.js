document.addEventListener("DOMContentLoaded", () => {
    // Registro
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("register-name").value;
            const email = document.getElementById("register-email").value;
            const password = document.getElementById("register-password").value;
            const enrollment = document.getElementById("register-enrollment").value;

            try {
                const response = await fetch("/api/student/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password, enrollment }),
                });
                const result = await response.json();
                if (response.ok) {
                    alert("Registro exitoso. Ahora puedes iniciar sesión.");
                    // Limpiar formulario de registro
                    registerForm.reset();
                } else {
                    alert(result.error || "Error al registrarse");
                }
            } catch (error) {
                console.error(error);
                alert("Error de red");
            }
        });
    }

    // Inicio de sesión
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            try {
                const response = await fetch("/api/student/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
                const result = await response.json();

                if (response.ok) {
                    localStorage.setItem("token", result.token); // Guardar el token
                    localStorage.setItem("studentId", result.studentId); // Guardar el studentId
                    alert("Inicio de sesión exitoso");
                    window.location.href = "lobby.html"; // Redirigir al dashboard
                } else {
                    alert(result.error || "Error al iniciar sesión");
                }
            } catch (error) {
                console.error(error);
                alert("Error de red");
            }
        });
    }

});

document.addEventListener("DOMContentLoaded", async () => {
    const reservationsTable = document.getElementById("reservationsTable").querySelector("tbody");
    const menuSelect = document.getElementById("menu");

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Debes iniciar sesión.");
        window.location.href = "loginPage.html";
        return;
    }

    // Configuración de headers para solicitudes
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    // Cargar menús desde la base de datos
    async function loadMenus() {
        try {
            const response = await fetch("/api/menus/getAll", { headers });
            const result = await response.json(); // Obtener el objeto completo
            const menus = result.data; // Acceder al array de menús
    
            menuSelect.innerHTML = menus
                .map((menu) => `<option value="${menu._id}">${menu.name}</option>`)
                .join("");
        } catch (error) {
            console.error("Error al cargar los menús:", error);
        }
    }

    // Cargar reservas desde la base de datos
    async function loadReservations() {
        try {
            const studentId = localStorage.getItem('studentId'); // Obtener el studentId desde localStorage
            const response = await fetch(`/api/reservation/getStudentReservations/${studentId}`, { headers });
            const result = await response.json(); // Obtener el objeto completo
            const reservations = result.data; // Acceder al array de reservas
    
            // Verifica si hay reservas antes de llenar la tabla
            if (!reservations || reservations.length === 0) {
                reservationsTable.innerHTML = `<tr><td colspan="4">No hay reservas disponibles</td></tr>`;
                return;
            }
    
            reservationsTable.innerHTML = reservations
                .map((reservation) => {
                    // Formatear fecha y hora
                    const formattedDate = new Date(reservation.date).toLocaleDateString();
                    const formattedTime = new Date(reservation.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    });
    
                    // Asegúrate de acceder al `menu.name` correctamente
                    const menuName = reservation.menu?.name || "Menú no disponible";
    
                    return `
                        <tr>
                            <td>${formattedDate}</td>
                            <td>${formattedTime}</td>
                            <td>${menuName}</td>
                            <td>
                                <button class="edit" data-id="${reservation._id}">Editar</button>
                                <button class="delete" data-id="${reservation._id}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                })
                .join("");
    
            // Agregar eventos a los botones de editar y eliminar
            document.querySelectorAll(".edit").forEach((btn) =>
                btn.addEventListener("click", () => editReservation(btn.dataset.id))
            );
            document.querySelectorAll(".delete").forEach((btn) =>
                btn.addEventListener("click", () => deleteReservation(btn.dataset.id))
            );
        } catch (error) {
            console.error("Error al cargar las reservas:", error);
            reservationsTable.innerHTML = `<tr><td colspan="4">Error al cargar las reservas</td></tr>`;
        }
    }
    
    // Crear una nueva reserva
    document.getElementById('reservationForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del formulario
        
        // Captura los datos de los inputs
        const studentId = localStorage.getItem('studentId'); // Obtener el studentId desde localStorage
        const menuId = document.getElementById('menu').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value; // Captura la hora seleccionada
        const status = document.getElementById('status').value;

        // Combina date y time en un formato válido
        const combinedDateTime = `${date}T${time}:00Z`; // Esto conserva la fecha en UTC

        try {
            // Construye el body para la API
            const reservationData = {
                studentId,
                menuId,
                date: combinedDateTime, // Convierte a formato ISO
                status,
            };

            // Llama al API para crear la reserva
            const token = localStorage.getItem('token');
            const response = await fetch('/api/reservation/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reservationData), // Convierte los datos a JSON
            });

            // Maneja la respuesta de la API
            if (response.ok) {
                const data = await response.json();
                console.log('Reservation created successfully:', data);
                alert('Reservation created successfully!');
                loadReservations();
            } else {
                const error = await response.json();
                console.error('Error creating reservation:', error);
                alert(`Failed to create reservation: ${error.message}`);
            }
        } catch (error) {
            console.error('Error connecting to the API:', error);
            alert('An error occurred. Please try again.');
        }
    });


    // Editar una reserva
    async function editReservation(id) {
        const newDate = prompt("Ingresa la nueva fecha (YYYY-MM-DD):");
        const newTime = prompt("Ingresa la nueva hora (HH:MM):");
        if (!newDate || !newTime) return;

        try {
            const response = await fetch(`/api/reservation/update/${id}`, {
                method: "PUT",
                headers,
                body: JSON.stringify({ date: newDate, time: newTime }),
            });
            if (response.ok) {
                alert("Reserva actualizada con éxito.");
                loadReservations();
            } else {
                const error = await response.json();
                alert(error.message || "Error al actualizar la reserva.");
            }
        } catch (error) {
            console.error("Error al actualizar la reserva:", error);
        }
    }

    // Eliminar una reserva
    async function deleteReservation(id) {
        if (!confirm("¿Estás seguro de eliminar esta reserva?")) return;

        try {
            const response = await fetch(`/api/reservation/delete/${id}`, {
                method: "DELETE",
                headers,
            });
            if (response.ok) {
                alert("Reserva eliminada con éxito.");
                loadReservations();
            } else {
                const error = await response.json();
                alert(error.message || "Error al eliminar la reserva.");
            }
        } catch (error) {
            console.error("Error al eliminar la reserva:", error);
        }
    }

    // Cargar los datos iniciales
    await loadMenus();
    await loadReservations();
});

    