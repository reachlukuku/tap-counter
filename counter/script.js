
// 要素
const counter = document.getElementById("counter");
const resetButton = document.getElementById("resetButton");
let count = 0;
let lastTapTime = 0;
let activePointers = new Set();

const subcounter = document.getElementById("subcounter");
const subplusButton = document.getElementById("subplusButton");
const subminusButton = document.getElementById("subminusButton");
const subresetButton = document.getElementById("subresetButton");
let subcount = 1;

const timerDisplay = document.getElementById("timerDisplay");
const timerStartButton = document.getElementById("timerStartButton");
const timerResetButton = document.getElementById("timerResetButton");
let timerSeconds = 15;

// 音ファイル読み込み
const clickSound = new Audio("sound/click.mp3");
const click10Sound = new Audio("sound/click10.mp3");
const clearSound = new Audio("sound/clear.mp3");
const pushSound = new Audio("sound/push.mp3");
clickSound.preload = "auto";
click10Sound.preload = "auto";

/////////////////////////////////////////
// 画面が押されたときの処理
document.body.addEventListener("pointerdown", (event) => {
    if( event.target === resetButton ||
        event.target === subplusButton ||
        event.target === subminusButton ||
        event.target === subresetButton ){
            return; // ボタンイベントのときはスキップ
        }

    if(activePointers.size >0){
        activePointers.add(event.pointerId);
        return;
    }
    activePointers.add(event.pointerId);

    const now = Date.now();
    if(now - lastTapTime < 200){
        return;
    }
    lastTapTime = now;

    count++;
    counter.textContent = count;
    if(count%10===0){
        // 10の倍数
        click10Sound.currentTime = 0;
        click10Sound.play().catch(()=>{});
    }else{
        // 通常
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }
});

document.body.addEventListener("pointerup",(event)=>{
    activePointers.delete(event.pointerId);
})

document.body.addEventListener("pointercancel",(event)=>{
    activePointers.delete(event.pointerId);
})

// ボタンが押されたときの処理
resetButton.addEventListener("click",()=>{
    count = 0;
    counter.textContent = count;
    clearSound.currentTime = 0;
    clearSound.play().catch(() => {});
});

/////////////////////////////////////////
// サブカウンターの処理
subplusButton.addEventListener("click", () => {
    subcount++;
    subcounter.textContent = subcount;
    pushSound.currentTime = 0;
    pushSound.play().catch(() => {});
});

subminusButton.addEventListener("click", () => {
    if(subcount<=1) return;
    subcount--;
    subcounter.textContent = subcount;
    pushSound.currentTime = 0;
    pushSound.play().catch(() => {});
});

subresetButton.addEventListener("click", () => {
    subcount = 1;
    subcounter.textContent = subcount;
    clearSound.currentTime = 0;
    clearSound.play().catch(() => {});
});

/////////////////////////////////////////
// 休憩タイマー
function updateTimerDisplay() {

    const min = Math.floor(timerSeconds / 60);
    const sec = timerSeconds % 60;

    timerDisplay.textContent =
        `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}