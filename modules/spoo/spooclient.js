var environment = 'browser';
if ('undefined' != typeof module && module.exports) {
    (environment = 'node'), (XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest);
    //var LocalStorage = require('node-localstorage').LocalStorage;
    //(localStorage = new LocalStorage('./localStorage')), (sessionStorage = require('sessionstorage'));
}

var localStorage = {
    data: {},
    setItem: function(key, item) {
        this.data[key] = item;
    },
    getItem: function(key) {
        return this.data[key]
    },
    removeItem: function(key) {
        delete this.data[key]
    }
}

var sessionStorage = {
    data: {},
    setItem: function(key, item) {
        this.data[key] = item;
    },
    getItem: function(key) {
        return this.data[key]
    },
    removeItem: function(key) {
        delete this.data[key]
    }
}

var APPID,
    URL = 'https://spoo.io/api',
    RESSOURCE = {
        APPID: '/app',
        SHARED: '/shared/to/public',
        APPROVAL: '/shared/to/approval',
        CLOUDGUITEMPLATES: '/cloudguitemplates',
        REQUESTPASSWORDRESET: '/requestpasswordreset',
        RESETPASSWORD: '/resetpassword',
        CHANGEPASSWORD: '/password',
        APPLICATIONS: '/applications',
        RESTRICTED: '/restricted',
        CLIENTID: '/client',
        CLIENT: '/client',
        PUSH: '/push',
        PUBLISH: '/publish/to/shared',
        PULL: '/install/from/shared',
        REQUESTKEY: '/requestkey',
        AUTHENTICATED: '/authenticated',
        AUTH: '/auth',
        TOKEN: '/token',
        TOKEN_REJECT: '/token/reject',
        OBJECT: '/object',
        USER: '/user',
        TEMPLATE: '/template',
        PROPERTY: '/property',
        CALL: '/call',
        PERMISSION: '/permission',
        PRIVILEGE: '/privilege',
        CONDITIONS: '/conditions',
        NAME: '/name',
        USERNAME: '/username',
        EMAIL: '/email',
        TYPE: '/type',
        INHERIT: '/inherit',
        APPLICATION: '/application',
        EVENTLOG: '/eventlog',
        OBJECTS: '/objects',
        FRONTEND: '/frontend',
        TEMPLATES: '/templates',
        REGISTER: '/register',
        USERS: '/users',
        EVENTLOGS: '/eventlogs',
        FILE: '/file',
        DATA: '/data',
        FILES: '/files',
        COUNT: '/count',
        CHECKSYNTAX: '/checksyntax',
        AGGREGATE: '/aggregate',
        ONCREATE: '/onCreate',
        ONCHANGE: '/onChange',
        ONDELETE: '/onDelete',
        DATE: '/date',
        INTERVAL: '/interval',
        ACTION: '/action',
        VISIBILITY: '/visibility'
    },
    failCounter = 0,
    BASE_URL = URL,
    REFRESH_URL = URL;

function getAccessToken() {
    return sessionStorage.getItem('accessToken');
}

function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

