//服务地址
var map, url = "http://localhost:8091/iserver/services/map-Campus/rest/maps/Campus";

var url_world = "http://support.supermap.com.cn:8090/iserver/services/map-world/rest/maps/World";
function onPageLoad() {
  // 创建地图窗口
  map = L.map('map', {
    crs: L.CRS.EPSG4326,
    center: [32.1101, 118.902],
    // minZoom: 14,
    maxZoom: 18,
    zoom: 14
  });
  // 添加地图
  new L.supermap.TiledMapLayer(url_world).addTo(map);

  new L.supermap.TiledMapLayer(url).addTo(map);
}