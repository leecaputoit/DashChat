Setup (~10 minutes)

Our app runs on the expo cli in order to simplify the development process. Expo allows us to run iPhone and Android simulators directly from the command line or web browser without needing to go through Xcode nor Android studio. Instructions for running the app are below: 

Install necessary packages
npm install

Start expo ("npm start" also works)
expo start

This should open expo in your browser. Here, you can launch the ios or android simulators. Launching on web will cause a failure as certain aspects of our app require us to know whether the user is on ios or android. You will need to download the simulators by following the links below.

Use iOS simulator: https://docs.expo.io/workflow/ios-simulator/

Use Android simulator: https://docs.expo.io/workflow/android-studio-emulator/

You can use the shortcuts "i" for ios or "a" for android in the command line to expedite the process of opening the simulators. Just wait for expo start to run and then type either letter to start the simulators without having to navigate to the expo client on your web browser. Everytime you save your code, it will update in the simulator.

Front-end developers:
You can begin working on your individual screen by switching the "LandingPage" variable in App.js to the sreen you are working on. 
