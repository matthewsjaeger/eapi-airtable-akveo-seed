# Effortless API AKVEO Angular WebApp Seed Project

This project lets you create a AKVEO Angular WebApp project which can natively
communicate with your Effortless API.

# Installing the tools

## SSoT.me 
SSoT.me `ssotme` is the dynamic package manager which keeps the code up to date.  This tool requires 
[.Net Core 2.2](https://dotnet.microsoft.com/download) to be installed.  

    > npm install -g ssotme
    > npm install -g @angular/cli

## Git Fork/Clone
Fork this repository - then clone the project locally


    > git clone git@github.com:you/eapi-airtable-akveo-seed project-xyz
    > cd project-xyz


## Connecting 2 Effortless API

To connect your new repository to your effortless API Endpoint, run these commands:

    > npm install

    > ssotme -init -name=YourProject -addSetting amqps=amqps://smqPublic:smqPublic@effortlessapi-rmq.ssot.me/YOUR PROJECT-URL -addSetting dataclasses-namespace=YOUR_PROJECT.Lib.DataClasses

    > ssotme -build

The code will start to build in the background, and VSCode will open in the root of the project. 
Use the following instructions to tailor the example for your project.


    1. Start VS Code.  On Windows that command is 'code .'.  
    2. Open the `src/app/app-modules.ts` lines 70 to configure your EAPI Endpoint
    2A. Maybe fix Roles configuration.
    3. Be sure that angular CLI is installed: 
    4. From the command line, once the `npm install` and `ssotme -build` have completed, run `ng serve`
    5. Open http://localhost:4200 in a browser
    

This will create a local typescript sdk for your EffortlesAPI endpoint - allowing you to immediately begin writing code:

    guest = SMQGuest("amqps://effortlessapi-rmq.ssot.me/you-project-xyz")

    payload = StandardPayload()
    payload.EmailAddress = "you@domain.com"
    payload.DemoPassword = "123"

    guest.ValidateTemporaryAccessToken(payload)
