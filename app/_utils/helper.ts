export const CheckStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-orange-300 text-yellow-600";
    case "reject":
      return "bg-red-100 text-red-600";
    case "accept":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
