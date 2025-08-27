const notices = [
  {
    type: "Concert",
    draft: `Hello, this is YG Entertainment. 

[Concert Information]  
Date: -INSERT DATE HERE-  
Venue: -INSERT VENUE HERE-  
Time: -INSERT TIME HERE-  

More details on the tour will be released at a later date.  

We look forward to BLINK's love and support.  
Thank you.`,
  },

  {
    type: "Absence",
    draft: `Hello, this is YG Entertainment. 

We would like to inform you about {member}'s current status and their activities moving forward.  

-INSERT DETAILS HERE-  

While the artist is determined to participate in promotional activities, the company is prioritizing their health above all else and will exercise flexibility in their schedule throughout the promotion period.  

We regret to inform you that for the reasons stated above, {member} will not be able to participate in the activities scheduled for this week.  

We extend our sincerest apologies and ask for your kind understanding on the matter.`,
  },

  {
    type: "Release",
    draft: `Hello, this is YG Entertainment. 

On -DAY, DATE, TIME-, {member}'s -TITLE HERE- will be released.  

We look forward to BLINK's enthusiastic love and support.`,
  },

  {
    type: "Ticketing",
    draft: `Hello, this is YG Entertainment. 

We are pleased to share information on the ticket reservation for the -CONCERT NAME HERE-.  

Ticket vendor: -TICKET VENDOR HERE-  
BLINK Presale Registration period: -INSERT DATE AND TIME HERE-  
BLINK Presale date: -INSERT DATE AND TIME HERE-  
General sale: -INSERT DATE AND TIME HERE-  

To participate in the BLINK MEMBERSHIP PRESALE, you must apply through Weverse. Only BLINK MEMBERSHIP (GLOBAL) holders are eligible to participate in the BLINK MEMBERSHIP PRESALE.  

Please take note of the schedule, as registration is not possible outside of the registration period.  

We look forward to the continued love and support from all BLINKs.  
Thank you.`,
  },

  {
    type: "Event",
    draft: `Hello, this is YG Entertainment. 

We would like to provide you with information on how to best enjoy your visit to the -EVENT NAME-.  

[Event Info]  
Dates: -DATE HERE-  
Hours: -HOURS HERE-  
Location: -LOCATION HERE-  

[Event Policy]  
-EVENT POLICY HERE-  

[Purchase Policy]  
-PURCHASE POLICY HERE-  

Thank you.`,
  },
];

module.exports = notices;
