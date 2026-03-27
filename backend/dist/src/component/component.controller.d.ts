import { CreateComponentDto } from './dto/create-component.dto';
import { ComponentService } from './component.service';
export declare class ComponentController {
    private readonly componentService;
    constructor(componentService: ComponentService);
    create(dto: CreateComponentDto): void;
}
