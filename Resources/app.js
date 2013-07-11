//Change this for creating standalone example. 
//var win = Ti.UI.currentWindow;
var win = Ti.UI.createWindow({
	backgroundColor:'#fff',
	exitOnClose:true
});
 
var view = Ti.UI.createView({
	top:0,
    height : Ti.UI.SIZE,
    width : 320,
 
    layout : 'vertical',
    //backgroundColor: '#fff'
 
});
win.add(view);
 
var friends = [];
//var tableData = [];
 
function fillTableView() {
 
   // function findFeedByDate(d) {
    //    for (var i = 0; i < friends.length; i++) {
  //          if (d == friends[i].datum) {
    //            return friends[i];
  //          }
  //      }
 //   }
 
    // Grab date from feed, push it to array, then use Array.sort() to sort array
   // var dateArray = [];
   // for (var i = 0; i < friends.length; i++) {
   //     dateArray.push(friends[i].datum);
  //  }
 //   dateArray = dateArray.sort();
 
 ////   alert(dateArray);
  //  Ti.API.info(dateArray);
 
  //  var sortedFeedArray = [];
 
    var date = null;
  //  Ti.API.info(sortedFeedArray);
 
    //for(var i = 0; i < dateArray.length; i++) { // ASC Sorting
    for (var i = 0,ilen=friends.length; i < ilen; i++) {// DESC Sorting
 
        var row = Ti.UI.createTableViewRow({
 
            height : 55,
            hasChild : true,
            data : friends[i],
            backgroundColor : '#fff', // '#F9F7F4',  //'#F8F6F2',
            selectedBackgroundColor : "F8F6F2"
 
        });
 
        // Rubrik nyheter
        var rubrik = Ti.UI.createLabel({
 
            text : friends[i].rubrik.substring(0, 31),
            left : 60,
            top : 3,
            color : '#1E1E1E',
            font : {
                fontFamily : 'HelveticaNeue',
                //fontWeight : 'bold',
                fontSize : 16,
 
            },
 
        });
        row.add(rubrik);
 
        // ImgView för datum
        var datumView = Ti.UI.createImageView({
            top : 0,
            left : 0,
            width : 50,
            height : 55,
            backgroundColor : '#f6f6f5',//'#efefee', //'#E9E9E8',
 
        });
        row.add(datumView);
 
        // ImgView för ALLA TRE DATUMEN
        var datumView2 = Ti.UI.createImageView({
            top : 3,
            left : 0,
            width : 50,
            height : 55,
 
        });
        datumView.add(datumView2);
 
        //Datum nyheter
 
        //MONTH
        var datum1 = Ti.UI.createLabel({
            //text : friends[i].datum.substring(5,10),
            top : 21,
            //left : 'auto',
            font : {
                fontFamily : 'HelveticaNeue',
                fontWeight : 'bold',
                fontSize : 10
            },
            color : '#535353',
            //color: '#3892E3',
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
 
        });
        datumView2.add(datum1);
 
        //YEAR
        var datum2 = Ti.UI.createLabel({
            text : friends[i].datum.substring(0, 4),
            top : 33,
            //left : 'auto',
            font : {
                fontFamily : 'HelveticaNeue',
                fontWeight : 'bold',
                fontSize : 10
            },
            color : '#535353',
            //color: '#3892E3',
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
 
        });
        datumView2.add(datum2);
 
        //DAY
        var datum3 = Ti.UI.createLabel({
            text : friends[i].datum.substring(8, 10),
            top : 0,
            //left : 'auto',
            font : {
                fontFamily : 'HelveticaNeue',
                fontWeight : 'bold',
                fontSize : 21
            },
            color : '#434343', //'#535353',
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        datumView2.add(datum3);
 
        //Text nyheter
        var text = Ti.UI.createLabel({
            text : friends[i].text,
            left : 60,
            right : 15,
            top : 23,
            bottom : 5,
            height : 'auto',
            font : {
                fontFamily : 'Neue Helvetica',
                fontSize : 10
            },
            color : '#3B3B3B'
 
        });
        row.add(text);
 
       // sortedFeedArray.push(findFeedByDate(dateArray[i]));
 
        dateArray.push(row);
    }
    tableSaknade.setData(dateArray);
}



var getSaknadeInfo = Ti.Network.createHTTPClient();
 
getSaknadeInfo.onload = function(e) {
 
    friends = JSON.parse(getSaknadeInfo.responseText);
    Ti.API.info(getSaknadeInfo);
    //tableData = [];
    dateArray = [];
    sortedFeedArray = [];
    fillTableView();
}
 
getSaknadeInfo.open('GET', 'http://myUrl.com/jsonex');
//
//Instead of sending webservice i will call onload function directle
//
//getSaknadeInfo.send();


function onload(){
	friends=[
	         {id: 'ID', datum: '20 Dec 2012, 8:00 am', text:'hi its working1', rubrik:'your rubrik value1 here'},
	         {id: 'ID',  datum: '29 Jun 2012, 5:47 pm', text:'hi its working2', rubrik:'your rubrik value2 here'},
	         {id: 'ID', datum: '15 May 2013, 6:40 pm', text:'hi its working3', rubrik:'your rubrik value3 here'}	        
	       ];
	friends.sort(comp);
	Ti.API.info('friends sorted Array ='+JSON.stringify(friends));
	 dateArray = [];
	 sortedFeedArray = [];
	 fillTableView();
}
//custom sort function
function comp(a, b) {
    // change the > condition to < for reverse the sort.
    return new Date(a.datum).getTime() < new Date(b.datum).getTime();
}

//TABLEVIEW
var tableSaknade = Ti.UI.createTableView({
     top : 0,
    backgroundColor: "#F8F6F2",
 
});
view.add(tableSaknade);
//Here I am calling your onload function
onload();
win.open();