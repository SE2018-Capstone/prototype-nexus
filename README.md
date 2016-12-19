# Nexus

## Install
Run `npm install`

## Run
Run `npm run watch` to begin the webpack watching of the browser files as well
as the hot loading of the renderer files. Once the electron files have been
compiled, run `npm start` in a separate terminal to start the app.

## Windows Development
To be able to use native Node modules, you need to set some environment variables before running `npm install`, as these environment variables will ensure that your native Node modules compile correctly. Run:

```batch
set npm_config_target=<electron version, eg. 1.4.12>
set npm_config_arch=x64
set npm_config_target_arch=x64
set npm_config_disturl=https://atom.io/download/electron
```
Also, `npm start` doesn't work on Windows. You need `npm run start-win`.
