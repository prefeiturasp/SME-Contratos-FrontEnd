export const textColor = valorTd => {
  switch (valorTd) {
    case "2 meses":
      return "text-danger";
    case "6 meses":
      return "text-warning";
    case "Regular":
      return "text-success";
    case "Excepcionalidade":
      return "text-primary";
    case "Ultimo Ano":
      return "text-info";
    case "Emergencial":
      return "text-danger";
    default:
      return "";
  }
};
