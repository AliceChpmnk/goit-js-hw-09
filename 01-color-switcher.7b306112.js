const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.querySelector("body")};let e=null;function n(){e=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16)}`;t.body.style.backgroundColor=e}),1e3),t.startBtn.removeEventListener("click",n)}t.startBtn.addEventListener("click",n),t.stopBtn.addEventListener("click",(function(){clearInterval(e),t.startBtn.addEventListener("click",n)}));
//# sourceMappingURL=01-color-switcher.7b306112.js.map
