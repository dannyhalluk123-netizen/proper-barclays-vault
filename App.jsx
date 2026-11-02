import React, { useState, useMemo } from 'react';
import {
  Shuffle,
  Search,
  Trophy,
  Flame,
  Sparkles,
  Radio,
  Play,
  ExternalLink,
  UserCheck,
  CircleDot,
  Shirt,
  MapPin,
  Film,
  Heart,
  X
} from 'lucide-react';

const ERA_FILTERS = [
  'All Eras',
  '1990s',
  '2000s',
  '2010s'
];

const CATEGORY_TAGS = [
  'All Categories',
  'Proper Volley',
  'Thunderbastard',
  'Solo Run',
  'Free Kick',
  'Last Minute',
  'Proper Tackle',
  'Iconic Moment'
];

const INITIAL_MOMENTS = [
  {
    id: 1,
    title: "Papiss Cissé's Physics Defying Banana Volley",
    player: "Papiss Cissé",
    homeTeam: "Chelsea",
    awayTeam: "Newcastle",
    score: "0 to 2",
    season: "2011/12",
    date: "2 May 2012",
    era: "2010s",
    category: "Thunderbastard",
    ball: "Nike Seitiro Hi Vis",
    sponsor: "Virgin Money",
    stadium: "Stamford Bridge",
    referee: "Mark Halsey",
    viewCount: 1334104,
    youtubeId: "I1MpJJ4tfLY",
    startTime: 0,
    commentary: "\"Cissé... OH! UNBELIEVABLE! What a goal from Papiss Cissé! That is sensational!\"",
    description: "Shola Ameobi chests down a throw in on the left touchline and Cissé casually lashes an outside of the boot swerving rocket from 37 yards over Petr Čech."
  },
  {
    id: 2,
    title: "Tony Yeboah's Crossbar Shaking Volley vs Liverpool",
    player: "Tony Yeboah",
    homeTeam: "Leeds Utd",
    awayTeam: "Liverpool",
    score: "1 to 0",
    season: "1995/96",
    date: "21 Aug 1995",
    era: "1990s",
    category: "Proper Volley",
    ball: "Mitre Ultimax",
    sponsor: "Thistle Hotels",
    stadium: "Elland Road",
    referee: "David Elleray",
    viewCount: 157155,
    youtubeId: "gq4-z7mI_Cw",
    startTime: 0,
    commentary: "\"Rod Wallace... knocked down... YEBOAH! OH, WHAT A GOAL! Absolute thunderbolt!\"",
    description: "Rod Wallace heads the ball back into space and Tony Yeboah unleashes a first time volley that crashes off the underside of the crossbar and nearly breaks the net."
  },
  {
    id: 3,
    title: "Tony Yeboah Juggles & Smashes Wimbledon",
    player: "Tony Yeboah",
    homeTeam: "Wimbledon",
    awayTeam: "Leeds Utd",
    score: "2 to 4",
    season: "1995/96",
    date: "23 Sep 1995",
    era: "1990s",
    category: "Thunderbastard",
    ball: "Mitre Ultimax",
    sponsor: "Thistle Hotels",
    stadium: "Selhurst Park",
    referee: "Alan Wilkie",
    viewCount: 111699,
    youtubeId: "RRHSP_KXigs",
    startTime: 0,
    commentary: "\"Yeboah controls it on his chest, dummies one... BOOOM! In off the bar AGAIN!\"",
    description: "Chest control, knee juggle, dummy past a sliding defender, and an unstoppable half volley violently slamming off the crossbar."
  },
  {
    id: 4,
    title: "Paolo Di Canio's Airborne Scissors Volley",
    player: "Paolo Di Canio",
    homeTeam: "West Ham",
    awayTeam: "Wimbledon",
    score: "2 to 1",
    season: "1999/00",
    date: "26 Mar 2000",
    era: "2000s",
    category: "Proper Volley",
    ball: "Mitre Ultimax",
    sponsor: "Dr. Martens",
    stadium: "Upton Park",
    referee: "Uriah Rennie",
    viewCount: 1403570,
    youtubeId: "bwL-QDZg2BY",
    startTime: 0,
    commentary: "\"Trevor Sinclair with the diagonal ball... DI CANIO! Goal of the season!\"",
    description: "With both feet off the turf, Paolo Di Canio meets Trevor Sinclair's 50 yard cross on the full volley with the outside of his right boot from a tight angle."
  },
  {
    id: 5,
    title: "Dennis Bergkamp's Impossible Spin vs Newcastle",
    player: "Dennis Bergkamp",
    homeTeam: "Newcastle",
    awayTeam: "Arsenal",
    score: "0 to 2",
    season: "2001/02",
    date: "2 Mar 2002",
    era: "2000s",
    category: "Solo Run",
    ball: "Nike Geo Merlin",
    sponsor: "Sega / Dreamcast",
    stadium: "St James' Park",
    referee: "Graham Poll",
    viewCount: 4315720,
    youtubeId: "IicmCu47pMo",
    startTime: 0,
    commentary: "\"Pires to Bergkamp... What a turn! Brilliant goal! Nikos Dabizas still doesn't know where he is!\"",
    description: "One deft flick with his left boot spins the ball around one side of Nikos Dabizas while Bergkamp spins the other way and slots coolly past Shay Given."
  },
  {
    id: 6,
    title: "Eric Cantona's Chip & Collar Popped 360 Stare",
    player: "Eric Cantona",
    homeTeam: "Man Utd",
    awayTeam: "Sunderland",
    score: "5 to 0",
    season: "1996/97",
    date: "21 Dec 1996",
    era: "1990s",
    category: "Iconic Moment",
    ball: "Mitre Ultimax",
    sponsor: "Sharp",
    stadium: "Old Trafford",
    referee: "Roger Dilkes",
    viewCount: 399639,
    youtubeId: "JpyJtjLoDKg",
    startTime: 0,
    commentary: "\"Cantona drives forward, one two with McClair... oh, look at that chip! Majestic!\"",
    description: "Cantona dances through two tackles, plays a give and go with Brian McClair, chips Lionel Perez into the top corner, and slowly turns in a circle soaking in Old Trafford."
  },
  {
    id: 7,
    title: "Wayne Rooney's Rage Volley Mid Argument",
    player: "Wayne Rooney",
    homeTeam: "Man Utd",
    awayTeam: "Newcastle",
    score: "2 to 1",
    season: "2004/05",
    date: "24 Apr 2005",
    era: "2000s",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow",
    sponsor: "Vodafone",
    stadium: "Old Trafford",
    referee: "Neale Barry",
    viewCount: 703644,
    youtubeId: "pPHqRpJ7tLY",
    startTime: 0,
    commentary: "\"Rooney is still complaining to the referee... and now ROONEY! Oh, take a bow!\"",
    description: "Seconds after screaming at referee Neale Barry, Rooney takes out his fury on a looping clearance from 30 yards, rocketing it past Shay Given."
  },
  {
    id: 8,
    title: "Matt Le Tissier's Double Sombrero Flick at The Dell",
    player: "Matt Le Tissier",
    homeTeam: "Southampton",
    awayTeam: "Newcastle",
    score: "2 to 1",
    season: "1993/94",
    date: "24 Oct 1993",
    era: "1990s",
    category: "Solo Run",
    ball: "Mitre Pro Max",
    sponsor: "Dimplex",
    stadium: "The Dell",
    referee: "Keith Cooper",
    viewCount: 86545,
    youtubeId: "qkMVDt5c778",
    startTime: 0,
    commentary: "\"Backheeled into Le Tissier... flicks it over one, over another, and rolls it home! Pure genius!\"",
    description: "Le God collects a pass with his heel, flicks the ball over two Newcastle defenders in succession without it touching the grass, and slots it into the corner."
  },
  {
    id: 9,
    title: "Paul Scholes' 30 Yard Corner Volley off the Bar",
    player: "Paul Scholes",
    homeTeam: "Aston Villa",
    awayTeam: "Man Utd",
    score: "0 to 3",
    season: "2006/07",
    date: "23 Dec 2006",
    era: "2000s",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "AIG",
    stadium: "Villa Park",
    referee: "Steve Bennett",
    viewCount: 693102,
    youtubeId: "qwRX1urYQJI",
    startTime: 0,
    commentary: "\"Headed clear to the edge of the box... SCHOLES! Unbelievable technique!\"",
    description: "Giggs' corner is headed high into the air out to 28 yards, and Paul Scholes meets the dropping snow covered ball with a dipping volley off the underside of the bar."
  },
  {
    id: 10,
    title: "Thierry Henry's Flick & Spin Volley vs Man Utd",
    player: "Thierry Henry",
    homeTeam: "Arsenal",
    awayTeam: "Man Utd",
    score: "1 to 0",
    season: "2000/01",
    date: "1 Oct 2000",
    era: "2000s",
    category: "Proper Volley",
    ball: "Nike Geo Merlin",
    sponsor: "Dreamcast",
    stadium: "Highbury",
    referee: "Graham Barber",
    viewCount: 1023420,
    youtubeId: "AUTyZVsLxYE",
    startTime: 0,
    commentary: "\"Gilles Grimandi into Henry, back to goal... flicks it up and VOLLEYS IT OVER BARTHEZ!\"",
    description: "With Denis Irwin tight to his back, Henry flicks the ball up and pivots in one motion to loop an unstoppable volley over his compatriot Fabien Barthez."
  },
  {
    id: 11,
    title: "David Beckham's Halfway Line Lob at Selhurst Park",
    player: "David Beckham",
    homeTeam: "Wimbledon",
    awayTeam: "Man Utd",
    score: "0 to 3",
    season: "1996/97",
    date: "17 Aug 1996",
    era: "1990s",
    category: "Thunderbastard",
    ball: "Mitre Ultimax",
    sponsor: "Sharp",
    stadium: "Selhurst Park",
    referee: "Keith Burge",
    viewCount: 1944378,
    youtubeId: "u4tVnpwp8d4",
    startTime: 0,
    commentary: "\"Beckham from the halfway line... IT'S IN! Neil Sullivan is stranded!\"",
    description: "On the opening day of the 1996/97 season, a 21 year old David Beckham spots Neil Sullivan off his line and floats a 57 yard strike straight into the net."
  },
  {
    id: 12,
    title: "Steven Gerrard's Swerving Thunderbolt vs Boro",
    player: "Steven Gerrard",
    homeTeam: "Liverpool",
    awayTeam: "Middlesbrough",
    score: "1 to 1",
    season: "2004/05",
    date: "30 Apr 2005",
    era: "2000s",
    category: "Thunderbastard",
    ball: "Nike Total 90 Aerow",
    sponsor: "Carlsberg",
    stadium: "Anfield",
    referee: "Phil Dowd",
    viewCount: 116795,
    youtubeId: "FJzVe_2hRcc",
    startTime: 0,
    commentary: "\"Riise chests it down... GERRARD! Oh my goodness, what a hit from 35 yards!\"",
    description: "Stevie G takes a bouncing pass on the half volley from 35 yards and hits a rising, swerving missile into Mark Schwarzer's top corner."
  },
  {
    id: 13,
    title: "Hatem Ben Arfa's 70 Yard Solo Slalom vs Bolton",
    player: "Hatem Ben Arfa",
    homeTeam: "Newcastle",
    awayTeam: "Bolton",
    score: "2 to 0",
    season: "2011/12",
    date: "9 Apr 2012",
    era: "2010s",
    category: "Solo Run",
    ball: "Nike Seitiro",
    sponsor: "Virgin Money",
    stadium: "St James' Park",
    referee: "Lee Probert",
    viewCount: 686510,
    youtubeId: "WpuFePHvLUM",
    startTime: 0,
    commentary: "\"Ben Arfa turns inside his own half... still going... past four! Brilliant solo goal!\"",
    description: "The ultimate streets won't forget Barclaysman spins in the centre circle and glides past four Bolton players in a straight line before slotting past Ádám Bogdán."
  },
  {
    id: 14,
    title: "Adel Taarabt's Nutmeg & Outside Boot Magic",
    player: "Adel Taarabt",
    homeTeam: "QPR",
    awayTeam: "Fulham",
    score: "2 to 1",
    season: "2012/13",
    date: "15 Dec 2012",
    era: "2010s",
    category: "Solo Run",
    ball: "Nike Maxim Hi Vis",
    sponsor: "AirAsia",
    stadium: "Loftus Road",
    referee: "Martin Atkinson",
    viewCount: 47876,
    youtubeId: "4Hz_4LRxtvM",
    startTime: 0,
    commentary: "\"Taarabt with his gloves on and socks rolled down... exquisite finish with the outside of the boot!\"",
    description: "Wearing black woollen gloves with low socks, Taarabt toys with Brede Hangeland before curling an outside of the foot beauty into the corner."
  },
  {
    id: 15,
    title: "Jay Jay Okocha's Rainbow Flick on Ray Parlour",
    player: "Jay Jay Okocha",
    homeTeam: "Bolton",
    awayTeam: "Arsenal",
    score: "2 to 2",
    season: "2002/03",
    date: "26 Apr 2003",
    era: "2000s",
    category: "Iconic Moment",
    ball: "Nike Geo Merlin II",
    sponsor: "Reebok",
    stadium: "Reebok Stadium",
    referee: "Andy D'Urso",
    viewCount: 484275,
    youtubeId: "NQVV3hA0MGQ",
    startTime: 0,
    commentary: "\"Okocha trapped by the corner flag... OH LOOK AT THAT! Over Ray Parlour's head!\"",
    description: "So good they named him twice: Jay Jay Okocha casually rainbows the ball clean over a bewildered Ray Parlour while protecting Bolton's survival."
  },
  {
    id: 16,
    title: "Jay Jay Okocha's Relegation Saving Rocket vs West Ham",
    player: "Jay Jay Okocha",
    homeTeam: "Bolton",
    awayTeam: "West Ham",
    score: "1 to 0",
    season: "2002/03",
    date: "19 Apr 2003",
    era: "2000s",
    category: "Thunderbastard",
    ball: "Nike Geo Merlin II",
    sponsor: "Reebok",
    stadium: "Reebok Stadium",
    referee: "Uriah Rennie",
    viewCount: 46188,
    youtubeId: "OX6XC8n7F2w",
    startTime: 0,
    commentary: "\"Okocha steps past one, unleashes... UNSTOPPABLE! David James didn't even move!\"",
    description: "In a huge relegation battle, Okocha dribbles from midfield and bends a vicious 28 yard strike off the inside of the stanchion."
  },
  {
    id: 17,
    title: "Rory Delap's Towel Dried Javelin Throw Chaos",
    player: "Rory Delap",
    homeTeam: "Stoke City",
    awayTeam: "Arsenal",
    score: "2 to 1",
    season: "2008/09",
    date: "1 Nov 2008",
    era: "2000s",
    category: "Iconic Moment",
    ball: "Nike Total 90 Omni Hi Vis",
    sponsor: "Britannia",
    stadium: "Britannia Stadium",
    referee: "Rob Styles",
    viewCount: 214161,
    youtubeId: "RoF-S60E1aE",
    startTime: 0,
    commentary: "\"Delap dries the ball with the towel inside his vest... flat 45 yard missile into the six yard box!\"",
    description: "Arsène Wenger complained that Delap's throws were unfair as Stoke turned every throw in at a windy Britannia Stadium into a flat trajectory corner kick."
  },
  {
    id: 18,
    title: "Morten Gamst Pedersen's Left Footed Volley at Ewood",
    player: "Morten Gamst Pedersen",
    homeTeam: "Blackburn",
    awayTeam: "Fulham",
    score: "2 to 1",
    season: "2005/06",
    date: "20 Aug 2005",
    era: "2000s",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow",
    sponsor: "Lonsdale",
    stadium: "Ewood Park",
    referee: "Mike Dean",
    viewCount: 83851,
    youtubeId: "JlFYo0NwN8E",
    startTime: 0,
    commentary: "\"Crossed to the back post... GAMST PEDERSEN! What a sweet left foot that man has!\"",
    description: "Norwegian Barclays royalty Morten Gamst Pedersen watches a deep cross drop over his shoulder and hammers a first time volley into the roof of the net."
  },
  {
    id: 19,
    title: "Laurent Robert's Karate Scorpion Flick vs Fulham",
    player: "Laurent Robert",
    homeTeam: "Newcastle",
    awayTeam: "Fulham",
    score: "1 to 4",
    season: "2004/05",
    date: "7 Nov 2004",
    era: "2000s",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow",
    sponsor: "Northern Rock",
    stadium: "St James' Park",
    referee: "Howard Webb",
    viewCount: 7623,
    youtubeId: "GxmOlqwsULc",
    startTime: 0,
    commentary: "\"Laurent Robert leaps in the air... wait, he's backheeled it in mid air into the top corner!\"",
    description: "Laurent Robert jumps with his back to goal and flicks the ball with the outside of his heel at head height over Edwin van der Sar."
  },
  {
    id: 20,
    title: "Laurent Robert's Double Screamer Masterclass vs Spurs",
    player: "Laurent Robert",
    homeTeam: "Newcastle",
    awayTeam: "Tottenham",
    score: "4 to 0",
    season: "2003/04",
    date: "13 Dec 2003",
    era: "2000s",
    category: "Thunderbastard",
    ball: "Nike Geo Merlin",
    sponsor: "Northern Rock",
    stadium: "St James' Park",
    referee: "Alan Wiley",
    viewCount: 9714,
    youtubeId: "Mo1QNVX8ZNQ",
    startTime: 0,
    commentary: "\"Robert from 35 yards... Kasey Keller had no chance! Look at the swerve on that!\"",
    description: "Two outrageous strikes in the same afternoon: a 30 yard half volley into the top corner followed by a 35 yard knuckleball thunderbolt."
  },
  {
    id: 21,
    title: "Michu's £2m Debut Brace & Ear Cup Celebration",
    player: "Michu",
    homeTeam: "QPR",
    awayTeam: "Swansea City",
    score: "0 to 5",
    season: "2012/13",
    date: "18 Aug 2012",
    era: "2010s",
    category: "Iconic Moment",
    ball: "Nike Maxim",
    sponsor: "32Red",
    stadium: "Loftus Road",
    referee: "Lee Probert",
    viewCount: 436023,
    youtubeId: "4Qe4Q27TmOw",
    startTime: 0,
    commentary: "\"Michu curls it into the roof of the net! What a bargain at two million pounds!\"",
    description: "Baggy white and gold Centenary shirt, floppy hair, and the iconic hand twirl ear celebration as Michu announces the greatest single season wonder run in history."
  },
  {
    id: 22,
    title: "Ledley King's Superhuman Recovery Tackle on Arjen Robben",
    player: "Ledley King",
    homeTeam: "Tottenham",
    awayTeam: "Chelsea",
    score: "2 to 1",
    season: "2006/07",
    date: "5 Nov 2006",
    era: "2000s",
    category: "Proper Tackle",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "Mansion",
    stadium: "White Hart Lane",
    referee: "Graham Poll",
    viewCount: 412890,
    youtubeId: "SjxmyjLp9tg",
    startTime: 0,
    commentary: "\"Robben is clean through on Robinson... LEDLEY KING! What a recovery tackle!\"",
    description: "With one working knee and zero cartilage, Ledley King eats up 15 yards of turf to hook the ball cleanly off Arjen Robben's left boot just as he pulls the trigger."
  },
  {
    id: 23,
    title: "Michael Essien's Outrageous Outside Foot Swerver",
    player: "Michael Essien",
    homeTeam: "Chelsea",
    awayTeam: "Arsenal",
    score: "1 to 1",
    season: "2006/07",
    date: "10 Dec 2006",
    era: "2000s",
    category: "Thunderbastard",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "Samsung Mobile",
    stadium: "Stamford Bridge",
    referee: "Alan Wiley",
    viewCount: 176758,
    youtubeId: "A-Mu7q3PE0k",
    startTime: 0,
    commentary: "\"Lampard lays it back... ESSIEN! OH, WHAT A GOAL! Look at the bend on that!\"",
    description: "Lampard rolls the ball back to 35 yards and Essien hits it first time, starting three yards outside the post before bending violently inside Jens Lehmann's upright."
  },
  {
    id: 24,
    title: "Robin van Persie's Flying Superman Volley at Charlton",
    player: "Robin van Persie",
    homeTeam: "Charlton",
    awayTeam: "Arsenal",
    score: "1 to 2",
    season: "2006/07",
    date: "30 Sep 2006",
    era: "2000s",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow II",
    sponsor: "Fly Emirates",
    stadium: "The Valley",
    referee: "Mark Clattenburg",
    viewCount: 535702,
    youtubeId: "F8Ehw1LvULk",
    startTime: 0,
    commentary: "\"Eboué crosses... VAN PERSIE! Airborne at the edge of the box!\"",
    description: "Running at full sprint, Van Persie launches himself into the air and connects cleanly with his left boot to rocket Eboué's cross into the roof of the net."
  },
  {
    id: 25,
    title: "Cristiano Ronaldo's Knuckleball Masterpiece vs Pompey",
    player: "Cristiano Ronaldo",
    homeTeam: "Man Utd",
    awayTeam: "Portsmouth",
    score: "2 to 0",
    season: "2007/08",
    date: "30 Jan 2008",
    era: "2000s",
    category: "Free Kick",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "AIG",
    stadium: "Old Trafford",
    referee: "Martin Atkinson",
    viewCount: 774360,
    youtubeId: "3hcfvObigQg",
    startTime: 0,
    commentary: "\"Three steps back... RONALDO! The best free kick you will ever see in the Premier League!\"",
    description: "Power stance, deep exhale, zero spin: the ball clears the wall and dives straight into the postage stamp corner as David James stands frozen."
  },
  {
    id: 26,
    title: "Wayne Rooney's 16 Year Old Debut Screamer vs Arsenal",
    player: "Wayne Rooney",
    homeTeam: "Everton",
    awayTeam: "Arsenal",
    score: "2 to 1",
    season: "2002/03",
    date: "19 Oct 2002",
    era: "2000s",
    category: "Last Minute",
    ball: "Nike Geo Merlin II",
    sponsor: "Kejian",
    stadium: "Goodison Park",
    referee: "Uriah Rennie",
    viewCount: 500063,
    youtubeId: "7Nluk8PdQI8",
    startTime: 0,
    commentary: "\"A brilliant touch by Rooney... OH, A BRILLIANT GOAL! Remember the name: Wayne Rooney!\"",
    description: "Five days before his 17th birthday, Rooney plucks a high ball out of the sky and curls a 28 yard dipping shot off the crossbar to end Arsenal's 30 game unbeaten run."
  },
  {
    id: 27,
    title: "Thierry Henry's 80 Yard North London Derby Solo Run",
    player: "Thierry Henry",
    homeTeam: "Arsenal",
    awayTeam: "Tottenham",
    score: "3 to 0",
    season: "2002/03",
    date: "16 Nov 2002",
    era: "2000s",
    category: "Solo Run",
    ball: "Nike Geo Merlin II",
    sponsor: "O2",
    stadium: "Highbury",
    referee: "Mike Riley",
    viewCount: 187203,
    youtubeId: "yTTdH1ybU88",
    startTime: 0,
    commentary: "\"Henry from inside his own half... turns Carr inside out, slots it home and slides on his knees!\"",
    description: "Henry picks up possession 25 yards inside his own half, glides past Matthew Etherington, twists Stephen Carr and Ledley King, and sprints the entire pitch to slide on his knees."
  },
  {
    id: 28,
    title: "Thierry Henry's Invincibles Slalom vs Liverpool",
    player: "Thierry Henry",
    homeTeam: "Arsenal",
    awayTeam: "Liverpool",
    score: "4 to 2",
    season: "2003/04",
    date: "9 Apr 2004",
    era: "2000s",
    category: "Solo Run",
    ball: "Nike Geo Merlin",
    sponsor: "O2",
    stadium: "Highbury",
    referee: "Alan Wiley",
    viewCount: 3501572,
    youtubeId: "7U8w7MJKkQY",
    startTime: 225,
    commentary: "\"Henry past Hamann... Carragher stumbles into Biscan! Thierry Henry is unstoppable!\"",
    description: "On Good Friday 2004, Henry drops a shoulder to leave Jamie Carragher colliding with Igor Bišćan and rescues the Invincibles season."
  },
  {
    id: 29,
    title: "Paolo Di Canio Pushes Referee Paul Alcock Over",
    player: "Paolo Di Canio",
    homeTeam: "Sheff Wed",
    awayTeam: "Arsenal",
    score: "1 to 0",
    season: "1998/99",
    date: "26 Sep 1998",
    era: "1990s",
    category: "Iconic Moment",
    ball: "Mitre Ultimax",
    sponsor: "Sanderson",
    stadium: "Hillsborough",
    referee: "Paul Alcock",
    viewCount: 735649,
    youtubeId: "J9CLiDqYfLc",
    startTime: 0,
    commentary: "\"Red card for Di Canio... AND HE'S PUSHED THE REFEREE OVER! Look at Paul Alcock stumble!\"",
    description: "After clashing with Martin Keown, Di Canio shoves referee Paul Alcock in the chest, sending him stumbling backwards for five yards."
  },
  {
    id: 30,
    title: "Roy Keane & Patrick Vieira Bone Crunching Highbury Battles",
    player: "Roy Keane & Patrick Vieira",
    homeTeam: "Arsenal",
    awayTeam: "Man Utd",
    score: "2 to 4",
    season: "2004/05",
    date: "1 Feb 2005",
    era: "2000s",
    category: "Proper Tackle",
    ball: "Nike Total 90 Aerow Hi Vis",
    sponsor: "O2 / Vodafone",
    stadium: "Highbury",
    referee: "Graham Poll",
    viewCount: 2863272,
    youtubeId: "-ue1BFiKTtI",
    startTime: 0,
    commentary: "\"I'll see you out there! Shut your mouth! And now flying into full blooded reducers on the pitch!\"",
    description: "From the Highbury tunnel war of words straight into thunderous midfield reducers, Keane and Vieira defined the ferocity of Golden Era Barclays."
  },
  {
    id: 31,
    title: "Cheick Tioté's 4 vs 4 Comeback Boom Boom Volley",
    player: "Cheick Tioté",
    homeTeam: "Newcastle",
    awayTeam: "Arsenal",
    score: "4 to 4",
    season: "2010/11",
    date: "5 Feb 2011",
    era: "2010s",
    category: "Last Minute",
    ball: "Nike Total 90 Tracer Hi Vis",
    sponsor: "Northern Rock",
    stadium: "St James' Park",
    referee: "Phil Dowd",
    viewCount: 248045,
    youtubeId: "lpauxRuI_B0",
    startTime: 0,
    commentary: "\"Four nil down at half time... TIOTÉ! BOOM BOOM CHEICK CHEICK THE ROOM! Four all!\"",
    description: "The late, great Cheick Tioté scores his only ever Premier League goal: a swerving 25 yard weak foot volley to complete a four goal comeback in the 87th minute."
  },
  {
    id: 32,
    title: "Dimitri Payet's Gravity Bending Free Kick vs Palace",
    player: "Dimitri Payet",
    homeTeam: "West Ham",
    awayTeam: "Crystal Palace",
    score: "2 to 2",
    season: "2015/16",
    date: "2 Apr 2016",
    era: "2010s",
    category: "Free Kick",
    ball: "Nike Ordem 3",
    sponsor: "Betway",
    stadium: "Upton Park",
    referee: "Mark Clattenburg",
    viewCount: 599605,
    youtubeId: "RbQxaWX5QfU",
    startTime: 0,
    commentary: "\"Payet whips it... HOW HAS THAT GONE IN?! It went 15 feet above the bar and dipped into the opposite corner!\"",
    description: "In the farewell season at the Boleyn Ground, Payet hits a free kick that rises high into the East London sky before dipping violently into the far top corner."
  },
  {
    id: 33,
    title: "Sol Campbell's Endless Sliding Tackle at Old Trafford",
    player: "Sol Campbell",
    homeTeam: "Man Utd",
    awayTeam: "Arsenal",
    score: "0 to 1",
    season: "2001/02",
    date: "8 May 2002",
    era: "2000s",
    category: "Proper Tackle",
    ball: "Nike Geo Merlin",
    sponsor: "Sega / Dreamcast",
    stadium: "Old Trafford",
    referee: "Paul Durkin",
    viewCount: 215400,
    youtubeId: "gM1Z1F2e6B0",
    startTime: 0,
    commentary: "\"Sol Campbell comes across like a freight train! Took the ball, the man, and half the Old Trafford turf!\"",
    description: "On the night Arsenal clinched the title at Old Trafford, Sol Campbell thundered into a bone rattling touchline slide tackle that echoed around Manchester."
  },
  {
    id: 34,
    title: "Wayne Rooney's Manchester Derby Overhead Kick",
    player: "Wayne Rooney",
    homeTeam: "Man Utd",
    awayTeam: "Man City",
    score: "2 to 1",
    season: "2010/11",
    date: "12 Feb 2011",
    era: "2010s",
    category: "Proper Volley",
    ball: "Nike Total 90 Tracer Hi Vis",
    sponsor: "Aon",
    stadium: "Old Trafford",
    referee: "Andre Marriner",
    viewCount: 13345644,
    youtubeId: "v7E1WJVMhzA",
    startTime: 0,
    commentary: "\"Nani crosses... ROONEY! IT DEFIES DESCRIPTION! Bicycle kick into the top corner!\"",
    description: "Level in the 78th minute of the Manchester derby, Rooney adjusts to a deflected Nani cross and executes an acrobatic overhead kick into Joe Hart's top corner."
  },
  {
    id: 35,
    title: "Alan Shearer's Rocket Half Volley vs Everton",
    player: "Alan Shearer",
    homeTeam: "Newcastle",
    awayTeam: "Everton",
    score: "2 to 1",
    season: "2002/03",
    date: "1 Dec 2002",
    era: "2000s",
    category: "Thunderbastard",
    ball: "Nike Geo Merlin II",
    sponsor: "NTL",
    stadium: "St James' Park",
    referee: "Mark Halsey",
    viewCount: 364380,
    youtubeId: "fgNObY2nqTY",
    startTime: 0,
    commentary: "\"Knocked down by Dyer... SHEARER! One hand in the air, the net is still rippling!\"",
    description: "Shearer watches the ball bounce once 28 yards out and unleashes a laser guided strike that stays four feet off the turf all the way into Richard Wright's net."
  },
  {
    id: 36,
    title: "John Arne Riise's Release the Kraken Free Kick",
    player: "John Arne Riise",
    homeTeam: "Liverpool",
    awayTeam: "Man Utd",
    score: "3 to 1",
    season: "2001/02",
    date: "4 Nov 2001",
    era: "2000s",
    category: "Free Kick",
    ball: "Nike Geo Merlin",
    sponsor: "Carlsberg",
    stadium: "Anfield",
    referee: "Graham Poll",
    viewCount: 635904,
    youtubeId: "LhdSdGfbBow",
    startTime: 0,
    commentary: "\"Hamann touches it... RIISE! OH MY GOODNESS! That almost tore the goalposts out!\"",
    description: "Dietmar Hamann rolls the free kick a yard and Riise unleashes a 70mph left footed thunderbolt into the top corner before whipping his shirt off."
  },
  {
    id: 37,
    title: "Tugay's Cigarette Fueled Rocket Volley at Spurs",
    player: "Tugay Kerimoğlu",
    homeTeam: "Tottenham",
    awayTeam: "Blackburn",
    score: "1 to 1",
    season: "2006/07",
    date: "19 Nov 2006",
    era: "2000s",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "bet24",
    stadium: "White Hart Lane",
    referee: "Mike Dean",
    viewCount: 209032,
    youtubeId: "_5oLISbbemA",
    startTime: 0,
    commentary: "\"Cleared to the edge of the area... TUGAY! Every single goal he scores is a 30 yard screamer!\"",
    description: "36 year old Turkish maestro Tugay, famous for never scoring tap ins, slices across a dropping ball on the edge of the box to arrow it past Paul Robinson."
  },
  {
    id: 38,
    title: "Matthew Taylor's 45 Yard Dipping Volley at Fratton Park",
    player: "Matthew Taylor",
    homeTeam: "Portsmouth",
    awayTeam: "Everton",
    score: "2 to 0",
    season: "2006/07",
    date: "9 Dec 2006",
    era: "2000s",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "OKI",
    stadium: "Fratton Park",
    referee: "Mark Clattenburg",
    viewCount: 25406,
    youtubeId: "k3wo8F_nMoc",
    startTime: 0,
    commentary: "\"Kanu lays it back... MATTHEW TAYLOR FROM 45 YARDS! Tim Howard is beaten from a mile out!\"",
    description: "Wearing Pompey's iconic OKI kit, left back Matty Taylor hits a bouncing ball from near the centre circle on the full volley over Tim Howard."
  },
  {
    id: 39,
    title: "Nemanja Vidić Dives Head First Into the Turf to Block",
    player: "Nemanja Vidić",
    homeTeam: "Man Utd",
    awayTeam: "Swansea City",
    score: "2 to 0",
    season: "2013/14",
    date: "11 Jan 2014",
    era: "2010s",
    category: "Proper Tackle",
    ball: "Nike Incyte Hi Vis",
    sponsor: "Aon",
    stadium: "Old Trafford",
    referee: "Chris Foy",
    viewCount: 318450,
    youtubeId: "eb3p9s61m3A",
    startTime: 0,
    commentary: "\"Vidić throws his own head at ground level in front of a swinging boot! Pure Serbian steel!\"",
    description: "After losing his footing, Nemanja Vidić launches his entire body horizontally two inches off the grass to block a shot with his face."
  },
  {
    id: 40,
    title: "Danny Rose's North London Derby Debut Volley",
    player: "Danny Rose",
    homeTeam: "Tottenham",
    awayTeam: "Arsenal",
    score: "2 to 1",
    season: "2009/10",
    date: "14 Apr 2010",
    era: "2010s",
    category: "Proper Volley",
    ball: "Nike Total 90 Ascente",
    sponsor: "Mansion",
    stadium: "White Hart Lane",
    referee: "Mark Clattenburg",
    viewCount: 161666,
    youtubeId: "ibSqYaGTt8Y",
    startTime: 0,
    commentary: "\"Almunia punches it clear... DANNY ROSE ON HIS PREMIER LEAGUE DEBUT!\"",
    description: "Making his first ever Premier League appearance in a North London Derby, 19 year old Danny Rose meets Almunia's punch from 30 yards on the full volley."
  },
  {
    id: 41,
    title: "Maynor Figueroa Free Kick From Inside His Own Half",
    player: "Maynor Figueroa",
    homeTeam: "Stoke City",
    awayTeam: "Wigan Athletic",
    score: "2 to 2",
    season: "2009/10",
    date: "12 Dec 2009",
    era: "2000s",
    category: "Free Kick",
    ball: "Nike Total 90 Ascente Hi Vis",
    sponsor: "188BET",
    stadium: "Britannia Stadium",
    referee: "Mike Dean",
    viewCount: 120692,
    youtubeId: "XDSkoJ_RS_I",
    startTime: 0,
    commentary: "\"Quick free kick taken by Figueroa FROM HIS OWN HALF! Thomas Sørensen is caught out!\"",
    description: "Before Stoke can even line up after a foul inside Wigan's half, Honduran defender Maynor Figueroa blasts a 61 yard free kick straight into the top corner."
  },
  {
    id: 42,
    title: "Pajtim Kasami's Chest & Van Basten Volley at Palace",
    player: "Pajtim Kasami",
    homeTeam: "Crystal Palace",
    awayTeam: "Fulham",
    score: "1 to 4",
    season: "2013/14",
    date: "21 Oct 2013",
    era: "2010s",
    category: "Proper Volley",
    ball: "Nike Incyte",
    sponsor: "Marathonbet",
    stadium: "Selhurst Park",
    referee: "Lee Mason",
    viewCount: 394312,
    youtubeId: "OWEtvlJZfA4",
    startTime: 0,
    commentary: "\"Sascha Riether clips it forward... KASAMI! Chest control at full sprint and weak foot volley!\"",
    description: "On a Monday Night Football masterclass, Swiss midfielder Pajtim Kasami chests down a 45 yard pass on the run and volleys with his weaker right foot over Julian Speroni."
  },
  {
    id: 43,
    title: "Didier Drogba's Chest & Half Turn Volley vs Liverpool",
    player: "Didier Drogba",
    homeTeam: "Chelsea",
    awayTeam: "Liverpool",
    score: "1 to 0",
    season: "2006/07",
    date: "17 Sep 2006",
    era: "2000s",
    category: "Thunderbastard",
    ball: "Nike Total 90 Aerow II",
    sponsor: "Samsung Mobile",
    stadium: "Stamford Bridge",
    referee: "Mike Riley",
    viewCount: 28325,
    youtubeId: "bL03tfv6fCg",
    startTime: 0,
    commentary: "\"Drogba chests it with Carragher on his back... SPINS AND FIRES! Reina didn't move!\"",
    description: "Holding off Jamie Carragher on the edge of the box, Drogba chests the ball down and pivots 180 degrees to rifle a left footed half volley inside the post."
  },
  {
    id: 44,
    title: "Portsmouth 7 vs 4 Reading: Highest Scoring Barclays Madness",
    player: "Benjani & Niko Kranjčar",
    homeTeam: "Portsmouth",
    awayTeam: "Reading",
    score: "7 to 4",
    season: "2007/08",
    date: "29 Sep 2007",
    era: "2000s",
    category: "Iconic Moment",
    ball: "Nike Total 90 Aerow II",
    sponsor: "OKI / Kyocera",
    stadium: "Fratton Park",
    referee: "Mark Halsey",
    viewCount: 117878,
    youtubeId: "EcbYYV64NZw",
    startTime: 0,
    commentary: "\"Six goals in the last 20 minutes! It's Portsmouth SEVEN, Reading FOUR!\"",
    description: "Eleven goals, missed penalties, own goals, Benjani hat trick, and zero defending in the highest scoring game in Premier League history."
  },
  {
    id: 45,
    title: "Temuri Ketsbaia Kicks the Advertising Hoardings to Pieces",
    player: "Temuri Ketsbaia",
    homeTeam: "Newcastle",
    awayTeam: "Bolton",
    score: "2 to 1",
    season: "1997/98",
    date: "17 Jan 1998",
    era: "1990s",
    category: "Last Minute",
    ball: "Mitre Ultimax",
    sponsor: "Newcastle Brown Ale",
    stadium: "St James' Park",
    referee: "Paul Durkin",
    viewCount: 37349,
    youtubeId: "xeMcXB29JTw",
    startTime: 0,
    commentary: "\"Ketsbaia scores a late winner... and now he's ripping his shirt off and attacking the McDonald's hoardings!\"",
    description: "Furious at being benched, Georgian cult hero Temuri Ketsbaia scores a 90th minute winner, hurls his shirt into the crowd, and violently boots the advertising boards."
  },
  {
    id: 46,
    title: "Jimmy Bullard's Half Time Team Talk Finger Wag Celebration",
    player: "Jimmy Bullard",
    homeTeam: "Man City",
    awayTeam: "Hull City",
    score: "1 to 1",
    season: "2009/10",
    date: "28 Nov 2009",
    era: "2000s",
    category: "Iconic Moment",
    ball: "Nike Total 90 Ascente Hi Vis",
    sponsor: "Totesport.com",
    stadium: "Etihad Stadium",
    referee: "Lee Probert",
    viewCount: 332515,
    youtubeId: "xnmAXUsoMAo",
    startTime: 0,
    commentary: "\"Bullard equalises... and all the Hull players sit in a circle while he recreates Phil Brown's pitchside team talk!\"",
    description: "A year after Phil Brown humiliated Hull by keeping them on the pitch at half time, Jimmy Bullard scores at the exact same end and mocks his own manager."
  },
  {
    id: 47,
    title: "Sergio Agüero's 93:20 Title Winning Chaos vs QPR",
    player: "Sergio Agüero",
    homeTeam: "Man City",
    awayTeam: "QPR",
    score: "3 to 2",
    season: "2011/12",
    date: "13 May 2012",
    era: "2010s",
    category: "Last Minute",
    ball: "Nike Seitiro",
    sponsor: "Etihad Airways",
    stadium: "Etihad Stadium",
    referee: "Mike Dean",
    viewCount: 12892637,
    youtubeId: "39VJVyKhbGM",
    startTime: 0,
    commentary: "\"Balotelli... AGÜEROOOOOO! I swear you'll never see anything like this ever again!\"",
    description: "Mario Balotelli's only Premier League assist: a sliding pass to Agüero at 93:20 to snatch the Premier League title in the dying seconds."
  },
  {
    id: 48,
    title: "Luis Suárez's 50 Yard Lob & 4 Goal Destruction of Norwich",
    player: "Luis Suárez",
    homeTeam: "Liverpool",
    awayTeam: "Norwich City",
    score: "5 to 1",
    season: "2013/14",
    date: "4 Dec 2013",
    era: "2010s",
    category: "Thunderbastard",
    ball: "Nike Incyte Hi Vis",
    sponsor: "Standard Chartered",
    stadium: "Anfield",
    referee: "Kevin Friend",
    viewCount: 521443,
    youtubeId: "V8Kfc7dIcaA",
    startTime: 0,
    commentary: "\"Suárez flicks it over Fer, volleys from 40 yards... Four Puskás contenders in a single match!\"",
    description: "A 45 yard dipping half volley, a sombrero flick and volley, a curling free kick, and a close range finish in the ultimate individual Barclays performance."
  },
  {
    id: 49,
    title: "Pedro Mendes' Halfway Line Ghost Goal Dropped by Roy Carroll",
    player: "Pedro Mendes & Roy Carroll",
    homeTeam: "Man Utd",
    awayTeam: "Tottenham",
    score: "0 to 0",
    season: "2004/05",
    date: "4 Jan 2005",
    era: "2000s",
    category: "Iconic Moment",
    ball: "Nike Total 90 Aerow Hi Vis",
    sponsor: "Thomson / Vodafone",
    stadium: "Old Trafford",
    referee: "Mark Clattenburg",
    viewCount: 146653,
    youtubeId: "CXL-YOlsDqw",
    startTime: 0,
    commentary: "\"Pedro Mendes shoots from 50 yards... Roy Carroll spills it A YARD OVER THE LINE and claws it back! No goal given!\"",
    description: "Pre VAR peak Barclays theatre: Pedro Mendes lobs Roy Carroll from the halfway line, Carroll drops the ball three feet inside the net, claws it out, and play continues."
  },
  {
    id: 50,
    title: "Johan Elmander's Cruyff Spin & Pirouette Goal at Wolves",
    player: "Johan Elmander",
    homeTeam: "Wolves",
    awayTeam: "Bolton",
    score: "2 to 3",
    season: "2010/11",
    date: "13 Nov 2010",
    era: "2010s",
    category: "Solo Run",
    ball: "Nike Total 90 Tracer Hi Vis",
    sponsor: "188BET",
    stadium: "Molineux",
    referee: "Peter Walton",
    viewCount: 198220,
    youtubeId: "iaEL9aX5WJ0",
    startTime: 0,
    commentary: "\"Elmander surrounded by four Wolves defenders... silky footwork! Is that Johan Elmander or Dennis Bergkamp?!\"",
    description: "Swedish target man Johan Elmander momentarily transforms into Ronaldinho, dragging the ball through three Wolves defenders in a phone booth before slotting home."
  }
];

