// Wait until the DOM is fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements for easier access and better performance
    const form = document.getElementById('signature-form');
    const signatureOutput = document.getElementById('signature-output');
    const copyButton = document.getElementById('copy-button');

    // Handle form submission event
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page

        // Define brand colors (for consistent styling)
        const color1 = '#2d1a47'; // Primary text color
        const color2 = '#a9a9a9'; // Secondary text color

        // Gather input values from the form
        const name = document.getElementById('name').value.trim();
        const pronouns = document.getElementById('pronouns').value.trim();
        const title = document.getElementById('title').value.trim();
        const alternateTitle = document.getElementById('alternateTitle').value.trim();
        const address = document.getElementById('address').value.trim();
        const mailcode = document.getElementById('mailcode').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const fax = document.getElementById('fax').value.trim();
        const email = document.getElementById('email').value.trim();

        // Ensure required fields are filled
        if (!name || !title || !email) {
            alert('Please fill in all required fields.');
            return;
        }

        // Build the HTML for the signature
        const signatureHTML = `
        <div style="color: ${color1}; font-family: Arial, sans-serif;">
            <strong>${name}</strong> ${pronouns ? `(${pronouns})` : ''}
        </div>
        <div style="color: ${color2}; font-family: Arial, sans-serif;">
            <b>${title}</b><br>
            ${alternateTitle ? `${alternateTitle}<br>` : ''}
            ${address ? `${address}<br>` : ''}
            ${mailcode ? `M/C: ${mailcode}<br>` : ''}
            Office: ${phone} ${fax ? ` | Fax: ${fax}` : ''}<br>
            <a href="mailto:${email}" style="color: ${color1}; text-decoration: none;">${email}</a><br>
        </div>`;

        // Insert the generated signature into the output container
        signatureOutput.innerHTML = signatureHTML;

        // Display the signature and the copy button
        signatureOutput.style.display = 'block';
        copyButton.style.display = 'block';
    });

    // Handle the copy-to-clipboard functionality
    copyButton.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNodeContents(signatureOutput);
        const selection = window.getSelection();
        selection.removeAllRanges(); // Clear previous selections
        selection.addRange(range);
        try {
            // Execute the copy command
            document.execCommand('copy');
            alert('Signature copied to clipboard!');
            window.location.href = 'index.html#6';
        } catch (err) {
            alert('Failed to copy the signature.');
        }

        // Deselect the text after copying
        selection.removeAllRanges();
    });
});

