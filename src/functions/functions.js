// Giving each country a color
export function ColorPicker(country) {
  switch (country) {
    case "US":
    case "United States of America":
      return "#740938";
    case "France":
      return "#7F0E3D";
    case "Italy":
      return "#8B143F";
    case "Portugal":
      return "#961A42";
    case "Spain":
      return "#A02045";
    case "Germany":
      return "#AA2648";
    case "Argentina":
      return "#B42C4B";
    case "Chile":
      return "#BF324E";
    case "Australia":
      return "#C93851";
    case "Austria":
      return "#D23E54";
    case "South Africa":
      return "#D84E62";
    case "New Zealand":
      return "#DD5E70";
    case "Israel":
      return "#E16E7E";
    case "Hungary":
      return "#E57E8C";
    case "Greece":
      return "#E98E9A";
    case "Romania":
      return "#ED9EA8";
    case "Mexico":
      return "#F1AEB6";
    case "Canada":
      return "#F4BEC4";
    case "Turkey":
      return "#F7CED2";
    default:
      return "#CC2B52";
  }
}
