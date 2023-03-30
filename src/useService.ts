const { useEffect, useState } = window.React;
console.log(useEffect);

export default () => {
  const [data, setData] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    window
      .fetch(
        "https://dev.g.alicdn.com/xiaohtest/gi-assets-basic/0.0.1/data.json"
      )
      .then((res) => {
        console.log("useService");
        res.json().then((d) => {
          setData(d);
        });
        // res.json().then((d) => {
        //   console.log(d);
        // });
      })

      .catch((e) => {
        console.log(e);
      });
  }, []);
  return {
    data
  };
};
