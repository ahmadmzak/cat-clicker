
  var model = {
  currCat: null,
  catData: {
    'Micky' : 'images/cat-1.jpg',
    'Kaylee': 'images/cat-2.jpg',
    'Johnny': 'images/cat-3.jpg',
    'Newton': 'images/cat-4.jpg',
    'Chuck' : 'images/cat-5.jpg'
  },
  init: function(){
    this.cats = [];
    for(var key in this.catData){
      if(this.catData.hasOwnProperty(key))
        this.cats.push({name: key, image: this.catData[key], clicks: 0});
    }
  }
};
var controller = {
  init: function(){
    model.init();
    model.currCat = model.cats[0];
    view.init();
  },
  getCurrCat: function(){
    return model.currCat;
  },
  getAllCats: function(){
    return model.cats;
  },
  setCurrCat: function(cat){
    model.currCat = cat;
  },
  setCatName: function(name){
    model.currCat.name = name;
  },
  setCatURL: function(url){
    model.currCat.image = url;
  },
  setCatClickCount: function(count){
    model.currCat.clicks = count;
  },
  addClick: function(){
    model.currCat.clicks++;
    view.renderDisplay();
  }
};
var view = {
  init: function(){
    this.cats = controller.getAllCats();
    this.nameElem = document.getElementById('name');
    this.imgElem = document.getElementById('image');
    this.clicksElem = document.getElementById('clicks');
    this.listElem = document.getElementById('list');
    this.cancelElem = document.getElementById('cancel');
    this.saveElem = document.getElementById('save');
    this.adminElem = document.getElementById('admin');
    this.formElem = document.getElementById('form');
    this.nameInElem = document.getElementById('input-name');
    this.imageInElem = document.getElementById('input-url');
    this.clicksInElem = document.getElementById('input-clicks');
    this.imgElem.addEventListener('click', function(){
      controller.addClick();
    });
    this.renderDisplay();
    this.renderList();
    this.renderForm();
  },
  renderDisplay: function(){
    var currCat = controller.getCurrCat();
    this.nameElem.textContent = currCat.name;
    this.imgElem.src = currCat.image;
    this.clicksElem.textContent = 'clicks: ' + currCat.clicks;
  },
  renderList: function(){
    for(var i=0; i<this.cats.length; i++){
      var li = document.createElement('li');
      li.setAttribute('id', this.cats[i].name);
      li.textContent = this.cats[i].name;
      li.addEventListener('click', (function(cat){
        return function(){
          controller.setCurrCat(cat);
          view.renderDisplay();
        };
      })(this.cats[i]));
      this.listElem.appendChild(li);
    }
  },
  renderForm: function(){
    this.clearForm();
    this.adminElem.addEventListener('click', function(){
      view.formElem.style.display = 'block';
    });
    this.cancelElem.addEventListener('click', function(){
      view.clearForm();
      view.formElem.style.display = 'none';
    });
    this.saveElem.addEventListener('click', function(){
      var nameStr = view.nameInElem.value;
      var urlStr = view.imageInElem.value;
      var clickCount = parseInt(view.clicksInElem.value);
      if(nameStr){
        document.getElementById(controller.getCurrCat().name.toString()).textContent = nameStr;
        controller.setCatName(nameStr);
      }
      if(urlStr)
        controller.setCatURL(urlStr);
      if(clickCount)
        controller.setCatClickCount(clickCount);
      view.renderDisplay();
      view.clearForm();
    });
  },
  clearForm: function(){
    this.nameInElem.value = "";
    this.imageInElem.value = "";
    this.clicksInElem.value = "";
    this.formElem.style.display = 'none';
  }
};
controller.init();
