declare namespace MainScssModule {
  export interface IMainScss {
    background: string;
    connected: string;
    container: string;
    header: string;
    menuItem: string;
    pageTitle: string;
    title: string;
  }
}

declare const MainScssModule: MainScssModule.IMainScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MainScssModule.IMainScss;
};

export = MainScssModule;
