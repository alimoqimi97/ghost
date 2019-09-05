// import  Puppeteer from "puppeteer-core";
const Puppeteer = require("puppeteer-core");

var gst = "ghost : ";

class Instagram
{
	 constructor(HeadLess) {

	 	 this.core = {
	 	 	 Tabs: [ ],
			  Browser: null,
			  hdless: HeadLess
		 }

		 // debugger;
		 // this.Initialize();

	 }

	 get  getCore(){
	 	 return this.core;
	 }
	 set  setCore(c){
	 	 this.core = c;
	 }

	 async Initialize(){
	 	 //			creating Browser		//
		 //  debugger;

	 	 this.core.Browser = await Puppeteer.launch({
			  executablePath: "./chrome-win/chrome.exe",
			  headless: this.core.hdless,
			  // slowMo: 125,
			  args: [
			  		// "--window-size=1920,1080",
			  		// "--start-maximized",
			  ]
		 });

	 	 //		create  main page			//
		 //  debugger;
		  this.core.Tabs.push(await this.core.Browser.newPage());

	 	 await this.core.Tabs[0].goto("https://www.instagram.com/accounts/login").then(() => {
	 	 	 console.log(gst + "Main page loaded.");
		 }).catch(() => {
		 	 console.log(gst + "can't load Main page");
		 });
	 }

	 async createPage(){

	 	 debugger;
	 	 let tmpPage = await this.core.Browser.newPage().then(() => {
	 	 	 console.log(text + "New Page created.");
		 }).catch((error) => {
		 	 console.log(gst + "can't create New Page.");
		 	 if(error !== undefined){
		 	 	 console.log("Error is " + error.text);
			 }
		 });

	 	 this.core.Tabs.push(tmpPage);

	 	 return tmpPage;
	 }

	 async goToAddress(url,index){

	 	 await  this.core.Tabs[index].goto(url).then(() => {
	 	 	 console.log(gst + "Link has been opened .");
		 }).catch(() => {
		 	 console.log(gst + "I can't open Link.");
		 });

	 }

	 async goToLink(link,page){

	 	 //				testing 			//
		 //  console.log("link is : " + link);
		  //				-------			//

	 	 await page.goto(link,{waitUntil: "load",timeout: 6000}).then(() => {
	 	 	 console.log("ghost : I went to page. ;)");
		 }).catch(() => {
		 	 console.log("ghost : I couldn't go page.");
		 });
	 }

	 async closePage(pageIndex){
	 	 await this.core.Tabs[pageIndex].close().then(() => {
	 	 	 console.log(gst + "I closed a page");
		 }).catch(() => {
		 	 console.log(gst + "I can't close the page");
		 });
	 }

	 async takeScreenShot(pageIndex,picName)
	 {
	 	 await this.core.Tabs[pageIndex].screenshot("./screenshots/" + picName + ".png").then(() => {
	 	 	 console.log(gst + "I take an screenshot ");
		 }).then(() => {
		 	 console.log(gst + "I can't take Screenshot");
		 });
	 }

	 async  writeInElement(Selector,pageIndex,text)
	 {
	 	 // debugger;

	 	 await this.core.Tabs[pageIndex].type(Selector,text).then( () => {
	 	 	 console.log(gst + "I wrote in Element " + Selector);
		 }).catch(() => {
		 	 console.log(gst + "I can't write in " + Selector);
		 });
	 }

	 async clickOnElement(Selector,pageIndex)
	 {
	 	 await this.core.Tabs[pageIndex].click(Selector).then(() => {
	 	 	 console.log(gst + " I clicked on " + Selector);
		 }).catch(() => {
		 	 console.log(gst+ "I can't click on " + Selector);
		 });
	 }

	 async  pageWaitsFor(pageIndex,Seconds){

	 	 await  this.core.Tabs[pageIndex].waitFor(Seconds * 1000).then(() => {
	 	 	 console.log("ghost : I wait for " + Seconds + " seconds");
		 }).catch(() => {
		 	 console.log("ghost : Can't stop for " + Seconds );
		 });

	 }

	 async closeBrowser(){
	 	 await this.core.Browser.close().then(() => {
	 	 	 console.log("ghost : The Browser closed.");
		 }).catch(() => {
		 	 console.log("ghost :  Can't close the Browser.");
		 });
	 }

	 async waitUntilElementAppear(pageIndex,Selector)
	 {
	 	 await this.core.Tabs[pageIndex].waitForSelector(Selector).then(() => {
	 	 	 console.log("ghost : The element by selector : " + Selector + " has been appeared. ;)");
		 }).catch(async () => {
		 	 console.log("ghost :  I Can't find the element by selector : " + Selector + ". Error is in Instagram Class");
		 });
	 }

	 async  Evaluation(pageIndex,Func){

	 	 debugger;

	 	 //			testing 				//
	 	 // console.log("test: " + await this.core.Tabs[pageIndex].evaluate(Func));
	 	 //			-------				//


	 	 return {
			  res: await this.core.Tabs[pageIndex].evaluate(Func).then((l) => {
				   console.log("ghost : Evaluation successsfull");

				   //			testing 				//
				   console.log("result : " + l.linksAddresses[0]);
				   this.core.Browser.close();
				   //			-------				//

			  }).catch(() => {
				   console.log("ghost : Evaluation Failed.");
			  })
	 	}

	 }
}

// export default Instagram
module.exports = Instagram;