// Wait until the DOM is fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements for easier access and better performance
    const form = document.getElementById('signature-form');
    const signatureOutput = document.getElementById('signature-output');
    const copyButton = document.getElementById('copy-button');

    // Handle form submission event
    form.addEventListener('submit', async (event) => { // Added `async` here
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
        const phoneType = document.getElementById('phoneType').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const fax = document.getElementById('fax').value.trim();
        const email = document.getElementById('email').value.trim();

        // Define the secret string
        const secret = 'secret';

        // Ensure required fields are filled
        if (!name || !title || !email) {
            alert('Please fill in all required fields.');
            return;
        }

        // Generate the hash (this function is called now)
        async function generateHash(email, secret) {
            
            // Combine the input email with a secret string
            const content = `${email}${secret}`;

            // Encode the content into a Uint8Array
            const encoder = new TextEncoder();
            const data = encoder.encode(content);

            // Generate the SHA-256 hash
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);

            // Convert the hash buffer to a hex string
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
        }

        // Await the generated hash
        const hashHex = await generateHash();

        // Build the HTML for the signature
        const signatureHTML = `
        <div style="color: ${color1 || '#000'}; font-family: Arial, sans-serif;">
          <b>${name}</b> ${pronouns ? `(${pronouns})` : ''}
        </div>
        <div style="color: ${color2 || '#000'}; font-family: Arial, sans-serif;">
          <b>${title || ''}</b><br>
    	    <b>${alternateTitle ? `${alternateTitle}<br>` : ''}</b>
    	    ${address ? `${address}<br>` : ''}
    	    ${mailcode ? `M/C: ${mailcode}<br>` : ''}
    	    ${phoneType ? `${phoneType}: ${phone} ${fax ? ` | Fax: ${fax}` : ''}<br>` : ''}
    	    <a href="mailto:${email || ''}" style="color: ${color1 || '#000'}; text-decoration: none;">${email || ''}</a><br>
    	    <img src="static/logo2.jpg" alt="Company_Logo_ID=${hashHex || ''}" width="100">
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
            window.location.href = './index.html#6';
        } catch (err) {
            alert('Failed to copy the signature.');
        }

        // Deselect the text after copying
        selection.removeAllRanges();
    });
});

