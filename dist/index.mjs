import require$$1 from 'path';
import 'node:util';
import g, { stdin, stdout } from 'node:process';
import * as f from 'node:readline';
import f__default from 'node:readline';
import { WriteStream } from 'node:tty';
import { fileURLToPath } from 'url';
import require$$0$2 from 'fs';
import require$$0 from 'constants';
import require$$0$1 from 'stream';
import require$$4 from 'util';
import require$$5 from 'assert';
import { languages } from './i18n/index.mjs';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var src;
var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src;
	hasRequiredSrc = 1;

	const ESC = '\x1B';
	const CSI = `${ESC}[`;
	const beep = '\u0007';

	const cursor = {
	  to(x, y) {
	    if (!y) return `${CSI}${x + 1}G`;
	    return `${CSI}${y + 1};${x + 1}H`;
	  },
	  move(x, y) {
	    let ret = '';

	    if (x < 0) ret += `${CSI}${-x}D`;
	    else if (x > 0) ret += `${CSI}${x}C`;

	    if (y < 0) ret += `${CSI}${-y}A`;
	    else if (y > 0) ret += `${CSI}${y}B`;

	    return ret;
	  },
	  up: (count = 1) => `${CSI}${count}A`,
	  down: (count = 1) => `${CSI}${count}B`,
	  forward: (count = 1) => `${CSI}${count}C`,
	  backward: (count = 1) => `${CSI}${count}D`,
	  nextLine: (count = 1) => `${CSI}E`.repeat(count),
	  prevLine: (count = 1) => `${CSI}F`.repeat(count),
	  left: `${CSI}G`,
	  hide: `${CSI}?25l`,
	  show: `${CSI}?25h`,
	  save: `${ESC}7`,
	  restore: `${ESC}8`
	};

	const scroll = {
	  up: (count = 1) => `${CSI}S`.repeat(count),
	  down: (count = 1) => `${CSI}T`.repeat(count)
	};

	const erase = {
	  screen: `${CSI}2J`,
	  up: (count = 1) => `${CSI}1J`.repeat(count),
	  down: (count = 1) => `${CSI}J`.repeat(count),
	  line: `${CSI}2K`,
	  lineEnd: `${CSI}K`,
	  lineStart: `${CSI}1K`,
	  lines(count) {
	    let clear = '';
	    for (let i = 0; i < count; i++)
	      clear += this.line + (i < count - 1 ? cursor.up() : '');
	    if (count)
	      clear += cursor.left;
	    return clear;
	  }
	};

	src = { cursor, scroll, erase, beep };
	return src;
}

var srcExports = requireSrc();

var picocolors = {exports: {}};

var hasRequiredPicocolors;

function requirePicocolors () {
	if (hasRequiredPicocolors) return picocolors.exports;
	hasRequiredPicocolors = 1;
	let p = process || {}, argv = p.argv || [], env = p.env || {};
	let isColorSupported =
		!(!!env.NO_COLOR || argv.includes("--no-color")) &&
		(!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || ((p.stdout || {}).isTTY && env.TERM !== "dumb") || !!env.CI);

	let formatter = (open, close, replace = open) =>
		input => {
			let string = "" + input, index = string.indexOf(close, open.length);
			return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close
		};

	let replaceClose = (string, close, replace, index) => {
		let result = "", cursor = 0;
		do {
			result += string.substring(cursor, index) + replace;
			cursor = index + close.length;
			index = string.indexOf(close, cursor);
		} while (~index)
		return result + string.substring(cursor)
	};

	let createColors = (enabled = isColorSupported) => {
		let f = enabled ? formatter : () => String;
		return {
			isColorSupported: enabled,
			reset: f("\x1b[0m", "\x1b[0m"),
			bold: f("\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m"),
			dim: f("\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m"),
			italic: f("\x1b[3m", "\x1b[23m"),
			underline: f("\x1b[4m", "\x1b[24m"),
			inverse: f("\x1b[7m", "\x1b[27m"),
			hidden: f("\x1b[8m", "\x1b[28m"),
			strikethrough: f("\x1b[9m", "\x1b[29m"),

			black: f("\x1b[30m", "\x1b[39m"),
			red: f("\x1b[31m", "\x1b[39m"),
			green: f("\x1b[32m", "\x1b[39m"),
			yellow: f("\x1b[33m", "\x1b[39m"),
			blue: f("\x1b[34m", "\x1b[39m"),
			magenta: f("\x1b[35m", "\x1b[39m"),
			cyan: f("\x1b[36m", "\x1b[39m"),
			white: f("\x1b[37m", "\x1b[39m"),
			gray: f("\x1b[90m", "\x1b[39m"),

			bgBlack: f("\x1b[40m", "\x1b[49m"),
			bgRed: f("\x1b[41m", "\x1b[49m"),
			bgGreen: f("\x1b[42m", "\x1b[49m"),
			bgYellow: f("\x1b[43m", "\x1b[49m"),
			bgBlue: f("\x1b[44m", "\x1b[49m"),
			bgMagenta: f("\x1b[45m", "\x1b[49m"),
			bgCyan: f("\x1b[46m", "\x1b[49m"),
			bgWhite: f("\x1b[47m", "\x1b[49m"),

			blackBright: f("\x1b[90m", "\x1b[39m"),
			redBright: f("\x1b[91m", "\x1b[39m"),
			greenBright: f("\x1b[92m", "\x1b[39m"),
			yellowBright: f("\x1b[93m", "\x1b[39m"),
			blueBright: f("\x1b[94m", "\x1b[39m"),
			magentaBright: f("\x1b[95m", "\x1b[39m"),
			cyanBright: f("\x1b[96m", "\x1b[39m"),
			whiteBright: f("\x1b[97m", "\x1b[39m"),

			bgBlackBright: f("\x1b[100m", "\x1b[49m"),
			bgRedBright: f("\x1b[101m", "\x1b[49m"),
			bgGreenBright: f("\x1b[102m", "\x1b[49m"),
			bgYellowBright: f("\x1b[103m", "\x1b[49m"),
			bgBlueBright: f("\x1b[104m", "\x1b[49m"),
			bgMagentaBright: f("\x1b[105m", "\x1b[49m"),
			bgCyanBright: f("\x1b[106m", "\x1b[49m"),
			bgWhiteBright: f("\x1b[107m", "\x1b[49m"),
		}
	};

	picocolors.exports = createColors();
	picocolors.exports.createColors = createColors;
	return picocolors.exports;
}

var picocolorsExports = /*@__PURE__*/ requirePicocolors();
const e = /*@__PURE__*/getDefaultExportFromCjs(picocolorsExports);

