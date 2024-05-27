import { JSX } from "@builder.io/qwik/jsx-runtime";
import { PhFooPeinapple, PhMagnify, PhStar } from "../icons/icons";

interface Button {
  class: string;
  buttonClass: string;
  icon: JSX.Element;
}


interface Section {
  title: string;
  subTitle: string;
  titleClass: string;
  buttons: Button[];

}


const sections = [
    {
      title: "SECTION 1 UNIT 1",
      subTitle: "The Importance Of Nutrition",
      titleClass: "p-4 bg-green-600 rounded-xl col-span-12 border-b-4 border-green-900 sticky top-0",
      buttons: [
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-green-900 bg-green-600 rounded-full text-green-50 grid place-content-center active:border-b transition-all ease-in-out", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-start-1 row-start-3 rounded-xl col-span-3 row-span-2 content-center", buttonClass: "", icon: <PhFooPeinapple class="w-20 h-20"/> },
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhMagnify class="w-8 h-8 fill-current"/> },
        { class: "col-start-8 row-start-5 rounded-xl col-span-3 row-span-2 content-center", buttonClass: "", icon: <PhFooPeinapple class="w-20 h-20"/> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> }
      ]
    },
    // Add more sections here...
    {
      title: "SECTION 1 UNIT 1",
      subTitle: "The Importance Of Nutrition",
      titleClass: "p-4 bg-green-600 rounded-xl col-span-12 border-b-4 border-green-900 sticky top-0",
      buttons: [
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-green-900 bg-green-600 rounded-full text-green-50 grid place-content-center active:border-b transition-all ease-in-out", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-start-1 row-start-3 rounded-xl col-span-3 row-span-2 content-center", buttonClass: "", icon: <PhFooPeinapple class="w-20 h-20"/> },
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhMagnify class="w-8 h-8 fill-current"/> },
        { class: "col-start-8 row-start-5 rounded-xl col-span-3 row-span-2 content-center", buttonClass: "", icon: <PhFooPeinapple class="w-20 h-20"/> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> }
      ]
    },
    {
      title: "SECTION 1 UNIT 2",
      subTitle: "The Importance Of Nutrition",
      titleClass: "p-4 bg-rose-600 rounded-xl col-span-12 border-b-4 border-rose-900 sticky top-0",
      buttons: [
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-rose-900 bg-rose-600 rounded-full text-rose-50 grid place-content-center", icon: <svg class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"/></svg> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-start-1 row-start-3 rounded-xl col-span-3 row-span-2 content-center", buttonClass: "", icon: <PhFooPeinapple class="w-20 h-20"/> },
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <svg class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"/></svg> },
        { class: "col-start-8 row-start-5 rounded-xl col-span-3 row-span-2 content-center", buttonClass: "", icon: <PhFooPeinapple class="w-20 h-20"/> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> }
      ]
    },
    {
      title: "SECTION 1 UNIT 3",
      subTitle: "Macronutrients and Health",
      titleClass: "p-4 bg-purple-600 rounded-xl col-span-12 border-b-4 border-purple-900 sticky top-0",
      buttons: [
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-purple-900 bg-purple-600 rounded-full text-purple-50 grid place-content-center", icon: <svg class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"/></svg> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-start-1 row-start-3 rounded-xl col-span-3 row-span-2 content-center", buttonClass: "", icon: <PhFooPeinapple class="w-20 h-20"/> },
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <svg class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"/></svg> },
        { class: "col-start-8 row-start-5 rounded-xl col-span-3 row-span-2 content-center", buttonClass: "", icon: <PhFooPeinapple class="w-20 h-20"/> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> }
      ]
    },
    {
      title: "SECTION 1 UNIT 4",
      subTitle: "Build your training program",
      titleClass: "p-4 bg-indigo-600 rounded-xl col-span-12 border-b-4 border-indigo-900 sticky top-0",
      buttons: [
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-indigo-900 bg-indigo-600 rounded-full text-indigo-50 grid place-content-center", icon: <svg class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29-1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"/></svg> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-start-1 row-start-3 rounded-xl col-span-3 row-span-2 content-center", buttonClass: "", icon: <PhFooPeinapple class="w-20 h-20"/> },
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> },
        { class: "col-start-3 col-span-4 row-span-1", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <svg class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29-1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"/></svg> },
        { class: "col-start-8 row-start-5 rounded-xl col-span-3 row-span-2 content-center", buttonClass: "", icon: <PhFooPeinapple class="w-20 h-20"/> },
        { class: "col-span-4 row-span-1 col-start-5", buttonClass: "w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center", icon: <PhStar class="w-8 h-8 fill-current"/> }
      ]
    }  
  ];
export default sections;