import type { PropsOf } from '@builder.io/qwik'
 
export function PhLightning(props: PropsOf<'svg'>, key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M96,240l16-80L48,136,160,16,144,96l64,24Z" opacity="0.2"></path><path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M208,144a80,80,0,0,1-160,0c0-30.57,14.42-58.26,31-80l33,32,26.27-72C159.86,41.92,208,88.15,208,144Z" opacity="0.2"></path><path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85ZM128,216a72.08,72.08,0,0,1-72-72c0-22,8.09-44.79,24.06-67.84l26.37,25.58a8,8,0,0,0,13.09-3l22.27-61.07C164.21,58.08,200,97.91,200,144A72.08,72.08,0,0,1,128,216Z"></path></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M219.71,117.38a12,12,0,0,0-7.25-8.52L161.28,88.39l10.59-70.61a12,12,0,0,0-20.64-10l-112,120a12,12,0,0,0,4.31,19.33l51.18,20.47L84.13,238.22a12,12,0,0,0,20.64,10l112-120A12,12,0,0,0,219.71,117.38ZM113.6,203.55l6.27-41.77a12,12,0,0,0-7.41-12.92L68.74,131.37,142.4,52.45l-6.27,41.77a12,12,0,0,0,7.41,12.92l43.72,17.49Z"></path></svg>
  )
}
export function PhHeart(props: PropsOf<'svg'>, key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z" opacity="0.2"></path><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M178,36c-20.09,0-37.92,7.93-50,21.56C115.92,43.93,98.09,36,78,36a66.08,66.08,0,0,0-66,66c0,72.34,105.81,130.14,110.31,132.57a12,12,0,0,0,11.38,0C138.19,232.14,244,174.34,244,102A66.08,66.08,0,0,0,178,36Zm-5.49,142.36A328.69,328.69,0,0,1,128,210.16a328.69,328.69,0,0,1-44.51-31.8C61.82,159.77,36,131.42,36,102A42,42,0,0,1,78,60c17.8,0,32.7,9.4,38.89,24.54a12,12,0,0,0,22.22,0C145.3,69.4,160.2,60,178,60a42,42,0,0,1,42,42C220,131.42,194.18,159.77,172.51,178.36Z"></path></svg>
  )
}
export function PhDrop(props: PropsOf<'svg'>, key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M208,144a80,80,0,0,1-160,0c0-72,80-128,80-128S208,72,208,144Z" opacity="0.2"></path><path d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM128,216a72.08,72.08,0,0,1-72-72c0-57.23,55.47-105,72-118,16.53,13,72,60.75,72,118A72.08,72.08,0,0,1,128,216Zm55.89-62.66a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z"></path></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M134.88,6.17a12,12,0,0,0-13.76,0,259,259,0,0,0-42.18,39C50.85,77.43,36,111.62,36,144a92,92,0,0,0,184,0C220,66.64,138.36,8.6,134.88,6.17ZM128,212a68.07,68.07,0,0,1-68-68c0-33.31,20-63.37,36.7-82.71A249.35,249.35,0,0,1,128,31.11a249.35,249.35,0,0,1,31.3,30.18C176,80.63,196,110.69,196,144A68.07,68.07,0,0,1,128,212Zm49.62-52.4a52,52,0,0,1-34,34,12.2,12.2,0,0,1-3.6.55,12,12,0,0,1-3.6-23.45,28,28,0,0,0,18.32-18.32,12,12,0,0,1,22.9,7.2Z"></path></svg>
  )
}
export function PhFireSimple(props: PropsOf<'svg'>, key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M208,144a80,80,0,0,1-160,0c0-30.57,14.42-58.26,31-80l33,32,26.27-72C159.86,41.92,208,88.15,208,144Z" opacity="0.2"></path><path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85ZM128,216a72.08,72.08,0,0,1-72-72c0-22,8.09-44.79,24.06-67.84l26.37,25.58a8,8,0,0,0,13.09-3l22.27-61.07C164.21,58.08,200,97.91,200,144A72.08,72.08,0,0,1,128,216Z"></path></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36"  viewBox="0 0 256 256"><path d="M145.93,14.77A12,12,0,0,0,127,19.89L107.07,74.5,87.38,55.39a12,12,0,0,0-17.9,1.33C47.27,85.82,36,115.19,36,144a92,92,0,0,0,184,0C220,82.85,168.2,33.25,145.93,14.77ZM128,212a68.07,68.07,0,0,1-68-68c0-19.94,7-40.62,20.71-61.64l22.93,22.25a12,12,0,0,0,19.63-4.5l20.21-55.4C165.39,65.61,196,102.29,196,144A68.07,68.07,0,0,1,128,212Z"></path></svg>
  )
}
export function PhDNA(props: PropsOf<'svg'>, key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M103.8,140.1,128,128l24.2,12.1A72,72,0,0,1,192,204.5V208H64v-3.5A72,72,0,0,1,103.8,140.1ZM192,51.5V48H64v3.5a72,72,0,0,0,39.8,64.4L128,128l24.2-12.1A72,72,0,0,0,192,51.5Z" opacity="0.2"></path><path d="M200,204.5V232a8,8,0,0,1-16,0V204.5a63.67,63.67,0,0,0-35.38-57.25l-48.4-24.19A79.58,79.58,0,0,1,56,51.5V24a8,8,0,0,1,16,0V51.5a63.67,63.67,0,0,0,35.38,57.25l48.4,24.19A79.58,79.58,0,0,1,200,204.5ZM160,200H72.17a63.59,63.59,0,0,1,3.23-16h72.71a8,8,0,0,0,0-16H83.46a63.71,63.71,0,0,1,14.65-15.08A8,8,0,1,0,88.64,140,80.27,80.27,0,0,0,56,204.5V232a8,8,0,0,0,16,0V216h88a8,8,0,0,0,0-16ZM192,16a8,8,0,0,0-8,8V40H96a8,8,0,0,0,0,16h87.83a63.59,63.59,0,0,1-3.23,16H107.89a8,8,0,1,0,0,16h64.65a63.71,63.71,0,0,1-14.65,15.08,8,8,0,0,0,9.47,12.9A80.27,80.27,0,0,0,200,51.5V24A8,8,0,0,0,192,16Z"></path></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} viewBox="0 0 256 256"><path d="M204,204.5V232a12,12,0,0,1-24,0V204.5a59.68,59.68,0,0,0-33.17-53.67l-48.4-24.2A83.54,83.54,0,0,1,52,51.5V24a12,12,0,0,1,24,0V51.5a59.68,59.68,0,0,0,33.17,53.67l48.4,24.2A83.54,83.54,0,0,1,204,204.5Zm-52-.5H76a59.75,59.75,0,0,1,2.34-16h56.2a12,12,0,0,0,0-24H91.76c1-1.1,2-2.18,3.13-3.21a12,12,0,0,0-16.45-17.48A84.38,84.38,0,0,0,52,204.5V232a12,12,0,0,0,24,0v-4h76a12,12,0,0,0,0-24ZM192,12a12,12,0,0,0-12,12v4H104a12,12,0,0,0,0,24h76a59.75,59.75,0,0,1-2.34,16H121.44a12,12,0,0,0,0,24h42.8c-1,1.1-2,2.18-3.13,3.21a12,12,0,0,0,16.45,17.48A84.38,84.38,0,0,0,204,51.5V24A12,12,0,0,0,192,12Z"></path></svg>
  )
}
export function PhFlag(props: PropsOf<'svg'>, key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M224,56V176c-64,55.43-112-55.43-176,0V56C112,.57,160,111.43,224,56Z" opacity="0.2"></path><path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path></svg>
  )
}
export function PhCaretRight(props: PropsOf<'svg'>, key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M176,128,96,208V48Z" opacity="0.2"></path><path d="M181.66,122.34l-80-80A8,8,0,0,0,88,48V208a8,8,0,0,0,13.66,5.66l80-80A8,8,0,0,0,181.66,122.34ZM104,188.69V67.31L164.69,128Z"></path></svg>
  )
}
export function PhUser(props: PropsOf<'svg'>, key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" key={key} {...props} width="36" height="36" viewBox="0 0 256 256"><path d="M192,96a64,64,0,1,1-64-64A64,64,0,0,1,192,96Z" opacity="0.2"></path><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>
  )
}