function J({onlyFirst:t=false}={}){const F=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");return new RegExp(F,t?void 0:"g")}const Q=J();function T(t){if(typeof t!="string")throw new TypeError(`Expected a \`string\`, got \`${typeof t}\``);return t.replace(Q,"")}function O(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var P$1={exports:{}};(function(t){var u={};t.exports=u,u.eastAsianWidth=function(e){var s=e.charCodeAt(0),i=e.length==2?e.charCodeAt(1):0,D=s;return 55296<=s&&s<=56319&&56320<=i&&i<=57343&&(s&=1023,i&=1023,D=s<<10|i,D+=65536),D==12288||65281<=D&&D<=65376||65504<=D&&D<=65510?"F":D==8361||65377<=D&&D<=65470||65474<=D&&D<=65479||65482<=D&&D<=65487||65490<=D&&D<=65495||65498<=D&&D<=65500||65512<=D&&D<=65518?"H":4352<=D&&D<=4447||4515<=D&&D<=4519||4602<=D&&D<=4607||9001<=D&&D<=9002||11904<=D&&D<=11929||11931<=D&&D<=12019||12032<=D&&D<=12245||12272<=D&&D<=12283||12289<=D&&D<=12350||12353<=D&&D<=12438||12441<=D&&D<=12543||12549<=D&&D<=12589||12593<=D&&D<=12686||12688<=D&&D<=12730||12736<=D&&D<=12771||12784<=D&&D<=12830||12832<=D&&D<=12871||12880<=D&&D<=13054||13056<=D&&D<=19903||19968<=D&&D<=42124||42128<=D&&D<=42182||43360<=D&&D<=43388||44032<=D&&D<=55203||55216<=D&&D<=55238||55243<=D&&D<=55291||63744<=D&&D<=64255||65040<=D&&D<=65049||65072<=D&&D<=65106||65108<=D&&D<=65126||65128<=D&&D<=65131||110592<=D&&D<=110593||127488<=D&&D<=127490||127504<=D&&D<=127546||127552<=D&&D<=127560||127568<=D&&D<=127569||131072<=D&&D<=194367||177984<=D&&D<=196605||196608<=D&&D<=262141?"W":32<=D&&D<=126||162<=D&&D<=163||165<=D&&D<=166||D==172||D==175||10214<=D&&D<=10221||10629<=D&&D<=10630?"Na":D==161||D==164||167<=D&&D<=168||D==170||173<=D&&D<=174||176<=D&&D<=180||182<=D&&D<=186||188<=D&&D<=191||D==198||D==208||215<=D&&D<=216||222<=D&&D<=225||D==230||232<=D&&D<=234||236<=D&&D<=237||D==240||242<=D&&D<=243||247<=D&&D<=250||D==252||D==254||D==257||D==273||D==275||D==283||294<=D&&D<=295||D==299||305<=D&&D<=307||D==312||319<=D&&D<=322||D==324||328<=D&&D<=331||D==333||338<=D&&D<=339||358<=D&&D<=359||D==363||D==462||D==464||D==466||D==468||D==470||D==472||D==474||D==476||D==593||D==609||D==708||D==711||713<=D&&D<=715||D==717||D==720||728<=D&&D<=731||D==733||D==735||768<=D&&D<=879||913<=D&&D<=929||931<=D&&D<=937||945<=D&&D<=961||963<=D&&D<=969||D==1025||1040<=D&&D<=1103||D==1105||D==8208||8211<=D&&D<=8214||8216<=D&&D<=8217||8220<=D&&D<=8221||8224<=D&&D<=8226||8228<=D&&D<=8231||D==8240||8242<=D&&D<=8243||D==8245||D==8251||D==8254||D==8308||D==8319||8321<=D&&D<=8324||D==8364||D==8451||D==8453||D==8457||D==8467||D==8470||8481<=D&&D<=8482||D==8486||D==8491||8531<=D&&D<=8532||8539<=D&&D<=8542||8544<=D&&D<=8555||8560<=D&&D<=8569||D==8585||8592<=D&&D<=8601||8632<=D&&D<=8633||D==8658||D==8660||D==8679||D==8704||8706<=D&&D<=8707||8711<=D&&D<=8712||D==8715||D==8719||D==8721||D==8725||D==8730||8733<=D&&D<=8736||D==8739||D==8741||8743<=D&&D<=8748||D==8750||8756<=D&&D<=8759||8764<=D&&D<=8765||D==8776||D==8780||D==8786||8800<=D&&D<=8801||8804<=D&&D<=8807||8810<=D&&D<=8811||8814<=D&&D<=8815||8834<=D&&D<=8835||8838<=D&&D<=8839||D==8853||D==8857||D==8869||D==8895||D==8978||9312<=D&&D<=9449||9451<=D&&D<=9547||9552<=D&&D<=9587||9600<=D&&D<=9615||9618<=D&&D<=9621||9632<=D&&D<=9633||9635<=D&&D<=9641||9650<=D&&D<=9651||9654<=D&&D<=9655||9660<=D&&D<=9661||9664<=D&&D<=9665||9670<=D&&D<=9672||D==9675||9678<=D&&D<=9681||9698<=D&&D<=9701||D==9711||9733<=D&&D<=9734||D==9737||9742<=D&&D<=9743||9748<=D&&D<=9749||D==9756||D==9758||D==9792||D==9794||9824<=D&&D<=9825||9827<=D&&D<=9829||9831<=D&&D<=9834||9836<=D&&D<=9837||D==9839||9886<=D&&D<=9887||9918<=D&&D<=9919||9924<=D&&D<=9933||9935<=D&&D<=9953||D==9955||9960<=D&&D<=9983||D==10045||D==10071||10102<=D&&D<=10111||11093<=D&&D<=11097||12872<=D&&D<=12879||57344<=D&&D<=63743||65024<=D&&D<=65039||D==65533||127232<=D&&D<=127242||127248<=D&&D<=127277||127280<=D&&D<=127337||127344<=D&&D<=127386||917760<=D&&D<=917999||983040<=D&&D<=1048573||1048576<=D&&D<=1114109?"A":"N"},u.characterLength=function(e){var s=this.eastAsianWidth(e);return s=="F"||s=="W"||s=="A"?2:1};function F(e){return e.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)||[]}u.length=function(e){for(var s=F(e),i=0,D=0;D<s.length;D++)i=i+this.characterLength(s[D]);return i},u.slice=function(e,s,i){textLen=u.length(e),s=s||0,i=i||1,s<0&&(s=textLen+s),i<0&&(i=textLen+i);for(var D="",C=0,o=F(e),E=0;E<o.length;E++){var a=o[E],n=u.length(a);if(C>=s-(n==2?1:0))if(C+n<=i)D+=a;else break;C+=n;}return D};})(P$1);var X=P$1.exports;const DD=O(X);var uD=function(){return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g};const FD=O(uD);function A(t,u={}){if(typeof t!="string"||t.length===0||(u={ambiguousIsNarrow:true,...u},t=T(t),t.length===0))return 0;t=t.replace(FD(),"  ");const F=u.ambiguousIsNarrow?1:2;let e=0;for(const s of t){const i=s.codePointAt(0);if(i<=31||i>=127&&i<=159||i>=768&&i<=879)continue;switch(DD.eastAsianWidth(s)){case "F":case "W":e+=2;break;case "A":e+=F;break;default:e+=1;}}return e}const m=10,L$1=(t=0)=>u=>`\x1B[${u+t}m`,N=(t=0)=>u=>`\x1B[${38+t};5;${u}m`,I=(t=0)=>(u,F,e)=>`\x1B[${38+t};2;${u};${F};${e}m`,r={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};Object.keys(r.modifier);const tD=Object.keys(r.color),eD=Object.keys(r.bgColor);[...tD,...eD];function sD(){const t=new Map;for(const[u,F]of Object.entries(r)){for(const[e,s]of Object.entries(F))r[e]={open:`\x1B[${s[0]}m`,close:`\x1B[${s[1]}m`},F[e]=r[e],t.set(s[0],s[1]);Object.defineProperty(r,u,{value:F,enumerable:false});}return Object.defineProperty(r,"codes",{value:t,enumerable:false}),r.color.close="\x1B[39m",r.bgColor.close="\x1B[49m",r.color.ansi=L$1(),r.color.ansi256=N(),r.color.ansi16m=I(),r.bgColor.ansi=L$1(m),r.bgColor.ansi256=N(m),r.bgColor.ansi16m=I(m),Object.defineProperties(r,{rgbToAnsi256:{value:(u,F,e)=>u===F&&F===e?u<8?16:u>248?231:Math.round((u-8)/247*24)+232:16+36*Math.round(u/255*5)+6*Math.round(F/255*5)+Math.round(e/255*5),enumerable:false},hexToRgb:{value:u=>{const F=/[a-f\d]{6}|[a-f\d]{3}/i.exec(u.toString(16));if(!F)return [0,0,0];let[e]=F;e.length===3&&(e=[...e].map(i=>i+i).join(""));const s=Number.parseInt(e,16);return [s>>16&255,s>>8&255,s&255]},enumerable:false},hexToAnsi256:{value:u=>r.rgbToAnsi256(...r.hexToRgb(u)),enumerable:false},ansi256ToAnsi:{value:u=>{if(u<8)return 30+u;if(u<16)return 90+(u-8);let F,e,s;if(u>=232)F=((u-232)*10+8)/255,e=F,s=F;else {u-=16;const C=u%36;F=Math.floor(u/36)/5,e=Math.floor(C/6)/5,s=C%6/5;}const i=Math.max(F,e,s)*2;if(i===0)return 30;let D=30+(Math.round(s)<<2|Math.round(e)<<1|Math.round(F));return i===2&&(D+=60),D},enumerable:false},rgbToAnsi:{value:(u,F,e)=>r.ansi256ToAnsi(r.rgbToAnsi256(u,F,e)),enumerable:false},hexToAnsi:{value:u=>r.ansi256ToAnsi(r.hexToAnsi256(u)),enumerable:false}}),r}const iD=sD(),v=new Set(["\x1B","\x9B"]),CD=39,w$1="\x07",W$1="[",rD="]",R="m",y=`${rD}8;;`,V$1=t=>`${v.values().next().value}${W$1}${t}${R}`,z=t=>`${v.values().next().value}${y}${t}${w$1}`,ED=t=>t.split(" ").map(u=>A(u)),_=(t,u,F)=>{const e=[...u];let s=false,i=false,D=A(T(t[t.length-1]));for(const[C,o]of e.entries()){const E=A(o);if(D+E<=F?t[t.length-1]+=o:(t.push(o),D=0),v.has(o)&&(s=true,i=e.slice(C+1).join("").startsWith(y)),s){i?o===w$1&&(s=false,i=false):o===R&&(s=false);continue}D+=E,D===F&&C<e.length-1&&(t.push(""),D=0);}!D&&t[t.length-1].length>0&&t.length>1&&(t[t.length-2]+=t.pop());},nD=t=>{const u=t.split(" ");let F=u.length;for(;F>0&&!(A(u[F-1])>0);)F--;return F===u.length?t:u.slice(0,F).join(" ")+u.slice(F).join("")},oD=(t,u,F={})=>{if(F.trim!==false&&t.trim()==="")return "";let e="",s,i;const D=ED(t);let C=[""];for(const[E,a]of t.split(" ").entries()){F.trim!==false&&(C[C.length-1]=C[C.length-1].trimStart());let n=A(C[C.length-1]);if(E!==0&&(n>=u&&(F.wordWrap===false||F.trim===false)&&(C.push(""),n=0),(n>0||F.trim===false)&&(C[C.length-1]+=" ",n++)),F.hard&&D[E]>u){const B=u-n,p=1+Math.floor((D[E]-B-1)/u);Math.floor((D[E]-1)/u)<p&&C.push(""),_(C,a,u);continue}if(n+D[E]>u&&n>0&&D[E]>0){if(F.wordWrap===false&&n<u){_(C,a,u);continue}C.push("");}if(n+D[E]>u&&F.wordWrap===false){_(C,a,u);continue}C[C.length-1]+=a;}F.trim!==false&&(C=C.map(E=>nD(E)));const o=[...C.join(`
`)];for(const[E,a]of o.entries()){if(e+=a,v.has(a)){const{groups:B}=new RegExp(`(?:\\${W$1}(?<code>\\d+)m|\\${y}(?<uri>.*)${w$1})`).exec(o.slice(E).join(""))||{groups:{}};if(B.code!==void 0){const p=Number.parseFloat(B.code);s=p===CD?void 0:p;}else B.uri!==void 0&&(i=B.uri.length===0?void 0:B.uri);}const n=iD.codes.get(Number(s));o[E+1]===`
`?(i&&(e+=z("")),s&&n&&(e+=V$1(n))):a===`
`&&(s&&n&&(e+=V$1(s)),i&&(e+=z(i)));}return e};function G(t,u,F){return String(t).normalize().replace(/\r\n/g,`
`).split(`
`).map(e=>oD(e,u,F)).join(`
`)}const aD=["up","down","left","right","space","enter","cancel"],c={actions:new Set(aD),aliases:new Map([["k","up"],["j","down"],["h","left"],["l","right"],["","cancel"],["escape","cancel"]])};function k$1(t,u){if(typeof t=="string")return c.aliases.get(t)===u;for(const F of t)if(F!==void 0&&k$1(F,u))return  true;return  false}function lD(t,u){if(t===u)return;const F=t.split(`
`),e=u.split(`
`),s=[];for(let i=0;i<Math.max(F.length,e.length);i++)F[i]!==e[i]&&s.push(i);return s}const xD=globalThis.process.platform.startsWith("win"),S=Symbol("clack:cancel");function BD(t){return t===S}function d$1(t,u){const F=t;F.isTTY&&F.setRawMode(u);}function cD({input:t=stdin,output:u=stdout,overwrite:F=true,hideCursor:e=true}={}){const s=f.createInterface({input:t,output:u,prompt:"",tabSize:1});f.emitKeypressEvents(t,s),t.isTTY&&t.setRawMode(true);const i=(D,{name:C,sequence:o})=>{const E=String(D);if(k$1([E,C,o],"cancel")){e&&u.write(srcExports.cursor.show),process.exit(0);return}if(!F)return;const a=C==="return"?0:-1,n=C==="return"?-1:0;f.moveCursor(u,a,n,()=>{f.clearLine(u,1,()=>{t.once("keypress",i);});});};return e&&u.write(srcExports.cursor.hide),t.once("keypress",i),()=>{t.off("keypress",i),e&&u.write(srcExports.cursor.show),t.isTTY&&!xD&&t.setRawMode(false),s.terminal=false,s.close();}}var AD=Object.defineProperty,pD=(t,u,F)=>u in t?AD(t,u,{enumerable:true,configurable:true,writable:true,value:F}):t[u]=F,h=(t,u,F)=>(pD(t,typeof u!="symbol"?u+"":u,F),F);class x{constructor(u,F=true){h(this,"input"),h(this,"output"),h(this,"_abortSignal"),h(this,"rl"),h(this,"opts"),h(this,"_render"),h(this,"_track",false),h(this,"_prevFrame",""),h(this,"_subscribers",new Map),h(this,"_cursor",0),h(this,"state","initial"),h(this,"error",""),h(this,"value");const{input:e=stdin,output:s=stdout,render:i,signal:D,...C}=u;this.opts=C,this.onKeypress=this.onKeypress.bind(this),this.close=this.close.bind(this),this.render=this.render.bind(this),this._render=i.bind(this),this._track=F,this._abortSignal=D,this.input=e,this.output=s;}unsubscribe(){this._subscribers.clear();}setSubscriber(u,F){const e=this._subscribers.get(u)??[];e.push(F),this._subscribers.set(u,e);}on(u,F){this.setSubscriber(u,{cb:F});}once(u,F){this.setSubscriber(u,{cb:F,once:true});}emit(u,...F){const e=this._subscribers.get(u)??[],s=[];for(const i of e)i.cb(...F),i.once&&s.push(()=>e.splice(e.indexOf(i),1));for(const i of s)i();}prompt(){return new Promise((u,F)=>{if(this._abortSignal){if(this._abortSignal.aborted)return this.state="cancel",this.close(),u(S);this._abortSignal.addEventListener("abort",()=>{this.state="cancel",this.close();},{once:true});}const e=new WriteStream(0);e._write=(s,i,D)=>{this._track&&(this.value=this.rl?.line.replace(/\t/g,""),this._cursor=this.rl?.cursor??0,this.emit("value",this.value)),D();},this.input.pipe(e),this.rl=f__default.createInterface({input:this.input,output:e,tabSize:2,prompt:"",escapeCodeTimeout:50}),f__default.emitKeypressEvents(this.input,this.rl),this.rl.prompt(),this.opts.initialValue!==void 0&&this._track&&this.rl.write(this.opts.initialValue),this.input.on("keypress",this.onKeypress),d$1(this.input,true),this.output.on("resize",this.render),this.render(),this.once("submit",()=>{this.output.write(srcExports.cursor.show),this.output.off("resize",this.render),d$1(this.input,false),u(this.value);}),this.once("cancel",()=>{this.output.write(srcExports.cursor.show),this.output.off("resize",this.render),d$1(this.input,false),u(S);});})}onKeypress(u,F){if(this.state==="error"&&(this.state="active"),F?.name&&(!this._track&&c.aliases.has(F.name)&&this.emit("cursor",c.aliases.get(F.name)),c.actions.has(F.name)&&this.emit("cursor",F.name)),u&&(u.toLowerCase()==="y"||u.toLowerCase()==="n")&&this.emit("confirm",u.toLowerCase()==="y"),u==="	"&&this.opts.placeholder&&(this.value||(this.rl?.write(this.opts.placeholder),this.emit("value",this.opts.placeholder))),u&&this.emit("key",u.toLowerCase()),F?.name==="return"){if(this.opts.validate){const e=this.opts.validate(this.value);e&&(this.error=e instanceof Error?e.message:e,this.state="error",this.rl?.write(this.value));}this.state!=="error"&&(this.state="submit");}k$1([u,F?.name,F?.sequence],"cancel")&&(this.state="cancel"),(this.state==="submit"||this.state==="cancel")&&this.emit("finalize"),this.render(),(this.state==="submit"||this.state==="cancel")&&this.close();}close(){this.input.unpipe(),this.input.removeListener("keypress",this.onKeypress),this.output.write(`
`),d$1(this.input,false),this.rl?.close(),this.rl=void 0,this.emit(`${this.state}`,this.value),this.unsubscribe();}restoreCursor(){const u=G(this._prevFrame,process.stdout.columns,{hard:true}).split(`
`).length-1;this.output.write(srcExports.cursor.move(-999,u*-1));}render(){const u=G(this._render(this)??"",process.stdout.columns,{hard:true});if(u!==this._prevFrame){if(this.state==="initial")this.output.write(srcExports.cursor.hide);else {const F=lD(this._prevFrame,u);if(this.restoreCursor(),F&&F?.length===1){const e=F[0];this.output.write(srcExports.cursor.move(0,e)),this.output.write(srcExports.erase.lines(1));const s=u.split(`
`);this.output.write(s[e]),this._prevFrame=u,this.output.write(srcExports.cursor.move(0,s.length-e-1));return}if(F&&F?.length>1){const e=F[0];this.output.write(srcExports.cursor.move(0,e)),this.output.write(srcExports.erase.down());const s=u.split(`
`).slice(e);this.output.write(s.join(`
`)),this._prevFrame=u;return}this.output.write(srcExports.erase.down());}this.output.write(u),this.state==="initial"&&(this.state="active"),this._prevFrame=u;}}}var SD=Object.defineProperty,$D=(t,u,F)=>u in t?SD(t,u,{enumerable:true,configurable:true,writable:true,value:F}):t[u]=F,q=(t,u,F)=>($D(t,typeof u!="symbol"?u+"":u,F),F);class jD extends x{constructor(u){super(u,false),q(this,"options"),q(this,"cursor",0),this.options=u.options,this.cursor=this.options.findIndex(({value:F})=>F===u.initialValue),this.cursor===-1&&(this.cursor=0),this.changeValue(),this.on("cursor",F=>{switch(F){case "left":case "up":this.cursor=this.cursor===0?this.options.length-1:this.cursor-1;break;case "down":case "right":this.cursor=this.cursor===this.options.length-1?0:this.cursor+1;break}this.changeValue();});}get _value(){return this.options[this.cursor]}changeValue(){this.value=this._value.value;}}class PD extends x{get valueWithCursor(){if(this.state==="submit")return this.value;if(this.cursor>=this.value.length)return `${this.value}\u2588`;const u=this.value.slice(0,this.cursor),[F,...e$1]=this.value.slice(this.cursor);return `${u}${e.inverse(F)}${e$1.join("")}`}get cursor(){return this._cursor}constructor(u){super(u),this.on("finalize",()=>{this.value||(this.value=u.defaultValue);});}}

function ce(){return g.platform!=="win32"?g.env.TERM!=="linux":!!g.env.CI||!!g.env.WT_SESSION||!!g.env.TERMINUS_SUBLIME||g.env.ConEmuTask==="{cmd::Cmder}"||g.env.TERM_PROGRAM==="Terminus-Sublime"||g.env.TERM_PROGRAM==="vscode"||g.env.TERM==="xterm-256color"||g.env.TERM==="alacritty"||g.env.TERMINAL_EMULATOR==="JetBrains-JediTerm"}const V=ce(),u=(t,n)=>V?t:n,le=u("\u25C6","*"),L=u("\u25A0","x"),W=u("\u25B2","x"),C=u("\u25C7","o"),o=u("\u2502","|"),d=u("\u2514","\u2014"),k=u("\u25CF",">"),P=u("\u25CB"," "),w=t=>{switch(t){case "initial":case "active":return e.cyan(le);case "cancel":return e.red(L);case "error":return e.yellow(W);case "submit":return e.green(C)}},B=t=>{const{cursor:n,options:s,style:r}=t,i=t.maxItems??Number.POSITIVE_INFINITY,a=Math.max(process.stdout.rows-4,0),c=Math.min(a,Math.max(i,5));let l=0;n>=l+c-3?l=Math.max(Math.min(n-c+3,s.length-c),0):n<l+2&&(l=Math.max(n-2,0));const $=c<s.length&&l>0,p=c<s.length&&l+c<s.length;return s.slice(l,l+c).map((M,v,x)=>{const j=v===0&&$,E=v===x.length-1&&p;return j||E?e.dim("..."):r(M,v+l===n)})},he=t=>new PD({validate:t.validate,placeholder:t.placeholder,defaultValue:t.defaultValue,initialValue:t.initialValue,render(){const n=`${e.gray(o)}
${w(this.state)}  ${t.message}
`,s=t.placeholder?e.inverse(t.placeholder[0])+e.dim(t.placeholder.slice(1)):e.inverse(e.hidden("_")),r=this.value?this.valueWithCursor:s;switch(this.state){case "error":return `${n.trim()}
${e.yellow(o)}  ${r}
${e.yellow(d)}  ${e.yellow(this.error)}
`;case "submit":return `${n}${e.gray(o)}  ${e.dim(this.value||t.placeholder)}`;case "cancel":return `${n}${e.gray(o)}  ${e.strikethrough(e.dim(this.value??""))}${this.value?.trim()?`
${e.gray(o)}`:""}`;default:return `${n}${e.cyan(o)}  ${r}
${e.cyan(d)}
`}}}).prompt(),ve=t=>{const n=(s,r)=>{const i=s.label??String(s.value);switch(r){case "selected":return `${e.dim(i)}`;case "active":return `${e.green(k)} ${i} ${s.hint?e.dim(`(${s.hint})`):""}`;case "cancelled":return `${e.strikethrough(e.dim(i))}`;default:return `${e.dim(P)} ${e.dim(i)}`}};return new jD({options:t.options,initialValue:t.initialValue,render(){const s=`${e.gray(o)}
${w(this.state)}  ${t.message}
`;switch(this.state){case "submit":return `${s}${e.gray(o)}  ${n(this.options[this.cursor],"selected")}`;case "cancel":return `${s}${e.gray(o)}  ${n(this.options[this.cursor],"cancelled")}
${e.gray(o)}`;default:return `${s}${e.cyan(o)}  ${B({cursor:this.cursor,options:this.options,maxItems:t.maxItems,style:(r,i)=>n(r,i?"active":"inactive")}).join(`
${e.cyan(o)}  `)}
${e.cyan(d)}
`}}}).prompt()},xe=(t="")=>{process.stdout.write(`${e.gray(d)}  ${e.red(t)}

`);};`${e.gray(o)}  `;const Y=({indicator:t="dots"}={})=>{const n=V?["\u25D2","\u25D0","\u25D3","\u25D1"]:["\u2022","o","O","0"],s=V?80:120,r=process.env.CI==="true";let i,a,c=false,l="",$,p=performance.now();const M=m=>{const h=m>1?"Something went wrong":"Canceled";c&&N(h,m);},v=()=>M(2),x=()=>M(1),j=()=>{process.on("uncaughtExceptionMonitor",v),process.on("unhandledRejection",v),process.on("SIGINT",x),process.on("SIGTERM",x),process.on("exit",M);},E=()=>{process.removeListener("uncaughtExceptionMonitor",v),process.removeListener("unhandledRejection",v),process.removeListener("SIGINT",x),process.removeListener("SIGTERM",x),process.removeListener("exit",M);},O=()=>{if($===void 0)return;r&&process.stdout.write(`
`);const m=$.split(`
`);process.stdout.write(srcExports.cursor.move(-999,m.length-1)),process.stdout.write(srcExports.erase.down(m.length));},R=m=>m.replace(/\.+$/,""),G=m=>{const h=(performance.now()-m)/1e3,y=Math.floor(h/60),I=Math.floor(h%60);return y>0?`[${y}m ${I}s]`:`[${I}s]`},H=(m="")=>{c=true,i=cD(),l=R(m),p=performance.now(),process.stdout.write(`${e.gray(o)}
`);let h=0,y=0;j(),a=setInterval(()=>{if(r&&l===$)return;O(),$=l;const I=e.magenta(n[h]);if(r)process.stdout.write(`${I}  ${l}...`);else if(t==="timer")process.stdout.write(`${I}  ${l} ${G(p)}`);else {const z=".".repeat(Math.floor(y)).slice(0,3);process.stdout.write(`${I}  ${l}${z}`);}h=h+1<n.length?h+1:0,y=y<n.length?y+.125:0;},s);},N=(m="",h=0)=>{c=false,clearInterval(a),O();const y=h===0?e.green(C):h===1?e.red(L):e.red(W);l=R(m??l),t==="timer"?process.stdout.write(`${y}  ${l} ${G(p)}
`):process.stdout.write(`${y}  ${l}
`),E(),i();};return {start:H,stop:N,message:(m="")=>{l=R(m??l);}}};

var fs$1 = {};

var universalify = {};

var hasRequiredUniversalify;

function requireUniversalify () {
	if (hasRequiredUniversalify) return universalify;
	hasRequiredUniversalify = 1;

	universalify.fromCallback = function (fn) {
	  return Object.defineProperty(function (...args) {
	    if (typeof args[args.length - 1] === 'function') fn.apply(this, args);
	    else {
	      return new Promise((resolve, reject) => {
	        args.push((err, res) => (err != null) ? reject(err) : resolve(res));
	        fn.apply(this, args);
	      })
	    }
	  }, 'name', { value: fn.name })
	};

	universalify.fromPromise = function (fn) {
	  return Object.defineProperty(function (...args) {
	    const cb = args[args.length - 1];
	    if (typeof cb !== 'function') return fn.apply(this, args)
	    else {
	      args.pop();
	      fn.apply(this, args).then(r => cb(null, r), cb);
	    }
	  }, 'name', { value: fn.name })
	};
	return universalify;
}

var polyfills;
var hasRequiredPolyfills;

function requirePolyfills () {
	if (hasRequiredPolyfills) return polyfills;
	hasRequiredPolyfills = 1;
	var constants = require$$0;

	var origCwd = process.cwd;
	var cwd = null;

	var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;

	process.cwd = function() {
	  if (!cwd)
	    cwd = origCwd.call(process);
	  return cwd
	};
	try {
	  process.cwd();
	} catch (er) {}

	// This check is needed until node.js 12 is required
	if (typeof process.chdir === 'function') {
	  var chdir = process.chdir;
	  process.chdir = function (d) {
	    cwd = null;
	    chdir.call(process, d);
	  };
	  if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
	}

	polyfills = patch;

	function patch (fs) {
	  // (re-)implement some things that are known busted or missing.

	  // lchmod, broken prior to 0.6.2
	  // back-port the fix here.
	  if (constants.hasOwnProperty('O_SYMLINK') &&
	      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
	    patchLchmod(fs);
	  }

	  // lutimes implementation, or no-op
	  if (!fs.lutimes) {
	    patchLutimes(fs);
	  }

	  // https://github.com/isaacs/node-graceful-fs/issues/4
	  // Chown should not fail on einval or eperm if non-root.
	  // It should not fail on enosys ever, as this just indicates
	  // that a fs doesn't support the intended operation.

	  fs.chown = chownFix(fs.chown);
	  fs.fchown = chownFix(fs.fchown);
	  fs.lchown = chownFix(fs.lchown);

	  fs.chmod = chmodFix(fs.chmod);
	  fs.fchmod = chmodFix(fs.fchmod);
	  fs.lchmod = chmodFix(fs.lchmod);

	  fs.chownSync = chownFixSync(fs.chownSync);
	  fs.fchownSync = chownFixSync(fs.fchownSync);
	  fs.lchownSync = chownFixSync(fs.lchownSync);

	  fs.chmodSync = chmodFixSync(fs.chmodSync);
	  fs.fchmodSync = chmodFixSync(fs.fchmodSync);
	  fs.lchmodSync = chmodFixSync(fs.lchmodSync);

	  fs.stat = statFix(fs.stat);
	  fs.fstat = statFix(fs.fstat);
	  fs.lstat = statFix(fs.lstat);

	  fs.statSync = statFixSync(fs.statSync);
	  fs.fstatSync = statFixSync(fs.fstatSync);
	  fs.lstatSync = statFixSync(fs.lstatSync);

	  // if lchmod/lchown do not exist, then make them no-ops
	  if (fs.chmod && !fs.lchmod) {
	    fs.lchmod = function (path, mode, cb) {
	      if (cb) process.nextTick(cb);
	    };
	    fs.lchmodSync = function () {};
	  }
	  if (fs.chown && !fs.lchown) {
	    fs.lchown = function (path, uid, gid, cb) {
	      if (cb) process.nextTick(cb);
	    };
	    fs.lchownSync = function () {};
	  }

	  // on Windows, A/V software can lock the directory, causing this
	  // to fail with an EACCES or EPERM if the directory contains newly
	  // created files.  Try again on failure, for up to 60 seconds.

	  // Set the timeout this long because some Windows Anti-Virus, such as Parity
	  // bit9, may lock files for up to a minute, causing npm package install
	  // failures. Also, take care to yield the scheduler. Windows scheduling gives
	  // CPU to a busy looping process, which can cause the program causing the lock
	  // contention to be starved of CPU by node, so the contention doesn't resolve.
	  if (platform === "win32") {
	    fs.rename = typeof fs.rename !== 'function' ? fs.rename
	    : (function (fs$rename) {
	      function rename (from, to, cb) {
	        var start = Date.now();
	        var backoff = 0;
	        fs$rename(from, to, function CB (er) {
	          if (er
	              && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY")
	              && Date.now() - start < 60000) {
	            setTimeout(function() {
	              fs.stat(to, function (stater, st) {
	                if (stater && stater.code === "ENOENT")
	                  fs$rename(from, to, CB);
	                else
	                  cb(er);
	              });
	            }, backoff);
	            if (backoff < 100)
	              backoff += 10;
	            return;
	          }
	          if (cb) cb(er);
	        });
	      }
	      if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
	      return rename
	    })(fs.rename);
	  }

	  // if read() returns EAGAIN, then just try it again.
	  fs.read = typeof fs.read !== 'function' ? fs.read
	  : (function (fs$read) {
	    function read (fd, buffer, offset, length, position, callback_) {
	      var callback;
	      if (callback_ && typeof callback_ === 'function') {
	        var eagCounter = 0;
	        callback = function (er, _, __) {
	          if (er && er.code === 'EAGAIN' && eagCounter < 10) {
	            eagCounter ++;
	            return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	          }
	          callback_.apply(this, arguments);
	        };
	      }
	      return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	    }

	    // This ensures `util.promisify` works as it does for native `fs.read`.
	    if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
	    return read
	  })(fs.read);

	  fs.readSync = typeof fs.readSync !== 'function' ? fs.readSync
	  : (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
	    var eagCounter = 0;
	    while (true) {
	      try {
	        return fs$readSync.call(fs, fd, buffer, offset, length, position)
	      } catch (er) {
	        if (er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++;
	          continue
	        }
	        throw er
	      }
	    }
	  }})(fs.readSync);

	  function patchLchmod (fs) {
	    fs.lchmod = function (path, mode, callback) {
	      fs.open( path
	             , constants.O_WRONLY | constants.O_SYMLINK
	             , mode
	             , function (err, fd) {
	        if (err) {
	          if (callback) callback(err);
	          return
	        }
	        // prefer to return the chmod error, if one occurs,
	        // but still try to close, and report closing errors if they occur.
	        fs.fchmod(fd, mode, function (err) {
	          fs.close(fd, function(err2) {
	            if (callback) callback(err || err2);
	          });
	        });
	      });
	    };

	    fs.lchmodSync = function (path, mode) {
	      var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);

	      // prefer to return the chmod error, if one occurs,
	      // but still try to close, and report closing errors if they occur.
	      var threw = true;
	      var ret;
	      try {
	        ret = fs.fchmodSync(fd, mode);
	        threw = false;
	      } finally {
	        if (threw) {
	          try {
	            fs.closeSync(fd);
	          } catch (er) {}
	        } else {
	          fs.closeSync(fd);
	        }
	      }
	      return ret
	    };
	  }

	  function patchLutimes (fs) {
	    if (constants.hasOwnProperty("O_SYMLINK") && fs.futimes) {
	      fs.lutimes = function (path, at, mt, cb) {
	        fs.open(path, constants.O_SYMLINK, function (er, fd) {
	          if (er) {
	            if (cb) cb(er);
	            return
	          }
	          fs.futimes(fd, at, mt, function (er) {
	            fs.close(fd, function (er2) {
	              if (cb) cb(er || er2);
	            });
	          });
	        });
	      };

	      fs.lutimesSync = function (path, at, mt) {
	        var fd = fs.openSync(path, constants.O_SYMLINK);
	        var ret;
	        var threw = true;
	        try {
	          ret = fs.futimesSync(fd, at, mt);
	          threw = false;
	        } finally {
	          if (threw) {
	            try {
	              fs.closeSync(fd);
	            } catch (er) {}
	          } else {
	            fs.closeSync(fd);
	          }
	        }
	        return ret
	      };

	    } else if (fs.futimes) {
	      fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb); };
	      fs.lutimesSync = function () {};
	    }
	  }

	  function chmodFix (orig) {
	    if (!orig) return orig
	    return function (target, mode, cb) {
	      return orig.call(fs, target, mode, function (er) {
	        if (chownErOk(er)) er = null;
	        if (cb) cb.apply(this, arguments);
	      })
	    }
	  }

	  function chmodFixSync (orig) {
	    if (!orig) return orig
	    return function (target, mode) {
	      try {
	        return orig.call(fs, target, mode)
	      } catch (er) {
	        if (!chownErOk(er)) throw er
	      }
	    }
	  }


	  function chownFix (orig) {
	    if (!orig) return orig
	    return function (target, uid, gid, cb) {
	      return orig.call(fs, target, uid, gid, function (er) {
	        if (chownErOk(er)) er = null;
	        if (cb) cb.apply(this, arguments);
	      })
	    }
	  }

	  function chownFixSync (orig) {
	    if (!orig) return orig
	    return function (target, uid, gid) {
	      try {
	        return orig.call(fs, target, uid, gid)
	      } catch (er) {
	        if (!chownErOk(er)) throw er
	      }
	    }
	  }

	  function statFix (orig) {
	    if (!orig) return orig
	    // Older versions of Node erroneously returned signed integers for
	    // uid + gid.
	    return function (target, options, cb) {
	      if (typeof options === 'function') {
	        cb = options;
	        options = null;
	      }
	      function callback (er, stats) {
	        if (stats) {
	          if (stats.uid < 0) stats.uid += 0x100000000;
	          if (stats.gid < 0) stats.gid += 0x100000000;
	        }
	        if (cb) cb.apply(this, arguments);
	      }
	      return options ? orig.call(fs, target, options, callback)
	        : orig.call(fs, target, callback)
	    }
	  }

	  function statFixSync (orig) {
	    if (!orig) return orig
	    // Older versions of Node erroneously returned signed integers for
	    // uid + gid.
	    return function (target, options) {
	      var stats = options ? orig.call(fs, target, options)
	        : orig.call(fs, target);
	      if (stats) {
	        if (stats.uid < 0) stats.uid += 0x100000000;
	        if (stats.gid < 0) stats.gid += 0x100000000;
	      }
	      return stats;
	    }
	  }

	  // ENOSYS means that the fs doesn't support the op. Just ignore
	  // that, because it doesn't matter.
	  //
	  // if there's no getuid, or if getuid() is something other
	  // than 0, and the error is EINVAL or EPERM, then just ignore
	  // it.
	  //
	  // This specific case is a silent failure in cp, install, tar,
	  // and most other unix tools that manage permissions.
	  //
	  // When running as root, or if other types of errors are
	  // encountered, then it's strict.
	  function chownErOk (er) {
	    if (!er)
	      return true

	    if (er.code === "ENOSYS")
	      return true

	    var nonroot = !process.getuid || process.getuid() !== 0;
	    if (nonroot) {
	      if (er.code === "EINVAL" || er.code === "EPERM")
	        return true
	    }

	    return false
	  }
	}
	return polyfills;
}

var legacyStreams;
var hasRequiredLegacyStreams;

function requireLegacyStreams () {
	if (hasRequiredLegacyStreams) return legacyStreams;
	hasRequiredLegacyStreams = 1;
	var Stream = require$$0$1.Stream;

	legacyStreams = legacy;

	function legacy (fs) {
	  return {
	    ReadStream: ReadStream,
	    WriteStream: WriteStream
	  }

	  function ReadStream (path, options) {
	    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

	    Stream.call(this);

	    var self = this;

	    this.path = path;
	    this.fd = null;
	    this.readable = true;
	    this.paused = false;

	    this.flags = 'r';
	    this.mode = 438; /*=0666*/
	    this.bufferSize = 64 * 1024;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.encoding) this.setEncoding(this.encoding);

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.end === undefined) {
	        this.end = Infinity;
	      } else if ('number' !== typeof this.end) {
	        throw TypeError('end must be a Number');
	      }

	      if (this.start > this.end) {
	        throw new Error('start must be <= end');
	      }

	      this.pos = this.start;
	    }

	    if (this.fd !== null) {
	      process.nextTick(function() {
	        self._read();
	      });
	      return;
	    }

	    fs.open(this.path, this.flags, this.mode, function (err, fd) {
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	        return;
	      }

	      self.fd = fd;
	      self.emit('open', fd);
	      self._read();
	    });
	  }

	  function WriteStream (path, options) {
	    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

	    Stream.call(this);

	    this.path = path;
	    this.fd = null;
	    this.writable = true;

	    this.flags = 'w';
	    this.encoding = 'binary';
	    this.mode = 438; /*=0666*/
	    this.bytesWritten = 0;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.start < 0) {
	        throw new Error('start must be >= zero');
	      }

	      this.pos = this.start;
	    }

	    this.busy = false;
	    this._queue = [];

	    if (this.fd === null) {
	      this._open = fs.open;
	      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
	      this.flush();
	    }
	  }
	}
	return legacyStreams;
}

var clone_1;
var hasRequiredClone;

function requireClone () {
	if (hasRequiredClone) return clone_1;
	hasRequiredClone = 1;

	clone_1 = clone;

	var getPrototypeOf = Object.getPrototypeOf || function (obj) {
	  return obj.__proto__
	};

	function clone (obj) {
	  if (obj === null || typeof obj !== 'object')
	    return obj

	  if (obj instanceof Object)
	    var copy = { __proto__: getPrototypeOf(obj) };
	  else
	    var copy = Object.create(null);

	  Object.getOwnPropertyNames(obj).forEach(function (key) {
	    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
	  });

	  return copy
	}
	return clone_1;
}

var gracefulFs;
var hasRequiredGracefulFs;

function requireGracefulFs () {
	if (hasRequiredGracefulFs) return gracefulFs;
	hasRequiredGracefulFs = 1;
	var fs = require$$0$2;
	var polyfills = requirePolyfills();
	var legacy = requireLegacyStreams();
	var clone = requireClone();

	var util = require$$4;

	/* istanbul ignore next - node 0.x polyfill */
	var gracefulQueue;
	var previousSymbol;

	/* istanbul ignore else - node 0.x polyfill */
	if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
	  gracefulQueue = Symbol.for('graceful-fs.queue');
	  // This is used in testing by future versions
	  previousSymbol = Symbol.for('graceful-fs.previous');
	} else {
	  gracefulQueue = '___graceful-fs.queue';
	  previousSymbol = '___graceful-fs.previous';
	}

	function noop () {}

	function publishQueue(context, queue) {
	  Object.defineProperty(context, gracefulQueue, {
	    get: function() {
	      return queue
	    }
	  });
	}

	var debug = noop;
	if (util.debuglog)
	  debug = util.debuglog('gfs4');
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
	  debug = function() {
	    var m = util.format.apply(util, arguments);
	    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ');
	    console.error(m);
	  };

	// Once time initialization
	if (!fs[gracefulQueue]) {
	  // This queue can be shared by multiple loaded instances
	  var queue = commonjsGlobal[gracefulQueue] || [];
	  publishQueue(fs, queue);

	  // Patch fs.close/closeSync to shared queue version, because we need
	  // to retry() whenever a close happens *anywhere* in the program.
	  // This is essential when multiple graceful-fs instances are
	  // in play at the same time.
	  fs.close = (function (fs$close) {
	    function close (fd, cb) {
	      return fs$close.call(fs, fd, function (err) {
	        // This function uses the graceful-fs shared queue
	        if (!err) {
	          resetQueue();
	        }

	        if (typeof cb === 'function')
	          cb.apply(this, arguments);
	      })
	    }

	    Object.defineProperty(close, previousSymbol, {
	      value: fs$close
	    });
	    return close
	  })(fs.close);

	  fs.closeSync = (function (fs$closeSync) {
	    function closeSync (fd) {
	      // This function uses the graceful-fs shared queue
	      fs$closeSync.apply(fs, arguments);
	      resetQueue();
	    }

	    Object.defineProperty(closeSync, previousSymbol, {
	      value: fs$closeSync
	    });
	    return closeSync
	  })(fs.closeSync);

	  if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
	    process.on('exit', function() {
	      debug(fs[gracefulQueue]);
	      require$$5.equal(fs[gracefulQueue].length, 0);
	    });
	  }
	}

	if (!commonjsGlobal[gracefulQueue]) {
	  publishQueue(commonjsGlobal, fs[gracefulQueue]);
	}

	gracefulFs = patch(clone(fs));
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
	    gracefulFs = patch(fs);
	    fs.__patched = true;
	}

	function patch (fs) {
	  // Everything that references the open() function needs to be in here
	  polyfills(fs);
	  fs.gracefulify = patch;

	  fs.createReadStream = createReadStream;
	  fs.createWriteStream = createWriteStream;
	  var fs$readFile = fs.readFile;
	  fs.readFile = readFile;
	  function readFile (path, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null;

	    return go$readFile(path, options, cb)

	    function go$readFile (path, options, cb, startTime) {
	      return fs$readFile(path, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$readFile, [path, options, cb], err, startTime || Date.now(), Date.now()]);
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments);
	        }
	      })
	    }
	  }

	  var fs$writeFile = fs.writeFile;
	  fs.writeFile = writeFile;
	  function writeFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null;

	    return go$writeFile(path, data, options, cb)

	    function go$writeFile (path, data, options, cb, startTime) {
	      return fs$writeFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$writeFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()]);
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments);
	        }
	      })
	    }
	  }

	  var fs$appendFile = fs.appendFile;
	  if (fs$appendFile)
	    fs.appendFile = appendFile;
	  function appendFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null;

	    return go$appendFile(path, data, options, cb)

	    function go$appendFile (path, data, options, cb, startTime) {
	      return fs$appendFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$appendFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()]);
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments);
	        }
	      })
	    }
	  }

	  var fs$copyFile = fs.copyFile;
	  if (fs$copyFile)
	    fs.copyFile = copyFile;
	  function copyFile (src, dest, flags, cb) {
	    if (typeof flags === 'function') {
	      cb = flags;
	      flags = 0;
	    }
	    return go$copyFile(src, dest, flags, cb)

	    function go$copyFile (src, dest, flags, cb, startTime) {
	      return fs$copyFile(src, dest, flags, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$copyFile, [src, dest, flags, cb], err, startTime || Date.now(), Date.now()]);
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments);
	        }
	      })
	    }
	  }

	  var fs$readdir = fs.readdir;
	  fs.readdir = readdir;
	  var noReaddirOptionVersions = /^v[0-5]\./;
	  function readdir (path, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null;

	    var go$readdir = noReaddirOptionVersions.test(process.version)
	      ? function go$readdir (path, options, cb, startTime) {
	        return fs$readdir(path, fs$readdirCallback(
	          path, options, cb, startTime
	        ))
	      }
	      : function go$readdir (path, options, cb, startTime) {
	        return fs$readdir(path, options, fs$readdirCallback(
	          path, options, cb, startTime
	        ))
	      };

	    return go$readdir(path, options, cb)

	    function fs$readdirCallback (path, options, cb, startTime) {
	      return function (err, files) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([
	            go$readdir,
	            [path, options, cb],
	            err,
	            startTime || Date.now(),
	            Date.now()
	          ]);
	        else {
	          if (files && files.sort)
	            files.sort();

	          if (typeof cb === 'function')
	            cb.call(this, err, files);
	        }
	      }
	    }
	  }

	  if (process.version.substr(0, 4) === 'v0.8') {
	    var legStreams = legacy(fs);
	    ReadStream = legStreams.ReadStream;
	    WriteStream = legStreams.WriteStream;
	  }

	  var fs$ReadStream = fs.ReadStream;
	  if (fs$ReadStream) {
	    ReadStream.prototype = Object.create(fs$ReadStream.prototype);
	    ReadStream.prototype.open = ReadStream$open;
	  }

	  var fs$WriteStream = fs.WriteStream;
	  if (fs$WriteStream) {
	    WriteStream.prototype = Object.create(fs$WriteStream.prototype);
	    WriteStream.prototype.open = WriteStream$open;
	  }

	  Object.defineProperty(fs, 'ReadStream', {
	    get: function () {
	      return ReadStream
	    },
	    set: function (val) {
	      ReadStream = val;
	    },
	    enumerable: true,
	    configurable: true
	  });
	  Object.defineProperty(fs, 'WriteStream', {
	    get: function () {
	      return WriteStream
	    },
	    set: function (val) {
	      WriteStream = val;
	    },
	    enumerable: true,
	    configurable: true
	  });

	  // legacy names
	  var FileReadStream = ReadStream;
	  Object.defineProperty(fs, 'FileReadStream', {
	    get: function () {
	      return FileReadStream
	    },
	    set: function (val) {
	      FileReadStream = val;
	    },
	    enumerable: true,
	    configurable: true
	  });
	  var FileWriteStream = WriteStream;
	  Object.defineProperty(fs, 'FileWriteStream', {
	    get: function () {
	      return FileWriteStream
	    },
	    set: function (val) {
	      FileWriteStream = val;
	    },
	    enumerable: true,
	    configurable: true
	  });

	  function ReadStream (path, options) {
	    if (this instanceof ReadStream)
	      return fs$ReadStream.apply(this, arguments), this
	    else
	      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
	  }

	  function ReadStream$open () {
	    var that = this;
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        if (that.autoClose)
	          that.destroy();

	        that.emit('error', err);
	      } else {
	        that.fd = fd;
	        that.emit('open', fd);
	        that.read();
	      }
	    });
	  }

	  function WriteStream (path, options) {
	    if (this instanceof WriteStream)
	      return fs$WriteStream.apply(this, arguments), this
	    else
	      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
	  }

	  function WriteStream$open () {
	    var that = this;
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        that.destroy();
	        that.emit('error', err);
	      } else {
	        that.fd = fd;
	        that.emit('open', fd);
	      }
	    });
	  }

	  function createReadStream (path, options) {
	    return new fs.ReadStream(path, options)
	  }

	  function createWriteStream (path, options) {
	    return new fs.WriteStream(path, options)
	  }

	  var fs$open = fs.open;
	  fs.open = open;
	  function open (path, flags, mode, cb) {
	    if (typeof mode === 'function')
	      cb = mode, mode = null;

	    return go$open(path, flags, mode, cb)

	    function go$open (path, flags, mode, cb, startTime) {
	      return fs$open(path, flags, mode, function (err, fd) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$open, [path, flags, mode, cb], err, startTime || Date.now(), Date.now()]);
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments);
	        }
	      })
	    }
	  }

	  return fs
	}

	function enqueue (elem) {
	  debug('ENQUEUE', elem[0].name, elem[1]);
	  fs[gracefulQueue].push(elem);
	  retry();
	}

	// keep track of the timeout between retry() calls
	var retryTimer;

	// reset the startTime and lastTime to now
	// this resets the start of the 60 second overall timeout as well as the
	// delay between attempts so that we'll retry these jobs sooner
	function resetQueue () {
	  var now = Date.now();
	  for (var i = 0; i < fs[gracefulQueue].length; ++i) {
	    // entries that are only a length of 2 are from an older version, don't
	    // bother modifying those since they'll be retried anyway.
	    if (fs[gracefulQueue][i].length > 2) {
	      fs[gracefulQueue][i][3] = now; // startTime
	      fs[gracefulQueue][i][4] = now; // lastTime
	    }
	  }
	  // call retry to make sure we're actively processing the queue
	  retry();
	}

	function retry () {
	  // clear the timer and remove it to help prevent unintended concurrency
	  clearTimeout(retryTimer);
	  retryTimer = undefined;

	  if (fs[gracefulQueue].length === 0)
	    return

	  var elem = fs[gracefulQueue].shift();
	  var fn = elem[0];
	  var args = elem[1];
	  // these items may be unset if they were added by an older graceful-fs
	  var err = elem[2];
	  var startTime = elem[3];
	  var lastTime = elem[4];

	  // if we don't have a startTime we have no way of knowing if we've waited
	  // long enough, so go ahead and retry this item now
	  if (startTime === undefined) {
	    debug('RETRY', fn.name, args);
	    fn.apply(null, args);
	  } else if (Date.now() - startTime >= 60000) {
	    // it's been more than 60 seconds total, bail now
	    debug('TIMEOUT', fn.name, args);
	    var cb = args.pop();
	    if (typeof cb === 'function')
	      cb.call(null, err);
	  } else {
	    // the amount of time between the last attempt and right now
	    var sinceAttempt = Date.now() - lastTime;
	    // the amount of time between when we first tried, and when we last tried
	    // rounded up to at least 1
	    var sinceStart = Math.max(lastTime - startTime, 1);
	    // backoff. wait longer than the total time we've been retrying, but only
	    // up to a maximum of 100ms
	    var desiredDelay = Math.min(sinceStart * 1.2, 100);
	    // it's been long enough since the last retry, do it again
	    if (sinceAttempt >= desiredDelay) {
	      debug('RETRY', fn.name, args);
	      fn.apply(null, args.concat([startTime]));
	    } else {
	      // if we can't do this job yet, push it to the end of the queue
	      // and let the next iteration check again
	      fs[gracefulQueue].push(elem);
	    }
	  }

	  // schedule our next run if one isn't already scheduled
	  if (retryTimer === undefined) {
	    retryTimer = setTimeout(retry, 0);
	  }
	}
	return gracefulFs;
}

var hasRequiredFs;

function requireFs () {
	if (hasRequiredFs) return fs$1;
	hasRequiredFs = 1;
	(function (exports) {
		// This is adapted from https://github.com/normalize/mz
		// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
		const u = requireUniversalify().fromCallback;
		const fs = requireGracefulFs();

		const api = [
		  'access',
		  'appendFile',
		  'chmod',
		  'chown',
		  'close',
		  'copyFile',
		  'cp',
		  'fchmod',
		  'fchown',
		  'fdatasync',
		  'fstat',
		  'fsync',
		  'ftruncate',
		  'futimes',
		  'glob',
		  'lchmod',
		  'lchown',
		  'lutimes',
		  'link',
		  'lstat',
		  'mkdir',
		  'mkdtemp',
		  'open',
		  'opendir',
		  'readdir',
		  'readFile',
		  'readlink',
		  'realpath',
		  'rename',
		  'rm',
		  'rmdir',
		  'stat',
		  'statfs',
		  'symlink',
		  'truncate',
		  'unlink',
		  'utimes',
		  'writeFile'
		].filter(key => {
		  // Some commands are not available on some systems. Ex:
		  // fs.cp was added in Node.js v16.7.0
		  // fs.statfs was added in Node v19.6.0, v18.15.0
		  // fs.glob was added in Node.js v22.0.0
		  // fs.lchown is not available on at least some Linux
		  return typeof fs[key] === 'function'
		});

		// Export cloned fs:
		Object.assign(exports, fs);

		// Universalify async methods:
		api.forEach(method => {
		  exports[method] = u(fs[method]);
		});

		// We differ from mz/fs in that we still ship the old, broken, fs.exists()
		// since we are a drop-in replacement for the native module
		exports.exists = function (filename, callback) {
		  if (typeof callback === 'function') {
		    return fs.exists(filename, callback)
		  }
		  return new Promise(resolve => {
		    return fs.exists(filename, resolve)
		  })
		};

		// fs.read(), fs.write(), fs.readv(), & fs.writev() need special treatment due to multiple callback args

		exports.read = function (fd, buffer, offset, length, position, callback) {
		  if (typeof callback === 'function') {
		    return fs.read(fd, buffer, offset, length, position, callback)
		  }
		  return new Promise((resolve, reject) => {
		    fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
		      if (err) return reject(err)
		      resolve({ bytesRead, buffer });
		    });
		  })
		};

		// Function signature can be
		// fs.write(fd, buffer[, offset[, length[, position]]], callback)
		// OR
		// fs.write(fd, string[, position[, encoding]], callback)
		// We need to handle both cases, so we use ...args
		exports.write = function (fd, buffer, ...args) {
		  if (typeof args[args.length - 1] === 'function') {
		    return fs.write(fd, buffer, ...args)
		  }

		  return new Promise((resolve, reject) => {
		    fs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
		      if (err) return reject(err)
		      resolve({ bytesWritten, buffer });
		    });
		  })
		};

		// Function signature is
		// s.readv(fd, buffers[, position], callback)
		// We need to handle the optional arg, so we use ...args
		exports.readv = function (fd, buffers, ...args) {
		  if (typeof args[args.length - 1] === 'function') {
		    return fs.readv(fd, buffers, ...args)
		  }

		  return new Promise((resolve, reject) => {
		    fs.readv(fd, buffers, ...args, (err, bytesRead, buffers) => {
		      if (err) return reject(err)
		      resolve({ bytesRead, buffers });
		    });
		  })
		};

		// Function signature is
		// s.writev(fd, buffers[, position], callback)
		// We need to handle the optional arg, so we use ...args
		exports.writev = function (fd, buffers, ...args) {
		  if (typeof args[args.length - 1] === 'function') {
		    return fs.writev(fd, buffers, ...args)
		  }

		  return new Promise((resolve, reject) => {
		    fs.writev(fd, buffers, ...args, (err, bytesWritten, buffers) => {
		      if (err) return reject(err)
		      resolve({ bytesWritten, buffers });
		    });
		  })
		};

		// fs.realpath.native sometimes not available if fs is monkey-patched
		if (typeof fs.realpath.native === 'function') {
		  exports.realpath.native = u(fs.realpath.native);
		} else {
		  process.emitWarning(
		    'fs.realpath.native is not a function. Is fs being monkey-patched?',
		    'Warning', 'fs-extra-WARN0003'
		  );
		} 
	} (fs$1));
	return fs$1;
}

var makeDir = {};

var utils$1 = {};

var hasRequiredUtils$1;

function requireUtils$1 () {
	if (hasRequiredUtils$1) return utils$1;
	hasRequiredUtils$1 = 1;
	const path = require$$1;

	// https://github.com/nodejs/node/issues/8987
	// https://github.com/libuv/libuv/pull/1088
	utils$1.checkPath = function checkPath (pth) {
	  if (process.platform === 'win32') {
	    const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path.parse(pth).root, ''));

	    if (pathHasInvalidWinCharacters) {
	      const error = new Error(`Path contains invalid characters: ${pth}`);
	      error.code = 'EINVAL';
	      throw error
	    }
	  }
	};
	return utils$1;
}

var hasRequiredMakeDir;

function requireMakeDir () {
	if (hasRequiredMakeDir) return makeDir;
	hasRequiredMakeDir = 1;
	const fs = /*@__PURE__*/ requireFs();
	const { checkPath } = /*@__PURE__*/ requireUtils$1();

	const getMode = options => {
	  const defaults = { mode: 0o777 };
	  if (typeof options === 'number') return options
	  return ({ ...defaults, ...options }).mode
	};

	makeDir.makeDir = async (dir, options) => {
	  checkPath(dir);

	  return fs.mkdir(dir, {
	    mode: getMode(options),
	    recursive: true
	  })
	};

	makeDir.makeDirSync = (dir, options) => {
	  checkPath(dir);

	  return fs.mkdirSync(dir, {
	    mode: getMode(options),
	    recursive: true
	  })
	};
	return makeDir;
}

var mkdirs;
var hasRequiredMkdirs;

function requireMkdirs () {
	if (hasRequiredMkdirs) return mkdirs;
	hasRequiredMkdirs = 1;
	const u = requireUniversalify().fromPromise;
	const { makeDir: _makeDir, makeDirSync } = /*@__PURE__*/ requireMakeDir();
	const makeDir = u(_makeDir);

	mkdirs = {
	  mkdirs: makeDir,
	  mkdirsSync: makeDirSync,
	  // alias
	  mkdirp: makeDir,
	  mkdirpSync: makeDirSync,
	  ensureDir: makeDir,
	  ensureDirSync: makeDirSync
	};
	return mkdirs;
}

var pathExists_1;
var hasRequiredPathExists;

function requirePathExists () {
	if (hasRequiredPathExists) return pathExists_1;
	hasRequiredPathExists = 1;
	const u = requireUniversalify().fromPromise;
	const fs = /*@__PURE__*/ requireFs();

	function pathExists (path) {
	  return fs.access(path).then(() => true).catch(() => false)
	}

	pathExists_1 = {
	  pathExists: u(pathExists),
	  pathExistsSync: fs.existsSync
	};
	return pathExists_1;
}

var utimes;
var hasRequiredUtimes;

function requireUtimes () {
	if (hasRequiredUtimes) return utimes;
	hasRequiredUtimes = 1;

	const fs = /*@__PURE__*/ requireFs();
	const u = requireUniversalify().fromPromise;

	async function utimesMillis (path, atime, mtime) {
	  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
	  const fd = await fs.open(path, 'r+');

	  let closeErr = null;

	  try {
	    await fs.futimes(fd, atime, mtime);
	  } finally {
	    try {
	      await fs.close(fd);
	    } catch (e) {
	      closeErr = e;
	    }
	  }

	  if (closeErr) {
	    throw closeErr
	  }
	}

	function utimesMillisSync (path, atime, mtime) {
	  const fd = fs.openSync(path, 'r+');
	  fs.futimesSync(fd, atime, mtime);
	  return fs.closeSync(fd)
	}

	utimes = {
	  utimesMillis: u(utimesMillis),
	  utimesMillisSync
	};
	return utimes;
}

var stat;
var hasRequiredStat;

function requireStat () {
	if (hasRequiredStat) return stat;
	hasRequiredStat = 1;

	const fs = /*@__PURE__*/ requireFs();
	const path = require$$1;
	const u = requireUniversalify().fromPromise;

	function getStats (src, dest, opts) {
	  const statFunc = opts.dereference
	    ? (file) => fs.stat(file, { bigint: true })
	    : (file) => fs.lstat(file, { bigint: true });
	  return Promise.all([
	    statFunc(src),
	    statFunc(dest).catch(err => {
	      if (err.code === 'ENOENT') return null
	      throw err
	    })
	  ]).then(([srcStat, destStat]) => ({ srcStat, destStat }))
	}

	function getStatsSync (src, dest, opts) {
	  let destStat;
	  const statFunc = opts.dereference
	    ? (file) => fs.statSync(file, { bigint: true })
	    : (file) => fs.lstatSync(file, { bigint: true });
	  const srcStat = statFunc(src);
	  try {
	    destStat = statFunc(dest);
	  } catch (err) {
	    if (err.code === 'ENOENT') return { srcStat, destStat: null }
	    throw err
	  }
	  return { srcStat, destStat }
	}

	async function checkPaths (src, dest, funcName, opts) {
	  const { srcStat, destStat } = await getStats(src, dest, opts);
	  if (destStat) {
	    if (areIdentical(srcStat, destStat)) {
	      const srcBaseName = path.basename(src);
	      const destBaseName = path.basename(dest);
	      if (funcName === 'move' &&
	        srcBaseName !== destBaseName &&
	        srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
	        return { srcStat, destStat, isChangingCase: true }
	      }
	      throw new Error('Source and destination must not be the same.')
	    }
	    if (srcStat.isDirectory() && !destStat.isDirectory()) {
	      throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
	    }
	    if (!srcStat.isDirectory() && destStat.isDirectory()) {
	      throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`)
	    }
	  }

	  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
	    throw new Error(errMsg(src, dest, funcName))
	  }

	  return { srcStat, destStat }
	}

	function checkPathsSync (src, dest, funcName, opts) {
	  const { srcStat, destStat } = getStatsSync(src, dest, opts);

	  if (destStat) {
	    if (areIdentical(srcStat, destStat)) {
	      const srcBaseName = path.basename(src);
	      const destBaseName = path.basename(dest);
	      if (funcName === 'move' &&
	        srcBaseName !== destBaseName &&
	        srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
	        return { srcStat, destStat, isChangingCase: true }
	      }
	      throw new Error('Source and destination must not be the same.')
	    }
	    if (srcStat.isDirectory() && !destStat.isDirectory()) {
	      throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
	    }
	    if (!srcStat.isDirectory() && destStat.isDirectory()) {
	      throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`)
	    }
	  }

	  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
	    throw new Error(errMsg(src, dest, funcName))
	  }
	  return { srcStat, destStat }
	}

	// recursively check if dest parent is a subdirectory of src.
	// It works for all file types including symlinks since it
	// checks the src and dest inodes. It starts from the deepest
	// parent and stops once it reaches the src parent or the root path.
	async function checkParentPaths (src, srcStat, dest, funcName) {
	  const srcParent = path.resolve(path.dirname(src));
	  const destParent = path.resolve(path.dirname(dest));
	  if (destParent === srcParent || destParent === path.parse(destParent).root) return

	  let destStat;
	  try {
	    destStat = await fs.stat(destParent, { bigint: true });
	  } catch (err) {
	    if (err.code === 'ENOENT') return
	    throw err
	  }

	  if (areIdentical(srcStat, destStat)) {
	    throw new Error(errMsg(src, dest, funcName))
	  }

	  return checkParentPaths(src, srcStat, destParent, funcName)
	}

	function checkParentPathsSync (src, srcStat, dest, funcName) {
	  const srcParent = path.resolve(path.dirname(src));
	  const destParent = path.resolve(path.dirname(dest));
	  if (destParent === srcParent || destParent === path.parse(destParent).root) return
	  let destStat;
	  try {
	    destStat = fs.statSync(destParent, { bigint: true });
	  } catch (err) {
	    if (err.code === 'ENOENT') return
	    throw err
	  }
	  if (areIdentical(srcStat, destStat)) {
	    throw new Error(errMsg(src, dest, funcName))
	  }
	  return checkParentPathsSync(src, srcStat, destParent, funcName)
	}

	function areIdentical (srcStat, destStat) {
	  return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev
	}

	// return true if dest is a subdir of src, otherwise false.
	// It only checks the path strings.
	function isSrcSubdir (src, dest) {
	  const srcArr = path.resolve(src).split(path.sep).filter(i => i);
	  const destArr = path.resolve(dest).split(path.sep).filter(i => i);
	  return srcArr.every((cur, i) => destArr[i] === cur)
	}

	function errMsg (src, dest, funcName) {
	  return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`
	}

	stat = {
	  // checkPaths
	  checkPaths: u(checkPaths),
	  checkPathsSync,
	  // checkParent
	  checkParentPaths: u(checkParentPaths),
	  checkParentPathsSync,
	  // Misc
	  isSrcSubdir,
	  areIdentical
	};
	return stat;
}

var copy_1;
var hasRequiredCopy$1;

function requireCopy$1 () {
	if (hasRequiredCopy$1) return copy_1;
	hasRequiredCopy$1 = 1;

	const fs = /*@__PURE__*/ requireFs();
	const path = require$$1;
	const { mkdirs } = /*@__PURE__*/ requireMkdirs();
	const { pathExists } = /*@__PURE__*/ requirePathExists();
	const { utimesMillis } = /*@__PURE__*/ requireUtimes();
	const stat = /*@__PURE__*/ requireStat();

	async function copy (src, dest, opts = {}) {
	  if (typeof opts === 'function') {
	    opts = { filter: opts };
	  }

	  opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
	  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

	  // Warn about using preserveTimestamps on 32-bit node
	  if (opts.preserveTimestamps && process.arch === 'ia32') {
	    process.emitWarning(
	      'Using the preserveTimestamps option in 32-bit node is not recommended;\n\n' +
	      '\tsee https://github.com/jprichardson/node-fs-extra/issues/269',
	      'Warning', 'fs-extra-WARN0001'
	    );
	  }

	  const { srcStat, destStat } = await stat.checkPaths(src, dest, 'copy', opts);

	  await stat.checkParentPaths(src, srcStat, dest, 'copy');

	  const include = await runFilter(src, dest, opts);

	  if (!include) return

	  // check if the parent of dest exists, and create it if it doesn't exist
	  const destParent = path.dirname(dest);
	  const dirExists = await pathExists(destParent);
	  if (!dirExists) {
	    await mkdirs(destParent);
	  }

	  await getStatsAndPerformCopy(destStat, src, dest, opts);
	}

	async function runFilter (src, dest, opts) {
	  if (!opts.filter) return true
	  return opts.filter(src, dest)
	}

	async function getStatsAndPerformCopy (destStat, src, dest, opts) {
	  const statFn = opts.dereference ? fs.stat : fs.lstat;
	  const srcStat = await statFn(src);

	  if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts)

	  if (
	    srcStat.isFile() ||
	    srcStat.isCharacterDevice() ||
	    srcStat.isBlockDevice()
	  ) return onFile(srcStat, destStat, src, dest, opts)

	  if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts)
	  if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`)
	  if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`)
	  throw new Error(`Unknown file: ${src}`)
	}

	async function onFile (srcStat, destStat, src, dest, opts) {
	  if (!destStat) return copyFile(srcStat, src, dest, opts)

	  if (opts.overwrite) {
	    await fs.unlink(dest);
	    return copyFile(srcStat, src, dest, opts)
	  }
	  if (opts.errorOnExist) {
	    throw new Error(`'${dest}' already exists`)
	  }
	}

	async function copyFile (srcStat, src, dest, opts) {
	  await fs.copyFile(src, dest);
	  if (opts.preserveTimestamps) {
	    // Make sure the file is writable before setting the timestamp
	    // otherwise open fails with EPERM when invoked with 'r+'
	    // (through utimes call)
	    if (fileIsNotWritable(srcStat.mode)) {
	      await makeFileWritable(dest, srcStat.mode);
	    }

	    // Set timestamps and mode correspondingly

	    // Note that The initial srcStat.atime cannot be trusted
	    // because it is modified by the read(2) system call
	    // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
	    const updatedSrcStat = await fs.stat(src);
	    await utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
	  }

	  return fs.chmod(dest, srcStat.mode)
	}

	function fileIsNotWritable (srcMode) {
	  return (srcMode & 0o200) === 0
	}

	function makeFileWritable (dest, srcMode) {
	  return fs.chmod(dest, srcMode | 0o200)
	}

	async function onDir (srcStat, destStat, src, dest, opts) {
	  // the dest directory might not exist, create it
	  if (!destStat) {
	    await fs.mkdir(dest);
	  }

	  const promises = [];

	  // loop through the files in the current directory to copy everything
	  for await (const item of await fs.opendir(src)) {
	    const srcItem = path.join(src, item.name);
	    const destItem = path.join(dest, item.name);

	    promises.push(
	      runFilter(srcItem, destItem, opts).then(include => {
	        if (include) {
	          // only copy the item if it matches the filter function
	          return stat.checkPaths(srcItem, destItem, 'copy', opts).then(({ destStat }) => {
	            // If the item is a copyable file, `getStatsAndPerformCopy` will copy it
	            // If the item is a directory, `getStatsAndPerformCopy` will call `onDir` recursively
	            return getStatsAndPerformCopy(destStat, srcItem, destItem, opts)
	          })
	        }
	      })
	    );
	  }

	  await Promise.all(promises);

	  if (!destStat) {
	    await fs.chmod(dest, srcStat.mode);
	  }
	}

	async function onLink (destStat, src, dest, opts) {
	  let resolvedSrc = await fs.readlink(src);
	  if (opts.dereference) {
	    resolvedSrc = path.resolve(process.cwd(), resolvedSrc);
	  }
	  if (!destStat) {
	    return fs.symlink(resolvedSrc, dest)
	  }

	  let resolvedDest = null;
	  try {
	    resolvedDest = await fs.readlink(dest);
	  } catch (e) {
	    // dest exists and is a regular file or directory,
	    // Windows may throw UNKNOWN error. If dest already exists,
	    // fs throws error anyway, so no need to guard against it here.
	    if (e.code === 'EINVAL' || e.code === 'UNKNOWN') return fs.symlink(resolvedSrc, dest)
	    throw e
	  }
	  if (opts.dereference) {
	    resolvedDest = path.resolve(process.cwd(), resolvedDest);
	  }
	  if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
	    throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
	  }

	  // do not copy if src is a subdir of dest since unlinking
	  // dest in this case would result in removing src contents
	  // and therefore a broken symlink would be created.
	  if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
	    throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
	  }

	  // copy the link
	  await fs.unlink(dest);
	  return fs.symlink(resolvedSrc, dest)
	}

	copy_1 = copy;
	return copy_1;
}

