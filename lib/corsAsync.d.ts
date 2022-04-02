import cors from 'cors';
export declare const corsAsync: (options: cors.CorsOptions) => (req: any, res: any) => Promise<void>;
