const durationDay = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const oneDay = 1000 * 60 * 60 * 24;

  const diffInTime = end.getTime() - start.getTime();

  const diffInDays = Math.round(diffInTime / oneDay);

  return `${diffInDays} Hari`;
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
  Pending: {
    backgroundColor: "lightgoldenrodyellow",
    color: "#c3b112",
  },
  Approve: {
    backgroundColor: "lightblue",
    color: "blue",
  },
  Rejected: {
    backgroundColor: "lightcoral",
    color: "red",
  },
};

export { durationDay, showFormattedDateID, statusMap };