var copySync_1;
var hasRequiredCopySync;

function requireCopySync () {
	if (hasRequiredCopySync) return copySync_1;
	hasRequiredCopySync = 1;

	const fs = requireGracefulFs();
	const path = require$$1;
	const mkdirsSync = /*@__PURE__*/ requireMkdirs().mkdirsSync;
	const utimesMillisSync = /*@__PURE__*/ requireUtimes().utimesMillisSync;
	const stat = /*@__PURE__*/ requireStat();

	function copySync (src, dest, opts) {
	  if (typeof opts === 'function') {
	    opts = { filter: opts };
	  }

	  opts = opts || {};
	  opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
	  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

	  // Warn about using preserveTimestamps on 32-bit node
	  if (opts.preserveTimestamps && process.arch === 'ia32') {
	    process.emitWarning(
	      'Using the preserveTimestamps option in 32-bit node is not recommended;\n\n' +
	      '\tsee https://github.com/jprichardson/node-fs-extra/issues/269',
	      'Warning', 'fs-extra-WARN0002'
	    );
	  }

	  const { srcStat, destStat } = stat.checkPathsSync(src, dest, 'copy', opts);
	  stat.checkParentPathsSync(src, srcStat, dest, 'copy');
	  if (opts.filter && !opts.filter(src, dest)) return
	  const destParent = path.dirname(dest);
	  if (!fs.existsSync(destParent)) mkdirsSync(destParent);
	  return getStats(destStat, src, dest, opts)
	}

	function getStats (destStat, src, dest, opts) {
	  const statSync = opts.dereference ? fs.statSync : fs.lstatSync;
	  const srcStat = statSync(src);

	  if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts)
	  else if (srcStat.isFile() ||
	           srcStat.isCharacterDevice() ||
	           srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts)
	  else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts)
	  else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`)
	  else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`)
	  throw new Error(`Unknown file: ${src}`)
	}

	function onFile (srcStat, destStat, src, dest, opts) {
	  if (!destStat) return copyFile(srcStat, src, dest, opts)
	  return mayCopyFile(srcStat, src, dest, opts)
	}

	function mayCopyFile (srcStat, src, dest, opts) {
	  if (opts.overwrite) {
	    fs.unlinkSync(dest);
	    return copyFile(srcStat, src, dest, opts)
	  } else if (opts.errorOnExist) {
	    throw new Error(`'${dest}' already exists`)
	  }
	}

	function copyFile (srcStat, src, dest, opts) {
	  fs.copyFileSync(src, dest);
	  if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
	  return setDestMode(dest, srcStat.mode)
	}

	function handleTimestamps (srcMode, src, dest) {
	  // Make sure the file is writable before setting the timestamp
	  // otherwise open fails with EPERM when invoked with 'r+'
	  // (through utimes call)
	  if (fileIsNotWritable(srcMode)) makeFileWritable(dest, srcMode);
	  return setDestTimestamps(src, dest)
	}

	function fileIsNotWritable (srcMode) {
	  return (srcMode & 0o200) === 0
	}

	function makeFileWritable (dest, srcMode) {
	  return setDestMode(dest, srcMode | 0o200)
	}

	function setDestMode (dest, srcMode) {
	  return fs.chmodSync(dest, srcMode)
	}

	function setDestTimestamps (src, dest) {
	  // The initial srcStat.atime cannot be trusted
	  // because it is modified by the read(2) system call
	  // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
	  const updatedSrcStat = fs.statSync(src);
	  return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime)
	}

	function onDir (srcStat, destStat, src, dest, opts) {
	  if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts)
	  return copyDir(src, dest, opts)
	}

	function mkDirAndCopy (srcMode, src, dest, opts) {
	  fs.mkdirSync(dest);
	  copyDir(src, dest, opts);
	  return setDestMode(dest, srcMode)
	}

	function copyDir (src, dest, opts) {
	  const dir = fs.opendirSync(src);

	  try {
	    let dirent;

	    while ((dirent = dir.readSync()) !== null) {
	      copyDirItem(dirent.name, src, dest, opts);
	    }
	  } finally {
	    dir.closeSync();
	  }
	}

	function copyDirItem (item, src, dest, opts) {
	  const srcItem = path.join(src, item);
	  const destItem = path.join(dest, item);
	  if (opts.filter && !opts.filter(srcItem, destItem)) return
	  const { destStat } = stat.checkPathsSync(srcItem, destItem, 'copy', opts);
	  return getStats(destStat, srcItem, destItem, opts)
	}

	function onLink (destStat, src, dest, opts) {
	  let resolvedSrc = fs.readlinkSync(src);
	  if (opts.dereference) {
	    resolvedSrc = path.resolve(process.cwd(), resolvedSrc);
	  }

	  if (!destStat) {
	    return fs.symlinkSync(resolvedSrc, dest)
	  } else {
	    let resolvedDest;
	    try {
	      resolvedDest = fs.readlinkSync(dest);
	    } catch (err) {
	      // dest exists and is a regular file or directory,
	      // Windows may throw UNKNOWN error. If dest already exists,
	      // fs throws error anyway, so no need to guard against it here.
	      if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlinkSync(resolvedSrc, dest)
	      throw err
	    }
	    if (opts.dereference) {
	      resolvedDest = path.resolve(process.cwd(), resolvedDest);
	    }
	    if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
	      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
	    }

	    // prevent copy if src is a subdir of dest since unlinking
	    // dest in this case would result in removing src contents
	    // and therefore a broken symlink would be created.
	    if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
	      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
	    }
	    return copyLink(resolvedSrc, dest)
	  }
	}

	function copyLink (resolvedSrc, dest) {
	  fs.unlinkSync(dest);
	  return fs.symlinkSync(resolvedSrc, dest)
	}

	copySync_1 = copySync;
	return copySync_1;
}