// Calculate Proper Barclays Nostalgia Index (40% minimum up to 100%) based on YouTube clip views relative to all clips in the vault
const LOG_VIEWS = INITIAL_MOMENTS.map((m) => Math.log10(Math.max(m.viewCount, 1)));
const MIN_LOG_VIEWS = Math.min(...LOG_VIEWS);
const MAX_LOG_VIEWS = Math.max(...LOG_VIEWS);

const MOMENTS_WITH_INDEX = INITIAL_MOMENTS.map((m) => {
  const logVal = Math.log10(Math.max(m.viewCount, 1));
  const normalized =
    MAX_LOG_VIEWS > MIN_LOG_VIEWS
      ? (logVal - MIN_LOG_VIEWS) / (MAX_LOG_VIEWS - MIN_LOG_VIEWS)
      : 1;
  const nostalgicIndex = Math.max(40, Math.min(100, Math.round(40 + normalized * 60)));
  return {
    ...m,
    barclaysRating: nostalgicIndex
  };
});

export default function App() {
  const [moments] = useState(MOMENTS_WITH_INDEX);
  const [activeMoment, setActiveMoment] = useState(MOMENTS_WITH_INDEX[0]);
  const [showSearchVault, setShowSearchVault] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState('All Eras');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredMoments = useMemo(() => {
    return moments.filter((m) => {
      const matchesEra =
        selectedEra === 'All Eras' || m.era === selectedEra;
      const matchesCategory =
        selectedCategory === 'All Categories' || m.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.player.toLowerCase().includes(q) ||
        m.homeTeam.toLowerCase().includes(q) ||
        m.awayTeam.toLowerCase().includes(q) ||
        m.season.toLowerCase().includes(q) ||
        m.ball.toLowerCase().includes(q) ||
        m.sponsor.toLowerCase().includes(q) ||
        m.stadium.toLowerCase().includes(q);
      return matchesEra && matchesCategory && matchesSearch;
    });
  }, [moments, searchQuery, selectedEra, selectedCategory]);

  const handleSelectMoment = (moment) => {
    setActiveMoment(moment);
    setShowSearchVault(false);
  };

  const handleRandomRoulette = () => {
    const pool = moments.filter((m) => m.id !== activeMoment.id);
    const randomPick = pool[Math.floor(Math.random() * pool.length)] || moments[0];
    setActiveMoment(randomPick);
  };

  // Dynamic font size helper so the player name never gets cut off or truncated
  const getPlayerBadgeFontSize = (name) => {
    const len = name.length;
    if (len > 22) return 'text-[clamp(6.5px,1.75vw,10px)]';
    if (len > 17) return 'text-[clamp(7px,1.95vw,10.5px)]';
    if (len > 13) return 'text-[clamp(7.5px,2.15vw,11px)]';
    return 'text-[clamp(8.5px,2.35vw,11px)]';
  };

  // Dynamic font size helpers for title and description inside fixed height scoreboard box
  const getTitleFontSize = (title) => {
    const len = title.length;
    if (len > 48) return 'text-[clamp(11.5px,3.1vw,15px)]';
    if (len > 38) return 'text-[clamp(12px,3.3vw,16px)]';
    return 'text-[clamp(13px,3.6vw,17px)]';
  };

  const getDescriptionFontSize = (desc) => {
    const len = desc.length;
    if (len > 165) return 'text-[clamp(9.5px,2.45vw,11.5px)]';
    if (len > 135) return 'text-[clamp(10px,2.6vw,12px)]';
    return 'text-[clamp(10.5px,2.75vw,12.5px)]';
  };

  // Equal width wings for the score pill based on the longer team name so the score stays dead center
  const teamWingMinCh = Math.max(activeMoment.homeTeam.length, activeMoment.awayTeam.length) + 3;

  return (
    <div
      className="min-h-[100dvh] bg-[#041f12] text-white font-sans selection:bg-amber-400 selection:text-emerald-950 px-2.5 sm:px-4 py-2 flex flex-col justify-center text-xs sm:text-sm overflow-x-hidden"
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(16, 185, 129, 0.05) 0px, rgba(16, 185, 129, 0.05) 48px, transparent 48px, transparent 96px)'
      }}
    >
      {/* ONE UNIFIED MASTER CARD */}
      <div className="w-full max-w-5xl min-h-[88dvh] sm:min-h-0 flex flex-col mx-auto my-auto bg-gradient-to-b from-[#0a3620] to-[#062314] border-2 border-white/40 rounded-2xl shadow-2xl relative overflow-hidden divide-y divide-white/20">
        {/* Subtle Stadium Turf Floodlight Glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />

        {/* 1. CARD HEADER & ROULETTE + SEARCH BUTTONS */}
        <div className="py-3 px-3 sm:p-4 bg-gradient-to-r from-[#072917] via-[#0d3f25] to-[#072917] flex flex-col sm:flex-row items-center justify-between gap-2.5 relative z-10 shrink-0">
          <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-center sm:justify-start">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#00AEEF] via-sky-500 to-blue-900 p-0.5 shadow-lg shadow-sky-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#052113] rounded-[6px] flex items-center justify-center">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm sm:text-lg font-black tracking-tight text-white uppercase italic">
                  PROPER{' '}
                  <span className="text-[#00AEEF] drop-shadow-[0_0_8px_rgba(0,174,239,0.35)]">
                    BARCLAYS
                  </span>
                </span>
                <span className="hidden sm:inline-block bg-amber-400 text-emerald-950 text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                  1990 to 2020 Vault
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-emerald-100/80 font-medium">
                Zero Robotic Pep Ball • 100% Screamers, Reducers &amp; Cult Heroes
              </p>
            </div>
          </div>

          <div className="w-full max-w-[360px] sm:max-w-none sm:w-auto mx-auto sm:mx-0 px-3 sm:px-0 flex items-center justify-center gap-2">
            <button
              onClick={() => setShowSearchVault((prev) => !prev)}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 font-bold px-3 py-2 rounded-lg text-[11px] sm:text-xs uppercase tracking-wider border transition-all cursor-pointer whitespace-nowrap ${
                showSearchVault
                  ? 'bg-white text-emerald-950 border-white shadow-[0_0_12px_rgba(255,255,255,0.35)]'
                  : 'bg-[#052113]/90 hover:bg-[#09351f] text-white border-white/40'
              }`}
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span>{showSearchVault ? 'Close Vault' : 'Search Vault'}</span>
            </button>

            <button
              onClick={handleRandomRoulette}
              className="flex-[1.6] sm:flex-initial group relative inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-emerald-950 font-black px-3 py-2 rounded-lg text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_0_10px_rgba(251,191,36,0.25)] hover:shadow-[0_0_16px_rgba(251,191,36,0.45)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <Shuffle className="w-3.5 h-3.5 stroke-[2.5] shrink-0 group-hover:rotate-180 transition-transform duration-300" />
              <span>Random Barclays Roulette</span>
            </button>
          </div>
        </div>

        {/* TOGGLEABLE SEARCH & FILTER VAULT PANEL */}
        {showSearchVault && (
          <div className="p-3 sm:p-4 bg-[#062616] relative z-10 space-y-2.5 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Film className="w-4 h-4 text-lime-400" />
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                  Search &amp; Filter the Vault ({filteredMoments.length} of {moments.length} Matches)
                </h2>
              </div>
              <button
                onClick={() => setShowSearchVault(false)}
                className="text-emerald-200 hover:text-white p-1 rounded-lg bg-[#041a0f] border border-white/25 cursor-pointer"
                title="Close Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Search Input, Era Dropdown & Category Dropdown */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
              <div className="md:col-span-6 relative">
                <Search className="w-3.5 h-3.5 text-lime-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search player (e.g. Yeboah, King), club, ball, sponsor..."
                  className="w-full bg-[#041a0f]/95 border border-white/35 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-emerald-200/50 focus:outline-none focus:border-amber-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-200 hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="md:col-span-3">
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="w-full bg-[#041a0f]/95 border border-white/35 rounded-xl px-3 py-1.5 text-xs font-bold text-lime-300 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {ERA_FILTERS.map((era) => (
                    <option key={era} value={era} className="bg-[#041a0f] text-white">
                      {era}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#041a0f]/95 border border-white/35 rounded-xl px-3 py-1.5 text-xs font-bold text-amber-300 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {CATEGORY_TAGS.map((tag) => (
                    <option key={tag} value={tag} className="bg-[#041a0f] text-white">
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filtered Vault Entries List */}
            {filteredMoments.length === 0 ? (
              <div className="bg-[#041a0f]/80 border border-white/20 rounded-xl p-4 text-center space-y-1.5">
                <p className="text-xs font-bold text-emerald-100">
                  No Barclays moments match that filter combination.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedEra('All Eras (1990 to 2020)');
                    setSelectedCategory('All Moments');
                  }}
                  className="text-[11px] font-black uppercase text-amber-400 hover:underline cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {filteredMoments.map((m) => {
                  const isCurrent = m.id === activeMoment.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => handleSelectMoment(m)}
                      className={`group rounded-xl p-2.5 transition-all cursor-pointer flex flex-col justify-between border ${
                        isCurrent
                          ? 'bg-gradient-to-b from-[#0f4d2d] to-[#082e1a] border-amber-400'
                          : 'bg-[#041a0f]/85 border-white/20 hover:border-white/60 hover:bg-[#0b3b22]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-extrabold text-lime-300 uppercase">
                            {m.season} • {m.category}
                          </span>
                          <span className="bg-[#03140b] border border-white/25 px-2 py-0.5 rounded text-[10px] font-black text-amber-300">
                            {m.homeTeam} {m.score} {m.awayTeam}
                          </span>
                        </div>
                        <h3 className="text-xs font-black text-white group-hover:text-lime-300 transition leading-snug">
                          {m.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-1.5 pt-1 border-t border-white/15">
                        <span className="text-[11px] font-bold text-amber-400 truncate">
                          {m.player} ({m.barclaysRating}% Nostalgia)
                        </span>
                        <span className="text-[10px] font-black uppercase text-white group-hover:translate-x-0.5 transition">
                          Load Entry →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 2. SINGLE ACTIVE VAULT ENTRY SPOTLIGHT */}
        <div className="py-3.5 px-3 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4 relative z-10 bg-[#062415]/80">
          {/* Fixed Height Scoreboard, Era Bar, Title & Description Box */}
          <div className="bg-gradient-to-r from-[#072e1b] via-[#0e482b] to-[#072e1b] border-2 border-white/45 rounded-xl p-3 h-[196px] sm:h-[205px] flex flex-col justify-between overflow-hidden shrink-0 shadow-inner">
            {/* Row 1: Player, Season/Date & Category with equal spacing between all three and dynamic sizing */}
            <div className="flex items-center justify-between gap-1 sm:gap-3 flex-nowrap w-full shrink-0">
              <span
                className={`bg-red-700 border border-red-500 text-white ${getPlayerBadgeFontSize(
                  activeMoment.player
                )} font-black px-1.5 sm:px-2 py-0.5 rounded uppercase tracking-tight sm:tracking-wider whitespace-nowrap shrink-0 shadow-sm`}
              >
                {activeMoment.player}
              </span>

              <span className="text-[clamp(7.5px,2.1vw,11px)] font-bold text-lime-300 uppercase tracking-tight sm:tracking-wider whitespace-nowrap shrink-0 text-center">
                {activeMoment.season} • {activeMoment.date}
              </span>

              <span className="inline-flex items-center gap-1 bg-lime-400/15 border border-lime-300/50 text-lime-200 text-[clamp(7.5px,2vw,10px)] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-tight sm:tracking-wider whitespace-nowrap shrink-0">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 shrink-0" />
                <span>{activeMoment.category}</span>
              </span>
            </div>

            {/* Row 2: Symmetrical Centered Match Scoreline */}
            <div className="flex items-center justify-center shrink-0">
              <div className="inline-grid grid-cols-[1fr_auto_1fr] items-center bg-[#041a0f] border-2 border-white/75 rounded-lg overflow-hidden text-[11px] sm:text-xs font-black shadow-md">
                <span
                  style={{ minWidth: `${teamWingMinCh}ch` }}
                  className="px-2.5 py-1 bg-gradient-to-b from-[#0c3b22] to-[#062314] text-white uppercase text-center whitespace-nowrap"
                >
                  {activeMoment.homeTeam}
                </span>
                <span className="px-2.5 py-1 bg-amber-400 text-emerald-950 font-black tracking-tight text-center whitespace-nowrap border-x-2 border-white/75">
                  {activeMoment.score}
                </span>
                <span
                  style={{ minWidth: `${teamWingMinCh}ch` }}
                  className="px-2.5 py-1 bg-gradient-to-b from-[#0c3b22] to-[#062314] text-white uppercase text-center whitespace-nowrap"
                >
                  {activeMoment.awayTeam}
                </span>
              </div>
            </div>

            {/* Row 3: Highlight Title */}
            <h1
              className={`${getTitleFontSize(
                activeMoment.title
              )} font-black text-white tracking-tight leading-snug text-center line-clamp-2 shrink-0`}
            >
              {activeMoment.title}
            </h1>

            {/* Row 4: Highlight Description */}
            <p
              className={`text-emerald-50/95 ${getDescriptionFontSize(
                activeMoment.description
              )} leading-snug text-center line-clamp-3 shrink-0`}
            >
              {activeMoment.description}
            </p>
          </div>

          {/* Heritage Artifacts Grid, Broadcast Audio Transcript, Nostalgia Index & Launch Video Button */}
          <div className="flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
            {/* 4-Grid Info Metadata */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 shrink-0">
              <div className="bg-[#072d1a]/90 border border-white/30 rounded-xl p-2.5">
                <div className="flex items-center gap-1 text-[9.5px] sm:text-[10px] font-bold text-emerald-200/80 uppercase">
                  <UserCheck className="w-3 h-3 text-sky-400" />
                  <span>PLAYER</span>
                </div>
                <div className="text-[11px] sm:text-xs font-black text-white mt-1 truncate">
                  {activeMoment.player}
                </div>
              </div>

              <div className="bg-[#072d1a]/90 border border-white/30 rounded-xl p-2.5">
                <div className="flex items-center gap-1 text-[9.5px] sm:text-[10px] font-bold text-emerald-200/80 uppercase">
                  <CircleDot className="w-3 h-3 text-amber-400" />
                  <span>ICONIC MATCH BALL</span>
                </div>
                <div className="text-[11px] sm:text-xs font-black text-white mt-1 truncate">
                  {activeMoment.ball}
                </div>
              </div>

              <div className="bg-[#072d1a]/90 border border-white/30 rounded-xl p-2.5">
                <div className="flex items-center gap-1 text-[9.5px] sm:text-[10px] font-bold text-emerald-200/80 uppercase">
                  <Shirt className="w-3 h-3 text-purple-400" />
                  <span>CLASSIC SHIRT SPONSOR</span>
                </div>
                <div className="text-[11px] sm:text-xs font-black text-white mt-1 truncate">
                  {activeMoment.sponsor}
                </div>
              </div>

              <div className="bg-[#072d1a]/90 border border-white/30 rounded-xl p-2.5">
                <div className="flex items-center gap-1 text-[9.5px] sm:text-[10px] font-bold text-emerald-200/80 uppercase">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>STADIUM &amp; REFEREE</span>
                </div>
                <div className="text-[10.5px] sm:text-[11px] font-bold text-white mt-1 truncate">
                  {activeMoment.stadium} ({activeMoment.referee})
                </div>
              </div>
            </div>

            {/* Original Broadcast Transcript (Positioned directly above the Nostalgia Index) */}
            <div className="bg-[#041d11]/95 border border-amber-400/50 rounded-xl px-3.5 py-2.5 h-[76px] sm:h-[80px] flex flex-col justify-center shadow-inner text-center shrink-0 overflow-hidden">
              <div className="flex items-center justify-center gap-1.5 text-[9.5px] sm:text-[10px] text-amber-300 font-bold uppercase mb-1 shrink-0">
                <Radio className="w-3 h-3 text-red-500 animate-ping" />
                <span>ORIGINAL BROADCAST AUDIO TRANSCRIPT</span>
              </div>
              <p className="text-[11px] sm:text-xs font-bold italic text-white leading-snug line-clamp-2">
                {activeMoment.commentary}
              </p>
            </div>

            {/* Proper Barclays Nostalgia Index Bar */}
            <div className="bg-[#041d11]/95 border border-white/35 rounded-xl p-2.5 sm:p-3 shrink-0">
              <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] font-black uppercase mb-1.5">
                <span className="text-white tracking-wider">
                  Proper Barclays Nostalgia Index
                </span>
                <span className="text-amber-400">
                  {activeMoment.barclaysRating}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#02120a] border border-white/20 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 via-amber-400 to-red-600 rounded-full transition-all duration-500"
                  style={{ width: `${activeMoment.barclaysRating}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] text-emerald-100/80 font-semibold mt-1.5">
                <span>Vault Clip Views: {activeMoment.viewCount.toLocaleString()}</span>
                <span>0 to 100% Nostalgia Scale</span>
              </div>
            </div>

            {/* Enlarged Direct YouTube Launch Button Centered Underneath the Nostalgia Index */}
            <div className="pt-0.5 flex justify-center shrink-0">
              <a
                href={`https://www.youtube.com/watch?v=${activeMoment.youtubeId}${activeMoment.startTime > 0 ? `&t=${activeMoment.startTime}s` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white border border-white/40 font-black px-8 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_18px_rgba(220,38,38,0.45)] hover:scale-[1.02] active:scale-95 transition"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch video clip</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
