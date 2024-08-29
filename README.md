# Email Signature Presentation and Creation Tool

A JavaScript web-based presentation and corporate email signature creation tool.<br>

This project is designed to help users understand the importance of a professional email signature and effortlessly create an email signature formatted to match corporate guidelines in a verifiable manner. It includes:

1. **JavaScript-Based Presentation:** An interactive presentation that educates users about the importance of having a consistent corporate signature and  how to use the email signature creation tool to add their signature to Outlook. 

2. **Email Signature Creator:** A JavaScript web tool that allows users to generate uniformly formatted corporate email signatures, complete with logo. Users simply input their details and, with two clicks, have a perfectly formatted email signature copied and ready to be pasted into their email client of choice. 
- As a security and compliance bonus, this application uses a lightweight Rust back-end service to securely sign the users email address and transparently add a unique identifier to the email signature. This "fingerprint-ID" is created using the (highly secure and efficient) Ed25519 signing algorithm and embedded as a base58 string in the alt-text of the signature logo. This fingerprint-ID cryptographically ties the generated signature to the email address used at signature creation, and can be used to verify the signature is legitimate. Since the fingerprint-ID is included in the image alt-text, it will work in both HTML and plane text emails. 
 
## Live Demo

Click [Here](https://app2.megabit.rodeo) for a live working demo of this project. 

## Getting Started

To get started, clone the repository and open the `index.html` file in your browser:

```bash
git clone https://github.com/patrickramp/signature-presentation
cd email-signature-tool
open index.html
```

You will also need the [signing-service](https://github.com/patrickramp/signing-service) to be running localy.

```bash
git clone https://github.com/patrickramp/signing-service
cd signature-service
cargo run </location/of/your/key.der>
```


## Customization

All signature customization takes place in js/signature.js and css/styles.css. Edit these files to set the appearance of the output signature. All slides can be edited from within index.html. Contents are written in markdown. See [Gnab/Remark project](https://github.com/gnab/remark) wiki for formatting and style option.      

## Credits 

Thanks to the [Gnab/Remark project](https://github.com/gnab/remark) for the excellent, easy to use, web presentation framework.    

## Screen Shots

![image](https://github.com/user-attachments/assets/ed6d9b1c-b4dd-4dcd-83e1-3994880ee531)
![image](https://github.com/user-attachments/assets/31bfbb6f-4ada-439a-8977-decd93dea450)