var copy;
var hasRequiredCopy;

function requireCopy () {
	if (hasRequiredCopy) return copy;
	hasRequiredCopy = 1;

	const u = requireUniversalify().fromPromise;
	copy = {
	  copy: u(/*@__PURE__*/ requireCopy$1()),
	  copySync: /*@__PURE__*/ requireCopySync()
	};
	return copy;
}

var remove_1;
var hasRequiredRemove;

function requireRemove () {
	if (hasRequiredRemove) return remove_1;
	hasRequiredRemove = 1;

	const fs = requireGracefulFs();
	const u = requireUniversalify().fromCallback;

	function remove (path, callback) {
	  fs.rm(path, { recursive: true, force: true }, callback);
	}

	function removeSync (path) {
	  fs.rmSync(path, { recursive: true, force: true });
	}

	remove_1 = {
	  remove: u(remove),
	  removeSync
	};
	return remove_1;
}

var empty;
var hasRequiredEmpty;

function requireEmpty () {
	if (hasRequiredEmpty) return empty;
	hasRequiredEmpty = 1;

	const u = requireUniversalify().fromPromise;
	const fs = /*@__PURE__*/ requireFs();
	const path = require$$1;
	const mkdir = /*@__PURE__*/ requireMkdirs();
	const remove = /*@__PURE__*/ requireRemove();

	const emptyDir = u(async function emptyDir (dir) {
	  let items;
	  try {
	    items = await fs.readdir(dir);
	  } catch {
	    return mkdir.mkdirs(dir)
	  }

	  return Promise.all(items.map(item => remove.remove(path.join(dir, item))))
	});

	function emptyDirSync (dir) {
	  let items;
	  try {
	    items = fs.readdirSync(dir);
	  } catch {
	    return mkdir.mkdirsSync(dir)
	  }

	  items.forEach(item => {
	    item = path.join(dir, item);
	    remove.removeSync(item);
	  });
	}

	empty = {
	  emptyDirSync,
	  emptydirSync: emptyDirSync,
	  emptyDir,
	  emptydir: emptyDir
	};
	return empty;
}

