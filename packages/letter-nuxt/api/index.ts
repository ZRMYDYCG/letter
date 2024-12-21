enum API {
  getSetting = '/setting/getSetting',
}

export function getSetting() {
  return useClientRequest(API.getSetting, {
    method: Method.GET,
    query: {},
  }, { sever: SERVER_NAME.SYSTEM, auth: false })
}

export function getSetting1() {
  return useClientRequest(API.getSetting, {
    method: Method.POST,
    body: {},
  }, { sever: SERVER_NAME.SYSTEM, auth: false })
}
