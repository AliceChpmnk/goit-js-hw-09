!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.querySelector("body")},n=null;function e(){n=setInterval((function(){var n="#".concat(Math.floor(16777215*Math.random()).toString(16));t.body.style.backgroundColor=n}),1e3),t.startBtn.removeEventListener("click",e)}t.startBtn.addEventListener("click",e),t.stopBtn.addEventListener("click",(function(){clearInterval(n),t.startBtn.addEventListener("click",e)}))}();
//# sourceMappingURL=01-color-switcher.f2ac5f3b.js.map
