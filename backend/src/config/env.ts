import {z} from "zod";

const envSchema = z.object({
    PORT: z.string().default("5071").transform(Number),
    MONGO_URI: z.string(),
    NODE_ENV: z.string()
})

const _env = envSchema.safeParse(process.env);

if(!_env.success){
    console.log("Invalid environment variables", _env.error);
    process.exit(1);
}

export const env_config = _env.data;