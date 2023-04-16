First, install cordova-res:

npm install -g cordova-res

Next, run the following to generate all images then copy them into the native projects:

ionic cordova resources

cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy