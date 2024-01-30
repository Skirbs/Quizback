// ? This function is used to get the amount of days you need to wait for the card the be quizzed again.
// ? For example:
// ?    if this is the first time the user pressed "I fully understood it", you have to wait 2 days
// ?    After that if the user pressed the same button you then have to wait 5 days
// ?    If user pressed "I quite understood it" it shall repeat the LAST Day (It should return 2 days in this example)
// ?      perfectAmt (of card object) shouldnt be increased
// ?      if perfectAmt is 0, return 1 (basically tomorrow)
// ?    If user pressed "I dont understand it", perfectAmt (of card object) becomes 0
// ? Format:
// ?    2 -> 5 -> 7 -> 14 -> 21 -> 30 -> 45 -> 60 -> 90 (repeat 90 afterwards)

export const SRDays = [2, 5, 7, 14, 21, 30, 45, 60, 90];
export default function getSpacedRepetitionDays(perfectAmt) {
  if (perfectAmt < 0) {
    return 1;
  }
  if (perfectAmt >= SRDays.length) {
    return SRDays[SRDays.length - 1];
  }
  return SRDays[perfectAmt];
}
