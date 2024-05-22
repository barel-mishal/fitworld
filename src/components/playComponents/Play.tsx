import { component$ } from "@builder.io/qwik";
import { PhFooPeinapple } from "../icons/icons";

const Play = component$(() => {

    return (
        <div class="flex flex-col">
            <section class="grid grid-cols-12 gap-5 pb-14">
                <div class="p-4 bg-green-600  rounded-xl col-span-12 border-b-4 border-green-900 sticky top-0 ">
                    <h1 class="text-xs text-green-950/70">SECTION 1 UNIT 1</h1>
                    <p class="small-title text-green-950">The Importence Of Nutrition</p>
                </div>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-full p-4 border-b-4 border-green-900 bg-green-600 rounded-full text-green-50 grid place-content-center">
                        <svg class="w-10 h-10 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"></path></svg>
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-full p-4 border-b-4 border-green-900 bg-green-600 rounded-full text-green-50 grid place-content-center">
                        <svg class="w-10 h-10 fill-current" viewBox="0 0 256 256"><path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"></path></svg>
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-full p-4 border-b-4 border-green-900 bg-green-600 rounded-full text-green-50 grid place-content-center">
                        <svg class="w-10 h-10 fill-current" viewBox="0 0 256 256"><path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"></path></svg>
                    </button>
                </div>
                <div class="col-start-1 row-start-3 rounded-xl col-span-3 row-span-2 content-center">
                    <button class="">
                        <PhFooPeinapple class="w-20 h-20"  />
                    </button>
                </div>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-full p-4 border-b-4 border-green-900 bg-green-600 rounded-full text-green-50 grid place-content-center">
                        <svg class="w-10 h-10 fill-current" viewBox="0 0 256 256"><path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"></path></svg>
                    </button>
                </div>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-full p-4 border-b-4 border-green-900 bg-green-600 rounded-full text-green-50 grid place-content-center">
                        <svg class="w-10 h-10 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"></path></svg>
                    </button>
                </div>
                <div class="col-start-8 row-start-5 rounded-xl col-span-3 row-span-2 content-center">
                    <button class="">
                        <PhFooPeinapple class="w-20 h-20"  />
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-full p-4 border-b-4 border-green-900 bg-green-600 rounded-full text-green-50 grid place-content-center">
                        <svg class="w-10 h-10 fill-current" viewBox="0 0 256 256"><path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"></path></svg>
                    </button>
                </div>

            </section>
            <section class="grid grid-cols-12 gap-3 pb-14">
                <div class="p-4 bg-purple-600  rounded-xl col-span-12 border-b-4 border-purple-900 sticky top-0 ">
                    <h1 class="text-secondary/50">SECTION 1 UNIT 3</h1>
                    <p class="small-title">Macronutrients and Health</p>
                </div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">1</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">2</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">3</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">4</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">5</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">6</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">9</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">10</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">11</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">12</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">13</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">14</div>
            </section>
            <section class="grid grid-cols-12 gap-3 pb-14">
                <div class="p-4 bg-indigo-600  rounded-xl col-span-12 border-b-4 border-indigo-900 sticky top-0 ">
                    <h1 class="text-secondary/50">SECTION 1 UNIT 4</h1>
                    <p class="small-title">Build your training program</p>
                </div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">1</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">2</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">3</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">4</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">5</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">6</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">9</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">10</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">11</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">12</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">13</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">14</div>
            </section>
            <section class="grid grid-cols-12 gap-3 pb-14">
                <div class="p-4 bg-green-600  rounded-xl col-span-12 border-b-4 border-green-900 sticky top-0  ">
                    <h1 class="text-secondary/50">SECTION 1 UNIT 2</h1>
                    <p class="small-title">Let's Start Do Challenges</p>
                </div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">1</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">2</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">3</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">4</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">5</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">6</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">9</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">10</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">11</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">12</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">13</div>
                <div class="p-4 bg-gray-900 rounded-xl col-span-4 row-span-1">14</div>
            </section>

            <section class="bg-gray-800 rounded-t">
                <div class="p-4  rounded-xl col-span-12 sticky top-0  ">
                    <h1 class="text-secondary/50">SECTION 2</h1>
                    <p class="small-title">Let's Start Do Challenges</p>
                </div>
            </section>


        </div>
    )
});

export default Play;

export const animetion = component$(() => {
    return  <div class="h-96 w-96 grid place-content-center card-wrapper">
    <div class="card-content">
        <div>sdlfkj</div>
    </div>
</div>
});