var file;
var hasRequiredFile;

function requireFile () {
	if (hasRequiredFile) return file;
	hasRequiredFile = 1;

	const u = requireUniversalify().fromPromise;
	const path = require$$1;
	const fs = /*@__PURE__*/ requireFs();
	const mkdir = /*@__PURE__*/ requireMkdirs();

	async function createFile (file) {
	  let stats;
	  try {
	    stats = await fs.stat(file);
	  } catch { }
	  if (stats && stats.isFile()) return

	  const dir = path.dirname(file);

	  let dirStats = null;
	  try {
	    dirStats = await fs.stat(dir);
	  } catch (err) {
	    // if the directory doesn't exist, make it
	    if (err.code === 'ENOENT') {
	      await mkdir.mkdirs(dir);
	      await fs.writeFile(file, '');
	      return
	    } else {
	      throw err
	    }
	  }

	  if (dirStats.isDirectory()) {
	    await fs.writeFile(file, '');
	  } else {
	    // parent is not a directory
	    // This is just to cause an internal ENOTDIR error to be thrown
	    await fs.readdir(dir);
	  }
	}

	function createFileSync (file) {
	  let stats;
	  try {
	    stats = fs.statSync(file);
	  } catch { }
	  if (stats && stats.isFile()) return

	  const dir = path.dirname(file);
	  try {
	    if (!fs.statSync(dir).isDirectory()) {
	      // parent is not a directory
	      // This is just to cause an internal ENOTDIR error to be thrown
	      fs.readdirSync(dir);
	    }
	  } catch (err) {
	    // If the stat call above failed because the directory doesn't exist, create it
	    if (err && err.code === 'ENOENT') mkdir.mkdirsSync(dir);
	    else throw err
	  }

	  fs.writeFileSync(file, '');
	}

	file = {
	  createFile: u(createFile),
	  createFileSync
	};
	return file;
}

