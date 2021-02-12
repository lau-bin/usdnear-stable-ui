declare module '*.scss' {
    interface IClassNames {
      [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}
declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}
declare module '*.png' {
  const classNames: string;
  export = classNames;
}
declare module '*.gif' {
  const classNames: string;
  export = classNames;
}
declare module '*.jpeg' {
  const classNames: string;
  export = classNames;
}
declare module '*.jpg' {
  const classNames: string;
  export = classNames;
}