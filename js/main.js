document.addEventListener('DOMContentLoaded', function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYmFvMTgyIiwiYSI6ImNscWY5MmtsODB1Z3kybG83Z29ieXB5emsifQ.gs_CFBWs4sFEiwYq9NeXrg';

  const map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/bao182/clgg44whl002q01pkai118y1f',
    center: [121.67, 31.26],
    zoom: 10
  });

  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
});
function rotateCircle210() {
  var circle = document.querySelector('.circle');
  var text_div01 = document.querySelector('.half01-text');
  var text_div02 = document.querySelector('.half02-text');
  circle.classList.remove('rotate-390');
  text_div01.classList.toggle('div-rotate-150')
  text_div02.classList.toggle('div-rotate-150')
  text_div02.classList.remove('text-selected')
  text_div01.classList.toggle('text-selected')
  circle.classList.toggle('rotate-210');
}

var filter_count = 0;
function rotateCircle330() {
  filter_count++;
  // 控制显示
  var circle = document.querySelector('.circle');
  var text_div01 = document.querySelector('.half01-text');
  var text_div02 = document.querySelector('.half02-text');
  circle.classList.remove('rotate-210');
  text_div01.classList.remove('div-rotate-150')
  text_div02.classList.remove('div-rotate-150')
  text_div01.classList.remove('text-selected')
  text_div02.classList.toggle('text-selected')
  circle.classList.toggle('rotate-390');

  if (filter_count % 2 === 1) {
    // 显示图层
  }
  else if (filter_count % 2 === 0) {
    // 隐藏图层
  }

  if (filter_count === 1) {
    // 监听筛选器
    var dropdowns = document.querySelectorAll('.filterForm select');

    dropdowns.forEach(function (dropdown) {
      dropdown.addEventListener('change', function () {
        console.log(dropdown.id + ' 的值变为：', dropdown.value);
        // 这里根据根据修改的筛选条件再显示图层
      });
    });
  }

}

document.addEventListener('DOMContentLoaded', function () {
  var circle = document.querySelector('.circle');
  var searchContainer = document.querySelector('.searchContainer');
  var filterContainer = document.querySelector('.filterContainer');
  var search_results_container = document.querySelector('.search_results_container');
  var search_btn = document.querySelector('.search_btn')
  // 监听当前点击状态
  circle.addEventListener('click', function (event) {
    var isSearch = circle.classList.contains('rotate-210');
    var isFilter = circle.classList.contains('rotate-390');
    // 当前为搜索状态
    if (isSearch) {
      // 取消筛选组件
      filterContainer.style.animation = 'slideOut 0.5s ease';
      setTimeout(function () {
        filterContainer.style.display = 'none';
      }, 500);
      // 展开搜索栏
      searchContainer.style.display = 'block';
      searchContainer.style.animation = 'slideIn 0.5s ease';
      // 点击按钮出现搜索弹窗
      search_btn.addEventListener('click', function (event) {
        search_results_container.style.display = 'block';
        search_results_container.style.animation = 'resultsIn 0.5s ease';
      })
    }
    else if (isFilter) {
      searchContainer.style.animation = 'slideOut 0.5s ease';
      setTimeout(function () {
        searchContainer.style.display = 'none';
      }, 500);
      filterContainer.style.display = 'block';
      filterContainer.style.animation = 'slideIn 0.5s ease';
    }
    else {
      searchContainer.style.animation = 'slideOut 0.5s ease';
      filterContainer.style.animation = 'slideOut 0.5s ease';
      setTimeout(function () {
        searchContainer.style.display = 'none';
        filterContainer.style.display = 'none';
      }, 500);
      // 搜索弹窗消失
      search_results_container.style.animation = 'resultsOut 0.5s ease';
      search_results_container.style.display = 'none';
    }
  });
});

