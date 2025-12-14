// grammar walking s.js machine

// books of backtraking
function                    return_stop_machine() { return "considered harmfull" }
const                              choose_nars =  [ Red_descend2, Yellow_descend2, Yellow_descend]
function                             choose(o, s) { s.s = s.o[--s.a],
                                                    s.r = s.o[--s.a],
                                                    s.t = s.o[--s.a],
                                                    o = s.data_states.pop(o),
                                                    choose_nars[s.o[--s.a]](o, s); }
const                                  or_nars =  [ return_stop_machine, choose]
export function                          or(o, s) { s.s++, or_nars[s.o[--s.a]](o, s) }
const                              choice_nars =  [ Red, Yellow, ascend_Green, ascend_Blue]
function                             choice(o, s) { s.o[s.a++] = s.o[s.s++],
                                                    s.o[s.a++] = s.t,
                                                    s.o[s.a++] = s.r,
                                                    s.o[s.a++] = s.s + 1,
                                                    s.o[s.a++] = or_nars.indexOf(choose),
                                                    s.data_states.push(o),
                                                    choice_nars[s.o[s.s++]]({...o}, s); }
// books of ascending
function                         ascend_Red(o, s) { s.t = s.o[s.r + 1], s.r = s.o[s.r],   Red(o, s); }
function                        ascend_Blue(o, s) { s.t = s.o[s.r + 1], s.r = s.o[s.r],  Blue(o, s); }
function                       ascend_Green(o, s) { s.t = s.o[s.r + 1], s.r = s.o[s.r], Green(o, s); }
const               Red_book_of_ascending_nars =  [ or, 
                                                    ascend_Blue,
                                                    ascend_Green,
                                                    0,
                                                    ascend_Red ]
function              Red_book_of_ascending(o, s) { Red_book_of_ascending_nars[s.o[s.r + 2]](o, s) }

function Yellow_descend_choice_ascend_Green(o, s) { s.o[--s.s] = 2, // choice_nars.indexOf(ascend_Green),
                                                    s.o[--s.s] = 2, // choose_nars.indexOf(Yellow_descend),
                                                    choice(o, s); };
function  Yellow_descend_choice_ascend_Blue(o, s) { s.o[--s.s] = 3, // choice_nars.indexOf(ascend_Blue),
                                                    s.o[--s.s] = 2, // choose_nars.indexOf(Yellow_descend),
                                                    choice(o, s); };
const             Green_book_of_ascending_nars =  [ Yellow_descend,
                                                    Yellow_descend_choice_ascend_Blue,
                                                    Yellow_descend_choice_ascend_Green,
                                                    0,
                                                    Yellow_descend_choice_ascend_Green];
function            Green_book_of_ascending(o, s) { Green_book_of_ascending_nars[s.o[s.r + 2]](o, s); }

const              Blue_book_of_ascending_nars =  [ Yellow_descend,
                                                    Yellow_descend_choice_ascend_Blue,
                                                    Yellow_descend_choice_ascend_Green,
                                                    ascend_Blue,
                                                    Yellow_descend_choice_ascend_Green];
function             Blue_book_of_ascending(o, s) { Blue_book_of_ascending_nars[s.o[s.r + 2]](o, s); }
// books of left recursion elimination by the classic method
function                 or_RedΤRed_descend(o, s) { if (s.o[s.o[s.r + 1] + 1] === s.o[s.t + 1])
                                                      or(o, s);
                                                    else
                                                      s.r = s.o[s.s++], RedΤRed_descend(o, s); }
function       or_Red_book_of_Τwords_parent(o, s) { if (s.o[s.o[s.r + 1] + 1] === s.o[s.t + 1])
                                                      or(o, s);
                                                    else s.r = s.o[s.r], Red_book_of_Τword(o, s); }
const                   Red_book_of_Τword_nars =  [ or_RedΤRed_descend,
                                                    or_RedΤRed_descend,
                                                    or_RedΤRed_descend,
                                                    0,
                                                    or_Red_book_of_Τwords_parent];
function                  Red_book_of_Τword(o, s) { Red_book_of_Τword_nars[s.o[s.r + 2]](o, s); };
function                           RedΤword(o, s) { s.o[--s.s] = s.r, Red_book_of_Τword(o, s); }

function         Blue_YellowΤYellow_descend(o, s) { if (s.o[s.o[s.r + 1] + 1] === s.o[s.t + 1])
                                                      s.r = s.o[s.s++], Blue(o, s);
                                                    else
                                                      s.r = s.o[s.s++], YellowΤYellow_descend(o, s); }
function    or_Yellow_book_of_Τwords_parent(o, s) { if (s.o[s.o[s.r + 1] + 1] === s.o[s.t + 1])
                                                      or(o, s);
                                                    else
                                                      s.r = s.o[s.r], Yellow_book_of_Τword(o, s); }
const                Yellow_book_of_Τword_nars =  [ Blue_YellowΤYellow_descend,
                                                    Blue_YellowΤYellow_descend,
                                                    Blue_YellowΤYellow_descend,
                                                    or_Yellow_book_of_Τwords_parent,
                                                    Blue_YellowΤYellow_descend ];
