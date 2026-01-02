const { readFileSync, writeFileSync, existsSync, mkdirSync } = require("fs");
const path = require("path");

function ensureDir(p) {
    const dir = path.dirname(p);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function loadDB(file) {
    try {
        return JSON.parse(readFileSync(file, "utf-8"));
    } catch (e) {
        return {
            views: [],
            watch_time: [],
            bandwidth: [],
            video_cache: [],
            options: null,
            cache: [],
            secret: null,
            videos: null,
            good_proxies: null,
            proxies: null,
            srv_password: null,
            keys: []
        };
    }
}

function saveDB(file, data) {
    ensureDir(file);
    writeFileSync(file, JSON.stringify(data));
}

function createFallbackDB(file) {
    let data = loadDB(file);
    return {
        close: () => {},
        run: (command, cb) => {
            cb && cb(null);
        },
        prepare: (command) => {
            return {
                run: (values) => {
                    if (/INSERT OR IGNORE INTO proxies/.test(command)) {
                        data.proxies = { id: 1, data: values };
                    } else if (/INSERT OR IGNORE INTO good_proxies/.test(command)) {
                        data.good_proxies = { id: 1, data: values };
                    } else if (/INSERT OR IGNORE INTO videos/.test(command)) {
                        data.videos = { id: 1, data: values };
                    } else if (/INSERT INTO options/.test(command)) {
                        data.options = { id: 1, data: values };
                    } else if (/UPDATE options SET data/.test(command)) {
                        data.options = { id: 1, data: values };
                    } else if (/UPDATE good_proxies SET data/.test(command)) {
                        data.good_proxies = { id: 1, data: values };
                    } else if (/UPDATE videos SET data/.test(command)) {
                        data.videos = { id: 1, data: values };
                    } else if (/INSERT OR IGNORE INTO watch_time/.test(command)) {
                        const [date, value] = values;
                        if (!data.watch_time.find(v => v.date === date)) data.watch_time.push({ date, value });
                    } else if (/UPDATE watch_time SET value = value \+ \? WHERE date = \?/.test(command)) {
                        const [inc, date] = values;
                        const row = data.watch_time.find(v => v.date === date);
                        if (row) row.value += inc; else data.watch_time.push({ date, value: inc });
                    } else if (/INSERT OR IGNORE INTO views/.test(command)) {
                        const [date, value] = values;
                        if (!data.views.find(v => v.date === date)) data.views.push({ date, value });
                    } else if (/UPDATE views SET value = value \+ 1 WHERE date = \?/.test(command)) {
                        const date = values;
                        const row = data.views.find(v => v.date === date);
                        if (row) row.value += 1; else data.views.push({ date, value: 1 });
                    } else if (/INSERT OR IGNORE INTO bandwidth/.test(command)) {
                        const [date, value] = values;
                        if (!data.bandwidth.find(v => v.date === date)) data.bandwidth.push({ date, value });
                    } else if (/UPDATE bandwidth SET value = value \+ \? WHERE date = \?/.test(command)) {
                        const [inc, date] = values;
                        const row = data.bandwidth.find(v => v.date === date);
                        if (row) row.value += inc; else data.bandwidth.push({ date, value: inc });
                    }
                    saveDB(file, data);
                    return { finalize: (cb) => cb && cb(null) };
                },
                finalize: (cb) => cb && cb(null)
            };
        },
        get: (command, valuesOrCb, maybeCb) => {
            let cb = typeof valuesOrCb === "function" ? valuesOrCb : maybeCb;
            let values = typeof valuesOrCb === "function" ? null : valuesOrCb;
            let res = null;
            if (/SELECT \* FROM good_proxies/.test(command)) res = data.good_proxies;
            else if (/SELECT \* FROM proxies/.test(command)) res = data.proxies;
            else if (/SELECT \* FROM videos/.test(command)) res = data.videos;
            else if (/SELECT \* FROM secret/.test(command)) res = data.secret ? { data: data.secret } : null;
            else if (/SELECT \* FROM options/.test(command)) res = data.options;
            else if (/SELECT data FROM good_proxies WHERE id = 1/.test(command)) res = { data: (data.good_proxies || {}).data };
            else if (/SELECT \* FROM srv_password/.test(command)) res = data.srv_password;
            else if (/SELECT status FROM keys WHERE key = \?/.test(command)) {
                const key = Array.isArray(values) ? values[0] : values;
                const row = data.keys.find(v => v.key === key);
                res = row ? { status: row.status } : null;
            }
            cb && cb(null, res);
        },
        all: (command, cb) => {
            let res = [];
            if (/SELECT \* FROM views/.test(command)) res = data.views;
            else if (/SELECT \* FROM watch_time/.test(command)) res = data.watch_time;
            else if (/SELECT \* FROM bandwidth/.test(command)) res = data.bandwidth;
            cb && cb(null, res);
        }
    };
}

function createFallbackStore(session, db) {
    const Store = session.Store;
    class MemoryStore extends Store {
        constructor() {
            super();
            this.sessions = new Map();
        }
        get(sid, cb) {
            cb && cb(null, this.sessions.get(sid) || null);
        }
        set(sid, sess, cb) {
            this.sessions.set(sid, sess);
            cb && cb(null);
        }
        destroy(sid, cb) {
            this.sessions.delete(sid);
            cb && cb(null);
        }
    }
    return MemoryStore;
}

module.exports = { createFallbackDB, createFallbackStore }
