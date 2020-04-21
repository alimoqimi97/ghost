const Ghost = require("./ghost");

const  showMe = false;

const input = {

	//  userName: "logan_mgm",
	//  Password: "ut.stu.99",

	 // userName: "roach_mgm",
	 // Password: "ut.stu.98",

	 userName: "avengerghost1398",
	 Password: "ghost@for@avenge",

	 hashTag: "#توریست",
	 // hashTag: "#tourism_iran",
	 // hashTag: "#irantravel",
	 // hashTag: "#irantourism",
	 // hashTag: "#ایرانگردی",
	 // hashTag: "#اکوتوریسم",
	// hashTag: "#tourismiran",
	// hashTag: "#beautiful_iran",
	//  hashTag: "#طبیعت_بکر",
	//  hashTag: "#aboatashpark",
	//  hashTag: "#مراکز_گردشگری",
	 //hashTag: "#irantourisme",
	 // hashTag: "#mustseeiran",
	// hashTag: "#irantravelinfo",
	// hashTag: "#irantravelgu",
	// hashTag: "#irantravelingc",
	// hashTag: "#irannature",
	//  hashTag: "#visitiran",
	// hashTag: "#طبیعت_ایران",
	 // hashTag: "#مسافرین",

	 pageCount: 40,
	 Comment: [
	 	  " رویایی. مناطق زیبای شهر و روستاتون رو به@tourist_experience بفرستین" ,
		  " چه دلنشین .ارسال تجربه های گردشگری به@tourist_experience" ,
		  "مناطق گردشگری شهر و روستاتون رو به @tourist_experience بفرستین تا بقیه هم آشنا شن" ,
		  "send your  best travels experiences in : @tourist_experience . follow us. :)",
		  "ارسال عکس و فیلم مناطق بکر گردشگری به @tourist_experience ",
		  " send your touristic places of your city in : @tourist_experience .",
		  "معرفی مناطق مناسب سفر شهر خودتون در : @tourist_experience",
		  "@tourist_experience . آشنایی با مناطق زیبا و جدید سفر در: ",
		  "معرفی مناطق بکر گردشگری در @tourist_experience چقدر زیبا",
		  "چه زیباست. ارسال تجربه های گردشگری به @tourist_experience",
		  "hello. it's nice. send your best travel experiences to @tourist_experiences to show.",
		  " بهترین عکسا و فیلمای مناطق زیبای گردشگری رو جهت نمایش به @tourist_experience بفرستین. " ,
		  "   .همیشه جاری باش ...ارسال تصاویر مناطق زیبای گردشگری به @tourist_experience",
		  " منطقه گردشگریت رو تو @tourist_experience معرفی کن. ",
		  "روز های آفتابی تان خوش . خوش سفر ترین مناطق شهر و روستات رو تو @tourist_experience معرفی کن. ",
		  "  عکسای ناب گردشگریت رو به @tourist_experience ارسال کن تا بقیه هم ببینن. ",
		  "beeest trip experiences in @tourist_experience.",
		  "have a nice time in @tourist_experience",
		  "unique travel points in @tourist_experience",
			 "بسیار زیباااااااس. معرفی بهترین مناطقی که تاحالا سفر رفتید در @tourist_experience . ",
			 "شگفت انگیز. عکسای زیبای جاهایی رو که سفر رفتی رو به @tourist_experience بفرست.",
			 "بی نظیر .  معرفی مناطق بکر گردشگری در :@tourist_experience",
			 "مسحور کنندس.  معرفی مناطق بکر گردشگری در: @tourist_experience",
			 "به @tourist_experience بیا و جاهایی رو که تاحالا سفر رفتی به همه معرفی کن.",
			 "هم رسانی مقاصد سفر @tourist_experience",
			 "دل انگیز.  معرفی مناطق بکر گردشگری در: @tourist_experience",
			 "چشم نواز.  معرفی مناطق بکر گردشگری در: @tourist_experience",
			 "attractive. come to @tourist_experience for show your best travel experiences to all.",
			 "جذابه. بهترین جاهایی که واسه سفر رفتی رو تو @tourist_experience معرفی کن.",
			 " معرفی مناطق بکر گردشگری در @tourist_experience",
			 "beautiful . send your best travel experiences for show in : @tourist_experience",
			 "pretty . sending best trip experiences to : @tourist_experience",
			 "unique. send your best experiences from trip. in @tourist_experience",
			 "It's lovely. share your travel experience in @tourist_experience .",
			 "Like. come to @tourist_experience and share your best travel experiences.",
			 "share your trip experiences from awesome places in @tourist_experience .",
			 "#irtouristan @tourist_experience ارسال بهترین تجربه های سفر به ",
			 "@tourist_experience . best travel distinations  #توریسم_داخلی",
			 "#گردشگری_تهران_ایران  .به @tourist_experience بیاید و بهترین عکسای مکان های توریستی که رفتید رو بفرستید",
			 "come to @tourist_experience and share your experiences in travel distinations",
			 "به @tourist_experience بیاید و تجربیات سفرتون از مناطق زیبا رو به اشتراک بذارید.",
			 "سفر به جای جای ایران زیبا با @tourist_experience",
			 "if you want to have best travelexperience follow @tourist_experience"
	 ]
	 // Comment: "You never walk alone."
	 // Comment: "سفر به جای جای ایران زیبا با @tourist_experience"
	 // Comment: "if you want to have best travelexperience follow @tourist_experience"
}

var ghost = new Ghost(input,showMe);


debugger;
ghost.makeAliveMe();

