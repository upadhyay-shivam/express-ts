import 'automapper-ts/dist/automapper';
import { Provides } from 'typescript-ioc';

@Provides(MapperService)
export class MapperService {
    mapper: AutoMapperJs.AutoMapper;
    constructor() {
        this.mapper = automapper;
        this.initializeMapper();

    }
    private initializeMapper(): void {
        this.mapper.initialize(MapperService.configure);
    }
    private static configure(config: AutoMapperJs.IConfiguration): void {
        config.createMap('User', 'UserVm').forSourceMember('password', (opts) => opts.ignore);
    }
}