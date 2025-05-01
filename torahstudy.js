// Manages the Torah Study section of the Library

const chocklyisrael = [ // 54 Torah sections, updates every sunday (or whatever day he wants really)
    "Bereishit",
    "Noach",
    "Lech Lecha",
    "Vayeira",
    "Chayei Sarah",
    "Toldot",
    "Vayeitzei",
    "Vayishlach",
    "Vayeishev",
    "Mikeitz",
    "Vayigash",
    "Vayechi",
    "Shemot",
    "Vaeira",
    "Bo",
    "Beshalach",
    "Yitro",
    "Mishpatim",
    "Terumah",
    "Tetzaveh",
    "Ki Tissa",
    "Vayakhel",
    "Pekudei",
    "Vayikra",
    "Tzav",
    "Shemini",
    "Tazria",
    "Metzora",
    "Acharei Mot",
    "Kedoshim",
    "Emor",
    "Behar",
    "Bechukotai",
    "Bamidbar",
    "Naso",
    "Behalotkha",
    "Shelach",
    "Korach",
    "Chukat",
    "Balak",
    "Pinchas",
    "Mattot",
    "Masei",
    "Devarim",
    "Vaetchanan",
    "Eikev",
    "Reaih",
    "Shoftim",
    "Ki Teitzei",
    "Ki Tavo",
    "Nitzavim",
    "Vayelech",
    "Haazinu",
    "Zot Haberakha"
];

const tomerdevorah = [
    "I & II",
    "III",
    "IV",
    "V & VI",
    "VII",
    "VIII",
    "IX & X"
];

function roman(num) { // roman numeral converter for numbers <10 (used for Bustan Al-Uqul)
    if (num < 4) {
        var ret = "";
        for (var i = 0; i < num; i++) {
            ret += 'I';
        }
        return ret;
    }
    else if (num == 4) {
        return "IV";
    }
    else if (num >= 5 && num <= 8) {
        var ret = "V";
        for (var i = 0; i < num - 5; i++) {
            ret += 'I';
        }
        return ret;
    }
    else if (num == 9) {
        return "IX";
    }
    else {
        return "X";
    }
} 

const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
const tripDay = 6; // saturday

var startDate = new Date("2024-4-8");
startDate.setHours(12); // midday
var now = new Date();
var dif = now - startDate;
var difDays = Math.round(dif / oneDay);
/*difDays     0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32  33  34
  day    sun mon tue wed thu fri sat sun mon tue wed thu fri sat sun mon tue wed thu fri sat sun mon tue wed thu fri sat sun mon tue wed thu fri sat 
  */
var tripsSince = Math.floor(difDays / 7);
if (now.getDay() == tripDay) {
    tripsSince++;
}

tripsSince += 26; // Tazria

var daysSinceSat = (now.getDay() + 1 + (now.getHours() > 12 ? 1 : 0)) % 7;

//document.getElementById("torahsection").innerText = chocklyisrael[tripsSince];
document.getElementById("bustanaluqul").innerText = roman(daysSinceSat);
document.getElementById("tomerdevorah").innerText = tomerdevorah[daysSinceSat];