// AIsearch 点击显示与隐藏
document.addEventListener('DOMContentLoaded', function () {
  var AIsearch_btn_container = document.querySelector('.AIsearch_btn_container')
  var AIsearch_btn = document.querySelector('.AIsearch_btn_container .AIsearch_btn')
  var arrow_wrapper = document.querySelector('.AIsearch_btn_container .AIsearch_btn .arrow-wrapper')
  var answer_content = document.querySelector('.answer_content')
  var ask_input = document.querySelector('.ask_input')
  let clickCount = 0;

  AIsearch_btn.addEventListener('click', function () {
    clickCount++;

    if (clickCount % 2 === 1) {
      // 奇数次点击 -> 显示
      AIsearch_btn_container.classList.add('AIsearch_window_show');
      AIsearch_btn_container.classList.remove('AIsearch_window_hidden');
      arrow_wrapper.style.transform = 'rotate(0deg)';

      answer_content.style.display = 'block'
      answer_content.style.animation = 'ease-out answer_content_In 0.5s 1s forwards'
      ask_input.style.display = 'flex'
    } else {
      // 偶数次点击 -> 隐藏
      AIsearch_btn_container.classList.add('AIsearch_window_hidden');
      AIsearch_btn_container.classList.remove('AIsearch_window_show');
      arrow_wrapper.style.transform = 'rotate(180deg)';

      answer_content.style.display = 'none'
      ask_input.style.display = 'none'
    }
  })

  // 切换麦克风图片
  var voice_input = document.querySelector('.voice_input');
  var micImage = document.querySelector('.voice_input img');

  voice_input.addEventListener('mousedown', function () {
    micImage.src = '../images/麦克风-激活.png'; // 切换为新的图片路径
  });

  voice_input.addEventListener('mouseup', function () {
    micImage.src = '../images/麦克风.png'; // 恢复为原始图片路径
  });
})

// 搜索与显示
function searchRestaurant() {
  var searchParam = document.querySelector('.searchContainer .input').value;
  var search_results_container = document.querySelector('.search_results_container');
  search_results_container.innerHTML = '';

  // 遍历饭店点集查询
  Points.forEach(point => {
    var target_name = point.getName()
    // 使用 includes 方法进行模糊查询
    if (target_name.includes(searchParam)) {
      var resultContainer = document.createElement('div');
      resultContainer.classList.add('result_items');
      // 判断评分
      if (point.star < 3) {
        var star_pic = 'stat_3'
      }
      else if (point.star > 3 && point.star < 4) {
        var star_pic = 'stat_4'
      }
      else if (point.star > 5) {
        var star_pic = 'stat_5'
      }

      var content = `
          <div class="row1">
            <div class="restaurant_name">${target_name}</div>
            <div class="cuisine">${point.cuisineType}</div>
          </div>
          <div class="row2">
            <img class="stars" src="./images/${star_pic}.png">
            <span class="score">${point.score}</span>
            <div class="per">${point.per}</div>
          </div>
          <div class="row3">
            <div class="address">${point.address}</div>
          </div>
          <div class="horizontal-line"></div>
      `;

      // 将内容添加到 resultContainer 中
      resultContainer.innerHTML = content;

      // 将 resultContainer 添加到 search_results_container 中
      search_results_container.appendChild(resultContainer);

      // 点击后聚焦位置并弹窗，两种思路：搜索后为每一个结果添加监听器（最省事）；读取点击div信息，根据id或者name找
      resultContainer.addEventListener('click', function () {
        map.setZoomAndCenter(14, labelMarker.getPosition(), false, 600);
        labelMarker.setIcon({
          size: [40, 40]
        })
        var position = labelMarker.getPosition()

        var contentMarker = new AMap.Marker({
          anchor: 'bottom-center',
          offset: [0, 160],
        });

        if (position) {
          contentMarker.setContent(
            '<div style="font-family: Arial, sans-serif; background-color: #ffffff; border: 1px solid #cccccc; padding: 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">' +
            '<div style="font-size: 14px; font-weight: bold; margin-bottom: 5px;">经停地铁：' + '<br>' + labelMarker.getExtData().address + '</div>' +
            '<div style="color: #007BFF; margin-bottom: 5px;">市辖区：' + labelMarker.getExtData().adname + '</div>' +
            '<div>经纬度：' + position + '</div>' +
            '</div>')

          contentMarker.setPosition(position);
          map.add(contentMarker);

          // 取消选中
          map.on('click', function () {
            labelMarker.setIcon({
              size: [24, 24]
            })

            map.remove(contentMarker);

          })
        }
      })

    }
  })
}

function clearInput() {
  document.querySelector(".pbuffer input").value = "";
}

function showbuffersearch() {
  var plnglat = document.querySelector('.buffersearch_container .plnglat')
  var pbuffer = document.querySelector('.pbuffer')
  plnglat.style.display = 'block'
  plnglat.style.animation = 'ease-out plnglatIn 0.6s 0s forwards'

  setTimeout(function () {
    pbuffer.style.display = 'flex'
    pbuffer.style.animation = 'ease-out bufferIn 0.6s 0s forwards';
  }, 300);
}
