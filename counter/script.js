
// 要素
const counter = document.getElementById("counter");
const resetButton = document.getElementById("resetButton");
let count = 0;

const subcounter = document.getElementById("subcounter");
const subplusButton = document.getElementById("subplusButton");
const subminusButton = document.getElementById("subminusButton");
const subresetButton = document.getElementById("subresetButton");
let subcount = 1;

// 音ファイル読み込み
const clickSound = new Audio("sound/click.mp3");
const click10Sound = new Audio("sound/click10.mp3");
clickSound.preload = "auto";
click10Sound.preload = "auto";

// 画面が押されたときの処理
document.body.addEventListener("pointerdown", (event) => {
    if( event.target === resetButton ||
        event.target === subplusButton ||
        event.target === subminusButton ||
        event.target === subresetButton ){
            return; // ボタンイベントのときはスキップ
        }

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

// ボタンが押されたときの処理
resetButton.addEventListener("click",()=>{
    count = 0;
    counter.textContent = count;
});


// サブカウンターの処理
subplusButton.addEventListener("click", () => {
    subcount++;
    subcounter.textContent = subcount;
});

subminusButton.addEventListener("click", () => {
    if(subcount<=1) return;
    subcount--;
    subcounter.textContent = subcount;
});

subresetButton.addEventListener("click", () => {
    subcount = 1;
    subcounter.textContent = subcount;
});