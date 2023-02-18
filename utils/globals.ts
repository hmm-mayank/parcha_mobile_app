import { Audio } from "expo-av";
export const rupeeSymbol = "₹ ";

export const productDetails = [

];

export const apiEndPoints = `http://3.7.174.172`;
export const playSound = async () => {
  let { sound } = await Audio.Sound.createAsync(
    require("../assets/beep.mp3")
  );
  await sound.playAsync();
};


export function delay(time: number) {
  return new Promise<void>(function (resolve, reject) {
    setTimeout(() => resolve(), time);
  });
}