function ajax(t, e, i, o, s, a, n) {
    var r;

    function d(t, e, i, o, s, a, n) {
        failCounter > 5 ||
            (console.log('refreshing...'),
                console.log(arguments),
                failCounter++,
                ajax(
                    'POST',
                    REFRESH_URL + RESSOURCE.CLIENTID + '/' + localStorage.getItem('clientId') + RESSOURCE.TOKEN, { refreshToken: getRefreshToken() },
                    function(a) {
                        'string' == typeof a && (a = JSON.parse(a)),
                            a.token.accessToken && sessionStorage.setItem('accessToken', a.token.accessToken),
                            a.token.refreshToken && localStorage.setItem('refreshToken', a.token.refreshToken),
                            console.log(a),
                            ajax(
                                t,
                                e,
                                i,
                                function(t) {
                                    o(t, !1);
                                },
                                function(t) {
                                    s(t, !0);
                                },
                                getAccessToken()
                            );
                    },
                    function(t) {}
                ));
    }
    return (
        console.debug(i),
        XMLHttpRequest ? (r = new XMLHttpRequest()) : ActiveXObject && (r = new ActiveXObject('Microsoft.XMLHTTP')),
        'GET' == t && -1 == e.indexOf('?') && (e = e + '?' + i),
        r.open(t, e, !0),
        n ? (alert(), console.debug(i.get('photos'))) : (r.setRequestHeader('Content-Type', 'application/json'), r.setRequestHeader('Accept', 'application/json')),
        a && r.setRequestHeader('Authorization', 'Bearer ' + a),
        (r.onreadystatechange = function() {
            if (4 == r.readyState) {
                console.log(r.status);
                var h = !1;
                if (r.status >= 200 && r.status <= 299)(failCounter = 0), o(JSON.parse(r.response || r.responseText), !1);
                else if (401 == r.status && -1 != e.indexOf(RESSOURCE.TOKEN));
                else if (401 == r.status && -1 != e.indexOf(RESSOURCE.AUTH)) {
                    if (!localStorage.getItem('refreshToken')) {
                        h = !0;
                        try {
                            s({ error: 'Login failed' }, !0);
                        } catch (t) {}
                        return;
                    }
                    d(t, e, i, o, s, a, n);
                } else if (401 == r.status) {
                    if (h) return;
                    localStorage.getItem('refreshToken') && d(t, e, i, o, s, a, n);
                } else
                    try {
                        s(JSON.parse(r.response || r.responseText), !0);
                    } catch (t) {
                        s({ error: r.response || r.responseText }, !0);
                    }
            }
        }),
        'object' == typeof i && (i = JSON.stringify(i)),
        r.send(i),
        r
    );
}

function objToQueryString(t) {
    var e = [];
    for (var i in t) t.hasOwnProperty(i) && ('object' == typeof t[i] && (t[i] = JSON.stringify(t[i])), e.push(encodeURIComponent(i) + '=' + encodeURIComponent(t[i])));
    return e.join('&');
}

function SpooGlobal(t, e) {
    (this._url = t || URL),
    (this.data = {}),
    e && (this.data = e),
        (this.Applications = function(t) {
            return (this._url = this._url + RESSOURCE.APPLICATIONS), 'object' == typeof t && (this.data = t), new SpooGlobal(this._url, this.data);
        }),
        (this.Restricted = function() {
            return new Client(void 0, (t += RESSOURCE.RESTRICTED), void 0, this.data);
        }),
        (this.ajax = function(t, e, i, o, s, a, n) {
            var r;
            return (
                console.debug(i),
                XMLHttpRequest ? (r = new XMLHttpRequest()) : ActiveXObject && (r = new ActiveXObject('Microsoft.XMLHTTP')),
                'GET' == t && -1 == e.indexOf('?') && (e = e + '?' + i),
                r.open(t, e, !0),
                n ? (alert(), console.debug(i.get('photos'))) : (r.setRequestHeader('Content-Type', 'application/json'), r.setRequestHeader('Accept', 'application/json')),
                a && r.setRequestHeader('Authorization', 'Bearer ' + a),
                (r.onreadystatechange = function() {
                    if (4 == r.readyState)
                        if (r.status >= 200 && r.status <= 299)(failCounter = 0), o(JSON.parse(r.response || r.responseText), !1);
                        else
                            try {
                                s(JSON.parse(r.response || r.responseText), !0);
                            } catch (t) {
                                s({ error: r.response || r.responseText }, !0);
                            }
                }),
                'object' == typeof i && (i = JSON.stringify(i)),
                r.send(i),
                r
            );
        }),
        (this.get = function(t) {
            this.ajax('GET', this._url, objToQueryString(this.data), t, t, getAccessToken());
        });
}

