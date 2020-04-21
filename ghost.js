// import  Puppeteer from "puppeteer-core";
// import  Instagram from "./Instagram.js";

const Puppeteer = require("puppeteer-core");
const Instagram = require("./Instagram.js");

class  Ghost
{
	 constructor(inpInfo,seeEvents) {

	 	 this.InputInfo = {
	 	 	  userName: inpInfo.userName,
			  Password: inpInfo.Password,
			  hashTag: inpInfo.hashTag,
			  pageCount: inpInfo.pageCount,
			  Comment: inpInfo.Comment,
			  showEvents: !seeEvents,
		 };

	 	 this.Result = {
	 	 	 pgAddresses: new Set(),
			  // pgAddresses: [ ],
			 pgIndicator: 1,
			 closedPgsCounter: 0,
			  successfullComments: 0,
			  missedComments: 0
		 }



	 	 this.instaBot = new Instagram(this.InputInfo.showEvents);
	 }

	 get  getInstaBot(){
	 	 return this.instaBot.clone();
	 }
	 set  setInstaBot(igb){
	 	 this.instaBot = igb;
	 }

	 get  getPublicInfo(){
	 	 return  this.InputInfo;
	 }
	 set  setPublicInfo(pi){
	 	 this.InputInfo = pi;
	 }

	 get  getUserName(){
	 	 return  this.InputInfo.userName.clone();
	 }
	 set  setUserName(un){
	 	 this.InputInfo.userName = un;
	 }

	 get  getPassword(){
	 	 return  this.InputInfo.Password.clone();
	 }
	 set  setPassword(p){
	 	 this.InputInfo.Password = p;
	 }

	 set  setHashTag(h){
	 	 this.InputInfo.hashTag = h;
	 }
	 get  getHashTag(){
	 	 return  this.InputInfo.hashTag.clone();
	 }

	 get getPageCounter(){
	 	 return  this.InputInfo.pageCount;
	 }
	 set  setPageCounter(c){
	 	 this.InputInfo.pageCount = c;
	 }

	 get  getContent(){
	 	 return  this.InputInfo.Comment.clone();
	 }
	 set  setContent(c){
	 	 this.InputInfo.Comment = c;
	 }

	 // async goToInstagram(){
	 //
	 // 	 this.instaBot.goToAddress("https://instagram.com/accounts/login",0).then(() => {
	 // 	 	 console.log("ghost : I opened instagram.");
		//  }).catch((err) => {
		//  	 console.log("ghost : I can't open instagram.");
		//  });
	 // }


	 async Login(){

	 	 // debugger;

	 	 //		entering username		//
	 	 await this.instaBot.writeInElement("[name=username]",0,this.InputInfo.userName);

	 	 //		entering password		//
	 	 await this.instaBot.writeInElement("[name=password]",0,this.InputInfo.Password);

	 	 // 		click  on 'login' button			//
		  await this.instaBot.clickOnElement("[type=submit]",0);
		  
		  await this.instaBot.core.Tabs[0].waitForSelector("p[role=alert]",{timeout: 4000}).then(async () => {
			  console.log("ghost : we can't login ;)");
			  await this.instaBot.core.Browser.close();
			  process.exit(0);
		  }).catch(() => {
			  console.log("ghost : we logged in successfullly");
		  });

	 }

	 async typeHashTag(){
	 	 // debugger;
	 	 this.instaBot.writeInElement("[placeholder=Search]",0,this.InputInfo.hashTag);
	 }

	 async selectAHashTag(){
	 	 // debugger;
	 	 this.instaBot.clickOnElement(".yCE8d",0).then(() => {
	 	 	 console.log("ghost : I clicked on a hashTag.");
		 }).catch(() => {
		 	 console.log("ghost : I can't click on a hashTag.");
		 });
	 }

