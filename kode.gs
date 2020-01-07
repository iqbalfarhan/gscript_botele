var token = "1064314234:AAHocsEZ4J3-21sAuF2cZtoQ_hgdULgYxvs";
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = "https://script.google.com/macros/s/AKfycbyIQQ6DPNtY5FzT_GF8htYzymg-Jm-euVP24RRm9fstvLHZtIo/exec";

var sheetname = "formresponse";
var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1-p-PnZoUTCrIQD4rKfukGNwfWuIPbVc7TrGR3atHu70/edit#gid=0");
var first = ss.getSheetByName(sheetname);

function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook(){
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendText(id, text){
  var url = telegramUrl + "/sendMessage?chat_id="+id+"&text="+encodeURIComponent(text);
  var response = UrlFetchApp.fetch(url);
}

function doGet(e){
  var rows = getDataRows_();
  //return HtmlService.createHtmlOutput(JSON.stringify(rows));
  Logger.log(JSON.stringify(rows));
  //sendText("608751286", "bisa ko");
}

function getDataRows_() {
	return first.getRange(2, 2, first.getLastRow() - 1, first.getLastColumn()).getValues()[0];
}

function doPost(e){
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var chatid = data.message.chat.id;
  var first_name = data.message.chat.first_name;
  var date = data.message.date;
  var answer = "";
  
  try{
    var explode = text.split(" ");
    
    var command = explode[0];
    var search = explode[1];
    
    var a = first.getRange(2, 2, first.getLastRow() - 1, first.getLastColumn()).getValues();
    if(new RegExp('/ceksn','g').test(text)){
      var hasilceksn = 0;
      for(var i = 0; i<a.length; i++){
        if(a[i][0] == search){
          hasilceksn += 1;
          var jawab = "";
          jawab += "Serial Number : " + a[i][0] + "\n";
          jawab += "Mac Address : " + a[i][1] + "\n";
          jawab += "Foto : " + a[i][2] + "\n";
          jawab += "CSM : " + a[i][3] + "\n";
          jawab += "CPRKT : " + a[i][4] + "\n";
          jawab += "Jenis : " + a[i][5] + "\n";
          jawab += "Perolehan : " + a[i][6] + "\n";
          jawab += "REG : " + a[i][7] + "\n";
          jawab += "Witel : " + a[i][8] + "\n";
          jawab += "PIC : " + a[i][10] + " (" + a[i][9] + ")\n";
          jawab += "No Telepon : " + a[i][13] + "\n";
          jawab += "User : " + a[i][11] + "\n";
          jawab += "Stat : " + a[i][12] + "\n";
          jawab += "Keterangan : " + a[i][14] + "\n";
          
          sendText(chatid, jawab);
        } 
      }
      
      if(hasilceksn == 0){
        sendText(chatid, "Nomor SN yang dimasukkan tidak ditemukan");
      }
    }
    else if(new RegExp('/cekmac','g').test(text)){
      var answer = "Mac Address tidak ditemukan";
      sendText(chatid, answer);
    }
    else if(new RegExp('/help','g').test(text)){
      var n_alert = "Untuk mencari dengang SN = /ceksn <spasi> Serial Number \n" +
      "Untuk mencari dengang Mac Address = /cekmac <spasi> Mac Address \n";
      sendText(chatid, n_alert);
    }
    else{
      sendText(chatid, "Perintah tidak ditemukan, silakan /help untuk bantuan");
    }
    
    
  } catch(e){
    sendText(chatid, e);
  }
  
}

function insertRow(date, chatid, text){
  first.appendRow([new Date(), chatid, text]);
}
