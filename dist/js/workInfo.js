$(function(){
  pickerEvent.init();
})
var first = [], /* 省，直辖市 */
    second = [], /* 市 */
    third = [], /* 镇 */
    selectedIndex = [0, 0, 0], /* 默认选中的地区 */
    checked = [0, 0, 0]; /* 已选选项 */
function creatList(obj, list){
    obj.forEach(function(item, index, arr){
          var temp = new Object();
          temp.text = item.name;
          temp.value = index;
          list.push(temp);
    })
};
creatList(city, first);
if (city[selectedIndex[0]].hasOwnProperty('sub')) {
    creatList(city[selectedIndex[0]].sub, second);
} else {
    second = [{text: '', value: 0}];
}
if (city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
    creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
} else {
    third = [{text: '', value: 0}];
};
var picker = new Picker({
        data: [first, second, third],
        selectedIndex: [0,0,0],
        title: '地址选择'
    });
var picker2 = new Picker({
        data: [first, second, third],
        selectedIndex: [0,0,0],
        title: '地址选择'
    });
var pickerEvent = {
  init:function(){
    var nameEl = document.getElementById('demo1'),
        nameEl2 = document.getElementById('demo2');
    this.event.method(picker,nameEl);
    this.event.method(picker2,nameEl2);
    nameEl.addEventListener('click', function () {
        picker.show();
    });
    nameEl2.addEventListener('click', function () {
        picker2.show();
    });
  },
  event:{
    method:function(obj,dom){
      obj.on('picker.select', function (selectedVal, selectedIndex) {
        var text1 = first[selectedIndex[0]].text;
        var text2 = second[selectedIndex[1]].text;
        var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
          dom.value = text1 + ' ' + text2 + ' ' + text3;
      });

      obj.on('picker.change', function (index, selectedIndex) {
        if (index === 0){
          firstChange();
        } else if (index === 1) {
          secondChange();
        }

        function firstChange() {
          second = [];
          third = [];
          checked[0] = selectedIndex;
          var firstCity = city[selectedIndex];
          if (firstCity.hasOwnProperty('sub')) {
            creatList(firstCity.sub, second);

            var secondCity = city[selectedIndex].sub[0]
            if (secondCity.hasOwnProperty('sub')) {
              creatList(secondCity.sub, third);
            } else {
              third = [{text: '', value: 0}];
              checked[2] = 0;
            }
          } else {
            second = [{text: '', value: 0}];
            third = [{text: '', value: 0}];
            checked[1] = 0;
            checked[2] = 0;
          }

          obj.refillColumn(1, second);
          obj.refillColumn(2, third);
          obj.scrollColumn(1, 0)
          obj.scrollColumn(2, 0)
        }

        function secondChange() {
          third = [];
          checked[1] = selectedIndex;
          var first_index = checked[0];
          if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
            var secondCity = city[first_index].sub[selectedIndex];
            creatList(secondCity.sub, third);
            obj.refillColumn(2, third);
            obj.scrollColumn(2, 0)
          } else {
            third = [{text: '', value: 0}];
            checked[2] = 0;
            obj.refillColumn(2, third);
            obj.scrollColumn(2, 0)
          }
        }

      });

      obj.on('picker.valuechange', function (selectedVal, selectedIndex) {
        console.log(selectedVal);
        console.log(selectedIndex);
      });
    }
  }
}
