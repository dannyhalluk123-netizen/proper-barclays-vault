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
  '1990 to 1999',
  '2000 to 2009',
  '2010 to 2020'
];

const CATEGORY_TAGS = [
  'All Categories',
  'Proper Volley',
  'Thunderbastard',
  'Solo Magic',
  'Wonder Free Kick',
  'Last Minute Winner',
  'Crunching Tackle',
  'Iconic Celebration',
  'Touchline Chaos',
  'Memorable Moment',
  'Disasterclass'
];

const INITIAL_MOMENTS = [
  // ================= 1. PROPER VOLLEY =================
  {
    id: 1,
    title: "Tony Yeboah's Crossbar Shaking Volley vs Liverpool",
    player: "Tony Yeboah",
    homeTeam: "Leeds Utd",
    awayTeam: "Liverpool",
    score: "1 : 0",
    season: "1995/96",
    date: "21 Aug 1995",
    era: "1992/93 to 1999/00",
    category: "Proper Volley",
    ball: "Mitre Ultimax",
    sponsor: "Thistle Hotels",
    stadium: "Elland Road",
    referee: "David Elleray",
    viewCount: 1571550,
    youtubeId: "gq4-z7mI_Cw",
    startTime: 0,
    commentary: "\"Rod Wallace knocked it down... YEBOAH! OH, WHAT A GOAL! Absolute thunderbolt off the bar!\"",
    description: "Rod Wallace heads the ball back into space and Tony Yeboah unleashes a first time volley from 28 yards that crashes off the underside of the crossbar."
  },
  {
    id: 2,
    title: "Paolo Di Canio's Airborne Scissors Volley",
    player: "Paolo Di Canio",
    homeTeam: "West Ham",
    awayTeam: "Wimbledon",
    score: "2 : 1",
    season: "1999/00",
    date: "26 Mar 2000",
    era: "1992/93 to 1999/00",
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
    id: 3,
    title: "Wayne Rooney's Rage Volley Mid Argument",
    player: "Wayne Rooney",
    homeTeam: "Man Utd",
    awayTeam: "Newcastle",
    score: "2 : 1",
    season: "2004/05",
    date: "24 Apr 2005",
    era: "2000/01 to 2009/10",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow",
    sponsor: "Vodafone",
    stadium: "Old Trafford",
    referee: "Neale Barry",
    viewCount: 2703644,
    youtubeId: "pPHqRpJ7tLY",
    startTime: 0,
    commentary: "\"Rooney is still complaining to the referee... and now ROONEY! Oh, take a bow!\"",
    description: "Seconds after shouting at referee Neale Barry, Rooney takes out his fury on a looping Peter Ramage clearance from 30 yards, rocketing it past Shay Given."
  },
  {
    id: 4,
    title: "Paul Scholes' 30 Yard Corner Volley off the Bar",
    player: "Paul Scholes",
    homeTeam: "Aston Villa",
    awayTeam: "Man Utd",
    score: "0 : 3",
    season: "2006/07",
    date: "23 Dec 2006",
    era: "2000/01 to 2009/10",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "AIG",
    stadium: "Villa Park",
    referee: "Steve Bennett",
    viewCount: 1693102,
    youtubeId: "qwRX1urYQJI",
    startTime: 0,
    commentary: "\"Headed clear to the edge of the box... SCHOLES! Unbelievable technique off the crossbar!\"",
    description: "Giggs' corner is headed high into the air out to 28 yards, and Paul Scholes meets the dropping ball with a dipping volley off the underside of the bar."
  },
  {
    id: 5,
    title: "Thierry Henry's Flick and Spin Volley vs Man Utd",
    player: "Thierry Henry",
    homeTeam: "Arsenal",
    awayTeam: "Man Utd",
    score: "1 : 0",
    season: "2000/01",
    date: "1 Oct 2000",
    era: "2000/01 to 2009/10",
    category: "Proper Volley",
    ball: "Nike Geo Merlin",
    sponsor: "Dreamcast",
    stadium: "Highbury",
    referee: "Graham Barber",
    viewCount: 3023420,
    youtubeId: "AUTyZVsLxYE",
    startTime: 0,
    commentary: "\"Gilles Grimandi into Henry, back to goal... flicks it up and VOLLEYS IT OVER BARTHEZ!\"",
    description: "With Denis Irwin tight to his back, Henry flicks the ball up and pivots in one motion to loop an unstoppable volley over Fabien Barthez."
  },
  {
    id: 6,
    title: "Robin van Persie's Flying Superman Volley at Charlton",
    player: "Robin van Persie",
    homeTeam: "Charlton",
    awayTeam: "Arsenal",
    score: "1 : 2",
    season: "2006/07",
    date: "30 Sep 2006",
    era: "2000/01 to 2009/10",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow II",
    sponsor: "Fly Emirates",
    stadium: "The Valley",
    referee: "Mark Clattenburg",
    viewCount: 1535702,
    youtubeId: "F8Ehw1LvULk",
    startTime: 0,
    commentary: "\"Eboue crosses... VAN PERSIE! Airborne at the edge of the box!\"",
    description: "Running at full sprint, Van Persie launches himself into the air and connects cleanly with his left boot to rocket Eboue's cross into the roof of the net."
  },
  {
    id: 7,
    title: "Wayne Rooney's Manchester Derby Overhead Kick",
    player: "Wayne Rooney",
    homeTeam: "Man Utd",
    awayTeam: "Man City",
    score: "2 : 1",
    season: "2010/11",
    date: "12 Feb 2011",
    era: "2010/11 to 2019/20",
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
    id: 8,
    title: "Pajtim Kasami's Chest and Van Basten Volley at Palace",
    player: "Pajtim Kasami",
    homeTeam: "Crystal Palace",
    awayTeam: "Fulham",
    score: "1 : 4",
    season: "2013/14",
    date: "21 Oct 2013",
    era: "2010/11 to 2019/20",
    category: "Proper Volley",
    ball: "Nike Incyte",
    sponsor: "Marathonbet",
    stadium: "Selhurst Park",
    referee: "Lee Mason",
    viewCount: 1394312,
    youtubeId: "OWEtvlJZfA4",
    startTime: 0,
    commentary: "\"Sascha Riether clips it forward... KASAMI! Chest control at full sprint and weak foot volley!\"",
    description: "On Monday Night Football, Swiss midfielder Pajtim Kasami chests down a 45 yard pass on the run and volleys with his weaker right foot over Julian Speroni."
  },
  {
    id: 9,
    title: "Danny Rose's North London Derby Debut Volley",
    player: "Danny Rose",
    homeTeam: "Tottenham",
    awayTeam: "Arsenal",
    score: "2 : 1",
    season: "2009/10",
    date: "14 Apr 2010",
    era: "2000/01 to 2009/10",
    category: "Proper Volley",
    ball: "Nike Total 90 Ascente",
    sponsor: "Mansion",
    stadium: "White Hart Lane",
    referee: "Mark Clattenburg",
    viewCount: 1161666,
    youtubeId: "ibSqYaGTt8Y",
    startTime: 0,
    commentary: "\"Almunia punches it clear... DANNY ROSE ON HIS PREMIER LEAGUE DEBUT!\"",
    description: "Making his first ever Premier League appearance in a North London Derby, 19 year old Danny Rose meets Almunia's punch from 30 yards on the full volley."
  },
  {
    id: 10,
    title: "Matthew Taylor's 45 Yard Dipping Volley at Fratton Park",
    player: "Matthew Taylor",
    homeTeam: "Portsmouth",
    awayTeam: "Everton",
    score: "2 : 0",
    season: "2006/07",
    date: "9 Dec 2006",
    era: "2000/01 to 2009/10",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "OKI",
    stadium: "Fratton Park",
    referee: "Mark Clattenburg",
    viewCount: 425406,
    youtubeId: "k3wo8F_nMoc",
    startTime: 0,
    commentary: "\"Kanu lays it back... MATTHEW TAYLOR FROM 45 YARDS! Tim Howard is beaten from a mile out!\"",
    description: "Wearing Pompey's iconic OKI kit, left back Matty Taylor hits a bouncing ball from near the centre circle on the full volley over Tim Howard."
  },
  {
    id: 11,
    title: "Robin van Persie's Title Clinching Over the Shoulder Volley",
    player: "Robin van Persie",
    homeTeam: "Man Utd",
    awayTeam: "Aston Villa",
    score: "3 : 0",
    season: "2012/13",
    date: "22 Apr 2013",
    era: "2010/11 to 2019/20",
    category: "Proper Volley",
    ball: "Nike Maxim",
    sponsor: "Aon",
    stadium: "Old Trafford",
    referee: "Anthony Taylor",
    viewCount: 4120500,
    youtubeId: "su5bd67HH5A",
    startTime: 0,
    commentary: "\"Rooney from inside his own half... VAN PERSIE ON THE VOLLEY! Magnificent goal to seal the title!\"",
    description: "Wayne Rooney pings a 55 yard pass from midfield and Robin van Persie tracks it over his shoulder in full stride to lash a first time left foot volley past Brad Guzan."
  },
  {
    id: 12,
    title: "Peter Crouch's Overhead Scissors Volley vs Stoke",
    player: "Peter Crouch",
    homeTeam: "Stoke City",
    awayTeam: "Man City",
    score: "1 : 1",
    season: "2011/12",
    date: "24 Mar 2012",
    era: "2010/11 to 2019/20",
    category: "Proper Volley",
    ball: "Nike Seitiro",
    sponsor: "Britannia",
    stadium: "Britannia Stadium",
    referee: "Howard Webb",
    viewCount: 2890400,
    youtubeId: "Ojpwc5D-v4c",
    startTime: 0,
    commentary: "\"Crouch flicks it up to himself... PETER CROUCH! Without touching the ground for 40 yards!\"",
    description: "Without the ball touching the turf once from the halfway line, 6ft 7in Peter Crouch cushions a header and unleashes a looping 30 yard volley over Joe Hart."
  },
  {
    id: 13,
    title: "Laurent Robert's Karate Backheel Volley vs Fulham",
    player: "Laurent Robert",
    homeTeam: "Newcastle",
    awayTeam: "Fulham",
    score: "1 : 4",
    season: "2004/05",
    date: "7 Nov 2004",
    era: "2000/01 to 2009/10",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow",
    sponsor: "Northern Rock",
    stadium: "St James' Park",
    referee: "Howard Webb",
    viewCount: 387623,
    youtubeId: "GxmOlqwsULc",
    startTime: 0,
    commentary: "\"Laurent Robert leaps in the air... he's backheeled it in mid air into the top corner!\"",
    description: "Laurent Robert jumps with his back to goal and flicks the ball with the outside of his heel at head height over Edwin van der Sar."
  },
  {
    id: 14,
    title: "Morten Gamst Pedersen's Sweet Left Foot Volley at Ewood",
    player: "Morten Gamst Pedersen",
    homeTeam: "Blackburn",
    awayTeam: "Fulham",
    score: "2 : 1",
    season: "2005/06",
    date: "20 Aug 2005",
    era: "2000/01 to 2009/10",
    category: "Proper Volley",
    ball: "Nike Total 90 Aerow",
    sponsor: "Lonsdale",
    stadium: "Ewood Park",
    referee: "Mike Dean",
    viewCount: 483851,
    youtubeId: "JlFYo0NwN8E",
    startTime: 0,
    commentary: "\"Crossed to the back post... GAMST PEDERSEN! What a sweet left foot that man has!\"",
    description: "Norwegian Barclays royalty Morten Gamst Pedersen watches a deep cross drop over his shoulder and hammers a first time volley into the roof of the net."
  },
  {
    id: 15,
    title: "Paul Scholes' Bradford Corner Routine Volley",
    player: "Paul Scholes",
    homeTeam: "Bradford City",
    awayTeam: "Man Utd",
    score: "0 : 4",
    season: "1999/00",
    date: "25 Mar 2000",
    era: "1992/93 to 1999/00",
    category: "Proper Volley",
    ball: "Mitre Ultimax",
    sponsor: "Sharp",
    stadium: "Valley Parade",
    referee: "Graham Barber",
    viewCount: 1945000,
    youtubeId: "M4HvRA73d2I",
    startTime: 0,
    commentary: "\"Beckham floats the corner right out of the box... SCHOLES ON THE FULL VOLLEY!\"",
    description: "David Beckham pings a corner straight through the air to the D of the penalty area where Paul Scholes rifles a low first time volley through a crowd of players."
  },

  // ================= 2. THUNDERBASTARD =================
  {
    id: 16,
    title: "Papiss Cisse's Physics Defying Banana Screamer",
    player: "Papiss Cisse",
    homeTeam: "Chelsea",
    awayTeam: "Newcastle",
    score: "0 : 2",
    season: "2011/12",
    date: "2 May 2012",
    era: "2010/11 to 2019/20",
    category: "Thunderbastard",
    ball: "Nike Seitiro Hi Vis",
    sponsor: "Virgin Money",
    stadium: "Stamford Bridge",
    referee: "Mark Halsey",
    viewCount: 5334104,
    youtubeId: "I1MpJJ4tfLY",
    startTime: 0,
    commentary: "\"Cisse... OH! UNBELIEVABLE! What a goal from Papiss Cisse! That is sensational!\"",
    description: "Shola Ameobi chests down a throw in on the left touchline and Cisse casually lashes an outside of the boot swerving rocket from 37 yards over Petr Cech."
  },
  {
    id: 17,
    title: "Tony Yeboah Juggles and Smashes Wimbledon",
    player: "Tony Yeboah",
    homeTeam: "Wimbledon",
    awayTeam: "Leeds Utd",
    score: "2 : 4",
    season: "1995/96",
    date: "23 Sep 1995",
    era: "1992/93 to 1999/00",
    category: "Thunderbastard",
    ball: "Mitre Ultimax",
    sponsor: "Thistle Hotels",
    stadium: "Selhurst Park",
    referee: "Alan Wilkie",
    viewCount: 2111699,
    youtubeId: "RRHSP_KXigs",
    startTime: 0,
    commentary: "\"Yeboah controls it on his chest, dummies one... BOOOM! In off the bar AGAIN!\"",
    description: "Chest control, knee juggle, dummy past a sliding defender, and an unstoppable half volley violently slamming off the crossbar."
  },
  {
    id: 18,
    title: "Steven Gerrard's Swerving Thunderbolt vs Middlesbrough",
    player: "Steven Gerrard",
    homeTeam: "Liverpool",
    awayTeam: "Middlesbrough",
    score: "1 : 1",
    season: "2004/05",
    date: "30 Apr 2005",
    era: "2000/01 to 2009/10",
    category: "Thunderbastard",
    ball: "Nike Total 90 Aerow",
    sponsor: "Carlsberg",
    stadium: "Anfield",
    referee: "Phil Dowd",
    viewCount: 1516795,
    youtubeId: "FJzVe_2hRcc",
    startTime: 0,
    commentary: "\"Riise chests it down... GERRARD! Oh my goodness, what a hit from 35 yards!\"",
    description: "Stevie G takes a bouncing pass on the half volley from 35 yards and hits a rising, swerving missile into Mark Schwarzer's top corner."
  },
  {
    id: 19,
    title: "Jay Jay Okocha's Relegation Saving Rocket vs West Ham",
    player: "Jay Jay Okocha",
    homeTeam: "Bolton",
    awayTeam: "West Ham",
    score: "1 : 0",
    season: "2002/03",
    date: "19 Apr 2003",
    era: "2000/01 to 2009/10",
    category: "Thunderbastard",
    ball: "Nike Geo Merlin II",
    sponsor: "Reebok",
    stadium: "Reebok Stadium",
    referee: "Uriah Rennie",
    viewCount: 846188,
    youtubeId: "OX6XC8n7F2w",
    startTime: 0,
    commentary: "\"Okocha steps past one, unleashes... UNSTOPPABLE! David James didn't even move!\"",
    description: "In a huge relegation battle, Okocha dribbles from midfield and bends a vicious 28 yard strike off the inside of the stanchion."
  },
  {
    id: 20,
    title: "Laurent Robert's Double Screamer Masterclass vs Spurs",
    player: "Laurent Robert",
    homeTeam: "Newcastle",
    awayTeam: "Tottenham",
    score: "4 : 0",
    season: "2003/04",
    date: "13 Dec 2003",
    era: "2000/01 to 2009/10",
    category: "Thunderbastard",
    ball: "Nike Geo Merlin",
    sponsor: "Northern Rock",
    stadium: "St James' Park",
    referee: "Alan Wiley",
    viewCount: 609714,
    youtubeId: "Mo1QNVX8ZNQ",
    startTime: 0,
    commentary: "\"Robert from 35 yards... Kasey Keller had no chance! Look at the swerve on that!\"",
    description: "Two outrageous strikes in the same afternoon: a 30 yard half volley into the top corner followed by a 35 yard knuckleball thunderbolt."
  },
  {
    id: 21,
    title: "Michael Essien's Outrageous Outside Foot Swerver",
    player: "Michael Essien",
    homeTeam: "Chelsea",
    awayTeam: "Arsenal",
    score: "1 : 1",
    season: "2006/07",
    date: "10 Dec 2006",
    era: "2000/01 to 2009/10",
    category: "Thunderbastard",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "Samsung Mobile",
    stadium: "Stamford Bridge",
    referee: "Alan Wiley",
    viewCount: 3176758,
    youtubeId: "A-Mu7q3PE0k",
    startTime: 0,
    commentary: "\"Lampard lays it back... ESSIEN! OH, WHAT A GOAL! Look at the bend on that!\"",
    description: "Lampard rolls the ball back to 35 yards and Essien hits it first time, starting three yards outside the post before bending violently inside Jens Lehmann's upright."
  },
  {
    id: 22,
    title: "Alan Shearer's Rocket Half Volley vs Everton",
    player: "Alan Shearer",
    homeTeam: "Newcastle",
    awayTeam: "Everton",
    score: "2 : 1",
    season: "2002/03",
    date: "1 Dec 2002",
    era: "2000/01 to 2009/10",
    category: "Thunderbastard",
    ball: "Nike Geo Merlin II",
    sponsor: "NTL",
    stadium: "St James' Park",
    referee: "Mark Halsey",
    viewCount: 1364380,
    youtubeId: "fgNObY2nqTY",
    startTime: 0,
    commentary: "\"Knocked down by Dyer... SHEARER! One hand in the air, the net is still rippling!\"",
    description: "Shearer watches the ball bounce once 28 yards out and unleashes a laser guided strike that stays four feet off the turf all the way into Richard Wright's net."
  },
  {
    id: 23,
    title: "Didier Drogba's Chest and Half Turn Rocket vs Liverpool",
    player: "Didier Drogba",
    homeTeam: "Chelsea",
    awayTeam: "Liverpool",
    score: "1 : 0",
    season: "2006/07",
    date: "17 Sep 2006",
    era: "2000/01 to 2009/10",
    category: "Thunderbastard",
    ball: "Nike Total 90 Aerow II",
    sponsor: "Samsung Mobile",
    stadium: "Stamford Bridge",
    referee: "Mike Riley",
    viewCount: 1128325,
    youtubeId: "bL03tfv6fCg",
    startTime: 0,
    commentary: "\"Drogba chests it with Carragher on his back... SPINS AND FIRES! Reina didn't move!\"",
    description: "Holding off Jamie Carragher on the edge of the box, Drogba chests the ball down and pivots 180 degrees to rifle a left footed half volley inside the post."
  },
  {
    id: 24,
    title: "Tugay's 30 Yard Rocket Volley at White Hart Lane",
    player: "Tugay Kerimoglu",
    homeTeam: "Tottenham",
    awayTeam: "Blackburn",
    score: "1 : 1",
    season: "2006/07",
    date: "19 Nov 2006",
    era: "2000/01 to 2009/10",
    category: "Thunderbastard",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "bet24",
    stadium: "White Hart Lane",
    referee: "Mike Dean",
    viewCount: 909032,
    youtubeId: "_5oLISbbemA",
    startTime: 0,
    commentary: "\"Cleared to the edge of the area... TUGAY! Every single goal he scores is a 30 yard screamer!\"",
    description: "36 year old Turkish maestro Tugay, famous for never scoring tap ins, slices across a dropping ball on the edge of the box to arrow it past Paul Robinson."
  },
  {
    id: 25,
    title: "Erik Edman's 40 Yard Out of Nowhere Missile at Anfield",
    player: "Erik Edman",
    homeTeam: "Liverpool",
    awayTeam: "Tottenham",
    score: "2 : 2",
    season: "2004/05",
    date: "16 Apr 2005",
    era: "2000/01 to 2009/10",
    category: "Thunderbastard",
    ball: "Nike Total 90 Aerow",
    sponsor: "Thomson",
    stadium: "Anfield",
    referee: "Mark Halsey",
    viewCount: 1450200,
    youtubeId: "VRDxlOzB-V0",
    startTime: 0,
    commentary: "\"Edman from 40 yards... OH MY WORD! Where on earth did that come from from the Swedish left back?!\"",
    description: "Scoring his only Premier League goal for Spurs, Swedish full back Erik Edman steps up 41 yards out and unleashes a swerving rocket into Jerzy Dudek's top corner."
  },
  {
    id: 26,
    title: "Vincent Kompany's Don't Shoot Title Thunderbolt vs Leicester",
    player: "Vincent Kompany",
    homeTeam: "Man City",
    awayTeam: "Leicester City",
    score: "1 : 0",
    season: "2018/19",
    date: "6 May 2019",
    era: "2010/11 to 2019/20",
    category: "Thunderbastard",
    ball: "Nike Merlin",
    sponsor: "Etihad Airways",
    stadium: "Etihad Stadium",
    referee: "Mike Dean",
    viewCount: 8420900,
    youtubeId: "mngKYMGqwzo",
    startTime: 0,
    commentary: "\"Kompany steps forward... DON'T SHOOT VINNY! OH, WHAT A HIT! CAPTAIN FANTASTIC!\"",
    description: "Ignoring his teammates screaming at him not to shoot in the 70th minute of a title decider, Vincent Kompany arrows a 30 yard rocket into Kasper Schmeichel's top corner."
  },
  {
    id: 27,
    title: "Obafemi Martins' 84mph Left Foot Rocket at Spurs",
    player: "Obafemi Martins",
    homeTeam: "Tottenham",
    awayTeam: "Newcastle",
    score: "2 : 3",
    season: "2006/07",
    date: "14 Jan 2007",
    era: "2000/01 to 2009/10",
    category: "Thunderbastard",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "Northern Rock",
    stadium: "White Hart Lane",
    referee: "Steve Bennett",
    viewCount: 1120300,
    youtubeId: "dSvwUG7_DUI",
    startTime: 0,
    commentary: "\"Martins turns and fires... 84 MILES AN HOUR into the roof of Paul Robinson's net!\"",
    description: "Clocked by Sky Sports at 84 miles per hour, Obafemi Martins hammers a left footed thunderbolt into the roof of the net before launching into his signature acrobatics."
  },
  {
    id: 29,
    title: "Pedro Mendes' 35 Yard Screamer at Man City",
    player: "Pedro Mendes",
    homeTeam: "Man City",
    awayTeam: "Portsmouth",
    score: "2 : 1",
    season: "2005/06",
    date: "27 Aug 2005",
    era: "2000/01 to 2009/10",
    category: "Thunderbastard",
    ball: "Nike Total 90 Aerow",
    sponsor: "OKI",
    stadium: "Etihad Stadium",
    referee: "Alan Wiley",
    viewCount: 540100,
    youtubeId: "xmQkgW9sgJ4",
    startTime: 0,
    commentary: "\"Cleared from the corner... PEDRO MENDES! An absolute Exocet missile into David James' net!\"",
    description: "Portuguese midfielder Pedro Mendes meets a headed clearance 35 yards out and rifles a rising half volley straight into the top corner."
  },
  {
    id: 30,
    title: "Andros Townsend's 30 Yard Volleyed Rocket vs Man City",
    player: "Andros Townsend",
    homeTeam: "Man City",
    awayTeam: "Crystal Palace",
    score: "2 : 3",
    season: "2018/19",
    date: "22 Dec 2018",
    era: "2010/11 to 2019/20",
    category: "Thunderbastard",
    ball: "Nike Merlin Hi Vis",
    sponsor: "ManBetX",
    stadium: "Etihad Stadium",
    referee: "Andre Marriner",
    viewCount: 4980300,
    youtubeId: "-_WLlXksYvA",
    startTime: 0,
    commentary: "\"Bernardo Silva heads it clear... ANDROS TOWNSEND! OH, MY WORD! Goal of the season at the Etihad!\"",
    description: "As a headed clearance loops out to 30 yards, Andros Townsend connects on the full volley to send a bullet arrowing past Ederson into the roof of the net."
  },

  // ================= 3. SOLO MAGIC =================
  {
    id: 31,
    title: "Dennis Bergkamp's Impossible Spin vs Newcastle",
    player: "Dennis Bergkamp",
    homeTeam: "Newcastle",
    awayTeam: "Arsenal",
    score: "0 : 2",
    season: "2001/02",
    date: "2 Mar 2002",
    era: "2000/01 to 2009/10",
    category: "Solo Magic",
    ball: "Nike Geo Merlin",
    sponsor: "Sega / Dreamcast",
    stadium: "St James' Park",
    referee: "Graham Poll",
    viewCount: 9315720,
    youtubeId: "IicmCu47pMo",
    startTime: 0,
    commentary: "\"Pires to Bergkamp... What a turn! Brilliant goal! Nikos Dabizas still doesn't know where he is!\"",
    description: "One deft flick with his left boot spins the ball around one side of Nikos Dabizas while Bergkamp spins the other way and slots coolly past Shay Given."
  },
  {
    id: 32,
    title: "Matt Le Tissier's Double Sombrero Flick at The Dell",
    player: "Matt Le Tissier",
    homeTeam: "Southampton",
    awayTeam: "Newcastle",
    score: "2 : 1",
    season: "1993/94",
    date: "24 Oct 1993",
    era: "1992/93 to 1999/00",
    category: "Solo Magic",
    ball: "Mitre Pro Max",
    sponsor: "Dimplex",
    stadium: "The Dell",
    referee: "Keith Cooper",
    viewCount: 1186545,
    youtubeId: "qkMVDt5c778",
    startTime: 0,
    commentary: "\"Backheeled into Le Tissier... flicks it over one, over another, and rolls it home! Pure genius!\"",
    description: "Le God collects a pass with his heel, flicks the ball over two Newcastle defenders in succession without it touching the grass, and slots it into the corner."
  },
  {
    id: 33,
    title: "Hatem Ben Arfa's 70 Yard Solo Slalom vs Bolton",
    player: "Hatem Ben Arfa",
    homeTeam: "Newcastle",
    awayTeam: "Bolton",
    score: "2 : 0",
    season: "2011/12",
    date: "9 Apr 2012",
    era: "2010/11 to 2019/20",
    category: "Solo Magic",
    ball: "Nike Seitiro",
    sponsor: "Virgin Money",
    stadium: "St James' Park",
    referee: "Lee Probert",
    viewCount: 2686510,
    youtubeId: "WpuFePHvLUM",
    startTime: 0,
    commentary: "\"Ben Arfa turns inside his own half... still going... past four! Brilliant solo goal!\"",
    description: "The ultimate streets won't forget Barclaysman spins in the centre circle and glides past four Bolton players in a straight line before slotting past Adam Bogdan."
  },
  {
    id: 34,
    title: "Adel Taarabt's Nutmeg and Outside Boot Magic",
    player: "Adel Taarabt",
    homeTeam: "QPR",
    awayTeam: "Fulham",
    score: "2 : 1",
    season: "2012/13",
    date: "15 Dec 2012",
    era: "2010/11 to 2019/20",
    category: "Solo Magic",
    ball: "Nike Maxim Hi Vis",
    sponsor: "AirAsia",
    stadium: "Loftus Road",
    referee: "Martin Atkinson",
    viewCount: 947876,
    youtubeId: "4Hz_4LRxtvM",
    startTime: 0,
    commentary: "\"Taarabt with his gloves on and socks rolled down... exquisite finish with the outside of the boot!\"",
    description: "Wearing black woollen gloves with low socks, Taarabt toys with Brede Hangeland before curling an outside of the foot beauty into the corner."
  },
  {
    id: 35,
    title: "Jay Jay Okocha's Rainbow Flick on Ray Parlour",
    player: "Jay Jay Okocha",
    homeTeam: "Bolton",
    awayTeam: "Arsenal",
    score: "2 : 2",
    season: "2002/03",
    date: "26 Apr 2003",
    era: "2000/01 to 2009/10",
    category: "Solo Magic",
    ball: "Nike Geo Merlin II",
    sponsor: "Reebok",
    stadium: "Reebok Stadium",
    referee: "Andy D'Urso",
    viewCount: 2484275,
    youtubeId: "NQVV3hA0MGQ",
    startTime: 0,
    commentary: "\"Okocha trapped by the corner flag... OH LOOK AT THAT! Over Ray Parlour's head!\"",
    description: "So good they named him twice: Jay Jay Okocha casually rainbows the ball clean over a bewildered Ray Parlour while protecting Bolton's survival."
  },
  {
    id: 36,
    title: "Thierry Henry's Invincibles Good Friday Slalom vs Liverpool",
    player: "Thierry Henry",
    homeTeam: "Arsenal",
    awayTeam: "Liverpool",
    score: "4 : 2",
    season: "2003/04",
    date: "9 Apr 2004",
    era: "2000/01 to 2009/10",
    category: "Solo Magic",
    ball: "Nike Geo Merlin",
    sponsor: "O2",
    stadium: "Highbury",
    referee: "Alan Wiley",
    viewCount: 3501572,
    youtubeId: "7U8w7MJKkQY",
    startTime: 225,
    commentary: "\"Henry past Hamann... Carragher stumbles into Biscan! Thierry Henry is unstoppable!\"",
    description: "On Good Friday 2004, Henry drops a shoulder to leave Jamie Carragher colliding with Igor Biscan and rescues the Invincibles season."
  },
  {
    id: 37,
    title: "Johan Elmander's Cruyff Spin and Pirouette Goal at Wolves",
    player: "Johan Elmander",
    homeTeam: "Wolves",
    awayTeam: "Bolton",
    score: "2 : 3",
    season: "2010/11",
    date: "13 Nov 2010",
    era: "2010/11 to 2019/20",
    category: "Solo Magic",
    ball: "Nike Total 90 Tracer Hi Vis",
    sponsor: "188BET",
    stadium: "Molineux",
    referee: "Peter Walton",
    viewCount: 1198220,
    youtubeId: "iaEL9aX5WJ0",
    startTime: 0,
    commentary: "\"Elmander surrounded by four Wolves defenders... silky footwork! Is that Johan Elmander or Dennis Bergkamp?!\"",
    description: "Swedish target man Johan Elmander momentarily transforms into Ronaldinho, dragging the ball through three Wolves defenders in a phone booth before slotting home."
  },
  {
    id: 38,
    title: "Georgi Kinkladze's Maze Dribble and Dink vs Southampton",
    player: "Georgi Kinkladze",
    homeTeam: "Man City",
    awayTeam: "Southampton",
    score: "2 : 1",
    season: "1995/96",
    date: "16 Mar 1996",
    era: "1992/93 to 1999/00",
    category: "Solo Magic",
    ball: "Mitre Ultimax",
    sponsor: "Brother",
    stadium: "Maine Road",
    referee: "Paul Alcock",
    viewCount: 1840300,
    youtubeId: "fkVWNB0Vt3Q",
    startTime: 0,
    commentary: "\"Kinkladze past one, past two, past three, past four... and dinks it over Dave Beasant!\"",
    description: "Georgian wizard Georgi Kinkladze slaloms through five Southampton defenders at Maine Road before delicately chipping the keeper from six yards."
  },
  {
    id: 39,
    title: "Luis Suarez's Shoulder Control and Rounding Tim Krul",
    player: "Luis Suarez",
    homeTeam: "Liverpool",
    awayTeam: "Newcastle",
    score: "1 : 1",
    season: "2012/13",
    date: "4 Nov 2012",
    era: "2010/11 to 2019/20",
    category: "Solo Magic",
    ball: "Nike Maxim Hi Vis",
    sponsor: "Standard Chartered",
    stadium: "Anfield",
    referee: "Anthony Taylor",
    viewCount: 4120900,
    youtubeId: "Oog2lNMIy5Q",
    startTime: 0,
    commentary: "\"Jose Enrique launches a 60 yard ball... SUAREZ! How did he kill that dead on his shoulder?!\"",
    description: "With Fabricio Coloccini hanging off his shirt, Luis Suarez cushions a 60 yard high pass on his shoulder at full speed, rounds Tim Krul in the same motion, and taps home."
  },
  {
    id: 40,
    title: "Eden Hazard's Solo Spin and Slalom vs Arsenal",
    player: "Eden Hazard",
    homeTeam: "Chelsea",
    awayTeam: "Arsenal",
    score: "3 : 1",
    season: "2016/17",
    date: "4 Feb 2017",
    era: "2010/11 to 2019/20",
    category: "Solo Magic",
    ball: "Nike Ordem 4 Hi Vis",
    sponsor: "Yokohama Tyres",
    stadium: "Stamford Bridge",
    referee: "Martin Atkinson",
    viewCount: 6450800,
    youtubeId: "wIWqvf60NhM",
    startTime: 0,
    commentary: "\"Hazard spins away from Coquelin in the centre circle... Koscielny backpedals... HAZARD SCORES!\"",
    description: "Eden Hazard shrugs off Francis Coquelin, sending him spinning onto the turf, and carries the ball 55 yards past Laurent Koscielny before beating Petr Cech."
  },
  {
    id: 41,
    title: "Sofiane Boufal's 70 Yard Solo Goal of the Season vs West Brom",
    player: "Sofiane Boufal",
    homeTeam: "Southampton",
    awayTeam: "West Brom",
    score: "1 : 0",
    season: "2017/18",
    date: "21 Oct 2017",
    era: "2010/11 to 2019/20",
    category: "Solo Magic",
    ball: "Nike Ordem V",
    sponsor: "Virgin Media",
    stadium: "St Mary's Stadium",
    referee: "Graham Scott",
    viewCount: 3890400,
    youtubeId: "fCWMDjapZnA",
    startTime: 0,
    commentary: "\"Boufal picks it up deep inside his own half... two West Brom defenders collide! What a solo goal!\"",
    description: "Moroccan flair icon Sofiane Boufal weaves past five West Bromwich Albion players, causing Allan Nyom and Craig Dawson to crash into each other."
  },
  {
    id: 42,
    title: "Son Heung min's Puskas Winning 80 Yard Sprint vs Burnley",
    player: "Son Heung min",
    homeTeam: "Tottenham",
    awayTeam: "Burnley",
    score: "5 : 0",
    season: "2019/20",
    date: "7 Dec 2019",
    era: "2010/11 to 2019/20",
    category: "Solo Magic",
    ball: "Nike Merlin Hi Vis",
    sponsor: "AIA",
    stadium: "Tottenham Hotspur Stadium",
    referee: "Kevin Friend",
    viewCount: 11200400,
    youtubeId: "8FOya2rUdA0",
    startTime: 0,
    commentary: "\"Son collects on the edge of his own box... past six Burnley shirts! Sonaldo from box to box!\"",
    description: "Collecting the ball outside his own penalty box, Son Heung min turns on the afterburners to outrun seven Burnley players across 80 yards in 11 seconds."
  },
  {
    id: 43,
    title: "Dimitar Berbatov's Touchline Spin Assist for Ronaldo",
    player: "Dimitar Berbatov",
    homeTeam: "Man Utd",
    awayTeam: "West Ham",
    score: "2 : 0",
    season: "2008/09",
    date: "29 Oct 2008",
    era: "2000/01 to 2009/10",
    category: "Solo Magic",
    ball: "Nike Total 90 Omni",
    sponsor: "AIG",
    stadium: "Old Trafford",
    referee: "Mark Halsey",
    viewCount: 7850200,
    youtubeId: "_Z7VaZGEkVs",
    startTime: 0,
    commentary: "\"Berbatov trapped on the byline by James Collins... OH, WHAT A SPIN! Pure silk on the touchline!\"",
    description: "Running towards the dead ball line, Dimitar Berbatov stops dead, executes a 180 degree reverse pirouette while dragging the ball behind his standing leg past James Collins, and squares for Ronaldo."
  },
  {
    id: 44,
    title: "Paulo Wanchope's Debut Long Legged Slalom at Old Trafford",
    player: "Paulo Wanchope",
    homeTeam: "Man Utd",
    awayTeam: "Derby County",
    score: "2 : 3",
    season: "1996/97",
    date: "5 Apr 1997",
    era: "1992/93 to 1999/00",
    category: "Solo Magic",
    ball: "Mitre Ultimax",
    sponsor: "Puma",
    stadium: "Old Trafford",
    referee: "Graham Poll",
    viewCount: 1420600,
    youtubeId: "LVdaDkiIOfM",
    startTime: 0,
    commentary: "\"Wanchope on his debut at Old Trafford... past four United defenders and past Schmeichel!\"",
    description: "On his Premier League debut, Costa Rican cult hero Paulo Wanchope gallops from inside his own half past Gary Pallister and Ronny Johnsen to slot past Peter Schmeichel."
  },
  {
    id: 45,
    title: "Ruud van Nistelrooy's 60 Yard Solo Run vs Fulham",
    player: "Ruud van Nistelrooy",
    homeTeam: "Man Utd",
    awayTeam: "Fulham",
    score: "3 : 0",
    season: "2002/03",
    date: "22 Mar 2003",
    era: "2000/01 to 2009/10",
    category: "Solo Magic",
    ball: "Nike Geo Merlin II",
    sponsor: "Vodafone",
    stadium: "Old Trafford",
    referee: "Mike Riley",
    viewCount: 2340100,
    youtubeId: "YCB_0ibu7bo",
    startTime: 0,
    commentary: "\"Van Nistelrooy spins on the halfway line... normally a six yard box poacher, now he's Diego Maradona!\"",
    description: "Famous for scoring inside the six yard box, Ruud van Nistelrooy spins at the halfway line, surges past three Fulham defenders, and slots past Maik Taylor."
  },

  // ================= 4. WONDER FREE KICK =================
  {
    id: 46,
    title: "Cristiano Ronaldo's Knuckleball Masterpiece vs Pompey",
    player: "Cristiano Ronaldo",
    homeTeam: "Man Utd",
    awayTeam: "Portsmouth",
    score: "2 : 0",
    season: "2007/08",
    date: "30 Jan 2008",
    era: "2000/01 to 2009/10",
    category: "Wonder Free Kick",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "AIG",
    stadium: "Old Trafford",
    referee: "Martin Atkinson",
    viewCount: 8774360,
    youtubeId: "3hcfvObigQg",
    startTime: 0,
    commentary: "\"Three steps back... RONALDO! The best free kick you will ever see in the Premier League!\"",
    description: "Power stance, deep exhale, zero spin: the ball clears the wall and dives straight into the postage stamp corner as David James stands frozen."
  },
  {
    id: 47,
    title: "Dimitri Payet's Gravity Bending Free Kick vs Palace",
    player: "Dimitri Payet",
    homeTeam: "West Ham",
    awayTeam: "Crystal Palace",
    score: "2 : 2",
    season: "2015/16",
    date: "2 Apr 2016",
    era: "2010/11 to 2019/20",
    category: "Wonder Free Kick",
    ball: "Nike Ordem 3",
    sponsor: "Betway",
    stadium: "Upton Park",
    referee: "Mark Clattenburg",
    viewCount: 3599605,
    youtubeId: "RbQxaWX5QfU",
    startTime: 0,
    commentary: "\"Payet whips it... HOW HAS THAT GONE IN?! It went 15 feet above the bar and dipped into the opposite corner!\"",
    description: "In the farewell season at the Boleyn Ground, Payet hits a free kick that rises high into the East London sky before dipping violently into the far top corner."
  },
  {
    id: 48,
    title: "John Arne Riise's Release the Kraken Free Kick vs Man Utd",
    player: "John Arne Riise",
    homeTeam: "Liverpool",
    awayTeam: "Man Utd",
    score: "3 : 1",
    season: "2001/02",
    date: "4 Nov 2001",
    era: "2000/01 to 2009/10",
    category: "Wonder Free Kick",
    ball: "Nike Geo Merlin",
    sponsor: "Carlsberg",
    stadium: "Anfield",
    referee: "Graham Poll",
    viewCount: 2635904,
    youtubeId: "LhdSdGfbBow",
    startTime: 0,
    commentary: "\"Hamann touches it... RIISE! OH MY GOODNESS! That almost tore the goalposts out!\"",
    description: "Dietmar Hamann rolls the free kick a yard and Riise unleashes a 70mph left footed thunderbolt into the top corner before whipping his shirt off."
  },
  {
    id: 49,
    title: "Maynor Figueroa Free Kick From Inside His Own Half",
    player: "Maynor Figueroa",
    homeTeam: "Stoke City",
    awayTeam: "Wigan Athletic",
    score: "2 : 2",
    season: "2009/10",
    date: "12 Dec 2009",
    era: "2000/01 to 2009/10",
    category: "Wonder Free Kick",
    ball: "Nike Total 90 Ascente Hi Vis",
    sponsor: "188BET",
    stadium: "Britannia Stadium",
    referee: "Mike Dean",
    viewCount: 1520692,
    youtubeId: "XDSkoJ_RS_I",
    startTime: 0,
    commentary: "\"Quick free kick taken by Figueroa FROM HIS OWN HALF! Thomas Sorensen is caught out!\"",
    description: "Before Stoke can even line up after a foul inside Wigan's half, Honduran defender Maynor Figueroa blasts a 61 yard free kick straight into the top corner."
  },
  {
    id: 50,
    title: "David Beckham's Title Clinching Whip vs Tottenham",
    player: "David Beckham",
    homeTeam: "Man Utd",
    awayTeam: "Tottenham",
    score: "2 : 1",
    season: "1998/99",
    date: "16 May 1999",
    era: "1992/93 to 1999/00",
    category: "Wonder Free Kick",
    ball: "Mitre Ultimax",
    sponsor: "Sharp",
    stadium: "Old Trafford",
    referee: "Graham Poll",
    viewCount: 1980400,
    youtubeId: "tevC1WyUVaU",
    startTime: 0,
    commentary: "\"Beckham curls it... into the postage stamp corner! Ian Walker couldn't reach it!\"",
    description: "Signature wide left arm swing and ferocious whip as David Beckham bends a textbook free kick into the top corner at the Stretford End."
  },
  {
    id: 52,
    title: "Sebastian Larsson's Postage Stamp Free Kick vs Blackburn",
    player: "Sebastian Larsson",
    homeTeam: "Sunderland",
    awayTeam: "Blackburn",
    score: "2 : 1",
    season: "2011/12",
    date: "11 Dec 2011",
    era: "2010/11 to 2019/20",
    category: "Wonder Free Kick",
    ball: "Nike Seitiro Hi Vis",
    sponsor: "Tombola",
    stadium: "Stadium of Light",
    referee: "Peter Walton",
    viewCount: 980300,
    youtubeId: "_W9EoDgdh4k",
    startTime: 0,
    commentary: "\"Seb Larsson in the 92nd minute... Paul Robinson is rooted to the spot!\"",
    description: "In Martin O'Neill's first game as Sunderland boss, dead ball specialist Seb Larsson whips a 92nd minute winner into the top corner."
  },
  {
    id: 54,
    title: "Juan Mata's Top Corner Free Kick at Old Trafford",
    player: "Juan Mata",
    homeTeam: "Chelsea",
    awayTeam: "Man Utd",
    score: "3 : 3",
    season: "2011/12",
    date: "5 Feb 2012",
    era: "2010/11 to 2019/20",
    category: "Wonder Free Kick",
    ball: "Nike Seitiro Hi Vis",
    sponsor: "Samsung",
    stadium: "Stamford Bridge",
    referee: "Howard Webb",
    viewCount: 2150400,
    youtubeId: "91_kxVWcLY4",
    startTime: 0,
    commentary: "\"Mata curls it... right into the top corner! Even David de Gea's fingertips can't keep it out until the 90th minute!\"",
    description: "Juan Mata whips a pinpoint left footed free kick into the top corner in a chaotic 3 : 3 draw against Manchester United."
  },
  {
    id: 56,
    title: "James Ward Prowse's Whipped Masterclass vs Wolves",
    player: "James Ward Prowse",
    homeTeam: "Wolves",
    awayTeam: "Southampton",
    score: "1 : 1",
    season: "2019/20",
    date: "19 Oct 2019",
    era: "2010/11 to 2019/20",
    category: "Wonder Free Kick",
    ball: "Nike Merlin",
    sponsor: "LD Sports",
    stadium: "Molineux",
    referee: "Peter Bankes",
    viewCount: 1420900,
    youtubeId: "gCWjioIR5MM",
    startTime: 0,
    commentary: "\"Ward Prowse with that Beckham style whip... up and down over the wall in the blink of an eye!\"",
    description: "The modern heir to David Beckham's dead ball crown generates ferocious topspin to dip a 26 yard free kick over the wall."
  },
  {
    id: 58,
    title: "Thierry Henry's Quick Free Kick Caught Graham Poll Ready",
    player: "Thierry Henry",
    homeTeam: "Chelsea",
    awayTeam: "Arsenal",
    score: "2 : 2",
    season: "2004/05",
    date: "12 Dec 2004",
    era: "2000/01 to 2009/10",
    category: "Wonder Free Kick",
    ball: "Nike Total 90 Aerow Hi Vis",
    sponsor: "O2",
    stadium: "Stamford Bridge",
    referee: "Graham Poll",
    viewCount: 2450100,
    youtubeId: "Zlpm87eg1ZU",
    startTime: 0,
    commentary: "\"Petr Cech is still lining up his wall on the post... AND HENRY TAKES IT QUICKLY!\"",
    description: "While Eidur Gudjohnsen and Petr Cech are still setting up the wall, Thierry Henry asks referee Graham Poll if he can shoot and curls it into the empty side."
  },
  {
    id: 59,
    title: "Didier Drogba's Knuckleball Rocket vs Arsenal",
    player: "Didier Drogba",
    homeTeam: "Chelsea",
    awayTeam: "Arsenal",
    score: "2 : 0",
    season: "2009/10",
    date: "7 Feb 2010",
    era: "2000/01 to 2009/10",
    category: "Wonder Free Kick",
    ball: "Nike Total 90 Ascente Hi Vis",
    sponsor: "Samsung",
    stadium: "Stamford Bridge",
    referee: "Mike Dean",
    viewCount: 1890300,
    youtubeId: "iXK6Hd5_mbU",
    startTime: 0,
    commentary: "\"Drogba against Arsenal as always... crashes off the inside of the post and in!\"",
    description: "Continuing his relentless scoring record against Arsenal, Didier Drogba whips a vicious dipping free kick off the upright past Manuel Almunia."
  },

  // ================= 5. LAST MINUTE WINNER =================
  {
    id: 61,
    title: "Sergio Aguero's 93:20 Title Winning Chaos vs QPR",
    player: "Sergio Aguero",
    homeTeam: "Man City",
    awayTeam: "QPR",
    score: "3 : 2",
    season: "2011/12",
    date: "13 May 2012",
    era: "2010/11 to 2019/20",
    category: "Last Minute Winner",
    ball: "Nike Seitiro",
    sponsor: "Etihad Airways",
    stadium: "Etihad Stadium",
    referee: "Mike Dean",
    viewCount: 12892637,
    youtubeId: "39VJVyKhbGM",
    startTime: 0,
    commentary: "\"Balotelli... AGUEROOOOOO! I swear you'll never see anything like this ever again!\"",
    description: "Mario Balotelli's only Premier League assist: a sliding pass to Aguero at 93:20 to snatch the Premier League title in the dying seconds."
  },
  {
    id: 62,
    title: "Wayne Rooney's 16 Year Old Debut Screamer vs Arsenal",
    player: "Wayne Rooney",
    homeTeam: "Everton",
    awayTeam: "Arsenal",
    score: "2 : 1",
    season: "2002/03",
    date: "19 Oct 2002",
    era: "2000/01 to 2009/10",
    category: "Last Minute Winner",
    ball: "Nike Geo Merlin II",
    sponsor: "Kejian",
    stadium: "Goodison Park",
    referee: "Uriah Rennie",
    viewCount: 4500063,
    youtubeId: "7Nluk8PdQI8",
    startTime: 0,
    commentary: "\"A brilliant touch by Rooney... OH, A BRILLIANT GOAL! Remember the name: Wayne Rooney!\"",
    description: "Five days before his 17th birthday, Rooney plucks a high ball out of the sky and curls a 90th minute dipping shot off the crossbar to end Arsenal's 30 game unbeaten run."
  },
  {
    id: 63,
    title: "Cheick Tiote's 4 vs 4 Comeback Boom Boom Volley",
    player: "Cheick Tiote",
    homeTeam: "Newcastle",
    awayTeam: "Arsenal",
    score: "4 : 4",
    season: "2010/11",
    date: "5 Feb 2011",
    era: "2010/11 to 2019/20",
    category: "Last Minute Winner",
    ball: "Nike Total 90 Tracer Hi Vis",
    sponsor: "Northern Rock",
    stadium: "St James' Park",
    referee: "Phil Dowd",
    viewCount: 3248045,
    youtubeId: "lpauxRuI_B0",
    startTime: 0,
    commentary: "\"Four nil down at half time... TIOTE! BOOM BOOM CHEICK CHEICK THE ROOM! Four all!\"",
    description: "The late, great Cheick Tiote scores his only ever Premier League goal: a swerving 25 yard weak foot volley to complete a four goal comeback at the death."
  },
  {
    id: 64,
    title: "Federico Macheda's 17 Year Old Turn and Curl vs Villa",
    player: "Federico Macheda",
    homeTeam: "Man Utd",
    awayTeam: "Aston Villa",
    score: "3 : 2",
    season: "2008/09",
    date: "5 Apr 2009",
    era: "2000/01 to 2009/10",
    category: "Last Minute Winner",
    ball: "Nike Total 90 Omni",
    sponsor: "AIG",
    stadium: "Old Trafford",
    referee: "Mike Riley",
    viewCount: 5420300,
    youtubeId: "u0dg-wNInCY",
    startTime: 0,
    commentary: "\"Giggs into Macheda... turns with the backheel and CURLS IT IN! Machedaaaa in the 93rd minute!\"",
    description: "On his debut at age 17, Italian teenager Federico Macheda spins past Luke Young with a Cruyff backheel and bends a 93rd minute title race winner into the far corner."
  },
  {
    id: 65,
    title: "Michael Owen's 96th Minute Manchester Derby Winner",
    player: "Michael Owen",
    homeTeam: "Man Utd",
    awayTeam: "Man City",
    score: "4 : 3",
    season: "2009/10",
    date: "20 Sep 2009",
    era: "2000/01 to 2009/10",
    category: "Last Minute Winner",
    ball: "Nike Total 90 Ascente",
    sponsor: "AIG",
    stadium: "Old Trafford",
    referee: "Martin Atkinson",
    viewCount: 4890200,
    youtubeId: "goho-P1yg-k",
    startTime: 0,
    commentary: "\"Ryan Giggs threads the needle... MICHAEL OWEN IN THE 96TH MINUTE! Four three in the derby!\"",
    description: "After Craig Bellamy equalised in the 90th minute, Ryan Giggs slides a pass to substitute Michael Owen to poke home with the outside of his boot at 95:27."
  },
  {
    id: 66,
    title: "Stan Collymore Closing In at Anfield in the 4 vs 3 Classic",
    player: "Stan Collymore",
    homeTeam: "Liverpool",
    awayTeam: "Newcastle",
    score: "4 : 3",
    season: "1995/96",
    date: "3 Apr 1996",
    era: "1992/93 to 1999/00",
    category: "Last Minute Winner",
    ball: "Mitre Ultimax",
    sponsor: "Carlsberg",
    stadium: "Anfield",
    referee: "Mike Reed",
    viewCount: 3120900,
    youtubeId: "Us9tcKJUG7U",
    startTime: 0,
    commentary: "\"Barnes, Rush,Barnes... STILL JOHN BARNES... COLLYMORE CLOSING IN! Kevin Keegan slumps over the hoardings!\"",
    description: "In the most iconic game of the 1990s, Stan Collymore lashes home a 92nd minute winner at the Kop end as Newcastle manager Kevin Keegan collapses over the advertising boards."
  },
  {
    id: 67,
    title: "Steve Bruce's 97th Minute Header and Fergie Time Birth",
    player: "Steve Bruce",
    homeTeam: "Man Utd",
    awayTeam: "Sheff Wed",
    score: "2 : 1",
    season: "1992/93",
    date: "10 Apr 1993",
    era: "1992/93 to 1999/00",
    category: "Last Minute Winner",
    ball: "Mitre Pro Max",
    sponsor: "Sharp",
    stadium: "Old Trafford",
    referee: "John Hilditch",
    viewCount: 1650400,
    youtubeId: "xsmyTAs9C9k",
    startTime: 0,
    commentary: "\"Pallister crosses... STEVE BRUCE AGAIN IN THE 97TH MINUTE! Brian Kidd is on his knees on the pitch!\"",
    description: "Trailing 1 : 0 in the 86th minute, centre back Steve Bruce scores two headers including a 97th minute winner that sends Brian Kidd leaping onto the Old Trafford turf."
  },
  {
    id: 68,
    title: "Divock Origi's 96th Minute Crossbar Bounce Merseyside Derby Winner",
    player: "Divock Origi",
    homeTeam: "Liverpool",
    awayTeam: "Everton",
    score: "1 : 0",
    season: "2018/19",
    date: "2 Dec 2018",
    era: "2010/11 to 2019/20",
    category: "Last Minute Winner",
    ball: "Nike Merlin Hi Vis",
    sponsor: "Standard Chartered",
    stadium: "Anfield",
    referee: "Chris Kavanagh",
    viewCount: 6780400,
    youtubeId: "1hWnc26HlPU",
    startTime: 0,
    commentary: "\"Van Dijk slices it into the clouds... Pickford touches it onto the bar twice... ORIGI HEADS IT IN! Jurgen Klopp is in the centre circle!\"",
    description: "Virgil van Dijk mishits a volley 60 feet into the air, Jordan Pickford claws it onto his own crossbar twice, and Divock Origi nods in from one yard in the 96th minute."
  },
  {
    id: 69,
    title: "Paul Stalteri's 94th Minute Box to Box Winner at Upton Park",
    player: "Paul Stalteri",
    homeTeam: "West Ham",
    awayTeam: "Tottenham",
    score: "3 : 4",
    season: "2006/07",
    date: "4 Mar 2007",
    era: "2000/01 to 2009/10",
    category: "Last Minute Winner",
    ball: "Nike Total 90 Aerow II",
    sponsor: "Mansion",
    stadium: "Upton Park",
    referee: "Mike Dean",
    viewCount: 1890500,
    youtubeId: "Ut7zRcYa4zM",
    startTime: 0,
    commentary: "\"Defoe shoots, Green parries... PAUL STALTERI IN THE 95TH MINUTE! From 2 : 0 down and 3 : 2 down!\"",
    description: "Canadian full back Paul Stalteri sprints 90 yards in the 95th minute of a chaotic London derby to tap in the rebound and complete an unbelievable 4 : 3 comeback."
  },
  {
    id: 70,
    title: "Danny Welbeck's 95th Minute Header vs Leicester City",
    player: "Danny Welbeck",
    homeTeam: "Arsenal",
    awayTeam: "Leicester City",
    score: "2 : 1",
    season: "2015/16",
    date: "14 Feb 2016",
    era: "2010/11 to 2019/20",
    category: "Last Minute Winner",
    ball: "Nike Ordem 3 Hi Vis",
    sponsor: "Fly Emirates",
    stadium: "Emirates Stadium",
    referee: "Martin Atkinson",
    viewCount: 3450200,
    youtubeId: "gV6ob0Ycwrk",
    startTime: 0,
    commentary: "\"Last kick of the match... Ozil whips it in... WELBECK! There is your fairytale!\"",
    description: "Returning after ten months out injured, Danny Welbeck glances Mesut Ozil's 95th minute free kick past Kasper Schmeichel."
  },
  {
    id: 71,
    title: "John O'Shea's 91st Minute Smash in Front of the Kop",
    player: "John O'Shea",
    homeTeam: "Liverpool",
    awayTeam: "Man Utd",
    score: "0 : 1",
    season: "2006/07",
    date: "3 Mar 2007",
    era: "2000/01 to 2009/10",
    category: "Last Minute Winner",
    ball: "Nike Total 90 Aerow II",
    sponsor: "AIG",
    stadium: "Anfield",
    referee: "Martin Atkinson",
    viewCount: 1920400,
    youtubeId: "Rai6_cmzuds",
    startTime: 0,
    commentary: "\"Reina spills Ronaldo's free kick... JOHN O'SHEA ROOFS IT IN THE 91ST MINUTE FOR TEN MAN UNITED!\"",
    description: "With Manchester United down to ten men after Paul Scholes' red card, utility hero John O'Shea pounces in the 91st minute to smash the winner into the roof of the Kop net."
  },
  {
    id: 72,
    title: "Raheem Sterling's 97th Minute Curled Winner at Bournemouth",
    player: "Raheem Sterling",
    homeTeam: "Bournemouth",
    awayTeam: "Man City",
    score: "1 : 2",
    season: "2017/18",
    date: "26 Aug 2017",
    era: "2010/11 to 2019/20",
    category: "Last Minute Winner",
    ball: "Nike Ordem V",
    sponsor: "Etihad Airways",
    stadium: "Vitality Stadium",
    referee: "Mike Dean",
    viewCount: 2890100,
    youtubeId: "uYCDWdsBDqI",
    startTime: 0,
    commentary: "\"97th minute on the clock... STERLING! And Mike Dean sends him off for celebrating in the crowd!\"",
    description: "Raheem Sterling curls home a deflected 97th minute winner at Bournemouth and is immediately shown a second yellow card by Mike Dean for celebrating with the away fans."
  },
  {
    id: 73,
    title: "Ji Dong won's 93rd Minute Counter Attack Winner vs Man City",
    player: "Ji Dong won",
    homeTeam: "Sunderland",
    awayTeam: "Man City",
    score: "1 : 0",
    season: "2011/12",
    date: "1 Jan 2012",
    era: "2010/11 to 2019/20",
    category: "Last Minute Winner",
    ball: "Nike Seitiro Hi Vis",
    sponsor: "Tombola",
    stadium: "Stadium of Light",
    referee: "Kevin Friend",
    viewCount: 1740300,
    youtubeId: "D2MYlT-Mn5E",
    startTime: 0,
    commentary: "\"Sessegnon into Ji Dong won... rounds Joe Hart with the last kick of New Year's Day!\"",
    description: "In the 93rd minute on New Year's Day, South Korean striker Ji Dong won exchanges passes with Stephane Sessegnon and rounds Joe Hart to stun the league leaders."
  },
  {
    id: 75,
    title: "Yossi Benayoun's 90th Minute Chaos Equaliser in 4 vs 4 vs Arsenal",
    player: "Yossi Benayoun",
    homeTeam: "Liverpool",
    awayTeam: "Arsenal",
    score: "4 : 4",
    season: "2008/09",
    date: "21 Apr 2009",
    era: "2000/01 to 2009/10",
    category: "Last Minute Winner",
    ball: "Nike Total 90 Omni",
    sponsor: "Carlsberg",
    stadium: "Anfield",
    referee: "Howard Webb",
    viewCount: 4120800,
    youtubeId: "uBXH6VUCtSk",
    startTime: 0,
    commentary: "\"Arshavin has four, Torres has two... AND BENAYOUN MAKES IT FOUR FOUR IN THE 93RD MINUTE!\"",
    description: "After Andrey Arshavin scored four goals at Anfield, Yossi Benayoun pokes home in the 93rd minute of stoppage time to seal an unforgettable 4 : 4 thriller."
  },

  // ================= 6. CRUNCHING TACKLE =================
  {
    id: 76,
    title: "Ledley King's Superhuman Recovery Tackle on Arjen Robben",
    player: "Ledley King",
    homeTeam: "Tottenham",
    awayTeam: "Chelsea",
    score: "2 : 1",
    season: "2006/07",
    date: "5 Nov 2006",
    era: "2000/01 to 2009/10",
    category: "Crunching Tackle",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "Mansion",
    stadium: "White Hart Lane",
    referee: "Graham Poll",
    viewCount: 2412890,
    youtubeId: "SjxmyjLp9tg",
    startTime: 0,
    commentary: "\"Robben is clean through on Robinson... LEDLEY KING! What a recovery tackle!\"",
    description: "With one working knee and zero cartilage, Ledley King eats up 15 yards of turf to hook the ball cleanly off Arjen Robben's left boot just as he pulls the trigger."
  },
  {
    id: 77,
    title: "Roy Keane and Patrick Vieira Bone Crunching Highbury Battles",
    player: "Roy Keane & Patrick Vieira",
    homeTeam: "Arsenal",
    awayTeam: "Man Utd",
    score: "2 : 4",
    season: "2004/05",
    date: "1 Feb 2005",
    era: "2000/01 to 2009/10",
    category: "Crunching Tackle",
    ball: "Nike Total 90 Aerow Hi Vis",
    sponsor: "O2 / Vodafone",
    stadium: "Highbury",
    referee: "Graham Poll",
    viewCount: 4863272,
    youtubeId: "-ue1BFiKTtI",
    startTime: 0,
    commentary: "\"I'll see you out there! Shut your mouth! And now flying into full blooded reducers on the pitch!\"",
    description: "From the Highbury tunnel war of words straight into thunderous midfield reducers, Keane and Vieira defined the ferocity of Golden Era Barclays."
  },
  {
    id: 78,
    title: "Sol Campbell's Endless Sliding Tackle at Old Trafford",
    player: "Sol Campbell",
    homeTeam: "Man Utd",
    awayTeam: "Arsenal",
    score: "0 : 1",
    season: "2001/02",
    date: "8 May 2002",
    era: "2000/01 to 2009/10",
    category: "Crunching Tackle",
    ball: "Nike Geo Merlin",
    sponsor: "Sega / Dreamcast",
    stadium: "Old Trafford",
    referee: "Paul Durkin",
    viewCount: 1215400,
    youtubeId: "gM1Z1F2e6B0",
    startTime: 0,
    commentary: "\"Sol Campbell comes across like a freight train! Took the ball, the man, and half the Old Trafford turf!\"",
    description: "On the night Arsenal clinched the title at Old Trafford, Sol Campbell thundered into a bone rattling touchline slide tackle that echoed around Manchester."
  },
  {
    id: 79,
    title: "Nemanja Vidic Dives Head First Into the Turf to Block",
    player: "Nemanja Vidic",
    homeTeam: "Man Utd",
    awayTeam: "Swansea City",
    score: "2 : 0",
    season: "2013/14",
    date: "11 Jan 2014",
    era: "2010/11 to 2019/20",
    category: "Crunching Tackle",
    ball: "Nike Incyte Hi Vis",
    sponsor: "Aon",
    stadium: "Old Trafford",
    referee: "Chris Foy",
    viewCount: 1318450,
    youtubeId: "eb3p9s61m3A",
    startTime: 0,
    commentary: "\"Vidic throws his own head at ground level in front of a swinging boot! Pure Serbian steel!\"",
    description: "After losing his footing, Nemanja Vidic launches his entire body horizontally two inches off the grass to block a shot with his face."
  },
  {
    id: 80,
    title: "John Terry's Salmon Dive Header Block on the Turf",
    player: "John Terry",
    homeTeam: "Chelsea",
    awayTeam: "Tottenham",
    score: "2 : 1",
    season: "2010/11",
    date: "30 Apr 2011",
    era: "2010/11 to 2019/20",
    category: "Crunching Tackle",
    ball: "Nike Total 90 Tracer",
    sponsor: "Samsung",
    stadium: "Stamford Bridge",
    referee: "Andre Marriner",
    viewCount: 2150400,
    youtubeId: "WsJLOXJRrqc",
    startTime: 0,
    commentary: "\"John Terry dives horizontally with his hands behind his back to head the ball off a striker's boot!\"",
    description: "Classic John Terry defending: arms tucked behind his back, diving parallel to the grass to throw his forehead into the path of a goalbound shot."
  },
  {
    id: 88,
    title: "Aaron Wan Bissaka's Spider Legs Sliding Tackle vs Sterling",
    player: "Aaron Wan Bissaka",
    homeTeam: "Man City",
    awayTeam: "Man Utd",
    score: "1 : 2",
    season: "2019/20",
    date: "7 Dec 2019",
    era: "2010/11 to 2019/20",
    category: "Crunching Tackle",
    ball: "Nike Merlin Hi Vis",
    sponsor: "Chevrolet",
    stadium: "Etihad Stadium",
    referee: "Anthony Taylor",
    viewCount: 3450600,
    youtubeId: "EQqf9lRtZvo",
    startTime: 0,
    commentary: "\"Sterling thinks he's past him... WAN BISSAKA wraps his leg around from behind to hook it clean!\"",
    description: "In the Manchester derby, Aaron Wan Bissaka produces five Telescopic Spider tackles on Raheem Sterling without conceding a single foul."
  },

  // ================= 7. ICONIC CELEBRATION =================
  {
    id: 91,
    title: "Eric Cantona's Chip and Collar Popped 360 Stare",
    player: "Eric Cantona",
    homeTeam: "Man Utd",
    awayTeam: "Sunderland",
    score: "5 : 0",
    season: "1996/97",
    date: "21 Dec 1996",
    era: "1992/93 to 1999/00",
    category: "Iconic Celebration",
    ball: "Mitre Ultimax",
    sponsor: "Sharp",
    stadium: "Old Trafford",
    referee: "Roger Dilkes",
    viewCount: 6399639,
    youtubeId: "JpyJtjLoDKg",
    startTime: 0,
    commentary: "\"Cantona drives forward, one two with McClair... oh, look at that chip! Majestic!\"",
    description: "Cantona dances through two tackles, chips Lionel Perez into the top corner, and slowly turns in a 360 circle with his collar popped soaking in Old Trafford."
  },
  {
    id: 92,
    title: "Michu's 2 Million Pound Debut Brace and Ear Twirl Celebration",
    player: "Michu",
    homeTeam: "QPR",
    awayTeam: "Swansea City",
    score: "0 : 5",
    season: "2012/13",
    date: "18 Aug 2012",
    era: "2010/11 to 2019/20",
    category: "Iconic Celebration",
    ball: "Nike Maxim",
    sponsor: "32Red",
    stadium: "Loftus Road",
    referee: "Lee Probert",
    viewCount: 2436023,
    youtubeId: "4Qe4Q27TmOw",
    startTime: 0,
    commentary: "\"Michu curls it into the roof of the net! What a bargain at two million pounds!\"",
    description: "Baggy white and gold Centenary shirt, floppy hair, and the iconic hand twirl ear celebration as Michu announces the greatest single season wonder run in history."
  },
  {
    id: 93,
    title: "Thierry Henry's 80 Yard North London Derby Knee Slide",
    player: "Thierry Henry",
    homeTeam: "Arsenal",
    awayTeam: "Tottenham",
    score: "3 : 0",
    season: "2002/03",
    date: "16 Nov 2002",
    era: "2000/01 to 2009/10",
    category: "Iconic Celebration",
    ball: "Nike Geo Merlin II",
    sponsor: "O2",
    stadium: "Highbury",
    referee: "Mike Riley",
    viewCount: 3187203,
    youtubeId: "yTTdH1ybU88",
    startTime: 0,
    commentary: "\"Henry from inside his own half... turns Carr inside out, slots it home and slides on his knees!\"",
    description: "Henry picks up possession 25 yards inside his own half, glides past Spurs' defence, and sprints back the entire length of the pitch to slide on his knees in front of the away end."
  },
  {
    id: 94,
    title: "Jimmy Bullard's Half Time Team Talk Finger Wag Celebration",
    player: "Jimmy Bullard",
    homeTeam: "Man City",
    awayTeam: "Hull City",
    score: "1 : 1",
    season: "2009/10",
    date: "28 Nov 2009",
    era: "2000/01 to 2009/10",
    category: "Iconic Celebration",
    ball: "Nike Total 90 Ascente Hi Vis",
    sponsor: "Totesport.com",
    stadium: "Etihad Stadium",
    referee: "Lee Probert",
    viewCount: 4332515,
    youtubeId: "xnmAXUsoMAo",
    startTime: 0,
    commentary: "\"Bullard equalises... and all the Hull players sit in a circle while he recreates Phil Brown's pitchside team talk!\"",
    description: "A year after Phil Brown humiliated Hull by keeping them on the pitch at half time, Jimmy Bullard scores at the exact same end and mocks his own manager."
  },
  {
    id: 95,
    title: "Mario Balotelli's Why Always Me Undershirt at Old Trafford",
    player: "Mario Balotelli",
    homeTeam: "Man Utd",
    awayTeam: "Man City",
    score: "1 : 6",
    season: "2011/12",
    date: "23 Oct 2011",
    era: "2010/11 to 2019/20",
    category: "Iconic Celebration",
    ball: "Nike Seitiro",
    sponsor: "Etihad Airways",
    stadium: "Old Trafford",
    referee: "Mark Clattenburg",
    viewCount: 8940200,
    youtubeId: "m4-dVOCSgdk",
    startTime: 0,
    commentary: "\"Balotelli passes it into the corner... pulls his shirt over his head: WHY ALWAYS ME?\"",
    description: "The day after setting off fireworks in his own bathroom, Mario Balotelli opens the scoring in a 6 : 1 derby rout at Old Trafford and unveils his immortal undershirt."
  },
  {
    id: 96,
    title: "Luis Suarez Diving Like a Salmon in Front of David Moyes",
    player: "Luis Suarez",
    homeTeam: "Everton",
    awayTeam: "Liverpool",
    score: "2 : 2",
    season: "2012/13",
    date: "28 Oct 2012",
    era: "2010/11 to 2019/20",
    category: "Iconic Celebration",
    ball: "Nike Maxim",
    sponsor: "Standard Chartered",
    stadium: "Goodison Park",
    referee: "Andre Marriner",
    viewCount: 5120400,
    youtubeId: "3pgREH4z0vU",
    startTime: 0,
    commentary: "\"Suarez scores... and sprints straight over to dive on his belly right at David Moyes' feet!\"",
    description: "After Everton boss David Moyes accused him of diving before the derby, Luis Suarez sprints to the home dugout and executes a full length belly flop."
  },
  {
    id: 97,
    title: "Jurgen Klinsmann's Debut Dive Celebration at Hillsborough",
    player: "Jurgen Klinsmann",
    homeTeam: "Sheff Wed",
    awayTeam: "Tottenham",
    score: "3 : 4",
    season: "1994/95",
    date: "20 Aug 1994",
    era: "1992/93 to 1999/00",
    category: "Iconic Celebration",
    ball: "Mitre Pro Max",
    sponsor: "Holsten",
    stadium: "Hillsborough",
    referee: "Robbie Hart",
    viewCount: 2340900,
    youtubeId: "0eMYkqUDg-g",
    startTime: 0,
    commentary: "\"Klinsmann heads in on his debut... and they all dive across the Hillsborough turf!\"",
    description: "Winning over the English press instantly on opening day, Jurgen Klinsmann mocks his own reputation by leading a synchronized swan dive celebration."
  },
  {
    id: 98,
    title: "Wayne Rooney's Boxing Knockout Fall Celebration vs Spurs",
    player: "Wayne Rooney",
    homeTeam: "Man Utd",
    awayTeam: "Tottenham",
    score: "3 : 0",
    season: "2014/15",
    date: "15 Mar 2015",
    era: "2010/11 to 2019/20",
    category: "Iconic Celebration",
    ball: "Nike Ordem 2",
    sponsor: "Chevrolet",
    stadium: "Old Trafford",
    referee: "Mark Clattenburg",
    viewCount: 6780300,
    youtubeId: "Wp8x_Vf1WII",
    startTime: 0,
    commentary: "\"Rooney scores a solo goal, shadow boxes at the corner flag and falls flat on his back!\"",
    description: "On the morning a tabloid video emerged of Phil Bardsley knocking him out in his kitchen, Rooney scores against Spurs, throws four air punches, and falls stiffly backwards."
  },
  {
    id: 99,
    title: "Craig Bellamy's Golf Swing Celebration vs Man Utd",
    player: "Craig Bellamy",
    homeTeam: "Man City",
    awayTeam: "Man Utd",
    score: "2 : 1",
    season: "2007/08",
    date: "9 Feb 2008",
    era: "2000/01 to 2009/10",
    category: "Iconic Celebration",
    ball: "Nike Total 90 Aerow II",
    sponsor: "XL.com",
    stadium: "Upton Park",
    referee: "Mike Riley",
    viewCount: 1450200,
    youtubeId: "nWu2hAjdZVo",
    startTime: 0,
    commentary: "\"Craig Bellamy rifles it in and pulls out the imaginary 8 iron golf swing at the corner flag!\"",
    description: "Making light of his infamous training camp golf club incident, Welsh firebrand Craig Bellamy celebrates by teeing up an imaginary golf ball."
  },
  {
    id: 100,
    title: "Facundo Sava Pulling the Zorro Mask Out of His Sock",
    player: "Facundo Sava",
    homeTeam: "Fulham",
    awayTeam: "Charlton",
    score: "1 : 0",
    season: "2002/03",
    date: "20 Oct 2002",
    era: "2000/01 to 2009/10",
    category: "Iconic Celebration",
    ball: "Nike Geo Merlin II",
    sponsor: "Betfair.com",
    stadium: "Loftus Road",
    referee: "Paul Durkin",
    viewCount: 890100,
    youtubeId: "mEoP3QGqzGg",
    startTime: 0,
    commentary: "\"Facundo Sava scores for Fulham and pulls a black Zorro mask out of his sock!\"",
    description: "Argentine striker Facundo Sava kept a black Zorro mask tucked inside his shinpad so he could transform into a masked vigilante every time he scored."
  },
  {
    id: 102,
    title: "Jonas Gutierrez Putting On the Spider Man Mask",
    player: "Jonas Gutierrez",
    homeTeam: "Aston Villa",
    awayTeam: "Newcastle",
    score: "1 : 1",
    season: "2009/10",
    date: "18 Apr 2010",
    era: "2000/01 to 2009/10",
    category: "Iconic Celebration",
    ball: "Nike Total 90 Ascente",
    sponsor: "Northern Rock",
    stadium: "St James' Park",
    referee: "Chris Foy",
    viewCount: 1340800,
    youtubeId: "lzluxh4tU4A",
    startTime: 0,
    commentary: "\"Jonas Gutierrez scores and pulls a full red Spider Man mask over his head!\"",
    description: "Newcastle cult hero Jonas Gutierrez reaches into his waistband to pull on a Spider Man mask and shoot webs at the Gallowgate End."
  },
  {
    id: 103,
    title: "Peter Crouch's Robot Dance Celebration",
    player: "Peter Crouch",
    homeTeam: "Liverpool",
    awayTeam: "Portsmouth",
    score: "3 : 0",
    season: "2005/06",
    date: "19 Nov 2005",
    era: "2000/01 to 2009/10",
    category: "Iconic Celebration",
    ball: "Nike Total 90 Aerow Hi Vis",
    sponsor: "Carlsberg",
    stadium: "Anfield",
    referee: "Steve Bennett",
    viewCount: 3890500,
    youtubeId: "znYNhR2cSLg",
    startTime: 0,
    commentary: "\"Crouch scores and brings out the mechanical 6ft 7in Robot dance!\"",
    description: "Nobody in football history captured the imagination quite like 6ft 7in Peter Crouch busting out the stiff armed Robot celebration."
  },
  {
    id: 104,
    title: "Alan Shearer's 201st Newcastle Record Goal One Arm Salute",
    player: "Alan Shearer",
    homeTeam: "Newcastle",
    awayTeam: "Portsmouth",
    score: "2 : 0",
    season: "2005/06",
    date: "4 Feb 2006",
    era: "2000/01 to 2009/10",
    category: "Iconic Celebration",
    ball: "Nike Total 90 Aerow Hi Vis",
    sponsor: "Northern Rock",
    stadium: "St James' Park",
    referee: "Steve Dunn",
    viewCount: 1980300,
    youtubeId: "HiLeGGU4Qbc",
    startTime: 0,
    commentary: "\"SHEARER! Goal number 201 to break Jackie Milburn's record, and up goes the right hand!\"",
    description: "Breaking Jackie Milburn's all time Newcastle scoring record before finishing on 260 Premier League goals, Shearer wheels away with his trademark single raised right hand."
  },
  {
    id: 105,
    title: "Nani's Somersault Celebration After Bizarre Goal vs Spurs",
    player: "Nani",
    homeTeam: "Man Utd",
    awayTeam: "Tottenham",
    score: "2 : 0",
    season: "2010/11",
    date: "30 Oct 2010",
    era: "2010/11 to 2019/20",
    category: "Iconic Celebration",
    ball: "Nike Total 90 Tracer",
    sponsor: "Aon",
    stadium: "Old Trafford",
    referee: "Mark Clattenburg",
    viewCount: 4120900,
    youtubeId: "aKgQg3efkQo",
    startTime: 0,
    commentary: "\"Gomes rolls the ball out thinking it's a free kick... Nani taps it into the empty net and does a backflip!\"",
    description: "Heurelho Gomes rolls the ball down assuming a free kick was given, only for Nani to sneak up, roll it into the empty net, and launch into a full somersault."
  },

  // ================= 8. TOUCHLINE CHAOS =================
  {
    id: 106,
    title: "Rory Delap's Towel Dried Javelin Throw Chaos",
    player: "Rory Delap",
    homeTeam: "Stoke City",
    awayTeam: "Arsenal",
    score: "2 : 1",
    season: "2008/09",
    date: "1 Nov 2008",
    era: "2000/01 to 2009/10",
    category: "Touchline Chaos",
    ball: "Nike Total 90 Omni Hi Vis",
    sponsor: "Britannia",
    stadium: "Britannia Stadium",
    referee: "Rob Styles",
    viewCount: 3214161,
    youtubeId: "RoF-S60E1aE",
    startTime: 0,
    commentary: "\"Delap dries the ball with the towel inside his vest... flat 45 yard missile into the six yard box!\"",
    description: "Arsene Wenger complained that Delap's throws were unfair as Stoke turned every throw in at a windy Britannia Stadium into a flat trajectory corner kick."
  },
  {
    id: 107,
    title: "Paolo Di Canio Pushes Referee Paul Alcock Over",
    player: "Paolo Di Canio",
    homeTeam: "Sheff Wed",
    awayTeam: "Arsenal",
    score: "1 : 0",
    season: "1998/99",
    date: "26 Sep 1998",
    era: "1992/93 to 1999/00",
    category: "Touchline Chaos",
    ball: "Mitre Ultimax",
    sponsor: "Sanderson",
    stadium: "Hillsborough",
    referee: "Paul Alcock",
    viewCount: 4735649,
    youtubeId: "J9CLiDqYfLc",
    startTime: 0,
    commentary: "\"Red card for Di Canio... AND HE'S PUSHED THE REFEREE OVER! Look at Paul Alcock stumble!\"",
    description: "After clashing with Martin Keown, Di Canio shoves referee Paul Alcock in the chest, sending him stumbling backwards in slow motion for five yards."
  },
  {
    id: 108,
    title: "Temuri Ketsbaia Kicks the Advertising Hoardings to Pieces",
    player: "Temuri Ketsbaia",
    homeTeam: "Newcastle",
    awayTeam: "Bolton",
    score: "2 : 1",
    season: "1997/98",
    date: "17 Jan 1998",
    era: "1992/93 to 1999/00",
    category: "Touchline Chaos",
    ball: "Mitre Ultimax",
    sponsor: "Newcastle Brown Ale",
    stadium: "St James' Park",
    referee: "Paul Durkin",
    viewCount: 1937349,
    youtubeId: "xeMcXB29JTw",
    startTime: 0,
    commentary: "\"Ketsbaia scores a late winner... and now he's ripping his shirt off and attacking the McDonald's hoardings!\"",
    description: "Furious at being benched, Georgian cult hero Temuri Ketsbaia scores a 90th minute winner, hurls his shirt into the crowd, and violently boots the advertising boards."
  },
  {
    id: 109,
    title: "Emmanuel Adebayor Sprints 100 Yards to Knee Slide at Arsenal Fans",
    player: "Emmanuel Adebayor",
    homeTeam: "Man City",
    awayTeam: "Arsenal",
    score: "4 : 2",
    season: "2009/10",
    date: "12 Sep 2009",
    era: "2000/01 to 2009/10",
    category: "Touchline Chaos",
    ball: "Nike Total 90 Ascente",
    sponsor: "Etihad Airways",
    stadium: "Etihad Stadium",
    referee: "Mark Clattenburg",
    viewCount: 9450800,
    youtubeId: "DQwS2cONShU",
    startTime: 0,
    commentary: "\"Adebayor heads it in... AND HE'S SPRINTING THE FULL LENGTH OF THE PITCH TO SLIDE IN FRONT OF THE ARSENAL FANS!\"",
    description: "After scoring against his former club, Emmanuel Adebayor ignores his own teammates to sprint 100 yards and execute a knee slide with arms outstretched in front of the away end."
  },
  {
    id: 110,
    title: "Arsene Wenger Sent to the Stands at Old Trafford Outstretched Arms",
    player: "Arsene Wenger",
    homeTeam: "Man Utd",
    awayTeam: "Arsenal",
    score: "2 : 1",
    season: "2009/10",
    date: "29 Aug 2009",
    era: "2000/01 to 2009/10",
    category: "Touchline Chaos",
    ball: "Nike Total 90 Ascente",
    sponsor: "Fly Emirates",
    stadium: "Old Trafford",
    referee: "Mike Dean",
    viewCount: 5890300,
    youtubeId: "DCYOcETY5sM",
    startTime: 0,
    commentary: "\"Wenger kicks a water bottle... Mike Dean sends him off, and now he's standing on the platform above the United fans!\"",
    description: "Banished for kicking a plastic water bottle in stoppage time, Arsene Wenger climbs onto the concrete gangway among Manchester United fans and stands with his arms outstretched."
  },
  {
    id: 111,
    title: "Lee Bowyer and Kieron Dyer Fighting Each Other on the Pitch",
    player: "Lee Bowyer & Kieron Dyer",
    homeTeam: "Newcastle",
    awayTeam: "Aston Villa",
    score: "0 : 3",
    season: "2004/05",
    date: "2 Apr 2005",
    era: "2000/01 to 2009/10",
    category: "Touchline Chaos",
    ball: "Nike Total 90 Aerow",
    sponsor: "Northern Rock",
    stadium: "St James' Park",
    referee: "Barry Knight",
    viewCount: 6120400,
    youtubeId: "aaY6lN1jx5Y",
    startTime: 0,
    commentary: "\"Bowyer and Dyer are trading punches with each other! Gareth Barry has to break up two Newcastle players!\"",
    description: "Trailing 3 : 0 with eight men left on the pitch, Newcastle teammates Lee Bowyer and Kieron Dyer start throwing punches at each other until Aston Villa's Gareth Barry separates them."
  },
  {
    id: 112,
    title: "Alan Pardew and Arsene Wenger Touchline Shove at Upton Park",
    player: "Alan Pardew & Arsene Wenger",
    homeTeam: "West Ham",
    awayTeam: "Arsenal",
    score: "1 : 0",
    season: "2006/07",
    date: "5 Nov 2006",
    era: "2000/01 to 2009/10",
    category: "Touchline Chaos",
    ball: "Nike Total 90 Aerow II Hi Vis",
    sponsor: "Jobserve",
    stadium: "Upton Park",
    referee: "Rob Styles",
    viewCount: 2890100,
    youtubeId: "-v3Kvg9e_4w",
    startTime: 0,
    commentary: "\"Marlon Harewood scores in the 89th minute... Pardew celebrates in Wenger's face and Wenger shoves him!\"",
    description: "When Marlon Harewood scores an 89th minute winner, Alan Pardew pumps his fists right in front of Arsene Wenger, sparking a touchline shoving match."
  },
  {
    id: 115,
    title: "Nigel Pearson Pinning Crystal Palace's James McArthur on the Sideline",
    player: "Nigel Pearson",
    homeTeam: "Leicester City",
    awayTeam: "Crystal Palace",
    score: "0 : 1",
    season: "2014/15",
    date: "7 Feb 2015",
    era: "2010/11 to 2019/20",
    category: "Touchline Chaos",
    ball: "Nike Ordem 2 Hi Vis",
    sponsor: "King Power",
    stadium: "King Power Stadium",
    referee: "Lee Mason",
    viewCount: 2340500,
    youtubeId: "EkFCW9WuJAA",
    startTime: 0,
    commentary: "\"James McArthur slides into Nigel Pearson on the touchline... and Pearson is holding him by the collar on the ground!\"",
    description: "After Palace midfielder James McArthur accidentally bowls him over in the technical area, Leicester manager Nigel Pearson grabs his shirt collar and refuses to let him leave."
  },
  {
    id: 116,
    title: "Eden Hazard Kicking the Swansea Ballboy Charlie Morgan",
    player: "Eden Hazard",
    homeTeam: "Swansea City",
    awayTeam: "Chelsea",
    score: "0 : 0",
    season: "2012/13",
    date: "23 Jan 2013",
    era: "2010/11 to 2019/20",
    category: "Touchline Chaos",
    ball: "Nike Maxim Hi Vis",
    sponsor: "Samsung",
    stadium: "Liberty Stadium",
    referee: "Chris Foy",
    viewCount: 8920400,
    youtubeId: "aX09CTIShm8",
    startTime: 0,
    commentary: "\"The ballboy has dived on top of the ball to waste time... and Eden Hazard has kicked the ball out from underneath his ribs!\"",
    description: "Swansea ballboy Charlie Morgan flops onto the ball behind the goal to waste time, prompting Eden Hazard to toe poke the ball from under his stomach and get sent off."
  },
  {
    id: 118,
    title: "David Dunn's Attempted Rabona Faceplant in the Derby",
    player: "David Dunn",
    homeTeam: "Birmingham",
    awayTeam: "Aston Villa",
    score: "0 : 2",
    season: "2004/05",
    date: "20 Mar 2005",
    era: "2000/01 to 2009/10",
    category: "Touchline Chaos",
    ball: "Nike Total 90 Aerow",
    sponsor: "Flybe.com",
    stadium: "St Andrew's",
    referee: "Mike Riley",
    viewCount: 3120600,
    youtubeId: "sd38KUjmOho",
    startTime: 0,
    commentary: "\"David Dunn tries a rabona cross... kicks his own standing leg and faceplants straight into the turf!\"",
    description: "Attempting an audacious rabona pass in a heated derby, David Dunn's boots tangle together and send him crashing flat onto his face."
  },
  {
    id: 119,
    title: "Alan Pardew Headbutting Hull's David Meyler on the Touchline",
    player: "Alan Pardew",
    homeTeam: "Hull City",
    awayTeam: "Newcastle",
    score: "1 : 4",
    season: "2013/14",
    date: "1 Mar 2014",
    era: "2010/11 to 2019/20",
    category: "Touchline Chaos",
    ball: "Nike Incyte",
    sponsor: "Wonga",
    stadium: "KC Stadium",
    referee: "Kevin Friend",
    viewCount: 4560200,
    youtubeId: "HmC3jXJP7SE",
    startTime: 0,
    commentary: "\"David Meyler goes to take a quick throw in... AND NEWCASTLE MANAGER ALAN PARDEW HAS HEADBUTTED HIM!\"",
    description: "While leading 3 : 1 away at Hull City, Newcastle manager Alan Pardew inexplicably leans in and headbutts Hull midfielder David Meyler on the touchline."
  },
  {
    id: 120,
    title: "Battle of Old Trafford: Martin Keown Jumping on Van Nistelrooy",
    player: "Martin Keown & Ruud van Nistelrooy",
    homeTeam: "Man Utd",
    awayTeam: "Arsenal",
    score: "0 : 0",
    season: "2003/04",
    date: "21 Sep 2003",
    era: "2000/01 to 2009/10",
    category: "Touchline Chaos",
    ball: "Nike Geo Merlin",
    sponsor: "O2 / Vodafone",
    stadium: "Old Trafford",
    referee: "Steve Bennett",
    viewCount: 7890400,
    youtubeId: "BhGUpVCW84I",
    startTime: 0,
    commentary: "\"Van Nistelrooy crashes the 92nd minute penalty off the crossbar... AND MARTIN KEOWN LEAPS ON TOP OF HIM!\"",
    description: "The moment the Invincibles era was forged: Ruud van Nistelrooy's stoppage time penalty cannons off the bar and Martin Keown leaps in the air roaring in his face."
  },

  // ================= 9. MEMORABLE MOMENT =================
  {
    id: 121,
    title: "David Beckham's Halfway Line Lob at Selhurst Park",
    player: "David Beckham",
    homeTeam: "Wimbledon",
    awayTeam: "Man Utd",
    score: "0 : 3",
    season: "1996/97",
    date: "17 Aug 1996",
    era: "1992/93 to 1999/00",
    category: "Memorable Moment",
    ball: "Mitre Ultimax",
    sponsor: "Sharp",
    stadium: "Selhurst Park",
    referee: "Keith Burge",
    viewCount: 6944378,
    youtubeId: "u4tVnpwp8d4",
    startTime: 0,
    commentary: "\"Beckham from the halfway line... IT'S IN! Neil Sullivan is stranded!\"",
    description: "On the opening day of the 1996/97 season, a 21 year old David Beckham spots Neil Sullivan off his line and floats a 57 yard strike straight into the net."
  },
  {
    id: 122,
    title: "Portsmouth 7 vs 4 Reading: Highest Scoring Barclays Madness",
    player: "Benjani & Niko Kranjcar",
    homeTeam: "Portsmouth",
    awayTeam: "Reading",
    score: "7 : 4",
    season: "2007/08",
    date: "29 Sep 2007",
    era: "2000/01 to 2009/10",
    category: "Memorable Moment",
    ball: "Nike Total 90 Aerow II",
    sponsor: "OKI / Kyocera",
    stadium: "Fratton Park",
    referee: "Mark Halsey",
    viewCount: 2117878,
    youtubeId: "EcbYYV64NZw",
    startTime: 0,
    commentary: "\"Six goals in the last 20 minutes! It's Portsmouth SEVEN, Reading FOUR!\"",
    description: "Eleven goals, missed penalties, own goals, Benjani hat trick, and zero defending in the highest scoring game in Premier League history."
  },
  {
    id: 123,
    title: "Luis Suarez's 50 Yard Lob and 4 Goal Destruction of Norwich",
    player: "Luis Suarez",
    homeTeam: "Liverpool",
    awayTeam: "Norwich City",
    score: "5 : 1",
    season: "2013/14",
    date: "4 Dec 2013",
    era: "2010/11 to 2019/20",
    category: "Memorable Moment",
    ball: "Nike Incyte Hi Vis",
    sponsor: "Standard Chartered",
    stadium: "Anfield",
    referee: "Kevin Friend",
    viewCount: 4521443,
    youtubeId: "V8Kfc7dIcaA",
    startTime: 0,
    commentary: "\"Suarez flicks it over Fer, volleys from 40 yards... Four Puskas contenders in a single match!\"",
    description: "A 45 yard dipping half volley, a sombrero flick and volley, a curling free kick, and a close range finish in the ultimate individual Barclays performance."
  },
  {
    id: 124,
    title: "Dion Dublin Sneaking Behind Shay Given to Rob the Ball",
    player: "Dion Dublin",
    homeTeam: "Coventry City",
    awayTeam: "Newcastle",
    score: "2 : 2",
    season: "1997/98",
    date: "8 Nov 1997",
    era: "1992/93 to 1999/00",
    category: "Memorable Moment",
    ball: "Mitre Ultimax",
    sponsor: "Subaru",
    stadium: "Highfield Road",
    referee: "Dermot Gallagher",
    viewCount: 3890400,
    youtubeId: "hhA3wcvrgyY",
    startTime: 0,
    commentary: "\"Shay Given drops the ball on the turf without looking behind him... AND DION DUBLIN TIPTOES IN TO SCORE!\"",
    description: "Unaware that Dion Dublin is still standing behind the goal line, Shay Given rolls the ball onto the grass, and Dublin tiptoes out to tap it into the empty net."
  },
  {
    id: 126,
    title: "Paul Robinson's 85 Yard Free Kick Goal From His Own Box",
    player: "Paul Robinson",
    homeTeam: "Tottenham",
    awayTeam: "Watford",
    score: "3 : 1",
    season: "2006/07",
    date: "17 Mar 2007",
    era: "2000/01 to 2009/10",
    category: "Memorable Moment",
    ball: "Nike Total 90 Aerow II",
    sponsor: "Mansion",
    stadium: "White Hart Lane",
    referee: "Steve Bennett",
    viewCount: 5450200,
    youtubeId: "3Y0kpT_DD6I",
    startTime: 0,
    commentary: "\"Paul Robinson launches a free kick from outside his own penalty area... IT BOUNCES OVER BEN FOSTER!\"",
    description: "Spurs goalkeeper Paul Robinson takes a free kick from 85 yards out that bounces once on the edge of the Watford box and loops over England teammate Ben Foster."
  },
  {
    id: 127,
    title: "Asmir Begovic Scoring After 13 Seconds From 97 Yards",
    player: "Asmir Begovic",
    homeTeam: "Stoke City",
    awayTeam: "Southampton",
    score: "1 : 1",
    season: "2013/14",
    date: "2 Nov 2013",
    era: "2010/11 to 2019/20",
    category: "Memorable Moment",
    ball: "Nike Incyte Hi Vis",
    sponsor: "Bet365",
    stadium: "Britannia Stadium",
    referee: "Chris Foy",
    viewCount: 7890300,
    youtubeId: "DuZd0n8MqWs",
    startTime: 0,
    commentary: "\"13 seconds on the clock... Begovic clears it into the Stoke wind... AND IT BOUNCES OVER ARTUR BORUC!\"",
    description: "Assisted by a howling Britannia Stadium gale, Stoke keeper Asmir Begovic hoofs a backpass 97.5 yards downfield after 13 seconds to score over Artur Boruc."
  },
  {
    id: 131,
    title: "Jack Wilshere's One Touch Tiki Taka Team Goal vs Norwich",
    player: "Jack Wilshere",
    homeTeam: "Arsenal",
    awayTeam: "Norwich City",
    score: "4 : 1",
    season: "2013/14",
    date: "19 Oct 2013",
    era: "2010/11 to 2019/20",
    category: "Memorable Moment",
    ball: "Nike Incyte",
    sponsor: "Fly Emirates",
    stadium: "Emirates Stadium",
    referee: "Lee Probert",
    viewCount: 11450800,
    youtubeId: "9YRNJV5RL5A",
    startTime: 0,
    commentary: "\"Cazorla, Wilshere, Giroud flick, Wilshere, Giroud flick... WILSHERE! The greatest team goal in Premier League history!\"",
    description: "Five rapid fire one touch flicks and backheels between Cazorla, Wilshere, and Olivier Giroud carve open Norwich City in mid air."
  },

  // ================= 10. DISASTERCLASS =================
  {
    id: 136,
    title: "Pedro Mendes' Halfway Line Ghost Goal Dropped by Roy Carroll",
    player: "Pedro Mendes & Roy Carroll",
    homeTeam: "Man Utd",
    awayTeam: "Tottenham",
    score: "0 : 0",
    season: "2004/05",
    date: "4 Jan 2005",
    era: "2000/01 to 2009/10",
    category: "Disasterclass",
    ball: "Nike Total 90 Aerow Hi Vis",
    sponsor: "Thomson / Vodafone",
    stadium: "Old Trafford",
    referee: "Mark Clattenburg",
    viewCount: 3146653,
    youtubeId: "CXL-YOlsDqw",
    startTime: 0,
    commentary: "\"Pedro Mendes shoots from 50 yards... Roy Carroll spills it A YARD OVER THE LINE and claws it back! No goal given!\"",
    description: "Pre VAR peak Barclays theatre: Pedro Mendes lobs Roy Carroll from the halfway line, Carroll drops the ball three feet inside the net, claws it out, and play continues."
  },
  {
    id: 137,
    title: "Steven Gerrard's Infamous Slip vs Demba Ba at Anfield",
    player: "Steven Gerrard & Demba Ba",
    homeTeam: "Liverpool",
    awayTeam: "Chelsea",
    score: "0 : 2",
    season: "2013/14",
    date: "27 Apr 2014",
    era: "2010/11 to 2019/20",
    category: "Disasterclass",
    ball: "Nike Incyte",
    sponsor: "Standard Chartered",
    stadium: "Anfield",
    referee: "Martin Atkinson",
    viewCount: 11240500,
    youtubeId: "-1BkuMhbWEg",
    startTime: 0,
    commentary: "\"Sakho to Gerrard... OH, STEVEN GERRARD HAS SLIPPED! And Demba Ba is clean through on Mignolet!\"",
    description: "Two weeks after his 'this does not slip' huddle, Steven Gerrard miscontrols a routine pass on the halfway line, loses his footing, and lets Demba Ba race through to score."
  },
  {
    id: 138,
    title: "Darren Bent's Giant Red Liverpool Beach Ball Goal",
    player: "Darren Bent & Pepe Reina",
    homeTeam: "Sunderland",
    awayTeam: "Liverpool",
    score: "1 : 0",
    season: "2009/10",
    date: "17 Oct 2009",
    era: "2000/01 to 2009/10",
    category: "Disasterclass",
    ball: "Nike Total 90 Ascente",
    sponsor: "Boylesports",
    stadium: "Stadium of Light",
    referee: "Mike Jones",
    viewCount: 4560800,
    youtubeId: "FUvHP-d03Bo",
    startTime: 0,
    commentary: "\"Bent shoots... IT HITS THE INFLATABLE LIVERPOOL BEACH BALL AND GOES IN! Pepe Reina is diving at the wrong ball!\"",
    description: "Thrown onto the pitch by a young Liverpool fan in the away end, a giant red inflatable beach ball deflects Darren Bent's shot past a bewildered Pepe Reina."
  },
  {
    id: 139,
    title: "Peter Enckelman's Throw In Own Goal in the Second City Derby",
    player: "Peter Enckelman",
    homeTeam: "Birmingham",
    awayTeam: "Aston Villa",
    score: "3 : 0",
    season: "2002/03",
    date: "16 Sep 2002",
    era: "2000/01 to 2009/10",
    category: "Disasterclass",
    ball: "Nike Geo Merlin II",
    sponsor: "Rover",
    stadium: "St Andrew's",
    referee: "David Elleray",
    viewCount: 3890200,
    youtubeId: "18QsjFUquD8",
    startTime: 0,
    commentary: "\"Olof Mellberg takes the throw in back to Enckelman... AND IT ROLLS UNDER HIS STUDS INTO THE NET!\"",
    description: "In the first Premier League Second City Derby, Villa keeper Peter Enckelman brushes Olof Mellberg's throw in with his studs as it rolls into his own net."
  },
  {
    id: 140,
    title: "Jamie Pollock's Sombrero Flick Header Own Goal vs QPR",
    player: "Jamie Pollock",
    homeTeam: "Man City",
    awayTeam: "QPR",
    score: "2 : 2",
    season: "1997/98",
    date: "25 Apr 1998",
    era: "1992/93 to 1999/00",
    category: "Disasterclass",
    ball: "Mitre Ultimax",
    sponsor: "Brother",
    stadium: "Maine Road",
    referee: "Jeff Winter",
    viewCount: 2450100,
    youtubeId: "uCbepaX5a5A",
    startTime: 0,
    commentary: "\"Pollock flicks it over his opponent's head... AND HEADS IT OVER HIS OWN GOALKEEPER MARTYN MARGETSON!\"",
    description: "Manchester City midfielder Jamie Pollock executes a Paul Gascoigne style sombrero flick over a striker and then inexplicably loops a header over his own keeper."
  },
  {
    id: 141,
    title: "Massimo Taibi's Through the Legs Howler vs Matt Le Tissier",
    player: "Massimo Taibi",
    homeTeam: "Man Utd",
    awayTeam: "Southampton",
    score: "3 : 3",
    season: "1999/00",
    date: "25 Sep 1999",
    era: "1992/93 to 1999/00",
    category: "Disasterclass",
    ball: "Mitre Ultimax",
    sponsor: "Sharp",
    stadium: "Old Trafford",
    referee: "Paul Alcock",
    viewCount: 2890400,
    youtubeId: "JHMU-61Ky9M",
    startTime: 0,
    commentary: "\"Le Tissier hits a gentle daisy cutter from 30 yards... AND IT SQUIRMS THROUGH MASSIMO TAIBI'S LEGS!\"",
    description: "Italian goalkeeper Massimo Taibi bends down to collect a slow, trickling 30 yard shot from Matt Le Tissier and watches in horror as it rolls through his legs."
  },
  {
    id: 142,
    title: "Phil Jones Crawling on All Fours to Head the Ball off Giroud",
    player: "Phil Jones",
    homeTeam: "Man Utd",
    awayTeam: "Arsenal",
    score: "1 : 1",
    season: "2014/15",
    date: "17 May 2015",
    era: "2010/11 to 2019/20",
    category: "Disasterclass",
    ball: "Nike Ordem 2",
    sponsor: "Chevrolet",
    stadium: "Old Trafford",
    referee: "Mike Dean",
    viewCount: 6120900,
    youtubeId: "t8hUZrEAnyg",
    startTime: 0,
    commentary: "\"Phil Jones has tripped over, scrambled on hands and knees like a seal, and headed it off Olivier Giroud's shin!\"",
    description: "After stumbling to the ground, Phil Jones crawls three yards on all fours and launches his face into Olivier Giroud's boots to deflect the ball behind."
  },
  {
    id: 143,
    title: "Santiago Vergini's 18 Yard Unstoppable Volleyed Own Goal",
    player: "Santiago Vergini",
    homeTeam: "Southampton",
    awayTeam: "Sunderland",
    score: "8 : 0",
    season: "2014/15",
    date: "18 Oct 2014",
    era: "2010/11 to 2019/20",
    category: "Disasterclass",
    ball: "Nike Ordem 2",
    sponsor: "BFS Group",
    stadium: "St Mary's Stadium",
    referee: "Andre Marriner",
    viewCount: 5450300,
    youtubeId: "U9ne9vodz2w",
    startTime: 0,
    commentary: "\"Sunderland defender Santiago Vergini has just lashed a first time 18 yard volley into his own bottom corner!\"",
    description: "Opening the floodgates in an 8 : 0 defeat, Sunderland defender Santiago Vergini meets a bouncing ball on the edge of his own box and rifles a striker's volley past Vito Mannone."
  },
  {
    id: 144,
    title: "Ali Dia: The Fake Cousin of George Weah Subbed On and Off",
    player: "Ali Dia",
    homeTeam: "Southampton",
    awayTeam: "Leeds Utd",
    score: "0 : 2",
    season: "1996/97",
    date: "23 Nov 1996",
    era: "1992/93 to 1999/00",
    category: "Disasterclass",
    ball: "Mitre Ultimax",
    sponsor: "Sanderson",
    stadium: "The Dell",
    referee: "Roger Dilkes",
    viewCount: 4120800,
    youtubeId: "cfX9gBmsWqg",
    startTime: 0,
    commentary: "\"Graeme Souness brings on Ali Dia for Matt Le Tissier... and subs him back off 53 minutes later like Bambi on ice!\"",
    description: "After a phone call claiming he was George Weah's cousin, Ali Dia comes on for Matt Le Tissier, runs around like Bambi on ice for 53 minutes, and is substituted back off."
  },
  {
    id: 148,
    title: "Kieran Trippier's 35 Yard Chipped Own Goal Past Caballero",
    player: "Kieran Trippier",
    homeTeam: "Chelsea",
    awayTeam: "Tottenham",
    score: "2 : 0",
    season: "2018/19",
    date: "27 Feb 2019",
    era: "2010/11 to 2019/20",
    category: "Disasterclass",
    ball: "Nike Merlin",
    sponsor: "AIA",
    stadium: "Stamford Bridge",
    referee: "Andre Marriner",
    viewCount: 3890500,
    youtubeId: "p-Lkwq2ISxw",
    startTime: 0,
    commentary: "\"Trippier passes back to Caballero... EXCEPT CABALLERO HAS COME OUT AND TRIPPIER PASSES IT INTO THE EMPTY NET!\"",
    description: "Without looking up to see Willy Caballero charging out of his box, Kieran Trippier rolls a 25 yard pass straight past his own goalkeeper into the empty net."
  },
  {
    id: 149,
    title: "Andre Marriner Sending Off Kieran Gibbs Instead of Oxlade Chamberlain",
    player: "Kieran Gibbs & Alex Oxlade Chamberlain",
    homeTeam: "Chelsea",
    awayTeam: "Arsenal",
    score: "6 : 0",
    season: "2013/14",
    date: "22 Mar 2014",
    era: "2010/11 to 2019/20",
    category: "Disasterclass",
    ball: "Nike Incyte",
    sponsor: "Fly Emirates",
    stadium: "Stamford Bridge",
    referee: "Andre Marriner",
    viewCount: 4920300,
    youtubeId: "IcdGkInHJAo",
    startTime: 0,
    commentary: "\"Oxlade Chamberlain tells the ref 'Ref, it was me!'... AND ANDRE MARRINER SENDS OFF KIERAN GIBBS ANYWAY!\"",
    description: "In Arsene Wenger's 1000th match, Alex Oxlade Chamberlain makes a diving handball save, tells referee Andre Marriner it was him, and watches Kieran Gibbs get red carded instead."
  }
];