	 async enterEveryPage(){

		  await this.instaBot.core.Tabs[0].waitForSelector(".KC1QD",{timeOut: 6000}).then(async () => {

		  	 console.log("ghost : I found all instagramPages. ;)");

		  	 //					working with set				//
		  	 //					under testing part							//
		  	 var tmp = 0;

		  	 while(this.Result.pgAddresses.size <= this.InputInfo.pageCount)
			 {
			 	 //				scrolling main page					//
			 	 await this.instaBot.core.Tabs[0].evaluate(() => {
			 	 	 window.scrollBy({
						  top: 200,
						  left: 0,
						  // behavior: "smooth"
					 });
				 });

			 	 //					extracting pages links				//
				  let  arr = await this.instaBot.core.Tabs[0].evaluate(() => {

				  	 let  linksNode = document.querySelectorAll("a:not([class])");
				  	 let linksArr = [ ];

				  	 for(let i = 0 ; i < linksNode.length ; i++)
				  	 {
				  	 	 linksArr.push("https://instagram.com" + linksNode.item(i).getAttribute("href"));
				  	 }

				  	 return  { linksAddresses: linksArr };
				  });

				  for(let x = tmp ; x < arr.linksAddresses.length ; x++)
				  {
				  	 this.Result.pgAddresses.add(arr.linksAddresses[x]);
				  }
				  tmp = arr.linksAddresses.length;
			 }

			 debugger;

		  	 this.Result.pgAddresses.delete("https://instagram.com/explore/");
		  	 this.Result.pgAddresses.delete("https://instagram.com/" + this.InputInfo.userName + "/");

			 //					testing 				//
			   console.log(this.Result.pgAddresses);
		  	 //				----------				//

			   //					----------------------------------------					//



			   //				working with array 				//
			   // let Links = await this.instaBot.core.Tabs[0].evaluate(() => {
			   //
				// 	let linksNode = document.querySelectorAll("a:not([class])");
				// 	let linksArr = [ ];
			   //
				// 	for(let i = 0 ; i < linksNode.length ; i++)
				// 	{
				// 		 linksArr.push("https://instagram.com" + linksNode.item(i).getAttribute("href"));
				// 	}
			   //
				// 	return  { linksAddresses: linksArr };
			   // });
			   //
			   // // this.Result.pgAddresses = new Set(Links.linksAddresses);
				// this.Result.pgAddresses = Links.linksAddresses;

			   //				testing 				//
			   // for(let lnkInd = 0 ; lnkInd < this.InputInfo.pageCount ; lnkInd++)
			   // {
			   // 	 	console.log("link[" + (lnkInd + 1) + "] = " + Links.linksAddresses[lnkInd]);
			   // }
			   //			-----------				//

			   await this.commentingOnPages(4,this.Result.pgAddresses.values());

			   // let pg = null;
			   //
			   // for(let j = 0 ; j < this.InputInfo.pageCount ; j++)
			   // // for(let j = 0 ; j < Links.linksAddresses.length ; j++)
			   // {
				// 	pg = await this.instaBot.core.Browser.newPage();
			   //
				// 	this.instaBot.goToLink(Links.linksAddresses[j],pg);
				// 	this.instaBot.core.Tabs.push(pg);
			   // }
			   //
			   // // 		click on a link to going to instagram page		//
			   // for(let b = 1 ; b <= this.InputInfo.pageCount ; b++)
			   // // for(let b = 0 ; b < Links.linksAddresses.length ; b++)
			   // {
				// 	this.enterInPage(b);
			   // }


		  }).catch(() => {

		  	 console.log("ghost : I can't find InstagramPages.");
		  	 this.instaBot.core.Browser.close();

		  });

	 }


	 async commentingOnPages(n,iter){

		  let pg = null;
		  let to = (this.Result.pgIndicator + n);
		  let from = this.Result.pgIndicator;

		  //				under testing part			//
		  // var  iter = this.Result.pgAddresses.values();

		  // for(let j = 0 ; j < this.InputInfo.pageCount ; j++)
		   // for(let j = 0 ; j < Links.linksAddresses.length ; j++)
		  for(let j = from ; j < to  && (this.Result.pgIndicator <= this.InputInfo.pageCount) ; j++ )
		  {
		  	 //				creating new tab			//
			   pg = await this.instaBot.core.Browser.newPage();
			   this.Result.pgIndicator++;

			   //				testing 					//
			   console.log("testing -> pgIndicator = " + this.Result.pgIndicator);
			   // console.log("testing -> itr.next() = " + iter.next().value);
			   //				-------					//

			   //				going to address in new tab			//
			   this.instaBot.goToLink(iter.next().value,pg);
			   // this.instaBot.goToLink(this.Result.pgAddresses[j],pg);
			   this.instaBot.core.Tabs.push(pg);

			   this.enterInPage(j);
			   this.insertComment(j,iter);
		  }
		  //							-----------------------------						//

	 }


