export const GI_SERVICES_OPTIONS = [
  {
    id: "GI_SERVICE_INTIAL_GRAPH",
    content:
      "export default (localData)=>{\n      return new Promise((resolve)=>{\n        resolve(localData)\n      })\n    }",
    mode: "MOCK",
    name: "初始化接口"
  },
  {
    id: "GI_SERVICE_SCHEMA",
    content:
      "export default (localData,schemaData)=>{\n      return new Promise((resolve)=>{\n        resolve(schemaData)\n      })\n    }",
    mode: "MOCK",
    name: "初始化接口"
  },
  {
    id: "Mock/PropertiesPanel",
    mode: "MOCK",
    name: "Mock/PropertiesPanel",
    content:
      "export default function service(params, localData) {\n      var data = params.data;\n      return new Promise(function (resolve) {\n        return resolve(data);\n      });\n    }"
  },
  {
    id: "GraphScope/PropertiesPanel",
    mode: "MOCK",
    name: "GraphScope/PropertiesPanel",
    content:
      "export default function service(params) {\n      var id = params.id;\n      return fetch(\"http://dev.alipay.net:7001/graphcompute/properties\", {\n        method: 'post',\n        headers: {\n          'Content-Type': 'application/json;charset=utf-8'\n        },\n        body: JSON.stringify({\n          id: [id],\n          gremlinServer: localStorage.getItem('graphScopeGremlinServer')\n        })\n      }).then(function (response) {\n        return response.json();\n      }).then(function (res) {\n        var success = res.success,\n            data = res.data;\n\n        if (success) {\n          return data[id];\n        }\n\n        return res;\n      });\n    }"
  },
  {
    id: "Mock/NeighborsQuery",
    mode: "MOCK",
    name: "Mock/NeighborsQuery",
    content:
      'export default function service(params, localData) {\n      var ids = params.ids,\n          _params$data = params.data,\n          DATA = _params$data === void 0 ? {} : _params$data;\n      var _DATA$type = DATA.type,\n          type = _DATA$type === void 0 ? \'user\' : _DATA$type;\n      console.log(\'邻居查询\', params, ids, type);\n\n      var transfrom = function transfrom(p) {\n        var nodes = p.nodes,\n            edges = p.edges;\n        return {\n          nodes: nodes.map(function (c) {\n            return {\n              id: c.id,\n              data: c,\n              nodeType: c.type,\n              nodeTypeKeyFromProperties: \'type\'\n            };\n          }),\n          edges: edges.map(function (c) {\n            return {\n              source: c.source,\n              target: c.target,\n              id: "".concat(c.source, "-").concat(c.target),\n              data: c,\n              edgeType: c.type,\n              edgeTypeKeyFromProperties: \'type\'\n            };\n          })\n        };\n      };\n\n      var datas = ids.map(function (id) {\n        return {\n          nodes: [{\n            id: id,\n            type: type\n          }, {\n            id: "".concat(id, "-1"),\n            type: type\n          }, {\n            id: "".concat(id, "-2"),\n            type: type\n          }, {\n            id: "".concat(id, "-3"),\n            type: type\n          }, {\n            id: "".concat(id, "-4"),\n            type: type\n          }],\n          edges: [{\n            source: id,\n            target: "".concat(id, "-1")\n          }, {\n            source: id,\n            target: "".concat(id, "-2")\n          }, {\n            source: id,\n            target: "".concat(id, "-3")\n          }]\n        };\n      }).reduce(function (acc, curr) {\n        return {\n          nodes: [].concat(acc.nodes, curr.nodes),\n          edges: [].concat(acc.edges, curr.edges)\n        };\n      }, {\n        nodes: [],\n        edges: []\n      });\n      return new Promise(function (resolve) {\n        return resolve(transfrom(datas));\n      });\n    }'
  },
  {
    id: "GraphScope/NeighborsQuery",
    mode: "MOCK",
    name: "GraphScope/NeighborsQuery",
    content:
      "export default function service(params, localData) {\n      var id = params.id,\n          sep = params.sep; // 根据 sep 拼接 .bothE() 个数\n\n      var str = '';\n\n      for (var i = 0; i < sep - 1; i++) {\n        str += '.both()';\n      }\n\n      return fetch(\"http://dev.alipay.net:7001/graphcompute/gremlinQuery\", {\n        method: 'post',\n        headers: {\n          'Content-Type': 'application/json;charset=utf-8'\n        },\n        body: JSON.stringify({\n          // statement: `g.V('${id}').repeat(bothE()).times(${sep})`,\n          statement: \"g.V(\".concat(id, \")\").concat(str, \".bothE()\"),\n          gremlinServer: localStorage.getItem('graphScopeGremlinServer')\n        })\n      }).then(function (response) {\n        return response.json();\n      }).then(function (res) {\n        if (res.success) {\n          return res.data;\n        }\n\n        return {\n          nodes: [],\n          edges: []\n        };\n      });\n    }"
  },
  {
    id: "MOCK/Save",
    mode: "MOCK",
    name: "MOCK/Save",
    content:
      "export default function service(params, localData) {\n      var uuid = \"\".concat(Math.random().toString(36).substr(2));\n      var href = window.location.origin + '/#/share/' + uuid; //  window.localforage 是 GraphInsight 平台提供的全局变量，详情参考：https://github.com/localForage/localForage\n      //@ts-ignore\n\n      var _window = window,\n          localforage = _window.localforage;\n      localforage.setItem(uuid, {\n        id: uuid,\n        type: 'save',\n        params: JSON.stringify(params)\n      });\n      return new Promise(function (resolve) {\n        return resolve({\n          success: true,\n          data: href\n        });\n      });\n    }"
  }
];
export const GI_PROJECT_CONFIG = {
  nodes: [
    {
      id: "SimpleNode",
      props: {
        size: 26,
        color: "#ddd",
        label: []
      },
      groupName: "默认样式",
      expressions: [],
      logic: true
    },
    {
      id: "SimpleNode",
      props: {
        size: 26,
        color: "#3056E3",
        label: ["account_balance.id"],
        advanced: {
          icon: {
            type: "font",
            value: "bank",
            fill: "#fff",
            visible: true
          },
          keyshape: {
            fillOpacity: 0.8
          },
          label: {
            visible: true,
            fill: "#000",
            fontSize: 12,
            position: "bottom"
          },
          badge: {
            visible: false
          }
        }
      },
      groupName: "ACCOUNT_BALANCE TYPE",
      expressions: [
        {
          name: "icon",
          operator: "eql",
          value: "account_balance"
        }
      ],
      logic: true
    },
    {
      id: "SimpleNode",
      props: {
        size: 26,
        color: "rgba(245,166,35,1)",
        label: ["account_box.id"],
        advanced: {
          icon: {
            type: "font",
            value: "user",
            fill: "#fff",
            visible: true
          },
          keyshape: {
            fillOpacity: 0.8
          },
          label: {
            visible: true,
            fill: "#000",
            fontSize: 12,
            position: "bottom"
          },
          badge: {
            visible: false
          }
        }
      },
      groupName: "ACCOUNT_BOX TYPE",
      expressions: [
        {
          name: "icon",
          operator: "eql",
          value: "account_box"
        }
      ],
      logic: true
    },
    {
      id: "SimpleNode",
      props: {
        size: 26,
        color: "#795AE1",
        label: ["-.id"]
      },
      groupName: "- TYPE",
      expressions: [
        {
          name: "icon",
          operator: "eql",
          value: "-"
        }
      ],
      logic: true
    }
  ],
  edges: [
    {
      id: "SimpleEdge",
      props: {
        size: 1,
        color: "#ddd",
        label: []
      },
      groupName: "默认样式",
      expressions: [],
      logic: true
    },
    {
      id: "SimpleEdge",
      props: {
        size: 1,
        color: "#3056E3",
        label: ["ib_txn.amount"],
        advanced: {
          keyshape: {
            customPoly: false,
            lineDash: [],
            opacity: 1
          },
          label: {
            visible: true,
            fontSize: 12,
            offset: [0, 0],
            fill: "#3056E3",
            backgroundEnable: true,
            backgroundFill: "#fff",
            backgroundStroke: "#fff"
          },
          animate: {
            visible: false,
            type: "circle-running",
            dotColor: "#3056E3",
            repeat: true,
            duration: 3000
          }
        }
      },
      groupName: "IB_TXN TYPE",
      expressions: [
        {
          name: "category",
          operator: "eql",
          value: "ib_txn"
        }
      ],
      logic: true
    },
    {
      id: "SimpleEdge",
      props: {
        size: 1,
        color: "rgba(245,166,35,1)",
        label: ["ownership.relation"],
        advanced: {
          keyshape: {
            customPoly: true,
            lineDash: [],
            opacity: 1,
            poly: 0
          },
          label: {
            visible: true,
            fontSize: 12,
            offset: [0, 0],
            fill: "rgba(245,166,35,1)",
            backgroundEnable: true,
            backgroundFill: "#fff",
            backgroundStroke: "#fff"
          },
          animate: {
            visible: false
          }
        }
      },
      groupName: "OWNERSHIP TYPE",
      expressions: [
        {
          name: "category",
          operator: "eql",
          value: "ownership"
        }
      ],
      logic: true
    }
  ],
  layout: {
    id: "Dagre",
    props: {
      type: "dagre",
      rankdir: "TB",
      align: null,
      nodesep: 30,
      ranksep: 60
    }
  },
  components: [
    {
      id: "Toolbar",
      props: {
        GI_CONTAINER: [
          "ZoomIn",
          "ZoomOut",
          "FitView",
          "FitCenter",
          "LassoSelect",
          "AddSheetbar"
        ],
        direction: "vertical",
        placement: "LT",
        offset: [24, 84]
      }
    },
    {
      id: "ZoomIn",
      props: {
        GI_CONTAINER_INDEX: 2,
        GIAC: {
          visible: false,
          disabled: false,
          isShowTitle: false,
          title: "放大",
          isShowIcon: true,
          icon: "icon-zoomin",
          isShowTooltip: true,
          tooltip: "",
          tooltipColor: "#3056e3",
          tooltipPlacement: "right",
          hasDivider: false,
          height: "60px",
          isVertical: true
        }
      }
    },
    {
      id: "ZoomOut",
      props: {
        GI_CONTAINER_INDEX: 2,
        GIAC: {
          visible: false,
          disabled: false,
          isShowTitle: false,
          title: "缩小",
          isShowIcon: true,
          icon: "icon-zoomout",
          isShowTooltip: true,
          tooltip: "",
          tooltipColor: "#3056e3",
          tooltipPlacement: "right",
          hasDivider: false,
          height: "60px",
          isVertical: true
        }
      }
    },
    {
      id: "FitView",
      props: {
        GI_CONTAINER_INDEX: 2,
        GIAC: {
          visible: false,
          disabled: false,
          isShowTitle: false,
          title: "自适应",
          isShowIcon: true,
          icon: "icon-fit-view",
          isShowTooltip: true,
          tooltip: "",
          tooltipColor: "#3056e3",
          tooltipPlacement: "right",
          hasDivider: false,
          height: "60px",
          isVertical: true
        }
      }
    },
    {
      id: "FitCenter",
      props: {
        GI_CONTAINER_INDEX: 2,
        GIAC: {
          visible: false,
          disabled: false,
          isShowTitle: false,
          title: "视图居中",
          isShowIcon: true,
          icon: "icon-fit-center",
          isShowTooltip: true,
          tooltip: "",
          tooltipColor: "#3056e3",
          tooltipPlacement: "right",
          hasDivider: false,
          height: "60px",
          isVertical: true
        }
      }
    },
    {
      id: "LassoSelect",
      props: {
        GI_CONTAINER_INDEX: 2,
        GIAC: {
          visible: false,
          disabled: false,
          isShowTitle: false,
          title: "自由圈选",
          isShowIcon: true,
          icon: "icon-lasso",
          isShowTooltip: true,
          tooltip: "按住Shift，点击画布即可自由圈选",
          tooltipColor: "#3056e3",
          tooltipPlacement: "right",
          hasDivider: false,
          height: "60px",
          isVertical: true
        }
      }
    },
    {
      id: "PropertiesPanel",
      props: {
        serviceId: "Mock/PropertiesPanel",
        title: "面板",
        placement: "LB",
        width: "356px",
        height: "calc(100% - 80px)",
        offset: [10, 10],
        animate: false
      }
    },
    {
      id: "ActivateRelations",
      props: {
        enableNodeHover: true,
        enableEdgeHover: true,
        enable: true,
        trigger: "click",
        upstreamDegree: 1,
        downstreamDegree: 1
      }
    },
    {
      id: "CanvasSetting",
      props: {
        styleCanvas: {
          background: "#fff",
          backgroundImage:
            "https://gw.alipayobjects.com/mdn/rms_0d75e8/afts/img/A*k9t4QamMuQ4AAAAAAAAAAAAAARQnAQ"
        },
        dragCanvas: {
          disabled: false,
          direction: "both",
          enableOptimize: false
        },
        zoomCanvas: {
          disabled: false,
          enableOptimize: true
        }
      }
    },
    {
      id: "NodeLegend",
      props: {
        sortKey: "type",
        textColor: "#ddd",
        placement: "LB",
        offset: [100, 20]
      }
    },
    {
      info: {
        id: "FilterPanel",
        name: "筛选面板",
        desc: "通过属性筛选画布信息，可自定义",
        icon: "icon-filter",
        cover: "http://xxxx.jpg",
        category: "data-analysis",
        type: "GIAC_CONTENT"
      },
      version: "2.2.7",
      pkg: "@alipay/gi-assets-basic",
      id: "FilterPanel",
      name: "筛选面板",
      category: "data-analysis",
      props: {
        histogramColor: "#3056E3",
        isFilterIsolatedNodes: true,
        highlightMode: true,
        GI_CONTAINER_INDEX: 2,
        GIAC_CONTENT: {
          visible: false,
          disabled: false,
          isShowTitle: true,
          title: "筛选面板",
          isShowIcon: true,
          icon: "icon-filter",
          isShowTooltip: true,
          tooltip: "通过属性筛选画布信息，可自定义",
          tooltipColor: "#3056e3",
          tooltipPlacement: "right",
          hasDivider: false,
          height: "60px",
          isVertical: true,
          containerType: "div",
          containerAnimate: false,
          containerPlacement: "RT",
          offset: [0, 0],
          containerWidth: "400px",
          containerHeight: "calc(100% - 100px)",
          contaienrMask: false
        }
      },
      meta: {
        histogramColor: {
          title: "直方图颜色",
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "ColorInput",
          default: "#3056E3"
        },
        isFilterIsolatedNodes: {
          title: "过滤孤立节点",
          type: "boolean",
          "x-decorator": "FormItem",
          "x-component": "Switch",
          default: true
        },
        highlightMode: {
          title: "高亮模式",
          type: "boolean",
          "x-decorator": "FormItem",
          "x-component": "Switch",
          default: true
        },
        GI_CONTAINER_INDEX: {
          title: "排序位置",
          type: "number",
          "x-decorator": "FormItem",
          "x-component": "NumberPicker",
          "x-component-props": {
            min: 0,
            max: 15
          },
          default: 2
        },
        GIAC_CONTENT: {
          type: "void",
          "x-decorator": "FormItem",
          "x-component": "FormCollapse",
          "x-component-props": {
            ghost: true,
            className: "gi-site-collapse-item"
          },
          properties: {
            GIAC_CONTENT: {
              type: "object",
              "x-decorator": "FormItem",
              "x-component": "FormCollapse.CollapsePanel",
              "x-component-props": {
                header: "容器配置"
              },
              properties: {
                visible: {
                  title: "默认显示",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: false
                },
                disabled: {
                  title: "功能禁用",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: false
                },
                isShowTitle: {
                  title: "显示名称",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  "x-reactions": [
                    {
                      target: "GIAC_CONTENT.title",
                      fulfill: {
                        state: {
                          visible: "{{$self.value}}"
                        }
                      }
                    }
                  ],
                  default: true
                },
                title: {
                  title: "填写名称",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "筛选面板"
                },
                isShowIcon: {
                  title: "显示图标",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: true,
                  "x-reactions": [
                    {
                      target: "GIAC_CONTENT.icon",
                      fulfill: {
                        state: {
                          visible: "{{$self.value}}"
                        }
                      }
                    }
                  ]
                },
                icon: {
                  title: "选择图标",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "icon-filter"
                },
                isShowTooltip: {
                  title: "提示框",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  "x-reactions": [
                    {
                      target: "GIAC_CONTENT.tooltip",
                      fulfill: {
                        state: {
                          visible: "{{$self.value}}"
                        }
                      }
                    }
                  ],
                  default: true
                },
                tooltip: {
                  title: "提示内容",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "通过属性筛选画布信息，可自定义"
                },
                tooltipColor: {
                  title: "提示颜色",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "ColorInput",
                  default: "#3056e3"
                },
                tooltipPlacement: {
                  title: "提示方位",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Select",
                  "x-component-props": {
                    options: [
                      {
                        value: "top",
                        label: "上方"
                      },
                      {
                        value: "left",
                        label: "左方"
                      },
                      {
                        value: "right",
                        label: "右方"
                      },
                      {
                        value: "bottom",
                        label: "下方"
                      }
                    ]
                  },
                  default: "right"
                },
                hasDivider: {
                  title: "分隔符",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: false
                },
                height: {
                  title: "单元高度",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "60px"
                },
                isVertical: {
                  title: "垂直排列",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: true
                },
                containerType: {
                  title: "容器类型",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Radio.Group",
                  enum: [
                    {
                      label: "普通DIV",
                      value: "div"
                    },
                    {
                      label: "抽屉",
                      value: "drawer"
                    },
                    {
                      label: "弹窗",
                      value: "modal"
                    }
                  ],
                  default: "div"
                },
                containerAnimate: {
                  title: "容器动画（仅DIV有效）",
                  type: "boolean",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: false
                },
                containerPlacement: {
                  title: "容器位置",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Select",
                  "x-component-props": {
                    options: [
                      {
                        value: "LT",
                        label: "左上 / top"
                      },
                      {
                        value: "LB",
                        label: "左下 / left"
                      },
                      {
                        value: "RT",
                        label: "右上 / right"
                      },
                      {
                        value: "RB",
                        label: "右下 / bottom"
                      }
                    ]
                  },
                  default: "RT"
                },
                offset: {
                  title: "偏移距离",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Offset",
                  default: [0, 0]
                },
                containerWidth: {
                  title: "容器宽度",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "400px"
                },
                containerHeight: {
                  title: "容器高度",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "calc(100% - 100px)"
                },
                contaienrMask: {
                  title: "容器遮罩",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  "x-component-props": {},
                  default: false
                }
              }
            }
          }
        }
      }
    },
    {
      info: {
        id: "ContextMenu",
        name: "右键菜单",
        desc: "鼠标右键即可出现菜单容器",
        cover: "http://xxxx.jpg",
        category: "container-components",
        type: "GICC_MENU",
        icon: "icon-mouse"
      },
      version: "2.2.7",
      pkg: "@alipay/gi-assets-basic",
      id: "ContextMenu",
      name: "右键菜单",
      category: "container-components",
      props: {
        GI_CONTAINER: ["NeighborsQuery"]
      },
      meta: {
        GI_CONTAINER: {
          title: "集成组件",
          type: "string",
          enum: [
            {
              label: "邻居查询",
              value: "NeighborsQuery"
            }
          ],
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            mode: "multiple"
          },
          default: []
        }
      }
    },
    {
      info: {
        id: "AddSheetbar",
        name: "新增页签",
        desc: "新增页签",
        cover: "http://xxxx.jpg",
        category: "system-interaction",
        icon: "icon-plus",
        type: "GIAC"
      },
      version: "2.2.9",
      pkg: "@alipay/gi-assets-advance",
      id: "AddSheetbar",
      name: "新增页签",
      category: "system-interaction",
      props: {
        isRelayout: true,
        GI_CONTAINER_INDEX: 2,
        GIAC: {
          visible: false,
          disabled: false,
          isShowTitle: false,
          title: "将选中的节点与边添加到新画布中",
          isShowIcon: true,
          icon: "icon-plus",
          isShowTooltip: true,
          tooltip: "",
          tooltipColor: "#3056e3",
          tooltipPlacement: "right",
          hasDivider: false,
          height: "60px",
          isVertical: true
        }
      },
      meta: {
        isRelayout: {
          title: "是否重新布局",
          type: "boolean",
          "x-decorator": "FormItem",
          "x-component": "Switch",
          default: true
        },
        GI_CONTAINER_INDEX: {
          title: "排序位置",
          type: "number",
          "x-decorator": "FormItem",
          "x-component": "NumberPicker",
          "x-component-props": {
            min: 0,
            max: 15
          },
          default: 2
        },
        GIAC: {
          type: "void",
          "x-decorator": "FormItem",
          "x-component": "FormCollapse",
          "x-component-props": {
            ghost: true,
            className: "gi-site-collapse-item"
          },
          properties: {
            GIAC: {
              type: "object",
              "x-decorator": "FormItem",
              "x-component": "FormCollapse.CollapsePanel",
              "x-component-props": {
                header: "容器配置"
              },
              properties: {
                visible: {
                  title: "默认显示",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: false
                },
                disabled: {
                  title: "功能禁用",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: false
                },
                isShowTitle: {
                  title: "显示名称",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  "x-reactions": [
                    {
                      target: "GIAC_CONTENT.title",
                      fulfill: {
                        state: {
                          visible: "{{$self.value}}"
                        }
                      }
                    }
                  ],
                  default: false
                },
                title: {
                  title: "填写名称",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "将选中的节点与边添加到新画布中"
                },
                isShowIcon: {
                  title: "显示图标",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: true,
                  "x-reactions": [
                    {
                      target: "GIAC_CONTENT.icon",
                      fulfill: {
                        state: {
                          visible: "{{$self.value}}"
                        }
                      }
                    }
                  ]
                },
                icon: {
                  title: "选择图标",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "icon-plus"
                },
                isShowTooltip: {
                  title: "提示框",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  "x-reactions": [
                    {
                      target: "GIAC_CONTENT.tooltip",
                      fulfill: {
                        state: {
                          visible: "{{$self.value}}"
                        }
                      }
                    }
                  ],
                  default: true
                },
                tooltip: {
                  title: "提示内容",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: ""
                },
                tooltipColor: {
                  title: "提示颜色",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "ColorInput",
                  default: "#3056e3"
                },
                tooltipPlacement: {
                  title: "提示方位",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Select",
                  "x-component-props": {
                    options: [
                      {
                        value: "top",
                        label: "上方"
                      },
                      {
                        value: "left",
                        label: "左方"
                      },
                      {
                        value: "right",
                        label: "右方"
                      },
                      {
                        value: "bottom",
                        label: "下方"
                      }
                    ],
                    showInPanel: {
                      conditions: [[".isShowTooltip", "$eq", true]]
                    }
                  },
                  default: "right"
                },
                hasDivider: {
                  title: "分隔符",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: false
                },
                height: {
                  title: "单元高度",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "60px"
                },
                isVertical: {
                  title: "垂直排列",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  "x-component-props": {
                    showInPanel: {
                      conditions: [
                        [".isShowIcon", "$eq", true],
                        [".isShowTitle", "$eq", true]
                      ]
                    }
                  },
                  default: true
                }
              }
            }
          }
        }
      }
    },
    {
      info: {
        id: "Sheetbar",
        name: "多画布页签",
        desc: "新建画布页签，辅助动态分析",
        cover: "http://xxxx.jpg",
        category: "system-interaction",
        type: "AUTO",
        icon: "icon-diff"
      },
      version: "2.2.9",
      pkg: "@alipay/gi-assets-advance",
      id: "Sheetbar",
      name: "多画布页签",
      category: "system-interaction",
      props: {
        placement: "bottom",
        height: 40
      },
      meta: {
        placement: {
          title: "放置方位",
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            options: [
              {
                value: "top",
                label: "顶部"
              },
              {
                value: "bottom",
                label: "底部"
              }
            ]
          },
          default: "bottom"
        },
        height: {
          title: "页签高度",
          type: "number",
          "x-decorator": "FormItem",
          "x-component": "NumberPicker",
          default: 40
        }
      }
    },
    {
      info: {
        id: "NeighborsQuery",
        category: "data-query",
        type: "GIAC_MENU",
        name: "邻居查询",
        desc: "集成在右键菜单中，可查询邻居节点",
        icon: "icon-kinship",
        cover: "http://xxxx.jpg"
      },
      version: "2.2.7",
      pkg: "@alipay/gi-assets-basic",
      id: "NeighborsQuery",
      name: "邻居查询",
      category: "data-query",
      props: {
        serviceId: "Mock/NeighborsQuery",
        degree: "1",
        isFocus: true
      },
      meta: {
        serviceId: {
          title: "数据服务",
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Select",
          default: "Mock/NeighborsQuery",
          "x-component-props": {
            options: [
              {
                value: "GI_SERVICE_INTIAL_GRAPH",
                label: "GI_SERVICE_INTIAL_GRAPH"
              },
              {
                value: "GI_SERVICE_SCHEMA",
                label: "GI_SERVICE_SCHEMA"
              },
              {
                value: "Mock/PropertiesPanel",
                label: "Mock/PropertiesPanel"
              },
              {
                value: "GraphScope/PropertiesPanel",
                label: "GraphScope/PropertiesPanel"
              },
              {
                value: "Mock/NeighborsQuery",
                label: "Mock/NeighborsQuery"
              },
              {
                value: "GraphScope/NeighborsQuery",
                label: "GraphScope/NeighborsQuery"
              }
            ]
          }
        },
        degree: {
          title: "查询度数",
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            options: [
              {
                value: "1",
                label: "一度查询"
              },
              {
                value: "2",
                label: "二度查询"
              },
              {
                value: "3",
                label: "三度查询"
              }
            ]
          },
          default: "1"
        },
        isFocus: {
          title: "是否聚焦到扩散点",
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Switch",
          default: true
        }
      }
    },
    {
      info: {
        id: "Save",
        name: "保存分享",
        desc: "保存画布,并分享给其他人",
        icon: "icon-save",
        cover: "http://xxxx.jpg",
        category: "workbook",
        type: "GIAC_CONTENT"
      },
      version: "2.2.7",
      pkg: "@alipay/gi-assets-basic",
      id: "Save",
      name: "保存分享",
      category: "workbook",
      props: {
        serviceId: "MOCK/Save",
        GI_CONTAINER_INDEX: 2,
        GIAC_CONTENT: {
          visible: false,
          disabled: false,
          isShowTitle: true,
          title: "保存分享",
          isShowIcon: true,
          icon: "icon-save",
          isShowTooltip: true,
          tooltip: "保存画布,并分享给其他人",
          tooltipColor: "#3056e3",
          tooltipPlacement: "right",
          hasDivider: false,
          height: "60px",
          isVertical: true,
          containerType: "div",
          containerAnimate: false,
          containerPlacement: "RT",
          offset: [0, 0],
          containerWidth: "350px",
          containerHeight: "calc(100% - 100px)",
          contaienrMask: false
        }
      },
      meta: {
        serviceId: {
          title: "保存服务",
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            options: [
              {
                value: "GI_SERVICE_INTIAL_GRAPH",
                label: "GI_SERVICE_INTIAL_GRAPH"
              },
              {
                value: "GI_SERVICE_SCHEMA",
                label: "GI_SERVICE_SCHEMA"
              },
              {
                value: "Mock/PropertiesPanel",
                label: "Mock/PropertiesPanel"
              },
              {
                value: "GraphScope/PropertiesPanel",
                label: "GraphScope/PropertiesPanel"
              },
              {
                value: "Mock/NeighborsQuery",
                label: "Mock/NeighborsQuery"
              },
              {
                value: "GraphScope/NeighborsQuery",
                label: "GraphScope/NeighborsQuery"
              },
              {
                value: "MOCK/Save",
                label: "MOCK/Save"
              }
            ]
          },
          default: "MOCK/Save"
        },
        GI_CONTAINER_INDEX: {
          title: "排序位置",
          type: "number",
          "x-decorator": "FormItem",
          "x-component": "NumberPicker",
          "x-component-props": {
            min: 0,
            max: 15
          },
          default: 2
        },
        GIAC_CONTENT: {
          type: "void",
          "x-decorator": "FormItem",
          "x-component": "FormCollapse",
          "x-component-props": {
            ghost: true,
            className: "gi-site-collapse-item"
          },
          properties: {
            GIAC_CONTENT: {
              type: "object",
              "x-decorator": "FormItem",
              "x-component": "FormCollapse.CollapsePanel",
              "x-component-props": {
                header: "容器配置"
              },
              properties: {
                visible: {
                  title: "默认显示",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: false
                },
                disabled: {
                  title: "功能禁用",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: false
                },
                isShowTitle: {
                  title: "显示名称",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  "x-reactions": [
                    {
                      target: "GIAC_CONTENT.title",
                      fulfill: {
                        state: {
                          visible: "{{$self.value}}"
                        }
                      }
                    }
                  ],
                  default: true
                },
                title: {
                  title: "填写名称",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "保存分享"
                },
                isShowIcon: {
                  title: "显示图标",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: true,
                  "x-reactions": [
                    {
                      target: "GIAC_CONTENT.icon",
                      fulfill: {
                        state: {
                          visible: "{{$self.value}}"
                        }
                      }
                    }
                  ]
                },
                icon: {
                  title: "选择图标",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "icon-save"
                },
                isShowTooltip: {
                  title: "提示框",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  "x-reactions": [
                    {
                      target: "GIAC_CONTENT.tooltip",
                      fulfill: {
                        state: {
                          visible: "{{$self.value}}"
                        }
                      }
                    }
                  ],
                  default: true
                },
                tooltip: {
                  title: "提示内容",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "保存画布,并分享给其他人"
                },
                tooltipColor: {
                  title: "提示颜色",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "ColorInput",
                  default: "#3056e3"
                },
                tooltipPlacement: {
                  title: "提示方位",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Select",
                  "x-component-props": {
                    options: [
                      {
                        value: "top",
                        label: "上方"
                      },
                      {
                        value: "left",
                        label: "左方"
                      },
                      {
                        value: "right",
                        label: "右方"
                      },
                      {
                        value: "bottom",
                        label: "下方"
                      }
                    ]
                  },
                  default: "right"
                },
                hasDivider: {
                  title: "分隔符",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: false
                },
                height: {
                  title: "单元高度",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "60px"
                },
                isVertical: {
                  title: "垂直排列",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: true
                },
                containerType: {
                  title: "容器类型",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Radio.Group",
                  enum: [
                    {
                      label: "普通DIV",
                      value: "div"
                    },
                    {
                      label: "抽屉",
                      value: "drawer"
                    },
                    {
                      label: "弹窗",
                      value: "modal"
                    }
                  ],
                  default: "div"
                },
                containerAnimate: {
                  title: "容器动画（仅DIV有效）",
                  type: "boolean",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  default: false
                },
                containerPlacement: {
                  title: "容器位置",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Select",
                  "x-component-props": {
                    options: [
                      {
                        value: "LT",
                        label: "左上 / top"
                      },
                      {
                        value: "LB",
                        label: "左下 / left"
                      },
                      {
                        value: "RT",
                        label: "右上 / right"
                      },
                      {
                        value: "RB",
                        label: "右下 / bottom"
                      }
                    ]
                  },
                  default: "RT"
                },
                offset: {
                  title: "偏移距离",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Offset",
                  default: [0, 0]
                },
                containerWidth: {
                  title: "容器宽度",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "350px"
                },
                containerHeight: {
                  title: "容器高度",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  default: "calc(100% - 100px)"
                },
                contaienrMask: {
                  title: "容器遮罩",
                  type: "string",
                  "x-decorator": "FormItem",
                  "x-component": "Switch",
                  "x-component-props": {},
                  default: false
                }
              }
            }
          }
        }
      }
    },
    {
      info: {
        id: "OperatorBar",
        name: "操作栏",
        desc: "业务操作栏，可集成众多分析组件",
        icon: "icon-tabs",
        cover: "http://xxxx.jpg",
        category: "container-components",
        type: "GICC"
      },
      version: "2.2.7",
      pkg: "@alipay/gi-assets-basic",
      id: "OperatorBar",
      name: "操作栏",
      category: "container-components",
      props: {
        GI_CONTAINER: ["FilterPanel"],
        placement: "LT",
        offset: [0, 0],
        height: "60px",
        width: "100%"
      },
      meta: {
        GI_CONTAINER: {
          title: "集成组件",
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            mode: "multiple"
          },
          enum: [
            {
              label: "筛选面板",
              value: "FilterPanel"
            },
            {
              label: "保存分享",
              value: "Save"
            },
            {
              label: "放大 (建议集成在工具栏) ",
              value: "ZoomIn"
            },
            {
              label: "缩小 (建议集成在工具栏) ",
              value: "ZoomOut"
            },
            {
              label: "自适应 (建议集成在工具栏) ",
              value: "FitView"
            },
            {
              label: "视图居中 (建议集成在工具栏) ",
              value: "FitCenter"
            },
            {
              label: "自由圈选 (建议集成在工具栏) ",
              value: "LassoSelect"
            },
            {
              label: "新增页签 (建议集成在工具栏) ",
              value: "AddSheetbar"
            }
          ],
          default: []
        },
        placement: {
          title: "放置方位",
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            options: [
              {
                value: "LT",
                label: "左上 / top"
              },
              {
                value: "RT",
                label: "右上 / right"
              },
              {
                value: "LB",
                label: "左下 / left"
              },
              {
                value: "RB",
                label: "右下 / bottom"
              }
            ]
          },
          default: "LT"
        },
        offset: {
          title: "偏移距离",
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Offset",
          default: [0, 0]
        },
        height: {
          title: "高度",
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-component-props": {},
          default: "60px"
        },
        width: {
          title: "宽度",
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-component-props": {},
          default: "100%"
        }
      }
    }
  ]
};
export const GI_LOCAL_DATA = {
  nodes: [
    {
      id: "account_7",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "account_7",
        icon: "account_box",
        create_date: "2019-01-03T00:00:00",
        is_different_bank: 0
      }
    },
    {
      id: "account_777",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "account_7",
        icon: "account_box",
        create_date: "2019-01-03T00:00:00",
        is_different_bank: 0
      }
    },
    {
      id: "account_20",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "account_20",
        icon: "account_box",
        create_date: "2019-01-05T00:00:00",
        is_different_bank: 0
      }
    },
    {
      id: "account_55",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "account_55",
        icon: "account_box",
        create_date: "2019-01-07T00:00:00",
        is_different_bank: 0
      }
    },
    {
      id: "account_81",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "account_81",
        icon: "account_box",
        create_date: "2019-01-15T00:00:00",
        is_different_bank: 0
      }
    },
    {
      id: "account_103",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "account_103",
        icon: "account_box",
        create_date: "2019-01-15T00:00:00",
        is_different_bank: 0
      }
    },
    {
      id: "account_901",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "account_901",
        icon: "account_box",
        create_date: "2019-01-03T00:00:00",
        is_different_bank: 0
      }
    },
    {
      id: "account_902",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "account_902",
        icon: "account_box",
        create_date: "2019-01-10T00:00:00",
        is_different_bank: 0
      }
    },
    {
      id: "account_903",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "account_903",
        icon: "account_box",
        create_date: "2019-01-09T00:00:00",
        is_different_bank: 1
      }
    },
    {
      id: "account_904",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "account_904",
        icon: "account_box",
        create_date: "2019-01-08T00:00:00",
        is_different_bank: 1
      }
    },
    {
      id: "customer_7",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "customer_7",
        icon: "account_box",
        address: "-",
        customer_type: "retail",
        first_name: "-",
        last_name: "-",
        phone: "-",
        remarks: "high-value IB txn into customer 103's account",
        risk_category: "medium",
        risk_score: 50
      }
    },
    {
      id: "customer_20",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "customer_20",
        icon: "account_box",
        address: "-",
        customer_type: "retail",
        first_name: "-",
        last_name: "-",
        phone: "-",
        remarks: "high-value IB txn into customer 103's account",
        risk_category: "medium",
        risk_score: 50
      }
    },
    {
      id: "customer_55",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "customer_55",
        icon: "account_box",
        address: "-",
        customer_type: "retail",
        first_name: "-",
        last_name: "-",
        phone: "-",
        remarks: "high-value IB txn into customer 103's account",
        risk_category: "medium",
        risk_score: 50
      }
    },
    {
      id: "customer_81",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "customer_81",
        icon: "account_box",
        address: "-",
        customer_type: "retail",
        first_name: "-",
        last_name: "-",
        phone: "-",
        remarks: "high-value IB txn into customer 103's account",
        risk_category: "medium",
        risk_score: 50
      }
    },
    {
      id: "customer_103",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "customer_103",
        icon: "account_box",
        address: "103 RD",
        customer_type: "retail",
        first_name: "john",
        last_name: "doe",
        phone: "+65 0000 0103",
        remarks:
          "high-value purchases from luxury retailer. source of funds from 4 related accounts",
        risk_category: "high",
        risk_score: 99
      }
    },
    {
      id: "customer_901",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "customer_901",
        icon: "account_box",
        address: "901 RD",
        customer_type: "retail",
        first_name: "jane",
        last_name: "doe",
        phone: "+65 0000 0103",
        remarks:
          "source of funds for customer 103's purchase of luxury items. customer has same phone number as customer 103.",
        risk_category: "medium",
        risk_score: 74
      }
    },
    {
      id: "customer_902",
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "customer_902",
        icon: "account_box",
        address: "103 RD",
        customer_type: "retail",
        first_name: "jim",
        last_name: "smith",
        phone: "+65 0000 0902",
        remarks:
          "source of funds for customer 103's purchase of luxury items. customer has same address as customer 103.",
        risk_category: "medium",
        risk_score: 74
      }
    },
    {
      id: "other_banks",
      nodeType: "-",
      nodeTypeKeyFromProperties: "icon",
      data: {
        id: "other_banks",
        icon: "-",
        address: "-",
        customer_type: "-",
        first_name: "-",
        last_name: "-",
        phone: "-",
        remarks: "other banks",
        risk_category: "-",
        risk_score: "-"
      }
    }
  ],
  edges: [
    {
      source: "account_103",
      target: "account_904",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_103",
        target: "account_904",
        amount: 1000000,
        balance: 200000,
        category: "ib_txn",
        date: "2020-01-01T00:00:00",
        id: "ib_txn_1",
        is_foreign_source: 0,
        is_foreign_target: 1,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "customer_103",
        target_owner: "other_banks",
        time: "0:00:00"
      }
    },
    {
      source: "account_903",
      target: "account_103",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_903",
        target: "account_103",
        amount: 100000,
        balance: "null",
        category: "ib_txn",
        date: "2020-01-02T01:00:00",
        id: "ib_txn_2",
        is_foreign_source: 1,
        is_foreign_target: 0,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "other_banks",
        target_owner: "customer_103",
        time: "1:00:00"
      }
    },
    {
      source: "account_103",
      target: "account_904",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_103",
        target: "account_904",
        amount: 50000,
        balance: 250000,
        category: "ib_txn",
        date: "2020-01-02T02:00:00",
        id: "ib_txn_3",
        is_foreign_source: 0,
        is_foreign_target: 1,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "customer_103",
        target_owner: "other_banks",
        time: "2:00:00"
      }
    },
    {
      source: "account_904",
      target: "account_103",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_904",
        target: "account_103",
        amount: 2000000,
        balance: "null",
        category: "ib_txn",
        date: "2020-01-01T03:00:00",
        id: "ib_txn_4",
        is_foreign_source: 1,
        is_foreign_target: 0,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "other_banks",
        target_owner: "customer_103",
        time: "3:00:00"
      }
    },
    {
      source: "account_103",
      target: "account_903",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_103",
        target: "account_903",
        amount: 1000000,
        balance: 1250000,
        category: "ib_txn",
        date: "2020-01-02T04:00:00",
        id: "ib_txn_5",
        is_foreign_source: 0,
        is_foreign_target: 1,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "customer_103",
        target_owner: "other_banks",
        time: "4:00:00"
      }
    },
    {
      source: "account_103",
      target: "account_903",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_103",
        target: "account_903",
        amount: 1000000,
        balance: 250000,
        category: "ib_txn",
        date: "2020-01-02T05:00:00",
        id: "ib_txn_6",
        is_foreign_source: 0,
        is_foreign_target: 1,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "customer_103",
        target_owner: "other_banks",
        time: "5:00:00"
      }
    },
    {
      source: "account_901",
      target: "account_103",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_901",
        target: "account_103",
        amount: 250000,
        balance: 10000,
        category: "ib_txn",
        date: "2020-01-01T06:00:00",
        id: "ib_txn_7",
        is_foreign_source: 0,
        is_foreign_target: 0,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "customer_901",
        target_owner: "customer_103",
        time: "6:00:00"
      }
    },
    {
      source: "account_902",
      target: "account_103",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_902",
        target: "account_103",
        amount: 250000,
        balance: 300000,
        category: "ib_txn",
        date: "2020-01-01T06:30:00",
        id: "ib_txn_8",
        is_foreign_source: 0,
        is_foreign_target: 0,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "customer_902",
        target_owner: "customer_103",
        time: "6:30:00"
      }
    },
    {
      source: "account_903",
      target: "account_103",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_903",
        target: "account_103",
        amount: 250000,
        balance: "null",
        category: "ib_txn",
        date: "2020-01-02T06:00:00",
        id: "ib_txn_9",
        is_foreign_source: 1,
        is_foreign_target: 0,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "other_banks",
        target_owner: "customer_103",
        time: "6:00:00"
      }
    },
    {
      source: "account_904",
      target: "account_103",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_904",
        target: "account_103",
        amount: 250000,
        balance: "null",
        category: "ib_txn",
        date: "2020-01-01T00:00:00",
        id: "ib_txn_10",
        is_foreign_source: 1,
        is_foreign_target: 0,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "other_banks",
        target_owner: "customer_103",
        time: "0:00:00"
      }
    },
    {
      source: "account_7",
      target: "account_103",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_7",
        target: "account_103",
        amount: 125000,
        balance: 225000,
        category: "ib_txn",
        date: "2020-01-03T22:00:00",
        id: "ib_txn_72",
        is_foreign_source: 0,
        is_foreign_target: 0,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "customer_7",
        target_owner: "customer_103",
        time: "22:00:00"
      }
    },
    {
      source: "account_55",
      target: "account_103",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_55",
        target: "account_103",
        amount: 250000,
        balance: 475000,
        category: "ib_txn",
        date: "2020-01-03T22:00:00",
        id: "ib_txn_73",
        is_foreign_source: 0,
        is_foreign_target: 0,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "customer_55",
        target_owner: "customer_103",
        time: "22:00:00"
      }
    },
    {
      source: "account_20",
      target: "account_103",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_20",
        target: "account_103",
        amount: 150000,
        balance: 625000,
        category: "ib_txn",
        date: "2020-01-04T18:00:00",
        id: "ib_txn_74",
        is_foreign_source: 0,
        is_foreign_target: 0,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "customer_20",
        target_owner: "customer_103",
        time: "18:00:00"
      }
    },
    {
      source: "account_81",
      target: "account_103",
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "account_81",
        target: "account_103",
        amount: 300000,
        balance: 925000,
        category: "ib_txn",
        date: "2020-01-04T18:00:00",
        id: "ib_txn_75",
        is_foreign_source: 0,
        is_foreign_target: 0,
        is_high_risk_source_target_location: 0,
        relation: "ib_transfer",
        source_owner: "customer_81",
        target_owner: "customer_103",
        time: "18:00:00"
      }
    },
    {
      source: "customer_7",
      target: "account_7",
      edgeType: "ownership",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "customer_7",
        target: "account_7",
        category: "ownership",
        id: "ownership_210",
        relation: "owns"
      }
    },
    {
      source: "customer_20",
      target: "account_20",
      edgeType: "ownership",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "customer_20",
        target: "account_20",
        category: "ownership",
        id: "ownership_223",
        relation: "owns"
      }
    },
    {
      source: "customer_55",
      target: "account_55",
      edgeType: "ownership",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "customer_55",
        target: "account_55",
        category: "ownership",
        id: "ownership_258",
        relation: "owns"
      }
    },
    {
      source: "customer_81",
      target: "account_81",
      edgeType: "ownership",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "customer_81",
        target: "account_81",
        category: "ownership",
        id: "ownership_284",
        relation: "owns"
      }
    },
    {
      source: "customer_103",
      target: "account_103",
      edgeType: "ownership",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "customer_103",
        target: "account_103",
        category: "ownership",
        id: "ownership_306",
        relation: "owns"
      }
    },
    {
      source: "customer_901",
      target: "account_901",
      edgeType: "ownership",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "customer_901",
        target: "account_901",
        category: "ownership",
        id: "ownership_307",
        relation: "owns"
      }
    },
    {
      source: "customer_902",
      target: "account_902",
      edgeType: "ownership",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "customer_902",
        target: "account_902",
        category: "ownership",
        id: "ownership_308",
        relation: "owns"
      }
    },
    {
      source: "other_banks",
      target: "account_903",
      edgeType: "ownership",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "other_banks",
        target: "account_903",
        category: "ownership",
        id: "ownership_310",
        relation: "owns"
      }
    },
    {
      source: "other_banks",
      target: "account_904",
      edgeType: "ownership",
      edgeTypeKeyFromProperties: "category",
      data: {
        source: "other_banks",
        target: "account_904",
        category: "ownership",
        id: "ownership_311",
        relation: "owns"
      }
    }
  ]
};
export const GI_SCHEMA_DATA = {
  nodes: [
    {
      nodeType: "account_balance",
      nodeTypeKeyFromProperties: "icon",
      properties: {
        id: "string",
        icon: "string",
        create_date: "string",
        is_different_bank: "number"
      }
    },
    {
      nodeType: "account_box",
      nodeTypeKeyFromProperties: "icon",
      properties: {
        id: "string",
        icon: "string",
        address: "string",
        customer_type: "string",
        first_name: "string",
        last_name: "string",
        phone: "string",
        remarks: "string",
        risk_category: "string",
        risk_score: "number"
      }
    },
    {
      nodeType: "-",
      nodeTypeKeyFromProperties: "icon",
      properties: {
        id: "string",
        icon: "string",
        address: "string",
        customer_type: "string",
        first_name: "string",
        last_name: "string",
        phone: "string",
        remarks: "string",
        risk_category: "string",
        risk_score: "string"
      }
    }
  ],
  edges: [
    {
      edgeType: "ib_txn",
      edgeTypeKeyFromProperties: "category",
      sourceNodeType: "account_balance",
      targetNodeType: "account_balance",
      properties: {
        source: "string",
        target: "string",
        amount: "number",
        balance: "number",
        category: "string",
        date: "string",
        id: "string",
        is_foreign_source: "number",
        is_foreign_target: "number",
        is_high_risk_source_target_location: "number",
        relation: "string",
        source_owner: "string",
        target_owner: "string",
        time: "string"
      }
    },
    {
      edgeType: "ownership",
      edgeTypeKeyFromProperties: "category",
      sourceNodeType: "account_box",
      targetNodeType: "account_balance",
      properties: {
        source: "string",
        target: "string",
        category: "string",
        id: "string",
        relation: "string"
      }
    }
  ]
};
