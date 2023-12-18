//服务地址
var map, url = "http://localhost:8091/iserver/services/map-Campus/rest/maps/Campus";

var url_china = "http://localhost:8091/iserver/services/map-china400/rest/maps/China_4326";
function onPageLoad() {
  // 创建地图窗口
  // 南师大
  // map = L.map('map', {
  //   crs: L.CRS.EPSG4326,
  //   center: [32.1101, 118.902],
  //   // minZoom: 14,
  //   maxZoom: 18,
  //   zoom: 14
  // });

  // 上海市
  map = L.map('map', {
    crs: L.CRS.EPSG4326,
    center: [31.11, 121.45],
    // minZoom: 14,
    maxZoom: 18,
    zoom: 9
  });
  // 添加地图
  new L.supermap.TiledMapLayer(url_china).addTo(map);

  new L.supermap.TiledMapLayer(url).addTo(map);

  // 比例尺
  L.control.scale().addTo(map);

  // 绘制控件
  var editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);
  var options = {
    position: 'topleft',
    draw: {
      polyline: {},
      polygon: {},
      circle: {},
      rectangle: {},
      marker: {},
      remove: {}
    },
    edit: {
      featureGroup: editableLayers,
      remove: true
    }
  };
  var drawControl = new L.Control.Draw(options);
  map.addControl(drawControl);
  handleMapEvent(drawControl._container, map);
  map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
      layer = e.layer;
    if (type === 'marker') {
      layer.bindPopup('A popup!');
    }
    editableLayers.addLayer(layer);
  });

  function handleMapEvent(div, map) {
    if (!div || !map) {
      return;
    }
    div.addEventListener('mouseover', function () {
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
    });
    div.addEventListener('mouseout', function () {
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
    });
  }
  // 鹰眼图
  var osm = new L.supermap.TiledMapLayer(url_china, { minZoom: 0, maxZoom: 13, noWrap: true });

  L.control.minimap(osm, { mapOptions: { logoControl: false }, toggleDisplay: true }).addTo(map);
}

