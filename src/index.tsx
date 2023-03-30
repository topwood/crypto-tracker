// import GISDK from "@alipay/graphinsight"; （预计7月份开放）
// 因为没有做 external，避免多个版本react冲突，统一从window对象中获取
// import React from "react";
// import ReactDOM from "react-dom";

// import { Counter } from "../components";
import {
  GI_LOCAL_DATA,
  GI_PROJECT_CONFIG,
  GI_SERVICES_OPTIONS
} from "./GI_EXPORT_FILES";
import { getCombinedAssets, getServicesByConfig } from "./utils";
import useService from "./useService";

const { Table } = window.antd;
console.log("xxx", Table);

interface AppProps {}

/** 生产资产 */
const assets = getCombinedAssets();
/** 生成配置 */
const config = GI_PROJECT_CONFIG;
/** 生成服务 */
// const services = getServicesByConfig(GI_SERVICES_OPTIONS, GI_LOCAL_DATA);

/** 更新资产 */
// assets.components["Counter"] = Counter;
/** 更新配置 */
//@ts-ignore
// config.components.push({
//   id: "Counter",
//   //@ts-ignore
//   props: {},
// });
/** 更新服务 */
// export const MyServices = services.map((c) => {
//   if (c.id === "Mock/PropertiesPanel") {
//     return {
//       ...c,
//       service: (params, localData) => {
//         const data = params.data;
//         return new Promise(function (resolve) {
//           return resolve({
//             ...data,
//             desc: "业务可以自定义",
//             myName: "pomelo.lcw",
//             randomKey: <Table />,
//             test: <span style={{ color: "red" }}>xxx</span>
//           });
//         });
//       }
//     };
//   }
//   return c;
// });

const App = (props) => {
  const { data } = useService();

  const services = getServicesByConfig(GI_SERVICES_OPTIONS, data);

  const MyServices = services.map((c) => {
    if (c.id === "Mock/PropertiesPanel") {
      console.log(c);
      return {
        ...c,
        service: (params, localData) => {
          const data = params.data;
          // 这边可以写点逻辑，例如去根据钱包地址请求钱包的资产、余额
          console.log(data, params, localData);
          return new Promise(function (resolve) {
            return resolve({
              // ...data,
              // desc: "业务可以自定义",
              // myName: "pomelo.lcw",
              randomKey: <Table />,
              test: <span style={{ color: "red" }}>xxx</span>
            });
          });
        }
      };
    }
    return c;
  });

  if (data.nodes.length === 0) {
    return null;
  }
  return (
    <div>
      <div style={{ height: "100vh" }}>
        {/** @ts-ignore */}
        <window.GISDK.default
          config={config}
          assets={assets}
          services={MyServices}
        />
      </div>
    </div>
  );
};

// 因为没有做 external，避免多个版本react冲突，统一从window对象中获取
//@ts-ignore
window.ReactDOM.render(<App />, document.getElementById("root"));
