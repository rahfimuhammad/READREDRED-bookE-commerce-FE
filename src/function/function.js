export const formatCurrency = (value) => {
        
    return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(value);
}

export const formatDate = (value) => {
  const originalDateString = value;
  const originalDate = new Date(originalDateString);

  const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric"
  });

  const formattedDate = dateFormatter.format(originalDate);

  return formattedDate;
}