var link;
var hasRequiredLink;

function requireLink () {
	if (hasRequiredLink) return link;
	hasRequiredLink = 1;

	const u = requireUniversalify().fromPromise;
	const path = require$$1;
	const fs = /*@__PURE__*/ requireFs();
	const mkdir = /*@__PURE__*/ requireMkdirs();
	const { pathExists } = /*@__PURE__*/ requirePathExists();
	const { areIdentical } = /*@__PURE__*/ requireStat();

	async function createLink (srcpath, dstpath) {
	  let dstStat;
	  try {
	    dstStat = await fs.lstat(dstpath);
	  } catch {
	    // ignore error
	  }

	  let srcStat;
	  try {
	    srcStat = await fs.lstat(srcpath);
	  } catch (err) {
	    err.message = err.message.replace('lstat', 'ensureLink');
	    throw err
	  }

	  if (dstStat && areIdentical(srcStat, dstStat)) return

	  const dir = path.dirname(dstpath);

	  const dirExists = await pathExists(dir);

	  if (!dirExists) {
	    await mkdir.mkdirs(dir);
	  }

	  await fs.link(srcpath, dstpath);
	}

	function createLinkSync (srcpath, dstpath) {
	  let dstStat;
	  try {
	    dstStat = fs.lstatSync(dstpath);
	  } catch {}

	  try {
	    const srcStat = fs.lstatSync(srcpath);
	    if (dstStat && areIdentical(srcStat, dstStat)) return
	  } catch (err) {
	    err.message = err.message.replace('lstat', 'ensureLink');
	    throw err
	  }

	  const dir = path.dirname(dstpath);
	  const dirExists = fs.existsSync(dir);
	  if (dirExists) return fs.linkSync(srcpath, dstpath)
	  mkdir.mkdirsSync(dir);

	  return fs.linkSync(srcpath, dstpath)
	}

	link = {
	  createLink: u(createLink),
	  createLinkSync
	};
	return link;
}