// Dynamically map each moment to its decade era ('1990 to 1999', '2000 to 2009', or '2010 to 2020')
const getDecadeEra = (moment) => {
  const yearMatch = moment.date && moment.date.match(/\b(199\d|200\d|201\d|2020)\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : parseInt(moment.season.slice(0, 4), 10);
  if (year <= 1999) return '1990 to 1999';
  if (year <= 2009) return '2000 to 2009';
  return '2010 to 2020';
};

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
    era: getDecadeEra(m),
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

  // Dynamic font size helpers so the player name and category fit cleanly in their equal wings on either side of the centered season/date
  const getPlayerBadgeFontSize = (name) => {
    const len = name.length;
    if (len > 22) return 'text-[clamp(6px,1.55vw,9.5px)]';
    if (len > 17) return 'text-[clamp(6.5px,1.75vw,10px)]';
    if (len > 13) return 'text-[clamp(7.5px,2vw,10.5px)]';
    return 'text-[clamp(8px,2.2vw,11px)]';
  };

  const getCategoryBadgeFontSize = (category) => {
    const len = category.length;
    if (len > 16) return 'text-[clamp(6.5px,1.65vw,9.5px)]';
    if (len > 13) return 'text-[clamp(7px,1.85vw,10px)]';
    return 'text-[clamp(7.5px,2vw,10.5px)]';
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
      className="min-h-[100dvh] bg-[#041f12] text-white font-sans selection:bg-amber-400 selection:text-emerald-950 px-2 sm:px-4 py-1.5 flex flex-col justify-center text-xs sm:text-sm overflow-x-hidden"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(16, 185, 129, 0.065) 0%, rgba(16, 185, 129, 0.065) 50%, transparent 50%, transparent 100%)',
        backgroundSize: '20% 100%',
        backgroundPosition: 'center top'
      }}
    >
      {/* ONE UNIFIED MASTER CARD */}
      <div className="w-full max-w-5xl min-h-[88dvh] sm:min-h-0 flex flex-col justify-between mx-auto my-auto bg-gradient-to-b from-[#0a3620] to-[#062314] border-2 border-white/40 rounded-2xl shadow-2xl relative overflow-hidden divide-y divide-white/20">
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
                    setSelectedEra('All Eras');
                    setSelectedCategory('All Categories');
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
            {/* Row 1: Fixed Center Season/Date with Symmetrical Player & Category Wings and Equal Gaps */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1.5 sm:gap-3 w-full shrink-0">
              <div className="w-full min-w-0 flex items-center justify-center">
                <span
                  className={`w-full text-center bg-red-700 border border-red-500 text-white ${getPlayerBadgeFontSize(
                    activeMoment.player
                  )} font-black px-1 sm:px-2 py-0.5 rounded uppercase tracking-tight sm:tracking-wider whitespace-nowrap shadow-sm`}
                >
                  {activeMoment.player}
                </span>
              </div>

              <span className="text-[clamp(7.5px,2.05vw,11px)] font-bold text-lime-300 uppercase tracking-tight sm:tracking-wider whitespace-nowrap shrink-0 text-center px-0.5">
                {activeMoment.season} • {activeMoment.date}
              </span>

              <div className="w-full min-w-0 flex items-center justify-center">
                <span
                  className={`w-full inline-flex items-center justify-center gap-1 bg-lime-400/15 border border-lime-300/50 text-lime-200 ${getCategoryBadgeFontSize(
                    activeMoment.category
                  )} font-extrabold px-1 sm:px-2 py-0.5 rounded-full uppercase tracking-tight sm:tracking-wider whitespace-nowrap`}
                >
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 shrink-0" />
                  <span>{activeMoment.category}</span>
                </span>
              </div>
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
