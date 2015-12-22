window.onload = function() {

  //declare top, title, menue areas
  var top = document.createElement("div");
  top.id = "top";
  console.log(top);
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
  var menuItemTwo = document.createElement('div');
  menuItemTwo.className = "menuItem";
  menuItemTwo.innerHTML ="|";
  var menuItemThree = document.createElement('div');
  menuItemThree.className = "menuItem";
  menuItemThree.innerHTML = "MY BOARDS";
  var menuItemFour = document.createElement('div');
  menuItemFour.className = "menuItem";
  menuItemFour.innerHTML = "|";
  var menuItemFive = document.createElement('div');
  menuItemFive.className = "menuItem";
  menuItemFive.innerHTML = "GET THE APP";

  //append to top of body
  var content = document.createElement('div');
  content.id ="content";

  document.body.insertBefore(top,document.body.childNodes[0]);
  document.body.insertBefore(content, document.body.childNodes[1]);
  top.appendChild(title);
  menu.appendChild(menuItemOne);
  menu.appendChild(menuItemTwo);
  menu.appendChild(menuItemThree);
  menu.appendChild(menuItemFour);
  menu.appendChild(menuItemFive);
  top.appendChild(menu);

  $.getJSON('./api/get_the_app.json', function(data) {
    //console.log(data.data.children[0].data.title);
    var title = data.data.children[0].data.title;
    var feed = document.getElementById('content');
   $(feed).prepend('<h1>'+ title + '</h1>');
  });
//API Structure, want:
//image: kids[i].data.url
//title: kids[i].data.title
//author: kids[i].data.author
//age : moment.unix(kids[i].created).fromNow()     (timestamp use moment.js)
//views: kids[i].score
//description : 2 sentences of lorem ipsum

//function newContent(){
  $.getJSON('./api/my_boards.json', function(data) {
    var kids = data.data.children;

    for (var i = 0; i < kids.length; i++) {
      var contentBox = document.createElement("div");
      contentBox.className = "contentBox";
      var picBox = document.createElement('div');
      picBox.className = "picBox";
      var pic = document.createElement('img');
      picBox.appendChild(pic);
      contentBox.appendChild(picBox);
      pic.src = kids[i].data.url;
      var title = document.createElement('div');
      title.className = "boxTitle";
      title.innerHTML = kids[i].data.title;
      contentBox.appendChild(title);
      var info = document.createElement('div');
      info.className = "info";
      info.innerHTML = "by " + kids[i].data.author + " | " + moment.unix(kids[i].created).fromNow() + " | " + kids[i].score + " views";
      contentBox.appendChild(info);
      var text = document.createElement('div');
      text.className = "text";
      text.innerHTML = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder.";
      contentBox.appendChild(text);
      document.body.insertBefore(contentBox, document.body.childNodes[2]);
    }
  });
// }
 console.log(moment.unix(1424766350).fromNow());
};