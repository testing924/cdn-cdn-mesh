class AspectRatioManager {
  constructor({component, ratio}) {
    component.style.width = `calc(100%/(${ratio}))`;
    component.style.height = `calc(100%/(${ratio}))`;
  }
}
