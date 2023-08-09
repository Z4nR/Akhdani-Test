module.exports = {
  rangeCount: (lat1, lat2, long1, long2) => {
    let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
    let dLon = ((long2 - long1) * Math.PI) / 180.0;

    lat1 = (lat1 * Math.PI) / 180.0;
    lat2 = (lat2 * Math.PI) / 180.0;

    let a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    let rad = 6371;
    let c = 2 * Math.asin(Math.sqrt(a));
    const range = rad * c;
    return parseFloat(range).toFixed(0);
  },

  moneyCounter: (aboard, province, island, range, duration) => {
    let money;
    let pay;
    if (aboard === true) {
      pay = 50;
      money = duration * pay;

      const cost = pay.toLocaleString("en-US", {
        currency: "USD",
        style: "currency",
      });
      const total = money.toLocaleString("en-US", {
        currency: "USD",
        style: "currency",
      });

      return { total: total, note: "(Luar Negeri)", cost: cost };
    }
    if (range < 60) {
      money = 0;
      const total = money.toLocaleString("id-ID", {
        currency: "IDR",
        style: "currency",
      });
      return { total: total, note: "(Jarak < 60KM)", cost: total };
    }
    if (range > 60 && province === true) {
      pay = 200000;
      money = duration * 200000;

      const cost = pay.toLocaleString("id-ID", {
        currency: "IDR",
        style: "currency",
      });
      const total = money.toLocaleString("id-ID", {
        currency: "IDR",
        style: "currency",
      });
      return { total: total, note: "(Jarak > 60KM, 1 Provinsi)", cost: cost };
    }
    if (range > 60 && island === true) {
      pay = 250000;
      money = duration * pay;

      const cost = pay.toLocaleString("id-ID", {
        currency: "IDR",
        style: "currency",
      });
      const total = money.toLocaleString("id-ID", {
        currency: "IDR",
        style: "currency",
      });
      return { total: total, note: "(Jarak > 60KM, 1 Pulau)", cost: cost };
    }
    if (range > 60 && province === false && island === false) {
      pay = 30000;
      money = duration * pay;

      const cost = pay.toLocaleString("id-ID", {
        currency: "IDR",
        style: "currency",
      });
      const total = money.toLocaleString("id-ID", {
        currency: "IDR",
        style: "currency",
      });
      return { total: total, note: "(Jarak > 60KM, Beda Pulau)", cost: cost };
    }
  },
};
