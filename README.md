# Cloudflare KV Storage 📦
A dead simple client for Cloudflare's KV storage.

![Maintenance](https://img.shields.io/maintenance/yes/2022) [![GitHub](https://img.shields.io/github/license/ariesclark/cloudflare-kv-storage) ![GitHub issues](https://img.shields.io/github/issues/ariesclark/cloudflare-kv-storage) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ariesclark/cloudflare-kv-storage)](https://github.com/ariesclark/cloudflare-kv-storage)
 [![npm downloads](https://img.shields.io/npm/dm/cloudflare-kv-storage) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/cloudflare-kv-storage)](https://www.npmjs.com/package/cloudflare-kv-storage)
## Usage
```ts
import { CloudflareKV } from "cloudflare-kv-storage";

const kv = new CloudflareKV({
	accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
	namespaceId: process.env.CLOUDFLARE_NAMESPACE_ID,
	apiToken: process.env.CLOUDFLARE_TOKEN
});

// or you can directly import "kv" which uses the 
// environment variables by default.
import { kv } from "cloudflare-kv-storage";

await kv.set("foo", "hello", { expiration_ttl: "10m" });
await kv.set("bar", "world", { expiration: Date.now() + 10000 });
await kv.set("baz", "bin");

await kv.get("bar") // "world"
await kv.delete("foo");

await kv.list();
// will return something like:
{
    result: [
        {
            name: "bar",
            expiration: 1646499225
        },
        {
            name: "baz"
        }
    ],
    success: true,
    errors: [],
    messages: [],
    result_info: {
        count: 50,
        cursor: ""
    }
}
```