// Inside createTwitElement() function:
var svgns = "http://www.w3.org/2000/svg";
var profileSvg = document.createElementNS(svgns, "svg");
profileSvg.setAttribute("class", "profile-icon");
profileSvg.setAttribute("width", "32");
profileSvg.setAttribute("height", "32");
profileSvg.setAttribute("viewBox", "0 0 24 24");
profileSvg.setAttribute("fill", "none");
// Set stroke to orange
profileSvg.setAttribute("stroke", "orange");
profileSvg.setAttribute("stroke-width", "2");
profileSvg.setAttribute("stroke-linecap", "round");
profileSvg.setAttribute("stroke-linejoin", "round");

var path1 = document.createElementNS(svgns, "path");
path1.setAttribute("d", "M20 21v-2a4 4 0 0 0-3-3.87");
profileSvg.appendChild(path1);

var path2 = document.createElementNS(svgns, "path");
path2.setAttribute("d", "M4 21v-2a4 4 0 0 1 3-3.87");
profileSvg.appendChild(path2);

var circle = document.createElementNS(svgns, "circle");
circle.setAttribute("cx", "12");
circle.setAttribute("cy", "7");
circle.setAttribute("r", "4");
profileSvg.appendChild(circle);

twitIconDiv.appendChild(profileSvg);
