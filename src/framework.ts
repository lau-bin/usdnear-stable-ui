export interface Component{

    start(): void
    stop(): void

}

export interface ServiceHolder{
    constructor(serviceBlob?: ServiceBlob):void
}

export type ServiceBlob = {}

export class Framework {

    static globaServices: any = {}

}
