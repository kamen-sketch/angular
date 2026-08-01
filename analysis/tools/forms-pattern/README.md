# F-14 — `Validators.pattern` dan anchor yang tidak mengikat

## Cacatnya

`packages/forms/src/validators.ts:569-596` merangkai anchor dengan penggabungan
string biasa:

```ts
if (pattern.charAt(0) !== '^') regexStr += '^';
regexStr += pattern;
if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';
regex = new RegExp(regexStr);
```

Dua kegagalan berbeda keluar dari empat baris itu.

**A. Alternasi lolos dari anchor.** `|` punya presedensi terendah, jadi
`^cat|dog$` berarti `(^cat)|(dog$)` — "berawalan cat ATAU berakhiran dog".
Alternatif di **tengah** (`admin|user|guest`) tidak menyentuh `^` maupun `$`
sama sekali dan cocok sebagai substring di mana pun.

**B. Pemeriksaan anchor memakai `charAt`, bukan parsing.** Pola yang berakhir
dengan dolar **ter-escape** (`\$`, karakter dolar literal) dikira sudah
ber-anchor, sehingga `$` tidak pernah ditambahkan.

Direktif template `[pattern]` memakai fungsi yang sama
(`directives/validators.ts:695`).

## Acuannya bukan selera saya

HTML Standard mendefinisikan atribut `pattern` pada `<input>` dikompilasi
setara dengan **`"^(?:" + pattern + ")$"`**.
<https://html.spec.whatwg.org/multipage/input.html#the-pattern-attribute>

Dokumentasi Angular sendiri menyandingkan `Validators.pattern('[a-zA-Z ]*')`
dengan `<input pattern="[a-zA-Z ]*">` sebagai padanan, dan Angular menyediakan
direktif `[pattern]`. Jadi peramban adalah pembanding yang sah.

Dokumentasi menyebut **mekanismenya** ("the `^` character is prepended and the
`$` character is appended") tetapi tidak pernah memperingatkan bahwa alternasi
membatalkan anchor itu. Berkas uji Angular sendiri
(`packages/forms/test/validators_spec.ts:389-441`) hanya menguji kelas karakter
— **tidak ada satu pun kasus dengan alternasi**.

## Cara menjalankan

```bash
npm i @angular/forms@22.1.0 @angular/core@22.1.0 @angular/compiler@22.1.0 \
      @angular/platform-browser@22.1.0 rxjs tslib playwright

node analysis/tools/forms-pattern/probe.mjs       <path-node_modules>
node analysis/tools/forms-pattern/vs-platform.mjs <path-node_modules> --shot bukti.png
```

Keduanya keluar dengan status 0 hanya bila bypass-nya terkonfirmasi **dan**
kontrol negatifnya berperilaku benar.

## `probe.mjs` — perilaku terhadap artefak npm

Empat langkah: kontrol positif (5/5 pola sederhana benar), cacat A (4 bypass),
cacat B (2 bypass), kontrol negatif — termasuk `(cat|dog)`, yang membuktikan
developer yang kebetulan menulis kurung sendiri **tidak** terdampak.

Langkah kelima menguji, tidak mengandaikan, apakah `$` cocok sebelum newline di
akhir. Di JavaScript tanpa flag `m`, **tidak** — berbeda dari Python/Perl.
Hipotesis itu gugur dan dicatat sebagai gugur.

## `vs-platform.mjs` — pembanding platform di Chromium

Pola dan nilai yang sama dinilai dua kali di dalam peramban: sekali oleh
`input.validity.patternMismatch` bawaan, sekali oleh `Validators.pattern`
Angular dari bundel npm.

```
pattern             value                  peramban   Angular
cat|dog             "bulldog"              ditolak    DITERIMA
cat|dog             "catastrophe"          ditolak    DITERIMA
admin|user|guest    "abuserx"              ditolak    DITERIMA
admin|user|guest    "no-user-here-really"  ditolak    DITERIMA
read|write|delete   "can-write-anything"   ditolak    DITERIMA
jpg|png|gif         "evil.svg.gif"         ditolak    DITERIMA
jpg|png|gif         "jpg.exe"              ditolak    DITERIMA
[0-9]+\$            "12$ dan lain-lain"    ditolak    DITERIMA
```

**10 dari 24 kasus tidak sepakat — semuanya ke arah Angular lebih longgar.**
Tidak ada satu pun kasus sebaliknya. Bukti: `analysis/evidence/F-14-vs-platform.png`

## Dampak, dinyatakan apa adanya

Ini validasi formulir **sisi klien**. Ia bukan batas otorisasi, dan penegakan
yang otoritatif seharusnya di server. Saya tidak mengklaim lebih dari itu.

Yang benar-benar didapat:

1. Cacat kebenaran yang tidak ambigu — sintaks yang sama dinilai berbeda dari
   platform yang ditirunya, dan perbedaannya **selalu** ke arah lebih longgar.
2. Bentuk bypass yang nyata bila pola dipakai sebagai allowlist sebelum sebuah
   sink (ekstensi berkas, nama peran, target pengalihan). Alternasi adalah
   bentuk paling alami untuk menulis "salah satu dari".
3. Developer tidak punya petunjuk bahwa ia salah: dokumentasi menyandingkan
   validator ini dengan atribut HTML yang berperilaku berbeda.

Severity sebagai kerentanan: **rendah**. Sebagai cacat kebenaran: jelas, dengan
perbaikan satu baris tanpa trade-off.

## Perbaikan

```ts
regexStr = `^(?:${pattern})$`;
```

dan buang kedua pemeriksaan `charAt` — grup non-capturing membuatnya tidak
perlu, sekaligus menutup cacat B. Ini juga menyelaraskan Angular dengan cara
HTML Standard mengompilasi atribut `pattern`.

**Catatan kompatibilitas:** perubahan ini **mengetatkan** validasi. Aplikasi
yang polanya memuat alternasi tingkat atas akan mulai menolak nilai yang tadinya
diterima. Itu justru perbaikannya, tetapi layak disebut di catatan rilis.
