// import { Info } from "./js/Info.js";
// const infoListElem = document.getElementById("infoList");
// const info = new Info(dataPong, infoListElem);
// info.update();

const PongTesterTemplate = document.createElement("template");
PongTesterTemplate.innerHTML = /*html*/ `
    <style>
        #surround{
            padding: 5px;
        }
        #gamesHolder {
            min-width: 100vw;
            min-height: 100vh;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            align-items: center;
            justify-content: center;
        }
        #infoList {
            padding: 30px;
            border: 10px solid rgba(0, 0, 0, 0.3);
            background-color: green;
            color: greenyellow;
            border-radius: 50px;
            display: inline-block;
        }

        h2{
          margin: 30px 0;
          padding: 0
        }

        #infoList h2,
        #infoList p {
            margin: 0;
        }

    </style>
    <div id="surround">
        <h2 id="sumScore" style="text-align: center; color: white">Score: 0:0</h2>
        <div id="gamesHolder"></div>
    </div>
`;
class PongTester extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(PongTesterTemplate.content.cloneNode(true));

    this.sumScore = shadow.getElementById("sumScore");
    this.gamesHolder = shadow.getElementById("gamesHolder");
  }

  setup() {
    this.totalPongs = 20;
    this.pongGames = [];
    const hueStep = 360 / this.totalPongs;

    for (let i = 0; i < this.totalPongs; i++) {
      const pongGame = document.createElement("p-o-n-g");
      this.gamesHolder.appendChild(pongGame);

      let customSettings = {};
      const hue = hueStep * i;
      customSettings.palette = pongGame.defaultGameSettings.palette;
      customSettings.palette.surround = `hsl(${hue}, 60%, 40%)`;
      customSettings.palette.screen = `hsl(${hue}, 60%, 40%)`;
      customSettings.palette.inlay = `hsl(${hue}, 50%, 50%)`;

      pongGame.setup(customSettings);
      pongGame.start();
      this.pongGames.push(pongGame);
    }
  }

  loop() {
    let p1Score = 0;
    let p2Score = 0;

    for (let p of this.pongGames) {
      p1Score += p.score.p1;
      p2Score += p.score.p2;
      p.loop();
    }

    this.sumScore.innerHTML = `SUM SCORE: ${p1Score} : ${p2Score} `;
  }
}

customElements.define("pong-tester", PongTester);

/*
1:  sum score:    145 : 135
2:  sum score:    144 : 142
3:  sum score:    127 : 135
4:  sum score:    502 : 426
5:  sum score:    470 : 448
6:  sum score: 45,542 : 46,475

       TOTALS: 46,930 : 47,761
*/