	 async enterInPage(pgIndex){
	 	 await this.instaBot.waitUntilElementAppear(pgIndex,".FPmhX");
	 	 await this.instaBot.clickOnElement(".FPmhX",pgIndex);
	 }

	 async insertComment(pageIndex,itrIndx){

	 	 debugger;

		  await this.instaBot.core.Tabs[pageIndex].waitForSelector("._2z6nI",{timeout: 60000}).then(async function(){

		  	 	// for(let postIndex = 0 ; postIndex < 1 ; postIndex++) {

				  //			click on a post of InstagramPage			//
			   await this.instaBot.core.Tabs[pageIndex].evaluate("document.querySelectorAll('a:not([class])')[" + (pageIndex % 3) + "].click();");

				  	//			typing and clicking on 'Post' button and inserting comment.			//
				  	await this.instaBot.core.Tabs[pageIndex].waitForSelector(".Ypffh", {timeout: 4000}).then(async () => {

						 var waitTime;

						 if(parseInt((pageIndex / 5)) == 0) {

						 	 waitTime = 0;
						 }
						 else{
						 	 waitTime = 60000;
						 }

						 //			wait for one minute...			//
						 await this.instaBot.core.Tabs[pageIndex].waitFor(waitTime).then( function(wt){
							  console.log("ghost : I will wait for " + wt + ". ;)");
						 }(waitTime)).catch(() => {
							  console.log("ghost : I can't wait . error is in page " + pageIndex + " . in insert comment method.");
						 });

						 //			like post				//
						 // await this.instaBot.core.Tabs[pageIndex].evaluate(() => {
							//   document.querySelectorAll(".glyphsSpriteHeart__outline__24__grey_9")[1].click();
						 // }).then(() => {
						 // 	 console.log("ghost : post liked. ;)");
						 // }).catch(() => {
						 // 	 console.log("ghost : can't like post.");
						 // });


						 await this.instaBot.core.Tabs[pageIndex].type(".Ypffh", this.InputInfo.Comment[pageIndex - 1]);
						 // await this.instaBot.core.Tabs[pageIndex].waitFor(2000);
						 await this.instaBot.core.Tabs[pageIndex].waitFor((pageIndex % 5) * 20000);
						 await this.instaBot.core.Tabs[pageIndex].click("[type=submit]");

						 await this.instaBot.core.Tabs[pageIndex].waitFor(2000);

						 await this.instaBot.core.Tabs[pageIndex].screenshot({path: "./screenshots/" + pageIndex + ".png"});
						 await this.instaBot.core.Tabs[pageIndex].waitFor(4000);


						 //			dealing with couldn't post comment alert 			//
						 await this.instaBot.core.Tabs[pageIndex].waitForSelector(".gxNyb",{timeOut: 6000}).then( async function(){

						 	 this.Result.successfullComments++;

						 }.bind(this)).catch(function(){
						 	 this.Result.missedComments++;
						 }.bind(this));

						 // 			click on close button			//
						 // await this.instaBot.core.Tabs[pageIndex].click(".ckWGn");

						 // 		close tab	 	//
						 await this.instaBot.core.Tabs[pageIndex].close().then(function(pgi){
						 	 console.log("ghost : page[" + pgi + "] done. ;)");
						 	 this.Result.closedPgsCounter++;

						 	 if( ( (this.Result.closedPgsCounter % 5) == 4)  && (pgi < this.InputInfo.pageCount) )
						 	 {
						 	 	 this.commentingOnPages(5,itrIndx);
							 }

						 	 //					logout 					//
						 	 if(this.Result.closedPgsCounter == this.InputInfo.pageCount)
						 	 {
						 	 	 this.logOut();
							 }

						 }.bind(this)(pageIndex));

				  }).catch(async () => {
				  	 console.log("ghost : we deal with limited post. can't find textarea.it is removed.");
				  	 await this.instaBot.core.Tabs[pageIndex].close();
				  	 this.Result.closedPgsCounter++;

				  	 if(this.Result.closedPgsCounter == this.InputInfo.pageCount){
				  	 	 this.logOut();
					 }

					});

			 	// }



			  }.bind(this));
	 }