var symlinkPaths_1;
var hasRequiredSymlinkPaths;

function requireSymlinkPaths () {
	if (hasRequiredSymlinkPaths) return symlinkPaths_1;
	hasRequiredSymlinkPaths = 1;

	const path = require$$1;
	const fs = /*@__PURE__*/ requireFs();
	const { pathExists } = /*@__PURE__*/ requirePathExists();

	const u = requireUniversalify().fromPromise;

	/**
	 * Function that returns two types of paths, one relative to symlink, and one
	 * relative to the current working directory. Checks if path is absolute or
	 * relative. If the path is relative, this function checks if the path is
	 * relative to symlink or relative to current working directory. This is an
	 * initiative to find a smarter `srcpath` to supply when building symlinks.
	 * This allows you to determine which path to use out of one of three possible
	 * types of source paths. The first is an absolute path. This is detected by
	 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
	 * see if it exists. If it does it's used, if not an error is returned
	 * (callback)/ thrown (sync). The other two options for `srcpath` are a
	 * relative url. By default Node's `fs.symlink` works by creating a symlink
	 * using `dstpath` and expects the `srcpath` to be relative to the newly
	 * created symlink. If you provide a `srcpath` that does not exist on the file
	 * system it results in a broken symlink. To minimize this, the function
	 * checks to see if the 'relative to symlink' source file exists, and if it
	 * does it will use it. If it does not, it checks if there's a file that
	 * exists that is relative to the current working directory, if does its used.
	 * This preserves the expectations of the original fs.symlink spec and adds
	 * the ability to pass in `relative to current working direcotry` paths.
	 */

	async function symlinkPaths (srcpath, dstpath) {
	  if (path.isAbsolute(srcpath)) {
	    try {
	      await fs.lstat(srcpath);
	    } catch (err) {
	      err.message = err.message.replace('lstat', 'ensureSymlink');
	      throw err
	    }

	    return {
	      toCwd: srcpath,
	      toDst: srcpath
	    }
	  }

	  const dstdir = path.dirname(dstpath);
	  const relativeToDst = path.join(dstdir, srcpath);

	  const exists = await pathExists(relativeToDst);
	  if (exists) {
	    return {
	      toCwd: relativeToDst,
	      toDst: srcpath
	    }
	  }

	  try {
	    await fs.lstat(srcpath);
	  } catch (err) {
	    err.message = err.message.replace('lstat', 'ensureSymlink');
	    throw err
	  }

	  return {
	    toCwd: srcpath,
	    toDst: path.relative(dstdir, srcpath)
	  }
	}

	function symlinkPathsSync (srcpath, dstpath) {
	  if (path.isAbsolute(srcpath)) {
	    const exists = fs.existsSync(srcpath);
	    if (!exists) throw new Error('absolute srcpath does not exist')
	    return {
	      toCwd: srcpath,
	      toDst: srcpath
	    }
	  }

	  const dstdir = path.dirname(dstpath);
	  const relativeToDst = path.join(dstdir, srcpath);
	  const exists = fs.existsSync(relativeToDst);
	  if (exists) {
	    return {
	      toCwd: relativeToDst,
	      toDst: srcpath
	    }
	  }

	  const srcExists = fs.existsSync(srcpath);
	  if (!srcExists) throw new Error('relative srcpath does not exist')
	  return {
	    toCwd: srcpath,
	    toDst: path.relative(dstdir, srcpath)
	  }
	}

	symlinkPaths_1 = {
	  symlinkPaths: u(symlinkPaths),
	  symlinkPathsSync
	};
	return symlinkPaths_1;
}

var symlinkType_1;
var hasRequiredSymlinkType;

function requireSymlinkType () {
	if (hasRequiredSymlinkType) return symlinkType_1;
	hasRequiredSymlinkType = 1;

	const fs = /*@__PURE__*/ requireFs();
	const u = requireUniversalify().fromPromise;

	async function symlinkType (srcpath, type) {
	  if (type) return type

	  let stats;
	  try {
	    stats = await fs.lstat(srcpath);
	  } catch {
	    return 'file'
	  }

	  return (stats && stats.isDirectory()) ? 'dir' : 'file'
	}

	function symlinkTypeSync (srcpath, type) {
	  if (type) return type

	  let stats;
	  try {
	    stats = fs.lstatSync(srcpath);
	  } catch {
	    return 'file'
	  }
	  return (stats && stats.isDirectory()) ? 'dir' : 'file'
	}

	symlinkType_1 = {
	  symlinkType: u(symlinkType),
	  symlinkTypeSync
	};
	return symlinkType_1;
}

var symlink;
var hasRequiredSymlink;

function requireSymlink () {
	if (hasRequiredSymlink) return symlink;
	hasRequiredSymlink = 1;

	const u = requireUniversalify().fromPromise;
	const path = require$$1;
	const fs = /*@__PURE__*/ requireFs();

	const { mkdirs, mkdirsSync } = /*@__PURE__*/ requireMkdirs();

	const { symlinkPaths, symlinkPathsSync } = /*@__PURE__*/ requireSymlinkPaths();
	const { symlinkType, symlinkTypeSync } = /*@__PURE__*/ requireSymlinkType();

	const { pathExists } = /*@__PURE__*/ requirePathExists();

	const { areIdentical } = /*@__PURE__*/ requireStat();

	async function createSymlink (srcpath, dstpath, type) {
	  let stats;
	  try {
	    stats = await fs.lstat(dstpath);
	  } catch { }

	  if (stats && stats.isSymbolicLink()) {
	    const [srcStat, dstStat] = await Promise.all([
	      fs.stat(srcpath),
	      fs.stat(dstpath)
	    ]);

	    if (areIdentical(srcStat, dstStat)) return
	  }

	  const relative = await symlinkPaths(srcpath, dstpath);
	  srcpath = relative.toDst;
	  const toType = await symlinkType(relative.toCwd, type);
	  const dir = path.dirname(dstpath);

	  if (!(await pathExists(dir))) {
	    await mkdirs(dir);
	  }

	  return fs.symlink(srcpath, dstpath, toType)
	}

	function createSymlinkSync (srcpath, dstpath, type) {
	  let stats;
	  try {
	    stats = fs.lstatSync(dstpath);
	  } catch { }
	  if (stats && stats.isSymbolicLink()) {
	    const srcStat = fs.statSync(srcpath);
	    const dstStat = fs.statSync(dstpath);
	    if (areIdentical(srcStat, dstStat)) return
	  }

	  const relative = symlinkPathsSync(srcpath, dstpath);
	  srcpath = relative.toDst;
	  type = symlinkTypeSync(relative.toCwd, type);
	  const dir = path.dirname(dstpath);
	  const exists = fs.existsSync(dir);
	  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
	  mkdirsSync(dir);
	  return fs.symlinkSync(srcpath, dstpath, type)
	}

	symlink = {
	  createSymlink: u(createSymlink),
	  createSymlinkSync
	};
	return symlink;
}

var ensure;
var hasRequiredEnsure;

