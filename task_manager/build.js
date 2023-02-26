import CleanCSS from "clean-css";
import JavaScriptObfuscator from 'javascript-obfuscator'
const inputJs = fs.readFileSync('./browserApp/browser-app.js', 'utf8');
const outputJs = JavaScriptObfuscator.obfuscate(inputJs, { compact: true, controlFlowFlattening: true }).getObfuscatedCode();
fs.writeFileSync('./public/browser-app.min.js', outputJs);
import fs from 'fs'
const input = fs.readFileSync('./browserApp/styles.css', 'utf8');
const output = new CleanCSS({}).minify(input).styles;
fs.writeFileSync('./public/styles.min.css', output);
