import { PropsOf, component$ } from "@builder.io/qwik";
import { PhFooPeinapple, PhMagnify, PhStar } from "../icons/icons";
import sections from "./data";

const Play = component$(() => {

    return (
        <div class="flex flex-col">
            <RenderGamePath />

            <section class="grid grid-cols-12 gap-5 pb-14">
                <TitleGame title="SECTION 1 UNIT 1" subTitle="The Importence Of Nutrition" element={{class: "p-4 bg-green-600  rounded-xl col-span-12 border-b-4 border-green-900 sticky top-0"}}/>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-16 p-4 border-b-4 border-green-900 bg-green-600 rounded-full text-green-50 grid place-content-center active:border-b transition-all ease-in-out">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-start-1 row-start-3 rounded-xl col-span-3 row-span-2 content-center">
                    <button class="">
                        <PhFooPeinapple class="w-20 h-20"  />
                    </button>
                </div>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhMagnify class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-start-8 row-start-5 rounded-xl col-span-3 row-span-2 content-center">
                    <button class="">
                        <PhFooPeinapple class="w-20 h-20"  />
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
            </section>
            <section class="grid grid-cols-12 gap-3 pb-14">
                <TitleGame title="SECTION 1 UNIT 3" subTitle="Macronutrients and Health" element={{class: "p-4 bg-purple-600  rounded-xl col-span-12 border-b-4 border-purple-900 sticky top-0"}}/>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-16 p-4 border-b-4 border-purple-900 bg-purple-600 rounded-full text-purple-50 grid place-content-center">
                        <svg class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"></path></svg>
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-start-1 row-start-3 rounded-xl col-span-3 row-span-2 content-center">
                    <button class="">
                        <PhFooPeinapple class="w-20 h-20"  />
                    </button>
                </div>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <svg class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"></path></svg>
                    </button>
                </div>
                <div class="col-start-8 row-start-5 rounded-xl col-span-3 row-span-2 content-center">
                    <button class="">
                        <PhFooPeinapple class="w-20 h-20"  />
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
            </section>
            <section class="grid grid-cols-12 gap-3 pb-14">
                <TitleGame title="SECTION 1 UNIT 4" subTitle="Build your training program" element={{class: "p-4 bg-indigo-600  rounded-xl col-span-12 border-b-4 border-indigo-900 sticky top-0"}}/>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-16 p-4 border-b-4 border-indigo-900 bg-indigo-600 rounded-full text-indigo-50 grid place-content-center">
                        <svg class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"></path></svg>
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-start-1 row-start-3 rounded-xl col-span-3 row-span-2 content-center">
                    <button class="">
                        <PhFooPeinapple class="w-20 h-20"  />
                    </button>
                </div>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <svg class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"></path></svg>
                    </button>
                </div>
                <div class="col-start-8 row-start-5 rounded-xl col-span-3 row-span-2 content-center">
                    <button class="">
                        <PhFooPeinapple class="w-20 h-20"  />
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
            </section>
            <section class="grid grid-cols-12 gap-3 pb-14">
                <TitleGame title="SECTION 1 UNIT 2" subTitle="The Importence Of Nutrition" element={{class: "p-4 bg-rose-600  rounded-xl col-span-12 border-b-4 border-rose-900 sticky top-0"}}/>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-16 p-4 border-b-4 border-rose-900 bg-rose-600 rounded-full text-rose-50 grid place-content-center">
                        <svg class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"></path></svg>
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-start-1 row-start-3 rounded-xl col-span-3 row-span-2 content-center">
                    <button class="">
                        <PhFooPeinapple class="w-20 h-20"  />
                    </button>
                </div>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
                <div class="col-start-3 col-span-4 row-span-1  ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <svg class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"></path></svg>
                    </button>
                </div>
                <div class="col-start-8 row-start-5 rounded-xl col-span-3 row-span-2 content-center">
                    <button class="">
                        <PhFooPeinapple class="w-20 h-20"  />
                    </button>
                </div>
                <div class="col-span-4 row-span-1 col-start-5 ">
                    <button class="w-full h-16 p-4 border-b-4 border-gray-800 bg-gray-600 rounded-full text-gray-50 grid place-content-center">
                        <PhStar class="w-8 h-8 fill-current"/>
                    </button>
                </div>
            </section>

            <section class="bg-gray-800 rounded-t">
                <div class="p-4  rounded-xl col-span-12 sticky top-0 text-secondary/50  ">
                    <span class="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 fill-current" viewBox="0 0 256 256"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z"></path></svg>
                        <h1 class="">SECTION 2</h1>
                    </span>
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



interface TitleGameProps {
    title: string;
    subTitle: string;
    element: PropsOf<'div'>
}
export const TitleGame = component$<TitleGameProps>((props) => {

    return (
        <div {...props.element} >
            <h1 class="text-xs text-green-950/70">{props.title}</h1>
            <p class="small-title">{props.subTitle}</p>
        </div>
    )
});



export const RenderGamePath = component$(() => {

       return <>
          {sections.map((section, index) => (
            <section key={index} class="grid grid-cols-12 gap-5 pb-14">
              <TitleGame title={section.title} subTitle={section.subTitle} element={{ class: section.titleClass }} />
              {section.buttons.map((button, btnIndex) => (
                <div key={btnIndex} class={button.class}>
                  <button class={button.buttonClass}>
                    {button.icon}
                  </button>
                </div>
              ))}
            </section>
          ))}
        </>
}
);

