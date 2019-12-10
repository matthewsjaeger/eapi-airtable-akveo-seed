# Effortless API AKVEO Angular WebApp Seed Project

This project lets you create a AKVEO Angular WebApp project which can natively
communicate with your Effortless API.

# Installing the tools
### On Mac ###

1. [.Net Core 2.2](https://dotnet.microsoft.com/download)  
2. [Git](https://git-scm.com/downloads)
3. [HomeBrew](https://brew.sh/) or use this line to download in Terminal:

        > /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 
    
4. Install node with Home brew,

        > brew install node
        
5. Npm (npm is downloaded with Node.js, run the command below to install)

        > npm install
    

### On Windows ###

1. [.Net Core 2.2](https://dotnet.microsoft.com/download)
2. [Git](https://git-scm.com/downloads)
3. [Node.js](https://nodejs.org/en/download/)
4. Npm (npm is downloaded with Node.js, run the command below to install npm)

        > npm install 


## SSoT.me 
SSoT.me `ssotme` is the dynamic package manager which keeps the code up to date. This tool requires the packages above to be installed.  

    > npm install -g ssotme
    > npm install -g @angular/cli
    
Authenticate: Run the command below with your email added. You will receive an email with a pin to enter.

    > ssotme -auth -emailaddress= "you@domain.com"
    
**NOTE** You may recieve an error regarding Exception Policies. If so, you will need to run powershell as Administrator and run the command below:

    > Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope LocalMachine
    

## Fork Repository 
To fork repository: Click "Fork" link at the top of the page.

![Screen Shot 2019-12-05 at 10 46 29 AM](https://user-images.githubusercontent.com/56564186/70339081-c6faec80-1813-11ea-8ff9-4c47fef2eadb.png)

## Clone Project Locally
Click the “Clone or Download” drop down and copy the URL. Paste URL after “git clone” 

![Screen Shot 2019-12-05 at 10 46 55 AM](https://user-images.githubusercontent.com/56564186/70339100-d1b58180-1813-11ea-957b-61536cdd7ead.png)
    
    > git clone https://github.com/YOURUSERNAME/eapi-airtable-akveo-seed.git  project-xyz (project-xyz = The name of your project/folder)
    


## Connecting to Effortless API

Enter into your folder: The name of your project/folder from above

    > cd project-xyz

To connect your new repository to your effortless API Endpoint, run these commands:

    > npm install
    
*Your Project URL is in Effortless API: Insert "Your-Project-Name" (Ex. amqps://smqPublic:smqPublic@/**YOURPROJECTNAME**)*

    > ssotme -init -name=YOURPROJECT/FOLDERNAME -addSetting amqps=amqps://smqPublic:smqPublic@effortlessapi-rmq.ssot.me/YOUR-PROJECT-NAME-URL -addSetting dataclasses-namespace=YOURPROJECT/FOLDERNAME.Lib.DataClasses

    > ssotme -build

The code will start to build in the background, and VSCode will open in the root of the project. 
Use the following instructions to tailor the example for your project.


    1. Start VS Code.  On Windows that command is 'code .'.  
    2. Open the `src/app/app-modules.ts` lines 70 to configure your EAPI Endpoint
    2A. Grab YOUR-PROJECT-NAME from the URL in Effortless API (Ex. amqps://smqPublic:smqPublic@/YOURPROJECTNAME)
    2B. Maybe fix Roles configuration.
    3. Be sure that angular CLI is installed: 
    4. From the command line, once the `npm install` and `ssotme -build` have completed, run `ng serve`
    5. Open http://localhost:4200 in a browser
    

This will create a local typescript sdk for your EffortlesAPI endpoint - allowing you to immediately begin writing code:

    guest = SMQGuest("amqps://effortlessapi-rmq.ssot.me/you-project-xyz")

    payload = StandardPayload()
    payload.EmailAddress = "you@domain.com"
    payload.DemoPassword = "123"

    guest.ValidateTemporaryAccessToken(payload)
