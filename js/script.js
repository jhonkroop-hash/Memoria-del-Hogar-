/* =====================================
   1. CENTRO DE AYUDA FLOTANTE
===================================== */

(() => {
    const openButton = document.getElementById("openSupport");
    const closeButton = document.getElementById("closeSupport");
    const panel = document.getElementById("supportPanel");
    const faqButton = document.getElementById("supportFaq");
    const faqAnswer = document.getElementById("faqAnswer");

    // Abrir o cerrar el panel de ayuda.
    function setSupportOpen(isOpen) {
        panel.classList.toggle("is-open", isOpen);

        panel.setAttribute(
            "aria-hidden",
            String(!isOpen)
        );

        openButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        if (isOpen) {
            closeButton.focus();
        } else {
            openButton.focus();
        }
    }

    openButton.addEventListener("click", () => {
        const isOpen = panel.classList.contains("is-open");
        setSupportOpen(!isOpen);
    });

    closeButton.addEventListener("click", () => {
        setSupportOpen(false);
    });

    // Mostrar u ocultar la respuesta de ayuda.
    faqButton.addEventListener("click", () => {
        faqAnswer.hidden = !faqAnswer.hidden;

        faqButton.setAttribute(
            "aria-expanded",
            String(!faqAnswer.hidden)
        );
    });

    // Cerrar el panel con la tecla Escape.
    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            panel.classList.contains("is-open")
        ) {
            setSupportOpen(false);
        }
    });

    // Cerrar el panel al seleccionar el enlace de contacto.
    panel.querySelectorAll(".support-action").forEach((link) => {
        link.addEventListener("click", () => {
            setSupportOpen(false);
        });
    });
})();


/* =====================================
   2. SELECCIÓN Y ELIMINACIÓN DE ARCHIVOS
===================================== */

(() => {
    const fileInput = document.getElementById("contactFile");
    const preview = document.getElementById("filePreview");
    const removeButton = document.getElementById("removeFile");

    // Mostrar información del archivo seleccionado.
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];

        if (!file) {
            preview.style.display = "none";
            preview.textContent = "";
            removeButton.hidden = true;
            return;
        }

        const fileSize = (file.size / 1024).toFixed(1);

        preview.textContent =
            `Archivo seleccionado: ${file.name} (${fileSize} KB)`;

        preview.style.display = "block";
        removeButton.hidden = false;
    });

    // Eliminar el archivo seleccionado.
    removeButton.addEventListener("click", () => {
        fileInput.value = "";

        preview.textContent = "";
        preview.style.display = "none";

        removeButton.hidden = true;
    });
})();


/* =====================================
   3. FORMULARIO DE CONTACTO
===================================== */

(() => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    form.addEventListener("submit", (event) => {
        // Evita que la página se recargue.
        event.preventDefault();

        // Comprueba los campos obligatorios.
        if (!form.reportValidity()) {
            return;
        }

        // Obtener los datos del formulario.
        const name = document
            .getElementById("contactName")
            .value.trim();

        const email = document
            .getElementById("contactEmail")
            .value.trim();

        const phone = document
            .getElementById("contactPhone")
            .value.trim();

        const topic = document
            .getElementById("contactTopic")
            .value;

        const message = document
            .getElementById("contactMessage")
            .value.trim();

        const file = document
            .getElementById("contactFile")
            .files[0];

        // Preparar el asunto del correo.
        const subject = encodeURIComponent(
            `[Memoria del Hogar] ${topic}`
        );

        // Preparar el contenido del mensaje.
        const body = encodeURIComponent(
            `Nombre: ${name}\n` +
            `Correo: ${email}\n` +
            `Teléfono: ${phone}\n` +
            `Motivo: ${topic}\n\n` +
            `Mensaje:\n${message}` +
            (
                file
                    ? `\n\nArchivo seleccionado: ${file.name}. ` +
                      "Debes adjuntarlo manualmente en el correo."
                    : ""
            )
        );

        status.textContent =
            "Abriendo tu aplicación de correo...";

        // Abrir el correo con los datos preparados.
        window.location.href =
            `mailto:soporte@memoriadelhogar.com` +
            `?subject=${subject}&body=${body}`;

        // Mostrar instrucciones si no se abre el correo.
        window.setTimeout(() => {
            status.textContent =
                "Si no se abrió tu correo, escribe a " +
                "soporte@memoriadelhogar.com. " +
                "El formulario todavía no envía datos directamente.";
        }, 1500);
    });
})();


/* =====================================
   4. ANIMACIONES AL DESPLAZARSE
===================================== */

(() => {
    const elements = document.querySelectorAll(
        ".inventory-card, " +
        ".benefit, " +
        ".feature-mini, " +
        ".step, " +
        ".contact-card, " +
        ".section-title"
    );

    // Activar la clase inicial de animación.
    elements.forEach((element) => {
        element.classList.add("reveal");
    });

    // Compatibilidad con navegadores antiguos.
    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;
    }

    // Detectar cuándo un elemento entra en pantalla.
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");

                    // Evita repetir la animación innecesariamente.
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
})();