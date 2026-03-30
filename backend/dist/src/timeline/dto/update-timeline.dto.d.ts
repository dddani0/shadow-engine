export declare class UpdateTimelineDto {
    id?: string;
    actions?: {
        create?: Array<{
            type: string;
            spriteId: string;
        }>;
        update?: Array<{
            where: {
                id: string;
            };
            data: {
                type?: string;
                spriteId?: string;
            };
        }>;
        delete?: Array<{
            id: string;
        }>;
    };
}
