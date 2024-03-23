import AsyncLock from 'async-lock';

export class PromiseLock {

    asyncLock: AsyncLock
    constructor(option?: AsyncLockOptions) {
        this.asyncLock = new AsyncLock(option)
    }

    acquire(func: Function, options: AquireOptions = {}) {

        let { resolveTimeout, key } = options
        if (!key) {
            key = '__DEFAULT_KEY__'
        }

        return this.asyncLock.acquire(key, () => {
            return new Promise<void>(async resolve => {
                let isResolved = false
                if (resolveTimeout) {
                    setTimeout(() => {
                        if (!isResolved) {
                            console.error(`${resolveTimeout} ms passed. over resolveTimeout. unlock promiseLock`)
                            resolve()
                        }
                    }, resolveTimeout)
                }
                await func()
                resolve()
                isResolved = true
            })
        })
    }

    isBusy(key = '__DEFAULT_KEY__') {
        return this.asyncLock.isBusy(key)
    }
}

interface AsyncLockOptions {
    timeout?: number;
    maxPending?: number;
    domainReentrant?: boolean;
    Promise?: any;
}

interface AquireOptions {
    resolveTimeout?: number
    key?: string | string[]
}