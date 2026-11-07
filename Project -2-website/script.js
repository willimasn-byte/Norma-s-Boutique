const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const messageField = document.getElementById("message");
    const statusText = document.getElementById("form-status");
    const gmailLink = document.getElementById("gmail-link");
    const productName = new URLSearchParams(window.location.search).get("product");

    if (productName && messageField) {
        messageField.value = `I am interested in the ${productName}. Could you please share more details?`;
    }

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const message = String(formData.get("message") || "").trim();
        const subject = productName ? `Product inquiry: ${productName}` : `Message from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        const gmailComposeUrl = new URL("https://mail.google.com/mail/");
        gmailComposeUrl.searchParams.set("view", "cm");
        gmailComposeUrl.searchParams.set("fs", "1");
        gmailComposeUrl.searchParams.set("to", "willimasn@gmail.com");
        gmailComposeUrl.searchParams.set("su", subject);
        gmailComposeUrl.searchParams.set("body", body);

        if (gmailLink) {
            gmailLink.href = gmailComposeUrl.toString();
            gmailLink.textContent = "Open Gmail draft to send";
        }

        if (statusText) {
            statusText.textContent = "Gmail will open with your message ready. Review it and press Send.";
        }

        window.location.assign(gmailComposeUrl.toString());
    });
}