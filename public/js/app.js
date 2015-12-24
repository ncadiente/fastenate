window.onload = function() {

//API Structure, want:
//image: kids[i].data.url
//title: kids[i].data.title
//author: kids[i].data.author
//age : moment.unix(kids[i].created).fromNow()     (timestamp use moment.js)
//views: kids[i].score
//description : 2 sentences of lorem ipsum
function newContent(source){
  document.getElementById('content').innerHTML = "";
  $.getJSON(source, function(data) {


    var kids = data.data.children;
    var kidsNum = data.data.children.length;
    var randomNums = [];
    while (randomNums.length < 8) {
      var num = Math.floor(Math.random() * kidsNum);
      if (randomNums.indexOf(num) === -1) {
        randomNums.push(num);
      }
    }
    console.log(randomNums);
    for (var i = 0; i < randomNums.length; i++) {
      var contentBox = document.createElement("div");
      contentBox.className = "contentBox";
      var picBox = document.createElement('div');
      picBox.className = "picBox";
      var pic = document.createElement('img');
      picBox.appendChild(pic);
      contentBox.appendChild(picBox);
      pic.src = kids[randomNums[i]].data.url;
      var title = document.createElement('div');
      title.className = "boxTitle";
      title.innerHTML = kids[randomNums[i]].data.title;
      contentBox.appendChild(title);
      var info = document.createElement('div');
      info.className = "info";
      info.innerHTML = "by " + kids[randomNums[i]].data.author + " | " + moment.unix(kids[randomNums[i]].data.created).fromNow() + " | " + kids[randomNums[i]].data.score + " views";
      contentBox.appendChild(info);
      var text = document.createElement('div');
      text.className = "text";
      text.innerHTML = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder.";
      contentBox.appendChild(text);
      document.getElementById("content").appendChild(contentBox);
    }
  });
}
  //declare top, title, menue areas
  var top = document.createElement("div");
  top.id = "top";
  var title = document.createElement('div');
  title.id = "title";
  var logoBox = document.createElement('div');
  logoBox.id = "logoBox";
  var logo = document.createElement('img');
  logo.src = "./assets/logo.svg";
  logoBox.appendChild(logo);
  title.appendChild(logoBox);
  title.className = "topItem";
  var menu = document.createElement('div');
  menu.id = "menu";
  menu.className = "topItem";

  //declare menu items

  var menuItemOne = document.createElement('div');
  menuItemOne.className = "menuItem";
  menuItemOne.innerHTML = "RANDOM";
  menuItemOne.addEventListener('click', function(event) {
    newContent('./api/random.json');
  });
  var menuItemThree = document.createElement('div');
  menuItemThree.className = "menuItem";
  menuItemThree.innerHTML = "MY BOARDS";
  menuItemThree.addEventListener('click', function(event) {
    newContent('./api/my_boards.json');
  });
  var menuItemFive = document.createElement('div');
  menuItemFive.className = "menuItem";
  menuItemFive.innerHTML = "GET THE APP";
  menuItemFive.addEventListener('click', function(event) {
    newContent("./api/get_the_app.json");
  });

  //append to top of body
  var content = document.createElement('div');
  content.id ="content";

  document.body.insertBefore(top,document.body.childNodes[0]);
  document.body.insertBefore(content, document.body.childNodes[1]);
  top.appendChild(title);
  menu.appendChild(menuItemOne);
  menu.appendChild(menuItemThree);
  menu.appendChild(menuItemFive);
  top.appendChild(menu);

//make footer
var bottom = document.createElement('div');
bottom.id = "bottom";
var fBdiv = document.createElement('div');
var fBimg = document.createElement('img');
fBimg.src = './../assets/facebook_grey.svg';
fBdiv.appendChild(fBimg);
bottom.appendChild(fBdiv);
var iGdiv = document.createElement('div');
var iGimg = document.createElement('img');
iGimg.src = './../assets/instagram_grey.svg';
iGimg.addEventListener('mouseover', function(event){
  console.log("working");
  iGimg.src = './../assets/instagram_orange.svg';
});
iGimg.addEventListener('mouseout', function(event){
  iGimg.src = './../assets/instagram_grey.svg';
});
iGdiv.appendChild(iGimg);
bottom.appendChild(iGdiv);
document.body.insertBefore(bottom, document.body.childNodes[2]);

//load initial content
newContent('./api/my_boards.json');

};