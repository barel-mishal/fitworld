import type { PropsOf } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";

export function PhLightning(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="36"
      height="36"
      viewBox="0 0 256 256"
    >
      <path d="M96,240l16-80L48,136,160,16,144,96l64,24Z" opacity="0.2"></path>
      <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path>
    </svg>
    // <svg xmlns="http://www.w3.org/2000/svg"  {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M208,144a80,80,0,0,1-160,0c0-30.57,14.42-58.26,31-80l33,32,26.27-72C159.86,41.92,208,88.15,208,144Z" opacity="0.2"></path><path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85ZM128,216a72.08,72.08,0,0,1-72-72c0-22,8.09-44.79,24.06-67.84l26.37,25.58a8,8,0,0,0,13.09-3l22.27-61.07C164.21,58.08,200,97.91,200,144A72.08,72.08,0,0,1,128,216Z"></path></svg>
    // <svg xmlns="http://www.w3.org/2000/svg"  {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M219.71,117.38a12,12,0,0,0-7.25-8.52L161.28,88.39l10.59-70.61a12,12,0,0,0-20.64-10l-112,120a12,12,0,0,0,4.31,19.33l51.18,20.47L84.13,238.22a12,12,0,0,0,20.64,10l112-120A12,12,0,0,0,219.71,117.38ZM113.6,203.55l6.27-41.77a12,12,0,0,0-7.41-12.92L68.74,131.37,142.4,52.45l-6.27,41.77a12,12,0,0,0,7.41,12.92l43.72,17.49Z"></path></svg>
  );
}
export function PhHeart(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="36"
      height="36"
      viewBox="0 0 256 256"
    >
      <path
        d="M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z"
        opacity="0.2"
      ></path>
      <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path>
    </svg>
    // <svg xmlns="http://www.w3.org/2000/svg"  {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M178,36c-20.09,0-37.92,7.93-50,21.56C115.92,43.93,98.09,36,78,36a66.08,66.08,0,0,0-66,66c0,72.34,105.81,130.14,110.31,132.57a12,12,0,0,0,11.38,0C138.19,232.14,244,174.34,244,102A66.08,66.08,0,0,0,178,36Zm-5.49,142.36A328.69,328.69,0,0,1,128,210.16a328.69,328.69,0,0,1-44.51-31.8C61.82,159.77,36,131.42,36,102A42,42,0,0,1,78,60c17.8,0,32.7,9.4,38.89,24.54a12,12,0,0,0,22.22,0C145.3,69.4,160.2,60,178,60a42,42,0,0,1,42,42C220,131.42,194.18,159.77,172.51,178.36Z"></path></svg>
  );
}
export function PhDrop(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="36"
      height="36"
      viewBox="0 0 256 256"
    >
      <path
        d="M208,144a80,80,0,0,1-160,0c0-72,80-128,80-128S208,72,208,144Z"
        opacity="0.2"
      ></path>
      <path d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM128,216a72.08,72.08,0,0,1-72-72c0-57.23,55.47-105,72-118,16.53,13,72,60.75,72,118A72.08,72.08,0,0,1,128,216Zm55.89-62.66a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z"></path>
    </svg>
    // <svg xmlns="http://www.w3.org/2000/svg"  {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M134.88,6.17a12,12,0,0,0-13.76,0,259,259,0,0,0-42.18,39C50.85,77.43,36,111.62,36,144a92,92,0,0,0,184,0C220,66.64,138.36,8.6,134.88,6.17ZM128,212a68.07,68.07,0,0,1-68-68c0-33.31,20-63.37,36.7-82.71A249.35,249.35,0,0,1,128,31.11a249.35,249.35,0,0,1,31.3,30.18C176,80.63,196,110.69,196,144A68.07,68.07,0,0,1,128,212Zm49.62-52.4a52,52,0,0,1-34,34,12.2,12.2,0,0,1-3.6.55,12,12,0,0,1-3.6-23.45,28,28,0,0,0,18.32-18.32,12,12,0,0,1,22.9,7.2Z"></path></svg>
  );
}
export function PhFireSimple(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="36"
      height="36"
      viewBox="0 0 256 256"
    >
      <path
        d="M208,144a80,80,0,0,1-160,0c0-30.57,14.42-58.26,31-80l33,32,26.27-72C159.86,41.92,208,88.15,208,144Z"
        opacity="0.2"
      ></path>
      <path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85ZM128,216a72.08,72.08,0,0,1-72-72c0-22,8.09-44.79,24.06-67.84l26.37,25.58a8,8,0,0,0,13.09-3l22.27-61.07C164.21,58.08,200,97.91,200,144A72.08,72.08,0,0,1,128,216Z"></path>
    </svg>
    // <svg xmlns="http://www.w3.org/2000/svg"  {...props} width="36" height="36"  viewBox="0 0 256 256"><path d="M145.93,14.77A12,12,0,0,0,127,19.89L107.07,74.5,87.38,55.39a12,12,0,0,0-17.9,1.33C47.27,85.82,36,115.19,36,144a92,92,0,0,0,184,0C220,82.85,168.2,33.25,145.93,14.77ZM128,212a68.07,68.07,0,0,1-68-68c0-19.94,7-40.62,20.71-61.64l22.93,22.25a12,12,0,0,0,19.63-4.5l20.21-55.4C165.39,65.61,196,102.29,196,144A68.07,68.07,0,0,1,128,212Z"></path></svg>
  );
}
export function PhDNA(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="36"
      height="36"
      viewBox="0 0 256 256"
    >
      <path
        d="M103.8,140.1,128,128l24.2,12.1A72,72,0,0,1,192,204.5V208H64v-3.5A72,72,0,0,1,103.8,140.1ZM192,51.5V48H64v3.5a72,72,0,0,0,39.8,64.4L128,128l24.2-12.1A72,72,0,0,0,192,51.5Z"
        opacity="0.2"
      ></path>
      <path d="M200,204.5V232a8,8,0,0,1-16,0V204.5a63.67,63.67,0,0,0-35.38-57.25l-48.4-24.19A79.58,79.58,0,0,1,56,51.5V24a8,8,0,0,1,16,0V51.5a63.67,63.67,0,0,0,35.38,57.25l48.4,24.19A79.58,79.58,0,0,1,200,204.5ZM160,200H72.17a63.59,63.59,0,0,1,3.23-16h72.71a8,8,0,0,0,0-16H83.46a63.71,63.71,0,0,1,14.65-15.08A8,8,0,1,0,88.64,140,80.27,80.27,0,0,0,56,204.5V232a8,8,0,0,0,16,0V216h88a8,8,0,0,0,0-16ZM192,16a8,8,0,0,0-8,8V40H96a8,8,0,0,0,0,16h87.83a63.59,63.59,0,0,1-3.23,16H107.89a8,8,0,1,0,0,16h64.65a63.71,63.71,0,0,1-14.65,15.08,8,8,0,0,0,9.47,12.9A80.27,80.27,0,0,0,200,51.5V24A8,8,0,0,0,192,16Z"></path>
    </svg>
    // <svg xmlns="http://www.w3.org/2000/svg"  {...props} viewBox="0 0 256 256"><path d="M204,204.5V232a12,12,0,0,1-24,0V204.5a59.68,59.68,0,0,0-33.17-53.67l-48.4-24.2A83.54,83.54,0,0,1,52,51.5V24a12,12,0,0,1,24,0V51.5a59.68,59.68,0,0,0,33.17,53.67l48.4,24.2A83.54,83.54,0,0,1,204,204.5Zm-52-.5H76a59.75,59.75,0,0,1,2.34-16h56.2a12,12,0,0,0,0-24H91.76c1-1.1,2-2.18,3.13-3.21a12,12,0,0,0-16.45-17.48A84.38,84.38,0,0,0,52,204.5V232a12,12,0,0,0,24,0v-4h76a12,12,0,0,0,0-24ZM192,12a12,12,0,0,0-12,12v4H104a12,12,0,0,0,0,24h76a59.75,59.75,0,0,1-2.34,16H121.44a12,12,0,0,0,0,24h42.8c-1,1.1-2,2.18-3.13,3.21a12,12,0,0,0,16.45,17.48A84.38,84.38,0,0,0,204,51.5V24A12,12,0,0,0,192,12Z"></path></svg>
  );
}
export function PhFlag(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="36"
      height="36"
      viewBox="0 0 256 256"
    >
      <path
        d="M224,56V176c-64,55.43-112-55.43-176,0V56C112,.57,160,111.43,224,56Z"
        opacity="0.2"
      ></path>
      <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path>
    </svg>
  );
}
export function PhCaretRight(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="36"
      height="36"
      viewBox="0 0 256 256"
    >
      <path d="M176,128,96,208V48Z" opacity="0.2"></path>
      <path d="M181.66,122.34l-80-80A8,8,0,0,0,88,48V208a8,8,0,0,0,13.66,5.66l80-80A8,8,0,0,0,181.66,122.34ZM104,188.69V67.31L164.69,128Z"></path>
    </svg>
  );
}
export function PhUser(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="36"
      height="36"
      viewBox="0 0 256 256"
    >
      <path
        d="M192,96a64,64,0,1,1-64-64A64,64,0,0,1,192,96Z"
        opacity="0.2"
      ></path>
      <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
    </svg>
  );
}
export function PhRanking(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="36"
      height="36"
      viewBox="0 0 256 256"
    >
      <path
        d="M40,96H88V208H32V104A8,8,0,0,1,40,96Zm176,40H168v72h56V144A8,8,0,0,0,216,136Z"
        opacity="0.2"
      ></path>
      <path d="M112.41,102.53a8,8,0,0,1,5.06-10.12l12-4A8,8,0,0,1,140,96v40a8,8,0,0,1-16,0V107.1l-1.47.49A8,8,0,0,1,112.41,102.53ZM248,208a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16h8V104A16,16,0,0,1,40,88H80V56A16,16,0,0,1,96,40h64a16,16,0,0,1,16,16v72h40a16,16,0,0,1,16,16v56h8A8,8,0,0,1,248,208Zm-72-64v56h40V144ZM96,200h64V56H96Zm-56,0H80V104H40Z"></path>
    </svg>
  );
}
export function PhNotepad(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="32"
      height="32"
      viewBox="0 0 256 256"
    >
      <path d="M168,128a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,128Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16ZM216,40V200a32,32,0,0,1-32,32H72a32,32,0,0,1-32-32V40a8,8,0,0,1,8-8H72V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,40Zm-16,8H184v8a8,8,0,0,1-16,0V48H136v8a8,8,0,0,1-16,0V48H88v8a8,8,0,0,1-16,0V48H56V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16Z"></path>
    </svg>
  );
}
export function PhFooPeinapple(props: PropsOf<"svg">) {
  return (
    <svg
      viewBox={props.viewBox || "0 0 800 800"}
      {...props}
      width="800"
      height="800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M402.25 338.063C304.687 334.563 224.062 398.125 205.062 525.188C185.937 653 247.312 777.563 400.437 774.75C563.187 771.813 613.375 639.437 591.812 516.875C567.187 377.625 485.75 341.125 402.25 338.063Z"
        fill="#FFBE1F"
      />
      <path
        d="M159.562 148C153.875 140.688 185.187 123.813 218.187 122.875C259.625 121.688 297.625 132.688 297.625 132.688C297.625 132.688 301.062 105.438 279.187 74.9375C264.187 54 257.375 43.625 257.812 36.1875C258.25 28.6875 290.75 24.125 334.062 43.4375C370.25 59.5625 398.375 90.3125 398.375 90.3125C398.375 90.3125 421.25 58.3125 451.375 42.875C486.375 25 529.25 21.9375 533 29C535.875 34.375 522.25 50.125 513.312 70.375C499.25 102.125 500.062 128.313 500.062 128.313C500.062 128.313 529.187 107.063 560.437 100.813C576.312 97.625 623.125 94.75 620 106.188C619.5 108 539.5 164.188 539.5 164.188L527.562 222.625C527.562 222.625 570 198.375 607.812 202.813C627.375 205.125 624.125 211.25 624.125 211.25L533.375 262.75L519.875 307.313C519.875 307.313 545.312 300.938 570.062 300.625C582 300.5 601.562 303.625 602.5 309.688C603.75 317.5 547.812 345.125 547.812 345.125L397.25 406.125L254.312 354.375C254.312 354.375 190.125 344.25 190.125 337.25C190.125 330.188 202.937 324.688 222.187 321.688C244.437 318.188 267.312 319.438 267.312 319.438L201.25 275.625C201.25 275.625 160.625 271.813 157.125 263.875C153.625 255.938 175.375 241.438 188.687 237.563C222.375 227.688 260.75 235.563 260.75 235.563L239.062 177.5C238.937 177.313 165.75 155.938 159.562 148Z"
        fill="#2F7C31"
      />
      <path
        d="M339.75 209.937C343.125 211.625 351.875 190.875 362.687 177.562C378.437 158.125 398.937 143.562 402.5 143.562C405.937 143.562 422 155.75 435.937 172.437C452.812 192.687 460.375 209.625 462.062 210.437C468.312 213.5 488.562 177.812 527.562 147.687C561.25 121.625 617.187 98.3125 620.125 106.187C621.062 108.75 592.375 127.625 564.875 165.875C534.687 207.812 537.625 253 537.625 253C537.625 253 572.187 228.187 583.312 222.437C592.625 217.625 627.937 204.062 623.937 211.625C621.062 217 587.312 250.625 567.937 269.062C537.437 297.937 528.437 341 531.375 343.437C534.75 346.25 557.437 329.437 571.125 321.75C584.125 314.437 602.5 308.5 602.375 309.75C601.562 318.938 568.437 342.812 545.125 363.75C527.875 379.187 494.5 423.25 399.437 421.688C320.875 420.438 274.937 379.312 246.312 363.937C226.562 353.312 189.812 341.437 190.25 337.812C190.5 335.812 207.75 334.438 219.375 335.875C251.5 339.75 272.125 349.437 274.312 346.625C276.562 343.75 245.875 304.875 192.875 281.25C167.312 269.812 156.125 266.875 156.625 261.75C156.812 259.5 172.812 256.562 193.187 255.875C229.312 254.687 263.687 267.437 266.875 267.812C274.375 268.75 244.062 216.187 226.875 195.687C199.625 163.125 157.125 154.437 158.875 146.25C159.812 141.812 209.312 141.187 249.937 156.437C292.25 172.187 332.437 206.312 339.75 209.937Z"
        fill="#709921"
      />
      <path
        d="M402.375 239C398.563 239.5 383.5 247.625 363.688 268.438C340.25 293 332 319.562 337.438 324.062C344.75 330.062 354.938 318.625 368.938 308.75C385.438 297.125 398.813 290.813 401.688 290.813C404.563 290.813 417.438 298.938 428.25 307.125C441.688 317.375 453.313 328.438 459.25 324.688C469.25 318.5 455.375 286.125 439.75 268.438C423.125 249.563 405.688 238.563 402.375 239Z"
        fill="#2F7C31"
      />
      <path
        d="M296.188 488C283.52 488.806 271.679 494.571 263.232 504.048C254.785 513.524 250.413 525.947 251.063 538.625C251.063 541.94 252.38 545.12 254.725 547.464C257.069 549.808 260.248 551.125 263.563 551.125C266.879 551.125 270.058 549.808 272.402 547.464C274.746 545.12 276.063 541.94 276.063 538.625C275.423 532.575 277.168 526.513 280.925 521.728C284.683 516.943 290.159 513.812 296.188 513C302.218 513.812 307.694 516.943 311.451 521.728C315.209 526.513 316.954 532.575 316.313 538.625C316.313 541.94 317.63 545.12 319.975 547.464C322.319 549.808 325.498 551.125 328.813 551.125C332.129 551.125 335.308 549.808 337.652 547.464C339.996 545.12 341.313 541.94 341.313 538.625C341.964 525.947 337.592 513.524 329.145 504.048C320.698 494.571 308.857 488.806 296.188 488Z"
        fill="#E68721"
      />
      <path
        d="M503.063 488C490.395 488.806 478.554 494.571 470.107 504.048C461.66 513.524 457.288 525.947 457.938 538.625C457.938 541.94 459.255 545.12 461.6 547.464C463.944 549.808 467.123 551.125 470.438 551.125C473.754 551.125 476.933 549.808 479.277 547.464C481.621 545.12 482.938 541.94 482.938 538.625C482.298 532.575 484.043 526.513 487.8 521.728C491.558 516.943 497.034 513.812 503.063 513C509.093 513.812 514.569 516.943 518.326 521.728C522.084 526.513 523.829 532.575 523.188 538.625C523.188 541.94 524.505 545.12 526.85 547.464C529.194 549.808 532.373 551.125 535.688 551.125C539.004 551.125 542.183 549.808 544.527 547.464C546.872 545.12 548.188 541.94 548.188 538.625C548.839 525.947 544.467 513.524 536.02 504.048C527.573 494.571 515.732 488.806 503.063 488Z"
        fill="#E68721"
      />
      <path
        d="M459.438 629.5C456.123 629.5 452.944 630.817 450.6 633.161C448.255 635.505 446.938 638.685 446.938 642C446.938 653.106 442.527 663.757 434.674 671.61C426.821 679.463 416.169 683.875 405.063 683.875C393.958 683.875 383.306 679.463 375.453 671.61C367.6 663.757 363.188 653.106 363.188 642C363.188 638.685 361.872 635.505 359.527 633.161C357.183 630.817 354.004 629.5 350.688 629.5C347.373 629.5 344.194 630.817 341.85 633.161C339.505 635.505 338.188 638.685 338.188 642C338.188 659.736 345.234 676.746 357.776 689.288C370.317 701.829 387.327 708.875 405.063 708.875C422.8 708.875 439.81 701.829 452.351 689.288C464.893 676.746 471.938 659.736 471.938 642C471.938 638.685 470.622 635.505 468.277 633.161C465.933 630.817 462.754 629.5 459.438 629.5Z"
        fill="#E68721"
      />
    </svg>
  );
}
export function PhArrowBendUpLeft(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={cn("h-5 w-5", props.class)}
      {...props}
      width="32"
      height="32"
      viewBox="0 0 256 256"
    >
      <path d="M232,200a8,8,0,0,1-16,0,88.1,88.1,0,0,0-88-88H51.31l34.35,34.34a8,8,0,0,1-11.32,11.32l-48-48a8,8,0,0,1,0-11.32l48-48A8,8,0,0,1,85.66,61.66L51.31,96H128A104.11,104.11,0,0,1,232,200Z"></path>
    </svg>
  );
}
export function PhTrash(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={cn("h-5 w-5", props.class)}
      {...props}
      viewBox="0 0 256 256"
    >
      <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
    </svg>
  );
}
export function PhDotsThreeVertical(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={cn("h-5 w-5", props.class)}
      {...props}
      viewBox="0 0 256 256"
    >
      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,72a12,12,0,1,0-12-12A12,12,0,0,0,128,72Zm0,112a12,12,0,1,0,12,12A12,12,0,0,0,128,184Z"></path>
    </svg>
  );
}
export function PhShare(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={cn("h-5 w-5", props.class)}
      {...props}
      width="32"
      height="32"
      viewBox="0 0 256 256"
    >
      <path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66,8,8,0,0,1-15.5-4A103.94,103.94,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66ZM192,208H40V88a8,8,0,0,0-16,0V216a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16Z"></path>
    </svg>
  );
}
export function PhPersonCirclePlus(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={cn("h-5 w-5", props.class)}
      {...props}
      width="32"
      height="32"
      viewBox="0 0 256 256"
    >
      <path d="M168,56a8,8,0,0,1,8-8h16V32a8,8,0,0,1,16,0V48h16a8,8,0,0,1,0,16H208V80a8,8,0,0,1-16,0V64H176A8,8,0,0,1,168,56Zm62.56,54.68a103.92,103.92,0,1,1-85.24-85.24,8,8,0,0,1-2.64,15.78A88.07,88.07,0,0,0,40,128a87.62,87.62,0,0,0,22.24,58.41A79.66,79.66,0,0,1,98.3,157.66a48,48,0,1,1,59.4,0,79.66,79.66,0,0,1,36.06,28.75A87.62,87.62,0,0,0,216,128a88.85,88.85,0,0,0-1.22-14.68,8,8,0,1,1,15.78-2.64ZM128,152a32,32,0,1,0-32-32A32,32,0,0,0,128,152Zm0,64a87.57,87.57,0,0,0,53.92-18.5,64,64,0,0,0-107.84,0A87.57,87.57,0,0,0,128,216Z"></path>
    </svg>
  );
}
export function PhPlus(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={cn("h-5 w-5", props.class)}
      {...props}
      width="32"
      height="32"
      viewBox="0 0 256 256"
    >
      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
    </svg>
  );
}
export function PhClose(props: PropsOf<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={cn("h-5 w-5", props.class)}
      {...props}
      width="32"
      height="32"
      viewBox="0 0 256 256"
    >
      <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
    </svg>
  );
}
export function PhStar(props: PropsOf<"svg">) {
  return (
    <svg
      class={cn("h-5 w-5", props.class)}
      {...props}
      width="32"
      height="32"
      viewBox="0 0 256 256"
    >
      <path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"></path>
    </svg>
  );
}
export function PhMagnify(props: PropsOf<"svg">) {
  return (
    <svg
      class={cn("h-5 w-5", props.class)}
      {...props}
      width="32"
      height="32"
      viewBox="0 0 256 256"
    >
      <path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z"></path>
    </svg>
  );
}
