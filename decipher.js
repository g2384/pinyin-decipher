"use strict";
onmessage = function (e) {
    let text;
    let key;
    let fastSearchStartIndex;
    let fastSearchEndIndex;
    [text, key, fastSearchStartIndex, fastSearchEndIndex] = e.data;
    console.log("Decipher: " + text);
    text = text.toUpperCase();
    var keys = Object.keys(key);
    var usedLetters = "";
    for (var i = 0; i < keys.length; i++) {
        text = replaceAll(text, keys[i].toUpperCase(), key[keys[i]]);
        usedLetters += key[keys[i]];
    }
    let settings = new Settings(text, fastSearchStartIndex, fastSearchEndIndex);
    decipher(text, "", "", usedLetters, 0, settings, postMessage);
    postMessage([true, "!", settings.count]);
};
class Settings {
    constructor(text, fastStartIndex, fastEndIndex) {
        this.count = 0;
        this.originalTextLength = text.length;
        this.fastSearchStartIndex = fastStartIndex;
        this.fastSearchEndIndex = fastEndIndex;
        this.count = 0;
        this.quickSkip = false;
    }
}
const alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const invalidCombos = ["au", "av", "bb", "bc", "bd", "bf", "bg", "bh", "bj", "bk", "bl", "bm", "bn", "bp", "bq", "br", "bs", "bt", "bv", "bw", "bx", "by", "bz", "cb", "cc", "cd", "cf", "cg", "cj", "ck", "cl", "cm", "cn", "cp", "cq", "cr", "cs", "ct", "cv", "cw", "cx", "cy", "cz", "db", "dc", "dd", "df", "dg", "dh", "dj", "dk", "dl", "dm", "dn", "dp", "dq", "dr", "ds", "dt", "dv", "dw", "dx", "dy", "dz", "eu", "ev", "fb", "fc", "fd", "ff", "fg", "fh", "fi", "fj", "fk", "fl", "fm", "fn", "fp", "fq", "fr", "fs", "ft", "fv", "fw", "fx", "fy", "fz", "gi", "gv", "hb", "hc", "hd", "hf", "hg", "hh", "hj", "hk", "hl", "hm", "hp", "hq", "hr", "hs", "ht", "hv", "hw", "hx", "hy", "hz", "ii", "iv", "ja", "jb", "jc", "jd", "je", "jf", "jg", "jh", "jj", "jk", "jl", "jm", "jn", "jo", "jp", "jq", "jr", "js", "jt", "jv", "jw", "jx", "jy", "jz", "kb", "kc", "kd", "kf", "kg", "kh", "ki", "kj", "kk", "kl", "km", "kn", "kp", "kq", "kr", "ks", "kt", "kv", "kw", "kx", "ky", "kz", "lb", "lc", "ld", "lf", "lg", "lh", "lj", "lk", "ll", "lm", "ln", "lp", "lq", "lr", "ls", "lt", "lw", "lx", "ly", "lz", "mb", "mc", "md", "mf", "mg", "mh", "mj", "mk", "ml", "mm", "mn", "mp", "mq", "mr", "ms", "mt", "mv", "mw", "mx", "my", "mz", "oi", "ov", "pb", "pc", "pd", "pf", "pg", "ph", "pj", "pk", "pl", "pm", "pn", "pp", "pq", "pr", "ps", "pt", "pv", "pw", "px", "py", "pz", "qa", "qb", "qc", "qd", "qe", "qf", "qg", "qh", "qj", "qk", "ql", "qm", "qn", "qo", "qp", "qq", "qr", "qs", "qt", "qv", "qw", "qx", "qy", "qz", "rv", "sb", "sc", "sd", "sf", "sg", "sj", "sk", "sl", "sm", "sn", "sp", "sq", "sr", "ss", "st", "sv", "sw", "sx", "sy", "sz", "tb", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "tp", "tq", "tr", "ts", "tt", "tv", "tw", "tx", "ty", "tz", "uu", "uv", "vi", "vu", "vv", "wb", "wc", "wd", "wf", "wg", "wh", "wi", "wj", "wk", "wl", "wm", "wn", "wp", "wq", "wr", "ws", "wt", "wv", "ww", "wx", "wy", "wz", "xa", "xb", "xc", "xd", "xe", "xf", "xg", "xh", "xj", "xk", "xl", "xm", "xn", "xo", "xp", "xq", "xr", "xs", "xt", "xv", "xw", "xx", "xy", "xz", "yb", "yc", "yd", "yf", "yg", "yh", "yj", "yk", "yl", "ym", "yn", "yp", "yq", "yr", "ys", "yt", "yv", "yw", "yx", "yy", "yz", "zb", "zc", "zd", "zf", "zg", "zj", "zk", "zl", "zm", "zn", "zp", "zq", "zr", "zs", "zt", "zv", "zw", "zx", "zy", "zz"];
const validCombos = ["aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "aw", "ax", "ay", "az", "ba", "be", "bi", "bo", "bu", "ca", "ce", "ch", "ci", "co", "cu", "da", "de", "di", "do", "du", "ea", "eb", "ec", "ed", "ee", "ef", "eg", "eh", "ei", "ej", "ek", "el", "em", "en", "eo", "ep", "eq", "er", "es", "et", "ew", "ex", "ey", "ez", "fa", "fe", "fo", "fu", "ga", "gb", "gc", "gd", "ge", "gf", "gg", "gh", "gj", "gk", "gl", "gm", "gn", "go", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gx", "gy", "gz", "ha", "he", "hi", "hn", "ho", "hu", "ia", "ib", "ic", "id", "ie", "if", "ig", "ih", "ij", "ik", "il", "im", "in", "io", "ip", "iq", "ir", "is", "it", "iu", "iw", "ix", "iy", "iz", "ji", "ju", "ka", "ke", "ko", "ku", "la", "le", "li", "lo", "lu", "lv", "ma", "me", "mi", "mo", "mu", "na", "nb", "nc", "nd", "ne", "nf", "ng", "nh", "ni", "nj", "nk", "nl", "nm", "nn", "no", "np", "nq", "nr", "ns", "nt", "nu", "nv", "nw", "nx", "ny", "nz", "oa", "ob", "oc", "od", "oe", "of", "og", "oh", "oj", "ok", "ol", "om", "on", "oo", "op", "oq", "or", "os", "ot", "ou", "ow", "ox", "oy", "oz", "pa", "pe", "pi", "po", "pu", "qi", "qu", "ra", "rb", "rc", "rd", "re", "rf", "rg", "rh", "ri", "rj", "rk", "rl", "rm", "rn", "ro", "rp", "rq", "rr", "rs", "rt", "ru", "rw", "rx", "ry", "rz", "sa", "se", "sh", "si", "so", "su", "ta", "te", "ti", "to", "tu", "ua", "ub", "uc", "ud", "ue", "uf", "ug", "uh", "ui", "uj", "uk", "ul", "um", "un", "uo", "up", "uq", "ur", "us", "ut", "uw", "ux", "uy", "uz", "va", "vb", "vc", "vd", "ve", "vf", "vg", "vh", "vj", "vk", "vl", "vm", "vn", "vo", "vp", "vq", "vr", "vs", "vt", "vw", "vx", "vy", "vz", "wa", "we", "wo", "wu", "xi", "xu", "ya", "ye", "yi", "yo", "yu", "za", "ze", "zh", "zi", "zo", "zu"];
const shortestPinyin = ["a", "e", "o", "ai", "an", "ba", "bi", "bo", "bu", "ca", "ce", "ci", "cu", "da", "de", "di", "du", "ei", "en", "er", "fa", "fo", "fu", "ga", "ge", "gu", "ha", "he", "hu", "ji", "ju", "ka", "ke", "ku", "la", "le", "li", "lo", "lu", "lv", "ma", "me", "mi", "mo", "mu", "na", "ne", "ni", "nu", "nv", "ou", "pa", "pi", "po", "pu", "qi", "qu", "re", "ri", "ru", "sa", "se", "si", "su", "ta", "te", "ti", "tu", "wa", "wo", "wu", "xi", "xu", "ya", "ye", "yi", "yo", "yu", "za", "ze", "zi", "zu", "ang", "bai", "ban", "bei", "ben", "bin", "cai", "can", "cen", "cha", "che", "chi", "chu", "cou", "cui", "cun", "dai", "dan", "dei", "den", "diu", "dou", "dui", "dun", "fan", "fei", "fen", "fou", "gai", "gan", "gei", "gen", "gou", "gui", "gun", "hai", "han", "hei", "hen", "hou", "hui", "hun", "jin", "jiu", "jun", "kai", "kan", "kei", "ken", "kou", "kui", "kun", "lai", "lan", "lei", "lin", "liu", "lou", "lun", "mai", "man", "mei", "men", "min", "miu", "mou", "nai", "nan", "nei", "nen", "nin", "niu", "pai", "pan", "pei", "pen", "pin", "pou", "qin", "qiu", "qun", "ran", "rao", "ren", "rou", "rui", "run", "sai", "san", "sen", "sha", "she", "shi", "shu", "sou", "sui", "sun", "tai", "tan", "tou", "tui", "tun", "wai", "wan", "wei", "wen", "xin", "xiu", "xun", "yan", "yin", "you", "yun", "zai", "zan", "zei", "zen", "zha", "zhe", "zhi", "zhu", "zou", "zui", "zun", "bang", "beng", "bing", "cang", "ceng", "chai", "chan", "chen", "chou", "chui", "chun", "cong", "dang", "deng", "ding", "dong", "fang", "feng", "gang", "geng", "gong", "hang", "heng", "hong", "jing", "kang", "keng", "kong", "lang", "leng", "ling", "long", "mang", "meng", "ming", "nang", "neng", "ning", "nong", "pang", "peng", "ping", "qing", "rang", "reng", "rong", "sang", "seng", "shai", "shan", "shei", "shen", "shou", "shui", "shun", "song", "tang", "teng", "ting", "tong", "wang", "weng", "xing", "yang", "ying", "yong", "zang", "zeng", "zhai", "zhan", "zhei", "zhen", "zhou", "zhui", "zhun", "zong", "chang", "cheng", "chong", "jiong", "qiong", "shang", "sheng", "xiong", "zhang", "zheng", "zhong"];
const allPinyin = ["a", "e", "o", "ai", "an", "ao", "ba", "bi", "bo", "bu", "ca", "ce", "ci", "cu", "da", "de", "di", "du", "ei", "en", "er", "fa", "fo", "fu", "ga", "ge", "gu", "ha", "he", "hu", "ji", "ju", "ka", "ke", "ku", "la", "le", "li", "lo", "lu", "lv", "ma", "me", "mi", "mo", "mu", "na", "ne", "ni", "nu", "nv", "ou", "pa", "pi", "po", "pu", "qi", "qu", "re", "ri", "ru", "sa", "se", "si", "su", "ta", "te", "ti", "tu", "wa", "wo", "wu", "xi", "xu", "ya", "ye", "yi", "yo", "yu", "za", "ze", "zi", "zu", "ang", "bai", "ban", "bao", "bei", "ben", "bie", "bin", "cai", "can", "cao", "cen", "cha", "che", "chi", "chu", "cou", "cui", "cun", "cuo", "dai", "dan", "dao", "dei", "den", "dia", "die", "diu", "dou", "dui", "dun", "duo", "fan", "fei", "fen", "fou", "gai", "gan", "gao", "gei", "gen", "gou", "gua", "gui", "gun", "guo", "hai", "han", "hao", "hei", "hen", "hou", "hua", "hui", "hun", "huo", "jia", "jie", "jin", "jiu", "jue", "jun", "kai", "kan", "kao", "kei", "ken", "kou", "kua", "kui", "kun", "kuo", "lai", "lan", "lao", "lei", "lia", "lie", "lin", "liu", "lou", "lve", "lun", "luo", "mai", "man", "mao", "mei", "men", "mie", "min", "miu", "mou", "nai", "nan", "nao", "nei", "nen", "nie", "nin", "niu", "nve", "nuo", "pai", "pan", "pao", "pei", "pen", "pie", "pin", "pou", "qia", "qie", "qin", "qiu", "que", "qun", "ran", "rao", "ren", "rou", "rui", "run", "ruo", "sai", "san", "sao", "sen", "sha", "she", "shi", "shu", "sou", "sui", "sun", "suo", "tai", "tan", "tao", "tie", "tou", "tui", "tun", "tuo", "wai", "wan", "wei", "wen", "xia", "xie", "xin", "xiu", "xue", "xun", "yan", "yao", "yin", "you", "yue", "yun", "zai", "zan", "zao", "zei", "zen", "zha", "zhe", "zhi", "zhu", "zou", "zui", "zun", "zuo", "bang", "beng", "bian", "biao", "bing", "cang", "ceng", "chai", "chan", "chao", "chen", "chou", "chua", "chui", "chun", "chuo", "cong", "cuan", "dang", "deng", "dian", "diao", "ding", "dong", "duan", "fang", "feng", "gang", "geng", "gong", "guai", "guan", "hang", "heng", "hong", "huai", "huan", "jian", "jiao", "jing", "juan", "kang", "keng", "kong", "kuai", "kuan", "lang", "leng", "lian", "liao", "ling", "long", "luan", "mang", "meng", "mian", "miao", "ming", "nang", "neng", "nian", "niao", "ning", "nong", "nuan", "pang", "peng", "pian", "piao", "ping", "qian", "qiao", "qing", "quan", "rang", "reng", "rong", "ruan", "sang", "seng", "shai", "shan", "shao", "shei", "shen", "shou", "shua", "shui", "shun", "shuo", "song", "suan", "tang", "teng", "tian", "tiao", "ting", "tong", "tuan", "wang", "weng", "xian", "xiao", "xing", "xuan", "yang", "ying", "yong", "yuan", "zang", "zeng", "zhai", "zhan", "zhao", "zhei", "zhen", "zhou", "zhua", "zhui", "zhun", "zhuo", "zong", "zuan", "chang", "cheng", "chong", "chuai", "chuan", "guang", "huang", "jiang", "jiong", "kuang", "liang", "niang", "qiang", "qiong", "shang", "sheng", "shuai", "shuan", "xiang", "xiong", "zhang", "zheng", "zhong", "zhuai", "zhuan", "chuang", "shuang", "zhuang"];
const linkedLookUp = {
    "": ["a", "e", "o", "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "w", "x", "y", "z"],
    "a": ["i", "n"],
    "b": ["a", "i", "o", "u", "e"],
    "c": ["a", "e", "i", "u", "h", "o"],
    "d": ["a", "e", "i", "u", "o"],
    "e": ["i", "n", "r"],
    "f": ["a", "o", "u", "e"],
    "g": ["a", "e", "u", "o"],
    "h": ["a", "e", "u", "o"],
    "j": ["i", "u"],
    "k": ["a", "e", "u", "o"],
    "l": ["a", "e", "i", "o", "u", "v"],
    "m": ["a", "e", "i", "o", "u"],
    "n": ["a", "e", "i", "u", "v", "o"],
    "o": ["u"],
    "p": ["a", "i", "o", "u", "e"],
    "q": ["i", "u"],
    "r": ["e", "i", "u", "a", "o"],
    "s": ["a", "e", "i", "u", "h", "o"],
    "t": ["a", "e", "i", "u", "o"],
    "w": ["a", "o", "u", "e"],
    "x": ["i", "u"],
    "y": ["a", "e", "i", "o", "u"],
    "z": ["a", "e", "i", "u", "h", "o"],
    "an": ["g"],
    "ba": ["i", "n"],
    "be": ["i", "n"],
    "bi": ["n"],
    "ca": ["i", "n"],
    "ce": ["n"],
    "ch": ["a", "e", "i", "u", "o"],
    "co": ["u", "n"],
    "cu": ["i", "n"],
    "da": ["i", "n"],
    "de": ["i", "n"],
    "di": ["u", "n"],
    "do": ["u", "n"],
    "du": ["i", "n"],
    "fa": ["n"],
    "fe": ["i", "n"],
    "fo": ["u"],
    "ga": ["i", "n"],
    "ge": ["i", "n"],
    "go": ["u", "n"],
    "gu": ["i", "n"],
    "ha": ["i", "n"],
    "he": ["i", "n"],
    "ho": ["u", "n"],
    "hu": ["i", "n"],
    "ji": ["n", "u", "o"],
    "ju": ["n"],
    "ka": ["i", "n"],
    "ke": ["i", "n"],
    "ko": ["u", "n"],
    "ku": ["i", "n"],
    "la": ["i", "n"],
    "le": ["i", "n"],
    "li": ["n", "u"],
    "lo": ["u", "n"],
    "lu": ["n"],
    "ma": ["i", "n"],
    "me": ["i", "n"],
    "mi": ["n", "u"],
    "mo": ["u"],
    "na": ["i", "n"],
    "ne": ["i", "n"],
    "ni": ["n", "u"],
    "pa": ["i", "n"],
    "pe": ["i", "n"],
    "pi": ["n"],
    "po": ["u"],
    "qi": ["n", "u", "o"],
    "qu": ["n"],
    "ra": ["n", "o"],
    "re": ["n"],
    "ro": ["u", "n"],
    "ru": ["i", "n"],
    "sa": ["i", "n"],
    "se": ["n"],
    "sh": ["a", "e", "i", "u", "o"],
    "so": ["u", "n"],
    "su": ["i", "n"],
    "ta": ["i", "n"],
    "to": ["u", "n"],
    "tu": ["i", "n"],
    "wa": ["i", "n"],
    "we": ["i", "n"],
    "xi": ["n", "u", "o"],
    "xu": ["n"],
    "ya": ["n"],
    "yi": ["n"],
    "yo": ["u", "n"],
    "yu": ["n"],
    "za": ["i", "n"],
    "ze": ["i", "n"],
    "zh": ["a", "e", "i", "u", "o"],
    "zo": ["u", "n"],
    "zu": ["i", "n"],
    "ban": ["g"],
    "ben": ["g"],
    "bin": ["g"],
    "can": ["g"],
    "cen": ["g"],
    "cha": ["i", "n"],
    "che": ["n"],
    "cho": ["u", "n"],
    "chu": ["i", "n"],
    "con": ["g"],
    "dan": ["g"],
    "den": ["g"],
    "din": ["g"],
    "don": ["g"],
    "fan": ["g"],
    "fen": ["g"],
    "gan": ["g"],
    "gen": ["g"],
    "gon": ["g"],
    "han": ["g"],
    "hen": ["g"],
    "hon": ["g"],
    "jin": ["g"],
    "kan": ["g"],
    "ken": ["g"],
    "kon": ["g"],
    "lan": ["g"],
    "len": ["g"],
    "lin": ["g"],
    "lon": ["g"],
    "man": ["g"],
    "men": ["g"],
    "min": ["g"],
    "nan": ["g"],
    "nen": ["g"],
    "nin": ["g"],
    "no": ["n"],
    "non": ["g"],
    "pan": ["g"],
    "pen": ["g"],
    "pin": ["g"],
    "qin": ["g"],
    "ran": ["g"],
    "ren": ["g"],
    "ron": ["g"],
    "san": ["g"],
    "sen": ["g"],
    "sha": ["i", "n"],
    "she": ["i", "n"],
    "sho": ["u"],
    "shu": ["i", "n"],
    "son": ["g"],
    "tan": ["g"],
    "te": ["n"],
    "ten": ["g"],
    "ti": ["n"],
    "tin": ["g"],
    "ton": ["g"],
    "wan": ["g"],
    "wen": ["g"],
    "xin": ["g"],
    "yan": ["g"],
    "yin": ["g"],
    "yon": ["g"],
    "zan": ["g"],
    "zen": ["g"],
    "zha": ["i", "n"],
    "zhe": ["i", "n"],
    "zho": ["u", "n"],
    "zhu": ["i", "n"],
    "zon": ["g"],
    "chan": ["g"],
    "chen": ["g"],
    "chon": ["g"],
    "jio": ["n"],
    "jion": ["g"],
    "qio": ["n"],
    "qion": ["g"],
    "shan": ["g"],
    "shen": ["g"],
    "xio": ["n"],
    "xion": ["g"],
    "zhan": ["g"],
    "zhen": ["g"],
    "zhon": ["g"]
};
function combinePinyin(text) {
    var newPinyin = [];
    var arr = text.trim().split(" ");
    for (var i = 0; i < arr.length - 1; i++) {
        var p = arr[i] + arr[i + 1];
        if (allPinyin.includes(p)) {
            newPinyin.push(p);
            i++;
        }
        else {
            newPinyin.push(arr[i]);
        }
    }
    if (i == arr.length - 1 && arr[i].length > 0) {
        newPinyin.push(arr[i]);
    }
    var str = newPinyin.join(" ") + " ";
    if (str != text) {
        return str;
    }
    return "";
}
function decipher(text, processedPinyin, pinyinBuffer, usedLetters, currentPos, settings, print) {
    if (settings.quickSkip) {
        if (currentPos == settings.fastSearchEndIndex) {
            settings.quickSkip = false;
        }
        else if (currentPos <= settings.fastSearchEndIndex) {
            settings.quickSkip = false;
            return;
        }
        else {
            return;
        }
    }
    settings.count++;
    if (text.length == 0) {
        // all finished
        if (pinyinBuffer.length == 0) {
            settings.quickSkip = true && settings.fastSearchEndIndex >= 0 && currentPos > (settings.fastSearchEndIndex + 1);
            let combined = combinePinyin(processedPinyin);
            print([true, processedPinyin, settings.count]);
            settings.count = 0;
            if (combined.length > 0) {
                print([true, combined, 1]);
            }
        }
        return;
    }
    else {
        if (settings.count > 10000) {
            print([false, processedPinyin + pinyinBuffer + text, settings.count]);
            settings.count = 0;
        }
    }
    let currentChar = text[0];
    if (isCapital(currentChar)) {
        let letters = linkedLookUp[pinyinBuffer];
        if (letters == undefined) {
            return;
        }
        letters = letters.filter((el) => !usedLetters.includes(el));
        for (let i = 0; i < letters.length; i++) {
            let currentLetter = letters[i];
            let text2 = replaceAll(text, currentChar, currentLetter);
            if (hasInvalidCombos(text2)) {
                continue;
            }
            let usedLetters2 = usedLetters + currentLetter;
            decipher(text2, processedPinyin, pinyinBuffer, usedLetters2, settings.originalTextLength - text2.length, settings, print);
        }
    }
    else {
        pinyinBuffer += currentChar;
        currentPos++;
        var text2 = text.slice(1);
        if (linkedLookUp[pinyinBuffer] != undefined) {
            decipher(text2, processedPinyin, pinyinBuffer, usedLetters, currentPos, settings, print);
        }
        if (shortestPinyin.includes(pinyinBuffer)) {
            processedPinyin += pinyinBuffer + " ";
            decipher(text2, processedPinyin, "", usedLetters, currentPos, settings, print);
        }
        return;
    }
}
function replaceAll(text, find, replace) {
    return text.replace(new RegExp(find, 'g'), replace);
}
function hasInvalidCombos(text) {
    for (let i = 0; i < invalidCombos.length; i++) {
        if (text.includes(invalidCombos[i])) {
            return true;
        }
    }
    return false;
}
function isCapital(c) {
    let code = c.charCodeAt(0);
    return code >= 65 && code <= 90;
}