function Client(t, e, i, o, s) {
    return (
        void 0 === e && (e = URL),
        (this.data = {}),
        o && (this.data = o),
        (this.modifyInscructions = s || []),
        void 0 !== t && e == URL && (e = URL + RESSOURCE.CLIENTID + '/' + t),
        void 0 !== i && e == URL && (e = URL + RESSOURCE.APPID + '/' + i),
        (this.url = e),
        (this.appId = i),
        (this.clientId = t),
        console.log(e),
        this.appId && this.clientId && (BASE_URL = URL + RESSOURCE.CLIENTID + '/' + t + RESSOURCE.APPID + '/' + i),
        (this.auth = function(t, i, o, s) {
            s || (s = !1),
                (e += RESSOURCE.AUTH),
                (this.data = { username: t, password: i, permanent: true }),
                ajax(
                    'POST',
                    e,
                    this.data,
                    function(t) {
                        'string' == typeof t && (t = JSON.parse(t)),
                            1 == s && t.token.refreshToken && localStorage.setItem('refreshToken', t.token.refreshToken),
                            t.token.accessToken && sessionStorage.setItem('accessToken', t.token.accessToken),
                            o(t, !1);
                    },
                    function(t) {
                        o(t, !0);
                    }
                );
        }),
        (this.authenticated = function(t) {
            ajax(
                'GET',
                (e += RESSOURCE.AUTHENTICATED), {},
                function(e) {
                    t(!0);
                },
                t(!1),
                getAccessToken()
            );
        }),
        (this.logout = function(t) {
            ajax(
                'POST',
                (e += RESSOURCE.TOKEN_REJECT), { accessToken: getAccessToken() },
                function(e) {
                    localStorage.removeItem('refreshToken'), sessionStorage.removeItem('accessToken'), localStorage.removeItem('accessToken'), console.debug(e), t(e, !1);
                },
                t(o, !0),
                getAccessToken()
            );
        }),
        (this.io = function() {
            return (

                console.log('ioai: ' + this.appId),
                console.log('iocl: ' + this.clientId),
                localStorage.setItem('clientId', this.clientId),
                this.appId && localStorage.setItem('appId', this.appId),
                void 0 !== this.appId ? new Client(this.clientId, void 0).AppId(this.appId) : new Client(this.clientId, void 0)
            );
        }),
        (this.AppId = function(t) {
            return t && (e = e + RESSOURCE.APPID + '/' + t), new Client(this.clientId, e, t);
        }),
        (this.Object = function(t, i) {
            return (
                (e += RESSOURCE.OBJECT),
                void 0 !== t && 'string' == typeof t ? (e = e + '/' + t) : 'object' == typeof t && (this.data = t),
                i && (e = e + '?' + objToQueryString(i)),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.Objects = function(t, i) {
            return (
                (e += RESSOURCE.OBJECTS), 'object' == typeof t ? (this.data = t) : 'array' == typeof t && (this.data = t), i && (e = e + '?' + objToQueryString(i)), new Client(void 0, e, void 0, t)
            );
        }),
        (this.Frontend = function(t, i) {
            return (
                (e += RESSOURCE.FRONTEND), 'object' == typeof t ? (this.data = t) : 'array' == typeof t && (this.data = t), i && (e = e + '?' + objToQueryString(i)), new Client(void 0, e, void 0, t)
            );
        }),
        (this.User = function(t, i) {
            return (
                (e += RESSOURCE.USER),
                void 0 !== t && 'string' == typeof t ? (e = e + '/' + t) : 'object' == typeof t && (this.data = t),
                i && (e = e + '?' + objToQueryString(i)),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.Register = function() {
            return new Client(void 0, (e += RESSOURCE.REGISTER), void 0, this.data);
        }),
        (this.Users = function(t, i) {
            return (e += RESSOURCE.USERS), 'object' == typeof t && (this.data = t), i && (e = e + '?' + objToQueryString(i)), new Client(void 0, e, void 0, t);
        }),
        (this.Applications = function(t) {
            return (e += RESSOURCE.APPLICATIONS), 'object' == typeof t && (this.data = t), new Client(void 0, e, void 0, t);
        }),
        (this.Modify = function(t) {
            return (this.data = t), new Client(void 0, e, void 0, t);
        }),
        (this.CloudGuiTemplates = function(t) {
            return (e += RESSOURCE.CLOUDGUITEMPLATES), 'object' == typeof t && (this.data = t), new Client(void 0, e, void 0, t);
        }),
        (this.Template = function(t, i) {
            return (
                (e += RESSOURCE.TEMPLATE),
                void 0 !== t && 'string' == typeof t ? (e = e + '/' + t) : 'object' == typeof t && (this.data = t),
                i && (e = e + '?' + objToQueryString(i)),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.Templates = function(t, i) {
            return (e += RESSOURCE.TEMPLATES), 'object' == typeof t && (this.data = t), i && (e = e + '?' + objToQueryString(i)), new Client(void 0, e, void 0, t);
        }),
        (this.Property = function(t) {
            return (
                (e += RESSOURCE.PROPERTY),
                void 0 !== t && 'string' == typeof t ? (e = e + '/' + t) : 'object' == typeof t && (this.data = t),
                console.debug(this.data),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.addProperty = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ addProperty: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.removeProperty = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ removeProperty: [t] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Push = function(t) {
            return (
                (e += RESSOURCE.PUSH), void 0 !== t && 'string' == typeof t ? (e = e + '/' + t) : 'object' == typeof t && (this.data = t), console.debug(this.data), new Client(void 0, e, void 0, t)
            );
        }),
        (this.Publish = function(t) {
            return (
                (e += RESSOURCE.PUBLISH), void 0 !== t && 'string' == typeof t ? (e = e + '/' + t) : 'object' == typeof t && (this.data = t), console.debug(this.data), new Client(void 0, e, void 0, t)
            );
        }),
        (this.Install = function(t) {
            return (
                (e += RESSOURCE.PULL), void 0 !== t && 'string' == typeof t ? (e = e + '/' + t) : 'object' == typeof t && (this.data = t), console.debug(this.data), new Client(void 0, e, void 0, t)
            );
        }),
        (this.push = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ pushToArray: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Name = function(t) {
            return (e += RESSOURCE.NAME), void 0 !== t && 'string' == typeof t && ((t = { name: t }), (this.data = t)), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.setName = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setName: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Username = function(t) {
            return (e += RESSOURCE.USERNAME), void 0 !== t && 'string' == typeof t && ((t = { name: t }), (this.data = t)), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.setUsername = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setUsername: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Email = function(t) {
            return (e += RESSOURCE.EMAIL), void 0 !== t && 'string' == typeof t && ((t = { name: t }), (this.data = t)), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.CheckSyntax = function(t) {
            return new Client(void 0, (e += RESSOURCE.CHECKSYNTAX), void 0, t);
        }),
        (this.setEmail = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setEmail: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Type = function(t) {
            return (e += RESSOURCE.TYPE), void 0 !== t && 'string' == typeof t && ((t = { name: t }), (this.data = t)), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.setType = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setType: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Inherit = function(t) {
            return (
                (e += RESSOURCE.INHERIT), void 0 !== t && 'string' == typeof t ? (e = e + '/' + t) : 'object' == typeof t && (this.data = t), console.debug(this.data), new Client(void 0, e, void 0, t)
            );
        }),
        (this.addInherit = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ addInherit: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.removeInherit = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ removeInherit: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Application = function(t) {
            return (
                (e += RESSOURCE.APPLICATION),
                void 0 !== t && 'string' == typeof t ? (e = e + '/' + t) : 'object' == typeof t && (this.data = t),
                console.debug(this.data),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.setVisibility = function(t) {
            return (e += RESSOURCE.VISIBILITY), void 0 !== t && 'boolean' == typeof t && ((t = { value: t }), (this.data = t)), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.addApplication = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ addApplication: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.removeApplication = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ removeApplication: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.AppData = function(t) {
            return 'object' == typeof t && (this.data = t), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.Value = function(t) {
            return (
                void 0 === t || ('string' != typeof t && 'boolean' != typeof t && isNaN(t)) || ((t = { value: t }), (this.data = t)),
                'object' == typeof t && (this.data = t),
                console.debug(this.data),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.setPropertyValue = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setPropertyValue: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.setEventDate = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setEventDate: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.setEventInterval = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setEventInterval: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.setEventAction = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setEventAction: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Date = function(t) {
            return (
                (e += RESSOURCE.DATE),
                void 0 !== t && 'string' == typeof t && ((t = { date: t }), (this.data = t)),
                'object' == typeof t && (this.data = t),
                console.debug(this.data),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.setPropertyDate = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setPropertyDate: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Interval = function(t) {
            return (
                (e += RESSOURCE.INTERVAL),
                void 0 !== t && 'string' == typeof t && ((t = { interval: t }), (this.data = t)),
                'object' == typeof t && (this.data = t),
                console.debug(this.data),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.setPropertyInterval = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setPropertyInterval: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Action = function(t) {
            return (
                (e += RESSOURCE.ACTION),
                void 0 !== t && 'string' == typeof t && ((t = { action: t }), (this.data = t)),
                'object' == typeof t && (this.data = t),
                console.debug(this.data),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.setPropertyAction = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setPropertyAction: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.OnCreate = function(t) {
            return (e += RESSOURCE.ONCREATE), void 0 !== t && 'string' == typeof t && ((t = { value: t }), (this.data = t)), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.setPropertyOnCreate = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setPropertyOnCreate: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.setPropertyMeta = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setPropertyMeta: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.setOnCreate = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setOnCreate: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.OnChange = function(t) {
            return (e += RESSOURCE.ONCHANGE), void 0 !== t && 'string' == typeof t && ((t = { value: t }), (this.data = t)), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.setPropertyOnChange = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setPropertyOnChange: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.setOnChange = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setOnChange: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.OnDelete = function(t) {
            return (e += RESSOURCE.ONDELETE), void 0 !== t && 'string' == typeof t && ((t = { value: t }), (this.data = t)), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.setPropertyOnDelete = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setPropertyOnDelete: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.setOnDelete = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setOnDelete: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Permission = function(t) {
            return (
                (e += RESSOURCE.PERMISSION),
                void 0 !== t && 'string' == typeof t && (e = e + '/' + t),
                'object' == typeof t && (this.data = t),
                console.debug(this.data),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.setPropertyPermission = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setPropertyPermission: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.removePropertyPermission = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ removePropertyPermission: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.removePropertyMeta = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ removePropertyMeta: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.setPermission = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setPermission: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Privilege = function(t) {
            return (
                (e += RESSOURCE.PRIVILEGE),
                void 0 !== t && 'string' == typeof t && (e = e + '/' + t),
                'object' == typeof t && (this.data = t),
                console.debug(this.data),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.setPermission = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setPermission: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.removePermission = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ removePermission: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.addPrivilege = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ addPrivilege: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.removePrivilege = function(t) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ removePrivilege: t }), new Client(void 0, e, void 0, this.data);
        }),
        (this.Conditions = function(t) {
            return (
                (e += RESSOURCE.CONDITIONS),
                void 0 === t && (e = e + '/' + t),
                'string' == typeof t && ((this.data = { conditions: t }), (t = { conditions: t })),
                console.debug(this.data),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.setPropertyConditions = function(t, i) {
            return console.debug(this.data), Array.isArray(this.data) || (this.data = []), this.data.push({ setPropertyConditions: [t, i] }), new Client(void 0, e, void 0, this.data);
        }),
        (this.EventLog = function(t, i) {
            return (
                (e += RESSOURCE.EVENTLOG),
                void 0 !== t && 'string' == typeof t ? (e = e + '/' + t) : 'object' == typeof t && (this.data = t),
                i && (e = e + '?' + objToQueryString(i)),
                new Client(void 0, e, void 0, t)
            );
        }),
        (this.EventLogs = function(t, i) {
            return (e += RESSOURCE.EVENTLOGS), 'object' == typeof t && (this.data = t), i && (e = e + '?' + objToQueryString(i)), new Client(void 0, e, void 0, t);
        }),
        (this.Files = function(t, i) {
            return (e += RESSOURCE.FILES), 'object' == typeof t && (this.data = t), i && (e = e + '?' + objToQueryString(i)), new Client(void 0, e, void 0, t);
        }),
        (this.File = function(t, i) {
            return (e += RESSOURCE.FILE), void 0 !== t && 'string' == typeof t ? (e = e + '/' + t) : 'object' == typeof t && (this.data = t), new Client(void 0, e, void 0, t);
        }),
        (this.Data = function(t) {
            return (
                (e += RESSOURCE.DATA),
                void 0 !== t && 'string' == typeof t ? (e = e + '/' + t) : 'object' == typeof t && (console.debug(o), (this.data = t)),
                new Client(void 0, (e = e + '?token=' + getAccessToken()), void 0, t)
            );
        }),
        (this.NewClient = function(t) {
            return (e += RESSOURCE.CLIENT), void 0 !== t && 'object' == typeof t && ((t = t), (this.data = t)), new Client(void 0, e, void 0, t);
        }),
        (this.RequestKey = function(t) {
            return (e += RESSOURCE.REQUESTKEY), void 0 !== t && 'string' == typeof t && ((t = { email: t }), (this.data = t)), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.RequestPasswordReset = function(t) {
            return (e += RESSOURCE.REQUESTPASSWORDRESET), void 0 !== t && 'object' == typeof t && (this.data = t), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.ResetPassword = function(t) {
            return (e += RESSOURCE.RESETPASSWORD), void 0 !== t && 'object' == typeof t && (this.data = t), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.ChangePassword = function(t) {
            return (e += RESSOURCE.CHANGEPASSWORD), void 0 !== t && 'object' == typeof t && (this.data = t), console.debug(this.data), new Client(void 0, e, void 0, t);
        }),
        (this.path = function() {
            return (this.url += RESSOURCE.DATA), this.url + '?token=' + getAccessToken();
        }),
        (this.shared = function(t) {
            return new Client(void 0, (e += RESSOURCE.SHARED), void 0, this.data);
        }),
        (this.approval = function(t) {
            return new Client(void 0, (e += RESSOURCE.APPROVAL), void 0, this.data);
        }),
        (this.Public = function(t) {
            return (e = URL), this.appId && (e = e + RESSOURCE.APPID + '/' + this.appId), new Client(void 0, e, void 0, this.data);
        }),
        (this.add = function(t) {
            ajax('POST', this.url, this.data, t, t, getAccessToken());
        }),
        (this.upload = function(t) {
            XMLHttpRequest ? (xhr = new XMLHttpRequest()) : ActiveXObject && (xhr = new ActiveXObject('Microsoft.XMLHTTP')),
                -1 != this.url.indexOf('/data') ? xhr.open('PUT', this.url, !0) : xhr.open('POST', this.url, !0),
                xhr.setRequestHeader('Authorization', 'Bearer ' + getAccessToken()),
                (xhr.onreadystatechange = function() {
                    4 == xhr.readyState && (xhr.status >= 200 && xhr.status <= 299 ? t(JSON.parse(xhr.response || xhr.responseText), !1) : t(!1, !0));
                }),
                xhr.send(this.data);
        }),
        (this.count = function(t) {
            (this.url += RESSOURCE.AGGREGATE + RESSOURCE.COUNT), ajax('GET', this.url, objToQueryString(this.data), t, t, getAccessToken());
        }),
        (this.call = function(t, e) {
            (this.data = e || {}), (this.url += RESSOURCE.CALL), ajax('POST', this.url, this.data, t, t, getAccessToken());
        }),
        (this.delete = function(t) {
            (this.data = {}), ajax('DELETE', this.url, this.data, t, t, getAccessToken());
        }),
        (this.save = function(t) {
            ajax('PUT', this.url, this.data, t, t, getAccessToken());
        }),
        (this.get = function(t) {
            console.log('ss: ' + sessionStorage.getItem('accessToken')), ajax('GET', this.url, objToQueryString(this.data), t, t, getAccessToken());
        }),
        this
    );
};
var SPOO_Client = Client,
    SPOO = Client;

module.exports = SPOO;