function requireEnsure () {
	if (hasRequiredEnsure) return ensure;
	hasRequiredEnsure = 1;

	const { createFile, createFileSync } = /*@__PURE__*/ requireFile();
	const { createLink, createLinkSync } = /*@__PURE__*/ requireLink();
	const { createSymlink, createSymlinkSync } = /*@__PURE__*/ requireSymlink();

	ensure = {
	  // file
	  createFile,
	  createFileSync,
	  ensureFile: createFile,
	  ensureFileSync: createFileSync,
	  // link
	  createLink,
	  createLinkSync,
	  ensureLink: createLink,
	  ensureLinkSync: createLinkSync,
	  // symlink
	  createSymlink,
	  createSymlinkSync,
	  ensureSymlink: createSymlink,
	  ensureSymlinkSync: createSymlinkSync
	};
	return ensure;
}

var utils;
var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	function stringify (obj, { EOL = '\n', finalEOL = true, replacer = null, spaces } = {}) {
	  const EOF = finalEOL ? EOL : '';
	  const str = JSON.stringify(obj, replacer, spaces);

	  return str.replace(/\n/g, EOL) + EOF
	}

	function stripBom (content) {
	  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
	  if (Buffer.isBuffer(content)) content = content.toString('utf8');
	  return content.replace(/^\uFEFF/, '')
	}

	utils = { stringify, stripBom };
	return utils;
}

var jsonfile_1;
var hasRequiredJsonfile$1;

function requireJsonfile$1 () {
	if (hasRequiredJsonfile$1) return jsonfile_1;
	hasRequiredJsonfile$1 = 1;
	let _fs;
	try {
	  _fs = requireGracefulFs();
	} catch (_) {
	  _fs = require$$0$2;
	}
	const universalify = requireUniversalify();
	const { stringify, stripBom } = requireUtils();

	async function _readFile (file, options = {}) {
	  if (typeof options === 'string') {
	    options = { encoding: options };
	  }

	  const fs = options.fs || _fs;

	  const shouldThrow = 'throws' in options ? options.throws : true;

	  let data = await universalify.fromCallback(fs.readFile)(file, options);

	  data = stripBom(data);

	  let obj;
	  try {
	    obj = JSON.parse(data, options ? options.reviver : null);
	  } catch (err) {
	    if (shouldThrow) {
	      err.message = `${file}: ${err.message}`;
	      throw err
	    } else {
	      return null
	    }
	  }

	  return obj
	}

	const readFile = universalify.fromPromise(_readFile);

	function readFileSync (file, options = {}) {
	  if (typeof options === 'string') {
	    options = { encoding: options };
	  }

	  const fs = options.fs || _fs;

	  const shouldThrow = 'throws' in options ? options.throws : true;

	  try {
	    let content = fs.readFileSync(file, options);
	    content = stripBom(content);
	    return JSON.parse(content, options.reviver)
	  } catch (err) {
	    if (shouldThrow) {
	      err.message = `${file}: ${err.message}`;
	      throw err
	    } else {
	      return null
	    }
	  }
	}

	async function _writeFile (file, obj, options = {}) {
	  const fs = options.fs || _fs;

	  const str = stringify(obj, options);

	  await universalify.fromCallback(fs.writeFile)(file, str, options);
	}

	const writeFile = universalify.fromPromise(_writeFile);

	function writeFileSync (file, obj, options = {}) {
	  const fs = options.fs || _fs;

	  const str = stringify(obj, options);
	  // not sure if fs.writeFileSync returns anything, but just in case
	  return fs.writeFileSync(file, str, options)
	}

	const jsonfile = {
	  readFile,
	  readFileSync,
	  writeFile,
	  writeFileSync
	};

	jsonfile_1 = jsonfile;
	return jsonfile_1;
}

var jsonfile;
var hasRequiredJsonfile;

function requireJsonfile () {
	if (hasRequiredJsonfile) return jsonfile;
	hasRequiredJsonfile = 1;

	const jsonFile = requireJsonfile$1();

	jsonfile = {
	  // jsonfile exports
	  readJson: jsonFile.readFile,
	  readJsonSync: jsonFile.readFileSync,
	  writeJson: jsonFile.writeFile,
	  writeJsonSync: jsonFile.writeFileSync
	};
	return jsonfile;
}

var outputFile_1;
var hasRequiredOutputFile;

function requireOutputFile () {
	if (hasRequiredOutputFile) return outputFile_1;
	hasRequiredOutputFile = 1;

	const u = requireUniversalify().fromPromise;
	const fs = /*@__PURE__*/ requireFs();
	const path = require$$1;
	const mkdir = /*@__PURE__*/ requireMkdirs();
	const pathExists = /*@__PURE__*/ requirePathExists().pathExists;

	async function outputFile (file, data, encoding = 'utf-8') {
	  const dir = path.dirname(file);

	  if (!(await pathExists(dir))) {
	    await mkdir.mkdirs(dir);
	  }

	  return fs.writeFile(file, data, encoding)
	}

	function outputFileSync (file, ...args) {
	  const dir = path.dirname(file);
	  if (!fs.existsSync(dir)) {
	    mkdir.mkdirsSync(dir);
	  }

	  fs.writeFileSync(file, ...args);
	}

	outputFile_1 = {
	  outputFile: u(outputFile),
	  outputFileSync
	};
	return outputFile_1;
}

var outputJson_1;
var hasRequiredOutputJson;

function requireOutputJson () {
	if (hasRequiredOutputJson) return outputJson_1;
	hasRequiredOutputJson = 1;

	const { stringify } = requireUtils();
	const { outputFile } = /*@__PURE__*/ requireOutputFile();

	async function outputJson (file, data, options = {}) {
	  const str = stringify(data, options);

	  await outputFile(file, str, options);
	}

	outputJson_1 = outputJson;
	return outputJson_1;
}

var outputJsonSync_1;
var hasRequiredOutputJsonSync;

function requireOutputJsonSync () {
	if (hasRequiredOutputJsonSync) return outputJsonSync_1;
	hasRequiredOutputJsonSync = 1;

	const { stringify } = requireUtils();
	const { outputFileSync } = /*@__PURE__*/ requireOutputFile();

	function outputJsonSync (file, data, options) {
	  const str = stringify(data, options);

	  outputFileSync(file, str, options);
	}

	outputJsonSync_1 = outputJsonSync;
	return outputJsonSync_1;
}

var json;
var hasRequiredJson;

function requireJson () {
	if (hasRequiredJson) return json;
	hasRequiredJson = 1;

	const u = requireUniversalify().fromPromise;
	const jsonFile = /*@__PURE__*/ requireJsonfile();

	jsonFile.outputJson = u(/*@__PURE__*/ requireOutputJson());
	jsonFile.outputJsonSync = /*@__PURE__*/ requireOutputJsonSync();
	// aliases
	jsonFile.outputJSON = jsonFile.outputJson;
	jsonFile.outputJSONSync = jsonFile.outputJsonSync;
	jsonFile.writeJSON = jsonFile.writeJson;
	jsonFile.writeJSONSync = jsonFile.writeJsonSync;
	jsonFile.readJSON = jsonFile.readJson;
	jsonFile.readJSONSync = jsonFile.readJsonSync;

	json = jsonFile;
	return json;
}

var move_1;
var hasRequiredMove$1;

function requireMove$1 () {
	if (hasRequiredMove$1) return move_1;
	hasRequiredMove$1 = 1;

	const fs = /*@__PURE__*/ requireFs();
	const path = require$$1;
	const { copy } = /*@__PURE__*/ requireCopy();
	const { remove } = /*@__PURE__*/ requireRemove();
	const { mkdirp } = /*@__PURE__*/ requireMkdirs();
	const { pathExists } = /*@__PURE__*/ requirePathExists();
	const stat = /*@__PURE__*/ requireStat();

	async function move (src, dest, opts = {}) {
	  const overwrite = opts.overwrite || opts.clobber || false;

	  const { srcStat, isChangingCase = false } = await stat.checkPaths(src, dest, 'move', opts);

	  await stat.checkParentPaths(src, srcStat, dest, 'move');

	  // If the parent of dest is not root, make sure it exists before proceeding
	  const destParent = path.dirname(dest);
	  const parsedParentPath = path.parse(destParent);
	  if (parsedParentPath.root !== destParent) {
	    await mkdirp(destParent);
	  }

	  return doRename(src, dest, overwrite, isChangingCase)
	}

	async function doRename (src, dest, overwrite, isChangingCase) {
	  if (!isChangingCase) {
	    if (overwrite) {
	      await remove(dest);
	    } else if (await pathExists(dest)) {
	      throw new Error('dest already exists.')
	    }
	  }

	  try {
	    // Try w/ rename first, and try copy + remove if EXDEV
	    await fs.rename(src, dest);
	  } catch (err) {
	    if (err.code !== 'EXDEV') {
	      throw err
	    }
	    await moveAcrossDevice(src, dest, overwrite);
	  }
	}

	async function moveAcrossDevice (src, dest, overwrite) {
	  const opts = {
	    overwrite,
	    errorOnExist: true,
	    preserveTimestamps: true
	  };

	  await copy(src, dest, opts);
	  return remove(src)
	}

	move_1 = move;
	return move_1;
}

var moveSync_1;
var hasRequiredMoveSync;

function requireMoveSync () {
	if (hasRequiredMoveSync) return moveSync_1;
	hasRequiredMoveSync = 1;

	const fs = requireGracefulFs();
	const path = require$$1;
	const copySync = /*@__PURE__*/ requireCopy().copySync;
	const removeSync = /*@__PURE__*/ requireRemove().removeSync;
	const mkdirpSync = /*@__PURE__*/ requireMkdirs().mkdirpSync;
	const stat = /*@__PURE__*/ requireStat();

	function moveSync (src, dest, opts) {
	  opts = opts || {};
	  const overwrite = opts.overwrite || opts.clobber || false;

	  const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, 'move', opts);
	  stat.checkParentPathsSync(src, srcStat, dest, 'move');
	  if (!isParentRoot(dest)) mkdirpSync(path.dirname(dest));
	  return doRename(src, dest, overwrite, isChangingCase)
	}

	function isParentRoot (dest) {
	  const parent = path.dirname(dest);
	  const parsedPath = path.parse(parent);
	  return parsedPath.root === parent
	}

	function doRename (src, dest, overwrite, isChangingCase) {
	  if (isChangingCase) return rename(src, dest, overwrite)
	  if (overwrite) {
	    removeSync(dest);
	    return rename(src, dest, overwrite)
	  }
	  if (fs.existsSync(dest)) throw new Error('dest already exists.')
	  return rename(src, dest, overwrite)
	}

	function rename (src, dest, overwrite) {
	  try {
	    fs.renameSync(src, dest);
	  } catch (err) {
	    if (err.code !== 'EXDEV') throw err
	    return moveAcrossDevice(src, dest, overwrite)
	  }
	}

	function moveAcrossDevice (src, dest, overwrite) {
	  const opts = {
	    overwrite,
	    errorOnExist: true,
	    preserveTimestamps: true
	  };
	  copySync(src, dest, opts);
	  return removeSync(src)
	}

	moveSync_1 = moveSync;
	return moveSync_1;
}

var move;
var hasRequiredMove;

function requireMove () {
	if (hasRequiredMove) return move;
	hasRequiredMove = 1;

	const u = requireUniversalify().fromPromise;
	move = {
	  move: u(/*@__PURE__*/ requireMove$1()),
	  moveSync: /*@__PURE__*/ requireMoveSync()
	};
	return move;
}

var lib;
var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;

	lib = {
	  // Export promiseified graceful-fs:
	  .../*@__PURE__*/ requireFs(),
	  // Export extra methods:
	  .../*@__PURE__*/ requireCopy(),
	  .../*@__PURE__*/ requireEmpty(),
	  .../*@__PURE__*/ requireEnsure(),
	  .../*@__PURE__*/ requireJson(),
	  .../*@__PURE__*/ requireMkdirs(),
	  .../*@__PURE__*/ requireMove(),
	  .../*@__PURE__*/ requireOutputFile(),
	  .../*@__PURE__*/ requirePathExists(),
	  .../*@__PURE__*/ requireRemove()
	};
	return lib;
}

var libExports = /*@__PURE__*/ requireLib();
const fs = /*@__PURE__*/getDefaultExportFromCjs(libExports);

const locale = Intl.DateTimeFormat().resolvedOptions().locale;
const currentDir = require$$1.resolve(".");
const isRootDir = currentDir === require$$1.parse(currentDir).root;
const __dirname = require$$1.dirname(fileURLToPath(import.meta.url));
const templateDir = require$$1.resolve(__dirname, "../src/template");
const templates = fs.readdirSync(templateDir, { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => ({
  title: dirent.name,
  value: dirent.name
}));
function getMessage(key) {
  return languages[locale] ? languages[locale][key] : languages["en-US"][key];
}
(async () => {
  const _projectName = await he({
    message: getMessage("projectName.tip.input"),
    initialValue: "project-test",
    validate: (value) => {
      if (value === "." && isRootDir) {
        return getMessage("projectName.error.path");
      } else if (value !== "." && !value.match(/^[a-zA-Z0-9-_]+$/)) {
        return getMessage("projectName.error.name");
      }
    }
  });
  if (BD(_projectName)) {
    xe(getMessage("projectName.cancel.input"));
    process.exit(0);
  }
  const template = await ve({
    message: getMessage("projectTemplate.tip.select"),
    options: templates
  });
  if (BD(_projectName)) {
    xe(getMessage("projectName.cancel.input"));
    process.exit(0);
  }
  const projectName = _projectName === "." ? require$$1.basename(currentDir) : _projectName;
  console.log(projectName, template);
  const s = Y();
  s.start("\u5F00\u59CB\u62F7\u8D1D");
  await fs.copy(`${templateDir}/template`, projectName);
  s.stop("\u62F7\u8D1D\u5B8C\u6210");
})();
