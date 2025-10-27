import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-1HL6F0YKY2");
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
