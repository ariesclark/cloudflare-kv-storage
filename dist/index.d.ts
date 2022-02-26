export interface CloudflareKVOptions {
    accountId: string;
    namespaceId: string;
    apiToken: string;
}
export declare type MethodResponse = {
    success: boolean;
    errors: unknown[];
    messages: unknown[];
};
export declare type MethodOptions = {
    namespaceId?: string;
};
export declare type ListMethodOptions = MethodOptions & {
    /**
     * The number of keys to return. The cursor attribute may be used to iterate over the
     * next batch of keys if there are more than the limit.
     */
    limit?: number;
    /**
     * Opaque token indicating the position from which to continue when requesting the next set of records if the
     * amount of list results was limited by the limit parameter. A valid value for the cursor can be obtained from
     * the cursors object in the result_info structure.
     */
    cursor?: string;
    /**
     * A string prefix used to filter down which keys will be returned.
     * Exact matches and any key names that begin with the prefix will be returned.
     */
    prefix?: string;
};
export declare type ListMethodResponseResult = {
    name: string;
    expiration?: number;
    metadata?: Record<string, unknown>;
};
export declare type ListMethodResponse = MethodResponse & {
    result: ListMethodResponseResult[];
    result_info: {
        count: number;
        cursor: string;
    };
};
export declare type GetMethodResponse = string;
export declare type SetMethodOptions = MethodOptions & {
    expiration_ttl?: number | string;
    expiration?: number;
};
export declare class CloudflareKV {
    private options;
    constructor(options: CloudflareKVOptions);
    private request;
    /**
     * Lists a namespace's keys.
     *
     * @access com.cloudflare.edge.storage.kv.key.list
     * @see https://api.cloudflare.com/#workers-kv-namespace-list-a-namespace-s-keys
     */
    list(options?: ListMethodOptions): Promise<ListMethodResponse>;
    /**
     * Returns the value associated with the given key in the given namespace.
     *
     * If the KV-pair is set to expire at some point, the expiration time as measured in seconds
     * since the UNIX epoch will be returned in the "Expiration" response header.
     *
     * @access com.cloudflare.edge.storage.kv.key.read
     * @see https://api.cloudflare.com/#workers-kv-namespace-read-key-value-pair
     */
    get(key: string, options?: MethodOptions): Promise<GetMethodResponse>;
    /**
     * Write a value identified by a key.
     *
     * Body should be the value to be stored along with json metadata to be associated with the key/value pair.
     * Existing values, expirations and metadata will be overwritten. If neither expiration nor expiration_ttl is specified,
     * the key-value pair will never expire. If both are set, expiration_ttl is used and expiration is ignored.
     *
     * @access com.cloudflare.edge.storage.kv.key.update
     * @see https://api.cloudflare.com/#workers-kv-namespace-write-key-value-pair
     */
    set(key: string, value: string, options?: SetMethodOptions): Promise<MethodResponse>;
    /**
     * Remove a KV pair from the Namespace.
     *
     * @access com.cloudflare.edge.storage.kv.key.delete
     * @see https://api.cloudflare.com/#workers-kv-namespace-delete-key-value-pair
     */
    delete(key: string, options?: MethodOptions): Promise<MethodResponse>;
    /**
     * Remove multiple KV pairs from the Namespace.
     *
     * @param keys an array of key names, **at most 10,000 entries**.
     *
     * @access com.cloudflare.edge.storage.kv.key.delete
     * @see https://api.cloudflare.com/#workers-kv-namespace-delete-key-value-pair
     */
    delete(keys: string[], options?: MethodOptions): Promise<MethodResponse>;
    ms(value: string): number;
}
export declare const kv: CloudflareKV;
