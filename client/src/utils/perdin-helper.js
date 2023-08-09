const durationDay = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const oneDay = 1000 * 60 * 60 * 24;

  const diffInTime = end.getTime() - start.getTime();

  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
};

const showFormattedDateID = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

const statusMap = {
  Ditinjau: {
    backgroundColor: "lightgoldenrodyellow",
    color: "#c3b112",
  },
  Diterima: {
    backgroundColor: "lightblue",
    color: "blue",
  },
  Ditolak: {
    backgroundColor: "lightcoral",
    color: "red",
  },
};

export { durationDay, showFormattedDateID, statusMap };
