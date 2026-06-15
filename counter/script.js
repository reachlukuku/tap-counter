let count = 0;

const counter = document.getElementById("counter");

const clickSound = new Audio("sound/click.mp3");
const click10Sound = new Audio("sound/click10.mp3");
clickSound.preload = "auto";
click10Sound.preload = "auto";

document.body.addEventListener("pointerdown", () => {
  count++;
  counter.textContent = count;
    if(count%10==0){
        // 10の倍数
        click10Sound.currentTime = 0;
        click10Sound.play().catch(()=>{});
    }else{
        // 通常
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }
  
});