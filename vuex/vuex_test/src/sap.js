// 用于存储多个服务的 Promise 缓存
const modelCache = new Map();

const getService = async (serviceUrl,parameters={}) => {
  // 1. 检查缓存：如果这个 URL 已经初始化过了，直接返回之前的 Promise
  if (modelCache.has(serviceUrl)) {
      return modelCache.get(serviceUrl);
  }
  // 如果还没开始初始化，或者之前的失败了，就发起请求
  const modelPromise = (async () => {
    if (!window.sap) throw new Error("SAP UI5 库未加载");
    
    // 1. 等待加载 ODataModel 类
    const ODataModel = await new Promise((resolve) => {
    window.sap.ui.require(["sap/ui/model/odata/v2/ODataModel"], resolve);
    });

    // 2. 实例化 Model
    const oModel = new ODataModel(serviceUrl, parameters);

    // 3. 关键：必须等待元数据加载完成，否则调用 read 依然可能失败
    await new Promise((resolve, reject) => {
    oModel.metadataLoaded().then(resolve, reject);
    });

    return oModel; // 此时返回的 oModel 才是真正 100% 可用的对象
  })();
  modelCache.set(serviceUrl, modelPromise);
  return modelPromise; // 返回这个单例 Promise
};


const readData = async (oModelOrPromise, entitySet, parameters = {}) => {
  // 核心防御：不管你传的是不是 Promise，await 之后它一定是真正的对象
  const oModel = await oModelOrPromise; 

  if (!oModel || typeof oModel.read !== 'function') {
    throw new Error("readData 接收到的 oModel 实例无效，无法调用 .read 方法");
  }

  return new Promise((resolve, reject) => {
    oModel.read(entitySet, {
      ...parameters,
      success: (data) => resolve(data.results || data),
      error: (err) => reject(err)
    });
  });
};

export default { getService, readData };