function               Yellow_book_of_Τword(o, s) { Yellow_book_of_Τword_nars[s.o[s.r + 2]](o, s); } 
function                        YellowΤword(o, s) { s.o[--s.s] = s.r, Yellow_book_of_Τword(o, s); }
// books of walking
const                                 and_nars =  [ Green, Blue ]
export function                         and(o, s) { and_nars[s.o[s.s++]](o, s); }
function                     Green_dispatch(o, s) { s.o[--s.s] = 0, // and_nars.indexOf(Green)
                                                    s.axioms[s.o[s.t + 1]](o, s); }
function                      Blue_dispatch(o, s) { s.o[--s.s] = 1, // and_nars.indexOf(Blue)
                                                      s.axioms[s.o[s.t + 1]](o, s); }
const                    Red_book_of_walk_nars =  [ Red_book_of_ascending,
                                                    Red_book_of_ascending,
                                                    Green_dispatch,
                                                    RedΤword ];
function                   Red_book_of_walk(o, s) { Red_book_of_walk_nars[s.o[s.t]](o, s); };
function                                Red(o, s) { s.t += 2, Red_book_of_walk(o, s); }

const                 Yellow_book_of_walk_nars =  [ or,
                                                    or,
                                                    or,
                                                    YellowΤword ];
function                Yellow_book_of_walk(o, s) { Yellow_book_of_walk_nars[s.o[s.t]](o, s); };
function                             Yellow(o, s) { s.t += 2, Yellow_book_of_walk(o, s); }

const                               Green_nars =  [ Green_book_of_ascending,
                                                    Green_book_of_ascending,
                                                    Green_dispatch,
                                                    GreenΤRed_descend ];
function                 Green_book_of_walk(o, s) { Green_nars[s.o[s.t]](o, s); };
function                              Green(o, s) { s.t += 2, Green_book_of_walk(o, s); }

const                   Blue_book_of_walk_nars =  [ Blue_book_of_ascending,
                                                    Blue_book_of_ascending,
                                                    Blue_dispatch,
                                                    BlueΤRed_descend ];
function                  Blue_book_of_walk(o, s) { Blue_book_of_walk_nars[s.o[s.t]](o, s); };
function                               Blue(o, s) { s.t += 2, Blue_book_of_walk(o, s); }
// books of descending
function                        Red_descend(o, s) { s.t  = 0, Red_book_of_descending(o, s); }
function                       Red_descend2(o, s) { s.t += 2, Red_book_of_descending(o, s); }
function            Red_descend2_choice_Red(o, s) { if (s.o[s.o[s.r + 1] + 1] === s.o[s.t + 1])
                                                      s.o[--s.s] = 0, // choice_nars.indexOf(Red),
                                                      s.o[--s.s] = 0, // choose_nars.indexOf(Red_descend2),
                                                      choice(o, s);
                                                    else
                                                      Red_descend2(o, s); }
const              Red_book_of_descending_nars =  [ or, Red_descend2_choice_Red, Red_descend2, Red_descend2 ];
function             Red_book_of_descending(o, s) { Red_book_of_descending_nars[s.o[s.t]](o, s)}

function                     Yellow_descend(o, s) { s.t  = 0, Yellow_book_of_descending(o, s); }
function                    Yellow_descend2(o, s) { s.t += 2, Yellow_book_of_descending(o, s); }
function      Yellow_descend2_choice_Yellow(o, s) { if (s.o[s.o[s.r + 1] + 1] === s.o[s.t + 1])
                                                      s.o[--s.s] = 1, // choice_nars.indexOf(Yellow),
                                                      s.o[--s.s] = 1, // choose_nars.indexOf(Yellow_descend2),
                                                      choice(o, s);
                                                    else
                                                      Yellow_descend2(o, s); }
const           Yellow_book_of_descending_nars =  [ or, Yellow_descend2_choice_Yellow, Yellow_descend2, Yellow_descend2 ];
function          Yellow_book_of_descending(o, s) { Yellow_book_of_descending_nars[s.o[s.t]](o, s)}
// branching - growing
function                    RedΤRed_descend(o, s) { s.o[--s.s]=4,s.o[--s.s]=s.t,s.o[--s.s]=s.r,s.r=s.s,   Red_descend(o, s); }
function              YellowΤYellow_descend(o, s) { s.o[--s.s]=3,s.o[--s.s]=s.t,s.o[--s.s]=s.r,s.r=s.s,Yellow_descend(o, s); }
function                  GreenΤRed_descend(o, s) { s.o[--s.s]=2,s.o[--s.s]=s.t,s.o[--s.s]=s.r,s.r=s.s,   Red_descend(o, s); }
function                   BlueΤRed_descend(o, s) { s.o[--s.s]=1,s.o[--s.s]=s.t,s.o[--s.s]=s.r,s.r=s.s,   Red_descend(o, s); }
export function            PinkΤRed_descend(o, s) { s.o[s.a++]=0,
                                                    s.o[--s.s]=0,s.o[--s.s]=s.t,s.o[--s.s]=s.r,s.r=s.s,   Red_descend(o, s); }
