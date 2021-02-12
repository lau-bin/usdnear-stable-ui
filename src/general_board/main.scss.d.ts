declare namespace MainScssModule {
  export interface IMainScss {
    background: string;
    container: string;
    menuItem: string;
    title: string;
  }
}

declare const MainScssModule: MainScssModule.IMainScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MainScssModule.IMainScss;
};

export = MainScssModule;