	  insertCommentForEveryPage(){

	 	 let eP = (this.Result.pgIndicator + 5);

	 	 // for(let pindex = 1; pindex < this.instaBot.core.Tabs.length ; pindex++)
		  for(let pindex = this.Result.pgIndicator ; pindex < eP ; pindex++)
	 	 {
	 	 	 this.insertComment(pindex);
		 }
	  }

	  async  logOut(){

	 	 await this.instaBot.core.Tabs[0].click(".glyphsSpriteUser__outline__24__grey_9");
	 	 await  this.instaBot.core.Tabs[0].waitForSelector(".glyphsSpriteSettings__outline__24__grey_9",{timeOut: 6000}).then(async () => {

	 	 	 await this.instaBot.core.Tabs[0].click(".glyphsSpriteSettings__outline__24__grey_9");

		 }).catch(() => {
		 	 console.log("ghost : can't find gear button.");
		 });

	 	 await this.instaBot.core.Tabs[0].waitForSelector(".mt3GC",{timeOut: 6000}).then(async () => {

	 	 	 await this.instaBot.core.Tabs[0].evaluate(() => {
	 	 	 	 document.querySelectorAll(".aOOlW")[6].click();
			 });

	 	 	 console.log("ghost : we logged out. :)");

		 }).catch(() => {
		 	 console.log("ghost : can't logOut .");
		 });

	 	 await this.instaBot.core.Tabs[0].waitFor(4000);

	 	 await this.instaBot.core.Browser.close();

	 	 //			tells us how many comments are inserted successfully		//
	 	 this.reportResult();
	  }

	  reportResult(){
	 	 console.log("ghost : mission completed. ;)");
	 	 console.log("ghost : successfull comments = " + this.Result.successfullComments);
	 	 console.log("ghost : missed comments = " + this.Result.missedComments);
	  }



	 async makeAliveMe(){
	 	 //			invoke all methods that ghost needs to  do work e.g commenting , following , ...			//

		  console.log("ghost : Hi Sir. My name is ghost. ready to use. :)");

		  debugger;

		  await this.instaBot.Initialize();

		  await this.Login();

		  await this.instaBot.waitUntilElementAppear(0,".bIiDR").then(async () => {

		  	 console.log("ghost : Notification alert appeared. ;)");


		  	 await this.instaBot.clickOnElement(".bIiDR",0).then(() => {
		  	 	 console.log("ghost : I clicked on turnOn button. :)");
			 }).catch(() => {
			 	 console.log("ghost : can't find and click turnOn button");
			 });

		  }).catch(() => {
		  	 console.log("ghost : Notification aler doesn't appeared.");
		  });

		  console.log("ghost : We logged in. ;)");

		  await this.typeHashTag();


		  //			wait until hashtaglist appear.					//
		  await this.instaBot.waitUntilElementAppear(0,".drKGC").then(async () => {
		  	 console.log("ghost : hashTagList appeared. ;)");

		  	 //		clicking on a hashTag after seeing the hashtaglist		//
		  	 await this.selectAHashTag().then(function(){
		  	 	 console.log("ghost : I clicked on a hashTag.");
		  	 }).catch(() => {
		  	 	console.log("ghost : I can't click on any hashTag.");
			 });

		  }).catch(() => {
		  	 console.log("ghost : hashTagList doesn't appear.");
		  });

		  await this.instaBot.core.Tabs[0].waitFor(3000);

		  debugger;
		  await this.enterEveryPage();

	 }
}

module.exports = Ghost;