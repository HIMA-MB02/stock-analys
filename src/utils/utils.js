export const formatData = (data) => {
    // ChartJS Format Required
    let finalData = {
        labels: [],
        data: []
    };

    let dates = data.map((val) => {
        const ts = val.timestamp;
        let date = new Date(ts);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    
    let priceArr = data.map((val) => {
      return val.rate;
    });
  
    finalData.labels = dates;
  
    finalData.data = priceArr;

    return finalData;
  };