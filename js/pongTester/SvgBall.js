// BALL
const svgBallTemplate = document.createElement("template");
svgBallTemplate.innerHTML = /*svg*/ ` 
    <g id="svgBall">
        <path id="ballPath1" fill="red" stroke="none" d="M0 0 h5 v5 h-5z" />
    </g>
`;

class SvgBall extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(svgBallTemplate.content.cloneNode(true));
  }
}
customElements.define("svg-ball", SvgBall);
