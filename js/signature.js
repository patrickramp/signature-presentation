document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements for easier access and better performance
    const form = document.getElementById('signature-form');
    const signatureOutput = document.getElementById('signature-output');
    const copyButton = document.getElementById('copy-button');

    // Define brand colors for consistent styling
    const color1 = '#2d1a47'; // Primary text color
    const color2 = '#a9a9a9'; // Secondary text color

    // Handle form submission event
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page

        // Gather input values from the form and trim whitespace
        const name = document.getElementById('name').value.trim();
        const pronouns = document.getElementById('pronouns').value.trim();
        const title = document.getElementById('title').value.trim();
        const alternateTitle = document.getElementById('alternateTitle').value.trim();
        const address = document.getElementById('address').value.trim();
        const mailcode = document.getElementById('mailcode').value.trim();
        const phoneType = document.getElementById('phoneType').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const fax = document.getElementById('fax').value.trim();
        const email = document.getElementById('email').value.trim();

        // Ensure required fields are filled
        if (!name || !title || !email) {
            alert('Please fill in all required fields.');
            return;
        }

        // Function to generate a signature for the email
        async function generateSignature(email) {
            try {
                const response = await fetch('http://localhost:8888/sign', { // Update URL if using HTTPS
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Specify content type
                    },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const data = await response.json();
                return data.signature; // Return the generated signature
            } catch (error) {
                console.error('Error signing email:', error);
                throw error; // Re-throw the error for further handling if needed
            }
        }

        // Retrieve the generated signature from the server
        const fingerprint = await generateSignature(email);

        // Build the HTML for the signature
        const signatureHTML = `
            <div style="color: ${color1}; font-family: Arial, sans-serif;">
                <b>${name}</b> ${pronouns ? `(${pronouns})` : ''}
            </div>
            <div style="color: ${color2}; font-family: Arial, sans-serif;">
                <b>${title}</b><br>
                ${alternateTitle ? `${alternateTitle}<br>` : ''}
                ${address ? `${address}<br>` : ''}
                ${mailcode ? `M/C: ${mailcode}<br>` : ''}
                ${phoneType ? `${phoneType}: ${phone}${fax ? ` | Fax: ${fax}` : ''}<br>` : ''}
                <a href="mailto:${email}" style="color: ${color1}; text-decoration: none;">${email}</a><br>
                <img src="static/logo2.jpg" alt="Company Logo ID=${fingerprint}" width="100">
            </div>`;

        // Insert the generated signature into the output container
        signatureOutput.innerHTML = signatureHTML;
        signatureOutput.style.display = 'block'; // Make the signature visible
        copyButton.style.display = 'block'; // Show the copy button
    });

    // Handle the copy-to-clipboard functionality
    copyButton.addEventListener('click', () => {
        const range = document.createRange(); // Create a range object
        range.selectNodeContents(signatureOutput); // Select the contents of the signature output
        const selection = window.getSelection(); // Get the current selection
        selection.removeAllRanges(); // Clear previous selections
        selection.addRange(range); // Add the new range

        try {
            if (navigator.clipboard) {
                // Use Clipboard API if available
                navigator.clipboard.writeText(signatureOutput.innerText)
                    .then(() => alert('Signature copied to clipboard!'))
                    .then(() => window.location.href = 'index.html#6') // Success message, redirect to next slide
                    .catch(err => alert('Failed to copy the signature.')); // Error message
            } else {
                // Fallback to older execCommand method
                document.execCommand('copy');
                alert('Signature copied to clipboard!');
                window.location.href = 'index.html#6';
            }
        } catch (err) {
            alert('Failed to copy the signature.'); // Handle any errors
        }

        // Deselect the text after copying
        selection.removeAllRanges();
    });
});

