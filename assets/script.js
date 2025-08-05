// Kalkulator BMI Dewasa
document.getElementById("bmiForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const bb = parseFloat(document.getElementById("bb").value);
    const tb = parseFloat(document.getElementById("tb").value) / 100;

    if (tb <= 0) {
        alert("Tinggi badan tidak valid");
        return;
    }

    const bmi = bb / (tb * tb);
    let status = "";

    if (bmi < 18.5) status = "Kurus";
    else if (bmi < 25) status = "Normal";
    else if (bmi < 30) status = "Gemuk";
    else status = "Obesitas";

    document.getElementById("bmiResult").innerText = `BMI Anda: ${bmi.toFixed(2)} (${status})`;
});

// Status Gizi Anak 0–24 Bulan (PB/U)
// Data ambang batas WHO untuk panjang badan per umur (PB/U) usia 0-24 bulan
// Hanya contoh data untuk usia 0, 6, 12, 18, dan 24 bulan
const pbStandar = {
    L: {
        0: { median: 49.9, min: 44.2, max: 55.6 },
        6: { median: 67.6, min: 63.3, max: 72.0 },
        12: { median: 76.1, min: 71.0, max: 81.2 },
        18: { median: 82.3, min: 76.8, max: 87.8 },
        24: { median: 87.8, min: 81.7, max: 94.0 }
    },
    P: {
        0: { median: 49.1, min: 43.6, max: 54.7 },
        6: { median: 65.7, min: 61.2, max: 70.2 },
        12: { median: 74.0, min: 69.2, max: 79.1 },
        18: { median: 80.7, min: 75.2, max: 86.2 },
        24: { median: 85.7, min: 79.8, max: 91.6 }
    }
};

function getNearestAge(usia) {
    const allowed = [0, 6, 12, 18, 24];
    let nearest = allowed.reduce((prev, curr) =>
        Math.abs(curr - usia) < Math.abs(prev - usia) ? curr : prev
    );
    return nearest;
}

function getStatus(panjang, min, max) {
    if (panjang < min) return "Sangat Pendek (Stunted)";
    if (panjang >= min && panjang <= max) return "Normal";
    if (panjang > max) return "Tinggi";
    return "Data tidak valid";
}

document.getElementById("giziForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const jk = document.getElementById("jk").value;
    const usia = parseInt(document.getElementById("usia").value);
    const pb = parseFloat(document.getElementById("pb").value);

    if (usia < 0 || usia > 24) {
        document.getElementById("giziResult").textContent = "Usia harus antara 0–24 bulan.";
        return;
    }

    const usiaKey = getNearestAge(usia);
    const data = pbStandar[jk][usiaKey];

    const status = getStatus(pb, data.min, data.max);

    document.getElementById("giziResult").textContent =
        `Status Gizi: ${status} (Usia: ${usiaKey} bulan, Panjang Normal: ${data.min}–${data.max} cm)`;
});


document.getElementById("statusGiziForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const usia = parseInt(document.getElementById("usia_anak").value);
    const berat = parseFloat(document.getElementById("berat_anak").value);
    const jk = document.getElementById("jk_anak").value;

    let status = "Data tidak ditemukan";

    const standardBBU = {
        L: {
            0: [2.5, 3.3, 4.4],
            6: [6.4, 7.9, 9.7],
            12: [7.8, 9.6, 11.8],
            24: [9.7, 12.2, 15.3],
            36: [11.3, 14.3, 18.3],
            48: [12.7, 16.3, 20.8],
            60: [14.1, 18.3, 23.1],
        },
        P: {
            0: [2.4, 3.2, 4.2],
            6: [5.8, 7.3, 9.0],
            12: [7.1, 8.9, 11.2],
            24: [8.9, 11.5, 14.6],
            36: [10.5, 13.9, 17.9],
            48: [12.0, 16.0, 20.5],
            60: [13.4, 18.2, 23.0],
        }
    };

    function getNearestAgeData(standar, usia) {
        const usiaKeys = Object.keys(standar).map(Number);
        let closest = usiaKeys.reduce((a, b) =>
            Math.abs(b - usia) < Math.abs(a - usia) ? b : a
        );
        return standar[closest];
    }

    if (usia >= 0 && usia <= 60 && jk && standardBBU[jk]) {
        const [sdMinus2, median, sdPlus2] = getNearestAgeData(standardBBU[jk], usia);

        if (berat < sdMinus2)
            status = "Berat Badan Kurang (Underweight)";
        else if (berat >= sdMinus2 && berat < median)
            status = "Berat Badan Kurang (Mild)";
        else if (berat >= median && berat <= sdPlus2)
            status = "Berat Badan Normal";
        else if (berat > sdPlus2 && berat <= sdPlus2 + (sdPlus2 - median))
            status = "Risiko Berat Badan Lebih";
        else
            status = "Obesitas";
    }

    document.getElementById("statusGiziResult").innerText = `Status Gizi Anak: ${status}`;
});


